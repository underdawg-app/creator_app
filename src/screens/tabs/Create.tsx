import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  Platform,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { contentTypes } from '@/data/mock';
import { useStore } from '@/store';
import { Tap } from '@/components/ui/Tap';
import { Asterisk, ArrowMark } from '@/components/svg/Marks';
import { Ionicons } from '@/icons';

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

const ICON_FOR_KEY: Record<string, keyof typeof Ionicons.glyphMap> = {
  image: 'image-outline',
  video: 'videocam-outline',
  audio: 'mic-outline',
  text: 'document-text-outline',
  story: 'flash-outline',
  live: 'radio-outline',
};

function chunkPairs<T>(arr: T[]): [T, T | undefined][] {
  const out: [T, T | undefined][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push([arr[i], arr[i + 1]]);
  }
  return out;
}

export default function Create() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const drafts = useStore((s) => s.drafts);
  const scheduled = useStore((s) => s.scheduled);
  const published = useStore((s) => s.published);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
          <RNText style={styles.kicker} maxFontSizeMultiplier={1.15}>
            COMPOSE · STUDIO
          </RNText>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          removeClippedSubviews={IS_ANDROID}
          overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        >
          <View style={styles.heading}>
            <RNText style={styles.headingItalic} maxFontSizeMultiplier={1.1}>
              what
            </RNText>
            <RNText style={styles.headingLine1} maxFontSizeMultiplier={1.1}>
              ARE YOU
            </RNText>
            <RNText style={styles.headingAccent} maxFontSizeMultiplier={1.1}>
              MAKING?
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

          <View style={styles.composeGrid}>
            {chunkPairs(contentTypes).map(([a, b], i) => (
              <View key={`row-${i}`} style={styles.composeRow}>
                <View style={{ flex: 1 }}>
                  <ComposeCard item={a} />
                </View>
                <View style={{ flex: 1 }}>
                  {b ? <ComposeCard item={b} /> : null}
                </View>
              </View>
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
              meta={`${published.length} live`}
              onPress={() => router.push('/(modules)/studio/drafts')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
      <RNText style={[styles.metricValue, { color: accent }]} maxFontSizeMultiplier={1.1}>
        {value}
      </RNText>
    </View>
  );
}

function ComposeCard({
  item,
}: {
  item: { key: string; name: string; sub: string; accent: string; route: string };
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  const c = readableOn(item.accent);
  const icon = ICON_FOR_KEY[item.key] ?? 'add-outline';

  return (
    <Tap
      onPress={() => router.push(item.route as any)}
      burstColor={c.isDark ? staticPalette.bone : staticPalette.ink}
      variant="heavy"
      style={[styles.composeCard, { backgroundColor: item.accent }]}
    >
      <View style={[styles.composeIconWrap, { borderColor: c.fg }]}>
        <Ionicons name={icon} size={20} color={c.fg} />
      </View>
      <View style={styles.composeBody}>
        <RNText
          style={[styles.composeName, { color: c.fg }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {item.name}
        </RNText>
        <RNText
          style={[styles.composeSub, { color: c.mute }]}
          numberOfLines={1}
          maxFontSizeMultiplier={1.15}
        >
          {item.sub}
        </RNText>
      </View>
      <ArrowMark size={14} color={c.fg} strokeWidth={1.6} />
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
    root: { flex: 1, backgroundColor: palette.bone },

    topRow: {
      paddingHorizontal: 16,
      paddingTop: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    kicker: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
    },

    scroll: {
      paddingHorizontal: 16,
      paddingBottom: 140,
    },

    heading: { marginTop: 18, gap: 0 },
    headingItalic: {
      ...T.editorial1,
      color: palette.ink,
    },
    headingLine1: {
      ...T.display2,
      color: palette.ink,
    },
    headingAccent: {
      ...T.display2,
      color: palette.acid,
    },

    metricsRow: {
      marginTop: 28,
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
      ...T.title1,
    },

    sectionHead: {
      marginTop: 32,
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
      ...T.numeric,
      color: palette.ink,
      marginTop: 8,
      marginBottom: 14,
    },
    sectionTitleItalic: {
      fontFamily: fonts.editorialItalic,
      color: palette.ember,
    },

    composeGrid: { gap: 12 },
    composeRow: { flexDirection: 'row', gap: 12 },
    composeCard: {
      borderRadius: 22,
      padding: 16,
      gap: 8,
      minHeight: 130,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    composeIconWrap: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
    },
    composeBody: { gap: 2 },
    composeName: {
      ...T.title2,
    },
    composeSub: {
      ...T.label,
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
      ...T.lead,
      color: palette.ink,
    },
    manageMeta: {
      ...T.small,
      color: palette.ink,
      opacity: 0.55,
      marginTop: 2,
    },
  });
