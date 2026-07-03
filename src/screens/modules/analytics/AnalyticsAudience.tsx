import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { analyticsSeed } from '@/data/mock';
import { useStore } from '@/store';

type Row = { label: string; value: number };

// Deterministic per-period nudge so toggling "vs last period" shifts bars.
function nudge(rows: Row[], on: boolean): Row[] {
  if (!on) return rows;
  return rows.map((r, i) => {
    const delta = ((i % 3) - 1) * 3; // -3 / 0 / +3 pattern
    return { ...r, value: Math.max(2, Math.min(100, r.value + delta)) };
  });
}

const HOURS = ['6a', '9a', '12p', '3p', '6p', '9p', '12a'];
// Activity heat per hour bucket (0-1). Peak late-evening (6p/9p).
const HEAT = [0.15, 0.3, 0.45, 0.55, 0.95, 0.8, 0.35];
const WEEK = [
  { day: 'M', v: 0.5 },
  { day: 'T', v: 0.92 },
  { day: 'W', v: 0.6 },
  { day: 'T', v: 0.88 },
  { day: 'F', v: 0.7 },
  { day: 'S', v: 0.4 },
  { day: 'S', v: 0.34 },
];

export default function AnalyticsAudience() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [compare, setCompare] = useState(false);

  const { ages, locations, devices } = analyticsSeed.audience;
  const ageRows = useMemo(() => nudge(ages, compare), [ages, compare]);
  const locRows = useMemo(() => nudge(locations, compare), [locations, compare]);
  const devRows = useMemo(() => nudge(devices, compare), [devices, compare]);

  const Bar = ({ row, accent }: { row: Row; accent: string }) => (
    <View style={styles.barRow}>
      <View style={styles.barHead}>
        <RNText style={styles.barLabel}>{row.label}</RNText>
        <RNText style={styles.barPct}>{row.value}%</RNText>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${Math.max(row.value, 3)}%`, backgroundColor: accent }]} />
      </View>
    </View>
  );

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ANALYTICS · 06" title="AUDIENCE" />} waves={false}>
      <RNText style={styles.title}>who's watching.</RNText>

      {/* Compare toggle */}
      <View style={styles.compareRow}>
        <Chip
          label={compare ? 'VS LAST PERIOD' : 'THIS PERIOD'}
          active={compare}
          accent={palette.electric}
          onPress={() => {
            setCompare((v) => !v);
            toast(compare ? 'Showing current period.' : 'Comparing to last 30 days.', 'default');
          }}
        />
        <RNText style={styles.compareHint}>tap to compare</RNText>
      </View>

      {/* AGE */}
      <Section eyebrow="BY AGE">
        <View style={styles.card}>
          {ageRows.map((r) => (
            <Bar key={r.label} row={r} accent={palette.ink} />
          ))}
        </View>
      </Section>

      {/* LOCATION */}
      <Section
        eyebrow="BY LOCATION"
        action={{ label: 'ALL', onPress: () => toast('Full geo breakdown coming soon.', 'default') }}
      >
        <View style={styles.card}>
          {locRows.map((r) => (
            <Bar key={r.label} row={r} accent={palette.electric} />
          ))}
        </View>
      </Section>

      {/* DEVICE */}
      <Section eyebrow="BY DEVICE">
        <View style={styles.deviceRow}>
          {devRows.map((r) => (
            <View key={r.label} style={styles.deviceCard}>
              <Ionicons
                name={r.label === 'MOBILE' ? 'phone-portrait-outline' : 'desktop-outline'}
                size={18}
                color={palette.ink}
              />
              <RNText style={styles.deviceVal}>{r.value}%</RNText>
              <RNText style={styles.deviceLabel}>{r.label}</RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* BEST TIME callout */}
      <Section eyebrow="ACTIVE TIMES">
        <Tap
          onPress={() => router.push('/(modules)/analytics/ai-insights')}
          style={styles.timeCard}
          burstColor={palette.acid}
        >
          <View style={styles.timeHead}>
            <View style={styles.timeIcon}>
              <Ionicons name="time-outline" size={20} color={palette.ink} />
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.timeKicker}>BEST TIME TO POST</RNText>
              <RNText style={styles.timeValue}>Tue & Thu, 6:40 PM</RNText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={palette.inkMuted} />
          </View>

          {/* hour heat row */}
          <View style={styles.heatRow}>
            {HEAT.map((h, i) => (
              <View key={i} style={styles.heatCol}>
                <View style={styles.heatTrack}>
                  <View
                    style={[
                      styles.heatFill,
                      {
                        height: `${Math.round(h * 100)}%`,
                        backgroundColor: h >= 0.85 ? palette.acid : palette.ink,
                        opacity: h >= 0.85 ? 1 : 0.4,
                      },
                    ]}
                  />
                </View>
                <RNText style={styles.heatLabel}>{HOURS[i]}</RNText>
              </View>
            ))}
          </View>
        </Tap>
      </Section>

      {/* Weekly activity */}
      <Section eyebrow="BUSIEST DAYS">
        <View style={styles.weekCard}>
          {WEEK.map((d, i) => (
            <View key={i} style={styles.weekCol}>
              <View style={styles.weekTrack}>
                <View
                  style={[
                    styles.weekFill,
                    {
                      height: `${Math.round(d.v * 100)}%`,
                      backgroundColor: d.v >= 0.85 ? palette.blush : palette.ink,
                      opacity: d.v >= 0.85 ? 1 : 0.45,
                    },
                  ]}
                />
              </View>
              <RNText style={styles.weekLabel}>{d.day}</RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* Top-fan overlap */}
      <Section eyebrow="OVERLAP">
        <RNText style={styles.note}>
          34% of your audience also follows @kore.odu. Your top fans drive most of the late-night spikes.
        </RNText>
        <ListCell
          icon="people-outline"
          title="See top fans"
          subtitle="Who shows up every drop"
          onPress={() => router.push('/(modules)/audience/top-fans')}
        />
        <ListCell
          icon="link-outline"
          title="Audience connections"
          subtitle="Shared follows & overlap"
          onPress={() => router.push('/(modules)/audience/connections')}
        />
      </Section>

      <Tap
        onPress={() => toast('Audience report exported to email.', 'success')}
        style={styles.exportRow}
        burstColor={palette.ink}
      >
        <Ionicons name="cloud-upload-outline" size={16} color={palette.ink} />
        <RNText style={styles.exportText}>EXPORT AUDIENCE REPORT</RNText>
      </Tap>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
      marginBottom: 16,
    },

    compareRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
    compareHint: { ...T.small, color: palette.inkMuted },

    card: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 12,
    },

    barRow: { gap: 7 },
    barHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
    barLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink },
    barPct: { ...T.label, color: palette.inkMuted },
    barTrack: { height: 6, borderRadius: 3, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    barFill: { height: 6, borderRadius: 3 },

    deviceRow: { flexDirection: 'row', gap: 10 },
    deviceCard: {
      flex: 1,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 16,
      gap: 6,
    },
    deviceVal: { fontFamily: fonts.displayBold, fontSize: 32, letterSpacing: -1, color: palette.ink },
    deviceLabel: { ...T.label, color: palette.inkMuted },

    timeCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 16,
    },
    timeHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    timeIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeKicker: { ...T.label, color: palette.inkMuted },
    timeValue: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.5, color: palette.ink, marginTop: 2 },

    heatRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 72 },
    heatCol: { flex: 1, alignItems: 'center', gap: 6 },
    heatTrack: {
      width: '100%',
      height: 52,
      borderRadius: 6,
      backgroundColor: palette.boneSoft,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    heatFill: { width: '100%', borderRadius: 6 },
    heatLabel: { fontFamily: fonts.body, fontSize: 9, color: palette.inkMuted },

    weekCard: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 8,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      height: 132,
    },
    weekCol: { flex: 1, alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' },
    weekTrack: {
      width: '100%',
      flex: 1,
      borderRadius: 6,
      backgroundColor: palette.boneSoft,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    weekFill: { width: '100%', borderRadius: 6 },
    weekLabel: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.5, color: palette.inkMuted },

    note: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20, color: palette.inkSoft, marginBottom: 10 },

    exportRow: {
      marginTop: 22,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    exportText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
