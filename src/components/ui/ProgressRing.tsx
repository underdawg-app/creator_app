import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useThemedPalette } from '@/theme/ThemeContext';

type Props = {
  /** Diameter in px. */
  size?: number;
  /** Ring thickness in px. */
  stroke?: number;
  /** 0..1 fill amount. */
  progress: number;
  /** Color of the filled arc. Defaults to the primary accent. */
  color?: string;
  /** Color of the unfilled track. Defaults to a soft surface tone. */
  track?: string;
  children?: React.ReactNode;
};

/**
 * Thin circular progress indicator. Starts at 12 o'clock and fills clockwise.
 * Center content (a score, a label) can be supplied via `children`.
 */
export function ProgressRing({
  size = 128,
  stroke = 12,
  progress,
  color,
  track,
  children,
}: Props) {
  const palette = useThemedPalette();
  const arc = color ?? palette.acid;
  const rail = track ?? palette.boneSoft;

  const clamped = Math.max(0, Math.min(1, progress));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped);
  const center = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={center} cy={center} r={radius} stroke={rail} strokeWidth={stroke} fill="none" />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={arc}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </Svg>
      {children != null ? (
        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </View>
      ) : null}
    </View>
  );
}
