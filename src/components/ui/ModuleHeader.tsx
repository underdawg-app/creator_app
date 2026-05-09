import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { useThemedPalette } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { Asterisk } from '@/components/svg/Marks';
import { Tap } from './Tap';

type Props = {
  eyebrow?: string;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  left?: React.ReactNode;
  right?: React.ReactNode;
  inverse?: boolean;
};

export function ModuleHeader({
  eyebrow,
  title,
  showBack = true,
  onBack,
  left,
  right,
  inverse,
}: Props) {
  const palette = useThemedPalette();
  const fg = inverse ? palette.bone : palette.ink;
  const border = inverse ? palette.lineDark : palette.line;

  return (
    <View style={styles.row}>
      {left !== undefined ? (
        left
      ) : showBack ? (
        <Tap
          onPress={() => (onBack ? onBack() : router.back())}
          style={[styles.back, { borderColor: border }]}
          burstColor={fg}
        >
          <Ionicons name="arrow-back" size={18} color={fg} />
        </Tap>
      ) : (
        <View style={styles.back} />
      )}

      <View style={styles.center}>
        {eyebrow ? (
          <View style={styles.centerRow}>
            <Asterisk size={9} color={fg} strokeWidth={1.2} />
            <RNText
              style={[styles.eyebrow, { color: fg }]}
              maxFontSizeMultiplier={1.1}
            >
              {eyebrow}
            </RNText>
          </View>
        ) : null}
        {title ? (
          <RNText
            style={[styles.title, { color: fg }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            maxFontSizeMultiplier={1.1}
          >
            {title}
          </RNText>
        ) : null}
      </View>

      <View style={styles.rightSlot}>{right ?? <View style={styles.back} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 14,
    gap: 12,
  },
  back: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { flex: 1, alignItems: 'center' },
  centerRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  eyebrow: { ...T.label, opacity: 0.7 },
  title: {
    ...T.title3,
    marginTop: 2,
    maxWidth: 240,
  },
  rightSlot: { width: 38, height: 38, alignItems: 'flex-end', justifyContent: 'center' },
});
