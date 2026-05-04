import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { eventsSeed } from '@/data/mock';
import { useStore } from '@/store';

export default function Events() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMMUNITY" title="EVENTS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Open studios, AMAs, classes, exhibitions. Show up. Meet your people.
      </RNText>

      <View style={{ marginTop: 18, gap: 12 }}>
        {eventsSeed.map((e) => (
          <Tap
            key={e.id}
            onPress={() => toast(`RSVP'd to ${e.title}.`, 'success')}
            burstColor={e.accent}
            variant="heavy"
            style={[styles.card, { backgroundColor: e.accent }]}
          >
            <RNText style={styles.date} maxFontSizeMultiplier={1.15}>
              {e.date}
            </RNText>
            <RNText
              style={styles.title}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              maxFontSizeMultiplier={1.1}
            >
              {e.title}
            </RNText>
            <View style={styles.bottom}>
              <RNText style={styles.host} maxFontSizeMultiplier={1.15}>
                {e.host}
              </RNText>
              <RNText style={styles.rsvp} maxFontSizeMultiplier={1.15}>
                {e.rsvps} GOING
              </RNText>
            </View>
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.72, maxWidth: 360 },
  card: { padding: 22, borderRadius: 22, gap: 10 },
  date: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2.4, color: palette.ink, opacity: 0.7 },
  title: { fontFamily: fonts.displayBold, fontSize: 30, lineHeight: 32, color: palette.ink, letterSpacing: -1 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  host: { ...T.micro, color: palette.ink, opacity: 0.8 },
  rsvp: { ...T.micro, color: palette.ink, opacity: 0.8 },
});
