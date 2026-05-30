// MerchStudioWelcome — the opening screen of the store-builder studio. Shown by
// MerchStudio when the store hasn't been built yet. It's a branded intro: a
// hero of live, tilted storefront-preview cards (so the visitor sees the real
// thing instantly), a one-line value prop, the 3-part promise, and a single
// ink "START BUILDING" CTA into the wizard. No StudioHeader/Footer here — this
// is the cover, not a step.

import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { DeviceFrame } from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';

const PROMISE: { icon: string; label: string; sub: string }[] = [
  { icon: 'color-palette-outline', label: 'DESIGN', sub: 'Yours' },
  { icon: 'shirt-outline', label: 'MAKE MERCH', sub: 'Real' },
  { icon: 'rocket-outline', label: 'PUBLISH', sub: 'Live' },
];

export default function MerchStudioWelcome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const hasProgress = useStore((s) => s.storeBuilder.products.length > 0);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand kicker */}
          <RNText style={styles.kicker}>UNDERDAWG · STORE STUDIO</RNText>

          {/* Hero — live, tilted storefront previews */}
          <View style={styles.hero}>
            <View style={[styles.card, styles.cardLeft]}>
              <DeviceFrame style={styles.frame}>
                <StorefrontPreview mode="mini" />
              </DeviceFrame>
            </View>
            <View style={[styles.card, styles.cardRight]}>
              <DeviceFrame style={styles.frame}>
                <StorefrontPreview mode="mini" />
              </DeviceFrame>
            </View>
            <View style={[styles.card, styles.cardCenter]}>
              <DeviceFrame style={styles.frame}>
                <StorefrontPreview mode="mini" />
              </DeviceFrame>
            </View>
          </View>

          {/* Value prop */}
          <RNText style={styles.title}>
            build your store{'\n'}in minutes.
          </RNText>
          <RNText style={styles.sub}>
            Design it, make merch, publish — all from your phone.
          </RNText>

          {/* The 3-part promise */}
          <View style={styles.promiseRow}>
            {PROMISE.map((p) => (
              <View key={p.label} style={styles.promiseItem}>
                <View style={styles.promiseIcon}>
                  <Ionicons name={p.icon as any} size={20} color={palette.ink} />
                </View>
                <RNText style={styles.promiseLabel}>{p.label}</RNText>
                <RNText style={styles.promiseSub}>{p.sub}</RNText>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* CTA */}
        <View style={styles.ctaWrap}>
          <Pressable
            onPress={() => router.push('/(modules)/merch/build/identity')}
            style={styles.cta}
          >
            <RNText style={styles.ctaLabel}>START BUILDING</RNText>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Pressable>

          {hasProgress ? (
            <Pressable
              onPress={() => router.push('/(modules)/merch/build/review')}
              style={styles.continueBtn}
              hitSlop={8}
            >
              <RNText style={styles.continueLabel}>Continue where you left off</RNText>
              <Ionicons name="arrow-forward" size={14} color={palette.mute} />
            </Pressable>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },
    safe: { flex: 1 },
    scroll: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 24,
      flexGrow: 1,
    },
    kicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.4,
      color: palette.ink,
      opacity: 0.6,
      textTransform: 'uppercase',
      textAlign: 'center',
    },

    // Hero
    hero: {
      height: 280,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 28,
    },
    card: {
      position: 'absolute',
      shadowColor: '#000',
      shadowOpacity: 0.16,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 12 },
    },
    frame: { height: 230, width: 150 },
    cardCenter: { zIndex: 3 },
    cardLeft: {
      zIndex: 1,
      transform: [{ translateX: -78 }, { rotate: '-8deg' }, { scale: 0.92 }],
    },
    cardRight: {
      zIndex: 2,
      transform: [{ translateX: 78 }, { rotate: '8deg' }, { scale: 0.92 }],
    },

    // Value prop
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 40,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },
    sub: {
      fontFamily: fonts.body,
      fontSize: 16,
      lineHeight: 23,
      color: palette.mute,
      marginTop: 12,
    },

    // 3-part promise
    promiseRow: {
      flexDirection: 'row',
      marginTop: 28,
      gap: 10,
    },
    promiseItem: {
      flex: 1,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 16,
      paddingVertical: 18,
      paddingHorizontal: 6,
    },
    promiseIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.boneSoft,
      marginBottom: 12,
    },
    promiseLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.ink,
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    promiseSub: {
      fontFamily: fonts.body,
      fontSize: 13,
      color: palette.mute,
      marginTop: 4,
    },

    // CTA
    ctaWrap: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 6 },
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
    continueBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      minHeight: 44,
      marginTop: 6,
    },
    continueLabel: {
      fontFamily: fonts.bodyMedium,
      fontSize: 15,
      color: palette.mute,
    },
  });
