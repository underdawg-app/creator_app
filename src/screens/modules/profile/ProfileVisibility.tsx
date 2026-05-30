import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, Switch } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';

type Mode = 'PUBLIC' | 'FOLLOWERS' | 'HIDDEN';

const MODE_NOTE: Record<Mode, string> = {
  PUBLIC: 'Anyone on UNDERDAWG can find and view you.',
  FOLLOWERS: 'Only the dawgs who follow you see the full profile.',
  HIDDEN: 'Your profile is off the grid. Links still work.',
};

export default function ProfileVisibility() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const profile = useStore((s) => s.profile);
  const privacy = useStore((s) => s.settings.privacy);
  const update = useStore((s) => s.updateSetting);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  // 8 completeness checks off the live profile.
  const checks = useMemo(
    () => [
      { key: 'name', label: 'Display name', ok: !!profile.name?.trim() },
      { key: 'handle', label: 'Handle', ok: !!profile.handle?.trim() },
      { key: 'bio', label: 'Bio', ok: !!profile.bio?.trim() },
      { key: 'type', label: 'Creator type', ok: !!profile.type?.trim() },
      { key: 'location', label: 'Location', ok: !!profile.location?.trim() },
      { key: 'avatar', label: 'Avatar', ok: !!profile.avatar?.trim() },
      { key: 'niches', label: 'Niches', ok: (profile.niches?.length ?? 0) > 0 },
      { key: 'openTo', label: 'Open to', ok: (profile.openTo?.length ?? 0) > 0 },
    ],
    [profile],
  );

  const done = checks.filter((c) => c.ok).length;
  const pct = Math.round((done / checks.length) * 100);
  const missing = checks.filter((c) => !c.ok);
  const complete = pct === 100;

  const [mode, setMode] = useState<Mode>(privacy.profilePublic ? 'PUBLIC' : 'HIDDEN');

  const setVisibilityMode = (m: Mode) => {
    setMode(m);
    update('privacy', { profilePublic: m === 'PUBLIC' } as any);
    toast(`Visibility: ${m.toLowerCase()}.`, m === 'HIDDEN' ? 'warn' : 'success');
  };

  const toggles: { key: keyof typeof privacy; label: string; desc: string }[] = [
    { key: 'profilePublic', label: 'PUBLIC PROFILE', desc: 'Anyone can view your profile.' },
    { key: 'showInSearch', label: 'SHOW IN SEARCH', desc: 'Appear in handle search.' },
    { key: 'hideFollowerCount', label: 'HIDE FOLLOWER COUNT', desc: 'Hide the number from others.' },
  ];

  const previewPublic = () => {
    try {
      router.push('/(modules)/portfolio/public-preview');
    } catch {
      toast('Preview not wired yet — opening edit.', 'warn');
      router.push('/(modules)/profile/edit');
    }
  };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="PROFILE · VISIBILITY" title="VISIBILITY" />}
      waves={false}
    >
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
      >
        your public face.
      </RNText>

      {/* Completeness hero */}
      <Section eyebrow="PROFILE COMPLETENESS">
        <View style={styles.heroCard}>
          <View style={styles.heroHead}>
            <View style={{ flex: 1 }}>
              <RNText style={styles.heroLabel}>
                {complete ? 'FULLY BUILT' : `${missing.length} LEFT`}
              </RNText>
              <RNText style={styles.heroSub}>
                {complete
                  ? '100% profiles get a visibility boost.'
                  : 'Complete it for a visibility boost.'}
              </RNText>
            </View>
            <RNText style={styles.heroPct}>{pct}%</RNText>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { width: `${Math.max(pct, 4)}%`, backgroundColor: complete ? palette.acid : palette.ink },
              ]}
            />
          </View>
        </View>

        {complete ? (
          <View style={styles.successRow}>
            <Ionicons name="checkmark-circle" size={18} color={palette.ink} />
            <RNText style={styles.successText}>Every field is filled. Boost is live.</RNText>
          </View>
        ) : (
          missing.map((m) => (
            <Pressable
              key={m.key}
              onPress={() => router.push('/(modules)/profile/edit')}
              style={styles.missRow}
            >
              <View style={styles.missDot} />
              <RNText style={styles.missLabel}>{m.label}</RNText>
              <RNText style={styles.missLink}>COMPLETE</RNText>
              <Ionicons name="chevron-forward" size={16} color={palette.inkMuted} />
            </Pressable>
          ))
        )}
      </Section>

      {/* Visibility mode segmented */}
      <Section eyebrow="PROFILE VISIBILITY">
        <View style={styles.seg}>
          {(['PUBLIC', 'FOLLOWERS', 'HIDDEN'] as Mode[]).map((m) => {
            const active = mode === m;
            return (
              <Pressable
                key={m}
                onPress={() => setVisibilityMode(m)}
                style={[styles.segItem, active && styles.segItemActive]}
              >
                <RNText style={[styles.segLabel, active && styles.segLabelActive]}>{m}</RNText>
              </Pressable>
            );
          })}
        </View>
        <RNText style={styles.modeNote}>{MODE_NOTE[mode]}</RNText>
      </Section>

      {/* Toggles bound to settings.privacy */}
      <Section eyebrow="CONTROLS">
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
              onValueChange={(v) => {
                update('privacy', { [r.key]: v } as any);
                if (r.key === 'profilePublic') setMode(v ? 'PUBLIC' : 'HIDDEN');
              }}
              trackColor={{ false: palette.line, true: palette.acid }}
              thumbColor={palette.ink}
            />
          </View>
        ))}
      </Section>

      {/* Preview CTA */}
      <Tap onPress={previewPublic} style={styles.cta} burstColor={palette.bone} variant="heavy">
        <Ionicons name="eye-outline" size={16} color={palette.bone} />
        <RNText style={styles.ctaLabel}>PREVIEW PUBLIC PROFILE</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </View>
      </Tap>

      <Tap
        onPress={() => {
          if (complete) {
            confetti();
            toast('Profile is locked in and boosted.', 'success');
          } else {
            toast(`Finish ${missing.length} item${missing.length === 1 ? '' : 's'} to boost.`, 'warn');
            router.push('/(modules)/profile/edit');
          }
        }}
        style={styles.ghostRow}
        burstColor={palette.ink}
      >
        <Ionicons name="sparkles-outline" size={16} color={palette.ink} />
        <RNText style={styles.ghostText}>
          {complete ? 'CELEBRATE THE BOOST' : 'FINISH PROFILE'}
        </RNText>
      </Tap>
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
      marginBottom: 6,
    },

    heroCard: {
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: palette.ink,
      backgroundColor: palette.boneSoft,
      padding: 16,
      gap: 14,
    },
    heroHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    heroLabel: { ...T.label, color: palette.ink, opacity: 0.6 },
    heroSub: { ...T.small, color: palette.ink, opacity: 0.75, marginTop: 4, maxWidth: 220 },
    heroPct: {
      fontFamily: fonts.displayBold,
      fontSize: 36,
      letterSpacing: -1.5,
      color: palette.ink,
    },
    barTrack: { height: 8, borderRadius: 4, backgroundColor: palette.boneMuted, overflow: 'hidden' },
    barFill: { height: 8, borderRadius: 4 },

    successRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 12,
      paddingVertical: 4,
    },
    successText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: palette.ink },

    missRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    missDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: palette.acid,
      borderWidth: 1,
      borderColor: palette.ink,
    },
    missLabel: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, color: palette.ink },
    missLink: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },

    seg: {
      flexDirection: 'row',
      gap: 6,
      padding: 4,
      borderRadius: 16,
      backgroundColor: palette.boneSoft,
    },
    segItem: {
      flex: 1,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    segItemActive: { backgroundColor: palette.ink },
    segLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.ink,
      opacity: 0.5,
    },
    segLabelActive: { color: palette.bone, opacity: 1 },
    modeNote: { ...T.small, color: palette.inkMuted, marginTop: 12 },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      gap: 14,
    },
    rowText: { flex: 1 },
    key: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.8,
      color: palette.ink,
      textTransform: 'uppercase',
    },
    desc: { ...T.small, color: palette.mute, marginTop: 4, maxWidth: 260 },

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
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    ghostRow: {
      marginTop: 10,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    ghostText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
