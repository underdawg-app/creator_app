import React from 'react';
import Svg, {
  Circle,
  G,
  Line,
  Path,
  Rect,
} from 'react-native-svg';

type Props = {
  size: number;
  color: string;
  /** Stroke / line color. Defaults to the same as `color`. */
  ink?: string;
  variant?: 'lens' | 'frame' | 'grid' | 'wave';
  style?: any;
};

/**
 * Editorial media-thumb — a clean abstract SVG used in place of photography
 * inside cards (art piece, portfolio item, hero artwork). Composed from the
 * same vocabulary as the other marks in this app (registration, asterisk,
 * hairlines), so it reads as intentional brand language rather than a
 * decorative blob.
 *
 * Variants pick the composition that best suits the surface:
 *   - `lens`  — concentric rings + crosshair (great for photo / art)
 *   - `frame` — outer rule + center stack (great for portfolio cards)
 *   - `grid`  — half-tone dot grid (great for prints / posters)
 *   - `wave`  — repeating sine waves (great for music / sound)
 */
export function MediaThumb({
  size,
  color,
  ink,
  variant = 'lens',
  style,
}: Props) {
  const stroke = ink ?? color;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      {variant === 'lens' ? <LensComposition stroke={stroke} fill={color} /> : null}
      {variant === 'frame' ? <FrameComposition stroke={stroke} fill={color} /> : null}
      {variant === 'grid' ? <GridComposition stroke={stroke} fill={color} /> : null}
      {variant === 'wave' ? <WaveComposition stroke={stroke} fill={color} /> : null}
    </Svg>
  );
}

function LensComposition({ stroke, fill }: { stroke: string; fill: string }) {
  return (
    <G>
      <Circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="0.8" opacity={0.45} />
      <Circle cx="50" cy="50" r="34" fill="none" stroke={stroke} strokeWidth="1" />
      <Circle cx="50" cy="50" r="22" fill="none" stroke={stroke} strokeWidth="1" />
      <Circle cx="50" cy="50" r="10" fill={fill} />
      <Circle cx="50" cy="50" r="3" fill={stroke} />
      <Line x1="50" y1="2" x2="50" y2="14" stroke={stroke} strokeWidth="0.8" />
      <Line x1="50" y1="86" x2="50" y2="98" stroke={stroke} strokeWidth="0.8" />
      <Line x1="2" y1="50" x2="14" y2="50" stroke={stroke} strokeWidth="0.8" />
      <Line x1="86" y1="50" x2="98" y2="50" stroke={stroke} strokeWidth="0.8" />
    </G>
  );
}

function FrameComposition({ stroke, fill }: { stroke: string; fill: string }) {
  return (
    <G>
      <Rect x="6" y="6" width="88" height="88" rx="6" fill="none" stroke={stroke} strokeWidth="1" />
      <Rect x="22" y="22" width="56" height="56" rx="3" fill={fill} opacity={0.85} />
      <Line x1="22" y1="50" x2="78" y2="50" stroke={stroke} strokeWidth="0.8" opacity={0.55} />
      <Line x1="50" y1="22" x2="50" y2="78" stroke={stroke} strokeWidth="0.8" opacity={0.55} />
      <Path
        d="M50 38 L50 62 M38 50 L62 50 M42 42 L58 58 M58 42 L42 58"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </G>
  );
}

function GridComposition({ stroke, fill }: { stroke: string; fill: string }) {
  const dots: React.ReactElement[] = [];
  const cols = 7;
  const rows = 7;
  const margin = 14;
  const span = 100 - margin * 2;
  const step = span / (cols - 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = margin + c * step;
      const cy = margin + r * step;
      const dx = cx - 50;
      const dy = cy - 50;
      const d = Math.sqrt(dx * dx + dy * dy);
      const radius = Math.max(0.6, 4 - d / 14);
      dots.push(
        <Circle key={`${r}-${c}`} cx={cx} cy={cy} r={radius} fill={stroke} />
      );
    }
  }
  return (
    <G>
      <Rect x="4" y="4" width="92" height="92" rx="8" fill={fill} opacity={0.18} />
      {dots}
    </G>
  );
}

function WaveComposition({ stroke, fill }: { stroke: string; fill: string }) {
  const lines: React.ReactElement[] = [];
  const count = 7;
  for (let i = 0; i < count; i++) {
    const y = 22 + i * 9;
    const amp = 4 + (i % 2 === 0 ? 1.5 : 0);
    const path = buildSine(y, amp);
    lines.push(
      <Path
        key={i}
        d={path}
        stroke={stroke}
        strokeWidth={i === 3 ? 1.4 : 0.8}
        fill="none"
        opacity={i === 3 ? 1 : 0.55}
      />
    );
  }
  return (
    <G>
      <Rect x="4" y="4" width="92" height="92" rx="8" fill={fill} opacity={0.16} />
      {lines}
      <Circle cx="50" cy="50" r="3" fill={stroke} />
    </G>
  );
}

function buildSine(centerY: number, amplitude: number): string {
  const points: string[] = [];
  const samples = 24;
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * 88 + 6;
    const t = (i / samples) * Math.PI * 2;
    const y = centerY + Math.sin(t) * amplitude;
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(' ');
}
