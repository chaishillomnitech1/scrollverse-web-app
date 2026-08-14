import { useEffect, useMemo, useState } from "react";
import { Globe2, Mic2, ShieldCheck, Square, Subtitles, Volume2 } from "lucide-react";
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

type DeviceVoice = SpeechSynthesisVoice;

export default function VoiceLanguageStudio() {
  useSovereignHeartbeat({ page: "voice-language-studio" });
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<DeviceVoice[]>([]);
  const [language, setLanguage] = useState("en-US");
  const [voiceUri, setVoiceUri] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [text, setText] = useState("Welcome to the ScrollVerse Open Knowledge Verse. Choose your language and an available device voice, then play this text aloud.");

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

  useEffect(() => {
    if (!matchingVoices.some((voice) => voice.voiceURI === voiceUri)) setVoiceUri(matchingVoices[0]?.voiceURI ?? "");
  }, [matchingVoices, voiceUri]);

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

  return <main className="min-h-screen bg-[#050B1A] px-4 py-10 text-white sm:px-6 lg:px-10"><section className="mx-auto max-w-6xl"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/open-knowledge-verse" className="text-sm font-black text-[#00D4FF]">← Open Knowledge Verse</Link><Link href="/manifesto-builders-book" className="rounded-lg border border-[#FFB800]/50 px-3 py-2 text-xs font-black text-[#FFCC4D]">Free reading route →</Link></div><header className="mt-7 rounded-[2rem] border border-[#7CE7FF]/35 p-8 sm:p-10" style={{ background: "radial-gradient(circle at 92% 12%, rgba(124,231,255,.18), transparent 34%), radial-gradient(circle at 12% 90%, rgba(185,140,255,.16), transparent 38%), #071124" }}><div className="flex items-center gap-2 text-xs font-mono tracking-[.18em] text-[#7CE7FF]"><Globe2 className="h-4 w-4" />LANGUAGE CHOICE · DEVICE VOICE · TRANSCRIPT · MUTE</div><h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">Voice & Language Studio</h1><p className="mt-5 max-w-4xl text-base leading-8 text-[#D6E2EE]">Choose an available device voice and language to hear an accessible text preview. Playback starts only after your action, and the visible text remains the transcript. This page does not upload your text, train a voice, imitate a person, or create a generated owner voice.</p></header><PortalTrustLens lane="Multilingual voice-ready learning" source="Browser/device speech synthesis where available; protected owner-voice readiness record; official platform and accessibility documentation." readiness="Device voices can be previewed when the browser exposes them. Owner custom voice is not created or active on this route." boundary="Voice inventory, languages, and quality depend on the visitor’s device/browser. This page does not promise universal voice availability, translate text, clone a person, or represent synthetic speech as live human speech." /><section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><article className="rounded-3xl border border-white/10 bg-white/[.025] p-6 sm:p-8"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#00D4FF]"><Volume2 className="h-4 w-4" />VISITOR-CONTROLLED DEVICE PREVIEW</div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">LANGUAGE<select value={language} onChange={(event) => setLanguage(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#061226] px-3 py-3 text-sm font-bold text-white outline-none">{languageChoices.map((choice) => <option className="bg-[#061226]" key={choice.code} value={choice.code}>{choice.label}</option>)}</select></label><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">AVAILABLE DEVICE VOICE<select value={voiceUri} onChange={(event) => setVoiceUri(event.target.value)} disabled={!supported || !matchingVoices.length} className="mt-2 w-full rounded-xl border border-white/10 bg-[#061226] px-3 py-3 text-sm font-bold text-white outline-none disabled:opacity-50">{matchingVoices.length ? matchingVoices.map((voice) => <option className="bg-[#061226]" key={voice.voiceURI} value={voice.voiceURI}>{voice.name} · {voice.lang}</option>) : <option>No device voice available</option>}</select></label></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">RATE <span className="text-[#7CE7FF]">{rate.toFixed(1)}×</span><input aria-label="Speech rate" type="range" min="0.7" max="1.3" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} className="mt-3 w-full accent-[#7CE7FF]" /></label><label className="text-xs font-mono tracking-[.12em] text-[#A7BACD]">PITCH <span className="text-[#7CE7FF]">{pitch.toFixed(1)}</span><input aria-label="Speech pitch" type="range" min="0.7" max="1.3" step="0.1" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} className="mt-3 w-full accent-[#7CE7FF]" /></label></div><label className="mt-5 block text-xs font-mono tracking-[.12em] text-[#A7BACD]" htmlFor="voice-preview-text">VISIBLE TRANSCRIPT / TEXT TO READ</label><textarea id="voice-preview-text" value={text} onChange={(event) => setText(event.target.value)} rows={7} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-[#061226] p-4 text-sm leading-7 text-white outline-none focus:border-[#7CE7FF]/70" /><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={speak} disabled={!supported || speaking} className="inline-flex items-center gap-2 rounded-xl bg-[#7CE7FF] px-4 py-3 text-xs font-black text-[#04101C] transition hover:brightness-110 disabled:opacity-50"><Volume2 className="h-4 w-4" />{speaking ? "Reading…" : "Play selected device voice"}</button><button type="button" onClick={stop} disabled={!speaking} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-xs font-black text-white transition hover:border-[#FF6B9A] hover:text-[#FF9EB9] disabled:opacity-50"><Square className="h-3.5 w-3.5" />Stop / mute</button><span aria-live="polite" className="text-xs text-[#9CB0C5]">{supported ? `${matchingVoices.length} device voice option${matchingVoices.length === 1 ? "" : "s"} detected for this selection.` : "Voice synthesis was not detected in this browser."}</span></div></article><aside className="space-y-5"><article className="rounded-3xl border border-[#FFB800]/35 bg-[#FFB800]/[.055] p-6"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#FFCC4D]"><Mic2 className="h-4 w-4" />OWNER VOICE — PROTECTED READINESS</div><h2 className="mt-3 text-2xl font-black">Consent recorded. Custom voice not active.</h2><p className="mt-4 text-sm leading-7 text-[#D6E2EE]">The owner-provided recording is held outside public routes. Its overlapping background dialogue means it is not being submitted as a custom-voice sample. A future production voice requires a fresh clean consent recording, a clean sample, provider eligibility, terms review, and an explicit owner release decision.</p><div className="mt-5 rounded-2xl border border-[#FFB800]/25 bg-black/20 p-4 text-xs leading-6 text-[#D6C4EE]"><span className="font-black text-[#FFCC4D]">DISCLOSURE:</span> Any future synthesized voice must be marked as AI-generated, provide its transcript/captions and mute control, and retain a non-audio alternative.</div></article><article className="rounded-3xl border border-[#B98CFF]/35 bg-[#B98CFF]/[.06] p-6"><div className="flex items-center gap-2 text-xs font-mono tracking-[.16em] text-[#D6C4FF]"><Subtitles className="h-4 w-4" />VOICE RIGHTS & REVOCATION</div><p className="mt-3 text-sm leading-7 text-[#D6E2EE]">This preview reads only the text visible above through visitor-controlled device voices. It is not a translation service or a claim that every language, accent, or assistive feature is available. The owner can narrow or revoke custom-voice authorization before any provider activation.</p><Link href="/co-creation-navigator" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#D6C4FF] transition hover:text-white">Suggest an accessibility or language improvement →</Link></article></aside></section></section></main>;
}
