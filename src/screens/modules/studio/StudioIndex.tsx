import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { Asterisk, ArrowMark } from '@/components/svg/Marks';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

function readableOn(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  const isDark = luma < 145;
  return {
    fg: isDark ? staticPalette.bone : staticPalette.ink,
    mute: isDark ? 'rgba(242,239,230,0.7)' : 'rgba(10,10,10,0.7)',
    line: isDark ? 'rgba(242,239,230,0.18)' : 'rgba(10,10,10,0.14)',
    isDark,
  };
}

type Composer = {
  key: string;
  name: string;
  sub: string;
  accent: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function StudioHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const drafts = useStore((s) => s.drafts);
  const scheduled = useStore((s) => s.scheduled);
  const published = useStore((s) => s.published);

  const COMPOSERS: Composer[] = [
    {
      key: 'image',
      name: 'IMAGE',
      sub: 'capture or pick from gallery',
      accent: palette.acid,
      route: '/(modules)/camera?mode=PHOTO',
      icon: 'image-outline',
    },
    {
      key: 'video',
      name: 'VIDEO',
      sub: 'record or pick from gallery',
      accent: palette.electric,
      route: '/(modules)/camera?mode=VIDEO',
      icon: 'videocam-outline',
    },
    {
      key: 'audio',
      name: 'AUDIO',
      sub: 'track, clip, podcast',
      accent: palette.blush,
      route: '/(modules)/studio/audio-composer',
      icon: 'mic-outline',
    },
    {
      key: 'text',
      name: 'TEXT',
      sub: 'essay, poem, note',
      accent: palette.ember,
      route: '/(modules)/studio/text-composer',
      icon: 'document-text-outline',
    },
    {
      key: 'story',
      name: 'STORY',
      sub: '24h ephemeral',
      accent: palette.acid,
      route: '/(modules)/camera?mode=STORY',
      icon: 'flash-outline',
    },
    {
      key: 'live',
      name: 'LIVE',
      sub: 'go live in real time',
      accent: palette.ember,
      route: '/(modules)/studio/live-composer',
      icon: 'radio-outline',
    },
  ];

  return (
    <ScreenFrame
      header={<ModuleHeader title="CONTENT STUDIO" />}
      contentStyle={styles.screenContent}
    >
      <View style={styles.heading}>
        <RNText style={styles.headingLine1} maxFontSizeMultiplier={1.1}>
          WRITE IT.
        </RNText>
        <RNText style={styles.headingLine2} maxFontSizeMultiplier={1.1}>
          <RNText style={styles.headingItalic}>film it.</RNText>
        </RNText>
        <RNText style={styles.headingLine3} maxFontSizeMultiplier={1.1}>
          POST IT.
        </RNText>
      </View>

      <View style={styles.metricsRow}>
        <Metric
          label="DRAFTS"
          value={String(drafts.length).padStart(2, '0')}
          accent={palette.acid}
        />
        <View style={styles.metricSep} />
        <Metric
          label="SCHEDULED"
          value={String(scheduled.length).padStart(2, '0')}
          accent={palette.electric}
        />
        <View style={styles.metricSep} />
        <Metric
          label="LIVE"
          value={String(published.length).padStart(2, '0')}
          accent={palette.blush}
        />
      </View>

      <View style={styles.sectionHead}>
        <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
        <RNText style={styles.sectionEyebrow}>COMPOSE</RNText>
      </View>
      <RNText style={styles.sectionTitle} maxFontSizeMultiplier={1.1}>
        start <RNText style={styles.sectionTitleItalic}>something.</RNText>
      </RNText>

      <View style={styles.composerList}>
        {COMPOSERS.map((c) => (
          <ComposerCard key={c.key} item={c} />
        ))}
      </View>

      <View style={styles.sectionHead}>
        <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
        <RNText style={styles.sectionEyebrow}>MANAGE</RNText>
      </View>

      <View style={styles.manageList}>
        <ManageRow
          icon="document-outline"
          label="Drafts"
          meta={`${drafts.length} in progress`}
          onPress={() => router.push('/(modules)/studio/drafts')}
        />
        <ManageRow
          icon="time-outline"
          label="Scheduled"
          meta={`${scheduled.length} lined up`}
          onPress={() => router.push('/(modules)/studio/schedule')}
        />
        <ManageRow
          icon="checkmark-done-outline"
          label="Published"
          meta={`${published.length} live on your feed`}
          onPress={() => router.push('/(modules)/studio/drafts')}
        />
      </View>
    </ScreenFrame>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.metric}>
      <RNText style={styles.metricLabel}>{label}</RNText>
      <RNText
        style={[styles.metricValue, { color: accent }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {value}
      </RNText>
    </View>
  );
}

function ComposerCard({ item }: { item: Composer }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const c = readableOn(item.accent);

  return (
    <Tap
      onPress={() => router.push(item.route as any)}
      burstColor={c.isDark ? staticPalette.bone : staticPalette.ink}
      variant="heavy"
      style={[styles.composerCard, { backgroundColor: item.accent }]}
    >
      <View style={[styles.composerIconWrap, { borderColor: c.fg }]}>
        <Ionicons name={item.icon} size={22} color={c.fg} />
      </View>
      <View style={{ flex: 1 }}>
        <RNText
          style={[styles.composerName, { color: c.fg }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {item.name}
        </RNText>
        <RNText
          style={[styles.composerSub, { color: c.mute }]}
          numberOfLines={1}
          maxFontSizeMultiplier={1.15}
        >
          {item.sub}
        </RNText>
      </View>
      <ArrowMark size={16} color={c.fg} strokeWidth={1.6} />
    </Tap>
  );
}

function ManageRow({
  icon,
  label,
  meta,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  meta: string;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap onPress={onPress} burstColor={palette.acid} style={styles.manageRow}>
      <View style={styles.manageIconWrap}>
        <Ionicons name={icon} size={18} color={palette.ink} />
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
    screenContent: { paddingHorizontal: 16, paddingBottom: 40 },

    heading: { marginTop: 4 },
    headingLine1: {
      fontFamily: fonts.displayBold,
      fontSize: 56,
      lineHeight: 56,
      letterSpacing: -2.4,
      color: palette.ink,
    },
    headingLine2: {
      fontFamily: fonts.displayBold,
      fontSize: 56,
      lineHeight: 56,
      letterSpacing: -2.4,
      color: palette.ink,
    },
    headingLine3: {
      fontFamily: fonts.displayBold,
      fontSize: 56,
      lineHeight: 56,
      letterSpacing: -2.4,
      color: palette.ink,
    },
    headingItalic: {
      fontFamily: fonts.editorialItalic,
      letterSpacing: -0.8,
      color: palette.electric,
    },

    metricsRow: {
      marginTop: 24,
      flexDirection: 'row',
      alignItems: 'stretch',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: palette.lineDark,
      paddingVertical: 14,
    },
    metric: { flex: 1, gap: 6, alignItems: 'center' },
    metricSep: { width: 1, backgroundColor: palette.line, marginHorizontal: 4 },
    metricLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
    },
    metricValue: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -0.8,
    },

    sectionHead: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderTopWidth: 1,
      borderColor: palette.lineDark,
      paddingTop: 14,
    },
    sectionEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
    },
    sectionTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 32,
      lineHeight: 34,
      letterSpacing: -1,
      color: palette.ink,
      marginTop: 8,
      marginBottom: 14,
    },
    sectionTitleItalic: {
      fontFamily: fonts.editorialItalic,
      color: palette.ember,
    },

    composerList: { gap: 12 },
    composerCard: {
      borderRadius: 22,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    composerIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    composerName: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.6,
    },
    composerSub: {
      ...T.label,
      letterSpacing: 1.4,
      fontSize: 11,
      marginTop: 4,
    },

    manageList: { marginTop: 14, gap: 8 },
    manageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 16,
      backgroundColor: palette.paper,
      borderWidth: 1,
      borderColor: palette.line,
    },
    manageIconWrap: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: palette.lineDark,
      alignItems: 'center',
      justifyContent: 'center',
    },
    manageLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 17,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    manageMeta: {
      ...T.small,
      color: palette.ink,
      opacity: 0.55,
      marginTop: 2,
    },
  });
