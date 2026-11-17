import {
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export interface SovereignSceneOptions {
  antialias?: boolean;
  startRenderLoop?: boolean;
}

export interface SovereignSceneRuntime {
  engine: Engine;
  scene: Scene;
  camera: ArcRotateCamera;
  dispose: () => void;
}

/**
 * Creates a browser-side Babylon.js scene using the ScrollVerse four-light
 * palette. This creates a scene only; it does not load external assets,
 * consume telemetry, or claim that any source geometry has been validated.
 */
export function createSovereignScene(
  canvas: HTMLCanvasElement,
  options: SovereignSceneOptions = {},
): SovereignSceneRuntime {
  const engine = new Engine(canvas, options.antialias ?? true);
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.04, 0.04, 0.05, 1);

  const camera = new ArcRotateCamera(
    "sovereign-camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    10,
    Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, true);

  const goldKey = new DirectionalLight(
    "gold-key",
    new Vector3(-1, -1, -1),
    scene,
  );
  goldKey.diffuse = new Color3(1, 0.84, 0);
  goldKey.intensity = 1;

  const cyanFill = new DirectionalLight(
    "cyan-fill",
    new Vector3(1, -0.5, 1),
    scene,
  );
  cyanFill.diffuse = new Color3(0, 1, 1);
  cyanFill.intensity = 0.8;

  const saffronRim = new DirectionalLight(
    "saffron-rim",
    new Vector3(0, -1, 1),
    scene,
  );
  saffronRim.diffuse = new Color3(1, 0.6, 0.2);
  saffronRim.intensity = 0.5;

  const emeraldBlessing = new HemisphericLight(
    "emerald-blessing",
    new Vector3(0, 1, 0),
    scene,
  );
  emeraldBlessing.diffuse = new Color3(0, 0.66, 0.42);
  emeraldBlessing.intensity = 0.3;

  const pedestal = MeshBuilder.CreateBox(
    "sovereign-pedestal",
    { size: 1.5 },
    scene,
  );
  pedestal.position.y = 0.75;

  const pedestalMaterial = new StandardMaterial("sovereign-pedestal-material", scene);
  pedestalMaterial.diffuseColor = new Color3(0.72, 0.52, 0.16);
  pedestal.material = pedestalMaterial;

  if (options.startRenderLoop) {
    engine.runRenderLoop(() => scene.render());
  }

  return {
    engine,
    scene,
    camera,
    dispose: () => {
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
    },
  };
}
