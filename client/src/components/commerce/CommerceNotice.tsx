export function CommerceNotice() {
  return (
    <section
      id="commerce-notice"
      aria-labelledby="commerce-notice-title"
      className="mx-auto my-6 max-w-4xl rounded-2xl border border-yellow-300/30 bg-black/40 p-6 text-sm text-zinc-200"
    >
      <h2 id="commerce-notice-title" className="mb-3 text-xl font-semibold text-yellow-300">
        Sovereign Commerce Notice
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li><strong>Original work.</strong> Products sold here are creator-authored, and the creator sets the price.</li>
        <li><strong>Your choice.</strong> Purchase is always voluntary. Browsing and free content never require payment.</li>
        <li><strong>Delivery.</strong> Each product listing states what is included and how and when it is delivered.</li>
        <li><strong>Refunds.</strong> Refund eligibility follows the product listing and applicable law. Confirmed blockchain transfers generally cannot be reversed.</li>
        <li><strong>Payments.</strong> USD checkout uses Stripe; wallet checkout uses MATIC on Polygon when the payment configuration is enabled.</li>
        <li><strong>Proof.</strong> Keep your payment receipt or transaction hash. Payment confirmation alone is not proof of delivery.</li>
        <li><strong>Security.</strong> Never share your seed phrase or private keys with anyone.</li>
        <li><strong>Not financial advice.</strong> Items are art and access products, not investments, and no returns are promised.</li>
      </ul>
    </section>
  );
}
