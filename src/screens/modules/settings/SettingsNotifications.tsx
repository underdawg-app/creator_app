import React from 'react';
import { View, StyleSheet, Text as RNText, Switch } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { useStore } from '@/store';

export default function NotificationsSettings() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const n = useStore((s) => s.settings.notifications);
  const update = useStore((s) => s.updateSetting);

  const categories: { key: keyof typeof n; label: string }[] = [
    { key: 'engagement', label: 'ENGAGEMENT (LIKES, COMMENTS, SHARES, FOLLOWS)' },
    { key: 'messages', label: 'MESSAGES & COLLAB REQUESTS' },
    { key: 'deals', label: 'DEALS, APPLICATIONS, PAYMENTS' },
    { key: 'orders', label: 'ORDERS & COMMERCE' },
    { key: 'community', label: 'COMMUNITY, GROUPS, MENTIONS' },
    { key: 'platform', label: 'PLATFORM UPDATES & TIPS' },
  ];

  const delivery: { key: keyof typeof n; label: string }[] = [
    { key: 'pushEnabled', label: 'PUSH' },
    { key: 'emailEnabled', label: 'EMAIL' },
    { key: 'smsEnabled', label: 'SMS' },
  ];

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="SETTINGS" title="NOTIFICATIONS" />}>
      <Section eyebrow="WHAT TO RECEIVE">
        {categories.map((c) => (
          <View key={c.key} style={styles.row}>
            <RNText
              style={styles.key}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              maxFontSizeMultiplier={1.15}
            >
              {c.label}
            </RNText>
            <Switch
              value={n[c.key] as boolean}
              onValueChange={(v) => update('notifications', { [c.key]: v } as any)}
              trackColor={{ false: palette.line, true: palette.acid }}
              thumbColor={palette.ink}
            />
          </View>
        ))}
      </Section>

      <Section eyebrow="HOW TO RECEIVE">
        {delivery.map((c) => (
          <View key={c.key} style={styles.row}>
            <RNText style={styles.key} maxFontSizeMultiplier={1.15}>
              {c.label}
            </RNText>
            <Switch
              value={n[c.key] as boolean}
              onValueChange={(v) => update('notifications', { [c.key]: v } as any)}
              trackColor={{ false: palette.line, true: palette.electric }}
              thumbColor={palette.ink}
            />
          </View>
        ))}
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 14,
  },
  key: {
    flex: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.8,
    color: palette.ink,
    textTransform: 'uppercase',
  },
});
