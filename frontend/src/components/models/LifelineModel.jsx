import { X } from "lucide-react"; // or use any close icon
import React from "react";

const LifelineModal = ({ onClose, lifelinesUsed, useLifeline }) => {
  const lifelines = [
    { key: "fiftyFifty", label: "50:50", emoji: "➗" },
    { key: "phoneAFriend", label: "Phone a Friend", emoji: "📞" },
    { key: "askExpert", label: "Ask an Expert", emoji: "👨‍🏫" },
    { key: "flipQuestion", label: "Flip Question", emoji: "🔄" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-blue-900 to-purple-800 p-6 rounded-2xl w-96 text-white shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-red-400">
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">🛠 Use a Lifeline</h2>
        <div className="grid grid-cols-2 gap-4">
          {lifelines.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => useLifeline(key)}
              disabled={lifelinesUsed[key]}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border
                ${
                  lifelinesUsed[key]
                    ? "bg-gray-600/40 border-gray-500 cursor-not-allowed opacity-50"
                    : "bg-white/10 border-white/30 hover:bg-white/20"
                } transition`}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifelineModal;
