import { useEffect, useRef } from "react";

interface SacredGeometryLoaderProps {
  inline?: boolean;
  size?: number;
  label?: string;
}

/**
 * SacredGeometryLoader — Flower of Life / Metatron's Cube sacred geometry spinner
 * Design: Liquid Sovereignty — Afrofuturism × Quantum Digital
 * Colors: #00D4FF (outer), #FFB800 (mid), #A855F7 (inner), #00FF88 (center)
 */
export default function SacredGeometryLoader({
  inline = false,
  size = 120,
  label = "LOADING...",
}: SacredGeometryLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;

    function drawFlowerOfLife(angle: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      // Outer glow ring
      const outerGrad = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.1);
      outerGrad.addColorStop(0, "rgba(0,212,255,0.0)");
      outerGrad.addColorStop(0.7, "rgba(0,212,255,0.12)");
      outerGrad.addColorStop(1, "rgba(0,212,255,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = outerGrad;
      ctx.fill();

      // Draw 6 outer petals (Flower of Life)
      const petalColors = [
        "rgba(0,212,255,0.7)",
        "rgba(255,184,0,0.7)",
        "rgba(168,85,247,0.7)",
        "rgba(0,255,136,0.7)",
        "rgba(0,212,255,0.7)",
        "rgba(255,184,0,0.7)",
      ];
      for (let i = 0; i < 6; i++) {
        const theta = (i * Math.PI) / 3 + angle;
        const px = cx + r * 0.5 * Math.cos(theta);
        const py = cy + r * 0.5 * Math.sin(theta);
        ctx.beginPath();
        ctx.arc(px, py, r * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = petalColors[i];
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.65 + 0.25 * Math.sin(angle * 3 + i);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Center circle
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,212,255,0.9)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner hexagon (Metatron's Cube)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.5);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const hx = r * 0.5 * Math.cos((i * Math.PI) / 3);
        const hy = r * 0.5 * Math.sin((i * Math.PI) / 3);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,184,0,0.8)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Star of David lines (counter-rotate)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle * 0.3);
      for (let tri = 0; tri < 2; tri++) {
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const starAngle = (i * (2 * Math.PI)) / 3 + (tri * Math.PI) / 3;
          const sx = r * 0.48 * Math.cos(starAngle);
          const sy = r * 0.48 * Math.sin(starAngle);
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.strokeStyle =
          tri === 0 ? "rgba(168,85,247,0.6)" : "rgba(0,255,136,0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // Center dot pulse
      const pulse = 0.5 + 0.5 * Math.sin(angle * 4);
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.12);
      centerGrad.addColorStop(0, `rgba(0,255,136,${0.9 * pulse + 0.1})`);
      centerGrad.addColorStop(1, "rgba(0,255,136,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = centerGrad;
      ctx.fill();

      // Outer rotating dots (12 nodes)
      for (let i = 0; i < 12; i++) {
        const dotAngle = (i * Math.PI) / 6 + angle * 1.5;
        const dx = cx + r * 1.05 * Math.cos(dotAngle);
        const dy = cy + r * 1.05 * Math.sin(dotAngle);
        const dotPulse = 0.4 + 0.6 * Math.abs(Math.sin(angle * 2 + i * 0.5));
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${dotPulse})`;
        ctx.fill();
      }
    }

    function animate() {
      angleRef.current += 0.018;
      drawFlowerOfLife(angleRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <canvas
          ref={canvasRef}
          width={size * 0.5}
          height={size * 0.5}
          style={{ width: size * 0.5, height: size * 0.5 }}
        />
        {label && (
          <span
            className="text-xs font-mono tracking-widest animate-pulse"
            style={{ color: "#00D4FF" }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: "rgba(5,11,26,0.92)", backdropFilter: "blur(8px)" }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
      {label && (
        <div
          className="mt-4 text-xs font-mono tracking-[0.3em] animate-pulse"
          style={{ color: "#00D4FF" }}
        >
          {label}
        </div>
      )}
      <div
        className="mt-2 text-[10px] font-mono tracking-widest"
        style={{ color: "#FFB800", opacity: 0.6 }}
      >
        KUN FAYAKŪN × ∞
      </div>
    </div>
  );
}
