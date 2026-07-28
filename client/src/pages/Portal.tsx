import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Portal: React.FC = () => {
  useSovereignHeartbeat({ page: "portal" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Grid/Effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-10 gap-4 p-8">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-[#00D4FF] rounded-full animate-pulse-slow" style={{ animationDelay: `${i * 0.05}s` }}></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-[#FFB800] mb-6 leading-tight tracking-wider">
          The Sovereign Portal
        </h1>
        <p className="text-xl text-[#00FF88] mb-8 font-space-mono">
          Interdimensional Gateway to the Multiverse
        </p>

        <div className="bg-gradient-to-br from-[#00D4FF]/20 to-[#FFB800]/20 p-8 rounded-3xl shadow-2xl border border-[#00D4FF] backdrop-blur-sm">
          <p className="text-lg text-gray-200 mb-6">
            Step through the veil and navigate the infinite tapestry of realities. The Sovereign Portal offers unparalleled access to interdimensional pathways, allowing you to explore new realms, uncover ancient wisdom, and shape your destiny across the multiverse.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-[#00D4FF]/10 rounded-xl border border-[#00D4FF] shadow-lg">
              <h3 className="text-2xl font-semibold text-[#FFB800] mb-2">Multiverse Access</h3>
              <p className="text-gray-300">Unlock pathways to countless dimensions and alternate timelines.</p>
            </div>
            <div className="p-4 bg-[#FFB800]/10 rounded-xl border border-[#FFB800] shadow-lg">
              <h3 className="text-2xl font-semibold text-[#00D4FF] mb-2">Reality Navigation</h3>
              <p className="text-gray-300">Master the art of traversing realities with precision and purpose.</p>
            </div>
            <div className="p-4 bg-[#00FF88]/10 rounded-xl border border-[#00FF88] shadow-lg">
              <h3 className="text-2xl font-semibold text-[#FFB800] mb-2">Interdimensional Travel</h3>
              <p className="text-gray-300">Experience seamless transitions between cosmic planes.</p>
            </div>
          </div>
          <button className="bg-[#00D4FF] hover:bg-[#00FF88] text-[#050B1A] font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Activate Quantum Jump
          </button>
        </div>

        <div className="mt-12">
          <a href="/" className="text-[#00D4FF] hover:text-[#FFB800] transition duration-300 ease-in-out text-lg font-space-mono flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Return to Nexus
          </a>
        </div>
      </div>
    </div>
  );
};

export default Portal;
