// STEP 4 / 6 — LAYOUT. Arrange which sections appear on the storefront.
// Four Switch rows toggle showSearch / showGrid / showStory / showFooter on the
// shared storeBuilder slice; the live mini preview adds/removes each section
// instantly. When the story block is on, two TextInputs edit storyTitle /
// storyBody. Continue advances to the products step.

import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  Switch,
  TextInput,
} from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';

type ToggleKey = 'showSearch' | 'showGrid' | 'showStory' | 'showFooter';

const ROWS: {
  key: ToggleKey;
  icon: string;
  label: string;
  sub: string;
}[] = [
  {
    key: 'showSearch',
    icon: 'search-outline',
    label: 'Search bar',
    sub: 'Let shoppers find pieces fast.',
  },
  {
    key: 'showGrid',
    icon: 'grid-outline',
    label: 'Product grid',
    sub: 'The shelf where your drops live.',
  },
  {
    key: 'showStory',
    icon: 'book-outline',
    label: 'Story block',
    sub: 'A short note about the brand.',
  },
  {
    key: 'showFooter',
    icon: 'remove-outline',
    label: 'Footer',
    sub: 'Store URL and the UNDERDAWG line.',
  },
];

export default function Step4Layout() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const set = useStore((s) => s.setBuilder);

  return (
    <View style={styles.screen}>
      <StudioHeader step={4} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <RNText style={styles.kicker}>STEP 4 · LAYOUT</RNText>
        <RNText style={styles.title}>arrange the page.</RNText>
        <RNText style={styles.lede}>
          Flip on the sections you want. The preview updates as you go.
        </RNText>

        <View style={styles.rows}>
          {ROWS.map((row, i) => {
            const value = b[row.key];
            return (
              <Pressable
                key={row.key}
                onPress={() => set({ [row.key]: !value })}
                style={[styles.row, i > 0 && styles.rowDivider]}
              >
                <View style={styles.rowIcon}>
                  <Ionicons name={row.icon as any} size={18} color={palette.ink} />
                </View>
                <View style={styles.rowText}>
                  <RNText style={styles.rowLabel}>{row.label}</RNText>
                  <RNText style={styles.rowSub}>{row.sub}</RNText>
                </View>
                <Switch
                  value={value}
                  onValueChange={(next) => set({ [row.key]: next })}
                  trackColor={{ false: palette.line, true: palette.ink }}
                  thumbColor={palette.bone}
                  ios_backgroundColor={palette.line}
                />
              </Pressable>
            );
          })}
        </View>

        {b.showStory ? (
          <View style={styles.storyFields}>
            <RNText style={styles.fieldKicker}>STORY TITLE</RNText>
            <TextInput
              value={b.storyTitle}
              onChangeText={(t) => set({ storyTitle: t })}
              placeholder="THE STORY"
              placeholderTextColor={palette.mute}
              style={styles.input}
              maxLength={40}
            />

            <RNText style={[styles.fieldKicker, { marginTop: 18 }]}>STORY BODY</RNText>
            <TextInput
              value={b.storyBody}
              onChangeText={(t) => set({ storyBody: t })}
              placeholder="A line or two about where this started and what it stands for."
              placeholderTextColor={palette.mute}
              style={[styles.input, styles.inputMultiline]}
              multiline
              textAlignVertical="top"
              maxLength={240}
            />
          </View>
        ) : null}

        <RNText style={[styles.kicker, styles.previewKicker]}>LIVE PREVIEW</RNText>
        <DeviceFrame style={styles.device}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push('/(modules)/merch/build/products')}
      />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 20, paddingBottom: 24 },
    kicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.2,
      color: palette.mute,
      textTransform: 'uppercase',
      marginTop: 8,
    },
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
    rows: {
      marginTop: 22,
      backgroundColor: palette.paper,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      paddingHorizontal: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 64,
      paddingVertical: 12,
      gap: 14,
    },
    rowDivider: {
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    rowIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.bone,
    },
    rowText: { flex: 1 },
    rowLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 16,
      letterSpacing: -0.2,
      color: palette.ink,
    },
    rowSub: {
      fontFamily: fonts.body,
      fontSize: 13,
      lineHeight: 18,
      color: palette.mute,
      marginTop: 2,
    },
    storyFields: {
      marginTop: 18,
      backgroundColor: palette.paper,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      padding: 18,
    },
    fieldKicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.2,
      color: palette.mute,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    input: {
      fontFamily: fonts.body,
      fontSize: 16,
      lineHeight: 22,
      color: palette.ink,
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      minHeight: 48,
      backgroundColor: palette.bone,
    },
    inputMultiline: {
      minHeight: 96,
      paddingTop: 12,
    },
    previewKicker: { marginTop: 28 },
    device: { height: 400, marginTop: 12 },
  });
