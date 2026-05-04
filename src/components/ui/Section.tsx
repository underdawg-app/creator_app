import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { useThemedPalette } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { Tap } from './Tap';

type Props = {
  eyebrow?: string;
  title?: string;
  action?: { label: string; onPress: () => void };
  inverse?: boolean;
  children?: React.ReactNode;
};

export function Section({ eyebrow, title, action, inverse, children }: Props) {
  const palette = useThemedPalette();
  const fg = inverse ? palette.bone : palette.ink;
  const hair = inverse ? palette.lineDark : palette.line;

  return (
    <View style={styles.wrap}>
      <View style={[styles.head, { borderColor: hair }]}>
        <View style={{ flex: 1 }}>
          {eyebrow ? (
            <RNText style={[styles.eyebrow, { color: fg, opacity: 0.55 }]} maxFontSizeMultiplier={1.15}>
              {eyebrow}
            </RNText>
          ) : null}
          {title ? (
            <RNText
              style={[styles.title, { color: fg }]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              maxFontSizeMultiplier={1.15}
            >
              {title}
            </RNText>
          ) : null}
        </View>
        {action ? (
          <Tap onPress={action.onPress} style={styles.actionTap} burstColor={fg}>
            <RNText style={[styles.actionLabel, { color: fg }]} maxFontSizeMultiplier={1.15}>
              {action.label}
            </RNText>
          </Tap>
        ) : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 28, gap: 14 },
  head: {
    borderTopWidth: 1,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  eyebrow: { ...T.label, marginBottom: 6 },
  title: { ...T.title2 },
  actionTap: { paddingVertical: 6, paddingHorizontal: 4 },
  actionLabel: { ...T.label, opacity: 0.8 },
});
