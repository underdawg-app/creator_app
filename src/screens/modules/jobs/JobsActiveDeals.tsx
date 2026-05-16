import React, { useMemo } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { ArrowMark } from '@/components/svg/Marks';
import { useStore } from '@/store';
import { jobsSeed, type Deal } from '@/data/mock';
import { router } from '@/navigation';

const formatINR = (n: number) => {
  if (!Number.isFinite(n) || n <= 0) return '0';
  if (n >= 100000) {
    const lakhs = n / 100000;
    return `${lakhs.toFixed(lakhs >= 10 ? 1 : 2).replace(/\.?0+$/, '')}L`;
  }
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(Math.round(n));
};

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
    track: isDark ? 'rgba(242,239,230,0.18)' : 'rgba(10,10,10,0.12)',
    isDark,
  };
}

export default function ActiveDeals() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const deals = useStore((s) => s.deals);
  const apps = useStore((s) => s.applications);
  const advance = useStore((s) => s.advanceDeal);
  const toast = useStore((s) => s.toast);

  const totalValue = useMemo(
    () => deals.reduce((sum, d) => sum + (d.amount || 0), 0),
    [deals],
  );

  return (
    <ScreenFrame header={<ModuleHeader title="MY DEALS" />}>
      <View style={styles.heading}>
        <RNText style={styles.headingLine1} maxFontSizeMultiplier={1.1}>
          DEALS
        </RNText>
        <RNText style={styles.headingLine2} maxFontSizeMultiplier={1.1}>
          IN
          <RNText style={styles.headingItalic}> motion.</RNText>
        </RNText>
      </View>

      <View style={styles.metricsRow}>
        <Metric label="VALUE" value={`₹${formatINR(totalValue)}`} accent={palette.acid} />
        <View style={styles.metricSep} />
        <Metric label="ACTIVE" value={String(deals.length).padStart(2, '0')} />
        <View style={styles.metricSep} />
        <Metric label="APPLIED" value={String(apps.length).padStart(2, '0')} accent={palette.electric} />
      </View>

      <View style={styles.sectionHead}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.sectionEyebrow}>OPEN DEALS</RNText>
          <RNText style={styles.sectionTitle} maxFontSizeMultiplier={1.1}>
            tap to advance.
          </RNText>
        </View>
      </View>

      {deals.length === 0 ? (
        <EmptyDeals
          onBrowse={() => router.push('/(modules)/jobs')}
        />
      ) : (
        <View style={styles.list}>
          {deals.map((d, i) => (
            <DealCard
              key={d.id}
              deal={d}
              index={i}
              onAdvance={() => {
                advance(d.id);
                toast(`${d.title} advanced.`, 'success');
              }}
            />
          ))}
        </View>
      )}

      <View style={styles.sectionHead}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.sectionEyebrow}>APPLIED · {apps.length}</RNText>
          <RNText style={styles.sectionTitle} maxFontSizeMultiplier={1.1}>
            <RNText style={styles.sectionTitleItalic}>waiting</RNText> on brands.
          </RNText>
        </View>
      </View>

      {apps.length === 0 ? (
        <View style={styles.emptyApps}>
          <RNText style={styles.emptyAppsText} maxFontSizeMultiplier={1.15}>
            no applications out yet.
          </RNText>
        </View>
      ) : (
        <View style={styles.appsList}>
          {apps.map((a, i) => {
            const job = jobsSeed.find((j) => j.id === a.jobId);
            return (
              <View key={a.id} style={styles.appRow}>
                <RNText style={styles.appNum}>
                  {String(i + 1).padStart(2, '0')}
                </RNText>
                <View style={{ flex: 1 }}>
                  <RNText
                    style={styles.appTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                  >
                    {job?.title ?? 'Job'}
                  </RNText>
                  <RNText style={styles.appMeta} maxFontSizeMultiplier={1.15}>
                    ₹{a.rate.toLocaleString('en-IN')} · {a.timeline || '—'}
                  </RNText>
                </View>
                <View
                  style={[
                    styles.statusPill,
                    {
                      borderColor:
                        a.status === 'SHORTLISTED'
                          ? palette.acid
                          : a.status === 'REJECTED'
                          ? palette.ember
                          : palette.lineDark,
                    },
                  ]}
                >
                  <RNText style={styles.statusPillText}>{a.status}</RNText>
                </View>
              </View>
            );
          })}
        </View>
      )}
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
          { color: accent ?? palette.ink },
        ]}
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

function DealCard({
  deal,
  index,
  onAdvance,
}: {
  deal: Deal;
  index: number;
  onAdvance: () => void;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  const pct = Math.round(deal.progress * 100);
  const c = readableOn(deal.accent);

  return (
    <Tap
      onPress={onAdvance}
      burstColor={c.isDark ? staticPalette.bone : staticPalette.ink}
      variant="heavy"
      style={[styles.card, { backgroundColor: deal.accent }]}
    >
      <View style={styles.cardInner}>
        <View style={styles.cardTopRow}>
          <View style={styles.cardTopLeft}>
            <RNText style={[styles.cardNum, { color: c.mute }]}>
              {String(index + 1).padStart(2, '0')}
            </RNText>
            <View style={[styles.statusDot, { backgroundColor: c.fg }]} />
            <RNText
              style={[styles.cardStatus, { color: c.fg }]}
              maxFontSizeMultiplier={1.1}
            >
              {deal.status}
            </RNText>
          </View>
          <RNText
            style={[styles.cardAmount, { color: c.fg }]}
            maxFontSizeMultiplier={1.1}
          >
            {deal.amount > 0 ? `₹${formatINR(deal.amount)}` : 'TBD'}
          </RNText>
        </View>

        <RNText
          style={[styles.cardTitle, { color: c.fg }]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
          maxFontSizeMultiplier={1.1}
        >
          {deal.title}
        </RNText>

        <RNText style={[styles.cardBrand, { color: c.mute }]} maxFontSizeMultiplier={1.15}>
          {deal.brand}
        </RNText>

        <View style={styles.progressBlock}>
          <View style={styles.progressLabels}>
            <RNText style={[styles.progressLabel, { color: c.mute }]}>PROGRESS</RNText>
            <RNText
              style={[styles.progressPct, { color: c.fg }]}
              maxFontSizeMultiplier={1.1}
            >
              {pct}%
            </RNText>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: c.track }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${pct}%`, backgroundColor: c.fg },
              ]}
            />
          </View>
        </View>

        <View style={[styles.advanceRow, { borderTopColor: c.line }]}>
          <View style={{ flex: 1 }}>
            <RNText style={[styles.nextLabel, { color: c.mute }]}>NEXT</RNText>
            <RNText
              style={[styles.nextAction, { color: c.fg }]}
              numberOfLines={2}
              maxFontSizeMultiplier={1.15}
            >
              {deal.nextAction}
            </RNText>
          </View>
          <View style={[styles.advanceBtn, { borderColor: c.line }]}>
            <ArrowMark size={16} color={c.fg} strokeWidth={1.6} />
          </View>
        </View>
      </View>
    </Tap>
  );
}

function EmptyDeals({ onBrowse }: { onBrowse: () => void }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.empty}>
      <RNText style={styles.emptyTitle} maxFontSizeMultiplier={1.1}>
        nothing <RNText style={styles.emptyTitleItalic}>yet.</RNText>
      </RNText>
      <RNText style={styles.emptyBody} maxFontSizeMultiplier={1.2}>
        Apply to a few jobs and your deals will land here.
      </RNText>
      <Tap
        onPress={onBrowse}
        burstColor={palette.acid}
        style={[styles.emptyCta, { backgroundColor: palette.acid }]}
      >
        <RNText style={styles.emptyCtaText}>BROWSE JOBS</RNText>
        <ArrowMark size={14} color={staticPalette.ink} strokeWidth={1.8} />
      </Tap>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    heading: { marginTop: 4 },
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
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -0.8,
    },

    sectionHead: {
      marginTop: 32,
      borderTopWidth: 1,
      borderColor: palette.lineDark,
      paddingTop: 14,
      paddingBottom: 4,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    sectionEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
      marginBottom: 6,
    },
    sectionTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 32,
      lineHeight: 34,
      letterSpacing: -1,
      color: palette.ink,
    },
    sectionTitleItalic: {
      fontFamily: fonts.editorialItalic,
      color: palette.ember,
    },

    list: { marginTop: 14, gap: 14 },
    card: {
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    cardInner: { padding: 18, gap: 12 },
    cardTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardTopLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    cardNum: {
      fontFamily: fonts.displayBold,
      fontSize: 12,
      letterSpacing: 0.4,
      color: palette.ink,
      opacity: 0.4,
    },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    cardStatus: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.8,
    },
    cardAmount: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.6,
      color: palette.ink,
    },
    cardTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 26,
      lineHeight: 28,
      letterSpacing: -0.8,
      color: palette.ink,
    },
    cardBrand: {
      ...T.label,
      color: palette.ink,
      opacity: 0.65,
      letterSpacing: 1.4,
    },

    progressBlock: { marginTop: 6, gap: 8 },
    progressLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    progressLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
    },
    progressPct: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    progressTrack: {
      height: 8,
      backgroundColor: palette.line,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: { height: '100%', borderRadius: 4 },

    advanceRow: {
      marginTop: 8,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    nextLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
    },
    nextAction: {
      ...T.body,
      color: palette.ink,
      marginTop: 4,
    },
    advanceBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: palette.lineDark,
      alignItems: 'center',
      justifyContent: 'center',
    },

    appsList: {
      marginTop: 14,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    appRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      gap: 14,
    },
    appNum: {
      fontFamily: fonts.displayBold,
      fontSize: 12,
      color: palette.ink,
      opacity: 0.4,
      width: 24,
    },
    appTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 17,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    appMeta: {
      ...T.small,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 4,
    },
    statusPill: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 999,
      borderWidth: 1,
    },
    statusPillText: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.6,
    },

    empty: {
      marginTop: 18,
      paddingVertical: 32,
      paddingHorizontal: 12,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: palette.lineDark,
      backgroundColor: palette.paper,
      alignItems: 'flex-start',
      gap: 14,
    },
    emptyTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 38,
      lineHeight: 38,
      letterSpacing: -1.2,
      color: palette.ink,
    },
    emptyTitleItalic: {
      fontFamily: fonts.editorialItalic,
      color: palette.ember,
    },
    emptyBody: {
      ...T.body,
      color: palette.ink,
      opacity: 0.7,
      maxWidth: 320,
    },
    emptyCta: {
      marginTop: 6,
      paddingVertical: 14,
      paddingHorizontal: 22,
      borderRadius: 999,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    emptyCtaText: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: 1.8,
      color: staticPalette.ink,
    },

    emptyApps: {
      marginTop: 14,
      paddingVertical: 22,
      borderTopWidth: 1,
      borderColor: palette.line,
    },
    emptyAppsText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.55,
      fontFamily: fonts.editorialItalic,
    },
  });
