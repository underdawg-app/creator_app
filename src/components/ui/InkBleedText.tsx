import React, { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import {
  Canvas,
  Group,
  Paint,
  Text as SkText,
  Blur,
  useFont,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

/**
 * Real ink-bleed → sharp text effect.
 *
 * Implementation uses Skia: the text is drawn into an offscreen layer, then a
 * Gaussian blur is applied to that whole layer. As the blur animates from a
 * heavy value down to 0, the letter SHAPES themselves dissolve from soft
 * blots into crisp glyphs — that's the actual "wet ink soaking and drying"
 * look, not a shadow halo around a still-crisp letter.
 *
 * Skia needs to know its canvas size up front, so the component takes the
 * `fontSize`, `lineHeight`, `width` and computes the canvas height from the
 * line count plus enough margin to hold the bleed without clipping.
 */
type Props = {
  text: string;
  fontSize: number;
  lineHeight?: number;
  letterSpacing?: number;
  color: string;
  /** Skia canvas width — usually the screen width minus horizontal page padding. */
  width: number;
  /** Re-runs the dissolve animation when this changes. */
  trigger?: unknown;
  /** Initial blur radius. 14–22 reads as heavy ink bleed. */
  startBleed?: number;
  delay?: number;
  duration?: number;
};

const FONT_SRC = require('../../../assets/fonts/CabinetGrotesk-Black.ttf');

export function InkBleedText({
  text,
  fontSize,
  lineHeight,
  color,
  width,
  trigger,
  startBleed = 18,
  delay = 0,
  duration = 2400,
}: Props) {
  const font = useFont(FONT_SRC, fontSize);

  // Drive the layer-blur radius directly with a Skia-friendly shared value.
  const blur = useSharedValue(startBleed);

  useEffect(() => {
    blur.value = startBleed;
    blur.value = withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  const lh = lineHeight ?? fontSize;
  const lines = useMemo(() => text.split('\n'), [text]);

  // Headroom so the blur isn't clipped by the canvas edges (the offscreen
  // layer needs `startBleed`px of bleed-out on every side).
  const padX = startBleed;
  const padTop = startBleed + Math.round(fontSize * 0.15);
  const padBottom = startBleed + 4;
  const canvasHeight = padTop + lh * lines.length + padBottom;
  const canvasWidth = width + padX * 2;

  if (!font) {
    // Font not loaded yet — render nothing until ready. The pages render
    // quickly enough that this only flashes for a frame on first mount.
    return null;
  }

  return (
    <Canvas
      style={{
        width: canvasWidth,
        height: canvasHeight,
        marginLeft: -padX,
        marginRight: -padX,
        // On Android, Skia canvases need to opt out of overflow:hidden parent
        // clipping so the bleed visible outside the canvas bounds (within the
        // padX headroom) isn't trimmed.
        ...(Platform.OS === 'android' ? { overflow: 'visible' as const } : null),
      }}
    >
      <Group
        layer={
          <Paint>
            <Blur blur={blur} mode="clamp" />
          </Paint>
        }
      >
        {lines.map((line, i) => (
          <SkText
            key={`${i}-${line}`}
            x={padX}
            // Skia text y is the BASELINE — add ~0.82 * fontSize to put the
            // top of capital letters at the line's top.
            y={padTop + lh * i + fontSize * 0.82}
            text={line}
            font={font}
            color={color}
          />
        ))}
      </Group>
    </Canvas>
  );
}
