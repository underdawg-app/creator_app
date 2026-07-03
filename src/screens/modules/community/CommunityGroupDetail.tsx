import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, TextInput } from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';
import { communityGroupsSeed, communityPostsSeed } from '@/data/mock';

const compact = (n: number): string =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K` : String(n);

// Terse house rules — fabricated per spec, no backend.
const RULES = [
  'show work, not just wins.',
  'critique the piece, never the person.',
  'no spam, no cold pitches in the feed.',
];

// Initials for an @handle-ish "from" string.
const initials = (s: string) => {
  const clean = s.replace(/^@/, '');
  const parts = clean.split(/[._\s]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || clean.slice(0, 2).toUpperCase();
};

type Post = {
  id: string;
  from: string;
  kind: string;
  body: string;
  ago: string;
  likes: number;
  comments: number;
};

export default function CommunityGroupDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const { id } = useLocalSearchParams<{ id?: string }>();
  const group = useMemo(
    () => communityGroupsSeed.find((g) => g.id === id) ?? communityGroupsSeed[0],
    [id],
  );

  const [joined, setJoined] = useState(group.kind !== 'PRIVATE');
  const [posts, setPosts] = useState<Post[]>(() => communityPostsSeed.slice(0, 4));
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [composeOpen, setComposeOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const memberCount = group.members + (joined && group.kind === 'PRIVATE' ? 1 : 0);

  const toggleJoin = () => {
    const next = !joined;
    setJoined(next);
    toast(next ? `Joined ${group.name}.` : `Left ${group.name}.`, 'success');
  };

  const toggleLike = (p: Post) => {
    setLiked((m) => ({ ...m, [p.id]: !m[p.id] }));
  };

  const submitPost = () => {
    const body = draft.trim();
    if (!body) {
      toast('Write something first.', 'warn');
      return;
    }
    const newPost: Post = {
      id: `gp-${Date.now()}`,
      from: '@you',
      kind: 'DISCUSSION',
      body,
      ago: 'now',
      likes: 0,
      comments: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    setDraft('');
    setComposeOpen(false);
    toast('Posted to group.', 'success');
  };

  // A few "member" avatars built from post authors + a static handful.
  const avatars = useMemo(() => {
    const seed = ['@maya_films', '@kore.odu', '@lin.w', '@ari.s', '@deepfield'];
    return seed.slice(0, 5);
  }, []);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="GROUP" title="COMMUNITY" showBack />} waves={false}>
      <View style={styles.kindRow}>
        <View style={[styles.kindPill, { backgroundColor: group.accent }]}>
          <RNText style={styles.kindLabel}>{group.kind}</RNText>
        </View>
        <RNText style={styles.memberMeta}>{compact(memberCount)} MEMBERS</RNText>
      </View>

      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        {group.name.toLowerCase()}
      </RNText>
      <RNText style={styles.blurb} maxFontSizeMultiplier={1.2}>
        {group.blurb}
      </RNText>

      {/* Join / Leave toggle */}
      <Tap
        onPress={toggleJoin}
        variant="heavy"
        burstColor={group.accent}
        style={[styles.cta, joined && styles.ctaJoined]}
      >
        <RNText style={[styles.ctaLabel, joined && { color: palette.ink }]}>
          {joined ? 'LEAVE GROUP' : 'JOIN GROUP'}
        </RNText>
        <View style={[styles.ctaArrow, joined && { backgroundColor: palette.ink }]}>
          <Ionicons
            name={joined ? 'checkmark-circle' : 'arrow-forward'}
            size={16}
            color={joined ? palette.bone : palette.ink}
          />
        </View>
      </Tap>

      {/* Rules */}
      <Section eyebrow="HOUSE RULES" title="how we run.">
        <View style={styles.rulesCard}>
          {RULES.map((r, i) => (
            <View key={i} style={styles.ruleRow}>
              <View style={styles.ruleNum}>
                <RNText style={styles.ruleNumText}>{i + 1}</RNText>
              </View>
              <RNText style={styles.ruleText} maxFontSizeMultiplier={1.2}>
                {r}
              </RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* Members row */}
      <Section
        eyebrow={`${compact(memberCount)} MEMBERS`}
        title="who's in here."
        action={{ label: 'VIEW ALL', onPress: () => toast('All members coming soon.', 'success') }}
      >
        <View style={styles.avatarRow}>
          {avatars.map((a, i) => (
            <View key={a} style={[styles.avatar, { backgroundColor: group.accent, marginLeft: i === 0 ? 0 : -10 }]}>
              <RNText style={styles.avatarText}>{initials(a)}</RNText>
            </View>
          ))}
          <Tap
            onPress={() => toast('All members coming soon.', 'success')}
            burstColor={palette.acid}
            style={[styles.avatar, styles.avatarMore]}
          >
            <RNText style={styles.avatarMoreText}>+{compact(memberCount)}</RNText>
          </Tap>
        </View>
      </Section>

      {/* Group feed */}
      <Section
        eyebrow={`GROUP FEED · ${posts.length}`}
        title="the conversation."
        action={{ label: 'POST', onPress: () => setComposeOpen(true) }}
      >
        {posts.map((p) => {
          const isLiked = !!liked[p.id];
          return (
            <View key={p.id} style={styles.postRow}>
              <View style={styles.postTop}>
                <View style={[styles.postKindBadge, { backgroundColor: group.accent }]}>
                  <RNText style={styles.postKindLabel}>{p.kind}</RNText>
                </View>
                <RNText style={styles.ago}>{p.ago}</RNText>
              </View>
              <RNText style={styles.from} maxFontSizeMultiplier={1.15}>
                {p.from}
              </RNText>
              <RNText style={styles.postBody} numberOfLines={3} maxFontSizeMultiplier={1.2}>
                {p.body}
              </RNText>
              <View style={styles.postMeta}>
                <Tap onPress={() => toggleLike(p)} burstColor={palette.blush} style={styles.metaItem}>
                  <Ionicons
                    name={isLiked ? 'heart' : 'heart-outline'}
                    size={14}
                    color={isLiked ? palette.blush : palette.ink}
                    style={isLiked ? undefined : { opacity: 0.65 }}
                  />
                  <RNText style={styles.metaLabel}>{compact(p.likes + (isLiked ? 1 : 0))}</RNText>
                </Tap>
                <Tap
                  onPress={() => toast('Comments coming soon.', 'success')}
                  burstColor={palette.electric}
                  style={styles.metaItem}
                >
                  <Ionicons name="chatbubble-outline" size={12} color={palette.ink} style={{ opacity: 0.65 }} />
                  <RNText style={styles.metaLabel}>{compact(p.comments)}</RNText>
                </Tap>
              </View>
            </View>
          );
        })}
      </Section>

      {/* Post-to-group CTA */}
      <Tap onPress={() => setComposeOpen(true)} style={styles.postCta} burstColor={palette.bone}>
        <RNText style={styles.postCtaLabel}>POST TO GROUP</RNText>
        <View style={styles.postCtaArrow}>
          <Ionicons name="add" size={18} color={palette.ink} />
        </View>
      </Tap>

      {/* Compose sheet */}
      <Sheet
        visible={composeOpen}
        onClose={() => setComposeOpen(false)}
        eyebrow={group.name}
        title="post to group."
      >
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Share a win, a struggle, a question…"
          placeholderTextColor={palette.inkMuted}
          multiline
          style={styles.input}
          maxFontSizeMultiplier={1.2}
        />
        <Tap onPress={submitPost} variant="success" style={styles.sheetSubmit} burstColor={palette.bone}>
          <RNText style={styles.sheetSubmitText}>POST</RNText>
          <Ionicons name="send" size={15} color={palette.bone} />
        </Tap>
      </Sheet>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    kindRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
    kindPill: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
    kindLabel: { ...T.label, color: staticPalette.ink, letterSpacing: 1.4, fontSize: 10 },
    memberMeta: { ...T.label, color: palette.inkMuted, letterSpacing: 1.4 },

    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 10,
    },
    blurb: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 12, maxWidth: 360 },

    cta: {
      marginTop: 18,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaJoined: { backgroundColor: palette.boneSoft, borderWidth: 1, borderColor: palette.line },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* Rules */
    rulesCard: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 18,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 14,
    },
    ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    ruleNum: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.acid,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ruleNumText: { fontFamily: fonts.displayBold, fontSize: 13, color: staticPalette.ink },
    ruleText: { fontFamily: fonts.editorial, fontSize: 16, lineHeight: 20, color: palette.ink, opacity: 0.9, flex: 1 },

    /* Members */
    avatarRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: palette.paper,
    },
    avatarText: { fontFamily: fonts.displayBold, fontSize: 15, color: staticPalette.ink },
    avatarMore: { marginLeft: -10, backgroundColor: palette.ink },
    avatarMoreText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.4, color: palette.bone },

    /* Feed */
    postRow: {
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      gap: 6,
    },
    postTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    postKindBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10 },
    postKindLabel: { ...T.label, color: staticPalette.ink, letterSpacing: 1.4, fontSize: 10 },
    ago: { ...T.micro, color: palette.ink, opacity: 0.5 },
    from: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3, marginTop: 4 },
    postBody: { fontFamily: fonts.editorial, fontSize: 17, lineHeight: 24, color: palette.ink, opacity: 0.88 },
    postMeta: { flexDirection: 'row', gap: 14, marginTop: 6 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 2, paddingRight: 6 },
    metaLabel: { ...T.micro, color: palette.ink, opacity: 0.7 },

    /* Post CTA */
    postCta: {
      marginTop: 24,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    postCtaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    postCtaArrow: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* Sheet */
    input: {
      minHeight: 120,
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 16,
      backgroundColor: palette.boneSoft,
      padding: 14,
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 21,
      color: palette.ink,
      textAlignVertical: 'top',
    },
    sheetSubmit: {
      marginTop: 16,
      height: 54,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    sheetSubmitText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2, color: palette.bone },
  });
