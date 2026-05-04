import React from 'react';
import Svg, { G, Path, Circle, Text as SvgText, TSpan } from 'react-native-svg';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
type Props = {
  size?: number;
  color?: string;
  accent?: string;
  style?: any;
};

/**
 * Circular signet mark: a paw-print silhouette inside a ring, with the
 * wordmark curving along the outer edge. Feels like a record-label stamp.
 * Everything is vector — scale freely without pixel loss.
 */
export function BrandSignet({
  size = 120,
  color,
  accent = staticPalette.acid,
  style,
}: Props) {
  const palette = useThemedPalette();
  const resolvedColor = color ?? palette.bone;
  const s = size;
  const r = s / 2;

  return (
    <Svg width={s} height={s} viewBox="0 0 120 120" style={style}>
      {/* outer ring */}
      <Circle
        cx="60"
        cy="60"
        r="58"
        fill="none"
        stroke={resolvedColor}
        strokeWidth="1.5"
      />
      {/* inner disc */}
      <Circle cx="60" cy="60" r="34" fill={accent} />

      {/* paw pad — center */}
      <G>
        <Path
          d="M60 52
             C52 52 46 58 46 68
             C46 76 52 82 60 82
             C68 82 74 76 74 68
             C74 58 68 52 60 52Z"
          fill={resolvedColor}
        />
        {/* toes (4 small pads above) */}
        <Circle cx="48" cy="48" r="4.8" fill={resolvedColor} />
        <Circle cx="57" cy="44" r="4.8" fill={resolvedColor} />
        <Circle cx="63" cy="44" r="4.8" fill={resolvedColor} />
        <Circle cx="72" cy="48" r="4.8" fill={resolvedColor} />
      </G>

      {/* registration marks at four cardinal points */}
      <Circle cx="60" cy="4" r="1.8" fill={resolvedColor} />
      <Circle cx="60" cy="116" r="1.8" fill={resolvedColor} />
      <Circle cx="4" cy="60" r="1.8" fill={resolvedColor} />
      <Circle cx="116" cy="60" r="1.8" fill={resolvedColor} />
    </Svg>
  );
}

/**
 * Horizontal wordmark lockup: "UNDER" in solid + "dawgs" in italic with a
 * small paw dot. Used in splash, headers, and profile share cards.
 */
export function Wordmark({
  size = 160,
  color,
  accent = staticPalette.acid,
  style,
}: {
  size?: number;
  color?: string;
  accent?: string;
  style?: any;
}) {
  const palette = useThemedPalette();
  const resolvedColor = color ?? palette.bone;
  const w = size;
  const h = size * 0.32;

  return (
    <Svg width={w} height={h} viewBox="0 0 500 160" style={style}>
      <SvgText
        x="0"
        y="120"
        fontFamily="Archivo_900Black"
        fontSize="132"
        fontWeight="900"
        fill={resolvedColor}

        letterSpacing="-7"
      >
        UNDER
      </SvgText>
      <Circle cx="370" cy="140" r="10" fill={accent} />
      <SvgText
        x="0"
        y="158"
        fontFamily="InstrumentSerif_400Regular_Italic"
        fontSize="56"
        fontStyle="italic"
        fill={accent}
        letterSpacing="-1.2"
      >
        <TSpan>dawgs</TSpan>
      </SvgText>
    </Svg>
  );
}
