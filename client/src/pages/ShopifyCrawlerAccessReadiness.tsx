import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { ClipboardCheck, DatabaseZap, Eye, Gauge, LockKeyhole, ShieldCheck } from "lucide-react";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { PortalTrustLens } from "@/components/PortalTrustLens";

const allowedFieldOptions = ["Public storefront page text", "Public product metadata", "Public collection metadata", "Public policy text", "Public accessibility labels"] as const;

export default function ShopifyCrawlerAccessReadiness() {
  useSovereignHeartbeat({ page: "shopify-crawler-access-readiness" });
  const [target, setTarget] = useState("scrollverse-dev.myshopify.com");
  const [purpose, setPurpose] = useState("Verify a named public release surface after owner release");
  const [allowedFields, setAllowedFields] = useState<string[]>([]);
  const [retention, setRetention] = useState("No external request; local readiness record only");
  const [rateLimit, setRateLimit] = useState("No request scheduled");
  const [reviewRule, setReviewRule] = useState("Owner review before any exact external request");
  const [stopCondition, setStopCondition] = useState("Stop if target, scope, rights, privacy, or release state is unclear");
  const [privacy, setPrivacy] = useState("Never collect customer, account, checkout, payment, order, signature, or credential data");
  const [acknowledged, setAcknowledged] = useState(false);

  const requestRecord = useMemo(() => [
    "SCROLLVERSE SHOPIFY CRAWLER-ACCESS — SCOPED REQUEST READINESS",
    "",
    `Target: ${target || "[name exact public target]"}`,
    `Purpose: ${purpose || "[name one purpose]"}`,
    `Allowed fields: ${allowedFields.length ? allowedFields.join("; ") : "[select public fields only]"}`,
    `Retention: ${retention || "[define retention]"}`,
    `Rate limit: ${rateLimit || "[define rate limit]"}`,
    `Review rule: ${reviewRule || "[define review]"}`,
    `Stop condition: ${stopCondition || "[define stop condition]"}`,
    `Privacy boundary: ${privacy || "[define privacy boundary]"}`,
    "",
    "Owner-validated capability context: Shopify crawler-access entries are reported active and time-bounded. Signature, signature-input, and signature-agent values are deliberately excluded from this record.",
    "Exact action gate: no request may run until the public target, purpose, allowed fields, retention, rate, owner review, stop condition, privacy scope, current Shopify release state, and exact current approval are all recorded.",
    "Boundary: this is a browser-local readiness record. It does not send a crawler request, copy credentials, access a store, bypass a password, read customer or account data, create a product, activate checkout, accept payment, or change any Shopify setting.",
  ].join("\n"), [allowedFields, privacy, purpose, rateLimit, retention, reviewRule, stopCondition, target]);

  const toggleField = (field: string) => setAllowedFields((current) => current.includes(field) ? current.filter((item) => item !== field) : [...current, field]);
  const copyRecord = async () => {
    if (!acknowledged) {
      toast.error("Acknowledge the no-request boundary before copying this readiness record.");
      return;
    }
    try {
      await navigator.clipboard.writeText(requestRecord);
      toast.success("Scoped crawler-readiness record copied. No external request was issued.");
    } catch {
      toast.error("Copy is unavailable in this browser. You can select the record manually.");
    }
  };

  return <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3"><Link href="/shopify-staged-launch-guidance" className="text-sm font-black text-[#D6C4FF] transition hover:text-white">← Shopify staged launch guidance</Link><Link href="/financial-highways" className="rounded-lg border border-[#00FF88]/40 px-3 py-2 text-xs font-black text-[#B5F7CC]">Financial Highways</Link></div>
      <header className="mt-8 rounded-[2rem] border border-[#00D4FF]/30 p-8 sm:p-10" style={{ background: "radial-gradient(circle at 8% 12%, rgba(0,212,255,.16), transparent 32%), radial-gradient(circle at 92% 78%, rgba(185,140,255,.14), transparent 34%), #071124" }}>
        <p className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">SHOPIFY CRAWLER-ACCESS · SCOPED REQUEST READINESS · CREDENTIAL-SAFE</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">Prepare a narrow public-source request before any request exists.</h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">Owner-provided account evidence shows active, time-bounded crawler-access capability for the development storefront. This route makes the operational boundary explicit: identify the precise public target and reason first, preserve privacy, and never place crawler signatures, account data, or customer data in the portal.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-4"><div className="rounded-xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#00D4FF]">active</div><p className="mt-1 text-xs text-[#D6E2EE]">owner-reported access evidence</p></div><div className="rounded-xl border border-[#00FF88]/25 bg-[#00FF88]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#00FF88]">public</div><p className="mt-1 text-xs text-[#D6E2EE]">fields only</p></div><div className="rounded-xl border border-[#FFB800]/25 bg-[#FFB800]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#FFCC4D]">0</div><p className="mt-1 text-xs text-[#D6E2EE]">requests issued</p></div><div className="rounded-xl border border-[#FF6B9A]/25 bg-[#FF6B9A]/[.08] p-4"><div className="font-mono text-2xl font-black text-[#FF9EB9]">local</div><p className="mt-1 text-xs text-[#D6E2EE]">record only</p></div></div>
      </header>
      <PortalTrustLens lane="Shopify crawler-access readiness" source="Owner-validated Shopify crawler-access screenshots and the protected Shopify store-access evidence record." readiness="A scoped browser-local record is available now. A real request requires an exact target, limited public fields, retention and rate rules, review, stop condition, privacy scope, public release state, and current owner approval." boundary="This page never reads, copies, stores, exposes, or uses signature values. It does not send a request, access a store, bypass a password, read account/customer data, or modify Shopify." />
      <section className="mt-8 grid gap-6 lg:grid-cols-[1.06fr_.94fr]">
        <article className="rounded-[2rem] border border-[#B98CFF]/35 bg-[#B98CFF]/[.05] p-7"><ClipboardCheck className="h-8 w-8 text-[#D6C4FF]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#D6C4FF]">LOCAL SCOPED REQUEST RECORD</p><h2 className="mt-3 text-3xl font-black">Limit the request before you ever make one.</h2>
          <label className="mt-6 block text-xs font-mono text-[#B8C7D6]" htmlFor="crawler-target">Exact public target</label><input id="crawler-target" value={target} onChange={(event) => setTarget(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="crawler-purpose">One purpose</label><input id="crawler-purpose" value={purpose} onChange={(event) => setPurpose(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <p className="mt-5 text-xs font-mono text-[#B8C7D6]">Allowed public fields only</p><div className="mt-2 grid gap-2 sm:grid-cols-2">{allowedFieldOptions.map((field) => <label key={field} className="flex gap-2 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-[#D6E2EE]"><input type="checkbox" checked={allowedFields.includes(field)} onChange={() => toggleField(field)} className="mt-0.5 h-4 w-4 accent-[#00D4FF]" />{field}</label>)}</div>
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="crawler-retention">Retention rule</label><input id="crawler-retention" value={retention} onChange={(event) => setRetention(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="crawler-rate">Rate limit</label><input id="crawler-rate" value={rateLimit} onChange={(event) => setRateLimit(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="crawler-review">Review rule</label><input id="crawler-review" value={reviewRule} onChange={(event) => setReviewRule(event.target.value)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="crawler-stop">Stop condition</label><textarea id="crawler-stop" value={stopCondition} onChange={(event) => setStopCondition(event.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 block text-xs font-mono text-[#B8C7D6]" htmlFor="crawler-privacy">Privacy boundary</label><textarea id="crawler-privacy" value={privacy} onChange={(event) => setPrivacy(event.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
          <label className="mt-5 flex gap-3 rounded-xl border border-[#FFCC4D]/30 bg-[#FFCC4D]/[.06] p-4 text-sm leading-6 text-[#FFDEA0]"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 accent-[#FFCC4D]" />I confirm this is not a request to use a signature, crawl Shopify, access a private or password-protected surface, or collect any customer, account, payment, order, or credential data.</label>
          <button type="button" onClick={copyRecord} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-sm font-black text-[#071426]"><LockKeyhole className="h-4 w-4" />Copy scoped readiness record</button>
        </article>
        <aside className="rounded-[2rem] border border-[#00FF88]/35 bg-[#00FF88]/[.05] p-7"><Eye className="h-8 w-8 text-[#B5F7CC]" /><p className="mt-5 text-xs font-mono tracking-[.16em] text-[#B5F7CC]">REQUEST DISCIPLINE</p><h2 className="mt-3 text-3xl font-black">Public target. Minimal data. Visible stop rule.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Crawler access supports a future, narrow external request—not blanket store scanning. The route prohibits copying signatures into chat, source code, client storage, logs, screenshots, or public packets. A password-protected or non-public target requires a separate exact discussion and remains unavailable here.</p><div className="mt-6 space-y-3"><div className="rounded-xl border border-[#00D4FF]/30 bg-black/20 p-4"><DatabaseZap className="h-5 w-5 text-[#9DEBFF]" /><p className="mt-2 text-sm font-black text-[#9DEBFF]">Only public release verification</p><p className="mt-1 text-xs leading-6 text-[#D6E2EE]">Use a future scoped request to verify an already released public page, not to discover private store data.</p></div><div className="rounded-xl border border-[#FFCC4D]/30 bg-black/20 p-4"><Gauge className="h-5 w-5 text-[#FFDEA0]" /><p className="mt-2 text-sm font-black text-[#FFDEA0]">Stop on ambiguity</p><p className="mt-1 text-xs leading-6 text-[#D6E2EE]">If rights, privacy, target, or release state is unclear, no request proceeds.</p></div><Link href="/shopify-staged-launch-guidance" className="block rounded-xl border border-[#B98CFF]/35 bg-black/20 p-4 text-sm font-black text-[#D6C4FF]">Return to item-level Shopify release packets →</Link><Link href="/activation-register" className="block rounded-xl border border-[#FF6B9A]/35 bg-black/20 p-4 text-sm font-black text-[#FF9EB9]">Inspect exact action gates →</Link></div></aside>
      </section>
    </section>
  </main>;
}
