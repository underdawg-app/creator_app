import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { MetricCard } from '@/components/ui/MetricCard';
import { useStore } from '@/store';

export default function AudienceHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const platforms = useStore((s) => s.platforms);
  const subscribers = useStore((s) => s.subscribers);

  const rented = platforms
    .filter((p) => p.connected)
    .reduce((a, p) => a + p.followers, 0);
  const owned = subscribers.length;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MODULE · 05" title="AUDIENCE" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        own the <RNText style={styles.italic}>room,</RNText>{'\n'}not the platform.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        The followers on Instagram are rented. The email list you own. Move the superfans to channels you control.
      </RNText>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="RENTED" value={rented} delta={4.2} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="OWNED" value={owned} delta={18.4} size="md" accent={palette.electric} />
        </View>
      </View>

      <Section eyebrow="MANAGE">
        <ListCell
          icon="link-outline"
          title="Platform connections"
          subtitle={`${platforms.filter((p) => p.connected).length} / ${platforms.length} linked`}
          onPress={() => router.push('/(modules)/audience/connections')}
        />
        <ListCell
          icon="heart-outline"
          title="Top fans"
          subtitle="Identify super-engaged followers across platforms"
          onPress={() => router.push('/(modules)/audience/top-fans')}
        />
        <ListCell
          icon="mail-outline"
          title="Email list"
          subtitle={`${owned} subscribers · compose newsletter`}
          onPress={() => router.push('/(modules)/audience/email-list')}
        />
        <ListCell
          icon="globe-outline"
          title="Landing page builder"
          subtitle="underdawgs.com/yourhandle · link-in-bio"
          onPress={() => router.push('/(modules)/audience/landing-page')}
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
  body: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 14, maxWidth: 360 },
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 22 },
});
