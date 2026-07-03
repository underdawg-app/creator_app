import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, Switch } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { ListCell } from '@/components/ui/ListCell';
import { useStore } from '@/store';

type MsgFrom = 'EVERYONE' | 'FOLLOWERS' | 'VERIFIED';
type CommentFrom = 'EVERYONE' | 'FOLLOWERS' | 'NONE';

export default function Privacy() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const privacy = useStore((s) => s.settings.privacy);
  const update = useStore((s) => s.updateSetting);
  const toast = useStore((s) => s.toast);

  const [commentsFrom, setCommentsFrom] = useState<CommentFrom>('FOLLOWERS');

  const toggles: { key: keyof typeof privacy; label: string; desc: string }[] = [
    { key: 'profilePublic', label: 'PUBLIC PROFILE', desc: 'Anyone can view your profile.' },
    { key: 'activityStatus', label: 'ACTIVITY STATUS', desc: 'Show when you are online.' },
    { key: 'readReceipts', label: 'READ RECEIPTS', desc: 'Show when you read a message.' },
    { key: 'showInSearch', label: 'SHOW IN SEARCH', desc: 'Appear in handle search.' },
    { key: 'hideFollowerCount', label: 'HIDE FOLLOWER COUNT', desc: 'Hide the number from others.' },
  ];

  const msgOpts: MsgFrom[] = ['EVERYONE', 'FOLLOWERS', 'VERIFIED'];
  const commentOpts: CommentFrom[] = ['EVERYONE', 'FOLLOWERS', 'NONE'];
  const allowMessagesFrom = privacy.allowMessagesFrom as MsgFrom;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="SETTINGS · PRIVACY" title="PRIVACY" />} waves={false}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        who sees you.
      </RNText>

      <Section eyebrow="VISIBILITY">
        {toggles.map((r) => (
          <View key={r.key} style={styles.row}>
            <View style={styles.rowText}>
              <RNText style={styles.key} maxFontSizeMultiplier={1.15}>
                {r.label}
              </RNText>
              <RNText style={styles.desc} maxFontSizeMultiplier={1.2}>
                {r.desc}
              </RNText>
            </View>
            <Switch
              value={privacy[r.key] as boolean}
              onValueChange={(v) => update('privacy', { [r.key]: v } as any)}
              trackColor={{ false: palette.line, true: palette.acid }}
              thumbColor={palette.ink}
            />
          </View>
        ))}
      </Section>

      <Section eyebrow="ALLOW MESSAGES FROM">
        <View style={styles.chips}>
          {msgOpts.map((opt) => (
            <Chip
              key={opt}
              label={opt}
              active={allowMessagesFrom === opt}
              onPress={() => {
                update('privacy', { allowMessagesFrom: opt } as any);
                toast(`Messages: ${opt.toLowerCase()}.`, 'success');
              }}
            />
          ))}
        </View>
      </Section>

      <Section eyebrow="ALLOW COMMENTS FROM">
        <View style={styles.chips}>
          {commentOpts.map((opt) => (
            <Chip
              key={opt}
              label={opt}
              active={commentsFrom === opt}
              accent={palette.electric}
              onPress={() => {
                setCommentsFrom(opt);
                toast(`Comments: ${opt.toLowerCase()}.`, 'success');
              }}
            />
          ))}
        </View>
      </Section>

      <Section eyebrow="MORE">
        <ListCell
          icon="ban-outline"
          title="Blocked & muted"
          subtitle="Manage who can't reach you"
          onPress={() => router.push('/(modules)/settings/blocked')}
        />
        <ListCell
          icon="cloud-upload-outline"
          title="Download my data"
          subtitle="A copy of your account, emailed"
          onPress={() => toast('Export queued — emailed within 24h.', 'success')}
        />
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 44,
    lineHeight: 42,
    letterSpacing: -2,
    color: palette.ink,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 14,
  },
  rowText: { flex: 1 },
  key: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.8, color: palette.ink, textTransform: 'uppercase' },
  desc: { ...T.small, color: palette.mute, marginTop: 4, maxWidth: 260 },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 4,
  },
});
