import React from 'react'

const Quit = ({resetGame , currentQuestion, totalWinnings}) => {
    return (
        <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex items-center justify-center">
            <div className=" rounded-lg text-white border border-white/20 bg-white/5 backdrop-blur-lg shadow-2xl p-8 text-center max-w-md">
                <h1 className="text-3xl font-bold text-red-600 mb-4">😥 You Quit!</h1>
                {/* <p className="text-xl mb-4">Wrong Answer!</p> */}
                <p className="text-lg mb-2">Correct Answer: {currentQuestion.options[currentQuestion.correctAnswer]}</p>
                <p className="text-xl font-bold text-green-500 mb-6">Total Winnings: ₹{totalWinnings.toLocaleString()}</p>
                <button
                    onClick={resetGame}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go to Home
                </button>
            </div>
        </div>
    )
}

export default Quit
