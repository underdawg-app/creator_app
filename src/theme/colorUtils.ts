/**
 * Helper utilities for working with color opacity in theme-aware ways.
 * Converts hex colors to rgba with specified opacity for palette values
 * that need to adapt to light/dark modes.
 */

export function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

/**
 * Apply opacity to a hex color or already-rgba palette value.
 * Use this in makeStyles to create theme-aware opacity variants.
 * @example
 *   borderColor: withOpacity(palette.ink, 0.12)  // Black with 12% opacity in light mode
 *   backgroundColor: withOpacity(palette.bone, 0.22) // Light with 22% opacity in light mode
 */
export function withOpacity(color: string, opacity: number): string {
  if (!color.startsWith('#')) {
    return color; // Already rgba or other format
  }
  return hexToRgba(color, opacity);
}
