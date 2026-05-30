import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { qaSeed, pollsSeed } from '@/data/mock';
import { useStore } from '@/store';

type Tab = 'QUESTIONS' | 'POLLS';

type Question = { id: string; from: string; question: string; answers: number; ago: string };
type PollOption = { key: string; label: string; votes: number };
type Poll = {
  id: string;
  from: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  ago: string;
};

const compact = (n: number): string =>
  n >= 1_000 ? `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K` : String(n);

export default function CommunityQA() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [tab, setTab] = useState<Tab>('QUESTIONS');

  // Local working copies so prepended items + counters persist on-screen.
  const [questions, setQuestions] = useState<Question[]>(() => qaSeed.map((q) => ({ ...q })));
  const [polls, setPolls] = useState<Poll[]>(() =>
    pollsSeed.map((p) => ({ ...p, options: p.options.map((o) => ({ ...o })) })),
  );
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});

  // ANSWER sheet
  const [answerFor, setAnswerFor] = useState<Question | null>(null);
  const [answerText, setAnswerText] = useState('');

  // ASK sheet
  const [askOpen, setAskOpen] = useState(false);
  const [askText, setAskText] = useState('');

  // NEW POLL sheet
  const [pollOpen, setPollOpen] = useState(false);
  const [pollQ, setPollQ] = useState('');
  const [pollA, setPollA] = useState('');
  const [pollB, setPollB] = useState('');

  const totalAnswers = useMemo(() => questions.reduce((a, q) => a + q.answers, 0), [questions]);

  const submitAnswer = () => {
    const q = answerFor;
    if (!q || !answerText.trim()) return;
    setQuestions((prev) => prev.map((x) => (x.id === q.id ? { ...x, answers: x.answers + 1 } : x)));
    setAnswerFor(null);
    setAnswerText('');
    toast('Answer posted.', 'success');
  };

  const submitAsk = () => {
    if (!askText.trim()) return;
    const q: Question = {
      id: `qa-${Date.now()}`,
      from: '@you',
      question: askText.trim(),
      answers: 0,
      ago: 'now',
    };
    setQuestions((prev) => [q, ...prev]);
    setAskOpen(false);
    setAskText('');
    toast('Question posted.', 'success');
  };

  const vote = (pollId: string, optKey: string) => {
    if (votedPolls[pollId]) return;
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? {
              ...p,
              totalVotes: p.totalVotes + 1,
              options: p.options.map((o) => (o.key === optKey ? { ...o, votes: o.votes + 1 } : o)),
            }
          : p,
      ),
    );
    setVotedPolls((prev) => ({ ...prev, [pollId]: optKey }));
    toast('Voted.', 'success');
  };

  const submitPoll = () => {
    if (!pollQ.trim() || !pollA.trim() || !pollB.trim()) return;
    const poll: Poll = {
      id: `pl-${Date.now()}`,
      from: '@you',
      question: pollQ.trim(),
      options: [
        { key: 'a', label: pollA.trim().toUpperCase(), votes: 0 },
        { key: 'b', label: pollB.trim().toUpperCase(), votes: 0 },
      ],
      totalVotes: 0,
      ago: 'now',
    };
    setPolls((prev) => [poll, ...prev]);
    setPollOpen(false);
    setPollQ('');
    setPollA('');
    setPollB('');
    toast('Poll posted.', 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="Q & A" title="COMMUNITY" showBack />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>
        ask anything.
      </RNText>
      <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
        Real questions, crowd answers, quick polls. No bad questions here.
      </RNText>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Chip label="QUESTIONS" active={tab === 'QUESTIONS'} onPress={() => setTab('QUESTIONS')} accent={palette.electric} />
        <Chip label="POLLS" active={tab === 'POLLS'} onPress={() => setTab('POLLS')} accent={palette.blush} />
      </View>

      {tab === 'QUESTIONS' ? (
        <Section eyebrow={`${questions.length} OPEN · ${totalAnswers} ANSWERS`} title="the room asks.">
          {questions.map((q) => (
            <View key={q.id} style={styles.qaRow}>
              <View style={styles.qaTop}>
                <View style={styles.qMark}>
                  <RNText style={styles.qMarkLabel} maxFontSizeMultiplier={1.1}>Q</RNText>
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.qaQuestion} numberOfLines={3} maxFontSizeMultiplier={1.15}>
                    {q.question}
                  </RNText>
                  <RNText style={styles.qaMeta} maxFontSizeMultiplier={1.1}>
                    {q.from} · {q.answers} answers · {q.ago}
                  </RNText>
                </View>
              </View>
              <Tap
                onPress={() => {
                  setAnswerFor(q);
                  setAnswerText('');
                }}
                burstColor={palette.acid}
                style={styles.answerBtn}
              >
                <Ionicons name="send" size={13} color={palette.ink} />
                <RNText style={styles.answerBtnLabel} maxFontSizeMultiplier={1.1}>ANSWER</RNText>
              </Tap>
            </View>
          ))}
        </Section>
      ) : (
        <Section eyebrow={`${polls.length} LIVE POLLS`} title="vote with the crowd.">
          {polls.map((p) => {
            const voted = !!votedPolls[p.id];
            const max = Math.max(...p.options.map((o) => o.votes), 1);
            return (
              <View key={p.id} style={styles.pollCard}>
                <RNText style={styles.pollFrom} maxFontSizeMultiplier={1.1}>
                  {p.from} · {p.ago}
                </RNText>
                <RNText style={styles.pollQuestion} maxFontSizeMultiplier={1.15}>
                  {p.question}
                </RNText>
                <View style={{ gap: 6, marginTop: 12 }}>
                  {p.options.map((o) => {
                    const pct = p.totalVotes > 0 ? (o.votes / p.totalVotes) * 100 : 0;
                    const isPick = votedPolls[p.id] === o.key;
                    const isLead = voted && o.votes === max;
                    const fillColor = isPick ? palette.acid : palette.line;
                    return (
                      <Tap
                        key={o.key}
                        onPress={() => vote(p.id, o.key)}
                        disabled={voted}
                        burstColor={palette.acid}
                        style={styles.pollOptionRow}
                      >
                        {voted ? (
                          <View
                            style={[
                              styles.pollFill,
                              { width: `${pct}%`, backgroundColor: fillColor, opacity: isPick ? 0.85 : 0.5 },
                            ]}
                          />
                        ) : null}
                        <RNText style={styles.pollOptionLabel} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                          {o.label}
                        </RNText>
                        {voted ? (
                          <RNText style={styles.pollOptionPct} maxFontSizeMultiplier={1.1}>
                            {pct.toFixed(0)}%{isLead ? ' ·' : ''}
                          </RNText>
                        ) : (
                          <Ionicons name="ellipse-outline" size={16} color={palette.inkMuted} />
                        )}
                      </Tap>
                    );
                  })}
                </View>
                <RNText style={styles.pollTotal} maxFontSizeMultiplier={1.1}>
                  {compact(p.totalVotes)} VOTES{voted ? ' · you voted' : ' · tap to vote'}
                </RNText>
              </View>
            );
          })}
        </Section>
      )}

      {/* Primary CTA — context-aware */}
      <Tap
        onPress={() => (tab === 'QUESTIONS' ? setAskOpen(true) : setPollOpen(true))}
        style={styles.cta}
        burstColor={palette.bone}
      >
        <RNText style={styles.ctaLabel}>{tab === 'QUESTIONS' ? 'ASK A QUESTION' : '+ NEW POLL'}</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="add" size={18} color={palette.ink} />
        </View>
      </Tap>

      {/* ANSWER sheet */}
      <Sheet visible={!!answerFor} onClose={() => setAnswerFor(null)} eyebrow="YOUR ANSWER" title="help them out.">
        <RNText style={styles.sheetQ} numberOfLines={3}>{answerFor?.question}</RNText>
        <TextInput
          value={answerText}
          onChangeText={setAnswerText}
          placeholder="Type what you'd tell them…"
          placeholderTextColor={palette.inkMuted}
          style={styles.input}
          multiline
          maxFontSizeMultiplier={1.2}
        />
        <Pressable onPress={submitAnswer} style={[styles.sheetBtn, !answerText.trim() && styles.sheetBtnOff]}>
          <RNText style={styles.sheetBtnText}>POST ANSWER</RNText>
        </Pressable>
      </Sheet>

      {/* ASK sheet */}
      <Sheet visible={askOpen} onClose={() => setAskOpen(false)} eyebrow="NEW QUESTION" title="ask the room.">
        <TextInput
          value={askText}
          onChangeText={setAskText}
          placeholder="What do you want to know?"
          placeholderTextColor={palette.inkMuted}
          style={styles.input}
          multiline
          maxFontSizeMultiplier={1.2}
        />
        <Pressable onPress={submitAsk} style={[styles.sheetBtn, !askText.trim() && styles.sheetBtnOff]}>
          <RNText style={styles.sheetBtnText}>POST QUESTION</RNText>
        </Pressable>
      </Sheet>

      {/* NEW POLL sheet */}
      <Sheet visible={pollOpen} onClose={() => setPollOpen(false)} eyebrow="NEW POLL" title="put it to a vote.">
        <TextInput
          value={pollQ}
          onChangeText={setPollQ}
          placeholder="Poll question"
          placeholderTextColor={palette.inkMuted}
          style={styles.input}
          maxFontSizeMultiplier={1.2}
        />
        <TextInput
          value={pollA}
          onChangeText={setPollA}
          placeholder="Option one"
          placeholderTextColor={palette.inkMuted}
          style={styles.inputSlim}
          maxFontSizeMultiplier={1.2}
        />
        <TextInput
          value={pollB}
          onChangeText={setPollB}
          placeholder="Option two"
          placeholderTextColor={palette.inkMuted}
          style={styles.inputSlim}
          maxFontSizeMultiplier={1.2}
        />
        <Pressable
          onPress={submitPoll}
          style={[styles.sheetBtn, (!pollQ.trim() || !pollA.trim() || !pollB.trim()) && styles.sheetBtnOff]}
        >
          <RNText style={styles.sheetBtnText}>POST POLL</RNText>
        </Pressable>
      </Sheet>
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
    sub: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 14, maxWidth: 340 },

    tabs: { flexDirection: 'row', gap: 8, marginTop: 18 },

    /* Questions */
    qaRow: {
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      marginBottom: 8,
      gap: 12,
    },
    qaTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    qMark: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: palette.acid,
      alignItems: 'center',
      justifyContent: 'center',
    },
    qMarkLabel: { fontFamily: fonts.displayBold, color: staticPalette.ink, fontSize: 14 },
    qaQuestion: { fontFamily: fonts.displayHeavy, fontSize: 15, lineHeight: 20, color: palette.ink, letterSpacing: -0.2 },
    qaMeta: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 6 },
    answerBtn: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 7,
      paddingHorizontal: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    answerBtnLabel: { ...T.label, color: palette.ink, letterSpacing: 1.6, fontSize: 10 },

    /* Polls */
    pollCard: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 18,
      padding: 16,
      backgroundColor: palette.paper,
      marginBottom: 10,
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
      paddingVertical: 13,
      paddingHorizontal: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    pollFill: { position: 'absolute', left: 0, top: 0, bottom: 0 },
    pollOptionLabel: { ...T.label, color: palette.ink, letterSpacing: 1.2, flex: 1, marginRight: 10 },
    pollOptionPct: { fontFamily: fonts.displayBold, fontSize: 14, color: palette.ink },
    pollTotal: { ...T.micro, color: palette.ink, opacity: 0.55, letterSpacing: 1.2, marginTop: 12 },

    /* CTA */
    cta: {
      marginTop: 24,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* Sheets */
    sheetQ: {
      fontFamily: fonts.displayHeavy,
      fontSize: 16,
      lineHeight: 21,
      color: palette.ink,
      letterSpacing: -0.3,
      marginBottom: 14,
    },
    input: {
      minHeight: 96,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 14,
      ...T.body,
      color: palette.ink,
      textAlignVertical: 'top',
    },
    inputSlim: {
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 14,
      marginTop: 10,
      ...T.body,
      color: palette.ink,
    },
    sheetBtn: {
      marginTop: 16,
      height: 54,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetBtnOff: { opacity: 0.4 },
    sheetBtnText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2, color: palette.bone },
  });
