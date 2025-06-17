import React, { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';

const ChatBotSidebar = ({ currentQuestion, isOpen, onClose, sendMessage, setIsTimerPaused}) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [timer, setTimer] = useState(60);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (currentQuestion) {
            const formattedMessage = `Q: ${currentQuestion.question}\nOptions:\n${currentQuestion.options.map(
                (opt, i) => `  ${opt}`
            ).join('\n')} `;
            setUserInput(formattedMessage);
        }
    }, [currentQuestion]);

    useEffect(() => {
        if (isOpen && timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
        else {
            setTimeout(() => {
                onClose();
                setIsTimerPaused(false)
            }, 1000);
        }

    }, [isOpen, timer]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!userInput.trim()) return;
        const userMsg = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMsg]);
        setUserInput('');

        const aiText = await sendMessage(userInput);
        const aiMsg = { sender: 'bot', text: aiText || 'Sorry, I didn’t understand that.' };
        setMessages(prev => [...prev, aiMsg]);
    };

    return (
        <>
            <div
                onClick={() => {setIsTimerPaused(false); onClose(); }}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            ></div>
            <div
                className={`fixed top-0 right-0 h-screen w-full max-w-sm bg-gradient-to-b from-[#111] to-[#222] shadow-lg z-50 transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-600 relative">
                    <h2 className="text-white font-bold text-lg">ChatBot</h2>
                    <div className="absolute left-1/2 -translate-x-1/2 text-yellow-400 font-mono text-sm">
                        ⏳ {timer}s
                    </div>
                    <button onClick={() => {setIsTimerPaused(false); onClose(); } }>
                        <X className="text-white w-5 h-5 hover:text-red-500 transition" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-white">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-[75%] px-4 py-2 rounded-lg ${msg.sender === 'user'
                                    ? 'bg-blue-600 self-end ml-auto text-left'
                                    : 'bg-gray-700 self-start text-left'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Footer - Input Area */}
                <div className="flex items-center gap-2 border-t border-gray-600 px-3 py-2 mb-20 md:mb-3">
                    <input
                        type="text"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        placeholder="Ask your friend..."
                        className="flex-1 px-3 py-2 rounded bg-[#333] text-white focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition"
                    >
                        <Send className="text-white w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatBotSidebar;
