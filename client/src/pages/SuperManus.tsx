import { useSovereignHeartbeat } from '@/hooks/useSovereignHeartbeat';
import { Link } from 'wouter';

const guideRoles = [
  { title: "Evidence Pathfinder", href: "/evidence-commons", color: "#00D4FF", body: "Helps visitors distinguish source record, interpretation, question, and a future intention." },
  { title: "Creator Producer", href: "/creator-studio-navigator", color: "#00FF88", body: "Guides original music, film, video, art, story, accessibility, and production-readiness planning." },
  { title: "Release Navigator", href: "/creator-exchange-navigator", color: "#FFB800", body: "Connects creator-owned bundle and platform-readiness learning without activating commerce or providers." },
  { title: "Co-Creation Guide", href: "/co-creation-navigator", color: "#B98CFF", body: "Shows how visitors can offer sources, original work, access improvements, or route ideas for review." },
  { title: "Operations Guide", href: "/creator-operations-intelligence", color: "#FF8A4C", body: "Organizes evidence and specialist questions before a protected or professional handoff." },
  { title: "Original Media Guide", href: "/original-media-readiness", color: "#FF6B9A", body: "Helps build an original comic, animation, education, or visual-media concept with rights and youth-safety boundaries." },
];

export default function SuperManus() {
  useSovereignHeartbeat({ page: "SuperManus" });

  return (
    <div className="min-h-screen bg-[#050B1A] text-white font-['Space_Grotesk'] p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#00D4FF] hover:text-[#FFB800] transition-colors duration-300 mb-8 inline-block font-['Space_Mono']">
          &larr; Back to Home
        </Link>

        <h1 className="text-5xl font-bold text-[#FFB800] mb-6 leading-tight">Manus Hero Guide</h1>
        <p className="text-2xl text-[#00D4FF] mb-6 font-['Space_Mono']">Aegis Scribe · transparent navigator for the ScrollVerse</p>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl">Manus Hero is a helpful guide character, not an autonomous authority or consciousness claim. It helps visitors find source-led learning, browser-local planning tools, contribution routes, and protected human/owner handoffs.</p>

        <section className="mb-12">
          <h2 className="text-4xl font-semibold text-[#00FF88] mb-6">
            Navigation roles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-lg">{guideRoles.map(role => <Link key={role.title} href={role.href} className="bg-gray-900 p-6 rounded-lg shadow-lg border transition hover:scale-[1.01]" style={{ borderColor: role.color }}><h3 className="text-2xl font-bold mb-3" style={{ color: role.color }}>{role.title}</h3><p className="text-gray-300">{role.body}</p><div className="mt-4 text-sm font-bold" style={{ color: role.color }}>Open pathway →</div></Link>)}</div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-semibold text-[#00FF88] mb-6">
            Operating boundary
          </h2>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-[#FFB800]">
            <p className="text-lg text-gray-300 mb-4">
              Manus Hero provides source-led navigation, summaries, and planning prompts. It does not act as a court, bank, legal authority, financial advisor, custodian, publisher, platform account, or autonomous decision-maker.
            </p>
            <p className="text-lg text-gray-300">
              Decisions that change rights, finances, private records, accounts, providers, releases, or people’s opportunities remain with responsible humans and the appropriate qualified reviewers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold text-[#00FF88] mb-6">
            Original narrative pathway
          </h2>
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-[#00D4FF]">
            <p className="text-lg text-gray-300">
              The Hero can appear in original ScrollVerse comics, animation, and educational media as an Aegis Scribe guide character. Those works use their own original story, art, voice, rights, accessibility, and youth-safety review—not any third-party franchise expression.
            </p>
            <Link href="/original-media-readiness" className="mt-5 inline-block text-[#FFB800] font-bold">Plan original media →</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
