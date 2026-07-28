import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Equation: React.FC = () => {
  useSovereignHeartbeat({ page: "Equation" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-gray-900 rounded-lg shadow-lg p-10 border border-cyan-700 relative">
        <h1 className="text-5xl font-bold text-center text-[#00D4FF] mb-8 tracking-wider uppercase">
          The Equation
        </h1>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed text-center">
          Within the ScrollVerse Trinity Empire, The Equation represents the foundational principles of sovereign mathematics, frequency formulas, and abundance algorithms. It is the blueprint for manifesting reality and orchestrating cosmic harmony.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#FFB800] mb-3 font-space-mono">Sovereign Mathematics</h2>
            <p className="text-gray-400">Unlocking the universal constants that govern existence, enabling precise manifestation and energetic alignment.</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#00FF88] mb-3 font-space-mono">Frequency Formulas</h2>
            <p className="text-gray-400">Harmonizing vibrational patterns to create desired outcomes, from personal well-being to planetary shifts.</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#00D4FF] mb-3 font-space-mono">Abundance Algorithms</h2>
            <p className="text-gray-400">Designing and implementing protocols for infinite resource flow and prosperity within the empire.</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-[#FFB800] hover:text-[#00D4FF] transition-colors duration-300 text-lg font-space-mono">
            &larr; Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Equation;
