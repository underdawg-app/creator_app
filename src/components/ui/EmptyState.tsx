import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { Image } from '@/components/ui/Image';
import { useThemedPalette } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { MagneticButton } from './MagneticButton';

type Props = {
  icon?: any;
  eyebrow?: string;
  title: string;
  body?: string;
  action?: { label: string; onPress: () => void };
  inverse?: boolean;
};

export function EmptyState({ icon, eyebrow, title, body, action, inverse }: Props) {
  const palette = useThemedPalette();
  const fg = inverse ? palette.bone : palette.ink;

  return (
    <View style={styles.wrap}>
      {icon ? (
        <Image source={icon} style={styles.icon} contentFit="contain" />
      ) : null}
      {eyebrow ? (
        <RNText style={[styles.eyebrow, { color: fg, opacity: 0.55 }]} maxFontSizeMultiplier={1.15}>
          {eyebrow}
        </RNText>
      ) : null}
      <RNText
        style={[styles.title, { color: fg }]}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        maxFontSizeMultiplier={1.15}
      >
        {title}
      </RNText>
      {body ? (
        <RNText style={[styles.body, { color: fg, opacity: 0.7 }]} maxFontSizeMultiplier={1.2}>
          {body}
        </RNText>
      ) : null}
      {action ? (
        <View style={{ marginTop: 8 }}>
          <MagneticButton
            label={action.label}
            background={inverse ? palette.bone : palette.ink}
            foreground={inverse ? palette.ink : palette.bone}
            onPress={action.onPress}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 10, paddingVertical: 40, paddingHorizontal: 8 },
  icon: { width: 140, height: 140, marginBottom: 6 },
  eyebrow: { ...T.label },
  title: { ...T.title1, textAlign: 'center', maxWidth: 320 },
  body: { ...T.body, textAlign: 'center', maxWidth: 320 },
});
