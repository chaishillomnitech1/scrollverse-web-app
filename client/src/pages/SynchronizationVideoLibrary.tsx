import { useState } from 'react';
import { Link } from 'wouter';
import { groupVideoReferences } from '@/lib/videoSourceHelpers';
import { SOURCE_BATCHES } from '@/lib/sourceCollections';

const references = [
  {url:'https://youtu.be/Mewlw7ZzCqA',source:'batch-14',line:186},
  {url:'https://youtu.be/-y_qej0SV9A',source:'batch-14',line:1705},
  {url:'https://youtu.be/hfoIE8bPGp8',source:'batch-14',line:1705},
  {url:'https://youtu.be/zCFnQeOk9Eo',source:'batch-14',line:2116},
  {url:'https://youtu.be/gLHqMp9QvrU',source:'batch-14',line:2410},
  {url:'https://youtu.be/W_4ckPnSgt4',source:'batch-14',line:2448},
  {url:'https://youtu.be/gLHqMp9QvrU',source:'batch-16',line:440},
  {url:'https://youtu.be/gLHqMp9QvrU',source:'batch-16',line:562},
  {url:'https://youtu.be/Mewlw7ZzCqA',source:'batch-16',line:562},
];
const records = groupVideoReferences(references);
const control = 'inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CEEDD]';

export default function SynchronizationVideoLibrary() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(records[0].id);
  const [loaded, setLoaded] = useState(false);
  const matching = records.filter(record => [record.id, record.url, ...record.sources.map(source => source.source)].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
  const pages = Math.max(1, Math.ceil(matching.length / 4));
  const currentPage = Math.min(page, pages);
  const visible = matching.slice((currentPage - 1) * 4, currentPage * 4);
  const selected = matching.find(record => record.id === selectedId) ?? matching[0];

  return <main className="min-h-screen bg-[#050D12] pb-24 text-white">
    <header className="border-b border-[#8CEEDD]/25 bg-[radial-gradient(ellipse_at_80%_0%,rgba(140,238,221,.15),transparent_65%)]">
      <div className="container py-12 md:py-16">
        <nav aria-label="Video library navigation" className="flex flex-wrap gap-4 text-[#8CEEDD]"><Link href="/" className={control}>← ScrollVerse</Link><Link href="/synchronizations" className={control}>Synchronization story →</Link><Link href="/source-collections" className={control}>Source collections →</Link></nav>
        <p className="mt-12 font-mono text-xs uppercase tracking-[.22em] text-[#8CEEDD]">The reference screen / Creator-selected links</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">Follow the signal.<br /><span className="text-[#FFD18A]">Keep the source.</span></h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#D1E4EA]">A dedicated screen for the YouTube references supplied with your ScrollVerse corpus. Select a record to follow its exact source trail, then choose when to load the player. Your interpretation and creative response stay yours.</p>
      </div>
    </header>
    <section className="container py-12">
      <label className="block max-w-xl text-sm font-semibold text-[#8CEEDD]">Search video references<input type="search" value={query} onChange={event=>{setQuery(event.target.value);setPage(1);setLoaded(false);}} placeholder="Find a video ID or source batch" className="mt-3 min-h-12 w-full rounded-xl border border-[#8CEEDD]/40 bg-[#0A1820] px-4 py-3 text-base text-white outline-none focus:ring-2 focus:ring-[#8CEEDD]" /></label>
      <p role="status" className="mt-5 font-mono text-xs text-[#A3C3CD]">{matching.length} external source records · {references.length} supplied occurrences</p>
      {selected ? <div className="mt-8 grid items-start gap-7 xl:grid-cols-[.8fr_1.2fr]">
        <div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">{visible.map((record,index)=><button type="button" key={record.id} aria-pressed={selected.id===record.id} onClick={()=>{setSelectedId(record.id);setLoaded(false);}} className="min-w-0 rounded-3xl border bg-[#0A1820] p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8CEEDD]" style={{borderColor:selected.id===record.id?'#8CEEDD':'#FFFFFF30'}}><p className="font-mono text-xs text-[#8CEEDD]">REFERENCE {String((currentPage-1)*4+index+1).padStart(2,'0')}</p><h2 className="mt-4 break-all text-xl font-black">YouTube · {record.id}</h2><p className="mt-3 text-sm text-[#A3C3CD]">{record.sources.length} source {record.sources.length===1?'passage':'passages'} · Select record →</p></button>)}</div>
        <nav aria-label="Video reference pagination" className="mt-6 flex flex-wrap items-center justify-between gap-3"><button className={`${control} disabled:opacity-40`} disabled={currentPage===1} onClick={()=>setPage(currentPage-1)}>Previous</button><span className="text-sm text-[#A3C3CD]">{currentPage} / {pages}</span><button className={`${control} disabled:opacity-40`} disabled={currentPage===pages} onClick={()=>setPage(currentPage+1)}>Next</button></nav></div>
        <article aria-labelledby="video-reference-title" className="min-w-0 rounded-3xl border border-[#FFD18A]/35 bg-[#0A1820] p-5 md:p-8">
          <p className="font-mono text-xs tracking-widest text-[#FFD18A]">EXTERNAL YOUTUBE REFERENCE</p><h2 id="video-reference-title" className="mt-4 break-all text-2xl font-black">YouTube · {selected.id}</h2>
          <div className="relative mt-6 flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-[#8CEEDD]/20 bg-[#061016]">
            {loaded ? <iframe key={selected.id} title={`Selected YouTube reference ${selected.id}`} src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=0&cc_load_policy=1`} className="absolute inset-0 h-full w-full" allow="encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="px-5 text-center"><p className="text-sm leading-7 text-[#D1E4EA]">The source stays on YouTube.<br />Load it when you are ready.</p><button type="button" className={`${control} mt-4 bg-[#8CEEDD] text-[#061016]`} onClick={()=>setLoaded(true)}>Load selected video</button></div>}
          </div>
          <div className="mt-5 flex flex-wrap gap-3"><a href={selected.url} target="_blank" rel="noopener noreferrer" className={`${control} text-[#FFD18A]`}>Watch on YouTube ↗</a>{loaded&&<button type="button" className={`${control} text-[#8CEEDD]`} onClick={()=>setLoaded(false)}>Unload player</button>}</div>
          <h3 className="mt-8 text-xs font-mono uppercase tracking-widest text-[#8CEEDD]">Source passages</h3><ul className="mt-4 space-y-3">{selected.sources.map(source=><li key={`${source.source}-${source.line}`} className="rounded-xl border border-white/15 px-4 py-3 text-sm leading-6 text-[#D1E4EA]">{SOURCE_BATCHES.find(batch=>batch.id===source.source)?.filename ?? source.source} · line {source.line}</li>)}</ul>
          <p className="mt-6 text-xs leading-6 text-[#A3C3CD]">Video IDs and citations are taken from the supplied text. Source-platform titles, channels and availability have not been independently retrieved; a reference is not presented as your original production. If embedding is unavailable, use the direct watch link.</p>
        </article>
      </div>:<div className="mt-8 rounded-3xl border border-dashed border-white/25 p-10"><h2 className="text-2xl font-black">No video references match</h2><button type="button" className={`${control} mt-5 text-[#8CEEDD]`} onClick={()=>{setQuery('');setPage(1);}}>Clear search</button></div>}
    </section>
  </main>;
}
