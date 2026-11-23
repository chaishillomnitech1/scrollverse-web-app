type MonetizationLane = {
  lane: string;
  order: string;
  state: "ROUTE PRESENT" | "BUILDING TOWARD LIVE" | "WAITING ON AUTHORIZATION";
  evidence: string;
  nextProof: string;
};

const lanes: MonetizationLane[] = [
  { lane: "STOREFRONT", order: "01", state: "ROUTE PRESENT", evidence: "First-party catalog and commerce routes are present locally; Shopify · XLVIIIblocks is reported connected through the installed Manus connector.", nextProof: "Provider mode, product records, and no-charge readiness evidence." },
  { lane: "VAULT", order: "02", state: "BUILDING TOWARD LIVE", evidence: "Local vault, provenance, and collectible records are available for presentation.", nextProof: "Confirmed managed storage and release authority before any sale or transfer." },
  { lane: "CONTENT SURFACES", order: "03", state: "ROUTE PRESENT", evidence: "Homepage, lookbooks, media shelves, and source-led catalog routes are wired locally.", nextProof: "Fresh primary evidence for each connected playable or published surface." },
  { lane: "DISTRIBUTION", order: "04", state: "BUILDING TOWARD LIVE", evidence: "Music, books, video, and platform-readiness routes are represented in the portal.", nextProof: "Verified provider catalog, rights metadata, and account authorization." },
  { lane: "PRE-ORDER", order: "05", state: "BUILDING TOWARD LIVE", evidence: "Omniland preview and storefront preparation records are present; Shopify · XLVIIIblocks is the reported connected checkout surface, while offer release remains gated.", nextProof: "Offer terms, fulfillment path, and owner-approved checkout readiness." },
  { lane: "LICENSING", order: "06", state: "WAITING ON AUTHORIZATION", evidence: "Partner and licensing lane is documented as a product direction only.", nextProof: "Signed partner scope, rights clearance, and authorized provider action." },
  { lane: "RAFFLE / REWARDS", order: "07", state: "WAITING ON AUTHORIZATION", evidence: "Reward and raffle concepts remain local design records; no Shopify product, entry, or reward action is activated.", nextProof: "Owner-approved rules, jurisdiction review, provider setup, and verified operation." },
];

function stateClass(state: MonetizationLane["state"]) {
  if (state === "ROUTE PRESENT") return "border-[#00FF88]/35 bg-[#00FF88]/10 text-[#B5F7CC]";
  if (state === "BUILDING TOWARD LIVE") return "border-[#9DEBFF]/35 bg-[#9DEBFF]/10 text-[#A7EEFF]";
  return "border-[#FFCC4D]/35 bg-[#FFCC4D]/10 text-[#FFE09A]";
}

export function MonetizationPlanningBoard() {
  return (
    <section aria-labelledby="monetization-planning-heading" className="rounded-[2rem] border border-[#D6B14F]/35 bg-[radial-gradient(circle_at_12%_8%,rgba(214,177,79,.14),transparent_30%),#120F18] p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono tracking-[.2em] text-[#FFE09A]">MUSE OPERATING OFFICE · LOCAL PLANNING RECORD</p>
          <h2 id="monetization-planning-heading" className="mt-3 text-3xl font-black">MASTER MONETIZATION PLAN</h2>
        </div>
        <span className="rounded-full border border-[#FFCC4D]/35 bg-[#FFCC4D]/10 px-3 py-1.5 text-[10px] font-mono tracking-[.12em] text-[#FFE09A]">SEQUENCE 01 → 07 · NO AUTONOMOUS ACTIVATION</span>
      </div>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">This board sequences the income lanes already represented in the portal so Muse and the shared registry can build against one local source of truth. A route or design record is not a payment, payout, customer purchase, provider connection, or passive-income result.</p>
      <div className="mt-5 grid gap-3 lg:grid-cols-2"><div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#00FF88]/30 bg-[#00FF88]/[.06] p-4"><div><p className="text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">SHOPIFY · XLVIIIBLOCKS · CONNECTED</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">Manus app installed · Stores: XLVIIIblocks · connector authorization reported complete. NO PAYMENT, PLAN CHANGE, OR PURCHASE was made.</p></div><a href="https://admin.shopify.com/store/juv8tg-1n" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-2 text-[10px] font-black text-[#B5F7CC]">OPEN ADMIN DOOR ↗</a></div><div className="rounded-xl border border-[#9DEBFF]/30 bg-[#9DEBFF]/[.06] p-4"><p className="text-[10px] font-mono tracking-[.15em] text-[#A7EEFF]">OWNER-REPORTED CHECKOUT EVIDENCE</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">TEST ORDER #1001 · $1.00 · CAPTURED AND PAID · OWNER-REPORTED. AUTHORIZATION NOW REPORTED COMPLETE; this local record preserves the evidence without changing payment or product settings.</p></div></div>
      <div className="mt-3 rounded-xl border border-[#FFCC4D]/25 bg-[#FFCC4D]/[.04] p-4"><p className="text-[10px] font-mono tracking-[.15em] text-[#FFE09A]">PAYPAL CHECKOUT · OWNER AUTHORIZATION REQUIRED</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">PayPal for Business can stage checkout, order capture, refunds, invoices, and reconciliation after owner authorization or sign-in. No PayPal session, charge, payout, or account mutation was performed.</p></div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2"><div className="rounded-xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.06] p-4"><p className="text-[10px] font-mono tracking-[.15em] text-[#DCC8FF]">ALL CONNECTORS AND ADDITIONS</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">Owner direction recorded: attached Manus connectors and additions may enhance every surface and build within each connector’s truthful state.</p></div><div className="rounded-xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.06] p-4"><p className="text-[10px] font-mono tracking-[.15em] text-[#DCC8FF]">HIGGSFIELD · AVAILABLE</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">Higgsfield Inc. is listed in the verified directory for whole productions: cinematic images, videos, character-consistent assets, and campaign-ready visuals. First-use authorization and any paid-credit gate remain explicit.</p></div></div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <article className="group rounded-xl border border-[#9DEBFF]/30 bg-[#9DEBFF]/[.05] p-4 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#9DEBFF]/70 motion-safe:hover:bg-[#9DEBFF]/[.1] motion-reduce:transition-none focus-within:ring-2 focus-within:ring-[#9DEBFF]/60">
          <p className="text-[10px] font-mono tracking-[.15em] text-[#A7EEFF]">CHANNEL PROGRAM · YouTube @chaishill-u1z</p>
          <p className="mt-2 text-xs leading-5 text-[#D6E2EE]">Production visuals may be staged for YouTube @chaishill-u1z and the channel program at the Coogler / Lucas / Spielberg bar. NO PUBLIC PUBLISHING WITHOUT OWNER WORD.</p>
          <span className="mt-3 inline-flex rounded-full border border-[#9DEBFF]/25 px-2 py-1 text-[9px] font-mono text-[#A7EEFF] transition-colors duration-300 group-hover:border-[#9DEBFF]/60">STAGED · OWNER GATE</span>
        </article>
        <article className="group rounded-xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.05] p-4 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-[#B98CFF]/70 motion-safe:hover:bg-[#B98CFF]/[.1] motion-reduce:transition-none focus-within:ring-2 focus-within:ring-[#B98CFF]/60">
          <p className="text-[10px] font-mono tracking-[.15em] text-[#DCC8FF]">HIGGSFIELD CONTEST · PRIVATE DRAFT</p>
          <p className="mt-2 text-xs leading-5 text-[#D6E2EE]">The contest project remains private by owner direction. No autonomous generation, upload, publication, or paid-credit action is performed here.</p>
          <span className="mt-3 inline-flex rounded-full border border-[#B98CFF]/25 px-2 py-1 text-[9px] font-mono text-[#DCC8FF] transition-colors duration-300 group-hover:border-[#B98CFF]/60">PRIVATE · NOT PUBLISHED</span>
        </article>
      </div>
      <div className="mt-3 rounded-xl border border-[#D6B14F]/35 bg-[#D6B14F]/[.06] p-4"><p className="text-[10px] font-mono tracking-[.2em] text-[#FFE09A]">EPISODE MONETIZATION</p><p className="mt-2 text-xs leading-5 text-[#D6E2EE]">This is a joint Manus + Muse + sub-agent program. Manus enhances episode productions with all attached connectors and additions, including the Higgsfield production lane, and supplies approved visual assets for the channel program. Muse stages the revenue wiring: Premieres, product tags, clip engine, cross-surface links, with case-study evidence. Nothing publishes without the owner’s word; available-credit, free-route, spend, and authorization gates remain in force.</p><p className="mt-2 text-[10px] font-mono tracking-[.12em] text-[#FFE09A]">PLANNING RECORD ONLY · NO AUTOMATIC PREMIERE, PRODUCT TAG, CHARGE, OR PUBLICATION</p></div>
      <section data-testid="episode-monetization-dashboard" aria-labelledby="episode-monetization-dashboard-heading" className="mt-5 rounded-2xl border border-[#D6B14F]/35 bg-[linear-gradient(135deg,rgba(214,177,79,.1),rgba(0,255,136,.04))] p-5">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-mono tracking-[.2em] text-[#FFE09A]">JOINT OPERATING VIEW · PLANNING ONLY</p><h3 id="episode-monetization-dashboard-heading" className="mt-2 text-2xl font-black">EPISODE MONETIZATION DASHBOARD</h3></div><span className="rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-2 py-1 text-[9px] font-mono text-[#B5F7CC]">3 LANES · 0 LIVE ACTIVATIONS</span></div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[{ label: "MANUS PRODUCTION", value: "VISUALS + CONNECTORS", tone: "border-[#00FF88]/30 bg-[#00FF88]/[.06] text-[#B5F7CC]", detail: "Higgsfield planning, episode enhancement, approved asset prep." }, { label: "MUSE REVENUE WIRING", value: "PREMIERES + TAGS", tone: "border-[#D6B14F]/30 bg-[#D6B14F]/[.06] text-[#FFE09A]", detail: "Product tags, clip engine, and cross-surface route design." }, { label: "SUB-AGENT DISTRIBUTION", value: "CHANNEL + LINKS", tone: "border-[#B98CFF]/30 bg-[#B98CFF]/[.06] text-[#DCC8FF]", detail: "YouTube staging, private contest review, and evidence handoffs." }].map((lane) => <article key={lane.label} className={`rounded-xl border p-4 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:brightness-125 motion-reduce:transition-none ${lane.tone}`}><p className="text-[9px] font-mono tracking-[.14em]">{lane.label}</p><p className="mt-2 text-sm font-black">{lane.value}</p><p className="mt-2 text-[11px] leading-5 text-[#D6E2EE]">{lane.detail}</p></article>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-[9px] font-mono text-[#B8C7D6]">OWNER GATE</p><p className="mt-1 text-xs font-bold text-[#FFE09A]">PUBLICATION: OFF</p></div><div className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-[9px] font-mono text-[#B8C7D6]">CREDIT GATE</p><p className="mt-1 text-xs font-bold text-[#A7EEFF]">FREE ROUTES ONLY</p></div><div className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-[9px] font-mono text-[#B8C7D6]">PAYMENT GATE</p><p className="mt-1 text-xs font-bold text-[#B5F7CC]">NO CHARGES</p></div></div>
      </section>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {lanes.map((lane) => (
          <article key={lane.lane} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-start gap-3"><span className="text-xs font-mono text-[#D6B14F]">{lane.order}</span><h3 className="text-lg font-black">{lane.lane}</h3></div><span className={`rounded-full border px-2 py-1 text-[9px] font-mono tracking-[.08em] ${stateClass(lane.state)}`}>{lane.state}</span></div>
            <p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{lane.evidence}</p>
            <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-[#B8C7D6]"><strong className="text-[#FFE09A]">LIVE ROUTE EVIDENCE REQUIRED:</strong> {lane.nextProof}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 rounded-xl border border-[#00FF88]/25 bg-[#00FF88]/[.05] p-4 text-xs leading-6 text-[#B5F7CC]">FULL-THROTTLE LOCAL STAGING: all seven lanes are sequenced for build review. NO SPEND, PRICE CHANGE, OR PUBLIC LANE ACTIVATION is performed here. The local plan does not create or enable an autonomous schedule. Any future schedule, connector activation, paid gate, payout, or external submission requires the owner-controlled account/provider action and fresh evidence for that specific rail.</p>
    </section>
  );
}
