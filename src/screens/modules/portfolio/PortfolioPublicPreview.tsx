// PortfolioPublicPreview — the public-facing twin of PortfolioIndex: exactly
// what brands and fans see when they open a creator's profile link. Rebuilt on
// the shared UI system (ScreenFrame + ModuleHeader + Section) so it reads as a
// "public preview" of the portfolio. Same profile / feed / platform / rate-card
// / deals / events / products seeds — only the visual shell is restructured.

import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  ScrollView,
} from 'react-native';

import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';

import { Ionicons } from '@/icons';
import { router } from '@/navigation';

import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';

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

const { width } = Dimensions.get('window');

const SCREEN_PADDING = 12;
const GRID_GAP = 6;
const GRID_TILE = (width - SCREEN_PADDING * 2 - GRID_GAP * 2) / 3;

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

  const pastBrands = useMemo(() => dealsSeed.map((d) => d.brand), []);

  const featuredRates = useMemo(() => rateCardSeed.slice(0, 3), []);
  const featuredProducts = useMemo(() => productsSeed.slice(0, 3), []);
  const upcomingEvents = useMemo(() => eventsSeed.slice(0, 2), []);

  const featuredPiece = portfolioPieces[0];
  const gridPieces = portfolioPieces.slice(1, 9);

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          eyebrow="PUBLIC PREVIEW"
          title={profile.name || profileMock.name}
          onBack={() => router.back()}
          right={
            <Tap
              onPress={() => toast('Profile link copied.', 'success')}
              style={styles.headerBtn}
              burstColor={palette.ink}
            >
              <Ionicons name="share-outline" size={16} color={palette.ink} />
            </Tap>
          }
        />
      }
    >
      {/* ===== Identity hero — what brands & fans land on ===== */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={[styles.avatarRing, { borderColor: palette.electric }]}>
            <Image
              source={{ uri: profile.avatar || profileMock.avatar }}
              style={styles.avatar}
              contentFit="cover"
              targetWidth={120}
            />
          </View>
          <View style={styles.heroRight}>
            <View style={styles.availPill}>
              <View style={[styles.availDot, { backgroundColor: palette.electric }]} />
              <RNText style={styles.availText} maxFontSizeMultiplier={1.1}>
                OPEN TO HIRE
              </RNText>
            </View>
            <RNText
              style={styles.heroName}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.6}
              maxFontSizeMultiplier={1.1}
            >
              {profile.name || profileMock.name}
            </RNText>
            <RNText style={styles.heroHandle} maxFontSizeMultiplier={1.1}>
              {profile.handle} · {profile.type} · {profile.location}
            </RNText>
          </View>
        </View>

        <RNText style={styles.bio} numberOfLines={3} maxFontSizeMultiplier={1.2}>
          {profile.bio}
        </RNText>

        {/* Public read — headline stats */}
        <View style={styles.statStrip}>
          <Stat label="FOLLOWERS" value={compact(profileMock.stats.followers)} />
          <View style={styles.statDiv} />
          <Stat label="REACH" value={compact(totalReach)} />
          <View style={styles.statDiv} />
          <Stat label="REPUTATION" value={String(profile.reputation)} accent />
          <View style={styles.statDiv} />
          <Stat label="$ EARNED" value={compact(profileMock.stats.earned)} />
        </View>

        {/* Public CTAs — follow / message */}
        <View style={styles.ctaRow}>
          <Tap
            onPress={() => toast('Sign in to follow.', 'success')}
            variant="heavy"
            burstColor={palette.electric}
            style={[styles.ctaPrimary, { backgroundColor: palette.ink }]}
          >
            <Ionicons name="add" size={15} color={palette.bone} />
            <RNText style={[styles.ctaPrimaryLabel, { color: palette.bone }]} maxFontSizeMultiplier={1.1}>
              FOLLOW
            </RNText>
          </Tap>
          <Tap
            onPress={() => toast('Sign in to message.', 'success')}
            burstColor={palette.electric}
            style={[styles.ctaGhost, { borderColor: palette.ink }]}
          >
            <Ionicons name="chatbubble-outline" size={15} color={palette.ink} />
            <RNText style={styles.ctaGhostLabel} maxFontSizeMultiplier={1.1}>
              MESSAGE
            </RNText>
          </Tap>
        </View>

        {/* Work with me — primary inquiry */}
        <Tap
          onPress={() => toast('Inquiry form opened.', 'success')}
          variant="heavy"
          burstColor={palette.electric}
          style={styles.workWithCard}
        >
          <View style={styles.workWithLeft}>
            <View style={[styles.workWithIcon, { backgroundColor: palette.electric }]}>
              <Ionicons name="briefcase" size={16} color={staticPalette.bone} />
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
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </Tap>
      </View>

      {/* ===== Featured work ===== */}
      <Section
        eyebrow={`THE WORK · ${String(portfolioPieces.length).padStart(2, '0')}`}
        title="the work."
      >
        {featuredPiece ? (
          <Tap
            onPress={() => toast('Open piece.', 'success')}
            burstColor={featuredPiece.accent}
            style={[styles.featured, { backgroundColor: palette.ink }]}
          >
            {featuredPiece.image ? (
              <Image
                source={{ uri: featuredPiece.image }}
                style={StyleSheet.absoluteFill as any}
                contentFit="cover"
                transition={200}
                targetWidth={width}
              />
            ) : null}
            <View style={styles.featuredScrim} pointerEvents="none" />
            <View style={[styles.featuredAccent, { backgroundColor: featuredPiece.accent }]} />
            <View style={styles.featuredMeta}>
              <RNText style={styles.featuredTag} maxFontSizeMultiplier={1.1}>
                {featuredPiece.category ?? 'WORK'}
              </RNText>
              <RNText style={styles.featuredTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {featuredPiece.title}
              </RNText>
              <RNText style={styles.featuredSub} maxFontSizeMultiplier={1.1}>
                {compact(featuredPiece.likes)} likes
              </RNText>
            </View>
          </Tap>
        ) : (
          <View style={styles.emptyWork}>
            <Ionicons name="images-outline" size={28} color={palette.mute} />
            <RNText style={styles.emptyWorkText} maxFontSizeMultiplier={1.2}>
              No work to show yet.
            </RNText>
          </View>
        )}

        {gridPieces.length > 0 ? (
          <View style={styles.grid}>
            {gridPieces.map((p) => (
              <Tap
                key={p.id}
                style={[styles.gridTile, { backgroundColor: palette.ink }]}
                onPress={() => toast('Open piece.', 'success')}
                burstColor={p.accent}
              >
                {p.image ? (
                  <Image
                    source={{ uri: p.image }}
                    style={StyleSheet.absoluteFill as any}
                    contentFit="cover"
                    transition={200}
                    targetWidth={GRID_TILE}
                  />
                ) : null}
                <View style={styles.gridScrim} pointerEvents="none" />
                <View style={[styles.gridAccent, { backgroundColor: p.accent }]} />
              </Tap>
            ))}
          </View>
        ) : null}
      </Section>

      {/* ===== Platforms ===== */}
      <Section
        eyebrow={`PLATFORMS · ${compact(totalReach)} REACH`}
        title="find me everywhere."
      >
        <View style={styles.platformList}>
          {platformSeed.map((p) => (
            <Tap
              key={p.key}
              style={[styles.platformRow, { borderColor: palette.line }]}
              burstColor={p.accent}
              onPress={() => toast(`Opening ${p.name.toLowerCase()}.`, 'success')}
              disabled={!p.connected}
            >
              <View
                style={[
                  styles.platformIcon,
                  {
                    backgroundColor: p.connected ? p.accent : 'transparent',
                    borderColor: p.connected ? p.accent : palette.line,
                  },
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
      </Section>

      {/* ===== Open to ===== */}
      <Section eyebrow="OPEN TO" title="how to collab.">
        <View style={styles.chipRow}>
          {profile.openTo.map((o) => (
            <Chip key={o} label={o} active accent={palette.electric} />
          ))}
        </View>
      </Section>

      {/* ===== Craft ===== */}
      <Section eyebrow="CRAFT" title="what i make.">
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
      </Section>

      {/* ===== Rates ===== */}
      <Section eyebrow="RATES · FROM" title="the price tag.">
        <View style={styles.rateList}>
          {featuredRates.map((r) => (
            <View key={r.key} style={[styles.rateRow, { borderColor: palette.line }]}>
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
      </Section>

      {/* ===== Past clients ===== */}
      <Section eyebrow="WORKED WITH" title="past clients.">
        <View style={styles.chipRow}>
          {pastBrands.map((b) => (
            <View key={b} style={[styles.brandChip, { borderColor: palette.ink }]}>
              <RNText style={styles.brandChipLabel} maxFontSizeMultiplier={1.1}>
                {b}
              </RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* ===== Merch store ===== */}
      {featuredProducts.length > 0 ? (
        <Section
          eyebrow="MERCH"
          title="own a piece."
          action={{ label: 'STORE', onPress: () => toast('Opening store.', 'success') }}
        >
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
                  <View style={[styles.merchSwatch, { backgroundColor: prod.color }]} />
                  <RNText
                    style={[styles.merchKind, { color: prod.fg }]}
                    maxFontSizeMultiplier={1.1}
                  >
                    {prod.type}
                  </RNText>
                </View>
                <RNText style={styles.merchTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
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
        </Section>
      ) : null}

      {/* ===== Upcoming ===== */}
      {upcomingEvents.length > 0 ? (
        <Section eyebrow="UPCOMING" title="catch me live.">
          <View style={styles.eventList}>
            {upcomingEvents.map((e) => (
              <Tap
                key={e.id}
                style={[styles.eventRow, { borderColor: palette.line }]}
                burstColor={e.accent}
                onPress={() => toast('Opening event.', 'success')}
              >
                <View style={[styles.eventDate, { backgroundColor: e.accent }]}>
                  <RNText style={styles.eventDateText} maxFontSizeMultiplier={1.1}>
                    {e.date}
                  </RNText>
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.eventTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
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
        </Section>
      ) : null}

      {/* ===== Press ===== */}
      <Section eyebrow="PRESS" title="what they wrote.">
        <View style={styles.pressList}>
          {[
            { id: 'pr1', source: 'DEEPFIELD MAG', quote: 'paints the bits of the city that dry quickly.' },
            { id: 'pr2', source: 'SLOW PRESS', quote: 'unsigned and unbothered — the next NY abstractionist.' },
            { id: 'pr3', source: 'UNDERDAWG WEEKLY', quote: 'resin romantic with a paper-mill discipline.' },
          ].map((p) => (
            <View key={p.id} style={[styles.pressRow, { borderColor: palette.line }]}>
              <RNText style={styles.pressSource} maxFontSizeMultiplier={1.1}>
                {p.source}
              </RNText>
              <RNText style={styles.pressQuote} maxFontSizeMultiplier={1.15}>
                “{p.quote}”
              </RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* ===== Footer — link + edit ===== */}
      <View style={[styles.footer, { borderColor: palette.line }]}>
        <RNText style={styles.footerHandle} maxFontSizeMultiplier={1.1}>
          UNDERDAWGS.COM / {handleNoAt.toUpperCase()}
        </RNText>
        <Tap
          style={[styles.footerEdit, { backgroundColor: palette.ink }]}
          burstColor={palette.electric}
          onPress={() => router.push('/(modules)/profile/edit' as any)}
        >
          <Ionicons name="create-outline" size={13} color={palette.bone} />
          <RNText style={[styles.footerEditLabel, { color: palette.bone }]} maxFontSizeMultiplier={1.1}>
            EDIT PROFILE
          </RNText>
        </Tap>
      </View>
    </ScreenFrame>
  );
}

/* -----------------------------------------------------------------------
 * Sub-components
 * --------------------------------------------------------------------- */

function Stat({
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
    <View style={styles.stat}>
      <RNText
        style={[styles.statValue, accent && { color: palette.electric }]}
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
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Hero ---------- */
  hero: {
    marginTop: 6,
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
    gap: 16,
  },
  heroTop: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    padding: 3,
    overflow: 'hidden',
    backgroundColor: palette.boneSoft,
  },
  avatar: { flex: 1, borderRadius: 40, overflow: 'hidden' },
  heroRight: { flex: 1, gap: 6 },
  availPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.line,
  },
  availDot: { width: 6, height: 6, borderRadius: 3 },
  availText: { ...T.micro, color: palette.ink, fontSize: 9 },
  heroName: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -1,
    color: palette.ink,
  },
  heroHandle: { ...T.small, color: palette.mute },

  bio: { ...T.body, color: palette.ink, opacity: 0.85, lineHeight: 21 },

  statStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: palette.line,
  },
  stat: { flex: 1, alignItems: 'center', gap: 3, paddingHorizontal: 4 },
  statValue: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    letterSpacing: -0.5,
    color: palette.ink,
    textAlign: 'center',
    width: '100%',
  },
  statLabel: { ...T.micro, fontSize: 9, color: palette.mute, textAlign: 'center', width: '100%' },
  statDiv: { width: 1, height: 30, backgroundColor: palette.line },

  ctaRow: { flexDirection: 'row', gap: 10 },
  ctaPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 46,
    borderRadius: 23,
  },
  ctaPrimaryLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2 },
  ctaGhost: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
  },
  ctaGhostLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },

  workWithCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 60,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.electric,
    backgroundColor: 'rgba(46,91,255,0.10)',
  },
  workWithLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  workWithIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workWithLabel: { ...T.button, fontSize: 11, color: palette.ink },
  workWithSub: { fontFamily: fonts.body, fontSize: 11, color: palette.mute, marginTop: 2 },

  /* ---------- Featured work ---------- */
  featured: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  featuredScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,10,10,0.34)' },
  featuredAccent: { position: 'absolute', top: 14, left: 14, width: 28, height: 6, borderRadius: 3 },
  featuredMeta: { padding: 16, gap: 3 },
  featuredTag: { ...T.micro, color: '#FFFFFF', opacity: 0.85, letterSpacing: 1.4 },
  featuredTitle: { fontFamily: fonts.displayBold, fontSize: 22, letterSpacing: -0.5, color: '#FFFFFF' },
  featuredSub: { ...T.small, color: '#FFFFFF', opacity: 0.85, marginTop: 2 },

  emptyWork: { alignItems: 'center', gap: 8, paddingVertical: 40 },
  emptyWorkText: { ...T.body, color: palette.mute },

  /* ---------- Portfolio grid ---------- */
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP, marginTop: GRID_GAP },
  gridTile: {
    width: GRID_TILE,
    height: GRID_TILE,
    overflow: 'hidden',
    borderRadius: 8,
  },
  gridScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.18)' },
  gridAccent: { position: 'absolute', left: 8, top: 8, width: 22, height: 3, borderRadius: 2 },

  /* ---------- Platforms ---------- */
  platformList: { gap: 6 },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  platformIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformName: { fontFamily: fonts.displayHeavy, fontSize: 14, letterSpacing: -0.2, color: palette.ink },
  platformHandle: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 2 },
  platformRight: { alignItems: 'flex-end' },
  platformCount: { fontFamily: fonts.displayHeavy, fontSize: 14, color: palette.ink },
  platformGrowth: { ...T.micro, color: palette.electric, marginTop: 2 },

  /* ---------- Chip rows ---------- */
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  /* ---------- Rates ---------- */
  rateList: { gap: 6 },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  rateName: { fontFamily: fonts.displayHeavy, fontSize: 14, color: palette.ink },
  rateDesc: { ...T.micro, color: palette.ink, opacity: 0.65, marginTop: 2 },
  ratePriceWrap: { alignItems: 'flex-end' },
  rateFrom: { ...T.micro, color: palette.ink, opacity: 0.6, letterSpacing: 1.4 },
  ratePrice: { fontFamily: fonts.displayBold, fontSize: 22, letterSpacing: -0.6, color: palette.ink, marginTop: 2 },

  /* ---------- Brand chips ---------- */
  brandChip: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  brandChipLabel: { ...T.label, letterSpacing: 1.4, color: palette.ink },

  /* ---------- Merch ---------- */
  merchScroll: { marginHorizontal: -SCREEN_PADDING },
  merchScrollContent: { paddingHorizontal: SCREEN_PADDING, gap: 12 },
  merchCard: { width: 160, gap: 8 },
  merchThumb: {
    width: 160,
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: palette.boneSoft,
    padding: 14,
    justifyContent: 'flex-end',
  },
  merchSwatch: { position: 'absolute', right: 14, top: 14, width: 40, height: 40, borderRadius: 20 },
  merchKind: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase' },
  merchTitle: { fontFamily: fonts.displayBold, fontSize: 14, lineHeight: 16, letterSpacing: -0.3, color: palette.ink },
  merchFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  merchPrice: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.4, color: palette.ink },
  merchSold: { ...T.micro, fontSize: 9, color: palette.mute },

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
  },
  eventDate: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 64,
    alignItems: 'center',
  },
  eventDateText: { fontFamily: fonts.displayBold, fontSize: 12, letterSpacing: 1.2, color: staticPalette.ink },
  eventTitle: { fontFamily: fonts.displayBold, fontSize: 14, lineHeight: 16, letterSpacing: -0.3, color: palette.ink },
  eventHost: { fontFamily: fonts.body, fontSize: 12, color: palette.mute, marginTop: 4 },

  /* ---------- Press ---------- */
  pressList: { gap: 4 },
  pressRow: { paddingVertical: 14, borderTopWidth: 1 },
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
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderTopWidth: 1,
  },
  footerHandle: { ...T.label, color: palette.ink, opacity: 0.55, flex: 1 },
  footerEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  footerEditLabel: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase' },
});
