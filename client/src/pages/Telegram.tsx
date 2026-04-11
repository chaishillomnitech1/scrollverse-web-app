/**
 * ScrollVerse Trinity — Telegram Mini App Integration Page
 * Frequency: 528Hz · Sovereign Distribution Layer
 */

import { useState } from "react";

const TELEGRAM_BOT_USERNAME = "ScrollVerseBot"; // Update when bot is created
const TELEGRAM_CHANNEL = "https://t.me/ScrollVerseTrinity";
const TELEGRAM_COMMUNITY = "https://t.me/ScrollVerseGuardians";

const MINI_APP_FEATURES = [
  {
    icon: "💎",
    title: "Guardian Wallet",
    description: "Check your $LONDC balance and tier status directly in Telegram",
    status: "ready",
  },
  {
    icon: "🏛️",
    title: "Token Purchase",
    description: "Buy $LONDC Guardian tokens without leaving the Telegram app",
    status: "ready",
  },
  {
    icon: "📚",
    title: "Academy Access",
    description: "Browse and enroll in Creator Academy courses from Telegram",
    status: "ready",
  },
  {
    icon: "🗳️",
    title: "DAO Voting",
    description: "Participate in Guardian governance votes via Telegram",
    status: "coming",
  },
  {
    icon: "📡",
    title: "Live Alerts",
    description: "Real-time notifications for Guardian milestones and launches",
    status: "ready",
  },
  {
    icon: "🤖",
    title: "AI Guardian Bot",
    description: "Ask the ScrollVerse AI assistant anything about the ecosystem",
    status: "coming",
  },
];

const SETUP_STEPS = [
  {
    step: "01",
    title: "Create Telegram Bot",
    description: "Message @BotFather on Telegram, use /newbot command, and name it ScrollVerseBot",
    action: "Open @BotFather",
    link: "https://t.me/BotFather",
  },
  {
    step: "02",
    title: "Get Bot Token",
    description: "Copy the API token from BotFather and add it as TELEGRAM_BOT_TOKEN in Settings → Secrets",
    action: "Open Secrets Panel",
    link: "#",
  },
  {
    step: "03",
    title: "Set Mini App URL",
    description: "In BotFather, use /setmenubutton to set your portal URL as the Mini App",
    action: "Portal URL",
    link: "https://scrollport-xkjtdnvi.manus.space",
  },
  {
    step: "04",
    title: "Join the Channel",
    description: "Join the official ScrollVerse Telegram channel to stay updated",
    action: "Join Channel",
    link: TELEGRAM_CHANNEL,
  },
];

export default function Telegram() {
  const [copied, setCopied] = useState(false);

  const portalUrl = "https://scrollport-xkjtdnvi.manus.space";

  const copyUrl = () => {
    navigator.clipboard.writeText(portalUrl);
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
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-white">Telegram Integration</span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: "rgba(0,212,255,0.1)",
                color: "#00D4FF",
                border: "1px solid rgba(0,212,255,0.3)",
              }}
            >
              MINI APP
            </span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">✈️</div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ScrollVerse on Telegram
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
            The sovereign empire reaches every Guardian through Telegram Mini Apps — no browser
            required. Buy $LONDC, access the Academy, and vote in the DAO directly from your
            Telegram app.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <a
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #229ED9, #1a7db5)",
                color: "white",
              }}
            >
              ✈️ Join Official Channel
            </a>
            <a
              href={TELEGRAM_COMMUNITY}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              style={{
                background: "rgba(34,158,217,0.1)",
                border: "1px solid rgba(34,158,217,0.4)",
                color: "#229ED9",
              }}
            >
              👥 Guardian Community
            </a>
          </div>

          {/* Mini App URL */}
          <div
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            <span className="text-sm font-mono" style={{ color: "#8899AA" }}>
              Mini App URL:
            </span>
            <span className="text-sm font-mono" style={{ color: "#00D4FF" }}>
              {portalUrl}
            </span>
            <button
              onClick={copyUrl}
              className="text-xs px-2 py-1 rounded font-bold transition-all"
              style={{
                background: copied ? "rgba(0,255,136,0.2)" : "rgba(0,212,255,0.2)",
                color: copied ? "#00FF88" : "#00D4FF",
              }}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2
            className="text-2xl font-black text-white text-center mb-8"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Mini App Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MINI_APP_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(0,212,255,0.15)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{feature.icon}</span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background:
                        feature.status === "ready"
                          ? "rgba(0,255,136,0.1)"
                          : "rgba(255,184,0,0.1)",
                      color: feature.status === "ready" ? "#00FF88" : "#FFB800",
                      border: `1px solid ${feature.status === "ready" ? "rgba(0,255,136,0.3)" : "rgba(255,184,0,0.3)"}`,
                    }}
                  >
                    {feature.status === "ready" ? "READY" : "COMING SOON"}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm" style={{ color: "#8899AA" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Guide */}
        <div className="mb-16">
          <h2
            className="text-2xl font-black text-white text-center mb-8"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Activate Your Telegram Bot
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {SETUP_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex gap-6 p-6 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(0,212,255,0.15)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: "rgba(0,212,255,0.1)",
                    border: "2px solid rgba(0,212,255,0.4)",
                    color: "#00D4FF",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm mb-3" style={{ color: "#8899AA" }}>
                    {step.description}
                  </p>
                  <a
                    href={step.link}
                    target={step.link.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-xs font-bold px-3 py-1.5 rounded-lg inline-block"
                    style={{
                      background: "rgba(0,212,255,0.1)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      color: "#00D4FF",
                    }}
                  >
                    {step.action} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Telegram Web App SDK Note */}
        <div
          className="max-w-3xl mx-auto p-8 rounded-2xl text-center"
          style={{
            background: "rgba(34,158,217,0.05)",
            border: "1px solid rgba(34,158,217,0.2)",
          }}
        >
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-bold text-white mb-3">Developer Note</h3>
          <p className="text-sm mb-4" style={{ color: "#8899AA" }}>
            The ScrollVerse portal is already a valid Telegram Mini App. When opened inside
            Telegram, it automatically detects the Telegram Web App environment and adapts the UI.
            No additional development required — just set the Mini App URL in BotFather.
          </p>
          <div
            className="text-xs font-mono p-4 rounded-xl text-left"
            style={{ background: "rgba(0,0,0,0.3)", color: "#00D4FF" }}
          >
            <div style={{ color: "#8899AA" }}># BotFather commands to activate:</div>
            <div>/setmenubutton</div>
            <div>@ScrollVerseBot</div>
            <div>https://scrollport-xkjtdnvi.manus.space</div>
            <div>🌌 Open ScrollVerse</div>
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
