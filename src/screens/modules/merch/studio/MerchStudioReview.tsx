// MerchStudioReview — the "everything on one page" dashboard the creator lands
// on after building (and what /(modules)/merch shows once built). It surfaces a
// large tappable live preview, quick-edit cards that jump back to any wizard
// step, links to the existing merch sub-screens, a start-over escape hatch, and
// the publish CTA. All reads come straight from the shared storeBuilder slice,
// so the preview reflects the latest state the moment you re-enter.

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
} from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { useStore } from '@/store';
import { Sheet } from '@/components/ui/Sheet';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
} from '@/screens/modules/merch/studio/_chrome';
import {
  getTheme,
  getFontPair,
} from '@/screens/modules/merch/studio/themePresets';

type EditCard = {
  key: string;
  label: string;
  summary: string;
  icon: string;
  route: string;
};

type ManageRow = {
  key: string;
  label: string;
  icon: string;
  route: string;
};

export default function MerchStudioReview() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const set = useStore((s) => s.setBuilder);
  const publishBuilder = useStore((s) => s.publishBuilder);
  const resetBuilder = useStore((s) => s.resetBuilder);
  const confetti = useStore((s) => s.confetti);

  const [confirmReset, setConfirmReset] = useState(false);

  // Landing here means the store has been built — mark it so re-entering Merch
  // routes back to this dashboard rather than the wizard intro.
  useEffect(() => {
    if (!b.built) set({ built: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enabledSections = [
    b.showSearch,
    b.showGrid,
    b.showStory,
    b.showFooter,
  ].filter(Boolean).length;

  const editCards: EditCard[] = [
    {
      key: 'identity',
      label: 'Identity',
      summary: b.name?.trim() || 'Unnamed',
      icon: 'pricetag-outline',
      route: '/(modules)/merch/build/identity',
    },
    {
      key: 'theme',
      label: 'Theme',
      summary: `${getTheme(b.themeKey).name} · ${getFontPair(b.fontKey).name}`,
      icon: 'color-palette-outline',
      route: '/(modules)/merch/build/theme',
    },
    {
      key: 'banner',
      label: 'Banner',
      summary: b.bannerStyle,
      icon: 'image-outline',
      route: '/(modules)/merch/build/banner',
    },
    {
      key: 'layout',
      label: 'Layout',
      summary: `${enabledSections} section${enabledSections === 1 ? '' : 's'} on`,
      icon: 'grid-outline',
      route: '/(modules)/merch/build/layout',
    },
    {
      key: 'products',
      label: 'Products',
      summary: `${b.products.length} item${b.products.length === 1 ? '' : 's'}`,
      icon: 'cube-outline',
      route: '/(modules)/merch/build/products',
    },
    {
      key: 'mockups',
      label: 'AI mockups',
      summary: 'Generate art',
      icon: 'sparkles-outline',
      route: '/(modules)/merch/build/mockups',
    },
  ];

  const manageRows: ManageRow[] = [
    {
      key: 'orders',
      label: 'Orders',
      icon: 'receipt-outline',
      route: '/(modules)/merch/orders',
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: 'bar-chart-outline',
      route: '/(modules)/merch/analytics',
    },
    {
      key: 'designers',
      label: 'Hire a designer',
      icon: 'brush-outline',
      route: '/(modules)/merch/designers',
    },
  ];

  const onPublish = () => {
    publishBuilder();
    confetti();
    router.push('/(modules)/merch/build/published');
  };

  const onStartOver = () => {
    setConfirmReset(false);
    resetBuilder();
    router.back();
  };

  return (
    <View style={styles.screen}>
      <StudioHeader title="YOUR STORE" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <RNText style={styles.kicker}>YOUR STORE</RNText>
        <RNText style={styles.title}>ready to ship.</RNText>

        {/* Large tappable live preview → full storefront */}
        <Pressable
          onPress={() => router.push('/(modules)/merch/preview')}
          style={styles.previewPress}
        >
          <DeviceFrame style={{ height: 460 }}>
            <StorefrontPreview mode="mini" />
          </DeviceFrame>
          <View style={styles.previewCaption}>
            <Ionicons name="expand-outline" size={14} color={palette.mute} />
            <RNText style={styles.previewCaptionText}>
              Tap to preview full store
            </RNText>
          </View>
        </Pressable>

        {/* Quick-edit cards */}
        <RNText style={[styles.kicker, styles.sectionGap]}>QUICK EDIT</RNText>
        <View style={styles.editGrid}>
          {editCards.map((c) => (
            <Pressable
              key={c.key}
              onPress={() => router.push(c.route as never)}
              style={styles.editCard}
            >
              <View style={styles.editCardTop}>
                <View style={styles.editIcon}>
                  <Ionicons name={c.icon as never} size={16} color={palette.ink} />
                </View>
                <Ionicons name="pencil" size={13} color={palette.mute} />
              </View>
              <RNText style={styles.editLabel}>{c.label}</RNText>
              <RNText numberOfLines={1} style={styles.editSummary}>
                {c.summary}
              </RNText>
            </Pressable>
          ))}
        </View>

        {/* Manage existing screens */}
        <RNText style={[styles.kicker, styles.sectionGap]}>MANAGE</RNText>
        <View style={styles.manageGroup}>
          {manageRows.map((r, i) => (
            <Pressable
              key={r.key}
              onPress={() => router.push(r.route as never)}
              style={[
                styles.manageRow,
                i < manageRows.length - 1 && styles.manageDivider,
              ]}
            >
              <View style={styles.manageIcon}>
                <Ionicons name={r.icon as never} size={17} color={palette.ink} />
              </View>
              <RNText style={styles.manageLabel}>{r.label}</RNText>
              <Ionicons name="chevron-forward" size={16} color={palette.mute} />
            </Pressable>
          ))}
        </View>

        {/* Start over */}
        <Pressable
          onPress={() => setConfirmReset(true)}
          style={styles.startOver}
          hitSlop={8}
        >
          <RNText style={styles.startOverText}>Start over</RNText>
        </Pressable>
      </ScrollView>

      <StudioFooter
        label={b.published ? 'Re-publish' : 'Publish store'}
        onPress={onPublish}
      />

      <Sheet
        visible={confirmReset}
        onClose={() => setConfirmReset(false)}
        eyebrow="START OVER"
        title="Clear everything?"
      >
        <RNText style={styles.sheetBody}>
          This wipes your store name, theme, banner, layout and every product.
          You can&rsquo;t undo it.
        </RNText>
        <Pressable onPress={onStartOver} style={styles.sheetDanger}>
          <RNText style={styles.sheetDangerText}>YES, START OVER</RNText>
        </Pressable>
        <Pressable
          onPress={() => setConfirmReset(false)}
          style={styles.sheetCancel}
        >
          <RNText style={styles.sheetCancelText}>Keep my store</RNText>
        </Pressable>
      </Sheet>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 20, paddingBottom: 28 },

    kicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      lineHeight: 14,
      letterSpacing: 2.2,
      textTransform: 'uppercase',
      color: palette.mute,
    },
    sectionGap: { marginTop: 30 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 40,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },

    previewPress: { marginTop: 22 },
    previewCaption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 12,
    },
    previewCaptionText: {
      fontFamily: fonts.bodyMedium,
      fontSize: 15,
      color: palette.mute,
    },

    editGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 14,
    },
    editCard: {
      width: '48%',
      minHeight: 96,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 14,
      marginBottom: 12,
    },
    editCardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    editIcon: {
      width: 30,
      height: 30,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.bone,
    },
    editLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 17,
      letterSpacing: -0.3,
      color: palette.ink,
      marginTop: 12,
    },
    editSummary: {
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.mute,
      marginTop: 2,
    },

    manageGroup: {
      marginTop: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      overflow: 'hidden',
    },
    manageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      minHeight: 56,
      paddingHorizontal: 16,
    },
    manageDivider: {
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    manageIcon: {
      width: 34,
      height: 34,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.bone,
    },
    manageLabel: {
      flex: 1,
      fontFamily: fonts.bodyMedium,
      fontSize: 16,
      color: palette.ink,
    },

    startOver: {
      alignSelf: 'center',
      minHeight: 44,
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginTop: 26,
    },
    startOverText: {
      fontFamily: fonts.bodyMedium,
      fontSize: 15,
      letterSpacing: 0.2,
      color: palette.mute,
      textDecorationLine: 'underline',
    },

    sheetBody: {
      fontFamily: fonts.body,
      fontSize: 16,
      lineHeight: 23,
      color: palette.mute,
      paddingHorizontal: 20,
      marginBottom: 18,
    },
    sheetDanger: {
      marginHorizontal: 20,
      height: 56,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.ink,
    },
    sheetDangerText: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2,
      color: palette.bone,
    },
    sheetCancel: {
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    sheetCancelText: {
      fontFamily: fonts.bodyMedium,
      fontSize: 15,
      color: palette.mute,
    },
  });
