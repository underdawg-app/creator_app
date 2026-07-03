// MerchStudioWelcome — the opening screen of the store-builder studio.
// Bold editorial layout: oversized stacked Cabinet display type, a scroll-driven
// "reveal" hero (the two side storefront previews start tucked behind the center
// device and fan out as you scroll), a numbered 01/02/03 timeline, and the app's
// standard ink CTA inline at the end of the scroll. Theme-aware via role-based
// tokens (`bone` = main surface, `ink` = contrast) so it renders light in light
// mode and dark in dark mode automatically. Scroll animation uses
// react-native-reanimated to match the rest of the app (Profile, Learning, …).

import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { DeviceFrame } from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';

const STEPS: { n: string; icon: string; label: string; sub: string }[] = [
  { n: '01', icon: 'color-palette-outline', label: 'DESIGN IT', sub: 'Pick a theme, drop your art, make it yours.' },
  { n: '02', icon: 'shirt-outline', label: 'MAKE MERCH', sub: 'Real tees, hoodies & prints — zero inventory.' },
  { n: '03', icon: 'rocket-outline', label: 'PUBLISH', sub: 'Share one link. Sell from your phone.' },
];

// Scroll distance (px) over which the side cards travel from "hidden behind
// center" to "fully fanned out".
const REVEAL = 200;

export default function MerchStudioWelcome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const insets = useSafeAreaInsets();
  const hasProgress = useStore((s) => s.storeBuilder.products.length > 0);
  const toast = useStore((s) => s.toast);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // Side cards start centered/upright behind the main card, then fan out on scroll.
  const leftStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(scrollY.value, [0, REVEAL], [0, -74], Extrapolation.CLAMP) },
      { translateY: interpolate(scrollY.value, [0, REVEAL], [10, 0], Extrapolation.CLAMP) },
      { rotate: `${interpolate(scrollY.value, [0, REVEAL], [0, -7], Extrapolation.CLAMP)}deg` },
      { scale: interpolate(scrollY.value, [0, REVEAL], [0.82, 0.9], Extrapolation.CLAMP) },
    ],
  }));
  const rightStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(scrollY.value, [0, REVEAL], [0, 74], Extrapolation.CLAMP) },
      { translateY: interpolate(scrollY.value, [0, REVEAL], [10, 0], Extrapolation.CLAMP) },
      { rotate: `${interpolate(scrollY.value, [0, REVEAL], [0, 7], Extrapolation.CLAMP)}deg` },
      { scale: interpolate(scrollY.value, [0, REVEAL], [0.82, 0.9], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandDot} />
            <RNText style={styles.brandText} allowFontScaling={false}>
              STORE STUDIO
            </RNText>
          </View>
          <Pressable
            onPress={() => toast('Build, preview and publish your store.', 'default')}
            style={styles.iconBtn}
            hitSlop={8}
          >
            <Ionicons name="help-circle-outline" size={18} color={palette.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 16 }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {/* Eyebrow */}
        <RNText style={styles.eyebrow} maxFontSizeMultiplier={1.1}>
          UNDERDAWG · MERCH ’26
        </RNText>

        {/* Oversized stacked headline */}
        <RNText style={styles.h1} allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>BUILD</RNText>
        <RNText style={styles.h1} allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>YOUR STORE</RNText>
        <RNText style={styles.h1Accent} allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>IN MINUTES.</RNText>

        <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
          Design it, make merch, publish — all from your phone.
        </RNText>

        {/* Hero — scroll-reveal storefront previews */}
        <View style={styles.hero}>
          <View style={styles.glow} />

          {/* Side cards sit BEHIND the center card and fan out on scroll */}
          <Animated.View style={[styles.cardAbs, { zIndex: 1 }, leftStyle]}>
            <DeviceFrame style={styles.sideFrame}>
              <StorefrontPreview mode="mini" />
            </DeviceFrame>
          </Animated.View>
          <Animated.View style={[styles.cardAbs, { zIndex: 2 }, rightStyle]}>
            <DeviceFrame style={styles.sideFrame}>
              <StorefrontPreview mode="mini" />
            </DeviceFrame>
          </Animated.View>

          <View style={[styles.cardAbs, { zIndex: 3 }]}>
            <DeviceFrame style={styles.centerFrame}>
              <StorefrontPreview mode="mini" />
            </DeviceFrame>
          </View>
        </View>

        <View style={styles.liveRow}>
          <View style={styles.liveChip}>
            <View style={styles.liveDot} />
            <RNText style={styles.liveText} allowFontScaling={false}>LIVE PREVIEW</RNText>
          </View>
        </View>

        {/* Numbered timeline */}
        {STEPS.map((p, i) => (
          <View
            key={p.n}
            style={[styles.step, i === STEPS.length - 1 && { borderBottomWidth: 0 }]}
          >
            <RNText style={styles.stepNum} allowFontScaling={false}>{p.n}</RNText>
            <View style={styles.stepBody}>
              <View style={styles.stepHead}>
                <Ionicons name={p.icon as any} size={15} color={palette.ink} />
                <RNText style={styles.stepLabel} maxFontSizeMultiplier={1.1}>{p.label}</RNText>
              </View>
              <RNText style={styles.stepSub} maxFontSizeMultiplier={1.15}>{p.sub}</RNText>
            </View>
          </View>
        ))}

        {/* CTA — inline at the end of the scroll (app convention) */}
        <View style={styles.ctaBlock}>
          {hasProgress ? (
            <Pressable
              onPress={() => router.push('/(modules)/merch/build/review')}
              style={styles.continueBtn}
              hitSlop={8}
            >
              <Ionicons name="refresh-outline" size={14} color={palette.mute} />
              <RNText style={styles.continueLabel} maxFontSizeMultiplier={1.15}>
                Continue where you left off
              </RNText>
            </Pressable>
          ) : null}

          <Pressable
            onPress={() => router.push('/(modules)/merch/build/identity')}
            style={styles.cta}
          >
            <RNText style={styles.ctaLabel} maxFontSizeMultiplier={1.1}>
              START BUILDING
            </RNText>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Pressable>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },

    // Header
    headerSafe: { backgroundColor: palette.bone },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 10,
    },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    brandDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    brandText: { ...T.label, color: palette.ink, letterSpacing: 2 },
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },

    scrollView: { flex: 1 },
    scroll: { paddingHorizontal: 20, paddingTop: 12 },

    eyebrow: { ...T.labelLarge, color: palette.mute, letterSpacing: 2.4, marginBottom: 12 },

    // Oversized stacked display headline
    h1: {
      fontFamily: fonts.displayBold,
      fontSize: 46,
      lineHeight: 46,
      letterSpacing: -2.2,
      color: palette.ink,
    },
    h1Accent: {
      fontFamily: fonts.displayBold,
      fontSize: 46,
      lineHeight: 48,
      letterSpacing: -2.2,
      color: palette.mute,
    },
    sub: { ...T.lead, color: palette.mute, marginTop: 14, maxWidth: 320 },

    // Hero — absolutely-stacked cards, centered; side cards animate out on scroll
    hero: {
      height: 224,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 22,
    },
    glow: {
      position: 'absolute',
      top: 8,
      width: 230,
      height: 200,
      borderRadius: 110,
      backgroundColor: palette.electric,
      opacity: 0.1,
    },
    cardAbs: {
      position: 'absolute',
      shadowColor: palette.ink,
      shadowOpacity: 0.18,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 12 },
    },
    sideFrame: { height: 152, width: 96 },
    centerFrame: { height: 204, width: 132 },

    liveRow: { alignItems: 'center', marginTop: 18 },
    liveChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      height: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.electric },
    liveText: { ...T.micro, color: palette.ink, letterSpacing: 1.4, fontFamily: fonts.bodyBold },

    // Numbered timeline
    step: {
      flexDirection: 'row',
      gap: 16,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    stepNum: {
      fontFamily: fonts.displayBold,
      fontSize: 26,
      lineHeight: 28,
      letterSpacing: -1,
      color: palette.ink,
      opacity: 0.28,
      width: 40,
    },
    stepBody: { flex: 1, gap: 5 },
    stepHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    stepLabel: { ...T.label, color: palette.ink, letterSpacing: 1.4 },
    stepSub: { ...T.small, color: palette.mute, lineHeight: 18 },

    // Inline CTA
    ctaBlock: { marginTop: 26 },
    cta: {
      height: 58,
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
    continueBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 38,
      marginBottom: 10,
    },
    continueLabel: { ...T.bodyMedium, color: palette.mute },
  });
