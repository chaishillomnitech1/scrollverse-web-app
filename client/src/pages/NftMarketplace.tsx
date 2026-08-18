import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Archive, BadgeCheck, ClipboardCheck, Copy, Gem, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type CollectorLane = "Sun on Us — 11:11" | "ScrollSoul identity concept" | "Guardian collector concept" | "Future original collection";

const LANES: Array<{
  lane: CollectorLane;
  state: string;
  source: string;
  limitation: string;
  color: string;
}> = [
  {
    lane: "Sun on Us — 11:11",
    state: "display-ready · collector readiness",
    source: "Three owner-directed artwork records with prepared metadata and hashes",
    limitation: "No collector license, mint, listing, wallet, delivery, or sale is active.",
    color: "#FFCC4D",
  },
  {
    lane: "ScrollSoul identity concept",
    state: "concept record · requires owner release",
    source: "Original ScrollVerse collector identity concept",
    limitation: "No contract, supply, price, $LONDC amount, checkout, or token issuance is set.",
    color: "#00D4FF",
  },
  {
    lane: "Guardian collector concept",
    state: "concept record · requires owner release",
    source: "Guardian pathway and creator-owned ecosystem materials",
    limitation: "No membership, reward, allocation, staking, sale, entitlement, or distribution is active.",
    color: "#00FF88",
  },
  {
    lane: "Future original collection",
    state: "research · item evidence required",
    source: "Future owner-directed original creation lane",
    limitation: "Source, rights, public media, edition, chain, custody, terms, and release record remain required.",
    color: "#B98CFF",
  },
];

const REQUIRED_GATES = [
  "Exact original asset, version, source trail, and creator/rights record",
  "Public-media decision and accessibility description",
  "Representation mode: provenance-only, rights-cleared media, or another named mode",
  "Chain, network, contract/service, custody, edition, fee cap, and marketplace state",
  "Collector terms, delivery/support process, correction path, and rollback condition",
  "Exact current owner release and post-release public verification",
];

export default function NftMarketplace() {
  useSovereignHeartbeat({ page: "nft-marketplace" });
  const [selectedLane, setSelectedLane] = useState<CollectorLane>(LANES[0].lane);
  const [releaseNote, setReleaseNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const selected = useMemo(
    () => LANES.find((entry) => entry.lane === selectedLane) ?? LANES[0],
    [selectedLane],
  );

  const copyCollectorPacket = async () => {
    const packet = [
      "SCROLLVERSE · COLLECTOR RELEASE-READINESS PACKET",
      `Lane: ${selected.lane}`,
      `State: ${selected.state}`,
      `Source: ${selected.source}`,
      `Owner note: ${releaseNote || "Not supplied"}`,
      "Boundary: This packet does not authorize a contract, chain, mint, wallet, token, NFT, price, supply, checkout, payment, transfer, listing, delivery, payout, or provider action.",
      "Required next step: Supply every exact release gate and provide a current owner confirmation for one named irreversible action.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(packet);
      toast.success("Collector readiness packet copied. No external action was created.");
    } catch {
      toast.error("Copy was unavailable in this browser. No external action was created.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-20 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_70%_20%,rgba(185,140,255,.16),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(0,212,255,.14),transparent_34%)]">
        <div className="container py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-mono tracking-[.18em] text-[#DCC8FF]">SCROLLSOUL · COLLECTOR RELEASE READINESS</p>
              <h1 className="mt-3 text-4xl font-black sm:text-5xl">Original collector records. No mint or checkout active.</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#D6E2EE]">
                This route presents the creator’s collector concepts and prepared artwork records directly. It is a source-labeled preparation surface, not a marketplace, wallet, token sale, reward program, or minting service.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/sun-on-us-1111" className="rounded-xl border border-[#FFCC4D]/50 bg-[#FFCC4D]/10 px-4 py-3 text-sm font-black text-[#FFE7A2]">Sun on Us record</Link>
              <Link href="/creator-catalog-readiness" className="rounded-xl border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-4 py-3 text-sm font-black text-[#9DEBFF]">Full catalog readiness</Link>
              <Link href="/activation-register" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-black text-white">Exact action register</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Current state", "Collector records available · external action unavailable", "#DCC8FF"],
              ["Price and supply", "Unset until exact item-level release record", "#FFDEA0"],
              ["Chain and wallet", "No network, contract, wallet, custody, or transfer active", "#B5F7CC"],
            ].map(([label, value, color]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-mono tracking-[.13em]" style={{ color }}>{label}</p>
                <p className="mt-3 text-sm leading-6 text-[#E7EDF5]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10">
        <PortalTrustLens
          lane="Creator-owned collector readiness"
          source="Sun on Us collector record, Asset Registry, Art Museum evidence, original catalog records, and activation controls."
          readiness="Collector concepts and browser-local release packets are available. A marketplace, mint, wallet, price, supply, sale, transfer, or reward is not represented as active."
          boundary="The cards below present owner-directed source records and release gates. They do not confirm a blockchain deployment, rights clearance, collector license, financial offer, or external provider state."
          correctionHref="/co-creation-navigator"
        />
      </section>

      <section className="container py-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">COLLECTOR LANES · SOURCE-LABELED</p>
            <h2 className="mt-2 text-3xl font-black">Prepare one original collector record at a time.</h2>
          </div>
          <Gem className="h-9 w-9 text-[#DCC8FF]" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {LANES.map((entry) => (
            <button
              type="button"
              key={entry.lane}
              onClick={() => setSelectedLane(entry.lane)}
              className="rounded-3xl border p-6 text-left transition-colors"
              style={{ borderColor: selected.lane === entry.lane ? entry.color : "rgba(255,255,255,.12)", background: selected.lane === entry.lane ? `${entry.color}14` : "#071426" }}
            >
              <p className="text-xs font-mono tracking-[.12em]" style={{ color: entry.color }}>{entry.state.toUpperCase()}</p>
              <h3 className="mt-3 text-xl font-black">{entry.lane}</h3>
              <p className="mt-4 text-sm leading-6 text-[#D6E2EE]">{entry.limitation}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[2rem] border border-[#B98CFF]/40 bg-[#071426] p-7">
            <ClipboardCheck className="h-8 w-8 text-[#DCC8FF]" />
            <p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">COLLECTOR PACKET · BROWSER-LOCAL</p>
            <h2 className="mt-3 text-3xl font-black">{selected.lane}</h2>
            <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.source} · {selected.state}</p>
            <label htmlFor="collector-note" className="mt-6 block text-xs font-mono text-[#B8C7D6]">Owner release note or public-safe source reference</label>
            <textarea
              id="collector-note"
              value={releaseNote}
              onChange={(event) => setReleaseNote(event.target.value)}
              rows={5}
              placeholder="Record only public-safe source, rights, custody, terms, and release context. Do not enter credentials, wallet addresses, private customer data, or keys."
              className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm leading-6 text-white"
            />
            <label className="mt-6 flex gap-3 rounded-xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]">
              <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />
              I confirm this packet does not authorize a contract, chain, mint, wallet, token, NFT, price, supply, checkout, payment, transfer, listing, delivery, payout, or provider action.
            </label>
            <button type="button" onClick={copyCollectorPacket} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-sm font-black text-[#071426]">
              <Copy className="h-4 w-4" />Copy collector release packet
            </button>
          </article>

          <aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7">
            <ShieldCheck className="h-8 w-8 text-[#B5F7CC]" />
            <p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">REQUIRED BEFORE ANY MINT OR LISTING</p>
            <h2 className="mt-3 text-3xl font-black">One record. Every irreversible choice named.</h2>
            <div className="mt-6 space-y-3">
              {REQUIRED_GATES.map((gate, index) => (
                <div key={gate} className="flex gap-3 rounded-xl border border-[#00FF88]/20 bg-black/20 p-4">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#B5F7CC]" />
                  <div>
                    <p className="text-xs font-mono text-[#B5F7CC]">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-sm font-bold text-white">{gate}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="container py-8">
        <div className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.05] p-7">
          <Archive className="h-8 w-8 text-[#FF9EB9]" />
          <p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FF9EB9]">EXACT ACTION GATE</p>
          <h2 className="mt-3 text-3xl font-black">Collector readiness is not an automatic mint authority.</h2>
          <p className="mt-4 max-w-5xl text-sm leading-7 text-[#D6E2EE]">
            Before any provider-side contract, mint, transfer, listing, marketplace, wallet, custody, payment, payout, or collector-license action, the active request must name the exact original asset, representation mode, chain/network, service or contract, supply, public-media decision, custody destination, fee cap, collector terms, marketplace/price decision, visitor effect, and rollback condition. One exact current owner confirmation is required for that one action.
          </p>
        </div>
      </section>

      <section className="container pt-4">
        <div className="flex flex-wrap gap-3 text-sm font-bold">
          <Link href="/asset-registry" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">Asset Registry</Link>
          <Link href="/art-museum" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">Art Museum</Link>
          <Link href="/delivery-resilience" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">Delivery record</Link>
          <Link href="/creator-catalog-readiness" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">Catalog readiness</Link>
        </div>
      </section>
    </main>
  );
}
