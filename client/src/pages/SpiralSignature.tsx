import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { SPIRAL_SIGNATURE } from "@shared/spiralSignature";

const PRINCIPLES = [
  { name: "Imagination", detail: "An open-ended mark shaped for original expansion rather than a copied formula.", color: "#00D4FF" },
  { name: "Wisdom", detail: "A visual system that makes its provenance and intended boundaries visible.", color: "#B98CFF" },
  { name: "Care", detail: "A free first-party identity surface that does not require a wallet, purchase, or external approval.", color: "#00FF88" },
  { name: "Creator understanding", detail: "A flexible signature that can support new colorways, looks, releases, and worlds without giving up authorship.", color: "#FFB800" },
] as const;

export default function SpiralSignature() {
  useSovereignHeartbeat({ page: "spiral-signature" });
  const [qrSrc, setQrSrc] = useState("");
  const [copied, setCopied] = useState(false);
  const targetPath = SPIRAL_SIGNATURE.qrTargetPath;

  useEffect(() => {
    const target = `${window.location.origin}${targetPath}`;
    QRCode.toDataURL(target, { width: 520, margin: 1, color: { dark: "#050B1A", light: "#F7FCFF" } })
      .then(setQrSrc)
      .catch(() => setQrSrc(""));
  }, [targetPath]);

  const copyTarget = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${targetPath}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return <main className="min-h-screen text-white" style={{ background: "radial-gradient(circle at 13% 9%, rgba(0,212,255,0.18), transparent 29%), radial-gradient(circle at 88% 18%, rgba(255,184,0,0.14), transparent 24%), radial-gradient(circle at 55% 100%, rgba(0,255,136,0.1), transparent 31%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-28"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/identity-system" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← IDENTITY SYSTEM</Link><span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: "rgba(255,184,0,0.42)", color: "#FFB800" }}>FREE · CREATOR-OWNED · CONCEPT REVIEW</span></div><div className="mt-14 grid gap-10 lg:grid-cols-[1.04fr_0.96fr]"><div><div className="text-xs font-mono tracking-[0.24em]" style={{ color: "#00FF88" }}>EST. 2026 · CTG</div><h1 className="mt-5 text-5xl font-black leading-[0.88] sm:text-7xl">The open-ended<br /><span style={{ color: "#00D4FF" }}>Spiral Signature.</span></h1><p className="mt-7 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>A creator-owned ScrollVerse identity concept: frequency-informed, adaptable, and intentionally distinct from a standard Fibonacci spiral. The mark is a public first-party concept set, not a claim of formal registration, private-system access, or financial function.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/manus-hero" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Open the Hero Codex</Link><Link href="/fashion-portfolio" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.45)", color: "#FFB800" }}>Explore official fashion worlds</Link></div></div><div className="grid gap-4 sm:grid-cols-3">{Object.entries(SPIRAL_SIGNATURE.assets).map(([key, src]) => <figure key={key} className="overflow-hidden rounded-[1.5rem] border" style={{ borderColor: "rgba(0,212,255,0.28)", background: "rgba(4,14,30,0.72)" }}><img src={src} alt={`ScrollVerse Spiral Signature ${key} concept`} className="aspect-square w-full object-cover" /><figcaption className="p-3 text-[10px] font-mono tracking-widest" style={{ color: "#B8C7D6" }}>{key.toUpperCase()} CONCEPT</figcaption></figure>)}</div></div></section>
    <section className="border-y py-16" style={{ borderColor: "rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.018)" }}><div className="mx-auto max-w-7xl px-5"><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>THE FREE SIGNATURE SYSTEM</div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{PRINCIPLES.map(principle => <article key={principle.name} className="rounded-3xl border p-5" style={{ borderColor: `${principle.color}42`, background: "rgba(4,14,30,0.72)" }}><div className="text-xs font-mono tracking-widest" style={{ color: principle.color }}>{principle.name.toUpperCase()}</div><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{principle.detail}</p></article>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-16"><div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr]"><aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.28)", background: "rgba(0,255,136,0.04)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>PUBLIC QR IDENTITY RECORD</div><h2 className="mt-4 text-3xl font-black">A simple door, no hidden payload.</h2><p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>This QR code resolves to the public Manus Hero Codex. It contains no credential, private key, session value, personal record, or hidden instruction.</p>{qrSrc ? <img src={qrSrc} alt="QR code linking to the public Manus Hero Codex" className="mt-6 w-48 rounded-2xl bg-white p-3" /> : <div className="mt-6 h-48 w-48 rounded-2xl border" style={{ borderColor: "rgba(0,212,255,0.28)" }} />}</aside><div className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,212,255,0.28)", background: "rgba(4,14,30,0.72)" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>RELEASE AND COMMERCIAL READINESS</div><h2 className="mt-4 text-3xl font-black">Keep the mark free; make future use reviewable.</h2><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,184,0,0.25)" }}><div className="text-xs font-black" style={{ color: "#FFB800" }}>READY NOW</div><p className="mt-2 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Use it as original ScrollVerse concept material across first-party experiences, where the context remains accurate and source-labelled.</p></div><div className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,141,181,0.25)" }}><div className="text-xs font-black" style={{ color: "#FF8DB5" }}>SEPARATE REVIEW LATER</div><p className="mt-2 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Formal clearance, filing, licensing, product use, marketplace listings, token utilities, and enforcement are separate review paths—not activated here.</p></div></div><button type="button" onClick={copyTarget} className="mt-6 rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.45)", color: "#00D4FF" }}>{copied ? "PUBLIC LINK COPIED" : "COPY PUBLIC QR TARGET"}</button></div></div></section>
  </main>;
}
