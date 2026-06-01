import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, TextInput } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { risingList } from '@/data/mock';
import { useStore } from '@/store';

// Niche filters — match the `type` field on risingList rows.
const NICHES = ['VISUAL ARTIST', 'MUSICIAN', 'FILMMAKER', 'DANCER', 'DESIGNER', 'POET'];

// Rotating accents so avatars read as a varied roster, not a grey list.
const ACCENTS = [staticPalette.electric, staticPalette.blush, staticPalette.acid, staticPalette.ember];

export default function CommunityDirectory() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const following = useStore((s) => s.following);
  const toggleFollow = useStore((s) => s.toggleFollow);

  const [query, setQuery] = useState('');
  const [niche, setNiche] = useState<string | 'ALL'>('ALL');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return risingList.filter((c) => {
      if (niche !== 'ALL' && c.type !== niche) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
      );
    });
  }, [query, niche]);

  const followingCount = useMemo(
    () => risingList.filter((c) => following[c.handle]).length,
    [following],
  );

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="DIRECTORY" title="COMMUNITY" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        the network.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Every creator climbing alongside you. Search, filter by craft, follow the ones worth watching.
      </RNText>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={palette.inkMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search name, handle, or craft"
          placeholderTextColor={palette.inkMuted}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close" size={16} color={palette.inkMuted} />
          </Pressable>
        )}
      </View>

      {/* Niche filter chips */}
      <View style={styles.filterRow}>
        <Tap
          style={[
            styles.filterChip,
            niche === 'ALL' && { backgroundColor: palette.ink, borderColor: palette.ink },
          ]}
          burstColor={palette.acid}
          onPress={() => setNiche('ALL')}
        >
          <RNText
            style={[styles.filterLabel, { color: niche === 'ALL' ? palette.bone : palette.ink }]}
            maxFontSizeMultiplier={1.1}
          >
            ALL
          </RNText>
        </Tap>
        {NICHES.map((n) => (
          <Tap
            key={n}
            style={[
              styles.filterChip,
              niche === n && { backgroundColor: palette.ink, borderColor: palette.ink },
            ]}
            burstColor={palette.acid}
            onPress={() => setNiche((cur) => (cur === n ? 'ALL' : n))}
          >
            <RNText
              style={[styles.filterLabel, { color: niche === n ? palette.bone : palette.ink }]}
              maxFontSizeMultiplier={1.1}
            >
              {n}
            </RNText>
          </Tap>
        ))}
      </View>

      {/* Roster */}
      <Section eyebrow={`${followingCount} FOLLOWING`} title="creators in your orbit.">
        <RNText style={styles.count} maxFontSizeMultiplier={1.1}>
          {filtered.length} {filtered.length === 1 ? 'CREATOR' : 'CREATORS'}
        </RNText>

        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={22} color={palette.inkMuted} />
            <RNText style={styles.emptyText} maxFontSizeMultiplier={1.2}>
              No creators match that.
            </RNText>
            <Pressable
              onPress={() => {
                setQuery('');
                setNiche('ALL');
              }}
              style={styles.emptyBtn}
            >
              <RNText style={styles.emptyBtnText}>CLEAR FILTERS</RNText>
            </Pressable>
          </View>
        )}

        {filtered.map((c, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const isFollowing = !!following[c.handle];
          return (
            <View key={c.handle} style={styles.creatorRow}>
              <Tap
                style={styles.creatorMain}
                burstColor={accent}
                onPress={() => router.push('/(tabs)/profile')}
              >
                <View style={[styles.avatar, { backgroundColor: accent }]}>
                  <RNText style={styles.avatarInitial} maxFontSizeMultiplier={1.1}>
                    {c.name.charAt(0)}
                  </RNText>
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.name} numberOfLines={1} maxFontSizeMultiplier={1.15}>
                    {c.name}
                  </RNText>
                  <RNText style={styles.handle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                    {c.handle}
                  </RNText>
                  <RNText style={styles.cityType} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                    {c.city} · {c.type}
                  </RNText>
                </View>
                <View style={styles.repPill}>
                  <Ionicons name="ribbon-outline" size={11} color={staticPalette.ink} />
                  <RNText style={styles.repText} maxFontSizeMultiplier={1.1}>
                    {c.rep}
                  </RNText>
                </View>
              </Tap>

              <View style={styles.actions}>
                <Tap
                  style={[
                    styles.followBtn,
                    isFollowing
                      ? { backgroundColor: palette.boneSoft, borderColor: palette.line }
                      : { backgroundColor: palette.ink, borderColor: palette.ink },
                  ]}
                  burstColor={palette.acid}
                  onPress={() => {
                    toggleFollow(c.handle);
                    toast(
                      isFollowing ? `Unfollowed ${c.handle}` : `Following ${c.handle}`,
                      'success',
                    );
                  }}
                >
                  <RNText
                    style={[
                      styles.followLabel,
                      { color: isFollowing ? palette.ink : palette.bone },
                    ]}
                    maxFontSizeMultiplier={1.1}
                  >
                    {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                  </RNText>
                </Tap>
                <Tap
                  style={styles.msgBtn}
                  burstColor={palette.electric}
                  onPress={() => router.push('/(tabs)/inbox')}
                >
                  <Ionicons name="chatbubbles-outline" size={16} color={palette.ink} />
                </Tap>
              </View>
            </View>
          );
        })}
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
    },
    body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 12, maxWidth: 340 },

    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      height: 50,
      paddingHorizontal: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      marginTop: 18,
    },
    searchInput: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      padding: 0,
    },

    filterRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 12,
    },
    filterChip: {
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    filterLabel: { ...T.label, letterSpacing: 1.2, fontSize: 10 },

    count: { ...T.micro, color: palette.inkMuted, letterSpacing: 1.4, marginBottom: 10 },

    creatorRow: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 14,
      marginBottom: 8,
      gap: 12,
    },
    creatorMain: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarInitial: { fontFamily: fonts.displayBold, fontSize: 20, color: staticPalette.ink },
    name: { fontFamily: fonts.displayHeavy, fontSize: 16, letterSpacing: -0.3, color: palette.ink },
    handle: { ...T.small, color: palette.electric, marginTop: 1 },
    cityType: { ...T.micro, color: palette.inkMuted, letterSpacing: 0.6, marginTop: 3 },
    repPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      height: 28,
      borderRadius: 14,
      backgroundColor: palette.acid,
    },
    repText: { fontFamily: fonts.displayBold, fontSize: 13, color: staticPalette.ink },

    actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    followBtn: {
      flex: 1,
      height: 42,
      borderRadius: 13,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    followLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.8 },
    msgBtn: {
      width: 42,
      height: 42,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },

    empty: {
      alignItems: 'center',
      gap: 10,
      paddingVertical: 30,
    },
    emptyText: { ...T.body, color: palette.inkMuted },
    emptyBtn: {
      paddingVertical: 9,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    emptyBtnText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },
  });
