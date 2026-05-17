import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Image } from '@/components/ui/Image';
import { feedPosts } from '@/data/mock';

type Kind =
  | 'like'
  | 'comment'
  | 'follow'
  | 'mention'
  | 'gig_invite'
  | 'gig_approved'
  | 'payout'
  | 'challenge';

type Notification = {
  id: string;
  kind: Kind;
  actor: string;
  handle?: string;
  avatar?: string;
  message: string;
  time: string;
  thumb?: string;
  action?: 'follow' | 'view';
  unread?: boolean;
};

const sample = (i: number) => feedPosts[i % feedPosts.length];

const TODAY: Notification[] = [
  {
    id: 't1',
    kind: 'gig_approved',
    actor: 'NIKE INDIA',
    message: 'approved your gig application — SALT × CITY campaign.',
    time: '12m',
    action: 'view',
    unread: true,
  },
  {
    id: 't2',
    kind: 'like',
    actor: sample(0).creator,
    handle: sample(0).handle,
    avatar: sample(0).avatar,
    message: 'and 24 others liked your post.',
    time: '38m',
    thumb: sample(0).image,
    unread: true,
  },
  {
    id: 't3',
    kind: 'follow',
    actor: sample(1).creator,
    handle: sample(1).handle,
    avatar: sample(1).avatar,
    message: 'started following you.',
    time: '1h',
    action: 'follow',
    unread: true,
  },
  {
    id: 't4',
    kind: 'comment',
    actor: sample(2).creator,
    handle: sample(2).handle,
    avatar: sample(2).avatar,
    message: 'commented: "this palette is wild — what acrylic brand?"',
    time: '2h',
    thumb: sample(2).image,
  },
];

const WEEK: Notification[] = [
  {
    id: 'w1',
    kind: 'payout',
    actor: 'UNDERDAWG',
    message: '₹4,820 payout cleared to your linked account.',
    time: '2d',
    action: 'view',
  },
  {
    id: 'w2',
    kind: 'mention',
    actor: sample(3).creator,
    handle: sample(3).handle,
    avatar: sample(3).avatar,
    message: 'mentioned you in a comment on "NIGHT BUS EP".',
    time: '3d',
    thumb: sample(3).image,
  },
  {
    id: 'w3',
    kind: 'challenge',
    actor: sample(4).creator,
    handle: sample(4).handle,
    avatar: sample(4).avatar,
    message: 'joined your challenge — 30 DAYS OF SALT.',
    time: '4d',
    action: 'view',
  },
  {
    id: 'w4',
    kind: 'gig_invite',
    actor: 'PUMA SEA',
    message: 'invited you to a paid collab — surf · sept campaign.',
    time: '5d',
    action: 'view',
  },
];

const EARLIER: Notification[] = [
  {
    id: 'e1',
    kind: 'like',
    actor: sample(5).creator,
    handle: sample(5).handle,
    avatar: sample(5).avatar,
    message: 'and 112 others liked your portfolio piece.',
    time: '1w',
    thumb: sample(5).image,
  },
  {
    id: 'e2',
    kind: 'follow',
    actor: sample(6).creator,
    handle: sample(6).handle,
    avatar: sample(6).avatar,
    message: 'started following you.',
    time: '2w',
    action: 'follow',
  },
  {
    id: 'e3',
    kind: 'comment',
    actor: sample(7).creator,
    handle: sample(7).handle,
    avatar: sample(7).avatar,
    message: 'commented on your reel.',
    time: '3w',
    thumb: sample(7).image,
  },
];

const KIND_ICON: Record<Kind, keyof typeof import('@/icons').Ionicons extends never ? string : any> = {
  like: 'heart',
  comment: 'chatbubble-ellipses',
  follow: 'person-add',
  mention: 'at',
  gig_invite: 'briefcase',
  gig_approved: 'checkmark-done',
  payout: 'cash-outline',
  challenge: 'flame',
};

const KIND_TINT: Record<Kind, string> = {
  like: '#F70E0A',
  comment: '#2E5BFF',
  follow: '#9C988A',
  mention: staticPalette.electric,
  gig_invite: '#FF5A1F',
  gig_approved: '#2E5BFF',
  payout: staticPalette.ink,
  challenge: '#FF6BB5',
};

type TabKey = 'foryou' | 'following' | 'rising';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'foryou', label: 'FOR YOU' },
  { key: 'following', label: 'FOLLOWING' },
  { key: 'rising', label: 'RISING' },
];

// Loose mapping: Following = social interactions; Rising = career/growth events.
const SOCIAL_KINDS: Kind[] = ['like', 'comment', 'follow', 'mention'];
const RISING_KINDS: Kind[] = ['gig_invite', 'gig_approved', 'payout', 'challenge'];

export default function NotificationsIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [tab, setTab] = useState<TabKey>('foryou');

  const filter = (items: Notification[]) =>
    items.filter((n) =>
      tab === 'foryou'
        ? true
        : tab === 'following'
        ? SOCIAL_KINDS.includes(n.kind)
        : RISING_KINDS.includes(n.kind),
    );

  const today = useMemo(() => filter(TODAY), [tab]);
  const week = useMemo(() => filter(WEEK), [tab]);
  const earlier = useMemo(() => filter(EARLIER), [tab]);
  const empty = today.length + week.length + earlier.length === 0;

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          eyebrow="ACTIVITY"
          title="NOTIFICATIONS"
        />
      }
    >
      <View style={styles.tabsRow}>
        {TABS.map((t) => {
          const isActive = t.key === tab;
          return (
            <Pressable
              key={t.key}
              onPress={() => setTab(t.key)}
              style={[
                styles.tabPill,
                isActive && {
                  backgroundColor: palette.ink,
                  borderColor: palette.ink,
                },
              ]}
            >
              <RNText
                style={[
                  styles.tabPillText,
                  { color: isActive ? palette.bone : palette.ink },
                ]}
                maxFontSizeMultiplier={1.1}
              >
                {t.label}
              </RNText>
            </Pressable>
          );
        })}
      </View>

      {today.length > 0 ? <Group title="TODAY" items={today} /> : null}
      {week.length > 0 ? <Group title="THIS WEEK" items={week} /> : null}
      {earlier.length > 0 ? <Group title="EARLIER" items={earlier} /> : null}

      {empty ? (
        <View style={styles.empty}>
          <Ionicons name="notifications-outline" size={28} color={palette.mute} />
          <RNText style={styles.emptyTitle}>Nothing here yet.</RNText>
          <RNText style={styles.emptyBody}>
            New activity for this filter will land here.
          </RNText>
        </View>
      ) : null}

      <View style={styles.footer}>
        <Pressable
          onPress={() => router.push('/(modules)/settings/notifications')}
          hitSlop={8}
        >
          <RNText style={styles.footerLink}>NOTIFICATION SETTINGS →</RNText>
        </Pressable>
      </View>
    </ScreenFrame>
  );
}

function Group({ title, items }: { title: string; items: Notification[] }) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.group}>
      <RNText style={styles.groupTitle} maxFontSizeMultiplier={1.15}>
        {title}
      </RNText>
      {items.map((n) => (
        <Row key={n.id} n={n} />
      ))}
    </View>
  );
}

function Row({ n }: { n: Notification }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  return (
    <Pressable style={styles.row} onPress={() => {}}>
      <View style={styles.avatarWrap}>
        {n.avatar ? (
          <Image source={{ uri: n.avatar }} style={styles.avatar} contentFit="cover" />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <RNText style={styles.avatarInitial}>
              {n.actor.slice(0, 1)}
            </RNText>
          </View>
        )}
        <View style={[styles.kindBadge, { backgroundColor: KIND_TINT[n.kind] }]}>
          <Ionicons name={KIND_ICON[n.kind] as any} size={12} color={staticPalette.bone} />
        </View>
      </View>

      <View style={styles.body}>
        <RNText style={styles.text} numberOfLines={2} maxFontSizeMultiplier={1.2}>
          <RNText style={styles.actor}>{n.actor}</RNText>
          {n.handle ? <RNText style={styles.handle}> {n.handle}</RNText> : null}
          <RNText style={styles.message}> {n.message}</RNText>
        </RNText>
        <View style={styles.metaRow}>
          {n.unread ? <View style={styles.unreadDot} /> : null}
          <RNText style={styles.time} maxFontSizeMultiplier={1.1}>
            {n.time}
          </RNText>
        </View>
      </View>

      {n.thumb ? (
        <Image source={{ uri: n.thumb }} style={styles.thumb} contentFit="cover" />
      ) : n.action === 'follow' ? (
        <Pressable style={styles.followBtn} onPress={() => {}}>
          <RNText style={styles.followBtnText}>FOLLOW</RNText>
        </Pressable>
      ) : n.action === 'view' ? (
        <Pressable style={styles.viewBtn} onPress={() => {}}>
          <RNText style={styles.viewBtnText}>VIEW</RNText>
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    tabsRow: {
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 4,
    },
    tabPill: {
      height: 32,
      paddingHorizontal: 16,
      borderRadius: 999,
      borderWidth: 1.5,
      borderColor: palette.ink,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabPillText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
    },
    empty: {
      alignItems: 'center',
      paddingHorizontal: 32,
      paddingTop: 56,
      paddingBottom: 24,
      gap: 8,
    },
    emptyTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: palette.ink,
      marginTop: 4,
    },
    emptyBody: {
      ...T.body,
      color: palette.mute,
      textAlign: 'center',
      maxWidth: 280,
    },
    group: {
      paddingTop: 18,
      paddingBottom: 6,
    },
    groupTitle: {
      ...T.label,
      color: palette.ink,
      opacity: 0.65,
      letterSpacing: 2,
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    avatarWrap: {
      width: 48,
      height: 48,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: palette.boneSoft,
    },
    avatarFallback: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: palette.ink,
      backgroundColor: palette.bone,
    },
    avatarInitial: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: palette.ink,
      letterSpacing: -0.5,
    },
    kindBadge: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: { flex: 1, gap: 4 },
    text: {
      ...T.body,
      color: palette.ink,
      lineHeight: 19,
    },
    actor: {
      fontFamily: fonts.bodyBold,
      color: palette.ink,
    },
    handle: {
      ...T.small,
      color: palette.mute,
    },
    message: {
      color: palette.ink,
      opacity: 0.88,
    },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    unreadDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.acid,
    },
    time: {
      ...T.micro,
      color: palette.mute,
      letterSpacing: 1.2,
    },
    thumb: {
      width: 42,
      height: 42,
      borderRadius: 6,
      backgroundColor: palette.boneSoft,
    },
    followBtn: {
      paddingHorizontal: 14,
      height: 32,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    followBtnText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
      color: palette.bone,
    },
    viewBtn: {
      paddingHorizontal: 14,
      height: 32,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewBtnText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
      color: palette.ink,
    },
    footer: {
      paddingHorizontal: 16,
      paddingTop: 28,
      paddingBottom: 36,
      alignItems: 'center',
    },
    footerLink: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.8,
      textDecorationLine: 'underline',
    },
  });
