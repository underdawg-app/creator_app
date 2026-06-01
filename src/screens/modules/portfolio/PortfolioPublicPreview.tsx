import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';

import { Ionicons } from '@/icons';
import { router } from '@/navigation';

import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';
import { BadgePill } from '@/components/ui/BadgePill';
import { Marquee } from '@/components/ui/Marquee';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { SkiaGrain } from '@/components/skia/SkiaGrain';

import { useStore } from '@/store';
import {
  profileMock,
  platformSeed,
  rateCardSeed,
  dealsSeed,
  eventsSeed,
  productsSeed,
  userFeed,
} from '@/data/mock';

const IS_ANDROID = Platform.OS === 'android';
const { width } = Dimensions.get('window');

const SCREEN_PADDING = 12;
const GRID_GAP = 6;
const GRID_TILE = (width - SCREEN_PADDING * 2 - GRID_GAP * 2) / 3;

const LOOP_HEIGHT = 40;

/* -----------------------------------------------------------------------
 * Platform glyphs — minimal name → icon map. Keeps the platforms row
 * legible without pulling a brand-icon library.
 * --------------------------------------------------------------------- */
const platformIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  INSTAGRAM: 'logo-instagram',
  TIKTOK: 'musical-notes',
  YOUTUBE: 'logo-youtube',
  TWITTER: 'logo-twitter',
  SPOTIFY: 'musical-note',
  TWITCH: 'logo-twitch',
};

export default function PublicPreview() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const toast = useStore((s) => s.toast);

  const handleNoAt = profile.handle.replace('@', '');
  const firstName = (profile.name.split(' ')[0] || 'Sola').toUpperCase();
  const lastName = (profile.name.split(' ')[1] || 'Roux').toUpperCase();

  const portfolioPieces = useMemo(
    () => userFeed.filter((i) => i.kind === 'image').slice(0, 9),
    [],
  );

  const connectedPlatforms = useMemo(
    () => platformSeed.filter((p) => p.connected),
    [],
  );
  const totalReach = useMemo(
    () => connectedPlatforms.reduce((acc, p) => acc + p.followers, 0),
    [connectedPlatforms],
  );

  const pastBrands = useMemo(
    () => dealsSeed.map((d) => d.brand),
    [],
  );

  const featuredRates = useMemo(() => rateCardSeed.slice(0, 3), []);
  const featuredProducts = useMemo(() => productsSeed.slice(0, 3), []);
  const upcomingEvents = useMemo(() => eventsSeed.slice(0, 2), []);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={IS_ANDROID ? 32 : 16}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={IS_ANDROID}
        overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* =====================================================
            HERO — dark, wave field, public-facing CTAs
         ===================================================== */}
        <View style={styles.hero}>
          <View style={styles.heroWave} pointerEvents="none">
            <SkiaWaveField
              width={width}
              height={720}
              color="rgba(242,239,230,0.06)"
              lines={18}
              amplitude={12}
              frequency={0.02}
              speed={0.25}
              strokeWidth={1}
            />
          </View>

          <SafeAreaView edges={['top']} style={styles.heroSafe}>
            {/* Top bar — Back / Eyebrow / Share */}
            <View style={styles.heroTopBar}>
              <Tap
                onPress={() => router.back()}
                style={styles.iconBtn}
                burstColor={staticPalette.bone}
              >
                <Ionicons name="arrow-back" size={16} color={staticPalette.bone} />
              </Tap>

              <View style={styles.heroEyebrowWrap}>
                <RNText style={styles.heroEyebrow} maxFontSizeMultiplier={1.1}>
                  PUBLIC PROFILE · LIVE
                </RNText>
              </View>

              <Tap
                onPress={() => toast('Profile link copied.', 'success')}
                style={styles.iconBtn}
                burstColor={staticPalette.acid}
              >
                <Ionicons name="share-outline" size={16} color={staticPalette.bone} />
              </Tap>
            </View>

            {/* Public URL ticker — confirms the shareable address */}
            <View style={styles.urlStrip}>
              <Marquee
                items={[
                  `UNDERDAWGS.COM / ${handleNoAt.toUpperCase()}`,
                  'OPEN TO WORK',
                  'NEW PIECES THIS WEEK',
                  'INDIE · UNSIGNED',
                ]}
                speed={28}
                separator="   ·   "
                textStyle={styles.urlText}
              />
            </View>

            {/* Avatar — centered on top */}
            <View style={styles.avatarWrap}>
              <View style={styles.avatarRing}>
                <Image
                  source={{ uri: profile.avatar || profileMock.avatar }}
                  style={styles.avatar}
                  cachePolicy="memory-disk"
                  contentFit="cover"
                  transition={150}
                  priority="high"
                  targetWidth={140}
                />
              </View>
              <View style={styles.avatarStatusDot} />
            </View>

            {/* Name + handle */}
            <View style={styles.nameBlock}>
              <RNText
                style={styles.bigName}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
                maxFontSizeMultiplier={1.1}
              >
                {firstName} <RNText style={styles.bigNameAccent}>{lastName}.</RNText>
              </RNText>
              <RNText style={styles.handleText} maxFontSizeMultiplier={1.1}>
                {profile.handle}
              </RNText>
            </View>

            {/* Meta — craft · location */}
            <View style={styles.metaRow}>
              <RNText
                style={styles.metaText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                maxFontSizeMultiplier={1.1}
              >
                {profile.type} · {profile.location}
              </RNText>
            </View>

            {/* Pills */}
            <View style={styles.pillRow}>
              <BadgePill tier="RISING" accent={palette.acid} inverse />
              <BadgePill label="VERIFIED" accent={palette.electric} inverse />
              <BadgePill label="OPEN TO HIRE" accent={palette.blush} inverse />
            </View>

            {/* Bio */}
            <RNText
              style={styles.bio}
              numberOfLines={3}
              maxFontSizeMultiplier={1.15}
            >
              {profile.bio}
            </RNText>

            {/* Stats row — public read */}
            <View style={styles.statsRow}>
              <StatCol label="FOLLOWERS" value={compact(profileMock.stats.followers)} />
              <StatDivider />
              <StatCol label="FOLLOWING" value={compact(profileMock.stats.following)} />
              <StatDivider />
              <StatCol label="REPUTATION" value={String(profile.reputation)} accent />
              <StatDivider />
              <StatCol label="$ EARNED" value={compact(profileMock.stats.earned)} />
            </View>

            {/* Primary CTAs — Follow / Message / Work With Me */}
            <View style={styles.ctaRow}>
              <Tap
                style={styles.ctaPrimary}
                burstColor={palette.ink}
                variant="heavy"
                onPress={() => toast('Sign in to follow.', 'success')}
              >
                <Ionicons name="add" size={14} color={staticPalette.ink} />
                <RNText style={styles.ctaPrimaryLabel} maxFontSizeMultiplier={1.1}>
                  FOLLOW
                </RNText>
              </Tap>
              <Tap
                style={styles.ctaGhost}
                burstColor={staticPalette.bone}
                onPress={() => toast('Sign in to message.', 'success')}
              >
                <Ionicons name="chatbubble-outline" size={14} color={staticPalette.bone} />
                <RNText style={styles.ctaGhostLabel} maxFontSizeMultiplier={1.1}>
                  MESSAGE
                </RNText>
              </Tap>
            </View>

            <Tap
              style={styles.workWithCard}
              burstColor={palette.electric}
              variant="heavy"
              onPress={() => toast('Inquiry form opened.', 'success')}
            >
              <View style={styles.workWithLeft}>
                <View style={styles.workWithIcon}>
                  <Ionicons name="briefcase" size={16} color={staticPalette.ink} />
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.workWithLabel} maxFontSizeMultiplier={1.1}>
                    WORK WITH ME
                  </RNText>
                  <RNText style={styles.workWithSub} maxFontSizeMultiplier={1.15}>
                    Open inquiry form — rates from ${compact(rateCardSeed[0].base)}
                  </RNText>
                </View>
              </View>
              <Ionicons name="arrow-forward" size={16} color={staticPalette.bone} />
            </Tap>

            {/* Share row — link / socials / QR */}
            <View style={styles.shareRow}>
              <ShareBtn
                icon="link-outline"
                label="COPY LINK"
                onPress={() => toast('Link copied.', 'success')}
              />
              <ShareBtn
                icon="paper-plane-outline"
                label="SHARE"
                onPress={() => toast('Share sheet opened.', 'success')}
              />
              <ShareBtn
                icon="qr-code-outline"
                label="QR"
                onPress={() => toast('QR generated.', 'success')}
              />
            </View>
          </SafeAreaView>

          <SkiaGrain width={width} height={720} intensity={0.08} tint={[1, 1, 1, 0.16]} />
        </View>

        {/* =====================================================
            MARQUEE — transition strip
         ===================================================== */}
        <View style={styles.loopStrip}>
          <Marquee
            items={[
              'PORTFOLIO',
              'WORK',
              'PLATFORMS',
              'RATES',
              'PRESS',
              'EVENTS',
            ]}
            speed={48}
            direction="left"
            separator="   ·   "
            textStyle={styles.loopText}
            style={{ height: LOOP_HEIGHT, width, backgroundColor: staticPalette.ink }}
          />
        </View>

        {/* =====================================================
            OPEN TO — collab statuses
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead
            eyebrow="OPEN TO"
            title="how to collab."
          />
          <View style={styles.chipRow}>
            {profile.openTo.map((o) => (
              <Chip key={o} label={o} active accent={palette.acid} />
            ))}
          </View>
        </View>

        {/* =====================================================
            CRAFT · NICHES
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead eyebrow="CRAFT" title="what i make." />
          <View style={styles.chipRow}>
            {profile.niches.map((n, i) => (
              <Chip
                key={n}
                label={n}
                active
                accent={
                  i % 3 === 0
                    ? palette.electric
                    : i % 3 === 1
                      ? palette.blush
                      : palette.ember
                }
              />
            ))}
          </View>
        </View>

        {/* =====================================================
            PORTFOLIO GRID — 9 featured works
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead
            eyebrow={`FEATURED / ${String(portfolioPieces.length).padStart(2, '0')}`}
            title="the work."
          />
          <View style={styles.grid}>
            {portfolioPieces.map((p, i) => (
              <Tap
                key={p.id}
                style={[
                  styles.gridTile,
                  i === 0 && styles.gridTileFeatured,
                  { backgroundColor: palette.ink },
                ]}
                onPress={() => toast('Open piece.', 'success')}
                burstColor={p.accent}
              >
                {p.image ? (
                  <Image
                    source={{ uri: p.image }}
                    style={StyleSheet.absoluteFill as any}
                    contentFit="cover"
                    transition={200}
                    targetWidth={i === 0 ? GRID_TILE * 2 : GRID_TILE}
                  />
                ) : null}
                <View style={styles.gridScrim} pointerEvents="none" />
                <View style={[styles.gridAccent, { backgroundColor: p.accent }]} />
                {i === 0 ? (
                  <View style={styles.gridMeta}>
                    <RNText
                      style={styles.gridTitle}
                      numberOfLines={1}
                      maxFontSizeMultiplier={1.1}
                    >
                      {p.title}
                    </RNText>
                    <RNText style={styles.gridSub} maxFontSizeMultiplier={1.1}>
                      {p.category ?? 'WORK'} · {compact(p.likes)} likes
                    </RNText>
                  </View>
                ) : null}
              </Tap>
            ))}
          </View>
        </View>

        {/* =====================================================
            PLATFORMS — connected accounts + total reach
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead
            eyebrow={`PLATFORMS · ${compact(totalReach)} REACH`}
            title="find me everywhere."
          />
          <View style={styles.platformList}>
            {platformSeed.map((p) => (
              <Tap
                key={p.key}
                style={styles.platformRow}
                burstColor={p.accent}
                onPress={() => toast(`Opening ${p.name.toLowerCase()}.`, 'success')}
                disabled={!p.connected}
              >
                <View
                  style={[
                    styles.platformIcon,
                    { backgroundColor: p.connected ? p.accent : palette.boneMuted },
                  ]}
                >
                  <Ionicons
                    name={platformIcon[p.name] ?? 'globe-outline'}
                    size={16}
                    color={p.connected ? staticPalette.ink : palette.ink}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.platformName} maxFontSizeMultiplier={1.1}>
                    {p.name}
                  </RNText>
                  <RNText style={styles.platformHandle} maxFontSizeMultiplier={1.1}>
                    {p.connected ? p.handle : 'Not connected'}
                  </RNText>
                </View>
                <View style={styles.platformRight}>
                  <RNText style={styles.platformCount} maxFontSizeMultiplier={1.1}>
                    {p.connected ? compact(p.followers) : '—'}
                  </RNText>
                  {p.connected && p.growth > 0 ? (
                    <RNText style={styles.platformGrowth} maxFontSizeMultiplier={1.1}>
                      +{p.growth.toFixed(1)}%
                    </RNText>
                  ) : null}
                </View>
                {p.connected ? (
                  <Ionicons name="arrow-forward" size={13} color={palette.ink} />
                ) : null}
              </Tap>
            ))}
          </View>
        </View>

        {/* =====================================================
            RATES — top 3 services, "from"
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead
            eyebrow="RATES · FROM"
            title="the price tag."
          />
          <View style={styles.rateList}>
            {featuredRates.map((r) => (
              <View key={r.key} style={styles.rateRow}>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.rateName} maxFontSizeMultiplier={1.1}>
                    {r.name}
                  </RNText>
                  <RNText style={styles.rateDesc} maxFontSizeMultiplier={1.15}>
                    {r.desc}
                  </RNText>
                </View>
                <View style={styles.ratePriceWrap}>
                  <RNText style={styles.rateFrom} maxFontSizeMultiplier={1.1}>
                    FROM
                  </RNText>
                  <RNText style={styles.ratePrice} maxFontSizeMultiplier={1.1}>
                    ${compact(r.base)}
                  </RNText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* =====================================================
            PAST BRANDS — credibility row
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead
            eyebrow="WORKED WITH"
            title="past clients."
          />
          <View style={styles.chipRow}>
            {pastBrands.map((b) => (
              <View key={b} style={styles.brandChip}>
                <RNText style={styles.brandChipLabel} maxFontSizeMultiplier={1.1}>
                  {b}
                </RNText>
              </View>
            ))}
          </View>
        </View>

        {/* =====================================================
            MERCH STORE — quick links to products
         ===================================================== */}
        {featuredProducts.length > 0 ? (
          <View style={styles.section}>
            <SectionHead
              eyebrow="MERCH"
              title="own a piece."
              action={{
                label: 'STORE',
                onPress: () => toast('Opening store.', 'success'),
              }}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.merchScrollContent}
              style={styles.merchScroll}
            >
              {featuredProducts.map((prod) => (
                <Tap
                  key={prod.id}
                  style={styles.merchCard}
                  burstColor={prod.color}
                  onPress={() => toast('Opening product.', 'success')}
                >
                  <View style={[styles.merchThumb, { backgroundColor: prod.bg }]}>
                    <View
                      style={[styles.merchSwatch, { backgroundColor: prod.color }]}
                    />
                    <RNText
                      style={[styles.merchKind, { color: prod.fg }]}
                      maxFontSizeMultiplier={1.1}
                    >
                      {prod.type}
                    </RNText>
                  </View>
                  <RNText
                    style={styles.merchTitle}
                    numberOfLines={1}
                    maxFontSizeMultiplier={1.1}
                  >
                    {prod.name}
                  </RNText>
                  <View style={styles.merchFoot}>
                    <RNText style={styles.merchPrice} maxFontSizeMultiplier={1.1}>
                      ${compact(prod.baseCost + prod.margin)}
                    </RNText>
                    <RNText style={styles.merchSold} maxFontSizeMultiplier={1.1}>
                      {prod.sold} sold
                    </RNText>
                  </View>
                </Tap>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {/* =====================================================
            UPCOMING — events
         ===================================================== */}
        {upcomingEvents.length > 0 ? (
          <View style={styles.section}>
            <SectionHead eyebrow="UPCOMING" title="catch me live." />
            <View style={styles.eventList}>
              {upcomingEvents.map((e) => (
                <Tap
                  key={e.id}
                  style={styles.eventRow}
                  burstColor={e.accent}
                  onPress={() => toast('Opening event.', 'success')}
                >
                  <View style={[styles.eventDate, { backgroundColor: e.accent }]}>
                    <RNText style={styles.eventDateText} maxFontSizeMultiplier={1.1}>
                      {e.date}
                    </RNText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <RNText
                      style={styles.eventTitle}
                      numberOfLines={1}
                      maxFontSizeMultiplier={1.1}
                    >
                      {e.title}
                    </RNText>
                    <RNText style={styles.eventHost} maxFontSizeMultiplier={1.1}>
                      {e.host} · {e.rsvps} going
                    </RNText>
                  </View>
                  <Ionicons name="arrow-forward" size={14} color={palette.ink} />
                </Tap>
              ))}
            </View>
          </View>
        ) : null}

        {/* =====================================================
            PRESS — editorial list
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead eyebrow="PRESS" title="what they wrote." />
          <View style={styles.pressList}>
            {[
              { id: 'pr1', source: 'DEEPFIELD MAG', quote: 'paints the bits of the city that dry quickly.' },
              { id: 'pr2', source: 'SLOW PRESS', quote: 'unsigned and unbothered — the next NY abstractionist.' },
              { id: 'pr3', source: 'UNDERDAWG WEEKLY', quote: 'resin romantic with a paper-mill discipline.' },
            ].map((p) => (
              <View key={p.id} style={styles.pressRow}>
                <RNText style={styles.pressSource} maxFontSizeMultiplier={1.1}>
                  {p.source}
                </RNText>
                <RNText style={styles.pressQuote} maxFontSizeMultiplier={1.15}>
                  “{p.quote}”
                </RNText>
              </View>
            ))}
          </View>
        </View>

        {/* =====================================================
            FOOTER — back to top + edit hint
         ===================================================== */}
        <View style={styles.footer}>
          <RNText style={styles.footerHandle} maxFontSizeMultiplier={1.1}>
            UNDERDAWGS.COM / {handleNoAt.toUpperCase()}
          </RNText>
          <Tap
            style={styles.footerEdit}
            burstColor={palette.acid}
            onPress={() => router.push('/(modules)/profile/edit' as any)}
          >
            <Ionicons name="create-outline" size={13} color={staticPalette.ink} />
            <RNText style={styles.footerEditLabel} maxFontSizeMultiplier={1.1}>
              EDIT PROFILE
            </RNText>
          </Tap>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Sub-components
 * --------------------------------------------------------------------- */

function StatCol({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.statCol}>
      <RNText
        style={[styles.statValue, accent && { color: palette.acid }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {value}
      </RNText>
      <RNText
        style={styles.statLabel}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        maxFontSizeMultiplier={1.1}
      >
        {label}
      </RNText>
    </View>
  );
}

function StatDivider() {
  const styles = useThemedPaletteStyles(makeStyles);
  return <View style={styles.statDivider} />;
}

function ShareBtn({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap style={styles.shareBtn} burstColor={staticPalette.bone} onPress={onPress}>
      <Ionicons name={icon} size={14} color={staticPalette.bone} />
      <RNText style={styles.shareLabel} maxFontSizeMultiplier={1.1}>
        {label}
      </RNText>
    </Tap>
  );
}

function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { label: string; onPress: () => void };
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.sectionHead}>
      <View style={{ flex: 1 }}>
        <RNText style={styles.sectionEyebrow} maxFontSizeMultiplier={1.15}>
          {eyebrow}
        </RNText>
        <RNText
          style={styles.sectionTitle}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {title}
        </RNText>
      </View>
      {action ? (
        <Tap
          onPress={action.onPress}
          style={styles.sectionAction}
          burstColor={palette.acid}
        >
          <RNText style={styles.sectionActionLabel} maxFontSizeMultiplier={1.1}>
            {action.label}
          </RNText>
          <Ionicons name="arrow-forward" size={12} color={staticPalette.ink} />
        </Tap>
      ) : null}
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Utility
 * --------------------------------------------------------------------- */

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toString();
}

/* -----------------------------------------------------------------------
 * Styles
 * --------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  /* ---------- HERO ---------- */
  hero: {
    backgroundColor: staticPalette.ink,
    overflow: 'hidden',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  heroWave: { position: 'absolute', top: 0, left: 0, right: 0 },
  heroSafe: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 28,
  },

  heroTopBar: {
    paddingTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEyebrowWrap: {
    flex: 1,
    alignItems: 'center',
  },
  heroEyebrow: {
    ...T.label,
    color: staticPalette.bone,
    opacity: 0.7,
  },

  /* ---------- URL ticker ---------- */
  urlStrip: {
    marginTop: 14,
    height: 22,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(242,239,230,0.12)',
    justifyContent: 'center',
    overflow: 'hidden',
    marginHorizontal: -SCREEN_PADDING,
  },
  urlText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: staticPalette.bone,
    opacity: 0.65,
  },

  /* ---------- Avatar ---------- */
  avatarWrap: {
    width: 108,
    height: 108,
    marginTop: 24,
    alignSelf: 'center',
  },
  avatarRing: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: staticPalette.acid,
    padding: 3,
    backgroundColor: staticPalette.ink,
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'rgba(242,239,230,0.12)',
  },
  avatarStatusDot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: staticPalette.acid,
    borderWidth: 2,
    borderColor: staticPalette.ink,
  },

  /* ---------- Name ---------- */
  nameBlock: { alignItems: 'center', marginTop: 16 },
  bigName: {
    fontFamily: fonts.displayBold,
    fontSize: 42,
    lineHeight: 42,
    color: staticPalette.bone,
    letterSpacing: -1.6,
    textAlign: 'center',
  },
  bigNameAccent: {
    fontFamily: fonts.displayBold,
    fontSize: 42,
    lineHeight: 42,
    color: staticPalette.acid,
    letterSpacing: -1.6,
  },
  handleText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: staticPalette.acid,
    opacity: 0.85,
    marginTop: 6,
    letterSpacing: 0.2,
  },

  metaRow: { marginTop: 12, alignItems: 'center' },
  metaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1.2,
    color: staticPalette.bone,
    opacity: 0.85,
    textTransform: 'uppercase',
  },

  pillRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  bio: {
    fontFamily: fonts.editorial,
    fontSize: 15,
    lineHeight: 22,
    color: staticPalette.bone,
    opacity: 0.86,
    marginTop: 16,
    maxWidth: 360,
    textAlign: 'center',
    alignSelf: 'center',
  },

  /* ---------- Stats row ---------- */
  statsRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 4,
  },
  statValue: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    lineHeight: 22,
    letterSpacing: -0.6,
    color: staticPalette.bone,
    textAlign: 'center',
    width: '100%',
  },
  statLabel: {
    ...T.micro,
    fontSize: 9,
    color: staticPalette.mute,
    textAlign: 'center',
    width: '100%',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(242,239,230,0.18)',
  },

  /* ---------- CTAs ---------- */
  ctaRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  ctaPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: staticPalette.acid,
    height: 48,
    borderRadius: 24,
  },
  ctaPrimaryLabel: { ...T.button, fontSize: 12, color: staticPalette.ink },
  ctaGhost: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.32)',
  },
  ctaGhostLabel: { ...T.button, fontSize: 12, color: staticPalette.bone },

  workWithCard: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(46,91,255,0.5)',
    backgroundColor: 'rgba(46,91,255,0.12)',
  },
  workWithLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  workWithIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: staticPalette.electric,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workWithLabel: {
    ...T.button,
    fontSize: 11,
    color: staticPalette.bone,
  },
  workWithSub: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: 'rgba(242,239,230,0.7)',
    marginTop: 2,
  },

  /* ---------- Share row ---------- */
  shareRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    justifyContent: 'space-between',
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.22)',
  },
  shareLabel: {
    ...T.micro,
    fontSize: 10,
    color: staticPalette.bone,
  },

  /* ---------- Marquee transition ---------- */
  loopStrip: {
    height: LOOP_HEIGHT,
    overflow: 'hidden',
    backgroundColor: staticPalette.ink,
  },
  loopText: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    lineHeight: LOOP_HEIGHT,
    letterSpacing: -0.4,
    color: staticPalette.bone,
  },

  /* ---------- Generic sections ---------- */
  section: {
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 28,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: palette.line,
    gap: 12,
  },
  sectionEyebrow: { ...T.label, color: palette.ink, opacity: 0.55 },
  sectionTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: -1.0,
    color: palette.ink,
    marginTop: 6,
  },
  sectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: staticPalette.acid,
  },
  sectionActionLabel: {
    ...T.button,
    fontSize: 11,
    color: staticPalette.ink,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  /* ---------- Portfolio grid ---------- */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  gridTile: {
    width: GRID_TILE,
    height: GRID_TILE,
    overflow: 'hidden',
    borderRadius: 6,
  },
  gridTileFeatured: {
    width: GRID_TILE * 2 + GRID_GAP,
    height: GRID_TILE * 2 + GRID_GAP,
    borderRadius: 12,
  },
  gridScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  gridAccent: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: 22,
    height: 3,
    borderRadius: 2,
  },
  gridMeta: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  gridTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.6,
    color: staticPalette.bone,
  },
  gridSub: {
    ...T.micro,
    color: 'rgba(242,239,230,0.78)',
    marginTop: 4,
  },

  /* ---------- Platforms ---------- */
  platformList: { gap: 10 },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  platformIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformName: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 1.4,
    color: palette.ink,
    textTransform: 'uppercase',
  },
  platformHandle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: palette.mute,
    marginTop: 2,
  },
  platformRight: { alignItems: 'flex-end', gap: 2 },
  platformCount: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    color: palette.ink,
    letterSpacing: -0.3,
  },
  platformGrowth: {
    ...T.micro,
    fontSize: 9,
    color: palette.electric,
  },

  /* ---------- Rates ---------- */
  rateList: { gap: 4 },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  rateName: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  rateDesc: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 16,
    color: palette.mute,
    marginTop: 4,
  },
  ratePriceWrap: { alignItems: 'flex-end' },
  rateFrom: {
    ...T.micro,
    fontSize: 9,
    color: palette.mute,
  },
  ratePrice: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    letterSpacing: -0.8,
    color: palette.ink,
    marginTop: 2,
  },

  /* ---------- Brand chips ---------- */
  brandChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.ink,
    backgroundColor: 'transparent',
  },
  brandChipLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: palette.ink,
    textTransform: 'uppercase',
  },

  /* ---------- Merch ---------- */
  merchScroll: { marginHorizontal: -SCREEN_PADDING },
  merchScrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 12,
  },
  merchCard: {
    width: 160,
    gap: 8,
  },
  merchThumb: {
    width: 160,
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: palette.boneSoft,
    padding: 14,
    justifyContent: 'flex-end',
  },
  merchSwatch: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  merchKind: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  merchTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  merchFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  merchPrice: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 0.4,
    color: palette.ink,
  },
  merchSold: {
    ...T.micro,
    fontSize: 9,
    color: palette.mute,
  },

  /* ---------- Events ---------- */
  eventList: { gap: 10 },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  eventDate: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 64,
    alignItems: 'center',
  },
  eventDateText: {
    fontFamily: fonts.displayBold,
    fontSize: 12,
    letterSpacing: 1.2,
    color: staticPalette.ink,
  },
  eventTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  eventHost: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: palette.mute,
    marginTop: 4,
  },

  /* ---------- Press ---------- */
  pressList: { gap: 4 },
  pressRow: {
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  pressSource: { ...T.label, color: palette.ink, opacity: 0.55 },
  pressQuote: {
    fontFamily: fonts.editorialItalic,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: palette.ink,
    marginTop: 8,
  },

  /* ---------- Footer ---------- */
  footer: {
    marginTop: 32,
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  footerHandle: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
    flex: 1,
  },
  footerEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: staticPalette.acid,
  },
  footerEditLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },
});
