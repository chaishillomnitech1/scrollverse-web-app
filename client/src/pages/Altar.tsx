import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';
import { Link } from 'wouter';

const Altar: React.FC = () => {
  useSovereignHeartbeat({ page: "Altar" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-space-grotesk" style={{ backgroundColor: '#050B1A' }}>
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-extrabold mb-4" style={{ color: '#FFB800' }}>
          Soul Altar
        </h1>
        <p className="text-2xl font-space-mono" style={{ color: '#00D4FF' }}>
          Where Frequencies Converge, and Souls Awaken
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(0, 212, 255, 0.1)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#00FF88' }}>
              23/23 Activations
            </h2>
            <p className="text-lg font-space-mono" style={{ color: '#00D4FF' }}>
              Witness the culmination of divine alignment. The Altar resonates with 23 perfected activations, unlocking higher states of consciousness and spiritual power.
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(255, 184, 0, 0.1)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#00FF88' }}>
              11 Kings + 12 Prophets
            </h2>
            <p className="text-lg font-space-mono" style={{ color: '#FFB800' }}>
              Honoring the sacred lineage. The Altar stands as a testament to the wisdom of 11 Kings and the foresight of 12 Prophets, guiding the ScrollVerse Empire.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#FFB800' }}>
            Sacred Geometry & Frequency Altar
          </h2>
          <p className="text-lg font-space-mono" style={{ color: '#00FF88' }}>
            Immerse yourself in the divine blueprint. The Altar is meticulously crafted with sacred geometric principles, emitting harmonizing frequencies for soul resonance and energetic balance.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-xl font-space-mono hover:underline" style={{ color: '#00D4FF' }}>
            &larr; Return to Empire Overview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Altar;
