import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
const ACircle = Animated.createAnimatedComponent(Circle);
const APath = Animated.createAnimatedComponent(Path);

type Props = {
  size?: number;
  color?: string;
  accent?: string;
  play?: boolean;
  style?: any;
};

const RING_R = 58;
const RING_CIRC = 2 * Math.PI * RING_R;
const ARC_PATH =
  'M60 2 a58 58 0 0 1 0 116 a58 58 0 0 1 0 -116 Z';
const PAW_PATH =
  'M60 52 C52 52 46 58 46 68 C46 76 52 82 60 82 C68 82 74 76 74 68 C74 58 68 52 60 52 Z';

/**
 * Signet mark that draws itself in on mount: outer ring strokes around,
 * paw fills up, then accent rotates. Used on splash.
 */
export function AnimatedSignet({
  size = 140,
  color,
  accent = staticPalette.acid,
  play = true,
  style,
}: Props) {
  const palette = useThemedPalette();
  const resolvedColor = color ?? palette.bone;
  const ringP = useSharedValue(0);
  const pawP = useSharedValue(0);

  useEffect(() => {
    if (!play) return;
    ringP.value = withTiming(1, {
      duration: 1400,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
    pawP.value = withDelay(
      600,
      withTiming(1, { duration: 820, easing: Easing.bezier(0.22, 1, 0.36, 1) })
    );
  }, [play]);

  const ringProps = useAnimatedProps(() => ({
    strokeDashoffset: RING_CIRC * (1 - ringP.value),
  }));

  const pawProps = useAnimatedProps(() => ({
    opacity: pawP.value,
    // Scale effect via transform is not supported directly on SVG path in RNSVG;
    // we fade instead.
  }));

  const dotProps = useAnimatedProps(() => ({
    opacity: pawP.value,
  }));

  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" style={style}>
      {/* Inner filled disc */}
      <Circle cx="60" cy="60" r="34" fill={accent} />

      {/* Outer ring draws in */}
      <ACircle
        cx="60"
        cy="60"
        r={RING_R}
        fill="none"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeDasharray={RING_CIRC}
        animatedProps={ringProps}
      />

      {/* Paw */}
      <APath d={PAW_PATH} fill={resolvedColor} animatedProps={pawProps} />
      <ACircle cx="48" cy="48" r="4.8" fill={resolvedColor} animatedProps={dotProps} />
      <ACircle cx="57" cy="44" r="4.8" fill={resolvedColor} animatedProps={dotProps} />
      <ACircle cx="63" cy="44" r="4.8" fill={resolvedColor} animatedProps={dotProps} />
      <ACircle cx="72" cy="48" r="4.8" fill={resolvedColor} animatedProps={dotProps} />

      {/* Cardinal registration pips */}
      <Circle cx="60" cy="4" r="1.8" fill={resolvedColor} />
      <Circle cx="60" cy="116" r="1.8" fill={resolvedColor} />
      <Circle cx="4" cy="60" r="1.8" fill={resolvedColor} />
      <Circle cx="116" cy="60" r="1.8" fill={resolvedColor} />
    </Svg>
  );
}
