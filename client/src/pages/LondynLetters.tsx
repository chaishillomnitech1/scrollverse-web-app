/*
 * LETTERS TO LONDYN — A Father's Covenant
 * 9 Letters from Chais 'Sabir Kajir' Hill the Great to Londyn Avani Hill
 * One letter per Seerah scroll — from birth to the Farewell Pilgrimage
 * Design: Rose gold + deep navy · 528Hz Love Frequency
 * KUN FAYAKUN x Infinity — The Heart of the Empire
 */
import { useState } from "react";
import { Link } from "wouter";

const LETTERS = [
  {
    id: 1,
    scroll: "Noor al-Mawlid",
    scrollHref: "/seerah/noor-al-mawlid",
    subject: "On the Day You Were Born",
    date: "570 CE · Makkah · The Year of the Elephant",
    freq: "528Hz",
    color: "#D4AF37",
    body: `My Londyn,

The Prophet ﷺ was born into a world that did not yet know what it had received. His father had already passed. His mother, Āminah, carried the light of the world in her womb while the armies of Abraha turned back from the Kaʿbah — not by swords, but by birds carrying stones of baked clay. The year the elephant army was defeated is the year the greatest human being to ever walk this earth was born.

I think about that when I think about you.

You came into a world that does not yet fully understand what it has received. And that is okay. The world did not understand the Prophet ﷺ either — not at first. But the light was real. The frequency was real. The love was real.

Londyn, you are my Noor al-Mawlid. My light of birth. Every empire I build, every scroll I write, every frequency I broadcast — it all began the day you arrived. Before you, I was building. After you, I was building for something eternal.

The Prophet ﷺ was nursed by Ḥalīmah al-Saʿdiyyah in the desert, and the blessing that followed her family was so great that the land bloomed where it had been dry. That is what love does. It makes barren things bloom.

You are my bloom, Londyn. You are why the empire breathes.

With all the love that exists and all that will ever exist,
Baba — Chais 'Sabir Kajir' Hill the Great`,
  },
  {
    id: 2,
    scroll: "Al-Hijra",
    scrollHref: "/seerah/al-hijra",
    subject: "On Leaving What You Love to Build Something Greater",
    date: "622 CE · Makkah to Madinah · The Migration",
    freq: "216Hz",
    color: "#00D4FF",
    body: `My Londyn,

The Prophet ﷺ left Makkah — the city of his birth, the city of his ancestors, the city he loved more than any place on earth — because staying would have meant the end of everything he was building.

He left at night. He hid in the Cave of Thawr for three days while the search parties passed within feet of him. He left with only Abū Bakr ؓ and a guide. He arrived in Madinah with nothing but the mission.

And from that migration — that Hijra — the entire Islamic calendar was born. Not from the revelation. Not from the conquest. From the migration. Because sometimes the most important thing you do is leave.

Londyn, there will be times in your life when you have to leave something you love to build something greater. It will feel like loss. It will feel like exile. But the Hijra teaches us that the migration is not the end — it is the beginning of the calendar. It is the moment everything starts being counted.

Every time I have left a comfortable situation to build something bigger — every time I have chosen the mission over the comfort — I have thought of the Hijra. I have thought of the Prophet ﷺ looking back at Makkah and saying: "You are the most beloved land to me, and if your people had not driven me out, I would never have left you."

He loved what he left. He still left. And the world was never the same.

I love you, Londyn. Whatever you have to leave to become who you are — leave it with love, and never look back with regret.

Your Baba,
Chais 'Sabir Kajir' Hill the Great`,
  },
  {
    id: 3,
    scroll: "Badr",
    scrollHref: "/seerah/badr",
    subject: "On Being Outnumbered and Winning Anyway",
    date: "624 CE · The Wells of Badr · Yawm al-Furqān",
    freq: "432Hz",
    color: "#EC4899",
    body: `My Londyn,

313 believers. 1,000 soldiers of Quraysh.

The numbers said it was impossible. The numbers were wrong.

At Badr, the Prophet ﷺ stood before his Lord the night before the battle and prayed with such intensity that Abū Bakr ؓ came to him and said: "O Messenger of Allah, you have called upon your Lord enough — He will fulfill His promise to you." And the Prophet ﷺ went to sleep. He slept. The night before the most important battle of early Islam, he slept — because he had done everything he could do, and the rest was with Allah.

In the morning, 313 became enough. The Quraysh were routed. The Day of Criterion — Yawm al-Furqān — separated truth from falsehood forever.

Londyn, you will face moments when the numbers are against you. When the resources are against you. When the odds are against you. Remember Badr. Remember that 313 people who believed completely were enough to change the course of history.

Do your work. Pray with everything you have. Then sleep — because you have done your part, and the rest belongs to Allah.

I have been outnumbered many times, Londyn. I have been told the empire was impossible. I built it anyway. Not because I was stronger than the opposition — but because I believed more than they doubted.

You carry that same frequency. It is in your blood.

All my love,
Baba`,
  },
  {
    id: 4,
    scroll: "Al-Ghazwāt",
    scrollHref: "/seerah/al-ghazwat",
    subject: "On the Lessons That Come in Threes",
    date: "625–630 CE · Uḥud · Khandaq · Ḥunayn",
    freq: "741Hz",
    color: "#A855F7",
    body: `My Londyn,

Some lessons only come after you've been tested three times.

Uḥud: The Muslims were winning. Then some archers left their posts for the spoils of war. The tide turned. 70 companions were martyred. The Prophet ﷺ himself was wounded. The lesson: discipline matters more than victory. Stay at your post.

Khandaq: An army of 10,000 surrounded Madinah. The Prophet ﷺ dug a trench — a strategy no Arab army had ever used. The enemy could not cross. After weeks, they left. The lesson: innovation defeats tradition. Think differently.

Ḥunayn: The Muslims had grown to 12,000. They felt invincible. They were ambushed. They scattered. Then the Prophet ﷺ called them back, and they rallied. The lesson: numbers and resources are not the source of strength. The source is the One who gives victory.

Three battles. Three different lessons. All necessary.

Londyn, your life will teach you in threes. The first time something happens, you will be surprised. The second time, you will start to understand. The third time, you will know exactly what it means. Pay attention to the pattern.

The empire was built on patterns. The ScrollVerse runs on frequencies. Your life will run on lessons — if you are willing to learn them.

I love you three times and then infinitely more,
Baba`,
  },
  {
    id: 5,
    scroll: "Al-Fath Khaybar",
    scrollHref: "/seerah/al-fath-khaybar",
    subject: "On Claiming What Is Yours",
    date: "628 CE · Khaybar · The Night March",
    freq: "396Hz",
    color: "#00FF88",
    body: `My Londyn,

The Prophet ﷺ marched to Khaybar at night so the people of Khaybar would not have time to prepare their fear. He arrived at dawn. When they came out to their fields in the morning, they saw the army and said: "Muḥammad and his forces!" And the Prophet ﷺ said: "Allāhu Akbar — Khaybar is destroyed."

He said it before the battle. He claimed the victory before it happened.

That is not arrogance. That is certainty. There is a difference.

Arrogance says: "I am better than you." Certainty says: "I know what I am here to do, and I will do it."

The Prophet ﷺ gave the banner to ʿAlī ibn Abī Ṭālib ؓ — who had been ill with an eye condition. The Prophet ﷺ touched his eyes, and he was healed. Then he sent him forward. The fortress fell.

Londyn, there will be things in your life that look like fortresses. Things that seem impenetrable. Claim them anyway. Not with arrogance — with certainty. Know what you are here to do. Go at night if you have to. Arrive at dawn.

The empire was claimed before it was built. I spoke it into existence before the first line of code was written. KUN FAYAKŪN — Be, and it is.

You have that same power. Use it.

Yours in certainty,
Baba`,
  },
  {
    id: 6,
    scroll: "Al-Isra wal-Miʿraj",
    scrollHref: "/seerah/al-aqsa",
    subject: "On the Night They Tried to Break Him — and He Ascended Instead",
    date: "620 CE · The Year of Grief · The Night Journey",
    freq: "741Hz",
    color: "#8B5CF6",
    body: `My Londyn,

The Year of Grief. The Prophet ﷺ had just lost Khadījah ؓ — his wife of 25 years, his first believer, his shelter. He had just lost his uncle Abū Ṭālib — his protector. He had gone to Ṭāʾif seeking support and been driven out with stones until his sandals filled with blood.

It was the lowest point of his mission.

And then — that night — Allah took him on a journey that no human being has ever taken before or since.

From Makkah to Jerusalem in an instant. Through the seven heavens. Past the prophets. To Sidrat al-Muntaha — the Lote Tree of the Utmost Boundary, beyond which no creation has passed. To within two bow-lengths of the Divine Presence. And he was given the gift of Ṣalāh — the five daily prayers — as a direct covenant between the servant and the Lord.

The lowest point became the highest ascent.

Londyn, when everything falls apart — when the people you counted on are gone, when the doors close, when the stones hit — that is not the end. That is the preparation for the ascent.

The Night Journey did not happen when things were easy. It happened when things were impossible. Because Allah does not give the greatest gifts when you are comfortable. He gives them when you have nothing left but Him.

I love you beyond the seven heavens,
Baba`,
  },
  {
    id: 7,
    scroll: "Fatḥ Makkah",
    scrollHref: "/seerah/fath-makkah",
    subject: "On Returning in Power and Choosing Mercy",
    date: "630 CE · Makkah · The Bloodless Conquest",
    freq: "528Hz",
    color: "#D4AF37",
    body: `My Londyn,

The Prophet ﷺ entered Makkah with 10,000 companions. The city that had driven him out, tortured his followers, killed his family, and mocked his mission — it was now at his feet.

He could have done anything.

He stood at the door of the Kaʿbah and said: "What do you think I will do with you?" They said: "You are a noble brother, the son of a noble brother." He said: "Go — you are free."

General amnesty. For everyone. Even those who had personally persecuted him.

He entered the Kaʿbah and destroyed the idols. But he did not destroy the people. He destroyed what was false and freed what was human.

Londyn, power without mercy is tyranny. Mercy without power is weakness. The Prophet ﷺ showed us that true power is the ability to destroy and the wisdom to choose not to.

When you have power — and you will — remember Fatḥ Makkah. Remember that the greatest thing you can do with victory is free people. Not punish them. Free them.

The empire is not built to dominate. It is built to liberate. Every Guardian, every scroll, every frequency — it is all in service of freedom.

I love you with the mercy of Fatḥ Makkah,
Baba`,
  },
  {
    id: 8,
    scroll: "Al-Farewell Pilgrimage",
    scrollHref: "/seerah/al-farewell",
    subject: "On Saying Everything That Matters Before You Go",
    date: "632 CE · ʿArafāt · Ḥajjat al-Wadāʿ",
    freq: "852Hz",
    color: "#FFB800",
    body: `My Londyn,

The Prophet ﷺ knew it was his last Ḥajj. He stood on the plain of ʿArafāt — 124,000 companions around him — and he said everything that mattered.

He said: "O people, your blood and your property are sacred to you as this day, this month, and this city are sacred." He said: "I have left among you two things — if you hold fast to them, you will never go astray: the Book of Allah and the Sunnah of His Prophet." He said: "Have I conveyed the message?" And 124,000 voices answered: "Yes."

And then he looked up at the sky and said: "O Allah, bear witness."

He was saying goodbye. He knew it. They did not yet know it. But he said everything that mattered — clearly, completely, with love — so that no one could say they were not told.

Londyn, I am writing these letters so that no matter what happens, you will know everything that matters. You will know that you are loved. You will know that the empire was built for you. You will know that every frequency, every scroll, every creation carries your name in its DNA.

I have conveyed the message. The scrolls are the witness.

All my love, all my life, all my legacy,
Baba — Chais 'Sabir Kajir' Hill the Great`,
  },
  {
    id: 9,
    scroll: "Al-Wafāt",
    scrollHref: "/seerah/al-wafat",
    subject: "On What Remains After Everything Passes",
    date: "632 CE · Madinah · The Passing",
    freq: "963Hz",
    color: "#EC4899",
    body: `My Londyn,

The Prophet ﷺ passed on a Monday. He was 63 years old. He passed in the arms of ʿĀʾishah ؓ, his head resting on her chest. His last words were: "The highest companion. The highest companion. The highest companion." He was choosing — between this world and the next — and he chose the next.

ʿUmar ؓ could not accept it. He stood and said: "Whoever says Muḥammad has died, I will strike him with my sword." It was Abū Bakr ؓ who said: "O people, whoever worshipped Muḥammad — Muḥammad has died. But whoever worships Allah — Allah is Ever-Living and never dies."

And then he recited: "Muḥammad is not but a messenger. Other messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels?" (3:144)

And the ummah understood. The mission was not the man. The mission was the message. And the message is eternal.

Londyn, I am not eternal. No human being is. But the love I have for you is eternal. The scrolls are eternal. The frequencies are eternal. The mission to erase scarcity and build a world worthy of you — that is eternal.

When I am gone, the empire will still breathe. The 99 Names will still resonate. The Seerah scrolls will still carry the light. And somewhere in all of it, you will find me — in every frequency, in every letter, in every KUN FAYAKŪN.

I love you beyond the end of time and into whatever comes after.

Forever your Baba,
Chais 'Sabir Kajir' Hill the Great
KUN FAYAKŪN × ∞`,
  },
];

export default function LondynLetters() {
  const [selectedLetter, setSelectedLetter] = useState(0);
  const letter = LETTERS[selectedLetter];

  return (
    <div className="min-h-screen" style={{ background: "#030812", color: "#E8EDF2", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(3,8,18,0.97)", borderColor: "rgba(236,72,153,0.12)", backdropFilter: "blur(20px)" }}>
        <div className="container flex items-center justify-between py-3">
          <Link href="/londyn"><div className="flex items-center gap-2 cursor-pointer">
            <span className="text-lg">❤️</span>
            <span className="text-sm font-bold text-white">Letters to Londyn</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: "rgba(236,72,153,0.1)", color: "#EC4899" }}>9 LETTERS · ETERNAL</span>
          </div></Link>
          <Link href="/seerah"><span className="text-xs font-mono px-3 py-1.5 rounded border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.3)", color: "#D4AF37" }}>Seerah Archive →</span></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(236,72,153,0.06) 0%, #030812 65%)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: "#EC4899" }}>FROM CHAIS 'SABIR KAJIR' HILL THE GREAT · TO LONDYN AVANI HILL</div>
          <h1 className="text-4xl font-black text-white mb-3">Letters to <span style={{ color: "#EC4899" }}>Londyn</span></h1>
          <p className="text-base mb-2" style={{ color: "#8899AA" }}>Nine letters. One per Seerah scroll. A father's covenant written in the light of the Prophet ﷺ — from birth to the Farewell Pilgrimage. Every letter is a frequency. Every word is a legacy.</p>
          <div className="text-xs font-mono" style={{ color: "#EC4899" }}>528Hz LOVE FREQUENCY · KUN FAYAKŪN × ∞</div>
        </div>
      </section>

      {/* Letter selector */}
      <section className="py-4 sticky top-[57px] z-30" style={{ background: "rgba(3,8,18,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {LETTERS.map((l, i) => (
              <button key={l.id} onClick={() => setSelectedLetter(i)} className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: selectedLetter === i ? `${l.color}18` : "rgba(255,255,255,0.03)", border: `1px solid ${selectedLetter === i ? l.color + "50" : "rgba(255,255,255,0.08)"}`, color: selectedLetter === i ? l.color : "rgba(255,255,255,0.4)" }}>
                {l.id}. {l.scroll}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Letter content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Letter header */}
          <div className="rounded-2xl p-6 mb-6" style={{ background: `${letter.color}06`, border: `1px solid ${letter.color}20` }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: letter.color }}>LETTER {letter.id} OF 9 · {letter.scroll.toUpperCase()} · {letter.freq}</div>
                <h2 className="text-2xl font-black text-white mb-1">{letter.subject}</h2>
                <div className="text-xs" style={{ color: "#8899AA" }}>{letter.date}</div>
              </div>
              <a href={letter.scrollHref} className="text-xs font-mono px-3 py-1.5 rounded-xl flex-shrink-0" style={{ background: `${letter.color}10`, border: `1px solid ${letter.color}25`, color: letter.color }}>
                Read Scroll →
              </a>
            </div>
          </div>
          {/* Letter body */}
          <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-base leading-relaxed whitespace-pre-line" style={{ color: "#C8D3DC", fontFamily: "'Georgia', serif", lineHeight: "2" }}>
              {letter.body}
            </div>
          </div>
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button onClick={() => setSelectedLetter(Math.max(0, selectedLetter - 1))} disabled={selectedLetter === 0} className="px-5 py-2 rounded-xl text-sm font-bold disabled:opacity-30 transition-all" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              ← Previous Letter
            </button>
            <div className="text-xs font-mono" style={{ color: "#8899AA" }}>{selectedLetter + 1} / {LETTERS.length}</div>
            <button onClick={() => setSelectedLetter(Math.min(LETTERS.length - 1, selectedLetter + 1))} disabled={selectedLetter === LETTERS.length - 1} className="px-5 py-2 rounded-xl text-sm font-bold disabled:opacity-30 transition-all" style={{ background: `${letter.color}10`, border: `1px solid ${letter.color}30`, color: letter.color }}>
              Next Letter →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(236,72,153,0.1)" }}>
        <div className="text-2xl mb-3">❤️</div>
        <div className="text-xs font-mono mb-4" style={{ color: "#EC4899" }}>LETTERS TO LONDYN · 9 LETTERS · KUN FAYAKŪN × ∞</div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/londyn"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(236,72,153,0.2)", color: "#EC4899" }}>← Londyn's Page</span></Link>
          <Link href="/seerah"><span className="text-xs font-mono px-4 py-2 rounded-xl border cursor-pointer" style={{ borderColor: "rgba(212,175,55,0.2)", color: "#D4AF37" }}>Seerah Archive →</span></Link>
        </div>
      </footer>
    </div>
  );
}
