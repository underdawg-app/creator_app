import React from 'react';
import {
  Image as RNImage,
  type ImageProps,
  type ImageStyle,
  type StyleProp,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

// The new underdawg wordmark, shipped in two solid-color variants so it always
// reads against the current background: black ink for light mode, white for
// dark. Both share the same transparent square canvas, so they're drop-in
// interchangeable wherever a brand mark used to render.
const BLACK = require('@/objects/brand-wordmark-black.png');
const WHITE = require('@/objects/brand-wordmark-white.png');

// Stacked "UNDER / DAWG" lockup — squarer aspect, used where a wide single-line
// wordmark won't fit (e.g. the tab-bar + button). Same two-variant treatment.
const MARK_BLACK = require('@/objects/brand-mark-black.png');
const MARK_WHITE = require('@/objects/brand-mark-white.png');

// Exposed so the splash screen can warm the bitmap cache for every variant.
export const BRAND_WORDMARK_ASSETS = [BLACK, WHITE, MARK_BLACK, MARK_WHITE];

type Props = Omit<ImageProps, 'source'> & {
  style?: StyleProp<ImageStyle>;
  // 'auto' follows the active theme (default). Force a variant when the
  // background is fixed regardless of theme.
  variant?: 'auto' | 'black' | 'white';
};

/**
 * Theme-aware underdawg wordmark. Picks the black or white variant from the
 * active color scheme so the logo always contrasts with its background.
 */
export function BrandWordmark({ variant = 'auto', resizeMode = 'contain', ...rest }: Props) {
  const { scheme } = useTheme();
  const source =
    variant === 'black'
      ? BLACK
      : variant === 'white'
        ? WHITE
        : scheme === 'dark'
          ? WHITE
          : BLACK;
  return <RNImage source={source} resizeMode={resizeMode} {...rest} />;
}

/**
 * Theme-aware stacked underdawg lockup. Same variant logic as BrandWordmark,
 * but squarer — fits constrained square targets like the tab-bar + button.
 */
export function BrandMark({ variant = 'auto', resizeMode = 'contain', ...rest }: Props) {
  const { scheme } = useTheme();
  const source =
    variant === 'black'
      ? MARK_BLACK
      : variant === 'white'
        ? MARK_WHITE
        : scheme === 'dark'
          ? MARK_WHITE
          : MARK_BLACK;
  return <RNImage source={source} resizeMode={resizeMode} {...rest} />;
}
