import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { TiltCard } from '@/components/ui/TiltCard';
import { ProductIcon } from '@/components/svg/ProductIcon';
import { Marquee } from '@/components/ui/Marquee';
import { BadgePill } from '@/components/ui/BadgePill';
import { useStore } from '@/store';

export default function Store() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const products = useStore((s) => s.products).filter((p) => p.published);
  const profile = useStore((s) => s.profile);
  const toggleProductPublished = useStore((s) => s.toggleProductPublished);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MERCH" title="YOUR STORE" />} padding={false}>
      <View style={styles.strip}>
        <Marquee
          items={[
            `${profile.handle.replace('@', '').toUpperCase()}.UNDERDAWG.STORE`,
            'LIVE · SHIPS WORLDWIDE',
            'TAP TO VISIT',
          ]}
          textStyle={{
            fontFamily: fonts.bodyBold,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: palette.ink,
          }}
          speed={32}
        />
      </View>

      <View style={styles.hero}>
        <RNText style={styles.kicker}>STOREFRONT</RNText>
        <RNText
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {profile.handle.replace('@', '')}.
          <RNText style={styles.italic}>store</RNText>
        </RNText>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <BadgePill label="IN-APP" accent={palette.acid} />
          <BadgePill label="STANDALONE" accent={palette.electric} />
        </View>
      </View>

      <View style={styles.grid}>
        {products.map((p) => (
          <Tap
            key={p.id}
            onPress={() => {
              toggleProductPublished(p.id);
              toast(`${p.name} toggled.`, 'default');
            }}
            burstColor={p.color}
            style={{ flexBasis: '48%' }}
          >
            <TiltCard style={[styles.card, { backgroundColor: p.bg }] as any} maxTilt={4}>
              <View style={styles.cardIcon}>
                <ProductIcon type={p.type} size={64} color={p.fg} />
              </View>
              <View>
                <RNText
                  style={[styles.name, { color: p.fg }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  maxFontSizeMultiplier={1.1}
                >
                  {p.name}
                </RNText>
                <RNText style={[styles.price, { color: p.fg }]} maxFontSizeMultiplier={1.1}>
                  ₹{p.baseCost + p.margin}
                </RNText>
              </View>
            </TiltCard>
          </Tap>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  strip: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: palette.line },
  hero: { paddingHorizontal: 12, paddingTop: 22, paddingBottom: 20 },
  kicker: { ...T.label, color: palette.ink, opacity: 0.55 },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 54,
    lineHeight: 54,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 6,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 12 },
  card: { height: 220, borderRadius: 20, overflow: 'hidden', padding: 14, justifyContent: 'flex-end' },
  cardIcon: { position: 'absolute', right: 14, top: 14, opacity: 0.92 },
  name: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.5 },
  price: { ...T.micro, marginTop: 4, opacity: 0.7 },
});
