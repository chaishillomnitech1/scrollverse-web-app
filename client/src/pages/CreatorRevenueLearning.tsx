import { Link } from "wouter";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const revenueModels = [
  {
    number: "01",
    title: "Video partner and fan features",
    color: "#00D4FF",
    source: "YouTube for Creators · Partner Program",
    url: "https://www.youtube.com/creators/earn/youtube-partner-program/",
    lesson: "A platform can offer separate earning features such as ads, memberships, gifts, shopping, and partnerships. Eligibility, regional availability, policy standing, review, and individual feature terms determine whether a creator may use them.",
    record: "Track: channel status, eligible feature, source date, policy review, and what the creator actually controls.",
  },
  {
    number: "02",
    title: "Music rights and streaming royalties",
    color: "#00FF88",
    source: "Spotify for Artists · Royalties Guide",
    url: "https://artists.spotify.com/en/royalties-guide",
    lesson: "Streaming is a rights and contract pathway. Spotify explains that royalties move to rightsholders by streamshare rather than a universal fixed per-stream rate; agreements with distributors, labels, publishers, and collection organizations affect what reaches each creator.",
    record: "Track: recording owner, composition writers, agreed splits, distributor or label, registrations, statement period, and any recoupment terms.",
  },
  {
    number: "03",
    title: "Live community support",
    color: "#FFB800",
    source: "Twitch Help · Affiliate Program",
    url: "https://help.twitch.tv/s/article/joining-the-affiliate-program",
    lesson: "Live platforms may pair access thresholds and onboarding requirements with subscriptions, audience support features, and ads. Community value, consistent delivery, moderation, and platform eligibility are different variables.",
    record: "Track: live format, attendance pattern, moderation plan, eligibility milestone, subscriber promise, and platform payout terms.",
  },
  {
    number: "04",
    title: "Membership and direct support",
    color: "#B98CFF",
    source: "Patreon Help · Creator Fees Overview",
    url: "https://support.patreon.com/hc/en-us/articles/11111747095181-Creator-fees-overview",
    lesson: "Recurring memberships and one-time digital purchases are direct-support models, but fees, taxes, processing, currency conversion, and payout rules affect net proceeds. Provider pricing and policy pages can change.",
    record: "Track: offer promise, renewal cadence, platform fee, payment processing, payout method, tax handling, and fulfillment workload.",
  },
  {
    number: "05",
    title: "Qualified short-form performance",
    color: "#FF6B9A",
    source: "TikTok Help Center · Creator Rewards Program",
    url: "https://support.tiktok.com/en/business-and-creator/creator-rewards-program/creator-rewards-program",
    lesson: "A view count alone may not create payment eligibility. TikTok’s program describes qualified views, authentic-account and original-content requirements, regional availability, review, and program-specific thresholds.",
    record: "Track: content ownership, original-source record, account standing, eligible geography, qualified-view definition, and current program screen.",
  },
];

const learningSequence = [
  ["1", "Name the offer", "Describe the audience value, delivery format, timing, and what is not included."],
  ["2", "Map the rights", "Separate the recording, composition, image, brand, collaborator, and platform permissions that may apply."],
  ["3", "Read the provider terms", "Use the provider’s current official eligibility, policy, fee, and payout information rather than a third-party estimate."],
  ["4", "Keep a creator record", "Record the source date, agreement, statement period, and changes that affect the work."],
  ["5", "Choose a transparent route", "Use first-party pages to prepare the work before requesting a private review or following an external provider handoff."],
];

export default function CreatorRevenueLearning() {
  useSovereignHeartbeat({ page: "creator-revenue-learning" });

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-black text-[#00D4FF] transition-colors hover:text-white">← Return to ScrollVerse</Link>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#00D4FF]/30 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 10% 12%, rgba(0,212,255,0.18), transparent 28%), radial-gradient(circle at 88% 78%, rgba(0,255,136,0.14), transparent 30%), rgba(7,17,36,0.92)" }}>
          <div className="text-xs font-mono tracking-[0.22em] text-[#00D4FF]">FREE CREATOR REVENUE LEARNING SYSTEM · SOURCE CHECKED AUG 13 2026</div>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">Learn the route before you count the result.</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#C7D5E5]">A facts-first learning map for video, music, live, membership, and short-form creator revenue models. It explains the mechanics and source questions; it does not forecast income, connect an account, submit an application, or create a payout.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/creator-media-studio" className="rounded-xl bg-[#00D4FF] px-4 py-3 text-sm font-black text-[#04101F]">Prepare media records →</Link><Link href="/signalworks" className="rounded-xl border border-[#00FF88]/45 bg-[#00FF88]/10 px-4 py-3 text-sm font-black text-[#00FF88]">Open Signalworks →</Link><Link href="/revenue-ops" className="rounded-xl border border-[#FFB800]/45 bg-[#FFB800]/10 px-4 py-3 text-sm font-black text-[#FFB800]">Review revenue readiness →</Link></div>
        </div>

        <section className="mt-10"><div className="text-xs font-mono tracking-[0.18em] text-[#00FF88]">MODEL LIBRARY</div><h2 className="mt-3 text-3xl font-black">Five models, each with a different evidence trail.</h2><div className="mt-6 grid gap-5 lg:grid-cols-2">{revenueModels.map(model => <article key={model.number} className="rounded-3xl border p-6" style={{ borderColor: `${model.color}42`, background: `${model.color}08` }}><div className="flex items-center gap-3"><div className="font-mono text-sm" style={{ color: model.color }}>{model.number}</div><div className="text-xs font-mono tracking-[0.12em]" style={{ color: model.color }}>SOURCE-LABELED MODEL</div></div><h3 className="mt-4 text-2xl font-black">{model.title}</h3><p className="mt-4 text-sm leading-7 text-[#D7E3EE]">{model.lesson}</p><div className="mt-5 rounded-xl border border-white/10 bg-[#050B1A]/70 p-4"><div className="text-[10px] font-mono tracking-widest" style={{ color: model.color }}>WHAT TO RECORD</div><p className="mt-2 text-xs leading-6 text-[#B8C7D6]">{model.record}</p></div><a href={model.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-black" style={{ color: model.color }}>{model.source} ↗</a></article>)}</div></section>

        <section className="mt-10 rounded-3xl border border-[#B98CFF]/35 bg-[#B98CFF]/[0.07] p-6 sm:p-8"><div className="text-xs font-mono tracking-[0.18em] text-[#B98CFF]">THE CREATOR ROUTE</div><h2 className="mt-3 text-3xl font-black">A record is more useful than a promise.</h2><div className="mt-6 grid gap-4 md:grid-cols-5">{learningSequence.map(([number, title, text]) => <div key={number} className="rounded-2xl border border-white/10 bg-[#050B1A]/70 p-4"><div className="font-mono text-xs text-[#B98CFF]">{number}</div><h3 className="mt-3 font-black">{title}</h3><p className="mt-2 text-xs leading-6 text-[#B8C7D6]">{text}</p></div>)}</div></section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-3xl border border-[#00FF88]/30 bg-[#00FF88]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#00FF88]">FIRST-PARTY PREPARATION</div><h2 className="mt-3 text-2xl font-black">Use a practical pathway before an external handoff.</h2><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">ScrollVerse can help visitors organize a concept, media record, source note, or readiness review. External enrollment, payment, provider approval, distribution, contracting, and payout remain on the provider’s or creator’s own verified path.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/creator-workspace" className="text-sm font-black text-[#00FF88]">Creator Workspace →</Link><Link href="/creator-media-studio" className="text-sm font-black text-[#00D4FF]">Creator Media Studio →</Link><Link href="/protection-protocol" className="text-sm font-black text-[#FFB800]">Protection Protocol →</Link></div></div><div className="rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#FFB800]">LIMITS OF THIS PAGE</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">There is no RPM calculator, revenue guarantee, provider status check, tax advice, contract review, or financial recommendation here. Eligibility, fees, policies, and payouts may change; use the linked official source and qualified professional advice where appropriate.</p></div></section>
      </section>
    </main>
  );
}
