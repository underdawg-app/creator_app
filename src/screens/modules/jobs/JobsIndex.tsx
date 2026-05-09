import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  TextInput,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';
import { ArrowMark, Asterisk } from '@/components/svg/Marks';
import { Ionicons } from '@/icons';
import { jobsSeed, type Job } from '@/data/mock';
import { useStore } from '@/store';

const FILTERS = [
  'ALL',
  'SPONSORED POST',
  'VIDEO INTEGRATION',
  'BRAND AMBASSADOR',
  'GET VIRAL CAMPAIGN',
  'PRODUCT REVIEW',
  'UGC CREATION',
];

const formatBudget = (n: number) =>
  n >= 100000 ? `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L` : `${Math.round(n / 1000)}K`;

const daysUntil = (iso: string) => {
  const target = new Date(iso).getTime();
  const now = Date.now();
  const days = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return days;
};

export default function JobsHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const apps = useStore((s) => s.applications);
  const deals = useStore((s) => s.deals);
  const [filter, setFilter] = useState('ALL');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let out = jobsSeed;
    if (filter !== 'ALL') out = out.filter((j) => j.type === filter);
    const q = query.trim().toLowerCase();
    if (q) {
      out = out.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.brand.toLowerCase().includes(q) ||
          j.type.toLowerCase().includes(q) ||
          j.niche.toLowerCase().includes(q),
      );
    }
    return out;
  }, [filter, query]);

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          title="JOB BOARD"
          showBack={false}
          left={
            <Tap
              onPress={() => {
                setSearchOpen((v) => !v);
                if (searchOpen) setQuery('');
              }}
              style={styles.headerIconBtn}
              burstColor={palette.acid}
            >
              <Ionicons
                name={searchOpen ? 'close' : 'search'}
                size={18}
                color={palette.ink}
              />
            </Tap>
          }
          right={
            <Tap
              onPress={() => router.push('/(tabs)/inbox')}
              style={styles.headerIconBtn}
              burstColor={palette.acid}
            >
              <Ionicons name="chatbubble-outline" size={18} color={palette.ink} />
            </Tap>
          }
        />
      }
      contentStyle={styles.screenContent}
    >
      {searchOpen ? (
        <Animated.View
          entering={FadeInDown.duration(220)}
          exiting={FadeOutUp.duration(180)}
          style={styles.searchBar}
        >
          <Ionicons name="search" size={16} color={palette.mute} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="search by title, brand, niche…"
            placeholderTextColor={palette.mute}
            style={styles.searchInput}
            autoFocus
            returnKeyType="search"
            selectionColor={palette.acid}
          />
          {query ? (
            <Tap onPress={() => setQuery('')} burstColor={palette.ink}>
              <Ionicons name="close-circle" size={16} color={palette.mute} />
            </Tap>
          ) : null}
        </Animated.View>
      ) : null}

      <Animated.View
        layout={LinearTransition.duration(220)}
        style={styles.heading}
      >
        <RNText style={styles.headingLine1} maxFontSizeMultiplier={1.1}>
          BRANDS
        </RNText>
        <RNText style={styles.headingLine2} maxFontSizeMultiplier={1.1}>
          ARE
          <RNText style={styles.headingItalic}> waiting.</RNText>
        </RNText>
      </Animated.View>

      <Animated.View
        layout={LinearTransition.duration(220)}
        style={styles.metricsRow}
      >
        <Metric label="APPLIED" value={apps.length} />
        <View style={styles.metricSep} />
        <Metric label="ACTIVE" value={deals.length} accent={palette.electric} />
        <View style={styles.metricSep} />
        <Metric label="OPEN" value={jobsSeed.length} accent={palette.acid} />
      </Animated.View>

      <View style={styles.shortcuts}>
        <Tap
          onPress={() => router.push('/(modules)/jobs/active-deals')}
          burstColor={palette.acid}
          style={[styles.shortcut, { backgroundColor: palette.acid }]}
        >
          <View style={{ flex: 1 }}>
            <RNText style={styles.shortcutEyebrow}>YOURS</RNText>
            <RNText style={styles.shortcutLabel}>MY DEALS</RNText>
          </View>
          <ArrowMark size={18} color={staticPalette.ink} strokeWidth={1.8} />
        </Tap>
        <Tap
          onPress={() => router.push('/(modules)/jobs/rate-card')}
          burstColor={palette.bone}
          style={[styles.shortcut, { backgroundColor: palette.ink }]}
        >
          <View style={{ flex: 1 }}>
            <RNText style={[styles.shortcutEyebrow, { color: palette.bone, opacity: 0.55 }]}>
              YOURS
            </RNText>
            <RNText style={[styles.shortcutLabel, { color: palette.bone }]}>
              RATE CARD
            </RNText>
          </View>
          <ArrowMark size={18} color={palette.bone} strokeWidth={1.8} />
        </Tap>
      </View>

      <View style={styles.filterBlock}>
        <View style={styles.filterHead}>
          <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
          <RNText style={styles.filterEyebrow}>FILTER</RNText>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          style={styles.filterScroll}
        >
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              active={filter === f}
              onPress={() => setFilter(f)}
              accent={palette.acid}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.listHead}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.listEyebrow}>OPEN · {filtered.length}</RNText>
          <RNText style={styles.listTitle} maxFontSizeMultiplier={1.1}>
            pick your shot.
          </RNText>
        </View>
      </View>

      <View style={styles.list}>
        {filtered.length > 0 ? (
          <FeaturedJobCard job={filtered[0]} />
        ) : null}

        {chunkPairs(filtered.slice(1)).map(([a, b], i) => (
          <View key={`row-${i}`} style={styles.gridRow}>
            <View style={{ flex: 1 }}>
              <CompactJobCard job={a} />
            </View>
            <View style={{ flex: 1 }}>
              {b ? <CompactJobCard job={b} /> : null}
            </View>
          </View>
        ))}
      </View>
    </ScreenFrame>
  );
}

function chunkPairs<T>(arr: T[]): [T, T | undefined][] {
  const out: [T, T | undefined][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    out.push([arr[i], arr[i + 1]]);
  }
  return out;
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.metric}>
      <RNText style={styles.metricLabel}>{label}</RNText>
      <RNText
        style={[
          styles.metricValue,
          accent ? { color: accent } : { color: palette.ink },
        ]}
        maxFontSizeMultiplier={1.1}
      >
        {String(value).padStart(2, '0')}
      </RNText>
    </View>
  );
}

// Pick readable fg/mute colors against the card's accent backdrop.
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

function FeaturedJobCard({ job }: { job: Job }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const days = daysUntil(job.deadline);
  const c = readableOn(job.accent);

  return (
    <Tap
      onPress={() => router.push(`/(modules)/jobs/${job.id}` as any)}
      burstColor={c.isDark ? staticPalette.bone : staticPalette.ink}
      variant="heavy"
      style={[styles.jobCard, { backgroundColor: job.accent }]}
    >
      <View style={styles.jobInner}>
        <View style={styles.jobTopRow}>
          <RNText style={[styles.jobType, { color: c.fg }]} maxFontSizeMultiplier={1.1}>
            {job.type}
          </RNText>
          {job.verified ? (
            <View style={styles.verifiedDot}>
              <View
                style={[
                  styles.verifiedDotInner,
                  { backgroundColor: c.fg },
                ]}
              />
              <RNText style={[styles.verifiedText, { color: c.fg }]}>
                VERIFIED
              </RNText>
            </View>
          ) : null}
        </View>

        <RNText
          style={[styles.jobTitle, { color: c.fg }]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
          maxFontSizeMultiplier={1.1}
        >
          {job.title}
        </RNText>

        <View style={styles.jobMetaRow}>
          <RNText style={[styles.jobBrand, { color: c.fg }]} maxFontSizeMultiplier={1.15}>
            {job.brand}
          </RNText>
          <View style={[styles.jobMetaDot, { backgroundColor: c.fg, opacity: 0.4 }]} />
          <RNText
            style={[styles.jobLocation, { color: c.mute }]}
            numberOfLines={1}
            maxFontSizeMultiplier={1.15}
          >
            {job.location}
          </RNText>
        </View>

        <RNText
          style={[styles.jobDescription, { color: c.mute }]}
          numberOfLines={2}
          maxFontSizeMultiplier={1.2}
        >
          {job.description}
        </RNText>

        <View style={[styles.jobFoot, { borderTopColor: c.line }]}>
          <View style={styles.budgetBlock}>
            <RNText style={[styles.budgetEyebrow, { color: c.mute }]}>BUDGET</RNText>
            <RNText style={[styles.jobBudget, { color: c.fg }]} maxFontSizeMultiplier={1.1}>
              ₹{formatBudget(job.budgetMin)}
              <RNText style={[styles.budgetDash, { color: c.mute }]}> – </RNText>
              ₹{formatBudget(job.budgetMax)}
            </RNText>
          </View>
          <View style={styles.deadlineBlock}>
            <RNText style={[styles.deadlineDays, { color: c.fg }]} maxFontSizeMultiplier={1.1}>
              {days > 0 ? `${days}D` : 'CLOSED'}
            </RNText>
            <RNText style={[styles.deadlineLabel, { color: c.mute }]}>
              {job.applicants} APPLIED
            </RNText>
          </View>
        </View>
      </View>
    </Tap>
  );
}

function CompactJobCard({ job }: { job: Job }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const days = daysUntil(job.deadline);
  const c = readableOn(job.accent);

  return (
    <Tap
      onPress={() => router.push(`/(modules)/jobs/${job.id}` as any)}
      burstColor={c.isDark ? staticPalette.bone : staticPalette.ink}
      variant="heavy"
      style={[styles.compactCard, { backgroundColor: job.accent }]}
    >
      <View style={styles.compactInner}>
        <RNText
          style={[styles.compactType, { color: c.mute }]}
          numberOfLines={1}
          maxFontSizeMultiplier={1.1}
        >
          {job.type}
        </RNText>

        <RNText
          style={[styles.compactTitle, { color: c.fg }]}
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {job.title}
        </RNText>

        <RNText
          style={[styles.compactBrand, { color: c.mute }]}
          numberOfLines={1}
          maxFontSizeMultiplier={1.15}
        >
          {job.brand}
        </RNText>

        <View style={[styles.compactDivider, { backgroundColor: c.line }]} />

        <View style={styles.compactFoot}>
          <RNText style={[styles.compactBudget, { color: c.fg }]} maxFontSizeMultiplier={1.1}>
            ₹{formatBudget(job.budgetMin)}
            <RNText style={[styles.compactBudgetPlus, { color: c.mute }]}>+</RNText>
          </RNText>
          <RNText style={[styles.compactDays, { color: c.fg }]} maxFontSizeMultiplier={1.1}>
            {days > 0 ? `${days}D` : '—'}
          </RNText>
        </View>
      </View>
    </Tap>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    heading: {
      marginTop: 4,
      gap: 0,
    },
    headingLine1: {
      fontFamily: fonts.displayBold,
      fontSize: 64,
      lineHeight: 60,
      letterSpacing: -3,
      color: palette.ink,
    },
    headingLine2: {
      fontFamily: fonts.displayBold,
      fontSize: 64,
      lineHeight: 60,
      letterSpacing: -3,
      color: palette.ink,
    },
    headingItalic: {
      fontFamily: fonts.editorialItalic,
      fontSize: 64,
      lineHeight: 60,
      letterSpacing: -1.4,
      color: palette.ember,
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
      fontFamily: fonts.displayBold,
      fontSize: 34,
      lineHeight: 36,
      letterSpacing: -1,
    },

    shortcuts: {
      marginTop: 16,
      gap: 10,
    },
    shortcut: {
      borderRadius: 22,
      paddingVertical: 18,
      paddingHorizontal: 22,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    shortcutEyebrow: {
      ...T.label,
      color: staticPalette.ink,
      opacity: 0.6,
      letterSpacing: 1.6,
    },
    shortcutLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 24,
      lineHeight: 26,
      letterSpacing: -0.8,
      color: staticPalette.ink,
      marginTop: 2,
    },

    filterBlock: {
      marginTop: 32,
    },
    filterHead: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderTopWidth: 1,
      borderColor: palette.lineDark,
      paddingTop: 14,
      paddingBottom: 14,
    },
    filterEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
    },
    filterScroll: { marginHorizontal: -12 },
    filterRow: { gap: 8, paddingHorizontal: 12, paddingTop: 2, paddingBottom: 2 },

    listHead: {
      marginTop: 28,
      borderTopWidth: 1,
      borderColor: palette.lineDark,
      paddingTop: 14,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    listEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
      marginBottom: 6,
    },
    listTitle: {
      fontFamily: fonts.editorialItalic,
      fontSize: 36,
      lineHeight: 38,
      letterSpacing: -0.8,
      color: palette.ink,
    },

    screenContent: { paddingHorizontal: 12, paddingBottom: 120 },
    headerIconBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchBar: {
      marginTop: 18,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.lineDark,
      backgroundColor: palette.paper,
    },
    searchInput: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      paddingVertical: 0,
    },

    list: { marginTop: 16, gap: 14 },
    gridRow: { flexDirection: 'row', gap: 12, marginBottom: 0 },

    jobCard: {
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    jobInner: {
      padding: 16,
      gap: 12,
    },
    jobDescription: {
      ...T.small,
      color: palette.ink,
      opacity: 0.65,
      marginTop: 2,
    },

    compactCard: {
      borderRadius: 20,
      overflow: 'hidden',
      minHeight: 220,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    compactInner: { padding: 12, gap: 8, flex: 1 },
    compactType: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.4,
      fontSize: 10,
    },
    compactTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: -0.5,
      color: palette.ink,
      marginTop: 2,
    },
    compactBrand: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
      letterSpacing: 1.2,
      fontSize: 10,
    },
    compactDivider: {
      height: 1,
      backgroundColor: palette.line,
      marginTop: 'auto',
    },
    compactFoot: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    compactBudget: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    compactBudgetPlus: {
      fontFamily: fonts.editorialItalic,
      fontSize: 14,
      color: palette.ink,
      opacity: 0.55,
    },
    compactDays: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: -0.2,
    },
    jobTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    jobType: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
      letterSpacing: 1.8,
    },
    verifiedDot: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    verifiedDotInner: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    verifiedText: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
      letterSpacing: 1.6,
    },
    jobTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 26,
      lineHeight: 28,
      letterSpacing: -0.8,
      color: palette.ink,
    },
    jobMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    jobBrand: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.4,
    },
    jobMetaDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: palette.ink,
      opacity: 0.4,
    },
    jobLocation: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.4,
      flex: 1,
    },
    jobFoot: {
      marginTop: 4,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    budgetBlock: { gap: 4, flex: 1 },
    budgetEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.5,
      letterSpacing: 1.6,
    },
    jobBudget: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.6,
      color: palette.ink,
    },
    budgetDash: {
      fontFamily: fonts.editorialItalic,
      fontSize: 20,
      letterSpacing: 0,
      color: palette.ink,
      opacity: 0.5,
    },
    deadlineBlock: { alignItems: 'flex-end', gap: 4 },
    deadlineDays: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.6,
    },
    deadlineLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
    },
  });
