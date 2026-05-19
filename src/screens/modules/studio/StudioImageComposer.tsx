import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text as RNText,
  ScrollView,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useTheme } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

const SURFACE = staticPalette.ink;
const FG = staticPalette.bone;
const FG_DIM = 'rgba(242,239,230,0.65)';
const FG_MUTED = 'rgba(242,239,230,0.45)';
const CARD_BG = 'rgba(242,239,230,0.06)';
const CARD_BORDER = 'rgba(242,239,230,0.16)';
const ACCENT = staticPalette.acid;

const COLOR_PICKS = [
  { c: '#D8FF3D', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A' },
  { c: '#FF6BB5', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#FF5A1F', bg: '#F2EFE6', fg: '#0A0A0A' },
  { c: '#0A0A0A', bg: '#D8FF3D', fg: '#0A0A0A' },
];

export default function ImageComposer() {
  const { scheme } = useTheme();
  const inverse = scheme === 'light';

  const { uri: capturedUri, type: capturedType } = useLocalSearchParams<{
    uri?: string;
    type?: 'photo' | 'video';
  }>();
  const hasMedia = !!capturedUri;
  const isVideo = capturedType === 'video';

  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [crossPost, setCrossPost] = useState<string[]>(['IG']);
  const [pick, setPick] = useState(COLOR_PICKS[0]);
  const toast = useStore((s) => s.toast);
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
    toast('Published. Live on your feed.', 'success');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.headerPad}>
          <ModuleHeader eyebrow="COMPOSE · IMAGE" title="NEW POST" inverse={inverse} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={[styles.preview, { backgroundColor: pick.bg }]}>
            {hasMedia ? (
              isVideo ? (
                <Video
                  source={{ uri: capturedUri! }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                  repeat
                  muted
                  paused={false}
                />
              ) : (
                <Image
                  source={{ uri: capturedUri! }}
                  style={StyleSheet.absoluteFill}
                  resizeMode="cover"
                />
              )
            ) : (
              <View style={[styles.previewBlob, { backgroundColor: pick.c }]} />
            )}
            <RNText
              style={[
                styles.previewText,
                { color: pick.fg },
                hasMedia && styles.previewTextOverMedia,
              ]}
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              maxFontSizeMultiplier={1.1}
            >
              {caption || (hasMedia ? '' : 'your caption appears here as art.')}
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
                    {
                      backgroundColor: p.c,
                      borderColor: pick.c === p.c ? FG : CARD_BORDER,
                    },
                  ]}
                >
                  {pick.c === p.c ? (
                    <Ionicons name="checkmark" size={14} color={staticPalette.ink} />
                  ) : null}
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
              placeholderTextColor={FG_MUTED}
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
                placeholderTextColor={FG_MUTED}
                autoCapitalize="none"
              />
              <Tap onPress={addTag} style={styles.addBtn} burstColor={ACCENT} variant="heavy">
                <Ionicons name="add" size={20} color={staticPalette.ink} />
              </Tap>
            </View>
            {tags.length > 0 ? (
              <View style={styles.chipRow}>
                {tags.map((t, i) => (
                  <Chip
                    key={`${t}-${i}`}
                    label={`#${t}`}
                    active
                    accent={staticPalette.electric}
                    inverse={inverse}
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
                  accent={staticPalette.blush}
                  inverse={inverse}
                />
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <MagneticButton
              label="SAVE DRAFT"
              background={staticPalette.acid}
              foreground={staticPalette.ink}
              onPress={saveDraft}
            />
            <MagneticButton
              label="SCHEDULE"
              background={staticPalette.acid}
              foreground={staticPalette.ink}
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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: SURFACE },
  headerPad: { paddingHorizontal: 12 },
  scroll: { paddingHorizontal: 12, paddingBottom: 140 },

  preview: {
    height: 220,
    borderRadius: 20,
    marginTop: 6,
    padding: 22,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  previewBlob: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.85,
  },
  previewText: {
    fontFamily: fonts.displayBold,
    fontSize: 30,
    lineHeight: 32,
    letterSpacing: -0.8,
  },
  previewTextOverMedia: {
    color: '#F2EFE6',
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  field: { marginTop: 22, gap: 10 },
  label: {
    ...T.label,
    color: FG,
    opacity: 0.65,
    letterSpacing: 1.6,
  },

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
    borderColor: CARD_BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: FG,
    backgroundColor: CARD_BG,
  },
  counter: {
    ...T.micro,
    color: FG_MUTED,
    alignSelf: 'flex-end',
  },
  tagAdd: { flexDirection: 'row', gap: 10 },
  addBtn: {
    width: 52,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  actions: { marginTop: 30, flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
});
