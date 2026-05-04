export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  s: 8,
  sm: 12,
  m: 16,
  ml: 20,
  l: 24,
  xl: 32,
  xxl: 48,
  xxxl: 72,
  mega: 112,
} as const;

export const radii = {
  none: 0,
  xs: 4,
  s: 10,
  m: 16,
  l: 24,
  xl: 40,
  pill: 999,
} as const;

export const gutter = {
  screen: 24,
  section: 32,
  grid: 12,
} as const;

export const motion = {
  fast: 180,
  base: 260,
  slow: 480,
  scroll: 640,
  ease: [0.22, 1, 0.36, 1] as const,
  easeOut: [0.16, 1, 0.3, 1] as const,
} as const;

export type Spacing = keyof typeof spacing;
