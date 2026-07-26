/*
 * FREQUENCY PLAYER — SOVEREIGN AUDIO ENGINE
 * 963Hz / 999Hz / 528Hz / 432Hz — Solfeggio frequencies + Chais The Great catalog
 * Design: Dark sovereign, cyan/gold pulses, animated waveform visualizer
 * Web Audio API — real-time tone generation + S3 proxy stream support
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

// Solfeggio frequency catalog
const FREQUENCIES = [
  {
    hz: 999,
    name: "Gate 44:Omni",
    subtitle: "Omniversal Convergence",
    description: "The frequency of absolute sovereignty. All 144 Gates unified. Thoth-Hawk court-sanctuary. The rarest vibration in the empire.",
    color: "#FFD700",
    chakra: "Crown+",
    benefit: "Omniversal alignment, divine convergence, Gate 44 activation",
    duration: 300, // seconds
  },
  {
    hz: 963,
    name: "Crown Frequency",
    subtitle: "Divine Connection",
    description: "Pineal gland activation. Direct connection to the divine source code. The highest Solfeggio frequency — pure consciousness.",
    color: "#9B59B6",
    chakra: "Crown",
    benefit: "Pineal activation, divine connection, higher consciousness",
    duration: 300,
  },
  {
    hz: 528,
    name: "Love Frequency",
    subtitle: "DNA Repair & Healing",
    description: "The miracle tone. DNA repair. The heart of the empire beats at 528Hz. Love as the fundamental force of creation.",
    color: "#00FF88",
    chakra: "Heart",
    benefit: "DNA repair, love activation, cellular healing",
    duration: 300,
  },
  {
    hz: 432,
    name: "Earth Frequency",
    subtitle: "Natural Harmony",
    description: "The natural tuning of the universe. Grounding. Harmony with the Earth's resonance. The foundation of all sovereign sound.",
    color: "#00D4FF",
    chakra: "Root",
    benefit: "Grounding, natural harmony, stress relief",
    duration: 300,
  },
  {
    hz: 396,
    name: "Liberation Frequency",
    subtitle: "Fear & Guilt Release",
    description: "Liberation from fear and guilt. The foundation tone. Clearing the path for sovereign ascension.",
    color: "#FF6B9D",
    chakra: "Root",
    benefit: "Fear release, guilt clearing, liberation",
    duration: 300,
  },
  {
    hz: 417,
    name: "Change Frequency",
    subtitle: "Transformation",
    description: "Facilitating change. Undoing situations and facilitating change. The frequency of transformation and new beginnings.",
    color: "#FF8C00",
    chakra: "Sacral",
    benefit: "Change facilitation, trauma clearing, transformation",
    duration: 300,
  },
  {
    hz: 741,
    name: "Expression Frequency",
    subtitle: "Awakening Intuition",
    description: "Awakening intuition. Solving problems. The frequency of expression, solutions, and creative awakening.",
    color: "#00D4FF",
    chakra: "Throat",
    benefit: "Intuition awakening, problem solving, expression",
    duration: 300,
  },
  {
    hz: 852,
    name: "Intuition Frequency",
    subtitle: "Returning to Spiritual Order",
    description: "Returning to spiritual order. Awakening intuition. The bridge between the physical and the divine.",
    color: "#FFB800",
    chakra: "Third Eye",
    benefit: "Spiritual order, intuition, divine bridge",
    duration: 300,
  },
];

// Chais The Great catalog tracks (S3 proxy stream)
const CATALOG_TRACKS = [
  { id: "throwing-stones", title: "Throwing Stones", artist: "Chais The Great", frequency: "963Hz", color: "#FFD700", duration: "3:44" },
  { id: "phase-44", title: "Phase 44", artist: "Chais The Great", frequency: "999Hz", color: "#9B59B6", duration: "4:44" },
  { id: "genesis", title: "Genesis", artist: "Chais The Great", frequency: "528Hz", color: "#00FF88", duration: "5:28" },
];

type PlayerState = "idle" | "playing" | "paused";

export default function FrequencyPlayer() {
  useSovereignHeartbeat({ page: "frequency-player" });

  const [selectedFreq, setSelectedFreq] = useState(FREQUENCIES[0]);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [activeTab, setActiveTab] = useState<"frequencies" | "catalog">("frequencies");
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(300); // 5 min default

  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize Web Audio API
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    // Create analyser for waveform visualization
    if (!analyserRef.current) {
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.connect(audioCtxRef.current.destination);
    }

    // Create gain node
    if (!gainNodeRef.current) {
      gainNodeRef.current = audioCtxRef.current.createGain();
      gainNodeRef.current.gain.value = volume;
      gainNodeRef.current.connect(analyserRef.current);
    }
  }, [volume]);

  const startTone = useCallback((freq: typeof FREQUENCIES[0]) => {
    initAudio();
    if (!audioCtxRef.current || !gainNodeRef.current) return;

    // Stop existing oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    // Create new oscillator
    const osc = audioCtxRef.current.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq.hz, audioCtxRef.current.currentTime);
    osc.connect(gainNodeRef.current);
    osc.start();
    oscillatorRef.current = osc;

    setPlayerState("playing");
    setCurrentTime(0);
  }, [initAudio]);

  const stopTone = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    setPlayerState("idle");
    setCurrentTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const pauseTone = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      setPlayerState("paused");
    }
  }, []);

  const resumeTone = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.1);
      setPlayerState("playing");
    }
  }, [volume]);

  // Volume control
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioCtxRef.current.currentTime, 0.05);
    }
  }, [volume]);

  // Timer
  useEffect(() => {
    if (playerState === "playing" && timerActive) {
      timerRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= timerDuration) {
            stopTone();
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playerState, timerActive, timerDuration, stopTone]);

  // Waveform visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      if (!analyserRef.current) return;
      analyserRef.current.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "rgba(5,11,26,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = selectedFreq.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = selectedFreq.color;
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    if (playerState === "playing") {
      draw();
    } else {
      cancelAnimationFrame(animFrameRef.current);
      // Draw flat line when idle
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `${selectedFreq.color}40`;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [playerState, selectedFreq]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTone();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [stopTone]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const progressPct = timerActive ? (currentTime / timerDuration) * 100 : 0;

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif", color: "white" }}>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
              <span className="font-bold text-white">ScrollVerse</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }}>
              FREQUENCY PLAYER
            </span>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="py-16 text-center relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center top, rgba(0,212,255,0.08) 0%, rgba(5,11,26,1) 60%)" }}>
        <div className="relative z-10 container">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
            SOLFEGGIO FREQUENCIES · WEB AUDIO API · CHAIS THE GREAT CATALOG
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ fontFamily: "'Space Mono', monospace" }}>
            <span style={{ color: "#00D4FF" }}>FREQUENCY</span>{" "}
            <span className="text-white">PLAYER</span>
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#8899AA" }}>
            Pure Solfeggio tones generated in real-time. 963Hz crown activation. 999Hz Gate 44:Omni convergence. The sound of the sovereign empire.
          </p>
        </div>
      </section>

      {/* ── MAIN PLAYER ── */}
      <section className="py-8">
        <div className="container max-w-3xl mx-auto">

          {/* Now Playing Card */}
          <div className="rounded-2xl p-8 mb-6" style={{ background: `${selectedFreq.color}06`, border: `1px solid ${selectedFreq.color}25` }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: selectedFreq.color, boxShadow: playerState === "playing" ? `0 0 12px ${selectedFreq.color}` : "none" }} />
              <span className="text-xs font-mono" style={{ color: selectedFreq.color }}>
                {playerState === "playing" ? "● LIVE" : playerState === "paused" ? "⏸ PAUSED" : "○ READY"}
              </span>
            </div>

            <div className="flex items-end justify-between mb-2">
              <div>
                <div className="text-5xl font-black mb-1" style={{ color: selectedFreq.color, fontFamily: "'Space Mono', monospace" }}>
                  {selectedFreq.hz}Hz
                </div>
                <div className="text-xl font-bold text-white">{selectedFreq.name}</div>
                <div className="text-sm" style={{ color: "#8899AA" }}>{selectedFreq.subtitle} · {selectedFreq.chakra} Chakra</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono mb-1" style={{ color: "#8899AA" }}>BENEFIT</div>
                <div className="text-xs max-w-48 text-right" style={{ color: selectedFreq.color }}>{selectedFreq.benefit}</div>
              </div>
            </div>

            {/* Waveform Canvas */}
            <div className="rounded-xl overflow-hidden mb-6" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${selectedFreq.color}20` }}>
              <canvas ref={canvasRef} width={700} height={80} className="w-full" />
            </div>

            {/* Progress bar (timer mode) */}
            {timerActive && (
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono mb-1" style={{ color: "#8899AA" }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(timerDuration)}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${selectedFreq.color}, ${selectedFreq.color}80)` }} />
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause/Stop */}
                {playerState === "idle" && (
                  <button
                    onClick={() => startTone(selectedFreq)}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${selectedFreq.color}, ${selectedFreq.color}CC)`, color: "#050B1A" }}
                  >
                    ▶
                  </button>
                )}
                {playerState === "playing" && (
                  <>
                    <button
                      onClick={pauseTone}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-105"
                      style={{ background: `${selectedFreq.color}20`, border: `2px solid ${selectedFreq.color}`, color: selectedFreq.color }}
                    >
                      ⏸
                    </button>
                    <button
                      onClick={stopTone}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 hover:opacity-80"
                      style={{ background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF4444" }}
                    >
                      ■
                    </button>
                  </>
                )}
                {playerState === "paused" && (
                  <>
                    <button
                      onClick={resumeTone}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${selectedFreq.color}, ${selectedFreq.color}CC)`, color: "#050B1A" }}
                    >
                      ▶
                    </button>
                    <button
                      onClick={stopTone}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 hover:opacity-80"
                      style={{ background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)", color: "#FF4444" }}
                    >
                      ■
                    </button>
                  </>
                )}
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono" style={{ color: "#8899AA" }}>🔊</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 accent-current"
                  style={{ accentColor: selectedFreq.color }}
                />
                <span className="text-xs font-mono w-8" style={{ color: "#8899AA" }}>{Math.round(volume * 100)}%</span>
              </div>

              {/* Timer toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className="text-xs px-3 py-1.5 rounded-lg font-mono transition-all duration-200"
                  style={{
                    background: timerActive ? `${selectedFreq.color}15` : "transparent",
                    border: `1px solid ${timerActive ? selectedFreq.color : "rgba(255,255,255,0.1)"}`,
                    color: timerActive ? selectedFreq.color : "#8899AA",
                  }}
                >
                  ⏱ Timer
                </button>
                {timerActive && (
                  <select
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                    className="text-xs px-2 py-1.5 rounded-lg font-mono"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                  >
                    <option value={300}>5 min</option>
                    <option value={600}>10 min</option>
                    <option value={900}>15 min</option>
                    <option value={1800}>30 min</option>
                    <option value={3600}>60 min</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(["frequencies", "catalog"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  background: activeTab === tab ? "rgba(0,212,255,0.12)" : "transparent",
                  border: `1px solid ${activeTab === tab ? "rgba(0,212,255,0.4)" : "transparent"}`,
                  color: activeTab === tab ? "#00D4FF" : "#8899AA",
                }}
              >
                {tab === "frequencies" ? "🎵 Solfeggio Frequencies" : "🎤 Chais The Great Catalog"}
              </button>
            ))}
          </div>

          {/* Frequency grid */}
          {activeTab === "frequencies" && (
            <div className="grid md:grid-cols-2 gap-3">
              {FREQUENCIES.map((freq) => {
                const isSelected = selectedFreq.hz === freq.hz;
                return (
                  <div
                    key={freq.hz}
                    onClick={() => {
                      setSelectedFreq(freq);
                      if (playerState === "playing") startTone(freq);
                    }}
                    className="rounded-xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background: isSelected ? `${freq.color}10` : `${freq.color}04`,
                      border: `1px solid ${isSelected ? freq.color + "50" : freq.color + "20"}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: freq.color, boxShadow: isSelected ? `0 0 6px ${freq.color}` : "none" }} />
                        <span className="text-xl font-black" style={{ color: freq.color, fontFamily: "'Space Mono', monospace" }}>{freq.hz}Hz</span>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${freq.color}15`, color: freq.color }}>{freq.chakra}</span>
                    </div>
                    <div className="font-bold text-white text-sm mb-1">{freq.name}</div>
                    <div className="text-xs" style={{ color: "#8899AA" }}>{freq.subtitle}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Catalog */}
          {activeTab === "catalog" && (
            <div className="space-y-3">
              <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.15)" }}>
                <p className="text-xs" style={{ color: "#FFB800" }}>
                  🎵 Chais The Great catalog streams via Vydia. Full tracks available on all major platforms. Frequency-tuned masters.
                </p>
              </div>
              {CATALOG_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                  style={{ background: `${track.color}06`, border: `1px solid ${track.color}20` }}
                  onClick={() => {
                    // In production: stream from S3 proxy or Vydia embed
                    window.open(`https://open.spotify.com/search/${encodeURIComponent(track.title + " Chais The Great")}`, "_blank");
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: `${track.color}15`, border: `1px solid ${track.color}30` }}>
                      🎵
                    </div>
                    <div>
                      <div className="font-bold text-white">{track.title}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{track.artist} · {track.frequency}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{track.duration}</span>
                    <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${track.color}15`, color: track.color }}>▶ Stream</span>
                  </div>
                </div>
              ))}
              <div className="text-center pt-4">
                <Link href="/chais-catalog">
                  <span className="text-xs font-mono cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#00D4FF" }}>
                    View full Chais The Great catalog →
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FREQUENCY SCIENCE ── */}
      <section className="py-12" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
        <div className="container max-w-3xl mx-auto text-center">
          <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00D4FF" }}>THE SCIENCE OF SOVEREIGNTY</div>
          <h2 className="text-2xl font-black text-white mb-6">Why Solfeggio Frequencies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🧬", title: "DNA Resonance", desc: "528Hz has been shown to repair DNA and reduce stress hormones. The love frequency is not metaphor — it is physics." },
              { icon: "🧠", title: "Pineal Activation", desc: "963Hz stimulates the pineal gland — the seat of consciousness. The crown frequency opens the divine channel." },
              { icon: "🌍", title: "Earth Harmony", desc: "432Hz matches the Earth's natural resonance (Schumann). Grounding. Peace. The foundation of all sovereign sound." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-5" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-white mb-2">{item.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#8899AA" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t px-6 py-10 text-center" style={{ borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="text-sm font-mono mb-2" style={{ color: "#00D4FF" }}>FREQUENCY PLAYER · SCROLLVERSE TRINITY</div>
        <p className="text-xs mb-4" style={{ color: "#8899AA" }}>Chais The Great × ScrollVerse · 963Hz / 999Hz · Solfeggio Frequencies · Web Audio API</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>← Home</Link>
          <Link href="/gates" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>144 Gates</Link>
          <Link href="/chais-catalog" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>Chais Catalog</Link>
          <Link href="/gate-keys" className="text-xs hover:text-white transition-colors" style={{ color: "#8899AA" }}>Gate Keys</Link>
        </div>
        <div className="mt-6 text-sm font-black" style={{ color: "#00D4FF" }}>KUN FAYAKŪN × ∞</div>
      </footer>
    </div>
  );
}
