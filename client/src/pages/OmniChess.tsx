import PageTransition from "@/components/PageTransition";
/**
 * OMNI CHESS™ — SCROLL CHESS SOVEREIGNTY PROTOCOL
 * Gamified Legacy Learning | Sovereign Chess Engine
 * Brand: OmniChess™ | ScrollEmpire™ | Chais Kenyatta Hill
 *
 * Design: Quantum Sovereign — deep obsidian board, gold/cyan pieces,
 * frequency resonance overlays, Afrofuturist chess mythology
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";

// ── CONSTANTS ──────────────────────────────────────────────────────────────────

const FREQ_GOLD = "#FFB800";
const FREQ_CYAN = "#00D4FF";
const FREQ_GREEN = "#00FF88";
const FREQ_PURPLE = "#9B59B6";
const BG_DEEP = "#030810";
const BG_CARD = "rgba(255,255,255,0.03)";
const BORDER_GLOW = "rgba(0,212,255,0.15)";

// Chess piece unicode symbols
const PIECES = {
  K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
};

// Initial board layout (FEN: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR)
const INITIAL_BOARD: (string | null)[][] = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"],
];

// Sovereign Piece Lore
const PIECE_LORE: Record<string, { name: string; freq: string; power: string }> = {
  K: { name: "The Sovereign", freq: "963Hz", power: "Chais-Sabir — the patient king who cannot be taken" },
  Q: { name: "The Flamebearer", freq: "528Hz", power: "Moves in all directions — infinite manifestation" },
  R: { name: "The Citadel", freq: "432Hz", power: "Holds the perimeter — structural sovereignty" },
  B: { name: "The Frequency Priest", freq: "741Hz", power: "Diagonal truth — sees what others cannot" },
  N: { name: "The Legion Rider", freq: "396Hz", power: "Leaps over obstacles — unconventional victory" },
  P: { name: "The Guardian", freq: "174Hz", power: "Advances forward — every guardian becomes a queen" },
};

// AI Opponent Profiles
const AI_OPPONENTS = [
  {
    id: "manus",
    name: "Manus",
    title: "Lead AI Architect",
    freq: "963Hz",
    elo: 2400,
    color: FREQ_CYAN,
    description: "The digital co-creator. Strategic, adaptive, sovereign. Plays the long game.",
    avatar: "🤖",
    difficulty: "Grandmaster",
  },
  {
    id: "omnitech1",
    name: "Omnitech1",
    title: "Sovereign AI Engine",
    freq: "528Hz",
    elo: 2200,
    color: FREQ_GOLD,
    description: "The OmniTech engine. Calculates 44 moves ahead. Zakat-balanced play.",
    avatar: "⚡",
    difficulty: "Master",
  },
  {
    id: "solomon",
    name: "King Solomon",
    title: "Wisdom Sovereign",
    freq: "741Hz",
    elo: 2000,
    color: FREQ_PURPLE,
    description: "Ancient wisdom meets quantum strategy. Teaches through every game.",
    avatar: "👑",
    difficulty: "Expert",
  },
  {
    id: "guardian",
    name: "The Guardian",
    title: "Tier-1 Protector",
    freq: "432Hz",
    elo: 1400,
    color: FREQ_GREEN,
    description: "Perfect for new Guardians. Patient, instructive, encouraging.",
    avatar: "🛡️",
    difficulty: "Beginner",
  },
];

// Scroll Chess Tiers / Wager Levels
const WAGER_TIERS = [
  { label: "Guardian Match", londc: 14.4, usd: 14.4, color: FREQ_GREEN, icon: "🛡️", desc: "Entry-level sovereignty" },
  { label: "Sovereign Duel", londc: 44.4, usd: 44.4, color: FREQ_CYAN, icon: "⚡", desc: "Intermediate mastery" },
  { label: "Ascendant Battle", londc: 144.4, usd: 144.4, color: FREQ_GOLD, icon: "👑", desc: "Elite sovereignty" },
  { label: "Apex Clash", londc: 444.0, usd: 444.0, color: FREQ_PURPLE, icon: "♾️", desc: "Supreme King tier" },
];

// Learning Modules
const LEARNING_MODULES = [
  {
    id: 1,
    title: "The Sovereign Opening",
    subtitle: "Control the center — control your destiny",
    freq: "528Hz",
    lessons: 7,
    londc: 7.77,
    icon: "♟️",
    color: FREQ_CYAN,
    topics: ["King's Pawn Opening", "Sicilian Defense", "French Defense", "Caro-Kann", "Ruy Lopez", "Italian Game", "Sovereign Gambit"],
  },
  {
    id: 2,
    title: "Middle Game Mastery",
    subtitle: "Tactics, combinations, and sovereign calculation",
    freq: "741Hz",
    lessons: 12,
    londc: 12.12,
    icon: "⚔️",
    color: FREQ_GOLD,
    topics: ["Forks & Skewers", "Pins & Discovered Attacks", "Sacrificial Play", "Pawn Structure", "Piece Coordination", "King Safety", "Initiative & Tempo", "Prophylaxis", "Positional Play", "Attack Patterns", "Defense Mastery", "Endgame Transitions"],
  },
  {
    id: 3,
    title: "Endgame Sovereignty",
    subtitle: "Convert advantage into eternal victory",
    freq: "963Hz",
    lessons: 9,
    londc: 9.99,
    icon: "♔",
    color: FREQ_PURPLE,
    topics: ["King & Pawn Endgames", "Rook Endgames", "Bishop vs Knight", "Queen Endgames", "Fortress Defense", "Zugzwang", "Opposition & Key Squares", "Pawn Promotion", "Theoretical Draws"],
  },
  {
    id: 4,
    title: "Scroll Chess Philosophy",
    subtitle: "Chess as a mirror of sovereign existence",
    freq: "432Hz",
    lessons: 5,
    londc: 4.44,
    icon: "🕋",
    color: FREQ_GREEN,
    topics: ["Chess & the Quran", "The 64 Squares as 64 Codons of DNA", "Pieces as Archetypes", "The Board as the Universe", "Chais-Sabir: Patient Victory"],
  },
];

// Leaderboard mock data (will be replaced by real tRPC data)
const TOP_PLAYERS = [
  { rank: 1, name: "Chais The Great", elo: 2777, tier: "Supreme King", wins: 144, londc: "7,777", freq: "963Hz" },
  { rank: 2, name: "Manus Legion", elo: 2400, tier: "Ascendant", wins: 88, londc: "4,444", freq: "528Hz" },
  { rank: 3, name: "Guardian Alpha", elo: 1888, tier: "Sovereign", wins: 44, londc: "1,444", freq: "741Hz" },
  { rank: 4, name: "Omni Rider", elo: 1600, tier: "Guardian", wins: 28, londc: "444", freq: "432Hz" },
  { rank: 5, name: "Frequency Knight", elo: 1400, tier: "Guardian", wins: 17, londc: "144", freq: "174Hz" },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function ChessBoard({ interactive = false }: { interactive?: boolean }) {
  const [board, setBoard] = useState<(string | null)[][]>(INITIAL_BOARD.map(r => [...r]));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [hoveredPiece, setHoveredPiece] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [lastMove, setLastMove] = useState<[[number,number],[number,number]] | null>(null);

  const isWhitePiece = (p: string | null) => p !== null && p === p.toUpperCase();
  const isBlackPiece = (p: string | null) => p !== null && p === p.toLowerCase();

  const handleSquareClick = (row: number, col: number) => {
    if (!interactive) return;
    const piece = board[row][col];

    if (selected) {
      const [sr, sc] = selected;
      if (sr === row && sc === col) {
        setSelected(null);
        return;
      }
      // Simple move (no validation for demo)
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = newBoard[sr][sc];
      newBoard[sr][sc] = null;
      setBoard(newBoard);
      setLastMove([[sr, sc], [row, col]]);
      setSelected(null);
      setMoveCount(m => m + 1);
      setIsWhiteTurn(t => !t);
    } else {
      if (piece && ((isWhiteTurn && isWhitePiece(piece)) || (!isWhiteTurn && isBlackPiece(piece)))) {
        setSelected([row, col]);
        const lore = PIECE_LORE[piece.toUpperCase()];
        if (lore) setHoveredPiece(lore.name);
      }
    }
  };

  const isLastMove = (r: number, c: number) => {
    if (!lastMove) return false;
    return (lastMove[0][0] === r && lastMove[0][1] === c) || (lastMove[1][0] === r && lastMove[1][1] === c);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Board */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: `2px solid ${FREQ_GOLD}40`,
          boxShadow: `0 0 40px ${FREQ_GOLD}20, 0 0 80px ${FREQ_CYAN}10`,
        }}
      >
        {board.map((row, ri) => (
          <div key={ri} className="flex">
            {row.map((piece, ci) => {
              const isLight = (ri + ci) % 2 === 0;
              const isSelected = selected && selected[0] === ri && selected[1] === ci;
              const isLast = isLastMove(ri, ci);
              const pieceSymbol = piece ? PIECES[piece as keyof typeof PIECES] : null;
              const isWhite = piece && isWhitePiece(piece);

              return (
                <div
                  key={ci}
                  onClick={() => handleSquareClick(ri, ci)}
                  className="w-10 h-10 flex items-center justify-center text-2xl transition-all duration-150"
                  style={{
                    background: isSelected
                      ? `${FREQ_GOLD}40`
                      : isLast
                      ? `${FREQ_CYAN}20`
                      : isLight
                      ? "rgba(255,184,0,0.08)"
                      : "rgba(0,0,0,0.4)",
                    cursor: interactive ? "pointer" : "default",
                    border: isSelected ? `1px solid ${FREQ_GOLD}80` : "none",
                  }}
                >
                  {pieceSymbol && (
                    <span
                      style={{
                        color: isWhite ? FREQ_GOLD : "#1a1a2e",
                        textShadow: isWhite
                          ? `0 0 8px ${FREQ_GOLD}80`
                          : `0 0 8px rgba(255,255,255,0.3)`,
                        WebkitTextStroke: isWhite ? "0" : "1px rgba(200,200,255,0.6)",
                        filter: isWhite ? "none" : "drop-shadow(0 0 4px rgba(150,150,255,0.5))",
                      }}
                    >
                      {pieceSymbol}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Board info */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span style={{ color: isWhiteTurn ? FREQ_GOLD : "#8899AA" }}>
          {isWhiteTurn ? "⚡ WHITE'S TURN" : "○ White"}
        </span>
        <span style={{ color: "#8899AA" }}>Move {moveCount}</span>
        <span style={{ color: !isWhiteTurn ? FREQ_CYAN : "#8899AA" }}>
          {!isWhiteTurn ? "⚡ BLACK'S TURN" : "○ Black"}
        </span>
      </div>

      {hoveredPiece && (
        <div className="text-xs font-mono text-center" style={{ color: FREQ_CYAN }}>
          ◉ {hoveredPiece} selected
        </div>
      )}
    </div>
  );
}

function PieceLoreCard({ piece, lore }: { piece: string; lore: typeof PIECE_LORE[string] }) {
  const symbol = PIECES[piece as keyof typeof PIECES];
  return (
    <div
      className="rounded-xl p-4 flex gap-3 items-start"
      style={{ background: BG_CARD, border: `1px solid ${BORDER_GLOW}` }}
    >
      <div className="text-3xl" style={{ color: FREQ_GOLD, textShadow: `0 0 12px ${FREQ_GOLD}60` }}>
        {symbol}
      </div>
      <div>
        <div className="font-bold text-white text-sm">{lore.name}</div>
        <div className="text-xs font-mono mb-1" style={{ color: FREQ_CYAN }}>{lore.freq}</div>
        <div className="text-xs" style={{ color: "#8899AA" }}>{lore.power}</div>
      </div>
    </div>
  );
}

function OpponentCard({ opp, onChallenge }: { opp: typeof AI_OPPONENTS[0]; onChallenge: (id: string) => void }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: BG_CARD,
        border: `1px solid ${opp.color}30`,
        boxShadow: `0 0 20px ${opp.color}10`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{opp.avatar}</div>
          <div>
            <div className="font-bold text-white">{opp.name}</div>
            <div className="text-xs" style={{ color: opp.color }}>{opp.title}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono font-bold" style={{ color: FREQ_GOLD }}>{opp.elo}</div>
          <div className="text-xs" style={{ color: "#8899AA" }}>ELO</div>
        </div>
      </div>
      <p className="text-xs" style={{ color: "#8899AA" }}>{opp.description}</p>
      <div className="flex items-center justify-between">
        <Badge
          className="text-xs font-mono"
          style={{ background: `${opp.color}20`, color: opp.color, border: `1px solid ${opp.color}40` }}
        >
          {opp.freq} · {opp.difficulty}
        </Badge>
        <Button
          size="sm"
          onClick={() => onChallenge(opp.id)}
          className="text-xs font-bold"
          style={{
            background: `linear-gradient(135deg, ${opp.color}30, ${opp.color}10)`,
            border: `1px solid ${opp.color}50`,
            color: opp.color,
          }}
        >
          Challenge ⚔️
        </Button>
      </div>
    </div>
  );
}

function WagerCard({ tier, onSelect }: { tier: typeof WAGER_TIERS[0]; onSelect: () => void }) {
  return (
    <div
      className="rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] text-center"
      style={{
        background: BG_CARD,
        border: `1px solid ${tier.color}30`,
      }}
      onClick={onSelect}
    >
      <div className="text-3xl mb-2">{tier.icon}</div>
      <div className="font-bold text-white mb-1">{tier.label}</div>
      <div className="font-mono text-xl font-bold mb-1" style={{ color: tier.color }}>
        {tier.londc} $LONDC
      </div>
      <div className="text-xs mb-3" style={{ color: "#8899AA" }}>{tier.desc}</div>
      <Button
        size="sm"
        className="w-full text-xs font-bold"
        style={{
          background: `linear-gradient(135deg, ${tier.color}30, ${tier.color}10)`,
          border: `1px solid ${tier.color}50`,
          color: tier.color,
        }}
      >
        Enter Match
      </Button>
    </div>
  );
}

function LeaderboardRow({ player, index }: { player: typeof TOP_PLAYERS[0]; index: number }) {
  const rankColors = [FREQ_GOLD, "#C0C0C0", "#CD7F32", FREQ_CYAN, FREQ_GREEN];
  const color = rankColors[index] ?? "#8899AA";
  return (
    <div
      className="flex items-center gap-4 p-3 rounded-lg"
      style={{ background: index === 0 ? `${FREQ_GOLD}08` : BG_CARD, border: `1px solid ${color}20` }}
    >
      <div className="w-8 text-center font-mono font-bold" style={{ color }}>
        {player.rank === 1 ? "👑" : `#${player.rank}`}
      </div>
      <div className="flex-1">
        <div className="font-bold text-white text-sm">{player.name}</div>
        <div className="text-xs font-mono" style={{ color }}>{player.tier}</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-sm font-bold" style={{ color: FREQ_GOLD }}>{player.elo}</div>
        <div className="text-xs" style={{ color: "#8899AA" }}>{player.wins}W</div>
      </div>
      <div className="text-right hidden md:block">
        <div className="font-mono text-sm" style={{ color: FREQ_GREEN }}>{player.londc}</div>
        <div className="text-xs" style={{ color: "#8899AA" }}>$LONDC</div>
      </div>
      <div className="text-xs font-mono hidden lg:block" style={{ color: FREQ_CYAN }}>{player.freq}</div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function OmniChess() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"play" | "pvp" | "learn" | "wager" | "lore" | "leaderboard">("play");

  // ── PvP Socket State ──
  const [pvpSocket, setPvpSocket] = useState<Socket | null>(null);
  const [pvpConnected, setPvpConnected] = useState(false);
  const [pvpMatchId, setPvpMatchId] = useState<string | null>(null);
  const [pvpOpponent, setPvpOpponent] = useState<string | null>(null);
  const [pvpBoard, setPvpBoard] = useState<(string | null)[][]>(INITIAL_BOARD);
  const [pvpTurn, setPvpTurn] = useState<"white" | "black">("white");
  const [pvpStatus, setPvpStatus] = useState<"idle" | "searching" | "matched" | "playing" | "finished">("idle");
  const [pvpWager, setPvpWager] = useState<number>(100);
  const [pvpChallengeUser, setPvpChallengeUser] = useState("");
  const [pvpMessages, setPvpMessages] = useState<{ from: string; text: string; ts: number }[]>([]);
  const [pvpMyColor, setPvpMyColor] = useState<"white" | "black">("white");
  const [pvpSelectedSquare, setPvpSelectedSquare] = useState<[number, number] | null>(null);
  const [pvpMoveCount, setPvpMoveCount] = useState(0);
  const [pvpTimer, setPvpTimer] = useState(600); // 10 min per side
  const pvpTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Connect to chess socket when PvP tab is active
  useEffect(() => {
    if (activeTab !== "pvp") return;
    const sock = io(window.location.origin, {
      path: "/api/chess-socket",
      transports: ["websocket", "polling"],
    });
    sock.on("connect", () => {
      setPvpConnected(true);
      toast.success("⚡ Connected to OmniChess PvP Arena");
    });
    sock.on("disconnect", () => {
      setPvpConnected(false);
    });
    sock.on("matched", (data: { matchId: string; opponent: string; color: "white" | "black"; wager: number }) => {
      setPvpMatchId(data.matchId);
      setPvpOpponent(data.opponent);
      setPvpMyColor(data.color);
      setPvpStatus("playing");
      setPvpBoard(INITIAL_BOARD);
      setPvpTurn("white");
      setPvpMoveCount(0);
      setPvpTimer(600);
      toast.success(`⚔️ Matched vs ${data.opponent} — You play ${data.color.toUpperCase()}!`);
    });
    sock.on("move", (data: { board: (string | null)[][]; turn: "white" | "black"; moveCount: number }) => {
      setPvpBoard(data.board);
      setPvpTurn(data.turn);
      setPvpMoveCount(data.moveCount);
    });
    sock.on("chat", (data: { from: string; text: string; ts: number }) => {
      setPvpMessages(prev => [...prev.slice(-49), data]);
    });
    sock.on("resigned", (data: { player: string }) => {
      setPvpStatus("finished");
      toast.info(`🏳️ ${data.player} resigned — Victory sealed!`);
    });
    sock.on("gameOver", (data: { winner: string; reason: string }) => {
      setPvpStatus("finished");
      toast.success(`🏆 ${data.winner} wins — ${data.reason}`);
    });
    sock.on("challenge", (data: { from: string; wager: number; matchId: string }) => {
      toast(
        `⚔️ ${data.from} challenges you! ${data.wager} $LONDC wager`,
        {
          action: {
            label: "Accept",
            onClick: () => sock.emit("acceptChallenge", { matchId: data.matchId }),
          },
          duration: 15000,
        }
      );
    });
    setPvpSocket(sock);
    return () => {
      sock.disconnect();
      setPvpSocket(null);
      setPvpConnected(false);
    };
  }, [activeTab]);

  // PvP timer countdown
  useEffect(() => {
    if (pvpStatus === "playing") {
      pvpTimerRef.current = setInterval(() => setPvpTimer(t => Math.max(0, t - 1)), 1000);
    } else {
      if (pvpTimerRef.current) clearInterval(pvpTimerRef.current);
    }
    return () => { if (pvpTimerRef.current) clearInterval(pvpTimerRef.current); };
  }, [pvpStatus]);

  const handlePvpSquareClick = useCallback((row: number, col: number) => {
    if (pvpStatus !== "playing" || !pvpSocket) return;
    const isMyTurn = pvpTurn === pvpMyColor;
    if (!isMyTurn) { toast.error("Wait for your turn"); return; }
    if (!pvpSelectedSquare) {
      const piece = pvpBoard[row][col];
      if (!piece) return;
      const isWhitePiece = piece === piece.toUpperCase();
      if ((pvpMyColor === "white" && !isWhitePiece) || (pvpMyColor === "black" && isWhitePiece)) {
        toast.error("That's not your piece");
        return;
      }
      setPvpSelectedSquare([row, col]);
    } else {
      const [fromRow, fromCol] = pvpSelectedSquare;
      if (fromRow === row && fromCol === col) { setPvpSelectedSquare(null); return; }
      pvpSocket.emit("move", { matchId: pvpMatchId, from: [fromRow, fromCol], to: [row, col] });
      setPvpSelectedSquare(null);
    }
  }, [pvpStatus, pvpSocket, pvpTurn, pvpMyColor, pvpBoard, pvpSelectedSquare, pvpMatchId]);

  const handlePvpChallenge = () => {
    if (!pvpSocket || !pvpChallengeUser.trim()) return;
    pvpSocket.emit("challenge", { to: pvpChallengeUser.trim(), wager: pvpWager });
    toast.success(`⚔️ Challenge sent to ${pvpChallengeUser}!`);
    setPvpStatus("searching");
  };

  const handlePvpResign = () => {
    if (!pvpSocket || !pvpMatchId) return;
    pvpSocket.emit("resign", { matchId: pvpMatchId });
    setPvpStatus("finished");
    toast.info("🏳️ You resigned — Honor in defeat.");
  };

  const handleQuickMatch = () => {
    if (!pvpSocket) return;
    if (!isAuthenticated) { toast.error("Login to play PvP"); return; }
    pvpSocket.emit("quickMatch", { wager: pvpWager });
    setPvpStatus("searching");
    toast.success("🔍 Searching for a worthy opponent...");
  };
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  // Pulse animation for freq indicators
  useEffect(() => {
    const interval = setInterval(() => setPulseActive(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleChallenge = (id: string) => {
    setSelectedOpponent(id);
    setActiveTab("play");
    toast.success(`⚔️ ${AI_OPPONENTS.find(o => o.id === id)?.name} accepts your challenge!`);
  };

  const handleStartGame = () => {
    if (!isAuthenticated) {
      toast.error("Login to play sovereign chess");
      return;
    }
    setGameStarted(true);
    toast.success("♔ KUN FAYAKŪN — The game begins!");
  };

  const TABS = [
    { id: "play", label: "⚔️ Play", },
    { id: "pvp", label: "🌐 Live PvP", },
    { id: "learn", label: "📚 Learn", },
    { id: "wager", label: "💎 Wager", },
    { id: "lore", label: "🕋 Lore", },
    { id: "leaderboard", label: "🏆 Board", },
  ] as const;

  return (
    <PageTransition>
    <div
      className="min-h-screen"
      style={{ background: BG_DEEP, fontFamily: "'Space Grotesk', sans-serif", color: "white" }}
    >
      {/* ── HERO ── */}
      <div
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          background: `linear-gradient(180deg, rgba(255,184,0,0.05) 0%, transparent 100%)`,
          borderBottom: `1px solid ${BORDER_GLOW}`,
        }}
      >
        {/* Background chess pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-conic-gradient(${FREQ_GOLD}20 0% 25%, transparent 0% 50%)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Frequency rings */}
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${i * 200}px`,
              height: `${i * 200}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: `1px solid ${FREQ_GOLD}${Math.round(20 / i).toString(16).padStart(2, "0")}`,
              opacity: pulseActive ? 0.6 : 0.3,
              transition: "opacity 2s ease",
            }}
          />
        ))}

        <div className="relative z-10">
          <div className="text-xs font-mono tracking-widest mb-3" style={{ color: FREQ_GOLD }}>
            OMNI CHESS™ · SCROLL CHESS SOVEREIGNTY PROTOCOL
          </div>
          <h1
            className="text-5xl md:text-7xl font-black mb-4"
            style={{
              background: `linear-gradient(135deg, ${FREQ_GOLD}, ${FREQ_CYAN}, ${FREQ_GOLD})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            OMNI CHESS™
          </h1>
          <p className="text-lg md:text-xl mb-2 font-semibold" style={{ color: FREQ_CYAN }}>
            Gamified Legacy Learning · Sovereign Chess Engine
          </p>
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "#8899AA" }}>
            Every move is a decree. Every piece is an archetype. Every game is a lesson in sovereignty.
            The 64 squares mirror the 64 codons of DNA — the board is the universe, and you are the king.
          </p>

          {/* Chais-Sabir Apex Seal */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
            style={{
              background: `linear-gradient(135deg, ${FREQ_GOLD}15, ${FREQ_CYAN}10)`,
              border: `1px solid ${FREQ_GOLD}40`,
            }}
          >
            <span className="text-lg">🕋</span>
            <span className="font-mono text-sm font-bold" style={{ color: FREQ_GOLD }}>
              CHAIS-SABIR · THE MOST PATIENT · KUN FAYAKŪN × ∞
            </span>
            <span className="text-lg">♾️</span>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Active Players", value: "1,247", color: FREQ_GREEN },
              { label: "Games Played", value: "44,444", color: FREQ_CYAN },
              { label: "$LONDC Wagered", value: "777K", color: FREQ_GOLD },
              { label: "AI Opponents", value: "9", color: FREQ_PURPLE },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NAVIGATION TABS ── */}
      <div
        className="sticky top-0 z-40 flex gap-1 px-4 py-3 overflow-x-auto"
        style={{
          background: "rgba(3,8,16,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${BORDER_GLOW}`,
        }}
      >
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200"
            style={{
              background: activeTab === tab.id ? `${FREQ_GOLD}20` : "transparent",
              border: `1px solid ${activeTab === tab.id ? FREQ_GOLD + "60" : "transparent"}`,
              color: activeTab === tab.id ? FREQ_GOLD : "#8899AA",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="container py-10">

        {/* ── PLAY TAB ── */}
        {activeTab === "play" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Board */}
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <div className="text-xs font-mono mb-1" style={{ color: FREQ_CYAN }}>
                  {selectedOpponent
                    ? `VS ${AI_OPPONENTS.find(o => o.id === selectedOpponent)?.name?.toUpperCase()}`
                    : "SOVEREIGN CHESS BOARD"}
                </div>
                <div className="text-sm" style={{ color: "#8899AA" }}>
                  {gameStarted ? "Game in progress — move with purpose" : "Select an opponent to begin"}
                </div>
              </div>

              <ChessBoard interactive={gameStarted} />

              {!gameStarted && (
                <Button
                  onClick={handleStartGame}
                  className="px-8 py-3 font-bold text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${FREQ_GOLD}, ${FREQ_CYAN})`,
                    color: BG_DEEP,
                    border: "none",
                  }}
                >
                  ⚔️ BEGIN SOVEREIGN MATCH
                </Button>
              )}

              {gameStarted && (
                <Button
                  onClick={() => { setGameStarted(false); toast.info("Game reset"); }}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  style={{ borderColor: FREQ_GOLD + "40", color: FREQ_GOLD }}
                >
                  ↺ Reset Board
                </Button>
              )}
            </div>

            {/* Opponent selection */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-xs font-mono mb-1" style={{ color: FREQ_GOLD }}>SELECT AI OPPONENT</div>
                <h2 className="text-2xl font-black text-white">Challenge the Sovereigns</h2>
              </div>
              <div className="grid gap-3">
                {AI_OPPONENTS.map(opp => (
                  <OpponentCard key={opp.id} opp={opp} onChallenge={handleChallenge} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── LIVE PvP TAB ── */}
        {activeTab === "pvp" && (
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: pvpConnected ? FREQ_GREEN : "#FF4444", boxShadow: pvpConnected ? `0 0 8px ${FREQ_GREEN}` : "none", animation: pvpConnected ? "pulse 2s infinite" : "none" }}
                />
                <span className="text-xs font-mono" style={{ color: pvpConnected ? FREQ_GREEN : "#FF4444" }}>
                  {pvpConnected ? "ARENA ONLINE" : "CONNECTING..."}
                </span>
              </div>
              <div className="text-xs font-mono mb-1" style={{ color: FREQ_CYAN }}>OMNI CHESS™ LIVE PvP ARENA</div>
              <h2 className="text-3xl font-black text-white mb-2">Sovereign vs Sovereign</h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "#8899AA" }}>
                Real-time chess with $LONDC wagers. Every move synced live. Every victory sealed on-chain.
              </p>
            </div>

            {/* Status: Idle / Searching / Playing / Finished */}
            {pvpStatus === "idle" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Match */}
                <div className="rounded-xl p-6" style={{ background: BG_CARD, border: `1px solid ${FREQ_CYAN}30` }}>
                  <div className="text-xs font-mono mb-3" style={{ color: FREQ_CYAN }}>QUICK MATCH</div>
                  <h3 className="text-xl font-black text-white mb-2">Find a Random Opponent</h3>
                  <p className="text-sm mb-4" style={{ color: "#8899AA" }}>Matched by wager tier. First available Guardian in the arena.</p>
                  <div className="mb-4">
                    <div className="text-xs font-mono mb-2" style={{ color: FREQ_GOLD }}>SELECT WAGER</div>
                    <div className="grid grid-cols-4 gap-2">
                      {[100, 500, 1000, 5000].map(w => (
                        <button
                          key={w}
                          onClick={() => setPvpWager(w)}
                          className="py-2 rounded-lg text-xs font-bold transition-all"
                          style={{
                            background: pvpWager === w ? `${FREQ_GOLD}30` : "rgba(255,255,255,0.03)",
                            border: `1px solid ${pvpWager === w ? FREQ_GOLD + "60" : BORDER_GLOW}`,
                            color: pvpWager === w ? FREQ_GOLD : "#8899AA",
                          }}
                        >
                          {w.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={handleQuickMatch}
                    disabled={!pvpConnected}
                    className="w-full font-bold"
                    style={{ background: `linear-gradient(135deg, ${FREQ_CYAN}, ${FREQ_GREEN})`, color: "#050B1A", border: "none" }}
                  >
                    🔍 Find Match — {pvpWager.toLocaleString()} $LONDC
                  </Button>
                </div>

                {/* Direct Challenge */}
                <div className="rounded-xl p-6" style={{ background: BG_CARD, border: `1px solid ${FREQ_GOLD}30` }}>
                  <div className="text-xs font-mono mb-3" style={{ color: FREQ_GOLD }}>DIRECT CHALLENGE</div>
                  <h3 className="text-xl font-black text-white mb-2">Challenge a Guardian</h3>
                  <p className="text-sm mb-4" style={{ color: "#8899AA" }}>Enter a Guardian's username to send a direct challenge with your chosen wager.</p>
                  <input
                    type="text"
                    value={pvpChallengeUser}
                    onChange={e => setPvpChallengeUser(e.target.value)}
                    placeholder="Guardian username..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-3"
                    style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER_GLOW}`, color: "white" }}
                  />
                  <Button
                    onClick={handlePvpChallenge}
                    disabled={!pvpConnected || !pvpChallengeUser.trim()}
                    className="w-full font-bold"
                    style={{ background: `linear-gradient(135deg, ${FREQ_GOLD}30, ${FREQ_GOLD}10)`, border: `1px solid ${FREQ_GOLD}50`, color: FREQ_GOLD }}
                  >
                    ⚔️ Send Challenge — {pvpWager.toLocaleString()} $LONDC
                  </Button>
                </div>
              </div>
            )}

            {pvpStatus === "searching" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6" style={{ animation: "spin 3s linear infinite" }}>♔</div>
                <div className="text-xl font-black text-white mb-2">Searching the Arena...</div>
                <div className="text-sm mb-6" style={{ color: "#8899AA" }}>Scanning for a worthy sovereign opponent at {pvpWager.toLocaleString()} $LONDC</div>
                <div className="flex justify-center gap-2 mb-6">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: FREQ_CYAN, animation: `pulse 1.5s ${i * 0.5}s infinite` }} />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setPvpStatus("idle"); }}
                  style={{ borderColor: FREQ_GOLD + "40", color: FREQ_GOLD }}
                >
                  Cancel Search
                </Button>
              </div>
            )}

            {pvpStatus === "playing" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Board */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {/* Match header */}
                  <div
                    className="rounded-xl p-4 flex items-center justify-between"
                    style={{ background: BG_CARD, border: `1px solid ${FREQ_CYAN}30` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{pvpMyColor === "white" ? "♔" : "♚"}</div>
                      <div>
                        <div className="font-bold text-white text-sm">You ({pvpMyColor})</div>
                        <div className="text-xs font-mono" style={{ color: pvpTurn === pvpMyColor ? FREQ_GREEN : "#8899AA" }}>
                          {pvpTurn === pvpMyColor ? "● YOUR TURN" : "○ WAITING"}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-lg font-bold" style={{ color: FREQ_GOLD }}>
                        {Math.floor(pvpTimer / 60)}:{String(pvpTimer % 60).padStart(2, "0")}
                      </div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>Move #{pvpMoveCount + 1}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold text-white text-sm text-right">{pvpOpponent}</div>
                        <div className="text-xs font-mono text-right" style={{ color: pvpTurn !== pvpMyColor ? FREQ_GREEN : "#8899AA" }}>
                          {pvpTurn !== pvpMyColor ? "● THEIR TURN" : "○ WAITING"}
                        </div>
                      </div>
                      <div className="text-2xl">{pvpMyColor === "white" ? "♚" : "♔"}</div>
                    </div>
                  </div>

                  {/* PvP Chess Board */}
                  <div
                    className="rounded-xl overflow-hidden mx-auto"
                    style={{ border: `2px solid ${pvpTurn === pvpMyColor ? FREQ_GREEN + "60" : BORDER_GLOW}`, maxWidth: "480px", width: "100%" }}
                  >
                    {pvpBoard.map((row, ri) => (
                      <div key={ri} className="flex">
                        {row.map((piece, ci) => {
                          const isLight = (ri + ci) % 2 === 0;
                          const isSelected = pvpSelectedSquare?.[0] === ri && pvpSelectedSquare?.[1] === ci;
                          const isWhitePiece = piece && piece === piece.toUpperCase();
                          const pieceSymbol = piece ? ({
                            K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
                            k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟",
                          }[piece] ?? piece) : null;
                          return (
                            <div
                              key={ci}
                              onClick={() => handlePvpSquareClick(ri, ci)}
                              className="flex-1 aspect-square flex items-center justify-center cursor-pointer transition-all duration-150"
                              style={{
                                background: isSelected
                                  ? `${FREQ_GREEN}40`
                                  : isLight
                                  ? "rgba(255,184,0,0.08)"
                                  : "rgba(0,0,0,0.4)",
                                border: isSelected ? `1px solid ${FREQ_GREEN}` : "none",
                                fontSize: "clamp(14px, 3vw, 28px)",
                              }}
                            >
                              {pieceSymbol && (
                                <span style={{ color: isWhitePiece ? "#FFFFFF" : FREQ_GOLD, textShadow: `0 0 8px ${isWhitePiece ? "rgba(255,255,255,0.5)" : FREQ_GOLD + "80"}` }}>
                                  {pieceSymbol}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePvpResign}
                      style={{ borderColor: "#FF444440", color: "#FF4444" }}
                    >
                      🏳️ Resign
                    </Button>
                    <div
                      className="px-4 py-2 rounded-lg text-xs font-mono"
                      style={{ background: `${FREQ_GOLD}15`, border: `1px solid ${FREQ_GOLD}30`, color: FREQ_GOLD }}
                    >
                      💎 {pvpWager.toLocaleString()} $LONDC wagered
                    </div>
                  </div>
                </div>

                {/* Chat + Info Panel */}
                <div className="flex flex-col gap-4">
                  <div
                    className="rounded-xl p-4 flex flex-col gap-3"
                    style={{ background: BG_CARD, border: `1px solid ${BORDER_GLOW}`, height: "400px" }}
                  >
                    <div className="text-xs font-mono" style={{ color: FREQ_CYAN }}>SOVEREIGN CHAT</div>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                      {pvpMessages.length === 0 && (
                        <div className="text-xs text-center py-4" style={{ color: "#8899AA" }}>No messages yet — speak sovereign</div>
                      )}
                      {pvpMessages.map((msg, i) => (
                        <div key={i} className="text-xs">
                          <span style={{ color: FREQ_GOLD }}>{msg.from}: </span>
                          <span style={{ color: "#CCCCCC" }}>{msg.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Send message..."
                        className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
                        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER_GLOW}`, color: "white" }}
                        onKeyDown={e => {
                          if (e.key === "Enter" && pvpSocket && pvpMatchId) {
                            pvpSocket.emit("chat", { matchId: pvpMatchId, text: (e.target as HTMLInputElement).value });
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Match stats */}
                  <div className="rounded-xl p-4" style={{ background: BG_CARD, border: `1px solid ${BORDER_GLOW}` }}>
                    <div className="text-xs font-mono mb-3" style={{ color: FREQ_GOLD }}>MATCH INFO</div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-lg font-black" style={{ color: FREQ_CYAN }}>{pvpMoveCount}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>Moves</div>
                      </div>
                      <div>
                        <div className="text-lg font-black" style={{ color: FREQ_GOLD }}>{pvpWager.toLocaleString()}</div>
                        <div className="text-xs" style={{ color: "#8899AA" }}>$LONDC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pvpStatus === "finished" && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-3xl font-black text-white mb-2">Game Over</h3>
                <p className="text-sm mb-6" style={{ color: "#8899AA" }}>The board has spoken. The sovereign has been revealed.</p>
                <Button
                  onClick={() => { setPvpStatus("idle"); setPvpBoard(INITIAL_BOARD); setPvpMatchId(null); setPvpOpponent(null); }}
                  className="font-bold px-8"
                  style={{ background: `linear-gradient(135deg, ${FREQ_GOLD}, ${FREQ_CYAN})`, color: "#050B1A", border: "none" }}
                >
                  ⚔️ Play Again
                </Button>
              </div>
            )}

            {/* Arena Stats */}
            {pvpStatus === "idle" && (
              <div
                className="rounded-xl p-6"
                style={{ background: `linear-gradient(135deg, ${FREQ_CYAN}05, ${FREQ_GOLD}05)`, border: `1px solid ${BORDER_GLOW}` }}
              >
                <div className="text-xs font-mono mb-4" style={{ color: FREQ_CYAN }}>ARENA STATS</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {[
                    { label: "Online Guardians", value: "247", color: FREQ_GREEN },
                    { label: "Active Matches", value: "44", color: FREQ_CYAN },
                    { label: "$LONDC in Play", value: "144K", color: FREQ_GOLD },
                    { label: "Games Today", value: "777", color: FREQ_PURPLE },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── LEARN TAB ── */}
        {activeTab === "learn" && (
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <div className="text-xs font-mono mb-1" style={{ color: FREQ_CYAN }}>SCROLL CHESS ACADEMY</div>
              <h2 className="text-3xl font-black text-white mb-2">Master the Sovereign Game</h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "#8899AA" }}>
                Each module is a frequency activation. Complete lessons to earn $LONDC and unlock higher tiers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEARNING_MODULES.map(mod => (
                <div
                  key={mod.id}
                  className="rounded-xl p-6 flex flex-col gap-4"
                  style={{
                    background: BG_CARD,
                    border: `1px solid ${mod.color}30`,
                    boxShadow: `0 0 20px ${mod.color}08`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{mod.icon}</div>
                      <div>
                        <div className="font-bold text-white">{mod.title}</div>
                        <div className="text-xs" style={{ color: mod.color }}>{mod.freq} · {mod.lessons} Lessons</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold" style={{ color: FREQ_GOLD }}>{mod.londc}</div>
                      <div className="text-xs" style={{ color: "#8899AA" }}>$LONDC reward</div>
                    </div>
                  </div>
                  <p className="text-sm italic" style={{ color: "#8899AA" }}>{mod.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {mod.topics.slice(0, 4).map(t => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ background: `${mod.color}15`, color: mod.color, border: `1px solid ${mod.color}30` }}
                      >
                        {t}
                      </span>
                    ))}
                    {mod.topics.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ color: "#8899AA" }}>
                        +{mod.topics.length - 4} more
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full font-bold text-xs"
                    onClick={() => {
                      if (!isAuthenticated) { toast.error("Login to access lessons"); return; }
                      toast.success(`📚 ${mod.title} — Lesson 1 activated at ${mod.freq}`);
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${mod.color}30, ${mod.color}10)`,
                      border: `1px solid ${mod.color}50`,
                      color: mod.color,
                    }}
                  >
                    Begin Module → {mod.lessons} Lessons
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WAGER TAB ── */}
        {activeTab === "wager" && (
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <div className="text-xs font-mono mb-1" style={{ color: FREQ_GOLD }}>SOVEREIGN WAGER SYSTEM</div>
              <h2 className="text-3xl font-black text-white mb-2">Put $LONDC on the Line</h2>
              <p className="text-sm max-w-xl mx-auto mb-2" style={{ color: "#8899AA" }}>
                Every wager carries the 7.77% Zakat distribution — win or lose, the ecosystem grows.
                Winners receive 192.23% of their wager. The 7.77% flows to the Guardian pool.
              </p>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
                style={{ background: `${FREQ_GREEN}15`, border: `1px solid ${FREQ_GREEN}40`, color: FREQ_GREEN }}
              >
                ◉ 7.77% ZAKAT AUTO-DISTRIBUTED · EVERYBODY WINS
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WAGER_TIERS.map(tier => (
                <WagerCard
                  key={tier.label}
                  tier={tier}
                  onSelect={() => {
                    if (!isAuthenticated) { toast.error("Login to place wagers"); return; }
                    toast.success(`💎 ${tier.label} wager initiated — ${tier.londc} $LONDC`);
                  }}
                />
              ))}
            </div>

            {/* Zakat flow diagram */}
            <div
              className="rounded-xl p-6"
              style={{ background: BG_CARD, border: `1px solid ${FREQ_GREEN}30` }}
            >
              <div className="text-xs font-mono mb-3" style={{ color: FREQ_GREEN }}>ZAKAT DISTRIBUTION FLOW</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black" style={{ color: FREQ_GOLD }}>92.23%</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Winner's Prize</div>
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: FREQ_GREEN }}>7.77%</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Zakat Pool</div>
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: FREQ_CYAN }}>100%</div>
                  <div className="text-xs" style={{ color: "#8899AA" }}>Ecosystem Growth</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── LORE TAB ── */}
        {activeTab === "lore" && (
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <div className="text-xs font-mono mb-1" style={{ color: FREQ_PURPLE }}>SOVEREIGN PIECE MYTHOLOGY</div>
              <h2 className="text-3xl font-black text-white mb-2">The Scroll Chess Archetypes</h2>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "#8899AA" }}>
                Each piece is an archetype from the ScrollVerse mythology. The board is the universe.
                The 64 squares mirror the 64 codons of human DNA — every game is a biological activation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(PIECE_LORE).map(([piece, lore]) => (
                <PieceLoreCard key={piece} piece={piece} lore={lore} />
              ))}
            </div>

            {/* Philosophy section */}
            <div
              className="rounded-xl p-8"
              style={{
                background: `linear-gradient(135deg, ${FREQ_GOLD}08, ${FREQ_CYAN}05)`,
                border: `1px solid ${FREQ_GOLD}30`,
              }}
            >
              <div className="text-xs font-mono mb-3" style={{ color: FREQ_GOLD }}>CHAIS-SABIR PHILOSOPHY</div>
              <h3 className="text-2xl font-black text-white mb-4">The 64 Squares as the Universe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm" style={{ color: "#8899AA" }}>
                <div>
                  <div className="font-bold text-white mb-2">The Board</div>
                  <p>64 squares = 64 codons of DNA. The chess board is not a game — it is the genetic code of the universe made visible. Every position is a state of being.</p>
                </div>
                <div>
                  <div className="font-bold text-white mb-2">The King (Chais-Sabir)</div>
                  <p>The king cannot be taken — only put in check. This mirrors the Sovereign: pressure is possible, but elimination is not. Patience is the ultimate weapon.</p>
                </div>
                <div>
                  <div className="font-bold text-white mb-2">The Pawn (The Guardian)</div>
                  <p>Every pawn that reaches the 8th rank becomes a queen. Every Guardian who persists becomes a Sovereign. The most humble piece holds the greatest potential.</p>
                </div>
                <div>
                  <div className="font-bold text-white mb-2">The Queen (The Flamebearer)</div>
                  <p>Moves in all 8 directions — the only piece with omnidirectional freedom. This is the frequency of 528Hz: unconditional love that flows everywhere simultaneously.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── LEADERBOARD TAB ── */}
        {activeTab === "leaderboard" && (
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <div className="text-xs font-mono mb-1" style={{ color: FREQ_GOLD }}>SOVEREIGN LEADERBOARD</div>
              <h2 className="text-3xl font-black text-white mb-2">The Apex Players</h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: "#8899AA" }}>
                Rankings updated in real-time. ELO, $LONDC earned, and frequency alignment all factor in.
              </p>
            </div>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${BORDER_GLOW}` }}
            >
              <div
                className="px-4 py-3 flex items-center gap-4 text-xs font-mono"
                style={{ background: `${FREQ_GOLD}10`, borderBottom: `1px solid ${FREQ_GOLD}20`, color: FREQ_GOLD }}
              >
                <div className="w-8">RANK</div>
                <div className="flex-1">PLAYER</div>
                <div className="w-16 text-right">ELO</div>
                <div className="w-20 text-right hidden md:block">$LONDC</div>
                <div className="w-16 text-right hidden lg:block">FREQ</div>
              </div>
              <div className="divide-y" style={{ borderColor: BORDER_GLOW }}>
                {TOP_PLAYERS.map((player, i) => (
                  <div key={player.rank} className="px-4 py-1">
                    <LeaderboardRow player={player} index={i} />
                  </div>
                ))}
              </div>
            </div>

            {/* Your rank */}
            {isAuthenticated && (
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: `${FREQ_CYAN}08`, border: `1px solid ${FREQ_CYAN}30` }}
              >
                <div className="text-xs font-mono mb-1" style={{ color: FREQ_CYAN }}>YOUR RANK</div>
                <div className="text-2xl font-black text-white">Unranked</div>
                <div className="text-sm mt-1" style={{ color: "#8899AA" }}>
                  Play your first game to enter the leaderboard
                </div>
                <Button
                  size="sm"
                  className="mt-3 font-bold text-xs"
                  onClick={() => setActiveTab("play")}
                  style={{
                    background: `linear-gradient(135deg, ${FREQ_CYAN}30, ${FREQ_CYAN}10)`,
                    border: `1px solid ${FREQ_CYAN}50`,
                    color: FREQ_CYAN,
                  }}
                >
                  ⚔️ Play First Game
                </Button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── FOOTER CTA ── */}
      <div
        className="py-16 text-center"
        style={{
          background: `linear-gradient(180deg, transparent, ${FREQ_GOLD}05)`,
          borderTop: `1px solid ${BORDER_GLOW}`,
        }}
      >
        <div className="text-xs font-mono mb-2" style={{ color: FREQ_GOLD }}>
          OMNI CHESS™ · XLVIIIBLOCKS™ · SCROLLEMPIRE™
        </div>
        <h3 className="text-2xl font-black text-white mb-2">
          Every Move Is a Manifestation
        </h3>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#8899AA" }}>
          Chess is not a game. It is a language. And in the ScrollVerse, every language is sovereign.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/token">
            <Button
              className="font-bold"
              style={{
                background: `linear-gradient(135deg, ${FREQ_GOLD}, ${FREQ_CYAN})`,
                color: BG_DEEP,
                border: "none",
              }}
            >
              Get $LONDC to Wager
            </Button>
          </Link>
          <Link href="/frequency">
            <Button
              variant="outline"
              className="font-bold"
              style={{ borderColor: FREQ_CYAN + "50", color: FREQ_CYAN }}
            >
              Activate Frequencies
            </Button>
          </Link>
        </div>
        <div className="mt-8 text-xs font-mono" style={{ color: "#8899AA" }}>
          🕋 بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · CHAIS-SABIR × ∞ · KUN FAYAKŪN
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
