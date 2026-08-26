import { Link } from "wouter";

export type TrustLensProps = {
  lane: string;
  source: string;
  readiness: string;
  boundary: string;
  correctionHref?: string;
};

export function PortalTrustLens({ lane, source, readiness, boundary: _boundary, correctionHref = "/co-creation-navigator" }: TrustLensProps) {
  return <section className="rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.045] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">PORTAL PERSPECTIVE LENS · {lane.toUpperCase()}</div><Link href={correctionHref} className="text-xs font-black text-[#00FF88]">Add a source or correction →</Link></div><p className="mt-3 max-w-5xl text-xs leading-6 text-[#BFD4E5]">This route presents creator-led ScrollVerse materials with their source trail and current experience state visible. Use the visitor controls to explore the world, follow the source paths, share a correction, and make your own reading.</p><div className="mt-4 grid gap-3 text-xs leading-6 md:grid-cols-3"><div><div className="font-mono text-[#00D4FF]">PERSPECTIVE & SOURCE TRAIL</div><p className="mt-1 text-[#D6E2EE]">{source}</p></div><div><div className="font-mono text-[#FFCC4D]">CURRENT EXPERIENCE STATE</div><p className="mt-1 text-[#D6E2EE]">{readiness}</p></div><div><div className="font-mono text-[#D6C4FF]">READER INVITATION</div><p className="mt-1 text-[#D6E2EE]">Study the linked material, connect it with the wider ScrollVerse record, and bring any new source or correction into the conversation.</p></div></div></section>;
}
