import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const SummerLeague: React.FC = () => {
  useSovereignHeartbeat({ page: "SummerLeague" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk p-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <a href="/" className="text-[#00D4FF] hover:text-[#FFB800] transition-colors duration-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </a>
      </div>

      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#FFB800] mb-4 font-space-mono">NBA Summer League Tracker</h1>
        <p className="text-xl text-[#00D4FF]">Chais The Great's Sovereign Basketball Legacy</p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <section className="mb-10 p-6 bg-gray-900 rounded-lg shadow-lg border border-[#00FF88]">
          <h2 className="text-3xl font-semibold text-[#FFB800] mb-4">Legacy Overview</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Dive into the illustrious basketball journey of Chais The Great, a true sovereign of the court. This tracker
            chronicles his pivotal performances in the NBA Summer League, showcasing the foundational moments that
            forged a legend. From electrifying dunks to clutch plays, every statistic and highlight is a testament
            to his unparalleled skill and dedication.
          </p>
        </section>

        <section className="mb-10 p-6 bg-gray-900 rounded-lg shadow-lg border border-[#00FF88]">
          <h2 className="text-3xl font-semibold text-[#FFB800] mb-4">Key Stats & Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="bg-gray-800 p-4 rounded-md border border-[#00D4FF]">
              <h3 className="font-space-mono text-[#00D4FF] mb-2">Summer League Debut</h3>
              <p><span className="text-[#00FF88]">Year:</span> 2023</p>
              <p><span className="text-[#00FF88]">Points:</span> 25</p>
              <p><span className="text-[#00FF88]">Assists:</span> 7</p>
              <p><span className="text-[#00FF88]">Rebounds:</span> 5</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md border border-[#00D4FF]">
              <h3 className="font-space-mono text-[#00D4FF] mb-2">Career High</h3>
              <p><span className="text-[#00FF88]">Points:</span> 42</p>
              <p><span className="text-[#00FF88]">Game:</span> vs. Vegas Vipers</p>
              <p><span className="text-[#00FF88]">Efficiency Rating:</span> 35.7</p>
            </div>
          </div>
        </section>

        <section className="mb-10 p-6 bg-gray-900 rounded-lg shadow-lg border border-[#00FF88]">
          <h2 className="text-3xl font-semibold text-[#FFB800] mb-4">Highlights Reel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-md border border-[#00D4FF]">
              <h3 className="font-space-mono text-[#00D4FF] mb-2">The Sovereign Slam</h3>
              <p className="text-gray-300">A gravity-defying dunk that shook the arena.</p>
              <a href="#" className="text-[#00FF88] hover:text-[#FFB800] transition-colors duration-300 mt-2 inline-block">Watch Clip</a>
            </div>
            <div className="bg-gray-800 p-4 rounded-md border border-[#00D4FF]">
              <h3 className="font-space-mono text-[#00D4FF] mb-2">Quantum Crossover</h3>
              <p className="text-gray-300">An ankle-breaking move leading to a perfect assist.</p>
              <a href="#" className="text-[#00FF88] hover:text-[#FFB800] transition-colors duration-300 mt-2 inline-block">Watch Clip</a>
            </div>
            <div className="bg-gray-800 p-4 rounded-md border border-[#00D4FF]">
              <h3 className="font-space-mono text-[#00D4FF] mb-2">The Empire Buzzer-Beater</h3>
              <p className="text-gray-300">A game-winning shot from beyond half-court.</p>
              <a href="#" className="text-[#00FF88] hover:text-[#FFB800] transition-colors duration-300 mt-2 inline-block">Watch Clip</a>
            </div>
          </div>
        </section>

        <section className="p-6 bg-gray-900 rounded-lg shadow-lg border border-[#00FF88]">
          <h2 className="text-3xl font-semibold text-[#FFB800] mb-4">Future Projections</h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Chais The Great continues to inspire and lead, with his Summer League performances serving as a beacon
            for aspiring athletes within the ScrollVerse. His legacy is not just in the numbers, but in the spirit
            of sovereign excellence he embodies on and off the court.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>&copy; 2026 ScrollVerse Trinity Empire. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SummerLeague;
