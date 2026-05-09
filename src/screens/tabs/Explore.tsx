import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text as RNText,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Platform,
  type LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { Image } from '@/components/ui/Image';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import {
  risingList,
  challenges,
  trendingTags,
  categoriesGrid,
  feedPosts,
} from '@/data/mock';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { Marquee } from '@/components/ui/Marquee';
import { Tap } from '@/components/ui/Tap';
import { TiltCard } from '@/components/ui/TiltCard';
import { Chip } from '@/components/ui/Chip';
import { ArrowMark, Asterisk } from '@/components/svg/Marks';
import { BadgePill } from '@/components/ui/BadgePill';

const { width } = Dimensions.get('window');
const H_PADDING = 24;
const GUTTER = 10;
const CARD_WIDTH = (width - H_PADDING * 2 - GUTTER) / 2;

const GRID_GAP = 2;
const GRID_COLS = 3;
const TILE_SIZE = (width - GRID_GAP * (GRID_COLS - 1)) / GRID_COLS;
const TILE_BIG = TILE_SIZE * 2 + GRID_GAP;
const PAGE_SIZE = 12;
const POOL = feedPosts.filter((p) => !!p.image);

type GridTile = (typeof feedPosts)[number] & { key: string };

function buildGridPage(seedOffset: number): GridTile[] {
  if (POOL.length === 0) return [];
  return Array.from({ length: PAGE_SIZE }, (_, i) => {
    const src = POOL[(seedOffset + i) % POOL.length];
    return { ...src, key: `${src.id}-${seedOffset + i}` };
  });
}

function isVideoType(type: string) {
  const t = type.toUpperCase();
  return t.includes('VIDEO') || t.includes('LIVE') || t.includes('REEL');
}

/**
 * Stagger the grid into Instagram-style row groups: every group of 3 tiles
 * renders as one 2×2 feature tile + 2 stacked 1×1 tiles, alternating which
 * side the feature is on. Any trailing partial group renders as a flat row
 * of 1×1 tiles so nothing falls off the page.
 */
type RowGroup =
  | { type: 'feature'; side: 'left' | 'right'; tiles: GridTile[]; key: string }
  | { type: 'flat'; tiles: GridTile[]; key: string };

function groupGrid(tiles: GridTile[]): RowGroup[] {
  const groups: RowGroup[] = [];
  let featureCount = 0;
  for (let i = 0; i < tiles.length; i += 3) {
    const slice = tiles.slice(i, i + 3);
    if (slice.length === 3) {
      groups.push({
        type: 'feature',
        side: featureCount % 2 === 0 ? 'left' : 'right',
        tiles: slice,
        key: `g-${i}`,
      });
      featureCount += 1;
    } else {
      groups.push({ type: 'flat', tiles: slice, key: `g-${i}` });
    }
  }
  return groups;
}

const CATEGORY_ICONS: Record<
  string,
  React.ComponentProps<typeof Ionicons>['name']
> = {
  art: 'color-palette',
  music: 'musical-notes',
  film: 'film',
  dance: 'body',
  poetry: 'book',
  design: 'shapes',
  fashion: 'shirt',
  podcast: 'mic',
};

const CATEGORY_IMAGES: Record<string, any> = {
  art:     require('@/objects/obj-1.png'),
  music:   require('@/objects/obj-2.png'),
  film:    require('@/objects/obj-3.png'),
  dance:   require('@/objects/obj-4.png'),
  poetry:  require('@/objects/obj-5.png'),
  design:  require('@/objects/obj-6.png'),
  fashion: require('@/objects/obj-7.png'),
  podcast: require('@/objects/obj-8.png'),
};

export default function Explore() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [q, setQ] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [grid, setGrid] = useState(() => buildGridPage(0));
  const [loadingMore, setLoadingMore] = useState(false);
  const loadingRef = useRef(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const tagNeedle = activeTag?.replace('#', '').toLowerCase() ?? '';
    return risingList.filter((r) => {
      const hay =
        `${r.name} ${r.handle} ${r.type} ${r.city}`.toLowerCase();
      if (needle && !hay.includes(needle)) return false;
      if (tagNeedle && !hay.includes(tagNeedle)) return false;
      return true;
    });
  }, [q, activeTag]);

  // Track the in-flight load-more timer so it gets cancelled on unmount —
  // otherwise setState fires on an unmounted component if the user navigates
  // away during the simulated 350ms load.
  const loadMoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (loadMoreTimer.current) clearTimeout(loadMoreTimer.current);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);
    if (loadMoreTimer.current) clearTimeout(loadMoreTimer.current);
    loadMoreTimer.current = setTimeout(() => {
      setGrid((g) => [...g, ...buildGridPage(g.length)]);
      setLoadingMore(false);
      loadingRef.current = false;
      loadMoreTimer.current = null;
    }, 350);
  }, []);

  // Sticky-until-discovery state. The hero (kicker + title block) plus
  // the search bar form a single absolute overlay pinned at the top.
  // When the discovery section reaches the overlay's bottom, only the
  // *title block* slides up out of view — the search bar follows it up
  // and lands pinned at the top edge so the user can keep searching
  // while browsing the grid.
  const [headerH, setHeaderH] = useState(0);
  const headerHv = useSharedValue(0);
  const titleHv = useSharedValue(0);
  const discoveryY = useSharedValue(Number.MAX_SAFE_INTEGER);
  const scrollY = useSharedValue(0);

  const onHeaderLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      setHeaderH(h);
      headerHv.value = h;
    },
    [headerHv]
  );

  const onTitleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      titleHv.value = e.nativeEvent.layout.height;
    },
    [titleHv]
  );

  const onDiscoveryLayout = useCallback(
    (e: LayoutChangeEvent) => {
      discoveryY.value = e.nativeEvent.layout.y;
    },
    [discoveryY]
  );

  const triggerLoadMore = useCallback(() => {
    loadMore();
  }, [loadMore]);

  const onAnimatedScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
      const distanceFromEnd =
        e.contentSize.height - e.layoutMeasurement.height - e.contentOffset.y;
      if (distanceFromEnd < 600) {
        runOnJS(triggerLoadMore)();
      }
    },
  });

  const headerAnimStyle = useAnimatedStyle(() => {
    if (headerHv.value === 0 || titleHv.value === 0) {
      return { transform: [{ translateY: 0 }] };
    }
    const threshold = discoveryY.value - headerHv.value;
    const ty = interpolate(
      scrollY.value,
      [threshold, threshold + titleHv.value],
      [0, -titleHv.value],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateY: ty }] };
  });

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SkiaWaveField
          width={width}
          height={320}
          color="rgba(10,10,10,0.04)"
          lines={12}
          amplitude={10}
          frequency={0.02}
          speed={0.22}
          strokeWidth={1}
        />
      </View>

      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.scrollHost}>
          <Animated.ScrollView
            onScroll={onAnimatedScroll}
            // Throttle scroll callbacks at half the rate on Android. The
            // animated header pin still tracks the finger smoothly because
            // the worklet runs on UI thread, but the JS work per scroll frame
            // (load-more checks, parallax triggers) is halved.
            scrollEventThrottle={Platform.OS === 'android' ? 32 : 16}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'android'}
            overScrollMode={Platform.OS === 'android' ? 'never' : 'auto'}
            contentContainerStyle={{
              paddingTop: headerH,
              paddingBottom: 140,
            }}
          >
            {/* Trending pill row */}
            <View style={styles.trendRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendContent}
          >
            {trendingTags.map((t) => (
              <Chip
                key={t}
                label={t}
                active={activeTag === t}
                onPress={() => setActiveTag(activeTag === t ? null : t)}
                accent={palette.acid}
              />
            ))}
          </ScrollView>
        </View>

        {/* Category grid — BROWSE BY CRAFT */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.15}>
              — BROWSE BY CRAFT
            </RNText>
            <RNText style={styles.sectionCount} maxFontSizeMultiplier={1.15}>
              {categoriesGrid.length} CRAFTS
            </RNText>
          </View>
          <View style={styles.catGrid}>
            {categoriesGrid.map((c, i) => (
              <Tap
                key={c.key}
                onPress={() => setQ(c.label.toLowerCase())}
                burstColor={c.accent}
                style={{ width: CARD_WIDTH }}
              >
                <TiltCard
                  style={[styles.catCard, { backgroundColor: c.accent }] as any}
                  maxTilt={4}
                >
                  {CATEGORY_IMAGES[c.key] ? (
                    <CatCardImage source={CATEGORY_IMAGES[c.key]} scrollY={scrollY} index={i} />
                  ) : null}
                  <View style={styles.catFoot}>
                    <RNText
                      style={styles.catLabel}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.75}
                      maxFontSizeMultiplier={1.1}
                    >
                      {c.label}
                    </RNText>
                    <ArrowMark size={14} color={staticPalette.ink} strokeWidth={1.8} />
                  </View>
                </TiltCard>
              </Tap>
            ))}
          </View>
        </View>

        {/* ===== PLATFORM MODULES ===== */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.15}>
              — YOUR WORLD · 2 MODULES
            </RNText>
          </View>
          <RNText style={styles.sectionTitle} maxFontSizeMultiplier={1.1}>
            go{' '}
            <RNText style={styles.heroItalic}>further.</RNText>
          </RNText>

          {/* COMMUNITY + LEARNING — side by side */}
          <View style={styles.modulePairRow}>
            <View style={{ flex: 1 }}>
            <Tap
              style={styles.moduleCommunity}
              onPress={() => router.push('/(modules)/community' as any)}
              burstColor="#2E5BFF"
              variant="heavy"
            >
              <View style={styles.moduleCommunityIconRow}>
                {['#4A7DFF', '#2E5BFF', '#1A3FCC'].map((c, i) => (
                  <View key={i} style={[styles.moduleCommunityDot, { backgroundColor: c, marginLeft: i > 0 ? -8 : 0 }]} />
                ))}
              </View>
              <RNText style={styles.moduleCommunityTitle} maxFontSizeMultiplier={1.1}>
                BUILD{'\n'}YOUR{'\n'}CIRCLE.
              </RNText>
              <RNText style={styles.moduleCommunityMeta} maxFontSizeMultiplier={1.1}>
                connect · collab · grow
              </RNText>
              <View style={styles.moduleArrowCorner}>
                <ArrowMark size={14} color={staticPalette.bone} strokeWidth={1.6} />
              </View>
            </Tap>
            </View>

            <View style={{ flex: 1 }}>
            <Tap
              style={styles.moduleLearning}
              onPress={() => router.push('/(modules)/learning' as any)}
              burstColor="#D8FF3D"
              variant="heavy"
            >
              <View style={styles.moduleLearningIconWrap}>
                <Ionicons name="play" size={22} color={staticPalette.acid} />
              </View>
              <RNText style={styles.moduleLearningTitle} maxFontSizeMultiplier={1.1}>
                LEVEL{'\n'}UP.
              </RNText>
              <RNText style={styles.moduleLearningMeta} maxFontSizeMultiplier={1.1}>
                skills · courses{'\n'}workshops
              </RNText>
              <View style={styles.moduleArrowCorner}>
                <ArrowMark size={14} color={staticPalette.ink} strokeWidth={1.8} />
              </View>
            </Tap>
            </View>
          </View>

        </View>

        {/* Challenges row */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.15}>
              — CHALLENGES · LIVE
            </RNText>
            <Tap
              onPress={() => router.push('/(modules)/community/challenges' as any)}
              burstColor={palette.ink}
            >
              <RNText style={styles.sectionAction} maxFontSizeMultiplier={1.15}>
                SEE ALL
              </RNText>
            </Tap>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengeContent}
            decelerationRate="fast"
            snapToAlignment="start"
            snapToInterval={260 + 12}
          >
            {challenges.map((c) => (
              <Tap
                key={c.id}
                onPress={() =>
                  router.push(`/(modules)/community/challenges/${c.id}` as any)
                }
                burstColor={c.color}
                variant="heavy"
                style={[styles.challenge, { backgroundColor: c.color }]}
              >
                <View style={styles.challengeTop}>
                  <RNText
                    style={styles.challengeTag}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    maxFontSizeMultiplier={1.1}
                  >
                    {c.tag}
                  </RNText>
                  <View style={styles.challengeDays}>
                    <RNText style={styles.challengeDaysText}>
                      {c.daysLeft}D
                    </RNText>
                  </View>
                </View>
                <RNText
                  style={styles.challengePrompt}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  maxFontSizeMultiplier={1.1}
                >
                  {c.prompt}
                </RNText>
                <View style={styles.challengeBottom}>
                  <RNText style={styles.challengeMeta} maxFontSizeMultiplier={1.1}>
                    {c.entries} ENTRIES
                  </RNText>
                  <ArrowMark size={14} color={staticPalette.ink} strokeWidth={1.6} />
                </View>
              </Tap>
            ))}
          </ScrollView>
        </View>

        <View style={styles.strip}>
          <View style={styles.hairline} />
          <Marquee
            items={['RISING THIS WEEK', 'NO GATEKEEPING', 'NO PAY TO PLAY', 'JUST GOOD WORK']}
            textStyle={{
              fontFamily: fonts.bodyBold,
              fontSize: 12,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: palette.ink,
            }}
            speed={32}
          />
          <View style={styles.hairline} />
        </View>

        {/* Discovery grid — Instagram-style infinite feed */}
        <View style={styles.discoverHead} onLayout={onDiscoveryLayout}>
          <RNText style={styles.sectionKicker} maxFontSizeMultiplier={1.15}>
            — DISCOVER · FOR YOU
          </RNText>
          <RNText style={styles.sectionCount} maxFontSizeMultiplier={1.15}>
            ENDLESS
          </RNText>
        </View>
        <View style={styles.gridWrap}>
          {groupGrid(grid).map((group) => {
            if (group.type === 'flat') {
              return (
                <View key={group.key} style={styles.flatRow}>
                  {group.tiles.map((t) => (
                    <GridTileView
                      key={t.key}
                      tile={t}
                      size={TILE_SIZE}
                      styles={styles}
                    />
                  ))}
                </View>
              );
            }
            const [feature, s1, s2] = group.tiles;
            const stack = (
              <View style={styles.stack}>
                <GridTileView tile={s1} size={TILE_SIZE} styles={styles} />
                <GridTileView tile={s2} size={TILE_SIZE} styles={styles} />
              </View>
            );
            const big = (
              <GridTileView
                key={`f-${feature.key}`}
                tile={feature}
                size={TILE_BIG}
                feature
                styles={styles}
              />
            );
            return (
              <View key={group.key} style={styles.featureRow}>
                {group.side === 'left' ? big : stack}
                {group.side === 'left' ? stack : big}
              </View>
            );
          })}
        </View>
            <View style={styles.gridFoot}>
              {loadingMore ? (
                <ActivityIndicator color={palette.ink} />
              ) : (
                <RNText style={styles.gridFootText} maxFontSizeMultiplier={1.15}>
                  KEEP SCROLLING · MORE BELOW
                </RNText>
              )}
            </View>
          </Animated.ScrollView>

          {/* Sticky hero overlay — pinned at top, slides off when the
              discovery section reaches the viewport edge. */}
          <Animated.View
            pointerEvents="box-none"
            onLayout={onHeaderLayout}
            style={[styles.stickyHeader, headerAnimStyle]}
          >
            {/* Title block — slides up out of view when the discovery
                section reaches the overlay's bottom. */}
            <View onLayout={onTitleLayout}>
              <View style={styles.topRow}>
                <View style={styles.kickerRow}>
                  <Asterisk size={11} color={palette.ink} strokeWidth={1.4} />
                  <RNText style={styles.kicker} maxFontSizeMultiplier={1.15}>
                    BROWSE · CRAFT
                  </RNText>
                </View>
                <Tap
                  onPress={() => setActiveTag(null)}
                  style={styles.iconBtn}
                  burstColor={palette.acid}
                >
                  <Ionicons name="options-outline" size={18} color={palette.ink} />
                </Tap>
              </View>

              <View style={styles.heroBlock}>
                <RNText
                  style={styles.heroTitle}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                  maxFontSizeMultiplier={1.1}
                >
                  find your
                  <RNText style={styles.heroItalic}> people.</RNText>
                </RNText>
                <RNText style={styles.heroSub} maxFontSizeMultiplier={1.2}>
                  seven thousand creators. zero gatekeepers. search a name, a
                  city, or a sound.
                </RNText>
              </View>
            </View>

            {/* Search bar — stays pinned. As the title block translates
                up, the whole overlay translates with it, so the search
                lands at the top edge with a small inset for breathing
                room. */}
            <View style={styles.searchWrap}>
              <View style={styles.search}>
                <Ionicons name="search" size={18} color={palette.ink} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="SEARCH CREATORS, TAGS, SOUNDS…"
                  placeholderTextColor={palette.mute}
                  value={q}
                  onChangeText={setQ}
                  autoCapitalize="none"
                  maxFontSizeMultiplier={1.2}
                />
                {q.length > 0 ? (
                  <Tap onPress={() => setQ('')}>
                    <Ionicons name="close-circle" size={18} color={palette.ink} />
                  </Tap>
                ) : null}
              </View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function CatCardImage({
  source,
  scrollY,
  index,
}: {
  source: any;
  scrollY: SharedValue<number>;
  index: number;
}) {
  const idle = useSharedValue(0);

  React.useEffect(() => {
    idle.value = withRepeat(
      withTiming(1, { duration: 2600 + index * 280, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const animStyle = useAnimatedStyle(() => {
    const floatY = (idle.value - 0.5) * 7;
    const scrollY_ = scrollY.value * -0.01;
    return {
      transform: [{ translateY: floatY + scrollY_ }],
    };
  });

  return (
    <Animated.View
      style={[{ position: 'absolute', right: 0, top: 12, width: '68%', height: '72%' }, animStyle]}
    >
      <Image source={source} style={{ width: '100%', height: '100%' }} contentFit="contain" />
    </Animated.View>
  );
}

type StyleMap = ReturnType<typeof makeStyles>;

function GridTileView({
  tile,
  size,
  feature,
  styles,
}: {
  tile: GridTile;
  size: number;
  feature?: boolean;
  styles: StyleMap;
}) {
  return (
    <Tap
      onPress={() =>
        router.push(
          `/(modules)/portfolio/public-preview?handle=${tile.handle}` as any
        )
      }
      burstColor={tile.color}
      style={[styles.tile, { width: size, height: size, backgroundColor: tile.bg }]}
    >
      {tile.image ? (
        <Image
          source={{ uri: tile.image }}
          style={StyleSheet.absoluteFill as any}
          contentFit="cover"
          transition={180}
          placeholder={{ blurhash: 'L6H2EC=PM+yV0g-mq.wG9c010J}I' }}
          targetWidth={size}
        />
      ) : null}

      {isVideoType(tile.type) ? (
        <View style={styles.tileBadge}>
          <Ionicons name="play" size={feature ? 14 : 12} color={staticPalette.bone} />
        </View>
      ) : null}

      {feature ? (
        <>
          <View style={styles.tileScrim} pointerEvents="none" />
          <View style={styles.tileMeta}>
            <RNText
              style={styles.tileMetaCategory}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}
            >
              {tile.category}
            </RNText>
            <RNText
              style={styles.tileMetaCreator}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}
            >
              {tile.handle}
            </RNText>
          </View>
        </>
      ) : null}
    </Tap>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },
  safe: { flex: 1, backgroundColor: palette.bone },
  scrollHost: { flex: 1, position: 'relative', overflow: 'hidden' },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: palette.bone,
    paddingBottom: 4,
    zIndex: 10,
    elevation: 6,
  },

  topRow: {
    paddingHorizontal: H_PADDING,
    paddingTop: 6,
    paddingBottom: 2,
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

  heroBlock: { paddingHorizontal: H_PADDING, marginTop: 14 },
  heroTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 52,
    letterSpacing: -2.4,
    color: palette.ink,
  },
  heroItalic: {
    fontFamily: fonts.editorialItalic,
    color: palette.electric,
  },
  heroSub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 10,
    maxWidth: 360,
  },

  searchWrap: {
    paddingHorizontal: H_PADDING,
    paddingTop: 18,
    paddingBottom: 14,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.6,
    color: palette.ink,
    paddingVertical: 0,
  },

  trendRow: { paddingTop: 10, paddingBottom: 4 },
  trendContent: { gap: 8, paddingHorizontal: H_PADDING },

  section: {
    paddingTop: 28,
    paddingBottom: 4,
  },
  sectionHead: {
    paddingHorizontal: H_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionKicker: { ...T.label, color: palette.ink, opacity: 0.6 },
  sectionAction: { ...T.label, color: palette.electric },
  sectionCount: { ...T.micro, color: palette.ink, opacity: 0.55 },
  sectionTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 36,
    lineHeight: 38,
    letterSpacing: -1.4,
    color: palette.ink,
    marginTop: 12,
    paddingHorizontal: H_PADDING,
  },

  challengeContent: {
    gap: 12,
    paddingTop: 14,
    paddingHorizontal: H_PADDING,
  },
  challenge: {
    width: 260,
    minHeight: 170,
    borderRadius: 22,
    padding: 16,
    justifyContent: 'space-between',
  },
  challengeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  challengeTag: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    letterSpacing: -0.6,
    color: staticPalette.ink,
    flexShrink: 1,
  },
  challengeDays: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: staticPalette.ink,
  },
  challengeDaysText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 2,
    color: staticPalette.bone,
  },
  challengePrompt: {
    fontFamily: fonts.editorialItalic,
    fontSize: 22,
    lineHeight: 24,
    color: staticPalette.ink,
    marginTop: 12,
  },
  challengeBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  challengeMeta: { ...T.micro, color: staticPalette.ink, opacity: 0.72 },

  catGrid: {
    marginTop: 14,
    paddingHorizontal: H_PADDING,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GUTTER,
  },
  catCard: {
    height: 80,
    borderRadius: 14,
    padding: 10,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  catFoot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
  },
  catLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.5,
    lineHeight: 18,
    color: staticPalette.ink,
    flexShrink: 1,
  },

  strip: { marginTop: 22, gap: 10, backgroundColor: palette.bone, paddingVertical: 10 },
  hairline: { height: 1, backgroundColor: palette.line },

  risingList: { marginTop: 18, paddingHorizontal: H_PADDING },
  risingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  risingIdx: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: palette.ink,
    letterSpacing: -0.8,
    width: 34,
  },
  risingBody: { flex: 1, gap: 4 },
  risingName: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    color: palette.ink,
    letterSpacing: -0.5,
  },
  risingMeta: { ...T.micro, color: palette.mute },
  empty: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  emptyText: {
    ...T.body,
    color: palette.ink,
    opacity: 0.6,
    textAlign: 'center',
    maxWidth: 280,
  },

  discoverHead: {
    paddingHorizontal: H_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 36,
    paddingBottom: 14,
  },
  gridWrap: {
    gap: GRID_GAP,
  },
  featureRow: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  flatRow: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  stack: {
    width: TILE_SIZE,
    gap: GRID_GAP,
  },
  tile: {
    overflow: 'hidden',
    position: 'relative',
  },
  tileBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(10,10,10,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,10,0.4)',
  },
  tileMeta: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    gap: 4,
  },
  tileMetaCategory: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.6,
    color: staticPalette.bone,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
  tileMetaCreator: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.4,
    color: staticPalette.bone,
  },
  gridFoot: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridFootText: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.45,
  },

  /* ---- Platform modules section ---- */
  moduleEyebrow: {
    ...T.micro,
    color: staticPalette.bone,
    opacity: 0.5,
    letterSpacing: 1,
  },

  /* Community + Learning pair */
  modulePairRow: {
    flexDirection: 'row',
    gap: GUTTER,
    marginTop: GUTTER,
  },

  /* Community */
  moduleEyebrowCenter: {
    ...T.micro,
    color: staticPalette.bone,
    opacity: 0.5,
    letterSpacing: 1,
    textAlign: 'center',
  },
  moduleCommunity: {
    width: '100%',
    backgroundColor: '#0D1F5C',
    borderRadius: 22,
    padding: 16,
    paddingBottom: 44,
    overflow: 'hidden',
    alignItems: 'center',
  },
  moduleCommunityIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  moduleCommunityDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#0D1F5C',
  },
  moduleCommunityTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 24,
    letterSpacing: -1,
    color: staticPalette.bone,
    textAlign: 'center',
  },
  moduleCommunityMeta: {
    ...T.micro,
    color: staticPalette.bone,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 8,
  },
  moduleArrowCorner: {
    position: 'absolute',
    bottom: 14,
    right: 14,
  },

  /* Learning */
  moduleLearning: {
    width: '100%',
    backgroundColor: staticPalette.acid,
    borderRadius: 22,
    padding: 16,
    paddingBottom: 44,
    overflow: 'hidden',
    alignItems: 'center',
  },
  moduleLearningEyebrow: {
    ...T.micro,
    color: staticPalette.ink,
    opacity: 0.55,
    letterSpacing: 1,
    textAlign: 'center',
  },
  moduleLearningIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: staticPalette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  moduleLearningTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 24,
    letterSpacing: -1,
    color: staticPalette.ink,
    textAlign: 'center',
  },
  moduleLearningMeta: {
    ...T.micro,
    color: staticPalette.ink,
    opacity: 0.55,
    textAlign: 'center',
    marginTop: 8,
  },

});
