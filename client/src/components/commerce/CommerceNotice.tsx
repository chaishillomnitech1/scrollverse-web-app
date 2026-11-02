import { ShieldAlert } from "lucide-react";

const ITEMS: Array<[string, string]> = [
  ["Original work", "Everything offered here is original ScrollVerse work."],
  ["Voluntary purchase", "Purchases are optional and made of your own free will."],
  ["Delivery", "Delivery terms are confirmed at checkout; digital items are delivered to the email or wallet you provide."],
  ["Refunds", "Refund terms are confirmed at checkout; on-chain transfers are final once confirmed."],
  ["Payment rails", "Card (USD) via Stripe, or wallet (MATIC) on Polygon."],
  ["Proof / receipt", "Keep your Stripe receipt or transaction hash as proof of purchase."],
];

export function CommerceNotice({ className = "" }: { className?: string }) {
  return (
    <aside className={`rounded-3xl border border-amber-300/25 bg-amber-300/[.045] p-6 ${className}`} aria-labelledby="commerce-notice-title">
      <h2 id="commerce-notice-title" className="text-xl font-black text-amber-100">Sovereign Commerce Notice</h2>
      <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
        {ITEMS.map(([label, text]) => (
          <li key={label}><span className="font-bold text-white">{label}:</span> {text}</li>
        ))}
      </ul>
      <p className="mt-4 flex items-start gap-2 text-sm font-bold text-red-200">
        <ShieldAlert className="mt-1 h-4 w-4 shrink-0" />
        Never share your seed phrase or private keys with anyone. We will never ask for them.
      </p>
    </aside>
  );
}

export default CommerceNotice;
