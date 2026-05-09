import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text as RNText,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import {
  useThemedPalette,
  useThemedPaletteStyles,
} from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Asterisk } from '@/components/svg/Marks';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';

const PITCH_MAX = 320;

const formatINR = (n: number) =>
  n >= 100000
    ? `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1).replace(/\.?0+$/, '')}L`
    : `${Math.round(n / 1000)}K`;

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
    confetti();
    toast('Application sent. Good luck.', 'success');
    router.replace('/(modules)/jobs/active-deals');
  };

  return (
    <ScreenFrame
      header={<ModuleHeader title="APPLY" />}
      contentStyle={styles.screenContent}
      footer={
        <View style={styles.footerWrap}>
          <MagneticButton
            label="SUBMIT APPLICATION"
            size="lg"
            background={canSubmit ? staticPalette.ink : staticPalette.boneMuted}
            foreground={canSubmit ? staticPalette.acid : staticPalette.ink}
            onPress={submit}
            disabled={!canSubmit}
          />
        </View>
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.heading}>
            <RNText
              style={styles.headingLine1}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              maxFontSizeMultiplier={1.1}
            >
              your <RNText style={styles.headingItalic}>pitch.</RNText>
            </RNText>
          </View>

          {job ? (() => {
            const c = readableOn(job.accent);
            return (
              <View style={[styles.recapCard, { backgroundColor: job.accent }]}>
                <View style={styles.recapInner}>
                  <View style={styles.recapTopRow}>
                    <View style={[styles.typeDot, { backgroundColor: c.fg }]} />
                    <RNText
                      style={[styles.recapType, { color: c.fg }]}
                      maxFontSizeMultiplier={1.1}
                    >
                      {job.type}
                    </RNText>
                  </View>
                  <RNText
                    style={[styles.recapTitle, { color: c.fg }]}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    minimumFontScale={0.78}
                    maxFontSizeMultiplier={1.1}
                  >
                    {job.title}
                  </RNText>
                  <View style={[styles.recapMetaRow, { borderTopColor: c.line }]}>
                    <View style={styles.recapMetaCol}>
                      <RNText style={[styles.recapMetaKey, { color: c.mute }]}>
                        BRAND
                      </RNText>
                      <RNText
                        style={[styles.recapMetaValue, { color: c.fg }]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        maxFontSizeMultiplier={1.15}
                      >
                        {job.brand}
                      </RNText>
                    </View>
                    <View style={[styles.recapMetaSep, { backgroundColor: c.line }]} />
                    <View style={styles.recapMetaCol}>
                      <RNText style={[styles.recapMetaKey, { color: c.mute }]}>
                        BUDGET
                      </RNText>
                      <RNText
                        style={[styles.recapMetaValue, { color: c.fg }]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        maxFontSizeMultiplier={1.15}
                      >
                        ₹{formatINR(job.budgetMin)} – ₹{formatINR(job.budgetMax)}
                      </RNText>
                    </View>
                  </View>
                </View>
              </View>
            );
          })() : null}

          <View style={styles.field}>
            <View style={styles.fieldHead}>
              <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
              <RNText style={styles.fieldNum}>01</RNText>
              <RNText style={styles.fieldLabel}>YOUR PITCH</RNText>
              <RNText style={styles.fieldCount} maxFontSizeMultiplier={1.1}>
                {pitch.length}/{PITCH_MAX}
              </RNText>
            </View>
            <RNText style={styles.fieldHint} maxFontSizeMultiplier={1.2}>
              Why you, in your voice. Three sentences max.
            </RNText>
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
          </View>

          <View style={styles.field}>
            <View style={styles.fieldHead}>
              <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
              <RNText style={styles.fieldNum}>02</RNText>
              <RNText style={styles.fieldLabel}>YOUR RATE</RNText>
              {job ? (
                <RNText
                  style={styles.fieldCount}
                  maxFontSizeMultiplier={1.1}
                  onPress={() => setRate(String(suggested))}
                  suppressHighlighting
                >
                  USE ₹{formatINR(suggested)}
                </RNText>
              ) : null}
            </View>
            <RNText style={styles.fieldHint} maxFontSizeMultiplier={1.2}>
              Charge what your work is worth. Brands respect clarity.
            </RNText>
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
          </View>

          <View style={styles.field}>
            <View style={styles.fieldHead}>
              <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
              <RNText style={styles.fieldNum}>03</RNText>
              <RNText style={styles.fieldLabel}>TIMELINE</RNText>
            </View>
            <RNText style={styles.fieldHint} maxFontSizeMultiplier={1.2}>
              When can you deliver from contract signing?
            </RNText>
            <TextInput
              style={styles.input}
              value={timeline}
              onChangeText={setTimeline}
              placeholder="14 days from contract"
              placeholderTextColor={palette.mute}
              maxFontSizeMultiplier={1.2}
              selectionColor={palette.acid}
            />
          </View>

          <View style={styles.legal}>
            <Asterisk size={10} color={palette.mute} strokeWidth={1.2} />
            <RNText style={styles.legalText} maxFontSizeMultiplier={1.2}>
              We auto-attach your portfolio and reputation. The brand sees
              everything you&apos;ve shipped here.
            </RNText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screenContent: { paddingHorizontal: 0, paddingBottom: 0, flex: 1 },
    scroll: {
      paddingHorizontal: 16,
      paddingBottom: 24,
    },

    heading: { marginTop: 4 },
    headingLine1: {
      fontFamily: fonts.displayBold,
      fontSize: 56,
      lineHeight: 60,
      letterSpacing: -2.6,
      color: palette.ink,
    },
    headingItalic: {
      fontFamily: fonts.editorialItalic,
      letterSpacing: -1.2,
      color: palette.ember,
    },

    recapCard: {
      marginTop: 22,
      borderRadius: 22,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 4,
    },
    recapInner: { padding: 18, gap: 10 },
    recapTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    typeDot: { width: 7, height: 7, borderRadius: 3.5 },
    recapType: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.6,
      opacity: 0.75,
    },
    recapTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.6,
      color: palette.ink,
    },
    recapMetaRow: {
      marginTop: 6,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: 'rgba(10,10,10,0.10)',
      flexDirection: 'row',
    },
    recapMetaCol: { flex: 1, gap: 4 },
    recapMetaSep: {
      width: 1,
      backgroundColor: 'rgba(10,10,10,0.10)',
      marginHorizontal: 8,
    },
    recapMetaKey: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.4,
      fontSize: 10,
    },
    recapMetaValue: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: -0.2,
      color: palette.ink,
    },

    field: { marginTop: 26 },
    fieldHead: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderTopWidth: 1,
      borderTopColor: palette.lineDark,
      paddingTop: 14,
      paddingBottom: 6,
    },
    fieldNum: {
      fontFamily: fonts.displayBold,
      fontSize: 11,
      color: palette.ink,
      opacity: 0.4,
      letterSpacing: 0.4,
    },
    fieldLabel: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.8,
      flex: 1,
    },
    fieldCount: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.4,
    },
    fieldHint: {
      ...T.small,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 2,
      marginBottom: 12,
      maxWidth: 360,
    },
    input: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontFamily: fonts.body,
      fontSize: 16,
      color: palette.ink,
      backgroundColor: palette.paper,
    },
    inputArea: {
      minHeight: 160,
      paddingTop: 16,
    },

    rateRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: 10,
    },
    rateCurrency: {
      width: 56,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rateCurrencyText: {
      fontFamily: fonts.displayBold,
      fontSize: 20,
      color: palette.ink,
    },
    rateInput: {
      flex: 1,
      fontFamily: fonts.displayBold,
      fontSize: 22,
      letterSpacing: -0.4,
      paddingVertical: 12,
    },

    legal: {
      marginTop: 28,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-start',
    },
    legalText: {
      ...T.small,
      color: palette.mute,
      flex: 1,
      maxWidth: 360,
    },

    footerWrap: {
      backgroundColor: palette.bone,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 14,
    },
  });
