// Fonts are bundled at build time via react-native.config.js + react-native-asset.
// On Android the fontFamily string resolves to the .ttf filename (minus extension)
// in android/app/src/main/assets/fonts/. On iOS the .ttf files are added to the
// Xcode project and listed in Info.plist UIAppFonts.
export const fonts = {
  display: 'Anton_400Regular',
  displayBold: 'Archivo_900Black',
  displayBoldItalic: 'Archivo_900Black_Italic',
  displayHeavy: 'Archivo_800ExtraBold',
  editorial: 'InstrumentSerif_400Regular',
  editorialItalic: 'InstrumentSerif_400Regular_Italic',
  body: 'SpaceGrotesk_400Regular',
  bodyMedium: 'SpaceGrotesk_500Medium',
  bodyBold: 'SpaceGrotesk_700Bold',
} as const;

/**
 * Modular type scale (ratio ≈ 1.25, 14px body base). Line-heights tuned per
 * tier: display = 0.95–1.0, heads = 1.08–1.15, body = 1.45. Tracking is
 * tight-negative on display, neutral on body, and wide on uppercase labels.
 */
export const type = {
  // Display tier — stacked hero type
  hero: {
    fontFamily: fonts.displayBold,
    fontSize: 88,
    lineHeight: 82,
    letterSpacing: -3.6,
  },
  display1: {
    fontFamily: fonts.displayBold,
    fontSize: 72,
    lineHeight: 68,
    letterSpacing: -2.8,
  },
  display2: {
    fontFamily: fonts.displayBold,
    fontSize: 56,
    lineHeight: 54,
    letterSpacing: -2.2,
  },
  display3: {
    fontFamily: fonts.displayBold,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -1.6,
  },

  // Editorial tier — italic counterpoint
  editorial1: {
    fontFamily: fonts.editorialItalic,
    fontSize: 56,
    lineHeight: 54,
    letterSpacing: -1.2,
  },
  editorial2: {
    fontFamily: fonts.editorialItalic,
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -0.6,
  },
  editorial3: {
    fontFamily: fonts.editorialItalic,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.2,
  },

  // Title tier — section and card titles
  title1: {
    fontFamily: fonts.displayHeavy,
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: -0.9,
  },
  title2: {
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  title3: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.3,
  },

  // Body tier
  lead: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 25,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.05,
  },
  bodyMedium: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.05,
  },
  small: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },

  // Label tier — all-caps, wide tracking
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 2.2,
    textTransform: 'uppercase' as const,
  },
  labelLarge: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 2.6,
    textTransform: 'uppercase' as const,
  },
  micro: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 2,
    textTransform: 'uppercase' as const,
  },

  // Button
  button: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 1.8,
    textTransform: 'uppercase' as const,
  },

  // Numeric — for tickers, scores
  numeric: {
    fontFamily: fonts.displayBold,
    fontSize: 36,
    lineHeight: 36,
    letterSpacing: -1.2,
  },
} as const;

export type TypeKey = keyof typeof type;
