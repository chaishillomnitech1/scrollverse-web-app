/**
 * SOVEREIGN BROADCAST — Socket.io Server
 * Real-time live streaming state, Guardian chat, and viewer count
 * Wired into the Express HTTP server for WebSocket support
 */
import { Server as SocketIOServer } from "socket.io";
import type { Server as HttpServer } from "http";

export interface BroadcastState {
  isLive: boolean;
  title: string;
  viewerCount: number;
  startedAt: Date | null;
  frequency: string;
}

const state: BroadcastState = {
  isLive: false,
  title: "Sovereign Frequency Broadcast",
  viewerCount: 0,
  startedAt: null,
  frequency: "963Hz",
};

export function initBroadcastSocket(httpServer: HttpServer) {
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    path: "/api/socket",
  });

  io.on("connection", (socket) => {
    state.viewerCount = io.engine.clientsCount;
    io.emit("viewer_count", state.viewerCount);
    // Send current state to new viewer
    socket.emit("broadcast_state", state);

    // Host starts a live broadcast
    socket.on("go_live", (data: { title?: string; frequency?: string }) => {
      state.isLive = true;
      state.title = data.title || "Sovereign Frequency Broadcast";
      state.frequency = data.frequency || "963Hz";
      state.startedAt = new Date();
      io.emit("broadcast_state", state);
      io.emit("system_message", {
        id: Date.now().toString(),
        text: `🔴 LIVE: ${state.title} — ${state.frequency}`,
        type: "system",
        timestamp: new Date().toISOString(),
      });
    });

    // Host ends broadcast
    socket.on("end_broadcast", () => {
      state.isLive = false;
      state.startedAt = null;
      io.emit("broadcast_state", state);
      io.emit("system_message", {
        id: Date.now().toString(),
        text: "📴 Broadcast ended. KUN FAYAKŪN × ∞",
        type: "system",
        timestamp: new Date().toISOString(),
      });
    });

    // Guardian chat message
    socket.on("chat_message", (data: { name: string; text: string; color?: string }) => {
      if (!data.text?.trim() || !data.name?.trim()) return;
      io.emit("chat_message", {
        id: Date.now().toString(),
        name: data.name.slice(0, 40),
        text: data.text.slice(0, 300),
        color: data.color || "#00D4FF",
        timestamp: new Date().toISOString(),
      });
    });

    // Frequency pulse from host
    socket.on("frequency_pulse", (hz: string) => {
      state.frequency = hz;
      io.emit("frequency_pulse", hz);
    });

    socket.on("disconnect", () => {
      state.viewerCount = Math.max(0, io.engine.clientsCount);
      io.emit("viewer_count", state.viewerCount);
    });
  });

  console.log("[Socket.io] Sovereign Broadcast WebSocket initialized at /api/socket");
  return io;
}
