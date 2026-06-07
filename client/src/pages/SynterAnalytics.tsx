/**
 * Synter Ads Analytics Dashboard
 * Campaign performance, conversion tracking, Guardian lead funnel
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BarChart3, Target, TrendingUp, Zap, Users, DollarSign, Eye, MousePointer } from "lucide-react";

export default function SynterAnalytics() {
  const { user } = useAuth();

  const [campaignId, setCampaignId] = useState("");
  const [testEmail, setTestEmail] = useState("");

  const statsQuery = trpc.synter.getCampaignStats.useQuery(
    { campaignId: campaignId || undefined },
    { enabled: !!user, retry: false }
  );

  const trackEventMutation = trpc.synter.trackEvent.useMutation({
    onSuccess: () => toast.success("Event tracked — Synter event recorded successfully"),
    onError: () => toast.error("Tracking failed — check your Synter API key in Settings → Secrets"),
  });

  const submitLeadMutation = trpc.synter.submitGuardianLead.useMutation({
    onSuccess: () => {
      toast.success("Lead submitted — Guardian lead sent to Synter retargeting pool");
      setTestEmail("");
    },
    onError: () => toast.error("Lead submission failed — check Synter API configuration"),
  });

  const stats = statsQuery.data?.stats;

  const statCards = [
    { label: "Impressions", value: stats?.impressions?.toLocaleString() ?? "—", icon: Eye, color: "#00D4FF" },
    { label: "Clicks", value: stats?.clicks?.toLocaleString() ?? "—", icon: MousePointer, color: "#FFB800" },
    { label: "Conversions", value: stats?.conversions?.toLocaleString() ?? "—", icon: Target, color: "#00FF88" },
    { label: "Ad Spend", value: stats ? `$${stats.spend.toFixed(2)}` : "—", icon: DollarSign, color: "#FF6B35" },
    { label: "ROAS", value: stats ? `${stats.roas.toFixed(2)}x` : "—", icon: TrendingUp, color: "#9B59B6" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050B1A", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "rgba(0,212,255,0.15)", background: "rgba(0,212,255,0.03)" }}>
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00D4FF, #FFB800)" }}>
              <BarChart3 className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Synter Ads Analytics</h1>
              <p className="text-sm" style={{ color: "#8899AA" }}>Campaign performance · Guardian lead funnel · Conversion tracking</p>
            </div>
            <Badge className="ml-auto" style={{ background: "rgba(0,255,136,0.1)", color: "#00FF88", border: "1px solid rgba(0,255,136,0.3)" }}>
              MCP CONNECTED
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Campaign Stats */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-white">Campaign Performance</h2>
            <div className="flex gap-2 ml-auto">
              <Input
                placeholder="Campaign ID (optional)"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="w-48 text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,212,255,0.2)", color: "white" }}
              />
              <Button
                size="sm"
                onClick={() => statsQuery.refetch()}
                disabled={statsQuery.isFetching}
                style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              >
                {statsQuery.isFetching ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </div>

          {!user && (
            <div className="rounded-xl p-6 text-center" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.2)" }}>
              <p className="text-sm" style={{ color: "#FFB800" }}>Sign in to view campaign analytics</p>
            </div>
          )}

          {user && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {statCards.map((card) => (
                <Card key={card.label} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${card.color}20` }}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <card.icon className="w-4 h-4" style={{ color: card.color }} />
                      <span className="text-xs" style={{ color: "#8899AA" }}>{card.label}</span>
                    </div>
                    <div className="text-xl font-bold" style={{ color: card.color, fontFamily: "'Space Mono', monospace" }}>
                      {card.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {statsQuery.isError && (
            <div className="rounded-xl p-4 mt-4" style={{ background: "rgba(255,68,68,0.05)", border: "1px solid rgba(255,68,68,0.2)" }}>
              <p className="text-sm" style={{ color: "#FF4444" }}>
                Could not fetch Synter stats. Ensure your SYNTER_API_KEY is set in Settings → Secrets.
              </p>
            </div>
          )}
        </div>

        {/* Guardian Lead Submission */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.15)" }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" style={{ color: "#00FF88" }} />
                Submit Guardian Lead
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Submit a Guardian email to the Synter retargeting pool for campaign targeting.
              </p>
              <Input
                type="email"
                placeholder="guardian@scrollverse.co"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,136,0.2)", color: "white" }}
              />
              <Button
                className="w-full"
                onClick={() => submitLeadMutation.mutate({ email: testEmail, tier: "GUARDIAN" })}
                disabled={!testEmail || submitLeadMutation.isPending}
                style={{ background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}
              >
                {submitLeadMutation.isPending ? "Submitting..." : "Submit to Synter Pool"}
              </Button>
            </CardContent>
          </Card>

          <Card style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)" }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: "#00D4FF" }} />
                Track Custom Event
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm" style={{ color: "#8899AA" }}>
                Fire a custom Synter tracking event for testing or manual conversion recording.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["page_view", "guardian_signup", "token_purchase"].map((evt) => (
                  <Button
                    key={evt}
                    size="sm"
                    onClick={() => trackEventMutation.mutate({ event: evt, page: "/test" })}
                    disabled={trackEventMutation.isPending}
                    style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF", fontSize: "10px" }}
                  >
                    {evt.replace("_", " ")}
                  </Button>
                ))}
              </div>
              <p className="text-xs" style={{ color: "#8899AA" }}>
                Events are sent to <code style={{ color: "#00D4FF" }}>mcp.syntermedia.ai/track</code> with your SYNTER_API_KEY.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Guide */}
        <Card style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <CardHeader>
            <CardTitle className="text-white">Synter MCP Integration Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: "1", title: "API Key Set", desc: "SYNTER_API_KEY stored in Settings → Secrets. All calls are server-side only.", status: "complete" },
                { step: "2", title: "MCP Endpoint", desc: "Connected to https://mcp.syntermedia.ai with X-Synter-Key + Bearer token headers.", status: "complete" },
                { step: "3", title: "Campaign Builder", desc: "Visit syntermedia.ai/campaigns to create Guardian-targeted ad campaigns.", status: "action" },
              ].map((item) => (
                <div key={item.step} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${item.status === "complete" ? "rgba(0,255,136,0.2)" : "rgba(255,184,0,0.2)"}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: item.status === "complete" ? "rgba(0,255,136,0.15)" : "rgba(255,184,0,0.15)", color: item.status === "complete" ? "#00FF88" : "#FFB800" }}>
                      {item.status === "complete" ? "✓" : item.step}
                    </div>
                    <span className="text-sm font-bold text-white">{item.title}</span>
                  </div>
                  <p className="text-xs" style={{ color: "#8899AA" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,212,255,0.1)" }}>
              <p className="text-xs font-mono" style={{ color: "#00D4FF" }}>
                Campaign Builder URL: https://syntermedia.ai/campaigns/ide/c49cb26c-9057-4b87-850a-a7d0f2e3558f?agent=dc22deb1-ec4a-4d07-81bf-b2b902d8bd29
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
