import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, TextInput } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';

const TARGET = { handle: 'kore.odu', name: 'KORE ODUSOLA' };

const TYPES = ['CONTENT COLLAB', 'GUEST APPEARANCE', 'JOINT PROJECT'] as const;
const TIMELINES = ['THIS WEEK', 'THIS MONTH', 'THIS QUARTER', 'FLEXIBLE'] as const;
const PLATFORMS = ['UNDERDAWG', 'INSTAGRAM', 'YOUTUBE', 'TIKTOK'] as const;
const SPLITS = ['50/50', '60/40', '70/30', 'CUSTOM'] as const;

export default function CollabSend() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const [type, setType] = useState<string | null>(null);
  const [idea, setIdea] = useState('');
  const [timeline, setTimeline] = useState<string>('FLEXIBLE');
  const [platforms, setPlatforms] = useState<string[]>(['UNDERDAWG']);
  const [split, setSplit] = useState<string>('50/50');
  const [customSplit, setCustomSplit] = useState('');
  const [message, setMessage] = useState('');

  const togglePlatform = (p: string) =>
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const canSend = !!type && idea.trim().length > 0;

  const send = () => {
    if (!canSend) {
      toast('Pick a type and an idea first.', 'warn');
      return;
    }
    confetti();
    toast(`Collab request sent to @${TARGET.handle}.`, 'success');
    router.back();
  };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="COLLAB" title="SEND REQUEST" showBack />}
      waves={false}
    >
      <RNText style={styles.title}>let's build something.</RNText>

      {/* Recipient */}
      <View style={styles.toCard}>
        <View style={styles.avatar}>
          <RNText style={styles.avatarText}>{TARGET.handle[0].toUpperCase()}</RNText>
        </View>
        <View style={{ flex: 1 }}>
          <RNText style={styles.toLabel}>TO</RNText>
          <RNText style={styles.toHandle}>@{TARGET.handle}</RNText>
        </View>
        <Pressable
          onPress={() => toast('Recipient picker coming soon.', 'default')}
          style={styles.changeBtn}
        >
          <RNText style={styles.changeText}>CHANGE</RNText>
        </Pressable>
      </View>

      {/* Type */}
      <Section eyebrow="TYPE">
        <View style={styles.chipWrap}>
          {TYPES.map((t) => (
            <Chip key={t} label={t} active={type === t} onPress={() => setType(t)} />
          ))}
        </View>
      </Section>

      {/* Idea */}
      <Section eyebrow="THE IDEA">
        <View style={styles.inputBox}>
          <TextInput
            value={idea}
            onChangeText={setIdea}
            placeholder="what do you want to make together?"
            placeholderTextColor={palette.inkMuted}
            style={styles.multiline}
            multiline
          />
        </View>
      </Section>

      {/* Timeline */}
      <Section eyebrow="TIMELINE">
        <View style={styles.chipWrap}>
          {TIMELINES.map((t) => (
            <Chip
              key={t}
              label={t}
              active={timeline === t}
              accent={palette.electric}
              onPress={() => setTimeline(t)}
            />
          ))}
        </View>
      </Section>

      {/* Platform */}
      <Section eyebrow="PLATFORM">
        <View style={styles.chipWrap}>
          {PLATFORMS.map((p) => (
            <Chip
              key={p}
              label={p}
              active={platforms.includes(p)}
              accent={palette.blush}
              onPress={() => togglePlatform(p)}
            />
          ))}
        </View>
      </Section>

      {/* Split */}
      <Section eyebrow="SPLIT">
        <View style={styles.chipWrap}>
          {SPLITS.map((s) => (
            <Chip key={s} label={s} active={split === s} onPress={() => setSplit(s)} />
          ))}
        </View>
        {split === 'CUSTOM' && (
          <View style={[styles.inputBox, styles.customBox]}>
            <TextInput
              value={customSplit}
              onChangeText={setCustomSplit}
              placeholder="e.g. 65 / 35 + credit"
              placeholderTextColor={palette.inkMuted}
              style={styles.singleline}
            />
          </View>
        )}
      </Section>

      {/* Message */}
      <Section eyebrow="PERSONAL NOTE">
        <View style={styles.inputBox}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="say something real…"
            placeholderTextColor={palette.inkMuted}
            style={styles.multiline}
            multiline
          />
        </View>
      </Section>

      {/* Send CTA */}
      <Tap
        onPress={send}
        disabled={!canSend}
        style={[styles.cta, !canSend && styles.ctaDisabled]}
        burstColor={palette.bone}
      >
        <RNText style={styles.ctaLabel}>SEND TO @{TARGET.handle.toUpperCase()}</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </View>
      </Tap>

      {!canSend && (
        <RNText style={styles.hint}>Pick a type and write an idea to send.</RNText>
      )}
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
      marginBottom: 18,
    },

    toCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: palette.ink,
      backgroundColor: palette.boneSoft,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      fontFamily: fonts.displayBold,
      fontSize: 20,
      color: palette.bone,
    },
    toLabel: { ...T.label, color: palette.ink, opacity: 0.5 },
    toHandle: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.4,
      color: palette.ink,
      marginTop: 2,
    },
    changeBtn: {
      paddingHorizontal: 12,
      height: 32,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    changeText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.6, color: palette.ink },

    chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

    inputBox: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    customBox: { marginTop: 10 },
    multiline: {
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 22,
      color: palette.ink,
      minHeight: 72,
      textAlignVertical: 'top',
    },
    singleline: {
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
    },

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
    ctaDisabled: { opacity: 0.4 },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    hint: {
      ...T.small,
      color: palette.inkMuted,
      textAlign: 'center',
      marginTop: 10,
    },
  });
