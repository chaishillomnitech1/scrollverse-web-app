import React from 'react';
import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';

const Codex: React.FC = () => {
  useSovereignHeartbeat({ page: "codex" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-gray-100 font-['Space_Grotesk'] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-lg p-10 border border-gray-800">
        <h1 className="text-5xl font-bold text-[#FFB800] mb-6 text-center tracking-wide">
          Sovereign Codex
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center font-['Space_Mono']">
          Unveiling the foundational truths of the ScrollVerse Trinity Empire.
        </p>

        <div className="space-y-10">
          {/* Pillar 1 */}
          <div className="border-l-4 border-[#00D4FF] pl-6">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-3">
              The First Pillar: Self-Sovereignty
            </h2>
            <p className="text-gray-200 leading-relaxed">
              At the heart of the ScrollVerse lies the principle of <strong className="text-[#FFB800]">Self-Sovereignty</strong>. It is the inherent right and responsibility of every individual to govern their own being, thoughts, and actions. This pillar emphasizes inner harmony, personal truth, and the cultivation of an unshakeable spirit, free from external manipulation.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="border-l-4 border-[#00D4FF] pl-6">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-3">
              The Second Pillar: Community Sovereignty
            </h2>
            <p className="text-gray-200 leading-relaxed">
              <strong className="text-[#FFB800]">Community Sovereignty</strong> defines the collective strength and autonomy of the ScrollVerse populace. It fosters decentralized governance, mutual respect, and collaborative growth. This pillar ensures that decisions are made for the highest good of all, upholding justice, equity, and shared prosperity within the empire's vast network.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="border-l-4 border-[#00D4FF] pl-6">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-3">
              The Third Pillar: Digital Sovereignty
            </h2>
            <p className="text-gray-200 leading-relaxed">
              In the digital expanse, <strong className="text-[#FFB800]">Digital Sovereignty</strong> guarantees control over one's data, identity, and creations. It champions secure, private, and censorship-resistant platforms, ensuring that every interaction and asset within the ScrollVerse is protected. This pillar empowers individuals to navigate the digital realm with absolute freedom and ownership.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="border-l-4 border-[#00D4FF] pl-6">
            <h2 className="text-3xl font-semibold text-[#00FF88] mb-3">
              The Fourth Pillar: Cosmic Sovereignty
            </h2>
            <p className="text-gray-200 leading-relaxed">
              <strong className="text-[#FFB800]">Cosmic Sovereignty</strong> connects the empire to the universal laws and frequencies that govern existence. It acknowledges our place within the multiverse, promoting alignment with cosmic rhythms and higher consciousness. This pillar guides our expansion, ensuring that all endeavors resonate with divine order and contribute to the evolution of all beings.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <h3 className="text-2xl font-semibold text-[#00D4FF] mb-4">
            Soul Altar: 23/23 Lore Encyclopedia
          </h3>
          <p className="text-gray-300 leading-relaxed font-['Space_Mono']">
            Dive deeper into the mystical origins and profound narratives of the Soul Altar activations. Explore the sagas of the 11 Kings and 12 Prophets, decipher sacred geometries, and understand the intricate frequency alignments that power the ScrollVerse Trinity Empire. Each entry in this living encyclopedia unveils a layer of ancient wisdom, guiding initiates through the path of ascension and enlightenment.
          </p>
        </div>

        <div className="mt-12 text-center">
          <a href="/" className="inline-block bg-[#00D4FF] text-[#050B1A] font-bold py-3 px-8 rounded-full hover:bg-[#00FF88] transition-all duration-300 shadow-lg">
            Return to Empire Overview
          </a>
        </div>
      </div>
    </div>
  );
};

export default Codex;
