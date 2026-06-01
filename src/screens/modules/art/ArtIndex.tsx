import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, ScrollView } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';
import { MediaThumb } from '@/components/svg/MediaThumb';
import { Asterisk, ArrowMark } from '@/components/svg/Marks';
import { useStore } from '@/store';
import type { Artwork } from '@/data/mock';

const KIND_FILTERS = ['ALL', 'ORIGINAL', 'LIMITED PRINT', 'OPEN PRINT', 'DIGITAL'];

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

const formatINR = (n: number) => {
  if (!Number.isFinite(n) || n <= 0) return '0';
  if (n >= 100000) {
    const lakhs = n / 100000;
    return `${lakhs.toFixed(lakhs >= 10 ? 1 : 2).replace(/\.?0+$/, '')}L`;
  }
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(Math.round(n));
};

export default function ArtHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const artworks = useStore((s) => s.artworks);
  const commissions = useStore((s) => s.commissions);
  const [filter, setFilter] = useState('ALL');

  const filtered = useMemo(() => {
    if (filter === 'ALL') return artworks;
    return artworks.filter((a) => a.kind === filter);
  }, [artworks, filter]);

  const sold = artworks.filter((a) => !a.available).length;
  const totalValue = artworks
    .filter((a) => a.available)
    .reduce((s, a) => s + a.price, 0);

  return (
    <ScreenFrame
      header={<ModuleHeader title="ART MARKET" />}
      contentStyle={styles.screenContent}
      footer={
        <View style={styles.footerWrap}>
          <MagneticButton
            label="LIST NEW ART"
            size="lg"
            background={palette.ink}
            foreground={palette.bone}
            onPress={() => router.push('/(modules)/art/list')}
          />
        </View>
      }
    >
      <View style={styles.heading}>
        <RNText style={styles.headingLine1} maxFontSizeMultiplier={1.1}>
          ART
        </RNText>
        <RNText style={styles.headingItalic} maxFontSizeMultiplier={1.1}>
          market.
        </RNText>
      </View>

      <View style={styles.metricsRow}>
        <Metric label="LISTED" value={String(artworks.length).padStart(2, '0')} />
        <View style={styles.metricSep} />
        <Metric
          label="SOLD"
          value={String(sold).padStart(2, '0')}
          accent={palette.electric}
        />
        <View style={styles.metricSep} />
        <Metric
          label="VALUE"
          value={`₹${formatINR(totalValue)}`}
          accent={palette.acid}
        />
      </View>

      <View style={styles.commissionsCard}>
        <Tap
          onPress={() => router.push('/(modules)/art/commissions')}
          burstColor={palette.blush}
          style={[styles.commissionsTap, { backgroundColor: palette.blush }]}
        >
          <View style={styles.commissionsLeft}>
            <RNText style={styles.commissionsEyebrow}>COMMISSIONS</RNText>
            <RNText style={styles.commissionsTitle} maxFontSizeMultiplier={1.1}>
              {commissions.length} active
            </RNText>
            <RNText style={styles.commissionsBody}>
              briefs from collectors and editors
            </RNText>
          </View>
          <ArrowMark size={18} color={staticPalette.ink} strokeWidth={1.8} />
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
          {KIND_FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              active={filter === f}
              onPress={() => setFilter(f)}
              accent={palette.electric}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.listHead}>
        <RNText style={styles.listEyebrow}>LISTINGS · {filtered.length}</RNText>
        <RNText style={styles.listTitle} maxFontSizeMultiplier={1.1}>
          your work.
        </RNText>
      </View>

      <View style={styles.list}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <RNText style={styles.emptyText}>
              nothing in this category yet.
            </RNText>
          </View>
        ) : (
          <>
            <FeaturedArt artwork={filtered[0]} />
            {chunkPairs(filtered.slice(1)).map(([a, b], i) => (
              <View key={`row-${i}`} style={styles.gridRow}>
                <View style={{ flex: 1 }}>
                  <CompactArt artwork={a} />
                </View>
                <View style={{ flex: 1 }}>
                  {b ? <CompactArt artwork={b} /> : null}
                </View>
              </View>
            ))}
          </>
        )}
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
  value: string;
  accent?: string;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.metric}>
      <RNText style={styles.metricLabel}>{label}</RNText>
      <RNText
        style={[styles.metricValue, { color: accent ?? palette.ink }]}
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

function FeaturedArt({ artwork }: { artwork: Artwork }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const c = readableOn(artwork.color);

  return (
    <Tap
      onPress={() => router.push(`/(modules)/art/${artwork.id}` as any)}
      burstColor={c.isDark ? staticPalette.bone : staticPalette.ink}
      variant="heavy"
      style={[styles.featuredCard, { backgroundColor: artwork.color }]}
    >
      <View style={styles.featuredThumb}>
        <MediaThumb
          size={180}
          color={c.fg}
          ink={c.fg}
          variant={artwork.kind === 'DIGITAL' ? 'grid' : 'lens'}
        />
      </View>
      <View style={styles.featuredInner}>
        <View style={styles.featuredTopRow}>
          <RNText style={[styles.kindLabel, { color: c.fg }]}>
            {artwork.kind}
          </RNText>
          {!artwork.available ? (
            <View
              style={[
                styles.soldPill,
                { backgroundColor: c.fg },
              ]}
            >
              <RNText
                style={[
                  styles.soldPillText,
                  { color: c.isDark ? staticPalette.ink : staticPalette.bone },
                ]}
              >
                SOLD
              </RNText>
            </View>
          ) : null}
        </View>
        <RNText
          style={[styles.featuredTitle, { color: c.fg }]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
          maxFontSizeMultiplier={1.1}
        >
          {artwork.title}
        </RNText>
        <RNText
          style={[styles.featuredMedium, { color: c.mute }]}
          numberOfLines={1}
          maxFontSizeMultiplier={1.15}
        >
          {artwork.medium}
        </RNText>
        <View style={[styles.featuredFoot, { borderTopColor: c.line }]}>
          <View style={{ flex: 1 }}>
            <RNText style={[styles.priceEyebrow, { color: c.mute }]}>
              PRICE
            </RNText>
            <RNText
              style={[styles.priceValue, { color: c.fg }]}
              maxFontSizeMultiplier={1.1}
            >
              ₹{artwork.price.toLocaleString('en-IN')}
            </RNText>
          </View>
          <View style={styles.featuredMetaRight}>
            <RNText style={[styles.metaSmall, { color: c.mute }]}>
              {artwork.year}
            </RNText>
            {artwork.edition ? (
              <RNText style={[styles.metaSmall, { color: c.mute }]}>
                {artwork.edition}
              </RNText>
            ) : artwork.dimensions ? (
              <RNText style={[styles.metaSmall, { color: c.mute }]}>
                {artwork.dimensions}
              </RNText>
            ) : null}
          </View>
        </View>
      </View>
    </Tap>
  );
}

function CompactArt({ artwork }: { artwork: Artwork }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const c = readableOn(artwork.color);

  return (
    <Tap
      onPress={() => router.push(`/(modules)/art/${artwork.id}` as any)}
      burstColor={c.isDark ? staticPalette.bone : staticPalette.ink}
      variant="heavy"
      style={[styles.compactCard, { backgroundColor: artwork.color }]}
    >
      <View style={styles.compactThumb}>
        <MediaThumb
          size={100}
          color={c.fg}
          ink={c.fg}
          variant={artwork.kind === 'DIGITAL' ? 'grid' : 'lens'}
        />
      </View>
      <View style={styles.compactInner}>
        <RNText style={[styles.kindLabelSm, { color: c.mute }]}>
          {artwork.kind}
        </RNText>
        <RNText
          style={[styles.compactTitle, { color: c.fg }]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          maxFontSizeMultiplier={1.1}
        >
          {artwork.title}
        </RNText>
        <View style={[styles.compactDivider, { backgroundColor: c.line }]} />
        <RNText
          style={[styles.compactPrice, { color: c.fg }]}
          maxFontSizeMultiplier={1.1}
        >
          ₹{formatINR(artwork.price)}
        </RNText>
      </View>
    </Tap>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screenContent: { paddingHorizontal: 12, paddingBottom: 24 },

    heading: { marginTop: 4 },
    headingLine1: {
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
      color: palette.electric,
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
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -0.8,
    },

    commissionsCard: {
      marginTop: 16,
      borderRadius: 22,
      overflow: 'hidden',
    },
    commissionsTap: {
      paddingVertical: 16,
      paddingHorizontal: 18,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    commissionsLeft: { flex: 1, gap: 2 },
    commissionsEyebrow: {
      ...T.label,
      color: staticPalette.ink,
      opacity: 0.65,
      letterSpacing: 1.6,
      fontSize: 10,
    },
    commissionsTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.6,
      color: staticPalette.ink,
    },
    commissionsBody: {
      ...T.small,
      color: staticPalette.ink,
      opacity: 0.65,
      marginTop: 2,
    },

    filterBlock: { marginTop: 28 },
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
      marginTop: 14,
      paddingTop: 14,
      borderTopWidth: 1,
      borderColor: palette.lineDark,
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

    list: { marginTop: 14, gap: 12 },
    gridRow: { flexDirection: 'row', gap: 12 },

    featuredCard: {
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
      minHeight: 280,
    },
    featuredThumb: {
      position: 'absolute',
      right: -10,
      top: 8,
      opacity: 0.75,
    },
    featuredInner: { padding: 18, gap: 10, flex: 1, justifyContent: 'flex-end' },
    featuredTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    featuredTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -0.8,
    },
    featuredMedium: {
      ...T.small,
      fontSize: 12,
    },
    featuredFoot: {
      marginTop: 8,
      paddingTop: 14,
      borderTopWidth: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    featuredMetaRight: { alignItems: 'flex-end', gap: 4 },
    priceEyebrow: {
      ...T.label,
      letterSpacing: 1.6,
      fontSize: 10,
    },
    priceValue: {
      fontFamily: fonts.displayBold,
      fontSize: 24,
      lineHeight: 26,
      letterSpacing: -0.6,
      marginTop: 4,
    },
    metaSmall: {
      ...T.label,
      letterSpacing: 1.4,
      fontSize: 10,
    },
    kindLabel: {
      ...T.label,
      letterSpacing: 1.8,
    },
    kindLabelSm: {
      ...T.label,
      letterSpacing: 1.4,
      fontSize: 10,
    },
    soldPill: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 999,
    },
    soldPillText: {
      ...T.label,
      letterSpacing: 1.8,
      fontSize: 10,
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
    compactThumb: {
      position: 'absolute',
      right: -10,
      top: 8,
      opacity: 0.75,
    },
    compactInner: { padding: 12, gap: 6, flex: 1 },
    compactTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: -0.5,
      marginTop: 2,
    },
    compactDivider: { height: 1, marginTop: 'auto' },
    compactPrice: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: -0.4,
      marginTop: 6,
    },

    empty: {
      paddingVertical: 60,
      alignItems: 'center',
    },
    emptyText: {
      ...T.body,
      color: palette.mute,
      fontFamily: fonts.editorialItalic,
    },

    footerWrap: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      backgroundColor: palette.bone,
    },
  });
