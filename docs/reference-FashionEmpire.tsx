import { Palette, Star, Crown, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function FashionEmpire() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="container max-w-4xl text-center">
          <Palette className="w-16 h-16 mx-auto mb-4" style={{ color: "#EC4899" }} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Fashion Empire</h1>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">Sovereign fashion meets consciousness. Every piece a statement. Every collection a universe.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "XLVblocks Collection", desc: "7-piece Atlantis-inspired collection. Orichalcum threads. Temple of Poseidon aesthetics.", color: "#FFB800" },
              { title: "MEIN Universe", desc: "Streetwear meets sovereignty. OVO-inspired drops. Limited editions.", color: "#00D4FF" },
              { title: "Sovereign Couture", desc: "High fashion for the conscious. Every stitch carries frequency.", color: "#A855F7" },
              { title: "Guardian Gear", desc: "Functional fashion for empire builders. Tech-integrated wearables.", color: "#00FF88" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/50 bg-card/30 text-left hover:border-primary/20 transition-all">
                <div className="w-3 h-3 rounded-full mb-3" style={{ background: item.color }} />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

