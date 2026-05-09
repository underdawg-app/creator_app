import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Canvas, Fill, Shader, Skia } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

// Skip the procedural grain on Android entirely. The full-screen fragment
// shader runs every frame and is the dominant FPS hit on mid-range devices.
// iOS keeps the texture for the editorial look. Centralizing this here means
// every caller benefits without per-screen Platform checks.
const SKIP_ON_THIS_PLATFORM = Platform.OS === 'android';

/**
 * Procedural analogue film-grain layer. Uses a small fragment shader that mixes
 * hash-based noise + a slow sweep so the grain feels alive, not a static PNG.
 */
const source = Skia.RuntimeEffect.Make(`
uniform float2 iResolution;
uniform float iTime;
uniform float iIntensity;
uniform float4 iTint;

float hash(float2 p) {
  p = fract(p * float2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

half4 main(float2 fragCoord) {
  float2 uv = fragCoord / iResolution;
  float n = hash(fragCoord + iTime * 53.0);
  float sweep = smoothstep(0.2, 0.9, fract(uv.y + iTime * 0.08));
  float a = (n - 0.5) * iIntensity + sweep * 0.02;
  return half4(iTint.rgb, iTint.a) * half(a);
}
`);

type Props = {
  width: number;
  height: number;
  intensity?: number;
  tint?: [number, number, number, number];
};

export function SkiaGrain({ width, height, intensity = 0.18, tint = [1, 1, 1, 0.7] }: Props) {
  // Disabled app-wide — the slow vertical sweep in this shader read as a
  // glitching scan-line on device. Keep the file/exports so call sites
  // continue to compile without modification.
  return null;
  // eslint-disable-next-line no-unreachable
  const t = useSharedValue(0);

  useEffect(() => {
    if (SKIP_ON_THIS_PLATFORM) return;
    t.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const uniforms = useDerivedValue(() => ({
    iResolution: [width, height],
    iTime: t.value * 12,
    iIntensity: intensity,
    iTint: tint,
  }));

  if (SKIP_ON_THIS_PLATFORM) return null;
  if (!source) return null;

  // Wrap Canvas in a View with pointerEvents="none". On Android, the Skia
  // <Canvas> does NOT reliably honor pointerEvents on itself in 2.2.x, so
  // without this wrapper the full-screen grain overlay swallows every touch.
  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { width, height }]}
    >
      <Canvas style={{ width, height }}>
        <Fill>
          <Shader source={source} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </View>
  );
}
