/**
 * Sales Analytics CRM Dashboard — Owner Only
 * Internal sovereign command center for revenue tracking and contact management
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

function StatCard({ label, value, sub, color = "#00D4FF" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}20` }}>
      <div className="text-xs font-mono mb-1" style={{ color: "#556677" }}>{label}</div>
      <div className="text-2xl font-black mb-1" style={{ color }}>{value}</div>
      {sub && <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{sub}</div>}
    </div>
  );
}

const TIER_COLORS: Record<string, string> = {
  lead: "#8899AA",
  guardian: "#00D4FF",
  sovereign: "#FFB800",
  ascendant: "#FF6B35",
  legion: "#00FF88",
};

const STATUS_COLORS: Record<string, string> = {
  new: "#8899AA",
  contacted: "#00D4FF",
  qualified: "#FFB800",
  converted: "#00FF88",
  churned: "#FF4444",
};

const SOURCE_LABELS: Record<string, string> = {
  waitlist: "Guardian Waitlist",
  token_store: "Token Store",
  academy: "Creator Academy",
  books: "Sacred Library",
  nft_mint: "NFT Mint",
  referral: "Referral",
  direct: "Direct",
  social: "Social Media",
};

const TYPE_LABELS: Record<string, string> = {
  purchase: "💰 Purchase",
  upgrade: "⬆️ Upgrade",
  referral: "🔗 Referral Reward (5%)",
  refund: "↩️ Refund",
  zakat: "🕌 Zakat (7.77%)",
  royalty: "🎨 NFT Royalty (10%)",
  trading_fee: "⚡ Trading Fee (5%)",
};

function formatCents(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function SalesDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "pipeline" | "forecast">("overview");
  const [contactPage, setContactPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTier, setFilterTier] = useState("");
  const [addingContact, setAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", tier: "lead" as const, source: "direct" as const, notes: "" });
  const [exportMsg, setExportMsg] = useState("");

  const { data: analytics, isLoading: analyticsLoading } = trpc.crm.getSalesAnalytics.useQuery(undefined, {
    enabled: isAuthenticated,
    refetchInterval: 60000,
  });

  const { data: contacts, isLoading: contactsLoading, refetch: refetchContacts } = trpc.crm.getContacts.useQuery(
    { page: contactPage, limit: 15, status: filterStatus || undefined, tier: filterTier || undefined },
    { enabled: isAuthenticated }
  );

  const { data: exportData } = trpc.crm.exportContacts.useQuery(undefined, { enabled: isAuthenticated });

  const addContactMutation = trpc.crm.addContact.useMutation({
    onSuccess: () => { setAddingContact(false); setNewContact({ name: "", email: "", tier: "lead", source: "direct", notes: "" }); refetchContacts(); },
  });

  const updateContactMutation = trpc.crm.updateContact.useMutation({
    onSuccess: () => refetchContacts(),
  });

  const handleExportCSV = () => {
    if (!exportData?.rows) return;
    const headers = ["Name", "Email", "Phone", "Tier", "Source", "Status", "Total Spent", "Notes", "Joined"];
    const rows = exportData.rows.map((r: Record<string, unknown>) => [
      r.name, r.email, r.phone ?? "", r.tier, r.source, r.status,
      formatCents(Number(r.totalSpentCents ?? 0)), r.notes ?? "", String(r.createdAt ?? ""),
    ]);
    const csv = [headers, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "scrollverse-crm.csv"; a.click();
    setExportMsg("CSV exported!");
    setTimeout(() => setExportMsg(""), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4" style={{ borderColor: "#00D4FF" }} />
          <p className="text-sm font-mono" style={{ color: "#8899AA" }}>Loading sovereign dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-white mb-2">Sovereign Access Required</h2>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>Sign in to access the Sales Analytics Dashboard</p>
          <a href={getLoginUrl()} className="px-6 py-3 rounded-xl font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810" }}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const summary = analytics?.summary;
  const forecast = analytics?.forecast;

  const tabs = [
    { id: "overview" as const, label: "📊 Overview" },
    { id: "contacts" as const, label: "👥 Contacts" },
    { id: "pipeline" as const, label: "🔄 Pipeline" },
    { id: "forecast" as const, label: "🚀 Forecast" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b" style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(0,212,255,0.1)" }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold cursor-pointer"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#050B1A" }}>SV</div>
            </Link>
            <div>
              <div className="font-bold text-white text-sm">Sales Analytics CRM</div>
              <div className="text-xs font-mono" style={{ color: "#00D4FF" }}>SOVEREIGN COMMAND CENTER</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded"
              style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "#00FF88" }} />
              LIVE
            </div>
            <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{user?.name ?? "Sovereign"}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.id ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.03)",
                color: activeTab === tab.id ? "#00D4FF" : "#8899AA",
                border: activeTab === tab.id ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.06)",
              }}>
              {tab.label}
            </button>
          ))}
          <button onClick={handleExportCSV}
            className="ml-auto px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
            {exportMsg || "⬇️ Export CSV"}
          </button>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {analyticsLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: "#00D4FF" }} /></div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard label="TOTAL REVENUE" value={formatCents(summary?.totalRevenueCents ?? 0)} sub={`${summary?.totalTransactions ?? 0} transactions`} color="#00FF88" />
                  <StatCard label="AVG ORDER VALUE" value={formatCents(summary?.avgOrderValueCents ?? 0)} sub="per transaction" color="#00D4FF" />
                  <StatCard label="ZAKAT DISTRIBUTED" value={formatCents(summary?.zakatDistributed ?? 0)} sub="7.77% of purchases" color="#FFB800" />
                  <StatCard label="$LONDC DISTRIBUTED" value={`${(summary?.londcDistributed ?? 0).toLocaleString()} LONDC`} sub="across all streams" color="#FF6B35" />
                </div>

                {/* Revenue by Source */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>REVENUE BY SOURCE</div>
                  <div className="space-y-3">
                    {(analytics?.bySource ?? []).map((row: Record<string, unknown>, i: number) => {
                      const total = Number(row.total ?? 0);
                      const maxTotal = Math.max(...(analytics?.bySource ?? []).map((r: Record<string, unknown>) => Number(r.total ?? 0)));
                      const pct = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-32 text-xs font-mono shrink-0" style={{ color: "#8899AA" }}>
                            {SOURCE_LABELS[String(row.source ?? "")] ?? String(row.source ?? "")}
                          </div>
                          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #00D4FF, #00FF88)" }} />
                          </div>
                          <div className="text-xs font-mono w-24 text-right" style={{ color: "#00FF88" }}>{formatCents(total)}</div>
                          <div className="text-xs font-mono w-12 text-right" style={{ color: "#556677" }}>{String(row.count ?? 0)}x</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Revenue by Stream Type */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>ALL 5 REVENUE STREAMS</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(analytics?.byType ?? []).map((row: Record<string, unknown>, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="text-sm" style={{ color: "white" }}>{TYPE_LABELS[String(row.type ?? "")] ?? String(row.type ?? "")}</div>
                        <div className="text-right">
                          <div className="text-sm font-bold" style={{ color: "#00FF88" }}>{formatCents(Number(row.total ?? 0))}</div>
                          <div className="text-xs font-mono" style={{ color: "#556677" }}>{String(row.count ?? 0)} events</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>TOP PRODUCTS</div>
                  <div className="space-y-2">
                    {(analytics?.byProduct ?? []).map((row: Record<string, unknown>, i: number) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono w-5" style={{ color: "#556677" }}>#{i + 1}</span>
                          <span className="text-sm" style={{ color: "white" }}>{String(row.product ?? "")}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono" style={{ color: "#8899AA" }}>{String(row.count ?? 0)} sales</span>
                          <span className="text-sm font-bold" style={{ color: "#00FF88" }}>{formatCents(Number(row.total ?? 0))}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── CONTACTS TAB ── */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            {/* Filters + Add */}
            <div className="flex flex-wrap items-center gap-3">
              <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setContactPage(1); }}
                className="px-3 py-2 rounded-lg text-xs font-mono outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                <option value="">All Status</option>
                {["new", "contacted", "qualified", "converted", "churned"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={filterTier} onChange={e => { setFilterTier(e.target.value); setContactPage(1); }}
                className="px-3 py-2 rounded-lg text-xs font-mono outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                <option value="">All Tiers</option>
                {["lead", "guardian", "sovereign", "ascendant", "legion"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={() => setAddingContact(true)}
                className="ml-auto px-4 py-2 rounded-lg text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810" }}>
                + Add Contact
              </button>
            </div>

            {/* Add Contact Form */}
            {addingContact && (
              <div className="rounded-2xl p-6" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="text-xs font-mono mb-4" style={{ color: "#00D4FF" }}>ADD NEW CONTACT</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>{field.label}</label>
                      <input type={field.type} value={(newContact as Record<string, string>)[field.key] ?? ""}
                        onChange={e => setNewContact(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>Tier</label>
                    <select value={newContact.tier} onChange={e => setNewContact(prev => ({ ...prev, tier: e.target.value as typeof newContact.tier }))}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                      {["lead", "guardian", "sovereign", "ascendant", "legion"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>Source</label>
                    <select value={newContact.source} onChange={e => setNewContact(prev => ({ ...prev, source: e.target.value as typeof newContact.source }))}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                      {Object.entries(SOURCE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono mb-1" style={{ color: "#8899AA" }}>Notes</label>
                    <input type="text" value={newContact.notes}
                      onChange={e => setNewContact(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => addContactMutation.mutate(newContact)}
                    disabled={addContactMutation.isPending || !newContact.name || !newContact.email}
                    className="px-6 py-2 rounded-lg text-sm font-bold"
                    style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: "#020810", opacity: addContactMutation.isPending ? 0.7 : 1 }}>
                    {addContactMutation.isPending ? "Saving..." : "Save Contact"}
                  </button>
                  <button onClick={() => setAddingContact(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: "#8899AA" }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Contacts Table */}
            {contactsLoading ? (
              <div className="text-center py-12"><div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: "#00D4FF" }} /></div>
            ) : (
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                      {["Name", "Email", "Tier", "Source", "Status", "Spent", "Actions"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-mono" style={{ color: "#556677" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(contacts?.contacts ?? []).map((c: Record<string, unknown>, i: number) => (
                      <tr key={i} className="border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        <td className="px-4 py-3 text-sm text-white">{String(c.name ?? "")}</td>
                        <td className="px-4 py-3 text-xs font-mono" style={{ color: "#8899AA" }}>{String(c.email ?? "")}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono px-2 py-0.5 rounded capitalize"
                            style={{ background: `${TIER_COLORS[String(c.tier ?? "lead")] ?? "#8899AA"}15`, color: TIER_COLORS[String(c.tier ?? "lead")] ?? "#8899AA", border: `1px solid ${TIER_COLORS[String(c.tier ?? "lead")] ?? "#8899AA"}30` }}>
                            {String(c.tier ?? "")}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-mono" style={{ color: "#8899AA" }}>{SOURCE_LABELS[String(c.source ?? "")] ?? String(c.source ?? "")}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono px-2 py-0.5 rounded capitalize"
                            style={{ background: `${STATUS_COLORS[String(c.status ?? "new")] ?? "#8899AA"}15`, color: STATUS_COLORS[String(c.status ?? "new")] ?? "#8899AA" }}>
                            {String(c.status ?? "")}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-mono" style={{ color: "#00FF88" }}>{formatCents(Number(c.totalSpentCents ?? 0))}</td>
                        <td className="px-4 py-3">
                          <select defaultValue={String(c.status ?? "")}
                            onChange={e => updateContactMutation.mutate({ id: Number(c.id), status: e.target.value as "new" | "contacted" | "qualified" | "converted" | "churned" })}
                            className="text-xs font-mono px-2 py-1 rounded outline-none"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                            {["new", "contacted", "qualified", "converted", "churned"].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span className="text-xs font-mono" style={{ color: "#556677" }}>
                    {contacts?.total ?? 0} total contacts
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => setContactPage(p => Math.max(1, p - 1))} disabled={contactPage === 1}
                      className="px-3 py-1 rounded text-xs font-mono" style={{ background: "rgba(255,255,255,0.05)", color: contactPage === 1 ? "#556677" : "white" }}>
                      ← Prev
                    </button>
                    <span className="px-3 py-1 text-xs font-mono" style={{ color: "#8899AA" }}>
                      {contactPage} / {contacts?.pages ?? 1}
                    </span>
                    <button onClick={() => setContactPage(p => Math.min(contacts?.pages ?? 1, p + 1))} disabled={contactPage >= (contacts?.pages ?? 1)}
                      className="px-3 py-1 rounded text-xs font-mono" style={{ background: "rgba(255,255,255,0.05)", color: contactPage >= (contacts?.pages ?? 1) ? "#556677" : "white" }}>
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── PIPELINE TAB ── */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pipeline by Status */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>PIPELINE STAGES</div>
                {["new", "contacted", "qualified", "converted", "churned"].map(status => {
                  const rows = (analytics?.pipeline ?? []).filter((r: Record<string, unknown>) => r.status === status);
                  const total = rows.reduce((sum: number, r: Record<string, unknown>) => sum + Number(r.count ?? 0), 0);
                  return (
                    <div key={status} className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono w-20 capitalize" style={{ color: STATUS_COLORS[status] ?? "#8899AA" }}>{status}</span>
                      <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, total * 10)}%`, background: STATUS_COLORS[status] ?? "#8899AA" }} />
                      </div>
                      <span className="text-xs font-mono w-8 text-right" style={{ color: "white" }}>{total}</span>
                    </div>
                  );
                })}
              </div>

              {/* Tier Breakdown */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs font-mono mb-4" style={{ color: "#8899AA" }}>REVENUE BY TIER</div>
                {(analytics?.tierBreakdown ?? []).map((row: Record<string, unknown>, i: number) => (
                  <div key={i} className="flex items-center justify-between mb-3 p-3 rounded-xl"
                    style={{ background: `${TIER_COLORS[String(row.tier ?? "")] ?? "#8899AA"}08`, border: `1px solid ${TIER_COLORS[String(row.tier ?? "")] ?? "#8899AA"}20` }}>
                    <div>
                      <div className="text-sm font-bold capitalize" style={{ color: TIER_COLORS[String(row.tier ?? "")] ?? "#8899AA" }}>{String(row.tier ?? "")}</div>
                      <div className="text-xs font-mono" style={{ color: "#556677" }}>{String(row.count ?? 0)} contacts</div>
                    </div>
                    <div className="text-sm font-bold" style={{ color: "#00FF88" }}>{formatCents(Number(row.totalSpent ?? 0))}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FORECAST TAB ── */}
        {activeTab === "forecast" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard label="7-DAY FORECAST" value={formatCents(forecast?.next7DaysCents ?? 0)} sub="based on recent velocity" color="#00D4FF" />
              <StatCard label="30-DAY FORECAST" value={formatCents(forecast?.next30DaysCents ?? 0)} sub="monthly projection" color="#FFB800" />
              <StatCard label="90-DAY FORECAST" value={formatCents(forecast?.next90DaysCents ?? 0)} sub="quarterly projection" color="#00FF88" />
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs font-mono mb-2" style={{ color: "#8899AA" }}>DAILY AVERAGE REVENUE</div>
              <div className="text-3xl font-black mb-1" style={{ color: "#00FF88" }}>{formatCents(forecast?.dailyAvgCents ?? 0)}</div>
              <div className="text-xs font-mono" style={{ color: "#556677" }}>Based on last 7 days of transactions</div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,184,0,0.04)", border: "1px solid rgba(255,184,0,0.15)" }}>
              <div className="text-xs font-mono mb-3" style={{ color: "#FFB800" }}>50M USER SCALING TRAJECTORY</div>
              <div className="space-y-3">
                {[
                  { phase: "South Jersey", users: "10K", revenue: "$1.44M", status: "active" },
                  { phase: "Philadelphia", users: "100K", revenue: "$14.4M", status: "upcoming" },
                  { phase: "East Coast", users: "1M", revenue: "$144M", status: "upcoming" },
                  { phase: "National", users: "10M", revenue: "$1.44B", status: "upcoming" },
                  { phase: "Global 50M", users: "50M", revenue: "$7.2B", status: "upcoming" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl"
                    style={{ background: p.status === "active" ? "rgba(0,255,136,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${p.status === "active" ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.05)"}` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: p.status === "active" ? "#00FF88" : "#556677" }} />
                    <div className="flex-1">
                      <div className="text-sm font-bold" style={{ color: p.status === "active" ? "#00FF88" : "white" }}>{p.phase}</div>
                      <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{p.users} users</div>
                    </div>
                    <div className="text-sm font-bold" style={{ color: "#FFB800" }}>{p.revenue}</div>
                    <div className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: p.status === "active" ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.05)", color: p.status === "active" ? "#00FF88" : "#556677" }}>
                      {p.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
