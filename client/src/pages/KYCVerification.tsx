/**
 * ScrollVerse Trinity — /kyc
 * KYC / AML Identity Verification for Sovereign and Ascendant tier purchases.
 * Phase 38 — Compliance
 */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const ACCENT = "#00D4FF";
const GREEN = "#00FF88";
const AMBER = "#FFB800";
const BG = "#050B1A";
const CARD = "rgba(0,212,255,0.04)";
const BORDER = "rgba(0,212,255,0.15)";

const DOCUMENT_TYPES = [
  { value: "passport", label: "Passport", icon: "🛂" },
  { value: "drivers_license", label: "Driver's License", icon: "🪪" },
  { value: "national_id", label: "National ID Card", icon: "🆔" },
  { value: "residence_permit", label: "Residence Permit", icon: "📋" },
] as const;

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
  "Netherlands", "Sweden", "Norway", "Denmark", "Switzerland", "Japan", "South Korea",
  "Singapore", "Nigeria", "South Africa", "Ghana", "Kenya", "Brazil", "Mexico",
  "Argentina", "Colombia", "India", "Pakistan", "Bangladesh", "Indonesia", "Malaysia",
  "Philippines", "Thailand", "Vietnam", "Egypt", "Morocco", "Saudi Arabia", "UAE",
  "Turkey", "Israel", "New Zealand", "Ireland", "Belgium", "Austria", "Spain", "Italy",
  "Portugal", "Poland", "Czech Republic", "Hungary", "Romania", "Greece", "Other",
];

export default function KYCVerification() {
  const { user, loading, isAuthenticated } = useAuth();
  const [step, setStep] = useState<"intro" | "form" | "submitted">("intro");
  const [formData, setFormData] = useState({
    documentType: "passport" as "passport" | "drivers_license" | "national_id" | "residence_permit",
    fullName: "",
    dateOfBirth: "",
    country: "United States",
    documentNumber: "",
  });
  const [error, setError] = useState("");

  const { data: kycStatus, isLoading: kycLoading } = trpc.kyc.getStatus.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const submitMutation = trpc.kyc.submitVerification.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setStep("submitted");
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.fullName.trim()) { setError("Full name is required"); return; }
    if (!formData.dateOfBirth) { setError("Date of birth is required"); return; }
    if (!formData.documentNumber.trim()) { setError("Document number is required"); return; }
    submitMutation.mutate(formData);
  };

  if (loading || kycLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: ACCENT }} />
          <div className="text-sm" style={{ color: "#8899AA" }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-2xl font-black text-white mb-3">Login Required</h2>
          <p className="text-sm mb-6" style={{ color: "#8899AA" }}>
            You must be logged in to complete KYC verification.
          </p>
          <a
            href={getLoginUrl()}
            className="inline-block px-6 py-3 rounded-xl font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00D4FF, #0088AA)", color: "#050B1A" }}
          >
            Login to Continue
          </a>
        </div>
      </div>
    );
  }

  // Already approved
  if (kycStatus?.status === "approved") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-black text-white mb-3">KYC Approved</h2>
          <p className="text-sm mb-2" style={{ color: GREEN }}>
            Your identity has been verified. You have full access to all Guardian tiers.
          </p>
          <p className="text-xs mb-6" style={{ color: "#8899AA" }}>
            Verified: {kycStatus.verifiedAt ? new Date(kycStatus.verifiedAt).toLocaleDateString() : "—"}
          </p>
          <Link href="/mint">
            <span
              className="inline-block px-6 py-3 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #00FF88, #00AA55)", color: "#050B1A" }}
            >
              Mint Your Book of Life NFT →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // Pending review
  if (kycStatus?.status === "pending" && step !== "submitted") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-black text-white mb-3">Under Review</h2>
          <p className="text-sm mb-2" style={{ color: AMBER }}>
            Your KYC verification is currently under review.
          </p>
          <p className="text-xs mb-6" style={{ color: "#8899AA" }}>
            You will be notified within 24-48 hours. Submitted: {new Date(kycStatus.createdAt).toLocaleDateString()}
          </p>
          <Link href="/">
            <span className="text-sm cursor-pointer" style={{ color: ACCENT }}>← Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "rgba(5,11,26,0.95)", backdropFilter: "blur(20px)", borderColor: BORDER }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)", color: BG }}
              >
                SV
              </div>
              <span className="font-bold text-white">ScrollVerse</span>
            </div>
          </Link>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,212,255,0.1)", color: ACCENT, border: `1px solid rgba(0,212,255,0.3)` }}>
            KYC / AML COMPLIANCE
          </div>
        </div>
      </nav>

      <div className="container pt-28 pb-16 max-w-2xl">
        {step === "intro" && (
          <>
            {/* Hero */}
            <div className="text-center mb-10">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: ACCENT }}>
                IDENTITY VERIFICATION
              </div>
              <h1 className="text-4xl font-black text-white mb-4">
                Sovereign KYC Portal
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "#8899AA" }}>
                To access Sovereign and Ascendant tier benefits, we are required to verify your identity
                in compliance with AML/KYC regulations. This is a one-time process.
              </p>
            </div>

            {/* Why KYC */}
            <div
              className="rounded-xl p-6 border mb-8"
              style={{ background: CARD, borderColor: BORDER }}
            >
              <h3 className="font-bold text-white mb-4">Why is KYC required?</h3>
              <div className="space-y-3">
                {[
                  { icon: "🏛️", text: "Regulatory compliance with AML/KYC laws in your jurisdiction" },
                  { icon: "🛡️", text: "Protects the Guardian network from fraudulent activity" },
                  { icon: "💎", text: "Required for Sovereign ($444+) and Ascendant ($1,444+) tier access" },
                  { icon: "🔒", text: "Your data is encrypted and never shared with third parties" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="text-sm" style={{ color: "#8899AA" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rejected reason if any */}
            {kycStatus?.status === "rejected" && (
              <div
                className="rounded-xl p-4 border mb-6"
                style={{ background: "rgba(255,68,68,0.05)", borderColor: "rgba(255,68,68,0.3)" }}
              >
                <div className="text-sm font-bold mb-1" style={{ color: "#FF4444" }}>Previous submission rejected</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>
                  Reason: {kycStatus.rejectedReason ?? "Please resubmit with valid documentation."}
                </div>
              </div>
            )}

            <button
              onClick={() => setStep("form")}
              className="w-full py-4 rounded-xl font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088AA)", color: BG }}
            >
              Begin Verification →
            </button>
          </>
        )}

        {step === "form" && (
          <>
            <div className="text-center mb-8">
              <div className="text-xs font-mono tracking-widest mb-3" style={{ color: ACCENT }}>
                STEP 1 OF 1 — DOCUMENT DETAILS
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Identity Document</h2>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                All information must match your official government-issued document exactly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Document Type */}
              <div>
                <label className="block text-sm font-bold mb-3 text-white">Document Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {DOCUMENT_TYPES.map(dt => (
                    <button
                      key={dt.value}
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, documentType: dt.value }))}
                      className="p-3 rounded-xl border text-left transition-all"
                      style={{
                        background: formData.documentType === dt.value ? `${ACCENT}15` : CARD,
                        borderColor: formData.documentType === dt.value ? ACCENT : BORDER,
                      }}
                    >
                      <div className="text-xl mb-1">{dt.icon}</div>
                      <div className="text-xs font-bold" style={{ color: formData.documentType === dt.value ? ACCENT : "white" }}>
                        {dt.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold mb-2 text-white">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData(f => ({ ...f, fullName: e.target.value }))}
                  placeholder="As it appears on your document"
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "white" }}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-bold mb-2 text-white">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={e => setFormData(f => ({ ...f, dateOfBirth: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "white" }}
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-bold mb-2 text-white">Country of Issue</label>
                <select
                  value={formData.country}
                  onChange={e => setFormData(f => ({ ...f, country: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                  style={{ background: "#0A1628", border: `1px solid ${BORDER}`, color: "white" }}
                >
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Document Number */}
              <div>
                <label className="block text-sm font-bold mb-2 text-white">Document Number</label>
                <input
                  type="text"
                  value={formData.documentNumber}
                  onChange={e => setFormData(f => ({ ...f, documentNumber: e.target.value }))}
                  placeholder="Passport / License / ID number"
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm font-mono"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "white" }}
                  required
                />
              </div>

              {/* Privacy notice */}
              <div
                className="rounded-xl p-4 border text-xs"
                style={{ background: "rgba(0,212,255,0.03)", borderColor: "rgba(0,212,255,0.2)", color: "#8899AA" }}
              >
                🔒 Your information is encrypted with AES-256 and stored securely. We do not share your data with any third parties. This information is used solely for identity verification purposes.
              </div>

              {error && (
                <div className="text-sm p-3 rounded-xl" style={{ background: "rgba(255,68,68,0.1)", color: "#FF4444", border: "1px solid rgba(255,68,68,0.3)" }}>
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("intro")}
                  className="flex-1 py-3 rounded-xl font-bold text-sm border"
                  style={{ borderColor: BORDER, color: "#8899AA", background: "transparent" }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="flex-1 py-3 rounded-xl font-bold text-sm"
                  style={{
                    background: submitMutation.isPending ? "#1a2a3a" : "linear-gradient(135deg, #00D4FF, #0088AA)",
                    color: submitMutation.isPending ? "#8899AA" : BG,
                  }}
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Verification →"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === "submitted" && (
          <div className="text-center">
            <div className="text-6xl mb-6">🕋</div>
            <h2 className="text-3xl font-black text-white mb-4">Verification Submitted</h2>
            <div
              className="rounded-xl p-6 border mb-8"
              style={{ background: `${GREEN}08`, borderColor: `${GREEN}30` }}
            >
              <div className="text-lg font-bold mb-2" style={{ color: GREEN }}>
                ✓ KYC Submitted Successfully
              </div>
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Your identity verification has been submitted and is under review. You will receive
                a notification within 24-48 hours. Once approved, you will have full access to
                Sovereign and Ascendant tier benefits.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Link href="/">
                <span
                  className="inline-block px-6 py-3 rounded-xl font-bold text-sm cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #0088AA)", color: BG }}
                >
                  Return Home
                </span>
              </Link>
              <Link href="/mint">
                <span
                  className="inline-block px-6 py-3 rounded-xl font-bold text-sm cursor-pointer border"
                  style={{ borderColor: BORDER, color: "#8899AA", background: "transparent" }}
                >
                  View NFT Mint
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
