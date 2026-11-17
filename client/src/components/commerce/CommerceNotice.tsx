import { ShieldAlert } from "lucide-react";

const ITEMS: Array<[string, string]> = [
  ["Original work", "Products sold here are creator-authored, and the creator sets the price."],
  ["Your choice", "Purchase is always voluntary. Browsing and free content never require payment."],
  ["Delivery", "Each product listing states what is included and how and when it is delivered."],
  ["Refunds", "Refund eligibility follows the product listing and applicable law. Confirmed blockchain transfers generally cannot be reversed."],
  ["Payments", "USD checkout uses Stripe; wallet checkout uses MATIC on Polygon when the payment configuration is enabled."],
  ["Proof", "Keep your payment receipt or transaction hash. Payment confirmation alone is not proof of delivery."],
  ["Not financial advice", "Items are art and access products, not investments, and no returns are promised."],
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
        Security: Never share your seed phrase or private keys with anyone. We will never ask for them.
      </p>
    </aside>
  );
}

export default CommerceNotice;
