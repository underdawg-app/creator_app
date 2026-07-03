import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';
import { EmptyState } from '@/components/ui/EmptyState';
import { useStore } from '@/store';

export default function Drafts() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const drafts = useStore((s) => s.drafts);
  const published = useStore((s) => s.published);
  const scheduled = useStore((s) => s.scheduled);
  const publishDraft = useStore((s) => s.publishDraft);
  const toast = useStore((s) => s.toast);

  const allEmpty = drafts.length + published.length + scheduled.length === 0;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="STUDIO" title="YOUR CONTENT" />}>
      {allEmpty ? (
        <EmptyState
          eyebrow="NOTHING YET"
          title="make the first thing."
          body="every draft lives here. scheduled posts too. they survive reload."
          action={{ label: 'COMPOSE', onPress: () => router.push('/(modules)/studio') }}
        />
      ) : null}

      {drafts.length > 0 ? (
        <Section eyebrow={`DRAFTS · ${drafts.length}`} title="in progress.">
          {drafts.map((d) => (
            <Tap
              key={d.id}
              onPress={() => {
                publishDraft(d.id);
                toast('Published from draft.', 'success');
              }}
              burstColor={d.color}
              style={styles.row}
            >
              <View style={[styles.media, { backgroundColor: d.color }]} />
              <View style={{ flex: 1 }}>
                <Chip label={d.kind} accent={d.color} size="sm" />
                <RNText
                  style={styles.rowTitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  maxFontSizeMultiplier={1.15}
                >
                  {d.caption.slice(0, 42) || '(no caption)'}
                </RNText>
                <RNText style={styles.rowMeta} maxFontSizeMultiplier={1.15}>
                  TAP TO PUBLISH · {new Date(d.createdAt).toLocaleDateString()}
                </RNText>
              </View>
            </Tap>
          ))}
        </Section>
      ) : null}

      {scheduled.length > 0 ? (
        <Section eyebrow={`SCHEDULED · ${scheduled.length}`} title="in the queue.">
          {scheduled.map((s) => (
            <Tap key={s.id} burstColor={s.color} style={styles.row}>
              <View style={[styles.media, { backgroundColor: s.color }]} />
              <View style={{ flex: 1 }}>
                <Chip label={`GOES LIVE · ${s.scheduledFor ?? ''}`} accent={palette.electric} size="sm" />
                <RNText
                  style={styles.rowTitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {s.caption.slice(0, 42)}
                </RNText>
              </View>
            </Tap>
          ))}
        </Section>
      ) : null}

      {published.length > 0 ? (
        <Section eyebrow={`PUBLISHED · ${published.length}`} title="live.">
          {published.slice(0, 20).map((p) => (
            <Tap key={p.id} burstColor={p.color} style={styles.row}>
              <View style={[styles.media, { backgroundColor: p.color }]} />
              <View style={{ flex: 1 }}>
                <Chip label={p.kind} accent={p.color} size="sm" />
                <RNText
                  style={styles.rowTitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {p.caption.slice(0, 42)}
                </RNText>
                <RNText style={styles.rowMeta}>
                  {new Date(p.createdAt).toLocaleString()}
                </RNText>
              </View>
            </Tap>
          ))}
        </Section>
      ) : null}
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  media: { width: 48, height: 48, borderRadius: 12 },
  rowTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: palette.ink,
    letterSpacing: -0.4,
    marginTop: 6,
  },
  rowMeta: { ...T.micro, color: palette.ink, opacity: 0.5, marginTop: 4 },
});
