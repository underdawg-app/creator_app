import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { Section } from '@/components/ui/Section';
import { BadgePill } from '@/components/ui/BadgePill';
import { EmptyState } from '@/components/ui/EmptyState';
import { useStore } from '@/store';
import { jobsSeed } from '@/data/mock';
import { router } from '@/navigation';

export default function ActiveDeals() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const deals = useStore((s) => s.deals);
  const apps = useStore((s) => s.applications);
  const advance = useStore((s) => s.advanceDeal);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="JOBS" title="MY DEALS" />}>
      <Section eyebrow={`ACTIVE · ${deals.length}`} title="in motion.">
        {deals.length === 0 ? (
          <EmptyState title="no deals yet." body="apply to jobs to get deals flowing." action={{ label: 'BROWSE JOBS', onPress: () => router.push('/(modules)/jobs') }} />
        ) : (
          deals.map((d) => (
            <Tap
              key={d.id}
              onPress={() => {
                advance(d.id);
                toast(`${d.title} advanced to next stage.`, 'success');
              }}
              burstColor={d.accent}
              variant="heavy"
              style={[styles.card, { borderColor: d.accent }]}
            >
              <View style={styles.top}>
                <BadgePill label={d.status} accent={d.accent} />
                <RNText style={styles.amount} maxFontSizeMultiplier={1.1}>
                  {d.amount > 0 ? `₹${d.amount.toLocaleString()}` : 'TBD'}
                </RNText>
              </View>
              <RNText
                style={styles.title}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                maxFontSizeMultiplier={1.1}
              >
                {d.title}
              </RNText>
              <RNText style={styles.brand} maxFontSizeMultiplier={1.15}>
                {d.brand}
              </RNText>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${d.progress * 100}%`, backgroundColor: d.accent }]} />
              </View>
              <RNText style={styles.next} maxFontSizeMultiplier={1.2}>
                Next: {d.nextAction} · tap to advance
              </RNText>
            </Tap>
          ))
        )}
      </Section>

      <Section eyebrow={`APPLIED · ${apps.length}`} title="waiting on brands.">
        {apps.length === 0 ? (
          <RNText style={styles.empty} maxFontSizeMultiplier={1.15}>no applications yet.</RNText>
        ) : (
          apps.map((a) => {
            const job = jobsSeed.find((j) => j.id === a.jobId);
            return (
              <View key={a.id} style={styles.appRow}>
                <View style={{ flex: 1 }}>
                  <RNText
                    style={styles.appTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.85}
                  >
                    {job?.title ?? 'Job'}
                  </RNText>
                  <RNText style={styles.appMeta}>
                    ₹{a.rate.toLocaleString()} · {a.timeline || '—'}
                  </RNText>
                </View>
                <BadgePill label={a.status} accent={palette.blush} />
              </View>
            );
          })
        )}
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    backgroundColor: palette.paper,
    gap: 10,
    marginBottom: 10,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amount: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, letterSpacing: -0.4 },
  title: { fontFamily: fonts.displayBold, fontSize: 22, lineHeight: 24, color: palette.ink, letterSpacing: -0.8 },
  brand: { ...T.micro, color: palette.ink, opacity: 0.65 },
  progressTrack: { height: 6, backgroundColor: palette.line, borderRadius: 3, overflow: 'hidden', marginTop: 6 },
  progressFill: { height: '100%', borderRadius: 3 },
  next: { ...T.small, color: palette.ink, opacity: 0.75, marginTop: 6 },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 10,
  },
  appTitle: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3 },
  appMeta: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 4 },
  empty: { ...T.body, color: palette.ink, opacity: 0.55, paddingVertical: 10 },
});
