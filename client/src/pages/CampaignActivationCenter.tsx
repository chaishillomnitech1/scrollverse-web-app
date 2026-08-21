import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { ArrowUpRight, ClipboardCheck, Copy, ExternalLink, FolderGit2, Megaphone, Radio, Route, Send, ShieldCheck } from "lucide-react";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type CampaignState = "available now" | "research" | "requires owner release";

type Campaign = {
  id: string;
  title: string;
  state: CampaignState;
  sourceRepo: string;
  sourceUrl: string;
  sourceNote: string;
  audience: string;
  purpose: string;
  assetRoute: string;
  assetLabel: string;
  nextGate: string;
  tags: string[];
};

const CAMPAIGNS: Campaign[] = [
  {
    id: "SV-CAM-001",
    title: "ScrollVerse Creator Worlds",
    state: "available now",
    sourceRepo: "chais-hill-portfolio",
    sourceUrl: "https://github.com/chaishillomnitech1/chais-hill-portfolio",
    sourceNote: "First-party portfolio and execution blueprint source.",
    audience: "Visitors exploring the creator-owned ScrollVerse universe.",
    purpose: "Route visitors from the live portal into creator worlds, source records, learning, and release readiness.",
    assetRoute: "/campaign-asset-registry",
    assetLabel: "Campaign Asset Registry",
    nextGate: "Name a public destination and intended-use scope before public placement.",
    tags: ["portal", "creator", "discovery"],
  },
  {
    id: "SV-CAM-002",
    title: "Open Ark Studios Identity",
    state: "available now",
    sourceRepo: "chais-hill-portfolio",
    sourceUrl: "https://github.com/chaishillomnitech1/chais-hill-portfolio",
    sourceNote: "First-party portfolio source connected to the browser-local Origin Ark identity record.",
    audience: "Design, film, game, and creator collaborators.",
    purpose: "Introduce the Open Ark Seal, Auri concept, authenticity-frequency anchor, and creator studio pathways.",
    assetRoute: "/brand-identity-record",
    assetLabel: "Brand Identity Record",
    nextGate: "Confirm campaign channel, copy variant, and public placement decision.",
    tags: ["brand", "film", "game"],
  },
  {
    id: "SV-CAM-003",
    title: "Creator Technology + Archive",
    state: "research",
    sourceRepo: "scrollverse-expansion-hub",
    sourceUrl: "https://github.com/chaishillomnitech1/scrollverse-expansion-hub",
    sourceNote: "First-party repository description references creative technology, archive, and marketplace concepts; no campaign destination was found in this review.",
    audience: "Creators seeking a source-led technology and archive pathway.",
    purpose: "Connect the source archive, release preparation, evidence records, and creator learning routes.",
    assetRoute: "/show-the-work-knowledge-base",
    assetLabel: "Show-the-Work Knowledge Base",
    nextGate: "Provide an approved public destination and exact campaign message.",
    tags: ["archive", "technology", "learning"],
  },
  {
    id: "SV-CAM-004",
    title: "Music + Visual Story Intake",
    state: "requires owner release",
    sourceRepo: "ChaisTheGreatApp-GodMode",
    sourceUrl: "https://github.com/chaishillomnitech1/ChaisTheGreatApp-GodMode",
    sourceNote: "First-party repository documentation references music, visual, and IPFS-oriented concepts; it is not a release authorization or public-upload record.",
    audience: "Listeners and visual-storyworld visitors.",
    purpose: "Prepare source-led discovery for catalog, public-version episodes, and visual production records.",
    assetRoute: "/original-episode-slate",
    assetLabel: "Original Episode Slate",
    nextGate: "Supply approved master, contributor/use record, channel destination, and final release decision.",
    tags: ["music", "visual", "episodes"],
  },
  {
    id: "SV-CAM-005",
    title: "Creator Commerce Readiness",
    state: "requires owner release",
    sourceRepo: "scrollverse_commerce",
    sourceUrl: "https://github.com/chaishillomnitech1/scrollverse_commerce",
    sourceNote: "First-party repository exists; no verified campaign, product, inventory, or checkout launch record was treated as active.",
    audience: "Visitors who want to understand creator-controlled release readiness.",
    purpose: "Route visitors to campaign, activation, and first-party store readiness records.",
    assetRoute: "/first-party-sites-register",
    assetLabel: "First-Party Sites Register",
    nextGate: "Name the storefront destination, approved offer, inventory, and publish decision.",
    tags: ["commerce", "readiness", "store"],
  },
];

const stateStyles: Record<CampaignState, string> = {
  "available now": "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
  research: "border-cyan-400/35 bg-cyan-400/10 text-cyan-200",
  "requires owner release": "border-amber-400/35 bg-amber-400/10 text-amber-200",
};

function toExport(campaign: Campaign) {
  return {
    recordType: "ScrollVerse Campaign Activation Brief",
    campaign,
    operatingState: "browser-local campaign brief only",
    boundary: "No external post, advertising action, account change, public upload, payment, repository visibility change, or provider campaign launch occurs from this record.",
  };
}

export default function CampaignActivationCenter() {
  useSovereignHeartbeat({ page: "campaign-activation-center" });
  const [selectedId, setSelectedId] = useState(CAMPAIGNS[0].id);
  const [filter, setFilter] = useState<"all" | CampaignState>("all");
  const selected = CAMPAIGNS.find((campaign) => campaign.id === selectedId) ?? CAMPAIGNS[0];
  const filtered = useMemo(
    () => CAMPAIGNS.filter((campaign) => filter === "all" || campaign.state === filter),
    [filter],
  );

  const copy = async (text: string, message: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const exportRecord = () => {
    const blob = new Blob([JSON.stringify(toExport(selected), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${selected.id.toLowerCase()}-campaign-brief.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Campaign brief exported locally");
  };

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-10 text-white sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/25 bg-[radial-gradient(circle_at_10%_15%,rgba(0,212,255,.16),transparent_32%),radial-gradient(circle_at_88%_10%,rgba(255,184,0,.16),transparent_28%),#081225] p-7 sm:p-10">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(135deg,transparent,rgba(185,140,255,.1),transparent)]" />
          <div className="relative max-w-3xl">
            <p className="mb-3 font-mono text-xs tracking-[0.25em] text-cyan-300">SCROLLVERSE · CAMPAIGN ACTIVATION CENTER</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Show the work. Route the signal.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              A first-party, browser-local campaign brief system for the owner’s GitHub source materials, creator routes, and managed visual assets. Each brief is ready for review without claiming an external campaign is already live.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
              <span className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1 text-emerald-200">{CAMPAIGNS.filter((item) => item.state === "available now").length} ROUTES AVAILABLE NOW</span>
              <span className="rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3 py-1 text-cyan-200">{CAMPAIGNS.filter((item) => item.state === "research").length} SOURCE RESEARCH</span>
              <span className="rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1 text-amber-200">{CAMPAIGNS.filter((item) => item.state === "requires owner release").length} RELEASE GATES</span>
            </div>
          </div>
        </section>

        <PortalTrustLens
          lane="Campaign operating state"
          source="Owner-first-party GitHub repository descriptions and browser-local ScrollVerse route records"
          readiness="Browser-local briefs and asset routing available now"
          boundary="This page does not post, buy advertising, send outreach, change repository visibility, or activate a third-party campaign destination."
        />

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex flex-wrap gap-2">
              {(["all", "available now", "research", "requires owner release"] as const).map((state) => (
                <button
                  key={state}
                  onClick={() => setFilter(state)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${filter === state ? "bg-cyan-300 text-slate-950" : "border border-white/15 text-slate-300 hover:border-cyan-300/70"}`}
                >
                  {state.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {filtered.map((campaign) => (
                <button
                  key={campaign.id}
                  onClick={() => setSelectedId(campaign.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${selected.id === campaign.id ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-slate-950/35 hover:border-cyan-300/45"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-cyan-300">{campaign.id}</p>
                      <p className="mt-1 font-bold">{campaign.title}</p>
                    </div>
                    <span className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase ${stateStyles[campaign.state]}`}>{campaign.state}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-400">{campaign.purpose}</p>
                </button>
              ))}
            </div>
          </div>

          <article className="rounded-3xl border border-cyan-400/25 bg-[#081225] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] text-cyan-300">{selected.id} · CAMPAIGN BRIEF</p>
                <h2 className="mt-2 text-3xl font-black">{selected.title}</h2>
              </div>
              <span className={`rounded-full border px-3 py-2 text-xs font-bold uppercase ${stateStyles[selected.state]}`}>{selected.state}</span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs font-mono text-slate-500">AUDIENCE</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{selected.audience}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-xs font-mono text-slate-500">PURPOSE</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{selected.purpose}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500"><FolderGit2 className="h-4 w-4 text-cyan-300" /> FIRST-PARTY SOURCE</div>
              <p className="mt-2 font-semibold">{selected.sourceRepo}</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">{selected.sourceNote}</p>
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100">
                Open source repository <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-200"><ShieldCheck className="h-4 w-4" /> NEXT RELEASE GATE</div>
              <p className="mt-2 text-sm leading-6 text-amber-50">{selected.nextGate}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={selected.assetRoute} className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200">
                <Route className="h-4 w-4" /> Open {selected.assetLabel}
              </Link>
              <button onClick={() => copy(JSON.stringify(toExport(selected), null, 2), "Campaign brief copied locally")} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-300/70">
                <Copy className="h-4 w-4" /> Copy brief
              </button>
              <button onClick={exportRecord} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-300/70">
                <ClipboardCheck className="h-4 w-4" /> Export JSON
              </button>
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center gap-3"><Megaphone className="h-5 w-5 text-pink-300" /><h2 className="text-xl font-black">Campaign activation sequence</h2></div>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Select", "Choose a source-led campaign brief and managed asset route."],
              ["02", "Review", "Copy or export the local brief and add an intended-use scope."],
              ["03", "Name", "Provide the public destination, visibility, and campaign action."],
              ["04", "Release", "Confirm the exact post, provider, or campaign action separately."],
            ].map(([step, title, detail]) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                <p className="font-mono text-xs text-pink-300">{step}</p>
                <p className="mt-2 font-bold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-400"><Radio className="h-4 w-4 text-cyan-300" /> Browser-local campaign activation is available now. External launch begins only with a named destination and final owner release.</div>
        </section>

        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6 text-sm text-slate-400">
          <Link href="/campaign-asset-registry" className="inline-flex items-center gap-2 hover:text-cyan-200"><ArrowUpRight className="h-4 w-4" /> Campaign Asset Registry</Link>
          <Link href="/first-party-sites-register" className="inline-flex items-center gap-2 hover:text-cyan-200"><ArrowUpRight className="h-4 w-4" /> First-Party Sites Register</Link>
          <Link href="/three-lane-release-register" className="inline-flex items-center gap-2 hover:text-cyan-200"><ArrowUpRight className="h-4 w-4" /> Three-Lane Release Register</Link>
          <Link href="/route-integrity-index" className="inline-flex items-center gap-2 hover:text-cyan-200"><ArrowUpRight className="h-4 w-4" /> Route Integrity Index</Link>
        </div>
      </div>
    </main>
  );
}
