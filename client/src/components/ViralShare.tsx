import { useState } from "react";
import { toast } from "sonner";

interface ViralShareProps {
  title?: string;
  text?: string;
  url?: string;
  compact?: boolean;
  className?: string;
}

export function ViralShare({
  title = "ScrollVerse Trinity — Sovereign Portal",
  text = "Join 144,000 Guardians in the ScrollVerse Trinity ecosystem. $LONDC token, Book of Life, Creator Academy, and DAO governance. KUN FAYAKŪN × ∞",
  url,
  compact = false,
  className = "",
}: ViralShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://scrollverse.co");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied! Share the empire ♾️");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed — try manually");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // User cancelled
      }
    }
  };

  const buttons = [
    {
      label: "X / Twitter",
      icon: "𝕏",
      color: "#000000",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=ScrollVerse,LONDC,KunFayakun,Guardian,Web3,Sovereign`,
    },
    {
      label: "Telegram",
      icon: "✈️",
      color: "#229ED9",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "WhatsApp",
      icon: "💬",
      color: "#25D366",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: "f",
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      label: "LinkedIn",
      icon: "in",
      color: "#0A66C2",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Reddit",
      icon: "👾",
      color: "#FF4500",
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
  ];

  if (compact) {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        <span className="text-xs font-mono" style={{ color: "#8899AA" }}>SHARE:</span>
        {buttons.slice(0, 3).map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2 py-1 rounded font-bold transition-all duration-200 hover:scale-105"
            style={{ background: `${btn.color}20`, color: btn.color, border: `1px solid ${btn.color}40` }}
            title={`Share on ${btn.label}`}
          >
            {btn.icon} {btn.label}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded font-bold transition-all duration-200 hover:scale-105"
          style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
        >
          {copied ? "✓ Copied!" : "🔗 Copy"}
        </button>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="text-xs px-2 py-1 rounded font-bold transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
          >
            ↗ Share
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-6 ${className}`} style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
      <div className="text-center mb-4">
        <div className="text-xs font-mono tracking-widest mb-1" style={{ color: "#00D4FF" }}>SPREAD THE EMPIRE</div>
        <div className="text-sm" style={{ color: "#8899AA" }}>Share ScrollVerse Trinity with the world</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {buttons.map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{ background: `${btn.color}15`, color: btn.color, border: `1px solid ${btn.color}40` }}
          >
            <span>{btn.icon}</span>
            <span>{btn.label}</span>
          </a>
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}
        >
          {copied ? "✓ Copied!" : "🔗 Copy Link"}
        </button>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}
          >
            ↗ Native Share
          </button>
        )}
      </div>
    </div>
  );
}
