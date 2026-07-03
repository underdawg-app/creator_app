import React from 'react';
import {
  Canvas,
  Circle,
  Group,
  BlurMask,
  RadialGradient,
  Rect,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';
import { palette } from '@/theme/colors';

type Props = {
  width: number;
  height: number;
  phase: SharedValue<number>; // 0 → 1 (master transition)
  pulse: SharedValue<number>; // 0 ↔ 1 breathing loop
};

/* --------------------------------------------------------------------------
 * Cinematic splash backplate — every motion is circular and looped. No
 * shakes, no bounces, no strobes.
 *
 * Composition:
 *   1. Soft radial halo         — large blurred glow, breathes with pulse.
 *   2. Color-loop orbits × 5    — each orbit carries multiple colored
 *                                 circles travelling around center at its
 *                                 own radius and angular velocity. Uses
 *                                 the full accent family (acid / electric /
 *                                 blush / ember + pink and red highlights).
 *   3. Core pulse               — central disc that slowly breathes.
 *   4. Ink vignette             — outer rim darken for cinematic focus.
 * ------------------------------------------------------------------------ */

const PINK = '#FF4DA6';
const RED = '#FF3554';
const GREEN = palette.acid;
const BLUE = palette.electric;
const BLUSH = palette.blush;
const EMBER = palette.ember;

type Orbit = {
  radius: number; // fraction of viewport min-dimension
  dotCount: number;
  colors: string[];
  speed: number; // radians per unit phase
  dotSize: number;
  blur: number;
  offset: number; // phase offset (0..1)
};

const ORBITS: Orbit[] = [
  {
    radius: 0.22,
    dotCount: 4,
    colors: [PINK, BLUE, GREEN, RED],
    speed: 2.0 * Math.PI,
    dotSize: 16,
    blur: 10,
    offset: 0,
  },
  {
    radius: 0.32,
    dotCount: 6,
    colors: [GREEN, BLUSH, BLUE, EMBER, PINK, RED],
    speed: -1.4 * Math.PI,
    dotSize: 20,
    blur: 14,
    offset: 0.15,
  },
  {
    radius: 0.42,
    dotCount: 5,
    colors: [RED, GREEN, BLUE, PINK, BLUSH],
    speed: 1.1 * Math.PI,
    dotSize: 26,
    blur: 18,
    offset: 0.4,
  },
  {
    radius: 0.54,
    dotCount: 8,
    colors: [PINK, EMBER, GREEN, BLUE, RED, BLUSH, GREEN, BLUE],
    speed: -0.8 * Math.PI,
    dotSize: 30,
    blur: 24,
    offset: 0.2,
  },
  {
    radius: 0.68,
    dotCount: 3,
    colors: [GREEN, PINK, BLUE],
    speed: 0.6 * Math.PI,
    dotSize: 44,
    blur: 32,
    offset: 0.6,
  },
];

function clamp(x: number, lo: number, hi: number) {
  'worklet';
  return Math.min(hi, Math.max(lo, x));
}

function easeOutCubic(t: number) {
  'worklet';
  return 1 - Math.pow(1 - t, 3);
}

export function SkiaSplashField({ width, height, phase, pulse }: Props) {
  // Disabled app-wide — animated splash backplate was reading as a glitch
  // on device. Exports kept so call sites compile unchanged.
  return null;
  // eslint-disable-next-line no-unreachable
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height);
  const maxR = Math.hypot(width, height) * 0.75;

  const haloR = useDerivedValue(() => {
    const g = clamp(phase.value / 0.35, 0, 1);
    return 40 + easeOutCubic(g) * maxR * 1.1 + pulse.value * 20;
  });

  const haloAlpha = useDerivedValue(() => {
    const p = phase.value;
    if (p < 0.02) return 0;
    if (p < 0.3) return easeOutCubic((p - 0.02) / 0.28) * 0.7;
    if (p < 0.88) return 0.55 + pulse.value * 0.2;
    return (1 - clamp((p - 0.88) / 0.12, 0, 1)) * 0.55;
  });

  const coreR = useDerivedValue(() => {
    const in1 = clamp(phase.value / 0.22, 0, 1);
    return 12 + easeOutCubic(in1) * 38 + pulse.value * 10;
  });

  const coreAlpha = useDerivedValue(() => {
    const p = phase.value;
    if (p < 0.08) return 0;
    if (p < 0.25) return easeOutCubic((p - 0.08) / 0.17) * 0.9;
    if (p < 0.9) return 0.85;
    return (1 - clamp((p - 0.9) / 0.1, 0, 1)) * 0.85;
  });

  const vignetteAlpha = useDerivedValue(() => {
    const p = phase.value;
    if (p < 0.2) return 0;
    if (p < 0.55) return easeOutCubic((p - 0.2) / 0.35) * 0.45;
    if (p < 0.9) return 0.45;
    return (1 - clamp((p - 0.9) / 0.1, 0, 1)) * 0.45;
  });

  return (
    <Canvas style={{ width, height }} pointerEvents="none">
      {/* Radial halo — large soft glow behind everything */}
      <Group opacity={haloAlpha}>
        <Circle cx={cx} cy={cy} r={haloR}>
          <RadialGradient
            c={vec(cx, cy)}
            r={maxR}
            colors={[
              GREEN + 'ff',
              BLUE + '99',
              PINK + '55',
              palette.ink + '00',
            ]}
            positions={[0, 0.45, 0.75, 1]}
          />
          <BlurMask blur={40} style="normal" />
        </Circle>
      </Group>

      {/* Color-loop orbits */}
      {ORBITS.map((orbit, i) => (
        <OrbitGroup
          key={i}
          orbit={orbit}
          cx={cx}
          cy={cy}
          base={base}
          phase={phase}
          pulse={pulse}
          index={i}
        />
      ))}

      {/* Center core — pulsing ink disc anchors the wordmark */}
      <Group opacity={coreAlpha}>
        <Circle cx={cx} cy={cy} r={coreR} color={palette.ink}>
          <BlurMask blur={16} style="normal" />
        </Circle>
      </Group>

      {/* Ink vignette — radial gradient darkening toward edges */}
      <Group opacity={vignetteAlpha}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={vec(cx, cy)}
            r={Math.hypot(width, height) * 0.65}
            colors={['transparent', 'transparent', palette.ink]}
            positions={[0, 0.55, 1]}
          />
        </Rect>
      </Group>
    </Canvas>
  );
}

function OrbitGroup({
  orbit,
  cx,
  cy,
  base,
  phase,
  pulse,
  index,
}: {
  orbit: Orbit;
  cx: number;
  cy: number;
  base: number;
  phase: SharedValue<number>;
  pulse: SharedValue<number>;
  index: number;
}) {
  // Group-level fade. Each orbit eases in on a stagger, holds, then eases
  // out toward the tail — no strobing, all smooth.
  const opacity = useDerivedValue(() => {
    const start = 0.04 + index * 0.05;
    const fadeIn = clamp((phase.value - start) / 0.22, 0, 1);
    const fadeOut = clamp((phase.value - 0.85) / 0.15, 0, 1);
    return easeOutCubic(fadeIn) * (1 - fadeOut) * 0.92;
  });

  return (
    <Group opacity={opacity}>
      {Array.from({ length: orbit.dotCount }).map((_, i) => (
        <OrbitDot
          key={i}
          orbit={orbit}
          dotIndex={i}
          cx={cx}
          cy={cy}
          base={base}
          phase={phase}
          pulse={pulse}
        />
      ))}
    </Group>
  );
}

function OrbitDot({
  orbit,
  dotIndex,
  cx,
  cy,
  base,
  phase,
  pulse,
}: {
  orbit: Orbit;
  dotIndex: number;
  cx: number;
  cy: number;
  base: number;
  phase: SharedValue<number>;
  pulse: SharedValue<number>;
}) {
  const baseAngle = (dotIndex / orbit.dotCount) * Math.PI * 2;

  const x = useDerivedValue(() => {
    const theta =
      baseAngle +
      (phase.value + orbit.offset) * orbit.speed;
    const radius = orbit.radius * base * (1 + pulse.value * 0.04);
    return cx + Math.cos(theta) * radius;
  });

  const y = useDerivedValue(() => {
    const theta =
      baseAngle +
      (phase.value + orbit.offset) * orbit.speed;
    const radius = orbit.radius * base * (1 + pulse.value * 0.04);
    return cy + Math.sin(theta) * radius;
  });

  const r = useDerivedValue(() => {
    // Dot sizes breathe softly with the pulse loop.
    return orbit.dotSize * (0.86 + pulse.value * 0.18);
  });

  const color = orbit.colors[dotIndex % orbit.colors.length];

  return (
    <Circle cx={x} cy={y} r={r} color={color}>
      <BlurMask blur={orbit.blur} style="normal" />
    </Circle>
  );
}
