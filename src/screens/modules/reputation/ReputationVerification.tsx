import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

const ID_TYPES = ['PASSPORT', "DRIVER'S LICENSE", 'AADHAAR', 'NATIONAL ID'] as const;
type IdType = (typeof ID_TYPES)[number];

const BLUE_REQS = [
  { key: 'followers', label: '1K+ followers', met: true },
  { key: 'rep', label: '60+ reputation (you: 82)', met: true },
  { key: 'id', label: 'Government ID verified', met: false },
];

export default function ReputationVerification() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const steps = useStore((s) => s.verification);
  const advance = useStore((s) => s.advanceVerification);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const [idType, setIdType] = useState<IdType>('PASSPORT');
  const [frontUp, setFrontUp] = useState(false);
  const [backUp, setBackUp] = useState(false);
  const [livenessOpen, setLivenessOpen] = useState(false);

  const idStep = steps.find((s) => s.key === 'id');
  const livenessStep = steps.find((s) => s.key === 'liveness');
  const idDone = !!idStep?.done;
  const doneCount = steps.filter((s) => s.done).length;

  const status = useMemo(() => {
    if (doneCount >= steps.length) return { label: 'VERIFIED', accent: palette.acid };
    if (doneCount > 2) return { label: 'IN REVIEW', accent: palette.electric };
    return { label: 'NOT STARTED', accent: palette.mute };
  }, [doneCount, steps.length, palette]);

  // Mark the 'id' step done once both sides + selfie are simulated.
  const tickId = () => {
    if (!idDone) advance();
  };

  const uploadFront = () => {
    setFrontUp(true);
    toast('Uploaded.', 'success');
  };
  const uploadBack = () => {
    setBackUp(true);
    toast('Uploaded.', 'success');
  };

  const runLiveness = () => {
    setLivenessOpen(false);
    // Ensure the ID step is ticked first, then the liveness step.
    if (!idDone) advance();
    if (!livenessStep?.done) advance();
    toast('Liveness passed — under review.', 'success');
  };

  const applyBlueCheck = () => {
    if (!idDone) {
      toast('Finish ID verification first.', 'warn');
      return;
    }
    toast('Application submitted — review in 48h.', 'success');
    confetti();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="REPUTATION" title="VERIFICATION" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        prove it&apos;s you.
      </RNText>

      <View style={styles.statusRow}>
        <RNText style={styles.statusKicker}>STATUS</RNText>
        <View style={[styles.statusPill, { backgroundColor: status.accent }]}>
          <RNText style={styles.statusPillText}>{status.label}</RNText>
        </View>
        <RNText style={styles.statusCount}>{doneCount}/{steps.length}</RNText>
      </View>

      {/* Numbered checklist */}
      <Section eyebrow="CHECKLIST">
        <View style={styles.checklist}>
          {steps.map((s, i) => (
            <View key={s.key} style={styles.checkRow}>
              <View style={[styles.checkDot, { backgroundColor: s.done ? palette.acid : palette.boneSoft }]}>
                {s.done ? (
                  <Ionicons name="checkmark" size={14} color={palette.ink} />
                ) : (
                  <RNText style={styles.checkNum}>{i + 1}</RNText>
                )}
              </View>
              <RNText style={[styles.checkLabel, { opacity: s.done ? 1 : 0.55 }]}>{s.label}</RNText>
              <RNText style={styles.checkState}>{s.done ? 'DONE' : 'PENDING'}</RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* Identity flow */}
      <Section eyebrow="IDENTITY FLOW">
        <View style={styles.flowCard}>
          <RNText style={styles.flowStep}>1 · SELECT ID TYPE</RNText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {ID_TYPES.map((t) => (
              <Chip key={t} label={t} active={idType === t} size="sm" onPress={() => setIdType(t)} />
            ))}
          </ScrollView>

          <RNText style={[styles.flowStep, { marginTop: 18 }]}>2 · UPLOAD DOCUMENT</RNText>
          <View style={styles.uploadRow}>
            <Tap onPress={uploadFront} style={[styles.uploadBox, frontUp && styles.uploadBoxDone]} burstColor={palette.acid}>
              <Ionicons name={frontUp ? 'checkmark-circle' : 'camera-outline'} size={20} color={palette.ink} />
              <RNText style={styles.uploadText}>{frontUp ? 'FRONT ✓' : 'UPLOAD FRONT'}</RNText>
            </Tap>
            <Tap onPress={uploadBack} style={[styles.uploadBox, backUp && styles.uploadBoxDone]} burstColor={palette.acid}>
              <Ionicons name={backUp ? 'checkmark-circle' : 'camera-outline'} size={20} color={palette.ink} />
              <RNText style={styles.uploadText}>{backUp ? 'BACK ✓' : 'UPLOAD BACK'}</RNText>
            </Tap>
          </View>

          <RNText style={[styles.flowStep, { marginTop: 18 }]}>3 · LIVENESS</RNText>
          <Tap
            onPress={() => {
              if (!frontUp || !backUp) {
                toast('Upload both sides of your ID first.', 'warn');
                return;
              }
              tickId();
              setLivenessOpen(true);
            }}
            style={[styles.livenessBtn, livenessStep?.done && styles.livenessBtnDone]}
            burstColor={palette.bone}
          >
            <Ionicons name="finger-print-outline" size={18} color={livenessStep?.done ? palette.ink : palette.bone} />
            <RNText style={[styles.livenessText, livenessStep?.done && { color: palette.ink }]}>
              {livenessStep?.done ? 'LIVENESS PASSED' : 'TAKE SELFIE / LIVENESS'}
            </RNText>
          </Tap>
        </View>
      </Section>

      {/* Blue check */}
      <Section eyebrow="CREATOR VERIFIED">
        <View style={styles.blueCard}>
          <View style={styles.blueHead}>
            <View style={styles.blueBadge}>
              <Ionicons name="checkmark-circle" size={22} color={palette.electric} />
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.blueTitle}>Blue check</RNText>
              <RNText style={styles.blueSub}>The badge brands look for.</RNText>
            </View>
          </View>

          <View style={styles.reqList}>
            {BLUE_REQS.map((r) => {
              const met = r.key === 'id' ? idDone : r.met;
              return (
                <View key={r.key} style={styles.reqRow}>
                  <Ionicons
                    name={met ? 'checkmark-circle' : 'lock-closed-outline'}
                    size={16}
                    color={met ? palette.ink : palette.mute}
                  />
                  <RNText style={[styles.reqLabel, { opacity: met ? 1 : 0.55 }]}>{r.label}</RNText>
                </View>
              );
            })}
          </View>

          <Tap onPress={applyBlueCheck} style={styles.cta} burstColor={palette.bone}>
            <RNText style={styles.ctaLabel}>APPLY FOR BLUE CHECK</RNText>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Tap>
        </View>
      </Section>

      {/* Liveness sheet */}
      <Sheet
        visible={livenessOpen}
        onClose={() => setLivenessOpen(false)}
        eyebrow="LIVENESS CHECK"
        title="Look into the camera"
      >
        <View style={styles.sheetBody}>
          {[
            { icon: 'eye-outline', text: 'Blink slowly, twice.' },
            { icon: 'sync-outline', text: 'Turn your head left, then right.' },
            { icon: 'phone-portrait-outline', text: 'Hold steady in good light.' },
          ].map((row) => (
            <View key={row.text} style={styles.sheetRow}>
              <View style={styles.sheetIcon}>
                <Ionicons name={row.icon as never} size={18} color={palette.ink} />
              </View>
              <RNText style={styles.sheetText}>{row.text}</RNText>
            </View>
          ))}

          <Tap onPress={runLiveness} style={styles.sheetCta} burstColor={palette.bone}>
            <RNText style={styles.ctaLabel}>START</RNText>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Tap>
        </View>
      </Sheet>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
      marginBottom: 14,
    },

    statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    statusKicker: { ...T.label, color: palette.inkMuted },
    statusPill: { paddingHorizontal: 12, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
    statusPillText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },
    statusCount: { fontFamily: fonts.displayBold, fontSize: 16, letterSpacing: -0.4, color: palette.ink, marginLeft: 'auto' },

    checklist: { gap: 12 },
    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    checkDot: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkNum: { fontFamily: fonts.bodyBold, fontSize: 12, color: palette.inkMuted },
    checkLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink, flex: 1 },
    checkState: { ...T.label, color: palette.inkMuted },

    flowCard: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
    },
    flowStep: { ...T.label, color: palette.ink, opacity: 0.6, marginBottom: 10 },
    chipRow: { gap: 8, paddingRight: 4 },

    uploadRow: { flexDirection: 'row', gap: 10 },
    uploadBox: {
      flex: 1,
      height: 86,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    uploadBoxDone: { borderColor: palette.ink, borderWidth: 1.5 },
    uploadText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.ink },

    livenessBtn: {
      height: 52,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    livenessBtnDone: { backgroundColor: palette.acid },
    livenessText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.8, color: palette.bone },

    blueCard: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 16,
    },
    blueHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    blueBadge: {
      width: 44,
      height: 44,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    blueTitle: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.6, color: palette.ink },
    blueSub: { ...T.small, color: palette.inkMuted, marginTop: 2 },

    reqList: { gap: 10 },
    reqRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    reqLabel: { fontFamily: fonts.body, fontSize: 14, color: palette.ink, flex: 1 },

    cta: {
      marginTop: 2,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    sheetBody: { gap: 14 },
    sheetRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    sheetIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetText: { fontFamily: fonts.body, fontSize: 15, color: palette.ink, flex: 1 },
    sheetCta: {
      marginTop: 8,
      height: 56,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
  });
