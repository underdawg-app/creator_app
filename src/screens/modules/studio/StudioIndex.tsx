import React from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { ListCell } from '@/components/ui/ListCell';
import { Section } from '@/components/ui/Section';
import { useStore } from '@/store';

export default function StudioHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const drafts = useStore((s) => s.drafts);
  const scheduled = useStore((s) => s.scheduled);
  const published = useStore((s) => s.published);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MODULE · 03" title="CONTENT STUDIO" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        write it.<RNText style={styles.italic}>{'\n'}film it. post it.</RNText>
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        One composer. Every format. Cross-post, schedule, and draft without leaving the tool.
      </RNText>

      <View style={styles.metricsRow}>
        <StatPill
          value={drafts.length}
          label="DRAFTS"
          color={palette.acid}
          onPress={() => router.push('/(modules)/studio/drafts')}
        />
        <StatPill
          value={scheduled.length}
          label="SCHEDULED"
          color={palette.electric}
          onPress={() => router.push('/(modules)/studio/schedule')}
        />
        <StatPill
          value={published.length}
          label="PUBLISHED"
          color={palette.blush}
          onPress={() => router.push('/(modules)/studio/drafts')}
        />
      </View>

      <Section eyebrow="COMPOSE" title="start something.">
        <ListCell
          icon="image-outline"
          title="Image composer"
          subtitle="Single or carousel · up to 10 images"
          onPress={() => router.push('/(modules)/studio/image-composer')}
        />
        <ListCell
          icon="videocam-outline"
          title="Video composer"
          subtitle="Short-form or long-form"
          onPress={() => router.push('/(modules)/studio/video-composer')}
        />
        <ListCell
          icon="document-text-outline"
          title="Text / audio composer"
          subtitle="Essays, poems, voice notes"
          onPress={() => router.push('/(modules)/studio/text-composer')}
        />
      </Section>

      <Section eyebrow="MANAGE">
        <ListCell
          icon="document-outline"
          title="Drafts"
          subtitle={`${drafts.length} in progress`}
          onPress={() => router.push('/(modules)/studio/drafts')}
        />
        <ListCell
          icon="time-outline"
          title="Scheduled queue"
          subtitle={`${scheduled.length} posts lined up`}
          onPress={() => router.push('/(modules)/studio/schedule')}
        />
        <ListCell
          icon="checkmark-done-outline"
          title="Published"
          subtitle={`${published.length} live on your feed`}
          onPress={() => router.push('/(modules)/studio/drafts')}
        />
      </Section>
    </ScreenFrame>
  );
}

/**
 * Compact horizontal stat pill — replaces the old tall MetricCards. Renders
 * the value next to its label on a single inline row, color-coded per metric.
 * Three of these fit comfortably on any phone width without wrapping.
 */
function StatPill({
  value,
  label,
  color,
  onPress,
}: {
  value: number;
  label: string;
  color: string;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(10,10,10,0.12)', borderless: false }}
      unstable_pressDelay={0}
      style={[styles.pill, { borderColor: color }]}
    >
      <View style={[styles.pillDot, { backgroundColor: color }]} />
      <RNText
        style={[styles.pillValue, { color: palette.ink }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {value}
      </RNText>
      <RNText
        style={[styles.pillLabel, { color: palette.ink }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {label}
      </RNText>
    </Pressable>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 54,
    lineHeight: 52,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  body: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 14, maxWidth: 360 },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 22,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1.5,
    backgroundColor: palette.paper,
    minHeight: 44,
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pillValue: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    letterSpacing: -0.6,
    flexShrink: 0,
  },
  pillLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    opacity: 0.7,
    flexShrink: 1,
  },
});
