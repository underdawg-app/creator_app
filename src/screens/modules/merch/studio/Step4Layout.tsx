// STEP 4 / 6 — LAYOUT. Arrange which sections appear on the storefront.
// Four Switch rows toggle showSearch / showGrid / showStory / showFooter on the
// shared storeBuilder slice; the live mini preview adds/removes each section
// instantly. When the story block is on, two TextInputs edit storyTitle /
// storyBody. Continue advances to the products step.

import React, { useState } from 'react';
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
import { fonts, type as T } from '@/theme/typography';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
  useAutoHideFooter,
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

  const { onScroll, footerStyle } = useAutoHideFooter();

  const menuLinks = b.menuLinks ?? [];
  const updateLink = (id: string, patch: Partial<(typeof menuLinks)[number]>) =>
    set({ menuLinks: menuLinks.map((x) => (x.id === id ? { ...x, ...patch } : x)) });
  const addLink = () => {
    if (menuLinks.length >= 4) return;
    set({ menuLinks: [...menuLinks, { id: `ml${Date.now()}`, label: 'NEW LINK', target: 'all' }] });
  };
  const removeLink = (id: string) => set({ menuLinks: menuLinks.filter((x) => x.id !== id) });

  // Footer links edited as one comma-separated field; keep local text so the
  // user can type commas/spaces without the array round-trip eating them.
  const [footerText, setFooterText] = useState((b.footerLinks ?? []).join(', '));

  return (
    <View style={styles.screen}>
      <StudioHeader step={4} />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 130 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.kickerRow}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>STEP 4 · LAYOUT</RNText>
        </View>
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
            <View style={[styles.kickerRow, styles.fieldKickerRow]}>
              <View style={styles.dot} />
              <RNText style={styles.fieldKicker}>STORY TITLE</RNText>
            </View>
            <TextInput
              value={b.storyTitle}
              onChangeText={(t) => set({ storyTitle: t })}
              placeholder="THE STORY"
              placeholderTextColor={palette.mute}
              style={styles.input}
              maxLength={40}
            />

            <View style={[styles.kickerRow, styles.fieldKickerRow, { marginTop: 18 }]}>
              <View style={styles.dot} />
              <RNText style={styles.fieldKicker}>STORY BODY</RNText>
            </View>
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

        {/* MENU LINKS */}
        <View style={[styles.kickerRow, styles.fieldKickerRow, { marginTop: 26 }]}>
          <View style={styles.dot} />
          <RNText style={styles.fieldKicker}>MENU LINKS</RNText>
          <RNText style={styles.optional}>{menuLinks.length}/4</RNText>
        </View>
        <View style={styles.menuCard}>
          {menuLinks.map((m) => (
            <View key={m.id} style={styles.linkRow}>
              <TextInput
                value={m.label}
                onChangeText={(t) => updateLink(m.id, { label: t })}
                placeholder="LINK LABEL"
                placeholderTextColor={palette.mute}
                style={styles.linkInput}
                autoCapitalize="characters"
                maxLength={20}
              />
              <Pressable
                onPress={() => updateLink(m.id, { target: m.target === 'all' ? 'selected' : 'all' })}
                style={styles.targetChip}
                hitSlop={6}
              >
                <RNText style={styles.targetChipText}>
                  {m.target === 'all' ? 'ALL' : 'SELECTED'}
                </RNText>
              </Pressable>
              {menuLinks.length > 1 ? (
                <Pressable onPress={() => removeLink(m.id)} hitSlop={8} style={styles.linkRemove}>
                  <Ionicons name="close" size={16} color={palette.mute} />
                </Pressable>
              ) : null}
            </View>
          ))}
          {menuLinks.length < 4 ? (
            <Pressable onPress={addLink} style={styles.addLink}>
              <Ionicons name="add" size={16} color={palette.ink} />
              <RNText style={styles.addLinkText}>ADD LINK</RNText>
            </Pressable>
          ) : null}
        </View>

        {/* FOOTER customization (when footer is on) */}
        {b.showFooter ? (
          <View style={styles.storyFields}>
            <View style={[styles.kickerRow, styles.fieldKickerRow]}>
              <View style={styles.dot} />
              <RNText style={styles.fieldKicker}>FOOTER NOTE</RNText>
            </View>
            <TextInput
              value={b.footerNote}
              onChangeText={(t) => set({ footerNote: t })}
              placeholder="A short thank-you or shipping note."
              placeholderTextColor={palette.mute}
              style={[styles.input, styles.inputMultiline]}
              multiline
              textAlignVertical="top"
              maxLength={160}
            />

            <View style={[styles.kickerRow, styles.fieldKickerRow, { marginTop: 18 }]}>
              <View style={styles.dot} />
              <RNText style={styles.fieldKicker}>FOOTER LINKS</RNText>
            </View>
            <TextInput
              value={footerText}
              onChangeText={(t) => {
                setFooterText(t);
                set({ footerLinks: t.split(',').map((s) => s.trim()).filter(Boolean) });
              }}
              placeholder="SHIPPING, RETURNS, CONTACT"
              placeholderTextColor={palette.mute}
              style={styles.input}
              autoCapitalize="characters"
            />
            <RNText style={styles.footerHint}>Separate links with commas.</RNText>
          </View>
        ) : null}

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
        onPress={() => router.push('/(modules)/merch/build/products')}
        animStyle={footerStyle}
      />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 16, paddingBottom: 24 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    kickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
    },
    kicker: {
      ...T.labelLarge,
      color: palette.ink,
      opacity: 0.7,
    },
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
      ...T.small,
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
      ...T.label,
      color: palette.mute,
    },
    fieldKickerRow: { marginTop: 0, marginBottom: 8 },
    optional: { ...T.small, color: palette.mute, letterSpacing: 1.4, marginLeft: 'auto' },

    // Menu links
    menuCard: {
      backgroundColor: palette.paper,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      padding: 12,
      gap: 8,
    },
    linkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    linkInput: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.bone,
      paddingHorizontal: 12,
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 0.5,
      color: palette.ink,
    },
    targetChip: {
      height: 44,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    targetChipText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.2, color: palette.ink },
    linkRemove: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
    addLink: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: 44,
      borderRadius: 12,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: palette.ink,
    },
    addLinkText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },
    footerHint: { ...T.small, color: palette.mute, marginTop: 8 },
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
