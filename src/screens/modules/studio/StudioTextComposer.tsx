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

export default function TextComposer() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [kind, setKind] = useState<'TEXT' | 'AUDIO'>('TEXT');
  const publishImmediate = useStore((s) => s.publishImmediate);
  const addDraft = useStore((s) => s.addDraft);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const publish = () => {
    if (!title.trim() && !body.trim()) {
      toast('Write something first.', 'warn');
      return;
    }
    publishImmediate({
      kind,
      caption: title ? `${title}\n\n${body}` : body,
      tags: [],
      color: palette.electric,
      bg: palette.paper,
      fg: palette.ink,
    });
    confetti();
    toast('Published.', 'success');
    router.replace('/(tabs)');
  };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="COMPOSE" title={kind === 'TEXT' ? 'ESSAY / POEM' : 'AUDIO / PODCAST'} />}
    >
      <View style={styles.chipRow}>
        <Chip label="TEXT" active={kind === 'TEXT'} onPress={() => setKind('TEXT')} accent={palette.ember} />
        <Chip label="AUDIO" active={kind === 'AUDIO'} onPress={() => setKind('AUDIO')} accent={palette.blush} />
      </View>

      {kind === 'AUDIO' ? (
        <View style={styles.audioCard}>
          <View style={styles.audioLevel}>
            {Array.from({ length: 32 }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: 3,
                  height: 12 + (Math.sin(i * 0.8) + 1) * 28,
                  backgroundColor: palette.acid,
                  opacity: 0.6 + (i % 3) * 0.15,
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
          <RNText style={styles.audioLabel} maxFontSizeMultiplier={1.15}>
            TAP TO RECORD · 00:00 / 30:00
          </RNText>
        </View>
      ) : null}

      <View style={styles.field}>
        <RNText style={styles.label}>TITLE</RNText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="thirteen small prayers"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>{kind === 'AUDIO' ? 'SHOW NOTES' : 'BODY'}</RNText>
        <TextInput
          style={[styles.input, { minHeight: 240, textAlignVertical: 'top' }]}
          value={body}
          onChangeText={setBody}
          multiline
          placeholder={kind === 'AUDIO' ? 'what this episode is about.' : 'write without waiting.'}
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>

      <View style={styles.actions}>
        <MagneticButton
          label="DRAFT"
          background={palette.bone}
          foreground={palette.ink}
          onPress={() => {
            addDraft({
              kind,
              caption: title ? `${title}\n\n${body}` : body,
              tags: [],
              color: palette.electric,
              bg: palette.paper,
              fg: palette.ink,
            });
            toast('Draft saved.', 'success');
            router.replace('/(modules)/studio/drafts');
          }}
        />
        <MagneticButton
          label="PUBLISH"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={publish}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  chipRow: { flexDirection: 'row', gap: 8 },
  field: { marginTop: 22, gap: 10 },
  label: { ...T.label, color: palette.ink, opacity: 0.65 },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: palette.ink,
    backgroundColor: palette.paper,
  },
  audioCard: {
    marginTop: 18,
    borderRadius: 20,
    backgroundColor: palette.ink,
    padding: 22,
    alignItems: 'center',
    gap: 14,
  },
  audioLevel: { flexDirection: 'row', alignItems: 'center', gap: 3, height: 60 },
  audioLabel: { ...T.label, color: palette.bone, opacity: 0.7 },
  actions: { marginTop: 30, flexDirection: 'row', gap: 10 },
});
