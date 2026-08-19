import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { BadgeCheck, BookOpenCheck, ClipboardCheck, Scale, ShieldCheck, UsersRound } from "lucide-react";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const governanceLanes = [
  { title: "Source and work record", color: "#00D4FF", icon: BookOpenCheck, text: "Name the work, version, source date, creator context, contributor role, rights status, and correction route before considering any exchange pathway." },
  { title: "Participation and consent", color: "#00FF88", icon: UsersRound, text: "Document the participant role, intended exchange type, support route, accessibility needs, and affirmative consent boundary before any invitation, account, or agreement." },
  { title: "Fair conduct and dispute routing", color: "#FFB800", icon: Scale, text: "Define terms visibility, conduct expectations, a correction channel, and an external dispute route where applicable. This local record is not a court, regulator, or binding resolution." },
  { title: "Exact release gate", color: "#FF6B9A", icon: ShieldCheck, text: "A listing, contract, payment, custody, wallet, mint, trade, transfer, or provider connection remains unavailable until the exact item, destination, consequence, and approval are separately recorded." },
] as const;

const exchangeTypes = ["Display-only contribution", "Creator service scope", "Direct-to-fan item packet", "B2B systems evaluation", "Research / public knowledge", "Collector concept"] as const;

export default function CreatorExchangeGovernanceReadiness() {
  useSovereignHeartbeat({ page: "creator-exchange-governance-readiness" });
  const [work, setWork] = useState("");
  const [role, setRole] = useState("Creator / rights-aware participant");
  const [exchangeType, setExchangeType] = useState<(typeof exchangeTypes)[number]>("Display-only contribution");
  const [consent, setConsent] = useState(false);
  const [accessibility, setAccessibility] = useState("");

  const record = useMemo(() => [
    "SCROLLVERSE CREATOR EXCHANGE GOVERNANCE — LOCAL READINESS RECORD",
    "",
    `Work / source: ${work || "[add one named work or source]"}`,
    `Participant role: ${role || "[add role]"}`,
    `Intended exchange type: ${exchangeType}`,
    `Accessibility / delivery note: ${accessibility || "[add accessible description or delivery note]"}`,
    `Consent review acknowledged: ${consent ? "yes — local preparation only" : "not yet acknowledged"}`,
    "",
    "Required before any external action: item-specific source and rights record; contributor and purpose review; terms; delivery/support; privacy/data boundary; correction/dispute route; named provider or counterparty; exact public or financial consequence; rollback/stop condition; and current owner approval.",
    "Boundary: this record does not create a participant account, listing, contract, quote, payment, payout, custody position, wallet connection, token, mint, trade, transfer, financial service, or provider action.",
  ].join("\n"), [accessibility, consent, exchangeType, role, work]);

  const copyRecord = async () => {
    if (!consent) {
      toast.error("Acknowledge the local-only consent boundary before copying this readiness record.");
      return;
    }
    try {
      await navigator.clipboard.writeText(record);
      toast.success("Creator Exchange readiness record copied. No external action was created.");
    } catch {
      toast.error("Copy is unavailable in this browser. You can select the readiness record manually.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/creator-exchange-navigator" className="text-sm font-black text-[#00D4FF] transition hover:text-white">← Creator Exchange Navigator</Link>
        <div className="flex flex-wrap gap-2">
          <Link href="/shopify-staged-launch-guidance" className="rounded-lg border border-[#B98CFF]/40 px-3 py-2 text-xs font-black text-[#D6C4FF]">Shopify item packets</Link>
          <Link href="/financial-highways" className="rounded-lg border border-[#00FF88]/40 px-3 py-2 text-xs font-black text-[#B5F7CC]">Financial Highways</Link>
        </div>
      </div>

      <header className="mt-8 rounded-[2rem] border border-[#00D4FF]/30 p-8 sm:p-10" style={{ background: "radial-gradient(circle at 10% 12%, rgba(0,212,255,.16), transparent 30%), radial-gradient(circle at 90% 82%, rgba(255,184,0,.14), transparent 34%), #071124" }}>
        <div className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">CREATOR EXCHANGE · PARTICIPATION READINESS · LOCAL GOVERNANCE RECORD</div>
        <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Make participation clear before any exchange begins.</h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">This browser-local route prepares a rights-aware participation record for creator work, B2B systems evaluation, public knowledge, direct-to-fan item planning, and collector concepts. It lets visitors inspect a transparent readiness path without claiming a live marketplace, governing authority, listing, account, payment, custody, or transaction.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#00D4FF]">4</div><p className="mt-1 text-xs text-[#D6E2EE]">governance lanes</p></div>
          <div className="rounded-xl border border-[#00FF88]/25 bg-[#00FF88]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#00FF88]">0</div><p className="mt-1 text-xs text-[#D6E2EE]">live listings</p></div>
          <div className="rounded-xl border border-[#FFB800]/25 bg-[#FFB800]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#FFCC4D]">0</div><p className="mt-1 text-xs text-[#D6E2EE]">provider actions</p></div>
          <div className="rounded-xl border border-[#FF6B9A]/25 bg-[#FF6B9A]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#FF9EB9]">local</div><p className="mt-1 text-xs text-[#D6E2EE]">record only</p></div>
        </div>
      </header>

      <PortalTrustLens lane="Creator Exchange Governance" source="Creator-selected local inputs, Creator Exchange Navigator, Shopify staged-launch evidence records, Financial Highways, and source-labeled rights readiness." readiness="The local participation record and governance lanes are available now. Listing, onboarding, customer data, payment, custody, wallet, token, trade, transfer, contract, or provider activation requires a distinct exact-action record." boundary="This page is not a government, court, regulator, bank, broker, exchange, marketplace, custodian, wallet, payment processor, legal representative, or transaction authority." />

      <section className="mt-8 grid gap-4 md:grid-cols-2">{governanceLanes.map((lane) => {
        const Icon = lane.icon;
        return <article key={lane.title} className="rounded-3xl border p-6" style={{ borderColor: `${lane.color}4D`, background: `${lane.color}0D` }}><Icon className="h-7 w-7" style={{ color: lane.color }} /><div className="mt-4 text-xs font-mono tracking-[.16em]" style={{ color: lane.color }}>{lane.title.toUpperCase()}</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{lane.text}</p></article>;
      })}</section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <article className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.05] p-7">
          <ClipboardCheck className="h-8 w-8 text-[#D6C4FF]" />
          <p className="mt-5 text-xs font-mono tracking-[.16em] text-[#D6C4FF]">LOCAL PARTICIPATION RECORD</p>
          <h2 className="mt-3 text-3xl font-black">One source. One role. One clear boundary.</h2>
          <label className="mt-6 block text-xs font-mono text-[#B8C7D6]" htmlFor="exchange-work">Named work or source</label>
          <input id="exchange-work" value={work} onChange={(event) => setWork(event.target.value)} placeholder="Example: named original work, service scope, or source record" className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="exchange-role">Participant role</label>
          <input id="exchange-role" value={role} onChange={(event) => setRole(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="exchange-type">Intended pathway</label>
          <select id="exchange-type" value={exchangeType} onChange={(event) => setExchangeType(event.target.value as (typeof exchangeTypes)[number])} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white">{exchangeTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="exchange-accessibility">Accessibility or delivery note</label>
          <textarea id="exchange-accessibility" value={accessibility} onChange={(event) => setAccessibility(event.target.value)} placeholder="Add an accessible format, delivery, or support note" rows={3} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 flex gap-3 rounded-xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I understand this creates a local readiness record only; it does not submit, list, enroll, contract, sell, pay, custody, trade, mint, transfer, or activate an external service.</label>
          <button type="button" onClick={copyRecord} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-sm font-black text-[#071426]"><BadgeCheck className="h-4 w-4" />Copy readiness record</button>
        </article>
        <aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7"><p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">EXACT ACTION GATE</p><h2 className="mt-3 text-3xl font-black">Visitor choice needs a clear operating record.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Before any actual participation or exchange, the record must identify the named asset or service, source and rights status, contributor authority, accessible public description, terms, delivery and support, privacy/data boundary, dispute or correction route, named provider/counterparty, visitor consequence, stop or rollback condition, and the exact current owner release.</p><div className="mt-6 space-y-3"><Link href="/shopify-staged-launch-guidance" className="block rounded-xl border border-[#B98CFF]/35 bg-black/20 p-4 text-sm font-black text-[#D6C4FF]">Prepare a Shopify item packet →</Link><Link href="/creator-catalog-readiness" className="block rounded-xl border border-[#00D4FF]/35 bg-black/20 p-4 text-sm font-black text-[#9DEBFF]">Open creator catalog readiness →</Link><Link href="/activation-register" className="block rounded-xl border border-[#FFCC4D]/35 bg-black/20 p-4 text-sm font-black text-[#FFDEA0]">Inspect exact action gates →</Link></div><p className="mt-6 rounded-xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/[.05] p-4 text-xs leading-6 text-[#FFD0DC]">No existing screenshot, provider interface, crawler signature, public source link, or local planning record is converted into a public product, checkout, agreement, transfer, or regulated service by this page.</p></aside>
      </section>
    </section>
  </main>;
}
