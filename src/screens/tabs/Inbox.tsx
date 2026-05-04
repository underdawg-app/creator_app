import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text as RNText,
  Dimensions,
  Platform,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import Animated, {
  FadeIn,
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { useStore } from '@/store';
import type { Thread } from '@/data/mock';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';
import { Asterisk, ArrowMark } from '@/components/svg/Marks';

const { width } = Dimensions.get('window');

type Filter = 'ALL' | 'PRIMARY' | 'DEAL' | 'COLLAB' | 'REQUEST';
const FILTERS: Filter[] = ['ALL', 'PRIMARY', 'DEAL', 'COLLAB', 'REQUEST'];

export default function Inbox() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const threads = useStore((s) => s.threads);
  const [filter, setFilter] = useState<Filter>('ALL');

  const filtered = useMemo(() => {
    if (filter === 'ALL') return threads;
    return threads.filter((t) => t.kind === filter);
  }, [threads, filter]);

  const totalUnread = threads.reduce((a, t) => a + t.unread, 0);
  const totalThreads = threads.length;

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SkiaWaveField
          width={width}
          height={360}
          color="rgba(10,10,10,0.04)"
          lines={12}
          amplitude={10}
          frequency={0.02}
          speed={0.22}
          strokeWidth={1}
        />
      </View>

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <View style={styles.kickerRow}>
            <Asterisk size={11} color={palette.ink} strokeWidth={1.4} />
            <RNText style={styles.kicker} maxFontSizeMultiplier={1.15}>
              INBOX · MODULE 11
            </RNText>
          </View>
          <Tap
            onPress={() => router.push('/(modules)/studio')}
            style={styles.iconBtn}
            burstColor={palette.ink}
          >
            <Ionicons name="create-outline" size={18} color={palette.ink} />
          </Tap>
        </View>

        <Animated.View
          entering={FadeInDown.duration(520).delay(80)}
          style={styles.heroBlock}
        >
          <RNText
            style={styles.heroTitle}
            numberOfLines={1}
            maxFontSizeMultiplier={1.05}
            allowFontScaling={false}
          >
            MESSAGES
          </RNText>
          <RNText style={styles.heroSub} maxFontSizeMultiplier={1.2}>
            {totalUnread > 0
              ? `${totalUnread} unread · brands, collabs, and fans waiting on you.`
              : 'all caught up. go make something.'}
          </RNText>
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(520).delay(200)}
          style={styles.metaRow}
        >
          <View style={styles.metaItem}>
            <RNText style={styles.metaNum} maxFontSizeMultiplier={1.1}>
              {String(totalThreads).padStart(2, '0')}
            </RNText>
            <RNText style={styles.metaLabel} maxFontSizeMultiplier={1.15}>
              THREADS
            </RNText>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <RNText style={styles.metaNum} maxFontSizeMultiplier={1.1}>
              {String(totalUnread).padStart(2, '0')}
            </RNText>
            <RNText style={styles.metaLabel} maxFontSizeMultiplier={1.15}>
              UNREAD
            </RNText>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaItem}>
            <RNText style={styles.metaNum} maxFontSizeMultiplier={1.1}>
              {String(filtered.length).padStart(2, '0')}
            </RNText>
            <RNText style={styles.metaLabel} maxFontSizeMultiplier={1.15}>
              IN VIEW
            </RNText>
          </View>
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              active={filter === f}
              onPress={() => setFilter(f)}
              accent={palette.acid}
            />
          ))}
        </ScrollView>

        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={IS_ANDROID}
          overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        >
          {filtered.length === 0 ? (
            <Animated.View entering={FadeIn.duration(320)} style={styles.empty}>
              <RNText style={styles.emptyText} maxFontSizeMultiplier={1.2}>
                nothing here. switch filter or wait for the world to write you.
              </RNText>
            </Animated.View>
          ) : (
            <>
              {filtered.map((t) => (
                <ThreadRow key={t.id} t={t} />
              ))}
              <Animated.View
                layout={LinearTransition.springify().damping(22).stiffness(160)}
                style={styles.endRule}
              >
                <View style={styles.endRuleLine} />
                <RNText style={styles.endRuleLabel} maxFontSizeMultiplier={1.1}>
                  END · {String(filtered.length).padStart(2, '0')} OF {String(threads.length).padStart(2, '0')}
                </RNText>
                <View style={styles.endRuleLine} />
              </Animated.View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ThreadRow({ t }: { t: Thread }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const isUnread = t.unread > 0;

  return (
    <Animated.View
      entering={FadeIn.duration(260)}
      layout={LinearTransition.springify().damping(22).stiffness(160)}
    >
      <Tap
        onPress={() => router.push(`/(modules)/inbox/${t.id}` as any)}
        burstColor={t.accent}
        style={styles.row}
      >
        <View
          style={[
            styles.accentBar,
            { backgroundColor: t.accent, opacity: isUnread ? 1 : 0.18 },
          ]}
        />

        <View style={{ flex: 1, gap: 4 }}>
          <View style={styles.rowTop}>
            <RNText
              style={styles.name}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}
            >
              {t.name}
            </RNText>
            <RNText style={styles.time} maxFontSizeMultiplier={1.1}>
              {t.updatedAgo}
            </RNText>
          </View>

          <RNText style={styles.handle} maxFontSizeMultiplier={1.15}>
            @{t.handle}
          </RNText>

          <RNText
            style={styles.preview}
            numberOfLines={2}
            maxFontSizeMultiplier={1.2}
          >
            {t.preview}
          </RNText>

          <View style={styles.tagsRow}>
            <View style={styles.kindPill}>
              <View
                style={[styles.kindDot, { backgroundColor: t.accent }]}
              />
              <RNText style={styles.kindLabel} maxFontSizeMultiplier={1.1}>
                {t.kind}
              </RNText>
            </View>
            {isUnread ? (
              <RNText style={styles.unreadInline} maxFontSizeMultiplier={1.1}>
                {String(t.unread).padStart(2, '0')} NEW
              </RNText>
            ) : null}
          </View>
        </View>

        <ArrowMark size={14} color={palette.ink} strokeWidth={1.4} />
      </Tap>
    </Animated.View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  topRow: {
    paddingHorizontal: 24,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  kicker: { ...T.label, color: palette.ink, opacity: 0.7 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroBlock: { paddingHorizontal: 24, marginTop: 18 },
  heroTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -2,
    color: palette.ink,
  },
  heroSub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 14,
    maxWidth: 340,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 22,
    paddingTop: 14,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  metaItem: { flex: 1, gap: 4 },
  metaNum: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
    color: palette.ink,
  },
  metaLabel: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.55,
  },
  metaDivider: {
    width: 1,
    height: 28,
    backgroundColor: palette.line,
    marginHorizontal: 12,
  },

  filterRow: {
    gap: 8,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 14,
  },

  listContent: {
    paddingBottom: 140,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  endRule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 8,
  },
  endRuleLine: {
    flex: 1,
    height: 1,
    backgroundColor: palette.line,
  },
  endRuleLabel: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.5,
    letterSpacing: 2,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 14,
    bottom: 14,
    width: 3,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  rowIndex: {
    width: 28,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  rowIndexText: {
    fontFamily: fonts.editorialItalic,
    fontSize: 18,
    color: palette.ink,
    opacity: 0.55,
    letterSpacing: -0.3,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontFamily: fonts.displayBold,
    fontSize: 17,
    lineHeight: 20,
    color: palette.ink,
    letterSpacing: -0.4,
    flex: 1,
    marginRight: 10,
  },
  time: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.5,
  },
  handle: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.5,
    letterSpacing: 1.2,
    textTransform: 'none',
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
  },
  preview: {
    ...T.body,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  kindPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.line,
  },
  kindDot: { width: 6, height: 6, borderRadius: 3 },
  kindLabel: {
    ...T.micro,
    color: palette.ink,
  },
  unreadInline: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.9,
    letterSpacing: 2.2,
  },

  empty: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    alignItems: 'center',
  },
  emptyText: {
    ...T.body,
    color: palette.ink,
    opacity: 0.55,
    textAlign: 'center',
    maxWidth: 300,
  },
});
