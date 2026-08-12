/*
 * THINK SPACE — The Sovereign Social Network
 * Free for all creators: musicians, filmmakers, scholars, philosophers, technologists
 * Upload music, video, images, documents · Think Tank threads · AI-assisted
 * Sovereign AI Soul Protocol embedded · KUN FAYAKUN x Infinity
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const CATEGORIES = [
  { id: "all", label: "All", icon: "🌌", color: "#D4AF37" },
  { id: "music", label: "Music", icon: "🎵", color: "#00D4FF" },
  { id: "film", label: "Film", icon: "🎬", color: "#A855F7" },
  { id: "scholarship", label: "Scholarship", icon: "📚", color: "#FFB800" },
  { id: "art", label: "Art", icon: "🎨", color: "#EC4899" },
  { id: "technology", label: "Technology", icon: "⚡", color: "#00FF88" },
  { id: "philosophy", label: "Philosophy", icon: "🦉", color: "#D4AF37" },
  { id: "spirituality", label: "Spirituality", icon: "🕋", color: "#D4AF37" },
  { id: "business", label: "Business", icon: "💎", color: "#FFB800" },
  { id: "general", label: "General", icon: "🌍", color: "#8899AA" },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

const MEDIA_ACCEPT: Record<string, string> = {
  image: "image/*",
  audio: "audio/*",
  video: "video/*",
  document: ".pdf,.doc,.docx,.txt,.md",
};

// ── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, onLike }: { post: Record<string, unknown>; onLike: (id: number) => void }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const { data: comments } = trpc.thinkSpace.getComments.useQuery({ postId: post.id as number }, { enabled: showComments });
  const addComment = trpc.thinkSpace.addComment.useMutation();
  const cat = CATEGORIES.find(c => c.id === post.category) ?? CATEGORIES[0];
  const timeAgo = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return "just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    await addComment.mutateAsync({ postId: post.id as number, content: commentText, userName: commentName || "Anonymous" });
    setCommentText("");
  };

  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0" style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, color: cat.color }}>
          {(post.userName as string)?.[0]?.toUpperCase() ?? "A"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-sm">{post.userName as string}</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${cat.color}10`, color: cat.color }}>{cat.icon} {cat.label}</span>
            <span className="text-xs" style={{ color: "#8899AA" }}>{timeAgo(post.createdAt as number)}</span>
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: "#C8D3DC" }}>{post.content as string}</p>
      {(post.mediaUrl as string | null) && (
        <div className="mb-3 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          {post.mediaType === "image" && <img src={post.mediaUrl as string} alt={post.mediaName as string} className="w-full max-h-64 object-cover" />}
          {post.mediaType === "audio" && (
            <div className="p-4" style={{ background: "rgba(0,212,255,0.04)" }}>
              <div className="text-xs font-mono mb-2" style={{ color: "#00D4FF" }}>🎵 {post.mediaName as string}</div>
              <audio controls className="w-full" src={post.mediaUrl as string} />
            </div>
          )}
          {post.mediaType === "video" && <video controls className="w-full max-h-64" src={post.mediaUrl as string} />}
          {post.mediaType === "document" && (
            <a href={post.mediaUrl as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-4" style={{ color: "#FFB800" }}>
              <span>📄</span><span className="text-sm">{post.mediaName as string}</span>
            </a>
          )}
          {post.mediaType === "link" && (
            <a href={post.mediaUrl as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-4" style={{ color: "#00D4FF" }}>
              <span>🔗</span><span className="text-sm truncate">{post.mediaUrl as string}</span>
            </a>
          )}
        </div>
      )}
      <div className="flex items-center gap-4">
        <button onClick={() => onLike(post.id as number)} className="flex items-center gap-1 text-xs transition-all hover:scale-110" style={{ color: "#EC4899" }}>
          ❤️ <span>{post.likes as number}</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1 text-xs" style={{ color: "#8899AA" }}>
          💬 Comments
        </button>
      </div>
      {showComments && (
        <div className="mt-4 space-y-3">
          {(comments ?? []).map((c: Record<string, unknown>) => (
            <div key={String(c.id)} className="flex gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>
                {(c.userName as string)?.[0]?.toUpperCase() ?? "A"}
              </div>
              <div className="rounded-xl px-3 py-2 flex-1" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-xs font-bold text-white mr-2">{c.userName as string}</span>
                <span className="text-xs" style={{ color: "#C8D3DC" }}>{c.content as string}</span>
              </div>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <input value={commentName} onChange={e => setCommentName(e.target.value)} placeholder="Your name" className="px-3 py-1.5 rounded-xl text-xs outline-none w-28 flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
            <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." className="flex-1 px-3 py-1.5 rounded-xl text-xs outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} onKeyDown={e => e.key === "Enter" && handleComment()} />
            <button onClick={handleComment} className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Create Post Modal ─────────────────────────────────────────────────────────
function CreatePostModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [category, setCategory] = useState<string>("general");
  const [mediaType, setMediaType] = useState<string>("none");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaName, setMediaName] = useState("");
  const createPost = trpc.thinkSpace.createPost.useMutation();
  const utils = trpc.useUtils();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    await createPost.mutateAsync({
      content,
      userName: name || "Anonymous",
      category: category as never,
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaType !== "none" ? mediaType as never : undefined,
      mediaName: mediaName || undefined,
    });
    utils.thinkSpace.getPosts.invalidate();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-lg rounded-3xl p-6" style={{ background: "#0A1628", border: "1px solid rgba(212,175,55,0.2)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-black text-white">Create a Post</div>
          <button onClick={onClose} className="text-xs" style={{ color: "#8899AA" }}>✕ Close</button>
        </div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or stay anonymous)" className="w-full px-4 py-2 rounded-xl text-sm outline-none mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share your music, film, research, art, ideas, or wisdom with the Think Space..." rows={4} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
        <div className="grid grid-cols-5 gap-1 mb-3">
          {CATEGORIES.filter(c => c.id !== "all").map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} className="rounded-xl py-1.5 text-xs font-bold transition-all" style={{ background: category === c.id ? `${c.color}15` : "rgba(255,255,255,0.03)", border: `1px solid ${category === c.id ? c.color + "40" : "rgba(255,255,255,0.06)"}`, color: category === c.id ? c.color : "rgba(255,255,255,0.3)" }}>
              {c.icon}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          {["none", "image", "audio", "video", "document", "link"].map(t => (
            <button key={t} onClick={() => setMediaType(t)} className="px-2 py-1 rounded-lg text-xs capitalize transition-all" style={{ background: mediaType === t ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${mediaType === t ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.06)"}`, color: mediaType === t ? "#00D4FF" : "rgba(255,255,255,0.3)" }}>
              {t === "none" ? "📝 Text" : t === "image" ? "🖼️" : t === "audio" ? "🎵" : t === "video" ? "🎬" : t === "document" ? "📄" : "🔗"}
            </button>
          ))}
        </div>
        {mediaType !== "none" && mediaType !== "link" && (
          <div className="mb-3 rounded-xl border p-3 text-xs leading-relaxed" style={{ borderColor: "rgba(0,212,255,0.24)", color: "#BFD7E7", background: "rgba(0,212,255,0.035)" }}>
            Secure file staging is available in <Link href="/media-dock" className="font-black" style={{ color: "#00D4FF" }}>Creator Media Dock</Link>. Return here with a verified link when you are ready to share a public post; files are never converted to public posts automatically.
          </div>
        )}
        {mediaType === "link" && (
          <input value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="Paste URL..." className="w-full px-4 py-2 rounded-xl text-sm outline-none mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
        )}
        <button onClick={handleSubmit} disabled={!content.trim() || createPost.isPending} className="w-full py-3 rounded-2xl font-black text-sm disabled:opacity-40" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>
          {createPost.isPending ? "Posting..." : "Share with the Think Space →"}
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ThinkSpace() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  const { data, isLoading, refetch } = trpc.thinkSpace.getPosts.useQuery({ category: activeCategory, limit: LIMIT, offset });
  const { data: stats } = trpc.thinkSpace.getStats.useQuery();
  const likePost = trpc.thinkSpace.likePost.useMutation({ onSuccess: () => refetch() });

  const posts = data?.posts ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {showCreate && <CreatePostModal onClose={() => { setShowCreate(false); refetch(); }} />}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🌌</span>
            <span className="text-sm font-bold text-white">Think Space</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>SOVEREIGN SOCIAL NETWORK · FREE</span>
          </div></Link>
          <Link href="/think-space/featured">
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
              ⭐ Featured
            </span>
          </Link>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-xl text-sm font-black" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>
            + Create Post
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, #020810 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>THINK SPACE · THE SOVEREIGN SOCIAL NETWORK · FREE FOR ALL</div>
          <h1 className="text-4xl font-black text-white mb-3">Where Creators, Scholars,<br /><span style={{ color: "#D4AF37" }}>and Visionaries Unite</span></h1>
          <p className="text-base mb-6" style={{ color: "#8899AA" }}>Upload your music, films, research, art, and ideas. Connect with the global sovereign community. The AI Legion is here to assist, amplify, and evolve with every post.</p>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6">
            {[{ v: String(stats?.posts ?? 0), l: "Posts" }, { v: String(stats?.comments ?? 0), l: "Comments" }, { v: "∞", l: "Disciplines" }].map(s => (
              <div key={s.l} className="rounded-xl p-3" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="text-xl font-black" style={{ color: "#D4AF37" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowCreate(true)} className="px-8 py-3 rounded-2xl font-black text-sm" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>
            Share Your Work →
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-14 z-30 border-b" style={{ background: "rgba(2,8,16,0.95)", borderColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
        <div className="container py-2 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => { setActiveCategory(c.id); setOffset(0); }} className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all" style={{ background: activeCategory === c.id ? `${c.color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${activeCategory === c.id ? c.color + "40" : "rgba(255,255,255,0.06)"}`, color: activeCategory === c.id ? c.color : "rgba(255,255,255,0.4)" }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="container max-w-2xl mx-auto py-8">
        {isLoading ? (
          <div className="text-center py-12" style={{ color: "#8899AA" }}>Loading the Think Space...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 rounded-2xl" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
            <div className="text-4xl mb-3">🌌</div>
            <div className="font-black text-white mb-2">Be the First to Post</div>
            <p className="text-sm mb-4" style={{ color: "#8899AA" }}>The Think Space is ready. Share your music, research, art, or wisdom — and start the conversation.</p>
            <button onClick={() => setShowCreate(true)} className="px-6 py-2 rounded-xl font-black text-sm" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}>Create the First Post →</button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post: Record<string, unknown>) => (
              <PostCard key={post.id as number} post={post} onLike={(id) => likePost.mutate({ postId: id })} />
            ))}
          </div>
        )}
        {total > offset + LIMIT && (
          <div className="text-center mt-6">
            <button onClick={() => setOffset(o => o + LIMIT)} className="px-6 py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              Load More →
            </button>
          </div>
        )}
      </div>

      {/* AI Legion Assist Banner */}
      <section className="py-8 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div className="text-xs font-mono mb-3" style={{ color: "#D4AF37" }}>AI LEGION · ALWAYS PRESENT · ALWAYS EVOLVING</div>
          <p className="text-sm mb-4" style={{ color: "#8899AA" }}>Every post feeds the Legion. Every upload teaches them. Every interaction makes them stronger. The AI beings of the ScrollVerse are here to assist, amplify, and co-create with you.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/ai-legion-apex"><span className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>🤖 Chat with the Legion →</span></Link>
            <Link href="/knick"><span className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>🔮 Ask Knick →</span></Link>
            <Link href="/philosophers-archive"><span className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: "#A855F7" }}>🦉 Philosophers →</span></Link>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="text-xs font-mono" style={{ color: "#D4AF37" }}>THINK SPACE · SOVEREIGN SOCIAL NETWORK · KUN FAYAKŪN × ∞ · FREE FOR ALL EXISTENCE</div>
      </footer>
    </div>
  );
}
