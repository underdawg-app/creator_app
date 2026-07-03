// UserProfile — another creator's public profile, opened by tapping a handle
// or avatar anywhere in the feed/explore. Reads the person from the feed-derived
// people directory, a live follow state from the store, and shows their posts
// in a grid that opens the post detail. Themed (adapts to light/dark).

import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { personByHandle } from '@/data/people';
import { useStore } from '@/store';

const { width } = Dimensions.get('window');
const GRID_GAP = 3;
const TILE = (width - 24 - GRID_GAP * 2) / 3;

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

export default function UserProfile() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { handle } = useLocalSearchParams<{ handle?: string }>();
  const toast = useStore((s) => s.toast);

  const person = personByHandle(handle);
  const following = useStore((s) => (person ? !!s.following[person.handle] : false));
  const toggleFollow = useStore((s) => s.toggleFollow);

  if (!person) {
    return (
      <ScreenFrame header={<ModuleHeader title="PROFILE" />} waves={false}>
        <View style={styles.empty}>
          <Ionicons name="person-circle-outline" size={40} color={palette.mute} />
          <RNText style={styles.emptyText}>That creator isn’t here.</RNText>
        </View>
      </ScreenFrame>
    );
  }

  const totalLikes = person.posts.reduce((a, p) => a + p.likes, 0);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PROFILE" title={person.handle} />} waves={false}>
      {/* Identity */}
      <View style={styles.identity}>
        <View style={[styles.avatarRing, { borderColor: person.color }]}>
          {person.avatar ? (
            <Image source={{ uri: person.avatar }} style={styles.avatar} contentFit="cover" targetWidth={96} />
          ) : (
            <View style={[styles.avatar, { backgroundColor: person.color, alignItems: 'center', justifyContent: 'center' }]}>
              <RNText style={styles.avatarInitial}>{person.name.slice(0, 1)}</RNText>
            </View>
          )}
        </View>
        <RNText style={styles.name} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
          {person.name}
        </RNText>
        <RNText style={styles.meta}>
          {[person.category, person.location].filter(Boolean).join(' · ')}
        </RNText>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Stat label="POSTS" value={String(person.posts.length)} />
        <View style={styles.statDivider} />
        <Stat label="LIKES" value={compact(totalLikes)} />
        <View style={styles.statDivider} />
        <Stat label="REPUTATION" value={person.rep != null ? String(person.rep) : '—'} accent />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Tap
          onPress={() => toggleFollow(person.handle)}
          variant="heavy"
          burstColor={person.color}
          style={[
            styles.followBtn,
            following
              ? { backgroundColor: palette.paper, borderColor: palette.ink, borderWidth: 1.5 }
              : { backgroundColor: palette.ink },
          ]}
        >
          <Ionicons
            name={following ? 'checkmark' : 'add'}
            size={16}
            color={following ? palette.ink : palette.bone}
          />
          <RNText style={[styles.followLabel, { color: following ? palette.ink : palette.bone }]}>
            {following ? 'FOLLOWING' : 'FOLLOW'}
          </RNText>
        </Tap>
        <Tap
          onPress={() => toast('Message thread opening…', 'default')}
          burstColor={person.color}
          style={[styles.msgBtn, { borderColor: palette.ink }]}
        >
          <Ionicons name="chatbubble-outline" size={16} color={palette.ink} />
          <RNText style={styles.msgLabel}>MESSAGE</RNText>
        </Tap>
      </View>

      {/* Posts grid */}
      <View style={styles.gridHead}>
        <Ionicons name="grid-outline" size={14} color={palette.ink} />
        <RNText style={styles.gridHeadText}>POSTS</RNText>
      </View>
      <View style={styles.grid}>
        {person.posts.map((p) => (
          <Tap
            key={p.id}
            onPress={() => router.push(`/(modules)/profile/post/${p.id}` as any)}
            burstColor={p.color}
            style={[styles.tile, { backgroundColor: palette.boneSoft }]}
          >
            {p.image ? (
              <Image source={{ uri: p.image }} style={StyleSheet.absoluteFill as any} contentFit="cover" targetWidth={TILE} />
            ) : null}
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.stat}>
      <RNText style={[styles.statValue, accent && { color: palette.mute }]}>{value}</RNText>
      <RNText style={styles.statLabel}>{label}</RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    empty: { alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 80 },
    emptyText: { ...T.body, color: palette.mute },

    identity: { alignItems: 'center', gap: 8, marginTop: 8 },
    avatarRing: {
      width: 96,
      height: 96,
      borderRadius: 48,
      borderWidth: 2,
      padding: 3,
      overflow: 'hidden',
      backgroundColor: palette.boneSoft,
    },
    avatar: { flex: 1, borderRadius: 44, overflow: 'hidden' },
    avatarInitial: { fontFamily: fonts.displayBold, fontSize: 32, color: palette.bone },
    name: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      letterSpacing: -1,
      color: palette.ink,
      marginTop: 4,
      textAlign: 'center',
    },
    meta: { ...T.small, color: palette.mute, textAlign: 'center' },

    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: 22,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: palette.line,
    },
    stat: { flex: 1, alignItems: 'center', gap: 4 },
    statValue: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.5, color: palette.ink },
    statLabel: { ...T.micro, color: palette.mute },
    statDivider: { width: 1, height: 32, backgroundColor: palette.line },

    actions: { flexDirection: 'row', gap: 10, marginTop: 18 },
    followBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 48,
      borderRadius: 24,
    },
    followLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2 },
    msgBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 48,
      paddingHorizontal: 20,
      borderRadius: 24,
      borderWidth: 1.5,
    },
    msgLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },

    gridHead: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 26, marginBottom: 12 },
    gridHeadText: { ...T.label, color: palette.ink },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP },
    tile: { width: TILE, height: TILE, overflow: 'hidden' },
  });
