import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { dealsSeed } from '@/data/mock';

type Msg = { from: 'them' | 'me'; body: string; ts: string };

function formatINR(n: number) {
  if (!n) return 'TBD';
  if (n >= 1000) return `₹${Math.round(n / 1000)}K`;
  return `₹${n}`;
}

function clockNow() {
  const d = new Date();
  const h = d.getHours() % 12 || 12;
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
}

export default function GigNegotiation() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const deals = useStore((s) => s.deals);
  const params = useLocalSearchParams();

  // Default to the NEGOTIATING deal (COPPERLEAF) if no param.
  const deal = useMemo(() => {
    const fromParam = params.dealId
      ? deals.find((d) => d.id === params.dealId) ??
        dealsSeed.find((d) => d.id === params.dealId)
      : undefined;
    return (
      fromParam ??
      deals.find((d) => d.status === 'NEGOTIATING') ??
      dealsSeed.find((d) => d.status === 'NEGOTIATING') ??
      dealsSeed[1]
    );
  }, [params.dealId, deals]);

  const myAsk = 60_000;
  const [rate, setRate] = useState(myAsk);
  const [deliverables, setDeliverables] = useState('3 reels · 4 stories');
  const [timeline, setTimeline] = useState('3 weeks · 1 revision');
  const [usage] = useState('Organic only · 30 days');

  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [walkOpen, setWalkOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const [chat, setChat] = useState<Msg[]>([
    { from: 'them', body: `Hey! We loved your work. Budget for ${deal.brand} is around ₹40K for the package.`, ts: '10:02 AM' },
    { from: 'me', body: `Appreciate it. My rate card for 3 reels + stories sits at ₹60K. Crediting and organic usage included.`, ts: '10:08 AM' },
    { from: 'them', body: `Understood. Can we meet at ₹48K? We can be flexible on the timeline.`, ts: '10:15 AM' },
  ]);

  function pushMsg(m: Msg) {
    setChat((prev) => [...prev, m]);
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }

  function brandReply(body: string, newRate?: number) {
    setPending(true);
    setTimeout(() => {
      pushMsg({ from: 'them', body, ts: clockNow() });
      if (newRate != null) setRate(newRate);
      setPending(false);
    }, 1100);
  }

  function send(body: string) {
    const text = body.trim();
    if (!text) return;
    pushMsg({ from: 'me', body: text, ts: clockNow() });
    setDraft('');
    // Brand nudges the rate up toward the midpoint after every message.
    const next = Math.min(myAsk, Math.round((rate + myAsk) / 2 / 1000) * 1000);
    brandReply(`Let me check with the team… we can do ${formatINR(next)}. Deal?`, next);
  }

  const quick = [
    {
      label: `Counter ${formatINR(myAsk)}`,
      run: () => {
        pushMsg({ from: 'me', body: `Let's land at ${formatINR(myAsk)} flat for the full package. Final offer.`, ts: clockNow() });
        brandReply(`Okay — ${formatINR(myAsk)} works. Sending the brief over.`, myAsk);
      },
    },
    {
      label: 'Accept counter',
      run: () => {
        pushMsg({ from: 'me', body: `${formatINR(rate)} works for me. Let's lock it in.`, ts: clockNow() });
        brandReply(`Amazing. Moving you to contract now.`);
        toast(`Rate locked at ${formatINR(rate)}.`, 'success');
      },
    },
    {
      label: 'Ask scope',
      run: () => {
        pushMsg({ from: 'me', body: `Quick one — does the package include stories, or just the reels?`, ts: clockNow() });
        setDeliverables('3 reels · 4 stories · 1 photo');
        brandReply(`Add a hero photo too — updated the deliverables on my end.`);
      },
    },
    {
      label: 'Adjust timeline',
      run: () => {
        pushMsg({ from: 'me', body: `I'll need ~3 weeks with one revision round built in.`, ts: clockNow() });
        setTimeline('3 weeks · 2 revisions');
        brandReply(`No problem, 3 weeks with revisions is fine.`);
      },
    },
  ];

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="GIG · NEGOTIATION" title={deal.brand} />}
      waves={false}
      footer={
        <View style={styles.footer}>
          <View style={styles.quickRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickScroll}
            >
              {quick.map((q) => (
                <Chip key={q.label} label={q.label} size="sm" onPress={q.run} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.composer}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Message the brand…"
              placeholderTextColor={palette.mute}
              style={styles.input}
              selectionColor={palette.acid}
              onSubmitEditing={() => send(draft)}
              returnKeyType="send"
            />
            <Pressable
              onPress={() => send(draft)}
              style={[styles.sendBtn, !draft.trim() && styles.sendBtnOff]}
              hitSlop={6}
            >
              <Ionicons name="send" size={16} color={palette.bone} />
            </Pressable>
          </View>

          <View style={styles.ctaRow}>
            <Pressable
              onPress={() => setWalkOpen(true)}
              style={styles.walkBtn}
            >
              <RNText style={styles.walkLabel}>WALK AWAY</RNText>
            </Pressable>
            <Pressable
              onPress={() => {
                toast(`Terms agreed at ${formatINR(rate)}.`, 'success');
                router.push('/(modules)/jobs/contract');
              }}
              style={styles.contractBtn}
            >
              <RNText style={styles.contractLabel}>MOVE TO CONTRACT</RNText>
              <View style={styles.arrowChip}>
                <Ionicons name="arrow-forward" size={14} color={palette.ink} />
              </View>
            </Pressable>
          </View>
        </View>
      }
    >
      <RNText style={styles.title}>let's talk{'\n'}numbers.</RNText>

      {/* Running terms */}
      <Section eyebrow="RUNNING TERMS">
        <View style={styles.termsCard}>
          <View style={styles.rateRow}>
            <View>
              <RNText style={styles.termLabel}>RATE</RNText>
              <RNText style={styles.rateValue}>{formatINR(rate)}</RNText>
            </View>
            <View style={styles.rateEdit}>
              <RNText style={styles.rateEditPrefix}>₹</RNText>
              <TextInput
                value={String(rate)}
                onChangeText={(t) => {
                  const n = parseInt(t.replace(/[^0-9]/g, ''), 10);
                  setRate(Number.isFinite(n) ? n : 0);
                }}
                keyboardType="number-pad"
                style={styles.rateInput}
                selectionColor={palette.acid}
              />
              <Ionicons name="pencil" size={13} color={palette.mute} />
            </View>
          </View>

          <View style={styles.termDivider} />
          <TermRow icon="image-outline" label="DELIVERABLES" value={deliverables} styles={styles} palette={palette} />
          <TermRow icon="time-outline" label="TIMELINE" value={timeline} styles={styles} palette={palette} />
          <TermRow icon="shield-checkmark-outline" label="USAGE RIGHTS" value={usage} styles={styles} palette={palette} />
        </View>
      </Section>

      {/* Transcript */}
      <Section eyebrow="TRANSCRIPT">
        <ScrollView
          ref={scrollRef}
          style={styles.chatScroll}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {chat.map((m, i) => (
            <View
              key={i}
              style={[styles.bubbleWrap, m.from === 'me' ? styles.bubbleWrapMe : styles.bubbleWrapThem]}
            >
              <View style={[styles.bubble, m.from === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
                <RNText style={[styles.bubbleText, m.from === 'me' && styles.bubbleTextMe]}>
                  {m.body}
                </RNText>
              </View>
              <RNText style={styles.bubbleTs}>{m.ts}</RNText>
            </View>
          ))}
          {pending ? (
            <View style={[styles.bubbleWrap, styles.bubbleWrapThem]}>
              <View style={[styles.bubble, styles.bubbleThem]}>
                <RNText style={styles.typingText}>{deal.brand} is typing…</RNText>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </Section>

      <Sheet
        visible={walkOpen}
        onClose={() => setWalkOpen(false)}
        eyebrow="CONFIRM"
        title="Walk away?"
      >
        <RNText style={styles.sheetBody}>
          This pauses the {deal.brand} negotiation. You can always re-open it from My Deals.
        </RNText>
        <Pressable
          onPress={() => {
            setWalkOpen(false);
            toast(`Walked away from ${deal.brand}.`, 'default');
            router.back();
          }}
          style={styles.sheetConfirm}
        >
          <RNText style={styles.sheetConfirmLabel}>WALK AWAY</RNText>
        </Pressable>
        <Pressable onPress={() => setWalkOpen(false)} style={styles.sheetCancel}>
          <RNText style={styles.sheetCancelLabel}>KEEP NEGOTIATING</RNText>
        </Pressable>
      </Sheet>
    </ScreenFrame>
  );
}

function TermRow({
  icon,
  label,
  value,
  styles,
  palette,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
  styles: ReturnType<typeof makeStyles>;
  palette: typeof staticPalette;
}) {
  return (
    <View style={styles.termRow}>
      <Ionicons name={icon} size={15} color={palette.mute} />
      <RNText style={styles.termRowLabel}>{label}</RNText>
      <RNText style={styles.termRowValue} numberOfLines={1}>
        {value}
      </RNText>
    </View>
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
      marginBottom: 6,
    },

    /* ── Running terms ── */
    termsCard: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
    },
    rateRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    termLabel: { ...T.label, color: palette.ink, opacity: 0.55 },
    rateValue: {
      fontFamily: fonts.displayBold,
      fontSize: 32,
      letterSpacing: -1,
      color: palette.ink,
      marginTop: 2,
    },
    rateEdit: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 12,
      height: 40,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    rateEditPrefix: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      color: palette.mute,
    },
    rateInput: {
      minWidth: 56,
      fontFamily: fonts.bodyBold,
      fontSize: 15,
      color: palette.ink,
      padding: 0,
      includeFontPadding: false,
    },
    termDivider: {
      height: 1,
      backgroundColor: palette.line,
      marginVertical: 14,
    },
    termRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 7,
    },
    termRowLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.2,
      color: palette.ink,
      opacity: 0.55,
      width: 96,
    },
    termRowValue: {
      flex: 1,
      ...T.body,
      fontSize: 13,
      color: palette.ink,
      textAlign: 'right',
    },

    /* ── Chat ── */
    chatScroll: {
      maxHeight: 280,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    chatContent: { padding: 12, gap: 4 },
    bubbleWrap: { maxWidth: '84%', marginVertical: 5 },
    bubbleWrapMe: { alignSelf: 'flex-end', alignItems: 'flex-end' },
    bubbleWrapThem: { alignSelf: 'flex-start', alignItems: 'flex-start' },
    bubble: {
      paddingHorizontal: 13,
      paddingVertical: 10,
      borderRadius: 16,
    },
    bubbleThem: {
      backgroundColor: palette.paper,
      borderWidth: 1,
      borderColor: palette.line,
      borderTopLeftRadius: 4,
    },
    bubbleMe: {
      backgroundColor: palette.ink,
      borderTopRightRadius: 4,
    },
    bubbleText: {
      ...T.body,
      fontSize: 13.5,
      lineHeight: 19,
      color: palette.ink,
    },
    bubbleTextMe: { color: palette.bone },
    bubbleTs: {
      ...T.micro,
      color: palette.ink,
      opacity: 0.4,
      marginTop: 3,
      marginHorizontal: 4,
    },
    typingText: {
      ...T.body,
      fontSize: 13,
      color: palette.mute,
      fontStyle: 'italic',
    },

    /* ── Footer ── */
    footer: {
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 14,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      backgroundColor: palette.bone,
      gap: 10,
    },
    quickRow: {},
    quickScroll: { gap: 8, paddingRight: 12 },
    composer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    input: {
      flex: 1,
      height: 46,
      paddingHorizontal: 16,
      borderRadius: 23,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      fontFamily: fonts.body,
      fontSize: 14,
      color: palette.ink,
      includeFontPadding: false,
    },
    sendBtn: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendBtnOff: { opacity: 0.4 },

    ctaRow: { flexDirection: 'row', gap: 8 },
    walkBtn: {
      paddingHorizontal: 18,
      height: 54,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    walkLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.6,
      color: palette.ink,
    },
    contractBtn: {
      flex: 1,
      height: 54,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingHorizontal: 16,
    },
    contractLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.6,
      color: palette.bone,
    },
    arrowChip: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* ── Sheet ── */
    sheetBody: {
      ...T.body,
      color: palette.ink,
      opacity: 0.75,
      lineHeight: 20,
      marginBottom: 18,
    },
    sheetConfirm: {
      height: 54,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    sheetConfirmLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.6,
      color: palette.bone,
    },
    sheetCancel: {
      height: 48,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetCancelLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.6,
      color: palette.ink,
      opacity: 0.6,
    },
  });
