import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type NetworkRecord = {
  network: string;
  chainId: string;
  status: string;
  color: string;
  summary: string;
  actions: Array<{ label: string; href: string }>;
};

const NETWORK_RECORDS: NetworkRecord[] = [
  {
    network: "Scroll zkEVM",
    chainId: "534352",
    status: "PUBLIC EVIDENCE CHECKED",
    color: "#B98CFF",
    summary: "ScrollScan is the designated public explorer route. The supplied vault and treasury identifiers currently resolve as zero-activity EOAs; the supplied primary-contract string is abbreviated and cannot be queried as an EVM address.",
    actions: [
      { label: "Open ScrollScan", href: "https://scrollscan.com/" },
      { label: "Open Knicks NFT route", href: "https://scrollverse.co/knicks-nft" },
    ],
  },
  {
    network: "Polygon",
    chainId: "137",
    status: "LOCAL PACKAGE AUDITED",
    color: "#00D4FF",
    summary: "The local Hardhat script selects Polygon and deploys LONDCToken, ZakatDistribution, and MetatronCodex. No local deployment output or confirmed Polygon contract address is currently recorded.",
    actions: [
      { label: "Open Polygon explorer", href: "https://polygonscan.com/" },
      { label: "Open local audit context", href: "/protection-protocol" },
    ],
  },
];

const CONTRACT_AUDIT = [
  {
    name: "LONDCToken",
    type: "ERC-20",
    color: "#00D4FF",
    fact: "Current local source defines a maximum supply of 144,000,000 LONDC and an opt-in transferWithZakat function at 250 basis points.",
    boundary: "Ordinary ERC-20 transfers do not invoke that optional transfer function.",
  },
  {
    name: "ZakatDistribution",
    type: "Recipient vault",
    color: "#FFB800",
    fact: "Current local source maintains an owner-managed recipient registry with equal or custom token-distribution functions.",
    boundary: "No recipient address or completed distribution is represented here.",
  },
  {
    name: "MetatronCodex",
    type: "ERC-721 URI",
    color: "#00FF88",
    fact: "Current local source defines a 70-token cap, configurable base URI, and platform-wallet mint-payment path.",
    boundary: "The audited source does not implement ERC-2981 royalties.",
  },
];

const PREFLIGHT_STEPS = [
  "Choose one network record and one exact contract set; Scroll zkEVM and Polygon are separate network records.",
  "Bind a replacement deployment key only through secure project settings; no key is displayed, copied, or stored in public files.",
  "Compile the selected sources, validate constructor addresses and metadata URI, and record the derived public deployer address.",
  "Prepare the explorer-verification command from final constructor inputs before any broadcast.",
  "Obtain a fresh explicit mainnet confirmation naming the network and exact contract set before submitting an irreversible transaction.",
];

const SCROLL_TRACTION = [
  { label: "Transactions · 24h", value: "11,513", note: "Observed public Scroll network transactions" },
  { label: "Completed transactions", value: "133.053M", note: "Explorer-reported completed transaction count" },
  { label: "Average block time", value: "13.909s", note: "Explorer-reported chain cadence" },
  { label: "Total verified contracts", value: "172.338K", note: "Explorer-reported Scroll network total" },
];

export default function Deploy() {
  useSovereignHeartbeat({ page: "deployment-evidence" });
  const [preflightOpen, setPreflightOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEvidenceSummary = async () => {
    const summary = [
      "ScrollVerse public deployment evidence console",
      "Scroll zkEVM (534352): ScrollScan is the public verification route; no complete primary contract address is in the current evidence bundle.",
      "Polygon (137): local audited package is LONDCToken, ZakatDistribution, and MetatronCodex; no confirmed deployment address is recorded.",
      "Read-only controls only. No broadcast, mint, transfer, custody, or wallet action occurs from this page.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Public evidence summary copied.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Clipboard access was unavailable. Select the record from the page instead.");
    }
  };

  return (
    <main className="min-h-screen text-white" style={{ background: "radial-gradient(circle at 84% 4%, rgba(185,140,255,0.16), transparent 28%), radial-gradient(circle at 4% 45%, rgba(0,212,255,0.14), transparent 32%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="border-b" style={{ borderColor: "rgba(0,212,255,0.14)", background: "rgba(5,11,26,0.86)", backdropFilter: "blur(18px)" }}>
        <div className="container flex items-center justify-between py-4 gap-4">
          <Link href="/" className="flex items-center gap-3 text-white hover:text-[#00D4FF] transition-colors">
            <span className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</span>
            <span className="font-bold">ScrollVerse</span>
            <span className="hidden sm:inline text-[10px] font-mono px-2 py-1 rounded" style={{ color: "#00D4FF", border: "1px solid rgba(0,212,255,0.28)" }}>EVIDENCE CONSOLE</span>
          </Link>
          <Link href="/knowledge-navigator" className="text-sm font-mono px-3 py-2 rounded-lg" style={{ color: "#B98CFF", border: "1px solid rgba(185,140,255,0.3)" }}>Knowledge Navigator</Link>
        </div>
      </header>

      <section className="container py-12 md:py-16">
        <div className="max-w-4xl">
          <p className="text-xs font-mono tracking-[0.2em] mb-4" style={{ color: "#00D4FF" }}>PUBLIC DEPLOYMENT EVIDENCE CONSOLE</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Deployment evidence,<br /><span style={{ color: "#FFB800" }}>not placeholder promises.</span></h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed" style={{ color: "#AAB8C8" }}>
            This console activates the public route: explorer links, first-party evidence, a copyable release summary, and a visible preflight sequence. It distinguishes the audited Polygon package from the supplied Scroll zkEVM record instead of blending them into one claim.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => setPreflightOpen(value => !value)} className="px-5 py-3 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ color: "#050B1A", background: "linear-gradient(135deg, #00D4FF, #67E8F9)" }}>
              {preflightOpen ? "Hide release preflight" : "Open release preflight"}
            </button>
            <button onClick={copyEvidenceSummary} className="px-5 py-3 rounded-xl font-bold text-sm" style={{ color: "#FFB800", border: "1px solid rgba(255,184,0,0.4)", background: "rgba(255,184,0,0.07)" }}>
              {copied ? "Evidence copied" : "Copy evidence record"}
            </button>
            <Link href="/creator-operations" className="px-5 py-3 rounded-xl font-bold text-sm" style={{ color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)", background: "rgba(0,255,136,0.06)" }}>Open protected operations</Link>
          </div>
        </div>

        {preflightOpen && (
          <section className="mt-10 max-w-5xl rounded-2xl p-6 md:p-8" style={{ border: "1px solid rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.045)" }}>
            <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
              <div>
                <p className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>READ-ONLY RELEASE PREFLIGHT</p>
                <h2 className="text-2xl font-bold mt-2">The selected source must match the selected network.</h2>
              </div>
              <span className="text-xs font-mono px-3 py-2 rounded-full" style={{ color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>NO WALLET ACTION FROM THIS PAGE</span>
            </div>
            <ol className="grid gap-3">
              {PREFLIGHT_STEPS.map((step, index) => <li key={step} className="flex gap-4 text-sm leading-relaxed" style={{ color: "#C6D2DF" }}><span className="font-mono" style={{ color: "#FFB800" }}>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
            </ol>
          </section>
        )}

        <section className="mt-14">
          <div className="flex flex-wrap gap-4 justify-between items-end mb-6"><div><p className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>NETWORK RECORDS</p><h2 className="text-2xl font-bold mt-2">Separate routes. Clear evidence.</h2></div><p className="text-sm max-w-md" style={{ color: "#8899AA" }}>Scroll zkEVM and Polygon are separate network records. An explorer record is checked at the address or transaction level.</p></div>
          <div className="grid lg:grid-cols-2 gap-5">
            {NETWORK_RECORDS.map(record => <article key={record.network} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${record.color}35` }}>
              <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-mono" style={{ color: record.color }}>CHAIN ID {record.chainId}</p><h3 className="text-2xl font-bold mt-1">{record.network}</h3></div><span className="text-[10px] font-mono px-2 py-1 rounded" style={{ color: record.color, background: `${record.color}15` }}>{record.status}</span></div>
              <p className="text-sm leading-relaxed mt-5" style={{ color: "#B6C4D1" }}>{record.summary}</p>
              <div className="flex flex-wrap gap-3 mt-6">{record.actions.map(action => action.href.startsWith("http") ? <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4" style={{ color: record.color }}>{action.label} ↗</a> : <Link key={action.label} href={action.href} className="text-sm font-semibold underline underline-offset-4" style={{ color: record.color }}>{action.label} →</Link>)}</div>
            </article>)}
          </div>
        </section>

        <section className="mt-14 rounded-2xl p-6 md:p-8" style={{ background: "rgba(185,140,255,0.055)", border: "1px solid rgba(185,140,255,0.3)" }}>
          <div className="flex flex-wrap justify-between items-start gap-5"><div className="max-w-2xl"><p className="text-xs font-mono tracking-widest" style={{ color: "#B98CFF" }}>SCROLLSCAN PUBLIC TRACTION</p><h2 className="text-2xl font-bold mt-2">The network draw, labeled at its source.</h2><p className="text-sm leading-relaxed mt-3" style={{ color: "#B7C3D0" }}>Retrieved from the public ScrollScan <span className="font-mono">/stats</span> surface on August 13, 2026. These figures describe public Scroll network activity, not ScrollVerse-specific traffic, sales, holdings, wallet balances, or contract volume.</p></div><a href="https://scrollscan.com/stats" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl font-semibold text-sm" style={{ color: "#B98CFF", border: "1px solid rgba(185,140,255,0.45)", background: "rgba(185,140,255,0.09)" }}>Open live ScrollScan stats ↗</a></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7">{SCROLL_TRACTION.map(metric => <div key={metric.label} className="rounded-xl p-4" style={{ background: "rgba(5,11,26,0.48)", border: "1px solid rgba(185,140,255,0.18)" }}><p className="text-xs font-mono" style={{ color: "#B98CFF" }}>{metric.label}</p><p className="text-2xl font-black mt-2">{metric.value}</p><p className="text-xs leading-relaxed mt-2" style={{ color: "#8494A7" }}>{metric.note}</p></div>)}</div>
        </section>

        <section className="mt-14">
          <p className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>LOCAL POLYGON CONTRACT AUDIT</p>
          <h2 className="text-2xl font-bold mt-2">What the current local script would deploy.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "#8899AA" }}>This is code-level context, not an active contract announcement. No confirmed Scroll mainnet contract address is in the current evidence bundle, and no confirmed Polygon deployment output is recorded.</p>
          <div className="grid md:grid-cols-3 gap-5 mt-6">{CONTRACT_AUDIT.map(contract => <article key={contract.name} className="rounded-xl p-5" style={{ border: `1px solid ${contract.color}28`, background: "rgba(255,255,255,0.02)" }}><p className="text-xs font-mono" style={{ color: contract.color }}>{contract.type}</p><h3 className="font-bold text-xl mt-2">{contract.name}</h3><p className="text-sm mt-4 leading-relaxed" style={{ color: "#C5D0DB" }}>{contract.fact}</p><p className="text-xs mt-4 leading-relaxed" style={{ color: "#FFB800" }}>Boundary: {contract.boundary}</p></article>)}</div>
        </section>

        <section className="mt-14 rounded-2xl p-7 md:p-9" style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.09), rgba(185,140,255,0.08))", border: "1px solid rgba(255,184,0,0.28)" }}>
          <p className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>PUBLIC ACTION BOUNDARY</p>
          <h2 className="text-3xl font-black mt-3">Read, inspect, and prepare—without implying a broadcast.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "#CCD5DE" }}>The explorer and first-party route buttons are live. This page does not broadcast, mint, transfer, purchase, custody assets, connect a wallet, or authenticate a provider. A real mainnet transaction requires the exact selected contract set, secure replacement configuration, a compile preflight, and a fresh confirmation that names the network and action.</p>
          <div className="flex flex-wrap gap-4 mt-6"><Link href="/knowledge-navigator" className="font-bold text-sm px-4 py-3 rounded-lg" style={{ color: "#00D4FF", border: "1px solid rgba(0,212,255,0.35)" }}>Explore source-led records</Link><Link href="/protection-protocol" className="font-bold text-sm px-4 py-3 rounded-lg" style={{ color: "#B98CFF", border: "1px solid rgba(185,140,255,0.35)" }}>Review protection protocol</Link></div>
        </section>
      </section>
    </main>
  );
}
