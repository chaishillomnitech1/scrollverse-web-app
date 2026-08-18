import { Link } from "wouter";

const CHOICES = [
  { title: "Change it", detail: "Act on the external circumstances you can responsibly change.", color: "#00D4FF" },
  { title: "Accept it", detail: "Acknowledge the present condition without spending energy denying that it exists.", color: "#00FF88" },
  { title: "Remove yourself", detail: "Choose distance, exit, or a new boundary when that is the more fitting path.", color: "#FFCC4D" },
  { title: "Suffer through", detail: "Notice the cost of remaining in resistance without changing the situation or leaving it.", color: "#FF9CC4" },
] as const;

export function UltimateChoicePathway({ context }: { context: string }) {
  return (
    <section className="container pb-5">
      <div className="rounded-[2rem] border border-[#B98CFF]/35 bg-[radial-gradient(circle_at_90%_12%,rgba(185,140,255,.18),transparent_30%),linear-gradient(135deg,rgba(0,212,255,.08),rgba(7,20,38,.96))] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-mono tracking-[.16em] text-[#DCC8FF]">FREE LEARNING · ULTIMATE CHOICE FRAMEWORK</p>
            <h2 className="mt-2 text-3xl font-black">Name the path before you move through it.</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#D6E2EE]">{context} This panel presents a four-choice reflection model as a source-labeled learning prompt, not a command, diagnosis, financial decision, or substitute for professional support.</p>
          </div>
          <span className="rounded-full border border-[#DCC8FF]/40 bg-[#B98CFF]/10 px-3 py-1 text-[10px] font-mono tracking-[.14em] text-[#DCC8FF]">AVAILABLE NOW · FREE STUDY</span>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {CHOICES.map((choice) => (
            <article key={choice.title} className="rounded-2xl border bg-[#050B1A]/60 p-5" style={{ borderColor: `${choice.color}55` }}>
              <p className="text-lg font-black" style={{ color: choice.color }}>{choice.title}</p>
              <p className="mt-3 text-sm leading-7 text-[#D6E2EE]">{choice.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-[#C9D8E7]">
          The widely repeated “35,000 decisions a day” figure is not used here as a settled statistic. The useful learning question is smaller: <strong className="text-white">what action, acceptance, boundary, or resistance is present in this specific moment?</strong>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/open-record-continuum" className="rounded-xl border border-[#9DEBFF]/40 bg-[#00D4FF]/10 px-4 py-3 text-sm font-black text-[#9DEBFF]">Open Record Continuum</Link>
          <Link href="/sovereign-contribution-exchange" className="rounded-xl border border-[#FFCC4D]/40 bg-[#FFCC4D]/10 px-4 py-3 text-sm font-black text-[#FFDEA0]">Carry it into Co-Creation</Link>
          <a href="https://medium.com/new-writers-welcome/the-four-choices-you-always-have-d098940d7276" target="_blank" rel="noreferrer" className="rounded-xl border border-[#B98CFF]/40 bg-[#B98CFF]/10 px-4 py-3 text-sm font-black text-[#DCC8FF]">Open cited perspective ↗</a>
        </div>
      </div>
    </section>
  );
}
