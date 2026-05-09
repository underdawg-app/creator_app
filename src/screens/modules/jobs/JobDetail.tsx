import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { useLocalSearchParams, router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import {
  useThemedPalette,
  useThemedPaletteStyles,
} from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Tap } from '@/components/ui/Tap';
import { Asterisk } from '@/components/svg/Marks';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';

const formatINR = (n: number) =>
  n >= 100000
    ? `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1).replace(/\.?0+$/, '')}L`
    : `${Math.round(n / 1000)}K`;

const daysUntil = (iso: string) => {
  const target = new Date(iso).getTime();
  const days = Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24));
  return days;
};

function readableOn(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  const isDark = luma < 145;
  return {
    fg: isDark ? staticPalette.bone : staticPalette.ink,
    mute: isDark ? 'rgba(242,239,230,0.7)' : 'rgba(10,10,10,0.7)',
    line: isDark ? 'rgba(242,239,230,0.18)' : 'rgba(10,10,10,0.14)',
    isDark,
  };
}

export default function JobDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = jobsSeed.find((j) => j.id === id);
  const applied = useStore((s) => s.applications.some((a) => a.jobId === id));
  const toast = useStore((s) => s.toast);

  if (!job) {
    return (
      <ScreenFrame header={<ModuleHeader title="NOT FOUND" />}>
        <RNText style={styles.body}>That job isn&apos;t open anymore.</RNText>
      </ScreenFrame>
    );
  }

  const days = daysUntil(job.deadline);
  const c = readableOn(job.accent);

  const deliverables = job.deliverable
    .split(/,\s*|\s*;\s*|\s+·\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <ScreenFrame
      header={<ModuleHeader title={job.brand} />}
      contentStyle={styles.screenContent}
      footer={
        <View style={styles.footerWrap}>
          <View style={styles.footerInner}>
            <Tap
              onPress={() => toast('Saved to your shortlist.', 'success')}
              burstColor={palette.ink}
              style={styles.saveBtn}
            >
              <RNText style={styles.saveText}>SAVE</RNText>
            </Tap>
            <View style={{ flex: 1 }}>
              <MagneticButton
                label={applied ? 'APPLIED' : 'APPLY NOW'}
                size="lg"
                background={
                  applied ? staticPalette.boneMuted : staticPalette.ink
                }
                foreground={
                  applied ? staticPalette.ink : staticPalette.acid
                }
                onPress={() =>
                  applied
                    ? router.push('/(modules)/jobs/active-deals')
                    : router.push(`/(modules)/jobs/apply?id=${job.id}` as any)
                }
                disabled={applied}
              />
            </View>
          </View>
        </View>
      }
    >
      <View style={styles.eyebrowRow}>
        <View style={[styles.typeDot, { backgroundColor: job.accent }]} />
        <RNText style={styles.eyebrowType} maxFontSizeMultiplier={1.1}>
          {job.type}
        </RNText>
        {job.verified ? (
          <>
            <View style={styles.eyebrowSep} />
            <RNText style={styles.eyebrowVerified} maxFontSizeMultiplier={1.1}>
              VERIFIED
            </RNText>
          </>
        ) : null}
      </View>

      <RNText
        style={styles.title}
        numberOfLines={4}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        {job.title}
      </RNText>

      <RNText style={styles.location} maxFontSizeMultiplier={1.15}>
        {job.location}
      </RNText>

      <View style={[styles.budgetCard, { backgroundColor: job.accent }]}>
        <View style={styles.budgetInner}>
          <RNText style={[styles.budgetEyebrow, { color: c.mute }]}>BUDGET</RNText>
          <RNText
            style={[styles.budgetValue, { color: c.fg }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            maxFontSizeMultiplier={1.1}
          >
            ₹{formatINR(job.budgetMin)}
            <RNText style={[styles.budgetDash, { color: c.mute }]}> – </RNText>
            ₹{formatINR(job.budgetMax)}
          </RNText>

          <View style={[styles.metaRow, { borderTopColor: c.line }]}>
            <View style={styles.metaCol}>
              <RNText style={[styles.metaKey, { color: c.mute }]}>DEADLINE</RNText>
              <RNText
                style={[styles.metaValue, { color: c.fg }]}
                maxFontSizeMultiplier={1.15}
              >
                {days > 0 ? `${days} DAYS` : 'CLOSED'}
              </RNText>
            </View>
            <View style={[styles.metaSep, { backgroundColor: c.line }]} />
            <View style={styles.metaCol}>
              <RNText style={[styles.metaKey, { color: c.mute }]}>APPLICANTS</RNText>
              <RNText style={[styles.metaValue, { color: c.fg }]} maxFontSizeMultiplier={1.15}>
                {job.applicants}
              </RNText>
            </View>
            <View style={[styles.metaSep, { backgroundColor: c.line }]} />
            <View style={styles.metaCol}>
              <RNText style={[styles.metaKey, { color: c.mute }]}>NICHE</RNText>
              <RNText
                style={[styles.metaValue, { color: c.fg }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                maxFontSizeMultiplier={1.15}
              >
                {job.niche}
              </RNText>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
          <RNText style={styles.sectionEyebrow}>THE BRIEF</RNText>
        </View>
        <RNText style={styles.brief} maxFontSizeMultiplier={1.2}>
          {job.description}
        </RNText>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
          <RNText style={styles.sectionEyebrow}>DELIVERABLES</RNText>
        </View>
        <View style={styles.delivList}>
          {deliverables.map((d, i) => (
            <View key={`${i}-${d}`} style={styles.delivRow}>
              <RNText style={styles.delivNum}>
                {String(i + 1).padStart(2, '0')}
              </RNText>
              <RNText style={styles.delivText} maxFontSizeMultiplier={1.2}>
                {d}
              </RNText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
          <RNText style={styles.sectionEyebrow}>WHAT HAPPENS NEXT</RNText>
        </View>
        <View style={styles.steps}>
          {[
            'Submit your pitch with the rate you want.',
            'Brand reviews and shortlists within 48 hours.',
            'Negotiate scope, sign on-platform, get paid.',
          ].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <RNText style={styles.stepNum}>
                {String(i + 1).padStart(2, '0')}
              </RNText>
              <RNText style={styles.stepText} maxFontSizeMultiplier={1.2}>
                {step}
              </RNText>
            </View>
          ))}
        </View>
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screenContent: { paddingHorizontal: 16, paddingBottom: 140 },
    body: { ...T.body, color: palette.ink, opacity: 0.7 },

    eyebrowRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 4,
    },
    typeDot: { width: 8, height: 8, borderRadius: 4 },
    eyebrowType: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.8,
    },
    eyebrowSep: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: palette.ink,
      opacity: 0.4,
    },
    eyebrowVerified: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
      letterSpacing: 1.6,
    },

    title: {
      fontFamily: fonts.displayBold,
      fontSize: 48,
      lineHeight: 48,
      letterSpacing: -2.2,
      color: palette.ink,
      marginTop: 14,
    },
    location: {
      ...T.label,
      color: palette.ink,
      opacity: 0.6,
      letterSpacing: 1.6,
      marginTop: 12,
    },

    budgetCard: {
      marginTop: 22,
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    budgetInner: { padding: 22, gap: 8 },
    budgetEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.8,
    },
    budgetValue: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 42,
      letterSpacing: -1.8,
      color: palette.ink,
    },
    budgetDash: {
      fontFamily: fonts.editorialItalic,
      fontSize: 34,
      letterSpacing: 0,
      color: palette.ink,
      opacity: 0.5,
    },
    metaRow: {
      marginTop: 14,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: 'rgba(10,10,10,0.12)',
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    metaCol: { flex: 1, gap: 6 },
    metaSep: {
      width: 1,
      backgroundColor: 'rgba(10,10,10,0.10)',
      marginHorizontal: 6,
    },
    metaKey: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
      fontSize: 10,
    },
    metaValue: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: -0.2,
      color: palette.ink,
    },

    section: {
      marginTop: 30,
    },
    sectionHead: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderTopWidth: 1,
      borderTopColor: palette.lineDark,
      paddingTop: 14,
      paddingBottom: 14,
    },
    sectionEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.65,
      letterSpacing: 1.8,
    },
    brief: {
      fontFamily: fonts.editorial,
      fontSize: 19,
      lineHeight: 28,
      color: palette.ink,
      opacity: 0.88,
      maxWidth: 560,
    },

    delivList: { gap: 10 },
    delivRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
      paddingVertical: 6,
    },
    delivNum: {
      fontFamily: fonts.displayBold,
      fontSize: 12,
      color: palette.ink,
      opacity: 0.4,
      letterSpacing: 0.4,
      paddingTop: 3,
      width: 26,
    },
    delivText: {
      ...T.body,
      color: palette.ink,
      flex: 1,
      lineHeight: 22,
    },

    steps: { gap: 14 },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    stepNum: {
      fontFamily: fonts.editorialItalic,
      fontSize: 22,
      color: palette.ember,
      letterSpacing: -0.6,
      width: 28,
      lineHeight: 22,
      paddingTop: 2,
    },
    stepText: {
      ...T.body,
      color: palette.ink,
      flex: 1,
      lineHeight: 22,
    },

    footerWrap: {
      backgroundColor: palette.bone,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 14,
    },
    footerInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    saveBtn: {
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.lineDark,
    },
    saveText: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.8,
    },
  });
