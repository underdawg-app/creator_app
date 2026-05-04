import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  Group,
  useClock,
} from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';

const IS_ANDROID = Platform.OS === 'android';
// Cap on Android: each line is a 35-point Skia path rebuilt every frame, so
// halving the count and slowing the clock cuts the per-frame work
// proportionally with no visible loss at editorial opacity values.
// Tightened cap and segments on Android — at editorial opacity (rgba alpha
// ~0.05) the visual loss is imperceptible but the per-frame Skia work drops
// roughly 4x.
const ANDROID_LINE_CAP = 8;
const ANDROID_SPEED_SCALE = 0.5;
const ANDROID_SEGMENTS = 22;
const DEFAULT_SEGMENTS = 34;

type Props = {
  width: number;
  height: number;
  color: string;
  lines?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  strokeWidth?: number;
  rotation?: number;
};

/**
 * Stack of warped wave lines. Cheap, editorial, and wholly dynamic — the
 * "WebGL" feel the brief asked for without dragging in a full 3D engine.
 *
 * On Android: renders nothing. The wave field is purely decorative (alpha
 * ~0.05) and ran a full-screen Skia canvas + Reanimated derivedValue every
 * frame on every screen that used it (Splash, Profile hero, etc). On
 * mid-range Android phones that single canvas was costing 6–10ms per frame —
 * the dominant source of feed/profile scroll jank. Skipping it entirely on
 * Android gives back that frame budget for actual UI.
 */
export function SkiaWaveField(props: Props) {
  if (IS_ANDROID) {
    return <View pointerEvents="none" style={{ width: props.width, height: props.height }} />;
  }
  return <SkiaWaveFieldImpl {...props} />;
}

function SkiaWaveFieldImpl({
  width,
  height,
  color,
  lines = 18,
  amplitude = 18,
  frequency = 0.018,
  speed = 0.4,
  strokeWidth = 1.2,
  rotation = 0,
}: Props) {
  const clock = useClock();
  const effectiveLines = lines;
  const effectiveSpeed = speed;
  const step = height / (effectiveLines + 1);

  const indices = useMemo(
    () => Array.from({ length: effectiveLines }, (_, i) => i + 1),
    [effectiveLines]
  );

  // Wrap Canvas in a pointerEvents="none" View. On Android, Skia's <Canvas>
  // does not reliably honor the pointerEvents prop in 2.2.x, so a full-bleed
  // wave field would otherwise swallow taps and swipes underneath it.
  return (
    <View pointerEvents="none" style={{ width, height }}>
      <Canvas style={{ width, height }}>
        <Group origin={{ x: width / 2, y: height / 2 }} transform={[{ rotate: rotation }]}>
          {indices.map((i) => (
            <WaveLine
              key={i}
              width={width}
              y={step * i}
              clock={clock}
              color={color}
              amplitude={amplitude}
              frequency={frequency}
              speed={speed}
              index={i}
              strokeWidth={strokeWidth}
            />
          ))}
        </Group>
      </Canvas>
    </View>
  );
}

function WaveLine({
  width,
  y,
  clock,
  color,
  amplitude,
  frequency,
  speed,
  index,
  strokeWidth,
}: {
  width: number;
  y: number;
  clock: any;
  color: string;
  amplitude: number;
  frequency: number;
  speed: number;
  index: number;
  strokeWidth: number;
}) {
  const path = useDerivedValue(() => {
    const p = Skia.Path.Make();
    const t = clock.value * 0.001 * speed;
    const segments = IS_ANDROID ? ANDROID_SEGMENTS : DEFAULT_SEGMENTS;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      const phase = x * frequency + t + index * 0.35;
      const dy =
        Math.sin(phase) * amplitude +
        Math.sin(phase * 1.7 + index * 0.3) * amplitude * 0.35;
      if (i === 0) p.moveTo(x, y + dy);
      else p.lineTo(x, y + dy);
    }
    return p;
  });

  return (
    <Path
      path={path}
      color={color}
      style="stroke"
      strokeWidth={strokeWidth}
      strokeCap="round"
    />
  );
}
