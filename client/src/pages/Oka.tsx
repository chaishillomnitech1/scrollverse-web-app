import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Oka: React.FC = () => {
  useSovereignHeartbeat({ page: "oka" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#00D4FF] drop-shadow-glow-cyan mb-4">
          OKA Protocol
        </h1>
        <p className="text-2xl text-[#FFB800] font-space-mono leading-relaxed">
          Omniversal Knowledge Archive
        </p>
        <p className="text-lg text-gray-300 leading-loose">
          Dive into the confluence of ancient wisdom and quantum science. The OKA Protocol serves as the foundational repository for all knowledge within the ScrollVerse Trinity Empire, meticulously cataloging insights from across dimensions and epochs. Here, the echoes of forgotten civilizations merge with the cutting-edge theories of quantum reality, forging a holistic understanding of existence.
        </p>
        <div className="border-t-2 border-[#00FF88] pt-8 mt-8">
          <h2 className="text-4xl font-bold text-[#00FF88] mb-4">Fusion of Eras</h2>
          <p className="text-lg text-gray-300 leading-loose">
            From the esoteric texts of Atlantean scholars to the advanced algorithms of future AI, every piece of information is harmonized and made accessible. Explore the interconnectedness of all things, unravel the mysteries of the cosmos, and empower your journey through enlightened understanding.
          </p>
        </div>
        <a href="/" className="mt-12 inline-block px-8 py-3 border-2 border-[#00D4FF] text-[#00D4FF] font-bold text-lg rounded-full hover:bg-[#00D4FF] hover:text-[#050B1A] transition-all duration-300 shadow-lg hover:shadow-cyan-glow">
          ← Back to Empire Overview
        </a>
      </div>
    </div>
  );
};

export default Oka;
