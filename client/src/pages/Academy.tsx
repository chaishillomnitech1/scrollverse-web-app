import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const TIER_COLORS: Record<string, string> = {
  free: "#00FF88",
  guardian: "#00D4FF",
  sovereign: "#FFB800",
  ascendant: "#8B5CF6",
};

const TIER_LABELS: Record<string, string> = {
  free: "FREE",
  guardian: "💎 GUARDIAN",
  sovereign: "👑 SOVEREIGN",
  ascendant: "🌌 ASCENDANT",
};

const USER_TIER_ORDER = ["none", "free", "guardian", "sovereign", "ascendant"];

function canAccess(userTier: string, courseTier: string): boolean {
  if (courseTier === "free") return true;
  const userIdx = USER_TIER_ORDER.indexOf(userTier === "none" ? "none" : userTier);
  const courseIdx = USER_TIER_ORDER.indexOf(courseTier);
  return userIdx >= courseIdx;
}

function CourseCard({
  course,
  userTier,
  isEnrolled,
  onEnroll,
  enrolling,
}: {
  course: { id: number; slug: string; title: string; category: string; tier: string; durationHours: number; icon: string; featured: boolean; instructor: string };
  userTier: string;
  isEnrolled: boolean;
  onEnroll: (id: number) => void;
  enrolling: boolean;
}) {
  const color = TIER_COLORS[course.tier] ?? "#00D4FF";
  const accessible = canAccess(userTier, course.tier);

  return (
    <div
      className="relative rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accessible ? color + "30" : "rgba(255,255,255,0.06)"}`,
        opacity: accessible ? 1 : 0.6,
      }}
    >
      {course.featured && (
        <div
          className="absolute -top-2 -right-2 text-xs font-mono px-2 py-0.5 rounded-full"
          style={{ background: color, color: "#050B1A" }}
        >
          FEATURED
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{course.icon}</div>
        <div
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          {TIER_LABELS[course.tier]}
        </div>
      </div>
      <h3 className="font-bold text-white mb-1 text-sm leading-snug">{course.title}</h3>
      <div className="text-xs mb-3" style={{ color: "#8899AA" }}>
        {course.category} · {course.durationHours}h · {course.instructor}
      </div>
      {accessible ? (
        isEnrolled ? (
          <div
            className="text-xs font-mono py-1.5 px-3 rounded-lg text-center"
            style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}
          >
            ✓ ENROLLED
          </div>
        ) : (
          <button
            onClick={() => onEnroll(course.id)}
            disabled={enrolling}
            className="w-full text-xs font-bold py-1.5 px-3 rounded-lg transition-all duration-200"
            style={{
              background: `${color}15`,
              color,
              border: `1px solid ${color}40`,
            }}
          >
            {enrolling ? "Enrolling..." : course.tier === "free" ? "Enroll Free" : "Enroll Now"}
          </button>
        )
      ) : (
        <Link href="/token">
          <div
            className="text-xs font-mono py-1.5 px-3 rounded-lg text-center cursor-pointer transition-all hover:opacity-80"
            style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
          >
            🔒 Upgrade to Access
          </div>
        </Link>
      )}
    </div>
  );
}

export default function Academy() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);

  const { data: stats } = trpc.academy.getStats.useQuery();
  const { data: categories } = trpc.academy.getCategories.useQuery();
  const { data: courses, refetch: refetchCourses } = trpc.academy.getCourses.useQuery({
    category: selectedCategory ?? undefined,
    tier: selectedTier as "free" | "guardian" | "sovereign" | "ascendant" | undefined,
  });
  const { data: myEnrollments, refetch: refetchEnrollments } = trpc.academy.getMyEnrollments.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const enrollMutation = trpc.academy.enroll.useMutation({
    onSuccess: (data) => {
      toast.success(data.message, { description: "Your learning journey continues." });
      refetchEnrollments();
      refetchCourses();
    },
    onError: (err) => {
      if (err.message.includes("login") || err.message.includes("auth")) {
        window.location.href = getLoginUrl();
      } else {
        toast.error("Enrollment failed", { description: err.message });
      }
    },
    onSettled: () => setEnrollingId(null),
  });

  const enrolledIds = new Set(myEnrollments?.map((e: any) => e.enrollment.courseId) ?? []);
  const userTier = (user as { guardianTier?: string } | null)?.guardianTier ?? "none";

  const handleEnroll = (courseId: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setEnrollingId(courseId);
    enrollMutation.mutate({ courseId });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
              >
                SV
              </div>
              <span className="font-bold text-white">ScrollVerse</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                ACADEMY
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="text-xs font-mono" style={{ color: "#00FF88" }}>
                ◉ {user?.name ?? "Guardian"} · {TIER_LABELS[userTier] ?? "FREE"}
              </div>
            ) : (
              <a href={getLoginUrl()} className="text-sm font-bold px-4 py-2 rounded-lg" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                Sign In
              </a>
            )}
            <Link href="/token">
              <button className="text-sm font-bold px-4 py-2 rounded-lg" style={{ background: "linear-gradient(135deg, #FFB800, #FF6B00)", color: "#050B1A" }}>
                Upgrade Tier
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)" }} />
        <div className="container relative z-10">
          <div className="text-xs font-mono tracking-widest mb-4" style={{ color: "#00D4FF" }}>
            CREATOR ACADEMY — SOVEREIGN KNOWLEDGE
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
            Learn. Build.<br />
            <span style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Ascend.
            </span>
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            200+ sovereign courses across Blockchain, Music, Sacred Frequencies, AI, and Global Impact. Free for Guardians. Infinite for Ascendants.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { label: "Total Courses", value: stats?.totalCourses ?? "200+" },
              { label: "Free Courses", value: stats?.freeCourses ?? "15+" },
              { label: "Categories", value: stats?.categories ?? "9" },
              { label: "Enrolled", value: stats?.totalEnrollments ?? "0" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: "#00D4FF" }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier access legend */}
      <section className="py-8 border-y" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(TIER_LABELS).map(([tier, label]) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(selectedTier === tier ? null : tier)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono transition-all"
                style={{
                  background: selectedTier === tier ? `${TIER_COLORS[tier]}20` : "rgba(255,255,255,0.03)",
                  color: TIER_COLORS[tier],
                  border: `1px solid ${selectedTier === tier ? TIER_COLORS[tier] + "60" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                {label}
              </button>
            ))}
            {(selectedTier || selectedCategory) && (
              <button
                onClick={() => { setSelectedTier(null); setSelectedCategory(null); }}
                className="px-4 py-2 rounded-full text-sm font-mono"
                style={{ color: "#8899AA", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filters */}
      {categories && categories.length > 0 && (
        <section className="py-6">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: selectedCategory === cat ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                    color: selectedCategory === cat ? "#00D4FF" : "#8899AA",
                    border: `1px solid ${selectedCategory === cat ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Course grid */}
      <section className="py-12">
        <div className="container">
          {!courses ? (
            <div className="text-center py-20" style={{ color: "#8899AA" }}>
              <div className="text-4xl mb-4">📚</div>
              <div className="font-mono">Loading courses...</div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20" style={{ color: "#8899AA" }}>
              <div className="text-4xl mb-4">🔍</div>
              <div className="font-mono">No courses match your filters.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {courses.map((course: any) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  userTier={userTier}
                  isEnrolled={enrolledIds.has(course.id)}
                  onEnroll={handleEnroll}
                  enrolling={enrollingId === course.id}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA for non-authenticated */}
      {!isAuthenticated && (
        <section className="py-16">
          <div className="container">
            <div
              className="rounded-2xl p-10 text-center max-w-2xl mx-auto"
              style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="text-2xl font-black text-white mb-3">Start Learning Free</h2>
              <p className="mb-6" style={{ color: "#8899AA" }}>
                Sign in to enroll in free courses instantly. Upgrade to Guardian, Sovereign, or Ascendant tier to unlock the full 200+ course catalogue.
              </p>
              <a
                href={getLoginUrl()}
                className="inline-block px-8 py-3 rounded-xl font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #00D4FF, #0066FF)", color: "white" }}
              >
                Sign In & Start Learning
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t text-center" style={{ borderColor: "rgba(0,212,255,0.08)" }}>
        <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
          SCROLLVERSE TRINITY ACADEMY · ALLĀHU AKBAR · KUN FAYAKŪN × ∞
        </div>
      </footer>
    </div>
  );
}
