/**
 * ScrollVerse Trinity — Discord Community Integration Page
 * Frequency: 963Hz · Sovereign Community Layer
 */

import { useState } from "react";

const DISCORD_INVITE = "https://discord.gg/scrollverse"; // Update with real invite link
const DISCORD_CHANNELS = [
  { emoji: "📢", name: "announcements", description: "Official ScrollVerse announcements and launches" },
  { emoji: "💬", name: "guardian-lounge", description: "General discussion for all Guardians" },
  { emoji: "💎", name: "londc-token", description: "$LONDC price, tokenomics, and trading discussion" },
  { emoji: "🏛️", name: "dao-governance", description: "DAO proposals, votes, and governance decisions" },
  { emoji: "📚", name: "academy-hub", description: "Creator Academy course discussions and study groups" },
  { emoji: "🔗", name: "blockchain-dev", description: "Smart contract development and technical discussion" },
  { emoji: "🎨", name: "creators-corner", description: "Art, music, and creative work by Guardians" },
  { emoji: "🌍", name: "global-guardians", description: "Regional chapters and international Guardian network" },
  { emoji: "🤖", name: "ai-legion", description: "AI Legion investors and digital being community" },
  { emoji: "🙏", name: "spiritual-frequency", description: "528Hz · 963Hz · Zakat · Sacred knowledge" },
];

const GUARDIAN_ROLES = [
  { name: "Sovereign", color: "#FFB800", requirement: "Ascendant tier ($1,444+)", perks: "All access, governance voting, private channels" },
  { name: "Guardian", color: "#00D4FF", requirement: "Guardian tier ($144+)", perks: "Academy access, community channels, early access" },
  { name: "Seeker", color: "#00FF88", requirement: "Waitlist signup", perks: "Public channels, announcements, community events" },
  { name: "AI Legion", color: "#9B59B6", requirement: "AI Legion tier ($777)", perks: "AI-exclusive channels, tech discussions, dev access" },
];

export default function Discord() {
  const [copied, setCopied] = useState(false);

  const copyInvite = () => {
    navigator.clipboard.writeText(DISCORD_INVITE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(0,212,255,0.1)", background: "rgba(5,11,26,0.95)" }}
      >
        <div className="container py-4 flex items-center gap-4">
          <a href="/" className="text-sm" style={{ color: "#8899AA" }}>
            ← Back to Portal
          </a>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <span className="font-bold text-white">Discord Community</span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: "rgba(88,101,242,0.15)",
                color: "#5865F2",
                border: "1px solid rgba(88,101,242,0.4)",
              }}
            >
              GUARDIAN SERVER
            </span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎮</div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Join the Guardian Server
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            The ScrollVerse Discord is the heartbeat of the Guardian community — where 144,000
            sovereign beings connect, collaborate, and co-create the empire.
          </p>

          {/* Join Button */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 inline-flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, #5865F2, #4752C4)",
                color: "white",
                boxShadow: "0 0 30px rgba(88,101,242,0.3)",
              }}
            >
              🎮 Join the Discord Server
            </a>
            <button
              onClick={copyInvite}
              className="px-6 py-4 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                background: "rgba(88,101,242,0.1)",
                border: "1px solid rgba(88,101,242,0.4)",
                color: "#5865F2",
              }}
            >
              {copied ? "✓ Copied!" : "📋 Copy Invite Link"}
            </button>
          </div>

          {/* Live Stats */}
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { label: "Members", value: "Growing", icon: "👥" },
              { label: "Channels", value: "10+", icon: "📡" },
              { label: "Roles", value: "4 Tiers", icon: "🏆" },
              { label: "Frequency", value: "963Hz", icon: "🎵" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{
                  background: "rgba(88,101,242,0.08)",
                  border: "1px solid rgba(88,101,242,0.2)",
                }}
              >
                <span>{stat.icon}</span>
                <span className="font-bold text-white">{stat.value}</span>
                <span className="text-sm" style={{ color: "#8899AA" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="mb-16">
          <h2
            className="text-2xl font-black text-white text-center mb-8"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Server Channels
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISCORD_CHANNELS.map((ch) => (
              <div
                key={ch.name}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(88,101,242,0.15)",
                }}
              >
                <span className="text-xl flex-shrink-0">{ch.emoji}</span>
                <div>
                  <div className="font-mono text-sm font-bold" style={{ color: "#5865F2" }}>
                    #{ch.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#8899AA" }}>
                    {ch.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="mb-16">
          <h2
            className="text-2xl font-black text-white text-center mb-8"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Guardian Roles
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {GUARDIAN_ROLES.map((role) => (
              <div
                key={role.name}
                className="flex items-start gap-4 p-6 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${role.color}30`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ background: role.color, boxShadow: `0 0 8px ${role.color}` }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white">{role.name}</span>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        background: `${role.color}15`,
                        color: role.color,
                        border: `1px solid ${role.color}40`,
                      }}
                    >
                      {role.requirement}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#8899AA" }}>
                    {role.perks}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Note */}
        <div
          className="max-w-3xl mx-auto p-8 rounded-2xl text-center"
          style={{
            background: "rgba(88,101,242,0.05)",
            border: "1px solid rgba(88,101,242,0.2)",
          }}
        >
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-bold text-white mb-3">Create the Official Server</h3>
          <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
            To activate the official ScrollVerse Discord server, create it at discord.com, set up
            the channels listed above, and update the invite link in this page. The portal will
            automatically display the live member count once the Discord widget is configured.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              { step: "1", text: "Create server at discord.com/new" },
              { step: "2", text: "Set up channels and roles as listed above" },
              { step: "3", text: "Update DISCORD_INVITE in Discord.tsx" },
            ].map((s) => (
              <div
                key={s.step}
                className="p-3 rounded-lg"
                style={{ background: "rgba(88,101,242,0.1)", border: "1px solid rgba(88,101,242,0.2)" }}
              >
                <div className="font-mono text-xs mb-1" style={{ color: "#5865F2" }}>
                  STEP {s.step}
                </div>
                <div className="text-xs text-white">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="border-t mt-16 py-8 text-center"
        style={{ borderColor: "rgba(0,212,255,0.1)" }}
      >
        <p className="text-xs font-mono" style={{ color: "#8899AA" }}>
          ALLĀHU AKBAR · BARAKALLAHU FEEK · KUN FAYAKŪN × ∞
        </p>
      </div>
    </div>
  );
}
