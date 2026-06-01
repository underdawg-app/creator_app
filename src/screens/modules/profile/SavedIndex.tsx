// SavedIndex — everything the user has bookmarked. Reads the `saves` map from
// the store and shows the matching feed posts in a tappable grid. Tapping a
// tile opens the post detail; the bookmark on each tile unsaves it. Themed.

import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Pressable,
} from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { feedPosts } from '@/data/mock';
import { useStore } from '@/store';

const { width } = Dimensions.get('window');
const GRID_GAP = 3;
const TILE = (width - 24 - GRID_GAP) / 2;

export default function SavedIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const saves = useStore((s) => s.saves);
  const toggleSave = useStore((s) => s.toggleSave);

  const savedPosts = useMemo(
    () => feedPosts.filter((p) => saves[p.id]),
    [saves],
  );

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="YOUR LIBRARY" title="SAVED" />} waves={false}>
      {savedPosts.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bookmark-outline" size={40} color={palette.mute} />
          <RNText style={styles.emptyTitle}>Nothing saved yet</RNText>
          <RNText style={styles.emptyBody}>
            Tap the bookmark on any post and it’ll land here.
          </RNText>
        </View>
      ) : (
        <>
          <RNText style={styles.count}>
            {savedPosts.length} {savedPosts.length === 1 ? 'post' : 'posts'}
          </RNText>
          <View style={styles.grid}>
            {savedPosts.map((p) => (
              <Tap
                key={p.id}
                onPress={() => router.push(`/(modules)/profile/post/${p.id}` as any)}
                burstColor={p.color}
                style={[styles.tile, { backgroundColor: palette.boneSoft }]}
              >
                {p.image ? (
                  <Image
                    source={{ uri: p.image }}
                    style={StyleSheet.absoluteFill as any}
                    contentFit="cover"
                    targetWidth={TILE}
                  />
                ) : null}
                <View style={styles.tileScrim} pointerEvents="none" />
                <RNText style={styles.tileLabel} numberOfLines={1}>
                  {p.creator}
                </RNText>
                <Pressable
                  onPress={() => toggleSave(p.id)}
                  style={styles.unsave}
                  hitSlop={8}
                >
                  <Ionicons name="bookmark" size={16} color={palette.bone} />
                </Pressable>
              </Tap>
            ))}
          </View>
        </>
      )}
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    empty: { alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 80 },
    emptyTitle: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.5, color: palette.ink, marginTop: 6 },
    emptyBody: { ...T.body, color: palette.mute, textAlign: 'center', maxWidth: 260 },

    count: { ...T.label, color: palette.mute, marginTop: 4, marginBottom: 14 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP },
    tile: {
      width: TILE,
      height: TILE * 1.2,
      borderRadius: 14,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      padding: 10,
    },
    tileScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,10,10,0.28)' },
    tileLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 0.4,
      color: staticPalette.bone,
    },
    unsave: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(10,10,10,0.45)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
