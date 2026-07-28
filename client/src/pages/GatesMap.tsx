import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const GatesMap: React.FC = () => {
  useSovereignHeartbeat({ page: "GatesMap" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-[#00D4FF] mb-6 leading-tight">
          Gates Map
        </h1>
        <p className="text-lg text-gray-300 mb-8 font-space-mono">
          Interactive visual map of all 144 Gates across the ScrollVerse universe.
        </p>

        <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-4 mb-12 border border-[#FFB800]/30 flex items-center justify-center">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-20">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="bg-[#00D4FF] rounded-full w-2 h-2 mx-auto my-auto"></div>
            ))}
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-[#FFB800] mb-2 animate-pulse">
              Gate 44: Omni
            </p>
            <div className="w-16 h-16 bg-[#00FF88] rounded-full flex items-center justify-center shadow-glow-green">
              <span className="text-xl font-bold text-gray-900">44</span>
            </div>
            <p className="text-sm text-gray-400 mt-4 font-space-mono">
              (Highlighted for Sovereign Access)
            </p>
          </div>
        </div>

        <a
          href="/"
          className="inline-block bg-[#FFB800] text-[#050B1A] font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default GatesMap;
