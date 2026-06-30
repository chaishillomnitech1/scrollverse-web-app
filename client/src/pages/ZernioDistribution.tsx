/**
 * ZERNIO — Sovereign Social Distribution Hub
 * ScrollVerse's own DSP-style social post scheduler & distributor
 * Auto-injects sovereign hashtags + CTA on every post
 * Backed by tRPC zernio router
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

// ── Types ──────────────────────────────────────────────────────────────────
interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// ── Platform selector chip ─────────────────────────────────────────────────
function PlatformChip({
  platform,
  selected,
  onToggle,
}: {
  platform: PlatformConfig;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
      style={{
        background: selected ? `${platform.color}25` : "rgba(255,255,255,0.04)",
        border: `1px solid ${selected ? platform.color : "rgba(255,255,255,0.1)"}`,
        color: selected ? platform.color : "#8899AA",
        boxShadow: selected ? `0 0 8px ${platform.color}30` : "none",
      }}
    >
      <span>{platform.icon}</span>
      <span>{platform.name}</span>
    </button>
  );
}

// ── Caption preview ────────────────────────────────────────────────────────
function CaptionPreview({ caption }: { caption: string }) {
  if (!caption) return null;
  return (
    <div
      className="rounded-xl p-4 text-sm whitespace-pre-wrap leading-relaxed"
      style={{
        background: "rgba(0,212,255,0.04)",
        border: "1px solid rgba(0,212,255,0.15)",
        color: "#CBD5E1",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {caption}
    </div>
  );
}

// ── Post card ──────────────────────────────────────────────────────────────
function PostCard({
  post,
  onDelete,
}: {
  post: {
    id: number;
    raw_caption: string;
    full_caption: string;
    platforms: string;
    status: string;
    created_at: Date;
    scheduled_at: Date | null;
    cta_url: string;
  };
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const platforms: string[] = JSON.parse(post.platforms || "[]");
  const statusColors: Record<string, string> = {
    draft: "#8899AA",
    scheduled: "#FFB800",
    published: "#00FF88",
  };
  const color = statusColors[post.status] || "#8899AA";

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-1.5">
          {platforms.map((p) => (
            <span
              key={p}
              className="px-2 py-0.5 rounded text-xs font-mono"
              style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}
            >
              {p}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold uppercase"
            style={{ background: `${color}15`, color, border: `1px solid ${color}40` }}
          >
            {post.status}
          </span>
          <button
            onClick={() => onDelete(post.id)}
            className="text-xs px-2 py-0.5 rounded"
            style={{ color: "#FF4444", background: "rgba(255,68,68,0.08)" }}
          >
            ✕
          </button>
        </div>
      </div>
      <p className="text-sm mb-2 line-clamp-2" style={{ color: "#CBD5E1" }}>
        {post.raw_caption}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="text-xs mb-2"
        style={{ color: "#00D4FF" }}
      >
        {expanded ? "▲ Hide full caption" : "▼ Show full caption with hashtags"}
      </button>
      {expanded && <CaptionPreview caption={post.full_caption} />}
      <div className="text-xs mt-2" style={{ color: "#8899AA" }}>
        {post.scheduled_at
          ? `Scheduled: ${new Date(post.scheduled_at).toLocaleString()}`
          : `Created: ${new Date(post.created_at).toLocaleString()}`}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function ZernioDistribution() {
  const { user, isAuthenticated } = useAuth();

  const { data: config } = trpc.zernio.getSovereignConfig.useQuery();
  const { data: posts, refetch: refetchPosts } = trpc.zernio.listPosts.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const createPost = trpc.zernio.createPost.useMutation({
    onSuccess: () => {
      setRawCaption("");
      setSelectedPlatforms([]);
      setMediaUrl("");
      setScheduledAt("");
      setPreviewCaption("");
      refetchPosts();
    },
  });

  const deletePost = trpc.zernio.deletePost.useMutation({
    onSuccess: () => refetchPosts(),
  });

  const [rawCaption, setRawCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [previewCaption, setPreviewCaption] = useState("");
  const [activeTab, setActiveTab] = useState<"compose" | "posts" | "analytics">("compose");

  const platforms: PlatformConfig[] = config?.platforms || [];
  const hashtags: string[] = config?.hashtags || [];
  const cta: string = config?.cta || "scrollverse.co/link";

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const buildPreview = () => {
    if (!rawCaption.trim()) return;
    const tags = hashtags.join(" ");
    const full = `${rawCaption}\n\n🔗 ${cta}\n\n${tags}`;
    setPreviewCaption(full);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawCaption.trim() || selectedPlatforms.length === 0) return;
    createPost.mutate({
      rawCaption,
      platforms: selectedPlatforms,
      mediaUrl: mediaUrl || undefined,
      scheduledAt: scheduledAt || undefined,
    });
  };

  const charCount = rawCaption.length;
  const charWarning = charCount > 2000;

  // Stats
  const stats = useMemo(() => {
    if (!posts) return { total: 0, scheduled: 0, published: 0, draft: 0 };
    return {
      total: posts.length,
      scheduled: posts.filter((p: { status: string }) => p.status === "scheduled").length,
      published: posts.filter((p: { status: string }) => p.status === "published").length,
      draft: posts.filter((p: { status: string }) => p.status === "draft").length,
    };
  }, [posts]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: "rgba(5,11,26,0.95)",
          borderColor: "rgba(0,212,255,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-sm font-mono cursor-pointer" style={{ color: "#8899AA" }}>
              ← ScrollVerse
            </span>
          </Link>
          <span style={{ color: "#334" }}>/</span>
          <span className="font-bold text-white">Zernio</span>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,255,136,0.1)",
              color: "#00FF88",
              border: "1px solid rgba(0,255,136,0.3)",
            }}
          >
            DSP
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <span className="text-xs" style={{ color: "#8899AA" }}>
              👤 {user?.name}
            </span>
          ) : (
            <a href={getLoginUrl()}>
              <button
                className="text-xs font-bold px-4 py-2 rounded-lg"
                style={{
                  background: "rgba(0,212,255,0.15)",
                  color: "#00D4FF",
                  border: "1px solid rgba(0,212,255,0.3)",
                }}
              >
                Login to Post
              </button>
            </a>
          )}
          <Link href="/sovereign-broadcast">
            <button
              className="text-xs font-bold px-4 py-2 rounded-lg"
              style={{
                background: "rgba(255,184,0,0.15)",
                color: "#FFB800",
                border: "1px solid rgba(255,184,0,0.3)",
              }}
            >
              📡 Broadcast
            </button>
          </Link>
        </div>
      </nav>

      <div className="container py-8 max-w-6xl mx-auto px-6">
        {/* HERO */}
        <div className="mb-10 text-center">
          <div
            className="text-xs font-mono tracking-widest mb-3"
            style={{ color: "#00FF88" }}
          >
            SOVEREIGN SOCIAL DISTRIBUTION PLATFORM
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Zernio{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#00FF88,#00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Distribution
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Distribute your sovereign signal across all 12 platforms simultaneously. Every post
            auto-carries the ScrollVerse hashtags and CTA — no exceptions, no gatekeepers.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {[
              { label: "Platforms", value: "12", color: "#00D4FF" },
              { label: "Auto Hashtags", value: `${hashtags.length}`, color: "#00FF88" },
              { label: "Posts Created", value: `${stats.total}`, color: "#FFB800" },
              { label: "Scheduled", value: `${stats.scheduled}`, color: "#A855F7" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-black font-mono"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8">
          {(["compose", "posts", "analytics"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-bold uppercase transition-all"
              style={{
                background:
                  activeTab === tab ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.04)",
                color: activeTab === tab ? "#00FF88" : "#8899AA",
                border: `1px solid ${activeTab === tab ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {tab === "compose"
                ? "✍️ Compose"
                : tab === "posts"
                ? "📋 My Posts"
                : "📊 Analytics"}
            </button>
          ))}
        </div>

        {/* COMPOSE TAB */}
        {activeTab === "compose" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Caption */}
                <div>
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: "#00FF88" }}
                  >
                    ✍️ Your Message
                  </label>
                  <textarea
                    value={rawCaption}
                    onChange={(e) => setRawCaption(e.target.value)}
                    placeholder="Write your sovereign message here… The hashtags and CTA will be auto-appended."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${charWarning ? "#FF4444" : "rgba(0,212,255,0.2)"}`,
                      color: "white",
                    }}
                  />
                  <div
                    className="text-xs mt-1 text-right"
                    style={{ color: charWarning ? "#FF4444" : "#8899AA" }}
                  >
                    {charCount}/2200
                  </div>
                </div>

                {/* Platform selector */}
                <div>
                  <label
                    className="block text-sm font-bold mb-3"
                    style={{ color: "#00FF88" }}
                  >
                    📡 Select Platforms ({selectedPlatforms.length} selected)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => (
                      <PlatformChip
                        key={p.id}
                        platform={p}
                        selected={selectedPlatforms.includes(p.id)}
                        onToggle={() => togglePlatform(p.id)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedPlatforms(
                        selectedPlatforms.length === platforms.length
                          ? []
                          : platforms.map((p) => p.id)
                      )
                    }
                    className="mt-2 text-xs font-mono"
                    style={{ color: "#00D4FF" }}
                  >
                    {selectedPlatforms.length === platforms.length
                      ? "Deselect all"
                      : "Select all platforms"}
                  </button>
                </div>

                {/* Media URL */}
                <div>
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: "#00FF88" }}
                  >
                    🖼️ Media URL (optional)
                  </label>
                  <input
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://cdn.scrollverse.co/image.jpg"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "white",
                    }}
                  />
                </div>

                {/* Schedule */}
                <div>
                  <label
                    className="block text-sm font-bold mb-2"
                    style={{ color: "#00FF88" }}
                  >
                    ⏰ Schedule (optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      color: "white",
                      colorScheme: "dark",
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={buildPreview}
                    className="flex-1 py-3 rounded-xl text-sm font-bold"
                    style={{
                      background: "rgba(0,212,255,0.1)",
                      color: "#00D4FF",
                      border: "1px solid rgba(0,212,255,0.3)",
                    }}
                  >
                    👁 Preview
                  </button>
                  {isAuthenticated ? (
                    <button
                      type="submit"
                      disabled={
                        !rawCaption.trim() ||
                        selectedPlatforms.length === 0 ||
                        createPost.isPending
                      }
                      className="flex-1 py-3 rounded-xl text-sm font-bold"
                      style={{
                        background:
                          rawCaption.trim() && selectedPlatforms.length > 0
                            ? "linear-gradient(135deg,#00FF88,#00D4FF)"
                            : "rgba(255,255,255,0.05)",
                        color:
                          rawCaption.trim() && selectedPlatforms.length > 0
                            ? "#050B1A"
                            : "#8899AA",
                        cursor:
                          rawCaption.trim() && selectedPlatforms.length > 0
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      {createPost.isPending ? "⏳ Saving…" : "🚀 Save Post"}
                    </button>
                  ) : (
                    <a href={getLoginUrl()} className="flex-1">
                      <button
                        type="button"
                        className="w-full py-3 rounded-xl text-sm font-bold"
                        style={{
                          background: "linear-gradient(135deg,#00FF88,#00D4FF)",
                          color: "#050B1A",
                        }}
                      >
                        🔐 Login to Post
                      </button>
                    </a>
                  )}
                </div>

                {createPost.isSuccess && (
                  <div
                    className="p-3 rounded-xl text-sm text-center font-bold"
                    style={{
                      background: "rgba(0,255,136,0.1)",
                      border: "1px solid rgba(0,255,136,0.3)",
                      color: "#00FF88",
                    }}
                  >
                    ✓ Post saved! Sovereign signal queued for distribution.
                  </div>
                )}
              </form>
            </div>

            {/* Right: Preview + Hashtag info */}
            <div className="space-y-6">
              {/* Caption preview */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="font-bold text-white mb-3 text-sm">📋 Caption Preview</h3>
                {previewCaption ? (
                  <CaptionPreview caption={previewCaption} />
                ) : (
                  <div
                    className="text-center py-8 text-sm"
                    style={{ color: "#8899AA" }}
                  >
                    Click "Preview" to see your full caption with sovereign hashtags appended.
                  </div>
                )}
              </div>

              {/* Sovereign hashtags */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(0,255,136,0.03)",
                  border: "1px solid rgba(0,255,136,0.15)",
                }}
              >
                <h3 className="font-bold text-white mb-3 text-sm">
                  #️⃣ Auto-Injected Sovereign Hashtags
                </h3>
                <p className="text-xs mb-3" style={{ color: "#8899AA" }}>
                  These hashtags are automatically appended to every post — they cannot be
                  removed. This ensures every piece of content carries the ScrollVerse signal.
                </p>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{
                        background: "rgba(0,255,136,0.1)",
                        color: "#00FF88",
                        border: "1px solid rgba(0,255,136,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-3 text-xs font-mono"
                  style={{ color: "#00D4FF" }}
                >
                  🔗 CTA: {cta}
                </div>
              </div>

              {/* Platform reach */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="font-bold text-white mb-3 text-sm">
                  🌐 Platform Reach
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {platforms.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-1.5 text-xs p-2 rounded-lg"
                      style={{
                        background: selectedPlatforms.includes(p.id)
                          ? `${p.color}15`
                          : "rgba(255,255,255,0.02)",
                        border: `1px solid ${selectedPlatforms.includes(p.id) ? `${p.color}40` : "rgba(255,255,255,0.06)"}`,
                        color: selectedPlatforms.includes(p.id) ? p.color : "#8899AA",
                      }}
                    >
                      <span>{p.icon}</span>
                      <span className="truncate">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POSTS TAB */}
        {activeTab === "posts" && (
          <div>
            {!isAuthenticated ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                  Login to view and manage your sovereign posts.
                </p>
                <a href={getLoginUrl()}>
                  <button
                    className="px-8 py-3 rounded-xl font-bold"
                    style={{
                      background: "linear-gradient(135deg,#00FF88,#00D4FF)",
                      color: "#050B1A",
                    }}
                  >
                    Login to Continue
                  </button>
                </a>
              </div>
            ) : posts && posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-white mb-2">No Posts Yet</h3>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
                  Compose your first sovereign post and distribute it across all platforms.
                </p>
                <button
                  onClick={() => setActiveTab("compose")}
                  className="px-8 py-3 rounded-xl font-bold"
                  style={{
                    background: "linear-gradient(135deg,#00FF88,#00D4FF)",
                    color: "#050B1A",
                  }}
                >
                  Compose First Post
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">
                    {posts?.length || 0} Sovereign Posts
                  </h3>
                  <div className="flex gap-3 text-xs">
                    {[
                      { label: "Draft", count: stats.draft, color: "#8899AA" },
                      { label: "Scheduled", count: stats.scheduled, color: "#FFB800" },
                      { label: "Published", count: stats.published, color: "#00FF88" },
                    ].map((s) => (
                      <span key={s.label} style={{ color: s.color }}>
                        {s.label}: {s.count}
                      </span>
                    ))}
                  </div>
                </div>
                {posts?.map((post: { id: number; raw_caption: string; full_caption: string; platforms: string; status: string; created_at: Date; scheduled_at: Date | null; cta_url: string }) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDelete={(id) => deletePost.mutate({ id })}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Total Posts",
                value: stats.total,
                icon: "📋",
                color: "#00D4FF",
                desc: "All-time sovereign posts created",
              },
              {
                title: "Scheduled",
                value: stats.scheduled,
                icon: "⏰",
                color: "#FFB800",
                desc: "Posts queued for future distribution",
              },
              {
                title: "Published",
                value: stats.published,
                icon: "✅",
                color: "#00FF88",
                desc: "Posts successfully distributed",
              },
              {
                title: "Platforms",
                value: 12,
                icon: "🌐",
                color: "#A855F7",
                desc: "Active distribution channels",
              },
              {
                title: "Hashtags",
                value: hashtags.length,
                icon: "#️⃣",
                color: "#F472B6",
                desc: "Auto-injected sovereign tags",
              },
              {
                title: "Reach Multiplier",
                value: "12×",
                icon: "⚡",
                color: "#FF6B35",
                desc: "Every post hits 12 platforms",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${card.color}25`,
                }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <div
                  className="text-3xl font-black font-mono mb-1"
                  style={{ color: card.color }}
                >
                  {card.value}
                </div>
                <div className="font-bold text-white text-sm mb-1">{card.title}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  {card.desc}
                </div>
              </div>
            ))}

            {/* Hashtag performance */}
            <div
              className="rounded-xl p-6 md:col-span-2 lg:col-span-3"
              style={{
                background: "rgba(0,255,136,0.03)",
                border: "1px solid rgba(0,255,136,0.15)",
              }}
            >
              <h3 className="font-bold text-white mb-4">
                #️⃣ Sovereign Hashtag Arsenal
              </h3>
              <div className="flex flex-wrap gap-3">
                {hashtags.map((tag, i) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: "rgba(0,255,136,0.08)",
                      border: "1px solid rgba(0,255,136,0.2)",
                    }}
                  >
                    <span className="text-sm font-mono" style={{ color: "#00FF88" }}>
                      {tag}
                    </span>
                    <span
                      className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(0,255,136,0.15)",
                        color: "#00D4FF",
                      }}
                    >
                      #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs" style={{ color: "#8899AA" }}>
                These hashtags are permanently bound to every post distributed through Zernio.
                They ensure maximum discoverability and brand consistency across all platforms.
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div
          className="mt-16 text-center py-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            KUN FAYAKŪN × ∞ · Zernio Sovereign Distribution · scrollverse.co
          </div>
        </div>
      </div>
    </div>
  );
}
