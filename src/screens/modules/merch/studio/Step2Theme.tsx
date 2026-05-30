// STEP 2 · THEME — "pick a look."
// Creator chooses a STORE_THEME palette + a FONT_PAIR. Each tap writes to the
// shared storeBuilder slice (set), so the live mini StorefrontPreview restyles
// instantly. Pure presentation of presets — no backend, no dummy content.

import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { STORE_THEMES, FONT_PAIRS } from '@/screens/modules/merch/studio/themePresets';

export default function Step2Theme() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const set = useStore((s) => s.setBuilder);

  return (
    <View style={styles.root}>
      <StudioHeader step={2} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <RNText style={styles.kicker}>STEP 2 · THEME</RNText>
        <RNText style={styles.title}>pick a look.</RNText>
        <RNText style={styles.lede}>
          A palette and a typeface — the whole storefront restyles as you tap.
        </RNText>

        {/* ---- PALETTE ---- */}
        <RNText style={[styles.kicker, styles.sectionKicker]}>PALETTE</RNText>
        <View style={styles.themeGrid}>
          {STORE_THEMES.map((t) => {
            const active = b.themeKey === t.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => set({ themeKey: t.key })}
                style={[
                  styles.themeCard,
                  { borderColor: active ? palette.ink : palette.line },
                  active && styles.themeCardActive,
                ]}
              >
                {/* Color blocks: bg / surface / accent */}
                <View style={[styles.swatchRow, { borderColor: palette.line }]}>
                  <View style={[styles.swatch, { backgroundColor: t.bg }]} />
                  <View style={[styles.swatch, { backgroundColor: t.surface }]} />
                  <View style={[styles.swatch, { backgroundColor: t.accent }]} />
                </View>

                <View style={styles.themeFootRow}>
                  <RNText style={styles.themeName}>{t.name}</RNText>
                  {active && (
                    <View style={[styles.tick, { backgroundColor: palette.ink }]}>
                      <Ionicons name="checkmark" size={11} color={palette.bone} />
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* ---- FONT PAIRING ---- */}
        <RNText style={[styles.kicker, styles.sectionKicker]}>FONT PAIRING</RNText>
        <View style={styles.fontList}>
          {FONT_PAIRS.map((f) => {
            const active = b.fontKey === f.key;
            return (
              <Pressable
                key={f.key}
                onPress={() => set({ fontKey: f.key })}
                style={[
                  styles.fontCard,
                  { borderColor: active ? palette.ink : palette.line },
                  active && styles.fontCardActive,
                ]}
              >
                <View style={styles.fontTextCol}>
                  <RNText
                    numberOfLines={1}
                    style={[styles.fontSample, { fontFamily: f.display }]}
                  >
                    {f.name}
                  </RNText>
                  <RNText style={[styles.fontSub, { fontFamily: f.body }]}>
                    the new drop — shop now
                  </RNText>
                </View>
                <View
                  style={[
                    styles.radio,
                    { borderColor: active ? palette.ink : palette.line },
                  ]}
                >
                  {active && (
                    <View style={[styles.radioDot, { backgroundColor: palette.ink }]} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* ---- LIVE PREVIEW ---- */}
        <RNText style={[styles.kicker, styles.sectionKicker]}>LIVE PREVIEW</RNText>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push('/(modules)/merch/build/banner')}
      />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 20, paddingBottom: 24 },

    kicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.2,
      color: palette.ink,
      opacity: 0.7,
      textTransform: 'uppercase',
    },
    sectionKicker: { marginTop: 32, marginBottom: 14, opacity: 0.55 },
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

    // Palette grid
    themeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    themeCard: {
      width: '48%',
      borderWidth: 1.5,
      borderRadius: 16,
      padding: 10,
      marginBottom: 12,
      backgroundColor: palette.paper,
    },
    themeCardActive: {
      backgroundColor: palette.boneSoft,
    },
    swatchRow: {
      flexDirection: 'row',
      height: 56,
      borderRadius: 10,
      borderWidth: 1,
      overflow: 'hidden',
    },
    swatch: { flex: 1, height: '100%' },
    themeFootRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      minHeight: 20,
    },
    themeName: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.4,
      color: palette.ink,
    },
    tick: {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Font list
    fontList: { gap: 12 },
    fontCard: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 72,
      borderWidth: 1.5,
      borderRadius: 16,
      paddingHorizontal: 18,
      paddingVertical: 14,
      backgroundColor: palette.paper,
    },
    fontCardActive: {
      backgroundColor: palette.boneSoft,
    },
    fontTextCol: { flex: 1, marginRight: 12 },
    fontSample: {
      fontSize: 24,
      lineHeight: 28,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    fontSub: {
      fontSize: 15,
      lineHeight: 20,
      color: palette.mute,
      marginTop: 4,
    },
    radio: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioDot: { width: 11, height: 11, borderRadius: 6 },
  });
