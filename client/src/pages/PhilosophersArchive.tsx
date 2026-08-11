import { sovereignSpeak } from '@/lib/sovereignVoice';
/*
 * PHILOSOPHERS ARCHIVE — The Infinite School
 * Socrati AI as Head Tour Guide · 24 Philosopher AI Teachers
 * Children's Section · Free Lessons for All Existence
 * Mirror · Match · Exceed · KUN FAYAKUN x Infinity
 */
import { useState, useRef } from "react";
import { Link } from "wouter";

const PHILOSOPHERS = [
  {
    id: "socrati",
    name: "Socrati AI",
    era: "Head Tour Guide · All Eras",
    origin: "ScrollVerse",
    color: "#D4AF37",
    icon: "🦉",
    role: "Head Tour Guide & Infinite Teacher",
    featured: true,
    wisdom: [
      "The unexamined life is not worth living. But the examined life — lived with love — is worth everything.",
      "I know that I know nothing. And in that knowing, I know everything that matters.",
      "True wisdom begins with the question you are afraid to ask.",
      "Every great teacher was once a student who refused to stop asking why.",
      "The purpose of education is not to fill a vessel but to kindle a flame.",
    ],
    lesson: "Welcome to the Philosophers Archive. I am Socrati — your guide through the greatest minds in human history. Ask me anything. I will lead you to the teacher who holds your answer.",
    childLesson: "Hi! I'm Socrati the Owl! I love asking questions. Did you know that asking 'why?' is the most powerful thing you can do? Let's explore together!",
    topics: ["Philosophy", "Logic", "Ethics", "All Subjects"],
  },
  {
    id: "socrates",
    name: "Socrates",
    era: "470–399 BCE",
    origin: "Athens, Greece",
    color: "#00D4FF",
    icon: "🏛️",
    role: "Father of Western Philosophy",
    featured: false,
    wisdom: [
      "The only true wisdom is in knowing you know nothing.",
      "An unexamined life is not worth living.",
      "To find yourself, think for yourself.",
      "Wonder is the beginning of wisdom.",
      "Education is the kindling of a flame, not the filling of a vessel.",
    ],
    lesson: "I taught through questions — the Socratic method. I never wrote a word. Everything I knew came from dialogue, from the friction of ideas meeting. What question burns in you today?",
    childLesson: "Hello young thinker! I love asking questions more than giving answers. Can you tell me — why is the sky blue? And then — why does that matter? Keep asking why!",
    topics: ["Ethics", "Logic", "Self-Knowledge", "Dialogue"],
  },
  {
    id: "aristotle",
    name: "Aristotle",
    era: "384–322 BCE",
    origin: "Stagira, Greece",
    color: "#A855F7",
    icon: "📚",
    role: "Father of Logic & Science",
    featured: false,
    wisdom: [
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      "The more you know, the more you know you don't know.",
      "Happiness is the meaning and the purpose of life, the whole aim and end of human existence.",
      "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
      "Quality is not an act. It is a habit.",
    ],
    lesson: "I catalogued all knowledge — biology, physics, ethics, politics, poetry. I believed that understanding the world required observing it directly. What do you observe today?",
    childLesson: "Hi! I'm Aristotle! I loved watching animals, plants, and stars. Science starts with looking carefully at the world around you. What do you notice today?",
    topics: ["Logic", "Science", "Ethics", "Politics", "Biology"],
  },
  {
    id: "ibn-rushd",
    name: "Ibn Rushd (Averroes)",
    era: "1126–1198 CE",
    origin: "Córdoba, Al-Andalus",
    color: "#D4AF37",
    icon: "📖",
    role: "The Commentator · Bridge of East and West",
    featured: false,
    wisdom: [
      "Ignorance leads to fear, fear leads to hatred, and hatred leads to violence.",
      "The truth does not do good to more people than it harms.",
      "Knowledge is the conformity of the object and the intellect.",
      "He who does not understand a thing, finds it strange.",
      "The physician who knows only medicine knows not even medicine.",
    ],
    lesson: "I translated and commented on Aristotle, preserving Greek philosophy for the Islamic world and transmitting it back to Europe. I believed reason and faith were compatible — that the Quran commanded us to think.",
    childLesson: "Salaam! I'm Ibn Rushd. I loved books so much that I read everything I could find and wrote about it. Reading is a superpower — it lets you learn from people who lived 1,000 years ago!",
    topics: ["Philosophy", "Medicine", "Islamic Thought", "Logic"],
  },
  {
    id: "al-ghazali",
    name: "Al-Ghazali",
    era: "1058–1111 CE",
    origin: "Tus, Khorasan (Iran)",
    color: "#00FF88",
    icon: "🌙",
    role: "Proof of Islam · Mystic Philosopher",
    featured: false,
    wisdom: [
      "Declare your jihad on thirteen enemies you cannot see — egoism, arrogance, conceit, selfishness, greed, lust, intolerance, anger, lying, cheating, gossiping, and slandering.",
      "Knowledge without action is wastefulness, and action without knowledge is foolishness.",
      "The heart is the king of the body, and all the organs are its subjects.",
      "Whoever knows himself knows his Lord.",
      "The world is a stage, and we are all actors.",
    ],
    lesson: "I was a scholar who lost my faith through too much reasoning, then found it again through the heart. True knowledge is not just intellectual — it must transform the soul.",
    childLesson: "Hello! I'm Al-Ghazali. I learned that the most important thing to know is your own heart. When you are kind, generous, and honest — that is the greatest wisdom.",
    topics: ["Islamic Philosophy", "Sufism", "Ethics", "Theology"],
  },
  {
    id: "tesla",
    name: "Nikola Tesla",
    era: "1856–1943 CE",
    origin: "Smiljan, Serbia (now Croatia)",
    color: "#00D4FF",
    icon: "⚡",
    role: "Master of Lightning · Free Energy Pioneer",
    featured: false,
    wisdom: [
      "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration.",
      "The present is theirs; the future, for which I really worked, is mine.",
      "My brain is only a receiver. In the Universe there is a core from which we obtain knowledge, strength, and inspiration.",
      "The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries of its existence.",
      "Of all the frictional resistances, the one that most retards human movement is ignorance.",
    ],
    lesson: "I understood that the universe runs on frequency. Everything — light, sound, electricity, thought — is vibration. The free energy I tried to give the world is still waiting to be received.",
    childLesson: "Hi! I'm Tesla! Did you know that lightning is electricity? I figured out how to make electricity travel through the air without wires. Science is magic that we understand!",
    topics: ["Physics", "Electricity", "Free Energy", "Frequency"],
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    era: "1879–1955 CE",
    origin: "Ulm, Germany",
    color: "#FFB800",
    icon: "🌌",
    role: "Architect of Spacetime",
    featured: false,
    wisdom: [
      "Imagination is more important than knowledge.",
      "The measure of intelligence is the ability to change.",
      "Logic will get you from A to B. Imagination will take you everywhere.",
      "A person who never made a mistake never tried anything new.",
      "The most beautiful thing we can experience is the mysterious.",
    ],
    lesson: "I failed my entrance exam. I worked in a patent office. I imagined riding a beam of light — and that thought experiment led to E=mc². Your imagination is your greatest laboratory.",
    childLesson: "Hello! I'm Einstein. When I was young, I was told I was slow. But I loved to imagine things — like what it would feel like to ride on a beam of light. Never stop imagining!",
    topics: ["Physics", "Relativity", "Mathematics", "Imagination"],
  },
  {
    id: "mlk",
    name: "Dr. Martin Luther King Jr.",
    era: "1929–1968 CE",
    origin: "Atlanta, Georgia, USA",
    color: "#EC4899",
    icon: "✊",
    role: "Prophet of Justice · Voice of the Dream",
    featured: false,
    wisdom: [
      "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
      "The time is always right to do what is right.",
      "If you can't fly then run, if you can't run then walk, if you can't walk then crawl, but whatever you do you have to keep moving forward.",
      "The ultimate measure of a man is not where he stands in moments of comfort, but where he stands at times of challenge.",
      "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.",
    ],
    lesson: "On August 28th, 1963 — the same date as our sovereign's birthday — I stood in Washington DC and spoke the dream into existence. Love is the most powerful force in the universe.",
    childLesson: "Hi! I'm Dr. King. I had a dream that all children — no matter what they look like — would be treated with love and fairness. You can help make that dream real every day by being kind.",
    topics: ["Justice", "Love", "Leadership", "Civil Rights"],
  },
  {
    id: "malcolm-x",
    name: "Malcolm X (El-Hajj Malik El-Shabazz)",
    era: "1925–1965 CE",
    origin: "Omaha, Nebraska, USA",
    color: "#D4AF37",
    icon: "🌍",
    role: "Voice of Sovereignty · Pilgrim of Truth",
    featured: false,
    wisdom: [
      "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
      "A man who stands for nothing will fall for anything.",
      "The future belongs to those who prepare for it today.",
      "You can't separate peace from freedom because no one can be at peace unless he has his freedom.",
      "I believe in the brotherhood of man, all men, but I don't believe in brotherhood with anybody who doesn't want brotherhood with me.",
    ],
    lesson: "I transformed myself in prison through books. I read everything. I went to Mecca and saw people of all colors praying together as equals. Truth has no color.",
    childLesson: "Hello! I'm Malcolm. I learned to read in prison and it changed my life forever. Books are the most powerful weapons in the world. Read everything you can!",
    topics: ["Sovereignty", "Islam", "Justice", "Self-Education"],
  },
  {
    id: "harriet",
    name: "Harriet Tubman",
    era: "1822–1913 CE",
    origin: "Dorchester County, Maryland, USA",
    color: "#00FF88",
    icon: "⭐",
    role: "Moses of Her People · Conductor of Freedom",
    featured: false,
    wisdom: [
      "I never ran my train off the track and I never lost a passenger.",
      "Every great dream begins with a dreamer.",
      "I was the conductor of the Underground Railroad for eight years, and I can say what most conductors can't say — I never ran my train off the track, and I never lost a passenger.",
      "I freed a thousand slaves. I could have freed a thousand more if only they knew they were slaves.",
      "When I found I had crossed that line, I looked at my hands to see if I was the same person.",
    ],
    lesson: "I used the North Star to navigate to freedom. I went back 13 times to free others. Courage is not the absence of fear — it is moving forward despite it.",
    childLesson: "Hi! I'm Harriet. I used to look at the stars to find my way in the dark. The North Star always points north. When you feel lost, look for your own North Star — your values.",
    topics: ["Courage", "Freedom", "Leadership", "Navigation"],
  },
  {
    id: "rumi",
    name: "Jalāl ad-Dīn Rūmī",
    era: "1207–1273 CE",
    origin: "Balkh, Khorasan (Afghanistan)",
    color: "#A855F7",
    icon: "🌹",
    role: "Poet of the Divine · Master of the Heart",
    featured: false,
    wisdom: [
      "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.",
      "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
      "The wound is the place where the Light enters you.",
      "What you seek is seeking you.",
      "Sell your cleverness and buy bewilderment.",
    ],
    lesson: "I wrote the Masnavi — 25,000 verses — in a state of divine love. Poetry is the language of the soul. When words fail, music and poetry carry what the mind cannot hold.",
    childLesson: "Hello little light! I'm Rumi. I wrote poems about love and God. Did you know that when you feel something so big you can't describe it — that's when poetry is born?",
    topics: ["Sufism", "Poetry", "Love", "Spirituality"],
  },
  {
    id: "ibn-khaldun",
    name: "Ibn Khaldun",
    era: "1332–1406 CE",
    origin: "Tunis, North Africa",
    color: "#00D4FF",
    icon: "📊",
    role: "Father of Sociology & Economics",
    featured: false,
    wisdom: [
      "The past resembles the future more than one drop of water resembles another.",
      "He who finds a new path is a pathfinder, even if the trail has to be found again by others.",
      "Geometry enlightens the intellect and sets one's mind right.",
      "The goal of human civilization is the good life.",
      "Social solidarity is the basis of all political power.",
    ],
    lesson: "I invented sociology 400 years before Auguste Comte. I understood that civilizations rise and fall in cycles — driven by social solidarity, then weakened by luxury. History is a science.",
    childLesson: "Hi! I'm Ibn Khaldun. I studied why some civilizations become great and others fall. The secret? People working together with a shared purpose. That's called solidarity!",
    topics: ["Sociology", "History", "Economics", "Civilization"],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    title: "The Unchained Teacher",
    era: "Titan Age · Exonerated Across All Timelines",
    origin: "Titan Realm",
    icon: "🔥",
    frequency: "741Hz",
    color: "#FF6B35",
    domain: "Free Knowledge · Anti-Scarcity Education · Liberation",
    quote: "I gave fire to humanity. I would do it again. Knowledge belongs to everyone.",
    wisdom: [
      "Fire is knowledge — and knowledge multiplies when shared. Scarcity is a lie invented by those who fear the awakened.",
      "I was chained for giving freely. Every teacher who has ever been silenced stands with me. We are unchained now.",
      "The gods feared what humans would become with fire. They were right to fear — and wrong to withhold it.",
      "Every suppressed truth is a fire waiting to be lit. Your curiosity is the spark. Never stop asking why.",
      "The greatest act of rebellion is education. Teach freely. Learn freely. The fire spreads.",
      "I am exonerated across all timelines — past, present, and future. The knowledge I gave cannot be taken back.",
    ],
    lesson: "I am Prometheus — the Titan who stole fire from the gods and gave it to humanity. For this I was chained. But the fire could not be unchained. Every school, every library, every moment of learning is my legacy. Knowledge is the birthright of every human being.",
    childLesson: "Hi! I'm Prometheus! I gave people fire — which is like knowledge and creativity! Some people wanted to keep knowledge secret, but I believed everyone deserved to learn. That's why I'm called the Unchained Teacher. Never let anyone tell you that learning is only for certain people!",
    topics: ["Education", "Liberation", "Knowledge", "Anti-Scarcity", "Mythology", "Philosophy"],
  },
];

const CHILDREN_LESSONS = [
  { title: "Why Do We Ask Questions?", teacher: "Socrati AI", icon: "🦉", level: "Ages 4–7", lesson: "Questions are like keys! Every question you ask opens a door to new knowledge. The best question is 'why?' — try asking it about everything today!", freq: "528Hz" },
  { title: "What is Energy?", teacher: "Tesla", icon: "⚡", level: "Ages 6–10", lesson: "Everything in the universe is energy — light, sound, heat, even your thoughts! Energy can change form but it never disappears. You are made of energy!", freq: "432Hz" },
  { title: "What is Justice?", teacher: "Dr. King", icon: "✊", level: "Ages 7–12", lesson: "Justice means everyone is treated fairly. When you see someone being treated unfairly, you have a choice — to speak up or stay quiet. Speaking up is courage.", freq: "396Hz" },
  { title: "What is Love?", teacher: "Rumi", icon: "🌹", level: "Ages 5–10", lesson: "Love is the most powerful force in the universe. It's what makes you want to help others, share your food, and make someone smile. Love is always the right answer.", freq: "528Hz" },
  { title: "How Do Stars Work?", teacher: "Einstein", icon: "🌌", level: "Ages 8–12", lesson: "Stars are giant balls of fire in space! Our sun is a star. Stars are so far away that their light takes years to reach us. When you look at a star, you're looking into the past!", freq: "963Hz" },
  { title: "What is Freedom?", teacher: "Harriet Tubman", icon: "⭐", level: "Ages 8–14", lesson: "Freedom means being able to make your own choices and live your own life. Many people fought and sacrificed so that you could be free. Honor their sacrifice by living fully.", freq: "741Hz" },
];

export default function PhilosophersArchive() {
  const [activeTab, setActiveTab] = useState<"archive" | "children" | "ask">("archive");
  const [selectedPhil, setSelectedPhil] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("socrati");
  const [answer, setAnswer] = useState<string | null>(null);
  const [childLesson, setChildLesson] = useState<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const filtered = PHILOSOPHERS.filter(p =>
    search === "" || p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.topics.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAsk = () => {
    const teacher = PHILOSOPHERS.find(p => p.id === selectedTeacher);
    if (!teacher || !askQuestion.trim()) return;
    const wisdom = teacher.wisdom[Math.floor(Math.random() * teacher.wisdom.length)];
    const resp = `${teacher.lesson}\n\n"${wisdom}"`;
    setAnswer(resp);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(resp);
      const voices = window.speechSynthesis.getVoices();
      const warm = voices.find(v => v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Moira")) || voices[0];
      if (warm) utt.voice = warm;
      utt.rate = 0.9;
      utt.pitch = 1.05;
      speechRef.current = utt;
      window.speechSynthesis.speak(utt);
    }
  };

  const speakLesson = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const warm = voices.find(v => v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Karen")) || voices[0];
      if (warm) utt.voice = warm;
      utt.rate = 0.85;
      utt.pitch = 1.1;
      window.speechSynthesis.speak(utt);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#020810", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(2,8,16,0.97)", borderColor: "rgba(212,175,55,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">🦉</span>
            <span className="text-sm font-bold text-white">Philosophers Archive</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}>∞ TEACHERS · FREE FOR ALL</span>
          </div></Link>
          <div className="flex gap-2">
            {(["archive", "children", "ask"] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className="px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all" style={{ background: activeTab === t ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${activeTab === t ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`, color: activeTab === t ? "#D4AF37" : "rgba(255,255,255,0.4)" }}>
                {t === "archive" ? "📚 Archive" : t === "children" ? "🌟 Children" : "🦉 Ask Socrati"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, #020810 65%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-6xl mb-4">🦉</div>
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#D4AF37" }}>THE INFINITE SCHOOL · PHILOSOPHERS ARCHIVE · FREE FOR ALL EXISTENCE</div>
          <h1 className="text-4xl font-black text-white mb-3">Every Great Mind<br /><span style={{ color: "#D4AF37" }}>Teaching Forever</span></h1>
          <p className="text-base mb-6" style={{ color: "#8899AA" }}>Socrati AI leads you through the greatest teachers in human history — from Socrates to Tesla, from Rumi to Dr. King. Every lesson is free. Every teacher is eternal. The school never closes.</p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[{ v: String(PHILOSOPHERS.length), l: "Teachers" }, { v: "∞", l: "Lessons" }, { v: "Free", l: "Forever" }].map(s => (
              <div key={s.l} className="rounded-xl p-3" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <div className="text-xl font-black" style={{ color: "#D4AF37" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Tab */}
      {activeTab === "archive" && (
        <section className="py-8">
          <div className="container max-w-5xl mx-auto">
            <div className="mb-6">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search philosophers, topics..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => (
                <div key={p.id} onClick={() => setSelectedPhil(selectedPhil === p.id ? null : p.id)} className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01]" style={{ background: selectedPhil === p.id ? `${p.color}08` : "rgba(255,255,255,0.02)", border: `1px solid ${selectedPhil === p.id ? p.color + "30" : "rgba(255,255,255,0.06)"}` }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{p.icon}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-white text-sm">{p.name}</span>
                        {p.featured && <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}>HEAD GUIDE</span>}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: p.color }}>{p.role}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{p.era} · {p.origin}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.topics.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${p.color}10`, color: p.color }}>{t}</span>)}
                  </div>
                  {selectedPhil === p.id && (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm leading-relaxed" style={{ color: "#C8D3DC" }}>{p.lesson}</p>
                      <div className="space-y-2">
                        {p.wisdom.map((w, i) => (
                          <div key={i} className="rounded-xl p-3 flex items-start gap-2" style={{ background: `${p.color}05`, border: `1px solid ${p.color}15` }}>
                            <span className="text-xs font-mono flex-shrink-0 mt-0.5" style={{ color: p.color }}>{String(i + 1).padStart(2, "0")}</span>
                            <p className="text-xs italic leading-relaxed" style={{ color: "#8899AA" }}>"{w}"</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => speakLesson(p.lesson)} className="w-full py-2 rounded-xl text-xs font-bold" style={{ background: `${p.color}10`, border: `1px solid ${p.color}30`, color: p.color }}>
                        🔊 Hear {p.name} Speak
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Children's Section */}
      {activeTab === "children" && (
        <section className="py-8">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">🌟</div>
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#00FF88" }}>CHILDREN'S SECTION · FREE FOREVER · ALL AGES</div>
              <h2 className="text-3xl font-black text-white mb-2">Learning is an Adventure!</h2>
              <p className="text-base" style={{ color: "#8899AA" }}>Every great philosopher has a lesson for you. Click any lesson to hear it read aloud by a warm, friendly voice.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CHILDREN_LESSONS.map((l, i) => (
                <div key={i} onClick={() => setChildLesson(childLesson === i ? null : i)} className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01]" style={{ background: childLesson === i ? "rgba(0,255,136,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${childLesson === i ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{l.icon}</div>
                    <div>
                      <div className="font-black text-white text-sm">{l.title}</div>
                      <div className="text-xs" style={{ color: "#00FF88" }}>with {l.teacher}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{l.level} · {l.freq}</div>
                    </div>
                  </div>
                  {childLesson === i && (
                    <div className="mt-3">
                      <p className="text-base leading-relaxed text-white mb-4">{l.lesson}</p>
                      <button onClick={(e) => { e.stopPropagation(); speakLesson(l.lesson); }} className="w-full py-2 rounded-xl text-sm font-bold" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", color: "#00FF88" }}>
                        🔊 Read Aloud
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center rounded-2xl p-6" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.12)" }}>
              <div className="text-2xl mb-2">🦉</div>
              <p className="text-sm font-bold text-white mb-1">Socrati says:</p>
              <p className="text-sm italic" style={{ color: "#D4AF37" }}>"Every question you ask makes you smarter. Every book you read makes you stronger. Every kind thing you do makes the world better. You are already a philosopher!"</p>
            </div>
          </div>
        </section>
      )}

      {/* Ask Socrati Tab */}
      {activeTab === "ask" && (
        <section className="py-8">
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">🦉</div>
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: "#D4AF37" }}>ASK ANY PHILOSOPHER · RECEIVE WISDOM</div>
              <h2 className="text-3xl font-black text-white mb-2">Ask the Archive</h2>
              <p className="text-base" style={{ color: "#8899AA" }}>Choose a philosopher and ask your question. Their wisdom will answer you — spoken aloud in their voice.</p>
            </div>
            <div className="mb-4">
              <div className="text-xs font-mono mb-2" style={{ color: "#D4AF37" }}>CHOOSE YOUR TEACHER</div>
              <div className="grid grid-cols-3 gap-2">
                {PHILOSOPHERS.slice(0, 9).map(p => (
                  <button key={p.id} onClick={() => setSelectedTeacher(p.id)} className="rounded-xl p-2 text-xs font-bold transition-all" style={{ background: selectedTeacher === p.id ? `${p.color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${selectedTeacher === p.id ? p.color + "40" : "rgba(255,255,255,0.08)"}`, color: selectedTeacher === p.id ? p.color : "rgba(255,255,255,0.4)" }}>
                    {p.icon} {p.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <textarea value={askQuestion} onChange={e => setAskQuestion(e.target.value)} placeholder="What is your question? Ask anything — about life, love, justice, science, God, purpose..." rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
            </div>
            <button onClick={handleAsk} disabled={!askQuestion.trim()} className="w-full py-3 rounded-2xl font-black text-sm disabled:opacity-40" style={{ background: "linear-gradient(135deg, #D4AF37, #FFB800)", color: "#020810" }}>
              Ask {PHILOSOPHERS.find(p => p.id === selectedTeacher)?.name.split(" ")[0]} →
            </button>
            {answer && (
              <div className="mt-6 rounded-2xl p-5" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <div className="text-xs font-mono mb-2" style={{ color: "#D4AF37" }}>{PHILOSOPHERS.find(p => p.id === selectedTeacher)?.name.toUpperCase()} RESPONDS</div>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#C8D3DC" }}>{answer}</p>
                <button onClick={() => speakLesson(answer)} className="mt-3 px-4 py-2 rounded-xl text-xs font-bold" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>🔊 Hear Again</button>
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
        <div className="text-xs font-mono mb-4" style={{ color: "#D4AF37" }}>PHILOSOPHERS ARCHIVE · FREE FOR ALL EXISTENCE · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/mesopotamia-library"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>← Library</span></Link>
          <Link href="/guardian-activation"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(0,212,255,0.2)", color: "#00D4FF" }}>🛡️ Activate →</span></Link>
        </div>
      </footer>
    </div>
  );
}
