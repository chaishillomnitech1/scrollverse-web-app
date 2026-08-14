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
  const [transcript, setTranscript] = useState("Aegis Scribe: The board is ready. Every local move is checked before it appears.");

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

  const board = chessRef.current.board();
  const status = statusFor(chessRef.current, player);
  const guide = chessRef.current.isGameOver()
    ? "This round is complete. Reset to explore a different line."
    : chessRef.current.turn() === player
      ? selected ? "Legal destinations are highlighted. Captures and checks are validated locally." : "Begin with development, king safety, and a documented reason for each move."
      : "The local guide uses a bounded local heuristic. It is not a networked chess engine and does not claim perfect play.";

  return <main className="min-h-screen overflow-hidden bg-[#030919] px-4 py-10 text-white sm:px-6 lg:px-10"><section className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.3rem] border border-[#00D4FF]/25 bg-[#071124] p-5 shadow-[0_0_80px_rgba(0,212,255,.09)] sm:p-8"><ChessArenaBackdrop /><div className="relative z-10"><div className="flex flex-wrap items-center justify-between gap-4"><Link href="/" className="text-sm font-black text-[#00D4FF]">← Return to ScrollVerse</Link><div className="flex flex-wrap gap-2"><Link href="/open-knowledge-verse" className="rounded-lg border border-[#B98CFF]/45 px-3 py-2 text-xs font-black text-[#D6C4FF]">Open Knowledge Verse</Link><Link href="/voice-language-studio" className="rounded-lg border border-[#00FF88]/45 px-3 py-2 text-xs font-black text-[#00FF88]">Voice & Language</Link></div></div><header className="mt-9 grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div><div className="text-xs font-mono tracking-[.2em] text-[#FFCC7C]">ORIGINAL BROWSER GAME · LOCAL RULES · ACCESSIBLE STRATEGY LAB</div><h1 className="mt-3 text-4xl font-black leading-[.92] sm:text-6xl">ScrollVerse<br /><span className="text-[#00D4FF]">Chess Arena</span></h1><p className="mt-5 max-w-3xl text-sm leading-7 text-[#D6E2EE]">An original strategy table for deliberate play. Every move is validated in this browser; the Aegis Scribe gives bounded local guidance, not an infallible external verdict.</p></div><div className="rounded-3xl border border-[#FFB800]/35 bg-[#FFB800]/[.07] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#FFCC7C]">ARENA STATUS</div><div role="status" aria-live="polite" className="mt-3 text-lg font-black">{status}</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{guide}</p></div></header><PortalTrustLens lane="Chess Arena" source="Original first-party interface; chess.js local rules engine; Babylon procedural visual backdrop; visitor device speech synthesis if enabled." readiness="Playable local board, move history, difficulty setting, player-side choice, guidance transcript, and browser-voice readiness controls are available now." boundary="No account, rating, wager, prize, token, payment, external engine, voice clone, user profile, or game record is created. The local guide is not a professional coaching service or a perfect engine." /><section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"><article className="rounded-[2rem] border border-white/10 bg-[#030A18]/85 p-3 shadow-2xl sm:p-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-mono text-[#B8C7D6]"><span className="h-2 w-2 rounded-full bg-[#00FF88] shadow-[0_0_12px_#00FF88]" />LOCAL RULES ACTIVE</div><div className="text-xs font-mono text-[#FFCC7C]">{history.length} ply recorded</div></div><div className="mx-auto grid aspect-square w-full max-w-[680px] grid-cols-8 overflow-hidden rounded-2xl border border-[#B98CFF]/30 shadow-[0_0_55px_rgba(185,140,255,.16)]">{board.flatMap((row, rowIndex) => row.map((piece, colIndex) => { const square = `${files[colIndex]}${8 - rowIndex}` as Square; const light = (rowIndex + colIndex) % 2 === 0; const target = legalTargets.has(square); const capture = Boolean(target && piece); return <button key={square} type="button" onClick={() => clickSquare(square)} aria-label={`${square}${piece ? ` ${piece.color === "w" ? "white" : "black"} ${piece.type}` : " empty"}${target ? " legal destination" : ""}`} className="relative flex min-h-0 items-center justify-center text-[clamp(1.7rem,6vw,4.8rem)] transition focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#00D4FF]" style={{ background: light ? "linear-gradient(145deg, #E6C7A7, #C99B76)" : "linear-gradient(145deg, #153D62, #09223D)", color: piece?.color === "w" ? "#FFF9EF" : "#060B18", textShadow: piece?.color === "w" ? "0 2px 0 #6B3A30, 0 0 20px rgba(255,255,255,.45)" : "0 2px 0 #000, 0 0 14px rgba(0,0,0,.85)", boxShadow: selected === square ? "inset 0 0 0 4px #00D4FF" : target ? "inset 0 0 0 3px #00FF88" : "none" }}><span aria-hidden="true">{piece ? symbols[piece.color][piece.type] : ""}</span>{target && <span aria-hidden="true" className={`absolute h-3 w-3 rounded-full ${capture ? "border-2 border-[#FF6B9A] bg-[#FF6B9A]/20" : "bg-[#00FF88]/85"}`} />}{(colIndex === 0 || rowIndex === 7) && <span aria-hidden="true" className="absolute text-[9px] font-black opacity-55" style={{ left: colIndex === 0 ? 4 : undefined, bottom: rowIndex === 7 ? 3 : undefined, color: light ? "#153D62" : "#E6C7A7" }}>{colIndex === 0 ? 8 - rowIndex : ""}{rowIndex === 7 ? files[colIndex] : ""}</span>}</button>; }))}</div><p className="mt-4 text-center text-xs leading-6 text-[#AFC3D8]">Select one of your pieces, then select a green legal destination. Promotions default to a queen for this local first release.</p></article><aside className="space-y-4"><section className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.055] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#00D4FF]">LOCAL ARENA CONTROLS</div><label className="mt-4 block text-xs font-mono text-[#B8C7D6]" htmlFor="chess-side">Your side</label><select id="chess-side" value={player} onChange={event => reset(event.target.value as Side)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm font-bold text-white"><option value="w">White — move first</option><option value="b">Black — local guide opens</option></select><label className="mt-4 block text-xs font-mono text-[#B8C7D6]" htmlFor="chess-difficulty">Local guide style</label><select id="chess-difficulty" value={difficulty} onChange={event => setDifficulty(event.target.value as Difficulty)} className="mt-2 w-full rounded-xl border border-white/15 bg-[#061226] px-3 py-3 text-sm font-bold text-white"><option value="gentle">Gentle — first legal line</option><option value="tactical">Tactical — captures/checks favored</option><option value="deep">Deep — alternate local priority</option></select><button type="button" onClick={() => reset(player)} className="mt-4 w-full rounded-xl border border-[#FFB800]/60 bg-[#FFB800]/10 px-4 py-3 text-sm font-black text-[#FFCC7C]">Reset board</button></section><section className="rounded-3xl border border-[#B98CFF]/30 bg-[#B98CFF]/[.055] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#D6C4FF]">AEGIS SCRIBE · VOICE-READY</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">{transcript}</p><div className="mt-4 flex gap-2"><button type="button" onClick={() => { setMuted(value => !value); toast.success(muted ? "Device voice enabled for the next guide message." : "Device voice muted."); }} className="flex-1 rounded-lg border border-[#B98CFF]/50 px-3 py-2 text-xs font-black text-[#D6C4FF]">{muted ? "Enable device voice" : "Mute device voice"}</button><button type="button" onClick={() => speak(guide)} className="rounded-lg border border-white/20 px-3 py-2 text-xs font-black text-white">Repeat guide</button></div><p className="mt-3 text-xs leading-5 text-[#AFC3D8]">Uses your browser’s installed voice only after a click. The transcript stays visible. Availability and voice quality vary by device.</p></section><section className="rounded-3xl border border-white/10 bg-white/[.025] p-5"><div className="text-xs font-mono tracking-[.16em] text-[#00FF88]">MOVE LEDGER</div><ol className="mt-3 max-h-44 space-y-1 overflow-auto pr-1 text-sm text-[#D6E2EE]">{history.length ? history.map((move, index) => <li key={`${move}-${index}`} className="font-mono"><span className="mr-2 text-[#00D4FF]">{index + 1}.</span>{move}</li>) : <li className="text-[#AFC3D8]">No moves yet. Open with a patient first line.</li>}</ol></section></aside></section><section className="mt-7 grid gap-4 md:grid-cols-3"><article className="rounded-3xl border border-[#00FF88]/25 bg-[#00FF88]/[.04] p-5"><div className="text-xs font-mono text-[#00FF88]">LEARN</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">Use the Open Knowledge Verse for source-labeled study paths, local notes, and correction-ready learning—not a credential claim.</p><Link href="/open-knowledge-verse" className="mt-4 inline-block text-sm font-black text-[#00FF88]">Open learning paths →</Link></article><article className="rounded-3xl border border-[#FFB800]/25 bg-[#FFB800]/[.04] p-5"><div className="text-xs font-mono text-[#FFCC7C]">ORIGINAL GAME DESIGN</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">The strategy table, guide, palette, and visual layer are first-party ScrollVerse work. Chess rules are a public game system; no third-party game art or characters are used.</p><Link href="/ip-digital-evidence-navigator" className="mt-4 inline-block text-sm font-black text-[#FFCC7C]">Open evidence navigator →</Link></article><article className="rounded-3xl border border-[#00D4FF]/25 bg-[#00D4FF]/[.04] p-5"><div className="text-xs font-mono text-[#00D4FF]">CO-CREATE</div><p className="mt-3 text-sm leading-6 text-[#D6E2EE]">Suggest an original puzzle, accessibility improvement, tutorial, or visual idea through the transparent contribution pathway.</p><Link href="/co-creation-navigator" className="mt-4 inline-block text-sm font-black text-[#00D4FF]">Suggest an improvement →</Link></article></section></div></section></main>;
}
