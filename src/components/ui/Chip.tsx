import React from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import {
  useTheme,
  useThemedPalette,
  useThemedPaletteStyles,
} from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { Tap } from './Tap';

// When a chip is active it fills with `accent`; pick a label color that
// actually contrasts that fill (luminance-based) so a dark accent like
// palette.ink gets light text instead of dark-on-dark (the analytics
// 7D/30D/90D tabs were black text on a black box in light mode).
function readableOnAccent(hex: string): string {
  const h = (hex || '').replace('#', '');
  if (h.length < 6) return staticPalette.ink;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? staticPalette.ink : staticPalette.bone;
}

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  accent?: string;
  inverse?: boolean;
  size?: 'sm' | 'md';
};

export function Chip({ label, active, onPress, accent = staticPalette.acid, inverse, size = 'md' }: Props) {
  const palette = useThemedPalette();
  const { scheme } = useTheme();
  const styles = useThemedPaletteStyles(makeStyles);

  const onDarkSurface =
    (scheme === 'dark' && !inverse) || (scheme === 'light' && inverse);
  const idleBorder = onDarkSurface
    ? 'rgba(242,239,230,0.38)'
    : 'rgba(10,10,10,0.32)';

  const colorStyle = {
    backgroundColor: active ? accent : 'transparent',
    borderColor: active ? accent : idleBorder,
  };

  const labelColor = active
    ? readableOnAccent(accent)
    : inverse
      ? palette.bone
      : palette.ink;

  return (
    <Tap onPress={onPress ?? (() => {})} burstColor={accent}>
      <View
        style={[
          styles.chip,
          size === 'sm' ? styles.chipSm : styles.chipMd,
          colorStyle,
        ]}
      >
        <RNText
          style={[
            size === 'sm' ? styles.labelSm : styles.labelMd,
            { color: labelColor },
          ]}
          numberOfLines={1}
          ellipsizeMode="clip"
          allowFontScaling={false}
        >
          {label}
        </RNText>
      </View>
    </Tap>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  // Extra horizontal padding compensates for the trailing letter-spacing
  // on the all-caps label, which would otherwise be clipped by the
  // `overflow: 'hidden'` on the parent Tap wrapper.
  chipMd: { paddingVertical: 9, paddingLeft: 18, paddingRight: 16 },
  chipSm: { paddingVertical: 6, paddingLeft: 13, paddingRight: 11 },
  labelMd: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  labelSm: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
