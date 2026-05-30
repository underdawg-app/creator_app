import React from 'react';
import { View, StyleSheet, Text as RNText, Dimensions } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { ArrowMark } from '@/components/svg/Marks';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

const { width } = Dimensions.get('window');
const PAD = 16;
const GAP = 10;

const HERO_W = width - PAD * 2;
const HALF_W = (HERO_W - GAP) / 2;
const THIRD_W = (HERO_W - GAP * 2) / 3;

type Tone = {
  bg: string;
  fg: string;
  sub: string;
};

const BLUE: Tone = { bg: '#2E5BFF', fg: staticPalette.bone, sub: 'rgba(242,239,230,0.78)' };
const ORANGE: Tone = { bg: '#FF5A1F', fg: staticPalette.bone, sub: 'rgba(242,239,230,0.78)' };
const PINK: Tone = { bg: '#FF6BB5', fg: staticPalette.ink, sub: 'rgba(10,10,10,0.65)' };
const TEAL: Tone = { bg: '#14B8A6', fg: staticPalette.bone, sub: 'rgba(242,239,230,0.78)' };
const YELLOW: Tone = { bg: '#FFD23F', fg: staticPalette.ink, sub: 'rgba(10,10,10,0.65)' };
const INK: Tone = { bg: staticPalette.ink, fg: staticPalette.bone, sub: 'rgba(242,239,230,0.65)' };

export default function StudioHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const drafts = useStore((s) => s.drafts);
  const scheduled = useStore((s) => s.scheduled);
  const published = useStore((s) => s.published);

  return (
    <ScreenFrame
      header={<ModuleHeader title="STUDIO" />}
      contentStyle={styles.screenContent}
    >
      <View style={styles.leadRow}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.leadKicker}>{`${String(
            drafts.length + scheduled.length,
          ).padStart(2, '0')} OPEN`}</RNText>
          <RNText style={styles.lead} maxFontSizeMultiplier={1.1}>
            make
            <RNText style={styles.leadItalic}> something.</RNText>
          </RNText>
        </View>
      </View>

      {/* HERO — image capture, full width */}
      <Tile
        kind="hero"
        tone={BLUE}
        icon="image-outline"
        name="IMAGE"
        sub="capture, crop, post"
        onPress={() => router.push('/(modules)/camera?mode=PHOTO')}
      />

      {/* MEDIUM ROW — two halves */}
      <View style={styles.row}>
        <Tile
          kind="half"
          tone={ORANGE}
          icon="videocam-outline"
          name="VIDEO"
          sub="record or pick"
          onPress={() => router.push('/(modules)/camera?mode=VIDEO')}
        />
        <Tile
          kind="half"
          tone={PINK}
          icon="mic-outline"
          name="AUDIO"
          sub="clip · podcast"
          onPress={() => router.push('/(modules)/studio/audio-composer')}
        />
      </View>

      {/* SMALL ROW — three thirds */}
      <View style={styles.row}>
        <Tile
          kind="third"
          tone={TEAL}
          icon="document-text-outline"
          name="TEXT"
          onPress={() => router.push('/(modules)/studio/text-composer')}
        />
        <Tile
          kind="third"
          tone={YELLOW}
          icon="flash-outline"
          name="STORY"
          onPress={() => router.push('/(modules)/camera?mode=STORY')}
        />
        <Tile
          kind="third"
          tone={INK}
          icon="radio-outline"
          name="LIVE"
          onPress={() => router.push('/(modules)/studio/live-composer')}
        />
      </View>

      <View style={styles.divider} />

      <RNText style={styles.manageHead}>YOUR QUEUE</RNText>
      <ManageRow
        icon="document-outline"
        label="Drafts"
        meta={`${drafts.length} in progress`}
        accent="#2E5BFF"
        onPress={() => router.push('/(modules)/studio/drafts')}
      />
      <ManageRow
        icon="time-outline"
        label="Scheduled"
        meta={`${scheduled.length} lined up`}
        accent="#FF6BB5"
        onPress={() => router.push('/(modules)/studio/schedule')}
      />
      <ManageRow
        icon="checkmark-done-outline"
        label="Published"
        meta={`${published.length} live`}
        accent="#14B8A6"
        onPress={() => router.push('/(modules)/studio/content')}
      />
    </ScreenFrame>
  );
}

function Tile({
  kind,
  tone,
  icon,
  name,
  sub,
  onPress,
}: {
  kind: 'hero' | 'half' | 'third';
  tone: Tone;
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  sub?: string;
  onPress: () => void;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  const sizeStyle =
    kind === 'hero' ? styles.tileHero : kind === 'half' ? styles.tileHalf : styles.tileThird;
  const iconSize = kind === 'hero' ? 28 : kind === 'half' ? 24 : 20;
  const nameSize =
    kind === 'hero'
      ? { fontSize: 38, lineHeight: 40, letterSpacing: -1.5 }
      : kind === 'half'
      ? { fontSize: 26, lineHeight: 28, letterSpacing: -0.9 }
      : { fontSize: 18, lineHeight: 20, letterSpacing: -0.5 };

  return (
    <Tap
      onPress={onPress}
      burstColor={tone.fg}
      variant="heavy"
      style={[styles.tile, sizeStyle, { backgroundColor: tone.bg }]}
    >
      <View style={styles.tileTopRow}>
        <Ionicons name={icon} size={iconSize} color={tone.fg} />
        {kind === 'hero' ? (
          <View style={[styles.tileArrow, { borderColor: tone.fg }]}>
            <ArrowMark size={14} color={tone.fg} strokeWidth={1.8} />
          </View>
        ) : null}
      </View>
      <View style={{ gap: 4 }}>
        <RNText
          style={[styles.tileName, nameSize, { color: tone.fg }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {name}
        </RNText>
        {sub ? (
          <RNText
            style={[styles.tileSub, { color: tone.sub }]}
            numberOfLines={1}
            maxFontSizeMultiplier={1.15}
          >
            {sub}
          </RNText>
        ) : null}
      </View>
    </Tap>
  );
}

function ManageRow({
  icon,
  label,
  meta,
  accent,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  meta: string;
  accent: string;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap onPress={onPress} burstColor={accent} style={styles.manageRow}>
      <View style={[styles.manageIconWrap, { backgroundColor: accent }]}>
        <Ionicons name={icon} size={15} color={staticPalette.bone} />
      </View>
      <View style={{ flex: 1 }}>
        <RNText style={styles.manageLabel} maxFontSizeMultiplier={1.1}>
          {label}
        </RNText>
        <RNText style={styles.manageMeta} maxFontSizeMultiplier={1.15}>
          {meta}
        </RNText>
      </View>
      <ArrowMark size={14} color={palette.ink} strokeWidth={1.6} />
    </Tap>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screenContent: { paddingHorizontal: PAD, paddingBottom: 40 },

    leadRow: {
      marginTop: 4,
      marginBottom: 18,
    },
    leadKicker: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 2,
      marginBottom: 4,
    },
    lead: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 42,
      letterSpacing: -1.4,
      color: palette.ink,
    },
    leadItalic: {
      fontFamily: fonts.editorialItalic,
      color: palette.electric,
      letterSpacing: -0.4,
    },

    row: {
      flexDirection: 'row',
      gap: GAP,
      marginTop: GAP,
    },
    tile: {
      borderRadius: 22,
      padding: 16,
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    tileHero: {
      width: HERO_W,
      height: 150,
    },
    tileHalf: {
      width: HALF_W,
      height: 130,
    },
    tileThird: {
      width: THIRD_W,
      height: 110,
      padding: 12,
    },
    tileTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tileArrow: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileName: {
      fontFamily: fonts.displayBold,
    },
    tileSub: {
      ...T.label,
      letterSpacing: 1.4,
      fontSize: 10,
    },

    divider: {
      height: 1,
      backgroundColor: palette.lineDark,
      marginTop: 28,
      marginBottom: 14,
    },
    manageHead: {
      ...T.label,
      color: palette.ink,
      opacity: 0.65,
      letterSpacing: 2,
      marginBottom: 10,
    },
    manageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 14,
      backgroundColor: palette.paper,
      borderWidth: 1,
      borderColor: palette.line,
      marginBottom: 8,
    },
    manageIconWrap: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    manageLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 15,
      letterSpacing: -0.3,
      color: palette.ink,
    },
    manageMeta: {
      ...T.small,
      color: palette.ink,
      opacity: 0.55,
      marginTop: 1,
    },
  });
