import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { ListCell } from '@/components/ui/ListCell';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useStore } from '@/store';
import {
  communityPostsSeed,
  challenges,
  communityGroupsSeed,
  communityEventsSeed,
  mentorsSeed,
  qaSeed,
  pollsSeed,
  type CommunityPostKind,
} from '@/data/mock';

// Post-type taxonomy per Module 13. Each gets a neon accent for the badge/chip.
const POST_TYPES: Array<{ key: CommunityPostKind; label: string; icon: string; accent: string }> = [
  { key: 'DISCUSSION', label: 'DISCUSSION', icon: 'chatbubbles-outline',   accent: '#2E5BFF' },
  { key: 'QUESTION',   label: 'QUESTION',   icon: 'help-circle-outline',   accent: '#FF6BB5' },
  { key: 'WIN',        label: 'WIN',        icon: 'trophy-outline',        accent: '#9CA3AF' },
  { key: 'STRUGGLE',   label: 'STRUGGLE',   icon: 'pulse-outline',         accent: '#FF5A1F' },
  { key: 'TIP',        label: 'TIP',        icon: 'bulb-outline',          accent: '#2E5BFF' },
  { key: 'RESOURCE',   label: 'RESOURCE',   icon: 'link-outline',          accent: '#FF6BB5' },
  { key: 'COLLAB',     label: 'COLLAB',     icon: 'people-outline',        accent: '#9CA3AF' },
  { key: 'FEEDBACK',   label: 'FEEDBACK',   icon: 'eye-outline',           accent: '#FF5A1F' },
];

const kindAccent = (k: CommunityPostKind) =>
  POST_TYPES.find((p) => p.key === k)?.accent ?? staticPalette.acid;

const compact = (n: number): string =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K` : String(n);

export default function CommunityHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [filter, setFilter] = useState<CommunityPostKind | 'ALL'>('ALL');
  const filteredPosts = useMemo(
    () => (filter === 'ALL' ? communityPostsSeed : communityPostsSeed.filter((p) => p.kind === filter)),
    [filter],
  );

  const poll = pollsSeed[0];
  const pollMax = Math.max(...poll.options.map((o) => o.votes));

  return (
    <ScreenFrame header={<ModuleHeader title="COMMUNITY" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        not alone.<RNText style={styles.italic}>{'\n'}not ever.</RNText>
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Creators helping creators. Wins to share, struggles to name, tips that actually work — and the room to ask for help.
      </RNText>

      {/* ===== Compose strip — pick a post type to start ===== */}
      <Section eyebrow="START A POST" title="say something.">
        <View style={styles.composeGrid}>
          {POST_TYPES.map((t) => (
            <Tap
              key={t.key}
              style={[styles.composeChip, { backgroundColor: t.accent }]}
              burstColor={t.accent}
              onPress={() => toast(`New ${t.label.toLowerCase()} post.`, 'success')}
            >
              <Ionicons name={t.icon as any} size={14} color={staticPalette.ink} />
              <RNText style={styles.composeChipLabel} maxFontSizeMultiplier={1.1}>
                {t.label}
              </RNText>
            </Tap>
          ))}
        </View>
      </Section>

      {/* ===== Live challenges ===== */}
      <Section eyebrow="LIVE CHALLENGES" title="this week.">
        {challenges.map((c) => (
          <Tap
            key={c.id}
            onPress={() => router.push(`/(modules)/community/challenges/${c.id}` as any)}
            burstColor={c.color}
            style={[styles.challengeRow, { backgroundColor: c.color }]}
          >
            <View style={{ flex: 1 }}>
              <RNText style={styles.challengeTag} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                {c.tag}
              </RNText>
              <RNText style={styles.challengePrompt} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                {c.prompt}
              </RNText>
            </View>
            <View style={styles.challengeMeta}>
              <RNText style={styles.challengeDays}>{c.daysLeft}D</RNText>
              <RNText style={styles.challengeEntries}>{c.entries} ENTRIES</RNText>
            </View>
          </Tap>
        ))}
      </Section>

      {/* ===== Feed filter row ===== */}
      <Section eyebrow={`FEED · ${filteredPosts.length} POSTS`} title="what people are saying.">
        <View style={styles.filterRow}>
          <Tap
            style={[
              styles.filterChip,
              filter === 'ALL' && { backgroundColor: palette.ink, borderColor: palette.ink },
            ]}
            burstColor={palette.acid}
            onPress={() => setFilter('ALL')}
          >
            <RNText
              style={[styles.filterLabel, { color: filter === 'ALL' ? palette.bone : palette.ink }]}
              maxFontSizeMultiplier={1.1}
            >
              ALL
            </RNText>
          </Tap>
          {POST_TYPES.map((t) => (
            <Tap
              key={t.key}
              style={[
                styles.filterChip,
                filter === t.key && { backgroundColor: t.accent, borderColor: t.accent },
              ]}
              burstColor={t.accent}
              onPress={() => setFilter(t.key)}
            >
              <RNText
                style={[
                  styles.filterLabel,
                  { color: filter === t.key ? staticPalette.ink : palette.ink },
                ]}
                maxFontSizeMultiplier={1.1}
              >
                {t.label}
              </RNText>
            </Tap>
          ))}
        </View>

        {filteredPosts.map((p) => (
          <Tap
            key={p.id}
            burstColor={kindAccent(p.kind)}
            style={styles.postRow}
            onPress={() => toast(`Open ${p.kind.toLowerCase()} post.`, 'success')}
          >
            <View style={styles.postTop}>
              <View style={[styles.postKindBadge, { backgroundColor: kindAccent(p.kind) }]}>
                <RNText style={styles.postKindLabel} maxFontSizeMultiplier={1.1}>
                  {p.kind}
                </RNText>
              </View>
              <RNText style={styles.ago} maxFontSizeMultiplier={1.1}>
                {p.ago}
              </RNText>
            </View>
            <RNText style={styles.from} maxFontSizeMultiplier={1.15}>
              {p.from}
            </RNText>
            <RNText style={styles.postBody} numberOfLines={3} maxFontSizeMultiplier={1.2}>
              {p.body}
            </RNText>
            <View style={styles.postMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="heart-outline" size={13} color={palette.ink} style={{ opacity: 0.65 }} />
                <RNText style={styles.metaLabel} maxFontSizeMultiplier={1.1}>
                  {compact(p.likes)}
                </RNText>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="chatbubble-outline" size={12} color={palette.ink} style={{ opacity: 0.65 }} />
                <RNText style={styles.metaLabel} maxFontSizeMultiplier={1.1}>
                  {compact(p.comments)}
                </RNText>
              </View>
            </View>
          </Tap>
        ))}
      </Section>

      {/* ===== Active poll ===== */}
      <Section eyebrow="LIVE POLL" title="vote with the crowd.">
        <View style={styles.pollCard}>
          <RNText style={styles.pollFrom} maxFontSizeMultiplier={1.1}>
            {poll.from} · {poll.ago}
          </RNText>
          <RNText style={styles.pollQuestion} maxFontSizeMultiplier={1.15}>
            {poll.question}
          </RNText>
          <View style={{ gap: 6, marginTop: 10 }}>
            {poll.options.map((o) => {
              const pct = (o.votes / poll.totalVotes) * 100;
              const isLead = o.votes === pollMax;
              return (
                <Tap
                  key={o.key}
                  onPress={() => toast(`Voted: ${o.label}`, 'success')}
                  burstColor={isLead ? staticPalette.acid : palette.line}
                  style={styles.pollOptionRow}
                >
                  <View
                    style={[
                      styles.pollFill,
                      {
                        width: `${pct}%`,
                        backgroundColor: isLead ? staticPalette.acid : palette.line,
                        opacity: isLead ? 0.85 : 0.55,
                      },
                    ]}
                  />
                  <RNText style={styles.pollOptionLabel} maxFontSizeMultiplier={1.1}>
                    {o.label}
                  </RNText>
                  <RNText style={styles.pollOptionPct} maxFontSizeMultiplier={1.1}>
                    {pct.toFixed(0)}%
                  </RNText>
                </Tap>
              );
            })}
          </View>
          <RNText style={styles.pollTotal} maxFontSizeMultiplier={1.1}>
            {compact(poll.totalVotes)} VOTES
          </RNText>
        </View>
      </Section>

      {/* ===== Q&A ===== */}
      <Section
        eyebrow="Q & A"
        title="ask the room."
        action={{ label: 'ASK', onPress: () => toast('Open Q&A composer.', 'success') }}
      >
        {qaSeed.map((q) => (
          <Tap
            key={q.id}
            onPress={() => toast(`Open question ${q.id}`, 'success')}
            burstColor={palette.acid}
            style={styles.qaRow}
          >
            <View style={styles.qMark}>
              <RNText style={styles.qMarkLabel} maxFontSizeMultiplier={1.1}>
                Q
              </RNText>
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.qaQuestion} numberOfLines={2} maxFontSizeMultiplier={1.15}>
                {q.question}
              </RNText>
              <RNText style={styles.qaMeta} maxFontSizeMultiplier={1.1}>
                {q.from} · {q.answers} answers · {q.ago}
              </RNText>
            </View>
            <Ionicons name="chevron-forward" size={14} color={palette.ink} />
          </Tap>
        ))}
      </Section>

      {/* ===== Groups ===== */}
      <Section
        eyebrow="GROUPS"
        title="find your room."
        action={{
          label: 'BROWSE',
          onPress: () => router.push('/(modules)/community/groups'),
        }}
      >
        {communityGroupsSeed.map((g) => (
          <Tap
            key={g.id}
            onPress={() => router.push(`/(modules)/community/group?id=${g.id}` as any)}
            burstColor={g.accent}
            style={styles.groupRow}
          >
            <View style={[styles.groupBadge, { backgroundColor: g.accent }]}>
              <RNText style={styles.groupBadgeLabel} maxFontSizeMultiplier={1.1}>
                {g.kind}
              </RNText>
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.groupName} numberOfLines={1} maxFontSizeMultiplier={1.15}>
                {g.name}
              </RNText>
              <RNText style={styles.groupBlurb} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {g.blurb}
              </RNText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <RNText style={styles.groupMembers} maxFontSizeMultiplier={1.1}>
                {compact(g.members)}
              </RNText>
              <RNText style={styles.groupMembersSub} maxFontSizeMultiplier={1.1}>
                MEMBERS
              </RNText>
            </View>
          </Tap>
        ))}
      </Section>

      {/* ===== Events ===== */}
      <Section
        eyebrow="EVENTS"
        title="show up in person."
        action={{
          label: 'ALL',
          onPress: () => router.push('/(modules)/community/events'),
        }}
      >
        {communityEventsSeed.map((e) => (
          <Tap
            key={e.id}
            onPress={() => router.push(`/(modules)/community/event?id=${e.id}` as any)}
            burstColor={e.accent}
            style={styles.eventRow}
          >
            <View style={[styles.eventDate, { backgroundColor: e.accent }]}>
              <RNText style={styles.eventDateLabel} maxFontSizeMultiplier={1.1}>
                {e.when.split(' · ')[0]}
              </RNText>
              <RNText style={styles.eventDateTime} maxFontSizeMultiplier={1.1}>
                {e.when.split(' · ')[1]}
              </RNText>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.eventKindPill}>
                <RNText style={styles.eventKindLabel} maxFontSizeMultiplier={1.1}>
                  {e.kind}
                </RNText>
              </View>
              <RNText style={styles.eventTitle} numberOfLines={1} maxFontSizeMultiplier={1.15}>
                {e.title}
              </RNText>
              <RNText style={styles.eventMeta} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {e.host} · {e.location} · {e.rsvps} RSVPs
              </RNText>
            </View>
            <Ionicons name="chevron-forward" size={14} color={palette.ink} />
          </Tap>
        ))}
      </Section>

      {/* ===== Mentorship ===== */}
      <Section eyebrow="MENTORSHIP" title="learn from someone ahead.">
        <View style={styles.mentorActions}>
          <View style={{ flex: 1 }}>
            <MagneticButton
              label="FIND A MENTOR"
              background={staticPalette.acid}
              foreground={staticPalette.ink}
              size="sm"
              onPress={() => router.push('/(modules)/community/mentorship')}
            />
          </View>
          <View style={{ flex: 1 }}>
            <MagneticButton
              label="BECOME ONE"
              background={staticPalette.ink}
              foreground={staticPalette.acid}
              size="sm"
              onPress={() => router.push('/(modules)/community/mentorship')}
            />
          </View>
        </View>
        {mentorsSeed.map((m) => (
          <Tap
            key={m.id}
            onPress={() => router.push('/(modules)/community/mentorship')}
            burstColor={m.accent}
            style={styles.mentorRow}
          >
            <View style={[styles.mentorAvatar, { backgroundColor: m.accent }]}>
              <RNText style={styles.mentorInitial} maxFontSizeMultiplier={1.1}>
                {m.name.charAt(0)}
              </RNText>
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.mentorName} numberOfLines={1} maxFontSizeMultiplier={1.15}>
                {m.name}
              </RNText>
              <RNText style={styles.mentorExpertise} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {m.expertise} · {m.handle}
              </RNText>
              <View style={styles.mentorMetaRow}>
                <Ionicons name="star" size={12} color={staticPalette.acid} />
                <RNText style={styles.mentorRating} maxFontSizeMultiplier={1.1}>
                  {m.rating.toFixed(1)} ({m.reviews})
                </RNText>
                <RNText style={styles.mentorDot}>·</RNText>
                <RNText style={styles.mentorRate} maxFontSizeMultiplier={1.1}>
                  {m.rate}
                </RNText>
              </View>
            </View>
            <View
              style={[
                styles.availPill,
                {
                  backgroundColor:
                    m.avail === 'OPEN'
                      ? staticPalette.acid
                      : m.avail === 'WAITLIST'
                        ? palette.line
                        : palette.line,
                },
              ]}
            >
              <RNText
                style={[
                  styles.availLabel,
                  {
                    color: m.avail === 'OPEN' ? staticPalette.ink : palette.ink,
                  },
                ]}
                maxFontSizeMultiplier={1.1}
              >
                {m.avail}
              </RNText>
            </View>
          </Tap>
        ))}
      </Section>

      {/* ===== Quick manage ===== */}
      <Section eyebrow="MANAGE" title="your community bits.">
        <ListCell
          icon="people-outline"
          title="All groups"
          subtitle="Niche · location · interest · private"
          onPress={() => router.push('/(modules)/community/groups')}
        />
        <ListCell
          icon="calendar-outline"
          title="All events"
          subtitle="Meetups · webinars · AMAs · workshops"
          onPress={() => router.push('/(modules)/community/events')}
        />
        <ListCell
          icon="trophy-outline"
          title="Challenges"
          subtitle="Open prompts with prizes"
          onPress={() => router.push('/(modules)/community/challenges')}
        />
        <ListCell
          icon="people-circle-outline"
          title="Creator directory"
          subtitle="Find and follow creators in your orbit"
          onPress={() => router.push('/(modules)/community/directory')}
        />
        <ListCell
          icon="help-circle-outline"
          title="Q&A and polls"
          subtitle="Ask the community, vote on polls"
          onPress={() => router.push('/(modules)/community/qa')}
        />
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 50,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 14, maxWidth: 360 },

  /* Compose strip */
  composeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  composeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  composeChipLabel: {
    ...T.label,
    color: staticPalette.ink,
    letterSpacing: 1.6,
  },

  /* Challenges */
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  challengeTag: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.4, color: staticPalette.ink },
  challengePrompt: { ...T.small, color: staticPalette.ink, opacity: 0.82, marginTop: 4 },
  challengeMeta: { alignItems: 'flex-end' },
  challengeDays: { fontFamily: fonts.displayBold, fontSize: 18, color: staticPalette.ink, letterSpacing: -0.4 },
  challengeEntries: { ...T.micro, color: staticPalette.ink, opacity: 0.7, marginTop: 3 },

  /* Feed */
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: 'transparent',
  },
  filterLabel: { ...T.label, letterSpacing: 1.4, fontSize: 10 },

  postRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 6,
  },
  postTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  postKindBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  postKindLabel: { ...T.label, color: staticPalette.ink, letterSpacing: 1.4, fontSize: 10 },
  ago: { ...T.micro, color: palette.ink, opacity: 0.5 },
  from: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3, marginTop: 4 },
  postBody: { fontFamily: fonts.editorial, fontSize: 17, lineHeight: 24, color: palette.ink, opacity: 0.88 },
  postMeta: { flexDirection: 'row', gap: 16, marginTop: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaLabel: { ...T.micro, color: palette.ink, opacity: 0.7 },

  /* Poll */
  pollCard: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 16,
    padding: 16,
    backgroundColor: palette.paper,
  },
  pollFrom: { ...T.micro, color: palette.ink, opacity: 0.55, letterSpacing: 1 },
  pollQuestion: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.4,
    color: palette.ink,
    marginTop: 6,
  },
  pollOptionRow: {
    overflow: 'hidden',
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pollFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  pollOptionLabel: { ...T.label, color: palette.ink, letterSpacing: 1.2 },
  pollOptionPct: { fontFamily: fonts.displayBold, fontSize: 14, color: palette.ink },
  pollTotal: { ...T.micro, color: palette.ink, opacity: 0.55, letterSpacing: 1.2, marginTop: 10 },

  /* Q&A */
  qaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    marginBottom: 6,
  },
  qMark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qMarkLabel: { fontFamily: fonts.displayBold, color: staticPalette.ink, fontSize: 14 },
  qaQuestion: { fontFamily: fonts.displayHeavy, fontSize: 14, color: palette.ink },
  qaMeta: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 2 },

  /* Groups */
  groupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    marginBottom: 6,
  },
  groupBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  groupBadgeLabel: { ...T.label, color: staticPalette.ink, letterSpacing: 1.2, fontSize: 9 },
  groupName: { fontFamily: fonts.displayHeavy, fontSize: 15, color: palette.ink, letterSpacing: -0.2 },
  groupBlurb: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 2 },
  groupMembers: { fontFamily: fonts.displayBold, fontSize: 15, color: palette.ink },
  groupMembersSub: { ...T.micro, color: palette.ink, opacity: 0.55, fontSize: 9, letterSpacing: 1.2 },

  /* Events */
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    marginBottom: 6,
  },
  eventDate: {
    width: 58,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDateLabel: { fontFamily: fonts.displayBold, color: staticPalette.ink, fontSize: 14, letterSpacing: -0.4 },
  eventDateTime: { ...T.micro, color: staticPalette.ink, opacity: 0.85, fontSize: 10, letterSpacing: 1 },
  eventKindPill: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
  },
  eventKindLabel: { ...T.micro, color: palette.ink, opacity: 0.75, letterSpacing: 1.4 },
  eventTitle: { fontFamily: fonts.displayHeavy, fontSize: 15, color: palette.ink, marginTop: 4 },
  eventMeta: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 2 },

  /* Mentorship */
  mentorActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  mentorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    marginBottom: 6,
  },
  mentorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mentorInitial: { fontFamily: fonts.displayBold, fontSize: 18, color: staticPalette.ink },
  mentorName: { fontFamily: fonts.displayHeavy, fontSize: 15, color: palette.ink, letterSpacing: -0.2 },
  mentorExpertise: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 2 },
  mentorMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  mentorRating: { ...T.micro, color: palette.ink, opacity: 0.8 },
  mentorDot: { color: palette.ink, opacity: 0.4 },
  mentorRate: { ...T.micro, color: palette.ink, fontFamily: fonts.bodyBold, letterSpacing: 1 },
  availPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  availLabel: { ...T.micro, fontFamily: fonts.bodyBold, letterSpacing: 1.4, fontSize: 9 },
});
