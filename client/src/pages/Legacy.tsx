import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Legacy: React.FC = () => {
  useSovereignHeartbeat({ page: "legacy" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-6xl font-bold text-[#FFB800] tracking-wider">
          Legacy Portal
        </h1>
        <p className="text-xl text-[#00D4FF] font-['Space_Mono'] leading-relaxed">
          "The foundation of an empire is built not just on stone, but on the enduring spirit of its lineage."
        </p>

        <div className="space-y-6 text-lg">
          <p>
            Welcome to the Legacy Portal, a sacred space dedicated to the profound journey of generational wealth and enduring family lineage within the ScrollVerse Trinity Empire. Here, we honor the foundational pillars that uphold our collective future.
          </p>
          <p>
            At its heart lies the <span className="text-[#FFB800] font-bold">John Richard Hill Foundation Stone</span>, a symbol of unwavering commitment and the bedrock upon which our sovereign principles are established. This stone represents the genesis of a vision, a testament to the power of foresight and dedication.
          </p>
          <p>
            Explore the intricate tapestry of <span className="text-[#00D4FF] font-bold">family lineage</span>, tracing the threads of wisdom, strength, and innovation passed down through generations. It is through this unbroken chain that the true power of the empire flows, ensuring continuity and growth.
          </p>
          <p>
            Our commitment to <span className="text-[#00FF88] font-bold">generational wealth</span> transcends mere material accumulation; it is about cultivating a legacy of knowledge, opportunity, and spiritual abundance that benefits all members of the ScrollVerse. We believe in building not just for today, but for countless tomorrows.
          </p>
        </div>

        <div className="mt-12">
          <a href="/" className="inline-block px-8 py-3 border-2 border-[#00D4FF] text-[#00D4FF] font-bold text-lg uppercase tracking-widest hover:bg-[#00D4FF] hover:text-[#050B1A] transition-all duration-300">
            Return to the Nexus
          </a>
        </div>
      </div>
    </div>
  );
};

export default Legacy;
