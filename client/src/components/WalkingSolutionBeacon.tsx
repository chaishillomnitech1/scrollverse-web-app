import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "wouter";

export function WalkingSolutionBeacon() {
  return (
    <Link
      href="/book-of-the-journey"
      className="fixed bottom-[4.75rem] right-3 z-40 hidden max-w-[15rem] items-center gap-2 rounded-2xl border border-[#FFCC4D]/45 bg-[#071426]/95 px-3 py-2 text-left shadow-[0_14px_44px_rgba(0,0,0,.38)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#FFCC4D] sm:flex sm:bottom-4 sm:right-4"
      aria-label="Open the Book of the Journey and the Walking Solution identity record"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFCC4D]/15 text-[#FFDEA0]">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[9px] font-mono tracking-[.13em] text-[#FFCC4D]">OWNER-AUTHORED</span>
        <span className="block truncate text-xs font-black text-white">I’m a Walking Solution</span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#FFDEA0]" />
    </Link>
  );
}
