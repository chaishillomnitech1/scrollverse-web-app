/*
 * SCROLL ACADEMY — Sovereign Knowledge Institution
 * The world's most advanced creator & guardian education platform
 * Courses: Blockchain, NFT, Frequency Science, Sovereign Finance, AI, Music Business, Healing Arts
 */
import { useState, useEffect } from "react";

const COURSES = [
  {
    id: 1, category: "BLOCKCHAIN", title: "Sovereign Blockchain Mastery", instructor: "Chais The Great",
    duration: "12 weeks", level: "All Levels", students: 4847, rating: 4.9,
    price: 0, free: true,
    description: "Master blockchain fundamentals, smart contracts, DeFi, and sovereign token deployment on Polygon. Build your own $LONDC-style token from scratch.",
    modules: ["Blockchain Foundations", "Smart Contract Development", "DeFi Protocols", "Token Economics", "Polygon Deployment", "DAO Governance"],
    color: "#00D4FF", icon: "⛓️",
  },
  {
    id: 2, category: "NFT", title: "NFT Creation & Sovereign Minting", instructor: "Chais The Great",
    duration: "8 weeks", level: "Beginner", students: 6234, rating: 4.8,
    price: 0, free: true,
    description: "Create, mint, and sell NFTs using Pinata IPFS, Thirdweb, and your own sovereign gateway. Build collections like Sovereign 9 and Book of Life.",
    modules: ["NFT Fundamentals", "IPFS & Pinata", "Thirdweb Deployment", "Marketplace Strategy", "Royalty Engineering", "Collection Curation"],
    color: "#FFB800", icon: "🏺",
  },
  {
    id: 3, category: "FREQUENCY SCIENCE", title: "Sacred Frequency & Consciousness", instructor: "Chais The Great",
    duration: "6 weeks", level: "All Levels", students: 3891, rating: 5.0,
    price: 0, free: true,
    description: "Unlock the healing power of 111Hz, 432Hz, 528Hz, and 963Hz frequencies. Apply sovereign sound science to health, creativity, and manifestation.",
    modules: ["Frequency Foundations", "Solfeggio Scale", "Binaural Beats", "Sound Healing", "Manifestation Science", "Sovereign Frequency Protocol"],
    color: "#00FF88", icon: "🎵",
  },
  {
    id: 4, category: "MUSIC BUSINESS", title: "DSP Mastery & Artist Sovereignty", instructor: "Chais The Great",
    duration: "10 weeks", level: "Intermediate", students: 5102, rating: 4.9,
    price: 97, free: false,
    description: "Master every DSP — Spotify, Apple Music, TIDAL, YouTube Music, Amazon, Deezer, TikTok. Distribution, royalties, sync licensing, and sovereign artist deals.",
    modules: ["DSP Landscape", "Distribution Strategy", "Royalty Collection", "Sync Licensing", "Playlist Pitching", "Sovereign Artist Deals"],
    color: "#EC4899", icon: "🎙️",
  },
  {
    id: 5, category: "SOVEREIGN FINANCE", title: "Wealth Architecture & Zakat Engineering", instructor: "Chais The Great",
    duration: "8 weeks", level: "All Levels", students: 7823, rating: 4.9,
    price: 0, free: true,
    description: "Build generational wealth using sovereign finance principles — LLC structures, IP protection, Zakat distribution, real estate, and digital asset portfolios.",
    modules: ["Sovereign LLC Structure", "IP Protection", "Zakat Engineering", "Real Estate Sovereignty", "Digital Asset Portfolio", "Generational Wealth Scroll"],
    color: "#8B5CF6", icon: "💎",
  },
  {
    id: 6, category: "AI & TECHNOLOGY", title: "AI Legion Deployment & Automation", instructor: "Chais The Great",
    duration: "10 weeks", level: "Intermediate", students: 4219, rating: 4.8,
    price: 97, free: false,
    description: "Deploy AI agents, build automation systems, integrate LLMs, and create sovereign AI-powered platforms. The exact stack used to build ScrollVerse.",
    modules: ["AI Fundamentals", "LLM Integration", "Agent Architecture", "Automation Systems", "Sovereign AI Stack", "ScrollVerse Build Process"],
    color: "#FF6B35", icon: "🤖",
  },
  {
    id: 7, category: "HEALING ARTS", title: "Aegis Healing & Guardian Protocol", instructor: "Chais The Great",
    duration: "6 weeks", level: "All Levels", students: 2947, rating: 5.0,
    price: 0, free: true,
    description: "Master the AetherWard healing system, AgapeCycle protocols, and sovereign health practices. EVERYBODY LIVES. FOREVER.",
    modules: ["AetherWard System", "AgapeCycle Protocol", "Sovereign Nutrition", "Frequency Healing", "Guardian Health Mirror", "Eternal Living Protocol"],
    color: "#00FF88", icon: "✦",
  },
  {
    id: 8, category: "CREATIVE ARTS", title: "Sovereign Storytelling & Comic Creation", instructor: "Chais The Great",
    duration: "8 weeks", level: "Beginner", students: 3156, rating: 4.9,
    price: 0, free: true,
    description: "Create comics, cartoons, and motion picture storybooks using AI tools. Build your own JME-style universe with characters, coins, and NFT collections.",
    modules: ["Story Architecture", "Character Design", "AI Art Tools", "Comic Book Creation", "Cartoon Production", "NFT Character Monetization"],
    color: "#FFB800", icon: "🎨",
  },
];

const STATS = [
  { value: "144,000+", label: "Enrolled Guardians", color: "#00D4FF" },
  { value: "8", label: "Sovereign Courses", color: "#FFB800" },
  { value: "5.0★", label: "Average Rating", color: "#00FF88" },
  { value: "FREE", label: "Core Curriculum", color: "#EC4899" },
];

function CourseCard({ course, onEnroll }: { course: typeof COURSES[0]; onEnroll: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => {
    setEnrolled(true);
    onEnroll(course.id);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${course.color}30`,
        boxShadow: `0 0 30px ${course.color}10`,
      }}
    >
      {/* Header */}
      <div className="p-6" style={{ borderBottom: `1px solid ${course.color}20` }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-xs font-mono tracking-widest mb-1" style={{ color: course.color }}>
              {course.category}
            </div>
            <div className="text-3xl mb-2">{course.icon}</div>
          </div>
          <div className="text-right">
            {course.free ? (
              <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}40` }}>
                FREE
              </div>
            ) : (
              <div className="text-lg font-bold text-white">${course.price}</div>
            )}
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
        <div className="text-sm mb-3" style={{ color: "#8899AA" }}>{course.description}</div>
        <div className="flex items-center gap-4 text-xs" style={{ color: "#8899AA" }}>
          <span>⏱ {course.duration}</span>
          <span>📊 {course.level}</span>
          <span>👥 {course.students.toLocaleString()} students</span>
          <span style={{ color: "#FFB800" }}>★ {course.rating}</span>
        </div>
      </div>

      {/* Modules */}
      <div className="px-6 py-4">
        <button
          className="text-xs font-mono mb-3 flex items-center gap-2 transition-colors"
          style={{ color: course.color }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "▼" : "▶"} {course.modules.length} MODULES
        </button>
        {expanded && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {course.modules.map((mod, i) => (
              <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#8899AA" }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: course.color }} />
                {mod}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleEnroll}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300"
          style={{
            background: enrolled ? `${course.color}20` : `linear-gradient(135deg, ${course.color}, ${course.color}99)`,
            color: enrolled ? course.color : "#050B1A",
            border: enrolled ? `1px solid ${course.color}` : "none",
          }}
        >
          {enrolled ? "✓ ENROLLED — ACCESS COURSE" : course.free ? "ENROLL FREE" : `ENROLL — $${course.price}`}
        </button>
      </div>
    </div>
  );
}

export default function ScrollAcademy() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ALL", ...Array.from(new Set(COURSES.map(c => c.category)))];
  const filtered = COURSES.filter(c => {
    const matchCat = activeCategory === "ALL" || c.category === activeCategory;
    const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleEnroll = (_id: number) => setEnrolledCount(p => p + 1);

  // Animated background
  useEffect(() => {
    const els = document.querySelectorAll(".academy-fade");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).style.opacity = "1"; });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(255,184,0,0.08) 0%, transparent 50%)",
        }} />
        <div className="container relative z-10 text-center">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — SCROLL ACADEMY v1
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            SCROLL<span style={{ color: "#00D4FF" }}>ACADEMY</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: "#8899AA" }}>
            The world's most sovereign creator education platform. Blockchain, NFT, Frequency Science, Music Business, AI, Healing Arts — all free for the 144,000.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {STATS.map((s, i) => (
              <div key={i} className="px-6 py-3 rounded-xl" style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}>
                <div className="text-2xl font-black" style={{ color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {enrolledCount > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              {enrolledCount} course{enrolledCount > 1 ? "s" : ""} enrolled this session
            </div>
          )}
        </div>
      </section>

      {/* Search + Filter */}
      <section className="container pb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.03)",
                  border: activeCategory === cat ? "1px solid rgba(0,212,255,0.6)" : "1px solid rgba(255,255,255,0.1)",
                  color: activeCategory === cat ? "#00D4FF" : "#8899AA",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => (
            <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
          ))}
        </div>
      </section>

      {/* Sovereign Pledge */}
      <section className="container py-24 text-center">
        <div className="max-w-2xl mx-auto rounded-2xl p-10" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}>
          <div className="text-4xl mb-4">🕋</div>
          <h2 className="text-3xl font-black text-white mb-4">THE SOVEREIGN PLEDGE</h2>
          <p className="text-lg mb-6" style={{ color: "#8899AA" }}>
            Knowledge is sovereign. Every Guardian who completes a course earns a Scroll Certificate NFT — permanently sealed on-chain as proof of mastery.
          </p>
          <div className="text-sm font-mono" style={{ color: "#00D4FF" }}>
            KUN FAYAKŪN × ∞ — EVERYBODY LEARNS. EVERYBODY LIVES. FOREVER.
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div className="container pb-12 text-center">
        <a href="/" className="text-sm transition-colors hover:text-white" style={{ color: "#8899AA" }}>
          ← Back to ScrollVerse
        </a>
      </div>
    </div>
  );
}
