// STEP 1 · IDENTITY — name the store, claim a handle, write a tagline.
// Every field writes straight into the shared storeBuilder slice, so the live
// monogram and the mini storefront preview react as you type. The handle is
// auto-derived from the name but stays editable; Continue unlocks once the
// store has a name.

import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  TextInput,
} from 'react-native';
import { router } from '@/navigation';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import {
  StorefrontPreview,
} from '@/components/merch/StorefrontPreview';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
} from '@/screens/modules/merch/studio/_chrome';
import {
  handleOf,
  storeUrlOf,
  monogramOf,
} from '@/screens/modules/merch/studio/themePresets';

const TAGLINE_MAX = 60;

export default function Step1Identity() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const set = useStore((s) => s.setBuilder);

  const canContinue = b.name.trim().length > 0;

  return (
    <View style={styles.root}>
      <StudioHeader step={1} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <RNText style={styles.kicker}>STEP 1 · IDENTITY</RNText>
        <RNText style={styles.title}>name your store.</RNText>

        {/* Live logo monogram */}
        <View style={styles.monoRow}>
          <View style={styles.mono}>
            <RNText style={styles.monoText}>{monogramOf(b.name)}</RNText>
          </View>
          <View style={styles.monoMeta}>
            <RNText style={styles.monoMetaLabel}>YOUR LOGO</RNText>
            <RNText style={styles.monoMetaSub} numberOfLines={1}>
              {b.name.trim() ? b.name.trim() : 'Untitled store'}
            </RNText>
          </View>
        </View>

        {/* Store name */}
        <View style={styles.field}>
          <RNText style={styles.fieldLabel}>STORE NAME</RNText>
          <TextInput
            value={b.name}
            onChangeText={(t) => set({ name: t, handle: handleOf(t) })}
            placeholder="e.g. Night Shift Club"
            placeholderTextColor={palette.mute}
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
          />
        </View>

        {/* Handle */}
        <View style={styles.field}>
          <RNText style={styles.fieldLabel}>HANDLE</RNText>
          <TextInput
            value={b.handle}
            onChangeText={(t) => set({ handle: handleOf(t) })}
            placeholder="your-store"
            placeholderTextColor={palette.mute}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <RNText style={styles.url} numberOfLines={1}>
            {storeUrlOf(b.handle)}
          </RNText>
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
        <RNText style={[styles.kicker, styles.previewKicker]}>LIVE PREVIEW</RNText>
        <DeviceFrame style={styles.device}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push('/(modules)/merch/build/theme')}
        disabled={!canContinue}
        hint="Name your store to continue"
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
      lineHeight: 14,
      letterSpacing: 2.2,
      textTransform: 'uppercase',
      color: palette.mute,
      marginTop: 12,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 40,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },

    // Monogram
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
    },
    monoText: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      letterSpacing: -1,
      color: palette.bone,
    },
    monoMeta: { flex: 1 },
    monoMetaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.2,
      textTransform: 'uppercase',
      color: palette.mute,
    },
    monoMetaSub: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.4,
      color: palette.ink,
      marginTop: 4,
    },

    // Fields
    field: { marginTop: 24 },
    fieldHead: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    fieldLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.2,
      textTransform: 'uppercase',
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
    url: {
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.mute,
      marginTop: 8,
    },

    previewKicker: { marginTop: 28 },
    device: { height: 400, marginTop: 12 },
  });
