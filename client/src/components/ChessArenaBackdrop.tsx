import { useEffect, useRef } from "react";

/** Decorative-only canvas scene. Legal chess interaction remains in accessible HTML controls. */
export function ChessArenaBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let animation = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(bounds.width * scale));
      const height = Math.max(1, Math.floor(bounds.height * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const boardSize = Math.min(bounds.width * 0.82, bounds.height * 0.78);
      const left = centerX - boardSize / 2;
      const top = centerY - boardSize / 2;
      const cell = boardSize / 8;

      const haze = context.createRadialGradient(centerX, centerY, boardSize * 0.08, centerX, centerY, boardSize * 0.76);
      haze.addColorStop(0, "rgba(0,212,255,0.18)");
      haze.addColorStop(0.55, "rgba(22,55,87,0.08)");
      haze.addColorStop(1, "rgba(5,11,26,0)");
      context.fillStyle = haze;
      context.fillRect(0, 0, bounds.width, bounds.height);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(reducedMotion ? 0 : frame * 0.0012);
      const ring = context.createLinearGradient(-boardSize / 2, -boardSize / 2, boardSize / 2, boardSize / 2);
      ring.addColorStop(0, "rgba(0,212,255,0.55)");
      ring.addColorStop(0.5, "rgba(255,184,0,0.22)");
      ring.addColorStop(1, "rgba(185,140,255,0.48)");
      context.strokeStyle = ring;
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(0, 0, boardSize * 0.58, 0, Math.PI * 2);
      context.stroke();
      context.restore();

      for (let row = 0; row < 8; row += 1) {
        for (let column = 0; column < 8; column += 1) {
          const lightSquare = (row + column) % 2 === 0;
          context.fillStyle = lightSquare ? "rgba(230,199,167,0.11)" : "rgba(23,51,82,0.26)";
          context.fillRect(left + column * cell, top + row * cell, cell, cell);
        }
      }

      context.strokeStyle = "rgba(0,212,255,0.25)";
      context.lineWidth = 1;
      context.strokeRect(left, top, boardSize, boardSize);
      for (let index = 1; index < 8; index += 1) {
        context.beginPath();
        context.moveTo(left + index * cell, top);
        context.lineTo(left + index * cell, top + boardSize);
        context.moveTo(left, top + index * cell);
        context.lineTo(left + boardSize, top + index * cell);
        context.stroke();
      }

      if (!reducedMotion) {
        frame += 1;
        animation = window.requestAnimationFrame(draw);
      }
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);
    return () => {
      window.cancelAnimationFrame(animation);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-45" />;
}
