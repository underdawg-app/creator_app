import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useStore } from '@/store';

export default function FinanceHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const tx = useStore((s) => s.transactions);
  const totalIn = tx.filter((t) => t.direction === 'IN' && t.status === 'CLEARED').reduce((a, t) => a + t.amount, 0);
  const pending = tx.filter((t) => t.direction === 'IN' && t.status === 'PENDING').reduce((a, t) => a + t.amount, 0);
  const paid = tx.filter((t) => t.direction === 'OUT').reduce((a, t) => a + t.amount, 0);
  const available = totalIn - paid;

  return (
    <ScreenFrame header={<ModuleHeader title="FINANCE" inverse />} bg="ink">
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        every <RNText style={styles.italic}>dollar,</RNText>{'\n'}in one place.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Deals, merch, art, tips, subs — all flowing into one dashboard. Tax-ready exports. Payouts on your schedule.
      </RNText>

      <View style={[styles.hero, { backgroundColor: palette.acid }]}>
        <RNText style={styles.heroLabel}>AVAILABLE BALANCE</RNText>
        <RNText
          style={styles.heroValue}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
          maxFontSizeMultiplier={1.1}
        >
          ₹{available.toLocaleString()}
        </RNText>
        <View style={{ marginTop: 10 }}>
          <MagneticButton
            label="WITHDRAW"
            background={palette.ink}
            foreground={palette.acid}
            onPress={() => router.push('/(modules)/finance/payouts')}
          />
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="THIS MONTH" value={totalIn} prefix="₹" size="md" inverse accent={palette.acid} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="PENDING" value={pending} prefix="₹" size="md" inverse accent={palette.blush} />
        </View>
      </View>

      <Section eyebrow="GO DEEP" inverse>
        <ListCell
          icon="list-outline"
          title="Transactions"
          subtitle={`${tx.length} entries · search + filter`}
          onPress={() => router.push('/(modules)/finance/transactions')}
          inverse
        />
        <ListCell
          icon="cash-outline"
          title="Payouts"
          subtitle="Withdraw to bank / UPI / PayPal"
          onPress={() => router.push('/(modules)/finance/payouts')}
          inverse
        />
        <ListCell
          icon="document-text-outline"
          title="Invoices"
          subtitle="Generate · send · track"
          onPress={() => router.push('/(modules)/finance/invoice')}
          inverse
        />
        <ListCell
          icon="receipt-outline"
          title="Tax center"
          subtitle="GST, TDS, export for CA"
          onPress={() => router.push('/(modules)/finance/tax')}
          inverse
        />
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
    color: palette.bone,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.acid },
  body: { ...T.body, color: palette.bone, opacity: 0.72, marginTop: 14, maxWidth: 360 },
  hero: {
    marginTop: 24,
    borderRadius: 22,
    padding: 24,
    gap: 10,
  },
  heroLabel: { ...T.label, color: staticPalette.ink, opacity: 0.7 },
  heroValue: {
    fontFamily: fonts.displayBold,
    fontSize: 62,
    lineHeight: 60,
    color: staticPalette.ink,
    letterSpacing: -2.6,
  },
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 22 },
});
