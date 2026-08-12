import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import {
  CHAIN_INTELLIGENCE_RECORDS,
  CHAIN_INTERPRETATION_RULES,
  CHAIN_NETWORK_CONTEXT,
  CHAIN_STATUS_COLORS,
} from "@shared/chainIntelligence";

export default function ChainIntelligence() {
  useSovereignHeartbeat({ page: "chain-intelligence" });

  return (
    <main className="min-h-screen pb-20 text-white" style={{ background: "radial-gradient(circle at 91% 4%, rgba(0,212,255,0.17), transparent 28%), radial-gradient(circle at 4% 64%, rgba(185,140,255,0.14), transparent 34%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(0,212,255,0.2)" }}>
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/empire-map" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← EMPIRE MAP</Link>
            <span className="rounded-full border px-3 py-1 text-[10px] font-mono tracking-widest" style={{ borderColor: "rgba(0,255,136,0.42)", color: "#00FF88" }}>SOURCE-LINKED · NON-CUSTODIAL</span>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#00D4FF" }}>SCROLLVERSE CHAIN INTELLIGENCE</div>
              <h1 className="mt-5 text-5xl font-black leading-[0.9] sm:text-7xl">Know the record.<br /><span style={{ color: "#00D4FF" }}>Keep the context.</span></h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>A first-party explorer and evidence navigator for the ScrollVerse blockchain, token, wallet, NFT, contract, and public-chain pathways. It connects verified sources and portal routes without claiming custody, exchange, trading, valuation, transfer, deployment, or asset ownership.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={CHAIN_NETWORK_CONTEXT.explorerUrl} target="_blank" rel="noreferrer" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00D4FF", color: "#050B1A" }}>Open Scrollscan ↗</a>
                <Link href="/creator-operations" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.46)", color: "#FFB800" }}>Stage a source record</Link>
              </div>
            </div>
            <aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(185,140,255,0.35)", background: "rgba(4,14,30,0.74)" }}>
              <div className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>NETWORK CONTEXT</div>
              <h2 className="mt-4 text-3xl font-black">{CHAIN_NETWORK_CONTEXT.name}</h2>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div><dt style={{ color: "#8FA1B4" }}>Chain ID</dt><dd className="mt-1 font-mono font-black" style={{ color: "#00D4FF" }}>{CHAIN_NETWORK_CONTEXT.chainId}</dd></div>
                <div><dt style={{ color: "#8FA1B4" }}>Status</dt><dd className="mt-1 text-xs font-black" style={{ color: CHAIN_STATUS_COLORS[CHAIN_NETWORK_CONTEXT.status] }}>{CHAIN_NETWORK_CONTEXT.status}</dd></div>
              </dl>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{CHAIN_NETWORK_CONTEXT.note}</p>
              <a href={CHAIN_NETWORK_CONTEXT.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block text-xs font-black" style={{ color: "#B98CFF" }}>Read official network context ↗</a>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>TRACKER RECORDS</div><h2 className="mt-3 text-3xl font-black">Four types of evidence. One readable map.</h2></div>
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: "#AEBFD0" }}>Every card identifies whether it is a first-party route, an external explorer, a source-linked network fact, or a record still awaiting evidence.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CHAIN_INTELLIGENCE_RECORDS.map(record => {
            const color = CHAIN_STATUS_COLORS[record.status];
            const external = record.href.startsWith("http");
            const content = <><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-mono tracking-widest" style={{ color }}>{record.status}</span><span className="text-xs" style={{ color }}>{external ? "SOURCE ↗" : "OPEN →"}</span></div><h3 className="mt-5 text-xl font-black">{record.title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#B8C7D6" }}>{record.detail}</p></>;
            const className = "rounded-3xl border p-6 transition-transform hover:-translate-y-1";
            const style = { borderColor: `${color}42`, background: "rgba(4,14,30,0.72)" };
            return external ? <a key={record.title} href={record.href} target="_blank" rel="noreferrer" className={className} style={style}>{content}</a> : <Link key={record.title} href={record.href} className={className} style={style}>{content}</Link>;
          })}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.02)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div><div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>READ THE RECORD, NOT THE HYPE</div><h2 className="mt-4 text-3xl font-black">Evidence stays visible.</h2><p className="mt-5 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>The tracker gives visitors a clear path to first-party education and external public records. It does not replace professional, legal, tax, security, or financial review.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {CHAIN_INTERPRETATION_RULES.map((rule, index) => <article key={rule} className="rounded-2xl border p-5" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(4,14,30,0.65)" }}><div className="text-xs font-mono" style={{ color: index % 2 ? "#B98CFF" : "#00D4FF" }}>0{index + 1} · INTERPRETATION RULE</div><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{rule}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16"><div className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.3)", background: "linear-gradient(135deg, rgba(0,255,136,0.06), rgba(4,14,30,0.76))" }}><div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>THE HERO PATH</div><div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="text-3xl font-black">Learn the route. Preserve your proof. Choose the next move.</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Use the Hero co-creator desk to prepare original work and source notes, then use Creator Operations to stage a public chain reference with provenance before presenting it as a verified ScrollVerse record.</p></div><div className="flex flex-wrap gap-3"><Link href="/manus-hero#co-creator" className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: "#00FF88", color: "#050B1A" }}>Open Hero co-creator</Link><Link href="/evidence-standards" className="rounded-xl border px-5 py-3 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.42)", color: "#00D4FF" }}>Read evidence rules</Link></div></div></div></section>
    </main>
  );
}
