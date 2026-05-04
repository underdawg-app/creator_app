import React from 'react';
import { View, Text as RNText, TextStyle } from 'react-native';

type Props = {
  text: string;
  color: string;
  fontFamily: string;
  fontSize: number;
  letterSpacing?: number;
  strokeWidth?: number;
  lineHeight?: number;
  align?: TextStyle['textAlign'];
  /** Keep the text on one line. */
  numberOfLines?: number;
  /** Shrink font size to fit container. Default true. */
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
  /** Cap width so alignment props have something to measure against. */
  maxWidth?: number | string;
};

/**
 * Hollow / outline display text — stack eight offset copies in the outline
 * color plus a transparent cutout on top. All copies share the same
 * `numberOfLines` + `adjustsFontSizeToFit` so if one auto-shrinks, they all
 * stay aligned.
 */
export function OutlineText({
  text,
  color,
  fontFamily,
  fontSize,
  letterSpacing = 0,
  strokeWidth = 1.4,
  lineHeight,
  align = 'left',
  numberOfLines,
  adjustsFontSizeToFit,
  minimumFontScale = 0.6,
  maxWidth,
}: Props) {
  const offsets: [number, number][] = [
    [-strokeWidth, 0],
    [strokeWidth, 0],
    [0, -strokeWidth],
    [0, strokeWidth],
    [-strokeWidth * 0.7, -strokeWidth * 0.7],
    [strokeWidth * 0.7, -strokeWidth * 0.7],
    [-strokeWidth * 0.7, strokeWidth * 0.7],
    [strokeWidth * 0.7, strokeWidth * 0.7],
  ];

  const textStyle: TextStyle = {
    fontFamily,
    fontSize,
    lineHeight: lineHeight ?? fontSize * 1.02,
    letterSpacing,
    textAlign: align,
  };

  const sharedTextProps = {
    numberOfLines,
    adjustsFontSizeToFit,
    minimumFontScale,
  };

  return (
    <View
      style={{
        position: 'relative',
        alignSelf:
          align === 'center'
            ? 'center'
            : align === 'right'
            ? 'flex-end'
            : 'stretch',
        maxWidth: maxWidth as any,
      }}
    >
      {offsets.map((o, i) => (
        <RNText
          key={i}
          {...sharedTextProps}
          style={[
            textStyle,
            {
              color,
              position: 'absolute',
              left: o[0],
              top: o[1],
            },
          ]}
        >
          {text}
        </RNText>
      ))}
      <RNText {...sharedTextProps} style={[textStyle, { color: 'transparent' }]}>
        {text}
      </RNText>
    </View>
  );
}
