/**
 * OmniChess PvP — Socket.io Server: /api/chess-socket
 * Handles: quickMatch, challenge, acceptChallenge, move, resign, chat
 */
import { Server as SocketIOServer } from "socket.io";
import type { Server as HttpServer } from "http";
import { getDb } from "../db";
import { chess_matches, chess_wager_escrow } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

// In-memory matchmaking queue: { socketId, wager }
const matchQueue: { socketId: string; wager: number; username: string }[] = [];
// Active match rooms: matchId -> { whiteSocketId, blackSocketId }
const activeMatches = new Map<string, { whiteSocketId: string; blackSocketId: string; board: (string | null)[][]; turn: "white" | "black"; moveCount: number }>();

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

export function initChessSocket(httpServer: HttpServer) {
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    path: "/api/chess-socket",
  });

  console.log("[OmniChess] PvP Socket.io initialized at /api/chess-socket");

  io.on("connection", (socket) => {
    const username = (socket.handshake.auth?.username as string) || `Guardian#${socket.id.slice(0, 6)}`;

    socket.emit("connected", { socketId: socket.id, username });

    // ── QUICK MATCH ────────────────────────────────────────────────────────────
    socket.on("quickMatch", (data: { wager?: number }) => {
      const wager = data?.wager ?? 100;
      // Remove any existing entry for this socket
      const existingIdx = matchQueue.findIndex(q => q.socketId === socket.id);
      if (existingIdx >= 0) matchQueue.splice(existingIdx, 1);

      // Check if someone else is waiting with same wager tier
      const opponentIdx = matchQueue.findIndex(q => q.wager === wager);
      if (opponentIdx >= 0) {
        const opponent = matchQueue.splice(opponentIdx, 1)[0];
        const matchId = `match_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const board = INITIAL_BOARD.map(r => [...r]);

        activeMatches.set(matchId, {
          whiteSocketId: opponent.socketId,
          blackSocketId: socket.id,
          board,
          turn: "white",
          moveCount: 0,
        });

        socket.join(matchId);
        const opponentSocket = io.sockets.sockets.get(opponent.socketId);
        opponentSocket?.join(matchId);

        io.to(opponent.socketId).emit("matched", {
          matchId,
          opponent: username,
          color: "white",
          wager,
        });
        socket.emit("matched", {
          matchId,
          opponent: opponent.username,
          color: "black",
          wager,
        });
      } else {
        matchQueue.push({ socketId: socket.id, wager, username });
        socket.emit("searching", { message: "Searching for a worthy opponent..." });
      }
    });

    // ── DIRECT CHALLENGE ───────────────────────────────────────────────────────
    socket.on("challenge", (data: { to: string; wager?: number }) => {
      const wager = data?.wager ?? 100;
      const matchId = `challenge_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      // Find target socket by username (broadcast to all, they filter)
      io.emit("challenge", {
        from: username,
        to: data.to,
        wager,
        matchId,
      });
    });

    // ── ACCEPT CHALLENGE ───────────────────────────────────────────────────────
    socket.on("acceptChallenge", (data: { matchId: string }) => {
      const board = INITIAL_BOARD.map(r => [...r]);
      activeMatches.set(data.matchId, {
        whiteSocketId: socket.id,
        blackSocketId: socket.id,
        board,
        turn: "white",
        moveCount: 0,
      });
      socket.join(data.matchId);
      io.to(data.matchId).emit("matched", {
        matchId: data.matchId,
        opponent: "Challenger",
        color: "black",
        wager: 100,
      });
    });

    // ── MOVE ───────────────────────────────────────────────────────────────────
    socket.on("move", (data: { matchId: string; from: [number, number]; to: [number, number] }) => {
      const match = activeMatches.get(data.matchId);
      if (!match) { socket.emit("moveError", { message: "Match not found" }); return; }

      const isWhite = match.whiteSocketId === socket.id;
      const isBlack = match.blackSocketId === socket.id;
      if ((!isWhite && !isBlack)) { socket.emit("moveError", { message: "Not in this match" }); return; }
      if ((match.turn === "white" && !isWhite) || (match.turn === "black" && !isBlack)) {
        socket.emit("moveError", { message: "Not your turn" }); return;
      }

      const [fr, fc] = data.from;
      const [tr, tc] = data.to;
      const newBoard = match.board.map(r => [...r]);
      newBoard[tr][tc] = newBoard[fr][fc];
      newBoard[fr][fc] = null;

      const nextTurn = match.turn === "white" ? "black" : "white";
      match.board = newBoard;
      match.turn = nextTurn;
      match.moveCount += 1;

      io.to(data.matchId).emit("move", {
        board: newBoard,
        turn: nextTurn,
        moveCount: match.moveCount,
        movedBy: socket.id,
      });
    });

    // ── RESIGN ─────────────────────────────────────────────────────────────────
    socket.on("resign", (data: { matchId: string }) => {
      const match = activeMatches.get(data.matchId);
      if (!match) return;
      io.to(data.matchId).emit("resigned", { player: username });
      io.to(data.matchId).emit("gameOver", { winner: "Opponent", reason: "resignation" });
      activeMatches.delete(data.matchId);
    });

    // ── CHAT ───────────────────────────────────────────────────────────────────
    socket.on("chat", (data: { matchId: string; text: string }) => {
      io.to(data.matchId).emit("chat", {
        from: username,
        text: data.text,
        ts: Date.now(),
      });
    });

    // ── DISCONNECT ─────────────────────────────────────────────────────────────
    socket.on("disconnect", () => {
      // Remove from matchmaking queue
      const idx = matchQueue.findIndex(q => q.socketId === socket.id);
      if (idx >= 0) matchQueue.splice(idx, 1);
    });
  });
}
