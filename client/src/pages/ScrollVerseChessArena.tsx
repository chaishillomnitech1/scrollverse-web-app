import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chess, type Move, type Piece, type Square } from "chess.js";
import { Link } from "wouter";
import { toast } from "sonner";
import { ChessArenaBackdrop } from "@/components/ChessArenaBackdrop";
import { PortalTrustLens } from "@/components/PortalTrustLens";
import { useSovereignHeartbeat } from "@/hooks/useSovereignHeartbeat";

type Side = "w" | "b";
type Difficulty = "gentle" | "tactical" | "deep";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const symbols: Record<Side, Record<Piece["type"], string>> = {
  w: { p: "♙", n: "♘", b: "♗", r: "♖", q: "♕", k: "♔" },
  b: { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" },
};
const values: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

const learningPaths = [
  {
    id: "foundation",
    level: "BEGINNER · BOARD FOUNDATIONS",
    title: "See the whole board",
    color: "#00FF88",
    purpose: "Learn legal movement, safe development, and how to give every move a reason.",
    checkpoints: ["Name the piece and its legal destinations.", "Bring a central pawn or piece into play.", "Ask where each king is safe before chasing a capture."],
    prompt: "I am learning chess fundamentals. After each move, ask me to name the piece, the legal idea, and one king-safety check. Do not give a move automatically; help me reason one step at a time.",
  },
  {
    id: "tactics",
    level: "INTERMEDIATE · TACTICAL VISION",
    title: "Find the pattern before the move",
    color: "#00D4FF",
    purpose: "Train attention for checks, captures, threats, loose pieces, and defensive replies.",
    checkpoints: ["Scan checks, captures, and threats in that order.", "Say what the opponent can do next.", "Choose a line that improves a piece or protects the king."],
    prompt: "I am practicing chess tactics. Give me one short position concept at a time and ask me to identify checks, captures, threats, and the opponent’s best reply. Explain the pattern after I answer without claiming perfect engine evaluation.",
  },
  {
    id: "strategy",
    level: "ADVANCED · STRATEGY & ENDGAMES",
    title: "Convert a plan with patience",
    color: "#B98CFF",
    purpose: "Connect pawn structure, piece activity, prophylaxis, and calm endgame technique.",
    checkpoints: ["Describe the long-term imbalance.", "Improve the least active piece.", "Write the opponent’s plan before committing to yours."],
    prompt: "I am studying chess strategy and endgames. Help me state the imbalance, improve my least active piece, and test the opponent’s plan. Use questions and explain trade-offs; do not present a speculative line as a guaranteed best move.",
  },
] as const;

const practiceScenarios = [
  {
    id: "opening",
    tag: "FIRST 10 MOVES",
    title: "Open with intention",
    question: "Which piece is least active, and how does your next move improve development without exposing your king?",
    focus: "Development · center · king safety",
  },
  {
    id: "tactics",
    tag: "TACTICAL PAUSE",
    title: "Slow the board down",
    question: "Before you move, list every check, capture, and direct threat for both sides. What changes after the reply?",
    focus: "Calculation · reply awareness · defense",
  },
  {
    id: "endgame",
    tag: "ENDGAME PATIENCE",
    title: "Make the king a piece",
    question: "In a simplified position, where can your king become more active without walking into danger?",
    focus: "King activity · pawn structure · conversion",
  },
] as const;

const readinessItems = [
  "Named adult facilitator or school/community contact",
  "Age-appropriate safeguarding and participation plan",
  "Accessible materials and language-support plan",
  "Clear data, photography, and communication permissions",
  "Independent rules, venue, and partner confirmation",
] as const;

function chooseLocalMove(chess: Chess, difficulty: Difficulty) {
  const legal = chess.moves({ verbose: true }) as Move[];
  if (!legal.length) return null;
  if (difficulty === "gentle") return legal[0];
  const ranked = [...legal].sort((a, b) => {
    const score = (move: Move) => (move.captured ? values[move.captured] * 10 : 0) + (move.san.includes("+") ? 2 : 0) + (move.san.includes("#") ? 100 : 0);
    return score(b) - score(a) || a.san.localeCompare(b.san);
  });
  return difficulty === "deep" ? ranked[Math.min(1, ranked.length - 1)] : ranked[0];
}

function statusFor(chess: Chess, player: Side) {
  if (chess.isCheckmate()) return chess.turn() === player ? "Checkmate — the local guide closes this round." : "Checkmate — you closed the board.";
  if (chess.isStalemate() || chess.isInsufficientMaterial() || chess.isThreefoldRepetition()) return "Draw state reached. Reset to explore a new line.";
  if (chess.isCheck()) return chess.turn() === player ? "Your king is in check. Select a legal response." : "The local guide is in check.";
  return chess.turn() === player ? "Your turn. Select a piece and one highlighted destination." : "Local guide is considering a legal response…";
}

function OperatingState({ state }: { state: "available now" | "research" | "requires owner release" }) {
  const styles = {
    "available now": { color: "#00FF88", border: "rgba(0,255,136,.45)", background: "rgba(0,255,136,.08)" },
    research: { color: "#00D4FF", border: "rgba(0,212,255,.45)", background: "rgba(0,212,255,.08)" },
    "requires owner release": { color: "#FFCC7C", border: "rgba(255,184,0,.45)", background: "rgba(255,184,0,.08)" },
  }[state];

  return <span className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[.12em]" style={{ color: styles.color, borderColor: styles.border, background: styles.background }}>{state}</span>;
}

export default function ScrollVerseChessArena() {
  useSovereignHeartbeat({ page: "scrollverse-chess-arena" });
  const chessRef = useRef(new Chess());
  const opponentTimer = useRef<number | null>(null);
  const [player, setPlayer] = useState<Side>("w");
  const [difficulty, setDifficulty] = useState<Difficulty>("tactical");
  const [selected, setSelected] = useState<Square | null>(null);
  const [position, setPosition] = useState(chessRef.current.fen());
  const [history, setHistory] = useState<string[]>([]);
  const [muted, setMuted] = useState(true);
  const [activePathId, setActivePathId] = useState<(typeof learningPaths)[number]["id"]>("foundation");
  const [activeScenarioId, setActiveScenarioId] = useState<(typeof practiceScenarios)[number]["id"]>("opening");
  const [transcript, setTranscript] = useState("Aegis Scribe: The board is ready. Every local move is checked before it appears.");

  const activePath = learningPaths.find(path => path.id === activePathId) ?? learningPaths[0];
  const activeScenario = practiceScenarios.find(scenario => scenario.id === activeScenarioId) ?? practiceScenarios[0];

  const sync = useCallback(() => {
    setPosition(chessRef.current.fen());
    setHistory(chessRef.current.history());
  }, []);

  const speak = useCallback((text: string) => {
    setTranscript(`Aegis Scribe: ${text}`);
    if (muted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 0.88;
    window.speechSynthesis.speak(utterance);
  }, [muted]);

  const performOpponent = useCallback((activePlayer: Side) => {
    const chosen = chooseLocalMove(chessRef.current, difficulty);
    if (!chosen) { sync(); return; }
    chessRef.current.move({ from: chosen.from, to: chosen.to, promotion: chosen.promotion ?? "q" });
    sync();
    speak(`Local guide played ${chosen.san}. ${statusFor(chessRef.current, activePlayer)}`);
  }, [difficulty, speak, sync]);

  useEffect(() => () => { if (opponentTimer.current) window.clearTimeout(opponentTimer.current); }, []);

  const reset = useCallback((side: Side = player) => {
    if (opponentTimer.current) window.clearTimeout(opponentTimer.current);
    chessRef.current = new Chess();
    setPlayer(side);
    setSelected(null);
    sync();
    speak(side === "w" ? "New board. You have white and the first move." : "New board. You chose black; the local guide opens.");
    if (side === "b") opponentTimer.current = window.setTimeout(() => performOpponent(side), 480);
  }, [performOpponent, player, speak, sync]);

  const legalTargets = useMemo(() => {
    if (!selected) return new Set<string>();
    const moves = chessRef.current.moves({ square: selected, verbose: true }) as Move[];
    return new Set<Square>(moves.map(move => move.to));
  }, [position, selected]);

  const clickSquare = (square: Square) => {
    const chess = chessRef.current;
    if (chess.isGameOver() || chess.turn() !== player) return;
    const piece = chess.get(square);
    if (selected && legalTargets.has(square)) {
      const move = chess.move({ from: selected, to: square, promotion: "q" });
      if (!move) return;
      setSelected(null);
      sync();
      speak(`You played ${move.san}. ${statusFor(chess, player)}`);
      opponentTimer.current = window.setTimeout(() => performOpponent(player), 480);
      return;
    }
    if (piece?.color === player) {
      setSelected(square);
      const count = (chess.moves({ square, verbose: true }) as Move[]).length;
      speak(`${square} selected. ${count} legal destinations highlighted.`);
    } else setSelected(null);
  };

  const copyPracticePrompt = async () => {
    const prompt = `${activePath.prompt}\n\nCurrent focus: ${activeScenario.title}. Ask me this first: ${activeScenario.question}`;
    if (!navigator.clipboard) {
      toast.info("Clipboard access is unavailable here. You can select and copy the visible prompt manually.");
      return;
    }
    await navigator.clipboard.writeText(prompt);
    toast.success("Local study prompt copied. Choose any compatible AI or study partner yourself.");
  };

  const board = chessRef.current.board();
  const status = statusFor(chessRef.current, player);
  const guide = chessRef.current.isGameOver()
    ? "This round is complete. Reset to explore a different line."
    : chessRef.current.turn() === player
      ? selected ? "Legal destinations are highlighted. Captures and checks are validated locally." : `Today’s ${activePath.title.toLowerCase()} focus: ${activePath.checkpoints[0]}`
      : "The local guide uses a bounded local heuristic. It is not a networked chess engine and does not claim perfect play.";

  return (
    <main className="min-h-screen overflow-hidden bg-[#030919] px-4 py-10 text-white sm:px-6 lg:px-10">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.3rem] border border-[#00D4FF]/25 bg-[#071124] p-5 shadow-[0_0_80px_rgba(0,212,255,.09)] sm:p-8">
        <ChessArenaBackdrop />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-sm font-black text-[#00D4FF]">← Return to ScrollVerse</Link>
            <div className="flex flex-wrap gap-2">
              <Link href="/open-knowledge-verse" className="rounded-lg border border-[#B98CFF]/45 px-3 py-2 text-xs font-black text-[#D6C4FF]">Open Knowledge Verse</Link>
              <Link href="/co-creation-navigator" className="rounded-lg border border-[#00FF88]/45 px-3 py-2 text-xs font-black text-[#00FF88]">Co-create safely</Link>
            </div>
          </div>

          <header className="mt-9 grid gap-5 lg:grid-cols-[1.18fr_.82fr]">
            <div>
              <div className="text-xs font-mono tracking-[.2em] text-[#FFCC7C]">ORIGINAL BROWSER GAME · FREE LEARNING · LOCAL PRACTICE</div>
              <h1 className="mt-3 text-4xl font-black leading-[.92] sm:text-6xl">ScrollVerse<br /><span className="text-[#00D4FF]">Chess Initiative</span></h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#D6E2EE]">A creator-directed strategy table for deliberate play: learn the board, train your attention, and build a reasoned move—without rankings, wagers, personal profiles, or a claim of perfect external analysis.</p>
              <div className="mt-5 flex flex-wrap gap-2"><OperatingState state="available now" /><OperatingState state="research" /><OperatingState state="requires owner release" /></div>
            </div>
            <div className="rounded-3xl border border-[#FFB800]/35 bg-[#FFB800]/[.07] p-5">
              <div className="text-xs font-mono tracking-[.16em] text-[#FFCC7C]">YOUR LOCAL ROUND</div>
              <div role="status" aria-live="polite" className="mt-3 text-lg font-black">{status}</div>
              <p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{guide}</p>
              <div className="mt-4 border-t border-[#FFB800]/20 pt-4 text-xs leading-5 text-[#D6E2EE]">The board, history, visible guide, and optional device voice remain on this device during the session. No account or learner record is created.</div>
            </div>
          </header>

          <PortalTrustLens lane="ScrollVerse Chess Initiative" source="Original first-party interface; chess.js local rules engine; local curriculum and practice prompts; public safeguarding references listed below." readiness="Playable local board, legal-move validation, three learning pathways, practice prompts, visible transcript, device-voice control, and youth-supported participation guidance are available now." boundary="No account, profile, matchmaking, public chat, player rating, prize, wager, token, payment, external engine, partner relationship, or game record is created. The local guide is not a professional coaching service or a perfect engine." />

          <section className="mt-8 rounded-[2rem] border border-[#00D4FF]/20 bg-[#061226]/85 p-5 sm:p-6" aria-labelledby="learning-pathways-heading">
            <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">FREE KNOWLEDGE PATHWAYS</div><h2 id="learning-pathways-heading" className="mt-2 text-2xl font-black">Build the next move from understanding</h2></div><p className="max-w-xl text-sm leading-6 text-[#AFC3D8]">Choose a path that fits today’s practice. These are study guides, not ratings, credentials, or promises of a result.</p></div>
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {learningPaths.map(path => <button key={path.id} type="button" onClick={() => { setActivePathId(path.id); speak(`${path.title}. ${path.purpose}`); }} className="rounded-2xl border p-5 text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#00D4FF]" style={{ borderColor: activePathId === path.id ? path.color : "rgba(255,255,255,.12)", background: activePathId === path.id ? `${path.color}14` : "rgba(255,255,255,.025)", boxShadow: activePathId === path.id ? `0 0 28px ${path.color}18` : "none" }}><div className="text-[10px] font-black tracking-[.15em]" style={{ color: path.color }}>{path.level}</div><h3 className="mt-2 text-lg font-black">{path.title}</h3><p className="mt-2 text-sm leading-6 text-[#D6E2EE]">{path.purpose}</p><span className="mt-4 inline-block text-xs font-black" style={{ color: path.color }}>{activePathId === path.id ? "ACTIVE STUDY PATH" : "Choose this path"} →</span></button>)}
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <article className="rounded-[2rem] border border-white/10 bg-[#030A18]/85 p-3 shadow-2xl sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-mono text-[#B8C7D6]"><span className="h-2 w-2 rounded-full bg-[#00FF88] shadow-[0_0_12px_#00FF88]" />LOCAL RULES ACTIVE</div><div className="text-xs font-mono text-[#FFCC7C]">{history.length} ply recorded</div></div>
              <div className="mx-auto grid aspect-square w-full max-w-[680px] grid-cols-8 overflow-hidden rounded-2xl border border-[#B98CFF]/30 shadow-[0_0_55px_rgba(185,140,255,.16)]">{board.flatMap((row, rowIndex) => row.map((piece, colIndex) => { const square = `${files[colIndex]}${8 - rowIndex}` as Square; const light = (rowIndex + colIndex) % 2 === 0; const target = legalTargets.has(square); const capture = Boolean(target && piece); return <button key={square} type="button" onClick={() => clickSquare(square)} aria-label={`${square}${piece ? ` ${piece.color === "w" ? "white" : "black"} ${piece.type}` : " empty"}${target ? " legal destination" : ""}`} className="relative flex min-h-0 items-center justify-center text-[clamp(1.7rem,6vw,4.8rem)] transition focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#00D4FF]" style={{ background: light ? "linear-gradient(145deg, #E6C7A7, #C99B76)" : "linear-gradient(145deg, #153D62, #09223D)", color: piece?.color === "w" ? "#FFF9EF" : "#060B18", textShadow: piece?.color === "w" ? "0 2px 0 #6B3A30, 0 0 20px rgba(255,255,255,.45)" : "0 2px 0 #000, 0 0 14px rgba(0,0,0,.85)", boxShadow: selected === square ? "inset 0 0 0 4px #00D4FF" : target ? "inset 0 0 0 3px #00FF88" : "none" }}><span aria-hidden="true">{piece ? symbols[piece.color][piece.type] : ""}</span>{target && <span aria-hidden="true" className={`absolute h-3 w-3 rounded-full ${capture ? "border-2 border-[#FF6B9A] bg-[#FF6B9A]/20" : "bg-[#00FF88]/85"}`} />}{(colIndex === 0 || rowIndex === 7) && <span aria-hidden="true" className="absolute text-[9px] font-black opacity-55" style={{ left: colIndex === 0 ? 4 : undefined, bottom: rowIndex === 7 ? 3 : undefined, color: light ? "#153D62" : "#E6C7A7" }}>{colIndex === 0 ? 8 - rowIndex : ""}{rowIndex === 7 ? files[colIndex] : ""}</span>}</button>; }))}</div>
              <p className="mt-4 text-center text-xs leading-6 text-[#AFC3D8]">Select one of your pieces, then select a green legal destination. Promotions default to a queen for this browser-local first release.</p>
            </article>

            <aside className="space-y-4">
              <section className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.055] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">LOCAL ARENA CONTROLS</div><label className="mt-4 block text-xs font-mono text-[#B8C7D6]" htmlFor="chess-side">Your side</label><select id="chess-side" value={player} onChange={event => reset(event.target.value as Side)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm font-bold text-white"><option value="w">White — move first</option><option value="b">Black — local guide opens</option></select><label className="mt-4 block text-xs font-mono text-[#B8C7D6]" htmlFor="chess-difficulty">Local guide style</label><select id="chess-difficulty" value={difficulty} onChange={event => setDifficulty(event.target.value as Difficulty)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm font-bold text-white"><option value="gentle">Gentle — first legal line</option><option value="tactical">Tactical — captures/checks favored</option><option value="deep">Deep — alternate local priority</option></select><button type="button" onClick={() => reset(player)} className="mt-4 w-full rounded-xl border border-[#FFB800]/60 bg-[#FFB800]/10 px-4 py-3 text-sm font-black text-[#FFCC7C]">Reset board</button></section>
              <section className="rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.055] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">AEGIS SCRIBE · VOICE-READY</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{transcript}</p><div className="mt-4 flex gap-2"><button type="button" onClick={() => { setMuted(value => !value); toast.success(muted ? "Device voice enabled for the next guide message." : "Device voice muted."); }} className="flex-1 rounded-lg border border-[#B98CFF]/50 px-3 py-2 text-xs font-black text-[#D6C4FF]">{muted ? "Enable device voice" : "Mute device voice"}</button><button type="button" onClick={() => speak(guide)} className="rounded-lg border border-white/20 px-3 py-2 text-xs font-black text-white">Repeat guide</button></div><p className="mt-3 text-xs leading-5 text-[#AFC3D8]">Uses your browser’s installed voice only after a click. The transcript stays visible. Availability and voice quality vary by device.</p></section>
              <section className="rounded-3xl border border-white/10 bg-white/[.025] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#00FF88]">MOVE LEDGER</div><ol className="mt-3 max-h-44 space-y-1 overflow-auto pr-1 text-sm text-[#D6E2EE]">{history.length ? history.map((move, index) => <li key={`${move}-${index}`} className="font-mono"><span className="mr-2 text-[#00D4FF]">{index + 1}.</span>{move}</li>) : <li className="text-[#AFC3D8]">No moves yet. Open with a patient first line.</li>}</ol></section>
            </aside>
          </section>

          <section className="mt-7 grid gap-5 lg:grid-cols-[.9fr_1.1fr]" aria-labelledby="practice-heading">
            <article className="rounded-3xl border border-[#00FF88]/25 bg-[#00FF88]/[.045] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-xs font-mono tracking-[.16em] text-[#00FF88]">PRACTICE PROMPT · LOCAL COPY</div><h2 id="practice-heading" className="mt-2 text-2xl font-black">Ask an AI or study partner better questions</h2></div><OperatingState state="available now" /></div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">The prompt stays in your control. Copy it only if you choose, then use it with a compatible public AI, a coach, a family member, or a study group. No provider is connected here.</p><div className="mt-4 flex flex-wrap gap-2">{practiceScenarios.map(scenario => <button key={scenario.id} type="button" onClick={() => { setActiveScenarioId(scenario.id); speak(`${scenario.title}. ${scenario.question}`); }} className="rounded-xl border px-3 py-2 text-left text-xs font-black transition" style={{ borderColor: activeScenarioId === scenario.id ? "#00FF88" : "rgba(255,255,255,.16)", color: activeScenarioId === scenario.id ? "#00FF88" : "#D6E2EE", background: activeScenarioId === scenario.id ? "rgba(0,255,136,.1)" : "transparent" }}>{scenario.tag}</button>)}</div><div className="mt-4 rounded-2xl border border-white/10 bg-[#030A18]/70 p-4"><div className="text-xs font-black text-[#FFCC7C]">{activeScenario.title}</div><p className="mt-2 text-sm leading-6 text-white">{activeScenario.question}</p><p className="mt-3 text-xs text-[#AFC3D8]">Focus: {activeScenario.focus}</p></div><button type="button" onClick={() => void copyPracticePrompt()} className="mt-4 w-full rounded-xl border border-[#00FF88]/55 bg-[#00FF88]/10 px-4 py-3 text-sm font-black text-[#00FF88]">Copy study prompt</button></article>
            <article className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.045] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">TODAY’S {activePath.level}</div><h2 className="mt-2 text-2xl font-black">{activePath.title}</h2><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{activePath.purpose}</p><ol className="mt-5 space-y-3">{activePath.checkpoints.map((checkpoint, index) => <li key={checkpoint} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black" style={{ color: activePath.color, background: `${activePath.color}18` }}>{index + 1}</span><span className="text-sm leading-6 text-[#D6E2EE]">{checkpoint}</span></li>)}</ol><p className="mt-5 rounded-2xl border border-[#00D4FF]/15 bg-black/10 p-3 text-xs leading-5 text-[#AFC3D8]">Suggested practice: play five intentional moves, then use the visible move ledger to explain one decision you would keep and one you would reconsider.</p></article>
          </section>

          <section className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-[#FFB800]/30 bg-[#FFB800]/[.045] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="text-xs font-mono tracking-[.16em] text-[#FFCC7C]">ADULT-SUPPORTED PARTICIPATION</div><OperatingState state="research" /></div><h2 className="mt-2 text-2xl font-black">Youth learning belongs in a safe, supported space</h2><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">For children and young people, use this page with a parent, guardian, educator, or approved facilitator. Keep the session on a shared or supervised device, choose age-appropriate study content, and pause if play stops feeling safe or constructive.</p><ul className="mt-4 space-y-2 text-sm leading-6 text-[#D6E2EE]"><li>• This page has no public chat, profile, direct messaging, matchmaking, or leaderboard.</li><li>• Do not post a child’s name, photograph, school, location, game record, or contact details here.</li><li>• Any future group, event, mentoring, or competition pathway requires its own safeguarding, consent, and owner-release record.</li></ul></article>
            <article className="rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.045] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">PARTNERSHIP READINESS</div><OperatingState state="requires owner release" /></div><h2 className="mt-2 text-2xl font-black">A programme is more than a link or a claim</h2><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">Schools, community spaces, clubs, mentors, and accessibility partners can use this checklist to understand the evidence needed before any public activity is announced.</p><ul className="mt-4 space-y-2">{readinessItems.map(item => <li key={item} className="flex gap-3 rounded-xl border border-white/10 bg-black/10 p-3 text-sm leading-5 text-[#D6E2EE]"><span className="text-[#D6C4FF]">□</span>{item}</li>)}</ul></article>
          </section>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[.025] p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><div className="text-xs font-mono tracking-[.16em] text-[#B8C7D6]">SOURCE & SAFEGUARDING TRAIL</div><h2 className="mt-2 text-xl font-black">Study openly. Run youth programmes responsibly.</h2></div><Link href="/open-knowledge-verse" className="rounded-xl border border-[#00D4FF]/40 px-4 py-3 text-sm font-black text-[#00D4FF]">More free learning →</Link></div><div className="mt-4 grid gap-3 md:grid-cols-3"><a href="https://www.fide.com/fide-partners-with-safe-sport-international-for-safeguarding-framework/" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 p-4 text-sm leading-6 text-[#D6E2EE] transition hover:border-[#00D4FF]/60"><span className="font-black text-[#00D4FF]">FIDE safeguarding framework</span><br />Public reference for safe and inclusive chess environments.</a><a href="https://new.uschess.org/us-chess-safe-play-hub" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 p-4 text-sm leading-6 text-[#D6E2EE] transition hover:border-[#00FF88]/60"><span className="font-black text-[#00FF88]">US Chess Safe Play Hub</span><br />Public safe-play policy, reporting, training, and resources.</a><a href="https://soc.fide.com/chess-for-protection" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 p-4 text-sm leading-6 text-[#D6E2EE] transition hover:border-[#FFCC7C]/60"><span className="font-black text-[#FFCC7C]">FIDE Chess for Protection</span><br />Public example of level-based materials, trained facilitators, and inclusive community learning.</a></div></section>

          <section className="mt-7 grid gap-4 md:grid-cols-3"><article className="rounded-3xl border border-[#00FF88]/25 bg-[#00FF88]/[.04] p-5"><div className="text-xs font-mono text-[#00FF88]">LEARN</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">Use the Open Knowledge Verse for source-labeled study paths, local notes, and correction-ready learning—not a credential claim.</p><Link href="/open-knowledge-verse" className="mt-4 inline-block text-sm font-black text-[#00FF88]">Open learning paths →</Link></article><article className="rounded-3xl border border-[#FFB800]/25 bg-[#FFB800]/[.04] p-5"><div className="text-xs font-mono text-[#FFCC7C]">ORIGINAL GAME DESIGN</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">The strategy table, local guide, palette, and visual layer are first-party ScrollVerse work. Chess rules are a public game system; no third-party game art or characters are used.</p><Link href="/ip-digital-evidence-navigator" className="mt-4 inline-block text-sm font-black text-[#FFCC7C]">Open evidence navigator →</Link></article><article className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-5"><div className="text-xs font-mono text-[#00D4FF]">CO-CREATE</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">Suggest an original puzzle, accessibility improvement, tutorial, or visual idea through the transparent contribution pathway.</p><Link href="/co-creation-navigator" className="mt-4 inline-block text-sm font-black text-[#00D4FF]">Suggest an improvement →</Link></article></section>
        </div>
      </section>
    </main>
  );
}
