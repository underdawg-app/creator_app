import React from 'react';
import { View, StyleSheet, Text as RNText, Dimensions } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { BadgePill } from '@/components/ui/BadgePill';
import { Chip } from '@/components/ui/Chip';
import { TiltCard } from '@/components/ui/TiltCard';
import { MediaThumb } from '@/components/svg/MediaThumb';
import { Ticker } from '@/components/ui/Ticker';
import { Marquee } from '@/components/ui/Marquee';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';
import { profileMock } from '@/data/mock';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';

const { width } = Dimensions.get('window');

export default function PublicPreview() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PREVIEW" title="PUBLIC PROFILE" />} padding={false}>
      <View style={styles.top}>
        <Marquee
          items={[
            `UNDERDAWGS.COM / ${profile.handle.replace('@', '')}`,
            'LIVE',
            'PUBLIC VIEW',
          ]}
          textStyle={{
            fontFamily: fonts.bodyBold,
            fontSize: 10,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: palette.ink,
            opacity: 0.6,
          }}
          speed={30}
        />
      </View>

      <View style={styles.hero}>
        <View style={styles.heroMark} pointerEvents="none">
          <MediaThumb
            size={width * 0.58}
            color={palette.acid}
            ink={palette.acid}
            variant="lens"
          />
        </View>

        <View style={styles.eyebrowRow}>
          <RNText style={styles.eyebrow} maxFontSizeMultiplier={1.15}>
            {profile.type} · {profile.location}
          </RNText>
          <Tap
            onPress={() => router.push('/(modules)/portfolio/edit' as any)}
            burstColor={palette.acid}
            style={styles.editBtn}
          >
            <Ionicons name="create-outline" size={13} color={palette.ink} />
            <RNText style={styles.editBtnLabel} maxFontSizeMultiplier={1.1}>
              EDIT
            </RNText>
          </Tap>
        </View>
        <RNText
          style={styles.name}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {profile.name}.
        </RNText>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <BadgePill label="VERIFIED" accent={palette.electric} />
          <BadgePill tier="RISING" accent={palette.acid} />
        </View>
        <RNText style={styles.bio} maxFontSizeMultiplier={1.2}>
          {profile.bio}
        </RNText>

        <View style={styles.statsRow}>
          <View style={{ flex: 1 }}>
            <Ticker value={profileMock.stats.followers} fontSize={34} color={palette.ink} label="FOLLOWERS" />
          </View>
          <View style={{ flex: 1 }}>
            <Ticker value={profile.reputation} fontSize={34} color={palette.ink} label="REP" />
          </View>
          <View style={{ flex: 1 }}>
            <Ticker value={profileMock.stats.earned} fontSize={34} color={palette.ink} label="$ EARNED" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <MagneticButton
            label="FOLLOW"
            background={palette.ink}
            foreground={palette.acid}
            onPress={() => toast('Following.', 'success')}
          />
          <MagneticButton
            label="HIRE"
            background={palette.acid}
            foreground={staticPalette.ink}
            onPress={() => toast('Hire inquiry sent.', 'success')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.15}>
          — OPEN TO
        </RNText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {profile.openTo.map((o) => (
            <Chip key={o} label={o} active accent={palette.acid} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.15}>
          — PORTFOLIO
        </RNText>
        <View style={styles.grid}>
          {profileMock.portfolio.map((p) => (
            <TiltCard
              key={p.id}
              style={[styles.card, { backgroundColor: p.bg }] as any}
              maxTilt={4}
            >
              <View style={styles.cardThumb}>
                <MediaThumb
                  size={110}
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
          ))}
        </View>
      </View>

      <View style={{ height: 60 }} />
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  top: { borderBottomWidth: 1, borderBottomColor: palette.line, paddingVertical: 8 },
  hero: { padding: 24, paddingTop: 22 },
  heroMark: { position: 'absolute', right: -60, top: -30, opacity: 0.32 },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  eyebrow: { ...T.label, color: palette.ink, opacity: 0.7, flexShrink: 1 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: palette.acid,
  },
  editBtnLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: palette.ink,
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: fonts.displayBold,
    fontSize: 62,
    lineHeight: 62,
    letterSpacing: -2.8,
    color: palette.ink,
    marginTop: 6,
  },
  bio: {
    fontFamily: fonts.editorialItalic,
    fontSize: 20,
    lineHeight: 26,
    color: palette.ink,
    opacity: 0.82,
    marginTop: 18,
    maxWidth: 360,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 28,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  section: { paddingHorizontal: 24, marginTop: 28 },
  sectionKicker: { ...T.label, color: palette.ink, opacity: 0.6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 14 },
  card: {
    flexBasis: '48%',
    height: 170,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 14,
    justifyContent: 'flex-end',
  },
  cardThumb: { position: 'absolute', right: 10, top: 10, opacity: 0.95 },
  cardLabel: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.6 },
});
