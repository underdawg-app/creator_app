import React, { useEffect } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import {
  useTheme,
  useThemedPalette,
  useThemedPaletteStyles,
} from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { Tap } from './Tap';

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
  const p = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    p.value = withTiming(active ? 1 : 0, { duration: 160, easing: Easing.out(Easing.quad) });
  }, [active]);

  // Inactive chips keep a transparent fill so they don't collide with the
  // page surface — on dark themes, palette.paper sits at nearly the same
  // value as the background and the pill silhouette disappeared. The
  // border color flips with the active scheme (and the caller's `inverse`
  // flag) so the outline is always legible.
  const onDarkSurface =
    (scheme === 'dark' && !inverse) || (scheme === 'light' && inverse);
  const idleBorder = onDarkSurface
    ? 'rgba(242,239,230,0.38)'
    : 'rgba(10,10,10,0.32)';
  const idleSurface = 'transparent';

  // Scale is the only animated property — colors are JS-driven so they
  // flip instantly when `active` changes (worklets occasionally cache
  // captured JS values across renders, which made the active accent
  // sometimes fail to apply on the first toggle).
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - p.value * 0.015 }],
  }));

  const colorStyle = {
    backgroundColor: active ? accent : idleSurface,
    borderColor: active ? accent : idleBorder,
  };

  const labelColor = active
    ? staticPalette.ink
    : inverse
      ? palette.bone
      : palette.ink;

  return (
    <Tap onPress={onPress ?? (() => {})} burstColor={accent}>
      <Animated.View
        style={[
          styles.chip,
          size === 'sm' ? styles.chipSm : styles.chipMd,
          colorStyle,
          scaleStyle,
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
      </Animated.View>
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
