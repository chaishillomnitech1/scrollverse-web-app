import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, ClipboardCopy, CreditCard, LockKeyhole, PackageCheck, Store } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type PacketPath = "stripe" | "shopify-copy";

const PACKETS: Record<PacketPath, {
  label: string;
  state: string;
  accent: string;
  title: string;
  detail: string;
  current: string;
  fields: string[];
  gate: string;
}> = {
  stripe: {
    label: "CURRENT PORTAL STRIPE PATH",
    state: "requires exact owner release",
    accent: "#00D4FF",
    title: "Stripe offer packet",
    detail: "Prepare one item-level record for the current portal’s configured payment capability without creating a checkout, price, payment link, payout, or customer charge.",
    current: "A configured capability is not a released offer. The exact product and visitor consequence remain unset.",
    fields: ["Item identifier and version", "Source, creator, date, rights, and contributors", "Accessible public description and format", "Price, currency, tax basis, and delivery definition", "Refund/cancellation and product-specific support path", "Exact provider destination, owner release, and correction/rollback condition"],
    gate: "Before any Stripe action, confirm the named item, price/currency, payment destination, customer consequence, payout recipient, provider-visible state, and rollback condition.",
  },
  "shopify-copy": {
    label: "SEPARATE SHOPIFY STOREFRONT-COPY PATH",
    state: "release-ready template only",
    accent: "#B98CFF",
    title: "Shopify storefront-copy packet",
    detail: "Prepare a separate storefront-copy item packet without binding Shopify to this Stripe-configured portal or changing any Shopify setting.",
    current: "The owner-supplied Shopify address and readiness records are source context. A separate storefront-copy still requires its own deployment and provider verification.",
    fields: ["Specific item, collection, and public storefront-copy destination", "Source/version, rights, contributor, and accessible media records", "Inventory or digital-delivery scope and fulfillment owner", "Price/currency, tax, market, shipping, duty, return, and eligibility scope", "Customer support/escalation path and public policy destination", "Owner release, provider-visible result, publication timestamp, and correction route"],
    gate: "Before any Shopify action, confirm the separate store, item, collection, product state, market, customer effect, policy path, and rollback condition.",
  },
};

export default function PaymentLaunchPackets() {
  useSovereignHeartbeat({ page: "payment-launch-packets" });
  const [path, setPath] = useState<PacketPath>("stripe");
  const [ownerNote, setOwnerNote] = useState("");
  const packet = PACKETS[path];
  const draft = useMemo(() => [
    "SCROLLVERSE PAYMENT LAUNCH PACKET · BROWSER-LOCAL DRAFT",
    `Path: ${packet.title}`,
    `State: ${packet.state}`,
    "",
    "Required item-level record:",
    ...packet.fields.map((field, index) => `${index + 1}. ${field}: [unfilled]`),
    "",
    `Exact action gate: ${packet.gate}`,
    `Owner note: ${ownerNote || "[unfilled]"}`,
    "",
    "Boundary: This draft does not create checkout, a payment link, a product, price, inventory, transfer, payout, token, provider setting, or external submission.",
  ].join("\n"), [ownerNote, packet]);

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      toast.success("Browser-local launch packet copied. No provider action occurred.");
    } catch {
      toast.error("Copy is unavailable in this browser. The launch packet remains visible here.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-[#00D4FF]/25 bg-[radial-gradient(circle_at_82%_12%,rgba(0,212,255,.15),transparent_27%),radial-gradient(circle_at_12%_82%,rgba(185,140,255,.15),transparent_30%),#050B1A]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
        <div className="container relative py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/payment-options" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← RETURN TO PAYMENT OPTIONS</Link><span className="rounded-full border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">LOCAL PACKETS · NO PROVIDER ACTION</span></div>
          <div className="mt-12 grid gap-8 xl:grid-cols-[1.18fr_.82fr] xl:items-end">
            <div><p className="text-xs font-mono tracking-[.22em] text-[#9DEBFF]">SCROLLVERSE · ACTION-SPECIFIC PAYMENT PREPARATION</p><h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Prepare the exact offer <span className="text-[#B98CFF]">before</span> any checkout exists.</h1><p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Choose the current portal Stripe path or a separate Shopify storefront-copy path. Each produces a browser-local release packet for one future action, not a generic permission to charge, publish, or configure a provider.</p></div>
            <aside className="rounded-[2rem] border border-[#00D4FF]/35 bg-[linear-gradient(145deg,rgba(0,212,255,.13),rgba(7,20,38,.96)_58%)] p-7"><LockKeyhole className="h-9 w-9 text-[#9DEBFF]" /><p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#9DEBFF]">FAIL-CLOSED RELEASE CONTROL</p><p className="mt-3 text-2xl font-black leading-tight">A packet records what must be confirmed; it does not trigger a provider operation.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">No accounts, customer data, payment information, provider configuration, item state, or financial record is read or written from this page.</p></aside>
          </div>
        </div>
      </section>

      <section className="container py-10"><PortalTrustLens lane="Action-Specific Payment Launch Packets" source="Current portal Stripe configuration context, Payment Options Map, Shopify storefront-copy readiness records, and item-level release-record standard." readiness="Two browser-local packet templates are available. Both require a completed item-level record and one exact current owner confirmation before any provider-side step." boundary="This route does not create checkout, a payment link, a product, price, inventory, transfer, payout, token, provider setting, customer communication, or external submission." /></section>

      <section className="container py-4"><div className="grid gap-4 lg:grid-cols-2">{(Object.entries(PACKETS) as [PacketPath, typeof PACKETS[PacketPath]][]).map(([key, candidate]) => <button key={key} type="button" onClick={() => setPath(key)} className="rounded-[2rem] border p-7 text-left transition" style={{ borderColor: path === key ? candidate.accent : "rgba(255,255,255,.14)", background: path === key ? `${candidate.accent}12` : "rgba(7,20,38,.75)" }}><p className="text-[10px] font-mono tracking-[.15em]" style={{ color: candidate.accent }}>{candidate.label}</p><h2 className="mt-3 text-2xl font-black">{candidate.title}</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{candidate.detail}</p><span className="mt-5 inline-flex rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: `${candidate.accent}70`, color: candidate.accent }}>{candidate.state.toUpperCase()}</span></button>)}</div></section>

      <section className="container py-10"><div className="grid gap-6 xl:grid-cols-[1.03fr_.97fr]"><article className="rounded-[2rem] border p-7 sm:p-10" style={{ borderColor: `${packet.accent}55`, background: `${packet.accent}08` }}><CreditCard className="h-8 w-8" style={{ color: packet.accent }} /><p className="mt-5 text-xs font-mono tracking-[.16em]" style={{ color: packet.accent }}>{packet.label}</p><h2 className="mt-3 text-3xl font-black">{packet.title}</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">{packet.current}</p><div className="mt-7 space-y-3">{packet.fields.map((field, index) => <div key={field} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"><span className="font-mono text-sm" style={{ color: packet.accent }}>{String(index + 1).padStart(2, "0")}</span><p className="text-sm leading-6 text-[#D6E2EE]">{field}</p></div>)}</div><div className="mt-7 rounded-2xl border border-[#FFCC4D]/35 bg-[#FFCC4D]/[.07] p-5"><PackageCheck className="h-6 w-6 text-[#FFDEA0]" /><p className="mt-3 text-sm leading-7 text-[#FFEEBA]">{packet.gate}</p></div></article>
        <aside className="rounded-[2rem] border border-[#B98CFF]/40 bg-[#071426] p-7 sm:p-10"><p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">COPYABLE OWNER DECISION DRAFT</p><h2 className="mt-3 text-3xl font-black">Keep the missing fields visible.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">An owner note may clarify a future packet. It remains only in this browser until copied.</p><label className="mt-7 block text-xs font-mono tracking-[.14em] text-[#DCC8FF]">OWNER NOTE <textarea value={ownerNote} onChange={(event) => setOwnerNote(event.target.value)} placeholder="Example: planned item scope or an unresolved release question" className="mt-3 min-h-28 w-full rounded-2xl border border-[#B98CFF]/35 bg-black/25 p-4 text-sm leading-6 text-white outline-none focus:border-[#B98CFF]" /></label><pre className="mt-6 max-h-[31rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-5 text-xs leading-6 text-[#D6E2EE]">{draft}</pre><button type="button" onClick={copyDraft} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-5 py-3 text-sm font-black text-[#071426]"><ClipboardCopy className="h-4 w-4" />Copy packet draft</button></aside></div></section>

      <section className="container py-4"><div className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7 sm:p-10"><BadgeCheck className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">CONTINUE WITH THE CONTROL RECORD</p><h2 className="mt-3 text-3xl font-black">Choose a preparation path, then request one exact action only when its record is complete.</h2><div className="mt-7 flex flex-wrap gap-3"><Link href="/shopify-staged-launch-guidance" className="inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#071426]">Shopify staged launch <ArrowRight className="h-4 w-4" /></Link><Link href="/catalog-production-desk" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Catalog production desk</Link><Link href="/activation-register" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Activation Register</Link><Link href="/payment-options" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Payment Options Map</Link></div></div></section>
    </main>
  );
}
