import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { ListCell } from '@/components/ui/ListCell';
import { MetricCard } from '@/components/ui/MetricCard';
import { Tap } from '@/components/ui/Tap';
import { TiltCard } from '@/components/ui/TiltCard';
import { MediaThumb } from '@/components/svg/MediaThumb';
import { Section } from '@/components/ui/Section';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useStore } from '@/store';
import { profileMock } from '@/data/mock';

export default function PortfolioHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader title="PORTFOLIO" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        the <RNText style={styles.italic}>best</RNText>{'\n'}of what you made.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Your public portfolio doubles as your resume. Keep it tight — six to twelve pieces beats thirty half-done.
      </RNText>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="PORTFOLIO VIEWS" value={2_846} delta={12.4} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="LINK CLICKS" value={412} delta={4.1} size="md" />
        </View>
      </View>

      <Section eyebrow="FEATURED / 04" title="the grid.">
        <View style={styles.grid}>
          {profileMock.portfolio.map((p) => (
            <Tap
              key={p.id}
              onPress={() => router.push('/(modules)/portfolio/piece-editor' as any)}
              burstColor={p.color}
            >
              <TiltCard
                style={[styles.card, { backgroundColor: p.bg }] as any}
                maxTilt={5}
              >
                <View style={styles.cardThumb}>
                  <MediaThumb
                    size={120}
                    color={p.color}
                    ink={p.bg === palette.bone ? palette.ink : palette.bone}
                    variant="frame"
                  />
                </View>
                <RNText
                  style={[
                    styles.cardLabel,
                    { color: p.bg === palette.bone ? palette.ink : palette.bone },
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  maxFontSizeMultiplier={1.1}
                >
                  {p.title}
                </RNText>
              </TiltCard>
            </Tap>
          ))}
        </View>
      </Section>

      <Section eyebrow="DETAILS" title="tune the shop window.">
        <ListCell
          icon="pencil"
          title="Edit profile"
          subtitle="Name, bio, niches, collab status."
          onPress={() => router.push('/(modules)/portfolio/edit')}
        />
        <ListCell
          icon="eye-outline"
          title="Preview public profile"
          subtitle="What brands and fans actually see."
          onPress={() => router.push('/(modules)/portfolio/public-preview')}
        />
        <ListCell
          icon="link-outline"
          title="Share profile link"
          subtitle={`underdawgs.com/${profile.handle.replace('@', '')}`}
          onPress={() => toast('Profile link copied.', 'success')}
        />
      </Section>

      <View style={{ marginTop: 28, alignItems: 'flex-start' }}>
        <MagneticButton
          label="ADD PIECE"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => router.push('/(modules)/portfolio/piece-editor')}
        />
      </View>
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
  body: {
    ...T.body,
    color: palette.ink,
    opacity: 0.7,
    marginTop: 14,
    maxWidth: 360,
  },
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 22 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  card: {
    minWidth: 160,
    flexBasis: '48%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 14,
    justifyContent: 'flex-end',
  },
  cardThumb: { position: 'absolute', right: 10, top: 10, opacity: 0.95 },
  cardLabel: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.6 },
});
