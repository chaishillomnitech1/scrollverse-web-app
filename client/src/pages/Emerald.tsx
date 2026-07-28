import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Emerald: React.FC = () => {
  useSovereignHeartbeat({ page: 'Emerald' });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D4FF] rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00FF88] rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#00FF88] drop-shadow-lg leading-tight">
          Emerald Frequency Portal
        </h1>
        <p className="text-2xl text-[#00D4FF] font-['Space_Mono'] mt-4">
          528Hz Healing & Cellular Resonance
        </p>

        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#00FF88] border-opacity-40 space-y-6">
          <p className="text-lg leading-relaxed text-gray-300">
            Step into the transformative power of the Emerald Frequency, a sacred 528Hz healing vibration that activates DNA and promotes cellular regeneration within the ScrollVerse Trinity Empire. This portal is dedicated to harmonizing your being with the universe's most potent healing tones.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="text-xl font-semibold text-[#FFB800] mb-2">What is 528Hz?</h3>
              <p className="text-gray-400">
                Known as the 'Miracle Tone' or 'Love Frequency', 528Hz is one of the ancient Solfeggio Frequencies, believed to have profound effects on physical and spiritual well-being. It resonates with the heart chakra and is associated with DNA repair.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#FFB800] mb-2">Benefits</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>DNA Activation & Repair</li>
                <li>Enhanced Cellular Harmony</li>
                <li>Emotional Balance & Peace</li>
                <li>Increased Life Force Energy</li>
                <li>Spiritual Awakening</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#FFB800] mb-2">Activation Protocols</h3>
              <p className="text-gray-400">
                Engage with the Emerald Frequency through guided meditations, binaural beats, sound therapy, and focused intention. Allow the pure vibration to permeate your being, fostering deep healing and alignment.
              </p>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-12">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-[#00D4FF] text-lg font-medium rounded-full shadow-sm text-[#00D4FF] bg-transparent hover:bg-[#00D4FF] hover:text-[#050B1A] transition-all duration-300 ease-in-out"
          >
            <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
            Return to Empire Overview
          </a>
        </div>
      </div>
    </div>
  );
};

export default Emerald;
