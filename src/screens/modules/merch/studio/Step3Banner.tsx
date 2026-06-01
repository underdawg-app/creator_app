// STEP 3 · BANNER / HERO — build the auto-rotating hero carousel.
// Pick a fill style (used by slides without an image), then add 1–3 slides. Each
// slide can take a cropped gallery image plus a headline / subtext / button.
// Everything writes to storeBuilder.banners, so the live preview's carousel
// updates and rotates instantly.

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
import { useStore, type BannerItem } from '@/store';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
  useAutoHideFooter,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { Image } from '@/components/ui/Image';
import { BANNER_STYLES } from '@/screens/modules/merch/studio/themePresets';
import { pickImage } from '@/screens/modules/merch/studio/pickImage';

const NEXT = '/(modules)/merch/build/layout';
const MAX_BANNERS = 3;

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
  const toast = useStore((s) => s.toast);

  const { onScroll, footerStyle } = useAutoHideFooter();

  const banners = b.banners ?? [];

  const updateBanner = (id: string, patch: Partial<BannerItem>) =>
    set({ banners: banners.map((x) => (x.id === id ? { ...x, ...patch } : x)) });

  const addBanner = () => {
    if (banners.length >= MAX_BANNERS) return;
    const item: BannerItem = {
      id: `bn${Date.now()}`,
      imageUri: null,
      headline: 'NEW SLIDE',
      subtext: 'Tell them what this is.',
      buttonLabel: 'SHOP NOW',
    };
    set({ banners: [...banners, item] });
  };

  const removeBanner = (id: string) =>
    set({ banners: banners.filter((x) => x.id !== id) });

  const pickBannerImage = async (id: string) => {
    const uri = await pickImage('banner');
    if (uri) {
      updateBanner(id, { imageUri: uri });
      toast('Banner image updated.', 'success');
    }
  };

  const canContinue = banners.some((x) => x.headline.trim().length > 0);

  return (
    <View style={styles.root}>
      <StudioHeader step={3} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 130 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={[styles.kickerRow, { marginTop: 8 }]}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>STEP 3 · BANNER / HERO</RNText>
        </View>
        <RNText style={styles.title}>set the hero.</RNText>
        <RNText style={styles.lede}>
          Add up to {MAX_BANNERS} slides — they rotate automatically on your store.
        </RNText>

        {/* FILL STYLE (for slides without an image) */}
        <View style={styles.sectionRow}>
          <View style={styles.dot} />
          <RNText style={styles.sectionLabel}>FILL STYLE</RNText>
          <RNText style={styles.optional}>NO-IMAGE SLIDES</RNText>
        </View>
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
                  <RNText style={[styles.styleName, active && styles.styleNameActive]}>
                    {s.label}
                  </RNText>
                  <Ionicons
                    name={active ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={active ? palette.ink : palette.line}
                  />
                </View>
                <RNText style={[styles.styleHint, active && styles.styleHintActive]}>
                  {STYLE_HINT[s.key]}
                </RNText>
              </Pressable>
            );
          })}
        </View>

        {/* BANNER SLIDES */}
        <View style={styles.sectionRow}>
          <View style={styles.dot} />
          <RNText style={styles.sectionLabel}>SLIDES</RNText>
          <RNText style={styles.optional}>{banners.length}/{MAX_BANNERS}</RNText>
        </View>

        {banners.map((item, i) => (
          <View key={item.id} style={styles.slide}>
            <View style={styles.slideHead}>
              <RNText style={styles.slideNum}>SLIDE {i + 1}</RNText>
              {banners.length > 1 ? (
                <Pressable onPress={() => removeBanner(item.id)} hitSlop={8} style={styles.slideRemove}>
                  <Ionicons name="close" size={14} color={palette.mute} />
                  <RNText style={styles.slideRemoveText}>REMOVE</RNText>
                </Pressable>
              ) : null}
            </View>

            {/* Image */}
            {item.imageUri ? (
              <View style={styles.heroWrap}>
                <Image source={{ uri: item.imageUri }} style={styles.heroImg} contentFit="cover" />
                <View style={styles.heroOverlay} />
                <View style={styles.heroActions}>
                  <Pressable onPress={() => pickBannerImage(item.id)} style={styles.heroBtn} hitSlop={6}>
                    <Ionicons name="image-outline" size={14} color={palette.ink} />
                    <RNText style={styles.heroBtnText}>REPLACE</RNText>
                  </Pressable>
                  <Pressable onPress={() => updateBanner(item.id, { imageUri: null })} style={styles.heroBtnDark} hitSlop={6}>
                    <Ionicons name="trash-outline" size={14} color={palette.bone} />
                    <RNText style={styles.heroBtnDarkText}>REMOVE</RNText>
                  </Pressable>
                </View>
              </View>
            ) : (
              <Pressable onPress={() => pickBannerImage(item.id)} style={styles.uploadTile}>
                <View style={styles.uploadIcon}>
                  <Ionicons name="cloud-upload-outline" size={22} color={palette.ink} />
                </View>
                <RNText style={styles.uploadTitle}>Upload image</RNText>
                <RNText style={styles.uploadSub}>Cropped to the banner size · optional</RNText>
              </Pressable>
            )}

            {/* Copy */}
            <TextInput
              value={item.headline}
              onChangeText={(t) => updateBanner(item.id, { headline: t })}
              placeholder="HEADLINE"
              placeholderTextColor={palette.mute}
              style={[styles.input, styles.inputHeadline, { marginTop: 12 }]}
              maxLength={42}
              autoCapitalize="characters"
              returnKeyType="done"
            />
            <TextInput
              value={item.subtext}
              onChangeText={(t) => updateBanner(item.id, { subtext: t })}
              placeholder="Subtext line"
              placeholderTextColor={palette.mute}
              style={[styles.input, { marginTop: 8 }]}
              maxLength={64}
              returnKeyType="done"
            />
            <TextInput
              value={item.buttonLabel}
              onChangeText={(t) => updateBanner(item.id, { buttonLabel: t })}
              placeholder="BUTTON LABEL"
              placeholderTextColor={palette.mute}
              style={[styles.input, { marginTop: 8 }]}
              maxLength={24}
              autoCapitalize="characters"
              returnKeyType="done"
            />
          </View>
        ))}

        {banners.length < MAX_BANNERS ? (
          <Pressable onPress={addBanner} style={styles.addBtn}>
            <Ionicons name="add" size={18} color={palette.ink} />
            <RNText style={styles.addBtnText}>ADD SLIDE</RNText>
          </Pressable>
        ) : null}

        {/* LIVE PREVIEW */}
        <View style={[styles.sectionRow, { marginTop: 28 }]}>
          <View style={styles.dot} />
          <RNText style={styles.sectionLabel}>LIVE PREVIEW</RNText>
        </View>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push(NEXT)}
        hint="Add a headline to keep going."
        disabled={!canContinue}
        animStyle={footerStyle}
      />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 16, paddingBottom: 24 },

    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    kicker: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 44,
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
    sectionLabel: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 26,
      marginBottom: 12,
    },
    optional: { ...T.small, color: palette.mute, letterSpacing: 1.4, marginLeft: 'auto' },

    styleGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    styleCard: {
      width: '48.5%',
      minHeight: 88,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.bone,
      paddingHorizontal: 14,
      paddingVertical: 14,
      marginBottom: 12,
    },
    styleCardActive: { borderColor: palette.ink, backgroundColor: palette.boneSoft },
    styleCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    styleName: { fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 1, color: palette.mute },
    styleNameActive: { color: palette.ink },
    styleHint: { ...T.small, color: palette.mute, marginTop: 8 },
    styleHintActive: { color: palette.ink, opacity: 0.7 },

    // Slide card
    slide: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 14,
      marginBottom: 12,
    },
    slideHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    slideNum: { ...T.label, color: palette.ink, letterSpacing: 1.6 },
    slideRemove: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    slideRemoveText: { ...T.small, color: palette.mute, letterSpacing: 1.2 },

    // Upload
    uploadTile: {
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      borderStyle: 'dashed',
      backgroundColor: palette.bone,
      paddingVertical: 22,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    uploadIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: palette.boneSoft,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    uploadTitle: { fontFamily: fonts.bodyBold, fontSize: 15, color: palette.ink },
    uploadSub: { ...T.small, color: palette.mute, marginTop: 4, textAlign: 'center' },
    heroWrap: {
      height: 150,
      borderRadius: 14,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: palette.line,
      justifyContent: 'flex-end',
    },
    heroImg: { ...StyleSheet.absoluteFillObject },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.18)' },
    heroActions: { flexDirection: 'row', gap: 8, padding: 10 },
    heroBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: palette.bone,
    },
    heroBtnText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.ink },
    heroBtnDark: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: 'rgba(10,10,10,0.55)',
    },
    heroBtnDarkText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.bone },

    input: {
      minHeight: 50,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.bone,
      paddingHorizontal: 16,
      paddingVertical: 13,
      fontFamily: fonts.body,
      fontSize: 16,
      color: palette.ink,
    },
    inputHeadline: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.2 },

    addBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 52,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.ink,
      borderStyle: 'dashed',
    },
    addBtnText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
