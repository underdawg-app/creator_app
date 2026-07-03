import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useTheme, useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { useStore } from '@/store';

export default function SettingsHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { preference, setPreference } = useTheme();
  const resetDemo = useStore((s) => s.resetDemo);
  const logout = useStore((s) => s.logout);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader title="SETTINGS" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        how the <RNText style={styles.italic}>room</RNText>{'\n'}works for you.
      </RNText>

      <Section eyebrow="ACCOUNT">
        <ListCell
          icon="person-outline"
          title="Account"
          subtitle="Email, password, phone"
          onPress={() => router.push('/(modules)/settings/account')}
        />
        <ListCell
          icon="lock-closed-outline"
          title="Privacy"
          subtitle="Who can see, who can message"
          onPress={() => router.push('/(modules)/settings/privacy')}
        />
        <ListCell
          icon="shield-outline"
          title="Security"
          subtitle="2FA, login activity, devices"
          onPress={() => router.push('/(modules)/settings/security')}
        />
        <ListCell
          icon="link-outline"
          title="Connected accounts"
          subtitle="Instagram, YouTube, TikTok & more"
          onPress={() => router.push('/(modules)/audience/connections')}
        />
        <ListCell
          icon="eye-outline"
          title="Profile & visibility"
          subtitle="Completeness, public/private, hide stats"
          onPress={() => router.push('/(modules)/profile/visibility')}
        />
      </Section>

      <Section eyebrow="APPEARANCE">
        <View style={styles.appearanceRow}>
          <RNText style={styles.appearanceLabel} maxFontSizeMultiplier={1.15}>
            Theme
          </RNText>
          <View style={styles.segmented}>
            {(['system', 'light', 'dark'] as const).map((opt) => {
              const active = preference === opt;
              return (
                <Pressable
                  key={opt}
                  onPress={() => setPreference(opt)}
                  style={[
                    styles.segment,
                    active && { backgroundColor: palette.ink, borderColor: palette.ink },
                  ]}
                >
                  <RNText
                    style={[
                      styles.segmentLabel,
                      { color: active ? palette.bone : palette.ink },
                    ]}
                    maxFontSizeMultiplier={1.15}
                  >
                    {opt.toUpperCase()}
                  </RNText>
                </Pressable>
              );
            })}
          </View>
        </View>
        <RNText style={styles.appearanceHint} maxFontSizeMultiplier={1.2}>
          System follows your phone's light/dark setting.
        </RNText>
      </Section>

      <Section eyebrow="MONEY & WORK">
        <ListCell
          icon="cash-outline"
          title="Finance"
          subtitle="Payouts, transactions, invoices"
          onPress={() => router.push('/(modules)/finance')}
        />
        <ListCell
          icon="heart-outline"
          title="Tips"
          subtitle="Accept tips, set amounts, history"
          onPress={() => router.push('/(modules)/tips')}
        />
        <ListCell
          icon="people-outline"
          title="Collab"
          subtitle="Inbox, active collabs, find matches"
          onPress={() => router.push('/(modules)/collab')}
        />
      </Section>

      <Section eyebrow="EXPERIENCE">
        <ListCell
          icon="notifications-outline"
          title="Notifications"
          subtitle="Push, email, SMS, quiet hours"
          onPress={() => router.push('/(modules)/settings/notifications')}
        />
        <ListCell
          icon="language-outline"
          title="Language & region"
          subtitle="EN · IN · IST"
          onPress={() => toast('Language coming soon.', 'default')}
        />
        <ListCell
          icon="server-outline"
          title="Data & storage"
          subtitle="Cache, offline content"
          onPress={() => toast('24 MB cached.', 'default')}
        />
      </Section>

      <Section eyebrow="SUPPORT">
        <ListCell
          icon="help-circle-outline"
          title="Help & FAQ"
          subtitle="Search, contact support, report a problem"
          onPress={() => router.push('/(modules)/settings/help')}
        />
        <ListCell
          icon="document-outline"
          title="Legal & terms"
          subtitle="Guidelines, terms, privacy policy"
          onPress={() => router.push('/(modules)/settings/help')}
        />
        <ListCell
          icon="information-circle-outline"
          title="About"
          subtitle="v0.1.0 · SDK 54"
          onPress={() => toast('Built for creators.', 'default')}
        />
      </Section>

      <Section eyebrow="ACCOUNT ACTIONS">
        <ListCell
          icon="log-out-outline"
          title="Log out"
          subtitle="Sign back in any time"
          onPress={() => {
            logout();
            toast('Logged out.', 'default');
            router.replace('/(onboarding)/welcome');
          }}
        />
        <ListCell
          icon="refresh-outline"
          title="Reset demo data"
          subtitle="Clear local content & settings"
          onPress={() => {
            resetDemo();
            toast('Demo reset to factory state.', 'success');
          }}
        />
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 50,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 14,
  },
  appearanceLabel: {
    ...T.title3,
    color: palette.ink,
  },
  segmented: {
    flexDirection: 'row',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.line,
    overflow: 'hidden',
  },
  segment: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 999,
  },
  segmentLabel: {
    ...T.micro,
  },
  appearanceHint: {
    ...T.small,
    color: palette.mute,
    marginTop: 10,
  },
});
