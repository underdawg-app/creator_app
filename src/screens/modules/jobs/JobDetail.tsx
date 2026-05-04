import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { useLocalSearchParams, router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BadgePill } from '@/components/ui/BadgePill';
import { Section } from '@/components/ui/Section';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';

export default function JobDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = jobsSeed.find((j) => j.id === id);
  const applied = useStore((s) => s.applications.some((a) => a.jobId === id));

  if (!job) {
    return (
      <ScreenFrame header={<ModuleHeader eyebrow="JOB" title="NOT FOUND" />}>
        <RNText style={styles.body}>That job isn&apos;t open anymore.</RNText>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="JOB" title={job.brand} />}>
      <View style={styles.topPills}>
        <BadgePill label={job.type} accent={job.accent} />
        {job.verified ? <BadgePill label="VERIFIED BRAND" accent={palette.electric} /> : null}
      </View>

      <RNText
        style={styles.title}
        numberOfLines={3}
        adjustsFontSizeToFit
        minimumFontScale={0.65}
        maxFontSizeMultiplier={1.1}
      >
        {job.title}
      </RNText>

      <View style={styles.pricebox}>
        <RNText style={styles.priceLabel}>BUDGET</RNText>
        <RNText
          style={styles.priceValue}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
        >
          ₹{job.budgetMin.toLocaleString()} – ₹{job.budgetMax.toLocaleString()}
        </RNText>
        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <RNText style={styles.metaKey}>DEADLINE</RNText>
            <RNText style={styles.metaValue} maxFontSizeMultiplier={1.15}>
              {job.deadline}
            </RNText>
          </View>
          <View style={styles.metaCol}>
            <RNText style={styles.metaKey}>APPLICANTS</RNText>
            <RNText style={styles.metaValue}>{job.applicants}</RNText>
          </View>
          <View style={styles.metaCol}>
            <RNText style={styles.metaKey}>LOCATION</RNText>
            <RNText style={styles.metaValue} numberOfLines={1} adjustsFontSizeToFit>
              {job.location}
            </RNText>
          </View>
        </View>
      </View>

      <Section eyebrow="THE BRIEF">
        <RNText style={styles.brief} maxFontSizeMultiplier={1.2}>
          {job.description}
        </RNText>
      </Section>

      <Section eyebrow="DELIVERABLES">
        <View style={styles.delivBox}>
          <RNText style={styles.delivText} maxFontSizeMultiplier={1.2}>
            {job.deliverable}
          </RNText>
        </View>
      </Section>

      <View style={{ marginTop: 30, flexDirection: 'row', gap: 10 }}>
        <MagneticButton
          label={applied ? 'APPLIED' : 'APPLY'}
          size="lg"
          background={applied ? palette.mute : palette.ink}
          foreground={palette.acid}
          onPress={() =>
            applied
              ? router.push('/(modules)/jobs/active-deals')
              : router.push(`/(modules)/jobs/apply?id=${job.id}` as any)
          }
          disabled={applied}
        />
        <MagneticButton
          label="SAVE"
          background={palette.bone}
          foreground={palette.ink}
          onPress={() => router.back()}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  topPills: { flexDirection: 'row', gap: 8, marginTop: 4 },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -2,
    color: palette.ink,
    marginTop: 14,
  },
  pricebox: {
    marginTop: 18,
    borderRadius: 20,
    backgroundColor: palette.ink,
    padding: 22,
    gap: 6,
  },
  priceLabel: { ...T.label, color: palette.bone, opacity: 0.6 },
  priceValue: { fontFamily: fonts.displayBold, fontSize: 38, color: palette.acid, letterSpacing: -1.4 },
  metaRow: {
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: palette.lineDark,
    flexDirection: 'row',
  },
  metaCol: { flex: 1 },
  metaKey: { ...T.micro, color: palette.bone, opacity: 0.55 },
  metaValue: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.bone, marginTop: 4 },
  brief: {
    fontFamily: fonts.editorial,
    fontSize: 18,
    lineHeight: 26,
    color: palette.ink,
    opacity: 0.88,
    maxWidth: 360,
  },
  delivBox: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 16,
    backgroundColor: palette.paper,
  },
  delivText: { ...T.bodyMedium, color: palette.ink, letterSpacing: 0.1 },
  body: { ...T.body, color: palette.ink, opacity: 0.7 },
});
