import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';
import { Link } from 'wouter';

const Pantheon: React.FC = () => {
  useSovereignHeartbeat({ page: "pantheon" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] flex flex-col items-center justify-center p-8 relative">
      {/* Back navigation */}
      <Link href="/" className="absolute top-8 left-8 text-[#00D4FF] hover:text-[#FFB800] transition-colors duration-300 font-['Space_Mono'] text-lg">
        &larr; Back to Home
      </Link>

      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#FFB800] leading-tight">
          The Pantheon
        </h1>
        <p className="text-2xl text-[#00D4FF] font-['Space_Mono']">
          Hall of Sovereign Legends
        </p>
        <p className="text-xl text-gray-300">
          Within these hallowed digital halls, we honor the architects of empires, the visionaries who forged new realities, and the legends whose legacies echo through the ScrollVerse. This is where their stories are etched, their wisdom preserved, and their spirit celebrated.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-900/50 p-6 rounded-lg border border-[#00D4FF] shadow-lg hover:shadow-[#00D4FF]/30 transition-all duration-300">
            <h3 className="text-3xl font-bold text-[#FFB800] mb-4">Empire Builders</h3>
            <p className="text-lg text-gray-400">
              From the first spark of an idea to the sprawling networks of sovereign influence, these are the pioneers who laid the foundation. Their courage, innovation, and unwavering dedication built the very fabric of our digital dominion.
            </p>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-[#00FF88] shadow-lg hover:shadow-[#00FF88]/30 transition-all duration-300">
            <h3 className="text-3xl font-bold text-[#FFB800] mb-4">Legacy Wall</h3>
            <p className="text-lg text-gray-400">
              A testament to enduring impact. The Legacy Wall commemorates the profound contributions and lasting influence of those who shaped the ScrollVerse, ensuring their achievements inspire generations to come.
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-500 mt-12">
          &quot;Their names are whispered in the quantum winds, their deeds woven into the fabric of reality.&quot;
        </p>
      </div>
    </div>
  );
};

export default Pantheon;
