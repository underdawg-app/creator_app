import React, { useMemo } from 'react';
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
import { MetricCard } from '@/components/ui/MetricCard';
import { useStore } from '@/store';

// Underdawg-owned audience (email + landing), kept separate from rented platforms.
const UNDERDAWG_COUNT = 6_200;

// Real Ionicons per platform key.
const PLATFORM_ICON: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  ig: 'logo-instagram',
  tt: 'logo-tiktok',
  yt: 'logo-youtube',
  tw: 'logo-twitter',
  sp: 'musical-notes-outline',
  tv: 'logo-twitch',
};

export default function AudienceIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const platforms = useStore((s) => s.platforms);

  const { connected, rented, total } = useMemo(() => {
    const conn = platforms.filter((p) => p.connected);
    const r = conn.reduce((a, p) => a + p.followers, 0);
    return { connected: conn, rented: r, total: r + UNDERDAWG_COUNT };
  }, [platforms]);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="AUDIENCE" title="REACH" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        your reach,{'\n'}all of it.
      </RNText>

      {/* Total cross-platform reach */}
      <View style={styles.heroRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="TOTAL REACH" value={total} delta={5.6} size="lg" accent={palette.acid} />
        </View>
      </View>
      <View style={styles.splitRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="RENTED" value={rented} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard
            label="UNDERDAWG"
            value={UNDERDAWG_COUNT}
            delta={18.4}
            size="md"
            accent={palette.electric}
          />
        </View>
      </View>

      {/* Per-platform breakdown with share-of-total bars */}
      <Section
        eyebrow="WHERE THEY ARE"
        action={{ label: 'MANAGE', onPress: () => router.push('/(modules)/audience/connections') }}
      >
        {/* Underdawg-owned row, anchored on top. */}
        <Pressable
          onPress={() => router.push('/(modules)/audience/top-fans')}
          style={styles.row}
        >
          <View style={styles.rowHead}>
            <View style={[styles.dot, { backgroundColor: palette.electric }]}>
              <Ionicons name="paw-outline" size={12} color={palette.bone} />
            </View>
            <RNText style={styles.rowName}>UNDERDAWG</RNText>
            <RNText style={styles.rowCount}>{UNDERDAWG_COUNT.toLocaleString()}</RNText>
            <RNText style={styles.rowPct}>{Math.round((UNDERDAWG_COUNT / total) * 100)}%</RNText>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${Math.max(Math.round((UNDERDAWG_COUNT / total) * 100), 4)}%`,
                  backgroundColor: palette.electric,
                },
              ]}
            />
          </View>
        </Pressable>

        {connected.map((p) => {
          const pct = Math.round((p.followers / total) * 100);
          return (
            <Pressable
              key={p.key}
              onPress={() => router.push('/(modules)/analytics/cross-platform')}
              style={styles.row}
            >
              <View style={styles.rowHead}>
                <View style={[styles.dot, { backgroundColor: p.accent }]}>
                  <Ionicons name={PLATFORM_ICON[p.key] ?? 'globe-outline'} size={12} color={palette.ink} />
                </View>
                <RNText style={styles.rowName}>{p.name}</RNText>
                <RNText style={styles.rowCount}>{p.followers.toLocaleString()}</RNText>
                <RNText style={styles.rowPct}>{pct}%</RNText>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, { width: `${Math.max(pct, 4)}%`, backgroundColor: palette.ink }]}
                />
              </View>
            </Pressable>
          );
        })}
      </Section>

      {/* Growth deltas per platform */}
      <Section
        eyebrow="GROWTH · 30D"
        action={{ label: 'ANALYTICS', onPress: () => router.push('/(modules)/analytics/cross-platform') }}
      >
        <View style={styles.growthWrap}>
          {connected.map((p) => (
            <Pressable
              key={p.key}
              onPress={() => router.push('/(modules)/analytics/cross-platform')}
              style={styles.growthCard}
            >
              <Ionicons name={PLATFORM_ICON[p.key] ?? 'globe-outline'} size={16} color={palette.ink} />
              <RNText style={styles.growthName}>{p.name}</RNText>
              <View style={styles.growthDeltaRow}>
                <Ionicons name="trending-up-outline" size={13} color={palette.electric} />
                <RNText style={styles.growthDelta}>+{p.growth.toFixed(1)}%</RNText>
              </View>
            </Pressable>
          ))}
        </View>
      </Section>

      {/* Deep links */}
      <Section eyebrow="GO DEEP">
        <ListCell
          icon="link-outline"
          title="Manage connections"
          subtitle={`${connected.length} / ${platforms.length} platforms linked`}
          onPress={() => router.push('/(modules)/audience/connections')}
        />
        <ListCell
          icon="star-outline"
          title="Top fans"
          subtitle="Your most engaged followers across platforms"
          onPress={() => router.push('/(modules)/audience/top-fans')}
        />
        <ListCell
          icon="bar-chart-outline"
          title="Cross-platform analytics"
          subtitle="Reach, overlap and audience breakdown"
          onPress={() => router.push('/(modules)/analytics/cross-platform')}
        />
      </Section>
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
    splitRow: { flexDirection: 'row', gap: 10, marginTop: 10 },

    row: { gap: 8, paddingVertical: 7 },
    rowHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    dot: {
      width: 22,
      height: 22,
      borderRadius: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowName: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.2,
      color: palette.ink,
      flex: 1,
    },
    rowCount: { fontFamily: fonts.body, fontSize: 14, color: palette.ink },
    rowPct: { ...T.label, color: palette.inkMuted, width: 36, textAlign: 'right' },
    barTrack: { height: 6, borderRadius: 3, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    barFill: { height: 6, borderRadius: 3 },

    growthWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    growthCard: {
      width: '47.5%',
      flexGrow: 1,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 14,
      gap: 8,
    },
    growthName: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.inkMuted,
    },
    growthDeltaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    growthDelta: {
      fontFamily: fonts.displayBold,
      fontSize: 20,
      letterSpacing: -0.6,
      color: palette.ink,
    },
  });
