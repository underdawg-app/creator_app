// STEP 1 · IDENTITY — name the store, upload a logo, write a tagline.
// Every field writes straight into the shared storeBuilder slice, so the live
// monogram/logo and the mini storefront preview react as you type. The store
// handle is NOT typed here — it's locked to the user's profile handle (the store
// lives at their username), seeded on mount. Continue unlocks once the store has
// a name.

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Image } from '@/components/ui/Image';
import {
  StorefrontPreview,
} from '@/components/merch/StorefrontPreview';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
  useAutoHideFooter,
} from '@/screens/modules/merch/studio/_chrome';
import {
  handleOf,
  storeUrlOf,
  monogramOf,
} from '@/screens/modules/merch/studio/themePresets';
import { pickImage } from '@/screens/modules/merch/studio/pickImage';

const TAGLINE_MAX = 60;

export default function Step1Identity() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const set = useStore((s) => s.setBuilder);
  const toast = useStore((s) => s.toast);
  const userHandle = useStore((s) => s.profile.handle);

  // The store handle is the user's handle — derive it from their profile and
  // keep the builder in sync so the URL + preview reflect it.
  const storeHandle = handleOf(userHandle);
  useEffect(() => {
    if (b.handle !== storeHandle) set({ handle: storeHandle });
  }, [storeHandle]);

  const { onScroll, footerStyle } = useAutoHideFooter();

  const canContinue = b.name.trim().length > 0;

  const pickLogo = async () => {
    const uri = await pickImage('logo');
    if (uri) {
      set({ logoUri: uri });
      toast('Logo updated.', 'success');
    }
  };

  const pickHeader = async () => {
    const uri = await pickImage('header');
    if (uri) {
      set({ headerImageUri: uri });
      toast('Header image updated.', 'success');
    }
  };

  return (
    <View style={styles.root}>
      <StudioHeader step={1} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 130 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.kickerRow}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>STEP 1 · IDENTITY</RNText>
        </View>
        <RNText style={styles.title}>name your store.</RNText>

        {/* Logo — upload from gallery (falls back to a live monogram) */}
        <View style={styles.monoRow}>
          <Pressable style={styles.mono} onPress={pickLogo}>
            {b.logoUri ? (
              <Image source={{ uri: b.logoUri }} style={styles.monoImg} contentFit="cover" />
            ) : (
              <RNText style={styles.monoText}>{monogramOf(b.name)}</RNText>
            )}
            <View style={styles.monoEdit}>
              <Ionicons name="camera" size={13} color={palette.ink} />
            </View>
          </Pressable>
          <View style={styles.monoMeta}>
            <RNText style={styles.monoMetaLabel}>YOUR LOGO</RNText>
            <RNText style={styles.monoMetaSub} numberOfLines={1}>
              {b.name.trim() ? b.name.trim() : 'Untitled store'}
            </RNText>
            <View style={styles.logoBtns}>
              <Pressable onPress={pickLogo} style={styles.logoBtn} hitSlop={6}>
                <Ionicons name="image-outline" size={14} color={palette.ink} />
                <RNText style={styles.logoBtnText}>
                  {b.logoUri ? 'REPLACE' : 'UPLOAD'}
                </RNText>
              </Pressable>
              {b.logoUri ? (
                <Pressable onPress={() => set({ logoUri: null })} style={styles.logoBtnGhost} hitSlop={6}>
                  <RNText style={styles.logoBtnGhostText}>REMOVE</RNText>
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>

        {/* Header background image (optional) */}
        <View style={styles.field}>
          <View style={styles.fieldHead}>
            <RNText style={styles.fieldLabel}>HEADER BACKGROUND</RNText>
            <RNText style={styles.counter}>OPTIONAL</RNText>
          </View>
          {b.headerImageUri ? (
            <View style={styles.hbWrap}>
              <Image source={{ uri: b.headerImageUri }} style={styles.hbImg} contentFit="cover" />
              <View style={styles.hbOverlay} />
              <View style={styles.hbActions}>
                <Pressable onPress={pickHeader} style={styles.hbBtn} hitSlop={6}>
                  <Ionicons name="image-outline" size={14} color={palette.ink} />
                  <RNText style={styles.hbBtnText}>REPLACE</RNText>
                </Pressable>
                <Pressable onPress={() => set({ headerImageUri: null })} style={styles.hbBtnDark} hitSlop={6}>
                  <Ionicons name="trash-outline" size={14} color={palette.bone} />
                  <RNText style={styles.hbBtnDarkText}>REMOVE</RNText>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable onPress={pickHeader} style={styles.hbUpload}>
              <Ionicons name="image-outline" size={20} color={palette.ink} />
              <RNText style={styles.hbUploadText}>Upload header image</RNText>
              <RNText style={styles.hbUploadSub}>Sits behind your logo + name · cropped to fit</RNText>
            </Pressable>
          )}
        </View>

        {/* Store name */}
        <View style={styles.field}>
          <RNText style={styles.fieldLabel}>STORE NAME</RNText>
          <TextInput
            value={b.name}
            onChangeText={(name) => set({ name })}
            placeholder="e.g. Night Shift Club"
            placeholderTextColor={palette.mute}
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>

        {/* Handle — locked to the user's profile handle */}
        <View style={styles.field}>
          <RNText style={styles.fieldLabel}>STORE HANDLE</RNText>
          <View style={styles.handleLocked}>
            <RNText style={styles.handleValue} numberOfLines={1}>
              @{storeHandle}
            </RNText>
            <Ionicons name="lock-closed" size={15} color={palette.mute} />
          </View>
          <View style={styles.handleNote}>
            <RNText style={styles.url} numberOfLines={1}>
              {storeUrlOf(storeHandle)}
            </RNText>
            <RNText style={styles.handleHint}>Linked to your profile</RNText>
          </View>
        </View>

        {/* Tagline */}
        <View style={styles.field}>
          <View style={styles.fieldHead}>
            <RNText style={styles.fieldLabel}>TAGLINE</RNText>
            <RNText style={styles.counter}>
              {b.tagline.length}/{TAGLINE_MAX}
            </RNText>
          </View>
          <TextInput
            value={b.tagline}
            onChangeText={(t) => set({ tagline: t.slice(0, TAGLINE_MAX) })}
            placeholder="Built for the late ones."
            placeholderTextColor={palette.mute}
            style={styles.input}
            maxLength={TAGLINE_MAX}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="done"
          />
        </View>

        {/* Live preview */}
        <View style={[styles.kickerRow, styles.previewKicker]}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>LIVE PREVIEW</RNText>
        </View>
        <DeviceFrame style={styles.device}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push('/(modules)/merch/build/theme')}
        disabled={!canContinue}
        hint="Name your store to continue"
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
    kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
    kicker: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 44,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },

    // Logo
    monoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
      gap: 14,
    },
    mono: {
      width: 76,
      height: 76,
      borderRadius: 18,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    monoImg: { width: 76, height: 76, borderRadius: 18 },
    monoText: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      letterSpacing: -1,
      color: palette.bone,
    },
    monoEdit: {
      position: 'absolute',
      right: 4,
      bottom: 4,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: palette.bone,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    monoMeta: { flex: 1 },
    monoMetaLabel: {
      ...T.label,
      color: palette.mute,
    },
    monoMetaSub: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.4,
      color: palette.ink,
      marginTop: 4,
    },
    logoBtns: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
    logoBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
    },
    logoBtnText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.ink },
    logoBtnGhost: { height: 32, paddingHorizontal: 10, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    logoBtnGhostText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.mute },

    // Fields
    field: { marginTop: 24 },
    fieldHead: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    fieldLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
      marginBottom: 8,
    },
    counter: {
      fontFamily: fonts.body,
      fontSize: 12,
      color: palette.mute,
      marginBottom: 8,
    },
    input: {
      minHeight: 52,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontFamily: fonts.body,
      fontSize: 16,
      color: palette.ink,
    },
    // Locked handle row
    handleLocked: {
      minHeight: 52,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: 0.9,
    },
    handleValue: {
      flex: 1,
      fontFamily: fonts.bodyBold,
      fontSize: 16,
      color: palette.ink,
    },
    handleNote: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
      gap: 10,
    },
    url: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.mute,
    },
    handleHint: { ...T.small, color: palette.mute },

    // Header background uploader
    hbUpload: {
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      borderStyle: 'dashed',
      backgroundColor: palette.boneSoft,
      paddingVertical: 22,
      paddingHorizontal: 16,
      alignItems: 'center',
      gap: 6,
    },
    hbUploadText: { fontFamily: fonts.bodyBold, fontSize: 14, color: palette.ink, marginTop: 4 },
    hbUploadSub: { ...T.small, color: palette.mute, textAlign: 'center' },
    hbWrap: {
      height: 120,
      borderRadius: 14,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: palette.line,
      justifyContent: 'flex-end',
    },
    hbImg: { ...StyleSheet.absoluteFillObject },
    hbOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
    hbActions: { flexDirection: 'row', gap: 8, padding: 10 },
    hbBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: palette.bone,
    },
    hbBtnText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.ink },
    hbBtnDark: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: 'rgba(10,10,10,0.55)',
    },
    hbBtnDarkText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.bone },

    previewKicker: { marginTop: 28 },
    device: { height: 400, marginTop: 12 },
  });
