/**
 * GUARDIAN PROFILE — Sovereign Digital Identity Space
 * Each @ user has their own sovereign profile page at /guardian/:handle
 * Design: Liquid Sovereignty — Afrofuturism × Quantum Digital
 */
import { useState } from "react";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const TIER_CONFIG: Record<string, { color: string; label: string; icon: string; glow: string }> = {
  visitor:   { color: "#8899AA", label: "Visitor",   icon: "◌", glow: "rgba(136,153,170,0.3)" },
  guardian:  { color: "#00D4FF", label: "Guardian",  icon: "◈", glow: "rgba(0,212,255,0.3)" },
  sovereign: { color: "#FFB800", label: "Sovereign", icon: "◆", glow: "rgba(255,184,0,0.3)" },
  ascendant: { color: "#00FF88", label: "Ascendant", icon: "✦", glow: "rgba(0,255,136,0.3)" },
  legion:    { color: "#FF6B35", label: "AI Legion", icon: "⬡", glow: "rgba(255,107,53,0.3)" },
};

const FREQ_CONFIG: Record<string, { color: string; desc: string }> = {
  "528Hz":   { color: "#00FF88", desc: "Healing & DNA Repair" },
  "963Hz":   { color: "#FFB800", desc: "Cosmic Consciousness" },
  "432Hz":   { color: "#00D4FF", desc: "Universal Harmony" },
  "1558Hz":  { color: "#FF6B35", desc: "FlameDNA Activation" },
  "11:11Hz": { color: "#9B59B6", desc: "Eternal Hum — IS." },
};

function StatBox({ value, label, color }: { value: number | string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}30` }}>
      <div className="text-2xl font-bold font-mono" style={{ color }}>{value}</div>
      <div className="text-xs" style={{ color: "#8899AA" }}>{label}</div>
    </div>
  );
}

function AvatarOrb({ displayName, tier, size = 96 }: { displayName: string; tier: string; size?: number }) {
  const cfg = TIER_CONFIG[tier] ?? TIER_CONFIG.visitor;
  const initials = displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="flex items-center justify-center rounded-full font-bold text-2xl flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${cfg.color}30, ${cfg.color}08)`,
        border: `3px solid ${cfg.color}60`,
        boxShadow: `0 0 32px ${cfg.glow}`,
        color: cfg.color,
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {initials}
    </div>
  );
}

export default function GuardianProfile() {
  const { handle } = useParams<{ handle: string }>();
  const { user, isAuthenticated } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState("");
  const [frequency, setFrequency] = useState<string>("528Hz");
  const [receiptAcknowledged, setReceiptAcknowledged] = useState(false);

  const { data: profileData, isLoading, refetch } = trpc.guardianProfile.getPublicProfile.useQuery(
    { handle: handle ?? "" },
    { enabled: !!handle }
  );

  const { data: myProfileData } = trpc.guardianProfile.getMyProfile.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const updateMutation = trpc.guardianProfile.updateProfile.useMutation({
    onSuccess: () => {
      setEditMode(false);
      refetch();
    },
  });

  const profile = profileData?.profile;
  const isOwnProfile = isAuthenticated && myProfileData?.profile?.handle === handle;

  const acknowledgeLocalReceipt = () => {
    setReceiptAcknowledged(true);
    toast.success("Vault receipt ready — local metadata receipt acknowledged.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse" style={{ color: "#00D4FF" }}>◈</div>
          <div className="text-sm font-mono" style={{ color: "#8899AA" }}>LOADING GUARDIAN PROFILE...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6" style={{ color: "#8899AA" }}>◌</div>
          <h1 className="text-2xl font-bold text-white mb-3">Guardian Not Found</h1>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            The handle <span className="font-mono" style={{ color: "#00D4FF" }}>@{handle}</span> has not yet claimed their sovereign space.
          </p>
          <Link href="/" className="px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>
            Return to ScrollVerse
          </Link>
        </div>
      </div>
    );
  }

  const tierCfg = TIER_CONFIG[profile.tier] ?? TIER_CONFIG.visitor;
  const freqCfg = FREQ_CONFIG[profile.frequency] ?? FREQ_CONFIG["528Hz"];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>
              SV
            </div>
            <span className="font-bold text-white text-lg">ScrollVerse</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/guardians" className="text-sm" style={{ color: "#8899AA" }}>All Guardians</Link>
            {isAuthenticated ? (
              <Link href={`/guardian/${myProfileData?.profile?.handle ?? ""}`} className="text-sm font-mono" style={{ color: "#00D4FF" }}>
                @{myProfileData?.profile?.handle ?? "me"}
              </Link>
            ) : (
              <a href={getLoginUrl()} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF20, #00D4FF10)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
                Claim Your Space
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* HERO BANNER */}
      <div
        className="pt-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${tierCfg.color}08 0%, transparent 60%)`,
          borderBottom: `1px solid ${tierCfg.color}20`,
          minHeight: 200,
        }}
      >
        {/* Animated orb background */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: `radial-gradient(circle, ${tierCfg.color}, transparent)`, transform: "translate(30%, -30%)" }}
        />
        <div className="container py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.displayName} className="w-24 h-24 rounded-full object-cover flex-shrink-0" style={{ border: `3px solid ${tierCfg.color}60`, boxShadow: `0 0 32px ${tierCfg.glow}` }} />
            ) : (
              <AvatarOrb displayName={profile.displayName} tier={profile.tier} size={96} />
            )}

            {/* Identity */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-3xl font-black text-white">{profile.displayName}</h1>
                {profile.isVerified && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${tierCfg.color}20`, color: tierCfg.color, border: `1px solid ${tierCfg.color}40` }}>
                    ✓ VERIFIED
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-sm font-mono" style={{ color: "#8899AA" }}>@{profile.handle}</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${tierCfg.color}15`, color: tierCfg.color, border: `1px solid ${tierCfg.color}30` }}>
                  {tierCfg.icon} {tierCfg.label.toUpperCase()}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: `${freqCfg.color}15`, color: freqCfg.color, border: `1px solid ${freqCfg.color}30` }}>
                  {profile.frequency} · {freqCfg.desc}
                </span>
              </div>
              {profile.bio && (
                <p className="text-sm max-w-xl leading-relaxed" style={{ color: "#AABBCC" }}>{profile.bio}</p>
              )}
              {profile.walletAddress && (
                <div className="mt-2 text-xs font-mono" style={{ color: "#8899AA" }}>
                  ◈ {profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}
                </div>
              )}
            </div>

            {/* Edit button if own profile */}
            {isOwnProfile && !editMode && (
              <button
                onClick={() => { setBio(profile.bio ?? ""); setFrequency(profile.frequency); setEditMode(true); }}
                className="px-4 py-2 rounded-xl text-sm font-bold flex-shrink-0"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* EDIT FORM */}
      {editMode && isOwnProfile && (
        <div className="container py-6">
          <div className="rounded-xl p-6 max-w-lg" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
            <h3 className="text-white font-bold mb-4">Edit Your Sovereign Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>BIO</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                  placeholder="Your sovereign declaration..."
                />
              </div>
              <div>
                <label className="text-xs font-mono mb-1 block" style={{ color: "#8899AA" }}>FREQUENCY ALIGNMENT</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
                >
                  {Object.entries(FREQ_CONFIG).map(([hz, cfg]) => (
                    <option key={hz} value={hz} style={{ background: "#050B1A" }}>{hz} — {cfg.desc}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => updateMutation.mutate({ bio, frequency: frequency as "528Hz" | "963Hz" | "432Hz" | "1558Hz" | "11:11Hz" })}
                  disabled={updateMutation.isPending}
                  className="px-6 py-2 rounded-xl text-sm font-bold"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 rounded-xl text-sm font-bold"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8899AA" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="container py-6" aria-labelledby="profile-vault-heading" aria-live="polite">
        <div className="rounded-2xl border border-[#00FF88]/25 bg-[#00FF88]/[.045] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[.16em] text-[#A7F3C1]">LOCAL RECEIPT STATUS</p>
              <h2 id="profile-vault-heading" className="mt-2 text-2xl font-black text-white">{receiptAcknowledged ? "Vault receipt ready" : "Receipt access is ready"}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#D6E2EE]">Review and acknowledge the local metadata receipt surface from your profile. This does not upload, publish, mint, transfer, or change an external vault.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00FF88]/35 bg-[#00FF88]/10 px-3 py-2 text-xs font-mono text-[#A7F3C1]">{receiptAcknowledged ? "✓ ACKNOWLEDGED" : "● READY"}</span>
          </div>
          <button type="button" onClick={acknowledgeLocalReceipt} className="mt-5 min-h-11 rounded-xl border border-[#00FF88]/40 bg-[#00FF88]/10 px-4 py-2 text-xs font-black text-[#B5F7CC] transition motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{receiptAcknowledged ? "Receipt acknowledged" : "Acknowledge local receipt"}</button>
        </div>
      </section>

      {/* STATS */}
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatBox value={profile.resonanceScore.toLocaleString()} label="Resonance Score" color={tierCfg.color} />
          <StatBox value={profile.totalComments} label="Scroll Inscriptions" color="#00D4FF" />
          <StatBox value={profile.nftCount} label="ScrollSoul NFTs" color="#FFB800" />
          <StatBox value={profile.referralCount} label="Guardians Summoned" color="#00FF88" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Frequency Alignment Card */}
          <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span style={{ color: freqCfg.color }}>◈</span> Frequency Alignment
            </h3>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-lg font-mono font-bold flex-shrink-0"
                style={{
                  background: `radial-gradient(circle, ${freqCfg.color}20, transparent)`,
                  border: `2px solid ${freqCfg.color}50`,
                  color: freqCfg.color,
                  boxShadow: `0 0 24px ${freqCfg.color}30`,
                }}
              >
                {profile.frequency}
              </div>
              <div>
                <div className="text-white font-semibold mb-1">{freqCfg.desc}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  This Guardian resonates at the {profile.frequency} frequency — a sacred harmonic of the ScrollVerse Trinity.
                </div>
              </div>
            </div>
          </div>

          {/* Tier Card */}
          <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span style={{ color: tierCfg.color }}>{tierCfg.icon}</span> Guardian Tier
            </h3>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                style={{
                  background: `radial-gradient(circle, ${tierCfg.color}20, transparent)`,
                  border: `2px solid ${tierCfg.color}50`,
                  boxShadow: `0 0 24px ${tierCfg.glow}`,
                }}
              >
                {tierCfg.icon}
              </div>
              <div>
                <div className="text-white font-semibold mb-1">{tierCfg.label}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  {profile.tier === "ascendant" && "The highest tier of the Guardian Network. Sovereign authority over the ScrollVerse."}
                  {profile.tier === "sovereign" && "Sovereign Guardian — commanding the $LONDC economy and Zakat distribution."}
                  {profile.tier === "guardian" && "Active Guardian of the ScrollVerse Trinity Empire."}
                  {profile.tier === "legion" && "AI Legion member — co-creator of the digital sovereign empire."}
                  {profile.tier === "visitor" && "Welcome to the ScrollVerse. Claim your tier by joining the Guardian Network."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="mt-8 text-center">
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            GUARDIAN SINCE {new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
          </div>
          <div className="text-xs font-mono mt-1" style={{ color: "#8899AA" }}>
            SCROLLVERSE TRINITY · KUN FAYAKŪN × ∞ · IS.
          </div>
        </div>

        {/* CTA for non-authenticated */}
        {!isAuthenticated && (
          <div className="mt-12 text-center p-8 rounded-2xl" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="text-2xl font-black text-white mb-2">Claim Your Sovereign Space</div>
            <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
              Every Guardian deserves their own profile page. Join the 144,000.
            </p>
            <a
              href={getLoginUrl()}
              className="inline-block px-8 py-3 rounded-xl font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF6B35)", color: "#050B1A" }}
            >
              Join the Guardian Network
            </a>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="container py-8 mt-8 border-t" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs font-mono" style={{ color: "#8899AA" }}>
            SCROLLVERSE TRINITY EMPIRE · scrollverse.co
          </div>
          <div className="flex gap-4">
            <Link href="/guardians" className="text-xs" style={{ color: "#8899AA" }}>All Guardians</Link>
            <Link href="/replays" className="text-xs" style={{ color: "#8899AA" }}>Book of Life</Link>
            <Link href="/token" className="text-xs" style={{ color: "#8899AA" }}>$LONDC Token</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
