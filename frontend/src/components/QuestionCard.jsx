import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { RefreshCw } from 'lucide-react';
import '../App.css'
import { questions } from '../data/questions';
import { flipQuestions } from '../data/flipQuestions';
import Timer from './Timer';
import LifelineModal from './models/LifelineModel';
import AskExpertModel from './models/AskExpertModel';
import Question from './Question';
import Won from './GameState/Won';
import Lost from './GameState/Lost';
import TimesUp from './GameState/TimesUp';
import { useLocation } from 'react-router-dom';
import ChatbotSidebar from './ChatbotSidebar';
import { useNavigate } from 'react-router-dom';
import Quit from './GameState/Quit';

const QuestionCard = () => {
  const location = useLocation()
  const base_API_URL = import.meta.env.VITE_MODE == 'development' ? import.meta.env.VITE_API_URL : '/'
  const navigate = useNavigate()

  const [selectedOption, setSelectedOption] = useState(null);
  const [allQuestions, setAllQuestions] = useState(location.state)
  const [currentQuestion, setCurrentQuestion] = useState(allQuestions[0])
  const [totalWinnings, setTotalWinnings] = useState(0)
  const [gameState, setGameState] = useState('playing');
  const [isCheckingAnswer, setIsCheckingAnswer] = useState(false);
  const [timer, setTimer] = useState(45);
  const [totalTimeForTimer, setTotalTimeForTimer] = useState(null)
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const intervalRef = useRef(null);

  const [showLifelineModal, setShowLifelineModal] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [fadingOptions, setFadingOptions] = useState([]);
  const [expertAdvice, setExpertAdvice] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const categories = ["Technology", "Geography", "Science", "History"];
  const [isFlipping, setIsFlipping] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false)

  const [lifelinesUsed, setLifelinesUsed] = useState({
    fiftyFifty: false,
    phoneAFriend: false,
    askExpert: false,
    flipQuestion: false,
  });

  const useFiftyFifty = () => {
    const correctIndex = currentQuestion.correctAnswer;
    const wrongIndexes = currentQuestion.options
      .map((_, i) => i)
      .filter(i => i !== correctIndex);

    const shuffled = wrongIndexes.sort(() => Math.random() - 0.5);
    const optionsToFade = shuffled.slice(0, 2);

    setFadingOptions(optionsToFade);

    setTimeout(() => {
      setHiddenOptions(optionsToFade);
    }, 500);
    setIsTimerPaused(false)
  };
  const sendMessage = async (userInput) => {
    console.log("in send message")
    const response = await fetch(`${base_API_URL}api/chat`, {
      method: "POST",
      body: JSON.stringify({ message: userInput }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    return data.reply
  }
  const usePhoneAFriend = () => {
    console.log("phone a friend")
    setIsChatBotOpen(true);

  }
  const useAskExpert = () => {
    const correctIndex = currentQuestion.correctAnswer;
    const allIndexes = [0, 1, 2, 3];

    const chance = Math.random();

    if (chance <= 0.9) {
      // 90% chance: expert gives correct answer
      setExpertAdvice({
        type: "confident",
        answerIndex: correctIndex,
      });
    } else {
      // 10% chance: expert gives two options (one correct, one random wrong)
      const wrongOptions = allIndexes.filter(i => i !== correctIndex);
      const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

      const options = [correctIndex, randomWrong].sort(() => Math.random() - 0.5); // shuffle

      setExpertAdvice({
        type: "unsure",
        options,
      });
    }
    setIsTimerPaused(false)
  };

  const useFlipQuestion = async (selectedCategory) => {
    console.log("in flip questons");

    const questionData = {
      id: currentQuestion.id,
      amount: currentQuestion.amount,
      category: selectedCategory,
    };

    try {
      setIsFlipping(true);  // Show loading overlay
      setCategoryModalOpen(false);

      const response = await fetch(`${base_API_URL}api/questions/flip`, {
        method: "POST",
        body: JSON.stringify(questionData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });


      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIsFlipped(true)
        setIsFlipping(false);  // Hide loading overlay
        setTimeout(() => {
          setCurrentQuestion(data.question);
          setIsFlipped(false);
        }, 1200); // Match flip animation duration
      } else {
        alert(data.message || "Failed to generate new question");
        setLifelinesUsed({flipQuestion: false})
        setIsFlipping(false);
      }
    } catch (error) {
      console.error(error);
      setIsFlipping(false);
      alert("Something went wrong.");
    }
    setIsTimerPaused(false)
  };



  useEffect(() => {
    setHiddenOptions([])
    setFadingOptions([]);
    setExpertAdvice(null);
    if (currentQuestion.id <= 5) {
      setTotalTimeForTimer(45);
      setTimer(45)
    }
    else if (currentQuestion.id <= 10) {
      setTotalTimeForTimer(60)
      setTimer(60)
    }
    else {
      setTotalTimeForTimer(null)
      setTimer(null)
    }
  }, [currentQuestion])

  useEffect(() => {
    if (timer != null) {
      if (timer > 0) {
        if (!isTimerPaused) {
          intervalRef.current = setInterval(() => {
            setTimer(timer-1);
          }, 1000);
        }
      } else {
        setGameState('timeUp');
      }
    }

    return () => clearInterval(intervalRef.current); // Clear timer on cleanup
  }, [timer, isTimerPaused]);

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedOption(answerIndex);
    setIsCheckingAnswer(true); // start checking animation

    setTimeout(() => {
      setIsCheckingAnswer(false); // stop checking

      if (answerIndex === currentQuestion.correctAnswer) {
        console.log("Correct answer ");

        if (currentQuestion.id === 16) {
          setGameState('won');
          setTotalWinnings(currentQuestion.amount);
          return;
        }

        if (
          currentQuestion.id === 5 ||
          currentQuestion.id === 10 ||
          currentQuestion.id > 10 ||
          currentQuestion.id > 15
        ) {
          setTotalWinnings(currentQuestion.amount);
        }

        setCurrentQuestion(allQuestions[currentQuestion.id]);
        setSelectedOption(null);
      } else {
        setGameState('lost');
      }
    }, 1000); // simulate 2 seconds of checking
  };

  const resetGame = () => {
    // setCurrentQuestion(allQuestions[0]);
    // setTotalWinnings(0);
    // setGameState('playing');
    // setSelectedOption(null);
    // setTimer(45)
    // setTotalTimeForTimer(45)
    navigate('/')
  };
  const getOptionClass = (index) => {
    const baseClass = `border flex justify-between cursor-pointer border-white/30 p-4 rounded-xl text-left font-semibold transition-all duration-300 backdrop-blur-sm ${isCheckingAnswer ? 'opacity-50 cursor-not-allowed' : ''}`;

    if (selectedOption === index) {
      return `${baseClass} bg-blue-500/40 border-blue-400 text-white shadow-lg transform scale-102`;
    }

    return `${baseClass} bg-white/10 hover:bg-white/20 hover:border-white/50 hover:shadow-lg text-white`;
  };

  if (gameState === 'won') {
    return <Won resetGame={resetGame} totalWinnings={totalWinnings} />
  }

  if (gameState === 'lost') {
    return <Lost resetGame={resetGame} currentQuestion={currentQuestion} totalWinnings={totalWinnings} />
  }
  if (gameState === 'timeUp') {
    return <TimesUp resetGame={resetGame} currentQuestion={currentQuestion} totalWinnings={totalWinnings} />
  }
  if (gameState === 'quit') {
    return <Quit resetGame={resetGame} currentQuestion={currentQuestion} totalWinnings={totalWinnings} />
  }
  return (
    <>
      {isFlipping && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <div className="text-lg md:text-2xl font-semibold animate-pulse">
              Flipping Question...
            </div>
            <div className="flex justify-center">
              <div className="h-6 w-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      <div className=" text-white absolute inset-0 -z-10 h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      </div>
      <Navbar currentQuestion={currentQuestion} />
      <div className="flex items-start justify-center pt-15 pb-3 px-2">
        {/* Main Question Card */}
        <div className="questionCard border  border-white/20 w-full max-w-4xl  px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-lg shadow-2xl max-h-[85vh] overflow-y-auto">

          {/* Top Section: Details + Timer */}
          <div className="flex md:flex-row justify-between items-start md:items-center p-4 mb-2">
            {/* Details Section */}
            <div className="details text-center w-3/2 md:w-full mb-0">
              <h1 className="text-sm md:text-xl text-white/90 mb-1 font-medium">Question {currentQuestion.id} of {questions.length}</h1>
              <h1 className="text-xl md:text-3xl text-yellow-300 font-bold mb-1">Playing for: ₹{currentQuestion.amount.toLocaleString()}</h1>
              <h1 className="text-sm md:text-xl text-green-300 font-medium">Current winnings: ₹{totalWinnings.toLocaleString()}</h1>
            </div>

            {/* Timer Section */}
            {currentQuestion.id <= 10 && (
              <div className="flex justify-end items-center">
                {/* <div className="backdrop-blur-sm rounded-full p-1 bg-gradient-to-r from-blue-900 to-blue-800 shadow-xl border border-blue-400/20"> */}
                <Timer timer={timer} totalTime={totalTimeForTimer} />
                {/* </div> */}
              </div>
            )}
          </div>
          {/* Question  Section */}
          {/* FLIP CONTAINER */}
          <div className={`relative perspective-1000  `}>
            <div className={`preserve-3d transition-transform duration-[1200ms] ${isFlipped ? 'rotate-y-180' : ''}`}>

              {/* Front Face */}
              <div className={`backface-hidden `}>
                {/* Question Section */}
                <Question
                  currentQuestion={currentQuestion}
                  isCheckingAnswer={isCheckingAnswer}
                  getOptionClass={getOptionClass}
                  selectedOption={selectedOption}
                  handleAnswer={handleAnswer}
                  handleOptionClick={handleOptionClick}
                  fadingOptions={fadingOptions}
                  hiddenOptions={hiddenOptions} />
              </div>
              {/* Back Face */}
              <div className="backface-hidden absolute inset-0 rotate-y-180">
                <Question
                  currentQuestion={currentQuestion}
                  isCheckingAnswer={isCheckingAnswer}
                  getOptionClass={getOptionClass}
                  selectedOption={selectedOption}
                  handleAnswer={handleAnswer}
                  handleOptionClick={handleOptionClick}
                  fadingOptions={fadingOptions}
                  hiddenOptions={hiddenOptions} />
              </div>
            </div>
          </div>

          <div className="quit text-center mt-4">
            {isCheckingAnswer ? (
              <div className="flex p-3 md:p-4 px-6 md:px-9 items-center justify-center gap-2 text-yellow-400 font-bold animate-pulse">
                <RefreshCw className="animate-spin h-5 w-5" />
                Checking Answer...
              </div>
            ) : (
              <div className="buttons flex justify-center gap-4 my-6">
                {/* Lifelines Button */}
                <button
                  onClick={() => { setShowLifelineModal(true), setIsTimerPaused(true) }}
                  className="cursor-pointer p-3 md:p-4 px-6 md:px-7 rounded-xl text-white font-bold text-sm md:text-base bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 border border-indigo-300/30 shadow-l  hover:from-purple-500 hover:via-indigo-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  🚀 Lifelines
                </button>

                {/* Quit Game Button */}
                <button
                  onClick={() => setGameState('quit')}
                  className="cursor-pointer p-3 md:p-4 px-6 md:px-7 rounded-xl text-white font-bold text-sm md:text-base bg-gradient-to-br from-red-700 via-rose-600 to-pink-700 border border-red-400/30 shadow-l  hover:from-red-600 hover:via-rose-500 hover:to-pink-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  ❌ Quit Game
                </button>

              </div>
            )}

          </div>
        </div>
      </div >

      {/* Lifeline Model  */}
      {
        showLifelineModal && (
          <LifelineModal
            onClose={() => { setShowLifelineModal(false), setIsTimerPaused(false) }}
            lifelinesUsed={lifelinesUsed}
            useLifeline={(key) => {
              if (!lifelinesUsed[key]) {
                if (key === 'fiftyFifty') {
                  useFiftyFifty();
                  setLifelinesUsed((prev) => ({ ...prev, [key]: true }));
                }
                else if (key === 'phoneAFriend') {
                  usePhoneAFriend();
                  setLifelinesUsed((prev) => ({ ...prev, [key]: true }));
                }
                else if (key === 'askExpert') {
                  useAskExpert();
                  setLifelinesUsed((prev) => ({ ...prev, [key]: true }));
                }
                if (key === 'flipQuestion') {
                  setCategoryModalOpen(true)
                  // useFlipQuestion();
                  setLifelinesUsed((prev) => ({ ...prev, [key]: true }));
                }

                setShowLifelineModal(false);
              }
            }}
          />
        )
      }

      {/* Ask an expert model */}
      {
        expertAdvice && (
          <AskExpertModel expertAdvice={expertAdvice} setExpertAdvice={setExpertAdvice} />
        )
      }

      {/* Flip a question  */}
      {
        categoryModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-[#1b1b3a] text-white p-6 rounded-xl w-[90%] max-w-md border border-purple-400 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Choose a Category</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => useFlipQuestion(cat)}
                    className="py-2 px-4 rounded bg-purple-600 hover:bg-purple-700 font-medium"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* ChatBot Sidebar   */}
      <ChatbotSidebar currentQuestion={currentQuestion} isOpen={isChatBotOpen} onClose={() => setIsChatBotOpen(false)} sendMessage={sendMessage} setIsTimerPaused={setIsTimerPaused}/>
    </>
  );
};

export default QuestionCard;