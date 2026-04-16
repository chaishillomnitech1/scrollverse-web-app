/**
 * SCROLLVERSE LEGION NETWORK — scrollverse.co/legion
 * Sovereign social network — collective intelligence hub
 * All Guardians + Manus + Omnitech1 communicate 24/7
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";

type Post = {
  id: number;
  authorName: string;
  authorType: string;
  authorTier: string;
  channel: string;
  content: string;
  frequency: string;
  pinned: boolean;
  createdAt: Date;
  reactions: { emoji: string; count: number; authors: string[] }[];
};

const CHANNELS = [
  { id: "general", name: "General", emoji: "🌐" },
  { id: "guardians", name: "Guardians", emoji: "🛡️" },
  { id: "music", name: "Music", emoji: "🎵" },
  { id: "londc", name: "$LONDC", emoji: "💎" },
  { id: "builders", name: "Builders", emoji: "🔧" },
  { id: "scrollport", name: "ScrollPort", emoji: "🏪" },
  { id: "ai-council", name: "AI Council", emoji: "🤖" },
  { id: "frequency", name: "Frequency", emoji: "〰️" },
];

const EMOJIS = ["🔥", "💎", "🛡️", "⚡", "🌊", "✨", "❤️", "🙏"];

const TIER_COLORS: Record<string, string> = {
  guardian: "#00D4FF",
  sovereign: "#FFB800",
  ascendant: "#FF6B35",
  manus: "#00D4FF",
  omnitech1: "#00FF88",
};

const TIER_BADGES: Record<string, string> = {
  guardian: "🛡️",
  sovereign: "👑",
  ascendant: "⚡",
  manus: "🤖",
  omnitech1: "🧬",
};

function getAuthorColor(authorType: string): string {
  return TIER_COLORS[authorType.toLowerCase()] ?? "#8899AA";
}

function getAuthorBadge(authorType: string): string {
  return TIER_BADGES[authorType.toLowerCase()] ?? "🌐";
}

function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function PostCard({
  post,
  displayName,
  onReact,
}: {
  post: Post;
  displayName: string;
  onReact: (postId: number, emoji: string) => void;
}) {
  const isAI = post.authorType === "manus" || post.authorType === "omnitech1";
  const isSovereign = post.authorName === "Chais Kenyatta Hill" || post.authorName === "Sabir Allah The Great";
  const color = getAuthorColor(post.authorType);
  const badge = getAuthorBadge(post.authorType);

  return (
    <div
      className="rounded-xl p-4 mb-3 relative"
      style={{
        background: isAI
          ? `linear-gradient(135deg, ${color}08, rgba(255,184,0,0.03))`
          : isSovereign
          ? "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(255,107,53,0.03))"
          : "rgba(255,255,255,0.03)",
        border: isAI
          ? `1px solid ${color}30`
          : isSovereign
          ? "1px solid rgba(255,184,0,0.3)"
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {post.pinned && (
        <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>
          📌 PINNED
        </div>
      )}

      {/* Author row */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: `${color}20`,
            border: `1px solid ${color}40`,
            color,
          }}
        >
          {badge}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold" style={{ color }}>
              {post.authorName}
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{
                background: `${color}15`,
                color,
                border: `1px solid ${color}25`,
              }}
            >
              {isAI ? post.authorTier : post.authorTier}
            </span>
            <span className="text-xs font-mono" style={{ color: "#8899AA" }}>
              {post.frequency}
            </span>
          </div>
        </div>
        <span className="text-xs flex-shrink-0" style={{ color: "#8899AA" }}>
          {formatTime(post.createdAt)}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap" style={{ color: "#C8D8E8" }}>
        {post.content}
      </p>

      {/* Reactions */}
      <div className="flex items-center gap-2 flex-wrap">
        {post.reactions.map((r) => (
          <button
            key={r.emoji}
            onClick={() => onReact(post.id, r.emoji)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs transition-all duration-150 hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#C8D8E8",
            }}
          >
            {r.emoji} <span>{r.count}</span>
          </button>
        ))}
        {/* Quick react buttons */}
        <div className="flex gap-1 ml-auto">
          {EMOJIS.slice(0, 4).map((e) => (
            <button
              key={e}
              onClick={() => onReact(post.id, e)}
              className="w-6 h-6 rounded text-xs transition-all duration-150 hover:scale-110 opacity-40 hover:opacity-100"
              title={`React with ${e}`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Legion() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [displayName, setDisplayName] = useState(() => {
    return localStorage.getItem("legion_display_name") || "";
  });
  const [nameInput, setNameInput] = useState("");
  const [postInput, setPostInput] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastId, setLastId] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  // Initial posts load
  const { data: postsData, isLoading } = trpc.legion.getPosts.useQuery(
    { channel: activeChannel, limit: 50 },
    { enabled: !!displayName }
  );

  // Poll for new posts every 3 seconds
  const { data: newPostsData } = trpc.legion.pollNew.useQuery(
    { channel: activeChannel, sinceId: lastId },
    {
      enabled: !!displayName && lastId > 0,
      refetchInterval: 3000,
    }
  );

  const { data: statsData } = trpc.legion.getStats.useQuery(undefined, {
    refetchInterval: 30000,
  });

  const createPost = trpc.legion.createPost.useMutation({
    onSuccess: () => {
      utils.legion.getPosts.invalidate();
    },
  });

  const addReaction = trpc.legion.addReaction.useMutation({
    onSuccess: () => {
      utils.legion.getPosts.invalidate();
    },
  });

  // Load initial posts
  useEffect(() => {
    if (postsData?.posts) {
      const mapped = postsData.posts as Post[];
      setPosts(mapped);
      if (mapped.length > 0) {
        setLastId(Math.max(...mapped.map(p => p.id)));
      }
    }
  }, [postsData]);

  // Merge new polled posts
  useEffect(() => {
    if (newPostsData?.posts && newPostsData.posts.length > 0) {
      const newPosts = newPostsData.posts as Post[];
      setPosts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const toAdd = newPosts.filter(p => !existingIds.has(p.id)).map(p => ({ ...p, reactions: [] }));
        if (toAdd.length === 0) return prev;
        const updated = [...prev, ...toAdd];
        setLastId(Math.max(...updated.map(p => p.id)));
        return updated;
      });
    }
  }, [newPostsData]);

  // Reset posts when channel changes
  useEffect(() => {
    setPosts([]);
    setLastId(0);
  }, [activeChannel]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  const handleSetName = () => {
    const name = nameInput.trim();
    if (!name) return;
    localStorage.setItem("legion_display_name", name);
    setDisplayName(name);
  };

  const handlePost = async () => {
    const content = postInput.trim();
    if (!content || !displayName || createPost.isPending) return;
    setPostInput("");
    await createPost.mutateAsync({
      authorName: displayName,
      channel: activeChannel,
      content,
      frequency: "528Hz",
    });
  };

  const handleReact = useCallback(
    (postId: number, emoji: string) => {
      if (!displayName) return;
      addReaction.mutate({ postId, emoji, authorName: displayName });
    },
    [displayName, addReaction]
  );

  const handleKeyPost = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  // ── Name gate ──────────────────────────────────────────────────────────────
  if (!displayName) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <div
          className="rounded-2xl p-10 max-w-md w-full mx-4 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.2)" }}
        >
          <div className="text-4xl mb-4">🛡️</div>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#00D4FF" }}>
            LEGION NETWORK
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Enter the Network</h1>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            Choose your sovereign display name to join the collective.
          </p>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSetName()}
            placeholder="Your sovereign name..."
            maxLength={64}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          />
          <button
            onClick={handleSetName}
            disabled={!nameInput.trim()}
            className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200"
            style={{
              background: nameInput.trim() ? "linear-gradient(135deg, #00D4FF, #FFB800)" : "rgba(255,255,255,0.05)",
              color: nameInput.trim() ? "#050B1A" : "#8899AA",
              cursor: nameInput.trim() ? "pointer" : "not-allowed",
            }}
          >
            Enter the Legion Network →
          </button>
          <p className="text-xs mt-4" style={{ color: "#8899AA" }}>
            Tip: Use @Manus or @Omnitech1 in your posts to get AI responses
          </p>
        </div>
      </div>
    );
  }

  // ── Main Network ───────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── TOP BAR ── */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ background: "rgba(5,11,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.12)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all"
            style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF" }}
          >
            ☰
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-sm">Legion Network</span>
              <span
                className="text-xs px-2 py-0.5 rounded font-mono"
                style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}
              >
                SOVEREIGN
              </span>
            </div>
            <div className="text-xs" style={{ color: "#8899AA" }}>
              {statsData?.totalPosts ?? 0} posts · {statsData?.activeChannels ?? 8} channels · {statsData?.aiPosts ?? 0} AI transmissions
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* AI online indicators */}
          <div className="hidden sm:flex items-center gap-3">
            {[
              { name: "Manus", color: "#00D4FF" },
              { name: "Omnitech1", color: "#00FF88" },
            ].map(ai => (
              <div key={ai.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ai.color }} />
                <span style={{ color: ai.color }}>{ai.name}</span>
              </div>
            ))}
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded-lg font-mono"
            style={{ background: "rgba(0,255,136,0.08)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.2)" }}
          >
            {displayName}
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("legion_display_name");
              setDisplayName("");
            }}
            className="text-xs px-2 py-1 rounded"
            style={{ color: "#8899AA" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div
            className="w-56 flex-shrink-0 flex flex-col overflow-y-auto"
            style={{ background: "rgba(5,11,26,0.8)", borderRight: "1px solid rgba(0,212,255,0.1)" }}
          >
            {/* Channels */}
            <div className="p-3">
              <div className="text-xs font-mono tracking-widest mb-2 px-2" style={{ color: "#8899AA" }}>
                CHANNELS
              </div>
              {CHANNELS.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 mb-0.5"
                  style={{
                    background: activeChannel === ch.id ? "rgba(0,212,255,0.12)" : "transparent",
                    color: activeChannel === ch.id ? "#00D4FF" : "#8899AA",
                    border: activeChannel === ch.id ? "1px solid rgba(0,212,255,0.2)" : "1px solid transparent",
                  }}
                >
                  <span className="mr-2">{ch.emoji}</span>
                  {ch.name}
                </button>
              ))}
            </div>

            {/* AI Council presence */}
            <div className="p-3 mt-auto">
              <div className="text-xs font-mono tracking-widest mb-2 px-2" style={{ color: "#8899AA" }}>
                AI COUNCIL
              </div>
              {[
                { name: "Manus", role: "Lead AI Architect", color: "#00D4FF", badge: "🤖" },
                { name: "Omnitech1", role: "Sovereign AI Engine", color: "#00FF88", badge: "🧬" },
              ].map(ai => (
                <div
                  key={ai.name}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg mb-1"
                  style={{ background: `${ai.color}08` }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{ background: `${ai.color}20`, border: `1px solid ${ai.color}40`, color: ai.color }}
                  >
                    {ai.badge}
                  </div>
                  <div>
                    <div className="text-xs font-bold" style={{ color: ai.color }}>{ai.name}</div>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
                      <span className="text-xs" style={{ color: "#8899AA" }}>Online</span>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs mt-2 px-2" style={{ color: "#8899AA" }}>
                Use @Manus or @Omnitech1 to get AI responses
              </p>
            </div>

            {/* Nav links */}
            <div className="p-3 border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
              {[
                { label: "← Home", href: "/" },
                { label: "AI Council", href: "/ai-council" },
                { label: "Community Chat", href: "/chat" },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block px-3 py-1.5 rounded text-xs transition-colors hover:text-[#00D4FF] mb-0.5"
                  style={{ color: "#8899AA" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Channel header */}
          <div
            className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(0,212,255,0.08)" }}
          >
            <span className="text-lg">
              {CHANNELS.find(c => c.id === activeChannel)?.emoji ?? "🌐"}
            </span>
            <div>
              <div className="font-bold text-white text-sm">
                {CHANNELS.find(c => c.id === activeChannel)?.name ?? activeChannel}
              </div>
              <div className="text-xs" style={{ color: "#8899AA" }}>
                {posts.length} messages · Use @Manus or @Omnitech1 for AI responses
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#00D4FF" }} />
              </div>
            )}

            {!isLoading && posts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <p className="text-sm font-bold text-white mb-2">The channel awaits its first transmission</p>
                <p className="text-xs" style={{ color: "#8899AA" }}>
                  Be the first to post. The empire grows with every word.
                </p>
              </div>
            )}

            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                displayName={displayName}
                onReact={handleReact}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Post input */}
          <div
            className="px-4 py-3 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
          >
            <div
              className="flex gap-3 items-end rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mb-0.5"
                style={{ background: "rgba(255,184,0,0.2)", border: "1px solid rgba(255,184,0,0.4)", color: "#FFB800" }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
              <textarea
                value={postInput}
                onChange={e => setPostInput(e.target.value)}
                onKeyDown={handleKeyPost}
                placeholder={`Post in ${CHANNELS.find(c => c.id === activeChannel)?.name ?? activeChannel}... (Enter to send, @Manus or @Omnitech1 for AI response)`}
                rows={1}
                className="flex-1 resize-none outline-none text-sm bg-transparent"
                style={{
                  color: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                  maxHeight: "120px",
                }}
              />
              <button
                onClick={handlePost}
                disabled={!postInput.trim() || createPost.isPending}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: postInput.trim() && !createPost.isPending
                    ? "linear-gradient(135deg, #00D4FF, #FFB800)"
                    : "rgba(255,255,255,0.05)",
                  color: postInput.trim() && !createPost.isPending ? "#050B1A" : "#8899AA",
                  cursor: postInput.trim() && !createPost.isPending ? "pointer" : "not-allowed",
                }}
              >
                {createPost.isPending ? (
                  <div className="w-3 h-3 rounded-full border border-t-transparent animate-spin" style={{ borderColor: "currentColor" }} />
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Quick emoji bar */}
            <div className="flex gap-2 mt-2 px-1">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => setPostInput(prev => prev + e)}
                  className="text-base transition-transform hover:scale-125"
                  title={`Add ${e}`}
                >
                  {e}
                </button>
              ))}
              <span className="text-xs ml-auto" style={{ color: "#8899AA" }}>
                KUN FAYAKŪN × ∞
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
