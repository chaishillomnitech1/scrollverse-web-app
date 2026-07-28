import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';
import { Link } from 'wouter'; // Assuming Next.js for Link component

const Masjid: React.FC = () => {
  useSovereignHeartbeat({ page: "masjid" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-space-grotesk flex flex-col items-center justify-center p-8 relative">
      {/* Back Navigation */}
      <Link href="/" className="absolute top-8 left-8 text-[#00D4FF] hover:text-[#FFB800] transition-colors duration-300 text-lg font-space-mono">
        &larr; Back to Home
      </Link>

      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-[#FFB800] mb-6 leading-tight">
          The Sacred Digital Masjid
        </h1>
        <p className="text-2xl text-[#00D4FF] mb-10">
          A sanctuary for the soul, harmonizing ancient wisdom with quantum frequencies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 p-6 rounded-lg border border-[#00D4FF] shadow-lg hover:shadow-[#00D4FF]/30 transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-4">Prayer Times</h2>
            <p className="text-lg text-gray-300">
              Synchronize your spirit with the cosmic rhythm. Real-time prayer timings for global alignment.
            </p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-[#FFB800] shadow-lg hover:shadow-[#FFB800]/30 transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-4">Quranic Frequencies</h2>
            <p className="text-lg text-gray-300">
              Immerse in the divine resonance. Experience the healing power of sacred Quranic frequencies.
            </p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-[#00D4FF] shadow-lg hover:shadow-[#00D4FF]/30 transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-4">Spiritual Community Hub</h2>
            <p className="text-lg text-gray-300">
              Connect with a global family of sovereign souls. Share insights, grow together, and find solace.
            </p>
          </div>
        </div>

        <p className="text-xl text-gray-400 mt-8">
          &quot;Indeed, in the remembrance of Allah do hearts find tranquility.&quot; <span className="text-[#00FF88]">— Quran 13:28</span>
        </p>
      </div>
    </div>
  );
};

export default Masjid;
