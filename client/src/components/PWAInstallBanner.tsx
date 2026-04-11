/**
 * ScrollVerse Trinity — PWA Install Banner
 * Shows install prompt for iOS (Add to Home Screen) and Android (native install)
 */

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;

    if (isStandalone) return;

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem("pwa-banner-dismissed");
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < 7 * 24 * 60 * 60 * 1000) return;

    // Detect iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    if (ios) {
      // Show iOS instructions after 3 seconds
      setTimeout(() => setShowBanner(true), 3000);
    }

    // Listen for Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowBanner(false);
    localStorage.setItem("pwa-banner-dismissed", Date.now().toString());
  };

  if (!showBanner || dismissed) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-40 rounded-2xl p-4 shadow-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(5,11,26,0.98), rgba(10,20,40,0.98))",
        border: "1px solid rgba(0,212,255,0.3)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 40px rgba(0,212,255,0.15)",
        maxWidth: "480px",
        margin: "0 auto",
        marginBottom: "5rem",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)" }}
        >
          SV
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-sm mb-0.5">Install ScrollVerse</div>
          <div className="text-xs mb-3" style={{ color: "#8899AA" }}>
            {isIOS
              ? 'Tap the Share button below, then "Add to Home Screen" to install'
              : "Add to your home screen for the full sovereign experience"}
          </div>

          {isIOS ? (
            <div
              className="flex items-center gap-2 p-2 rounded-lg text-xs"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <span style={{ color: "#00D4FF" }}>
                Tap{" "}
                <span className="font-bold">
                  Share ⬆
                </span>{" "}
                → "Add to Home Screen"
              </span>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="px-4 py-2 rounded-lg text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #0099BB)",
                  color: "#050B1A",
                }}
              >
                Install App
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 rounded-lg text-xs"
                style={{ color: "#8899AA" }}
              >
                Not now
              </button>
            </div>
          )}
        </div>

        {/* Close */}
        <button
          onClick={handleDismiss}
          className="text-lg leading-none flex-shrink-0"
          style={{ color: "#8899AA" }}
        >
          ×
        </button>
      </div>

      {/* Frequency bar */}
      <div
        className="mt-3 pt-3 flex items-center gap-2"
        style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
      >
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
        <span className="text-xs font-mono" style={{ color: "#8899AA" }}>
          528Hz · Sovereign App · Works Offline · All Platforms
        </span>
      </div>
    </div>
  );
}
