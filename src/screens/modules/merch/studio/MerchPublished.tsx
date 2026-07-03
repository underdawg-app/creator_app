// MerchPublished — the "you're live" success screen after publishing the
// storefront. Redesigned around the WEB STORE link as the hero: an inverse
// "live" card with Open / Copy / Share, an animated seal, quick store facts,
// and a device-framed live preview. Theme-aware via the app palette.

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  Share,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { useStore } from '@/store';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { DeviceFrame } from '@/screens/modules/merch/studio/_chrome';
import { getTheme } from '@/screens/modules/merch/studio/themePresets';
import { prettyStoreUrl, webStoreLink } from '@/lib/webStore';

export default function MerchPublished() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const toast = useStore((s) => s.toast);

  const url = prettyStoreUrl(b.handle);
  const link = webStoreLink(b);
  const themeName = getTheme(b.themeKey).name;
  const pieceCount = b.products?.length ?? 0;

  const shareLink = async () => {
    try {
      await Share.share({ message: link, url: link });
    } catch {
      toast('Could not open share sheet.');
    }
  };
  const openWeb = () =>
    Linking.openURL(link).catch(() => toast('Could not open the store link.'));

  // entrance — seal pops, then a pulsing live dot
  const seal = useSharedValue(0);
  const pulse = useSharedValue(0);
  useEffect(() => {
    seal.value = withDelay(120, withTiming(1, { duration: 520, easing: Easing.bezier(0.34, 1.4, 0.5, 1) }));
    pulse.value = withDelay(700, withRepeat(withSequence(withTiming(1, { duration: 900 }), withTiming(0, { duration: 900 })), -1, false));
  }, []);
  const sealStyle = useAnimatedStyle(() => ({
    opacity: seal.value,
    transform: [{ scale: 0.7 + seal.value * 0.3 }],
  }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: (1 - pulse.value) * 0.5,
    transform: [{ scale: 1 + pulse.value * 0.7 }],
  }));
  const dotStyle = useAnimatedStyle(() => ({ opacity: 0.45 + pulse.value * 0.55 }));

  return (
    <View style={styles.screen}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="close" size={18} color={palette.ink} />
          </Pressable>
          <RNText style={styles.headerTitle} allowFontScaling={false}>PUBLISHED</RNText>
          <Pressable onPress={shareLink} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="share-outline" size={18} color={palette.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Animated seal */}
        <View style={styles.sealWrap}>
          <Animated.View style={[styles.sealRing, ringStyle]} />
          <Animated.View style={[styles.seal, sealStyle]}>
            <Ionicons name="checkmark" size={36} color={staticPalette.ink} />
          </Animated.View>
        </View>

        {/* Hero copy */}
        <View style={styles.liveRow}>
          <Animated.View style={[styles.liveDot, dotStyle]} />
          <RNText style={styles.kicker} maxFontSizeMultiplier={1.1}>STORE IS LIVE</RNText>
        </View>
        <RNText style={styles.title} allowFontScaling={false}>you&rsquo;re live.</RNText>
        <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
          {b.name?.trim() || 'Your store'} is on the web. Share the link — anyone can open it, no app needed.
        </RNText>

        {/* Facts */}
        <View style={styles.facts}>
          <Fact styles={styles} value={String(pieceCount)} label={pieceCount === 1 ? 'PIECE' : 'PIECES'} />
          <View style={styles.factDivider} />
          <Fact styles={styles} value={themeName} label="THEME" />
          <View style={styles.factDivider} />
          <Fact styles={styles} value="LIVE" label="STATUS" accent />
        </View>

        {/* HERO — web store link card (inverse) */}
        <View style={styles.webCard}>
          <View style={styles.webTop}>
            <View style={styles.globe}>
              <Ionicons name="globe-outline" size={15} color={palette.bone} />
            </View>
            <RNText style={styles.webLabel} maxFontSizeMultiplier={1.1}>YOUR WEB STORE</RNText>
          </View>
          <RNText numberOfLines={1} style={styles.webUrl} allowFontScaling={false}>{url}</RNText>

          <Pressable onPress={openWeb} style={styles.openBtn}>
            <RNText style={styles.openBtnText} maxFontSizeMultiplier={1.1}>OPEN WEB STORE</RNText>
            <View style={styles.openArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.bone} />
            </View>
          </Pressable>

          <View style={styles.webActions}>
            <Pressable onPress={shareLink} style={styles.ghostBtn} hitSlop={6}>
              <Ionicons name="copy-outline" size={15} color={palette.bone} />
              <RNText style={styles.ghostText} maxFontSizeMultiplier={1.1}>COPY LINK</RNText>
            </Pressable>
            <Pressable onPress={shareLink} style={styles.ghostBtn} hitSlop={6}>
              <Ionicons name="share-social-outline" size={15} color={palette.bone} />
              <RNText style={styles.ghostText} maxFontSizeMultiplier={1.1}>SHARE</RNText>
            </Pressable>
          </View>
        </View>

        {/* Preview */}
        <View style={styles.sectionHead}>
          <View style={styles.dot} />
          <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.1}>LIVE PREVIEW</RNText>
        </View>
        <DeviceFrame style={{ height: 320 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      {/* Footer */}
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.footRow}>
          <Pressable onPress={() => router.push('/(modules)/merch/preview')} style={styles.secondaryCta}>
            <Ionicons name="phone-portrait-outline" size={16} color={palette.ink} />
            <RNText style={styles.secondaryCtaText} maxFontSizeMultiplier={1.1}>PREVIEW</RNText>
          </Pressable>
          <Pressable onPress={() => router.push('/(modules)/merch/build/review')} style={styles.secondaryCta}>
            <Ionicons name="create-outline" size={16} color={palette.ink} />
            <RNText style={styles.secondaryCtaText} maxFontSizeMultiplier={1.1}>EDIT</RNText>
          </Pressable>
        </View>
        <Pressable onPress={() => router.push('/(tabs)')} style={styles.doneCta}>
          <RNText style={styles.doneCtaText} maxFontSizeMultiplier={1.1}>DONE</RNText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

function Fact({ styles, value, label, accent }: { styles: any; value: string; label: string; accent?: boolean }) {
  return (
    <View style={styles.fact}>
      <RNText style={[styles.factValue, accent && styles.factAccent]} numberOfLines={1} allowFontScaling={false}>{value}</RNText>
      <RNText style={styles.factLabel} allowFontScaling={false}>{label}</RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },

    headerSafe: { backgroundColor: palette.bone, borderBottomWidth: 1, borderBottomColor: palette.line },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
    headerTitle: { ...T.title3, color: palette.ink, letterSpacing: 0.4 },
    iconBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: palette.line, alignItems: 'center', justifyContent: 'center' },

    scroll: { paddingHorizontal: 16, paddingTop: 26, paddingBottom: 28 },

    sealWrap: { width: 78, height: 78, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
    sealRing: { position: 'absolute', width: 78, height: 78, borderRadius: 39, borderWidth: 2, borderColor: palette.acid },
    seal: { width: 70, height: 70, borderRadius: 22, backgroundColor: palette.acid, alignItems: 'center', justifyContent: 'center' },

    liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    kicker: { ...T.labelLarge, color: palette.ink, opacity: 0.75 },

    title: { fontFamily: fonts.displayBold, fontSize: 46, lineHeight: 46, letterSpacing: -2, color: palette.ink, marginTop: 8 },
    sub: { ...T.lead, color: palette.mute, marginTop: 10, maxWidth: 360 },

    facts: { flexDirection: 'row', alignItems: 'center', marginTop: 22, paddingVertical: 14, borderTopWidth: 1, borderBottomWidth: 1, borderColor: palette.line },
    fact: { flex: 1, alignItems: 'center', gap: 3 },
    factValue: { fontFamily: fonts.displayHeavy, fontSize: 20, color: palette.ink },
    factAccent: { color: palette.acid },
    factLabel: { ...T.micro, color: palette.mute },
    factDivider: { width: 1, alignSelf: 'stretch', backgroundColor: palette.line },

    /* hero web card — inverse surface */
    webCard: { marginTop: 22, borderRadius: 22, backgroundColor: palette.ink, padding: 20 },
    webTop: { flexDirection: 'row', alignItems: 'center', gap: 9 },
    globe: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: palette.lineDark, alignItems: 'center', justifyContent: 'center' },
    webLabel: { ...T.label, color: palette.bone, opacity: 0.7 },
    webUrl: { fontFamily: fonts.displayBold, fontSize: 22, letterSpacing: -0.5, color: palette.bone, marginTop: 14 },

    openBtn: { marginTop: 18, height: 56, borderRadius: 16, backgroundColor: palette.bone, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
    openBtnText: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: palette.ink },
    openArrow: { width: 34, height: 34, borderRadius: 17, backgroundColor: palette.ink, alignItems: 'center', justifyContent: 'center' },

    webActions: { flexDirection: 'row', gap: 10, marginTop: 12 },
    ghostBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 46, borderRadius: 13, borderWidth: 1, borderColor: palette.lineDark },
    ghostText: { ...T.label, color: palette.bone },

    sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 30, marginBottom: 14 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    sectionKicker: { ...T.labelLarge, color: palette.ink },

    footer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
    footRow: { flexDirection: 'row', gap: 10 },
    secondaryCta: { flex: 1, height: 52, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: palette.ink },
    secondaryCtaText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: palette.ink },
    doneCta: { height: 56, marginTop: 10, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.ink },
    doneCtaText: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.2, textTransform: 'uppercase', color: palette.bone },
  });
