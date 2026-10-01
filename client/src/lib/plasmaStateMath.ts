export type PlasmaStateLabel = "crossing" | "crest" | "trough" | "rising" | "falling";

export type PlasmaState = {
  degrees: number;
  radians: number;
  x: number;
  y: number;
  amplitude: number;
  label: PlasmaStateLabel;
};

/** A geometric orbit/sine projection, not a physical plasma or frequency model. */
export function getPlasmaState(value: number): PlasmaState {
  const degrees = Number.isFinite(value) ? Math.max(0, Math.min(360, value)) : 0;
  const radians = degrees * Math.PI / 180;
  const x = Math.sin(radians);
  const y = -Math.cos(radians);
  const amplitude = Math.sin(radians);
  const crossing = degrees === 0 || degrees === 180 || degrees === 360;
  const label: PlasmaStateLabel = crossing
    ? "crossing"
    : degrees === 90
      ? "crest"
      : degrees === 270
        ? "trough"
        : degrees < 90 || degrees > 270
          ? "rising"
          : "falling";

  return { degrees, radians, x, y, amplitude, label };
}
