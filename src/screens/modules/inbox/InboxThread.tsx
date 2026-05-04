import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tap } from '@/components/ui/Tap';
import { BadgePill } from '@/components/ui/BadgePill';
import { useStore } from '@/store';

export default function ThreadDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const thread = useStore((s) => s.threads.find((t) => t.id === id));
  const sendMessage = useStore((s) => s.sendMessage);
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 50);
    return () => clearTimeout(t);
  }, [thread?.messages.length]);

  // Track the fake-reply timers so they get cancelled if the user navigates
  // away mid-conversation. Without this, a setState fires on an unmounted
  // component and React logs a warning.
  const replyTimers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  useEffect(() => () => {
    replyTimers.current.forEach((t) => clearTimeout(t));
    replyTimers.current = [];
  }, []);

  if (!thread) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: palette.bone }}>
        <View style={{ padding: 24 }}>
          <ModuleHeader eyebrow="INBOX" title="NOT FOUND" />
          <RNText style={{ ...T.body, color: palette.ink, opacity: 0.7 }}>
            That thread is gone.
          </RNText>
        </View>
      </SafeAreaView>
    );
  }

  const send = () => {
    const body = text.trim();
    if (!body) return;
    sendMessage(thread.id, body);
    setText('');
    // fake reply — track both nested timers so unmount cancels them.
    const outer = setTimeout(() => {
      sendMessage(thread.id, '…');
      const inner = setTimeout(() => {
        useStore.setState((s) => ({
          threads: s.threads.map((t) =>
            t.id === thread.id
              ? {
                  ...t,
                  messages: [
                    ...t.messages.slice(0, -1),
                    { from: 'them', body: 'got it — reading now.', ts: 'now' },
                  ],
                }
              : t
          ),
        }));
      }, 900);
      replyTimers.current.push(inner);
    }, 1100);
    replyTimers.current.push(outer);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: palette.bone }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 24 }}>
        <ModuleHeader
          eyebrow={thread.kind}
          title={thread.name}
          right={<BadgePill label={thread.kind} accent={thread.accent} />}
        />
      </SafeAreaView>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {thread.messages.map((m, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              m.from === 'me' ? styles.me : styles.them,
              m.from === 'me' && { backgroundColor: thread.accent },
            ]}
          >
            <RNText
              style={[
                styles.bubbleText,
                m.from === 'me' && { color: palette.ink },
              ]}
              maxFontSizeMultiplier={1.2}
            >
              {m.body}
            </RNText>
            <RNText
              style={[
                styles.bubbleTs,
                m.from === 'me' && { color: palette.ink, opacity: 0.55 },
              ]}
            >
              {m.ts}
            </RNText>
          </View>
        ))}
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="say something honest."
            placeholderTextColor={palette.mute}
            multiline
            maxFontSizeMultiplier={1.2}
          />
          <Tap onPress={send} style={styles.sendBtn} burstColor={thread.accent} variant="heavy">
            <Ionicons name="arrow-up" size={20} color={palette.bone} />
          </Tap>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  bubble: {
    maxWidth: '82%',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  them: {
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.line,
    alignSelf: 'flex-start',
  },
  me: { alignSelf: 'flex-end' },
  bubbleText: { fontFamily: fonts.body, fontSize: 15, color: staticPalette.ink, lineHeight: 21 },
  bubbleTs: { ...T.micro, color: staticPalette.ink, opacity: 0.45, marginTop: 4 },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 8,
    borderRadius: 24,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.line,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 15,
    color: palette.ink,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
