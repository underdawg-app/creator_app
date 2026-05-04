import React, { useState } from 'react';
import { View, ViewProps, LayoutChangeEvent } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  SharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type Props = ViewProps & {
  scrollY: SharedValue<number>;
  windowHeight: number;
  offset?: number;
  translate?: number;
  scale?: boolean;
  children: React.ReactNode;
};

export function ScrollReveal({
  scrollY,
  windowHeight,
  offset = 80,
  translate = 48,
  scale = false,
  style,
  children,
  ...rest
}: Props) {
  const [y, setY] = useState<number | null>(null);
  const [h, setH] = useState<number>(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const layout = e.nativeEvent.layout;
    // y is relative to parent; for rough feel we use measure on screen would need onScrollBegin; keep simple
    setY(layout.y);
    setH(layout.height);
  };

  const t = useDerivedValue(() => {
    if (y == null) return 0;
    const start = y - windowHeight + offset;
    const end = y - windowHeight * 0.3;
    const span = Math.max(end - start, 1);
    const progress = (scrollY.value - start) / span;
    return Math.max(0, Math.min(1, progress));
  }, [y, windowHeight]);

  const animated = useAnimatedStyle(() => ({
    opacity: t.value,
    transform: [
      { translateY: (1 - t.value) * translate },
      { scale: scale ? 0.96 + t.value * 0.04 : 1 },
    ],
  }));

  return (
    <Animated.View onLayout={onLayout} style={[style as any, animated]} {...rest}>
      {children}
    </Animated.View>
  );
}
