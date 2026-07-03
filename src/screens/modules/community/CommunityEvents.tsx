import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
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
import { communityEventsSeed } from '@/data/mock';
import { useStore } from '@/store';

const KINDS = ['ALL', 'MEETUP', 'WEBINAR', 'AMA', 'WORKSHOP'] as const;
type Kind = (typeof KINDS)[number];

export default function CommunityEvents() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [kind, setKind] = useState<Kind>('ALL');
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () => (kind === 'ALL' ? communityEventsSeed : communityEventsSeed.filter((e) => e.kind === kind)),
    [kind],
  );

  const rsvp = (id: string, title: string) => {
    if (rsvped.has(id)) {
      toast('Already on the list.', 'default');
      return;
    }
    setRsvped((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    toast(`You're in — ${title.toLowerCase()}.`, 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMMUNITY" title="EVENTS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        show up.
      </RNText>

      {/* Header metrics */}
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="UPCOMING" value={communityEventsSeed.length} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="YOUR RSVPS" value={rsvped.size} size="md" accent={palette.acid} />
        </View>
      </View>

      {/* Kind filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipRow}
      >
        {KINDS.map((k) => (
          <Chip key={k} label={k} active={kind === k} onPress={() => setKind(k)} />
        ))}
      </ScrollView>

      {/* Event cards */}
      <View style={{ gap: 12, marginTop: 4 }}>
        {filtered.map((e) => {
          const going = rsvped.has(e.id);
          return (
            <Pressable
              key={e.id}
              onPress={() => router.push(`/(modules)/community/event?id=${e.id}`)}
              style={styles.card}
            >
              <View style={styles.cardHead}>
                <View style={[styles.kindPill, { backgroundColor: e.accent }]}>
                  <RNText style={styles.kindPillText}>{e.kind}</RNText>
                </View>
                <View style={styles.rsvpCount}>
                  <Ionicons name="people-outline" size={13} color={palette.inkMuted} />
                  <RNText style={styles.rsvpCountText}>{e.rsvps + (going ? 1 : 0)}</RNText>
                </View>
              </View>

              <RNText style={styles.cardTitle} numberOfLines={2}>
                {e.title}
              </RNText>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="people-outline" size={13} color={palette.inkMuted} />
                  <RNText style={styles.metaText} numberOfLines={1}>
                    {e.host}
                  </RNText>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={13} color={palette.inkMuted} />
                  <RNText style={styles.metaText} numberOfLines={1}>
                    {e.when}
                  </RNText>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={13} color={palette.inkMuted} />
                  <RNText style={styles.metaText} numberOfLines={1}>
                    {e.location}
                  </RNText>
                </View>
              </View>

              <Tap
                onPress={() => rsvp(e.id, e.title)}
                burstColor={going ? palette.acid : palette.bone}
                style={[styles.rsvpBtn, going && styles.rsvpBtnGoing]}
              >
                {going ? (
                  <>
                    <Ionicons name="checkmark-circle" size={16} color={palette.ink} />
                    <RNText style={styles.rsvpBtnTextGoing}>GOING</RNText>
                  </>
                ) : (
                  <>
                    <RNText style={styles.rsvpBtnText}>RSVP</RNText>
                    <View style={styles.rsvpArrow}>
                      <Ionicons name="arrow-forward" size={14} color={palette.ink} />
                    </View>
                  </>
                )}
              </Tap>
            </Pressable>
          );
        })}

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={20} color={palette.inkMuted} />
            <RNText style={styles.emptyText}>No {kind.toLowerCase()} events yet.</RNText>
          </View>
        ) : null}
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

    metricGrid: { flexDirection: 'row', gap: 10 },

    chipScroll: { marginTop: 18, marginBottom: 14, marginHorizontal: -2 },
    chipRow: { gap: 8, paddingHorizontal: 2 },

    card: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 12,
    },
    cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    kindPill: { paddingHorizontal: 11, height: 26, borderRadius: 13, justifyContent: 'center' },
    kindPillText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.6, color: palette.ink },
    rsvpCount: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    rsvpCountText: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.inkMuted },

    cardTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 24,
      lineHeight: 26,
      letterSpacing: -0.8,
      color: palette.ink,
    },

    metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    metaText: { ...T.small, color: palette.inkMuted, maxWidth: 150 },

    rsvpBtn: {
      marginTop: 2,
      height: 48,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    rsvpBtnGoing: {
      backgroundColor: palette.boneSoft,
      borderWidth: 1,
      borderColor: palette.line,
    },
    rsvpBtnText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2.4, color: palette.bone },
    rsvpBtnTextGoing: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2.4, color: palette.ink },
    rsvpArrow: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    empty: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingVertical: 28,
      alignItems: 'center',
      gap: 8,
    },
    emptyText: { ...T.small, color: palette.inkMuted },
  });
