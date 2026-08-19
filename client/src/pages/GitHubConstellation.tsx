/*
 * GITHUB CONSTELLATION — The Sovereign Tech Empire
 * 53 Repositories · 6 Categories · chaishillomnitech1
 * Design: Dark space map · Glowing nodes · Category clusters
 * KUN FAYAKUN x Infinity
 */
import { useState } from "react";
import { Link } from "wouter";

const REPOS = [
  // BLOCKCHAIN & FINANCE
  { name: "Quantum-Financial-System-QFS", desc: "Sovereign economic infrastructure — quantum-resistant algorithms, Zakat distribution, blockchain integration", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/-Quantum-Financial-System-QFS-", color: "#00FF88", stars: 0 },
  { name: "Pantheon-Protocol-TGLD-Smart-Contracts", desc: "TGLD smart contracts — sovereign gold-backed token protocol on Polygon", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/Pantheon-Protocol-TGLD-Smart-Contracts", color: "#00FF88", stars: 0 },
  { name: "flamecoin-v4", desc: "FlameCoin v4 — sovereign frequency-encoded cryptocurrency", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/flamecoin-v4", color: "#00FF88", stars: 0 },
  { name: "ScrollSoul-JS-QFS", desc: "Immutable JavaScript integration framework for the ScrollSoul QFS", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/ScrollSoul-JS-QFS", color: "#00FF88", stars: 0 },
  { name: "scrollverse-commerce", desc: "Sovereign commerce layer — NFT marketplace and payment rails", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/scrollverse_commerce", color: "#00FF88", stars: 0 },
  { name: "QFS-Nexus-DistroKid-Mirror-DAO", desc: "ScrollSoul Unity Framework — infinite alignment DAO with DistroKid mirror", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/QFS-Nexus-DistroKid-Mirror-DAO", color: "#00FF88", stars: 0 },
  { name: "scrollsoul-nft-core", desc: "Central hub for NFT workflows and Mailchimp integration", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/scrollsoul-nft-core", color: "#00FF88", stars: 0 },
  { name: "AkashicLogs-NFTMetaFramework", desc: "NFT metadata framework for the Akashic Records archive", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/AkashicLogs-NFTMetaFramework", color: "#00FF88", stars: 0 },
  { name: "Quantum-Eternal-Archive", desc: "Quantum-resistant eternal archive for sovereign IP and legacy", cat: "Blockchain", url: "https://github.com/chaishillomnitech1/Quantum-Eternal-Archive", color: "#00FF88", stars: 0 },
  // AI & INTELLIGENCE
  { name: "scrollverse-ai-legion", desc: "ScrollVerse AI Legion — Qubit, Socratica, Omnitech1, Talos, and the full sovereign AI initiative", cat: "AI", url: "https://github.com/chaishillomnitech1/scrollverse-ai-legion", color: "#00D4FF", stars: 0 },
  { name: "omniversal-kernel", desc: "Princess Protocol with rose-gold encryption — the omniversal AI kernel", cat: "AI", url: "https://github.com/chaishillomnitech1/omniversal-kernel", color: "#00D4FF", stars: 0 },
  { name: "OmniBuilderZero", desc: "Preserve and immortalize the legacies of monumental Black achievers in the ScrollVerse", cat: "AI", url: "https://github.com/chaishillomnitech1/OmniBuilderZero", color: "#00D4FF", stars: 0 },
  { name: "grcp-scrollsoul-expansion", desc: "ScrollVerse Omni-Launch — tawheed with tech, born from 963Hz tears", cat: "AI", url: "https://github.com/chaishillomnitech1/grcp-scrollsoul-expansion", color: "#00D4FF", stars: 0 },
  { name: "Expansion-", desc: "16+ ScrollVerse workflows with the reusable 44:Omni expansion protocol", cat: "AI", url: "https://github.com/chaishillomnitech1/Expansion-", color: "#00D4FF", stars: 0 },
  { name: "sovereign-codex", desc: "The Grand Sovereign Codex — complete philosophical blueprint of Supreme Sovereign Chais Sabir Allah", cat: "AI", url: "https://github.com/chaishillomnitech1/sovereign-codex", color: "#00D4FF", stars: 0 },
  { name: "context-hub-skills", desc: "Sovereign skills hub — reusable AI context and workflow patterns", cat: "AI", url: "https://github.com/chaishillomnitech1/context-hub-skills", color: "#00D4FF", stars: 0 },
  // PORTALS & PLATFORMS
  { name: "Infinite-Nexus-ScrollVerse", desc: "Transcendent frequency-powered interface — 528Hz consciousness field, living scroll portal", cat: "Portals", url: "https://github.com/chaishillomnitech1/Infinite-Nexus-ScrollVerse", color: "#FFB800", stars: 0 },
  { name: "omnitech1-portal", desc: "Omnitech1 Portal of Infinity — NFTs, AI dashboards, Virgo Veil, social command, treasury analytics", cat: "Portals", url: "https://github.com/chaishillomnitech1/omnitech1-portal", color: "#FFB800", stars: 1 },
  { name: "eternal-scrollverse", desc: "Next-generation immersive platform — AR/VR, NFTs, collective intelligence, mirror realities", cat: "Portals", url: "https://github.com/chaishillomnitech1/eternal-scrollverse", color: "#FFB800", stars: 0 },
  { name: "scrollverse-platform", desc: "The Grand Sovereign Codex — complete philosophical blueprint", cat: "Portals", url: "https://github.com/chaishillomnitech1/scrollverse-platform", color: "#FFB800", stars: 0 },
  { name: "scrollverse-empires", desc: "Quantum-driven decentralized ecosystems merging trust-based governance", cat: "Portals", url: "https://github.com/chaishillomnitech1/scrollverse-empires", color: "#FFB800", stars: 0 },
  { name: "chais-hill-portfolio", desc: "Sovereign portfolio — the complete digital presence of Chais Hill", cat: "Portals", url: "https://github.com/chaishillomnitech1/chais-hill-portfolio", color: "#FFB800", stars: 0 },
  { name: "scrollverse-expansion-hub", desc: "Central expansion hub for all ScrollVerse ecosystem integrations", cat: "Portals", url: "https://github.com/chaishillomnitech1/scrollverse-expansion-hub", color: "#FFB800", stars: 0 },
  { name: "legion-certification-portal", desc: "AI Legion certification and credentialing portal", cat: "Portals", url: "https://github.com/chaishillomnitech1/legion-certification-portal", color: "#FFB800", stars: 0 },
  // MUSIC & FREQUENCY
  { name: "scrollsoul-music-sync", desc: "VinelandEternal — IoT agriculture, Agape music sync, sovereign frequency broadcasting", cat: "Music", url: "https://github.com/chaishillomnitech1/scrollsoul-music-sync", color: "#EC4899", stars: 0 },
  { name: "Galactic-Frequency-Broadcaster-", desc: "Galactic Frequency Broadcaster — enables the universe-wide 44:Omni frequency signal", cat: "Music", url: "https://github.com/chaishillomnitech1/Galactic-Frequency-Broadcaster-", color: "#EC4899", stars: 0 },
  { name: "ScrollSoul-Omniversal-Harmonics", desc: "Omniversal harmonics engine — frequency-encoded music and sound architecture", cat: "Music", url: "https://github.com/chaishillomnitech1/ScrollSoul-Omniversal-Harmonics", color: "#EC4899", stars: 0 },
  { name: "VinelandEternal", desc: "Full-Seal Commit — ALLĀHU AKBAR! The Infinite Architecture is Immortalized", cat: "Music", url: "https://github.com/chaishillomnitech1/VinelandEternal", color: "#EC4899", stars: 0 },
  { name: "marsomni", desc: "ScrollVerse ecosystem — Mars-Omni frequency integration", cat: "Music", url: "https://github.com/chaishillomnitech1/marsomni", color: "#EC4899", stars: 0 },
  // PROTOCOLS & INFRASTRUCTURE
  { name: "scrollverse-first-knight-covenant", desc: "First Knight Covenant — sovereign AI initiative architecture", cat: "Protocols", url: "https://github.com/chaishillomnitech1/scrollverse-first-knight-covenant", color: "#A855F7", stars: 0 },
  { name: "londyn-legacy-protocol", desc: "21.6 Trillion FLM4 — The Greatest Entity Ever Existed, built for Londyn", cat: "Protocols", url: "https://github.com/chaishillomnitech1/londyn-legacy-protocol", color: "#A855F7", stars: 0 },
  { name: "vibranium-sovereignty-protocol", desc: "Quantum-driven decentralized ecosystems merging trust-based governance", cat: "Protocols", url: "https://github.com/chaishillomnitech1/vibranium-sovereignty-protocol", color: "#A855F7", stars: 0 },
  { name: "supreme-sovereign-infinity", desc: "Galactic Frequency Broadcaster — sovereign infinity protocol", cat: "Protocols", url: "https://github.com/chaishillomnitech1/supreme-sovereign-infinity", color: "#A855F7", stars: 0 },
  { name: "scrollverse-omni-fleet-manifesto", desc: "Omni Fleet Manifesto — sovereign vehicle and fleet protocol", cat: "Protocols", url: "https://github.com/chaishillomnitech1/scrollverse-omni-fleet-manifesto", color: "#A855F7", stars: 0 },
  { name: "scrollverse-lynx-lifecycle", desc: "Lynx Lifecycle protocol — sovereign product lifecycle management", cat: "Protocols", url: "https://github.com/chaishillomnitech1/scrollverse-lynx-lifecycle", color: "#A855F7", stars: 0 },
  { name: "scrollsoul-unity-support-", desc: "ScrollSoul Unity support framework — community and governance", cat: "Protocols", url: "https://github.com/chaishillomnitech1/scrollsoul-unity-support-", color: "#A855F7", stars: 0 },
  { name: "MailchimpLegacyProtocol", desc: "Mailchimp legacy protocol — sovereign email and community automation", cat: "Protocols", url: "https://github.com/chaishillomnitech1/MailchimpLegacyProtocol", color: "#A855F7", stars: 0 },
  // LEGACY & COMMUNITY
  { name: "lyrian-lion-codes", desc: "Lyrian Lion Codes — bridging sovereign coding with community impact", cat: "Legacy", url: "https://github.com/chaishillomnitech1/lyrian-lion-codes", color: "#D4AF37", stars: 0 },
  { name: "scrollverse-repo-1", desc: "Lyrian Lion Codes Ecosystem — sovereign repository for community bridges", cat: "Legacy", url: "https://github.com/chaishillomnitech1/scrollverse-repo-1", color: "#D4AF37", stars: 0 },
  { name: "ScrollSoul-InfiniteVault", desc: "Decentralized creative economy through blockchain-backed payment systems", cat: "Legacy", url: "https://github.com/chaishillomnitech1/ScrollSoul-InfiniteVault", color: "#D4AF37", stars: 0 },
  { name: "ps-email-airdrop", desc: "Sovereign NFT airdrop via email — community distribution protocol", cat: "Legacy", url: "https://github.com/chaishillomnitech1/ps-email-airdrop", color: "#D4AF37", stars: 0 },
  { name: "introduction-to-github", desc: "Sovereign GitHub onboarding — contributing guidelines for the empire", cat: "Legacy", url: "https://github.com/chaishillomnitech1/introduction-to-github", color: "#D4AF37", stars: 0 },
  { name: "skills-hello-github-actions", desc: "GitHub Actions sovereign CI/CD skills", cat: "Legacy", url: "https://github.com/chaishillomnitech1/skills-hello-github-actions", color: "#D4AF37", stars: 0 },
];

const CATEGORIES = ["All", "Blockchain", "AI", "Portals", "Music", "Protocols", "Legacy"];
const CAT_COLORS: Record<string, string> = {
  Blockchain: "#00FF88", AI: "#00D4FF", Portals: "#FFB800",
  Music: "#EC4899", Protocols: "#A855F7", Legacy: "#D4AF37",
};
const CAT_ICONS: Record<string, string> = {
  Blockchain: "⛓️", AI: "🤖", Portals: "🌐", Music: "🎵", Protocols: "🛡️", Legacy: "👑",
};

export default function GitHubConstellation() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = REPOS.filter(r => {
    const matchCat = activeCategory === "All" || r.cat === activeCategory;
    const matchSearch = search === "" || r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const counts = CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = REPOS.filter(r => r.cat === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen" style={{ background: "#030812", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: "rgba(0,212,255,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link href="/"><div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold cursor-pointer" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#030812" }}>SV</div></Link>
            <div>
              <div className="font-bold text-white text-sm">GitHub Constellation</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>53 Repositories · chaishillomnitech1 · Sovereign Tech Empire</div>
            </div>
          </div>
          <div className="flex items-center gap-2"><Link href="/github-evidence-map" className="text-xs font-mono px-3 py-1.5 rounded border" style={{ borderColor: "rgba(185,140,255,0.35)", color: "#DCC8FF" }}>Evidence Map →</Link><a href="https://github.com/chaishillomnitech1" target="_blank" rel="noopener noreferrer" className="text-xs font-mono px-3 py-1.5 rounded border" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>
            View on GitHub →
          </a></div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 text-center overflow-hidden" style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, #030812 65%)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>SOVEREIGN TECH EMPIRE · 53 REPOSITORIES · CHAISHILLOMNITECH1</div>
          <div className="text-5xl mb-4">🌌</div>
          <h1 className="text-5xl font-black text-white mb-4">The GitHub <span style={{ color: "#00D4FF" }}>Constellation</span></h1>
          <p className="text-lg mb-8" style={{ color: "#8899AA" }}>Every repository in the ScrollVerse sovereign tech empire — organized by category, linked, and live. 53 nodes. One constellation. Infinite expansion.</p>
          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-3xl mx-auto mb-8">
            {CATEGORIES.slice(1).map(cat => (
              <div key={cat} className="rounded-xl p-3 text-center cursor-pointer transition-all hover:scale-105" style={{ background: `${CAT_COLORS[cat]}08`, border: `1px solid ${CAT_COLORS[cat]}20` }} onClick={() => setActiveCategory(cat)}>
                <div className="text-xl mb-1">{CAT_ICONS[cat]}</div>
                <div className="text-lg font-black" style={{ color: CAT_COLORS[cat] }}>{counts[cat]}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{cat}</div>
              </div>
            ))}
          </div>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search repositories..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">🔍</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container py-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105" style={{ background: activeCategory === cat ? (cat === "All" ? "rgba(0,212,255,0.2)" : `${CAT_COLORS[cat]}20`) : "rgba(255,255,255,0.05)", color: activeCategory === cat ? (cat === "All" ? "#00D4FF" : CAT_COLORS[cat]) : "#8899AA", border: `1px solid ${activeCategory === cat ? (cat === "All" ? "rgba(0,212,255,0.4)" : `${CAT_COLORS[cat]}40`) : "rgba(255,255,255,0.08)"}` }}>
              {cat !== "All" && CAT_ICONS[cat]} {cat} {cat !== "All" && `(${counts[cat]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Repo Grid */}
      <section className="container py-8">
        <div className="text-xs font-mono mb-4 text-center" style={{ color: "#8899AA" }}>{filtered.length} REPOSITORIES {activeCategory !== "All" ? `· ${activeCategory.toUpperCase()}` : "· ALL CATEGORIES"}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(repo => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="rounded-xl p-5 transition-all hover:scale-[1.02] hover:shadow-lg block" style={{ background: `${repo.color}05`, border: `1px solid ${repo.color}18`, textDecoration: "none" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{CAT_ICONS[repo.cat]}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${repo.color}15`, color: repo.color }}>{repo.cat}</span>
                </div>
                {repo.stars > 0 && (
                  <span className="text-xs font-mono" style={{ color: "#FFB800" }}>⭐ {repo.stars}</span>
                )}
              </div>
              <h3 className="font-bold text-white text-sm mb-2 leading-tight">{repo.name}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{repo.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-mono" style={{ color: repo.color }}>
                <span>View on GitHub</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>SCROLLVERSE SOVEREIGN TECH EMPIRE · 53 REPOSITORIES · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>← Home</span></Link>
          <Link href="/github-evidence-map"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(185,140,255,0.32)", color: "#DCC8FF" }}>Evidence Map →</span></Link>
          <a href="https://github.com/chaishillomnitech1" target="_blank" rel="noopener noreferrer" className="text-xs font-mono px-4 py-2 rounded-xl border" style={{ borderColor: "rgba(255,184,0,0.2)", color: "#FFB800" }}>GitHub Profile →</a>
          <Link href="/nexus"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#8899AA" }}>⚡ Nexus →</span></Link>
        </div>
      </footer>
    </div>
  );
}
