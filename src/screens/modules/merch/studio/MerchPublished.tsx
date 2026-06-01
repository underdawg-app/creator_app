// MerchPublished — the success screen after publishing the storefront. Re-skinned
// to the homepage (Explore) layout system: a top HeaderBar with a bottom hairline,
// a 16px gutter, dot + labelLarge section kickers, radius-18 line cards and the
// shared `T` type tokens. Surfaces the live store URL (copy/share), a live preview
// of the storeBuilder, and the two ways forward. No confetti.

import React from 'react';
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
import { fonts, type as T } from '@/theme/typography';
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
  const toast = useStore((s) => s.toast);

  const url = storeUrlOf(b.handle);
  const onCopy = () => toast('Link copied.', 'success');
  const onShare = () => toast('Share sheet opened.');

  return (
    <View style={styles.screen}>
      {/* Homepage-style header bar */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="close" size={18} color={palette.ink} />
          </Pressable>
          <View style={styles.headerCenter}>
            <RNText style={styles.headerTitle} allowFontScaling={false}>
              PUBLISHED
            </RNText>
          </View>
          <Pressable onPress={onShare} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="share-outline" size={18} color={palette.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Success mark */}
        <View style={styles.mark}>
          <Ionicons name="checkmark" size={34} color={staticPalette.ink} />
        </View>

        {/* Kicker — dot + labelLarge */}
        <View style={styles.kickerRow}>
          <View style={styles.dot} />
          <RNText style={styles.kicker} maxFontSizeMultiplier={1.1}>
            STORE PUBLISHED
          </RNText>
        </View>
        <RNText style={styles.title} allowFontScaling={false}>
          you&rsquo;re live.
        </RNText>
        <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
          Your store is published and ready to share.
        </RNText>

        {/* Live store URL card */}
        <View style={styles.urlCard}>
          <View style={styles.urlTop}>
            <Ionicons name="globe-outline" size={15} color={palette.mute} />
            <RNText style={styles.urlLabel} maxFontSizeMultiplier={1.1}>
              YOUR STORE URL
            </RNText>
          </View>
          <RNText numberOfLines={1} style={styles.url} allowFontScaling={false}>
            {url}
          </RNText>
          <View style={styles.urlActions}>
            <Pressable onPress={onCopy} style={styles.urlBtn} hitSlop={6}>
              <Ionicons name="copy-outline" size={16} color={palette.ink} />
              <RNText style={styles.urlBtnText} maxFontSizeMultiplier={1.1}>
                COPY
              </RNText>
            </Pressable>
            <Pressable onPress={onShare} style={styles.urlBtn} hitSlop={6}>
              <Ionicons name="share-outline" size={16} color={palette.ink} />
              <RNText style={styles.urlBtnText} maxFontSizeMultiplier={1.1}>
                SHARE
              </RNText>
            </Pressable>
          </View>
        </View>

        {/* Live preview section */}
        <View style={styles.sectionHead}>
          <View style={styles.dot} />
          <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.1}>
            LIVE PREVIEW
          </RNText>
        </View>
        <DeviceFrame style={{ height: 320 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      {/* Primary + secondary CTAs */}
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Pressable
          onPress={() => router.push('/(modules)/merch/preview')}
          style={styles.primaryCta}
        >
          <RNText style={styles.primaryCtaText} maxFontSizeMultiplier={1.1}>
            VIEW MY STORE
          </RNText>
          <View style={styles.primaryCtaArrow}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.push('/(modules)/merch/build/review')}
          style={styles.secondaryCta}
        >
          <RNText style={styles.secondaryCtaText} maxFontSizeMultiplier={1.1}>
            BACK TO EDITOR
          </RNText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },

    // Header — mirrors the homepage bar
    headerSafe: {
      backgroundColor: palette.bone,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 12,
    },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerTitle: { ...T.title3, color: palette.ink, letterSpacing: 0.4 },
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },

    scroll: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 28 },

    mark: {
      width: 72,
      height: 72,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.acid,
      marginBottom: 20,
    },

    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    kicker: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },

    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 44,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 8,
    },
    sub: { ...T.lead, color: palette.mute, marginTop: 10 },

    urlCard: {
      marginTop: 26,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
    },
    urlTop: { flexDirection: 'row', alignItems: 'center', gap: 7 },
    urlLabel: { ...T.label, color: palette.mute },
    url: {
      fontFamily: fonts.displayBold,
      fontSize: 19,
      letterSpacing: -0.4,
      color: palette.ink,
      marginTop: 10,
    },
    urlActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
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
    urlBtnText: { ...T.label, color: palette.ink },

    sectionHead: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 30,
      marginBottom: 14,
    },
    sectionKicker: { ...T.labelLarge, color: palette.ink },

    footer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
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
