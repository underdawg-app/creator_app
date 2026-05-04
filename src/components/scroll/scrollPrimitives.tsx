import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  ViewProps,
  Dimensions,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  type SharedValue,
} from 'react-native-reanimated';

const { height: SCREEN_H } = Dimensions.get('window');

// ───────────────────────────────────────────────────────────────────
// Shared: measure a view's Y and height on layout so we can compute
// its position relative to scrollY.
// ───────────────────────────────────────────────────────────────────

function useMeasured() {
  const y = useRef({ current: 0 });
  const h = useRef({ current: 0 });
  const [state, setState] = React.useState({ y: 0, h: 0 });

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const { y: ny, height: nh } = e.nativeEvent.layout;
    y.current.current = ny;
    h.current.current = nh;
    setState((s) => (s.y === ny && s.h === nh ? s : { y: ny, h: nh }));
  }, []);

  return { y: state.y, h: state.h, onLayout };
}

// ───────────────────────────────────────────────────────────────────
// ParallaxLayer — children move at a fraction of scroll speed.
// speed > 0 → moves slower than scroll (classic parallax)
// speed < 0 → moves faster (overshoot)
// ───────────────────────────────────────────────────────────────────

export function ParallaxLayer({
  scrollY, speed = 0.3, style, children, ...rest
}: ViewProps & { scrollY: SharedValue<number>; speed?: number }) {
  const { y, onLayout } = useMeasured();

  const s = useAnimatedStyle(() => ({
    transform: [
      { translateY: (scrollY.value - y) * speed * -1 },
    ],
  }));

  return (
    <Animated.View onLayout={onLayout} style={[style, s]} {...rest}>
      {children}
    </Animated.View>
  );
}

// ───────────────────────────────────────────────────────────────────
// HeroSoftFade — fades/translates/scales content based on how far
// scrolled past the top. Perfect for first-viewport hero dismissal.
// ───────────────────────────────────────────────────────────────────

export function HeroSoftFade({
  scrollY, distance = 320, style, children, translate = 40, ...rest
}: ViewProps & {
  scrollY: SharedValue<number>;
  distance?: number;
  translate?: number;
}) {
  const s = useAnimatedStyle(() => {
    const t = interpolate(scrollY.value, [0, distance], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: 1 - t,
      transform: [
        { translateY: -t * translate },
        { scale: 1 - t * 0.04 },
      ],
    };
  });
  return (
    <Animated.View style={[style, s]} {...rest}>
      {children}
    </Animated.View>
  );
}

// ───────────────────────────────────────────────────────────────────
// RevealOnScroll — children fade/translate/scale as they pass
// through the viewport. Soft entrance, soft exit.
// ───────────────────────────────────────────────────────────────────

export function RevealOnScroll({
  scrollY,
  style,
  children,
  translate = 60,
  scale = true,
  stiff = false,
  ...rest
}: ViewProps & {
  scrollY: SharedValue<number>;
  translate?: number;
  scale?: boolean;
  stiff?: boolean;
}) {
  const { y, h, onLayout } = useMeasured();

  const s = useAnimatedStyle(() => {
    // Progress 0 → 1 as the element enters from bottom and reaches center.
    const enter = interpolate(
      scrollY.value,
      [y - SCREEN_H, y - SCREEN_H * 0.4],
      [0, 1],
      Extrapolation.CLAMP
    );
    // Gentle exit when passing the top.
    const exit = stiff
      ? 0
      : interpolate(
          scrollY.value,
          [y + h - SCREEN_H * 0.3, y + h - 40],
          [0, 0.35],
          Extrapolation.CLAMP
        );
    const t = enter - exit;
    return {
      opacity: Math.max(0, t),
      transform: [
        { translateY: (1 - enter) * translate },
        { scale: scale ? 0.96 + enter * 0.04 : 1 },
      ],
    };
  });

  return (
    <Animated.View onLayout={onLayout} style={[style, s]} {...rest}>
      {children}
    </Animated.View>
  );
}

// ───────────────────────────────────────────────────────────────────
// TextDrop — a block where lines "drop in" from above one by one
// as the element enters the viewport. Hero editorial feel.
// ───────────────────────────────────────────────────────────────────

export function TextDrop({
  lines, scrollY, style, lineStyle, stagger = 0.12, distance = 60,
}: {
  lines: { text: string; style?: any }[];
  scrollY: SharedValue<number>;
  style?: any;
  lineStyle?: any;
  stagger?: number;
  distance?: number;
}) {
  const { y, onLayout } = useMeasured();

  return (
    <View onLayout={onLayout} style={style}>
      {lines.map((ln, i) => (
        <DropLine
          key={i}
          text={ln.text}
          extraStyle={[lineStyle, ln.style]}
          scrollY={scrollY}
          anchorY={y}
          index={i}
          stagger={stagger}
          distance={distance}
        />
      ))}
    </View>
  );
}

function DropLine({
  text, extraStyle, scrollY, anchorY, index, stagger, distance,
}: {
  text: string;
  extraStyle?: any;
  scrollY: SharedValue<number>;
  anchorY: number;
  index: number;
  stagger: number;
  distance: number;
}) {
  const s = useAnimatedStyle(() => {
    const base = interpolate(
      scrollY.value,
      [anchorY - SCREEN_H, anchorY - SCREEN_H * 0.5],
      [0, 1],
      Extrapolation.CLAMP
    );
    const localStart = Math.min(1, index * stagger);
    const localEnd = Math.min(1, localStart + 0.55);
    const t = interpolate(base, [localStart, localEnd], [0, 1], Extrapolation.CLAMP);
    return {
      opacity: t,
      transform: [{ translateY: (1 - t) * -distance }],
    };
  });

  return (
    <View style={{ overflow: 'hidden' }}>
      <Animated.Text style={[extraStyle, s]}>{text}</Animated.Text>
    </View>
  );
}

// ───────────────────────────────────────────────────────────────────
// PinnedBlock — stays glued to the top of the screen while the user
// scrolls through the block's full height. Implemented by applying
// a counter-translate inside a tall parent container.
//
// Usage: wrap a TALL container (total scroll length) and pass the
// fixed-height content as children. The content pins at the top.
// ───────────────────────────────────────────────────────────────────

export function PinnedBlock({
  scrollY,
  pinHeight = SCREEN_H,
  extraHeight = SCREEN_H,
  offsetTop = 0,
  children,
  style,
}: {
  scrollY: SharedValue<number>;
  /** Height of the pinned content itself (default: full viewport). */
  pinHeight?: number;
  /** How many pixels the pin should persist before releasing. */
  extraHeight?: number;
  /** Top padding inside the pin. */
  offsetTop?: number;
  children: React.ReactNode;
  style?: any;
}) {
  const { y: anchorY, onLayout } = useMeasured();

  const contentStyle = useAnimatedStyle(() => {
    // Distance the user has scrolled past the top of this block.
    const past = scrollY.value - anchorY;
    if (past < 0) return { transform: [{ translateY: 0 }] };
    // While still within the extra-height window, counter-translate to pin.
    const pinned = Math.min(past, extraHeight);
    return { transform: [{ translateY: pinned }] };
  });

  return (
    <View
      onLayout={onLayout}
      style={[{ height: pinHeight + extraHeight }, style]}
    >
      <Animated.View style={[{ height: pinHeight, paddingTop: offsetTop }, contentStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}

// ───────────────────────────────────────────────────────────────────
// HazeLayer — approximates blur by compositing semi-transparent
// overlays that decrease in opacity as element approaches viewport
// center. Cheap, GPU-friendly, no expo-blur needed.
// ───────────────────────────────────────────────────────────────────

export function HazeLayer({
  scrollY, children, style, hazeColor = 'rgba(10,10,10,0.6)',
}: {
  scrollY: SharedValue<number>;
  children: React.ReactNode;
  style?: any;
  hazeColor?: string;
}) {
  const { y, h, onLayout } = useMeasured();

  const hazeStyle = useAnimatedStyle(() => {
    // Haze is at 1 when element is far from center, 0 when at center.
    const centerY = y + h / 2;
    const distance = Math.abs((scrollY.value + SCREEN_H / 2) - centerY);
    const maxDist = SCREEN_H * 0.55;
    const haze = interpolate(distance, [0, maxDist], [0, 0.7], Extrapolation.CLAMP);
    return { opacity: haze };
  });

  return (
    <View onLayout={onLayout} style={style}>
      {children}
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: hazeColor }, hazeStyle]}
      />
    </View>
  );
}
