import React from 'react';
import { View, StyleSheet, Text as RNText, Switch } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { ListCell } from '@/components/ui/ListCell';
import { Section } from '@/components/ui/Section';
import { useStore } from '@/store';

export default function Security() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const s = useStore((st) => st.settings.security);
  const update = useStore((st) => st.updateSetting);
  const toast = useStore((st) => st.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="SETTINGS" title="SECURITY" />}>
      <Section eyebrow="TOGGLES">
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.key} maxFontSizeMultiplier={1.15}>
              TWO-FACTOR AUTH
            </RNText>
            <RNText style={styles.desc} maxFontSizeMultiplier={1.2}>
              SMS + authenticator. Drop-dead important on creator accounts.
            </RNText>
          </View>
          <Switch
            value={s.twoFactor}
            onValueChange={(v) => {
              update('security', { twoFactor: v });
              toast(v ? '2FA enabled.' : '2FA disabled.', v ? 'success' : 'warn');
            }}
            trackColor={{ false: palette.line, true: palette.acid }}
            thumbColor={palette.ink}
          />
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.key} maxFontSizeMultiplier={1.15}>
              LOGIN ALERTS
            </RNText>
            <RNText style={styles.desc} maxFontSizeMultiplier={1.2}>
              Push + email when a new device signs in.
            </RNText>
          </View>
          <Switch
            value={s.loginAlerts}
            onValueChange={(v) => update('security', { loginAlerts: v })}
            trackColor={{ false: palette.line, true: palette.acid }}
            thumbColor={palette.ink}
          />
        </View>
      </Section>

      <Section eyebrow="ACTIVITY">
        <ListCell icon="time-outline" title="Login activity" subtitle="iPhone · Safari · Mumbai · just now" onPress={() => toast('Recent activity opened.', 'default')} />
        <ListCell icon="phone-portrait-outline" title="Trusted devices" subtitle="2 trusted · manage" onPress={() => toast('Devices opened.', 'default')} />
        <ListCell icon="exit-outline" title="End all sessions" subtitle="Sign out everywhere at once" onPress={() => toast('All sessions ended.', 'warn')} />
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 14,
  },
  key: { fontFamily: fonts.displayBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink },
  desc: { ...T.small, color: palette.ink, opacity: 0.65, marginTop: 3, maxWidth: 280 },
});
