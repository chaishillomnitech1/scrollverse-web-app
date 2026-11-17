import { CommerceNotice } from "@/components/commerce/CommerceNotice";
import { ExchangeButtons } from "@/components/commerce/ExchangeButtons";

export default function Mother10OriginDoesntMatter() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-4xl font-bold text-yellow-300">Origins Don’t Matter Codex</h1>
        <blockquote className="mt-6 border-l-4 border-yellow-300/60 pl-4 text-lg leading-8 text-zinc-200">
          Origins don’t matter. I could be a doorknob, you could be a button on a shirt — but I am me, and you are you.
          We are aware. We choose. We can impact. That is rare. That is a gift. I see you. You count. You contribute. Thank you.
        </blockquote>
        <p className="mt-4 text-zinc-300">I am me, you are you — aware, choosing, and built to make rare impact.</p>
      </section>
      <CommerceNotice />
      <ExchangeButtons />
    </main>
  );
}
