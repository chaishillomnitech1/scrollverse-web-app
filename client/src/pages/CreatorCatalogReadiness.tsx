import { useMemo, useState } from "react";
import { Archive, CheckCircle2, ClipboardCheck, Copy, PackageCheck, ShieldCheck, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const CATALOG_ASSETS = [
  { id: "music-chais-x", lane: "Music", title: "CHAIS X", state: "research · source-linked", source: "Direct-to-Fan music record", delivery: "No direct delivery model released", color: "#00D4FF" },
  { id: "music-letter", lane: "Music", title: "LETTER", state: "research · source-linked", source: "Direct-to-Fan music record", delivery: "No direct delivery model released", color: "#FF9CC4" },
  { id: "book-journey", lane: "Books", title: "The Book of the Journey", state: "display-only · free reader", source: "Public ScrollVerse reader route", delivery: "Available through the internal free-reader path", color: "#00FF88" },
  { id: "book-perspectives", lane: "Books", title: "ScrollVerse Perspectives", state: "requires owner release", source: "Imprint preparation route", delivery: "Edition, rights, and release path not yet complete", color: "#B5F7CC" },
  { id: "sun-1111", lane: "Collector", title: "Sun on Us — 11:11", state: "display-only · collector readiness", source: "Three-artwork collector record", delivery: "No collector license, mint, listing, or delivery active", color: "#FFCC4D" },
  { id: "museum-physical", lane: "Artwork", title: "Owner-held Art Museum Records", state: "research · rights separated", source: "Physical artwork accession records", delivery: "Physical ownership does not establish reproduction or sale rights", color: "#B98CFF" },
  { id: "fashion-lookbook", lane: "Fashion", title: "ScrollVerse Fashion Concepts", state: "requires owner release", source: "Fashion Empire and lookbook records", delivery: "No product, supplier, inventory, or fulfillment active", color: "#FF6B9A" },
  { id: "systems-blueprint", lane: "Services", title: "Enterprise Systems Blueprint", state: "release-ready · proposal only", source: "B2B systems blueprint route", delivery: "No client agreement, price, or implementation active", color: "#9DEBFF" },
  { id: "knowledge-commons", lane: "Knowledge", title: "Knowledge Commons", state: "available now · reader paths", source: "Source-labeled public research routes", delivery: "Free discovery and reading pathways only", color: "#DCC8FF" },
] as const;

const REQUIRED_FIELDS = [
  "Exact item title, version, and asset identifier",
  "Source, owner/creator context, and rights or contributor record",
  "Accessible public description and media format",
  "Offer scope, price/currency/tax basis when paid, and market eligibility",
  "Inventory, delivery, fulfillment, support, and refund/return terms where applicable",
  "Named public destination and customer-visible terms",
  "Provider, checkout, payment, and payout state verified for this exact item",
  "Exact owner release, correction path, rollback condition, and post-release verification",
] as const;

export default function CreatorCatalogReadiness() {
  useSovereignHeartbeat({ page: "creator-catalog-readiness" });
  const [lane, setLane] = useState("All");
  const [assetId, setAssetId] = useState<string>(CATALOG_ASSETS[0].id);
  const [releaseNote, setReleaseNote] = useState("");
  const [destination, setDestination] = useState("No public catalog destination confirmed");
  const [acknowledged, setAcknowledged] = useState(false);
  const lanes = ["All", ...Array.from(new Set(CATALOG_ASSETS.map((asset) => asset.lane)))];
  const visibleAssets = useMemo(() => lane === "All" ? CATALOG_ASSETS : CATALOG_ASSETS.filter((asset) => asset.lane === lane), [lane]);
  const selected = CATALOG_ASSETS.find((asset) => asset.id === assetId) ?? CATALOG_ASSETS[0];

  const copyPacket = async () => {
    if (!acknowledged) {
      toast.error("Confirm the no-provider-action boundary before copying a catalog packet.");
      return;
    }
    const text = [
      "SCROLLVERSE CREATOR-OWNED CATALOG — ITEM RELEASE PACKET DRAFT",
      `Lane: ${selected.lane}`,
      `Item: ${selected.title}`,
      `Current state: ${selected.state}`,
      `Source: ${selected.source}`,
      `Current delivery note: ${selected.delivery}`,
      `Public destination: ${destination}`,
      `Owner/source note: ${releaseNote || "Not yet supplied"}`,
      "Required before provider-side catalog or checkout action:",
      ...REQUIRED_FIELDS.map((field, index) => `${index + 1}. ${field}`),
      "Boundary: this local draft does not create a product, collection, inventory, price, catalog, checkout, payment, payout, order, customer, fulfillment, token, NFT, wallet, market, tax, shipping, or provider-side change.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Catalog release packet copied. No product or checkout action was created.");
    } catch {
      toast.error("Copy is unavailable in this browser. The release fields remain visible on this page.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_84%_14%,rgba(0,212,255,.17),transparent_28%),radial-gradient(circle_at_10%_84%,rgba(255,204,77,.12),transparent_30%),#050B1A]"><div className="container py-14 md:py-20"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/direct-fan-catalog" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← DIRECT-TO-FAN CATALOG</Link><span className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">FULL CATALOG READINESS · NO CHECKOUT ACTIVE</span></div><div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#9DEBFF]">SCROLLVERSE · CREATOR-OWNED CATALOG SYSTEM</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">One catalog. <span className="text-[#00D4FF]">Every creation on its own record.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">This workspace brings music, books, artwork, collector concepts, fashion, services, and free knowledge paths into one source-labeled catalog view. It is built for release preparation, not storefront publication.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#catalog" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Review catalog records</a><Link href="/payment-launch-packets" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Payment launch packets</Link><Link href="/activation-register" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Exact action register</Link></div></div><aside className="rounded-[2rem] border border-[#00D4FF]/35 bg-[#071426]/85 p-7"><Archive className="h-9 w-9 text-[#9DEBFF]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black leading-tight">Catalog records and release packets are available. A visitor catalog or checkout is not implied.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The observed Shopify visitor surface remains password-protected, so no visitor-visible product or checkout state is claimed here.</p></aside></div></div></section>

    <section className="container py-10"><PortalTrustLens lane="Creator-Owned Catalog & Checkout Readiness" source="Direct-to-Fan Catalog, reader routes, Asset Registry, Art Museum records, Fashion Empire concepts, Enterprise Systems Blueprint, Payment Launch Packets, and the observed public Shopify password surface." readiness="Source-labeled catalog records and browser-local item release packets are available now. Every paid or provider-published item requires its own complete release record and exact current owner confirmation." boundary="This workspace does not create a Shopify product, collection, catalog, inventory, price, checkout, payment, payout, order, customer record, fulfillment, market, tax, shipping rate, wallet action, token, NFT, or external provider change." /></section>

    <section id="catalog" className="container py-8"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">CATALOG RECORDS · SOURCE-LABELED</p><h2 className="mt-2 text-3xl font-black">Filter a lane, then prepare one exact item.</h2></div><ShoppingBag className="h-9 w-9 text-[#9DEBFF]" /></div><div className="mt-6 flex flex-wrap gap-2">{lanes.map((item) => <button type="button" key={item} onClick={() => setLane(item)} className="rounded-lg border px-3 py-2 text-xs font-black" style={{ borderColor: lane === item ? "#00D4FF" : "rgba(255,255,255,.14)", background: lane === item ? "rgba(0,212,255,.14)" : "rgba(255,255,255,.03)", color: lane === item ? "#9DEBFF" : "#D6E2EE" }}>{item}</button>)}</div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleAssets.map((asset) => <button type="button" key={asset.id} onClick={() => setAssetId(asset.id)} className="rounded-3xl border p-6 text-left" style={{ borderColor: selected.id === asset.id ? asset.color : "rgba(255,255,255,.12)", background: selected.id === asset.id ? `${asset.color}12` : "#071426" }}><p className="text-xs font-mono tracking-[.14em]" style={{ color: asset.color }}>{asset.lane.toUpperCase()}</p><h3 className="mt-3 text-2xl font-black">{asset.title}</h3><p className="mt-3 text-xs font-mono leading-6" style={{ color: asset.color }}>{asset.state}</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{asset.delivery}</p></button>)}</div></section>

    <section className="container py-8"><div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr]"><article className="rounded-[2rem] border border-[#B98CFF]/40 bg-[#071426] p-7"><ClipboardCheck className="h-8 w-8 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">ITEM-LEVEL RELEASE PACKET · BROWSER-LOCAL</p><h2 className="mt-3 text-3xl font-black">{selected.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{selected.source} · {selected.state}</p><label htmlFor="catalog-destination" className="mt-6 block text-xs font-mono text-[#B8C7D6]">Public destination or current state</label><input id="catalog-destination" value={destination} onChange={(event) => setDestination(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" /><label htmlFor="catalog-note" className="mt-6 block text-xs font-mono text-[#B8C7D6]">Owner release note or source reference</label><textarea id="catalog-note" value={releaseNote} onChange={(event) => setReleaseNote(event.target.value)} rows={5} placeholder="Record only public-safe source, rights, delivery, support, and owner-release context. Do not enter credentials, payment values, private customer data, or keys." className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm leading-6 text-white" /><label className="mt-6 flex gap-3 rounded-xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I confirm this packet does not authorize an external product, price, inventory, checkout, payment, payout, order, delivery, token, NFT, or provider action.</label><button type="button" onClick={copyPacket} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-sm font-black text-[#071426]"><Copy className="h-4 w-4" />Copy catalog release packet</button></article><aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7"><PackageCheck className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">REQUIRED BEFORE CHECKOUT</p><h2 className="mt-3 text-3xl font-black">One item. One complete release record.</h2><div className="mt-6 space-y-3">{REQUIRED_FIELDS.map((field, index) => <div key={field} className="flex gap-3 rounded-xl border border-[#00FF88]/20 bg-black/20 p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B5F7CC]" /><div><p className="text-xs font-mono text-[#B5F7CC]">{String(index + 1).padStart(2, "0")}</p><p className="mt-1 text-sm font-bold text-white">{field}</p></div></div>)}</div></aside></div></section>

    <section className="container py-8"><div className="rounded-[2rem] border border-[#FF6B9A]/35 bg-[#FF6B9A]/[.05] p-7"><ShieldCheck className="h-8 w-8 text-[#FF9EB9]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FF9EB9]">EXACT CHECKOUT ACTIVATION GATE</p><h2 className="mt-3 text-3xl font-black">A full catalog is not a blank-check checkout.</h2><p className="mt-4 max-w-5xl text-sm leading-7 text-[#D6E2EE]">Before any provider-side catalog publication, password change, product creation, price, inventory, checkout, payment, payout, shipping, market, or fulfillment action, the active request must name the provider, exact item identifier, public destination, price/currency/tax basis, delivery/support/refund terms, market, visitor effect, and rollback condition. An exact current owner confirmation is then required for that one action.</p></div></section>
  </main>;
}
