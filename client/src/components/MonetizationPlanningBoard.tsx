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
