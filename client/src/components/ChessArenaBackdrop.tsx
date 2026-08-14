import { useEffect, useRef } from "react";
import {
  Color3,
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

/** Decorative-only Babylon scene. Legal chess interaction remains in accessible HTML controls. */
export function ChessArenaBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false });
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.01, 0.03, 0.09, 0);

    const camera = new FreeCamera("chess-arena-camera", new Vector3(0, 7.8, -9.5), scene);
    camera.setTarget(Vector3.Zero());
    const light = new HemisphericLight("chess-arena-light", new Vector3(0.2, 1, -0.2), scene);
    light.intensity = 1.15;

    const frame = MeshBuilder.CreateBox("chess-arena-frame", { width: 7.8, height: 0.18, depth: 7.8 }, scene);
    frame.position.y = -0.2;
    const frameMaterial = new StandardMaterial("chess-arena-frame-material", scene);
    frameMaterial.diffuseColor = Color3.FromHexString("#A76A4B");
    frameMaterial.emissiveColor = Color3.FromHexString("#281311");
    frame.material = frameMaterial;

    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const tile = MeshBuilder.CreateBox(`tile-${row}-${col}`, { width: 0.88, height: 0.08, depth: 0.88 }, scene);
        tile.position = new Vector3((col - 3.5) * 0.91, 0, (row - 3.5) * 0.91);
        const tileMaterial = new StandardMaterial(`tile-mat-${row}-${col}`, scene);
        const lightSquare = (row + col) % 2 === 0;
        tileMaterial.diffuseColor = Color3.FromHexString(lightSquare ? "#E6C7A7" : "#173352");
        tileMaterial.emissiveColor = Color3.FromHexString(lightSquare ? "#2D1713" : "#001421");
        tile.material = tileMaterial;
      }
    }

    const glow = MeshBuilder.CreateTorus("chess-arena-glow", { diameter: 8.8, thickness: 0.035, tessellation: 64 }, scene);
    glow.rotation.x = Math.PI / 2;
    glow.position.y = -0.13;
    const glowMaterial = new StandardMaterial("chess-arena-glow-material", scene);
    glowMaterial.emissiveColor = Color3.FromHexString("#00D4FF");
    glowMaterial.alpha = 0.52;
    glow.material = glowMaterial;

    engine.runRenderLoop(() => {
      glow.rotation.z += 0.0018;
      scene.render();
    });
    const resize = () => engine.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-35" />;
}
