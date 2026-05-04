import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, TextInput } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { BadgePill } from '@/components/ui/BadgePill';
import { useStore } from '@/store';
import { payoutsSeed } from '@/data/mock';

export default function Payouts() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('HDFC ****4821');
  const requestPayout = useStore((s) => s.requestPayout);
  const toast = useStore((s) => s.toast);

  const submit = () => {
    const n = Number(amount);
    if (!n || n < 500) {
      toast('Minimum ₹500.', 'warn');
      return;
    }
    requestPayout(n);
    toast(`Payout of ₹${n.toLocaleString()} requested.`, 'success');
    router.back();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="FINANCE" title="PAYOUT" />}>
      <Section eyebrow="REQUEST WITHDRAWAL" title="how much, and where?">
        <View style={styles.amountBox}>
          <RNText style={styles.currency}>₹</RNText>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="50000"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.1}
          />
        </View>
        <View style={styles.chipRow}>
          {['HDFC ****4821', 'UPI sola@hdfc', 'PAYPAL'].map((m) => (
            <Chip key={m} label={m} active={method === m} onPress={() => setMethod(m)} />
          ))}
        </View>
        <MagneticButton
          label="REQUEST PAYOUT"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={submit}
        />
      </Section>

      <Section eyebrow={`RECENT · ${payoutsSeed.length}`} title="history.">
        {payoutsSeed.map((p) => (
          <View key={p.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <RNText style={styles.method} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
                {p.method}
              </RNText>
              <RNText style={styles.date}>{p.date} ago</RNText>
            </View>
            <RNText style={styles.amount}>₹{p.amount.toLocaleString()}</RNText>
            <BadgePill label={p.status} accent={palette.acid} />
          </View>
        ))}
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.ink,
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 22,
    gap: 4,
  },
  currency: { fontFamily: fonts.displayBold, fontSize: 38, color: palette.acid },
  amountInput: { fontFamily: fonts.displayBold, fontSize: 48, color: palette.acid, flex: 1, letterSpacing: -1 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  method: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3 },
  date: { ...T.micro, color: palette.ink, opacity: 0.55, marginTop: 3 },
  amount: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, letterSpacing: -0.5 },
});
