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
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { platformSeed, type Platform } from '@/data/mock';

type Metric = 'FOLLOWERS' | 'GROWTH' | 'ENGAGEMENT';

const PLATFORM_ICON: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  ig: 'logo-instagram',
  tt: 'logo-tiktok',
  yt: 'logo-youtube',
  tw: 'logo-twitter',
  sp: 'musical-notes-outline',
  tv: 'videocam-outline',
};

// The seed has no engagement field, so derive a stable proxy from
// followers + growth — bigger, faster platforms read as more engaged.
const engagementOf = (p: Platform) =>
  Math.round(p.followers * (0.05 + p.growth / 200));

const metricValue = (p: Platform, metric: Metric) => {
  if (metric === 'GROWTH') return p.growth;
  if (metric === 'ENGAGEMENT') return engagementOf(p);
  return p.followers;
};

export default function AnalyticsCrossPlatform() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const [metric, setMetric] = useState<Metric>('FOLLOWERS');
  const [open, setOpen] = useState<Platform | null>(null);

  // Show platforms that carry any audience (connected or with followers).
  const rows = useMemo(
    () =>
      platformSeed
        .filter((p) => p.connected || p.followers > 0)
        .slice()
        .sort((a, b) => metricValue(b, metric) - metricValue(a, metric)),
    [metric],
  );

  const totalFollowers = useMemo(
    () => rows.reduce((a, p) => a + p.followers, 0),
    [rows],
  );
  const best = useMemo(
    () => rows.reduce((m, p) => (p.growth > m.growth ? p : m), rows[0]),
    [rows],
  );
  const maxMetric = Math.max(...rows.map((p) => metricValue(p, metric)), 1);

  const fmt = (p: Platform) => {
    const v = metricValue(p, metric);
    if (metric === 'GROWTH') return `+${v.toFixed(1)}%`;
    return v.toLocaleString();
  };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="ANALYTICS" title="CROSS-PLATFORM" />}
      waves={false}
    >
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>
        everywhere at once.
      </RNText>

      <View style={styles.heroRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="UNIFIED REACH" value={totalFollowers} size="lg" accent={palette.acid} />
        </View>
      </View>

      {/* Best performing callout */}
      <Tap onPress={() => setOpen(best)} style={styles.bestCard} burstColor={best.accent}>
        <View style={[styles.bestDot, { backgroundColor: best.accent }]}>
          <Ionicons name="trending-up-outline" size={18} color={palette.ink} />
        </View>
        <View style={{ flex: 1 }}>
          <RNText style={styles.bestEyebrow}>BEST PERFORMING</RNText>
          <RNText style={styles.bestName}>{best.name}</RNText>
        </View>
        <View style={[styles.bestPill, { backgroundColor: best.accent }]}>
          <RNText style={styles.bestPillText}>+{best.growth.toFixed(1)}%</RNText>
        </View>
      </Tap>

      {/* Metric toggle */}
      <View style={styles.chips}>
        {(['FOLLOWERS', 'GROWTH', 'ENGAGEMENT'] as Metric[]).map((m) => (
          <Chip
            key={m}
            label={m}
            size="sm"
            active={metric === m}
            accent={palette.ink}
            onPress={() => setMetric(m)}
          />
        ))}
      </View>

      <Section eyebrow={`BY ${metric}`}>
        {rows.map((p) => {
          const pct = Math.round((metricValue(p, metric) / maxMetric) * 100);
          return (
            <Pressable key={p.key} onPress={() => setOpen(p)} style={styles.row}>
              <View style={styles.rowHead}>
                <View style={[styles.platIcon, { borderColor: p.accent }]}>
                  <Ionicons name={PLATFORM_ICON[p.key] ?? 'globe-outline'} size={15} color={palette.ink} />
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.rowName} numberOfLines={1}>
                    {p.name}
                  </RNText>
                  <RNText style={styles.rowMeta} numberOfLines={1}>
                    {p.handle}
                    {!p.connected ? '  ·  not connected' : ''}
                  </RNText>
                </View>
                <RNText style={styles.rowValue}>{fmt(p)}</RNText>
                <Ionicons name="chevron-forward" size={16} color={palette.inkMuted} />
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${Math.max(pct, 3)}%`, backgroundColor: p.accent }]} />
              </View>
            </Pressable>
          );
        })}
      </Section>

      <Tap
        onPress={() => router.push('/(modules)/audience/connections')}
        style={styles.cta}
        burstColor={palette.bone}
      >
        <RNText style={styles.ctaLabel}>MANAGE CONNECTIONS</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </View>
      </Tap>

      {/* Per-platform detail sheet */}
      <Sheet
        visible={open != null}
        onClose={() => setOpen(null)}
        eyebrow={open?.connected ? 'CONNECTED' : 'AVAILABLE'}
        title={open?.name ?? ''}
      >
        {open ? (
          <View style={{ gap: 14 }}>
            <RNText style={styles.sheetHandle}>{open.handle}</RNText>
            <View style={styles.sheetStats}>
              <View style={{ flex: 1 }}>
                <MetricCard label="FOLLOWERS" value={open.followers} size="sm" accent={open.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <MetricCard label="ENGAGEMENT" value={engagementOf(open)} size="sm" accent={palette.electric} />
              </View>
            </View>
            <View style={styles.sheetMetaRow}>
              <RNText style={styles.sheetMetaLabel}>GROWTH</RNText>
              <RNText style={styles.sheetMetaValue}>+{open.growth.toFixed(1)}%</RNText>
            </View>
            <View style={styles.sheetMetaRow}>
              <RNText style={styles.sheetMetaLabel}>SHARE OF REACH</RNText>
              <RNText style={styles.sheetMetaValue}>
                {Math.round((open.followers / (totalFollowers || 1)) * 100)}%
              </RNText>
            </View>
            <Tap
              onPress={() => {
                setOpen(null);
                router.push('/(modules)/audience/connections');
              }}
              style={styles.sheetCta}
              burstColor={palette.bone}
            >
              <RNText style={styles.ctaLabel}>OPEN CONNECTION</RNText>
              <View style={styles.ctaArrow}>
                <Ionicons name="arrow-forward" size={16} color={palette.ink} />
              </View>
            </Tap>
          </View>
        ) : null}
      </Sheet>
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
      marginBottom: 18,
    },
    heroRow: { flexDirection: 'row' },

    bestCard: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    bestDot: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bestEyebrow: { ...T.label, color: palette.inkMuted },
    bestName: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.4, color: palette.ink, marginTop: 2 },
    bestPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
    bestPillText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1, color: staticPalette.ink },

    chips: { flexDirection: 'row', gap: 8, marginTop: 22, marginBottom: 4 },

    row: { gap: 9, paddingVertical: 9 },
    rowHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    platIcon: {
      width: 30,
      height: 30,
      borderRadius: 9,
      borderWidth: 1,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowName: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink },
    rowMeta: { ...T.small, color: palette.inkMuted, marginTop: 1 },
    rowValue: { fontFamily: fonts.body, fontSize: 14, color: palette.ink },
    barTrack: { height: 6, borderRadius: 3, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    barFill: { height: 6, borderRadius: 3 },

    cta: {
      marginTop: 22,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    sheetHandle: { ...T.body, color: palette.inkMuted, marginTop: -4 },
    sheetStats: { flexDirection: 'row', gap: 10 },
    sheetMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    sheetMetaLabel: { ...T.label, color: palette.inkMuted },
    sheetMetaValue: { fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: -0.2, color: palette.ink },
    sheetCta: {
      marginTop: 6,
      height: 56,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
  });
