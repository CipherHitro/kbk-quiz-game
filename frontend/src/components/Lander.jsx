import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { questions } from './../data/questions';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const KBCLander = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const base_API_URL = import.meta.env.VITE_MODE == 'development' ? import.meta.env.VITE_API_URL : '/'
    const navigate = useNavigate();

    const typingTexts = [
        "Play KBC",
        "Use Lifelines",
        "Earn Money",
        "Win Big",
        "Test Knowledge",
        "Become Karodpati"
    ];

    useEffect(() => {
        let timeout;

        if (isTyping) {
            const currentText = typingTexts[currentTextIndex];
            if (displayText.length < currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                }, 100);
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 50);
            } else {
                setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isTyping, currentTextIndex, typingTexts]);

    const handlePlay = async () => {
        // console.log("in handle play")
        if (!Cookies.get('uid')) {
            alert('You need to login first')
            return
        }
        try {
            setIsGenerating(true);  // start loader
            const response = await fetch(`${base_API_URL}api/questions/generate`, {
                method: "POST",
                credentials: 'include'
            })

            const data = await response.json();
            // console.log(data)
            setIsGenerating(false); // stop loader

            if (response.ok) {
                navigate('/questions', { state: data.questions })
            }
            else {
                alert(data.message || "Please try again ")
                navigate('/')
            }
        }
        catch (err) {
            console.error(err);
            setIsGenerating(false);
            alert("Something went wrong while generating questions!");
        }

    }
    return (
        <>
            {isGenerating && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                    <div className="text-center text-white space-y-4">
                        <div className="text-lg md:text-2xl font-semibold animate-pulse">
                            Generating Questions...
                        </div>
                        <div className="flex justify-center">
                            <div className="h-6 w-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            )}
            <div className=" text-white absolute inset-0 -z-10 h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            </div>
            <Navbar currentQuestion={questions} />
            <div className="relative overflow-hidden">

                {/* Enhanced Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 "></div>
                    <div className="absolute inset-0 "></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] "></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] "></div>

                    {/* Animated Background Elements */}
                    <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-20 right-20 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }}></div>
                </div>

                {/* Main Content */}

                <div className='text-white flex justify-between min-h-[85vh] items-center px-8'>

                    {/* Left Content Section */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8  lg:mt-1">
                        {/* Welcome Section */}
                        <div className="space-y-6">
                            {/* Decorative Elements - Moved to Top */}
                            <div className="flex space-x-8 text-4xl opacity-60 justify-center">
                                <div className="animate-bounce" style={{ animationDelay: '0s' }}>💡</div>
                                <div className="animate-bounce" style={{ animationDelay: '0.5s' }}>🎮</div>
                                <div className="animate-bounce" style={{ animationDelay: '1s' }}>💰</div>
                                <div className="animate-bounce" style={{ animationDelay: '1.5s' }}>🏆</div>
                            </div>
                            <div className="relative">
                                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
                                    Welcome to
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 blur-xl -z-10 rounded-lg"></div>
                            </div>

                            <div className="relative">
                                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                                    KBK
                                </h2>
                                <div className="text-lg md:text-xl text-gray-300 mt-2 font-medium tracking-wider">
                                    Kaun Banega Karodpati
                                </div>
                            </div>
                        </div>

                        {/* Typing Animation Section */}
                        <div className="h-20 flex items-center justify-center">
                            <div className="relative">
                                <div className="text-2xl md:text-3xl font-semibold text-cyan-400 min-h-[3rem] flex items-center">
                                    <span className="mr-2">🎯</span>
                                    {displayText}
                                    <span className="ml-1 animate-pulse text-yellow-400">|</span>
                                </div>
                                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 blur-lg rounded-lg -z-10"></div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-6">
                            <button onClick={handlePlay} className="group cursor-pointer relative px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <span className="relative flex items-center">
                                    <span className="md:mr-2">🎮</span>
                                    Play Now
                                </span>
                            </button>

                            <button onClick={() => navigate('/howtoplay')} className="group cursor-pointer relative px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                                <span className="relative flex items-center">
                                    <span className="">❓</span>
                                    How to Play
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Money Section */}
                    <div className="w-1/2 min-h-[90vh] relative hidden lg:block">
                        {/* 🎥 Money Rain Video Background */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-100"
                        >
                            <source src="/Money-Rain.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>
            </div>
        </>
    );
};

export default KBCLander;