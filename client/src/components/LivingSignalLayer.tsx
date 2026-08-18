import { useEffect, useState } from "react";

type SignalMode = "ambient" | "quiet";

export function LivingSignalLayer() {
  const [mode, setMode] = useState<SignalMode>(() => {
    if (typeof window === "undefined") return "ambient";
    return window.localStorage.getItem("scrollverse-signal-mode") === "quiet" ? "quiet" : "ambient";
  });

  useEffect(() => {
    document.documentElement.dataset.scrollverseSignal = mode;
    window.localStorage.setItem("scrollverse-signal-mode", mode);
    return () => { delete document.documentElement.dataset.scrollverseSignal; };
  }, [mode]);

  const isAmbient = mode === "ambient";

  return (
    <>
      <div className="sv-living-signal" aria-hidden="true">
        <span className="sv-living-signal__orb sv-living-signal__orb--cyan" />
        <span className="sv-living-signal__orb sv-living-signal__orb--gold" />
        <span className="sv-living-signal__orb sv-living-signal__orb--violet" />
        <span className="sv-living-signal__grid" />
      </div>
      <button
        type="button"
        className="sv-signal-control"
        aria-pressed={isAmbient}
        aria-label={isAmbient ? "Switch to quiet visual mode" : "Switch to ambient visual mode"}
        onClick={() => setMode(isAmbient ? "quiet" : "ambient")}
      >
        <span className="sv-signal-control__dot" aria-hidden="true" />
        Signal: {isAmbient ? "Ambient" : "Quiet"}
      </button>
    </>
  );
}
