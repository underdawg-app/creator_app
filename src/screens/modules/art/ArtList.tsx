import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, TextInput } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Chip } from '@/components/ui/Chip';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import type { Artwork } from '@/data/mock';

const KINDS: Artwork['kind'][] = ['ORIGINAL', 'LIMITED PRINT', 'OPEN PRINT', 'DIGITAL'];
const COLOR_PICKS = [
  { c: '#FCD34D', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A' },
  { c: '#FF6BB5', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#FF5A1F', bg: '#F2EFE6', fg: '#0A0A0A' },
];

export default function ListArt() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<Artwork['kind']>('ORIGINAL');
  const [price, setPrice] = useState('');
  const [medium, setMedium] = useState('');
  const [dims, setDims] = useState('');
  const [pick, setPick] = useState(COLOR_PICKS[0]);
  const addArt = useStore((s) => s.addArtwork);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const submit = () => {
    if (!title.trim() || !price.trim()) {
      toast('Title and price are required.', 'warn');
      return;
    }
    addArt({
      title,
      kind,
      price: Number(price) || 0,
      year: new Date().getFullYear(),
      medium: medium || '—',
      dimensions: dims || undefined,
      color: pick.c,
      bg: pick.bg,
      fg: pick.fg,
    });
    confetti();
    toast('Art listed.', 'success');
    router.replace('/(modules)/art');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ART" title="NEW LISTING" />}>
      <View style={styles.field}>
        <RNText style={styles.label}>TITLE</RNText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="SALT / STUDY No. 06"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>TYPE</RNText>
        <View style={styles.chipRow}>
          {KINDS.map((k) => (
            <Chip key={k} label={k} active={kind === k} onPress={() => setKind(k)} />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>PRICE (₹)</RNText>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="24000"
          placeholderTextColor={palette.mute}
        />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>MEDIUM</RNText>
        <TextInput
          style={styles.input}
          value={medium}
          onChangeText={setMedium}
          placeholder="Acrylic, resin, dust on panel"
          placeholderTextColor={palette.mute}
        />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>DIMENSIONS</RNText>
        <TextInput
          style={styles.input}
          value={dims}
          onChangeText={setDims}
          placeholder="60×48cm"
          placeholderTextColor={palette.mute}
        />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>PALETTE</RNText>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {COLOR_PICKS.map((p) => (
            <Tap
              key={p.c}
              onPress={() => setPick(p)}
              burstColor={p.c}
              style={[
                styles.swatch,
                { backgroundColor: p.c, borderColor: pick.c === p.c ? palette.ink : palette.line },
              ]}
            >
              {pick.c === p.c ? <Ionicons name="checkmark" size={14} color={palette.ink} /> : null}
            </Tap>
          ))}
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <MagneticButton
          label="PUBLISH LISTING"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={submit}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  field: { marginTop: 22, gap: 10 },
  label: { ...T.label, color: palette.ink, opacity: 0.65 },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: palette.ink,
    backgroundColor: palette.paper,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  swatch: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
});
