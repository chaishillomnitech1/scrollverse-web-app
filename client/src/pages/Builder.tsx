import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';
import { Link } from 'wouter'; // Assuming Next.js for Link component

const Builder: React.FC = () => {
  useSovereignHeartbeat({ page: "Builder" });

  return (
    <div className="min-h-screen p-8 text-white font-space-grotesk" style={{ backgroundColor: '#050B1A' }}>
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <h1 className="text-5xl font-bold mb-6 text-gold-400 leading-tight">
          Empire Builder
        </h1>
        <p className="text-xl mb-12 text-green-400 font-space-mono">
          Tools, templates, and guides for forging sovereign digital empires.
        </p>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Section 1: Tools */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-cyan-700">
            <h2 className="text-3xl font-semibold mb-4 text-cyan-400">Sovereign Tools</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li><span className="text-gold-300">Architect's Compass:</span> Blueprinting your digital domain.</li>
              <li><span className="text-gold-300">Quantum Ledger:</span> Secure asset management and tracking.</li>
              <li><span className="text-gold-300">Aetheric Weave:</span> Seamless integration across platforms.</li>
              <li><span className="text-gold-300">Resonance Engine:</span> Optimizing for maximum impact and reach.</li>
            </ul>
          </div>

          {/* Section 2: Templates */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-green-700">
            <h2 className="text-3xl font-semibold mb-4 text-green-400">Empire Templates</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li><span className="text-gold-300">Foundational Frameworks:</span> Kickstart your projects with robust structures.</li>
              <li><span className="text-gold-300">Ascension Blueprints:</span> Scalable designs for rapid growth.</li>
              <li><span className="text-gold-300">Cultural Canvases:</span> Crafting unique identities for your empire.</li>
              <li><span className="text-gold-300">Governance Models:</span> Establishing order and prosperity.</li>
            </ul>
          </div>

          {/* Section 3: Guides */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gold-700 col-span-full">
            <h2 className="text-3xl font-semibold mb-4 text-gold-400">Mastery Guides</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li><span className="text-cyan-300">The Sovereign's Handbook:</span> A comprehensive guide to digital empire building.</li>
              <li><span className="text-cyan-300">Manifestation Protocols:</span> Turning vision into reality.</li>
              <li><span className="text-cyan-300">Interdimensional Commerce:</span> Expanding your reach beyond the known.</li>
              <li><span className="text-cyan-300">Legacy Preservation:</span> Ensuring your empire endures through time.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm font-space-mono">
          &copy; 2026 ScrollVerse Trinity Empire. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Builder;
