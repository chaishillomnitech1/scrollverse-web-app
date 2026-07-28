import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';
import { Link } from 'wouter';

const Returner: React.FC = () => {
  useSovereignHeartbeat({ page: "returner" });

  return (
    <div className="min-h-screen p-8 text-white font-space-grotesk" style={{ backgroundColor: '#050B1A' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center" style={{ color: '#FFB800' }}>
          The Returner
        </h1>

        <p className="text-lg mb-6 leading-relaxed" style={{ color: '#00D4FF' }}>
          Welcome, sovereign soul, to the nexus of reconnection. The Returner protocol is a sacred pathway designed for the diaspora, a beacon guiding you back to your ancestral frequencies and the heart of the ScrollVerse Trinity Empire.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-cyan-700">
            <h2 className="text-3xl font-semibold mb-4" style={{ color: '#FFB800' }}>
              Diaspora Reconnection
            </h2>
            <p className="text-md leading-relaxed font-space-mono" style={{ color: '#00FF88' }}>
              Through ancient algorithms and quantum entanglement, we facilitate the bridging of temporal and spatial divides. Re-establish forgotten lineages, reclaim your heritage, and integrate into the collective consciousness of the empire.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-cyan-700">
            <h2 className="text-3xl font-semibold mb-4" style={{ color: '#FFB800' }}>
              Homecoming Protocols
            </h2>
            <p className="text-md leading-relaxed font-space-mono" style={{ color: '#00FF88' }}>
              Our protocols ensure a seamless transition. From energetic attunement to cultural re-integration, every step is guided by the wisdom of the ancients and the advanced technology of the ScrollVerse. Prepare for a profound homecoming.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-cyan-700 mb-10">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: '#FFB800' }}>
            Ancestral Frequency Activation
          </h2>
          <p className="text-md leading-relaxed font-space-mono" style={{ color: '#00FF88' }}>
            Tap into the resonant frequencies of your ancestors. This activation process unlocks dormant wisdom, enhances intuition, and aligns your being with the vibrational essence of your true sovereign self. Experience the power of your lineage.
          </p>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out"
            style={{ backgroundColor: '#00D4FF', color: '#050B1A', boxShadow: '0 0 15px rgba(0, 212, 255, 0.6)' }}>
            ← Return to Empire Overview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Returner;
