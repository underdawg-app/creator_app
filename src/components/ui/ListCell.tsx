import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { Tap } from './Tap';

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  accent?: string;
  onPress?: () => void;
  inverse?: boolean;
  disabled?: boolean;
};

export function ListCell({ icon, title, subtitle, right, accent = staticPalette.acid, onPress, inverse, disabled }: Props) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const fg = inverse ? palette.bone : palette.ink;
  const border = inverse ? palette.lineDark : palette.line;

  return (
    <Tap onPress={onPress ?? (() => {})} burstColor={accent} disabled={disabled}>
      <View style={[styles.cell, { borderColor: border }]}>
        {icon ? (
          <View style={[styles.iconWrap, { borderColor: border }]}>
            <Ionicons name={icon} size={16} color={fg} />
          </View>
        ) : null}
        <View style={{ flex: 1 }}>
          <RNText
            style={[styles.title, { color: fg }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
            maxFontSizeMultiplier={1.15}
          >
            {title}
          </RNText>
          {subtitle ? (
            <RNText
              style={[styles.subtitle, { color: fg, opacity: 0.6 }]}
              numberOfLines={2}
              maxFontSizeMultiplier={1.15}
            >
              {subtitle}
            </RNText>
          ) : null}
        </View>
        {right ?? <Ionicons name="chevron-forward" size={16} color={fg} style={{ opacity: 0.5 }} />}
      </View>
    </Tap>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...T.title3 },
  subtitle: { ...T.small, marginTop: 2 },
});
