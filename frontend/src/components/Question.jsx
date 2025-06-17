import React from 'react'
import { Lock, RefreshCw } from 'lucide-react';

const Question = ({ currentQuestion, isCheckingAnswer, getOptionClass, selectedOption, handleOptionClick, handleAnswer ,fadingOptions, hiddenOptions}) => {
    return (
        <>
            <div className="question flex flex-col lg:flex-row justify-between items-center gap-4 px-4 mb-4">
                <div className="w-full">
                    <h2 className="border border-yellow-300/30 bg-gradient-to-r from-amber-400 to-yellow-500 p-3 md:p-5 w-full rounded-xl text-sm md:text-xl lg:text-2xl text-black font-bold shadow-lg backdrop-blur-sm text-center md:text-left">
                        {currentQuestion.question}
                    </h2>
                </div>
            </div>

            {/* Options Section */}
            <div className="options grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 px-4 mb-4">
                {currentQuestion.options.map((option, index) => {
                    const isFading = fadingOptions.includes(index);
                    if (hiddenOptions.includes(index)) return (
                        <button
                            key={index}
                            disabled={isCheckingAnswer}
                            className={`${getOptionClass(index)} transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        >
                            <div className="flex items-center">
                                <span className="bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm md:text-base font-bold mr-3 md:mr-4 flex-shrink-0 border border-white/30">
                                    {String.fromCharCode(65 + index)}
                                </span>
                            </div>
                        </button>
                    );

                    return (
                        <button
                            key={index}
                            disabled={isCheckingAnswer}
                            onClick={() => handleOptionClick(index)}
                            className={`${getOptionClass(index)} transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
                        >
                            <div className="flex items-center">
                                <span className="bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm md:text-base font-bold mr-3 md:mr-4 flex-shrink-0 border border-white/30">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className="text-sm md:text-base lg:text-lg">{option}</span>
                            </div>
                            {selectedOption === index && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-lock-slide-in">
                                    <Lock onClick={() => { handleAnswer(index) }} className="h-7 w-7 text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </>
    )
}

export default Question
