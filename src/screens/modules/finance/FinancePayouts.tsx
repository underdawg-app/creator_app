import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, TextInput } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';
import { payoutsSeed } from '@/data/mock';

const BALANCE = 242_000;
const MIN_PAYOUT = 1_000;
const FEE = 0;

type Payout = { id: string; method: string; amount: number; date: string; status: string };

const METHODS = ['HDFC ****4821', 'UPI sola@hdfc'];

export default function Payouts() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const requestPayout = useStore((s) => s.requestPayout);
  const toast = useStore((s) => s.toast);

  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(METHODS[0]);
  const [confirm, setConfirm] = useState(false);
  const [history, setHistory] = useState<Payout[]>(payoutsSeed);

  const n = Number(amount.replace(/[^0-9]/g, '')) || 0;
  const valid = n > 0 && n <= BALANCE;
  const overBalance = n > BALANCE;

  const ctaLabel = useMemo(
    () => (n > 0 ? `WITHDRAW ₹${n.toLocaleString()}` : 'WITHDRAW'),
    [n],
  );

  const openConfirm = () => {
    if (n < MIN_PAYOUT) {
      toast(`Minimum payout is ₹${MIN_PAYOUT.toLocaleString()}.`, 'warn');
      return;
    }
    if (overBalance) {
      toast('Amount exceeds balance.', 'warn');
      return;
    }
    setConfirm(true);
  };

  const doWithdraw = () => {
    requestPayout(n);
    setHistory((h) => [
      { id: `po${Date.now()}`, method, amount: n, date: 'now', status: 'PENDING' },
      ...h,
    ]);
    toast('Payout requested.', 'success');
    setAmount('');
    setConfirm(false);
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MONEY · PAYOUTS" title="PAYOUTS" />} waves={false}>
      <RNText style={styles.title}>cash out.</RNText>

      <View style={styles.balanceCard}>
        <RNText style={styles.balanceLabel}>AVAILABLE BALANCE</RNText>
        <RNText style={styles.balanceValue}>₹{BALANCE.toLocaleString()}</RNText>
      </View>

      <Section eyebrow="WITHDRAW" title="how much?">
        <View style={styles.amountBox}>
          <RNText style={styles.currency}>₹</RNText>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={(t) => setAmount(t.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.1}
          />
        </View>

        <View style={styles.chipRow}>
          <Chip label="₹10K" size="sm" onPress={() => setAmount('10000')} />
          <Chip label="₹50K" size="sm" onPress={() => setAmount('50000')} />
          <Chip label="ALL" size="sm" onPress={() => setAmount(String(BALANCE))} />
        </View>

        <RNText style={styles.kicker}>DEPOSIT TO</RNText>
        <View style={styles.methodCol}>
          {METHODS.map((m) => {
            const active = method === m;
            return (
              <Pressable
                key={m}
                onPress={() => setMethod(m)}
                style={[styles.methodRow, active && styles.methodRowActive]}
              >
                <Ionicons
                  name={m.startsWith('UPI') ? 'wallet-outline' : 'card-outline'}
                  size={18}
                  color={palette.ink}
                />
                <RNText style={styles.methodText}>{m}</RNText>
                <Ionicons
                  name={active ? 'checkmark-circle' : 'ellipse-outline'}
                  size={20}
                  color={active ? palette.ink : palette.line}
                />
              </Pressable>
            );
          })}
          <Pressable
            onPress={() => router.push('/(modules)/finance/payment-methods')}
            style={styles.addRow}
          >
            <Ionicons name="add" size={18} color={palette.ink} />
            <RNText style={styles.addText}>ADD METHOD</RNText>
            <Ionicons name="chevron-forward" size={16} color={palette.ink} />
          </Pressable>
        </View>

        <RNText style={[styles.note, overBalance && styles.noteWarn]}>
          {overBalance
            ? 'Amount exceeds available balance.'
            : `Minimum payout ₹${MIN_PAYOUT.toLocaleString()}. Fee free.`}
        </RNText>

        <Pressable
          onPress={openConfirm}
          disabled={!valid}
          style={[styles.cta, !valid && styles.ctaOff]}
        >
          <RNText style={styles.ctaText}>{ctaLabel}</RNText>
          <View style={styles.ctaArrow}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Pressable>
      </Section>

      <Section eyebrow={`PAYOUT HISTORY · ${history.length}`} title="recent.">
        {history.map((p) => (
          <View key={p.id} style={styles.histRow}>
            <View style={{ flex: 1 }}>
              <RNText style={styles.histMethod} numberOfLines={1}>
                {p.method}
              </RNText>
              <RNText style={styles.histDate}>{p.date === 'now' ? 'just now' : `${p.date} ago`}</RNText>
            </View>
            <RNText style={styles.histAmount}>₹{p.amount.toLocaleString()}</RNText>
            <View
              style={[
                styles.statusPill,
                p.status === 'PENDING' && styles.statusPending,
              ]}
            >
              <RNText
                style={[
                  styles.statusText,
                  p.status === 'PENDING' && styles.statusTextPending,
                ]}
              >
                {p.status}
              </RNText>
            </View>
          </View>
        ))}
      </Section>

      <Sheet
        visible={confirm}
        onClose={() => setConfirm(false)}
        eyebrow="CONFIRM WITHDRAWAL"
        title={`₹${n.toLocaleString()}`}
      >
        <View style={styles.confRow}>
          <RNText style={styles.confLabel}>TO</RNText>
          <RNText style={styles.confValue}>{method}</RNText>
        </View>
        <View style={styles.confRow}>
          <RNText style={styles.confLabel}>FEE</RNText>
          <RNText style={styles.confValue}>{FEE === 0 ? 'Free' : `₹${FEE}`}</RNText>
        </View>
        <View style={styles.confRow}>
          <RNText style={styles.confLabel}>EST. ARRIVAL</RNText>
          <RNText style={styles.confValue}>1–2 business days</RNText>
        </View>

        <Pressable onPress={doWithdraw} style={styles.cta}>
          <RNText style={styles.ctaText}>CONFIRM WITHDRAWAL</RNText>
          <View style={styles.ctaArrow}>
            <Ionicons name="checkmark-circle" size={16} color={palette.ink} />
          </View>
        </Pressable>
        <Pressable onPress={() => setConfirm(false)} style={styles.cancelBtn}>
          <RNText style={styles.cancelText}>CANCEL</RNText>
        </Pressable>
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
      marginBottom: 16,
    },

    balanceCard: {
      backgroundColor: palette.ink,
      borderRadius: 20,
      padding: 20,
    },
    balanceLabel: { ...T.label, color: palette.bone, opacity: 0.6 },
    balanceValue: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      letterSpacing: -1.5,
      color: palette.acid,
      marginTop: 6,
    },

    amountBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.boneSoft,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      paddingHorizontal: 20,
      paddingVertical: 18,
      gap: 4,
    },
    currency: { fontFamily: fonts.displayBold, fontSize: 32, color: palette.ink },
    amountInput: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      color: palette.ink,
      flex: 1,
      letterSpacing: -1,
      padding: 0,
    },

    chipRow: { flexDirection: 'row', gap: 8, marginTop: 12 },

    kicker: { ...T.label, color: palette.ink, opacity: 0.5, marginTop: 20, marginBottom: 8 },
    methodCol: { gap: 8 },
    methodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 14,
      height: 54,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    methodRowActive: { borderColor: palette.ink, backgroundColor: palette.boneSoft },
    methodText: {
      flex: 1,
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      color: palette.ink,
      letterSpacing: -0.2,
    },
    addRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 14,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      borderStyle: 'dashed',
    },
    addText: {
      flex: 1,
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
      color: palette.ink,
    },

    note: { ...T.small, color: palette.ink, opacity: 0.55, marginTop: 14 },
    noteWarn: { color: palette.ember, opacity: 1 },

    cta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      paddingLeft: 22,
      paddingRight: 10,
      marginTop: 16,
    },
    ctaOff: { opacity: 0.4 },
    ctaText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1.6, color: palette.bone },
    ctaArrow: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    histRow: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    histMethod: { fontFamily: fonts.displayBold, fontSize: 15, color: palette.ink, letterSpacing: -0.3 },
    histDate: { ...T.micro, color: palette.ink, opacity: 0.5, marginTop: 3 },
    histAmount: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.5 },
    statusPill: {
      paddingHorizontal: 8,
      height: 22,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusPending: { borderColor: palette.acid, backgroundColor: palette.acid },
    statusText: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1.2, color: palette.ink },
    statusTextPending: { color: palette.ink },

    confRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    confLabel: { ...T.label, color: palette.ink, opacity: 0.5 },
    confValue: { fontFamily: fonts.bodyBold, fontSize: 15, color: palette.ink, letterSpacing: -0.2 },

    cancelBtn: { height: 48, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
    cancelText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2, color: palette.ink, opacity: 0.6 },
  });
