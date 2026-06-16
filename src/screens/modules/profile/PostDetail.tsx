// PostDetail — opens a SINGLE post (tapped from Explore/Feed). Shows only the
// one tapped post, with a tappable author → profile, working like/save (shared
// store), and a comments thread. The comment composer is pinned above the
// keyboard (KeyboardAvoidingView + Android adjustResize). Themed.

import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';
import { feedPosts, profileMock } from '@/data/mock';
import { profileHref } from '@/data/people';

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

type Comment = { id: string; name: string; handle: string; avatar?: string; text: string; mine?: boolean };

const CANNED = [
  'this is unreal 🔥',
  'the palette though.',
  'how long did this take??',
  'saving this for inspo.',
  'need a print of this.',
  'criminally underrated.',
];

function seedComments(postId: string): Comment[] {
  const others = feedPosts.filter((p) => p.id !== postId);
  if (others.length === 0) return [];
  const start = (parseInt(postId.replace(/\D/g, ''), 10) || 1) % others.length;
  const count = 3 + (start % 3);
  return Array.from({ length: count }).map((_, i) => {
    const src = others[(start + i) % others.length];
    return {
      id: `c${postId}_${i}`,
      name: src.creator,
      handle: src.handle,
      avatar: src.avatar,
      text: CANNED[(start + i) % CANNED.length],
    };
  });
}

export default function PostDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id?: string }>();

  const post = feedPosts.find((p) => p.id === id);

  const likes = useStore((s) => s.likes);
  const toggleLike = useStore((s) => s.toggleLike);
  const saves = useStore((s) => s.saves);
  const toggleSave = useStore((s) => s.toggleSave);
  const toast = useStore((s) => s.toast);

  const [comments, setComments] = useState<Comment[]>(() => (post ? seedComments(post.id) : []));
  const [draft, setDraft] = useState('');

  const liked = post ? !!likes[post.id] : false;
  const saved = post ? !!saves[post.id] : false;
  const likeCount = useMemo(() => (post ? post.likes + (liked ? 1 : 0) : 0), [post, liked]);

  const Header = (
    <SafeAreaView edges={['top']} style={styles.headerSafe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={10}>
          <Ionicons name="arrow-back" size={18} color={palette.ink} />
        </Pressable>
        <RNText style={styles.headerTitle} numberOfLines={1}>{post ? post.handle : 'POST'}</RNText>
        <View style={styles.iconBtn} />
      </View>
    </SafeAreaView>
  );

  if (!post) {
    return (
      <View style={styles.root}>
        {Header}
        <View style={styles.missing}>
          <Ionicons name="image-outline" size={36} color={palette.mute} />
          <RNText style={styles.missingText}>That post isn’t here.</RNText>
        </View>
      </View>
    );
  }

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setComments((prev) => [
      ...prev,
      { id: `me${prev.length}`, name: profileMock.name, handle: profileMock.handle, avatar: profileMock.avatar, text: t, mine: true },
    ]);
    setDraft('');
  };

  return (
    <View style={styles.root}>
      {Header}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Author → profile */}
          <Pressable style={styles.authorRow} onPress={() => router.push(profileHref(post.handle) as any)}>
            {post.avatar ? (
              <Image source={{ uri: post.avatar }} style={styles.authorAvatar} contentFit="cover" targetWidth={96} />
            ) : (
              <View style={[styles.authorAvatar, styles.authorFallback]}>
                <RNText style={styles.authorInitial}>{post.creator.slice(0, 1)}</RNText>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <RNText style={styles.authorName} numberOfLines={1}>{post.creator}</RNText>
              <RNText style={styles.authorHandle} numberOfLines={1}>{post.handle} · {post.location}</RNText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={palette.mute} />
          </Pressable>

          {/* Media */}
          <View style={[styles.media, { backgroundColor: post.bg }]}>
            <Image source={{ uri: post.image }} style={StyleSheet.absoluteFill as any} contentFit="cover" targetWidth={720} />
          </View>

          {/* Caption */}
          <RNText style={styles.title}>{post.title}</RNText>
          {!!post.note && <RNText style={styles.note}>{post.note}</RNText>}

          {/* Actions — like · comment · save (no reshare) */}
          <View style={styles.actions}>
            <Tap onPress={() => toggleLike(post.id)} burstColor={post.color} variant="heavy" style={styles.actionPill}>
              <Ionicons name={liked ? 'heart' : 'heart-outline'} size={18} color={liked ? palette.ember : palette.ink} />
              <RNText style={styles.actionText}>{compact(likeCount)}</RNText>
            </Tap>
            <View style={styles.actionPill}>
              <Ionicons name="chatbubble-outline" size={16} color={palette.ink} />
              <RNText style={styles.actionText}>{compact(comments.length)}</RNText>
            </View>
            <View style={{ flex: 1 }} />
            <Tap
              onPress={() => { toggleSave(post.id); toast(saved ? 'Removed from saved.' : 'Saved for later.', 'success'); }}
              burstColor={post.color}
              style={styles.actionIcon}
            >
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={palette.ink} />
            </Tap>
          </View>

          {/* Comments */}
          <View style={styles.commentsHead}>
            <View style={styles.dot} />
            <RNText style={styles.commentsLabel}>{comments.length} COMMENTS</RNText>
          </View>
          {comments.map((c) => (
            <View key={c.id} style={styles.comment}>
              <Pressable onPress={() => !c.mine && router.push(profileHref(c.handle) as any)}>
                {c.avatar ? (
                  <Image source={{ uri: c.avatar }} style={styles.commentAvatar} contentFit="cover" targetWidth={72} />
                ) : (
                  <View style={[styles.commentAvatar, styles.authorFallback]}>
                    <RNText style={styles.commentInitial}>{c.name.slice(0, 1)}</RNText>
                  </View>
                )}
              </Pressable>
              <View style={styles.commentBody}>
                <Pressable onPress={() => !c.mine && router.push(profileHref(c.handle) as any)}>
                  <RNText style={styles.commentName} numberOfLines={1}>
                    {c.name} <RNText style={styles.commentHandle}>{c.handle}</RNText>
                  </RNText>
                </Pressable>
                <RNText style={styles.commentText}>{c.text}</RNText>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Composer — pinned above the keyboard */}
        <SafeAreaView edges={['bottom']} style={styles.composerSafe}>
          <View style={styles.composer}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Add a comment…"
              placeholderTextColor={palette.mute}
              style={styles.input}
              returnKeyType="send"
              onSubmitEditing={send}
              blurOnSubmit={false}
            />
            <Pressable style={[styles.sendBtn, !draft.trim() && { opacity: 0.4 }]} onPress={send} disabled={!draft.trim()}>
              <Ionicons name="arrow-up" size={18} color={palette.bone} />
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },
    headerSafe: { backgroundColor: palette.bone, borderBottomWidth: 1, borderBottomColor: palette.line },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 6, paddingBottom: 10, gap: 8 },
    headerTitle: { flex: 1, textAlign: 'center', ...T.label, color: palette.ink, letterSpacing: 1 },
    iconBtn: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: palette.line, alignItems: 'center', justifyContent: 'center' },

    scroll: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },

    authorRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4, marginBottom: 8 },
    authorAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    authorFallback: { alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: palette.ink },
    authorInitial: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink },
    authorName: { fontFamily: fonts.bodyBold, fontSize: 15, color: palette.ink },
    authorHandle: { ...T.small, color: palette.mute, marginTop: 1 },

    media: { width: '100%', height: 380, borderRadius: 18, overflow: 'hidden' },
    title: { fontFamily: fonts.displayBold, fontSize: 22, letterSpacing: -0.6, color: palette.ink, marginTop: 14 },
    note: { ...T.body, color: palette.ink, opacity: 0.8, marginTop: 6, lineHeight: 21 },

    actions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 },
    actionPill: {
      flexDirection: 'row', alignItems: 'center', gap: 6, height: 38, paddingHorizontal: 14,
      borderRadius: 19, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper,
    },
    actionText: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },
    actionIcon: {
      width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: palette.line,
      backgroundColor: palette.paper, alignItems: 'center', justifyContent: 'center',
    },

    commentsHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    commentsLabel: { ...T.label, color: palette.ink, opacity: 0.7, letterSpacing: 1.2 },
    comment: { flexDirection: 'row', gap: 12, paddingVertical: 10 },
    commentAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    commentInitial: { fontFamily: fonts.displayBold, fontSize: 14, color: palette.ink },
    commentBody: { flex: 1, gap: 2 },
    commentName: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },
    commentHandle: { ...T.small, color: palette.mute, fontFamily: fonts.body },
    commentText: { ...T.body, color: palette.ink, opacity: 0.9, lineHeight: 20 },

    composerSafe: { backgroundColor: palette.bone, borderTopWidth: 1, borderTopColor: palette.line },
    composer: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10 },
    input: {
      flex: 1, height: 44, borderRadius: 22, borderWidth: 1, borderColor: palette.line,
      backgroundColor: palette.paper, paddingHorizontal: 16, fontFamily: fonts.body, fontSize: 15, color: palette.ink,
    },
    sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: palette.ink, alignItems: 'center', justifyContent: 'center' },

    missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
    missingText: { ...T.body, color: palette.mute },
  });
