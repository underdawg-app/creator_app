// MerchPreview — the full-screen storefront preview overlay. It renders the
// REAL storefront exactly as a visitor would see it (StorefrontPreview mode
// "full", driven by the shared storeBuilder slice), with a thin translucent top
// bar over it: a close X (router.back), the live store URL centered, and a
// share icon. No StudioHeader / StudioFooter — this is meant to read like the
// actual published store, not a wizard step.

import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { getTheme, storeUrlOf } from '@/screens/modules/merch/studio/themePresets';

export default function MerchPreview() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const toast = useStore((s) => s.toast);

  // Tint the bar to read over whatever theme the storefront uses.
  const theme = getTheme(b.themeKey);
  const url = storeUrlOf(b.handle);

  return (
    <View style={styles.root}>
      {/* The real storefront fills everything and scrolls internally. */}
      <StorefrontPreview mode="full" />

      {/* Thin translucent top bar floating over the storefront. */}
      <SafeAreaView edges={['top']} style={styles.barSafe} pointerEvents="box-none">
        <View style={[styles.bar, { backgroundColor: theme.bg + 'EE', borderColor: theme.border }]}>
          <Pressable onPress={() => router.back()} hitSlop={10} style={styles.iconBtn}>
            <Ionicons name="close" size={20} color={theme.text} />
          </Pressable>

          <RNText numberOfLines={1} style={[styles.url, { color: theme.sub }]}>
            {url}
          </RNText>

          <Pressable
            onPress={() => toast('Share sheet opened.')}
            hitSlop={10}
            style={styles.iconBtn}
          >
            <Ionicons name="share-outline" size={19} color={theme.text} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.ink },
    barSafe: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderBottomWidth: 1,
    },
    iconBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    url: {
      flex: 1,
      textAlign: 'center',
      fontFamily: fonts.body,
      fontSize: 15,
      letterSpacing: 0.2,
    },
  });
