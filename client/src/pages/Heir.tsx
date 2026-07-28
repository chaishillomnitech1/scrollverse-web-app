import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Heir: React.FC = () => {
  useSovereignHeartbeat({ page: "heir" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#FFB800] mb-4 leading-tight">
          The Heir
        </h1>
        <p className="text-xl text-[#00D4FF] mb-8 font-['Space_Mono']">
          Forging the next generation of sovereign leaders for the ScrollVerse Trinity Empire.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-[#00D4FF] transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-3">
              Sovereign Training
            </h2>
            <p className="text-gray-300">
              Comprehensive programs designed to instill the core principles of sovereignty, leadership, and cosmic stewardship.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-[#FFB800] transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-[#00D4FF] mb-3">
              Youth Programs
            </h2>
            <p className="text-gray-300">
              Engaging initiatives for young minds, fostering creativity, critical thinking, and a deep connection to ancestral wisdom.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-[#00FF88] transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-[#FFB800] mb-3">
              Succession Planning
            </h2>
            <p className="text-gray-300">
              Strategic frameworks ensuring a seamless transition of leadership and the enduring legacy of the ScrollVerse Empire.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="inline-block bg-[#00D4FF] text-[#050B1A] hover:bg-[#FFB800] hover:text-[#050B1A] font-bold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg"
          >
            ← Return to Empire
          </a>
        </div>
      </div>
    </div>
  );
};

export default Heir;
