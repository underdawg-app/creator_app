import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Chip } from '@/components/ui/Chip';
import { useStore } from '@/store';

const TYPES = ['IMAGE', 'VIDEO', 'AUDIO', 'LINK', 'PDF', 'EMBED'];

export default function PieceEditor() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('IMAGE');
  const toast = useStore((s) => s.toast);

  const save = () => {
    if (!title.trim()) {
      toast('Give the piece a title.', 'warn');
      return;
    }
    toast('Piece saved to portfolio.', 'success');
    router.back();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PORTFOLIO" title="NEW PIECE" />}>
      <View style={styles.field}>
        <RNText style={styles.label}>TITLE</RNText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="SALT / STUDY No. 05"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>
      <View style={styles.field}>
        <RNText style={styles.label}>NOTE · 140 CHARS</RNText>
        <TextInput
          style={[styles.input, { minHeight: 90, textAlignVertical: 'top' }]}
          value={note}
          onChangeText={setNote}
          multiline
          maxLength={140}
          placeholder="what it is, and why you made it"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>
      <View style={styles.field}>
        <RNText style={styles.label}>TYPE</RNText>
        <View style={styles.chipRow}>
          {TYPES.map((t) => (
            <Chip key={t} label={t} active={type === t} onPress={() => setType(t)} />
          ))}
        </View>
      </View>

      <View style={styles.uploadCard}>
        <RNText style={styles.uploadEyebrow}>UPLOAD</RNText>
        <RNText style={styles.uploadTitle}>pick a file, drop a link.</RNText>
        <View style={styles.uploadRow}>
          <MagneticButton label="CHOOSE FILE" size="sm" onPress={() => toast('File picker stub.', 'default')} />
          <MagneticButton
            label="PASTE LINK"
            size="sm"
            background={palette.bone}
            foreground={palette.ink}
            onPress={() => toast('Link pasted.', 'success')}
          />
        </View>
      </View>

      <View style={{ marginTop: 32 }}>
        <MagneticButton
          label="ADD TO PORTFOLIO"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={save}
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
  uploadCard: {
    marginTop: 30,
    borderRadius: 20,
    padding: 22,
    backgroundColor: palette.ink,
    gap: 10,
  },
  uploadEyebrow: { ...T.label, color: palette.bone, opacity: 0.6 },
  uploadTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    letterSpacing: -0.8,
    color: palette.bone,
  },
  uploadRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
});
