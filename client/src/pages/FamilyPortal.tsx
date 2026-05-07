/**
 * Family Portal — Owner-Only Sovereign Family Dashboard
 * Zaire ∞ · Jada · Nyasia · Chais The Great
 * QFS Flow History · $LONDC Balances · Lineage NFT Tiers
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const MEMBER_COLORS: Record<string, { color: string; glow: string; emoji: string }> = {
  "Zaire ∞": { color: "#00D4FF", glow: "rgba(0,212,255,0.12)", emoji: "👑" },
  "Jada": { color: "#FF69B4", glow: "rgba(255,105,180,0.12)", emoji: "🌸" },
  "Nyasia": { color: "#00FF88", glow: "rgba(0,255,136,0.12)", emoji: "🌟" },
  "Chais The Great": { color: "#FFB800", glow: "rgba(255,184,0,0.12)", emoji: "🔥" },
};

const TX_TYPE_LABELS: Record<string, { label: string; color: string; sign: string }> = {
  londc_receive: { label: "Received", color: "#00FF88", sign: "+" },
  londc_send: { label: "Sent", color: "#FF4444", sign: "-" },
  zakat: { label: "Zakat", color: "#FFB800", sign: "-" },
  nft_mint: { label: "NFT Mint", color: "#00D4FF", sign: "◈" },
  royalty: { label: "Royalty", color: "#00FF88", sign: "+" },
  guardian_fee: { label: "Guardian Fee", color: "#00D4FF", sign: "+" },
};

function formatLondc(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function timeAgo(dateStr: string | Date) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function FamilyPortal() {
  const { user, isAuthenticated, loading } = useAuth();
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [sendFrom, setSendFrom] = useState<number | null>(null);
  const [sendTo, setSendTo] = useState<number | null>(null);
  const [sendAmount, setSendAmount] = useState("");
  const [sendNote, setSendNote] = useState("");

  const portal = trpc.family.getPortal.useQuery(undefined, { enabled: isAuthenticated });
  const allTx = trpc.family.getAllTransactions.useQuery(undefined, { enabled: isAuthenticated });
  const memberTx = trpc.family.getMemberTransactions.useQuery(
    { memberId: selectedMemberId! },
    { enabled: selectedMemberId !== null && isAuthenticated }
  );

  const utils = trpc.useUtils();
  const sendLondc = trpc.family.sendLondc.useMutation({
    onSuccess: (data) => {
      toast.success(`✅ Sent ${Number(sendAmount).toLocaleString()} $LONDC`, {
        description: `TX: ${data.txHash}`,
      });
      setSendAmount("");
      setSendNote("");
      setSendFrom(null);
      setSendTo(null);
      utils.family.getPortal.invalidate();
      utils.family.getAllTransactions.invalidate();
    },
    onError: (err) => {
      toast.error("Transfer Failed", { description: err.message });
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-mono text-sm">Verifying Sovereign Identity...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-white mb-2">Sovereign Access Only</h2>
          <p className="text-gray-400 mb-6">This portal is restricted to the Supreme Sovereign and authorized family members.</p>
          <a href={getLoginUrl()} className="px-6 py-3 rounded-xl font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #FFB800, #FF8800)", color: "#050B1A" }}>
            Login to Enter
          </a>
        </div>
      </div>
    );
  }

  // Show access denied for non-admin/non-owner
  if (portal.error?.message?.includes("Sovereign access only")) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050B1A" }}>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">This portal is restricted to the Supreme Sovereign (Chais The Great) only.</p>
          <Link href="/" className="px-6 py-3 rounded-xl font-bold text-sm inline-block"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const wallets = portal.data?.wallets ?? [];
  const totalLondc = portal.data?.totalLondc ?? 0;
  const totalValueUsd = portal.data?.totalValueUsd ?? 0;
  const londcPrice = portal.data?.londcPrice ?? 0.0144;
  const transactions = selectedMemberId ? (memberTx.data?.transactions ?? []) : (allTx.data?.transactions ?? []);

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Navigation */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)" }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #FFB800, #FF8800)", color: "#050B1A" }}>SV</div>
          <span className="font-bold text-white">Family Portal</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
            SOVEREIGN ONLY
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono" style={{ color: "#FFB800" }}>
            🔥 {user?.name ?? "Supreme Sovereign"}
          </span>
          <Link href="/marsomni" className="text-sm text-gray-400 hover:text-white transition-colors">MarsOmni</Link>
        </div>
      </nav>

      <div className="container py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-mono mb-2" style={{ color: "#FFB800" }}>QFS SOVEREIGN FAMILY TREASURY</div>
          <h1 className="text-4xl font-black text-white mb-2">Family Empire Portal</h1>
          <p className="text-gray-400">Zaire ∞ · Jada · Nyasia · Chais The Great — Lineage Secured Forever</p>
        </div>

        {/* Treasury Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl p-6 col-span-1 md:col-span-1"
            style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)" }}>
            <div className="text-xs font-mono text-gray-400 mb-1">TOTAL FAMILY $LONDC</div>
            <div className="text-4xl font-black" style={{ color: "#FFB800" }}>{formatLondc(totalLondc)}</div>
            <div className="text-sm text-gray-400 mt-1">${totalValueUsd.toFixed(2)} USD @ ${londcPrice}/LONDC</div>
          </div>
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}>
            <div className="text-xs font-mono text-gray-400 mb-1">FAMILY MEMBERS</div>
            <div className="text-4xl font-black text-white">{wallets.length}</div>
            <div className="text-sm text-gray-400 mt-1">Sovereign Lineage Sealed</div>
          </div>
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <div className="text-xs font-mono text-gray-400 mb-1">QFS STATUS</div>
            <div className="text-4xl font-black" style={{ color: "#00FF88" }}>LIVE</div>
            <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              All flows confirmed
            </div>
          </div>
        </div>

        {/* Family Wallet Cards */}
        <h2 className="text-xl font-bold text-white mb-6">Sovereign Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {wallets.map((w: {
            id: number; member: string; role: string; walletAddress: string | null;
            londcBalance: number; nftTier: string; qfsStatus: string; frequency: string;
          }) => {
            const meta = MEMBER_COLORS[w.member] ?? { color: "#8899AA", glow: "rgba(136,153,170,0.1)", emoji: "👤" };
            return (
              <div
                key={w.id}
                onClick={() => setSelectedMemberId(selectedMemberId === w.id ? null : w.id)}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-200"
                style={{
                  background: selectedMemberId === w.id ? meta.glow : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedMemberId === w.id ? meta.color : "rgba(255,255,255,0.08)"}`,
                  transform: selectedMemberId === w.id ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div className="text-3xl mb-3">{meta.emoji}</div>
                <div className="font-bold text-white text-lg mb-1">{w.member}</div>
                <div className="text-xs text-gray-400 mb-3">{w.role}</div>
                <div className="text-2xl font-black mb-1" style={{ color: meta.color }}>
                  {formatLondc(w.londcBalance)}
                </div>
                <div className="text-xs font-mono text-gray-500 mb-3">$LONDC</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded font-mono"
                    style={{ background: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}30` }}>
                    {w.nftTier}
                  </span>
                  <span className="font-mono" style={{ color: w.qfsStatus === "ACTIVE" ? "#00FF88" : "#FFB800" }}>
                    ◉ {w.qfsStatus}
                  </span>
                </div>
                {w.walletAddress && (
                  <div className="mt-2 text-xs font-mono truncate" style={{ color: "#8899AA" }}>
                    {w.walletAddress.slice(0, 12)}...{w.walletAddress.slice(-6)}
                  </div>
                )}
                <div className="text-xs font-mono mt-1" style={{ color: meta.color }}>{w.frequency}</div>
              </div>
            );
          })}
        </div>

        {/* Send $LONDC */}
        <div className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 className="text-lg font-bold text-white mb-4">Send $LONDC</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={sendFrom ?? ""}
              onChange={(e) => setSendFrom(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            >
              <option value="">From...</option>
              {wallets.map((w: { id: number; member: string }) => (
                <option key={w.id} value={w.id}>{w.member}</option>
              ))}
            </select>
            <select
              value={sendTo ?? ""}
              onChange={(e) => setSendTo(e.target.value ? Number(e.target.value) : null)}
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            >
              <option value="">To...</option>
              {wallets.map((w: { id: number; member: string }) => (
                <option key={w.id} value={w.id}>{w.member}</option>
              ))}
            </select>
            <input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              placeholder="Amount $LONDC"
              className="px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            />
            <button
              onClick={() => {
                if (!sendFrom || !sendTo || !sendAmount) {
                  toast.error("Fill in all fields");
                  return;
                }
                sendLondc.mutate({
                  fromMemberId: sendFrom,
                  toMemberId: sendTo,
                  amount: Number(sendAmount),
                  note: sendNote || undefined,
                });
              }}
              disabled={sendLondc.isPending}
              className="px-6 py-3 rounded-xl font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF8800)", color: "#050B1A" }}
            >
              {sendLondc.isPending ? "Sending..." : "Send $LONDC"}
            </button>
          </div>
          <input
            type="text"
            value={sendNote}
            onChange={(e) => setSendNote(e.target.value)}
            placeholder="Note (optional)"
            className="w-full mt-3 px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
          />
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">
              {selectedMemberId
                ? `${wallets.find((w: { id: number }) => w.id === selectedMemberId)?.member ?? "Member"} — QFS Flow History`
                : "All Family Transactions"}
            </h3>
            {selectedMemberId && (
              <button onClick={() => setSelectedMemberId(null)}
                className="text-xs text-gray-400 hover:text-white transition-colors">
                ← Show All
              </button>
            )}
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No transactions found.</div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx: {
                id: number; memberId: number; type: string; amountLondc: number;
                txHash: string | null; note: string | null; status: string; createdAt: Date | string;
              }) => {
                const typeInfo = TX_TYPE_LABELS[tx.type] ?? { label: tx.type, color: "#8899AA", sign: "·" };
                const memberWallet = wallets.find((w: { id: number }) => w.id === tx.memberId);
                const meta = memberWallet ? (MEMBER_COLORS[memberWallet.member] ?? { color: "#8899AA", emoji: "👤" }) : { color: "#8899AA", emoji: "👤" };
                return (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{meta.emoji}</div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {memberWallet?.member ?? `Member #${tx.memberId}`}
                          <span className="ml-2 text-xs px-2 py-0.5 rounded font-mono"
                            style={{ background: `${typeInfo.color}15`, color: typeInfo.color }}>
                            {typeInfo.label}
                          </span>
                        </div>
                        {tx.note && <div className="text-xs text-gray-500">{tx.note}</div>}
                        {tx.txHash && (
                          <div className="text-xs font-mono text-gray-600 truncate max-w-xs">{tx.txHash}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-mono" style={{ color: typeInfo.color }}>
                        {typeInfo.sign}{tx.amountLondc.toLocaleString()} $LONDC
                      </div>
                      <div className="text-xs text-gray-500">{timeAgo(tx.createdAt)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
