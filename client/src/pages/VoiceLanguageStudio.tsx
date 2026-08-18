import { useEffect, useMemo, useState } from "react";
import { Globe2, HeartHandshake, Mic2, ShieldCheck, Sparkles, Square, Subtitles, Volume2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

const languageChoices = [
  { code: "en-US", label: "English (United States)" },
  { code: "es-ES", label: "Español" },
  { code: "fr-FR", label: "Français" },
  { code: "ar-SA", label: "العربية" },
  { code: "pt-BR", label: "Português (Brasil)" },
  { code: "hi-IN", label: "हिन्दी" },
  { code: "ja-JP", label: "日本語" },
  { code: "ko-KR", label: "한국어" },
];

const voiceProfiles = [
  { id: "warm-storyteller", label: "Warm Storyteller", tag: "Inviting · grounded · cinematic", rate: 0.9, pitch: 0.98, color: "#FFB800", description: "A calm, spacious delivery for books, family stories, and reflective introductions. Use natural pauses and let key lines land." },
  { id: "cool-host", label: "Cool Host", tag: "Confident · smooth · professional", rate: 0.98, pitch: 1, color: "#00D4FF", description: "A polished conversational delivery for media updates, interviews, and creator-world introductions. Keep energy present without rushing." },
  { id: "clear-guide", label: "Clear Guide", tag: "Precise · accessible · reassuring", rate: 0.92, pitch: 0.96, color: "#00FF88", description: "An easy-on-the-ear delivery for instructions, learning routes, and accessibility information. Prioritize clarity over performance." },
  { id: "playful-spark", label: "Playful Spark", tag: "Bright · funny · expressive", rate: 1, pitch: 1.08, color: "#FF6B9A", description: "A lively, good-humored delivery for youth-safe moments, creative prompts, and welcoming transitions. Keep humor kind and script-led." },
] as const;

type DeviceVoice = SpeechSynthesisVoice;
type VoiceProfileId = (typeof voiceProfiles)[number]["id"];

export default function VoiceLanguageStudio() {
  useSovereignHeartbeat({ page: "voice-language-studio" });
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<DeviceVoice[]>([]);
  const [language, setLanguage] = useState("en-US");
  const [voiceUri, setVoiceUri] = useState("");
  const [profileId, setProfileId] = useState<VoiceProfileId>("warm-storyteller");
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(0.98);
  const [speaking, setSpeaking] = useState(false);
  const [text, setText] = useState("Welcome to ScrollVerse. Take your time, follow the stories that speak to you, and make this world your own.");

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const updateVoices = () => setVoices(window.speechSynthesis.getVoices());
    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
  }, []);

  const matchingVoices = useMemo(() => {
    const base = language.split("-")[0].toLowerCase();
    const exact = voices.filter((voice) => voice.lang.toLowerCase().startsWith(base));
    return exact.length ? exact : voices;
  }, [language, voices]);

  const activeProfile = useMemo(() => voiceProfiles.find((profile) => profile.id === profileId) ?? voiceProfiles[0], [profileId]);

  useEffect(() => {
    if (!matchingVoices.some((voice) => voice.voiceURI === voiceUri)) setVoiceUri(matchingVoices[0]?.voiceURI ?? "");
  }, [matchingVoices, voiceUri]);

  const chooseProfile = (id: VoiceProfileId) => {
    const profile = voiceProfiles.find((option) => option.id === id) ?? voiceProfiles[0];
    setProfileId(profile.id);
    setRate(profile.rate);
    setPitch(profile.pitch);
    toast.success(`${profile.label} direction applied to this browser-local preview.`);
  };

  const speak = () => {
    if (!supported) { toast.error("Speech synthesis is unavailable in this browser or device."); return; }
    if (!text.trim()) { toast.error("Add text before starting playback."); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    const selected = voices.find((voice) => voice.voiceURI === voiceUri);
    if (selected) utterance.voice = selected;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => { setSpeaking(false); toast.error("The device voice could not read this text."); };
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => { window.speechSynthesis?.cancel(); setSpeaking(false); };

  return (
    <main className="min-h-screen bg-[#050B1A] px-4 py-10 text-white sm:px-6 lg:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/open-knowledge-verse" className="text-sm font-black text-[#00D4FF]">← Open Knowledge Verse</Link><div className="flex flex-wrap gap-3"><Link href="/media-readiness-lab" className="rounded-lg border border-[#00D4FF]/50 px-3 py-2 text-xs font-black text-[#9AEFFF]">Media readiness →</Link><Link href="/manifesto-builders-book" className="rounded-lg border border-[#FFB800]/50 px-3 py-2 text-xs font-black text-[#FFCC4D]">Free reading route →</Link></div></div>

        <header className="mt-7 rounded-[2rem] border border-[#7CE7FF]/35 p-8 sm:p-10" style={{ background: "radial-gradient(circle at 92% 12%, rgba(124,231,255,.18), transparent 34%), radial-gradient(circle at 12% 90%, rgba(185,140,255,.16), transparent 38%), #071124" }}>
          <div className="flex items-center gap-2 text-xs font-mono tracking-[.18em] text-[#7CE7FF]"><Globe2 className="h-4 w-4" />LANGUAGE CHOICE · HUMAN-FORWARD DELIVERY · TRANSCRIPT · MUTE</div>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">Voice & Language Studio</h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">Choose an available device voice, language, and delivery direction to hear an accessible text preview. The studio favors natural pacing, clear phrasing, expressive warmth, and optional humor instead of a flat robotic cadence. Playback begins only after your action, and the visible text remains the transcript.</p>
        </header>

        <PortalTrustLens lane="Multilingual human-forward voice preparation" source="Browser/device speech synthesis where available; ScrollVerse voice direction standard; protected owner-voice readiness record." readiness="Device voices can be previewed when the browser exposes them. Delivery profiles adjust browser-local rate and pitch only; no generated custom voice is active on this route." boundary="Voice inventory and quality depend on the visitor’s device/browser. This route does not upload text, train a voice, clone a person, imitate a specific person’s laugh or emotional signature, translate text, or represent synthetic speech as live human speech." />

        <section className="mt-8 rounded-3xl border border-[#FF6B9A]/30 bg-[#FF6B9A]/[.045] p-6 sm:p-8"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#FF9EB9]"><Sparkles className="h-4 w-4" />HUMAN-FORWARD DELIVERY DIRECTIONS</div><h2 className="mt-3 text-2xl font-black">Choose a feeling, not a real person to imitate.</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#D6E2EE]">These directions work with whichever device voice a visitor chooses. They use original performance descriptions—pacing, warmth, clarity, and energy—rather than copying a public figure, creator, or other person.</p><div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4" role="group" aria-label="Select a voice delivery direction">{voiceProfiles.map((profile) => <button key={profile.id} type="button" aria-pressed={profileId === profile.id} onClick={() => chooseProfile(profile.id)} className="rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CE7FF]" style={{ borderColor: profileId === profile.id ? profile.color : "rgba(255,255,255,.13)", background: profileId === profile.id ? `${profile.color}16` : "rgba(0,0,0,.14)" }}><p className="font-black" style={{ color: profile.color }}>{profile.label}</p><p className="mt-1 text-[11px] text-[#B8C7D6]">{profile.tag}</p><p className="mt-3 text-xs leading-6 text-[#D6E2EE]">{profile.description}</p></button>)}</div></section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:p-8"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#00D4FF]"><Volume2 className="h-4 w-4" />VISITOR-CONTROLLED DEVICE PREVIEW</div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">LANGUAGE<select value={language} onChange={(event) => setLanguage(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#061226] px-3 py-3 text-sm font-bold text-white outline-none">{languageChoices.map((choice) => <option className="bg-[#061226]" key={choice.code} value={choice.code}>{choice.label}</option>)}</select></label><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">AVAILABLE DEVICE VOICE<select value={voiceUri} onChange={(event) => setVoiceUri(event.target.value)} disabled={!supported || !matchingVoices.length} className="mt-2 w-full rounded-xl border border-white/10 bg-[#061226] px-3 py-3 text-sm font-bold text-white outline-none disabled:opacity-50">{matchingVoices.length ? matchingVoices.map((voice) => <option className="bg-[#061226]" key={voice.voiceURI} value={voice.voiceURI}>{voice.name} · {voice.lang}</option>) : <option>No device voice available</option>}</select></label></div><div className="mt-5 rounded-2xl border border-white/10 bg-[#061226] p-4"><p className="text-xs font-mono" style={{ color: activeProfile.color }}>ACTIVE DELIVERY · {activeProfile.label.toUpperCase()}</p><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{activeProfile.description}</p></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">PACE <span className="text-[#7CE7FF]">{rate.toFixed(1)}×</span><input aria-label="Speech rate" type="range" min="0.7" max="1.2" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} className="mt-3 w-full accent-[#7CE7FF]" /></label><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">PITCH <span className="text-[#7CE7FF]">{pitch.toFixed(1)}</span><input aria-label="Speech pitch" type="range" min="0.8" max="1.2" step="0.1" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} className="mt-3 w-full accent-[#7CE7FF]" /></label></div><label className="mt-5 block text-xs font-mono tracking-[.12em] text-[#A7BACD]" htmlFor="voice-preview-text">VISIBLE TRANSCRIPT / TEXT TO READ</label><textarea id="voice-preview-text" value={text} onChange={(event) => setText(event.target.value)} rows={7} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-[#061226] p-4 text-sm leading-7 text-white outline-none focus:border-[#7CE7FF]/70" /><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={speak} disabled={!supported || speaking} className="inline-flex items-center gap-2 rounded-xl bg-[#7CE7FF] px-4 py-3 text-xs font-black text-[#04101C] transition hover:brightness-110 disabled:opacity-50"><Volume2 className="h-4 w-4" />{speaking ? "Reading…" : "Play selected device voice"}</button><button type="button" onClick={stop} disabled={!speaking} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-xs font-black text-white transition hover:border-[#FF6B9A] hover:text-[#FF9EB9] disabled:opacity-50"><Square className="h-3.5 w-3.5" />Stop / mute</button><span aria-live="polite" className="text-xs text-[#9CB0C5]">{supported ? `${matchingVoices.length} device voice option${matchingVoices.length === 1 ? "" : "s"} detected for this selection.` : "Voice synthesis was not detected in this browser."}</span></div></article>
          <aside className="space-y-5"><article className="rounded-3xl border border-[#00FF88]/35 bg-[#00FF88]/[.055] p-6"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#00FF88]"><HeartHandshake className="h-4 w-4" />EASY-ON-THE-EAR STANDARD</div><h2 className="mt-3 text-2xl font-black">Warmth, humor, and clarity remain script-led.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">Use short natural sentences, intentional punctuation, breathable pauses, and age-appropriate humor. Keep loudness comfortable, avoid relentless effects, keep any non-speech sound purposeful, and always preserve readable text and a stop/mute choice.</p></article><article className="rounded-3xl border border-[#FFB800]/35 bg-[#FFB800]/[.055] p-6"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#FFCC4D]"><Mic2 className="h-4 w-4" />SPECIFIC-PERSON VOICE — PROTECTED READINESS</div><h2 className="mt-3 text-2xl font-black">Consent recorded. Custom voice not active.</h2><p className="mt-3 text-sm font-black text-[#FFCC4D]">Consent and a clean source come first.</p><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">A specific person’s recognizable voice, laugh, or emotional signature is not copied from public material. It needs that individual’s clear recorded consent, an approved clean source sample, provider eligibility, a transcript/caption plan, an intended use, and an explicit release decision.</p></article><article className="rounded-3xl border border-[#B98CFF]/35 bg-[#B98CFF]/[.06] p-6"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#D6C4FF]"><Subtitles className="h-4 w-4" />VOICE RIGHTS & REVOCATION</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">The owner can narrow or revoke custom-voice authorization before any provider activation. Any future generated voice must be disclosed as AI-generated, offer a transcript/captions and mute control, and retain a non-audio alternative.</p><Link href="/co-creation-navigator" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#D6C4FF] transition hover:text-white">Suggest an accessibility or language improvement →</Link></article></aside>
        </section>
        <footer className="mt-10 border-t border-white/10 py-8 text-center text-xs font-mono tracking-[.14em] text-[#8EA2B8]">SCROLLVERSE VOICE & LANGUAGE STUDIO · HUMAN-FORWARD · ACCESSIBLE · CREATOR-DIRECTED · KUN FAYAKŪN × ∞</footer>
      </section>
    </main>
  );
}
