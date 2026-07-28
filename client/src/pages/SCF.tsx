import React from 'react';
import { Link } from 'wouter';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const SCF: React.FC = () => {
  useSovereignHeartbeat({ page: "scf" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] p-8 relative overflow-hidden">
      {/* Background Grid/Pattern for visual stunning effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#FFB800] mb-4 leading-tight">
            Sovereign Community Fund
          </h1>
          <p className="text-xl text-[#00D4FF] font-['Space_Mono']">
            Empowering the ScrollVerse through collective prosperity.
          </p>
        </header>

        <section className="mb-12 bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg border border-[#00D4FF] border-opacity-30">
          <h2 className="text-4xl font-semibold text-[#00FF88] mb-6 text-center">
            Zakat Distribution
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            The Sovereign Community Fund meticulously manages and distributes Zakat, a foundational pillar of our collective well-being. Our transparent system ensures that contributions reach those most in need, fostering economic justice and spiritual growth across the ScrollVerse. Every act of giving strengthens the fabric of our empire.
          </p>
          <div className="flex justify-center">
            <span className="text-2xl font-bold text-[#FFB800] border-b-2 border-[#FFB800] pb-1">
              Guided by Divine Principles
            </span>
          </div>
        </section>

        <section className="mb-12 bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg border border-[#FFB800] border-opacity-30">
          <h2 className="text-4xl font-semibold text-[#00D4FF] mb-6 text-center">
            Community Grants
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Beyond Zakat, the SCF provides strategic community grants to initiatives that align with the ScrollVerse's vision of sovereignty and innovation. These grants empower builders, creators, and visionaries to manifest projects that benefit the entire ecosystem, from technological advancements to cultural preservation.
          </p>
          <div className="flex justify-center">
            <span className="text-2xl font-bold text-[#00FF88] border-b-2 border-[#00FF88] pb-1">
              Fueling Innovation & Growth
            </span>
          </div>
        </section>

        <section className="mb-12 bg-gray-900 bg-opacity-50 p-8 rounded-lg shadow-lg border border-[#00FF88] border-opacity-30">
          <h2 className="text-4xl font-semibold text-[#FFB800] mb-6 text-center">
            7.77% Flow Tracker
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Experience unparalleled transparency with our 7.77% Flow Tracker. This real-time system monitors the flow of resources within the SCF, ensuring accountability and demonstrating the tangible impact of every contribution. Witness the dynamic energy of our collective wealth building the future.
          </p>
          <div className="flex justify-center">
            <span className="text-2xl font-bold text-[#00D4FF] border-b-2 border-[#00D4FF] pb-1">
              Transparency in Every Transaction
            </span>
          </div>
        </section>

        <div className="text-center mt-16">
          <Link href="/" className="inline-block bg-[#00D4FF] text-[#050B1A] px-8 py-3 rounded-full text-lg font-bold hover:bg-[#FFB800] transition-colors duration-300 shadow-lg">
            ← Return to Command Center
          </Link>
        </div>
      </div>

      {/* Inline style for custom background pattern - for visual stunning effect */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0, 212, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default SCF;
