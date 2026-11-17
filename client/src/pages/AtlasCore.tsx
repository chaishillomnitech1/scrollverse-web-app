import { useState } from "react";
import { ArrowRight, GitBranch, Network, Search } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function AtlasCore() {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");

  const search = trpc.atlas.search.useQuery(
    { query: query.trim(), limit: 20 },
    { enabled: query.trim().length >= 2 },
  );
  const recent = trpc.atlas.listEntities.useQuery({ limit: 24, offset: 0 });
  const lineage = trpc.atlas.getLineage.useQuery(
    { slug: selectedSlug, direction: "both", maxDepth: 2 },
    { enabled: selectedSlug.length > 0 },
  );

  const entities = query.trim().length >= 2 ? search.data ?? [] : recent.data ?? [];

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/creator-atlas" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">← CREATOR ATLAS</Link>
          <span className="rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 px-3 py-1 text-[10px] font-mono tracking-[.15em] text-[#B5F7CC]">ATLAS CORE · GRAPH EXPLORER</span>
        </div>

        <header className="mt-12 max-w-4xl">
          <div className="flex items-center gap-3 text-[#9DEBFF]"><Network className="h-7 w-7" /><p className="text-xs font-mono tracking-[.22em]">SOURCE-AWARE INTELLIGENCE GRAPH</p></div>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">Follow the <span className="text-[#FFE09A]">connections.</span></h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#D6E2EE]">Explore published entities and their documented relationships. Trace how projects, repositories, conversations, artifacts, and discoveries connect while keeping provenance and operating state visible.</p>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[1.8rem] border border-[#00D4FF]/25 bg-[#071426] p-6">
            <label htmlFor="atlas-search" className="text-xs font-mono tracking-[.16em] text-[#9DEBFF]">DISCOVER PUBLISHED ENTITIES</label>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/15 bg-black/30 px-4">
              <Search className="h-4 w-4 shrink-0 text-[#9DEBFF]" />
              <input id="atlas-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects, artifacts, repositories…" className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-[#718096]" />
            </div>
            <div className="mt-5 flex items-center justify-between text-[10px] font-mono tracking-[.12em] text-[#AFC0CF]"><span>{query.trim().length >= 2 ? "SEARCH RESULTS" : "RECENTLY UPDATED"}</span><span>{entities.length} SHOWN</span></div>
            {search.isError || recent.isError ? (
              <div role="alert" className="mt-5 rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/[.07] p-4 text-sm leading-6 text-[#FFE09A]">
                <p className="font-bold">Atlas storage is not available to this page right now.</p>
                <p className="mt-2">The Atlas schema, graph explorer, and source-ingestion implementation are merged into the main branch. Database connectivity and migration state are separate deployment gates. Check the protected read-only preflight and database configuration before any migration action.</p>
                <p className="mt-2">Source-backed foundation records are intentionally imported as DRAFT and PRIVATE. They do not appear in this public explorer until an administrator reviews and publishes them.</p>
              </div>
            ) : null}
            {(search.isLoading || recent.isLoading) && <p className="mt-5 text-sm text-[#9DEBFF]">Loading Atlas records…</p>}
            <div className="mt-4 space-y-2">
              {entities.map(entity => (
                <button key={entity.id} type="button" onClick={() => setSelectedSlug(entity.slug)} className={`w-full rounded-xl border p-4 text-left transition ${selectedSlug === entity.slug ? "border-[#FFE09A]/70 bg-[#FFE09A]/[.08]" : "border-white/10 bg-black/20 hover:border-white/30"}`}>
                  <span className="flex items-center justify-between gap-3"><span className="font-bold">{entity.title}</span><ArrowRight className="h-4 w-4 shrink-0 text-[#9DEBFF]" /></span>
                  <span className="mt-2 block text-[10px] font-mono tracking-[.12em] text-[#9DEBFF]">{entity.kind} · {entity.provenance.replaceAll("_", " ")}</span>
                  {entity.summary ? <span className="mt-2 block text-sm leading-6 text-[#AFC0CF]">{entity.summary}</span> : null}
                </button>
              ))}
              {!search.isLoading && !recent.isLoading && !search.isError && !recent.isError && entities.length === 0 ? (
                <p className="rounded-xl border border-white/10 p-4 text-sm leading-6 text-[#AFC0CF]">
                  No PUBLISHED and PUBLIC entities are currently available. The curated foundation batch is designed to remain DRAFT and PRIVATE until human review; those records are not missing simply because they are not publicly listed.
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#B98CFF]/25 bg-[#071426] p-6">
            <div className="flex items-center gap-3 text-[#DCC8FF]"><GitBranch className="h-6 w-6" /><h2 className="text-xl font-black">Relationship & lineage trace</h2></div>
            {!selectedSlug ? <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-8 text-center"><Network className="mx-auto h-10 w-10 text-[#B98CFF]" /><p className="mt-4 text-lg font-bold">Select an entity to explore its neighborhood.</p><p className="mt-2 text-sm leading-6 text-[#AFC0CF]">Atlas will trace incoming and outgoing published relationships up to two hops.</p></div> : null}
            {lineage.isLoading ? <p className="mt-6 text-sm text-[#9DEBFF]">Traversing relationship graph…</p> : null}
            {lineage.error ? <p role="alert" className="mt-6 rounded-xl border border-[#FFB800]/30 p-4 text-sm text-[#FFE09A]">{lineage.error.message}</p> : null}
            {lineage.data ? <div className="mt-6">
              <div className="rounded-xl border border-[#FFE09A]/35 bg-[#FFE09A]/[.06] p-4"><p className="text-[10px] font-mono tracking-[.14em] text-[#FFE09A]">ROOT ENTITY</p><h3 className="mt-2 text-2xl font-black">{lineage.data.root.title}</h3><p className="mt-1 text-xs font-mono text-[#AFC0CF]">{lineage.data.root.slug} · {lineage.data.root.kind}</p></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-3xl font-black text-[#9DEBFF]">{lineage.data.nodes.length}</p><p className="mt-1 text-xs text-[#AFC0CF]">Connected entities</p></div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-3xl font-black text-[#DCC8FF]">{lineage.data.relationships.length}</p><p className="mt-1 text-xs text-[#AFC0CF]">Documented relationships</p></div>
              </div>
              <h4 className="mt-6 text-xs font-mono tracking-[.14em] text-[#9DEBFF]">DISCOVERED NODES</h4>
              <div className="mt-3 space-y-2">{lineage.data.nodes.map(node => <div key={node.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 p-3"><span><span className="block text-sm font-bold">{node.title}</span><span className="text-[10px] font-mono text-[#AFC0CF]">{node.slug}</span></span><span className="text-[9px] font-mono text-[#9DEBFF]">{node.kind}</span></div>)}</div>
              <h4 className="mt-6 text-xs font-mono tracking-[.14em] text-[#9DEBFF]">RELATIONSHIP EDGES</h4>
              <div className="mt-3 space-y-2">{lineage.data.relationships.map(edge => <div key={edge.id} className="rounded-lg border border-white/10 p-3 text-xs font-mono text-[#D6E2EE]">{lineage.data.nodes.find(node => node.id === edge.sourceEntityId)?.title ?? `#${edge.sourceEntityId}`} <span className="px-2 text-[#FFE09A]">—{edge.relationType}→</span> {lineage.data.nodes.find(node => node.id === edge.targetEntityId)?.title ?? `#${edge.targetEntityId}`}</div>)}</div>
              <p className="mt-5 text-[10px] leading-5 text-[#718096]">Traversal includes published public records only. A relationship is a documented connection, not an independent claim that the connected items are equivalent or scientifically validated.</p>
            </div> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
