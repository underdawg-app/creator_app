import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, ScrollView } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { BadgePill } from '@/components/ui/BadgePill';
import { ArrowMark } from '@/components/svg/Marks';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';

const FILTERS = ['ALL', 'SPONSORED POST', 'VIDEO INTEGRATION', 'BRAND AMBASSADOR', 'GET VIRAL CAMPAIGN', 'PRODUCT REVIEW', 'UGC CREATION'];

export default function JobsHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const apps = useStore((s) => s.applications);
  const deals = useStore((s) => s.deals);
  const [filter, setFilter] = useState('ALL');

  const filtered = useMemo(() => {
    if (filter === 'ALL') return jobsSeed;
    return jobsSeed.filter((j) => j.type === filter);
  }, [filter]);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MODULE · 07" title="JOB BOARD" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        brands are<RNText style={styles.italic}>{'\n'}waiting.</RNText>
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Transparent rates, clear deliverables, contracts and payment on-platform. Apply in two minutes.
      </RNText>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="APPLICATIONS" value={apps.length} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="ACTIVE DEALS" value={deals.length} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="OPEN JOBS" value={jobsSeed.length} size="md" accent={palette.blush} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>
        <Tap
          onPress={() => router.push('/(modules)/jobs/active-deals')}
          burstColor={palette.acid}
          style={[styles.shortcut, { backgroundColor: palette.acid }]}
        >
          <RNText style={styles.shortcutLabel}>MY DEALS</RNText>
          <ArrowMark size={14} color={staticPalette.ink} strokeWidth={1.6} />
        </Tap>
        <Tap
          onPress={() => router.push('/(modules)/jobs/rate-card')}
          burstColor={palette.ink}
          style={[styles.shortcut, { backgroundColor: palette.ink }]}
        >
          <RNText style={[styles.shortcutLabel, { color: palette.bone }]}>
            RATE CARD
          </RNText>
          <ArrowMark size={14} color={palette.bone} strokeWidth={1.6} />
        </Tap>
      </View>

      <Section eyebrow="FILTER">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FILTERS.map((f) => (
            <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} accent={palette.acid} />
          ))}
        </ScrollView>
      </Section>

      <Section eyebrow={`OPEN · ${filtered.length}`} title="pick your shot.">
        <View style={{ gap: 12, marginTop: 4 }}>
          {filtered.map((j) => (
            <Tap
              key={j.id}
              onPress={() => router.push(`/(modules)/jobs/${j.id}` as any)}
              burstColor={j.accent}
              variant="heavy"
              style={[styles.jobCard, { borderColor: j.accent }]}
            >
              <View style={styles.jobTop}>
                <BadgePill label={j.type} accent={j.accent} />
                {j.verified ? <BadgePill label="VERIFIED" accent={palette.electric} /> : null}
              </View>
              <RNText
                style={styles.jobTitle}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                maxFontSizeMultiplier={1.1}
              >
                {j.title}
              </RNText>
              <RNText style={styles.jobBrand} maxFontSizeMultiplier={1.15}>
                {j.brand} · {j.location}
              </RNText>
              <View style={styles.jobFoot}>
                <RNText style={styles.jobBudget} maxFontSizeMultiplier={1.1}>
                  ₹{(j.budgetMin / 1000).toFixed(0)}K – ₹{(j.budgetMax / 1000).toFixed(0)}K
                </RNText>
                <RNText style={styles.jobMeta} maxFontSizeMultiplier={1.15}>
                  {j.applicants} applied
                </RNText>
              </View>
            </Tap>
          ))}
        </View>
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
  italic: { fontFamily: fonts.editorialItalic, color: palette.ember },
  body: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 14, maxWidth: 360 },
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 22 },
  shortcut: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shortcutLabel: { fontFamily: fonts.displayBold, fontSize: 18, color: staticPalette.ink, letterSpacing: -0.4 },
  filterRow: { gap: 8, paddingTop: 4, paddingBottom: 2 },
  jobCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    backgroundColor: palette.paper,
    gap: 10,
  },
  jobTop: { flexDirection: 'row', gap: 8 },
  jobTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: -0.8,
    color: palette.ink,
  },
  jobBrand: { ...T.micro, color: palette.ink, opacity: 0.65 },
  jobFoot: {
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: palette.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobBudget: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, letterSpacing: -0.4 },
  jobMeta: { ...T.micro, color: palette.ink, opacity: 0.55, alignSelf: 'center' },
});
