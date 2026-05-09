import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TextInput, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { rateCardSeed } from '@/data/mock';
import { useStore } from '@/store';
import { MagneticButton } from '@/components/ui/MagneticButton';

const formatINR = (n: number) => {
  if (!Number.isFinite(n) || n <= 0) return '0';
  if (n >= 100000) {
    const lakhs = n / 100000;
    return `${lakhs.toFixed(lakhs >= 10 ? 1 : 2).replace(/\.?0+$/, '')}L`;
  }
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(Math.round(n));
};

const formatGroup = (n: number) =>
  n.toLocaleString('en-IN');

export default function RateCard() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const custom = useStore((s) => s.rateCardCustom);
  const setRate = useStore((s) => s.setRate);
  const toast = useStore((s) => s.toast);

  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      rateCardSeed.map((r) => [r.key, String(custom[r.key] ?? r.base)]),
    ),
  );

  const total = useMemo(
    () =>
      rateCardSeed.reduce((sum, r) => {
        const v = Number(draft[r.key]);
        return sum + (Number.isFinite(v) ? v : 0);
      }, 0),
    [draft],
  );

  const dirty = useMemo(
    () =>
      rateCardSeed.some((r) => {
        const v = Number(draft[r.key]);
        return Number.isFinite(v) && v !== r.base;
      }),
    [draft],
  );

  const save = () => {
    rateCardSeed.forEach((r) => {
      const v = Number(draft[r.key]);
      if (!isNaN(v)) setRate(r.key, v);
    });
    toast('Rate card saved.', 'success');
  };

  const resetDefaults = () => {
    setDraft(Object.fromEntries(rateCardSeed.map((r) => [r.key, String(r.base)])));
    toast('Reset to suggested rates.', 'default');
  };

  return (
    <ScreenFrame
      header={<ModuleHeader title="RATE CARD" />}
      footer={
        <View style={styles.footerWrap}>
          <MagneticButton
            label="SAVE RATES"
            size="lg"
            background={staticPalette.ink}
            foreground={staticPalette.acid}
            onPress={save}
          />
        </View>
      }
    >
      <View style={styles.heading}>
        <RNText style={styles.headingLine1} maxFontSizeMultiplier={1.1}>
          RATE
        </RNText>
        <RNText style={styles.headingLine2} maxFontSizeMultiplier={1.1}>
          <RNText style={styles.headingItalic}>card.</RNText>
        </RNText>
      </View>

      <View style={styles.totalCard}>
        <View style={styles.totalLeft}>
          <RNText style={styles.totalLabel}>YOUR FLOOR</RNText>
          <RNText style={styles.totalSub} maxFontSizeMultiplier={1.15}>
            sum of every service
          </RNText>
        </View>
        <RNText style={styles.totalValue} maxFontSizeMultiplier={1.1}>
          ₹{formatINR(total)}
        </RNText>
      </View>

      <View style={styles.list}>
        {rateCardSeed.map((r, i) => {
          const v = Number(draft[r.key]);
          const isCustom = Number.isFinite(v) && v !== r.base;
          return (
            <View key={r.key} style={styles.row}>
              <View style={styles.rowHead}>
                <RNText style={styles.rowNum}>
                  {String(i + 1).padStart(2, '0')}
                </RNText>
                <View style={{ flex: 1 }}>
                  <RNText
                    style={styles.rowName}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.78}
                    maxFontSizeMultiplier={1.15}
                  >
                    {r.name}
                  </RNText>
                  <RNText style={styles.rowDesc} maxFontSizeMultiplier={1.2}>
                    {r.desc}
                  </RNText>
                </View>
              </View>

              <View style={styles.rowFoot}>
                <RNText style={styles.suggested} maxFontSizeMultiplier={1.15}>
                  SUGGESTED <RNText style={styles.suggestedVal}>₹{formatINR(r.base)}</RNText>
                </RNText>
                <View
                  style={[
                    styles.inputWrap,
                    isCustom && { borderColor: palette.acid },
                  ]}
                >
                  <RNText style={styles.currency}>₹</RNText>
                  <TextInput
                    style={styles.input}
                    value={draft[r.key]}
                    onChangeText={(val) =>
                      setDraft({ ...draft, [r.key]: val.replace(/[^0-9]/g, '') })
                    }
                    keyboardType="numeric"
                    selectionColor={palette.acid}
                    maxFontSizeMultiplier={1.15}
                    placeholder="0"
                    placeholderTextColor={palette.mute}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <Tap
        onPress={resetDefaults}
        burstColor={palette.ink}
        style={[styles.reset, !dirty && { opacity: 0.4 }]}
        disabled={!dirty}
      >
        <RNText style={styles.resetText}>RESET TO SUGGESTED</RNText>
      </Tap>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    heading: { marginTop: 4 },
    headingLine1: {
      fontFamily: fonts.displayBold,
      fontSize: 64,
      lineHeight: 60,
      letterSpacing: -3,
      color: palette.ink,
    },
    headingLine2: {
      fontFamily: fonts.displayBold,
      fontSize: 64,
      lineHeight: 60,
      letterSpacing: -3,
      color: palette.ink,
    },
    headingItalic: {
      fontFamily: fonts.editorialItalic,
      fontSize: 64,
      lineHeight: 60,
      letterSpacing: -1.4,
      color: palette.ember,
    },

    totalCard: {
      marginTop: 22,
      paddingVertical: 18,
      paddingHorizontal: 4,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: palette.lineDark,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    },
    totalLeft: { flex: 1, gap: 4 },
    totalLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.6,
    },
    totalSub: {
      fontFamily: fonts.editorialItalic,
      fontSize: 14,
      lineHeight: 18,
      color: palette.ink,
      opacity: 0.7,
    },
    totalValue: {
      fontFamily: fonts.displayBold,
      fontSize: 38,
      lineHeight: 40,
      letterSpacing: -1.2,
      color: palette.ink,
    },

    list: { marginTop: 8 },
    row: {
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      gap: 14,
    },
    rowHead: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
    },
    rowNum: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      lineHeight: 18,
      color: palette.ink,
      opacity: 0.4,
      letterSpacing: 0.4,
      paddingTop: 3,
      width: 26,
    },
    rowName: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.6,
      color: palette.ink,
    },
    rowDesc: {
      ...T.small,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 6,
      maxWidth: 320,
    },
    rowFoot: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 40,
      gap: 12,
    },
    suggested: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      letterSpacing: 1.4,
    },
    suggestedVal: {
      fontFamily: fonts.displayBold,
      letterSpacing: -0.2,
      color: palette.ink,
      opacity: 0.85,
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.paper,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      paddingHorizontal: 14,
      gap: 4,
      minWidth: 130,
    },
    currency: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      color: palette.ink,
      opacity: 0.7,
    },
    input: {
      flex: 1,
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: palette.ink,
      letterSpacing: -0.4,
      paddingVertical: 12,
      textAlign: 'right',
    },

    reset: {
      marginTop: 22,
      alignSelf: 'center',
      paddingVertical: 12,
      paddingHorizontal: 18,
    },
    resetText: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.8,
      textDecorationLine: 'underline',
    },

    footerWrap: {
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      backgroundColor: palette.bone,
    },
  });
