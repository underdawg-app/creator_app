import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text as RNText,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { palette as staticPalette, type Palette } from '@/theme/colors';
import {
  useTheme,
  useThemedPalette,
  useThemedPaletteStyles,
} from '@/theme/ThemeContext';
import { withOpacity } from '@/theme/colorUtils';
import { fonts, type as T } from '@/theme/typography';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Chip } from '@/components/ui/Chip';
import { useStore } from '@/store';

const ACCENT = staticPalette.acid;
// Published-post DATA carries fixed dark surface/fg (posts render on their own
// fixed dark cards elsewhere), so these stay pinned regardless of app theme.
const POST_BG = staticPalette.ink;
const POST_FG = staticPalette.bone;

export default function TextComposer() {
  const { scheme } = useTheme();
  const inverse = scheme === 'light';
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [form, setForm] = useState<'ESSAY' | 'POEM' | 'NOTE'>('ESSAY');
  const publishImmediate = useStore((s) => s.publishImmediate);
  const addDraft = useStore((s) => s.addDraft);
  const toast = useStore((s) => s.toast);

  const publish = () => {
    if (!title.trim() && !body.trim()) {
      toast('Write something first.', 'warn');
      return;
    }
    publishImmediate({
      kind: 'TEXT',
      caption: title ? `${title}\n\n${body}` : body,
      tags: [form.toLowerCase()],
      color: ACCENT,
      bg: POST_BG,
      fg: POST_FG,
    });
    toast('Published.', 'success');
    router.replace('/(tabs)');
  };

  const saveDraft = () => {
    addDraft({
      kind: 'TEXT',
      caption: title ? `${title}\n\n${body}` : body,
      tags: [form.toLowerCase()],
      color: ACCENT,
      bg: POST_BG,
      fg: POST_FG,
    });
    toast('Draft saved.', 'success');
    router.replace('/(modules)/studio/drafts');
  };

  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.headerPad}>
          <ModuleHeader eyebrow="COMPOSE · TEXT" title="WRITE IT" inverse={inverse} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.chipRow}>
            {(['ESSAY', 'POEM', 'NOTE'] as const).map((k) => (
              <Chip
                key={k}
                label={k}
                active={form === k}
                onPress={() => setForm(k)}
                accent={staticPalette.ember}
                inverse={inverse}
              />
            ))}
          </View>

          <View style={styles.field}>
            <RNText style={styles.label}>TITLE</RNText>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder={
                form === 'POEM'
                  ? 'thirteen small prayers'
                  : form === 'NOTE'
                  ? 'one note, untitled'
                  : 'on the way home from the studio'
              }
              placeholderTextColor={withOpacity(palette.ink, 0.45)}
              maxFontSizeMultiplier={1.2}
            />
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <RNText style={styles.label}>BODY</RNText>
              <RNText style={styles.wordCount}>{wordCount} words</RNText>
            </View>
            <TextInput
              style={[styles.input, styles.bodyInput]}
              value={body}
              onChangeText={setBody}
              multiline
              placeholder={
                form === 'POEM'
                  ? 'one line at a time.\nbreak where it breathes.'
                  : 'write without waiting.'
              }
              placeholderTextColor={withOpacity(palette.ink, 0.45)}
              maxFontSizeMultiplier={1.2}
            />
          </View>

          <View style={styles.actions}>
            <MagneticButton
              label="DRAFT"
              background={staticPalette.acid}
              foreground={staticPalette.ink}
              onPress={saveDraft}
            />
            <MagneticButton
              label="PUBLISH"
              size="lg"
              background={ACCENT}
              foreground={staticPalette.ink}
              onPress={publish}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (palette: Palette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },
  headerPad: { paddingHorizontal: 12 },
  scroll: { paddingHorizontal: 12, paddingBottom: 140 },

  chipRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  field: { marginTop: 22, gap: 10 },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { ...T.label, color: palette.ink, opacity: 0.65, letterSpacing: 1.6 },
  wordCount: { ...T.micro, color: withOpacity(palette.ink, 0.45) },

  input: {
    borderWidth: 1,
    borderColor: withOpacity(palette.ink, 0.16),
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: palette.ink,
    backgroundColor: withOpacity(palette.ink, 0.06),
  },
  bodyInput: {
    minHeight: 280,
    textAlignVertical: 'top',
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 26,
  },

  actions: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 10,
  },
});
