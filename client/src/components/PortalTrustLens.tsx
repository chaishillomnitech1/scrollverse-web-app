import { Link } from "wouter";

export type TrustLensProps = {
  lane: string;
  source: string;
  readiness: string;
  boundary: string;
  correctionHref?: string;
};

export function PortalTrustLens({ lane, source, readiness, boundary, correctionHref = "/co-creation-navigator" }: TrustLensProps) {
  return <section className="rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.045] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">PORTAL PERSPECTIVE LENS · {lane.toUpperCase()}</div><Link href={correctionHref} className="text-xs font-black text-[#00FF88]">Add a source or correction →</Link></div><p className="mt-3 max-w-5xl text-xs leading-6 text-[#BFD4E5]">This route presents the creator’s first-party ScrollVerse materials directly, with the source trail and current experience state visible. Visitor controls are optional ways to explore the world, follow a route, or add a correction; they do not redefine the creator’s direction.</p><div className="mt-4 grid gap-3 text-xs leading-6 md:grid-cols-3"><div><div className="font-mono text-[#00D4FF]">PERSPECTIVE & SOURCE TRAIL</div><p className="mt-1 text-[#D6E2EE]">{source}</p></div><div><div className="font-mono text-[#FFCC4D]">CURRENT EXPERIENCE STATE</div><p className="mt-1 text-[#D6E2EE]">{readiness}</p></div><div><div className="font-mono text-[#D6C4FF]">SCOPE & CONTROL</div><p className="mt-1 text-[#D6E2EE]">{boundary}</p></div></div></section>;
}
