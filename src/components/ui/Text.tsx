import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { type as typeStyles, TypeKey } from '@/theme/typography';
import { useThemedPalette } from '@/theme/ThemeContext';

type Props = TextProps & {
  variant?: TypeKey;
  color?: string;
  align?: TextStyle['textAlign'];
  children?: React.ReactNode;
};

export function Text({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...rest
}: Props) {
  const palette = useThemedPalette();
  return (
    <RNText
      {...rest}
      style={[typeStyles[variant], { color: color ?? palette.ink, textAlign: align }, style]}
    >
      {children}
    </RNText>
  );
}
