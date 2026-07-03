import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useStore } from '@/store';

const SIZE = 360;

export function AcidSplashHost() {
  const splashAt = useStore((s) => s.ui.splashAt);
  const [active, setActive] = useState<typeof splashAt | null>(null);

  useEffect(() => {
    if (!splashAt) return;
    setActive(splashAt);
    const id = setTimeout(() => setActive(null), 720);
    return () => clearTimeout(id);
  }, [splashAt?.ts]);

  if (!active) return null;

  return <Ripple cfg={active} />;
}

function Ripple({ cfg }: { cfg: { x: number; y: number; color: string } }) {
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withTiming(1, { duration: 680, easing: Easing.out(Easing.cubic) });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: 1 - p.value,
    transform: [
      { translateX: cfg.x - SIZE / 2 },
      { translateY: cfg.y - SIZE / 2 },
      { scale: 0.1 + p.value * 1.2 },
    ],
  }));

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            borderWidth: 3,
            borderColor: cfg.color,
          },
          style,
        ]}
      />
    </View>
  );
}
