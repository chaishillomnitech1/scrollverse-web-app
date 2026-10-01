import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { getPlasmaState, type PlasmaState } from "@/lib/plasmaStateMath";

const PHASES = [
  { degrees: 0, name: "00 · Crossing" },
  { degrees: 90, name: "03 · Crest" },
  { degrees: 180, name: "06 · Crossing" },
  { degrees: 270, name: "09 · Trough" },
] as const;

function renderMap(canvas: HTMLCanvasElement, state: PlasmaState) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const mobile = width < 650;
  const cx = mobile ? width / 2 : width * 0.29;
  const cy = mobile ? height * 0.27 : height * 0.52;
  const radius = mobile ? Math.min(width * 0.32, height * 0.205) : Math.min(width * 0.19, height * 0.34);
  const start = mobile ? width * 0.1 : width * 0.55;
  const end = mobile ? width * 0.9 : width * 0.94;
  const baseline = mobile ? height * 0.76 : height * 0.52;
  const waveHeight = mobile ? height * 0.12 : height * 0.28;
  const markerX = start + (end - start) * state.degrees / 360;
  const markerY = baseline - state.amplitude * waveHeight;
  const orbitX = cx + state.x * radius;
  const orbitY = cy + state.y * radius;

  const line = (x1: number, y1: number, x2: number, y2: number, color: string, size = 1) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = color; ctx.lineWidth = size; ctx.stroke();
  };
  ctx.fillStyle = "#081322";
  ctx.fillRect(0, 0, width, height);
  for (let x = 24; x < width; x += 28) for (let y = 24; y < height; y += 28) {
    ctx.fillStyle = "rgba(112,217,255,.09)";
    ctx.fillRect(x, y, 1, 1);
  }
  // The ring and wave are normalized geometry; their scale is not a measurement.
  ctx.strokeStyle = "rgba(112,217,255,.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(215,167,255,.16)";
  ctx.beginPath(); ctx.arc(cx, cy, radius * 0.73, 0, Math.PI * 2); ctx.stroke();
  line(cx - radius - 15, cy, cx + radius + 15, cy, "rgba(255,255,255,.15)");
  line(cx, cy - radius - 15, cx, cy + radius + 15, "rgba(255,255,255,.15)");
  ctx.fillStyle = "#FFCF73";
  ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();

  line(start, baseline, end, baseline, "rgba(255,255,255,.25)");
  line(start, baseline - waveHeight - 15, start, baseline + waveHeight + 15, "rgba(255,255,255,.16)");
  ctx.strokeStyle = "#70D9FF";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let step = 0; step <= 120; step++) {
    const x = start + (end - start) * step / 120;
    const y = baseline - Math.sin(step / 120 * Math.PI * 2) * waveHeight;
    if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([4, 5]);
  line(orbitX, orbitY, markerX, markerY, "rgba(255,207,115,.42)");
  line(markerX, baseline, markerX, markerY, "rgba(255,207,115,.45)");
  ctx.setLineDash([]);
  for (const [x, y] of [[orbitX, orbitY], [markerX, markerY]]) {
    ctx.fillStyle = "rgba(255,207,115,.22)";
    ctx.beginPath(); ctx.arc(x, y, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#FFCF73";
    ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.font = "600 11px monospace";
  ctx.fillStyle = "#BCEEFF";
  ctx.fillText("TOP VIEW · ORBIT", mobile ? 18 : cx - radius, mobile ? 24 : height - 24);
  ctx.fillText("SIDE VIEW · SINE PROJECTION", mobile ? 18 : start, mobile ? height * 0.55 : height - 24);
}

function downloadSnapshot(state: PlasmaState) {
  const record = {
    recordType: "scrollverse_plasma_state_map_geometry",
    sourceReceipt: "pasted_content_6.txt · Phase 930",
    model: "Geometric illustration, not a plasma simulation or experimental finding",
    degrees: state.degrees,
    normalizedOrbit: { x: state.x, y: state.y },
    normalizedAmplitude: state.amplitude,
    position: state.label,
    scope: "Browser-local export only; no recorded frequency, measurement, upload, or publication",
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "scrollverse-plasma-state-snapshot.json";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function PlasmaStateMap() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [degrees, setDegrees] = useState(90);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [exported, setExported] = useState(false);
  const state = getPlasmaState(degrees);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(preference.matches); if (preference.matches) setPlaying(false); };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (time: number) => {
      const elapsed = time - previous;
      if (elapsed >= 33) {
        setDegrees((current) => (current + elapsed * .018) % 360);
        previous = time;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, reducedMotion]);

  useEffect(() => {
    if (!canvas.current) return;
    const target = canvas.current;
    const redraw = () => renderMap(target, state);
    redraw();
    const observer = new ResizeObserver(redraw);
    observer.observe(target);
    return () => observer.disconnect();
  }, [state.degrees]);

  return (
    <main className="min-h-screen bg-[#050914] text-[#F2F5FA]">
      <section className="border-b border-[#70D9FF]/25 bg-[radial-gradient(circle_at_80%_15%,rgba(112,217,255,.14),transparent_33%),radial-gradient(circle_at_13%_85%,rgba(215,167,255,.12),transparent_34%),#070C18]">
        <div className="container py-12 md:py-16">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#BCEEFF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BCEEFF]">← Return to ScrollVerse</Link>
          <p className="mt-8 text-xs font-mono tracking-[.2em] text-[#FFCF73]">CREATOR STUDY · PHASE 930 SOURCE RECORD</p>
          <h1 aria-label="Plasma State Map" className="mt-4 max-w-5xl text-5xl font-black leading-[.92] tracking-tight md:text-7xl">Plasma <span className="text-[#70D9FF]">State Map.</span></h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Circle + wave + axis. One point, two views: turn the dial to see its orbital position and its sine projection move together. A creator-directed visualization of the supplied state-map idea.</p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#BCEEFF]">Geometric illustration, not a plasma simulation, measured frequency, new physical law, or experimental result.</p>
        </div>
      </section>

      <section className="container grid gap-7 py-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(290px,.55fr)] lg:py-14">
        <div className="overflow-hidden rounded-[1.7rem] border border-[#70D9FF]/30 bg-[#081322] shadow-[0_30px_90px_rgba(0,0,0,.3)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-4"><span className="text-xs font-mono tracking-[.12em] text-[#BCEEFF]">CIRCLE → PROJECTION → STATE</span><span className="text-xs font-mono text-[#FFE7B3]">CANVAS · LOCAL MODEL</span></div>
          <canvas ref={canvas} role="img" aria-label={`Orbit and sine-wave drawing: selected angle ${Math.round(state.degrees)} degrees, ${state.label}, normalized amplitude ${state.amplitude.toFixed(2)}. Equivalent values appear in the state readout.`} className="block h-[540px] w-full sm:h-[610px] lg:h-[460px]" />
          <p className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-[#B9C9D8]">The moving points show the same normalized angle on an orbit and on a sine curve. No physical plasma or acoustic data is represented.</p>
        </div>
        <aside className="rounded-[1.7rem] border border-[#FFCF73]/30 bg-[radial-gradient(circle_at_100%_0%,rgba(255,207,115,.1),transparent_45%),#0B1320] p-6">
          <p className="text-xs font-mono tracking-[.18em] text-[#FFCF73]">THE CURRENT · STATE READOUT</p>
          <h2 className="mt-3 text-3xl font-black">Choose a position.</h2>
          <label htmlFor="plasma-angle" className="mt-7 flex items-center justify-between text-sm font-semibold text-[#E6EDF5]"><span>Selected angle</span><output htmlFor="plasma-angle" className="text-2xl font-black tabular-nums text-[#FFCF73]">{Math.round(state.degrees)}°</output></label>
          <input id="plasma-angle" type="range" min="0" max="360" step="1" value={Math.round(state.degrees)} onChange={(event) => { setDegrees(Number(event.target.value)); setExported(false); }} className="mt-4 w-full accent-[#70D9FF]" />
          <div className="mt-5 grid grid-cols-2 gap-2" aria-label="Select a named phase">{PHASES.map((phase) => <button key={phase.degrees} type="button" onClick={() => { setDegrees(phase.degrees); setExported(false); }} aria-pressed={Math.abs(state.degrees - phase.degrees) < .5} className="min-h-11 rounded-xl border border-[#70D9FF]/30 bg-[#70D9FF]/[.06] px-3 py-2 text-left text-xs font-semibold text-[#D6E2EE] transition-colors hover:border-[#70D9FF] hover:bg-[#70D9FF]/[.13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BCEEFF] aria-pressed:border-[#FFCF73] aria-pressed:bg-[#FFCF73]/[.12] aria-pressed:text-[#FFE7B3]">{phase.name}</button>)}</div>
          <div className="mt-7 rounded-xl border border-white/10 bg-white/[.03] p-4" aria-live="polite"><p className="text-xs font-mono tracking-[.14em] text-[#BCEEFF]">CURRENT PHASE</p><p className="mt-1 text-2xl font-black capitalize text-white">{state.label}</p><p className="mt-2 text-sm text-[#D6E2EE]">Normalized wave height: <strong className="tabular-nums text-[#FFCF73]">{state.amplitude.toFixed(2)}</strong></p><p className="mt-1 text-xs text-[#B9C9D8]">Position is a unitless geometry value, not a sensor reading.</p></div>
          <div className="mt-6 grid gap-2"><button type="button" disabled={reducedMotion} onClick={() => setPlaying((current) => !current)} className="min-h-11 rounded-xl bg-[#70D9FF] px-4 py-3 text-sm font-black text-[#071426] transition-transform active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BCEEFF] disabled:cursor-not-allowed disabled:opacity-55">{playing ? "Pause motion" : "Play geometric motion"}</button><button type="button" onClick={() => { downloadSnapshot(state); setExported(true); }} className="min-h-11 rounded-xl border border-[#FFCF73]/45 px-4 py-3 text-sm font-black text-[#FFE7B3] hover:bg-[#FFCF73]/[.09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE7B3]">Download local state snapshot</button></div>
          {reducedMotion && <p role="status" className="mt-3 text-xs leading-6 text-[#D6E2EE]">Motion is off for your reduced-motion preference. The dial and phase buttons remain usable.</p>}
          {exported && <p role="status" className="mt-3 text-xs leading-6 text-[#BCEEFF]">JSON saved to this device. No upload or publication occurred.</p>}
        </aside>
      </section>

      <section className="container grid gap-5 pb-16 md:grid-cols-2"><div className="rounded-2xl border border-[#D7A7FF]/25 bg-[#D7A7FF]/[.05] p-6"><p className="text-xs font-mono tracking-[.16em] text-[#EBDFFF]">SOURCE · CREATOR MODEL</p><h2 className="mt-3 text-2xl font-black">Geometry first.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The Phase 930 receipt preserves the creator-supplied circle, projection, wave, crossing, and return language. This interactive canvas translates that language into normalized coordinates only.</p></div><div className="rounded-2xl border border-[#70D9FF]/25 bg-[#70D9FF]/[.05] p-6"><p className="text-xs font-mono tracking-[.16em] text-[#BCEEFF]">MEASUREMENT · SEPARATE LANE</p><h2 className="mt-3 text-2xl font-black">Experiment second.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">A physical hypothesis needs equipment, calibration, controls, raw measurements, and replication. No external media was opened or played; no network, wallet, contract, payment, or release action occurs here.</p></div></section>
    </main>
  );
}
