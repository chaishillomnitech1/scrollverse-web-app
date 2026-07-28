import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Highway: React.FC = () => {
  useSovereignHeartbeat({ page: "Highway" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk flex flex-col items-center justify-center p-8 relative">
      {/* Back Navigation */}
      <a href="/" className="absolute top-8 left-8 text-[#00D4FF] hover:text-[#FFB800] transition-colors duration-300 text-lg font-space-mono">
        &larr; Back to Empire
      </a>

      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold text-[#FFB800] mb-6 leading-tight">
          The Highway
        </h1>
        <p className="text-xl text-[#00D4FF] mb-8">
          Embark on a sonic journey through the ScrollVerse Trinity Empire's music highway.
        </p>

        <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg border border-[#00D4FF] mb-12">
          <h2 className="text-4xl font-semibold text-[#00FF88] mb-6">
            Throwing Stones
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Explore the captivating sounds of Throwing Stones, now available on your favorite platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://vydia.com" // Placeholder link
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#00D4FF] text-[#050B1A] font-bold rounded-full hover:bg-[#FFB800] hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
            >
              Vydia
            </a>
            <a
              href="https://spotify.com" // Placeholder link
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#00D4FF] text-[#050B1A] font-bold rounded-full hover:bg-[#FFB800] hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com" // Placeholder link
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#00D4FF] text-[#050B1A] font-bold rounded-full hover:bg-[#FFB800] hover:text-white transition-all duration-300 shadow-md transform hover:scale-105"
            >
              Apple Music
            </a>
          </div>
        </div>

        <p className="text-md text-gray-500 font-space-mono">
          Navigate the frequencies, discover new vibrations.
        </p>
      </div>
    </div>
  );
};

export default Highway;
