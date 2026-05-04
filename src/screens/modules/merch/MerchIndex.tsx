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
import { Tap } from '@/components/ui/Tap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TiltCard } from '@/components/ui/TiltCard';
import { ProductIcon } from '@/components/svg/ProductIcon';
import { ListCell } from '@/components/ui/ListCell';
import { useStore } from '@/store';

export default function MerchHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const products = useStore((s) => s.products);
  const orders = useStore((s) => s.merchOrders);
  const revenue = products.reduce((a, p) => a + p.sold * (p.baseCost + p.margin), 0);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MODULE · 08" title="MERCH STUDIO" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        sell the <RNText style={styles.italic}>idea,</RNText>{'\n'}not just the post.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Design once, we print and ship. You own the margin. Both an in-app store and a standalone e-commerce site.
      </RNText>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="PRODUCTS" value={products.length} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="ORDERS" value={orders.length} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="REVENUE ₹" value={revenue} size="md" accent={palette.blush} />
        </View>
      </View>

      <View style={{ marginTop: 22, alignItems: 'flex-start' }}>
        <MagneticButton
          label="CREATE PRODUCT"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => router.push('/(modules)/merch/create')}
        />
      </View>

      <Section eyebrow={`PRODUCTS · ${products.length}`} title="your line.">
        <View style={styles.grid}>
          {products.map((p) => (
            <Tap
              key={p.id}
              onPress={() => router.push('/(modules)/merch/store')}
              burstColor={p.color}
              style={{ flexBasis: '48%' }}
            >
              <TiltCard
                style={[styles.card, { backgroundColor: p.bg }] as any}
                maxTilt={5}
              >
                <View style={styles.cardIcon}>
                  <ProductIcon type={p.type} size={56} color={p.fg} />
                </View>
                <View>
                  <RNText
                    style={[styles.cardName, { color: p.fg }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    maxFontSizeMultiplier={1.1}
                  >
                    {p.name}
                  </RNText>
                  <RNText style={[styles.cardMeta, { color: p.fg }]} maxFontSizeMultiplier={1.15}>
                    {p.type} · ₹{p.baseCost + p.margin}
                  </RNText>
                  <RNText style={[styles.cardSold, { color: p.fg }]} maxFontSizeMultiplier={1.15}>
                    {p.sold} SOLD
                  </RNText>
                </View>
              </TiltCard>
            </Tap>
          ))}
        </View>
      </Section>

      <Section eyebrow="MANAGE">
        <ListCell
          icon="storefront-outline"
          title="Your in-app store"
          subtitle="How it looks inside Underdawg"
          onPress={() => router.push('/(modules)/merch/store')}
        />
        <ListCell
          icon="cart-outline"
          title="Orders"
          subtitle={`${orders.length} lifetime orders`}
          onPress={() => router.push('/(modules)/merch/orders')}
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
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  body: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 14, maxWidth: 360 },
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 22 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 14,
    justifyContent: 'flex-end',
  },
  cardIcon: { position: 'absolute', right: 14, top: 14, opacity: 0.92 },
  cardName: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.5 },
  cardMeta: { ...T.micro, marginTop: 4, opacity: 0.7 },
  cardSold: { ...T.micro, marginTop: 2, opacity: 0.6 },
});
