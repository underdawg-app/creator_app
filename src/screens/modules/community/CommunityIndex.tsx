import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, ScrollView } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';
import { ListCell } from '@/components/ui/ListCell';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RuleDot } from '@/components/svg/Marks';
import CommunityIntro from './CommunityIntro';
import { useStore } from '@/store';
import {
  communityPostsSeed,
  challenges,
  communityGroupsSeed,
  communityEventsSeed,
  mentorsSeed,
  qaSeed,
  pollsSeed,
  communityScenes,
  type CommunityPostKind,
} from '@/data/mock';

// Post taxonomy. `tone` maps each kind to a brand accent token resolved from
// the live palette at render — no frozen hex.
type Tone = 'electric' | 'blush' | 'acid' | 'ember';
const POST_KINDS: CommunityPostKind[] = [
  'DISCUSSION', 'QUESTION', 'WIN', 'STRUGGLE', 'TIP', 'RESOURCE', 'COLLAB', 'FEEDBACK',
];
const KIND_TONE: Record<CommunityPostKind, Tone> = {
  DISCUSSION: 'electric', QUESTION: 'blush', WIN: 'acid', STRUGGLE: 'ember',
  TIP: 'electric', RESOURCE: 'blush', COLLAB: 'acid', FEEDBACK: 'ember',
};
const KIND_ICON: Record<CommunityPostKind, string> = {
  DISCUSSION: 'chatbubbles-outline', QUESTION: 'help-circle-outline', WIN: 'trophy-outline',
  STRUGGLE: 'pulse-outline', TIP: 'bulb-outline', RESOURCE: 'link-outline',
  COLLAB: 'people-outline', FEEDBACK: 'eye-outline',
};

const compact = (n: number): string =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K` : String(n);

export default function CommunityHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const communityOnboarded = useStore((s) => s.communityOnboarded);
  const interests = useStore((s) => s.communityInterests);

  const toneColor = (t: Tone) => palette[t];

  const [composeOpen, setComposeOpen] = useState(false);
  const [filter, setFilter] = useState<CommunityPostKind | 'ALL'>('ALL');
  const filteredPosts = useMemo(
    () => (filter === 'ALL' ? communityPostsSeed : communityPostsSeed.filter((p) => p.kind === filter)),
    [filter],
  );

  // Rooms the user picked in the intro → scene chips; fall back to seed groups.
  const myScenes = useMemo(() => {
    const picked = communityScenes.filter((s) => interests.includes(s.key));
    return picked.length ? picked : null;
  }, [interests]);

  const poll = pollsSeed[0];
  const pollMax = Math.max(...poll.options.map((o) => o.votes));

  // First-timers see the intro inline (no mount-time navigation redirect,
  // which React Navigation can't reliably handle mid-transition). Picking a
  // scene / tapping ENTER flips communityOnboarded → this re-renders to the hub.
  if (!communityOnboarded) {
    return <CommunityIntro />;
  }

  return (
      <ScreenFrame
        waves={false}
        header={
          <ModuleHeader
            title="COMMUNITY"
            right={
              <Tap style={styles.headerBtn} burstColor={palette.electric} onPress={() => setComposeOpen((v) => !v)}>
                <Ionicons name="create-outline" size={18} color={palette.ink} />
              </Tap>
            }
          />
        }
      >
        {/* ── Hero ── */}
        <RNText style={styles.heroTitle} numberOfLines={2} maxFontSizeMultiplier={1.1}>
          not alone.<RNText style={styles.heroItalic}>{'\n'}not ever.</RNText>
        </RNText>
        <RNText style={styles.heroBody} maxFontSizeMultiplier={1.2}>
          Creators helping creators — wins to share, struggles to name, and a room to ask for help.
        </RNText>

        {/* ── Compose ── */}
        <Tap
          style={[styles.composeBar, { borderColor: palette.line }]}
          burstColor={palette.electric}
          onPress={() => setComposeOpen((v) => !v)}
        >
          <View style={[styles.composeAvatar, { backgroundColor: palette.electric }]}>
            <Ionicons name="add" size={18} color={palette.bone} />
          </View>
          <RNText style={styles.composePrompt} maxFontSizeMultiplier={1.15}>
            Share a win, a struggle, a tip…
          </RNText>
          <Ionicons name={composeOpen ? 'chevron-up' : 'chevron-down'} size={16} color={palette.ink} style={{ opacity: 0.5 }} />
        </Tap>
        {composeOpen && (
          <View style={styles.composeGrid}>
            {POST_KINDS.map((k) => (
              <Tap
                key={k}
                style={[styles.composeChip, { backgroundColor: toneColor(KIND_TONE[k]) }]}
                burstColor={toneColor(KIND_TONE[k])}
                onPress={() => {
                  setComposeOpen(false);
                  toast(`New ${k.toLowerCase()} post.`, 'success');
                }}
              >
                <Ionicons name={KIND_ICON[k] as any} size={13} color={palette.ink} />
                <RNText style={styles.composeChipLabel} maxFontSizeMultiplier={1.1}>{k}</RNText>
              </Tap>
            ))}
          </View>
        )}

        {/* ── Filter chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          style={styles.filterScroll}
        >
          <Chip label="ALL" accent={palette.ink} active={filter === 'ALL'} onPress={() => setFilter('ALL')} size="sm" />
          {POST_KINDS.map((k) => (
            <Chip
              key={k}
              label={k}
              accent={toneColor(KIND_TONE[k])}
              active={filter === k}
              onPress={() => setFilter(k)}
              size="sm"
            />
          ))}
        </ScrollView>

        {/* ── Feed spine + interleaved rails ── */}
        <View style={styles.feed}>
          {filteredPosts.map((p, i) => (
            <React.Fragment key={p.id}>
              <Tap
                burstColor={toneColor(KIND_TONE[p.kind])}
                style={[styles.postCard, { borderColor: palette.line, backgroundColor: palette.paper }]}
                onPress={() => toast(`Open ${p.kind.toLowerCase()} post.`, 'success')}
              >
                <View style={styles.postTop}>
                  <View style={[styles.postKindBadge, { backgroundColor: toneColor(KIND_TONE[p.kind]) }]}>
                    <Ionicons name={KIND_ICON[p.kind] as any} size={11} color={palette.ink} />
                    <RNText style={styles.postKindLabel} maxFontSizeMultiplier={1.1}>{p.kind}</RNText>
                  </View>
                  <RNText style={styles.ago} maxFontSizeMultiplier={1.1}>{p.ago}</RNText>
                </View>
                <RNText style={styles.from} maxFontSizeMultiplier={1.15}>{p.from}</RNText>
                <RNText style={styles.postBody} numberOfLines={3} maxFontSizeMultiplier={1.2}>{p.body}</RNText>
                <View style={styles.postMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="heart-outline" size={13} color={palette.ink} style={{ opacity: 0.6 }} />
                    <RNText style={styles.metaLabel} maxFontSizeMultiplier={1.1}>{compact(p.likes)}</RNText>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="chatbubble-outline" size={12} color={palette.ink} style={{ opacity: 0.6 }} />
                    <RNText style={styles.metaLabel} maxFontSizeMultiplier={1.1}>{compact(p.comments)}</RNText>
                  </View>
                  <View style={{ flex: 1 }} />
                  <RNText style={styles.replyCta} maxFontSizeMultiplier={1.1}>REPLY</RNText>
                </View>
              </Tap>

              {/* Rooms rail */}
              {i === 1 && (
                <Rail title="YOUR ROOMS" actionLabel="BROWSE" accent={palette.electric} onAction={() => router.push('/(modules)/community/groups')} styles={styles}>
                  {(myScenes
                    ? myScenes.map((s) => ({ key: s.key, label: s.label, accent: s.accent }))
                    : communityGroupsSeed.map((g) => ({ key: g.id, label: g.name, accent: g.accent }))
                  ).map((r) => (
                    <Tap
                      key={r.key}
                      style={[styles.roomCard, { borderColor: palette.line }]}
                      burstColor={r.accent}
                      onPress={() => router.push('/(modules)/community/groups')}
                    >
                      <View style={[styles.roomDot, { backgroundColor: r.accent }]} />
                      <RNText style={styles.roomLabel} numberOfLines={1} maxFontSizeMultiplier={1.1}>{r.label}</RNText>
                    </Tap>
                  ))}
                </Rail>
              )}

              {/* Challenges rail */}
              {i === 3 && (
                <Rail title="LIVE CHALLENGES" actionLabel="ALL" accent={palette.electric} onAction={() => router.push('/(modules)/community/challenges')} styles={styles}>
                  {challenges.map((c) => (
                    <Tap
                      key={c.id}
                      style={[styles.challengeCard, { backgroundColor: c.color }]}
                      burstColor={c.color}
                      onPress={() => router.push(`/(modules)/community/challenges/${c.id}` as any)}
                    >
                      <RNText style={styles.challengeTag} numberOfLines={1} maxFontSizeMultiplier={1.1}>{c.tag}</RNText>
                      <RNText style={styles.challengePrompt} numberOfLines={2} maxFontSizeMultiplier={1.1}>{c.prompt}</RNText>
                      <View style={styles.challengeMeta}>
                        <RNText style={styles.challengeDays} maxFontSizeMultiplier={1.1}>{c.daysLeft}D LEFT</RNText>
                        <RNText style={styles.challengeEntries} maxFontSizeMultiplier={1.1}>{compact(c.entries)} ENTRIES</RNText>
                      </View>
                    </Tap>
                  ))}
                </Rail>
              )}

              {/* Events strip */}
              {i === 5 && (
                <Rail title="HAPPENING" actionLabel="ALL" accent={palette.electric} onAction={() => router.push('/(modules)/community/events')} styles={styles}>
                  {communityEventsSeed.map((e) => (
                    <Tap
                      key={e.id}
                      style={[styles.eventCard, { borderColor: palette.line }]}
                      burstColor={e.accent}
                      onPress={() => router.push(`/(modules)/community/event?id=${e.id}` as any)}
                    >
                      <View style={[styles.eventKind, { backgroundColor: e.accent }]}>
                        <RNText style={styles.eventKindLabel} maxFontSizeMultiplier={1.1}>{e.kind}</RNText>
                      </View>
                      <RNText style={styles.eventTitle} numberOfLines={2} maxFontSizeMultiplier={1.1}>{e.title}</RNText>
                      <RNText style={styles.eventWhen} numberOfLines={1} maxFontSizeMultiplier={1.1}>{e.when} · {e.location}</RNText>
                    </Tap>
                  ))}
                </Rail>
              )}
            </React.Fragment>
          ))}
          {filteredPosts.length === 0 && (
            <RNText style={styles.emptyFeed} maxFontSizeMultiplier={1.2}>No {filter.toLowerCase()} posts yet. Be the first.</RNText>
          )}
        </View>

        <View style={styles.divider}>
          <RuleDot width={320} color={palette.line} dotColor={palette.electric} />
        </View>

        {/* ── Live poll ── */}
        <Section eyebrow="LIVE POLL" title="vote with the crowd.">
          <View style={[styles.pollCard, { borderColor: palette.line }]}>
            <RNText style={styles.pollFrom} maxFontSizeMultiplier={1.1}>{poll.from} · {poll.ago}</RNText>
            <RNText style={styles.pollQuestion} maxFontSizeMultiplier={1.15}>{poll.question}</RNText>
            <View style={{ gap: 6, marginTop: 10 }}>
              {poll.options.map((o) => {
                const pct = (o.votes / poll.totalVotes) * 100;
                const isLead = o.votes === pollMax;
                return (
                  <Tap
                    key={o.key}
                    onPress={() => toast(`Voted: ${o.label}`, 'success')}
                    burstColor={palette.electric}
                    style={[styles.pollOptionRow, { borderColor: palette.line }]}
                  >
                    <View
                      style={[
                        styles.pollFill,
                        { width: `${pct}%`, backgroundColor: isLead ? palette.electric : palette.ink, opacity: isLead ? 0.22 : 0.08 },
                      ]}
                    />
                    <RNText style={styles.pollOptionLabel} maxFontSizeMultiplier={1.1}>{o.label}</RNText>
                    <RNText style={styles.pollOptionPct} maxFontSizeMultiplier={1.1}>{pct.toFixed(0)}%</RNText>
                  </Tap>
                );
              })}
            </View>
            <RNText style={styles.pollTotal} maxFontSizeMultiplier={1.1}>{compact(poll.totalVotes)} VOTES</RNText>
          </View>
        </Section>

        {/* ── Q&A ── */}
        <Section
          eyebrow="Q & A"
          title="ask the room."
          action={{ label: 'ALL', onPress: () => router.push('/(modules)/community/qa') }}
        >
          {qaSeed.map((q) => (
            <Tap key={q.id} onPress={() => router.push('/(modules)/community/qa')} burstColor={palette.electric} style={[styles.qaRow, { borderColor: palette.line }]}>
              <View style={[styles.qMark, { borderColor: palette.line }]}>
                <RNText style={styles.qMarkLabel} maxFontSizeMultiplier={1.1}>Q</RNText>
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.qaQuestion} numberOfLines={2} maxFontSizeMultiplier={1.15}>{q.question}</RNText>
                <RNText style={styles.qaMeta} maxFontSizeMultiplier={1.1}>{q.from} · {q.answers} answers · {q.ago}</RNText>
              </View>
              <Ionicons name="chevron-forward" size={14} color={palette.ink} style={{ opacity: 0.6 }} />
            </Tap>
          ))}
        </Section>

        {/* ── Mentorship ── */}
        <Section eyebrow="MENTORSHIP" title="learn from someone ahead.">
          <View style={styles.mentorActions}>
            <View style={{ flex: 1 }}>
              <MagneticButton label="FIND A MENTOR" background={palette.electric} foreground={palette.bone} size="sm" onPress={() => router.push('/(modules)/community/mentorship')} />
            </View>
            <View style={{ flex: 1 }}>
              <MagneticButton label="BECOME ONE" variant="outline" foreground={palette.ink} size="sm" onPress={() => router.push('/(modules)/community/mentorship')} />
            </View>
          </View>
          {mentorsSeed.map((m) => (
            <Tap key={m.id} onPress={() => router.push('/(modules)/community/mentorship')} burstColor={m.accent} style={[styles.mentorRow, { borderColor: palette.line }]}>
              <View style={[styles.mentorAvatar, { backgroundColor: m.accent }]}>
                <RNText style={styles.mentorInitial} maxFontSizeMultiplier={1.1}>{m.name.charAt(0)}</RNText>
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.mentorName} numberOfLines={1} maxFontSizeMultiplier={1.15}>{m.name}</RNText>
                <RNText style={styles.mentorExpertise} numberOfLines={1} maxFontSizeMultiplier={1.1}>{m.expertise} · {m.handle}</RNText>
              </View>
              <View style={[styles.availPill, { borderColor: palette.line }]}>
                <RNText style={styles.availLabel} maxFontSizeMultiplier={1.1}>{m.avail}</RNText>
              </View>
            </Tap>
          ))}
        </Section>

        {/* ── Manage ── */}
        <Section eyebrow="MANAGE" title="everything else.">
          <ListCell icon="people-outline" title="All groups" subtitle="Niche · location · interest · private" onPress={() => router.push('/(modules)/community/groups')} />
          <ListCell icon="calendar-outline" title="All events" subtitle="Meetups · webinars · AMAs · workshops" onPress={() => router.push('/(modules)/community/events')} />
          <ListCell icon="trophy-outline" title="Challenges" subtitle="Open prompts with prizes" onPress={() => router.push('/(modules)/community/challenges')} />
          <ListCell icon="people-circle-outline" title="Creator directory" subtitle="Find and follow creators in your orbit" onPress={() => router.push('/(modules)/community/directory')} />
          <ListCell icon="help-circle-outline" title="Q&A and polls" subtitle="Ask the community, vote on polls" onPress={() => router.push('/(modules)/community/qa')} />
        </Section>
      </ScreenFrame>
  );
}

/* ── Horizontal rail with a header + action ──────────────────────────── */
function Rail({
  title,
  actionLabel,
  onAction,
  accent,
  styles,
  children,
}: {
  title: string;
  actionLabel: string;
  onAction: () => void;
  accent: string;
  styles: any;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.rail}>
      <View style={styles.railHead}>
        <RNText style={styles.railTitle} maxFontSizeMultiplier={1.1}>{title}</RNText>
        <Tap onPress={onAction} burstColor={accent}>
          <RNText style={styles.railAction} maxFontSizeMultiplier={1.1}>{actionLabel}</RNText>
        </Tap>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railScroll}>
        {children}
      </ScrollView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    headerBtn: {
      width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
      borderWidth: 1, borderColor: palette.line,
    },

    heroTitle: {
      fontFamily: fonts.displayBold, fontSize: 46, lineHeight: 44, letterSpacing: -1.8,
      color: palette.ink, includeFontPadding: false, marginTop: 6,
    },
    heroItalic: { fontFamily: fonts.editorial, fontStyle: 'italic', opacity: 0.85 },
    heroBody: { ...T.lead, color: palette.ink, opacity: 0.72, marginTop: 12, marginBottom: 18 },

    /* compose */
    composeBar: {
      flexDirection: 'row', alignItems: 'center', gap: 12,
      borderWidth: 1, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14,
    },
    composeAvatar: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    composePrompt: { ...T.body, color: palette.ink, opacity: 0.7, flex: 1 },
    composeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
    composeChip: {
      flexDirection: 'row', alignItems: 'center', gap: 6,
      paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999,
    },
    composeChipLabel: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.4, color: palette.ink },

    /* filter */
    filterScroll: { marginTop: 16, marginHorizontal: -12 },
    filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 12 },

    /* feed */
    feed: { marginTop: 16, gap: 12 },
    postCard: { borderWidth: 1, borderRadius: 16, padding: 14 },
    postTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
    postKindBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 4, paddingHorizontal: 9, borderRadius: 999 },
    postKindLabel: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1.4, color: palette.ink },
    ago: { ...T.micro, color: palette.ink, opacity: 0.5 },
    from: { ...T.title3, color: palette.ink, marginBottom: 4 },
    postBody: { ...T.body, color: palette.ink, opacity: 0.82, lineHeight: 21 },
    postMeta: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 12 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    metaLabel: { ...T.micro, color: palette.ink, opacity: 0.7 },
    replyCta: { ...T.micro, color: palette.electric, letterSpacing: 1.6 },
    emptyFeed: { ...T.body, color: palette.ink, opacity: 0.5, textAlign: 'center', paddingVertical: 28 },

    /* rails */
    rail: { marginHorizontal: -12, marginVertical: 2 },
    railHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 10 },
    railTitle: { ...T.label, color: palette.ink, opacity: 0.6 },
    railAction: { ...T.micro, color: palette.electric, letterSpacing: 1.6 },
    railScroll: { paddingHorizontal: 12, gap: 10 },

    roomCard: {
      flexDirection: 'row', alignItems: 'center', gap: 8,
      borderWidth: 1, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14,
    },
    roomDot: { width: 8, height: 8, borderRadius: 4 },
    roomLabel: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.2, color: palette.ink, textTransform: 'uppercase' },

    challengeCard: { width: 220, borderRadius: 16, padding: 14, justifyContent: 'space-between' },
    challengeTag: { fontFamily: fonts.displayHeavy, fontSize: 18, letterSpacing: -0.4, color: palette.ink },
    challengePrompt: { ...T.body, color: palette.ink, opacity: 0.85, marginTop: 4, minHeight: 38 },
    challengeMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    challengeDays: { ...T.micro, color: palette.ink },
    challengeEntries: { ...T.micro, color: palette.ink, opacity: 0.7 },

    eventCard: { width: 200, borderWidth: 1, borderRadius: 16, padding: 14, gap: 8 },
    eventKind: { alignSelf: 'flex-start', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 999 },
    eventKindLabel: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1.4, color: palette.ink },
    eventTitle: { ...T.title3, color: palette.ink },
    eventWhen: { ...T.micro, color: palette.ink, opacity: 0.6 },

    divider: { alignItems: 'center', marginVertical: 28 },

    /* poll */
    pollCard: { borderWidth: 1, borderRadius: 16, padding: 16 },
    pollFrom: { ...T.micro, color: palette.ink, opacity: 0.55 },
    pollQuestion: { ...T.title3, color: palette.ink, marginTop: 6 },
    pollOptionRow: { borderWidth: 1, borderRadius: 10, paddingVertical: 11, paddingHorizontal: 12, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' },
    pollFill: { position: 'absolute', left: 0, top: 0, bottom: 0 },
    pollOptionLabel: { ...T.bodyMedium, color: palette.ink, flex: 1 },
    pollOptionPct: { ...T.label, color: palette.ink, opacity: 0.7 },
    pollTotal: { ...T.micro, color: palette.ink, opacity: 0.5, marginTop: 12 },

    /* q&a */
    qaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, paddingVertical: 14 },
    qMark: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    qMarkLabel: { fontFamily: fonts.displayHeavy, fontSize: 13, color: palette.ink },
    qaQuestion: { ...T.bodyMedium, color: palette.ink },
    qaMeta: { ...T.micro, color: palette.ink, opacity: 0.55, marginTop: 4 },

    /* mentorship */
    mentorActions: { flexDirection: 'row', gap: 10, marginBottom: 14 },
    mentorRow: { flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, paddingVertical: 12 },
    mentorAvatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
    mentorInitial: { fontFamily: fonts.displayHeavy, fontSize: 18, color: palette.ink },
    mentorName: { ...T.title3, color: palette.ink },
    mentorExpertise: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 2 },
    availPill: { borderWidth: 1, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
    availLabel: { ...T.micro, color: palette.ink, opacity: 0.8 },
  });
