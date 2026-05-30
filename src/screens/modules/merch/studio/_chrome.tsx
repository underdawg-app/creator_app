// Shared chrome for the store-builder studio — keeps every step screen
// consistent: a header (back + step indicator + live Preview button), a
// Continue footer (ink CTA with bone arrow chip), and a phone DeviceFrame that
// clips the live mini storefront preview. Uses the app's own tokens.

import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';

export const STUDIO_STEPS = 6;

export function StudioHeader({
  step,
  title,
  onBack,
  showPreview = true,
}: {
  step?: number;
  title?: string;
  onBack?: () => void;
  showPreview?: boolean;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <SafeAreaView edges={['top']} style={styles.headerSafe}>
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => (onBack ? onBack() : router.back())}
          hitSlop={12}
          style={styles.iconBtn}
        >
          <Ionicons name="arrow-back" size={18} color={palette.ink} />
        </Pressable>

        <View style={styles.headerCenter}>
          {step != null ? (
            <>
              <RNText style={styles.stepText}>{`STEP ${step} / ${STUDIO_STEPS}`}</RNText>
              <View style={styles.dots}>
                {Array.from({ length: STUDIO_STEPS }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: i < step ? palette.ink : palette.line,
                        width: i === step - 1 ? 16 : 5,
                      },
                    ]}
                  />
                ))}
              </View>
            </>
          ) : title ? (
            <RNText style={styles.stepText}>{title}</RNText>
          ) : null}
        </View>

        {showPreview ? (
          <Pressable
            onPress={() => router.push('/(modules)/merch/preview')}
            style={[styles.previewBtn, { borderColor: palette.ink }]}
            hitSlop={8}
          >
            <Ionicons name="eye-outline" size={13} color={palette.ink} />
            <RNText style={styles.previewLabel}>PREVIEW</RNText>
          </Pressable>
        ) : (
          <View style={styles.iconBtn} />
        )}
      </View>
    </SafeAreaView>
  );
}

export function StudioFooter({
  label = 'Continue',
  onPress,
  disabled,
  hint,
}: {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  hint?: string;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
      {hint && disabled ? <RNText style={styles.hint}>{hint}</RNText> : null}
      <Pressable
        onPress={() => !disabled && onPress()}
        style={[styles.cta, disabled && { opacity: 0.4 }]}
      >
        <RNText style={styles.ctaLabel}>{label.toUpperCase()}</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

// Phone frame that clips the live mini preview. Give it a height via `style`.
export function DeviceFrame({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={[styles.device, style]}>
      <View style={styles.deviceScreen}>{children}</View>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    headerSafe: { paddingHorizontal: 20 },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 6,
      paddingBottom: 8,
      gap: 10,
    },
    iconBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerCenter: { flex: 1, alignItems: 'center' },
    stepText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.4,
      color: palette.ink,
      opacity: 0.7,
      textTransform: 'uppercase',
    },
    dots: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
    dot: { height: 5, borderRadius: 3 },
    previewBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      height: 34,
      paddingHorizontal: 12,
      borderRadius: 17,
      borderWidth: 1.5,
    },
    previewLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
      color: palette.ink,
    },
    footerSafe: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 6 },
    hint: {
      fontFamily: fonts.body,
      fontSize: 13,
      color: palette.mute,
      textAlign: 'center',
      marginBottom: 10,
    },
    cta: {
      height: 60,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 22,
      backgroundColor: palette.ink,
    },
    ctaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2.2,
      color: palette.bone,
      textTransform: 'uppercase',
    },
    ctaArrow: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.bone,
    },
    device: {
      borderRadius: 28,
      borderWidth: 6,
      borderColor: palette.ink,
      backgroundColor: palette.ink,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.18,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    deviceScreen: { flex: 1, borderRadius: 22, overflow: 'hidden' },
  });
