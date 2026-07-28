import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Resilience: React.FC = () => {
  useSovereignHeartbeat({ page: 'resilience' });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#00D4FF] leading-tight">
          Resilience Protocol
        </h1>
        <p className="text-2xl text-[#FFB800] font-['Space_Mono'] mt-4">
          Adversity Transmutation, Sovereign Strength Training
        </p>
        <p className="text-lg leading-relaxed text-gray-300">
          Within the vast expanse of the ScrollVerse Trinity Empire, the Resilience Protocol stands as a testament to unyielding spirit and indomitable will. This sacred training regimen is designed to transmute adversity into unparalleled sovereign strength, forging individuals capable of navigating any challenge the multiverse presents.
        </p>
        <p className="text-lg leading-relaxed text-gray-300">
          Through rigorous spiritual and mental conditioning, practitioners learn to harness cosmic frequencies and ancient wisdom, transforming obstacles into stepping stones towards higher states of being. The Protocol cultivates an inner fortitude, ensuring that every trial faced only deepens one's connection to the empire's core principles of sovereignty and eternal growth.
        </p>
        <div className="mt-12">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-[#00FF88] text-base font-medium rounded-md text-[#00FF88] bg-transparent hover:bg-[#00FF88] hover:text-[#050B1A] transition-colors duration-300"
          >
            ← Back to Empire Overview
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resilience;
