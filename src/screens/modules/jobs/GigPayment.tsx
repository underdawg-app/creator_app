import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { MetricCard } from '@/components/ui/MetricCard';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

/* ---------------------------------------------------------------------------
 * Payment status machine
 * ------------------------------------------------------------------------- */

type Status = 'PENDING' | 'PROCESSING' | 'PAID';
const STEPS: Status[] = ['PENDING', 'PROCESSING', 'PAID'];

const GROSS = 135000;
const FEE_PCT = 0.12;
const FEE = Math.round(GROSS * FEE_PCT);
const NET = GROSS - FEE;

const STATUS_COPY: Record<Status, { line: string; sub: string; icon: keyof typeof Ionicons.glyphMap }> = {
  PENDING: {
    line: 'getting paid.',
    sub: 'Brand has signed off. Funds are sitting in escrow until your live link is posted.',
    icon: 'time-outline',
  },
  PROCESSING: {
    line: 'on its way.',
    sub: 'Escrow released. Payout is clearing to your linked account — usually under 24h.',
    icon: 'sync-outline',
  },
  PAID: {
    line: 'paid in full.',
    sub: 'Net deposited to your UNDERDAWG balance. Withdraw anytime from Finance.',
    icon: 'checkmark-circle',
  },
};

export default function GigPayment() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const [status, setStatus] = useState<Status>('PENDING');
  const firedRef = useRef(false);
  const stepIndex = STEPS.indexOf(status);

  useEffect(() => {
    if (status === 'PAID' && !firedRef.current) {
      firedRef.current = true;
      confetti();
    }
  }, [status, confetti]);

  const advance = () => {
    if (status === 'PENDING') {
      setStatus('PROCESSING');
      toast('Released from escrow. Payout processing.', 'success');
    } else if (status === 'PROCESSING') {
      setStatus('PAID');
      toast(`₹${NET.toLocaleString()} deposited to your balance.`, 'success');
    }
  };

  const copy = STATUS_COPY[status];
  const statusAccent = status === 'PAID' ? palette.acid : status === 'PROCESSING' ? palette.electric : palette.mute;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="GIG · PAYMENT" title="PAYMENT" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} maxFontSizeMultiplier={1.1}>
        {copy.line}
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        {copy.sub}
      </RNText>

      {/* ── Status card ── */}
      <View style={styles.statusCard}>
        <View style={styles.statusHead}>
          <View style={[styles.statusBubble, { backgroundColor: statusAccent }]}>
            <Ionicons name={copy.icon} size={18} color={staticPalette.ink} />
          </View>
          <View style={{ flex: 1 }}>
            <RNText style={styles.statusEyebrow} maxFontSizeMultiplier={1.15}>
              ESCROW STATUS
            </RNText>
            <RNText style={styles.statusValue} maxFontSizeMultiplier={1.1}>
              {status}
            </RNText>
          </View>
          <RNText style={styles.statusStep} maxFontSizeMultiplier={1.1}>
            {stepIndex + 1}/3
          </RNText>
        </View>

        <View style={styles.stepper}>
          {STEPS.map((s, i) => {
            const done = i <= stepIndex;
            return (
              <View key={s} style={styles.stepItem}>
                <View style={styles.stepRowTop}>
                  <View style={[styles.stepDot, done && { backgroundColor: palette.ink, borderColor: palette.ink }]}>
                    {done ? <Ionicons name="checkmark" size={11} color={palette.bone} /> : null}
                  </View>
                  {i < STEPS.length - 1 ? (
                    <View style={[styles.stepBar, i < stepIndex && { backgroundColor: palette.ink }]} />
                  ) : null}
                </View>
                <RNText style={[styles.stepLabel, done && styles.stepLabelDone]} maxFontSizeMultiplier={1.1}>
                  {s}
                </RNText>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── Escrow explainer ── */}
      <View style={styles.escrowRow}>
        <View style={styles.escrowIcon}>
          <Ionicons name="lock-closed-outline" size={15} color={palette.ink} />
        </View>
        <RNText style={styles.escrowText} maxFontSizeMultiplier={1.2}>
          Funds held in escrow until you post the live link. No chargebacks, no chasing.
        </RNText>
      </View>

      {/* ── Breakdown ── */}
      <Section eyebrow="BREAKDOWN">
        <View style={styles.metricsRow}>
          <View style={{ flex: 1 }}>
            <MetricCard label="GROSS" value={GROSS} prefix="₹" size="sm" />
          </View>
          <View style={{ flex: 1 }}>
            <MetricCard label="PLATFORM FEE 12%" value={-FEE} prefix="₹" size="sm" accent={palette.ember} />
          </View>
        </View>
        <View style={styles.netCard}>
          <View>
            <RNText style={styles.netLabel} maxFontSizeMultiplier={1.15}>
              NET TO YOU
            </RNText>
            <RNText style={styles.netSub} maxFontSizeMultiplier={1.15}>
              after fees · INR
            </RNText>
          </View>
          <RNText style={styles.netValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
            ₹{NET.toLocaleString()}
          </RNText>
        </View>
      </Section>

      {/* ── Docs ── */}
      <Section eyebrow="PAPER TRAIL">
        <ListCell
          icon="document-text-outline"
          title="Invoice"
          subtitle="UD-2026-014 · GST-ready PDF"
          onPress={() => toast('Invoice #UD-2026-014 generated.', 'success')}
        />
        <ListCell
          icon="receipt-outline"
          title="Payment history"
          subtitle="All cleared deals + payouts"
          onPress={() => router.push('/(modules)/finance/transactions')}
        />
      </Section>

      {/* ── Primary CTA ── */}
      {status === 'PAID' ? (
        <View style={styles.paidBanner}>
          <View style={styles.paidHead}>
            <Ionicons name="checkmark-circle" size={20} color={staticPalette.ink} />
            <RNText style={styles.paidTitle} maxFontSizeMultiplier={1.1}>
              Settled.
            </RNText>
          </View>
          <RNText style={styles.paidSub} maxFontSizeMultiplier={1.2}>
            ₹{NET.toLocaleString()} landed in your balance. Nice work.
          </RNText>
          <Tap
            onPress={() => router.push('/(modules)/finance')}
            burstColor={palette.acid}
            variant="heavy"
            style={styles.cta}
          >
            <RNText style={styles.ctaLabel} maxFontSizeMultiplier={1.1}>
              VIEW IN FINANCE
            </RNText>
            <View style={styles.ctaChip}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Tap>
        </View>
      ) : (
        <Tap onPress={advance} burstColor={palette.acid} variant="heavy" style={[styles.cta, styles.ctaSpaced]}>
          <RNText style={styles.ctaLabel} maxFontSizeMultiplier={1.1}>
            {status === 'PENDING' ? 'RELEASE FROM ESCROW (demo)' : 'CONFIRM PAYOUT (demo)'}
          </RNText>
          <View style={styles.ctaChip}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Tap>
      )}

      <Pressable onPress={() => router.push('/(modules)/jobs/active-deals')} hitSlop={8} style={styles.backLink}>
        <RNText style={styles.backLinkText} maxFontSizeMultiplier={1.15}>
          Back to active deals
        </RNText>
      </Pressable>
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
    },
    body: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 12, maxWidth: 340 },

    /* ── Status card ── */
    statusCard: {
      marginTop: 22,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 18,
    },
    statusHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    statusBubble: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusEyebrow: { ...T.label, color: palette.ink, opacity: 0.55 },
    statusValue: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      letterSpacing: -0.8,
      color: palette.ink,
      marginTop: 2,
    },
    statusStep: { ...T.label, color: palette.ink, opacity: 0.5 },

    stepper: { flexDirection: 'row' },
    stepItem: { flex: 1, gap: 8 },
    stepRowTop: { flexDirection: 'row', alignItems: 'center' },
    stepDot: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepBar: { flex: 1, height: 2, backgroundColor: palette.line, marginHorizontal: 4 },
    stepLabel: { ...T.micro, color: palette.ink, opacity: 0.45, letterSpacing: 0.6 },
    stepLabelDone: { opacity: 0.9, fontFamily: fonts.bodyBold },

    /* ── Escrow ── */
    escrowRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 14,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    escrowIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    escrowText: { ...T.small, flex: 1, color: palette.ink, opacity: 0.8, lineHeight: 18 },

    /* ── Breakdown ── */
    metricsRow: { flexDirection: 'row', gap: 10 },
    netCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      borderRadius: 20,
      backgroundColor: palette.ink,
      padding: 20,
    },
    netLabel: { ...T.label, color: palette.bone, opacity: 0.7 },
    netSub: { ...T.small, color: palette.bone, opacity: 0.5, marginTop: 2 },
    netValue: {
      fontFamily: fonts.displayBold,
      fontSize: 38,
      letterSpacing: -1.6,
      color: palette.acid,
    },

    /* ── Paid banner ── */
    paidBanner: {
      marginTop: 28,
      borderRadius: 20,
      backgroundColor: palette.acid,
      padding: 20,
      gap: 12,
    },
    paidHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    paidTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 24,
      letterSpacing: -1,
      color: staticPalette.ink,
    },
    paidSub: { ...T.body, color: staticPalette.ink, opacity: 0.78 },

    /* ── CTA ── */
    cta: {
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      paddingHorizontal: 18,
    },
    ctaSpaced: { marginTop: 28 },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1.4, color: palette.bone },
    ctaChip: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    backLink: { alignSelf: 'center', marginTop: 18, paddingVertical: 6 },
    backLinkText: { ...T.small, color: palette.ink, opacity: 0.6, textDecorationLine: 'underline' },
  });
