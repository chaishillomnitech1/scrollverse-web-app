import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const records = [
  ["NRI-001", "79a4d2305a9950877a9a15cb5e4d8579.jpeg", "Invitation-style graphic", "0d3fb4b7d410d4ce77756a1fb99a559feda807d41902caf3e6f4ec60fee06857"],
  ["NRI-002", "7A42C1B1-E054-4D80-A592-9CA94176ACD5.JPEG", "Indoor group-scene reference", "64f46119b1acdf2637091c09b3600602187b792b9196f7c37e7f133fd2c2b06b"],
  ["NRI-003", "910f760a1cda11990ce2bd9d0b5f4632.JPEG", "Garment graphic reference", "ade0fe734bd5a34a49e219955d75cca98670e2865b96ad343c56bdde9b695b48"],
  ["NRI-004", "92b0833ca35d4c6de1b89b845cc9f782.JPEG", "Garment small-mark reference", "f935d9d42ed0cdf8b479539d2a0040ab08be44a48ab4ab9f45981d4916afb7d2"],
  ["NRI-005", "9F9EBBA9-FCE1-418D-ADB6-F71068F8F81B.JPG", "Indoor group-scene reference", "4e611df80921a1c267f35f392d3085d29eef90acb7372b74c4d5a2b242e7fc40"],
] as const;

export default function NextRetainedImageIntake() {
  useSovereignHeartbeat({ page: "next-retained-image-intake" });
  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white"><section className="container py-14"><Link href="/protected-visual-evidence-hub" className="text-xs font-mono text-cyan-300">← PROTECTED VISUAL EVIDENCE HUB</Link><p className="mt-10 font-mono text-xs tracking-[.2em] text-cyan-300">SCROLLVERSE · RETAINED SOURCE INTAKE</p><h1 className="mt-4 text-5xl font-black">Five sources, held as <span className="text-cyan-300">evidence.</span></h1><p className="mt-5 max-w-3xl text-slate-300">Browser-local metadata for a protected five-file tranche. Source images are not displayed or republished.</p></section><section className="container"><PortalTrustLens lane="Next retained-image intake" source="Five owner-supplied local image files reviewed by direct observation and SHA-256 fingerprinting." readiness="Available now as browser-local research metadata." boundary="No identity, event, rights, brand, inventory, sale, campaign, payment, or release state is established."/></section><section className="container grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">{records.map(([id,file,treatment,hash])=><article key={id} className="rounded-3xl border border-white/10 bg-white/[.03] p-6"><p className="font-mono text-xs text-cyan-300">{id} · RESEARCH</p><h2 className="mt-3 break-all text-xl font-black">{file}</h2><p className="mt-3 text-sm text-amber-200">{treatment}</p><p className="mt-4 break-all font-mono text-[10px] text-emerald-300">SHA-256 · {hash}</p><p className="mt-4 text-xs text-slate-300">Source-visible context only. No public image display or commercial claim.</p></article>)}</section></main>;
}
