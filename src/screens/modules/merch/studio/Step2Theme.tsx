// STEP 2 · THEME — "pick a look."
// Creator chooses a STORE_THEME palette + a FONT_PAIR. Each tap writes to the
// shared storeBuilder slice (set), so the live mini StorefrontPreview restyles
// instantly. Pure presentation of presets — no backend, no dummy content.

import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
  useAutoHideFooter,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { STORE_THEMES, FONT_PAIRS } from '@/screens/modules/merch/studio/themePresets';

export default function Step2Theme() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const set = useStore((s) => s.setBuilder);

  const { onScroll, footerStyle } = useAutoHideFooter();

  return (
    <View style={styles.root}>
      <StudioHeader step={2} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.kickerRow}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>STEP 2 · THEME</RNText>
        </View>
        <RNText style={styles.title}>pick a look.</RNText>
        <RNText style={styles.lede}>
          A palette and a typeface — the whole storefront restyles as you tap.
        </RNText>

        {/* ---- PALETTE ---- */}
        <View style={[styles.kickerRow, styles.sectionKickerRow]}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>PALETTE</RNText>
        </View>
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
        <View style={[styles.kickerRow, styles.sectionKickerRow]}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>FONT PAIRING</RNText>
        </View>
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
        <View style={[styles.kickerRow, styles.sectionKickerRow]}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>LIVE PREVIEW</RNText>
        </View>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push('/(modules)/merch/build/banner')}
        animStyle={footerStyle}
      />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 16, paddingBottom: 24 },

    // Dot + kicker (homepage section rhythm)
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    kicker: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },
    sectionKickerRow: { marginTop: 28, marginBottom: 14 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 44,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },
    lede: {
      ...T.lead,
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
      borderRadius: 18,
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
      borderRadius: 18,
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
