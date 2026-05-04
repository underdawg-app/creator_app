import React from 'react';
import { View, StyleSheet, Text as RNText, Switch } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { useStore } from '@/store';

export default function Privacy() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const privacy = useStore((s) => s.settings.privacy);
  const update = useStore((s) => s.updateSetting);
  const toast = useStore((s) => s.toast);

  const rows: { key: keyof typeof privacy; label: string; desc: string }[] = [
    { key: 'profilePublic', label: 'PUBLIC PROFILE', desc: 'Allow anyone to view your profile.' },
    { key: 'activityStatus', label: 'ACTIVITY STATUS', desc: 'Show when you are online.' },
    { key: 'readReceipts', label: 'READ RECEIPTS', desc: 'Show when you have read a message.' },
    { key: 'showInSearch', label: 'SHOW IN SEARCH', desc: 'Appear when someone searches your handle.' },
    { key: 'hideFollowerCount', label: 'HIDE FOLLOWER COUNT', desc: 'Hide number from others.' },
  ];

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="SETTINGS" title="PRIVACY" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        You own the visibility dial. Move it as loud or quiet as you need.
      </RNText>

      <View style={{ marginTop: 18 }}>
        {rows.map((r) => (
          <View key={r.key} style={styles.row}>
            <View style={{ flex: 1 }}>
              <RNText style={styles.key} maxFontSizeMultiplier={1.15}>
                {r.label}
              </RNText>
              <RNText style={styles.desc} maxFontSizeMultiplier={1.2}>
                {r.desc}
              </RNText>
            </View>
            <Switch
              value={privacy[r.key] as boolean}
              onValueChange={(v) => {
                update('privacy', { [r.key]: v } as any);
                toast(`${r.label} ${v ? 'on' : 'off'}.`, 'default');
              }}
              trackColor={{ false: palette.line, true: palette.acid }}
              thumbColor={palette.ink}
            />
          </View>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.72, maxWidth: 360 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 14,
  },
  key: { fontFamily: fonts.displayBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink },
  desc: { ...T.small, color: palette.ink, opacity: 0.65, marginTop: 3, maxWidth: 260 },
});
