import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  TextInput,
} from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

type Tab = 'BLOCKED' | 'MUTED';

type Entry = {
  id: string;
  handle: string;
  reason: string;
  time: string;
};

const BLOCKED_SEED: Entry[] = [
  { id: 'b1', handle: 'luma.agency', reason: 'Spam DMs', time: '2d ago' },
  { id: 'b2', handle: 'cold.outreach', reason: 'Unwanted pitch', time: '1w ago' },
];

const MUTED_SEED: Entry[] = [
  { id: 'm1', handle: 'spam.brand', reason: 'Too noisy', time: '5h ago' },
];

export default function SettingsBlocked() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [tab, setTab] = useState<Tab>('BLOCKED');
  const [blocked, setBlocked] = useState<Entry[]>(BLOCKED_SEED);
  const [muted, setMuted] = useState<Entry[]>(MUTED_SEED);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const isBlocked = tab === 'BLOCKED';
  const list = isBlocked ? blocked : muted;
  const verb = isBlocked ? 'UNBLOCK' : 'UNMUTE';
  const action = isBlocked ? 'BLOCK' : 'MUTE';

  const remove = (id: string) => {
    if (isBlocked) {
      setBlocked((prev) => prev.filter((e) => e.id !== id));
      toast('Unblocked.', 'success');
    } else {
      setMuted((prev) => prev.filter((e) => e.id !== id));
      toast('Unmuted.', 'success');
    }
  };

  const add = () => {
    const handle = draft.trim().replace(/^@/, '');
    if (!handle) {
      toast('Enter a handle.', 'warn');
      return;
    }
    const entry: Entry = {
      id: `${tab}-${Date.now()}`,
      handle,
      reason: isBlocked ? 'Blocked by you' : 'Muted by you',
      time: 'just now',
    };
    if (isBlocked) setBlocked((prev) => [entry, ...prev]);
    else setMuted((prev) => [entry, ...prev]);
    toast(isBlocked ? `Blocked @${handle}.` : `Muted @${handle}.`, 'success');
    setDraft('');
    setSheetOpen(false);
  };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="PRIVACY · LISTS" title="BLOCKED" />}
      waves={false}
    >
      <RNText style={styles.title}>out of frame.</RNText>

      <View style={styles.tabs}>
        {(['BLOCKED', 'MUTED'] as Tab[]).map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <RNText style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {t}
              </RNText>
            </Pressable>
          );
        })}
      </View>

      <Section eyebrow={`${list.length} ${tab}`}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons
              name={isBlocked ? 'ban-outline' : 'notifications-outline'}
              size={26}
              color={palette.mute}
            />
            <RNText style={styles.emptyText}>
              No one {isBlocked ? 'blocked' : 'muted'} yet.
            </RNText>
          </View>
        ) : (
          list.map((e) => (
            <View key={e.id} style={styles.row}>
              <View style={styles.avatar}>
                <RNText style={styles.avatarText}>
                  {e.handle.charAt(0).toUpperCase()}
                </RNText>
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.handle}>@{e.handle}</RNText>
                <RNText style={styles.meta}>
                  {e.reason}  ·  {e.time}
                </RNText>
              </View>
              <Pressable onPress={() => remove(e.id)} style={styles.undoBtn}>
                <RNText style={styles.undoText}>{verb}</RNText>
              </Pressable>
            </View>
          ))
        )}
      </Section>

      <Pressable onPress={() => setSheetOpen(true)} style={styles.cta}>
        <Ionicons name="add" size={18} color={palette.bone} />
        <RNText style={styles.ctaText}>{action} SOMEONE</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={14} color={palette.ink} />
        </View>
      </Pressable>

      <Sheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        eyebrow="PRIVACY"
        title={isBlocked ? 'Block a handle' : 'Mute a handle'}
      >
        <RNText style={styles.fieldLabel}>HANDLE</RNText>
        <View style={styles.inputWrap}>
          <RNText style={styles.at}>@</RNText>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="handle"
            placeholderTextColor={palette.mute}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onSubmitEditing={add}
            returnKeyType="done"
          />
        </View>
        <Pressable onPress={add} style={styles.sheetCta}>
          <RNText style={styles.sheetCtaText}>{action}</RNText>
          <Ionicons name="checkmark-circle" size={16} color={palette.bone} />
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
      marginBottom: 18,
    },

    tabs: {
      flexDirection: 'row',
      gap: 6,
      marginBottom: 4,
    },
    tab: {
      paddingHorizontal: 16,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: palette.line,
    },
    tabActive: {
      backgroundColor: palette.ink,
      borderColor: palette.ink,
    },
    tabLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.8,
      color: palette.ink,
      opacity: 0.5,
      textTransform: 'uppercase',
    },
    tabLabelActive: {
      color: palette.bone,
      opacity: 1,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      marginBottom: 10,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      borderWidth: 1,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.paper,
    },
    avatarText: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: palette.ink,
    },
    handle: {
      fontFamily: fonts.bodyBold,
      fontSize: 15,
      letterSpacing: -0.2,
      color: palette.ink,
    },
    meta: {
      ...T.small,
      color: palette.ink,
      opacity: 0.55,
      marginTop: 2,
    },
    undoBtn: {
      paddingHorizontal: 12,
      height: 34,
      borderRadius: 17,
      borderWidth: 1.5,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    undoText: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.6,
      color: palette.ink,
    },

    empty: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 36,
      gap: 10,
    },
    emptyText: {
      ...T.body,
      color: palette.mute,
    },

    cta: {
      marginTop: 22,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 18,
      gap: 10,
    },
    ctaText: {
      flex: 1,
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 1.6,
      color: palette.bone,
    },
    ctaArrow: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    fieldLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      marginBottom: 8,
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 54,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 14,
      gap: 4,
    },
    at: {
      fontFamily: fonts.bodyBold,
      fontSize: 18,
      color: palette.mute,
    },
    input: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 17,
      color: palette.ink,
      paddingVertical: 0,
    },
    sheetCta: {
      marginTop: 16,
      height: 56,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    sheetCtaText: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.8,
      color: palette.bone,
    },
  });
