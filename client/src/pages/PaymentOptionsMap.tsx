import {
  BadgeDollarSign,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  LockKeyhole,
  ShoppingBag,
  WalletCards,
} from "lucide-react";
import { Link } from "wouter";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";
import { trpc } from "@/lib/trpc";

const SHOPIFY_STOREFRONT_URL = "https://scrollverse-dev.myshopify.com";

const RELEASE_LANES = [
  { label: "Chime", detail: "Public destination URL and public purpose label still required." },
  { label: "GoCard", detail: "Public destination URL and public purpose label still required." },
  { label: "SoFi", detail: "Public destination URL and public purpose label still required." },
  { label: "PayPal", detail: "Public destination URL and public purpose label still required." },
  { label: "Ouro", detail: "Public destination URL and public purpose label still required." },
] as const;

const ACTIVATION_SEQUENCE = [
  { number: "01", title: "Name the choice", detail: "State the specific item, collection, service, contribution purpose, or public support lane." },
  { number: "02", title: "Show the destination", detail: "Use the exact public provider or storefront URL—never a secret, account number, recovery code, or private credential." },
  { number: "03", title: "Complete the release record", detail: "For an offer, attach source, rights, contributors, accessibility, price, delivery, support, policy, and owner-release fields." },
  { number: "04", title: "Confirm the launch action", detail: "Before an irreversible provider or checkout activation, name the item, mechanism, destination, and consequence for owner confirmation." },
] as const;

export default function PaymentOptionsMap() {
  useSovereignHeartbeat({ page: "payment-options-map" });
  const { data: supportHighways } = trpc.supportHighways.getDestinations.useQuery();
  const configuredLabels = new Set(supportHighways?.destinations.map((destination) => destination.label) ?? []);
  const pendingLanes = RELEASE_LANES.filter((lane) => !configuredLabels.has(lane.label));

  return (
    <main className="min-h-screen bg-[#050B1A] pb-24 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="relative overflow-hidden border-b border-[#00FF88]/25 bg-[radial-gradient(circle_at_86%_12%,rgba(0,255,136,.16),transparent_27%),radial-gradient(circle_at_9%_78%,rgba(255,204,77,.17),transparent_30%),#050B1A]">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
        <div className="container relative py-12 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/direct-fan-catalog" className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">← RETURN TO DIRECT-TO-FAN CATALOG</Link>
            <span className="rounded-full border border-[#00FF88]/45 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">VISITOR CHOICE · PUBLIC DESTINATIONS ONLY</span>
          </div>
          <div className="mt-12 grid gap-8 xl:grid-cols-[1.16fr_.84fr] xl:items-end">
            <div>
              <p className="text-xs font-mono tracking-[.22em] text-[#B5F7CC]">SCROLLVERSE PAYMENT OPTIONS MAP</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[.9] md:text-7xl">Every visitor gets <span className="text-[#FFCC4D]">a clear choice.</span></h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#D6E2EE]">Explore free work, choose an owner-approved public destination, or wait for a specific offer to be released. This map never asks for private payment information and does not decide whether a visitor should transact—it makes the available pathways legible.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#public-destinations" className="rounded-xl bg-[#00FF88] px-5 py-3 text-sm font-black text-[#071426]">Open public destinations</a>
                <Link href="/catalog-production-desk" className="rounded-xl border border-[#FFCC4D]/45 bg-[#FFCC4D]/10 px-5 py-3 text-sm font-black text-[#FFDEA0]">Open release records</Link>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-[#00FF88]/40 bg-[linear-gradient(145deg,rgba(0,255,136,.13),rgba(7,20,38,.95)_58%)] p-7">
              <BadgeDollarSign className="h-9 w-9 text-[#B5F7CC]" />
              <p className="mt-5 text-[10px] font-mono tracking-[.16em] text-[#B5F7CC]">CHOICE WITHOUT PRESSURE</p>
              <p className="mt-3 text-2xl font-black leading-tight">Free paths stay open. Paid paths are exact, visible, and voluntary.</p>
              <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Protected configuration can enable a provider integration, but it is never a public payment option. A visitor option appears only when there is a safe public destination or a clearly labeled release-required lane.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <PortalTrustLens
          lane="Visitor-Choice Payment Options Map"
          source="Configured public Support Highways destinations, the owner-stated Cash App handle, verified public Shopify storefront address, Direct-to-Fan Catalog release records, and Shopify storefront-copy architecture."
          readiness="Free discovery is available now. Public destinations are shown when configured. The Shopify address resolves but visitor access is password protected at this recorded check. Item checkout, payout, token, and other provider activations remain tied to a specific release record and owner-confirmed action."
          boundary="This map does not process a payment, confirm a transfer, create a checkout, collect payment information, connect a wallet, set a price, publish a product, issue a token, or expose protected configuration."
        />
      </section>

      <section id="public-destinations" className="container scroll-mt-10 py-4">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-mono tracking-[.16em] text-[#B5F7CC]">PUBLIC DESTINATIONS</p>
            <h2 className="mt-2 text-3xl font-black">Open only the pathways that are ready to be public.</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#C9D8E7]">These buttons hand the visitor to the external provider or verified storefront address. Verify the provider destination before an independent transfer; ScrollVerse neither processes nor confirms that external transaction.</p>
          </div>
          <ExternalLink className="h-10 w-10 text-[#B5F7CC]" />
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-[2rem] border border-[#00FF88]/40 bg-[radial-gradient(circle_at_88%_14%,rgba(0,255,136,.14),transparent_24%),#071426] p-6">
            <p className="text-[10px] font-mono tracking-[.14em] text-[#B5F7CC]">AVAILABLE NOW · OWNER-STATED PUBLIC HANDLE</p>
            <h3 className="mt-3 text-2xl font-black">{supportHighways?.cashApp.label ?? "Cash App"}</h3>
            <p className="mt-3 text-lg font-black text-[#D6E2EE]">{supportHighways?.cashApp.handle ?? "$chaisthegreat28"}</p>
            <p className="mt-1 text-sm text-[#B5F7CC]">{supportHighways?.cashApp.context ?? "#chaisthegreat"}</p>
            <a href={supportHighways?.cashApp.url ?? "https://cash.app/$chaisthegreat28"} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00FF88] px-4 py-3 text-sm font-black text-[#071426]">Open public destination <ExternalLink className="h-4 w-4" /></a>
          </article>
          <article className="rounded-[2rem] border border-[#B98CFF]/40 bg-[radial-gradient(circle_at_88%_14%,rgba(185,140,255,.16),transparent_24%),#071426] p-6">
            <p className="text-[10px] font-mono tracking-[.14em] text-[#DCC8FF]">RESEARCH · VERIFIED ADDRESS · PASSWORD PROTECTED</p>
            <h3 className="mt-3 text-2xl font-black">scrollverse-dev</h3>
            <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The public Shopify address resolves to a password screen at this recorded check. It is a visitor-facing storefront address, not an open public catalog or checkout yet.</p>
            <a href={SHOPIFY_STOREFRONT_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-4 py-3 text-sm font-black text-[#071426]">Open Shopify address · password protected <ExternalLink className="h-4 w-4" /></a>
          </article>
          {supportHighways?.destinations.map((destination) => (
            <article key={destination.id} className="rounded-[2rem] border border-[#00D4FF]/40 bg-[radial-gradient(circle_at_88%_14%,rgba(0,212,255,.14),transparent_24%),#071426] p-6">
              <p className="text-[10px] font-mono tracking-[.14em] text-[#9DEBFF]">AVAILABLE NOW · CONFIGURED PUBLIC DESTINATION</p>
              <h3 className="mt-3 text-2xl font-black">{destination.label}</h3>
              <p className="mt-3 break-all text-sm leading-7 text-[#C9D8E7]">{destination.url}</p>
              <a href={destination.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00D4FF] px-4 py-3 text-sm font-black text-[#071426]">Open public destination <ExternalLink className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="rounded-[2rem] border border-[#B98CFF]/40 bg-[radial-gradient(circle_at_86%_14%,rgba(185,140,255,.15),transparent_24%),#071426] p-7 sm:p-10">
          <p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">RELEASE-REQUIRED DESTINATIONS</p>
          <h2 className="mt-3 text-3xl font-black">Named lanes become open choices as soon as a public destination is supplied.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#D6E2EE]">No visitor sees an invented account, guessed link, or protected secret. Each lane below needs only a public HTTPS destination and short purpose label to become a visible outbound choice on this map.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {pendingLanes.map((lane) => (
              <article key={lane.label} className="rounded-3xl border border-dashed border-[#DCC8FF]/40 bg-black/20 p-5">
                <LockKeyhole className="h-6 w-6 text-[#DCC8FF]" />
                <p className="mt-5 text-[10px] font-mono tracking-[.14em] text-[#DCC8FF]">REQUIRES OWNER RELEASE · PUBLIC DESTINATION</p>
                <h3 className="mt-2 text-xl font-black">{lane.label}</h3>
                <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{lane.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.018]">
        <div className="container py-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-mono tracking-[.16em] text-[#FFDEA0]">OFFER AND STOREFRONT ACTIVATION</p>
              <h2 className="mt-2 text-3xl font-black">A payment link is not an offer until the item record is complete.</h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-[#C9D8E7]">Current Stripe capability remains item-gated. Owner-supplied Shopify screenshots show a connected primary `scrollverse-dev.myshopify.com` setup foundation with visible Shopify Payments and Tap to Pay steps completed. The public storefront address now resolves, but visitor access is password protected at the time of verification. Customer-facing design, public collection/product URLs, and item releases still need to be completed. Neither route turns a catalog name, concept, or protected configuration into a customer charge by itself.</p>
            </div>
            <ShoppingBag className="h-10 w-10 text-[#FFDEA0]" />
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ACTIVATION_SEQUENCE.map((step) => (
              <article key={step.number} className="rounded-3xl border border-[#FFCC4D]/25 bg-[#071426]/80 p-5">
                <p className="text-xs font-mono text-[#FFDEA0]">{step.number}</p>
                <h3 className="mt-3 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{step.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={SHOPIFY_STOREFRONT_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#B98CFF] px-5 py-3 text-sm font-black text-[#071426]">Open Shopify address · password protected <ExternalLink className="h-4 w-4" /></a>
            <Link href="/direct-fan-catalog" className="rounded-xl bg-[#FFCC4D] px-5 py-3 text-sm font-black text-[#071426]">Direct-to-Fan Catalog</Link>
            <Link href="/catalog-production-desk" className="rounded-xl border border-[#00D4FF]/45 bg-[#00D4FF]/10 px-5 py-3 text-sm font-black text-[#9DEBFF]">Catalog Production Desk</Link>
            <Link href="/shopify-storefront-readiness" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Shopify Storefront Packet</Link>
            <Link href="/delivery-resilience" className="rounded-xl border border-[#B98CFF]/45 bg-[#B98CFF]/10 px-5 py-3 text-sm font-black text-[#DCC8FF]">Delivery Resilience</Link>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#C9D8E7]">If a public destination changes, becomes unavailable, or is labeled inaccurately, do not retry an old link. Return to the release record, correct the public URL and purpose label, then reopen the visitor route only after the destination check succeeds.</p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
          <div className="rounded-[2rem] border border-[#00D4FF]/35 bg-[radial-gradient(circle_at_86%_14%,rgba(0,212,255,.14),transparent_24%),#071426] p-7 sm:p-10">
            <WalletCards className="h-8 w-8 text-[#9DEBFF]" />
            <p className="mt-5 text-xs font-mono tracking-[.16em] text-[#9DEBFF]">FREE, DISPLAY, AND EXCHANGE PATHS</p>
            <h2 className="mt-3 text-3xl font-black">A visitor can choose more than a purchase.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#D6E2EE]">ScrollVerse keeps free readers, research, music discovery, visual artifacts, community exchange, and co-creation pathways visible alongside direct payment options. Choosing to view, learn, contribute an idea, or leave without a transaction remains a complete visitor choice.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/book-of-the-journey" className="rounded-xl bg-[#00D4FF] px-5 py-3 text-sm font-black text-[#071426]">Free Book of the Journey</Link>
              <Link href="/sovereign-contribution-exchange" className="rounded-xl border border-[#00FF88]/45 bg-[#00FF88]/10 px-5 py-3 text-sm font-black text-[#B5F7CC]">Contribution Exchange</Link>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-[#FFCC4D]/40 bg-[#FFCC4D]/[.07] p-7 sm:p-10">
            <CircleDollarSign className="h-8 w-8 text-[#FFDEA0]" />
            <p className="mt-5 text-xs font-mono tracking-[.16em] text-[#FFDEA0]">SECURE HANDOFF RULE</p>
            <h2 className="mt-3 text-2xl font-black">Public destinations only.</h2>
            <p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Never enter passwords, one-time codes, account numbers, card data, wallet seed phrases, private keys, recovery codes, or payout details into ScrollVerse. Use only the approved provider page reached through a visible public destination.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
