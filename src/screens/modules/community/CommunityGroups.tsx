import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, TextInput } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { communityGroupsSeed } from '@/data/mock';
import { useStore } from '@/store';

const CATS = ['ALL', 'NICHE', 'LOCATION', 'INTEREST', 'PRIVATE'] as const;
type Cat = (typeof CATS)[number];

export default function CommunityGroups() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [cat, setCat] = useState<Cat>('ALL');
  const [query, setQuery] = useState('');
  const [joined, setJoined] = useState<Set<string>>(new Set());

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return communityGroupsSeed.filter((g) => {
      if (cat !== 'ALL' && g.kind !== cat) return false;
      if (!q) return true;
      return g.name.toLowerCase().includes(q) || g.blurb.toLowerCase().includes(q);
    });
  }, [cat, query]);

  const joinedCount = joined.size;

  const toggle = (id: string, name: string) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast(`Left ${name}.`, 'default');
      } else {
        next.add(id);
        toast(`Joined ${name}.`, 'success');
      }
      return next;
    });
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMMUNITY" title="GROUPS" showBack />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        find your{'\n'}people.
      </RNText>

      <View style={styles.heroRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="GROUPS JOINED" value={joinedCount} size="md" accent={palette.acid} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="IN YOUR FEED" value={communityGroupsSeed.length} size="md" />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="people-outline" size={16} color={palette.inkMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="search groups"
          placeholderTextColor={palette.inkMuted}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close" size={16} color={palette.inkMuted} />
          </Pressable>
        )}
      </View>

      {/* Category filter */}
      <View style={styles.chipRow}>
        {CATS.map((c) => (
          <Chip key={c} label={c} active={cat === c} onPress={() => setCat(c)} size="sm" />
        ))}
      </View>

      {/* Results */}
      <View style={{ gap: 12, marginTop: 16 }}>
        {results.map((g) => {
          const isJoined = joined.has(g.id);
          return (
            <View key={g.id} style={[styles.card, { borderColor: palette.line }]}>
              <Pressable
                style={styles.cardBody}
                onPress={() => router.push(`/(modules)/community/group?id=${g.id}`)}
              >
                <View style={[styles.dot, { backgroundColor: g.accent }]} />
                <View style={{ flex: 1 }}>
                  <View style={styles.cardHead}>
                    <RNText
                      style={styles.name}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                    >
                      {g.name}
                    </RNText>
                    <View style={[styles.kindPill, { borderColor: g.accent }]}>
                      <RNText style={[styles.kindPillText, { color: palette.ink }]}>{g.kind}</RNText>
                    </View>
                  </View>
                  <RNText style={styles.meta} numberOfLines={1}>
                    {g.members.toLocaleString()} members
                  </RNText>
                  <RNText style={styles.blurb} numberOfLines={2}>
                    {g.blurb}
                  </RNText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={palette.inkMuted} />
              </Pressable>

              <Tap
                onPress={() => toggle(g.id, g.name)}
                burstColor={g.accent}
                style={[styles.joinBtn, isJoined ? styles.joinBtnOn : styles.joinBtnOff]}
              >
                <Ionicons
                  name={isJoined ? 'checkmark-circle' : 'add'}
                  size={15}
                  color={isJoined ? palette.bone : palette.ink}
                />
                <RNText style={[styles.joinText, { color: isJoined ? palette.bone : palette.ink }]}>
                  {isJoined ? 'JOINED' : 'JOIN'}
                </RNText>
              </Tap>
            </View>
          );
        })}

        {results.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={22} color={palette.inkMuted} />
            <RNText style={styles.emptyText}>No groups match that.</RNText>
            <Pressable
              onPress={() => {
                setQuery('');
                setCat('ALL');
              }}
              style={styles.emptyBtn}
            >
              <RNText style={styles.emptyBtnText}>CLEAR FILTERS</RNText>
            </Pressable>
          </View>
        )}
      </View>
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
      marginBottom: 18,
    },
    heroRow: { flexDirection: 'row', gap: 10 },

    searchBox: {
      marginTop: 14,
      height: 50,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 14,
    },
    searchInput: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      padding: 0,
    },

    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },

    card: {
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 14,
    },
    cardBody: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    dot: { width: 10, height: 10, borderRadius: 5, marginTop: 6 },
    cardHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    name: {
      fontFamily: fonts.displayBold,
      fontSize: 20,
      letterSpacing: -0.6,
      color: palette.ink,
      flexShrink: 1,
    },
    kindPill: {
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    kindPillText: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1 },
    meta: { ...T.small, color: palette.inkMuted, marginTop: 4 },
    blurb: { ...T.small, color: palette.ink, opacity: 0.7, marginTop: 4, lineHeight: 18 },

    joinBtn: {
      height: 42,
      borderRadius: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    joinBtnOff: { backgroundColor: palette.boneSoft, borderWidth: 1, borderColor: palette.line },
    joinBtnOn: { backgroundColor: palette.ink },
    joinText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2 },

    empty: {
      alignItems: 'center',
      gap: 10,
      paddingVertical: 36,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    emptyText: { ...T.body, color: palette.inkMuted },
    emptyBtn: {
      marginTop: 4,
      height: 40,
      paddingHorizontal: 18,
      borderRadius: 14,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyBtnText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2, color: palette.bone },
  });
