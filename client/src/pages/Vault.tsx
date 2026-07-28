import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Vault: React.FC = () => {
  useSovereignHeartbeat({ page: "vault" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] flex flex-col items-center justify-center p-8">
      {/* Back Navigation */}
      <a href="/" className="absolute top-8 left-8 text-[#00D4FF] hover:text-[#FFB800] transition-colors duration-300 text-lg font-['Space_Mono']">
        &larr; Back to Empire
      </a>

      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#FFB800] tracking-wider mb-4">
          Original Cuts Vault
        </h1>
        <p className="text-xl text-[#00D4FF] font-['Space_Mono'] mb-8">
          A sanctuary of sound, exclusively for the Genesis Passport holders.
        </p>

        <div className="bg-gradient-to-br from-[#2A0F1A] to-[#1A0F2A] p-8 rounded-xl shadow-lg border border-[#FFB800] transform hover:scale-105 transition-transform duration-500">
          <h2 className="text-4xl font-bold text-[#FFB800] mb-4">
            Exclusive Music Archives
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Dive deep into the unreleased and rare sonic tapestries of the ScrollVerse.
            Each track is a fragment of the empire's soul, preserved in pristine quality.
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-xl text-[#FFB800] font-['Space_Mono']">Genesis Passport Required</span>
            <span className="text-xl text-[#00FF88] font-['Space_Mono']">Access Granted</span>
          </div>
        </div>

        <div className="mt-12 text-lg text-gray-400">
          <p>The Vault holds the echoes of creation, a testament to the empire's artistic legacy.</p>
        </div>
      </div>
    </div>
  );
};

export default Vault;
