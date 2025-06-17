// MoneyLadder.jsx
import React from 'react';
import { X } from 'lucide-react';
import Navbar from './Navbar';
const ladderData = [

  { id: 16, amount: '₹7,00,00,000' },
  { id: 15, amount: '₹1,00,00,000' },
  { id: 14, amount: '₹50,00,000' },
  { id: 13, amount: '25,00,000' },
  { id: 12, amount: '₹12,50,000' },
  { id: 11, amount: '₹6,40,000' },
  { id: 10, amount: '₹3,20,000' },
  { id: 9, amount: '₹1,60,000' },
  { id: 8, amount: '₹80,000' },
  { id: 7, amount: '₹40,000' },
  { id: 6, amount: '₹20,000' },
  { id: 5, amount: '₹10,000' },
  { id: 4, amount: '₹5,000' },
  { id: 3, amount: '₹3,000' },
  { id: 2, amount: '₹2,000' },
  { id: 1, amount: '₹1,000' },
];

const MoneyLadder = ({ isOpen, onClose, currentQuestion }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      ></div>
      {/* Ladder Panel */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] p-4 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#111] to-[#222] p-4 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}> */}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-400">Money Ladder</h2>
          <button
            onClick={onClose}
            className="text-white cursor-pointer hover:text-red-500 transition"
            aria-label="Close Ladder"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {ladderData.map((item) => (
            (currentQuestion.id == item.id) ? (
              <li
                key={item.id}
                className=" text-white bg-yellow-500 px-4 py-2 rounded-md transition text-sm"
              >
                <span className="font-bold mr-2">{item.id}.</span> {item.amount}
              </li>
            ) : (
              <li
                key={item.id}
                className=" text-white px-4 py-2 rounded-md transition text-sm"
              >
                <span className="font-bold mr-2">{item.id}.</span> {item.amount}
              </li>
            )
          ))}
        </ul>
      </div>
    </>
  );
};

export default MoneyLadder;
