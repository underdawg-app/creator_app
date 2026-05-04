import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { BadgePill } from '@/components/ui/BadgePill';
import { Ticker } from '@/components/ui/Ticker';
import { useStore } from '@/store';

export default function Connections() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const platforms = useStore((s) => s.platforms);
  const toggle = useStore((s) => s.togglePlatform);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="AUDIENCE" title="PLATFORMS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Toggle each platform to pull follower counts, recent engagement, and your top fans from that channel.
      </RNText>

      <View style={styles.list}>
        {platforms.map((p) => (
          <Tap
            key={p.key}
            onPress={() => {
              toggle(p.key);
              toast(
                p.connected ? `${p.name} disconnected.` : `${p.name} connected.`,
                p.connected ? 'default' : 'success'
              );
            }}
            burstColor={p.accent}
            variant="heavy"
            style={styles.row}
          >
            <View style={[styles.dot, { backgroundColor: p.connected ? p.accent : palette.line }]} />
            <View style={{ flex: 1 }}>
              <View style={styles.rowTop}>
                <RNText
                  style={styles.name}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                  maxFontSizeMultiplier={1.15}
                >
                  {p.name}
                </RNText>
                <BadgePill
                  label={p.connected ? 'CONNECTED' : 'OFFLINE'}
                  accent={p.connected ? palette.acid : palette.mute}
                />
              </View>
              <RNText style={styles.handle} maxFontSizeMultiplier={1.2}>
                {p.handle}
              </RNText>
              {p.connected ? (
                <View style={styles.stats}>
                  <Ticker value={p.followers} fontSize={22} color={palette.ink} />
                  <RNText style={styles.statLabel}>FOLLOWERS</RNText>
                  <RNText style={[styles.statLabel, { marginLeft: 14 }]}>
                    +{p.growth.toFixed(1)}%
                  </RNText>
                </View>
              ) : null}
            </View>
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 4, maxWidth: 360 },
  list: { marginTop: 22 },
  row: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 10 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontFamily: fonts.displayBold, fontSize: 22, color: palette.ink, letterSpacing: -0.6, flex: 1, marginRight: 10 },
  handle: { ...T.small, color: palette.ink, opacity: 0.7, marginTop: 4 },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  statLabel: { ...T.micro, color: palette.ink, opacity: 0.7 },
});
