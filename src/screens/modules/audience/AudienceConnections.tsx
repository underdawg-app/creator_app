import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { MetricCard } from '@/components/ui/MetricCard';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

// Map each platform key to a real Ionicons logo glyph.
const ICON_BY_KEY: Record<string, string> = {
  ig: 'logo-instagram',
  tt: 'logo-tiktok',
  yt: 'logo-youtube',
  tw: 'logo-twitter',
  sp: 'musical-notes-outline',
  tv: 'logo-twitch',
};

export default function AudienceConnections() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const platforms = useStore((s) => s.platforms);
  const toggle = useStore((s) => s.togglePlatform);
  const toast = useStore((s) => s.toast);

  // Disconnect confirmation target (null = closed).
  const [confirmKey, setConfirmKey] = useState<string | null>(null);
  const pending = useMemo(
    () => platforms.find((p) => p.key === confirmKey) ?? null,
    [platforms, confirmKey]
  );

  const connected = platforms.filter((p) => p.connected);
  const totalFollowers = connected.reduce((a, p) => a + p.followers, 0);

  const syncAll = () => {
    if (connected.length === 0) {
      toast('Connect a platform first.', 'default');
      return;
    }
    toast(`Synced ${connected.length} platforms just now.`, 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="AUDIENCE" title="PLATFORMS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        all your{'\n'}audiences.
      </RNText>

      {/* Header metrics */}
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard
            label="CONNECTED"
            value={connected.length}
            suffix={` of ${platforms.length}`}
            size="md"
            accent={palette.acid}
          />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="TOTAL FOLLOWERS" value={totalFollowers} size="md" accent={palette.electric} />
        </View>
      </View>

      {/* Last synced + sync all */}
      <View style={styles.syncBar}>
        <View style={styles.syncDot} />
        <RNText style={styles.syncText}>Last synced 2h ago</RNText>
        <Pressable onPress={syncAll} style={styles.syncAllBtn} hitSlop={8}>
          <Ionicons name="sync-outline" size={13} color={palette.bone} />
          <RNText style={styles.syncAllText}>SYNC ALL</RNText>
        </Pressable>
      </View>

      {/* Platform rows */}
      <Section eyebrow={`${platforms.length} CHANNELS`}>
        {platforms.map((p) => {
          const icon = ICON_BY_KEY[p.key] ?? 'globe-outline';
          return (
            <View
              key={p.key}
              style={[styles.row, p.connected && styles.rowConnected]}
            >
              <View style={styles.rowTop}>
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: p.connected ? p.accent : palette.boneSoft },
                  ]}
                >
                  <Ionicons
                    name={icon as any}
                    size={20}
                    color={p.connected ? palette.ink : palette.inkMuted}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <RNText style={styles.name} numberOfLines={1}>
                    {p.name}
                  </RNText>
                  <RNText style={styles.handle} numberOfLines={1}>
                    {p.handle}
                  </RNText>
                </View>

                <View style={styles.followCol}>
                  <RNText style={styles.followCount}>
                    {p.connected ? p.followers.toLocaleString() : '—'}
                  </RNText>
                  <RNText style={styles.followLabel}>FOLLOWERS</RNText>
                </View>
              </View>

              {p.connected ? (
                <>
                  <View style={styles.statusLine}>
                    <View style={styles.liveDot} />
                    <RNText style={styles.statusText}>
                      Connected · synced 2h ago · +{p.growth.toFixed(1)}%
                    </RNText>
                  </View>
                  <View style={styles.actions}>
                    <Pressable
                      onPress={() => toast(`${p.name} synced just now.`, 'success')}
                      style={styles.ghostBtn}
                    >
                      <Ionicons name="sync-outline" size={13} color={palette.ink} />
                      <RNText style={styles.ghostText}>SYNC</RNText>
                    </Pressable>
                    <Pressable
                      onPress={() => setConfirmKey(p.key)}
                      style={styles.ghostBtn}
                    >
                      <Ionicons name="close" size={14} color={palette.ink} />
                      <RNText style={styles.ghostText}>DISCONNECT</RNText>
                    </Pressable>
                  </View>
                </>
              ) : (
                <Tap
                  onPress={() => {
                    toggle(p.key);
                    toast(`${p.name} connected — importing audience…`, 'success');
                  }}
                  style={styles.connectBtn}
                  burstColor={p.accent}
                >
                  <Ionicons name="link-outline" size={15} color={palette.bone} />
                  <RNText style={styles.connectText}>CONNECT</RNText>
                  <View style={styles.connectArrow}>
                    <Ionicons name="arrow-forward" size={13} color={palette.ink} />
                  </View>
                </Tap>
              )}
            </View>
          );
        })}
      </Section>

      <RNText style={styles.foot}>
        Connecting a platform pulls follower counts, recent engagement, and your top fans into UNDERDAWG.
      </RNText>

      {/* Disconnect confirm sheet */}
      <Sheet
        visible={pending != null}
        onClose={() => setConfirmKey(null)}
        eyebrow="DISCONNECT"
        title={pending ? pending.name.toLowerCase() : ''}
      >
        <RNText style={styles.sheetBody}>
          We'll stop syncing {pending?.handle}. Your imported fans and history stay, but no new data
          comes in until you reconnect.
        </RNText>
        <Pressable
          onPress={() => {
            if (pending) {
              toggle(pending.key);
              toast(`${pending.name} disconnected.`, 'default');
            }
            setConfirmKey(null);
          }}
          style={styles.sheetPrimary}
        >
          <RNText style={styles.sheetPrimaryText}>DISCONNECT</RNText>
        </Pressable>
        <Pressable onPress={() => setConfirmKey(null)} style={styles.sheetGhost}>
          <RNText style={styles.sheetGhostText}>KEEP CONNECTED</RNText>
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

    metricGrid: { flexDirection: 'row', gap: 10 },

    syncBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 14,
    },
    syncDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: palette.acid },
    syncText: { ...T.small, color: palette.inkMuted, flex: 1 },
    syncAllBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 30,
      paddingHorizontal: 12,
      borderRadius: 15,
      backgroundColor: palette.ink,
    },
    syncAllText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.8, color: palette.bone },

    row: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      marginBottom: 10,
      gap: 12,
    },
    rowConnected: {
      backgroundColor: palette.boneSoft,
      borderColor: palette.line,
    },
    rowTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: palette.line,
    },
    name: {
      fontFamily: fonts.displayBold,
      fontSize: 17,
      letterSpacing: -0.3,
      color: palette.ink,
    },
    handle: { ...T.small, color: palette.inkMuted, marginTop: 2 },
    followCol: { alignItems: 'flex-end' },
    followCount: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.6,
      color: palette.ink,
    },
    followLabel: { ...T.micro, color: palette.inkMuted, marginTop: 1, letterSpacing: 1 },

    statusLine: { flexDirection: 'row', alignItems: 'center', gap: 7 },
    liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.electric },
    statusText: { ...T.small, color: palette.inkMuted, flex: 1 },

    actions: { flexDirection: 'row', gap: 8 },
    ghostBtn: {
      flex: 1,
      height: 42,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    ghostText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },

    connectBtn: {
      height: 48,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    connectText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.bone },
    connectArrow: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    foot: {
      ...T.small,
      color: palette.inkMuted,
      lineHeight: 19,
      marginTop: 8,
      maxWidth: 360,
    },

    sheetBody: {
      ...T.body,
      color: palette.ink,
      opacity: 0.78,
      lineHeight: 21,
      marginBottom: 18,
    },
    sheetPrimary: {
      height: 56,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetPrimaryText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2, color: palette.bone },
    sheetGhost: {
      height: 50,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    sheetGhostText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.8, color: palette.inkMuted },
  });
