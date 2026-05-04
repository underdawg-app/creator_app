import React from 'react';
import { View, StyleSheet, Text as RNText, Dimensions, ScrollView, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { contentTypes } from '@/data/mock';
import { useStore } from '@/store';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { Tap } from '@/components/ui/Tap';
import { RevealText } from '@/components/ui/RevealText';
import { MetricCard } from '@/components/ui/MetricCard';
import { ListCell } from '@/components/ui/ListCell';
import { Asterisk, ArrowMark } from '@/components/svg/Marks';
import { MediaThumb } from '@/components/svg/MediaThumb';

const { width, height } = Dimensions.get('window');

export default function Create() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const drafts = useStore((s) => s.drafts);
  const scheduled = useStore((s) => s.scheduled);
  const published = useStore((s) => s.published);

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SkiaWaveField
          width={width}
          height={height}
          color="rgba(242,239,230,0.06)"
          lines={18}
          amplitude={14}
          frequency={0.02}
          speed={0.25}
          strokeWidth={1}
        />
      </View>

      <View style={styles.heroMark} pointerEvents="none">
        <MediaThumb
          size={width * 0.7}
          color={palette.acid}
          ink={palette.acid}
          variant="lens"
        />
      </View>

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Asterisk size={10} color={palette.bone} strokeWidth={1.2} />
          <RNText style={styles.kicker} maxFontSizeMultiplier={1.15}>
            COMPOSE · STUDIO
          </RNText>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          removeClippedSubviews={IS_ANDROID}
          overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <RevealText
              text="what"
              splitBy="char"
              style={{
                fontFamily: fonts.editorialItalic,
                fontSize: 56,
                lineHeight: 54,
                color: palette.ink,
                letterSpacing: -0.8,
              }}
            />
            <RevealText
              text="ARE YOU"
              delay={140}
              style={{
                fontFamily: fonts.displayBold,
                fontSize: 74,
                lineHeight: 68,
                color: palette.ink,
                letterSpacing: -3.2,
              }}
            />
            <RevealText
              text="MAKING?"
              delay={260}
              style={{
                fontFamily: fonts.displayBold,
                fontSize: 74,
                lineHeight: 68,
                color: palette.acid,
                letterSpacing: -3.2,
              }}
            />
            <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
              write it. film it. post it. — one composer, every format.
            </RNText>
          </View>

          {/* Studio metrics */}
          <View style={styles.metricsRow}>
            <View style={{ flex: 1 }}>
              <MetricCard label="DRAFTS" value={drafts.length} size="md" />
            </View>
            <View style={{ flex: 1 }}>
              <MetricCard label="SCHEDULED" value={scheduled.length} size="md" />
            </View>
            <View style={{ flex: 1 }}>
              <MetricCard label="PUBLISHED" value={published.length} size="md" />
            </View>
          </View>

          {/* Compose — content type list */}
          <View style={styles.sectionHead}>
            <RNText style={styles.sectionEyebrow} maxFontSizeMultiplier={1.1}>
              COMPOSE
            </RNText>
            <RNText style={styles.sectionTitle} maxFontSizeMultiplier={1.1}>
              start something.
            </RNText>
          </View>

          <View style={styles.list}>
            {contentTypes.map((c, i) => (
              <Tap
                key={c.key}
                onPress={() => router.push(c.route as any)}
                burstColor={c.accent}
                variant="heavy"
                style={styles.cell}
              >
                <View style={styles.cellLeft}>
                  <RNText style={styles.cellIndex} maxFontSizeMultiplier={1.1}>
                    {String(i + 1).padStart(2, '0')}
                  </RNText>
                  <View style={{ flex: 1 }}>
                    <RNText
                      style={styles.cellLabel}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.85}
                      maxFontSizeMultiplier={1.1}
                    >
                      {c.name}
                    </RNText>
                    <RNText style={styles.cellSub} maxFontSizeMultiplier={1.15}>
                      {c.sub}
                    </RNText>
                  </View>
                </View>
                <View style={[styles.cellDot, { backgroundColor: c.accent }]} />
                <ArrowMark size={16} color={palette.bone} strokeWidth={1.6} />
              </Tap>
            ))}
          </View>

          {/* Manage — studio queue links */}
          <View style={styles.sectionHead}>
            <RNText style={styles.sectionEyebrow} maxFontSizeMultiplier={1.1}>
              MANAGE
            </RNText>
          </View>

          <View style={styles.manageList}>
            <ListCell
              icon="document-outline"
              title="Drafts"
              subtitle={`${drafts.length} in progress`}
              onPress={() => router.push('/(modules)/studio/drafts')}
            />
            <ListCell
              icon="time-outline"
              title="Scheduled queue"
              subtitle={`${scheduled.length} posts lined up`}
              onPress={() => router.push('/(modules)/studio/schedule')}
            />
            <ListCell
              icon="checkmark-done-outline"
              title="Published"
              subtitle={`${published.length} live on your feed`}
              onPress={() => router.push('/(modules)/studio/drafts')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone, overflow: 'hidden' },
  heroMark: {
    position: 'absolute',
    right: -width * 0.22,
    top: -width * 0.18,
    opacity: 0.32,
  },

  topRow: {
    paddingHorizontal: 24,
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  hero: { marginTop: 24 },
  sub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 18,
    maxWidth: 360,
  },

  /* Metrics */
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },

  /* Section headers */
  sectionHead: {
    marginTop: 32,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.lineDark,
  },
  sectionEyebrow: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
  },
  sectionTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    lineHeight: 28,
    letterSpacing: -1,
    color: palette.ink,
    marginTop: 6,
  },

  /* Content type list */
  list: { marginTop: 4 },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: palette.lineDark,
  },
  cellLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  cellIndex: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: palette.ink,
    opacity: 0.4,
    width: 28,
  },
  cellLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 30,
    lineHeight: 32,
    color: palette.ink,
    letterSpacing: -0.8,
  },
  cellSub: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 4,
  },
  cellDot: { width: 8, height: 8, borderRadius: 4 },

  /* Manage list */
  manageList: { marginTop: 8 },
});
