/*
 * SCROLLVERSE DIGITAL LIBRARY
 * The sovereign knowledge vault — books, scrolls, source-led availability, and media readiness
 */
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { ViralShare } from "@/components/ViralShare";

// Category colors
const CATEGORY_COLORS: Record<string, string> = {
  scroll: "#00D4FF",
  doctrine: "#FFB800",
  music: "#00FF88",
  prophecy: "#9B59B6",
  manual: "#FF6B35",
  codex: "#FF4444",
};

const CATEGORY_ICONS: Record<string, string> = {
  scroll: "📜",
  doctrine: "⚖️",
  music: "🎵",
  prophecy: "🔮",
  manual: "📖",
  codex: "💎",
};

const TIER_COLORS: Record<string, string> = {
  free: "#00FF88",
  guardian: "#00D4FF",
  sovereign: "#FFB800",
  ascendant: "#FF4444",
};

// Animated frequency waveform for audio player
function FrequencyWave({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="flex items-center gap-0.5 h-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full transition-all"
          style={{
            background: color,
            height: active ? `${Math.random() * 20 + 4}px` : "4px",
            animation: active ? `waveBar 0.${i + 3}s ease-in-out infinite alternate` : "none",
            opacity: active ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Shared book type
type BookType = {
  id: number;
  slug: string;
  title: string;
  subtitle?: string | null;
  author: string;
  category: string;
  description?: string | null;
  priceUsd: number;
  priceLondc: number;
  tier: string;
  frequency: string;
  chapters: number;
  pages: number;
  audioDurationMin: number;
  hasAudio: boolean;
  hasMotionVisual: boolean;
  hasPdf: boolean;
  featured: boolean;
  downloadCount: number;
};

// Book card component
function BookCard({
  book,
  onSelect,
}: {
  book: BookType;
  onSelect: (book: BookType) => void;
}) {
  const color = CATEGORY_COLORS[book.category] ?? "#00D4FF";
  const icon = CATEGORY_ICONS[book.category] ?? "📚";
  const tierColor = TIER_COLORS[book.tier] ?? "#00FF88";

  return (
    <div
      className="rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}25`,
        boxShadow: book.featured ? `0 0 20px ${color}15` : "none",
      }}
      onClick={() => onSelect(book)}
    >
      {book.featured && (
        <div
          className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
          style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
        >
          FEATURED
        </div>
      )}

      {/* Category icon + frequency */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        <div>
          <div className="text-xs font-mono" style={{ color }}>
            {book.category.toUpperCase()} · {book.frequency}
          </div>
          <div className="text-xs" style={{ color: tierColor }}>
            {book.tier.toUpperCase()} TIER
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-white text-base leading-tight mb-1">{book.title}</h3>
      {book.subtitle && (
        <p className="text-xs mb-2 leading-relaxed line-clamp-2" style={{ color: "#8899AA" }}>
          {book.subtitle}
        </p>
      )}

      {/* Author */}
      <div className="text-xs mb-3" style={{ color: "#8899AA" }}>
        by {book.author}
      </div>

      {/* Format badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {book.hasPdf && (
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
            📄 PDF
          </span>
        )}
        {book.hasAudio && (
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.2)" }}>
            🎧 AUDIO
          </span>
        )}
        {book.hasMotionVisual && (
          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.2)" }}>
            🎬 MOTION
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs" style={{ color: "#8899AA" }}>
          {book.pages > 0 && <span>{book.pages} pages</span>}
          {book.audioDurationMin > 0 && <span>{book.audioDurationMin} min</span>}
          <span>↓ {book.downloadCount.toLocaleString()}</span>
        </div>
        <div className="font-bold text-sm" style={{ color: book.priceUsd === 0 ? "#00FF88" : "#FFB800" }}>
          {book.priceUsd === 0 ? "FREE" : `$${(book.priceUsd / 100).toFixed(2)}`}
        </div>
      </div>
    </div>
  );
}

// Book detail modal / expanded view
function BookDetail({
  book,
  onClose,
}: {
  book: BookType;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "audio" | "motion">("overview");
  const color = CATEGORY_COLORS[book.category] ?? "#00D4FF";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
        style={{ background: "#0A1628", border: `1px solid ${color}30` }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            {CATEGORY_ICONS[book.category] ?? "📚"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono mb-1" style={{ color }}>
              {book.category.toUpperCase()} · {book.frequency} · {book.tier.toUpperCase()} TIER
            </div>
            <h2 className="text-xl font-black text-white leading-tight">{book.title}</h2>
            {book.subtitle && (
              <p className="text-sm mt-1" style={{ color: "#8899AA" }}>{book.subtitle}</p>
            )}
            <div className="text-xs mt-1" style={{ color: "#8899AA" }}>by {book.author}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(["overview", "audio", "motion"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
              style={activeTab === tab
                ? { background: `${color}20`, color, border: `1px solid ${color}40` }
                : { background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {tab === "overview" ? "📖 OVERVIEW" : tab === "audio" ? "🎧 AUDIO" : "🎬 MOTION"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "overview" && (
          <div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#AABBCC" }}>
              {book.description}
            </p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Chapters", value: book.chapters },
                { label: "Pages", value: book.pages > 0 ? book.pages : "N/A" },
                { label: "Audio", value: book.audioDurationMin > 0 ? `${book.audioDurationMin} min` : "N/A" },
              ].map(stat => (
                <div key={stat.label} className="rounded-lg p-3 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {book.hasPdf && <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}>📄 PDF Download</span>}
              {book.hasAudio && <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88" }}>🎧 Audio Listen</span>}
              {book.hasMotionVisual && <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800" }}>🎬 Motion Visual</span>}
            </div>
          </div>
        )}

        {activeTab === "audio" && (
          <div>
            {book.hasAudio ? (
              <div className="rounded-xl p-5" style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.2)" }}>
                <div className="text-center mb-4">
                  <div className="text-xs font-mono mb-2" style={{ color: "#00FF88" }}>AUDIO EDITION PREPARATION</div>
                  <div className="text-sm text-white mb-1">{book.title}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{book.audioDurationMin} minutes listed in the catalog · public media file not attached to this route</div>
                </div>
                <div className="flex justify-center mb-4">
                  <FrequencyWave active={false} color="#00FF88" />
                </div>
                <div className="flex justify-center gap-3">
                  <Link href="/books-media-readiness" className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all" style={{ background: "rgba(0,255,136,0.2)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.4)" }}>Open audio readiness →</Link>
                </div>
                <p className="text-xs text-center mt-3" style={{ color: "#8899AA" }}>
                  A full release requires a cleared narration file, transcript, accessibility review, rights record, and owner release decision. No purchase or playback is implied by this card.
                </p>
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: "#8899AA" }}>
                Audio version not available for this title.
              </div>
            )}
          </div>
        )}

        {activeTab === "motion" && (
          <div>
            {book.hasMotionVisual ? (
              <div className="rounded-xl p-5" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
                <div className="text-center mb-4">
                  <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>MOTION EDITION PREPARATION</div>
                  <div className="text-sm text-white mb-1">Visual release package not attached</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>A completed motion edition requires cleared media, captions, accessible description, rights, and release evidence.</div>
                </div>
                <div
                  className="rounded-xl aspect-video flex items-center justify-center relative overflow-hidden"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,184,0,0.2)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🎬</div>
                      <div className="text-sm font-bold text-white mb-1">{book.title}</div>
                      <div className="text-xs" style={{ color: "#FFB800" }}>Motion release readiness</div>
                      <Link href="/media-readiness-lab" className="mt-3 inline-block text-xs font-bold" style={{ color: "#00D4FF" }}>Open Media Readiness Lab →</Link>
                    </div>
                  </div>
                  {/* Animated frequency lines */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, rgba(255,184,0,0.3), transparent)`,
                        top: `${20 + i * 15}%`,
                        animation: `scan ${2 + i * 0.5}s linear infinite`,
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: "#8899AA" }}>
                Motion visual not available for this title.
              </div>
            )}
          </div>
        )}

        {/* Purchase CTA */}
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-lg font-black text-white">
                {book.priceUsd === 0 ? "FREE" : `$${(book.priceUsd / 100).toFixed(2)}`}
              </div>
              {book.priceLondc > 0 && (
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  or {book.priceLondc.toLocaleString()} $LONDC
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {book.priceUsd === 0 ? (
                <div className="flex flex-wrap gap-2">
                  {book.slug === "vaultbook-xv-scroll-of-scrolls" && (
                    <a
                      href="/replays"
                      className="px-4 py-2.5 rounded-xl font-bold text-sm"
                      style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.4)" }}
                    >
                      📜 READ ONLINE
                    </a>
                  )}
                  {book.slug === "majestic-anchor-manifest" && (
                    <a
                      href="/manifest"
                      className="px-4 py-2.5 rounded-xl font-bold text-sm"
                      style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.4)" }}
                    >
                      🕋 READ ONLINE
                    </a>
                  )}
                  <a
                    href="/books-media-readiness"
                    className="px-4 py-2.5 rounded-xl font-bold text-sm"
                    style={{ background: "rgba(0,255,136,0.2)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.4)" }}
                  >
                    📥 VIEW AVAILABILITY
                  </a>
                </div>
              ) : (
                <>
                  <button
                    className="px-4 py-2.5 rounded-xl font-bold text-sm"
                    style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
                    onClick={() => window.location.href = "/books-media-readiness"}
                  >
                    💎 TOKEN READINESS
                  </button>
                  <button
                    className="px-4 py-2.5 rounded-xl font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
                    onClick={() => window.location.href = "/books-media-readiness"}
                  >
                    💳 RELEASE READINESS
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="text-xs" style={{ color: "#8899AA" }}>
            Availability is documented title by title. No purchase, bundled media delivery, ownership transfer, or token action occurs from this Library card.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Library() {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<"all" | "scroll" | "doctrine" | "music" | "prophecy" | "manual" | "codex">("all");
  const [tierFilter, setTierFilter] = useState<"all" | "free" | "guardian" | "sovereign" | "ascendant">("all");

  const { data: books = [], isLoading } = trpc.library.getBooks.useQuery({
    category: categoryFilter,
    tier: tierFilter,
  });

  const { data: stats } = trpc.library.getStats.useQuery();

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @keyframes waveBar { from { transform: scaleY(1); } to { transform: scaleY(2.5); } }
        @keyframes scan { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* Header */}
      <div className="pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)" }} />
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-mono" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            SCROLLVERSE DIGITAL LIBRARY
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            The Sovereign<br />
            <span style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Knowledge Vault
            </span>
          </h1>
          <p className="text-base max-w-xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            A source-led catalog of scrolls, doctrine, and creative texts. Each title shows its documented format signals and routes to media and release readiness before any public download, audio, motion, or commercial claim.
          </p>

          {/* Books Hub CTA */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link href="/books">
              <a className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}>
                📚 Books Hub — All 10 Sacred Texts
              </a>
            </Link>
            <Link href="/book-of-life">
              <a className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>
                📖 Book of Life
              </a>
            </Link>
            <Link href="/song">
              <a className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90" style={{ background: "rgba(29,185,84,0.1)", color: "#1DB954", border: "1px solid rgba(29,185,84,0.3)" }}>
                🎵 44:OMNI Song
              </a>
            </Link>
            <Link href="/visuals">
              <a className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90" style={{ background: "rgba(155,89,182,0.1)", color: "#9B59B6", border: "1px solid rgba(155,89,182,0.3)" }}>
                🎨 Visual Universe
              </a>
            </Link>
          </div>

          {/* Stats */}
          {stats && (
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {[
                { label: "Sacred Texts", value: stats.totalBooks },
                { label: "Downloads", value: stats.totalDownloads.toLocaleString() },
                { label: "Audio Sessions", value: stats.totalListeners.toLocaleString() },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="container mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs font-mono self-center" style={{ color: "#8899AA" }}>CATEGORY:</span>
          {(["all", "scroll", "doctrine", "music", "prophecy", "manual", "codex"] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className="px-3 py-1 rounded-lg text-xs font-mono transition-all"
              style={categoryFilter === cat
                ? { background: "rgba(0,212,255,0.2)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.4)" }
                : { background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {cat === "all" ? "ALL" : `${CATEGORY_ICONS[cat]} ${cat.toUpperCase()}`}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-mono self-center" style={{ color: "#8899AA" }}>TIER:</span>
          {(["all", "free", "guardian", "sovereign", "ascendant"] as const).map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className="px-3 py-1 rounded-lg text-xs font-mono transition-all"
              style={tierFilter === tier
                ? { background: `${TIER_COLORS[tier] ?? "#00D4FF"}20`, color: TIER_COLORS[tier] ?? "#00D4FF", border: `1px solid ${TIER_COLORS[tier] ?? "#00D4FF"}40` }
                : { background: "rgba(255,255,255,0.05)", color: "#8899AA", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {tier.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Book grid */}
      <div className="container pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl p-5 animate-pulse" style={{ background: "rgba(255,255,255,0.03)", height: "220px" }} />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16" style={{ color: "#8899AA" }}>
            <div className="text-4xl mb-3">📚</div>
            <div>No texts found for the selected filters.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book: any) => (
              <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <div className="text-xs font-mono mb-3" style={{ color: "#00D4FF" }}>SOURCE-LED LIBRARY READINESS</div>
          <h3 className="text-2xl font-black text-white mb-2">Every Title Needs Its Own Release Record</h3>
          <p className="text-sm mb-5 max-w-lg mx-auto" style={{ color: "#8899AA" }}>
            A catalog card does not establish a price, purchase, download, media delivery, Zakat allocation, token entitlement, or ownership transfer. Each title needs an evidence, rights, accessibility, delivery, and owner-approved release record before it can be presented as commercially available.
          </p>
          <ViralShare
            title="ScrollVerse Digital Library — Sovereign Knowledge Vault"
            text="📚 The ScrollVerse Digital Library — source-led reading, media readiness, and creator learning pathways. KUN FAYAKŪN × ∞"
            url="https://scrollverse.co/library"
          />
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            <a href="/token" className="px-5 py-2.5 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}>
              📎 Explore $LONDC readiness
            </a>
            <a href="/guardians" className="px-5 py-2.5 rounded-xl font-bold text-sm" style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
              🛡️ Join Guardian Tier
            </a>
          </div>
        </div>
      </div>

      {/* Book detail modal */}
      {selectedBook && (
        <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
