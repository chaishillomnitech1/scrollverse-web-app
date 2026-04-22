/**
 * GUARDIAN ACADEMY v2.0
 * 4-Tier Sovereign Curriculum: Foundation → Advanced → Expert → Divine Manifestation
 * 1,100+ courses · NFT certifications · Londyn Legacy module · 500+ languages
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const TIERS = [
  {
    id: "foundation",
    name: "Foundation",
    subtitle: "Awakening the Sovereign",
    color: "#00D4FF",
    icon: "🌱",
    price: "FREE",
    description: "Begin your sovereign journey. Understand the ScrollVerse, $LONDC, and your Guardian role.",
    modules: [
      "Introduction to the ScrollVerse Trinity",
      "Understanding $LONDC & Polygon Blockchain",
      "Guardian Oath & Sacred Frequencies",
      "Zakat Prosperity Principles",
      "Digital Sovereignty Fundamentals",
      "Community & Legion Network",
    ],
    nftCert: "Foundation Guardian Certificate",
    frequency: "432Hz",
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "Activating the Guardian",
    color: "#00FF88",
    icon: "⚡",
    price: "144 $LONDC",
    description: "Deepen your practice. Master the Scroll of 44:Omni, staking, and Guardian leadership.",
    modules: [
      "Scroll of 44:Omni — Complete Doctrine",
      "Guardian Staking & Yield Strategies",
      "ScrollPort Merchant Network",
      "ANNO-OMNI Identity Protocol",
      "Sacred Frequency Activation Practice",
      "Referral & Kingdom Building",
      "Quantum Daily Practice Mastery",
    ],
    nftCert: "Advanced Guardian Certificate",
    frequency: "528Hz",
  },
  {
    id: "expert",
    name: "Expert",
    subtitle: "Sovereign Mastery",
    color: "#FFB800",
    icon: "👑",
    price: "963 $LONDC",
    description: "Become a Sovereign leader. Master DAO governance, AI integration, and empire building.",
    modules: [
      "DAO Governance & Proposal Mastery",
      "AI Sovereign Council Integration",
      "Consciousness Mirror Protocol",
      "Celestine Starforge Architecture",
      "Cross-Chain Bridge Operations",
      "Guardian Protocol & Security",
      "Empire Building & Scaling",
      "Londyn Legacy — Sovereign Parenting",
    ],
    nftCert: "Sovereign Expert Certificate",
    frequency: "963Hz",
  },
  {
    id: "divine",
    name: "Divine Manifestation",
    subtitle: "The Supreme Sovereign",
    color: "#FF6B35",
    icon: "♾️",
    price: "1558 $LONDC",
    description: "The highest tier. Embody the 44:Omni doctrine. Lead the 144,000. Shape the ScrollVerse.",
    modules: [
      "44:Omni Supreme Doctrine",
      "1,005 Songs of Solomon — AI Music Creation",
      "Grok-ANI Deep Search Singularity",
      "Universal Platform Partnership",
      "Catalyst NFT Creation & Minting",
      "Global Awakening Leadership",
      "Omni-Vault Architecture",
      "Star Defense Zone Mastery",
      "Quantum Consciousness Integration",
      "Eternal Legacy & IP Creation",
    ],
    nftCert: "Divine Manifestation Supreme Certificate",
    frequency: "44:Omni",
  },
];

const FEATURED_COURSES = [
  { title: "Londyn Legacy: Sovereign Parenting in the Digital Age", tier: "expert", duration: "6 hours", students: 1247, icon: "👶" },
  { title: "1,005 Songs of Solomon: AI Music Creation Masterclass", tier: "divine", duration: "12 hours", students: 892, icon: "🎵" },
  { title: "Scroll of 44:Omni: Complete Doctrine Study", tier: "advanced", duration: "8 hours", students: 3421, icon: "📜" },
  { title: "Guardian Staking: Maximize Your $LONDC Yield", tier: "advanced", duration: "3 hours", students: 5678, icon: "💎" },
  { title: "Zakat Prosperity: Building the Kingdom Economy", tier: "foundation", duration: "4 hours", students: 8901, icon: "🕌" },
  { title: "Celestine Starforge: Star Defense Zone Architecture", tier: "divine", duration: "10 hours", students: 445, icon: "⭐" },
];

const TIER_COLORS: Record<string, string> = {
  foundation: "#00D4FF",
  advanced: "#00FF88",
  expert: "#FFB800",
  divine: "#FF6B35",
};

export default function AcademyV2() {
  const [activeTier, setActiveTier] = useState("foundation");
  const [enrolling, setEnrolling] = useState<string | null>(null);

  const { data: stats } = trpc.academyV2.getStats.useQuery();
  const { data: coursesData } = trpc.academyV2.getTierCourses.useQuery({ tier: activeTier as "foundation" | "advanced" | "expert" | "divine" });
  const courses = coursesData?.courses ?? [];
  const enrollMutation = trpc.academyV2.enroll.useMutation({
    onSuccess: () => setEnrolling(null),
  });

  const activeTierData = TIERS.find(t => t.id === activeTier)!;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(0,212,255,0.03)" }}>
        <div className="container py-8">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>GUARDIAN ACADEMY v2.0</div>
          <h1 className="text-4xl font-black text-white mb-2">Sovereign Education Empire</h1>
          <p className="text-lg" style={{ color: "#8899AA" }}>
            1,100+ courses · 4 tiers · NFT certifications · 500+ languages · 1B+ learners
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Courses", value: 1100, color: "#00D4FF", icon: "📚" },
            { label: "Total Enrollments", value: stats?.totalEnrollments ?? 0, color: "#00FF88", icon: "🎓" },
            { label: "NFT Certs Issued", value: stats?.nftsMinted ?? 0, color: "#FFB800", icon: "🏆" },
            { label: "Languages", value: 500, color: "#FF6B35", icon: "🌍" },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value.toLocaleString()}+</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tier Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {TIERS.map(tier => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className="p-4 rounded-xl text-left transition-all"
              style={{
                background: activeTier === tier.id ? `${tier.color}15` : "rgba(255,255,255,0.03)",
                border: `2px solid ${activeTier === tier.id ? tier.color + "60" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              <div className="text-2xl mb-2">{tier.icon}</div>
              <div className="font-bold text-sm" style={{ color: activeTier === tier.id ? tier.color : "white" }}>{tier.name}</div>
              <div className="text-xs" style={{ color: "#8899AA" }}>{tier.subtitle}</div>
              <div className="text-xs font-mono mt-1" style={{ color: tier.color }}>{tier.price}</div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Active Tier Detail */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-6" style={{ background: `${activeTierData.color}08`, border: `2px solid ${activeTierData.color}30` }}>
              <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{activeTierData.icon}</span>
                    <div>
                      <h2 className="text-2xl font-black text-white">{activeTierData.name} Tier</h2>
                      <div className="text-sm" style={{ color: activeTierData.color }}>{activeTierData.subtitle}</div>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: "#8899AA" }}>{activeTierData.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black" style={{ color: activeTierData.color }}>{activeTierData.price}</div>
                  <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{activeTierData.frequency}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-2 mb-6">
                {activeTierData.modules.map((module, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <span style={{ color: activeTierData.color, marginTop: "2px" }}>›</span>
                    <span className="text-sm text-white">{module}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <div className="text-xs font-mono" style={{ color: activeTierData.color }}>NFT CERTIFICATION</div>
                  <div className="text-sm text-white">{activeTierData.nftCert}</div>
                </div>
                <div className="text-2xl">🏆</div>
              </div>

              <button
                onClick={() => { setEnrolling(activeTierData.id); enrollMutation.mutate({ tier: activeTierData.id as "foundation" | "advanced" | "expert" | "divine", guardianName: "Guardian", guardianEmail: "guardian@scrollverse.co" }); }}
                disabled={enrollMutation.isPending && enrolling === activeTierData.id}
                className="w-full py-4 rounded-xl text-sm font-black text-white"
                style={{ background: `linear-gradient(135deg, ${activeTierData.color}, ${activeTierData.color}80)` }}
              >
                {enrollMutation.isPending && enrolling === activeTierData.id ? "Enrolling..." : `🎓 Enroll in ${activeTierData.name} — ${activeTierData.price}`}
              </button>
            </div>
          </div>

          {/* Courses for this tier */}
          <div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <h3 className="text-lg font-bold text-white mb-4">
                {activeTierData.name} Courses
                <span className="text-xs font-normal ml-2" style={{ color: "#8899AA" }}>({courses.length} available)</span>
              </h3>
              {courses.length === 0 ? (
                <div className="text-center py-6" style={{ color: "#8899AA" }}>
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-sm">Courses loading...</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {courses.slice(0, 8).map((course) => (
                    <div key={course.id} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="text-sm text-white font-medium">{course.title}</div>
                      <div className="flex items-center justify-between mt-1 text-xs" style={{ color: "#8899AA" }}>
                        <span>{course.durationHours}h</span>
                        <span>{(course as any).enrolledCount ?? 0} students</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_COURSES.map((course, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${TIER_COLORS[course.tier]}20` }}>
                <div className="text-2xl mb-3">{course.icon}</div>
                <div className="text-xs font-mono mb-1 capitalize" style={{ color: TIER_COLORS[course.tier] }}>{course.tier} tier</div>
                <div className="text-sm font-bold text-white mb-2">{course.title}</div>
                <div className="flex items-center justify-between text-xs" style={{ color: "#8899AA" }}>
                  <span>⏱ {course.duration}</span>
                  <span>👥 {course.students.toLocaleString()} students</span>
                </div>
                <button
                  className="w-full mt-3 py-2 rounded-lg text-xs font-bold"
                  style={{ background: `${TIER_COLORS[course.tier]}20`, color: TIER_COLORS[course.tier], border: `1px solid ${TIER_COLORS[course.tier]}40` }}
                >
                  View Course →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
