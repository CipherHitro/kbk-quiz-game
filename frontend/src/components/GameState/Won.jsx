import React from 'react'

const Won = ({resetGame, totalWinnings}) => {
  return (
    <div className="min-h-screen flex items-center justify-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] ">
        <div className=" rounded-lg text-white border border-white/20 bg-white/5 backdrop-blur-lg shadow-2xl p-8 text-center max-w-md">
          <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Congratulations!</h1>
          <p className="text-xl mb-4">You've won the game!</p>
          <p className="text-2xl font-bold text-green-600 mb-6">Total Winnings: ₹{totalWinnings.toLocaleString()}</p>
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

export default Won
