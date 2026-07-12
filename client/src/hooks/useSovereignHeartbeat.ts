/**
 * useSovereignHeartbeat — Phase 45
 *
 * Converts false-bounce analytics sessions into true engaged sessions.
 * Strategy:
 *   1. After 2.2s of page presence, fire a lightweight beacon to /api/heartbeat
 *      so the session is no longer counted as an instant bounce.
 *   2. Fire a second beacon at 3m (180s) to mark the session as "deeply engaged"
 *      — this preserves the 3m49s average session duration signal.
 *   3. Emit custom analytics events (Plausible + gtag) at each threshold.
 *   4. Use sendBeacon so the ping survives tab-close without blocking the main thread.
 *
 * Usage:
 *   useSovereignHeartbeat({ page: "ipo" });
 */

import { useEffect, useRef } from "react";

interface HeartbeatOptions {
  /** Logical page name for analytics labeling, e.g. "ipo" | "dsp-intelligence" */
  page: string;
  /** Override the initial engagement threshold in ms. Default: 2200 */
  initialThresholdMs?: number;
  /** Override the deep-engagement threshold in ms. Default: 180000 (3 min) */
  deepThresholdMs?: number;
}

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string | number> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function useSovereignHeartbeat({
  page,
  initialThresholdMs = 2200,
  deepThresholdMs = 180_000,
}: HeartbeatOptions) {
  const startTimeRef = useRef<number>(Date.now());
  const initialFiredRef = useRef(false);
  const deepFiredRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    initialFiredRef.current = false;
    deepFiredRef.current = false;

    const sendBeacon = (event: string, durationSec: number) => {
      // 1. Server-side heartbeat (lightweight, fire-and-forget)
      const payload = JSON.stringify({ page, event, durationSec, ts: Date.now() });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/sovereign-heartbeat", new Blob([payload], { type: "application/json" }));
      } else {
        // Fallback for older browsers
        fetch("/api/sovereign-heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {/* silent */});
      }

      // 2. Plausible custom event
      if (typeof window.plausible === "function") {
        window.plausible(event, { props: { page, durationSec } });
      }

      // 3. Google Analytics / gtag
      if (typeof window.gtag === "function") {
        window.gtag("event", event, {
          event_category: "Sovereign_Engagement",
          event_label: page,
          value: durationSec,
        });
      }
    };

    // Initial engagement threshold — fires at 2.2s
    const initialTimer = setTimeout(() => {
      if (!initialFiredRef.current) {
        initialFiredRef.current = true;
        const durationSec = Math.round((Date.now() - startTimeRef.current) / 1000);
        sendBeacon("Sovereign_Engaged", durationSec);
      }
    }, initialThresholdMs);

    // Deep engagement threshold — fires at 3 minutes
    const deepTimer = setTimeout(() => {
      if (!deepFiredRef.current) {
        deepFiredRef.current = true;
        const durationSec = Math.round((Date.now() - startTimeRef.current) / 1000);
        sendBeacon("Sovereign_Deep_Engaged", durationSec);
      }
    }, deepThresholdMs);

    // Also fire on visibility change (tab switch / close) if initial already triggered
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && initialFiredRef.current) {
        const durationSec = Math.round((Date.now() - startTimeRef.current) / 1000);
        sendBeacon("Sovereign_Session_End", durationSec);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(deepTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [page, initialThresholdMs, deepThresholdMs]);

  return { startTime: startTimeRef.current };
}
