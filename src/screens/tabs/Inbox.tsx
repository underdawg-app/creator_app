import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text as RNText,
  Platform,
  TextInput,
  StatusBar,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { palette as staticPalette, type Palette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { withOpacity } from '@/theme/colorUtils';
import { useStore } from '@/store';
import type { Thread } from '@/data/mock';
import { Tap } from '@/components/ui/Tap';

type Filter = 'ALL' | 'PRIMARY' | 'DEAL' | 'COLLAB' | 'REQUEST';
const FILTERS: Filter[] = ['ALL', 'PRIMARY', 'DEAL', 'COLLAB', 'REQUEST'];

function readableOn(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma < 145 ? staticPalette.bone : staticPalette.ink;
}

function formatTime(ago: string): string {
  // Light formatter — accepts strings like "12m", "3d", "now", or HH:MM-ish.
  // The mock data uses short relative strings; we just pass them through.
  return ago;
}

export default function Inbox() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const threads = useStore((s) => s.threads);
  const archive = useStore((s) => s.archiveThread);
  const remove = useStore((s) => s.deleteThread);
  const [filter, setFilter] = useState<Filter>('ALL');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const visibleThreads = useMemo(
    () => threads.filter((t) => !t.archived),
    [threads],
  );

  const filtered = useMemo(() => {
    let out = visibleThreads;
    if (filter !== 'ALL') out = out.filter((t) => t.kind === filter);
    const q = query.trim().toLowerCase();
    if (q) {
      out = out.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.handle.toLowerCase().includes(q) ||
          t.preview.toLowerCase().includes(q),
      );
    }
    return out;
  }, [visibleThreads, filter, query]);

  const totalUnread = visibleThreads.reduce((a, t) => a + t.unread, 0);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Tap
            onPress={() => {}}
            style={styles.topIcon}
            burstColor={palette.ink}
          >
            <Ionicons name="menu" size={22} color={palette.ink} />
          </Tap>
          <Tap
            onPress={() => {
              setSearchOpen((v) => !v);
              if (searchOpen) setQuery('');
            }}
            style={styles.topIcon}
            burstColor={palette.ink}
          >
            <Ionicons
              name={searchOpen ? 'close' : 'search'}
              size={20}
              color={palette.ink}
            />
          </Tap>
        </View>

        {searchOpen ? (
          <Animated.View
            entering={FadeInDown.duration(220)}
            exiting={FadeOutUp.duration(180)}
            style={styles.searchBar}
          >
            <Ionicons name="search" size={16} color={palette.mute} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="search messages"
              placeholderTextColor={palette.mute}
              style={styles.searchInput}
              autoFocus
              returnKeyType="search"
              selectionColor={palette.acid}
            />
            {query ? (
              <Tap onPress={() => setQuery('')} burstColor={palette.ink}>
                <Ionicons name="close-circle" size={16} color={palette.mute} />
              </Tap>
            ) : null}
          </Animated.View>
        ) : null}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.storiesRow}
        >
          <Tap
            onPress={() => router.push('/(modules)/studio')}
            style={styles.storyCol}
            burstColor={palette.acid}
          >
            <View style={styles.storyAddCircle}>
              <Ionicons name="add" size={26} color={palette.acid} />
            </View>
            <RNText
              style={styles.storyLabel}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}
            >
              new
            </RNText>
          </Tap>

          {threads.slice(0, 8).map((t) => (
            <Tap
              key={`story-${t.id}`}
              onPress={() => router.push(`/(modules)/inbox/${t.id}` as any)}
              style={styles.storyCol}
              burstColor={t.accent}
            >
              <View style={styles.storyAvatarWrap}>
                <View
                  style={[styles.storyAvatar, { backgroundColor: t.accent }]}
                >
                  <RNText
                    style={[
                      styles.storyAvatarText,
                      { color: readableOn(t.accent) },
                    ]}
                  >
                    {t.name.trim().charAt(0).toUpperCase() || '?'}
                  </RNText>
                </View>
                {t.unread > 0 ? (
                  <View style={styles.storyDot} />
                ) : null}
              </View>
              <RNText
                style={styles.storyLabel}
                numberOfLines={1}
                maxFontSizeMultiplier={1.1}
              >
                {t.name.split(/\s+/)[0]}
              </RNText>
            </Tap>
          ))}
        </ScrollView>

        <View style={styles.titleRow}>
          <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
            Messages
          </RNText>
          {totalUnread > 0 ? (
            <View style={styles.unreadCount}>
              <RNText style={styles.unreadCountText}>{totalUnread}</RNText>
            </View>
          ) : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <Tap
                key={f}
                onPress={() => setFilter(f)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: active ? palette.ink : 'transparent',
                    borderColor: active ? palette.ink : withOpacity(palette.bone, 0.22),
                  },
                ]}
                burstColor={palette.acid}
              >
                <RNText
                  style={[
                    styles.filterText,
                    { color: active ? palette.bone : palette.ink, opacity: active ? 1 : 0.85 },
                  ]}
                >
                  {f}
                </RNText>
              </Tap>
            );
          })}
        </ScrollView>

        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={IS_ANDROID}
          overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        >
          {filtered.length === 0 ? (
            <Animated.View entering={FadeIn.duration(320)} style={styles.empty}>
              <RNText style={styles.emptyTitle}>No messages</RNText>
              <RNText style={styles.emptyText} maxFontSizeMultiplier={1.2}>
                {query
                  ? 'Try a different search.'
                  : 'Switch filter or wait for the world to write you.'}
              </RNText>
            </Animated.View>
          ) : (
            filtered.map((t) => (
              <ThreadRow
                key={t.id}
                thread={t}
                onArchive={() => archive(t.id)}
                onDelete={() => remove(t.id)}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ThreadRow({
  thread,
  onArchive,
  onDelete,
}: {
  thread: Thread;
  onArchive: () => void;
  onDelete: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const isUnread = thread.unread > 0;
  const initial = thread.name.trim().charAt(0).toUpperCase() || '?';
  const avatarFg = readableOn(thread.accent);
  const isTyping = thread.typing;
  const swipeRef = React.useRef<any>(null);
  const swipeOpenRef = React.useRef(false);

  const renderLeftActions = () => (
    <Tap
      onPress={() => {
        swipeRef.current?.close();
        onArchive();
      }}
      style={[styles.swipeAction, { backgroundColor: palette.acid }]}
      burstColor={palette.ink}
    >
      <Ionicons name="archive-outline" size={22} color={palette.ink} />
      <RNText style={[styles.swipeActionLabel, { color: palette.ink }]}>ARCHIVE</RNText>
    </Tap>
  );

  const renderRightActions = () => (
    <Tap
      onPress={() => {
        swipeRef.current?.close();
        onDelete();
      }}
      style={[styles.swipeAction, { backgroundColor: palette.ember }]}
      burstColor={palette.ink}
    >
      <Ionicons name="trash-outline" size={22} color={palette.ink} />
      <RNText style={[styles.swipeActionLabel, { color: palette.ink }]}>DELETE</RNText>
    </Tap>
  );

  return (
    <Swipeable
      ref={swipeRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      friction={2}
      leftThreshold={60}
      rightThreshold={60}
      overshootLeft={false}
      overshootRight={false}
      onSwipeableWillOpen={() => {
        swipeOpenRef.current = true;
      }}
      onSwipeableWillClose={() => {
        setTimeout(() => {
          swipeOpenRef.current = false;
        }, 60);
      }}
      containerStyle={styles.swipeContainer}
      childrenContainerStyle={styles.swipeChild}
    >
      <Tap
        onPress={() => {
          if (swipeOpenRef.current) {
            swipeRef.current?.close();
            return;
          }
          router.push(`/(modules)/inbox/${thread.id}` as any);
        }}
        burstColor={palette.acid}
        style={styles.row}
      >
        <View style={[styles.avatar, { backgroundColor: thread.accent }]}>
          <RNText style={[styles.avatarText, { color: avatarFg }]}>
            {initial}
          </RNText>
          {thread.verified ? (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={9} color={palette.bone} />
            </View>
          ) : null}
        </View>

        <View style={styles.rowContent}>
          <View style={styles.rowTop}>
            <RNText
              style={[styles.name, isUnread && styles.nameUnread]}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}
            >
              {thread.name}
            </RNText>
            <RNText style={styles.time} maxFontSizeMultiplier={1.1}>
              {formatTime(thread.updatedAgo)}
            </RNText>
          </View>

          <RNText
            style={[
              styles.preview,
              isUnread && styles.previewUnread,
              isTyping && { color: palette.acid, fontStyle: 'italic' as const },
            ]}
            numberOfLines={2}
            maxFontSizeMultiplier={1.2}
          >
            {isTyping ? 'typing…' : thread.preview}
          </RNText>
        </View>

      {isUnread ? (
        <View style={styles.unreadDotWrap}>
          <View style={styles.unreadDot} />
          {thread.unread > 1 ? (
            <RNText style={styles.unreadDotCount}>{thread.unread}</RNText>
          ) : null}
        </View>
      ) : null}
      </Tap>
    </Swipeable>
  );
}

const makeStyles = (palette: Palette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  topRow: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: palette.boneSoft,
  },
  searchInput: {
    flex: 1,
    ...T.lead,
    color: palette.ink,
    paddingVertical: 0,
  },

  horizontalScroll: { flexGrow: 0, flexShrink: 0 },
  listScroll: { flex: 1 },
  storiesRow: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 6,
  },
  storyCol: {
    width: 72,
    alignItems: 'center',
    paddingVertical: 6,
    gap: 6,
  },
  storyAvatarWrap: { position: 'relative' },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyAvatarText: {
    ...T.title2,
  },
  storyAddCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: palette.acid,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyDot: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: palette.acid,
    borderWidth: 2.5,
    borderColor: palette.bone,
  },
  storyLabel: {
    ...T.label,
    color: palette.ink,
    maxWidth: 64,
  },

  titleRow: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    ...T.title1,
    color: palette.ink,
  },
  unreadCount: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: palette.acid,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCountText: {
    ...T.labelLarge,
    color: palette.bone,
  },

  filterRow: {
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    alignItems: 'center',
  },
  filterChip: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    ...T.label,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  listContent: { paddingBottom: 140, paddingTop: 6 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: palette.bone,
  },
  swipeContainer: {
    backgroundColor: palette.bone,
    overflow: 'hidden',
  },
  swipeChild: {
    backgroundColor: palette.bone,
  },
  swipeAction: {
    width: 96,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  swipeActionLabel: {
    ...T.label,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...T.title2,
  },
  verifiedBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.ink,
    borderWidth: 2,
    borderColor: palette.bone,
  },
  rowContent: { flex: 1, gap: 3 },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 10,
  },
  name: {
    ...T.lead,
    color: palette.ink,
    flex: 1,
  },
  nameUnread: { fontFamily: fonts.displayBold },
  time: {
    ...T.labelLarge,
    color: palette.mute,
  },
  preview: {
    ...T.body,
    color: palette.mute,
  },
  previewUnread: {
    color: palette.ink,
    fontFamily: fonts.bodyMedium,
  },
  unreadDotWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 12,
    gap: 3,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.acid,
  },
  unreadDotCount: {
    ...T.micro,
    color: palette.mute,
  },

  empty: {
    paddingHorizontal: 12,
    paddingVertical: 80,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    ...T.title3,
    color: palette.ink,
  },
  emptyText: {
    ...T.body,
    color: palette.mute,
    textAlign: 'center',
    maxWidth: 280,
  },
});
