import React from 'react';
import { Link } from 'wouter';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Pattern: React.FC = () => {
  useSovereignHeartbeat({ page: "Pattern" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk flex flex-col items-center justify-center p-8">
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-[#00D4FF] hover:text-[#00FF88] transition-colors duration-300 font-space-mono text-lg">
          &larr; Back to Home
        </Link>
      </div>
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-[#FFB800] mb-6 leading-tight">
          The Sovereign Pattern Engine
        </h1>
        <p className="text-xl text-gray-300 mb-8 font-space-mono">
          Dive into the intricate tapestry of existence with the Pattern Engine, a visualizer of the universe's foundational frequencies.
          Witness the harmonious interplay of 963Hz (Pineal Gland Activation), 999Hz (Divine Connection), 741Hz (Problem Solving & Expression),
          and 528Hz (DNA Repair & Miracles) as they manifest the ScrollVerse reality.
        </p>
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-[#00D4FF] transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-[#00D4FF] mb-4">963Hz - Pineal Gland Activation</h2>
            <p className="text-gray-400 font-space-mono">The frequency of divine consciousness and awakening. Experience clarity and heightened perception.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-[#FFB800] transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-[#FFB800] mb-4">999Hz - Divine Connection</h2>
            <p className="text-gray-400 font-space-mono">Connect with the highest spiritual realms. A frequency for universal love and unity.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-[#00FF88] transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-4">741Hz - Problem Solving & Expression</h2>
            <p className="text-gray-400 font-space-mono">Unlock intuitive solutions and foster authentic self-expression. Cleanse and purify.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-[#00D4FF] transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold text-[#00D4FF] mb-4">528Hz - DNA Repair & Miracles</h2>
            <p className="text-gray-400 font-space-mono">The 'Miracle Tone' of love and transformation. Restore balance and vitality at a cellular level.</p>
          </div>
        </div>
        <p className="text-lg text-gray-500 mt-12 font-space-mono">
          Visualize the unseen, understand the fundamental patterns that weave the fabric of reality.
        </p>
      </div>
    </div>
  );
};

export default Pattern;
