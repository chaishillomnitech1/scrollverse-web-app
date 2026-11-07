import { CommerceNotice } from "@/components/commerce/CommerceNotice";
import { ExchangeButtons } from "@/components/commerce/ExchangeButtons";

export default function Mother10OriginDoesntMatter() {
  return (
    <main className="min-h-screen bg-[#050B1A] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="container py-16 md:py-24">
        <p className="font-mono text-xs tracking-[.22em] text-amber-200">MOTHER-10</p>
        <h1 className="mt-4 text-5xl font-black leading-[.95] md:text-7xl">Origin doesn't matter.</h1>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <CommerceNotice />
          <ExchangeButtons />
        </div>
      </section>
    </main>
  );
}
