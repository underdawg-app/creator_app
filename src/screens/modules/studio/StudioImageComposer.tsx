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
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

const COLOR_PICKS = [
  { c: '#D8FF3D', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A' },
  { c: '#FF6BB5', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#FF5A1F', bg: '#F2EFE6', fg: '#0A0A0A' },
  { c: '#0A0A0A', bg: '#D8FF3D', fg: '#0A0A0A' },
];

export default function ImageComposer() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [crossPost, setCrossPost] = useState<string[]>(['IG']);
  const [pick, setPick] = useState(COLOR_PICKS[0]);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);
  const addDraft = useStore((s) => s.addDraft);
  const publishImmediate = useStore((s) => s.publishImmediate);

  const toggleCross = (k: string) =>
    setCrossPost((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '');
    if (!t) return;
    setTags([...tags, t]);
    setTagInput('');
  };

  const saveDraft = () => {
    addDraft({
      kind: 'IMAGE',
      caption: caption || '(no caption)',
      tags,
      color: pick.c,
      bg: pick.bg,
      fg: pick.fg,
    });
    toast('Draft saved.', 'success');
    router.replace('/(modules)/studio/drafts');
  };

  const publish = () => {
    publishImmediate({
      kind: 'IMAGE',
      caption: caption || '(untitled)',
      tags,
      color: pick.c,
      bg: pick.bg,
      fg: pick.fg,
    });
    confetti();
    toast('Published. Live on your feed.', 'success');
    router.replace('/(tabs)');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMPOSE · IMAGE" title="NEW POST" />}>
      <View style={[styles.preview, { backgroundColor: pick.bg }]}>
        <View style={[styles.previewBlob, { backgroundColor: pick.c }]} />
        <RNText
          style={[styles.previewText, { color: pick.fg }]}
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {caption || 'your caption appears here as art.'}
        </RNText>
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>PALETTE</RNText>
        <View style={styles.swatchRow}>
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

      <View style={styles.field}>
        <RNText style={styles.label}>CAPTION · 2200 CHARS</RNText>
        <TextInput
          style={[styles.input, { minHeight: 120, textAlignVertical: 'top' }]}
          value={caption}
          onChangeText={setCaption}
          multiline
          maxLength={2200}
          placeholder="write it like you mean it."
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
        <RNText style={styles.counter}>{caption.length} / 2200</RNText>
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>TAGS · MAX 30</RNText>
        <View style={styles.tagAdd}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={tagInput}
            onChangeText={setTagInput}
            onSubmitEditing={addTag}
            placeholder="#hashtag"
            placeholderTextColor={palette.mute}
            autoCapitalize="none"
          />
          <Tap onPress={addTag} style={styles.addBtn} burstColor={palette.acid} variant="heavy">
            <Ionicons name="add" size={18} color={staticPalette.ink} />
          </Tap>
        </View>
        {tags.length > 0 ? (
          <View style={styles.chipRow}>
            {tags.map((t, i) => (
              <Chip
                key={`${t}-${i}`}
                label={`#${t}`}
                active
                accent={palette.electric}
                onPress={() => setTags(tags.filter((_, idx) => idx !== i))}
              />
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>CROSS-POST</RNText>
        <View style={styles.chipRow}>
          {['IG', 'TIKTOK', 'YOUTUBE', 'X', 'SPOTIFY'].map((k) => (
            <Chip
              key={k}
              label={k}
              active={crossPost.includes(k)}
              onPress={() => toggleCross(k)}
              accent={palette.blush}
            />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <MagneticButton
          label="SAVE DRAFT"
          background={palette.bone}
          foreground={palette.ink}
          onPress={saveDraft}
        />
        <MagneticButton
          label="SCHEDULE"
          background={palette.bone}
          foreground={palette.ink}
          onPress={() => {
            addDraft({
              kind: 'IMAGE',
              caption: caption || '(scheduled)',
              tags,
              color: pick.c,
              bg: pick.bg,
              fg: pick.fg,
            });
            router.push('/(modules)/studio/schedule');
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
  preview: {
    height: 220,
    borderRadius: 20,
    marginTop: 6,
    padding: 22,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  previewBlob: { position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: 110, opacity: 0.85 },
  previewText: { fontFamily: fonts.displayBold, fontSize: 30, lineHeight: 32, letterSpacing: -0.8 },
  field: { marginTop: 22, gap: 10 },
  label: { ...T.label, color: staticPalette.ink, opacity: 0.65 },
  swatchRow: { flexDirection: 'row', gap: 10 },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: staticPalette.ink,
    backgroundColor: palette.paper,
  },
  counter: { ...T.micro, color: staticPalette.ink, opacity: 0.5, alignSelf: 'flex-end' },
  tagAdd: { flexDirection: 'row', gap: 10 },
  addBtn: {
    width: 52,
    borderRadius: 14,
    backgroundColor: palette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  actions: { marginTop: 30, flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
});
