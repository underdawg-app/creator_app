import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import * as Haptics from '@/haptics';
import { Pressable } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { type as typeStyles, fonts } from '@/theme/typography';
import { radii } from '@/theme/spacing';

type Variant = 'solid' | 'outline' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  background?: string;
  foreground?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  /** Disable press scale + letter drift + fill animation. Haptic still fires. */
  staticPress?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const sizeMap = {
  sm: { h: 44, px: 18, fs: 12 },
  md: { h: 56, px: 26, fs: 14 },
  lg: { h: 68, px: 34, fs: 16 },
};

export function MagneticButton({
  label,
  onPress,
  variant = 'solid',
  background,
  foreground,
  size = 'md',
  style,
  disabled,
  staticPress,
}: Props) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const resolvedBackground = background ?? staticPalette.acid;
  const resolvedForeground = foreground ?? palette.ink;
  const progress = useSharedValue(0);
  const hover = useSharedValue(0);

  const { h, px, fs } = sizeMap[size];

  const letters = useMemo(() => label.split(''), [label]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 - progress.value * 0.03 },
      { translateY: progress.value * 1 },
    ],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: hover.value }],
    opacity: hover.value,
  }));

  const bgBase: ViewStyle = {
    backgroundColor:
      variant === 'solid' ? resolvedBackground : 'transparent',
    borderColor:
      variant === 'outline' ? palette.ink : 'transparent',
    borderWidth: variant === 'outline' ? 1.5 : 0,
  };

  // Visual press state on touch-start (no haptic). Touch-start fires for any
  // finger contact including the start of a scroll, which is why we keep
  // haptic strictly on the committed `onPress` below.
  const handleIn = () => {
    if (staticPress) return;
    progress.value = withTiming(1, { duration: 110, easing: Easing.out(Easing.quad) });
    hover.value = withTiming(1, { duration: 320 });
  };
  const handleOut = () => {
    if (staticPress) return;
    progress.value = withTiming(0, { duration: 160, easing: Easing.out(Easing.quad) });
    hover.value = withTiming(0, { duration: 420 });
  };
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid).catch(() => {});
    onPress?.();
  };

  return (
    <AnimatedPressable
      disabled={disabled}
      // Instant press recognition — Android otherwise debounces ~50ms which
      // makes large CTA buttons feel like they need a second tap.
      unstable_pressDelay={0}
      onPressIn={handleIn}
      onPressOut={handleOut}
      onPress={handlePress}
      style={[
        styles.container,
        bgBase,
        {
          height: h,
          paddingHorizontal: px,
          borderRadius: radii.pill,
          opacity: disabled ? 0.4 : 1,
        },
        containerStyle,
        style,
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: variant === 'solid' ? palette.ink : resolvedBackground,
            borderRadius: radii.pill,
            transformOrigin: 'left',
          },
          fillStyle,
        ]}
      />
      <View style={styles.row}>
        {letters.map((ch, i) => (
          <Letter
            key={`${ch}-${i}`}
            index={i}
            total={letters.length}
            progress={progress}
            hover={hover}
            char={ch}
            color={resolvedForeground}
            hoverColor={variant === 'solid' ? resolvedBackground : palette.ink}
            fontSize={fs}
          />
        ))}
      </View>
    </AnimatedPressable>
  );
}

function Letter({
  index,
  total,
  progress,
  hover,
  char,
  color,
  hoverColor,
  fontSize,
}: {
  index: number;
  total: number;
  progress: SharedValue<number>;
  hover: SharedValue<number>;
  char: string;
  color: string;
  hoverColor: string;
  fontSize: number;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const windDir = index % 2 === 0 ? 1 : -1;
  const delayIn = index * 14;
  const delayOut = (total - index) * 10;

  const baseStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const drift = Math.sin((index / Math.max(total - 1, 1)) * Math.PI) * 2.4;
    return {
      transform: [
        { translateY: -p * drift * windDir },
        { translateX: p * drift * 0.3 },
        { rotateZ: `${p * 2 * windDir}deg` },
      ],
      opacity: 1 - hover.value * 0.02,
    };
  });

  const topStyle = useAnimatedStyle(() => ({
    opacity: hover.value,
    transform: [{ translateY: (1 - hover.value) * 14 }],
  }));

  const bottomStyle = useAnimatedStyle(() => ({
    opacity: 1 - hover.value,
    transform: [{ translateY: -hover.value * 14 }],
  }));

  const textStyle = {
    fontFamily: fonts.bodyBold,
    fontSize,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
  };

  const space = char === ' ';
  if (space) return <View style={{ width: 6 }} />;

  return (
    <Animated.View style={[styles.letterWrap, baseStyle]}>
      <Animated.Text style={[textStyle, { color }, bottomStyle]}>
        {char}
      </Animated.Text>
      <Animated.Text
        style={[
          textStyle,
          { color: hoverColor, position: 'absolute', top: 0, left: 0 },
          topStyle,
        ]}
      >
        {char}
      </Animated.Text>
    </Animated.View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: { flexDirection: 'row' },
  letterWrap: { overflow: 'hidden', flexDirection: 'row' },
});
