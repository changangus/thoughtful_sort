export type SortResult = "STANDARD" | "SPECIAL" | "REJECTED";

export function sort(width: number, height: number, length: number, mass: number): SortResult {
  const inputs = [width, height, length, mass];
  if (inputs.some((v) => typeof v !== "number" || !isFinite(v) || v <= 0)) {
    console.error(
      "Error: all inputs must be finite positive numbers.",
      JSON.stringify({ width, height, length, mass }),
    );
    return "REJECTED";
  }

  const volume = width * height * length;

  const bulky = volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150;

  const heavy = mass >= 20;

  if (bulky && heavy) return "REJECTED";
  if (bulky || heavy) return "SPECIAL";
  return "STANDARD";
}
