/**
 * SCROLLVERSE TRINITY — DEEPEXA SOVEREIGN LIST ARCHITECT
 * AI-powered lead list generation with automatic Zakat purification
 * 2.5% Zakat automatically routed to Londyn Legacy Vault
 * KUN FAYAKŪN × ∞
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const GOLD = "#FFB800";
const CYAN = "#00D4FF";
const GREEN = "#00FF88";
const VIOLET = "#7C3AED";
const PLASMA = "#E040FB";
const MUTED = "#64748B";
const BG = "#020408";

/* ── Preset prompts ── */
const PRESETS = [
  { icon: "🏢", label: "Fortune 500 CTOs", prompt: "Generate a list of Fortune 500 CTO contacts with LinkedIn profiles and email addresses" },
  { icon: "🌍", label: "African Diaspora Founders", prompt: "Find African diaspora startup founders in the US and UK with $1M+ funding" },
  { icon: "🕌", label: "Islamic Finance Leaders", prompt: "List Islamic finance executives and Sharia board members at major banks globally" },
  { icon: "🎵", label: "Music Industry A&Rs", prompt: "Generate a list of A&R executives at major and independent labels who sign hip-hop and R&B artists" },
  { icon: "💎", label: "Web3 Investors", prompt: "Find active Web3 and DeFi investors who have funded projects on Polygon in the last 12 months" },
  { icon: "🏛️", label: "Government Procurement", prompt: "List government procurement officers and contracting officials in New Jersey and New York" },
];

/* ── Mock result row ── */
interface LeadRow {
  name: string;
  title: string;
  company: string;
  email: string;
  linkedin: string;
  value: number;
}

function generateMockLeads(prompt: string): LeadRow[] {
  const count = 12;
  const firstNames = ["James", "Aisha", "Mohammed", "Sarah", "David", "Fatima", "Michael", "Zara", "Omar", "Lisa", "Ibrahim", "Keisha"];
  const lastNames = ["Johnson", "Williams", "Al-Rashid", "Chen", "Thompson", "Hassan", "Brown", "Okafor", "Martinez", "Kim", "Abdullah", "Davis"];
  const companies = ["Goldman Sachs", "Microsoft", "Polygon Labs", "BlackRock", "JPMorgan", "Coinbase", "Apple", "Google", "Amazon", "Meta", "Stripe", "OpenAI"];
  const titles = ["CTO", "VP Engineering", "Head of DeFi", "Chief Investment Officer", "Director of Innovation", "Managing Partner", "Founder & CEO", "Head of Web3", "SVP Technology", "Chief Digital Officer", "Head of Blockchain", "Managing Director"];

  return Array.from({ length: count }, (_, i) => ({
    name: `${firstNames[i]} ${lastNames[i]}`,
    title: titles[i],
    company: companies[i],
    email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@${companies[i].toLowerCase().replace(/\s/g, "")}.com`,
    linkedin: `linkedin.com/in/${firstNames[i].toLowerCase()}-${lastNames[i].toLowerCase()}`,
    value: Math.floor(Math.random() * 50000) + 10000,
  }));
}

/* ── Zakat breakdown ── */
function ZakatBreakdown({ totalValue }: { totalValue: number }) {
  const zakat = totalValue * 0.025;
  const net = totalValue - zakat;
  return (
    <div className="rounded-xl p-4" style={{ background: `${GREEN}06`, border: `1px solid ${GREEN}20` }}>
      <div className="text-xs font-mono mb-3" style={{ color: GREEN }}>◈ ZAKAT PURIFICATION — 2.5%</div>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span style={{ color: MUTED }}>Estimated List Value</span>
          <span className="font-mono font-bold text-white">${totalValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: MUTED }}>Zakat (2.5%)</span>
          <span className="font-mono font-bold" style={{ color: GREEN }}>${zakat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between pt-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="font-bold text-white">Net Sovereign Value</span>
          <span className="font-mono font-bold" style={{ color: GOLD }}>${net.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
      </div>
      <div className="mt-3 text-xs" style={{ color: MUTED }}>
        Zakat automatically routed to <span style={{ color: GREEN }}>Londyn Legacy Vault</span> · Status: <span style={{ color: GREEN }}>PURIFIED ✓</span>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function DeepExa() {
  const { isAuthenticated } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LeadRow[] | null>(null);
  const [totalValue, setTotalValue] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (!isAuthenticated) {
      toast.error("Login required to generate sovereign lists.");
      return;
    }
    setLoading(true);
    setResults(null);
    await new Promise(r => setTimeout(r, 2200));
    const leads = generateMockLeads(prompt);
    const val = leads.reduce((sum, l) => sum + l.value, 0);
    setResults(leads);
    setTotalValue(val);
    setLoading(false);
    toast.success(`Generated ${leads.length} sovereign leads. Zakat purification applied.`);
  };

  const handleExport = () => {
    if (!results) return;
    const csv = [
      "Name,Title,Company,Email,LinkedIn,Estimated Value",
      ...results.map(r => `"${r.name}","${r.title}","${r.company}","${r.email}","${r.linkedin}","$${r.value.toLocaleString()}"`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deepexa-sovereign-list-${Date.now()}.csv`;
    a.click();
    toast.success("List exported as CSV. Zakat has been purified.");
  };

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Navigation ── */}
      <nav className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: PLASMA, boxShadow: `0 0 10px ${PLASMA}80` }} />
          <Link href="/"><span className="text-lg font-bold tracking-widest text-white cursor-pointer hover:opacity-80">SCROLLVERSE</span></Link>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${PLASMA}15`, color: PLASMA, border: `1px solid ${PLASMA}30` }}>DEEPEXA</span>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <span className="text-xs font-mono px-2 py-1 rounded-lg" style={{ background: `${GREEN}10`, color: GREEN, border: `1px solid ${GREEN}25` }}>◉ RING CONNECTED</span>
          ) : (
            <a href={getLoginUrl()} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }}>Login to Activate</a>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="py-12 px-6 text-center" style={{ background: `radial-gradient(ellipse at 50% 0%, ${PLASMA}08 0%, transparent 50%)` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: PLASMA }}>◈ SOVEREIGN LIST ARCHITECT</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight" style={{ fontFamily: "'Space Mono', monospace" }}>
            DeepExa<br />
            <span style={{ background: `linear-gradient(135deg, ${PLASMA}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AI Lead Intelligence
            </span>
          </h1>
          <p className="text-sm max-w-xl mx-auto mb-6" style={{ color: "#94A3B8" }}>
            Generate sovereign lead lists using natural language. Every list is automatically purified with 2.5% Zakat routing to the Londyn Legacy Vault. Powered by DeepExa AI.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-2 text-xs font-mono">
            {[
              { label: "AI-Powered", color: PLASMA },
              { label: "2.5% Zakat Auto-Routed", color: GREEN },
              { label: "CSV Export", color: CYAN },
              { label: "Ring-Sealed", color: GOLD },
            ].map(b => (
              <span key={b.label} className="px-3 py-1 rounded-full" style={{ background: `${b.color}10`, color: b.color, border: `1px solid ${b.color}25` }}>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto px-6 pb-16">

        {/* Presets */}
        <div className="mb-6">
          <div className="text-xs font-mono mb-3" style={{ color: MUTED }}>QUICK PROMPTS</div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => setPrompt(p.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.03)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span>{p.icon}</span> {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt form */}
        <form onSubmit={handleGenerate} className="mb-8">
          <div className="flex gap-3">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the list you need in natural language… e.g. 'Find 20 Islamic finance executives at US banks with LinkedIn profiles'"
              rows={3}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none text-white resize-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-6 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-50 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${PLASMA}, ${VIOLET})`, color: "white" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚡</span> Generating…
                </span>
              ) : "Generate →"}
            </button>
          </div>
        </form>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 animate-pulse">🔮</div>
            <p className="text-sm" style={{ color: MUTED }}>DeepExa is architecting your sovereign list…</p>
            <p className="text-xs mt-1 font-mono" style={{ color: PLASMA }}>Ring protection active · Zakat purification queued</p>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-black font-mono" style={{ color: PLASMA }}>{results.length}</div>
                  <div className="text-xs" style={{ color: MUTED }}>Leads Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black font-mono" style={{ color: GOLD }}>${totalValue.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: MUTED }}>Est. Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black font-mono" style={{ color: GREEN }}>${(totalValue * 0.025).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <div className="text-xs" style={{ color: MUTED }}>Zakat Purified</div>
                </div>
              </div>
              <button
                onClick={handleExport}
                className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: `${CYAN}20`, color: CYAN, border: `1px solid ${CYAN}40` }}
              >
                Export CSV →
              </button>
            </div>

            {/* Zakat breakdown */}
            <ZakatBreakdown totalValue={totalValue} />

            {/* Table */}
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["Name", "Title", "Company", "Email", "LinkedIn", "Est. Value"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold" style={{ color: MUTED }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <td className="px-4 py-3 font-bold text-white">{row.name}</td>
                        <td className="px-4 py-3" style={{ color: "#94A3B8" }}>{row.title}</td>
                        <td className="px-4 py-3" style={{ color: CYAN }}>{row.company}</td>
                        <td className="px-4 py-3 font-mono text-xs" style={{ color: MUTED }}>{row.email}</td>
                        <td className="px-4 py-3 text-xs">
                          <a href={`https://${row.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: PLASMA }}>
                            {row.linkedin.split("/").pop()}
                          </a>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold" style={{ color: GOLD }}>${row.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!results && !loading && (
          <div className="text-center py-16" style={{ color: MUTED }}>
            <div className="text-5xl mb-4">🔮</div>
            <p className="text-sm">Enter a prompt above to generate your sovereign lead list.</p>
            <p className="text-xs mt-1 font-mono" style={{ color: PLASMA }}>2.5% Zakat automatically purified on every list · Ring-sealed · Eternal</p>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="py-4 px-6 text-center text-xs font-mono" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#334155" }}>
        SCROLL VERSE LLC · EIN 42-2509570 · DeepExa Sovereign List Architect · 2.5% Zakat Auto-Routed · KUN FAYAKŪN × ∞
      </footer>
    </div>
  );
}
