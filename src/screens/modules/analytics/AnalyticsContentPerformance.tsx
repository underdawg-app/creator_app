import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { analyticsSeed } from '@/data/mock';
import { useStore } from '@/store';

type Post = (typeof analyticsSeed.topContent)[number];
type SortKey = 'views' | 'likes' | 'rate';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'views', label: 'VIEWS' },
  { key: 'likes', label: 'LIKES' },
  { key: 'rate', label: 'ENG. RATE' },
];

const fmt = (n: number) => n.toLocaleString();

// Derive plausible per-post metrics from the two real numbers (views, likes).
function metricsFor(p: Post) {
  const impressions = Math.round(p.views * 1.34);
  const reach = Math.round(p.views * 0.92);
  const comments = Math.round(p.likes * 0.085);
  const saves = Math.round(p.likes * 0.21);
  const watchSec = Math.round((p.rate * 4.2 + 18));
  return {
    impressions,
    reach,
    likes: p.likes,
    comments,
    saves,
    rate: p.rate,
    watch: `${Math.floor(watchSec / 60)}m ${String(watchSec % 60).padStart(2, '0')}s`,
  };
}

export default function AnalyticsContentPerformance() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [sort, setSort] = useState<SortKey>('views');
  const [open, setOpen] = useState<Post | null>(null);

  const rows = useMemo(
    () => [...analyticsSeed.topContent].sort((a, b) => b[sort] - a[sort]),
    [sort],
  );

  const totalViews = useMemo(
    () => analyticsSeed.topContent.reduce((a, c) => a + c.views, 0),
    [],
  );
  const avgRate = useMemo(() => {
    const r = analyticsSeed.topContent.reduce((a, c) => a + c.rate, 0) / analyticsSeed.topContent.length;
    return Math.round(r * 10) / 10;
  }, []);

  const primary = (p: Post) =>
    sort === 'views' ? fmt(p.views) : sort === 'likes' ? fmt(p.likes) : `${p.rate}%`;
  const primaryLabel = sort === 'views' ? 'VIEWS' : sort === 'likes' ? 'LIKES' : 'ENG. RATE';

  const detail = open ? metricsFor(open) : null;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ANALYTICS" title="CONTENT" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        what's working.
      </RNText>

      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="TOTAL VIEWS" value={totalViews} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="AVG ENG RATE" value={avgRate} suffix="%" size="md" accent={palette.acid} />
        </View>
      </View>

      <View style={styles.sortRow}>
        {SORTS.map((s) => (
          <Chip
            key={s.key}
            label={s.label}
            size="sm"
            active={sort === s.key}
            accent={palette.ink}
            onPress={() => setSort(s.key)}
          />
        ))}
      </View>

      <Section eyebrow={`RANKED BY ${primaryLabel} / LAST 30 DAYS`}>
        {rows.map((c, i) => (
          <Pressable key={c.id} onPress={() => setOpen(c)} style={styles.row}>
            <RNText style={styles.rank}>{String(i + 1).padStart(2, '0')}</RNText>
            <View style={{ flex: 1 }}>
              <RNText style={styles.rowTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {c.title}
              </RNText>
              <RNText style={styles.rowSub} numberOfLines={1}>
                {fmt(c.views)} views · {fmt(c.likes)} likes · {c.rate}%
              </RNText>
            </View>
            <View style={styles.primaryCol}>
              <RNText style={styles.primaryValue}>{primary(c)}</RNText>
              <RNText style={styles.primaryLabel}>{primaryLabel}</RNText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={palette.inkMuted} />
          </Pressable>
        ))}
      </Section>

      <Sheet
        visible={!!open}
        onClose={() => setOpen(null)}
        eyebrow="POST BREAKDOWN"
        title={open?.title ?? ''}
      >
        {open && detail ? (
          <View style={{ gap: 0 }}>
            <View style={styles.statGrid}>
              <Stat styles={styles} label="IMPRESSIONS" value={fmt(detail.impressions)} />
              <Stat styles={styles} label="REACH" value={fmt(detail.reach)} />
            </View>
            <View style={styles.statGrid}>
              <Stat styles={styles} label="LIKES" value={fmt(detail.likes)} />
              <Stat styles={styles} label="COMMENTS (EST)" value={fmt(detail.comments)} />
            </View>
            <View style={styles.statGrid}>
              <Stat styles={styles} label="SAVES (EST)" value={fmt(detail.saves)} />
              <Stat styles={styles} label="ENG RATE" value={`${detail.rate}%`} accent={palette.electric} />
            </View>
            <View style={styles.statGrid}>
              <Stat styles={styles} label="AVG WATCH TIME" value={detail.watch} accent={palette.acid} wide />
            </View>

            <Pressable
              onPress={() => {
                toast(`Opening "${open.title}"...`, 'default');
                setOpen(null);
              }}
              style={styles.cta}
            >
              <RNText style={styles.ctaLabel}>VIEW POST</RNText>
              <View style={styles.ctaArrow}>
                <Ionicons name="arrow-forward" size={16} color={palette.ink} />
              </View>
            </Pressable>
          </View>
        ) : null}
      </Sheet>
    </ScreenFrame>
  );
}

function Stat({
  styles,
  label,
  value,
  accent,
  wide,
}: {
  styles: ReturnType<typeof makeStyles>;
  label: string;
  value: string;
  accent?: string;
  wide?: boolean;
}) {
  return (
    <View style={[styles.statCard, wide && { flex: 1 }]}>
      <RNText style={styles.statLabel}>{label}</RNText>
      <RNText style={[styles.statValue, accent ? { color: accent } : null]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>
        {value}
      </RNText>
    </View>
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

    metricGrid: { flexDirection: 'row', gap: 10 },

    sortRow: { flexDirection: 'row', gap: 8, marginTop: 22, marginBottom: 2 },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    rank: {
      fontFamily: fonts.displayBold,
      fontSize: 24,
      color: palette.ink,
      opacity: 0.32,
      width: 34,
    },
    rowTitle: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.5, color: palette.ink },
    rowSub: { ...T.small, color: palette.inkMuted, marginTop: 3 },
    primaryCol: { alignItems: 'flex-end', gap: 2 },
    primaryValue: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.4, color: palette.ink },
    primaryLabel: { ...T.micro, color: palette.inkMuted },

    statGrid: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    statCard: {
      flex: 1,
      padding: 14,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      gap: 8,
    },
    statLabel: { ...T.micro, color: palette.inkMuted },
    statValue: { fontFamily: fonts.displayBold, fontSize: 26, letterSpacing: -0.8, color: palette.ink },

    cta: {
      marginTop: 8,
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
  });
