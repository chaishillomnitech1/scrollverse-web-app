/*
 * JUNIOR MOVIES — Redirects to Sovereign Cinema with Junior tab active
 * Route: /junior-movies
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function JuniorMovies() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to Sovereign Cinema with junior tab hash
    setLocation("/sovereign-cinema#junior");
  }, [setLocation]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#050B1A" }}
    >
      <div className="text-center">
        <div className="text-4xl mb-4">🌟</div>
        <div
          className="text-lg font-mono"
          style={{ color: "#00D4FF", fontFamily: "'Space Mono', monospace" }}
        >
          Loading Junior Movies...
        </div>
        <div className="mt-2 text-sm" style={{ color: "#8899AA" }}>
          KUN FAYAKŪN × ∞
        </div>
      </div>
    </div>
  );
}
