import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text as RNText,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import {
  useThemedPalette,
  useThemedPaletteStyles,
} from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { Tap } from '@/components/ui/Tap';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';

const PITCH_MAX = 320;

const formatINR = (n: number) =>
  n >= 100000
    ? `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1).replace(/\.?0+$/, '')}L`
    : `${Math.round(n / 1000)}K`;

function experienceLevel(budgetMax: number) {
  if (budgetMax >= 200000) return 'Expert';
  if (budgetMax >= 80000) return 'Intermediate';
  return 'Entry';
}

export default function ApplyScreen() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = jobsSeed.find((j) => j.id === id);
  const [pitch, setPitch] = useState('');
  const [rate, setRate] = useState('');
  const [timeline, setTimeline] = useState('');
  const apply = useStore((s) => s.applyToJob);
  const toast = useStore((s) => s.toast);

  const suggested = useMemo(
    () => (job ? Math.round((job.budgetMin + job.budgetMax) / 2) : 50000),
    [job],
  );

  const pitchValid = pitch.trim().length >= 30;
  const rateValid = Number(rate) > 0;
  const canSubmit = pitchValid && rateValid;

  const submit = () => {
    if (!canSubmit) {
      toast(
        !pitchValid
          ? 'Write at least a couple of sentences.'
          : 'Set the rate you want.',
        'warn',
      );
      return;
    }
    apply({
      jobId: id!,
      pitch,
      rate: Number(rate),
      timeline,
    });
    toast('Application sent. Good luck.', 'success');
    router.replace('/(modules)/jobs/active-deals');
  };

  return (
    <View style={styles.root}>
      {/* Clean header — back + chat. No empty placeholder circles. */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={6}>
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <View style={{ flex: 1 }} />
          <Tap
            onPress={() => router.push('/(tabs)/inbox')}
            style={styles.iconBtn}
            burstColor={palette.acid}
          >
            <Ionicons name="chatbubble-outline" size={18} color={palette.ink} />
          </Tap>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {/* Title */}
          <View style={styles.titleBlock}>
            <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
              Submit a proposal
            </RNText>
            <RNText style={styles.subtitle} maxFontSizeMultiplier={1.2}>
              Your pitch, your rate, your timeline. Brand sees this first.
            </RNText>
          </View>

          {/* Recap row — compact, full-width, hairline-separated */}
          {job ? (
            <View style={styles.recap}>
              <View style={styles.recapRow}>
                <View style={[styles.recapAccent, { backgroundColor: job.accent }]} />
                <View style={{ flex: 1 }}>
                  <RNText
                    style={styles.recapBrand}
                    numberOfLines={1}
                    maxFontSizeMultiplier={1.15}
                  >
                    {job.brand}
                  </RNText>
                  <RNText
                    style={styles.recapTitle}
                    numberOfLines={2}
                    maxFontSizeMultiplier={1.1}
                  >
                    {job.title}
                  </RNText>
                  <RNText style={styles.recapMeta} maxFontSizeMultiplier={1.15}>
                    ₹{formatINR(job.budgetMin)}–{formatINR(job.budgetMax)}  ·  {experienceLevel(job.budgetMax)}  ·  {job.niche}
                  </RNText>
                </View>
              </View>
            </View>
          ) : null}

          {/* Pitch field */}
          <Field
            step="01"
            label="Your pitch"
            hint="Why you, in your voice. Three sentences is plenty."
            counter={`${pitch.length}/${PITCH_MAX}`}
          >
            <TextInput
              style={[styles.input, styles.inputArea]}
              value={pitch}
              onChangeText={(v) => setPitch(v.slice(0, PITCH_MAX))}
              multiline
              textAlignVertical="top"
              placeholder="i make work that…"
              placeholderTextColor={palette.mute}
              maxFontSizeMultiplier={1.2}
              selectionColor={palette.acid}
            />
          </Field>

          {/* Rate field */}
          <Field
            step="02"
            label="Your rate"
            hint="Charge what your work is worth. Brands respect clarity."
            counter={job ? `Use ₹${formatINR(suggested)}` : undefined}
            onCounterPress={() => setRate(String(suggested))}
          >
            <View style={styles.rateRow}>
              <View style={styles.rateCurrency}>
                <RNText style={styles.rateCurrencyText}>₹</RNText>
              </View>
              <TextInput
                style={[styles.input, styles.rateInput]}
                value={rate}
                onChangeText={(v) => setRate(v.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
                placeholder={String(suggested)}
                placeholderTextColor={palette.mute}
                maxFontSizeMultiplier={1.15}
                selectionColor={palette.acid}
              />
            </View>
          </Field>

          {/* Timeline field */}
          <Field
            step="03"
            label="Timeline"
            hint="When can you deliver from contract signing?"
          >
            <TextInput
              style={styles.input}
              value={timeline}
              onChangeText={setTimeline}
              placeholder="14 days from contract"
              placeholderTextColor={palette.mute}
              maxFontSizeMultiplier={1.2}
              selectionColor={palette.acid}
            />
          </Field>

          {/* Footnote */}
          <View style={styles.footnote}>
            <Ionicons name="shield-checkmark-outline" size={14} color={palette.mute} />
            <RNText style={styles.footnoteText} maxFontSizeMultiplier={1.2}>
              We auto-attach your portfolio and reputation. The brand sees
              everything you&apos;ve shipped here.
            </RNText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky submit */}
      <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
        <View style={styles.footerInner}>
          <Pressable
            onPress={submit}
            disabled={!canSubmit}
            style={[
              styles.submitBtn,
              !canSubmit && styles.submitBtnDisabled,
            ]}
          >
            <RNText style={styles.submitLabel} maxFontSizeMultiplier={1.1}>
              SUBMIT PROPOSAL
            </RNText>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Field — labeled form section with hairline divider
 * ----------------------------------------------------------------------- */

function Field({
  step,
  label,
  hint,
  counter,
  onCounterPress,
  children,
}: {
  step: string;
  label: string;
  hint: string;
  counter?: string;
  onCounterPress?: () => void;
  children: React.ReactNode;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.field}>
      <View style={styles.fieldHead}>
        <View style={styles.fieldHeadLeft}>
          <RNText style={styles.fieldStep} maxFontSizeMultiplier={1.1}>
            {step}
          </RNText>
          <RNText style={styles.fieldLabel} maxFontSizeMultiplier={1.1}>
            {label}
          </RNText>
        </View>
        {counter ? (
          onCounterPress ? (
            <Pressable onPress={onCounterPress} hitSlop={6}>
              <RNText style={styles.fieldCounterLink} maxFontSizeMultiplier={1.1}>
                {counter}
              </RNText>
            </Pressable>
          ) : (
            <RNText style={styles.fieldCounter} maxFontSizeMultiplier={1.1}>
              {counter}
            </RNText>
          )
        ) : null}
      </View>
      <RNText style={styles.fieldHint} maxFontSizeMultiplier={1.2}>
        {hint}
      </RNText>
      {children}
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Styles
 * ----------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },

    /* ── Header ── */
    headerSafe: {
      backgroundColor: palette.bone,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 6,
      paddingBottom: 12,
      gap: 10,
    },
    iconBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* ── Scroll ── */
    scroll: { paddingBottom: 28 },

    /* ── Title ── */
    titleBlock: {
      paddingHorizontal: 20,
      paddingTop: 22,
      paddingBottom: 18,
      gap: 6,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 26,
      lineHeight: 30,
      letterSpacing: -0.7,
      color: palette.ink,
    },
    subtitle: {
      ...T.body,
      fontSize: 14,
      lineHeight: 20,
      color: palette.ink,
      opacity: 0.65,
    },

    /* ── Recap row ── */
    recap: {
      paddingHorizontal: 20,
      paddingVertical: 18,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    recapRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
    },
    recapAccent: {
      width: 4,
      alignSelf: 'stretch',
      borderRadius: 2,
      minHeight: 56,
    },
    recapBrand: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.ink,
      opacity: 0.7,
      textTransform: 'uppercase',
    },
    recapTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: -0.4,
      color: palette.ink,
      marginTop: 2,
    },
    recapMeta: {
      ...T.body,
      fontSize: 13,
      color: palette.ink,
      opacity: 0.75,
      marginTop: 6,
    },

    /* ── Field ── */
    field: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 },
    fieldHead: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    fieldHeadLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    fieldStep: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.ink,
      opacity: 0.45,
    },
    fieldLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.2,
      color: palette.ink,
    },
    fieldCounter: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 0.4,
      color: palette.ink,
      opacity: 0.55,
    },
    fieldCounterLink: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 0.4,
      color: palette.electric,
      textDecorationLine: 'underline',
    },
    fieldHint: {
      ...T.body,
      fontSize: 13,
      lineHeight: 18,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 4,
      marginBottom: 12,
    },

    /* ── Inputs ── */
    input: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      backgroundColor: palette.paper,
    },
    inputArea: {
      minHeight: 140,
      paddingTop: 14,
    },

    rateRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: 10,
    },
    rateCurrency: {
      width: 48,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rateCurrencyText: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: palette.ink,
    },
    rateInput: {
      flex: 1,
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.2,
    },

    /* ── Footnote ── */
    footnote: {
      marginTop: 20,
      marginHorizontal: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-start',
    },
    footnoteText: {
      ...T.body,
      fontSize: 12,
      lineHeight: 18,
      color: palette.mute,
      flex: 1,
    },

    /* ── Footer ── */
    footerSafe: {
      backgroundColor: palette.bone,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    footerInner: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 6,
    },
    submitBtn: {
      height: 50,
      borderRadius: 25,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitBtnDisabled: {
      backgroundColor: palette.boneMuted,
    },
    submitLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.8,
      color: palette.bone,
      includeFontPadding: false,
      textAlign: 'center',
    },
  });
