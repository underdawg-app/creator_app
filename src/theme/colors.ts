const rawPalette = {
  ink: '#0A0A0A',
  inkSoft: '#141414',
  inkMuted: '#1E1E1E',
  bone: '#F2EFE6',
  boneSoft: '#E7E2D4',
  boneMuted: '#E0DCCC',
  paper: '#FFFFFF',
  acid: '#9CA3AF',
  electric: '#2E5BFF',
  blush: '#FF6BB5',
  ember: '#FF5A1F',
  mute: '#9C988A',
  line: 'rgba(10,10,10,0.12)',
  lineDark: 'rgba(242,239,230,0.14)',
  hairlineStrongDark: 'rgba(242,239,230,0.12)',
  hairlineStrongLight: 'rgba(10,10,10,0.12)',
};

export type Palette = Record<keyof typeof rawPalette, string>;

export const palette: Palette = rawPalette;

/**
 * Role-aware palette values for the light scheme. Matches the static `palette`
 * export 1:1 — the app was authored dark-first, and the existing code uses
 * `palette.bone` for main content surfaces (light) and `palette.ink` for
 * contrasting text / root chrome (dark), which maps directly onto "light
 * mode" semantics.
 */
export const lightPalette: Palette = palette;

/**
 * Role-aware palette values for the dark scheme. Keys are preserved for
 * drop-in use; values are inverted along their UI role so that screens
 * authored with `backgroundColor: palette.bone` (main surface) render dark
 * in dark mode, and text authored with `color: palette.ink` on those
 * surfaces automatically flips to light for contrast.
 *
 * Accents (acid/electric/blush/ember) and the neutral `mute` are constant.
 */
export const darkPalette: Palette = {
  ink: palette.bone,
  inkSoft: palette.boneSoft,
  inkMuted: palette.boneMuted,
  bone: palette.ink,
  boneSoft: palette.inkSoft,
  boneMuted: palette.inkMuted,
  paper: palette.ink,
  acid: palette.acid,
  electric: palette.electric,
  blush: palette.blush,
  ember: palette.ember,
  mute: palette.mute,
  line: palette.lineDark,
  lineDark: palette.line,
  hairlineStrongDark: palette.hairlineStrongLight,
  hairlineStrongLight: palette.hairlineStrongDark,
};

export type ThemeScheme = 'light' | 'dark';
export type StatusBarStyle = 'light' | 'dark' | 'auto';

export type ThemeTokens = {
  scheme: ThemeScheme;
  surface: string;
  surfaceSoft: string;
  surfaceMuted: string;
  surfaceElevated: string;
  text: string;
  textSoft: string;
  textMuted: string;
  hairline: string;
  hairlineStrong: string;
  accentPrimary: string;
  accentSecondary: string;
  accentTertiary: string;
  accentWarning: string;
  statusBarStyle: StatusBarStyle;
};

export const darkTokens: ThemeTokens = {
  scheme: 'dark',
  surface: palette.ink,
  surfaceSoft: palette.inkSoft,
  surfaceMuted: palette.inkMuted,
  surfaceElevated: palette.inkSoft,
  text: palette.bone,
  textSoft: palette.boneSoft,
  textMuted: palette.mute,
  hairline: palette.lineDark,
  hairlineStrong: palette.hairlineStrongDark,
  accentPrimary: palette.acid,
  accentSecondary: palette.electric,
  accentTertiary: palette.blush,
  accentWarning: palette.ember,
  statusBarStyle: 'light',
};

export const lightTokens: ThemeTokens = {
  scheme: 'light',
  surface: palette.bone,
  surfaceSoft: palette.boneSoft,
  surfaceMuted: palette.boneMuted,
  surfaceElevated: palette.paper,
  text: palette.ink,
  textSoft: palette.inkSoft,
  textMuted: palette.mute,
  hairline: palette.line,
  hairlineStrong: palette.hairlineStrongLight,
  accentPrimary: palette.acid,
  accentSecondary: palette.electric,
  accentTertiary: palette.blush,
  accentWarning: palette.ember,
  statusBarStyle: 'dark',
};

export const theme = {
  bg: palette.bone,
  bgInverse: palette.ink,
  fg: palette.ink,
  fgInverse: palette.bone,
  muted: palette.mute,
  accentPrimary: palette.acid,
  accentSecondary: palette.electric,
  accentTertiary: palette.blush,
  hairline: palette.line,
  hairlineDark: palette.lineDark,
} as const;

export type Theme = typeof theme;
