import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { BadgePill } from '@/components/ui/BadgePill';
import { useStore } from '@/store';

export default function Groups() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const groups = useStore((s) => s.groups);
  const toggle = useStore((s) => s.toggleGroup);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMMUNITY" title="GROUPS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Curated interest groups. Ask questions. Share work. Get in on collabs.
      </RNText>

      <View style={{ marginTop: 18, gap: 10 }}>
        {groups.map((g) => (
          <Tap
            key={g.id}
            onPress={() => {
              toggle(g.id);
              toast(g.joined ? `Left ${g.name}.` : `Joined ${g.name}.`, g.joined ? 'default' : 'success');
            }}
            burstColor={g.accent}
            variant="heavy"
            style={[styles.card, { borderColor: g.accent }]}
          >
            <View style={[styles.dot, { backgroundColor: g.accent }]} />
            <View style={{ flex: 1 }}>
              <RNText
                style={styles.name}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                maxFontSizeMultiplier={1.15}
              >
                {g.name}
              </RNText>
              <RNText style={styles.meta} maxFontSizeMultiplier={1.15}>
                {g.niche} · {g.members.toLocaleString()} members
              </RNText>
            </View>
            <BadgePill label={g.joined ? 'JOINED' : 'JOIN'} accent={g.joined ? palette.acid : palette.mute} />
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.7, maxWidth: 360 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: palette.paper,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  name: { fontFamily: fonts.displayBold, fontSize: 20, color: palette.ink, letterSpacing: -0.6 },
  meta: { ...T.small, color: palette.ink, opacity: 0.65, marginTop: 3 },
});
