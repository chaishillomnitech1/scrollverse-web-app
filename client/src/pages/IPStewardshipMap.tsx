import { useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type ProtectionLane = "copyright" | "trademark" | "patent" | "trade-secret" | "license";

const PROTECTION_LANES: Array<{
  id: ProtectionLane;
  label: string;
  eyebrow: string;
  color: string;
  protects: string;
  localRecord: string[];
  boundary: string;
}> = [
  {
    id: "copyright",
    label: "Created works",
    eyebrow: "COPYRIGHT-READY RECORD",
    color: "#00D4FF",
    protects: "Original books, music, film, images, software, photographs, and other fixed creative expression.",
    localRecord: ["Final title and version", "Creation/source record", "Contributors and roles", "Accessible package", "Release destination and decision"],
    boundary: "A local record documents creation; it is not a Copyright Office registration or an ownership ruling.",
  },
  {
    id: "trademark",
    label: "Names & marks",
    eyebrow: "BRAND SCREENING QUEUE",
    color: "#FFB800",
    protects: "Words, phrases, logos, and source-identifying marks used with particular goods or services.",
    localRecord: ["Candidate name/logo", "Goods or services", "Design source", "Search/screening notes", "Use and filing decision"],
    boundary: "A name in the portal is not automatically cleared, registered, exclusive, or affiliated with another party.",
  },
  {
    id: "patent",
    label: "Inventions",
    eyebrow: "INVENTION DISCLOSURE",
    color: "#B98CFF",
    protects: "Eligible technical inventions, processes, improvements, and designs through a distinct patent process.",
    localRecord: ["Problem and technical solution", "Inventor/contributor record", "Diagrams or method notes", "Public-disclosure history", "Prior-art and practitioner-review queue"],
    boundary: "An idea log is not a patent application, patentability opinion, or granted patent.",
  },
  {
    id: "trade-secret",
    label: "Confidential methods",
    eyebrow: "CONFIDENTIALITY REGISTER",
    color: "#00FF88",
    protects: "Commercially valuable information kept secret through reasonable handling and access controls.",
    localRecord: ["Secret inventory", "Need-to-know access list", "Disclosure log", "Handling instructions", "Secrecy-versus-release decision"],
    boundary: "Publicly posting a method may conflict with keeping it confidential; this page does not create secrecy controls by itself.",
  },
  {
    id: "license",
    label: "Licenses & collaboration",
    eyebrow: "PERMISSION MATRIX",
    color: "#FF6B9A",
    protects: "Clear agreements about who may use a work, for what media, territory, term, attribution, and compensation terms.",
    localRecord: ["Rights holder", "Use scope", "Media and territory", "Attribution and accessibility", "Agreement/outcome reference"],
    boundary: "A proposed collaboration card is not permission, an executed agreement, or a license grant.",
  },
];

const OPERATING_STEPS = [
  { title: "Capture", text: "Make a dated source record for work that actually exists, including accessible files and contributor context.", color: "#00D4FF" },
  { title: "Classify", text: "Choose the protection lane that fits the created work, mark, invention, confidential method, or agreement question.", color: "#FFB800" },
  { title: "Screen", text: "Keep searches, rights checks, public-disclosure history, and open questions visible for the exact asset.", color: "#B98CFF" },
  { title: "Decide", text: "The owner decides whether to release, keep confidential, license, seek professional review, or begin a filing path.", color: "#00FF88" },
  { title: "Record outcome", text: "Append the actual filing, registration, agreement, release, or correction reference only after it exists.", color: "#FF6B9A" },
];

export default function IPStewardshipMap() {
  useSovereignHeartbeat({ page: "ip-stewardship" });
  const [selected, setSelected] = useState<ProtectionLane>("copyright");
  const [assetTitle, setAssetTitle] = useState("");
  const lane = useMemo(() => PROTECTION_LANES.find(item => item.id === selected) ?? PROTECTION_LANES[0], [selected]);

  const copyPacket = async () => {
    const packet = {
      record_type: "ScrollVerse IP stewardship packet",
      asset_title: assetTitle.trim() || "Untitled asset",
      protection_lane: lane.label,
      record_fields: lane.localRecord,
      operating_state: "research",
      filing_or_registration_status: "not asserted",
      correction_path: "Attach source, rights, accessibility, destination, and actual outcome records to this exact asset.",
    };
    try {
      await navigator.clipboard?.writeText(JSON.stringify(packet, null, 2));
      toast.success("Local IP packet copied. Add evidence before using it for a filing or release decision.");
    } catch {
      toast.error("Copy was unavailable in this browser. You can still use the visible packet fields.");
    }
  };

  return (
    <main className="min-h-screen pb-24 text-white" style={{ background: "radial-gradient(circle at 88% 7%, rgba(185,140,255,0.16), transparent 26%), radial-gradient(circle at 5% 56%, rgba(0,212,255,0.12), transparent 32%), #050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      <section className="border-b" style={{ borderColor: "rgba(185,140,255,0.26)" }}>
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/ip-readiness" className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>← IP READINESS</Link>
            <span className="rounded-full border px-3 py-1 text-[10px] font-mono" style={{ borderColor: "rgba(185,140,255,0.52)", color: "#B98CFF" }}>CREATED WORK · EVIDENCE · FILING READINESS</span>
          </div>
          <div className="mt-14 grid gap-9 lg:grid-cols-[1.16fr_0.84fr] lg:items-end">
            <div>
              <div className="text-xs font-mono tracking-[0.22em]" style={{ color: "#B98CFF" }}>SCROLLVERSE IP STEWARDSHIP MAP</div>
              <h1 className="mt-5 text-5xl font-black leading-[0.9] sm:text-7xl">Protect what<br /><span style={{ color: "#B98CFF" }}>you actually create.</span></h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "#C8D8E7" }}>A local creator record for original works, names, logos, inventions, confidential methods, and collaboration permissions. It turns each created asset into an evidence packet and makes the next real filing, licensing, or release decision visible without claiming a registration or legal outcome before it exists.</p>
            </div>
            <aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,255,136,0.34)", background: "rgba(0,255,136,0.045)" }}>
              <div className="text-xs font-mono tracking-widest" style={{ color: "#00FF88" }}>STEWARD, NOT SHORTCUT</div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#D8E3EF" }}>This local tool organizes source, rights, accessibility, and outcome records. It does not clear a mark, grant a patent, register copyright, create a trade secret, execute a license, or replace qualified legal review.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>FIVE PROTECTION LANES</div>
        <h2 className="mt-3 text-3xl font-black">Start with the type of created thing.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {PROTECTION_LANES.map(item => (
            <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)} className="rounded-[1.5rem] border p-5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#00D4FF]" style={{ borderColor: selected === item.id ? item.color : `${item.color}35`, background: selected === item.id ? `${item.color}14` : "rgba(4,14,30,0.68)", boxShadow: selected === item.id ? `0 0 30px ${item.color}18` : "none" }}>
              <div className="text-[10px] font-mono tracking-widest" style={{ color: item.color }}>{item.eyebrow}</div>
              <h3 className="mt-4 text-xl font-black">{item.label}</h3>
            </button>
          ))}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
            <article className="rounded-[2rem] border p-7" style={{ borderColor: `${lane.color}50`, background: "rgba(4,14,30,0.72)" }}>
              <div className="text-xs font-mono tracking-widest" style={{ color: lane.color }}>{lane.eyebrow}</div>
              <h2 className="mt-4 text-3xl font-black">{lane.label}</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{lane.protects}</p>
              <div className="mt-7 border-t pt-6" style={{ borderColor: `${lane.color}28` }}>
                <div className="text-[10px] font-mono tracking-widest" style={{ color: lane.color }}>LOCAL EVIDENCE FIELDS</div>
                <ul className="mt-4 space-y-3 text-sm" style={{ color: "#D8E3EF" }}>{lane.localRecord.map(field => <li key={field} className="flex gap-3"><span style={{ color: lane.color }}>◆</span><span>{field}</span></li>)}</ul>
              </div>
              <p className="mt-7 rounded-2xl border p-4 text-sm leading-relaxed" style={{ borderColor: "rgba(255,184,0,0.32)", background: "rgba(255,184,0,0.06)", color: "#FFE3A3" }}>{lane.boundary}</p>
            </article>
            <aside className="rounded-[2rem] border p-7" style={{ borderColor: "rgba(0,212,255,0.35)", background: "rgba(0,212,255,0.035)" }}>
              <div className="text-xs font-mono tracking-widest" style={{ color: "#00D4FF" }}>BROWSER-LOCAL PACKET BUILDER</div>
              <label className="mt-5 block text-sm font-bold" htmlFor="asset-title">Created asset or working title</label>
              <input id="asset-title" value={assetTitle} onChange={event => setAssetTitle(event.target.value)} placeholder="Example: Original collection name or episode title" className="mt-3 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#00D4FF]" style={{ borderColor: "rgba(0,212,255,0.28)", background: "rgba(2,11,26,0.9)", color: "white" }} />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>The packet stays in your browser until you copy it. Add the actual source, contributor/rights, accessibility, destination, and outcome records before relying on it for any filing, license, or public claim.</p>
              <button type="button" onClick={copyPacket} className="mt-7 rounded-xl px-5 py-3 text-sm font-black" style={{ background: "linear-gradient(135deg, #00D4FF, #B98CFF)", color: "#050B1A" }}>Copy {lane.label} Packet</button>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-xs font-mono tracking-widest" style={{ color: "#FFB800" }}>OPERATING LOOP</div>
        <h2 className="mt-3 text-3xl font-black">Record the work before the public claim.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {OPERATING_STEPS.map((step, index) => <article key={step.title} className="rounded-3xl border p-6" style={{ borderColor: `${step.color}40`, background: "rgba(4,14,30,0.66)" }}><div className="text-3xl font-black" style={{ color: step.color }}>0{index + 1}</div><h3 className="mt-5 text-xl font-black">{step.title}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>{step.text}</p></article>)}
        </div>
      </section>

      <section className="border-y" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.018)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-7 lg:grid-cols-[1.12fr_0.88fr]">
            <div><div className="text-xs font-mono tracking-widest" style={{ color: "#FF6B9A" }}>PUBLIC CLAIM / CONFIDENTIAL METHOD</div><h2 className="mt-3 text-3xl font-black">Choose disclosure deliberately.</h2><p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "#C8D8E7" }}>Publicly released creative work, a brand filing queue, a technical invention disclosure, and a confidential-method register require different records. Before a public launch, mark which details are intended for release and which require access control or qualified review.</p></div>
            <div className="grid gap-3 sm:grid-cols-2"><Link href="/pre-registration-readiness" className="rounded-xl border p-4 text-sm font-black" style={{ borderColor: "rgba(255,204,77,0.42)", color: "#FFCC4D" }}>Pre-Registration Readiness →</Link><Link href="/ip-readiness" className="rounded-xl border p-4 text-sm font-black" style={{ borderColor: "rgba(255,184,0,0.35)", color: "#FFB800" }}>IP Readiness →</Link><Link href="/evidence-standards" className="rounded-xl border p-4 text-sm font-black" style={{ borderColor: "rgba(0,212,255,0.35)", color: "#00D4FF" }}>Evidence Standards →</Link><Link href="/creator-infrastructure" className="rounded-xl border p-4 text-sm font-black" style={{ borderColor: "rgba(185,140,255,0.35)", color: "#B98CFF" }}>Creator Infrastructure →</Link><Link href="/assistive-governance" className="rounded-xl border p-4 text-sm font-black" style={{ borderColor: "rgba(0,255,136,0.35)", color: "#00FF88" }}>Assistive Governance →</Link></div>
          </div>
        </div>
      </section>
    </main>
  );
}
