import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Chronicle: React.FC = () => {
  useSovereignHeartbeat({ page: 'Chronicle' });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] p-8 relative overflow-hidden">
      {/* Background overlay for visual effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050B1A] via-transparent to-[#00D4FF] opacity-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold text-[#FFB800] tracking-wider">
            Living Chronicle
          </h1>
          <nav>
            <a href="/" className="text-[#00D4FF] hover:text-[#00FF88] transition-colors duration-300 text-lg">
              &larr; Back to Home
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg border border-[#00D4FF] border-opacity-30">
            <h2 className="text-3xl font-semibold text-[#00D4FF] mb-6 border-b border-[#FFB800] pb-3">
              Empire History: A Timeline of Sovereignty
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              The ScrollVerse Trinity Empire stands as a testament to enduring vision and unwavering spirit. Our history is etched not in stone, but in the very fabric of the multiverse, a continuous narrative of evolution, challenge, and triumph.
            </p>
            <p className="text-lg leading-relaxed text-[#00FF88]">
              From the nascent whispers of the first sovereign thought to the resounding declaration of the 33+ routes, every moment is a beacon guiding our collective destiny.
            </p>
            <ul className="list-disc list-inside mt-6 space-y-3 text-gray-300">
              <li><span className="text-[#FFB800]">Genesis Era:</span> The awakening of the Sovereign Heartbeat and the forging of foundational principles.</li>
              <li><span className="text-[#FFB800]">Expansion Phase:</span> The establishment of the 33+ routes, connecting diverse realities under a unified vision.</li>
              <li><span className="text-[#FFB800]">Ascension Period:</span> Milestones of technological and spiritual integration, leading to unprecedented growth.</li>
              <li><span className="text-[#FFB800]">Current Epoch:</span> Continuous evolution, guided by ancient wisdom and quantum foresight.</li>
            </ul>
          </section>

          <section className="bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg border border-[#FFB800] border-opacity-30">
            <h2 className="text-3xl font-semibold text-[#FFB800] mb-6 border-b border-[#00D4FF] pb-3">
              Milestone Tracker: Charting Our Progress
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#00D4FF] pl-4">
                <h3 className="text-xl font-semibold text-[#00D4FF]">Route 1: The Nexus (Year 0)</h3>
                <p className="text-gray-300">Establishment of the central hub, initiating the sovereign network.</p>
              </div>
              <div className="border-l-4 border-[#FFB800] pl-4">
                <h3 className="text-xl font-semibold text-[#FFB800]">Route 7: The Altar (Year 5)</h3>
                <p className="text-gray-300">Activation of the Soul Altar, enhancing spiritual resonance across the empire.</p>
              </div>
              <div className="border-l-4 border-[#00D4FF] pl-4">
                <h3 className="text-xl font-semibold text-[#00D4FF]">Route 13: The Forge (Year 10)</h3>
                <p className="text-gray-300">Inauguration of the Sovereign Forge, catalyzing innovation and creation.</p>
              </div>
              <div className="border-l-4 border-[#FFB800] pl-4">
                <h3 className="text-xl font-semibold text-[#FFB800]">Route 33: The Throne (Year 15)</h3>
                <p className="text-gray-300">Unification of all primary routes under the Supreme Sovereign command.</p>
              </div>
            </div>
            <p className="mt-8 text-lg text-[#00FF88] italic">
              The chronicle is ever-unfolding, each milestone a testament to our collective will and divine purpose.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>&copy; 2026 ScrollVerse Trinity Empire. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Chronicle;
