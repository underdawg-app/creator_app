import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { useStore } from '@/store';

export default function TaxCenter() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const tx = useStore((s) => s.transactions);
  const toast = useStore((s) => s.toast);
  const gross = tx.filter((t) => t.direction === 'IN').reduce((a, t) => a + t.amount, 0);
  const fees = tx.filter((t) => t.kind === 'FEE').reduce((a, t) => a + t.amount, 0);
  const est = Math.round(gross * 0.18);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="FINANCE" title="TAX CENTER" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Plain-language tax. No spreadsheets. Export-ready reports at year-end.
      </RNText>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="GROSS INCOME" value={gross} prefix="₹" size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="EST. TAX (18%)" value={est} prefix="₹" size="md" accent={palette.ember} />
        </View>
      </View>

      <Section eyebrow="REPORTS">
        <ListCell
          icon="download-outline"
          title="Yearly summary"
          subtitle="Ready for your CA. PDF + CSV."
          onPress={() => toast('Summary emailed.', 'success')}
        />
        <ListCell
          icon="document-text-outline"
          title="GST details"
          subtitle="Input/output tracking"
          onPress={() => toast('GST report opened.', 'default')}
        />
        <ListCell
          icon="card-outline"
          title="TDS records"
          subtitle={`${tx.length} entries covered`}
          onPress={() => toast('TDS records downloaded.', 'success')}
        />
      </Section>

      <Section eyebrow="TIPS">
        <View style={styles.tipCard}>
          <RNText style={styles.tipLabel}>SAVE TIP · 01</RNText>
          <RNText style={styles.tipTitle} maxFontSizeMultiplier={1.15}>
            Tool subscriptions count.
          </RNText>
          <RNText style={styles.tipBody} maxFontSizeMultiplier={1.2}>
            Adobe, Figma, your DAW, even your Spotify if it scores reels — legitimate business expenses. Log them.
          </RNText>
        </View>
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.7, maxWidth: 360 },
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 22 },
  tipCard: {
    borderRadius: 18,
    padding: 20,
    backgroundColor: palette.ink,
    gap: 8,
  },
  tipLabel: { ...T.label, color: palette.bone, opacity: 0.6 },
  tipTitle: { fontFamily: fonts.displayBold, fontSize: 22, color: palette.acid, letterSpacing: -0.6 },
  tipBody: { fontFamily: fonts.editorial, fontSize: 17, lineHeight: 24, color: palette.bone, opacity: 0.88 },
});
