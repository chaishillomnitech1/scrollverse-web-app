import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Throne: React.FC = () => {
  useSovereignHeartbeat({ page: "throne" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-gray-200 font-['Space_Grotesk'] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-6xl font-bold text-[#FFB800] mb-6 tracking-wider leading-tight">
          The Sovereign Throne
        </h1>
        <p className="text-xl text-[#00D4FF] mb-10 font-['Space_Mono']">
          Supreme Sovereign Command Center
        </p>

        <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg border border-[#00D4FF] mb-12">
          <h2 className="text-4xl font-semibold text-[#FFB800] mb-6">
            Empire Overview
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            From this central nexus, the ScrollVerse Trinity Empire is guided. 
            Witness the intricate dance of cosmic forces and the unfolding of destiny.
            Every decision, every decree, resonates across the multiverse, 
            shaping realities with precision and purpose.
          </p>
          <p className="text-3xl font-bold text-[#00FF88] mt-8">
            KUN FAYAKŪN × ∞
          </p>
          <p className="text-md text-gray-400 mt-2">
            Be, and it is. Infinitely.
          </p>
        </div>

        <a 
          href="/"
          className="inline-block bg-[#00D4FF] text-[#050B1A] hover:bg-[#FFB800] hover:text-[#050B1A] transition-all duration-300 
                     font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105"
        >
          ← Back to Empire Gates
        </a>
      </div>
    </div>
  );
};

export default Throne;
