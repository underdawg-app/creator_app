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
import { Stepper } from '@/components/ui/Stepper';
import { Section } from '@/components/ui/Section';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

const EDITOR_STEPS = ['TRIM', 'FILTERS', 'AUDIO', 'COVER', 'POST'];

export default function VideoComposer() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [step, setStep] = useState(0);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('FILM');
  const [speed, setSpeed] = useState('1x');
  const publishImmediate = useStore((s) => s.publishImmediate);
  const confetti = useStore((s) => s.confetti);
  const toast = useStore((s) => s.toast);

  const publish = () => {
    publishImmediate({
      kind: 'VIDEO',
      caption: caption || '(video post)',
      tags: [category.toLowerCase()],
      color: palette.electric,
      bg: palette.ink,
      fg: palette.bone,
    });
    confetti();
    toast('Video published.', 'success');
    router.replace('/(tabs)');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMPOSE · VIDEO" title="VIDEO STUDIO" />}>
      <Stepper steps={EDITOR_STEPS} current={step} />

      <View style={styles.viewer}>
        <View style={styles.timeline}>
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.tick,
                i % 4 === 0 ? { backgroundColor: palette.acid } : undefined,
              ]}
            />
          ))}
        </View>
        <Ionicons name="play" size={60} color={palette.bone} style={{ opacity: 0.9 }} />
        <RNText style={styles.viewerLabel} maxFontSizeMultiplier={1.15}>
          PREVIEW · {speed} · {EDITOR_STEPS[step]}
        </RNText>
      </View>

      <Section eyebrow={`STEP ${step + 1} / 5`} title={EDITOR_STEPS[step]}>
        {step === 0 ? (
          <View style={styles.chipRow}>
            {['START · 00:00', 'END · 02:08', 'SPLIT'].map((x) => (
              <Chip key={x} label={x} accent={palette.acid} onPress={() => toast('Trimmed.', 'default')} />
            ))}
          </View>
        ) : null}
        {step === 1 ? (
          <View style={styles.chipRow}>
            {['NONE', 'NIGHT BUS', 'SALT', 'BONE', 'ELECTRIC', 'ANALOG'].map((x, i) => (
              <Chip key={x} label={x} active={i === 1} accent={palette.electric} onPress={() => toast(`Filter: ${x}`, 'default')} />
            ))}
          </View>
        ) : null}
        {step === 2 ? (
          <View style={{ gap: 12 }}>
            <View style={styles.chipRow}>
              {['0.5x', '1x', '1.5x', '2x'].map((x) => (
                <Chip key={x} label={x} active={speed === x} onPress={() => setSpeed(x)} accent={palette.blush} />
              ))}
            </View>
            <MagneticButton
              label="RECORD VOICEOVER"
              size="sm"
              background={palette.bone}
              foreground={palette.ink}
              onPress={() => toast('Voiceover captured.', 'success')}
            />
          </View>
        ) : null}
        {step === 3 ? (
          <View style={styles.coverRow}>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={[styles.coverCard, { backgroundColor: i === 2 ? palette.acid : palette.line }]}>
                <RNText style={styles.coverFrame}>FR {i}</RNText>
              </View>
            ))}
          </View>
        ) : null}
        {step === 4 ? (
          <View style={{ gap: 14 }}>
            <TextInput
              style={styles.input}
              value={caption}
              onChangeText={setCaption}
              placeholder="caption this film."
              placeholderTextColor={palette.mute}
              multiline
              maxFontSizeMultiplier={1.2}
            />
            <View style={styles.chipRow}>
              {['FILM', 'DANCE', 'MUSIC', 'COMEDY', 'TUTORIAL'].map((c) => (
                <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} accent={palette.ember} />
              ))}
            </View>
          </View>
        ) : null}
      </Section>

      <View style={styles.actions}>
        <MagneticButton
          label="BACK"
          background={palette.bone}
          foreground={palette.ink}
          onPress={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        />
        {step < 4 ? (
          <MagneticButton
            label="NEXT"
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={() => setStep(step + 1)}
          />
        ) : (
          <MagneticButton
            label="PUBLISH"
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={publish}
          />
        )}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  viewer: {
    marginTop: 22,
    height: 240,
    borderRadius: 20,
    backgroundColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  timeline: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    gap: 2,
    height: 22,
  },
  tick: { flex: 1, height: '100%', backgroundColor: palette.mute, opacity: 0.35, borderRadius: 2 },
  viewerLabel: { ...T.label, color: palette.bone, opacity: 0.7, position: 'absolute', top: 14, left: 18 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  coverRow: { flexDirection: 'row', gap: 8 },
  coverCard: { flex: 1, height: 80, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  coverFrame: { fontFamily: fonts.displayBold, fontSize: 14, color: palette.ink },
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
    minHeight: 90,
    textAlignVertical: 'top',
  },
  actions: { marginTop: 30, flexDirection: 'row', gap: 10 },
});
