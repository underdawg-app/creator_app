// PortfolioIndex — the creator's portfolio: the public-facing showcase brands
// and fans see. Redesigned around a proper identity hero (avatar + name + bio +
// availability + headline stats), a filterable featured-work grid, platforms,
// craft, rates, and past clients. Themed (light/dark) and built from the
// existing profile / feed / platform / rate-card seeds.

import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  ScrollView,
} from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { ListCell } from '@/components/ui/ListCell';
import { Tap } from '@/components/ui/Tap';
import { Image } from '@/components/ui/Image';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { useStore } from '@/store';
import {
  platformSeed,
  rateCardSeed,
  dealsSeed,
  userFeed,
  profileMock,
} from '@/data/mock';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 12;
const GRID_GAP = 4;
const TILE = (width - SCREEN_PADDING * 2 - GRID_GAP) / 2;

const platformIcon: Record<string, keyof typeof import('@/icons').Ionicons.glyphMap> = {
  INSTAGRAM: 'logo-instagram',
  TIKTOK: 'musical-notes',
  YOUTUBE: 'logo-youtube',
  TWITTER: 'logo-twitter',
  SPOTIFY: 'musical-note',
  TWITCH: 'logo-twitch',
};

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

export default function PortfolioIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const toast = useStore((s) => s.toast);

  // Work pieces from the personal feed. Build the category filter from what's
  // actually present so the chip row never shows an empty bucket.
  const pieces = useMemo(() => userFeed.filter((i) => i.kind === 'image'), []);
  const categories = useMemo(
    () => ['ALL', ...Array.from(new Set(pieces.map((p) => p.category).filter(Boolean) as string[]))],
    [pieces],
  );
  const [cat, setCat] = useState('ALL');
  const shown = cat === 'ALL' ? pieces : pieces.filter((p) => p.category === cat);
  const featured = shown[0];
  const rest = shown.slice(1, 9);

  const connected = useMemo(() => platformSeed.filter((p) => p.connected), []);
  const reach = useMemo(() => connected.reduce((a, p) => a + p.followers, 0), [connected]);
  const featuredRates = useMemo(() => rateCardSeed.slice(0, 3), []);
  const brands = useMemo(() => Array.from(new Set(dealsSeed.map((d) => d.brand))), []);
  const openTo = profile.openTo?.length ? profile.openTo : ['BRAND DEALS', 'COLLABS', 'COMMISSIONS'];
  const niches = profile.niches?.length ? profile.niches : profileMock.niches;
  const avatar = profile.avatar || profileMock.avatar;
  const handle = profile.handle || profileMock.handle;
  const name = profile.name || profileMock.name;

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          title="PORTFOLIO"
          right={
            <Tap
              onPress={() => router.push('/(modules)/portfolio/public-preview')}
              style={styles.headerBtn}
              burstColor={palette.ink}
            >
              <Ionicons name="eye-outline" size={16} color={palette.ink} />
            </Tap>
          }
        />
      }
    >
      {/* ===== Identity hero ===== */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={[styles.avatarRing, { borderColor: palette.electric }]}>
            <Image source={{ uri: avatar }} style={styles.avatar} contentFit="cover" targetWidth={120} />
          </View>
          <View style={styles.heroRight}>
            <View style={styles.availPill}>
              <View style={[styles.availDot, { backgroundColor: palette.electric }]} />
              <RNText style={styles.availText}>AVAILABLE FOR WORK</RNText>
            </View>
            <RNText style={styles.heroName} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
              {name}
            </RNText>
            <RNText style={styles.heroHandle}>
              {handle} · {profile.location || profileMock.location}
            </RNText>
          </View>
        </View>

        <RNText style={styles.bio} numberOfLines={3} maxFontSizeMultiplier={1.2}>
          {profile.bio || 'For the ones still climbing. Visual work, on bone and blue.'}
        </RNText>

        {/* Headline stats */}
        <View style={styles.statStrip}>
          <Stat label="WORKS" value={String(pieces.length)} />
          <View style={styles.statDiv} />
          <Stat label="REACH" value={compact(reach)} />
          <View style={styles.statDiv} />
          <Stat label="REPUTATION" value={String(profile.reputation ?? 82)} accent />
        </View>

        {/* CTAs */}
        <View style={styles.ctaRow}>
          <Tap
            onPress={() => router.push('/(modules)/portfolio/edit')}
            variant="heavy"
            burstColor={palette.electric}
            style={[styles.ctaPrimary, { backgroundColor: palette.ink }]}
          >
            <Ionicons name="create-outline" size={15} color={palette.bone} />
            <RNText style={[styles.ctaPrimaryLabel, { color: palette.bone }]}>EDIT</RNText>
          </Tap>
          <Tap
            onPress={() => toast(`underdawgs.com/${handle.replace('@', '')} copied.`, 'success')}
            burstColor={palette.electric}
            style={[styles.ctaGhost, { borderColor: palette.ink }]}
          >
            <Ionicons name="share-outline" size={15} color={palette.ink} />
            <RNText style={styles.ctaGhostLabel}>SHARE LINK</RNText>
          </Tap>
        </View>
      </View>

      {/* ===== Featured work ===== */}
      <Section eyebrow={`THE WORK · ${pieces.length}`} title="featured.">
        {/* Filter chips — single swipable row, runs off both edges */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterRow}
        >
          {categories.map((c) => (
            <Chip key={c} label={c} active={cat === c} onPress={() => setCat(c)} accent={palette.electric} />
          ))}
        </ScrollView>

        {featured ? (
          <Tap
            onPress={() => router.push(`/(modules)/profile/post/${featured.id}` as any)}
            burstColor={featured.accent}
            style={[styles.featured, { backgroundColor: palette.ink }]}
          >
            {featured.image ? (
              <Image source={{ uri: featured.image }} style={StyleSheet.absoluteFill as any} contentFit="cover" targetWidth={width} />
            ) : null}
            <View style={styles.featuredScrim} pointerEvents="none" />
            <View style={[styles.featuredAccent, { backgroundColor: featured.accent }]} />
            <View style={styles.featuredMeta}>
              <RNText style={styles.featuredTag}>{featured.category ?? 'WORK'}</RNText>
              <RNText style={styles.featuredTitle} numberOfLines={1}>{featured.title}</RNText>
              <RNText style={styles.featuredSub}>{compact(featured.likes)} likes · {compact(featured.comments)} comments</RNText>
            </View>
          </Tap>
        ) : (
          <View style={styles.emptyWork}>
            <Ionicons name="images-outline" size={28} color={palette.mute} />
            <RNText style={styles.emptyWorkText}>No work in this category yet.</RNText>
          </View>
        )}

        {rest.length > 0 ? (
          <View style={styles.grid}>
            {rest.map((p) => (
              <Tap
                key={p.id}
                onPress={() => router.push(`/(modules)/profile/post/${p.id}` as any)}
                burstColor={p.accent}
                style={[styles.tile, { backgroundColor: palette.boneSoft }]}
              >
                {p.image ? (
                  <Image source={{ uri: p.image }} style={StyleSheet.absoluteFill as any} contentFit="cover" targetWidth={TILE} />
                ) : null}
                <View style={[styles.tileAccent, { backgroundColor: p.accent }]} />
              </Tap>
            ))}
            <Tap
              onPress={() => router.push('/(modules)/portfolio/piece-editor')}
              burstColor={palette.electric}
              style={[styles.tile, styles.addTile, { borderColor: palette.line }]}
            >
              <Ionicons name="add" size={26} color={palette.ink} />
              <RNText style={styles.addLabel}>ADD</RNText>
            </Tap>
          </View>
        ) : null}
      </Section>

      {/* ===== Platforms ===== */}
      <Section
        eyebrow={`PLATFORMS · ${compact(reach)} REACH`}
        title="find me."
        action={{ label: 'MANAGE', onPress: () => router.push('/(modules)/audience') }}
      >
        <View style={styles.platformList}>
          {platformSeed.map((p) => (
            <Tap
              key={p.key}
              style={[styles.platformRow, { borderColor: palette.line }]}
              burstColor={p.accent}
              onPress={() => toast(p.connected ? `Open ${p.name.toLowerCase()}.` : `Connect ${p.name.toLowerCase()}.`, 'success')}
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
                <Ionicons name={platformIcon[p.name] ?? 'globe-outline'} size={16} color={p.connected ? staticPalette.ink : palette.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.platformName}>{p.name}</RNText>
                <RNText style={styles.platformHandle}>{p.connected ? p.handle : 'Not connected'}</RNText>
              </View>
              <View style={styles.platformRight}>
                <RNText style={styles.platformCount}>{p.connected ? compact(p.followers) : 'CONNECT'}</RNText>
                {p.connected && p.growth > 0 ? (
                  <RNText style={styles.platformGrowth}>+{p.growth.toFixed(1)}%</RNText>
                ) : null}
              </View>
            </Tap>
          ))}
        </View>
      </Section>

      {/* ===== Open to + Craft ===== */}
      <Section eyebrow="OPEN TO" title="how brands reach you.">
        <View style={styles.chipRow}>
          {openTo.map((o) => (
            <Chip key={o} label={o} active accent={palette.electric} />
          ))}
        </View>
      </Section>

      <Section eyebrow="CRAFT" title="what i make.">
        <View style={styles.chipRow}>
          {niches.map((n, i) => (
            <Chip
              key={n}
              label={n}
              active
              accent={i % 3 === 0 ? palette.electric : i % 3 === 1 ? palette.blush : palette.ember}
            />
          ))}
        </View>
      </Section>

      {/* ===== Rates ===== */}
      <Section
        eyebrow="RATES · FROM"
        title="the price tag."
        action={{ label: 'MANAGE', onPress: () => router.push('/(modules)/jobs/rate-card') }}
      >
        <View style={styles.rateList}>
          {featuredRates.map((r) => (
            <View key={r.key} style={[styles.rateRow, { borderColor: palette.line }]}>
              <View style={{ flex: 1 }}>
                <RNText style={styles.rateName}>{r.name}</RNText>
                <RNText style={styles.rateDesc} maxFontSizeMultiplier={1.15}>{r.desc}</RNText>
              </View>
              <View style={styles.ratePriceWrap}>
                <RNText style={styles.rateFrom}>FROM</RNText>
                <RNText style={styles.ratePrice}>${compact(r.base)}</RNText>
              </View>
            </View>
          ))}
        </View>
      </Section>

      {/* ===== Past clients ===== */}
      <Section eyebrow="WORKED WITH" title="past clients.">
        <View style={styles.chipRow}>
          {brands.map((b) => (
            <View key={b} style={[styles.brandChip, { borderColor: palette.line }]}>
              <RNText style={styles.brandChipLabel}>{b}</RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* ===== Manage ===== */}
      <Section eyebrow="DETAILS" title="tune the window.">
        <ListCell
          icon="images-outline"
          title="Edit portfolio"
          subtitle="Pick and reorder featured works."
          onPress={() => router.push('/(modules)/portfolio/edit')}
        />
        <ListCell
          icon="eye-outline"
          title="Preview public profile"
          subtitle="What brands and fans actually see."
          onPress={() => router.push('/(modules)/portfolio/public-preview')}
        />
        <ListCell
          icon="link-outline"
          title="Share profile link"
          subtitle={`underdawgs.com/${handle.replace('@', '')}`}
          onPress={() => toast('Profile link copied.', 'success')}
        />
      </Section>
    </ScreenFrame>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.stat}>
      <RNText style={[styles.statValue, accent && { color: palette.electric }]}>{value}</RNText>
      <RNText style={styles.statLabel}>{label}</RNText>
    </View>
  );
}

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
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.5, color: palette.ink },
  statLabel: { ...T.micro, color: palette.mute },
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

  /* ---------- Featured work ---------- */
  filterScroll: { marginHorizontal: -SCREEN_PADDING, marginBottom: 14 },
  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: SCREEN_PADDING },
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

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP, marginTop: GRID_GAP },
  tile: { width: TILE, height: TILE, borderRadius: 14, overflow: 'hidden' },
  tileAccent: { position: 'absolute', top: 8, left: 8, width: 6, height: 6, borderRadius: 3 },
  addTile: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addLabel: { ...T.label, color: palette.ink, opacity: 0.7 },

  /* ---------- Platforms ---------- */
  platformList: { marginTop: 4, gap: 6 },
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
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },

  /* ---------- Rates ---------- */
  rateList: { marginTop: 4, gap: 6 },
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
});
