import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { EmptyState } from '@/components/ui/EmptyState';
import { useStore } from '@/store';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const TIMES = ['08:00', '12:00', '15:00', '18:00', '21:00'];

export default function ScheduleScreen() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const drafts = useStore((s) => s.drafts);
  const scheduleDraft = useStore((s) => s.scheduleDraft);
  const toast = useStore((s) => s.toast);
  const [pickedDay, setPickedDay] = useState('THU');
  const [pickedTime, setPickedTime] = useState('18:00');
  const [selectedDraft, setSelectedDraft] = useState<string | null>(null);

  const commit = () => {
    if (!selectedDraft) {
      toast('Pick a draft first.', 'warn');
      return;
    }
    scheduleDraft(selectedDraft, `${pickedDay} · ${pickedTime}`);
    toast(`Scheduled for ${pickedDay} at ${pickedTime}.`, 'success');
    router.replace('/(modules)/studio/drafts');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="STUDIO" title="SCHEDULE" />}>
      <Section eyebrow="AI-SUGGESTED" title="best windows this week.">
        <RNText style={styles.suggestion} maxFontSizeMultiplier={1.2}>
          Tue and Thu, 18:00–19:00 (+42% engagement for your cohort).
        </RNText>
      </Section>

      <Section eyebrow="PICK A DAY">
        <View style={styles.row}>
          {DAYS.map((d) => (
            <Chip key={d} label={d} active={pickedDay === d} onPress={() => setPickedDay(d)} accent={palette.electric} />
          ))}
        </View>
      </Section>

      <Section eyebrow="PICK A TIME">
        <View style={styles.row}>
          {TIMES.map((t) => (
            <Chip key={t} label={t} active={pickedTime === t} onPress={() => setPickedTime(t)} accent={palette.acid} />
          ))}
        </View>
      </Section>

      <Section eyebrow={`DRAFTS · ${drafts.length}`} title="choose a post.">
        {drafts.length === 0 ? (
          <EmptyState
            title="no drafts to schedule."
            body="compose something first, then come back."
            action={{ label: 'COMPOSE', onPress: () => router.push('/(modules)/studio') }}
          />
        ) : (
          <View style={{ gap: 10 }}>
            {drafts.map((d) => (
              <Chip
                key={d.id}
                label={(d.caption || '(untitled)').slice(0, 28)}
                active={selectedDraft === d.id}
                onPress={() => setSelectedDraft(d.id)}
                accent={d.color}
              />
            ))}
          </View>
        )}
      </Section>

      <View style={{ marginTop: 30 }}>
        <MagneticButton
          label={`SCHEDULE — ${pickedDay} · ${pickedTime}`}
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={commit}
          disabled={!selectedDraft}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  suggestion: {
    fontFamily: fonts.editorialItalic,
    fontSize: 20,
    lineHeight: 26,
    color: palette.ink,
    opacity: 0.82,
  },
});
