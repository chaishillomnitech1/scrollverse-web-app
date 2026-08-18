import { useState } from "react";
import { ClipboardCheck, Copy, LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const MEMBERSHIP_CONCEPTS = [
  { id: "guardian", title: "Guardian pathway", symbol: "◇", color: "#00D4FF", state: "requires owner release", detail: "A community and learning-path concept. No membership price, entitlement, payment method, Discord access, distribution, or token allocation is active." },
  { id: "sovereign", title: "Sovereign pathway", symbol: "◈", color: "#FFB800", state: "requires owner release", detail: "A creator-support concept. No subscription, staking program, rewards dashboard, private channel, or benefit package is active." },
  { id: "flamebearer", title: "Flamebearer pathway", symbol: "✦", color: "#FF6B35", state: "requires owner release", detail: "A future collector and community concept. No price, NFT, council role, lifetime access promise, or token benefit is active." },
] as const;

const REQUIRED_RELEASE_FIELDS = [
  "Exact tier or offer identifier and version",
  "Public description with accessible format",
  "Confirmed customer eligibility and terms",
  "Price, currency, tax, and refund basis when paid",
  "Delivery, entitlement, support, and correction path",
  "Named payment provider and customer-visible destination",
  "Any token, reward, or membership right as a separately cleared record",
  "Exact owner release and post-release public verification",
] as const;

export default function Subscribe() {
  useSovereignHeartbeat({ page: "subscribe-release-readiness" });
  const [selected, setSelected] = useState<(typeof MEMBERSHIP_CONCEPTS)[number]["id"]>("guardian");
  const [acknowledged, setAcknowledged] = useState(false);
  const active = MEMBERSHIP_CONCEPTS.find((item) => item.id === selected) ?? MEMBERSHIP_CONCEPTS[0];

  const copyReadinessNote = async () => {
    if (!acknowledged) {
      toast.error("Confirm the no-subscription and no-provider-action boundary before copying the readiness note.");
      return;
    }
    const note = [
      "SCROLLVERSE MEMBERSHIP PATHWAY — RELEASE-READINESS DRAFT ONLY",
      `Selected concept: ${active.title}`,
      `Operating state: ${active.state}`,
      "Required before any visitor-facing membership action:",
      ...REQUIRED_RELEASE_FIELDS.map((field, index) => `${index + 1}. ${field}`),
      "Boundary: this local draft does not create a subscription, account, entitlement, price, checkout, payment, payout, token allocation, staking reward, distribution, email list, customer record, wallet action, NFT, or provider-side change.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(note);
      toast.success("Membership readiness note copied. No subscription or provider action was created.");
    } catch {
      toast.error("Copy is unavailable in this browser. The readiness fields remain visible here.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <section className="border-b border-[#FFB800]/25 bg-[radial-gradient(circle_at_82%_15%,rgba(255,184,0,.16),transparent_28%),radial-gradient(circle_at_8%_85%,rgba(0,212,255,.13),transparent_31%),#050B1A]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">← SCROLLVERSE HOME</Link><span className="rounded-full border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">MEMBERSHIP RELEASE READINESS · NO SUBSCRIPTION ACTIVE</span></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.12fr_.88fr] lg:items-end"><div><p className="text-xs font-mono tracking-[.2em] text-[#FFDEA0]">GUARDIAN PATHWAYS · SOURCE-BOUND PREPARATION</p><h1 className="mt-4 max-w-4xl text-5xl font-black leading-[.92] md:text-7xl">Prepare each <span className="text-[#FFCC4D]">membership promise</span> before it becomes visitor-facing.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Guardian, Sovereign, and Flamebearer are conceptual release lanes. They are not active subscriptions, price offers, token allocations, staking programs, access entitlements, card products, or checkout flows.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/payment-launch-packets" className="rounded-xl border border-[#FFB800]/45 bg-[#FFB800]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Payment launch packets</Link><Link href="/activation-register" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Exact action register</Link><Link href="/token-readiness" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Token readiness</Link></div></div><aside className="rounded-[2rem] border border-[#FFCC4D]/35 bg-[#071426]/85 p-7"><LockKeyhole className="h-9 w-9 text-[#FFDEA0]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#FFDEA0]">CURRENT OPERATING STATE</p><p className="mt-3 text-2xl font-black leading-tight">Preparation is available. A visitor membership release is not implied.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">No customer data is captured here, and no release action can be taken from this route.</p></aside></div>
      </div>
    </section>

    <section className="container py-10"><PortalTrustLens lane="Membership Release Readiness" source="Owner-directed pathway concepts, Activation Register, Payment Launch Packets, token-release records, and item-level release standards." readiness="Concept selection and browser-local readiness drafts are available. Any membership, payment, entitlement, reward, distribution, or token action requires its own current source record and exact owner release." boundary="This route does not create an account, collect an email, register a waitlist, set a price, open checkout, accept payment, configure payout, allocate a token, issue an NFT, establish staking, promise access, or change a provider setting." /></section>

    <section className="container py-8"><div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">CONCEPT LANES · NO OFFER TERMS</p><h2 className="mt-2 text-3xl font-black">Choose a record to prepare, not a tier to purchase.</h2></div><UsersRound className="h-9 w-9 text-[#FFDEA0]" /></div><div className="mt-7 grid gap-5 md:grid-cols-3">{MEMBERSHIP_CONCEPTS.map((concept) => <button type="button" key={concept.id} onClick={() => setSelected(concept.id)} className={`rounded-[2rem] border p-6 text-left transition ${selected === concept.id ? "bg-white/[.07]" : "bg-[#071426]"}`} style={{ borderColor: selected === concept.id ? concept.color : `${concept.color}40` }}><p className="text-3xl" style={{ color: concept.color }}>{concept.symbol}</p><p className="mt-5 text-[10px] font-mono tracking-[.14em]" style={{ color: concept.color }}>{concept.state.toUpperCase()}</p><h3 className="mt-2 text-2xl font-black">{concept.title}</h3><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{concept.detail}</p></button>)}</div></section>

    <section className="container py-8"><div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr]"><article className="rounded-[2rem] border border-[#B98CFF]/40 bg-[#071426] p-7"><ClipboardCheck className="h-8 w-8 text-[#DCC8FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#DCC8FF]">BROWSER-LOCAL READINESS DRAFT</p><h2 className="mt-3 text-3xl font-black">{active.title}</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The selected concept remains release-gated. Review the full record before any individual provider action is proposed.</p><ol className="mt-7 space-y-3">{REQUIRED_RELEASE_FIELDS.map((field, index) => <li key={field} className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-[#D6E2EE]"><span className="font-mono text-[#DCC8FF]">0{index + 1}</span>{field}</li>)}</ol><label className="mt-6 flex gap-3 rounded-xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I confirm this draft does not authorize a subscription, payment, reward, token, NFT, access entitlement, card, customer record, or provider action.</label><button type="button" onClick={copyReadinessNote} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-sm font-black text-[#071426]"><Copy className="h-4 w-4" />Copy membership readiness note</button></article><aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7"><ShieldCheck className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">WHAT THIS ROUTE DOES NOT DO</p><div className="mt-5 space-y-4 text-sm leading-7 text-[#D6E2EE]"><p>It does not quote or charge a membership amount, create a waitlist, send an onboarding message, reserve a card, grant Discord or council access, calculate rewards, allocate $LONDC, or distribute Zakat.</p><p>It does not open Stripe, a payment provider, a wallet, a blockchain network, a token contract, an NFT marketplace, a bank, or a lending/credit product.</p><p>For any future paid or tokenized program, the exact customer consequence, legal/financial review, support terms, provider state, rollback condition, and explicit owner confirmation remain required.</p></div></aside></div></section>
  </main>;
}
