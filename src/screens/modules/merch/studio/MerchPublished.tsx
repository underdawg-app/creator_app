// MerchPublished — the celebratory success screen the creator lands on after
// publishing their storefront. It fires confetti once on mount, surfaces the
// live store URL with copy/share actions, shows a medium live preview that
// reflects the shared storeBuilder slice, and offers two ways forward: view
// the full store or jump back into the editor. All reads come from the single
// source of truth (storeBuilder), so the preview stays in sync.

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { useStore } from '@/store';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { DeviceFrame } from '@/screens/modules/merch/studio/_chrome';
import { storeUrlOf } from '@/screens/modules/merch/studio/themePresets';

export default function MerchPublished() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const confetti = useStore((s) => s.confetti);
  const toast = useStore((s) => s.toast);

  // Celebrate exactly once when the creator arrives.
  useEffect(() => {
    confetti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const url = storeUrlOf(b.handle);

  const onCopy = () => toast('Link copied.', 'success');
  const onShare = () => toast('Share sheet opened.');

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView edges={['top']}>
          {/* Celebratory mark */}
          <View style={styles.mark}>
            <Ionicons name="checkmark" size={40} color={palette.ink} />
          </View>

          <RNText style={styles.kicker}>STORE PUBLISHED</RNText>
          <RNText style={styles.title}>you&rsquo;re live.</RNText>
          <RNText style={styles.sub}>
            Your store is published and ready to share.
          </RNText>

          {/* Live store URL card */}
          <View style={styles.urlCard}>
            <View style={styles.urlTop}>
              <Ionicons name="globe-outline" size={15} color={palette.mute} />
              <RNText style={styles.urlLabel}>YOUR STORE URL</RNText>
            </View>
            <RNText numberOfLines={1} style={styles.url}>
              {url}
            </RNText>
            <View style={styles.urlActions}>
              <Pressable onPress={onCopy} style={styles.urlBtn} hitSlop={6}>
                <Ionicons name="copy-outline" size={16} color={palette.ink} />
                <RNText style={styles.urlBtnText}>COPY</RNText>
              </Pressable>
              <Pressable onPress={onShare} style={styles.urlBtn} hitSlop={6}>
                <Ionicons
                  name="share-outline"
                  size={16}
                  color={palette.ink}
                />
                <RNText style={styles.urlBtnText}>SHARE</RNText>
              </Pressable>
            </View>
          </View>

          {/* Medium live preview */}
          <RNText style={[styles.kicker, styles.previewKicker]}>
            LIVE PREVIEW
          </RNText>
          <DeviceFrame style={{ height: 320 }}>
            <StorefrontPreview mode="mini" />
          </DeviceFrame>
        </SafeAreaView>
      </ScrollView>

      {/* Primary + secondary CTAs */}
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Pressable
          onPress={() => router.push('/(modules)/merch/preview')}
          style={styles.primaryCta}
        >
          <RNText style={styles.primaryCtaText}>VIEW MY STORE</RNText>
          <View style={styles.primaryCtaArrow}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.push('/(modules)/merch/build/review')}
          style={styles.secondaryCta}
        >
          <RNText style={styles.secondaryCtaText}>BACK TO EDITOR</RNText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 20, paddingBottom: 28 },

    mark: {
      width: 76,
      height: 76,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.acid,
      marginTop: 24,
    },

    kicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 2.2,
      textTransform: 'uppercase',
      color: palette.mute,
    },
    previewKicker: { marginTop: 30, marginBottom: 14 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 40,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 16,
    },
    sub: {
      fontFamily: fonts.body,
      fontSize: 16,
      lineHeight: 23,
      color: palette.mute,
      marginTop: 10,
    },

    urlCard: {
      marginTop: 26,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
    },
    urlTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },
    urlLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: palette.mute,
    },
    url: {
      fontFamily: fonts.displayBold,
      fontSize: 19,
      letterSpacing: -0.4,
      color: palette.ink,
      marginTop: 10,
    },
    urlActions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 16,
    },
    urlBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 48,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.ink,
    },
    urlBtnText: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.8,
      color: palette.ink,
    },

    footer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 6,
    },
    primaryCta: {
      height: 60,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 22,
      backgroundColor: palette.ink,
    },
    primaryCtaText: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2.2,
      textTransform: 'uppercase',
      color: palette.bone,
    },
    primaryCtaArrow: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.bone,
    },
    secondaryCta: {
      height: 54,
      marginTop: 10,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: palette.ink,
    },
    secondaryCtaText: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2.2,
      textTransform: 'uppercase',
      color: palette.ink,
    },
  });
