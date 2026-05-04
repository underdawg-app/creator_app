import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Tap } from '@/components/ui/Tap';
import { TiltCard } from '@/components/ui/TiltCard';
import { MediaThumb } from '@/components/svg/MediaThumb';
import { BadgePill } from '@/components/ui/BadgePill';
import { MetricCard } from '@/components/ui/MetricCard';
import { ListCell } from '@/components/ui/ListCell';
import { useStore } from '@/store';

export default function ArtHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const artworks = useStore((s) => s.artworks);
  const commissions = useStore((s) => s.commissions);
  const sold = artworks.filter((a) => !a.available).length;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MODULE · 09" title="ART MARKET" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        originals,<RNText style={styles.italic}>{'\n'}prints, commissions.</RNText>
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Sell direct. No galleries cutting 50%. Originals, limited editions, digital, and custom work — all in one place.
      </RNText>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="LISTINGS" value={artworks.length} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="SOLD" value={sold} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="COMMISSIONS" value={commissions.length} size="md" accent={palette.blush} />
        </View>
      </View>

      <View style={{ marginTop: 22, alignItems: 'flex-start' }}>
        <MagneticButton
          label="LIST NEW ART"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => router.push('/(modules)/art/list')}
        />
      </View>

      <Section eyebrow={`LISTINGS · ${artworks.length}`} title="your work.">
        <View style={styles.grid}>
          {artworks.map((a) => (
            <Tap
              key={a.id}
              onPress={() => router.push(`/(modules)/art/${a.id}` as any)}
              burstColor={a.color}
              style={{ flexBasis: '48%' }}
            >
              <TiltCard style={[styles.card, { backgroundColor: a.bg }] as any} maxTilt={5}>
                <View style={styles.cardThumb}>
                  <MediaThumb
                    size={130}
                    color={a.color}
                    ink={a.fg}
                    variant={a.kind === 'DIGITAL' ? 'grid' : 'lens'}
                  />
                </View>
                <View>
                  <BadgePill label={a.kind} accent={a.color} />
                  <RNText
                    style={[styles.name, { color: a.fg }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    maxFontSizeMultiplier={1.1}
                  >
                    {a.title}
                  </RNText>
                  <RNText style={[styles.price, { color: a.fg }]}>₹{a.price.toLocaleString()}</RNText>
                </View>
              </TiltCard>
            </Tap>
          ))}
        </View>
      </Section>

      <Section eyebrow="COMMISSIONS">
        <ListCell
          icon="brush-outline"
          title="Open commissions"
          subtitle={`${commissions.length} active · manage briefs + progress`}
          onPress={() => router.push('/(modules)/art/commissions')}
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
  card: { height: 240, borderRadius: 20, overflow: 'hidden', padding: 14, justifyContent: 'flex-end', gap: 8 },
  cardThumb: { position: 'absolute', right: 10, top: 10, opacity: 0.92 },
  name: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.5, marginTop: 6 },
  price: { fontFamily: fonts.displayBold, fontSize: 22, marginTop: 4 },
});
