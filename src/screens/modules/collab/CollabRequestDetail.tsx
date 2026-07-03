import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

type Status = 'PENDING' | 'ACCEPTED' | 'DECLINED';

type Request = {
  id: string;
  handle: string;
  initials: string;
  type: string;
  idea: string;
  timeline: string;
  platform: string;
  split: string;
  message: string;
};

const REQUESTS: Record<string, Request> = {
  r2: {
    id: 'r2',
    handle: 'kore.odu',
    initials: 'KO',
    type: 'JOINT PROJECT',
    idea: 'split EP cover — your palette, my sound',
    timeline: 'THIS MONTH',
    platform: 'UNDERDAWG + INSTAGRAM',
    split: '50 / 50',
    message:
      "been sitting on the EP for weeks and your color work is the missing piece. you take the cover art, i bring the master. equal credit, equal split. down?",
  },
  r1: {
    id: 'r1',
    handle: 'maya_films',
    initials: 'MP',
    type: 'SOUND BED',
    idea: 'two-day short, monsoon Mumbai — need a score',
    timeline: 'NEXT 2 WEEKS',
    platform: 'UNDERDAWG + YOUTUBE',
    split: '60 / 40',
    message:
      "tight turnaround but the footage is gorgeous. need 4 mins of ambient sound. happy to weight the split your way.",
  },
};

const FALLBACK: Request = REQUESTS.r2;

export default function CollabRequestDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;

  const req = useMemo<Request>(() => (id && REQUESTS[id]) || FALLBACK, [id]);

  const [status, setStatus] = useState<Status>('PENDING');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const accept = () => {
    setStatus('ACCEPTED');
    confetti();
    toast('Collab accepted! Opening planning thread.', 'success');
  };

  const decline = () => {
    setStatus('DECLINED');
    setConfirmOpen(false);
    toast(`Declined @${req.handle}.`, 'default');
  };

  const statusTone =
    status === 'ACCEPTED'
      ? { bg: palette.ink, fg: palette.bone, dot: palette.acid }
      : status === 'DECLINED'
      ? { bg: palette.boneSoft, fg: palette.inkMuted, dot: palette.inkMuted }
      : { bg: palette.acid, fg: palette.ink, dot: palette.ink };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="COLLAB" title="REQUEST" showBack />}
      waves={false}
    >
      {/* Requester hero */}
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <RNText style={styles.avatarText}>{req.initials}</RNText>
        </View>
        <View style={{ flex: 1 }}>
          <RNText style={styles.handle}>@{req.handle}</RNText>
          <RNText style={styles.heroSub}>wants to collaborate</RNText>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusTone.bg }]}>
          <View style={[styles.statusDot, { backgroundColor: statusTone.dot }]} />
          <RNText style={[styles.statusText, { color: statusTone.fg }]}>{status}</RNText>
        </View>
      </View>

      <RNText style={styles.idea}>{req.idea}</RNText>

      {/* Details card */}
      <Section eyebrow="THE PITCH">
        <View style={styles.card}>
          <Row label="TYPE" value={req.type} />
          <View style={styles.divider} />
          <Row label="TIMELINE" value={req.timeline} />
          <View style={styles.divider} />
          <Row label="PLATFORM" value={req.platform} />
          <View style={styles.divider} />
          <Row label="SPLIT" value={req.split} accent />
        </View>
      </Section>

      {/* Message */}
      <Section eyebrow="MESSAGE">
        <View style={styles.msgCard}>
          <Ionicons name="chatbubble-outline" size={16} color={palette.inkMuted} />
          <RNText style={styles.msgText}>{req.message}</RNText>
        </View>
      </Section>

      {/* Primary action zone */}
      {status === 'PENDING' && (
        <>
          <Tap onPress={accept} style={styles.cta} burstColor={palette.bone}>
            <RNText style={styles.ctaLabel}>ACCEPT</RNText>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Tap>
          <Pressable onPress={() => setConfirmOpen(true)} style={styles.declineBtn}>
            <RNText style={styles.declineText}>DECLINE</RNText>
          </Pressable>
        </>
      )}

      {status === 'ACCEPTED' && (
        <Tap
          onPress={() => router.push('/(tabs)/inbox')}
          style={styles.cta}
          burstColor={palette.bone}
        >
          <RNText style={styles.ctaLabel}>PLAN TOGETHER</RNText>
          <View style={styles.ctaArrow}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Tap>
      )}

      {status === 'DECLINED' && (
        <View style={styles.declinedNote}>
          <Ionicons name="close" size={16} color={palette.inkMuted} />
          <RNText style={styles.declinedText}>You declined this request.</RNText>
        </View>
      )}

      {/* Always-available message link */}
      <Pressable onPress={() => router.push('/(tabs)/inbox')} style={styles.msgBtn}>
        <Ionicons name="send" size={15} color={palette.ink} />
        <RNText style={styles.msgBtnText}>MESSAGE @{req.handle.toUpperCase()}</RNText>
      </Pressable>

      {/* Decline confirm sheet */}
      <Sheet
        visible={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        eyebrow="CONFIRM"
        title={`Decline @${req.handle}?`}
      >
        <RNText style={styles.sheetBody}>
          They won't be notified with a reason. You can still message them anytime.
        </RNText>
        <Tap onPress={decline} style={styles.sheetDecline} burstColor={palette.bone}>
          <RNText style={styles.sheetDeclineText}>DECLINE REQUEST</RNText>
        </Tap>
        <Pressable onPress={() => setConfirmOpen(false)} style={styles.sheetCancel}>
          <RNText style={styles.sheetCancelText}>KEEP IT</RNText>
        </Pressable>
      </Sheet>
    </ScreenFrame>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.row}>
      <RNText style={styles.rowLabel}>{label}</RNText>
      <RNText style={[styles.rowValue, accent && styles.rowValueAccent]}>{value}</RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    hero: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 4,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
      borderWidth: 1.5,
      borderColor: palette.ink,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.5,
      color: palette.ink,
    },
    handle: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      letterSpacing: -0.8,
      color: palette.ink,
    },
    heroSub: {
      ...T.small,
      color: palette.inkMuted,
      marginTop: 1,
    },
    statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 10,
      height: 26,
      borderRadius: 13,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    statusText: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.4,
    },

    idea: {
      fontFamily: fonts.displayBold,
      fontSize: 32,
      lineHeight: 34,
      letterSpacing: -1.4,
      color: palette.ink,
      marginTop: 18,
      marginBottom: 6,
    },

    card: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      gap: 12,
    },
    rowLabel: {
      ...T.label,
      color: palette.inkMuted,
    },
    rowValue: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 0.2,
      color: palette.ink,
      textAlign: 'right',
      flexShrink: 1,
    },
    rowValueAccent: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.3,
    },
    divider: {
      height: 1,
      backgroundColor: palette.line,
    },

    msgCard: {
      flexDirection: 'row',
      gap: 10,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 16,
    },
    msgText: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 14,
      lineHeight: 21,
      color: palette.ink,
      opacity: 0.9,
    },

    cta: {
      marginTop: 22,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2.5,
      color: palette.bone,
    },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    declineBtn: {
      marginTop: 10,
      height: 52,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    declineText: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 2.5,
      color: palette.ink,
    },

    declinedNote: {
      marginTop: 22,
      height: 52,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    declinedText: {
      fontFamily: fonts.bodyMedium,
      fontSize: 13,
      color: palette.inkMuted,
    },

    msgBtn: {
      marginTop: 12,
      height: 48,
      borderRadius: 16,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    msgBtnText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2,
      color: palette.ink,
    },

    sheetBody: {
      fontFamily: fonts.body,
      fontSize: 14,
      lineHeight: 21,
      color: palette.inkMuted,
      marginBottom: 18,
    },
    sheetDecline: {
      height: 56,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetDeclineText: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 2.5,
      color: palette.bone,
    },
    sheetCancel: {
      height: 48,
      marginTop: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetCancelText: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 2,
      color: palette.inkMuted,
    },
  });
