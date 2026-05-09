import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, Pressable, PressableProps, ViewStyle, StyleProp, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';

const IS_ANDROID = Platform.OS === 'android';

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  burstColor?: string;
  scale?: number;
  /** Kept for API compatibility — haptic is now triggered by the parent
   *  `Tap` component on commit, not on touch-start. See note below. */
  haptic?: 'light' | 'medium' | 'rigid' | 'none';
  children: React.ReactNode;
};

/**
 * Wrap anything tappable.
 *
 * Haptic is intentionally NOT fired here. Earlier versions buzzed on
 * `onPressIn`, which fires the moment any finger lands — including the touch
 * that turns into a scroll. The result was the phone vibrating on every list
 * scroll. Haptics now fire on `onPress` (a committed tap) inside the parent
 * `Tap` component, so a touch that becomes a scroll never triggers feedback.
 */
export function TapBurst(props: Props) {
  if (IS_ANDROID) return <TapBurstAndroid {...props} />;
  return <TapBurstAnimated {...props} />;
}

/**
 * Android variant: a plain Pressable with a native ripple. The animated burst
 * ring + scale spring path runs three Reanimated worklets per tap and forces
 * `overflow: hidden` on every wrapper (off-screen hardware layer per tap
 * target). With ~50 Tap instances on a single screen that adds up to real
 * scroll jank. The platform ripple is GPU-cheap and instant.
 */
function TapBurstAndroid({
  style,
  burstColor = staticPalette.acid,
  haptic: _haptic,
  onPressIn,
  onPressOut,
  onPress,
  children,
  ...rest
}: Props) {
  return (
    <Pressable
      {...rest}
      style={style}
      android_ripple={{ color: hexToRipple(burstColor), borderless: false, foreground: true }}
      unstable_pressDelay={0}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

function hexToRipple(hex: string): string {
  // Android ripples need a translucent color so the ripple is subtle on top
  // of light-coloured buttons (most of our acid/electric/blush accents are
  // bright). Drop opacity to ~25%.
  if (!hex.startsWith('#') || hex.length !== 7) return 'rgba(10,10,10,0.18)';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},0.25)`;
}

function TapBurstAnimated({
  style,
  burstColor = staticPalette.acid,
  scale = 0.97,
  haptic: _haptic,
  onPressIn,
  onPressOut,
  onPress,
  children,
  ...rest
}: Props) {
  const s = useSharedValue(1);
  const burstX = useSharedValue(0);
  const burstY = useSharedValue(0);
  const burstP = useSharedValue(1);
  const sizeRef = useRef({ w: 0, h: 0 });

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }));

  const ringStyle = useAnimatedStyle(() => {
    const maxR = Math.max(sizeRef.current.w, sizeRef.current.h) * 1.3;
    return {
      opacity: 1 - burstP.value,
      transform: [
        { translateX: burstX.value - maxR / 2 },
        { translateY: burstY.value - maxR / 2 },
        { scale: 0.1 + burstP.value },
      ],
      width: maxR,
      height: maxR,
      borderRadius: maxR / 2,
    };
  });

  const handleIn = useCallback(
    (e: any) => {
      const { locationX, locationY } = e.nativeEvent;
      burstX.value = locationX;
      burstY.value = locationY;
      burstP.value = 0;
      burstP.value = withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) });
      s.value = withTiming(scale, { duration: 90, easing: Easing.out(Easing.quad) });
      onPressIn?.(e);
    },
    [scale, onPressIn]
  );

  const handleOut = useCallback(
    (e: any) => {
      s.value = withTiming(1, { duration: 140, easing: Easing.out(Easing.quad) });
      onPressOut?.(e);
    },
    [onPressOut]
  );

  return (
    <Pressable
      {...rest}
      unstable_pressDelay={0}
      onPressIn={handleIn}
      onPressOut={handleOut}
      onPress={onPress}
      onLayout={(e) => {
        sizeRef.current = {
          w: e.nativeEvent.layout.width,
          h: e.nativeEvent.layout.height,
        };
      }}
    >
      <Animated.View style={[style, contentStyle, { overflow: 'hidden' }]}>
        {children}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.ring,
            ringStyle,
            { borderColor: burstColor },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
});
