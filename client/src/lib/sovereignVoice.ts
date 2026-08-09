/**
 * SOVEREIGN VOICE ENGINE
 * Smooth, ancient, articulate — not robotic.
 * Male voice: deep, warm, inviting, like an ancient oracle.
 * Female voice: calm, warm, sacred — for 99 Names and sacred scrolls.
 */

export type VoiceGender = "male" | "female" | "child";

const PREFERRED_MALE_VOICES = [
  "Google UK English Male",
  "Microsoft George Online (Natural) - English (United Kingdom)",
  "Microsoft David Desktop - English (United States)",
  "Alex",
  "Daniel",
  "Fred",
];

const PREFERRED_FEMALE_VOICES = [
  "Google UK English Female",
  "Microsoft Zira Desktop - English (United States)",
  "Microsoft Hazel Online (Natural) - English (United Kingdom)",
  "Samantha",
  "Victoria",
];

export function getSovereignVoice(gender: VoiceGender = "male"): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferred = gender === "female" ? PREFERRED_FEMALE_VOICES : PREFERRED_MALE_VOICES;

  for (const name of preferred) {
    const v = voices.find(v => v.name === name);
    if (v) return v;
  }

  // Fallback: any English voice matching gender hint
  const fallback = voices.find(v =>
    v.lang.startsWith("en") &&
    (gender === "female" ? v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman") : true)
  );
  return fallback ?? voices.find(v => v.lang.startsWith("en")) ?? null;
}

export function sovereignSpeak(
  text: string,
  gender: VoiceGender = "male",
  onEnd?: () => void
): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  if (gender === "male") {
    utterance.pitch = 0.85;   // Deep, ancient, not robotic
    utterance.rate = 0.88;    // Deliberate, articulate, inviting
    utterance.volume = 0.95;
  } else if (gender === "female") {
    utterance.pitch = 1.05;   // Warm, calm, sacred
    utterance.rate = 0.82;    // Gentle, unhurried
    utterance.volume = 0.9;
  } else {
    // Child (Junior Movies)
    utterance.pitch = 1.3;
    utterance.rate = 0.95;
    utterance.volume = 0.95;
  }

  // Try to set voice — voices may not be loaded yet
  const setVoiceAndSpeak = () => {
    const voice = getSovereignVoice(gender);
    if (voice) utterance.voice = voice;
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    setVoiceAndSpeak();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", setVoiceAndSpeak, { once: true });
    // Fallback timeout
    setTimeout(setVoiceAndSpeak, 500);
  }
}
