import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { BadgePill } from '@/components/ui/BadgePill';
import { useStore } from '@/store';

const statusColor: Record<string, string> = {
  CONFIRMED: staticPalette.electric,
  PRINTING: staticPalette.acid,
  SHIPPED: staticPalette.blush,
  DELIVERED: staticPalette.mute,
};

export default function Orders() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const orders = useStore((s) => s.merchOrders);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MERCH" title="ORDERS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Every order. Every status. Shipping + fulfillment is ours to handle.
      </RNText>

      <View style={{ marginTop: 18 }}>
        {orders.map((o) => (
          <View key={o.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <RNText
                style={styles.product}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                maxFontSizeMultiplier={1.15}
              >
                {o.product}
              </RNText>
              <RNText style={styles.meta} maxFontSizeMultiplier={1.15}>
                {o.buyer} · ₹{o.total} · {o.date} ago · qty {o.qty}
              </RNText>
            </View>
            <BadgePill label={o.status} accent={statusColor[o.status] ?? palette.acid} />
          </View>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.7, maxWidth: 360 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  product: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, letterSpacing: -0.4 },
  meta: { ...T.small, color: palette.ink, opacity: 0.65, marginTop: 4 },
});
