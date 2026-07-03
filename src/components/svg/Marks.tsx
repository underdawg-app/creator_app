import React from 'react';
import Svg, { Path, Circle, Line, Polyline, G, Rect } from 'react-native-svg';

type MarkProps = {
  size?: number;
  color: string;
  strokeWidth?: number;
  style?: any;
};

/** Six-point asterisk — used as a rotating decorative anchor. */
export function Asterisk({ size = 24, color, strokeWidth = 2, style }: MarkProps) {
  const c = size / 2;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <G stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <Line x1={c} y1="2" x2={c} y2="22" />
        <Line x1="2" y1={c} x2="22" y2={c} />
        <Line x1="5" y1="5" x2="19" y2="19" />
        <Line x1="19" y1="5" x2="5" y2="19" />
      </G>
    </Svg>
  );
}

/** Registration mark — crosshair inside a circle, like a print target. */
export function RegistrationMark({ size = 22, color, strokeWidth = 1.4, style }: MarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" style={style}>
      <Circle cx="11" cy="11" r="9" fill="none" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="11" cy="11" r="2" fill={color} />
      <Line x1="11" y1="1" x2="11" y2="6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="11" y1="16" x2="11" y2="21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="1" y1="11" x2="6" y2="11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="16" y1="11" x2="21" y2="11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

/** Geometric arrow — for CTAs. */
export function ArrowMark({ size = 18, color, strokeWidth = 1.8, style }: MarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" style={style}>
      <Line x1="2" y1="9" x2="16" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Polyline
        points="10,3 16,9 10,15"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Diamond lozenge — editorial bullet between marquee items. */
export function Lozenge({ size = 10, color, style }: MarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" style={style}>
      <Path d="M5 0 L10 5 L5 10 L0 5 Z" fill={color} />
    </Svg>
  );
}

/** Two vertical pilcrow strokes — conversational marker. */
export function PilcrowMark({ size = 18, color, strokeWidth = 1.6, style }: MarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" style={style}>
      <Path
        d="M6 3 H14 M10 3 V15 M6 3 a3 3 0 0 0 0 6 H10"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Step dots — 5-point pagination, the active one filled. */
export function StepDots({
  total,
  active,
  size = 8,
  activeColor,
  inactiveColor,
  gap = 6,
  activeWidth = 28,
}: {
  total: number;
  active: number;
  size?: number;
  activeColor: string;
  inactiveColor: string;
  gap?: number;
  activeWidth?: number;
}) {
  const totalW = Array.from({ length: total }).reduce<number>((acc, _, i) => {
    return acc + (i === active ? activeWidth : size) + (i < total - 1 ? gap : 0);
  }, 0);
  return (
    <Svg width={totalW} height={size} viewBox={`0 0 ${totalW} ${size}`}>
      {(() => {
        let x = 0;
        const out: React.ReactElement[] = [];
        for (let i = 0; i < total; i++) {
          const w = i === active ? activeWidth : size;
          out.push(
            <Rect
              key={i}
              x={x}
              y={0}
              width={w}
              height={size}
              rx={size / 2}
              ry={size / 2}
              fill={i === active ? activeColor : 'none'}
              stroke={inactiveColor}
              strokeWidth={1}
            />
          );
          x += w + gap;
        }
        return out;
      })()}
    </Svg>
  );
}

/** Corner brackets — used around hero copy to frame it like a print block. */
export function CornerBracket({
  width = 34,
  height = 34,
  color,
  strokeWidth = 1.5,
  corner = 'tl',
  style,
}: {
  width?: number;
  height?: number;
  color: string;
  strokeWidth?: number;
  corner?: 'tl' | 'tr' | 'bl' | 'br';
  style?: any;
}) {
  const len = Math.min(width, height) * 0.8;
  const transforms: Record<string, string> = {
    tl: '',
    tr: `rotate(90, ${width / 2}, ${height / 2})`,
    bl: `rotate(-90, ${width / 2}, ${height / 2})`,
    br: `rotate(180, ${width / 2}, ${height / 2})`,
  };
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style}>
      <G transform={transforms[corner]}>
        <Line x1="1" y1="1" x2={len + 1} y2="1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        <Line x1="1" y1="1" x2="1" y2={len + 1} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </G>
    </Svg>
  );
}

/** Horizontal rule with center dot — editorial divider. */
export function RuleDot({
  width = 200,
  color,
  strokeWidth = 1,
  dotColor,
}: {
  width?: number;
  color: string;
  strokeWidth?: number;
  dotColor?: string;
}) {
  const h = 10;
  return (
    <Svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      <Line x1="0" y1={h / 2} x2={width / 2 - 6} y2={h / 2} stroke={color} strokeWidth={strokeWidth} />
      <Line x1={width / 2 + 6} y1={h / 2} x2={width} y2={h / 2} stroke={color} strokeWidth={strokeWidth} />
      <Circle cx={width / 2} cy={h / 2} r="3" fill={dotColor ?? color} />
    </Svg>
  );
}
