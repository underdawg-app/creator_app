import React from 'react';
import { View, StyleSheet, Text as RNText, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BadgePill } from '@/components/ui/BadgePill';
import { MediaThumb } from '@/components/svg/MediaThumb';
import { useStore } from '@/store';

const { width } = Dimensions.get('window');

export default function ArtDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const art = useStore((s) => s.artworks.find((a) => a.id === id));
  const toast = useStore((s) => s.toast);

  if (!art) {
    return (
      <ScreenFrame header={<ModuleHeader eyebrow="ART" title="NOT FOUND" />}>
        <RNText style={styles.body}>This piece has sold or been unlisted.</RNText>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ART" title={art.kind} />}>
      <View style={[styles.hero, { backgroundColor: art.bg }]}>
        <MediaThumb
          size={width * 0.6}
          color={art.color}
          ink={art.fg}
          variant={art.kind === 'DIGITAL' ? 'grid' : 'lens'}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
        <BadgePill label={art.kind} accent={art.color} />
        {art.edition ? <BadgePill label={art.edition} accent={palette.electric} /> : null}
        <BadgePill label={art.available ? 'AVAILABLE' : 'SOLD'} accent={art.available ? palette.acid : palette.mute} />
      </View>

      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.65}
        maxFontSizeMultiplier={1.1}
      >
        {art.title}
      </RNText>
      <RNText style={styles.price}>₹{art.price.toLocaleString()}</RNText>

      <View style={styles.metaBox}>
        <Meta label="MEDIUM" value={art.medium} />
        {art.dimensions ? <Meta label="DIMENSIONS" value={art.dimensions} /> : null}
        <Meta label="YEAR" value={String(art.year)} />
      </View>

      <View style={{ marginTop: 24, flexDirection: 'row', gap: 10 }}>
        <MagneticButton
          label="BUY"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => toast('Payment flow launched.', 'success')}
          disabled={!art.available}
        />
        <MagneticButton
          label="BACK"
          background={staticPalette.acid}
          foreground={staticPalette.ink}
          onPress={() => router.back()}
        />
      </View>
    </ScreenFrame>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.metaRow}>
      <RNText style={styles.metaKey} maxFontSizeMultiplier={1.15}>
        {label}
      </RNText>
      <RNText style={styles.metaValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        {value}
      </RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  hero: {
    height: 320,
    borderRadius: 24,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -2,
    color: palette.ink,
    marginTop: 18,
  },
  price: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    color: palette.electric,
    marginTop: 8,
    letterSpacing: -0.8,
  },
  metaBox: { marginTop: 20, gap: 10 },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  metaKey: { ...T.label, color: palette.ink, opacity: 0.6 },
  metaValue: { ...T.bodyMedium, color: palette.ink, maxWidth: 240 },
  body: { ...T.body, color: palette.ink, opacity: 0.7 },
});
