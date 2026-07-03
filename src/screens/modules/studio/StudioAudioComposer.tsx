import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text as RNText,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
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
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

// Theme-invariant accents; mic icon / waveform draw on these fixed fills.
const ACCENT = staticPalette.acid;
const REC = staticPalette.ember;
// Published-post DATA carries fixed dark surface/fg — a post renders on its
// own fixed dark card elsewhere, so these stay pinned regardless of app theme.
const POST_BG = staticPalette.ink;
const POST_FG = staticPalette.bone;

const KINDS = ['TRACK', 'CLIP', 'PODCAST'] as const;
type AudioKind = (typeof KINDS)[number];

export default function AudioComposer() {
  const { scheme } = useTheme();
  const inverse = scheme === 'light';
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const [kind, setKind] = useState<AudioKind>('TRACK');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const elapsedTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const publishImmediate = useStore((s) => s.publishImmediate);
  const addDraft = useStore((s) => s.addDraft);
  const toast = useStore((s) => s.toast);

  // Recording timer
  useEffect(() => {
    if (recording) {
      elapsedTimer.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } else if (elapsedTimer.current) {
      clearInterval(elapsedTimer.current);
      elapsedTimer.current = null;
    }
    return () => {
      if (elapsedTimer.current) {
        clearInterval(elapsedTimer.current);
        elapsedTimer.current = null;
      }
    };
  }, [recording]);

  const toggleRecord = () => {
    if (!recording) {
      setElapsed(0);
      setRecording(true);
      toast('Recording…', 'default');
    } else {
      setRecording(false);
      toast(`Recorded ${formatMmss(elapsed)}.`, 'success');
    }
  };

  const publish = () => {
    if (!title.trim() && elapsed === 0) {
      toast('Record something or give it a title.', 'warn');
      return;
    }
    publishImmediate({
      kind: 'AUDIO',
      caption: title ? `${title}${notes ? `\n\n${notes}` : ''}` : notes,
      tags: [kind.toLowerCase()],
      color: ACCENT,
      bg: POST_BG,
      fg: POST_FG,
    });
    toast('Audio published.', 'success');
    router.replace('/(tabs)');
  };

  const saveDraft = () => {
    addDraft({
      kind: 'AUDIO',
      caption: title ? `${title}${notes ? `\n\n${notes}` : ''}` : notes,
      tags: [kind.toLowerCase()],
      color: ACCENT,
      bg: POST_BG,
      fg: POST_FG,
    });
    toast('Draft saved.', 'success');
    router.replace('/(modules)/studio/drafts');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.headerPad}>
          <ModuleHeader eyebrow="COMPOSE · AUDIO" title="AUDIO STUDIO" inverse={inverse} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.chipRow}>
            {KINDS.map((k) => (
              <Chip
                key={k}
                label={k}
                active={kind === k}
                onPress={() => setKind(k)}
                accent={staticPalette.blush}
                inverse={inverse}
              />
            ))}
          </View>

          {/* Recorder */}
          <View style={styles.recorderCard}>
            <Waveform active={recording} />
            <RNText style={styles.elapsedText}>
              {formatMmss(elapsed)} <RNText style={styles.elapsedSub}>/ 30:00</RNText>
            </RNText>
            <Pressable
              onPress={toggleRecord}
              style={[styles.recordBtn, { backgroundColor: recording ? REC : ACCENT }]}
            >
              <Ionicons
                name={recording ? 'stop' : 'mic'}
                size={28}
                color={staticPalette.ink}
              />
            </Pressable>
            <RNText style={styles.recordHint}>
              {recording ? 'tap to stop' : elapsed > 0 ? 'tap to record again' : 'tap to start'}
            </RNText>
          </View>

          <View style={styles.field}>
            <RNText style={styles.label}>TITLE</RNText>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder={
                kind === 'PODCAST'
                  ? 'episode 03 — late starts'
                  : kind === 'CLIP'
                  ? 'thirty second snippet'
                  : 'untitled track'
              }
              placeholderTextColor={withOpacity(palette.ink, 0.45)}
              maxFontSizeMultiplier={1.2}
            />
          </View>

          <View style={styles.field}>
            <RNText style={styles.label}>
              {kind === 'PODCAST' ? 'SHOW NOTES' : 'DESCRIPTION'}
            </RNText>
            <TextInput
              style={[styles.input, styles.notes]}
              value={notes}
              onChangeText={setNotes}
              multiline
              placeholder={
                kind === 'PODCAST'
                  ? 'what this episode is about. links go here.'
                  : 'a line about the sound.'
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

/* -------------------------------------------------------------------------- */
/*  Waveform                                                                  */
/* -------------------------------------------------------------------------- */

function Waveform({ active }: { active: boolean }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const palette = useThemedPalette();
  return (
    <View style={styles.wave}>
      {Array.from({ length: 28 }).map((_, i) => (
        <WaveBar key={i} index={i} active={active} idleColor={withOpacity(palette.ink, 0.65)} />
      ))}
    </View>
  );
}

function WaveBar({ index, active, idleColor }: { index: number; active: boolean; idleColor: string }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const idle = 6 + ((index * 13) % 14);
  const peak = 8 + ((index * 17) % 38);
  const h = useSharedValue(idle);

  useEffect(() => {
    if (active) {
      // Each bar pulses with a slightly offset phase so the waveform looks
      // organic — driven entirely on the UI thread by Reanimated.
      const delay = (index * 53) % 280;
      h.value = idle;
      h.value = withRepeat(
        withTiming(peak, {
          duration: 420 + delay,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true,
      );
    } else {
      h.value = withTiming(idle, { duration: 220 });
    }
  }, [active, h, idle, peak, index]);

  const animStyle = useAnimatedStyle(() => ({ height: h.value }));

  return (
    <Animated.View
      style={[
        styles.waveBar,
        { backgroundColor: active ? ACCENT : idleColor },
        animStyle,
      ]}
    />
  );
}

function formatMmss(total: number) {
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
}

const makeStyles = (palette: Palette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },
  headerPad: { paddingHorizontal: 12 },
  scroll: { paddingHorizontal: 12, paddingBottom: 140 },

  chipRow: { flexDirection: 'row', gap: 8, marginTop: 4 },

  recorderCard: {
    marginTop: 22,
    padding: 22,
    borderRadius: 22,
    backgroundColor: withOpacity(palette.ink, 0.06),
    borderWidth: 1,
    borderColor: withOpacity(palette.ink, 0.16),
    alignItems: 'center',
    gap: 14,
  },
  wave: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 60,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
  },
  elapsedText: {
    fontFamily: fonts.displayBold,
    fontSize: 36,
    letterSpacing: -1.2,
    color: palette.ink,
    fontVariant: ['tabular-nums'],
  },
  elapsedSub: {
    ...T.label,
    color: withOpacity(palette.ink, 0.45),
    fontSize: 14,
    fontFamily: fonts.body,
  },
  recordBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordHint: {
    ...T.label,
    color: withOpacity(palette.ink, 0.65),
    letterSpacing: 1.4,
  },

  field: { marginTop: 22, gap: 10 },
  label: { ...T.label, color: palette.ink, opacity: 0.65, letterSpacing: 1.6 },
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
  notes: { minHeight: 140, textAlignVertical: 'top' },

  actions: { marginTop: 30, flexDirection: 'row', gap: 10 },
});
