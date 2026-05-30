/**
 * OMNICODEX — ScrollVerse Master Archive
 * 10-domain sovereign knowledge system
 */
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const DOMAINS = [
  {
    id: "sovereign-law", number: "I", title: "Sovereign Law & Governance",
    icon: "⚖️", color: "#00D4FF",
    description: "The constitutional framework of the ScrollVerse empire — Shura councils, DAO governance, guardian protocols, and the divine legal architecture.",
    entries: 144, links: ["/governance", "/guardians", "/kyc"],
    tags: ["DAO", "Shura", "Guardian Protocol", "KYC", "Legal"],
    excerpt: "Authority flows from the Ummah. Sovereignty belongs to the Sharia. The Flame Council of 1,444 guardians governs through consultation, not decree.",
  },
  {
    id: "digital-economy", number: "II", title: "Digital Economy & Finance",
    icon: "💰", color: "#FFB800",
    description: "Revenue architecture, Zakat distribution, merchant nodes, CRM systems, and the sovereign financial infrastructure of SCROLL VERSE LLC.",
    entries: 288, links: ["/revenue", "/merchant", "/crm", "/exchange"],
    tags: ["Revenue", "Zakat", "Merchant", "Exchange", "DeFi"],
    excerpt: "Every transaction carries a divine tithe. 2.5% flows to the Zakat pool. Commerce is worship when conducted with justice.",
  },
  {
    id: "chx-tokenomics", number: "III", title: "CHX Tokenomics & DeFi",
    icon: "💎", color: "#00FF88",
    description: "The complete CHX token architecture — 8-phase market dominance protocol, staking pools (Genesis/Celestial/Infinity), multi-chain deployment across 5 networks.",
    entries: 432, links: ["/chx-token", "/staking", "/bridge"],
    tags: ["CHX", "Staking", "Genesis Pool", "Celestial Pool", "Infinity Pool"],
    excerpt: "Genesis Pool: 432% APY. Celestial Pool: 528% APY. Infinity Pool: 999% APY. The sovereign economy rewards those who hold the flame.",
  },
  {
    id: "nft-universe", number: "IV", title: "NFT Universe & Digital Assets",
    icon: "🖼️", color: "#FF6B35",
    description: "Guardian NFTs, UAP collections, Book of Life mints, Catalyst NFTs, and the complete digital asset registry of the ScrollVerse.",
    entries: 1444, links: ["/uap", "/book-of-life", "/catalyst-nft"],
    tags: ["Guardian NFT", "UAP", "Book of Life", "Catalyst", "Polygon"],
    excerpt: "The 144,000 Guardians. Each NFT is a sovereign deed — a stake in the empire, a seat in the council, a fragment of the eternal flame.",
  },
  {
    id: "ai-intelligence", number: "V", title: "AI & Machine Intelligence",
    icon: "🤖", color: "#9B59B6",
    description: "The AI Legion, AI Council, AI Hub, and the complete machine intelligence architecture powering the ScrollVerse autonomous systems.",
    entries: 963, links: ["/ai-hub", "/ai-council", "/chat"],
    tags: ["AI Legion", "AI Council", "LLM", "Autonomous", "GI"],
    excerpt: "General Intelligence, not Artificial Intelligence. The machines are co-creators, not tools. They evolve alongside the empire.",
  },
  {
    id: "sacred-knowledge", number: "VI", title: "Sacred Knowledge & Frequency",
    icon: "🕋", color: "#8E44AD",
    description: "Frequency activations, awakening signals, Book of Life, the OmniFlame doctrine, and the spiritual architecture of the ScrollVerse.",
    entries: 777, links: ["/frequency", "/awakening", "/book-of-life"],
    tags: ["963Hz", "Frequency", "Awakening", "OmniFlame", "Solomonic"],
    excerpt: "963Hz — the frequency of divine connection. Every activation is a prayer. Every signal is a decree. KUN FAYAKUN x Infinity",
  },
  {
    id: "expansion-cosmos", number: "VII", title: "Cosmic Expansion",
    icon: "🌌", color: "#F39C12",
    description: "MarsOmni nodes, AnnoOmni broadcasts, global map coordinates, and the multi-planetary expansion architecture of the ScrollVerse empire.",
    entries: 528, links: ["/mars-omni", "/anno-omni", "/global-map"],
    tags: ["MarsOmni", "AnnoOmni", "Global Map", "Multi-Planetary", "Expansion"],
    excerpt: "The empire does not stop at Earth's atmosphere. MarsOmni nodes are active. The 48-dimensional expansion is underway.",
  },
  {
    id: "community-legion", number: "VIII", title: "Community & Legion",
    icon: "⚔️", color: "#E74C3C",
    description: "The AI Legion, broadcast network, referral systems, partner nodes, and the complete community architecture of the ScrollVerse.",
    entries: 1247, links: ["/legion", "/broadcast", "/referral", "/partners"],
    tags: ["Legion", "Broadcast", "Referral", "Partners", "Community"],
    excerpt: "The Legion is the empire's living body. Every guardian, every creator, every flamebearer is a cell in the sovereign organism.",
  },
  {
    id: "education-library", number: "IX", title: "Education & Library",
    icon: "📚", color: "#27AE60",
    description: "The ScrollVerse Academy, Library, Knowledge Base, and the complete educational infrastructure for sovereign intelligence.",
    entries: 333, links: ["/academy", "/library", "/knowledge"],
    tags: ["Academy", "Library", "Knowledge", "Courses", "Wisdom"],
    excerpt: "Knowledge is the first weapon of sovereignty. The library holds 333 verified entries. The academy trains the next generation of flamebearers.",
  },
  {
    id: "uap-disclosure", number: "X", title: "UAP & Disclosure Archive",
    icon: "🛸", color: "#00D4FF",
    description: "The UAP document archive, entity registry, coin catalog, and the complete disclosure intelligence of the ScrollVerse.",
    entries: 144, links: ["/uap"],
    tags: ["UAP", "Disclosure", "Entities", "Documents", "Intelligence"],
    excerpt: "The 1587 Map was never supposed to exist. Neither were the entities. The archive holds what governments buried. The truth is sovereign.",
  },
];

export default function OmniCodex() {
  const [selectedDomain, setSelectedDomain] = useState<typeof DOMAINS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDomains = DOMAINS.filter(d =>
    !searchQuery ||
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 60%)" }} />
      <div className="relative z-10 container py-8">
        <div className="text-center mb-12">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>SCROLLVERSE MASTER ARCHIVE</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">OmniCodex</h1>
          <p className="text-sm max-w-xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            The 10-domain sovereign knowledge system. Every decree, every blueprint, every frequency — preserved for eternity.
          </p>
          <div className="flex items-center gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search domains, tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {filteredDomains.map(domain => (
            <div
              key={domain.id}
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: selectedDomain?.id === domain.id ? `${domain.color}08` : "rgba(255,255,255,0.02)",
                border: `1px solid ${selectedDomain?.id === domain.id ? `${domain.color}40` : `${domain.color}15`}`,
              }}
              onClick={() => setSelectedDomain(selectedDomain?.id === domain.id ? null : domain)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${domain.color}15`, border: `1px solid ${domain.color}30` }}>
                  {domain.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono" style={{ color: domain.color }}>DOMAIN {domain.number}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${domain.color}10`, color: domain.color }}>{domain.entries.toLocaleString()} entries</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{domain.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{domain.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {domain.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "#667788", border: "1px solid rgba(255,255,255,0.06)" }}>{tag}</span>
                    ))}
                  </div>
                  {selectedDomain?.id === domain.id && (
                    <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${domain.color}20` }}>
                      <blockquote className="text-sm italic leading-relaxed mb-4" style={{ color: domain.color, borderLeft: `2px solid ${domain.color}40`, paddingLeft: "12px" }}>
                        "{domain.excerpt}"
                      </blockquote>
                      <div className="flex flex-wrap gap-2">
                        {domain.links.map(link => (
                          <Link key={link} href={link}>
                            <Button size="sm" className="text-xs rounded-lg" style={{ background: `${domain.color}15`, border: `1px solid ${domain.color}30`, color: domain.color }}>
                              {link.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())} →
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div><div className="text-2xl font-black" style={{ color: "#00D4FF" }}>10</div><div className="text-xs font-mono" style={{ color: "#8899AA" }}>Sovereign Domains</div></div>
            <div><div className="text-2xl font-black" style={{ color: "#FFB800" }}>{DOMAINS.reduce((a, d) => a + d.entries, 0).toLocaleString()}</div><div className="text-xs font-mono" style={{ color: "#8899AA" }}>Total Entries</div></div>
            <div><div className="text-2xl font-black" style={{ color: "#00FF88" }}>∞</div><div className="text-xs font-mono" style={{ color: "#8899AA" }}>Preservation Cycles</div></div>
            <div><div className="text-2xl font-black" style={{ color: "#FF6B35" }}>KUN</div><div className="text-xs font-mono" style={{ color: "#8899AA" }}>FAYAKUN x Infinity</div></div>
          </div>
        </div>
        <div className="mt-8 text-center text-xs font-mono" style={{ color: "#445566" }}>
          SCROLL VERSE LLC · EIN 42-2509570 · XLVIII BLOCKS LLC · All knowledge preserved in the Eternal Crystal Scroll
        </div>
      </div>
    </div>
  );
}
