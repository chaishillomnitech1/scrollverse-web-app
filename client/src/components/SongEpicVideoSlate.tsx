import { useMemo, useState } from "react";
import { toast } from "sonner";

type Slate = {
  purpose: string;
  duration: string;
  visual: string;
  language: string;
  authorization: string;
};

const emptySlate: Slate = { purpose: "", duration: "", visual: "", language: "", authorization: "" };

export default function SongEpicVideoSlate() {
  const [song, setSong] = useState("");
  const [slate, setSlate] = useState<Slate>(emptySlate);
  const [saved, setSaved] = useState(false);
  const [referencePlan, setReferencePlan] = useState("");
  const update = (field: keyof Slate, value: string) => setSlate(current => ({ ...current, [field]: value }));
  const summary = useMemo(() => `Song: ${song || "Untitled local song"}\nPurpose and narrative: ${slate.purpose || "Not yet captured"}\nDuration and aspect ratio: ${slate.duration || "Not yet captured"}\nVisual style and references: ${slate.visual || "Not yet captured"}\nLanguage, voice, and narration: ${slate.language || "Not yet captured"}\nMusic-use authorization: ${slate.authorization || "Not yet confirmed"}\nReference-image plan: ${referencePlan || "Not yet captured"}`, [referencePlan, slate, song]);
  const save = () => { setSaved(true); toast.success("Local production brief saved in this browser only."); };

  return <section className="mt-8 rounded-3xl border border-[#00D4FF]/30 bg-[#00D4FF]/[.05] p-7" aria-labelledby="epic-video-slate-title">
    <div className="text-xs font-mono tracking-[.18em] text-[#00D4FF]">PER-SONG EPIC-VIDEO SLATE</div>
    <h2 id="epic-video-slate-title" className="mt-3 text-2xl font-black">Turn each song into a clear production brief.</h2>
    <p className="mt-3 max-w-4xl text-sm leading-7 text-[#D6E2EE]">Capture the creative direction before any production decision. This browser-local slate does not generate, upload, publish, or distribute video.</p>
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      <div>
        <label className="text-xs font-mono text-[#B8C7D6]" htmlFor="slate-song">Song or release</label>
        <input id="slate-song" value={song} onChange={e => setSong(e.target.value)} placeholder="Working title" className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm text-white" />
      </div>
      <Field id="slate-purpose" label="Purpose and narrative" value={slate.purpose} onChange={value => update("purpose", value)} placeholder="What should the viewer feel, learn, or remember?" />
      <Field id="slate-duration" label="Duration and aspect ratio" value={slate.duration} onChange={value => update("duration", value)} placeholder="Example: 15s / 9:16; 60s / 16:9" />
      <Field id="slate-visual" label="Visual style and references" value={slate.visual} onChange={value => update("visual", value)} placeholder="Palette, camera language, approved references" />
      <Field id="slate-language" label="Language, voice, and narration" value={slate.language} onChange={value => update("language", value)} placeholder="Language, transcript, narration, or no voice" />
      <Field id="slate-authorization" label="Music-use authorization" value={slate.authorization} onChange={value => update("authorization", value)} placeholder="Owner, contributor, master, and sync-use context" />
      <div className="lg:col-span-2">
        <label className="text-xs font-mono text-[#B8C7D6]" htmlFor="slate-reference-plan">Reference-image plan</label>
        <textarea id="slate-reference-plan" value={referencePlan} onChange={e => setReferencePlan(e.target.value)} rows={3} placeholder="List only approved or planned reference images; do not upload them here." className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm leading-6 text-white" />
      </div>
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button type="button" onClick={save} className="min-h-11 rounded-lg border border-[#00FF88]/60 px-4 py-2 text-xs font-black text-[#00FF88]">Save local production brief</button>
      <button type="button" onClick={() => navigator.clipboard?.writeText(summary).then(() => toast.success("Local slate copied."), () => toast.error("Copy was unavailable in this browser."))} className="min-h-11 rounded-lg border border-[#00D4FF]/60 px-4 py-2 text-xs font-black text-[#00D4FF]">Copy slate text</button>
      {saved && <span role="status" aria-live="polite" className="text-xs font-bold text-[#00FF88]">Saved locally — no provider action taken.</span>}
    </div>
    <p className="mt-5 text-xs leading-6 text-[#AFC3D8]">No file upload, video generation, rights determination, provider submission, publication, payment, wallet, token, or distribution action occurs here.</p>
  </section>;
}

function Field({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <div><label className="text-xs font-mono text-[#B8C7D6]" htmlFor={id}>{label}</label><textarea id={id} value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm leading-6 text-white" /></div>;
}
