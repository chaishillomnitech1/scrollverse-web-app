import { useMemo, useState } from "react";
import { Activity, ArrowRight, BarChart3, ClipboardCheck, Copy, Eye, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const CATALOG_RECORDS = [
  { title: "CHAIS X", releaseState: "Research · source-linked", path: "/direct-fan-catalog", purpose: "Connect the specific catalog record to its source, release brief, and visitor path." },
  { title: "LETTER", releaseState: "Research · source-linked", path: "/direct-fan-catalog", purpose: "Prepare a named release and attribution brief without assuming a platform result." },
  { title: "Ghetto Gospel", releaseState: "Research · source-linked", path: "/direct-fan-catalog", purpose: "Preserve asset-level release context before measuring or acting on any external signal." },
  { title: "Book of the Journey", releaseState: "Available now · free reading", path: "/book-of-the-journey", purpose: "Keep an open-reader path distinct from any future paid edition or campaign record." },
] as const;

const ATTRIBUTION_LAYERS = [
  { label: "Source & release record", state: "Available now", detail: "A named asset can be paired with source context, rights/release state, accessible visitor description, and a correction path." },
  { label: "Visitor pathway", state: "Available now", detail: "Choose a specific portal route, public source, free reader, or future external destination without inferring an audience action." },
  { label: "Audience and campaign signal", state: "Research", detail: "No listener count, email list, pixel, profile, campaign result, or platform attribution is imported or simulated here." },
  { label: "Provider result record", state: "Requires owner release", detail: "A verified destination URL, provider export, terms, permission, and owner release are required before any external result is recorded." },
] as const;

const VISITOR_PATHS = ["Free reader or listener route", "Catalog release packet", "Public source inspection", "Future provider destination (release-gated)"] as const;

export default function CatalogEngagementAttribution() {
  useSovereignHeartbeat({ page: "catalog-engagement-attribution" });
  const [assetTitle, setAssetTitle] = useState<(typeof CATALOG_RECORDS)[number]["title"]>(CATALOG_RECORDS[0].title);
  const [visitorPath, setVisitorPath] = useState<(typeof VISITOR_PATHS)[number]>(VISITOR_PATHS[0]);
  const [campaignPurpose, setCampaignPurpose] = useState("");
  const [ownerNote, setOwnerNote] = useState("");

  const asset = useMemo(() => CATALOG_RECORDS.find((item) => item.title === assetTitle) ?? CATALOG_RECORDS[0], [assetTitle]);

  const copyBrief = async () => {
    const brief = [
      "SCROLLVERSE CATALOG ENGAGEMENT & ATTRIBUTION BRIEF",
      `Asset: ${asset.title}`,
      `Current release state: ${asset.releaseState}`,
      `Visitor path: ${visitorPath}`,
      `Campaign purpose: ${campaignPurpose || "Not yet provided"}`,
      `Owner note: ${ownerNote || "Not yet provided"}`,
      "Data boundary: browser-local preparation only; no pixel, analytics account, audience profile, listener count, provider export, email, payment, wallet, or external action is connected.",
      "Future result gate: exact source, provider, permission, scope, terms, verified result reference, correction path, and explicit owner release.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(brief);
      toast.success("Browser-local attribution brief copied. No audience, provider, or financial action was created.");
    } catch {
      toast.error("Copy is unavailable in this browser. You can select the brief fields directly from the page.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_85%_14%,rgba(0,212,255,.16),transparent_28%),radial-gradient(circle_at_10%_88%,rgba(185,140,255,.14),transparent_30%),#050B1A]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/direct-fan-catalog" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← DIRECT-TO-FAN CATALOG</Link><span className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">CATALOG ENGAGEMENT · BROWSER-LOCAL</span></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.16fr_.84fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#9DEBFF]">SCROLLVERSE · CREATOR-CONTROLLED ATTRIBUTION FOUNDATION</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.92] md:text-7xl">Know the pathway <span className="text-[#00D4FF]">before the metric.</span></h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Prepare one transparent brief that keeps the asset, visitor path, purpose, source boundary, and future result record together. This foundation is built for clarity first—without inventing audience numbers or connecting an analytics provider.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#brief" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Build local brief</a><Link href="/release-destinations" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Destination packets</Link><Link href="/product-release-pipeline" className="rounded-xl border border-[#00FF88]/45 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Release pipeline</Link></div></div><aside className="rounded-[2rem] border border-[#00D4FF]/35 bg-[#071426]/85 p-7"><Eye className="h-9 w-9 text-[#9DEBFF]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black leading-tight">Transparent local preparation is available now.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">No pixel, analytics account, listener data, email list, audience profile, provider export, campaign action, payment, or financial attribution is active on this route.</p></aside></div>
      </div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="Catalog Engagement & Attribution" source="Owner-stated catalog context, Direct-to-Fan Catalog records, release-readiness fields, and browser-local attribution preparation." readiness="Named catalog records and browser-local briefs are available now. External engagement or attribution is a separately permissioned and source-verified future record." boundary="This route does not set tracking pixels, read analytics, collect visitor data, create an audience segment, send a campaign, connect a provider, process payment, create a sale, or make a financial claim." /></section>

    <section className="container py-6"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">ATTRIBUTION LAYERS</p><h2 className="mt-2 text-3xl font-black">Separate the record from the result.</h2></div><Activity className="h-9 w-9 text-[#9DEBFF]" /></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{ATTRIBUTION_LAYERS.map((layer, index) => <article key={layer.label} className="rounded-3xl border border-[#00D4FF]/25 bg-[#071426] p-6"><p className="text-xs font-mono text-[#9DEBFF]">LAYER {String(index + 1).padStart(2, "0")}</p><h3 className="mt-4 text-xl font-black">{layer.label}</h3><p className="mt-3 inline-flex rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono text-[#9DEBFF]">{layer.state}</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{layer.detail}</p></article>)}</div></section>

    <section id="brief" className="container scroll-mt-10 py-12"><div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><article className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_88%_14%,rgba(0,212,255,.13),transparent_25%),#071426] p-7"><ClipboardCheck className="h-8 w-8 text-[#9DEBFF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#9DEBFF]">BROWSER-LOCAL ENGAGEMENT BRIEF</p><h2 className="mt-3 text-3xl font-black">Make the next review inspectable.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Choose one asset and visitor path, then define the intended purpose. The inputs remain in this browser session unless you copy the brief yourself.</p><label htmlFor="catalog-asset" className="mt-7 block text-xs font-mono text-[#B8C7D6]">Named catalog record</label><select id="catalog-asset" value={assetTitle} onChange={(event) => setAssetTitle(event.target.value as typeof assetTitle)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm font-bold text-white">{CATALOG_RECORDS.map((item) => <option key={item.title} value={item.title}>{item.title} · {item.releaseState}</option>)}</select><label htmlFor="visitor-path" className="mt-5 block text-xs font-mono text-[#B8C7D6]">Visitor pathway</label><select id="visitor-path" value={visitorPath} onChange={(event) => setVisitorPath(event.target.value as typeof visitorPath)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm font-bold text-white">{VISITOR_PATHS.map((item) => <option key={item} value={item}>{item}</option>)}</select><label htmlFor="campaign-purpose" className="mt-5 block text-xs font-mono text-[#B8C7D6]">Purpose for future review</label><input id="campaign-purpose" value={campaignPurpose} onChange={(event) => setCampaignPurpose(event.target.value)} placeholder="Example: make the source and release packet easier to inspect" className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white placeholder:text-[#77899B]" /><label htmlFor="attribution-note" className="mt-5 block text-xs font-mono text-[#B8C7D6]">Owner context or correction note</label><textarea id="attribution-note" value={ownerNote} onChange={(event) => setOwnerNote(event.target.value)} rows={5} placeholder="Keep this to non-sensitive release, source, audience-permission, or correction context. Do not enter credentials, customer data, account numbers, or wallet information." className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm leading-6 text-white placeholder:text-[#77899B]" /><button type="button" onClick={copyBrief} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00D4FF] px-4 py-3 text-sm font-black text-[#071426] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Copy className="h-4 w-4" />Copy browser-local attribution brief</button></article>
      <article className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.05] p-7"><BarChart3 className="h-8 w-8 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">SELECTED RECORD</p><h2 className="mt-3 text-3xl font-black">{asset.title}</h2><p className="mt-3 inline-flex rounded-full border border-[#B98CFF]/35 bg-[#B98CFF]/10 px-3 py-1 text-[10px] font-mono text-[#DCC8FF]">{asset.releaseState}</p><p className="mt-5 text-sm leading-7 text-[#D6E2EE]">{asset.purpose}</p><div className="mt-7 rounded-2xl border border-[#B98CFF]/25 bg-black/20 p-5"><p className="text-xs font-mono text-[#DCC8FF]">REVIEW HANDOFF</p><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Use the catalog record for source context, the release packet for rights and destination readiness, and the external-result gate only after a specific provider, permission, data scope, and correction path are named.</p><Link href={asset.path} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#DCC8FF]">Open selected asset pathway <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-5 rounded-2xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-5"><LockKeyhole className="h-6 w-6 text-[#FFDEA0]" /><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">There are no metrics, conversion values, listener totals, campaign results, or revenue figures on this route. A future result record must identify its source, date, provider permission, scope, limitation, and correction path before anyone interprets it.</p></div></article></div></section>

    <section className="container py-6"><div className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7"><ShieldCheck className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">FAIL-CLOSED OPERATING RULE</p><h2 className="mt-3 text-3xl font-black">A future provider signal never outranks the record that explains it.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Before any external attribution or engagement action, record the exact provider, owner-authorized account, asset, intended audience, data fields, retention period, costs, terms, result destination, correction path, and one explicit confirmation. This foundation cannot send a campaign, read a dashboard, create a segment, alter a provider, or claim a commercial outcome.</p></div></section>
  </main>;
}
