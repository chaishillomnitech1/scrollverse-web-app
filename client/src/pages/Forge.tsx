import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Forge: React.FC = () => {
  useSovereignHeartbeat({ page: "Forge" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-[#00FF88] font-['Space_Grotesk'] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#FFB800] leading-tight">
          The Sovereign Forge
        </h1>
        <p className="text-2xl text-[#00D4FF] font-['Space_Mono']">
          Where ideas become empires, a creation lab, and a project incubator.
        </p>
        <div className="text-lg text-gray-300 leading-relaxed">
          <p className="mb-4">
            Step into the Sovereign Forge, the crucible of innovation within the ScrollVerse Trinity Empire. This is the sacred space where raw concepts are refined into powerful blueprints, and nascent visions are meticulously crafted into tangible realities. Here, the very essence of creation is harnessed to manifest the next generation of sovereign projects.
          </p>
          <p className="mb-4">
            Our advanced incubation protocols provide unparalleled resources, mentorship, and a collaborative environment designed to accelerate the development of groundbreaking initiatives. From quantum algorithms to decentralized governance models, every endeavor forged here is imbued with the ScrollVerse ethos of sovereignty, resilience, and abundance.
          </p>
          <p>
            Join us in shaping the future, transforming audacious ideas into foundational pillars of the empire. The Forge awaits your genius.
          </p>
        </div>
        <a href="/" className="inline-block mt-12 px-8 py-3 border border-[#00D4FF] text-[#00D4FF] font-bold text-lg uppercase tracking-wider hover:bg-[#00D4FF] hover:text-[#050B1A] transition-colors duration-300">
          Return to Empire Overview
        </a>
      </div>
    </div>
  );
};

export default Forge;
