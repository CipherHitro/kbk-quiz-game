import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Play, Home } from 'lucide-react';
import Navbar from './Navbar';
import { questions } from '../data/questions';
import { useNavigate } from 'react-router-dom';

const HowToPlay = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate()
    const slides = [
        {
            id: 1,
            title: "Welcome to KBK!",
            content: {
                text: [
                    "📱 Tap on 'Play Now' button to start your journey",
                    "🤖 We'll generate questions using AI technology",
                    "⏳ Please wait while we prepare your questions",
                    "🎮 Get ready for an amazing quiz experience!"
                ],
                videoPlaceholder: "Welcome & Start Game Demo",
                videoUrl: "/GeneratingQuestions.mp4"
            }
        },
        {
            id: 2,
            title: "Question Interface",
            content: {
                text: [
                    "❓ Choose the correct option from 4 choices",
                    "🔒 Lock your answer by clicking the lock button",
                    "⏰ Timer 1-5 Que 45s, ,6-10 Que 60s, No timer after 10th Que",
                    "💡 Think carefully before locking your answer!"
                ],
                videoPlaceholder: "Question Selection Demo",
                videoUrl: "/QuestionAnswer.mp4"
            }
        },
        {
            id: 3,
            title: "Lifelines Overview",
            content: {
                text: [
                    "🆘 Need help? Use your lifelines wisely!",
                    "4️⃣ You have 4 powerful lifelines:",
                    "• 50-50 • Phone a Friend • Ask Expert • Flip Question",
                    "⚠️ Each lifeline can only be used once!"
                ],
                videoPlaceholder: "Lifelines Menu Demo",
                videoUrl: "/Lifeline.mp4"
            }
        },
        {
            id: 4,
            title: "50-50 Lifeline",
            content: {
                text: [
                    "✂️ Remove two wrong options",
                    "🎯 Increases your chances to 50%",
                    "💡 Perfect for difficult questions",
                    "🤔 Use it when you're unsure between options"
                ],
                videoPlaceholder: "50-50 Lifeline Demo",
                videoUrl: "/FiftyFifty.mp4"
            }
        },
        {
            id: 5,
            title: "Phone a Friend",
            content: {
                text: [
                    "📞 Get help from our AI assistant",
                    "🤖 AI will analyze the question for you",
                    "⏱️ Quick and reliable assistance",
                    "🎯 Great for general knowledge questions"
                ],
                videoPlaceholder: "Phone a Friend Demo",
                videoUrl: "/PhoneAFriend.mp4"
            }
        },
        {
            id: 6,
            title: "Ask Expert",
            content: {
                text: [
                    "👨‍🎓 Consult our expert for answers",
                    "✅ 90% chance of getting the correct answer",
                    "🤷‍♂️ 10% chance expert gives 2 options when unsure",
                    "💡 Best for technical or specialized questions"
                ],
                videoPlaceholder: "Ask Expert Demo",
                videoUrl: "/AskExpert.mp4"
            }
        },
        {
            id: 7,
            title: "Flip Question",
            content: {
                text: [
                    "🔄 Don't like the current question?",
                    "📚 Choose your favorite category",
                    "🎲 Get a new question from that category",
                    "🎯 Perfect when facing unfamiliar subjects"
                ],
                videoPlaceholder: "Flip Question Demo",
                videoUrl: "/FlipQuestion.mp4"
            }
        },
        {
            id: 8,
            title: "Quit Game",
            content: {
                text: [
                    "🚪 Want to quit with your winnings?",
                    "✅ Safe exit strategy available anytime",
                    "🏆 Better to quit than lose everything",
                    "💡 Play smart, know when to stop!"
                ],
                videoPlaceholder: "Quit Game Demo",
                videoUrl: "/Quit.mp4"
            }
        }
        // Add other slides here
    ];

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToHome = () => {
        navigate('/')
        console.log("Navigate to home page");
    };

    return (
        <div className="flex flex-col min-h-screen text-white bg-black">

            {/* Background */}
            <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            {/* Navbar */}
            <Navbar currentQuestion={questions} />

            {/* Main Content */}
            <div className="flex flex-col items-center mt-3 flex-grow px-4 py-6">

                {/* Slider Card */}
                <div className="border border-white/20 w-full max-w-6xl px-6 py-5 rounded-2xl bg-white/5 backdrop-blur-lg shadow-2xl max-h-[85vh] overflow-y-auto flex flex-col justify-between">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2">How to Play KBK</h1>
                        <div className="flex justify-center items-center space-x-2 text-purple-300">
                            <span className="text-sm">Step {currentSlide + 1} of {slides.length}</span>
                        </div>
                    </div>

                    {/* Slide Content */}
                    <div className="flex flex-col md:flex-row gap-6 mb-4 flex-grow">

                        {/* Left - Text */}
                        <div className="flex-1 space-y-4 text-base md:text-lg leading-relaxed">
                            <h2 className="text-xl md:text-3xl font-bold text-purple-300 mb-4">{slides[currentSlide].title}</h2>
                            {slides[currentSlide].content.text.map((item, index) => (
                                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition">
                                    <div className="text-purple-400 mt-1"></div>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Right - Video Placeholder */}
                        <div className="flex-1 flex justify-center">
                            <div className="relative w-full  aspect-video rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col items-center justify-center ">

                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full rounded-2xl object-cover"
                                    src={slides[currentSlide].content.videoUrl}
                                >
                                    Your browser does not support the video tag.
                                </video>

                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">

                        {/* Previous */}
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className={`cursor-pointer flex items-center space-x-2 px-5 py-2 rounded-lg font-semibold ${currentSlide === 0 ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <ChevronLeft size={20} />
                            <span>Previous</span>
                        </button>

                        {/* Next / Home */}
                        {currentSlide === slides.length - 1 ? (
                            <button
                                onClick={goToHome}
                                className="cursor-pointer flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition"
                            >
                                <Home size={20} />
                                <span>Go to Home</span>
                            </button>
                        ) : (
                            <button
                                onClick={nextSlide}
                                className="cursor-pointer flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:scale-105 transition"
                            >
                                <span>Next</span>
                                <ChevronRight size={20} />
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HowToPlay;
