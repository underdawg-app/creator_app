import React, { useMemo } from 'react';
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useClock,
} from '@shopify/react-native-skia';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';

/* --------------------------------------------------------------------------
 * SkiaFluidField
 *
 * A GPU-rendered fluid-metaball transition backplate. All visual work
 * happens inside a single fragment shader written in SkSL (Skia Shading
 * Language — essentially GLSL for Skia), so the motion stays silky at
 * 60fps regardless of how many blended color regions are on screen.
 *
 * The shader composites, per pixel:
 *   1. Eight colored "orbs" orbiting around the center at individually
 *      tuned radii, angular velocities, and size-breathes. Their fields
 *      are combined into a metaball mask so they merge like plasma,
 *      blending color weighted by each orb's influence.
 *   2. A deep-ink background with a subtle purple radial haze.
 *   3. An outer bloom that carries the dominant metaball color outward.
 *   4. A near-center halo that pulses with the breathing SharedValue so
 *      the wordmark sitting on top feels backlit.
 *   5. A radial vignette that focuses attention toward center.
 *   6. A master phase-gated fade so the whole composition eases in and
 *      out of the transition without any hard cut.
 *   7. A gentle Reinhard-style tonemap so highlights don't clip when
 *      multiple high-intensity orbs overlap.
 *
 * Uniforms driven per-frame from the JS side:
 *   iResolution  - viewport size in pixels.
 *   iTime        - seconds since mount; drives orbital motion.
 *   iPhase       - master transition progress (0..1).
 *   iPulse       - 0..1 breathing loop; modulates orb size + halo.
 * ------------------------------------------------------------------------ */

const FLUID_SKSL = `
uniform float2 iResolution;
uniform float iTime;
uniform float iPhase;
uniform float iPulse;

// Brand palette stretched with web/pop accents so the fluid reads across
// the full color wheel: pink, electric blue, acid green, ember orange,
// violet, red, teal, gold.
float3 orbColor(int i) {
  if (i == 0) { return float3(1.00, 0.42, 0.71); }  // pink
  if (i == 1) { return float3(0.18, 0.36, 1.00); }  // electric blue
  if (i == 2) { return float3(0.85, 1.00, 0.24); }  // acid green
  if (i == 3) { return float3(1.00, 0.35, 0.12); }  // ember
  if (i == 4) { return float3(0.85, 0.40, 1.00); }  // violet
  if (i == 5) { return float3(1.00, 0.22, 0.33); }  // red
  if (i == 6) { return float3(0.30, 1.00, 0.85); }  // teal
  return float3(1.00, 0.85, 0.30);                  // gold
}

half4 main(float2 fragCoord) {
  // Normalize coordinates to a square-ish domain centered on zero so
  // orbits look circular on any aspect ratio.
  float minDim = min(iResolution.x, iResolution.y);
  float2 p = (fragCoord - 0.5 * iResolution) / minDim;

  float t = iTime * 0.35;

  float field = 0.0;
  float3 colorSum = float3(0.0);

  // Unrolled-ish loop — SkSL handles constant bounds fine. Each orb is a
  // metaball whose influence falls off with inverse square distance; their
  // colors are mixed by influence weight for smooth gradient transitions
  // where orbs overlap (the "plasma" effect).
  for (int i = 0; i < 8; i++) {
    float fi = float(i);

    // Orbit parameters — distinct per orb so the motion never aligns.
    float angle = t * (0.35 + fi * 0.065) + fi * 0.785;
    float radA = 0.22 + 0.08 * sin(t * 0.6 + fi * 1.3);
    float radB = 0.26 + 0.10 * cos(t * 0.4 + fi * 0.9);

    float2 orb = float2(
      cos(angle) * radA,
      sin(angle * 1.3 + fi) * radB
    );

    // Tiny jitter to keep the motion organic; modulated by time so it
    // looks like the orbs are floating in a real liquid.
    orb += 0.03 * float2(
      sin(t * 2.0 + fi * 3.0),
      cos(t * 1.7 + fi * 2.3)
    );

    // Breathe the orb radius with the pulse shared value.
    float r = 0.12 + 0.035 * sin(t * 0.8 + fi) + iPulse * 0.03;

    float d = length(p - orb);
    float influence = (r * r) / (d * d + 0.0012);

    float3 c = orbColor(i);
    field += influence;
    colorSum += c * influence;
  }

  float3 metaColor = colorSum / max(field, 0.0001);

  // Soft metaball threshold — smoothstep over the summed field produces
  // the classic "liquid" edge where the orbs merge.
  float mask = smoothstep(1.0, 4.2, field);

  // Background with a radial purple haze pulled toward center.
  float dist = length(p);
  float3 deep = float3(0.02, 0.02, 0.035);
  float3 warm = float3(0.07, 0.035, 0.12);
  float3 bg = mix(deep, warm, 1.0 - smoothstep(0.0, 1.1, dist));

  float3 col = mix(bg, metaColor, mask);

  // Outer bloom — carries the meta color past the hard mask so the
  // silhouette has a painted glow around it.
  col += metaColor * smoothstep(1.3, 0.0, dist) * 0.14 * iPhase;

  // Center halo behind the wordmark, breathing with the pulse.
  float halo = smoothstep(0.34, 0.0, dist);
  col += float3(1.00, 0.95, 1.20) * halo * (0.22 + iPulse * 0.15) * iPhase;

  // Radial vignette.
  float vig = 1.0 - smoothstep(0.4, 1.4, dist);
  col *= 0.42 + vig * 0.58;

  // Master phase fade — smooth ease at both ends of the transition.
  float fadeIn = smoothstep(0.0, 0.15, iPhase);
  float fadeOut = 1.0 - smoothstep(0.9, 1.0, iPhase);
  col *= fadeIn * fadeOut;

  // Soft Reinhard tonemap + gentle gamma so bright overlaps don't blow out.
  col = col / (col + float3(1.0)) * 1.85;
  col = pow(col, float3(0.92));

  return half4(col, 1.0);
}
`;

const fluidEffect = Skia.RuntimeEffect.Make(FLUID_SKSL);

if (!fluidEffect) {
  // Shader compile failed — log once, render a black canvas at runtime.
  // Keeps the rest of the app safe if the SkSL source ever regresses.
  // eslint-disable-next-line no-console
  console.warn('[SkiaFluidField] shader compile failed');
}

type Props = {
  width: number;
  height: number;
  phase: SharedValue<number>; // 0 → 1 master transition progress
  pulse: SharedValue<number>; // 0 ↔ 1 breathing loop
};

export function SkiaFluidField({ width, height, phase, pulse }: Props) {
  // Disabled app-wide — animated fluid backplate was reading as a glitch
  // on device. Exports kept so call sites compile unchanged.
  return null;
  // eslint-disable-next-line no-unreachable
  const clock = useClock();

  // Recompute resolution when the viewport changes.
  const resolution = useMemo(() => [width, height] as const, [width, height]);

  const uniforms = useDerivedValue(() => ({
    iResolution: resolution,
    iTime: clock.value * 0.001,
    iPhase: phase.value,
    iPulse: pulse.value,
  }));

  if (!fluidEffect) {
    return <Canvas style={{ width, height }} pointerEvents="none" />;
  }

  return (
    <Canvas style={{ width, height }} pointerEvents="none">
      <Fill>
        <Shader source={fluidEffect} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}
