import React from 'react';
import Svg, { Circle, G, Line, Path, Polyline, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color: string;
  strokeWidth?: number;
  style?: any;
};

/** Visual artist — brush + square. */
export function VisualArtistIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="3" width="14" height="14" rx="1" />
        <Path d="M18 14 L24 20" />
        <Path d="M20 22 L24 26 L26 24 L22 20 Z" fill={color} />
      </G>
    </Svg>
  );
}

/** Musician — simple quaver with ink-drop pad. */
export function MusicianIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 4 V20" />
        <Path d="M12 4 C18 5 20 9 18 12" />
        <Circle cx="9" cy="21" r="4" fill={color} />
      </G>
    </Svg>
  );
}

/** Video creator — clapperboard. */
export function VideoIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="9" width="22" height="16" rx="1" />
        <Path d="M3 9 L8 4 L12 8 L16 4 L20 8 L24 4 L27 9" />
      </G>
    </Svg>
  );
}

/** Writer — quill. */
export function WriterIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M4 24 L22 6 C24 4 24 2 24 2 C24 2 22 2 20 4 L2 22 Z" />
        <Line x1="14" y1="10" x2="20" y2="16" />
        <Line x1="2" y1="26" x2="8" y2="26" />
      </G>
    </Svg>
  );
}

/** Performer — spotlight cone. */
export function PerformerIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="14" cy="6" r="3" />
        <Path d="M14 9 L4 26 L24 26 Z" />
        <Line x1="8" y1="18" x2="20" y2="18" />
      </G>
    </Svg>
  );
}

/** Educator — open book. */
export function EducatorIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M2 6 L14 9 L26 6 V22 L14 25 L2 22 Z" />
        <Line x1="14" y1="9" x2="14" y2="25" />
      </G>
    </Svg>
  );
}

/** Podcaster — mic on stand. */
export function PodcasterIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Rect x="11" y="3" width="6" height="14" rx="3" />
        <Path d="M7 14 C7 18 10 20 14 20 C18 20 21 18 21 14" />
        <Line x1="14" y1="20" x2="14" y2="26" />
        <Line x1="10" y1="26" x2="18" y2="26" />
      </G>
    </Svg>
  );
}

/** Streamer — play inside pixel square. */
export function StreamerIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="4" width="22" height="16" />
        <Path d="M12 10 L17 13 L12 16 Z" fill={color} />
        <Line x1="9" y1="24" x2="19" y2="24" />
      </G>
    </Svg>
  );
}

/** Fashion — simple hanger. */
export function FashionIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="14" cy="6" r="2.5" />
        <Path d="M14 8 V10 L2 22 H26 L14 10" />
      </G>
    </Svg>
  );
}

/** Multi-hyphenate — grid. */
export function MultiIcon({ size = 28, color, strokeWidth = 1.6, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" style={style}>
      <G fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="3" width="8" height="8" />
        <Rect x="17" y="3" width="8" height="8" />
        <Rect x="3" y="17" width="8" height="8" />
        <Rect x="17" y="17" width="8" height="8" />
      </G>
    </Svg>
  );
}

export const typeIconMap = {
  visual: VisualArtistIcon,
  musician: MusicianIcon,
  video: VideoIcon,
  writer: WriterIcon,
  performer: PerformerIcon,
  educator: EducatorIcon,
  podcaster: PodcasterIcon,
  streamer: StreamerIcon,
  fashion: FashionIcon,
  multi: MultiIcon,
} as const;
