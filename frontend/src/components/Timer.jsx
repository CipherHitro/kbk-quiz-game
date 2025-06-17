import { CloudCog } from 'lucide-react';
import React from 'react';

const Timer = ({ timer, totalTime = 45}) => {
  // Calculate the progress percentage (for the circular progress)
  const progress = ((totalTime - timer) / totalTime) * 100;
  // Calculate the stroke-dashoffset for the circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-end w-auto">
      <div className="relative">
        {/* Main Timer Container */}
        <div className="timer relative border-2 border-blue-300/20 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 rounded-full p-4 md:p-5 text-center shadow-2xl backdrop-blur-sm min-w-[80px] md:min-w-[100px] overflow-hidden">
          
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full animate-pulse"></div>
          
          {/* Inner Content */}
          <div className="relative z-10">
            {/* <div className="text-blue-200 font-semibold text-xs md:text-sm mb-1 tracking-wider">
              TIMER
            </div> */}
            <div className={`font-bold text-2xl md:text-3xl transition-all py-2 duration-300 ${
              timer <= 10 ? 'text-red-400 animate-pulse' : 
              timer <= 20 ? 'text-yellow-400' : 'text-white'
            }`}>
              {timer}
            </div>
          </div>

          {/* Circular Progress Ring */}
          <svg 
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="3"
              fill="none"
            />
            
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke={timer <= 10 ? '#ef4444' : timer <= 20 ? '#eab308' : '#3b82f6'}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
              style={{
                filter: 'drop-shadow(0 0 6px currentColor)',
              }}
            />
          </svg>

          {/* Corner Decorative Elements */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-ping" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Outer Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse -z-10"></div>
      </div>
    </div>
  );
};

export default Timer;