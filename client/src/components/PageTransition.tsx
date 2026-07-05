import { useEffect, useRef, ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageTransition — wraps page content with a smooth fade + slide-up animation on mount.
 * Sovereign design: opacity 0→1, translateY 24px→0, duration 420ms ease-out.
 * Use this as the root wrapper on every ScrollVerse page for consistent transitions.
 */
export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 420ms cubic-bezier(0.22,1,0.36,1), transform 420ms cubic-bezier(0.22,1,0.36,1)";

    // Trigger on next frame
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}
