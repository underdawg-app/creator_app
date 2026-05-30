// STEP 3 · BANNER / HERO — the store-builder studio's hero step.
// Pick a banner style and write the headline / subtext / button label. Every
// control writes to the shared storeBuilder slice, so the live mini preview's
// hero updates instantly as the creator types.

import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { useStore } from '@/store';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { BANNER_STYLES } from '@/screens/modules/merch/studio/themePresets';

const NEXT = '/(modules)/merch/build/layout';

// Short, honest blurb per style so the choice isn't a blind tap.
const STYLE_HINT: Record<string, string> = {
  GRADIENT: 'Accent block with a soft depth wash.',
  SOLID: 'Flat accent fill. Bold and clean.',
  PATTERN: 'Accent block dotted with a tile motif.',
  MINIMAL: 'Quiet surface with a thin accent rule.',
};

export default function Step3Banner() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const set = useStore((s) => s.setBuilder);

  return (
    <View style={styles.root}>
      <StudioHeader step={3} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <RNText style={styles.kicker}>STEP 3 · BANNER / HERO</RNText>
        <RNText style={styles.title}>set the hero.</RNText>
        <RNText style={styles.lede}>
          The first thing shoppers see. Pick a style, then write the lines.
        </RNText>

        {/* BANNER STYLE */}
        <RNText style={styles.sectionLabel}>BANNER STYLE</RNText>
        <View style={styles.styleGrid}>
          {BANNER_STYLES.map((s) => {
            const active = b.bannerStyle === s.key;
            return (
              <Pressable
                key={s.key}
                onPress={() => set({ bannerStyle: s.key })}
                style={[styles.styleCard, active && styles.styleCardActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <View style={styles.styleCardTop}>
                  <RNText
                    style={[styles.styleName, active && styles.styleNameActive]}
                  >
                    {s.label}
                  </RNText>
                  <Ionicons
                    name={active ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={active ? palette.ink : palette.line}
                  />
                </View>
                <RNText
                  style={[styles.styleHint, active && styles.styleHintActive]}
                >
                  {STYLE_HINT[s.key]}
                </RNText>
              </Pressable>
            );
          })}
        </View>

        {/* COPY */}
        <RNText style={styles.sectionLabel}>HEADLINE</RNText>
        <TextInput
          value={b.headline}
          onChangeText={(headline) => set({ headline })}
          placeholder="THE NEW DROP"
          placeholderTextColor={palette.mute}
          style={[styles.input, styles.inputHeadline]}
          maxLength={42}
          returnKeyType="done"
          autoCapitalize="characters"
        />

        <RNText style={styles.sectionLabel}>SUBTEXT</RNText>
        <TextInput
          value={b.subtext}
          onChangeText={(subtext) => set({ subtext })}
          placeholder="Limited run. Ships worldwide."
          placeholderTextColor={palette.mute}
          style={styles.input}
          maxLength={64}
          returnKeyType="done"
        />

        <RNText style={styles.sectionLabel}>BUTTON LABEL</RNText>
        <TextInput
          value={b.buttonLabel}
          onChangeText={(buttonLabel) => set({ buttonLabel })}
          placeholder="SHOP NOW"
          placeholderTextColor={palette.mute}
          style={styles.input}
          maxLength={24}
          returnKeyType="done"
          autoCapitalize="characters"
        />

        {/* LIVE PREVIEW */}
        <RNText style={[styles.sectionLabel, { marginTop: 28 }]}>
          LIVE PREVIEW
        </RNText>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push(NEXT)}
        hint="Add a headline to keep going."
        disabled={!b.headline.trim()}
      />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 20, paddingBottom: 24 },
    kicker: {
      ...T.label,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 8,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 40,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },
    lede: {
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 22,
      color: palette.mute,
      marginTop: 10,
    },
    sectionLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
      marginTop: 26,
      marginBottom: 12,
    },
    styleGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    styleCard: {
      width: '48.5%',
      minHeight: 88,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.bone,
      paddingHorizontal: 14,
      paddingVertical: 14,
      marginBottom: 12,
    },
    styleCardActive: {
      borderColor: palette.ink,
      backgroundColor: palette.boneSoft,
    },
    styleCardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    styleName: {
      fontFamily: fonts.bodyBold,
      fontSize: 15,
      letterSpacing: 1,
      color: palette.mute,
    },
    styleNameActive: { color: palette.ink },
    styleHint: {
      fontFamily: fonts.body,
      fontSize: 13,
      lineHeight: 17,
      color: palette.mute,
      marginTop: 8,
    },
    styleHintActive: { color: palette.ink, opacity: 0.7 },
    input: {
      minHeight: 52,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.bone,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontFamily: fonts.body,
      fontSize: 16,
      color: palette.ink,
    },
    inputHeadline: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.2,
    },
  });
