import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Category = "Brand & Portfolio" | "Portals & Apps" | "Creator Media" | "Contract & Web3" | "AI & Research" | "Workflow & Learning";
type SortMode = "updated" | "name" | "language";

type Repository = {
  name: string;
  category: Category;
  language: string;
  license: string;
  updated: string;
};

const GITHUB_PROFILE = "https://github.com/chaishillomnitech1";
const GITHUB_INDEX = "https://github.com/chaishillomnitech1?tab=repositories";

const repositories: Repository[] = [
  { name: "XLVIIIblocks", category: "Brand & Portfolio", language: "No primary language listed", license: "MIT", updated: "2026-08-10" },
  { name: "Infinite-Nexus-ScrollVerse", category: "Portals & Apps", language: "JavaScript", license: "No license metadata", updated: "2026-08-06" },
  { name: "eternal-scrollverse", category: "Portals & Apps", language: "No primary language listed", license: "MIT", updated: "2026-08-03" },
  { name: "omnitech1-portal", category: "Portals & Apps", language: "TypeScript", license: "Apache-2.0", updated: "2026-08-03" },
  { name: "-Quantum-Financial-System-QFS-", category: "AI & Research", language: "Python", license: "MIT", updated: "2026-08-01" },
  { name: "scrollverse-platform", category: "Portals & Apps", language: "TypeScript", license: "No license metadata", updated: "2026-07-06" },
  { name: "scrollverse-first-knight-covenant", category: "Brand & Portfolio", language: "No primary language listed", license: "MIT", updated: "2026-07-04" },
  { name: "Expansion-", category: "Workflow & Learning", language: "JavaScript", license: "MIT", updated: "2026-07-02" },
  { name: "scrollsoul-music-sync", category: "Creator Media", language: "TypeScript", license: "MIT", updated: "2026-06-22" },
  { name: "sovereign-codex", category: "Brand & Portfolio", language: "JavaScript", license: "No license metadata", updated: "2026-06-07" },
  { name: "scrollverse-ai-legion", category: "AI & Research", language: "No primary language listed", license: "No license metadata", updated: "2026-06-07" },
  { name: "omniversal-kernel", category: "AI & Research", language: "JavaScript", license: "Apache-2.0", updated: "2026-06-03" },
  { name: "Unified-ScrollVerse-Eternal", category: "Workflow & Learning", language: "No primary language listed", license: "Apache-2.0", updated: "2026-06-02" },
  { name: "grcp-scrollsoul-expansion", category: "Workflow & Learning", language: "No primary language listed", license: "MIT", updated: "2026-06-02" },
  { name: "marsomni", category: "Portals & Apps", language: "No primary language listed", license: "No license metadata", updated: "2026-06-01" },
  { name: "VinelandEternal", category: "AI & Research", language: "HTML", license: "NOASSERTION", updated: "2026-04-28" },
  { name: "scrollsoul-nft-core", category: "Contract & Web3", language: "JavaScript", license: "MIT", updated: "2026-04-20" },
  { name: "ScrollSoul-JS-QFS", category: "Contract & Web3", language: "No primary language listed", license: "MIT", updated: "2026-04-20" },
  { name: "scrollverse-repo-1", category: "Workflow & Learning", language: "Python", license: "MIT", updated: "2026-04-20" },
  { name: "londyn-legacy-protocol", category: "Contract & Web3", language: "Solidity", license: "Apache-2.0", updated: "2026-04-12" },
  { name: "supreme-sovereign-infinity", category: "AI & Research", language: "Python", license: "MIT", updated: "2026-04-12" },
  { name: "introduction-to-github", category: "Workflow & Learning", language: "JavaScript", license: "NOASSERTION", updated: "2026-04-08" },
  { name: "vibranium-sovereignty-protocol", category: "Contract & Web3", language: "Solidity", license: "Apache-2.0", updated: "2026-04-08" },
  { name: "OmniBuilderZero", category: "Portals & Apps", language: "HTML", license: "MIT", updated: "2026-04-05" },
  { name: "QFS-Nexus-DistroKid-Mirror-DAO", category: "Creator Media", language: "Solidity", license: "MIT", updated: "2026-04-03" },
  { name: "nextjs-boilerplate", category: "Portals & Apps", language: "TypeScript", license: "No license metadata", updated: "2026-04-02" },
  { name: "ScrollSoul-InfiniteVault", category: "AI & Research", language: "Python", license: "Apache-2.0", updated: "2026-03-31" },
  { name: "Chaishillomnitech1", category: "Brand & Portfolio", language: "JavaScript", license: "NOASSERTION", updated: "2026-03-28" },
  { name: "MailchimpLegacyProtocol", category: "Creator Media", language: "JavaScript", license: "Apache-2.0", updated: "2026-03-15" },
  { name: "AkashicLogs-NFTMetaFramework", category: "Contract & Web3", language: "No primary language listed", license: "MIT", updated: "2026-03-15" },
  { name: "skills-hello-github-actions", category: "Workflow & Learning", language: "No primary language listed", license: "MIT", updated: "2026-03-15" },
  { name: "context-hub-skills", category: "Workflow & Learning", language: "No primary language listed", license: "MIT", updated: "2026-03-12" },
  { name: "lyrian-lion-codes", category: "AI & Research", language: "No primary language listed", license: "Apache-2.0", updated: "2026-03-11" },
  { name: "ScrollSoul-Omniversal-Harmonics", category: "AI & Research", language: "Python", license: "MIT", updated: "2026-02-09" },
  { name: "flamecoin-v4", category: "Contract & Web3", language: "No primary language listed", license: "MIT", updated: "2026-02-09" },
  { name: "legion-certification-portal", category: "Portals & Apps", language: "TypeScript", license: "MIT", updated: "2026-02-07" },
  { name: "Galactic-Frequency-Broadcaster-", category: "Workflow & Learning", language: "JavaScript", license: "MIT", updated: "2026-02-07" },
  { name: "scrollverse-omni-fleet-manifesto", category: "Brand & Portfolio", language: "Shell", license: "Apache-2.0", updated: "2026-02-07" },
  { name: "Quantum-Eternal-Archive", category: "Brand & Portfolio", language: "No primary language listed", license: "No license metadata", updated: "2026-02-05" },
  { name: "scrollverse-expansion-hub", category: "Brand & Portfolio", language: "No primary language listed", license: "NOASSERTION", updated: "2026-02-03" },
  { name: "scrollverse-empires", category: "Workflow & Learning", language: "Shell", license: "Apache-2.0", updated: "2026-02-03" },
  { name: "chais-hill-portfolio", category: "Brand & Portfolio", language: "No primary language listed", license: "No license metadata", updated: "2026-02-02" },
  { name: "scrollverse_commerce", category: "Creator Media", language: "TypeScript", license: "MIT", updated: "2026-02-02" },
  { name: "Pantheon-Protocol-TGLD-Smart-Contracts", category: "Contract & Web3", language: "JavaScript", license: "Apache-2.0", updated: "2026-02-02" },
  { name: "scrollverse-omni-fleet-manifesto.", category: "Brand & Portfolio", language: "No primary language listed", license: "Apache-2.0", updated: "2026-02-02" },
  { name: "scrollsoul-unity-support-", category: "Creator Media", language: "No primary language listed", license: "NOASSERTION", updated: "2026-02-01" },
  { name: "scrollverse-lynx-lifecycle", category: "Workflow & Learning", language: "No primary language listed", license: "Apache-2.0", updated: "2026-01-28" },
  { name: "ps-email-airdrop", category: "Creator Media", language: "TypeScript", license: "MIT", updated: "2026-01-23" },
  { name: "AkashicApp", category: "Portals & Apps", language: "JavaScript", license: "Apache-2.0", updated: "2026-01-10" },
  { name: "ChaisTheGreatApp-GodMode", category: "Portals & Apps", language: "JavaScript", license: "No license metadata", updated: "2026-01-05" },
  { name: "scrollverse-timeline-nullifier-omniimpact", category: "Brand & Portfolio", language: "No primary language listed", license: "No license metadata", updated: "2025-12-29" },
];

const categories: Array<Category | "All"> = ["All", "Brand & Portfolio", "Portals & Apps", "Creator Media", "Contract & Web3", "AI & Research", "Workflow & Learning"];
const categoryColors: Record<Category, string> = { "Brand & Portfolio": "#FFB800", "Portals & Apps": "#00D4FF", "Creator Media": "#00FF88", "Contract & Web3": "#B98CFF", "AI & Research": "#FF6B9A", "Workflow & Learning": "#8FA3B8" };

function readableDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export default function GitHubShowcase() {
  useSovereignHeartbeat({ page: "github-showcase" });
  const [category, setCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("updated");

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return repositories
      .filter(repository => (category === "All" || repository.category === category) && `${repository.name} ${repository.category} ${repository.language} ${repository.license}`.toLowerCase().includes(normalized))
      .sort((left, right) => sort === "updated" ? right.updated.localeCompare(left.updated) : sort === "name" ? left.name.localeCompare(right.name) : left.language.localeCompare(right.language) || left.name.localeCompare(right.name));
  }, [category, query, sort]);

  const categoryCount = (value: Category) => repositories.filter(repository => repository.category === value).length;

  const copyIndex = async () => {
    try {
      await navigator.clipboard.writeText(GITHUB_INDEX);
      toast.success("Public GitHub index copied.");
    } catch {
      toast.error("Could not copy the link. The public index is shown below.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-12 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-sm font-black text-[#00D4FF] transition-colors hover:text-white">← Return to ScrollVerse</Link><div className="flex flex-wrap gap-3"><Link href="/evidence-commons" className="rounded-lg border border-[#B98CFF]/35 px-3 py-2 text-xs font-black text-[#D6C4FF] transition hover:border-[#B98CFF]">Evidence Commons</Link><a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" className="rounded-lg border border-[#00D4FF]/35 px-3 py-2 text-xs font-black text-[#00D4FF] transition hover:border-[#00D4FF]">Open public profile ↗</a></div></div>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#00D4FF]/30 p-7 sm:p-10" style={{ background: "radial-gradient(circle at 10% 15%, rgba(0,212,255,0.18), transparent 29%), radial-gradient(circle at 92% 75%, rgba(185,140,255,0.16), transparent 31%), #071124" }}>
          <div className="text-xs font-mono tracking-[0.22em] text-[#00D4FF]">GITHUB REPOSITORY SHOWCASE · PUBLIC SNAPSHOT AUG 13 2026</div>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"><div><h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">A public code trail, organized for exploration.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-[#C7D5E5]">This first-party guide catalogs 51 repositories returned by the public GitHub inventory for <span className="font-bold text-white">chaishillomnitech1</span>. Browse a transparent snapshot by portfolio lens, primary-language metadata, and public source link—then inspect the original repository before drawing conclusions.</p></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 p-5"><div className="font-mono text-3xl font-black text-[#00D4FF]">51</div><div className="mt-1 text-xs font-bold text-[#D6E2EE]">public repositories returned</div></div><div className="rounded-2xl border border-[#B98CFF]/30 bg-[#B98CFF]/10 p-5"><div className="font-mono text-3xl font-black text-[#D6C4FF]">6</div><div className="mt-1 text-xs font-bold text-[#D6E2EE]">editorial browse lenses</div></div><button type="button" onClick={copyIndex} className="col-span-2 rounded-2xl border border-[#00FF88]/35 bg-[#00FF88]/10 px-5 py-4 text-left transition hover:border-[#00FF88] active:scale-[0.98]"><div className="text-xs font-mono tracking-[0.15em] text-[#00FF88]">PUBLIC SOURCE</div><div className="mt-1 text-sm font-black">Copy the GitHub repository index</div></button></div></div>
          <div className="mt-7 grid gap-3 text-xs sm:grid-cols-3"><div className="rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 p-3"><span className="font-mono text-[#00D4FF]">SOURCE</span><p className="mt-1 leading-5 text-[#D6E2EE]">GitHub’s public profile and repository API snapshot.</p></div><div className="rounded-xl border border-[#00FF88]/30 bg-[#00FF88]/10 p-3"><span className="font-mono text-[#00FF88]">CATALOG</span><p className="mt-1 leading-5 text-[#D6E2EE]">Browser-local filters organize names and publicly returned metadata.</p></div><div className="rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/10 p-3"><span className="font-mono text-[#FFB800]">LIMIT</span><p className="mt-1 leading-5 text-[#D6E2EE]">A public source is not deployment, audit, ownership, or commercial proof.</p></div></div>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{(categories.slice(1) as Category[]).map(item => <div key={item} className="rounded-2xl border p-4" style={{ borderColor: `${categoryColors[item]}45`, background: `${categoryColors[item]}08` }}><div className="text-2xl font-black" style={{ color: categoryColors[item] }}>{categoryCount(item)}</div><div className="mt-1 text-sm font-bold text-[#D6E2EE]">{item}</div><div className="mt-1 text-xs leading-5 text-[#8FA3B8]">Editorial browser label; inspect source content for technical scope.</div></div>)}</section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"><div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"><div className="flex flex-wrap gap-2" role="tablist" aria-label="Repository showcase categories">{categories.map(item => <button type="button" key={item} role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className="rounded-lg border px-3 py-2 text-xs font-black transition active:scale-[0.98]" style={{ borderColor: category === item ? "#00D4FF" : "rgba(255,255,255,0.14)", color: category === item ? "#00D4FF" : "#B8C7D6", background: category === item ? "rgba(0,212,255,0.12)" : "transparent" }}>{item}</button>)}</div><div className="flex flex-col gap-3 sm:flex-row"><label className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-[#050B1A] px-3 py-2 sm:w-72"><span className="font-mono text-[#00D4FF]">⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter name, language, license" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#71869A]" aria-label="Filter GitHub repositories" /></label><label className="rounded-xl border border-white/10 bg-[#050B1A] px-3 py-2 text-xs text-[#C7D5E5]"><span className="mr-2 font-mono text-[#8FA3B8]">SORT</span><select value={sort} onChange={event => setSort(event.target.value as SortMode)} className="bg-transparent font-black outline-none"><option className="bg-[#071124]" value="updated">Recently updated</option><option className="bg-[#071124]" value="name">Repository name</option><option className="bg-[#071124]" value="language">Primary language</option></select></label></div></div><p className="mt-4 text-xs text-[#8FA3B8]">{visible.length} of {repositories.length} captured public repositories shown. Filtering and sorting happen in this browser only; the source index may change after this August 13, 2026 snapshot.</p></section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map(repository => { const color = categoryColors[repository.category]; return <article key={repository.name} className="flex min-h-64 flex-col rounded-3xl border p-6 transition hover:-translate-y-0.5" style={{ borderColor: `${color}45`, background: `${color}07` }}><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] font-mono tracking-[0.15em]" style={{ color }}>{repository.category.toUpperCase()}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-mono text-[#AABBCB]">PUBLIC SOURCE</span></div><h2 className="mt-5 break-words text-2xl font-black leading-tight">{repository.name}</h2><div className="mt-5 grid gap-3 border-y border-white/10 py-4 text-xs"><div className="flex justify-between gap-3"><span className="font-mono text-[#8FA3B8]">PRIMARY LANGUAGE</span><span className="text-right font-bold text-[#D6E2EE]">{repository.language}</span></div><div className="flex justify-between gap-3"><span className="font-mono text-[#8FA3B8]">LICENSE</span><span className="text-right font-bold text-[#D6E2EE]">{repository.license}</span></div><div className="flex justify-between gap-3"><span className="font-mono text-[#8FA3B8]">UPDATED</span><span className="text-right font-bold text-[#D6E2EE]">{readableDate(repository.updated)}</span></div></div><div className="mt-auto pt-5"><a href={`${GITHUB_PROFILE}/${encodeURIComponent(repository.name)}`} target="_blank" rel="noreferrer" className="inline-flex rounded-lg border px-3 py-2 text-sm font-black transition hover:bg-white/5" style={{ borderColor: `${color}80`, color }}>Inspect public source ↗</a></div></article>; })}</section>

        {visible.length === 0 && <section className="mt-6 rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#FFB800]">NO CATALOG MATCH</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">Try a broader name, language, or license phrase; then return to the complete GitHub index. This page does not search GitHub live, access private repositories, or collect visitor data.</p></section>}

        <section className="mt-8 rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[0.05] p-7"><div className="text-xs font-mono tracking-[0.18em] text-[#FFB800]">INTERPRETATION BOUNDARY</div><p className="mt-3 max-w-5xl text-sm leading-7 text-[#D6E2EE]">This is a public-source directory, not an audit, legal title record, account-control verification, deployment ledger, payment system, investment representation, or active-service claim. Repository categories are editorial navigation labels based on names, public descriptions, and public metadata at capture. Visitors should inspect each original source, license, commit history, documentation, and any independently verifiable records before relying on it.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/public-reference-trail" className="rounded-lg border border-[#FFB800]/45 px-3 py-2 text-xs font-black text-[#FFCC4D] transition hover:border-[#FFB800]">Open Public Reference Trail →</Link><Link href="/knowledge-navigator" className="rounded-lg border border-[#00D4FF]/45 px-3 py-2 text-xs font-black text-[#00D4FF] transition hover:border-[#00D4FF]">Open Knowledge Navigator →</Link></div></section>
      </section>
    </main>
  );
}
