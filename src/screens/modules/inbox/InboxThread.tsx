import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { fonts, type as T } from '@/theme/typography';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BG = staticPalette.ink;
const SURFACE = staticPalette.inkSoft;
const SURFACE_HI = staticPalette.inkMuted;
const FG = staticPalette.bone;
const MUTE = 'rgba(242,239,230,0.55)';
const HAIRLINE = 'rgba(242,239,230,0.08)';
const ACID = staticPalette.acid;

const REPLY_POOL: Record<
  'PRIMARY' | 'REQUEST' | 'COLLAB' | 'DEAL',
  string[]
> = {
  PRIMARY: [
    'haha that\'s sick',
    'send it over when you have a sec',
    'oh nice — when did you make that?',
    'lmk what you think honestly',
    'okay yeah let\'s go with that',
  ],
  REQUEST: [
    'hey thanks for reaching out — let me see this week.',
    'budget is tight but interested. what are you thinking?',
    'we usually move slow on these. is there a deadline?',
    'send the brief and i\'ll review.',
  ],
  COLLAB: [
    'down to brainstorm. what\'s the angle?',
    'okay i\'m in if dates line up.',
    'love it. let\'s shape it on a call.',
    'got pieces that could fit — sending refs.',
  ],
  DEAL: [
    'noted. our team will circle back with notes.',
    'contract is ready when you are.',
    'love the cut. one small note coming on the audio.',
    'green-lit on our end. invoice us when ready.',
  ],
};

function pickReply(kind: 'PRIMARY' | 'REQUEST' | 'COLLAB' | 'DEAL') {
  const pool = REPLY_POOL[kind] || REPLY_POOL.PRIMARY;
  return pool[Math.floor(Math.random() * pool.length)];
}

function readableOn(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma < 145 ? staticPalette.bone : staticPalette.ink;
}

export default function ThreadDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const thread = useStore((s) => s.threads.find((t) => t.id === id));
  const sendMessage = useStore((s) => s.sendMessage);
  const receiveMessage = useStore((s) => s.receiveMessage);
  const setTyping = useStore((s) => s.setTyping);
  const markRead = useStore((s) => s.markThreadRead);
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const insets = useSafeAreaInsets();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvt, () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener(hideEvt, () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (id) markRead(id);
  }, [id, markRead]);

  useEffect(() => {
    const t = setTimeout(
      () => scrollRef.current?.scrollToEnd({ animated: true }),
      60,
    );
    return () => clearTimeout(t);
  }, [thread?.messages.length, thread?.typing]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
      if (thread?.typing && id) setTyping(id, false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!thread) {
    return (
      <View style={{ flex: 1, backgroundColor: BG }}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.notFoundWrap}>
          <RNText style={styles.notFoundTitle}>Thread not found</RNText>
          <RNText style={styles.notFoundBody}>
            That conversation isn&apos;t here anymore.
          </RNText>
        </SafeAreaView>
      </View>
    );
  }

  const send = () => {
    const body = text.trim();
    if (!body) return;
    sendMessage(thread.id, body);
    setText('');

    const typingDelay = 700 + Math.random() * 700;
    const replyDelay = 1200 + Math.random() * 1400;

    const typingTimer = setTimeout(() => setTyping(thread.id, true), typingDelay);
    const replyTimer = setTimeout(() => {
      receiveMessage(thread.id, pickReply(thread.kind));
    }, typingDelay + replyDelay);

    timers.current.push(typingTimer, replyTimer);
  };

  const initial = thread.name.trim().charAt(0).toUpperCase() || '?';
  const avatarFg = readableOn(thread.accent);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: BG }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView edges={['top']}>
        <View style={styles.header}>
          <Tap onPress={() => router.back()} style={styles.iconBtn} burstColor={FG}>
            <Ionicons name="chevron-back" size={24} color={FG} />
          </Tap>

          <View style={[styles.avatar, { backgroundColor: thread.accent }]}>
            <RNText style={[styles.avatarText, { color: avatarFg }]}>
              {initial}
            </RNText>
            {thread.verified ? (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={9} color={BG} />
              </View>
            ) : null}
          </View>

          <View style={{ flex: 1 }}>
            <RNText style={styles.name} numberOfLines={1}>
              {thread.name}
            </RNText>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <RNText style={styles.statusText}>
                {thread.typing ? 'typing…' : 'Active now'}
              </RNText>
            </View>
          </View>

          <Tap onPress={() => {}} style={styles.iconBtn} burstColor={FG}>
            <Ionicons name="ellipsis-horizontal" size={20} color={FG} />
          </Tap>
        </View>
      </SafeAreaView>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.dateChip}>
          <RNText style={styles.dateChipText}>Today</RNText>
        </View>

        {thread.messages.map((m, i) => {
          const isMe = m.from === 'me';
          const prev = thread.messages[i - 1];
          const next = thread.messages[i + 1];
          const startsGroup = !prev || prev.from !== m.from;
          const endsGroup = !next || next.from !== m.from;
          return (
            <View
              key={i}
              style={[
                styles.bubbleRow,
                isMe ? styles.bubbleRowMe : styles.bubbleRowThem,
                { marginTop: startsGroup ? 14 : 2 },
              ]}
            >
              {!isMe ? (
                <View style={styles.themAvatarSlot}>
                  {endsGroup ? (
                    <View
                      style={[
                        styles.themAvatar,
                        { backgroundColor: thread.accent },
                      ]}
                    >
                      <RNText
                        style={[
                          styles.themAvatarText,
                          { color: avatarFg },
                        ]}
                      >
                        {initial}
                      </RNText>
                    </View>
                  ) : null}
                </View>
              ) : null}

              <View
                style={[
                  styles.bubbleColumn,
                  isMe ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' },
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isMe
                      ? [styles.bubbleMe, { backgroundColor: ACID }]
                      : [styles.bubbleThem, { backgroundColor: SURFACE }],
                    isMe
                      ? {
                          borderBottomRightRadius: endsGroup ? 6 : 18,
                          borderTopRightRadius: startsGroup ? 18 : 6,
                        }
                      : {
                          borderBottomLeftRadius: endsGroup ? 6 : 18,
                          borderTopLeftRadius: startsGroup ? 18 : 6,
                        },
                  ]}
                >
                  <RNText
                    style={[
                      styles.bubbleText,
                      { color: isMe ? BG : FG },
                    ]}
                    maxFontSizeMultiplier={1.2}
                  >
                    {m.body}
                  </RNText>
                </View>
                {endsGroup ? (
                  <RNText style={styles.ts}>{m.ts}</RNText>
                ) : null}
              </View>
            </View>
          );
        })}

        {thread.typing ? (
          <TypingBubble accent={thread.accent} initial={initial} avatarFg={avatarFg} />
        ) : null}
      </ScrollView>

      <View
        style={[
          styles.composerSafe,
          { paddingBottom: keyboardOpen ? 6 : Math.max(insets.bottom, 8) },
        ]}
      >
        <View style={styles.composer}>
          <Tap
            onPress={() => router.push('/(modules)/camera' as any)}
            style={styles.composerIconBtn}
            burstColor={ACID}
          >
            <Ionicons name="camera-outline" size={22} color={FG} />
          </Tap>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="message…"
            placeholderTextColor={MUTE}
            multiline
            maxFontSizeMultiplier={1.2}
            selectionColor={ACID}
          />
          <Tap
            onPress={send}
            style={[
              styles.sendBtn,
              { backgroundColor: text.trim() ? ACID : SURFACE_HI },
            ]}
            burstColor={ACID}
            disabled={!text.trim()}
          >
            <Ionicons
              name="arrow-up"
              size={20}
              color={text.trim() ? BG : MUTE}
            />
          </Tap>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function TypingBubble({
  accent,
  initial,
  avatarFg,
}: {
  accent: string;
  initial: string;
  avatarFg: string;
}) {
  return (
    <View style={[styles.bubbleRow, styles.bubbleRowThem, { marginTop: 14 }]}>
      <View style={styles.themAvatarSlot}>
        <View style={[styles.themAvatar, { backgroundColor: accent }]}>
          <RNText style={[styles.themAvatarText, { color: avatarFg }]}>
            {initial}
          </RNText>
        </View>
      </View>
      <View style={styles.bubbleColumn}>
        <View
          style={[
            styles.bubble,
            styles.bubbleThem,
            {
              backgroundColor: SURFACE,
              flexDirection: 'row',
              gap: 5,
              paddingVertical: 12,
              paddingHorizontal: 14,
              borderTopLeftRadius: 18,
              borderBottomLeftRadius: 6,
            },
          ]}
        >
          <Dot delay={0} />
          <Dot delay={180} />
          <Dot delay={360} />
        </View>
      </View>
    </View>
  );
}

function Dot({ delay }: { delay: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    const id = setTimeout(() => {
      t.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 380, easing: Easing.out(Easing.quad) }),
          withTiming(0, { duration: 380, easing: Easing.in(Easing.quad) }),
          withTiming(0, { duration: 240 }),
        ),
        -1,
        false,
      );
    }, delay);
    return () => clearTimeout(id);
  }, [delay, t]);

  const style = useAnimatedStyle(() => ({
    opacity: 0.35 + t.value * 0.6,
    transform: [{ translateY: -t.value * 3 }],
  }));

  return (
    <Animated.View
      style={[
        { width: 6, height: 6, borderRadius: 3, backgroundColor: FG },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: HAIRLINE,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    letterSpacing: -0.4,
  },
  verifiedBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FG,
    borderWidth: 2,
    borderColor: BG,
  },
  name: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: FG,
    letterSpacing: -0.3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACID,
  },
  statusText: {
    ...T.small,
    color: ACID,
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
  },

  scroll: {
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 14,
  },

  dateChip: {
    alignSelf: 'center',
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: SURFACE,
  },
  dateChipText: {
    ...T.small,
    color: MUTE,
    fontSize: 11,
    letterSpacing: 0.6,
  },

  bubbleRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  bubbleRowMe: { justifyContent: 'flex-end' },
  bubbleRowThem: { justifyContent: 'flex-start' },
  themAvatarSlot: {
    width: 28,
  },
  themAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themAvatarText: {
    fontFamily: fonts.displayBold,
    fontSize: 12,
    letterSpacing: -0.2,
  },
  bubbleColumn: { maxWidth: '78%' },
  bubble: {
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  bubbleMe: {},
  bubbleThem: {},
  bubbleText: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 20,
  },
  ts: {
    ...T.small,
    color: MUTE,
    fontSize: 11,
    marginTop: 4,
    paddingHorizontal: 4,
  },

  composerSafe: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: HAIRLINE,
    backgroundColor: BG,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  composerIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: SURFACE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontFamily: fonts.body,
    fontSize: 15,
    color: FG,
    backgroundColor: SURFACE,
    borderRadius: 22,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFoundWrap: {
    padding: 32,
    gap: 8,
    alignItems: 'flex-start',
  },
  notFoundTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: FG,
    letterSpacing: -0.6,
  },
  notFoundBody: {
    ...T.body,
    color: MUTE,
  },
});
