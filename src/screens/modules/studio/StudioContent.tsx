import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { EmptyState } from '@/components/ui/EmptyState';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

type Tab = 'PUBLISHED' | 'DRAFTS' | 'SCHEDULED';

type ContentItem = {
  id: string;
  kind: string; // IMAGE / VIDEO / AUDIO / TEXT
  caption: string;
  bg: string;
  fg: string;
  likes: number;
  comments: number;
  reposts: number;
  archived?: boolean;
  meta?: string;
};

const BONE = staticPalette.bone;
const INK = staticPalette.ink;

const SEED: ContentItem[] = [
  { id: 'c1', kind: 'IMAGE', caption: 'first roll, no edits.', bg: '#2E5BFF', fg: BONE, likes: 1280, comments: 64, reposts: 22 },
  { id: 'c2', kind: 'VIDEO', caption: 'studio b-roll, 12s loop.', bg: '#FF5A1F', fg: BONE, likes: 940, comments: 31, reposts: 48 },
  { id: 'c3', kind: 'AUDIO', caption: 'voice memo → track.', bg: '#FF6BB5', fg: INK, likes: 612, comments: 19, reposts: 9 },
  { id: 'c4', kind: 'TEXT', caption: 'the underdawg manifesto.', bg: '#14B8A6', fg: BONE, likes: 2030, comments: 188, reposts: 140 },
  { id: 'c5', kind: 'IMAGE', caption: 'merch flatlay, gold pin.', bg: '#9CA3AF', fg: INK, likes: 1574, comments: 73, reposts: 36 },
];

export default function StudioContent() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const drafts = useStore((s) => s.drafts);
  const scheduled = useStore((s) => s.scheduled);

  const [tab, setTab] = useState<Tab>('PUBLISHED');
  const [pub, setPub] = useState<ContentItem[]>(SEED);
  const [menuId, setMenuId] = useState<string | null>(null);

  const storeDrafts: ContentItem[] = useMemo(
    () =>
      drafts.map((d) => ({
        id: d.id,
        kind: d.kind,
        caption: d.caption || '(no caption)',
        bg: d.color,
        fg: BONE,
        likes: 0,
        comments: 0,
        reposts: 0,
        meta: 'IN PROGRESS',
      })),
    [drafts],
  );

  const storeScheduled: ContentItem[] = useMemo(
    () =>
      scheduled.map((s) => ({
        id: s.id,
        kind: s.kind,
        caption: s.caption || '(no caption)',
        bg: s.color,
        fg: BONE,
        likes: 0,
        comments: 0,
        reposts: 0,
        meta: `GOES LIVE · ${s.scheduledFor ?? 'soon'}`,
      })),
    [scheduled],
  );

  const list = tab === 'PUBLISHED' ? pub : tab === 'DRAFTS' ? storeDrafts : storeScheduled;
  const menuItem = pub.find((p) => p.id === menuId) ?? null;

  const totalLikes = pub.reduce((n, p) => n + p.likes, 0);

  const closeMenu = () => setMenuId(null);

  const onDelete = () => {
    if (!menuItem) return;
    setPub((prev) => prev.filter((p) => p.id !== menuItem.id));
    closeMenu();
    toast('Deleted.', 'success');
  };

  const onArchive = () => {
    if (!menuItem) return;
    const next = !menuItem.archived;
    setPub((prev) => prev.map((p) => (p.id === menuItem.id ? { ...p, archived: next } : p)));
    closeMenu();
    toast(next ? 'Archived.' : 'Unarchived.', 'success');
  };

  const onPin = () => {
    if (!menuItem) return;
    setPub((prev) => [menuItem, ...prev.filter((p) => p.id !== menuItem.id)]);
    closeMenu();
    toast('Pinned to top.', 'success');
  };

  const onEdit = () => {
    closeMenu();
    toast('Opening editor.');
  };

  const onFeature = () => {
    closeMenu();
    toast('Added to portfolio.', 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="STUDIO" title="MY CONTENT" />}>
      <RNText style={styles.bigTitle} maxFontSizeMultiplier={1.1}>
        everything you{'’'}ve made.
      </RNText>

      <View style={styles.metrics}>
        <View style={{ flex: 1 }}>
          <MetricCard label="PUBLISHED" value={pub.length} accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="TOTAL LIKES" value={totalLikes} accent={palette.blush} />
        </View>
      </View>

      <View style={styles.tabs}>
        {(['PUBLISHED', 'DRAFTS', 'SCHEDULED'] as Tab[]).map((t) => (
          <Chip
            key={t}
            label={t === 'PUBLISHED' ? `${t} ${pub.length}` : t === 'DRAFTS' ? `${t} ${storeDrafts.length}` : `${t} ${storeScheduled.length}`}
            active={tab === t}
            accent={t === 'PUBLISHED' ? palette.electric : t === 'DRAFTS' ? palette.ember : palette.blush}
            onPress={() => setTab(t)}
            size="sm"
          />
        ))}
      </View>

      {list.length === 0 ? (
        <View style={{ marginTop: 8 }}>
          <EmptyState
            eyebrow={`NO ${tab}`}
            title={tab === 'DRAFTS' ? 'nothing in progress.' : 'nothing queued.'}
            body="make something in the studio. it shows up here."
            action={{ label: 'COMPOSE', onPress: () => router.push('/(modules)/studio') }}
          />
        </View>
      ) : (
        <View style={styles.feed}>
          {list.map((item) => (
            <View key={item.id} style={styles.row}>
              <Tap
                onPress={() => toast(`Opening ${item.kind.toLowerCase()}.`)}
                burstColor={item.bg}
                style={styles.rowMain}
              >
                <View style={[styles.thumb, { backgroundColor: item.bg }]}>
                  <RNText style={[styles.thumbTag, { color: item.fg }]} allowFontScaling={false}>
                    {item.kind}
                  </RNText>
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.caption} numberOfLines={1} maxFontSizeMultiplier={1.15}>
                    {item.caption}
                  </RNText>
                  {tab === 'PUBLISHED' ? (
                    <RNText style={styles.stats} maxFontSizeMultiplier={1.15}>
                      {`♥ ${fmt(item.likes)}  ·  💬 ${item.comments}  ·  ↻ ${item.reposts}`}
                      {item.archived ? '  ·  ARCHIVED' : ''}
                    </RNText>
                  ) : (
                    <RNText style={styles.metaLine} maxFontSizeMultiplier={1.15}>
                      {item.meta}
                    </RNText>
                  )}
                </View>
              </Tap>
              {tab === 'PUBLISHED' ? (
                <Tap onPress={() => setMenuId(item.id)} burstColor={palette.ink} style={styles.menuBtn}>
                  <Ionicons name="ellipsis-horizontal" size={18} color={palette.ink} />
                </Tap>
              ) : (
                <View style={styles.menuBtn} />
              )}
            </View>
          ))}
        </View>
      )}

      <Sheet
        visible={menuItem !== null}
        onClose={closeMenu}
        eyebrow={menuItem?.kind ?? ''}
        title={menuItem ? menuItem.caption.slice(0, 24) : ''}
      >
        <MenuAction icon="pencil" label="Edit" onPress={onEdit} />
        <MenuAction icon="bookmark-outline" label={menuItem?.archived ? 'Unarchive' : 'Archive'} onPress={onArchive} />
        <MenuAction icon="arrow-up" label="Pin to top" onPress={onPin} />
        <MenuAction icon="star-outline" label="Feature in portfolio" onPress={onFeature} accent={palette.acid} />
        <MenuAction icon="trash-outline" label="Delete" onPress={onDelete} accent={palette.ember} danger />
      </Sheet>
    </ScreenFrame>
  );
}

function MenuAction({
  icon,
  label,
  onPress,
  accent,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  accent?: string;
  danger?: boolean;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const tint = accent ?? palette.ink;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.action, pressed && { opacity: 0.6 }]}>
      <View style={[styles.actionIcon, { backgroundColor: tint }]}>
        <Ionicons name={icon} size={15} color={staticPalette.bone} />
      </View>
      <RNText style={[styles.actionLabel, danger && { color: palette.ember }]} maxFontSizeMultiplier={1.15}>
        {label}
      </RNText>
    </Pressable>
  );
}

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    bigTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
    },
    metrics: { flexDirection: 'row', gap: 10, marginTop: 18 },
    tabs: { flexDirection: 'row', gap: 8, marginTop: 22 },
    feed: { marginTop: 16, gap: 4 },
    row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    rowMain: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 12,
    },
    thumb: {
      width: 56,
      height: 56,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    thumbTag: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.2,
    },
    caption: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: palette.ink,
      letterSpacing: -0.4,
    },
    stats: { ...T.small, color: palette.ink, opacity: 0.6, marginTop: 5 },
    metaLine: { ...T.label, color: palette.ink, opacity: 0.5, marginTop: 6 },
    menuBtn: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    action: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 14,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    actionIcon: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionLabel: {
      fontFamily: fonts.bodyMedium,
      fontSize: 16,
      color: palette.ink,
    },
  });
