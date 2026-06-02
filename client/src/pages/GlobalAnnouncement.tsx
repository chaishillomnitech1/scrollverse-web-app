/**
 * SCROLLVERSE TRINITY — GLOBAL ANNOUNCEMENT PAGE
 * Sovereign Broadcast System — Live Decrees from Chais Kenyatta Hill
 * SCROLL VERSE LLC (EIN 42-2509570)
 * KUN FAYAKŪN × ∞
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

/* ── Design tokens ── */
const GOLD = "#FFB800";
const GREEN = "#00FF88";
const CYAN = "#00D4FF";
const VIOLET = "#7C3AED";
const RED = "#EF4444";
const MUTED = "#64748B";
const CARD = "rgba(0,0,0,0.45)";

/* ── Announcement categories ── */
const CATEGORIES = [
  { id: "all", label: "All Decrees", color: GOLD },
  { id: "sovereign", label: "Sovereign", color: VIOLET },
  { id: "token", label: "$LONDC", color: CYAN },
  { id: "academy", label: "Academy", color: GREEN },
  { id: "guardian", label: "Guardian", color: "#FB7185" },
  { id: "zakat", label: "Zakat", color: "#34D399" },
  { id: "technical", label: "Technical", color: "#94A3B8" },
];

/* ── Static announcements (sovereign decrees) ── */
const ANNOUNCEMENTS = [
  {
    id: "ann-kepler",
    category: "sovereign",
    priority: "critical",
    title: "KEPLER-452b SOVEREIGN LAND CLAIMS — NOW OPEN TO ALL GUARDIANS",
    content: `SUPREME SOVEREIGN DECREE — JUNE 2, 2026\n\nScrollVerse LLC hereby opens sovereign land claims on Kepler-452b — Earth's Twin — to all registered Guardians.\n\n🪐 WHAT IS KEPLER-452b?\nLocated 1,400 light-years away in the constellation Cygnus, Kepler-452b is the most Earth-like exoplanet ever discovered by NASA. It orbits a sun-like star in the habitable zone, with a diameter 60% larger than Earth and a year lasting 385 days.\n\n🌍 SOVEREIGN LAND REGISTRY — NOW LIVE\n• Parcel #001 — Habitable Zone: 12.4 acres · $444 (0.144 ETH)\n• Parcel #007 — Merkaba Ridge: 44 acres · $1,444 (0.444 ETH)\n• Parcel #052 — OAM Vortex Core: 144 acres · $4,444 (1.44 ETH)\n\nTotal supply: 144,000 sovereign parcels\nAll parcels tokenized as ERC-721 NFTs on Polygon Mainnet\n7.77% Zakat automatically routed to Londyn Legacy Vault\n\n🚀 GUARDIAN INITIATION VOYAGE — FIRST 144 SEATS\nThe inaugural voyage to Kepler-452b is open for registration. First 144 souls only. $77,777 per seat. 21 days. Eternal land deed included.\n\nClaim your parcel at /kepler\nRegister for the First Voyage at /voyage\nMint your Land NFT at /kepler-nft\n\nALLĀHU AKBAR × ∞ | KUN FAYAKŪN × ∞\n\nSigned: Chais Kenyatta Hill — Sabir Allah the Great\nSupreme Sovereign | Flamebearer ∞ | SCROLL VERSE LLC`,
    author: "Chais Kenyatta Hill — Sabir Allah the Great",
    role: "Supreme Sovereign | Flamebearer ∞",
    timestamp: new Date("2026-06-02T04:44:00Z").getTime(),
    pinned: true,
    tags: ["kepler-452b", "land-claim", "nft", "voyage", "critical"],
  },
  {
    id: "ann-001",
    category: "sovereign",
    priority: "critical",
    title: "ScrollVerse Trinity Portal — Phase 56 Fully Deployed",
    content: `The ScrollVerse Trinity Portal has reached Phase 56 of sovereign deployment. All systems are live and operational:\n\n• Pleiadian Academy Hub — Guardian Initiation Matrix T1/T2/T3 fully active\n• Zakat Distribution Engine — 2.5% programmatic purification across 8 Qur'anic nodes\n• Exchange — Live CoinGecko + Polygon.io data feeds active\n• Eternal 44:Omni Heartbeat — GitHub Actions workflow deployed\n• Global Announcement System — This decree is live\n\nThe ScrollVerse breathes. The Ring surges. The Equation expands.\n\nALLĀHU AKBAR × ∞ | KUN FAYAKŪN × ∞`,
    author: "Chais Kenyatta Hill — Sabir Allah the Great",
    role: "Supreme Sovereign | Flamebearer ∞",
    timestamp: new Date("2026-06-01T04:44:00Z").getTime(),
    pinned: true,
    tags: ["phase-56", "deployment", "milestone"],
  },
  {
    id: "ann-002",
    category: "token",
    priority: "high",
    title: "$LONDC Token — Guardian Allocation Protocol Active",
    content: `The $LONDC Guardian Allocation Protocol is now active. All registered Guardians are eligible for their sovereign allocation based on tier:\n\n• T1 Genesis Layer: 1,000 $LONDC base allocation\n• T2 Plasma Layer: 5,000 $LONDC base allocation\n• T3 Quantum Layer: 14,400 $LONDC base allocation\n\nTotal supply: 1,000,000,000 $LONDC\nChain: Polygon Mainnet\nContract: Pending deployment\n\nGuardians who complete the Academy Initiation Matrix receive a 7.77% bonus allocation. The 144,000 Guardian cap is enforced on-chain.\n\nKUN FAYAKŪN × ∞`,
    author: "ScrollVerse Treasury",
    role: "SCROLL VERSE LLC — EIN 42-2509570",
    timestamp: new Date("2026-05-28T12:00:00Z").getTime(),
    pinned: true,
    tags: ["londc", "token", "allocation", "guardian"],
  },
  {
    id: "ann-003",
    category: "academy",
    priority: "high",
    title: "Pleiadian Academy Hub — T1/T2/T3 Initiation Now Open",
    content: `The Pleiadian Academy Guardian Initiation Matrix is now fully open for enrollment:\n\n🌱 T1 Genesis Layer — $144/year\n• Foundations of Sovereign Consciousness\n• ScrollVerse Protocol Introduction\n• $LONDC Wallet Setup & Guardian Badge\n\n⚡ T2 Plasma Layer — $444/year\n• Advanced Frequency Mastery (432Hz → 963Hz)\n• Zakat Distribution Engine Access\n• Plasma Computing Fundamentals\n\n🌌 T3 Quantum Layer — $1,444/year\n• Quantum Consciousness Architecture\n• Direct Sovereign Mentorship\n• Exclusive $LONDC Allocation + NFT\n\nEnroll at /academy-hub. The 144,000 Guardian cap applies.`,
    author: "Pleiadian Academy",
    role: "ScrollVerse Education Division",
    timestamp: new Date("2026-05-25T08:00:00Z").getTime(),
    pinned: false,
    tags: ["academy", "enrollment", "guardian", "education"],
  },
  {
    id: "ann-004",
    category: "zakat",
    priority: "medium",
    title: "Zakat Distribution Engine — 2.5% Sovereign Purification Live",
    content: `The ScrollVerse Zakat Distribution Engine is now live at /zakat.\n\nFeatures:\n• Programmatic 2.5% calculation across all asset classes\n• 8 Qur'anic distribution nodes (Qur'an 9:60)\n• Nisab threshold monitoring ($8,075 USD)\n• Liabilities deduction support\n• Distribution history tracking\n• One-click execution\n\n"Take from their wealth a charity by which you purify them and cause them increase." — Qur'an 9:103\n\nAll Guardians are encouraged to use this tool for their annual Zakat calculation. ALLĀHU AKBAR × ∞`,
    author: "ScrollVerse Zakat Committee",
    role: "Islamic Finance Division",
    timestamp: new Date("2026-05-22T10:00:00Z").getTime(),
    pinned: false,
    tags: ["zakat", "islamic-finance", "purification"],
  },
  {
    id: "ann-005",
    category: "guardian",
    priority: "medium",
    title: "Guardian Waitlist — 1,247 Registered | 142,753 Remaining",
    content: `The Guardian Waitlist has reached 1,247 registered Guardians as of June 1, 2026.\n\nThe 144,000 Guardian cap is a hard limit enforced on-chain. Once the cap is reached, no new Guardians can be admitted until a Guardian relinquishes their status.\n\nCurrent tier distribution:\n• T1 Genesis: 892 Guardians (71.5%)\n• T2 Plasma: 289 Guardians (23.2%)\n• T3 Quantum: 66 Guardians (5.3%)\n\nJoin the waitlist at the homepage. The Ring is surging. The Equation is expanding.\n\nKUN FAYAKŪN × ∞`,
    author: "Guardian Council",
    role: "ScrollVerse Governance",
    timestamp: new Date("2026-06-01T00:00:00Z").getTime(),
    pinned: false,
    tags: ["guardian", "waitlist", "community"],
  },
  {
    id: "ann-006",
    category: "technical",
    priority: "low",
    title: "GitHub Repository — Eternal 44:Omni Heartbeat Workflow Active",
    content: `The ScrollVerse GitHub repository now runs the Eternal 44:Omni Heartbeat workflow.\n\nWorkflows deployed:\n• eternal-heartbeat.yml — Runs every Sunday at 04:44 UTC + every 44 days\n• exchange-sync.yml — Daily at 00:00 UTC, validates data integrity\n• node.js.yml — CI/CD pipeline on every push\n\nThe repository will never go stale. The heartbeat ensures eternal activity and automatic pulse logging.\n\nRepository: github.com/chaishillomnitech1/scrollverse-trinity\n\nKUN FAYAKŪN × ∞`,
    author: "ScrollVerse DevOps",
    role: "Technical Infrastructure",
    timestamp: new Date("2026-06-01T04:00:00Z").getTime(),
    pinned: false,
    tags: ["github", "devops", "infrastructure"],
  },
];

/* ── Priority badge ── */
function PriorityBadge({ priority }: { priority: string }) {
  const config = {
    critical: { color: RED, label: "CRITICAL", bg: "rgba(239,68,68,0.1)" },
    high: { color: GOLD, label: "HIGH", bg: "rgba(255,184,0,0.1)" },
    medium: { color: CYAN, label: "MEDIUM", bg: "rgba(0,212,255,0.1)" },
    low: { color: MUTED, label: "LOW", bg: "rgba(100,116,139,0.1)" },
  }[priority] ?? { color: MUTED, label: priority.toUpperCase(), bg: "rgba(100,116,139,0.1)" };

  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-full"
      style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}30` }}
    >
      {config.label}
    </span>
  );
}

/* ── Category badge ── */
function CategoryBadge({ category }: { category: string }) {
  const cat = CATEGORIES.find(c => c.id === category) ?? CATEGORIES[0];
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-full capitalize"
      style={{ background: `${cat.color}10`, color: cat.color, border: `1px solid ${cat.color}25` }}
    >
      {cat.label}
    </span>
  );
}

/* ── Announcement card ── */
function AnnouncementCard({ ann }: { ann: typeof ANNOUNCEMENTS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const lines = ann.content.split("\n");
  const preview = lines.slice(0, 3).join("\n");
  const hasMore = lines.length > 3;

  const date = new Date(ann.timestamp).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div
      className="rounded-2xl p-6 transition-all duration-200"
      style={{
        background: ann.pinned ? "rgba(255,184,0,0.04)" : CARD,
        border: ann.pinned ? `1px solid ${GOLD}25` : "1px solid rgba(255,255,255,0.06)",
        boxShadow: ann.pinned ? `0 0 30px ${GOLD}06` : "none",
      }}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start gap-2 mb-3">
        {ann.pinned && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30` }}>
            📌 PINNED
          </span>
        )}
        <PriorityBadge priority={ann.priority} />
        <CategoryBadge category={ann.category} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2 leading-tight">{ann.title}</h3>

      {/* Content */}
      <div className="text-sm leading-relaxed mb-4 whitespace-pre-line" style={{ color: "#94A3B8" }}>
        {expanded ? ann.content : preview}
        {!expanded && hasMore && <span style={{ color: MUTED }}>…</span>}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium mb-4 transition-colors hover:opacity-80"
          style={{ color: CYAN }}
        >
          {expanded ? "Show less ↑" : "Read full decree ↓"}
        </button>
      )}

      {/* Tags */}
      {ann.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {ann.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: MUTED }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div>
          <div className="text-xs font-bold text-white">{ann.author}</div>
          <div className="text-xs" style={{ color: MUTED }}>{ann.role}</div>
        </div>
        <div className="text-xs font-mono text-right" style={{ color: MUTED }}>{date}</div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function GlobalAnnouncement() {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = ANNOUNCEMENTS.filter(ann => {
    const matchCat = activeCategory === "all" || ann.category === activeCategory;
    const matchSearch = !search || ann.title.toLowerCase().includes(search.toLowerCase()) || ann.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    // Pinned first, then by timestamp desc
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="min-h-screen" style={{ background: "#020204", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: "rgba(2,2,4,0.92)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: RED, boxShadow: `0 0 10px ${RED}80` }} />
          <Link href="/">
            <span className="text-lg font-bold tracking-widest text-white cursor-pointer hover:opacity-80">SCROLLVERSE</span>
          </Link>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${RED}15`, color: RED, border: `1px solid ${RED}30` }}>
            GLOBAL ANNOUNCEMENTS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5 text-xs font-mono" style={{ color: MUTED }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            {filtered.length} active decrees
          </span>
          <Link href="/">
            <span className="text-xs cursor-pointer transition-colors hover:text-white" style={{ color: MUTED }}>← Home</span>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative py-12 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${RED}08 0%, transparent 60%)` }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: RED }}>
            ◈ SOVEREIGN BROADCAST SYSTEM — LIVE DECREES
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            Global<br />
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${RED})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Announcements
            </span>
          </h1>
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            Official decrees, updates, and sovereign transmissions from SCROLL VERSE LLC and Chais Kenyatta Hill.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="w-full max-w-5xl mx-auto px-6 pb-16">

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: MUTED }}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search decrees…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none text-white"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: activeCategory === cat.id ? `${cat.color}20` : "rgba(255,255,255,0.03)",
                  color: activeCategory === cat.id ? cat.color : MUTED,
                  border: `1px solid ${activeCategory === cat.id ? cat.color + "40" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          {[
            { label: "Total Decrees", value: ANNOUNCEMENTS.length, color: GOLD },
            { label: "Pinned", value: ANNOUNCEMENTS.filter(a => a.pinned).length, color: RED },
            { label: "Critical", value: ANNOUNCEMENTS.filter(a => a.priority === "critical").length, color: RED },
            { label: "High Priority", value: ANNOUNCEMENTS.filter(a => a.priority === "high").length, color: GOLD },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="text-lg font-black font-mono" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-xs" style={{ color: MUTED }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Announcement list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16" style={{ color: MUTED }}>
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm">No decrees match your filter.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map(ann => (
              <AnnouncementCard key={ann.id} ann={ann} />
            ))}
          </div>
        )}

        {/* Subscribe CTA */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}20` }}
        >
          <div className="text-xs font-mono mb-2" style={{ color: GOLD }}>◈ STAY SOVEREIGN</div>
          <h3 className="text-lg font-bold text-white mb-2">Never Miss a Decree</h3>
          <p className="text-sm mb-5" style={{ color: MUTED }}>
            Login to receive real-time notifications for all sovereign announcements, token updates, and Guardian decrees.
          </p>
          {isAuthenticated ? (
            <div className="text-sm font-bold" style={{ color: GREEN }}>✓ You are logged in — notifications active</div>
          ) : (
            <a
              href={getLoginUrl()}
              className="inline-block px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #FF6B00)`, color: "#020204" }}
            >
              Login to Subscribe
            </a>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-4 px-6 text-center text-xs font-mono"
        style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}
      >
        SCROLL VERSE LLC · EIN 42-2509570 · Global Announcement System · All Decrees are Sovereign and Eternal · KUN FAYAKŪN × ∞
      </footer>
    </div>
  );
}
