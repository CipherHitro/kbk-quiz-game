import React from 'react'

const AskExpertModel = ({expertAdvice, setExpertAdvice}) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-blue-900 border border-blue-400 p-6 rounded-xl text-white shadow-lg max-w-md w-full">
                {expertAdvice.type === "confident" ? (
                    <div>
                        <h2 className="text-xl font-bold mb-2">Expert's Opinion</h2>
                        <p className="text-lg">
                            I’m confident the correct answer is{" "}
                            <span className="font-bold text-yellow-400">
                                {String.fromCharCode(65 + expertAdvice.answerIndex)}.
                            </span>
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-2">Expert's Opinion</h2>
                        <p className="text-lg">
                            I’m not 100% sure, but I think it's either{" "}
                            <span className="font-bold text-yellow-400">
                                {String.fromCharCode(65 + expertAdvice.options[0])}
                            </span>{" "}
                            or{" "}
                            <span className="font-bold text-yellow-400">
                                {String.fromCharCode(65 + expertAdvice.options[1])}
                            </span>
                            .
                        </p>
                    </div>
                )}
                <div className="mt-4 text-right">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-black font-semibold"
                        onClick={() => setExpertAdvice(null)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AskExpertModel
