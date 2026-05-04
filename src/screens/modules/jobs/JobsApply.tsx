import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text as RNText } from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';

export default function ApplyScreen() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = jobsSeed.find((j) => j.id === id);
  const [pitch, setPitch] = useState('');
  const [rate, setRate] = useState('');
  const [timeline, setTimeline] = useState('');
  const apply = useStore((s) => s.applyToJob);
  const confetti = useStore((s) => s.confetti);
  const toast = useStore((s) => s.toast);

  const submit = () => {
    if (!pitch.trim() || !rate.trim()) {
      toast('Pitch and rate are required.', 'warn');
      return;
    }
    apply({
      jobId: id!,
      pitch,
      rate: Number(rate),
      timeline,
    });
    confetti();
    toast('Application sent. Good luck.', 'success');
    router.replace('/(modules)/jobs/active-deals');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="APPLY" title={job?.title ?? 'APPLY'} />}>
      {job ? (
        <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
          Budget: ₹{job.budgetMin.toLocaleString()} – ₹{job.budgetMax.toLocaleString()}
        </RNText>
      ) : null}

      <View style={styles.field}>
        <RNText style={styles.label}>YOUR PITCH · THE HONEST ONE</RNText>
        <TextInput
          style={[styles.input, { minHeight: 160, textAlignVertical: 'top' }]}
          value={pitch}
          onChangeText={setPitch}
          multiline
          placeholder="why you, in your voice. three sentences max."
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>YOUR RATE (₹)</RNText>
        <TextInput
          style={styles.input}
          value={rate}
          onChangeText={setRate}
          keyboardType="numeric"
          placeholder={job ? String(Math.round((job.budgetMin + job.budgetMax) / 2)) : '50000'}
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>TIMELINE</RNText>
        <TextInput
          style={styles.input}
          value={timeline}
          onChangeText={setTimeline}
          placeholder="14 days from contract"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <MagneticButton
          label="SUBMIT APPLICATION"
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
  sub: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 4 },
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
});
