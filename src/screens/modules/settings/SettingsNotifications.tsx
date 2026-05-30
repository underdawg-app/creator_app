import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, Switch, Pressable } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

type StoreKey =
  | 'pushEnabled'
  | 'emailEnabled'
  | 'smsEnabled'
  | 'engagement'
  | 'messages'
  | 'deals'
  | 'orders'
  | 'community'
  | 'platform';

const FINE_TYPES = [
  'Likes',
  'Comments',
  'Mentions',
  'New follower',
  'Gig match',
  'Payment received',
  'Tips',
  'Challenge updates',
  'Milestones',
] as const;

const TIME_PRESETS = ['20:00', '21:00', '22:00', '23:00', '00:00', '06:00', '07:00', '08:00', '09:00'];

export default function NotificationsSettings() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const n = useStore((s) => s.settings.notifications);
  const update = useStore((s) => s.updateSetting);
  const toast = useStore((s) => s.toast);

  const [fine, setFine] = useState<Record<string, boolean>>(() =>
    FINE_TYPES.reduce((acc, t, i) => ({ ...acc, [t]: i < 6 }), {} as Record<string, boolean>),
  );
  const [quiet, setQuiet] = useState(false);
  const [from, setFrom] = useState('22:00');
  const [to, setTo] = useState('08:00');
  const [picking, setPicking] = useState<null | 'from' | 'to'>(null);

  const setStore = (key: StoreKey, v: boolean) => {
    update('notifications', { [key]: v } as any);
  };

  const delivery: { key: StoreKey; label: string; icon: any; accent: string }[] = [
    { key: 'pushEnabled', label: 'Push', icon: 'phone-portrait-outline', accent: palette.electric },
    { key: 'emailEnabled', label: 'Email', icon: 'mail-outline', accent: palette.electric },
    { key: 'smsEnabled', label: 'SMS', icon: 'chatbubble-ellipses-outline', accent: palette.electric },
  ];

  const types: { key: StoreKey; label: string }[] = [
    { key: 'engagement', label: 'Engagement' },
    { key: 'messages', label: 'Messages' },
    { key: 'deals', label: 'Deals & gigs' },
    { key: 'orders', label: 'Orders' },
    { key: 'community', label: 'Community' },
    { key: 'platform', label: 'Platform updates' },
  ];

  const pick = (val: string) => {
    if (picking === 'from') setFrom(val);
    else if (picking === 'to') setTo(val);
    setPicking(null);
    toast('Quiet hours updated.', 'success');
  };

  return (
    <ScreenFrame
      waves={false}
      header={<ModuleHeader eyebrow="SETTINGS · ALERTS" title="NOTIFICATIONS" />}
    >
      <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
        what reaches{'\n'}you.
      </RNText>

      <Section eyebrow="DELIVERY">
        {delivery.map((d) => (
          <View key={d.key} style={styles.row}>
            <View style={[styles.bubble, { borderColor: palette.line }]}>
              <Ionicons name={d.icon} size={16} color={palette.ink} />
            </View>
            <RNText style={styles.rowLabel} maxFontSizeMultiplier={1.15}>
              {d.label}
            </RNText>
            <Switch
              value={n[d.key] as boolean}
              onValueChange={(v) => setStore(d.key, v)}
              trackColor={{ false: palette.line, true: d.accent }}
              thumbColor={palette.bone}
            />
          </View>
        ))}
      </Section>

      <Section eyebrow="BY TYPE">
        {types.map((t) => (
          <View key={t.key} style={styles.row}>
            <RNText style={styles.rowLabel} maxFontSizeMultiplier={1.15}>
              {t.label}
            </RNText>
            <Switch
              value={n[t.key] as boolean}
              onValueChange={(v) => setStore(t.key, v)}
              trackColor={{ false: palette.line, true: palette.acid }}
              thumbColor={palette.ink}
            />
          </View>
        ))}
      </Section>

      <Section eyebrow="FINE-GRAINED">
        {FINE_TYPES.map((f) => (
          <View key={f} style={styles.row}>
            <RNText style={styles.fineLabel} maxFontSizeMultiplier={1.15}>
              {f}
            </RNText>
            <Switch
              value={fine[f]}
              onValueChange={(v) => setFine((prev) => ({ ...prev, [f]: v }))}
              trackColor={{ false: palette.line, true: palette.acid }}
              thumbColor={palette.ink}
            />
          </View>
        ))}
      </Section>

      <Section eyebrow="QUIET HOURS">
        <View style={styles.row}>
          <View style={[styles.bubble, { borderColor: palette.line }]}>
            <Ionicons name="time-outline" size={16} color={palette.ink} />
          </View>
          <RNText style={styles.rowLabel} maxFontSizeMultiplier={1.15}>
            Mute overnight
          </RNText>
          <Switch
            value={quiet}
            onValueChange={(v) => {
              setQuiet(v);
              toast(v ? 'Quiet hours on.' : 'Quiet hours off.', 'default');
            }}
            trackColor={{ false: palette.line, true: palette.ink }}
            thumbColor={palette.bone}
          />
        </View>

        {quiet && (
          <View style={styles.quietWrap}>
            <Pressable style={styles.timeCell} onPress={() => setPicking('from')}>
              <RNText style={styles.timeKick}>FROM</RNText>
              <RNText style={styles.timeVal}>{from}</RNText>
            </Pressable>
            <View style={styles.dash} />
            <Pressable style={styles.timeCell} onPress={() => setPicking('to')}>
              <RNText style={styles.timeKick}>TO</RNText>
              <RNText style={styles.timeVal}>{to}</RNText>
            </Pressable>
          </View>
        )}
      </Section>

      <Sheet
        visible={picking !== null}
        onClose={() => setPicking(null)}
        eyebrow="QUIET HOURS"
        title={picking === 'from' ? 'Start time' : 'End time'}
      >
        <View style={styles.chipGrid}>
          {TIME_PRESETS.map((tp) => {
            const active = picking === 'from' ? tp === from : tp === to;
            return (
              <Chip key={tp} label={tp} active={active} onPress={() => pick(tp)} />
            );
          })}
        </View>
      </Sheet>
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 14,
  },
  bubble: {
    width: 34,
    height: 34,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.boneSoft,
  },
  rowLabel: {
    flex: 1,
    ...T.title3,
    color: palette.ink,
  },
  fineLabel: {
    flex: 1,
    ...T.body,
    fontFamily: fonts.bodyMedium,
    color: palette.inkSoft,
  },
  quietWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 16,
  },
  timeCell: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.boneSoft,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 4,
  },
  timeKick: {
    ...T.label,
    color: palette.mute,
  },
  timeVal: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    letterSpacing: -1,
    color: palette.ink,
  },
  dash: {
    width: 14,
    height: 1,
    backgroundColor: palette.lineDark,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingTop: 4,
  },
});
