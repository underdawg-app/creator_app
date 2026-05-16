import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
} from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { ListCell } from '@/components/ui/ListCell';
import { MetricCard } from '@/components/ui/MetricCard';
import { Tap } from '@/components/ui/Tap';
import { Image } from '@/components/ui/Image';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useStore } from '@/store';
import {
  platformSeed,
  rateCardSeed,
  dealsSeed,
  userFeed,
} from '@/data/mock';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 12;
const GRID_GAP = 6;
const GRID_TILE = (width - SCREEN_PADDING * 2 - GRID_GAP * 2) / 3;

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

type Range = '7D' | '30D' | '90D';

export default function PortfolioHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const toast = useStore((s) => s.toast);

  // Featured portfolio pieces — pull the image posts from the personal feed
  // and cap to 9 per EPIC 2 (6–12 featured works).
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
  const featuredRates = useMemo(() => rateCardSeed.slice(0, 3), []);
  const pastBrands = useMemo(() => dealsSeed.map((d) => d.brand), []);

  const [range, setRange] = useState<Range>('30D');
  // Numbers are stable per range — easy stand-in until the analytics module wires up.
  const viewsByRange: Record<Range, { value: number; delta: number }> = {
    '7D': { value: 612, delta: 4.2 },
    '30D': { value: 2_846, delta: 12.4 },
    '90D': { value: 8_204, delta: 31.8 },
  };
  const clicksByRange: Record<Range, { value: number; delta: number }> = {
    '7D': { value: 89, delta: 2.1 },
    '30D': { value: 412, delta: 4.1 },
    '90D': { value: 1_204, delta: 9.7 },
  };

  return (
    <ScreenFrame header={<ModuleHeader title="PORTFOLIO" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        the <RNText style={styles.italic}>shop</RNText>{'\n'}window.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Your portfolio is what brands and fans actually see. Six to twelve pieces, tight platforms, clear rates — that's the job.
      </RNText>

      {/* Analytics range selector + metrics */}
      <View style={styles.rangeRow}>
        {(['7D', '30D', '90D'] as const).map((r) => (
          <Tap
            key={r}
            onPress={() => setRange(r)}
            burstColor={palette.acid}
            style={[
              styles.rangeChip,
              range === r && { backgroundColor: palette.ink, borderColor: palette.ink },
            ]}
          >
            <RNText
              style={[
                styles.rangeChipLabel,
                { color: range === r ? palette.bone : palette.ink },
              ]}
              maxFontSizeMultiplier={1.1}
            >
              {r}
            </RNText>
          </Tap>
        ))}
      </View>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard
            label="PORTFOLIO VIEWS"
            value={viewsByRange[range].value}
            delta={viewsByRange[range].delta}
            size="md"
          />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard
            label="LINK CLICKS"
            value={clicksByRange[range].value}
            delta={clicksByRange[range].delta}
            size="md"
          />
        </View>
      </View>

      {/* Featured portfolio grid — 6–12 pieces, per US-2.4 / US-3.3 */}
      <Section
        eyebrow={`FEATURED / ${String(portfolioPieces.length).padStart(2, '0')}`}
        title="the work."
        action={{
          label: 'REORDER',
          onPress: () => toast('Drag-drop reorder coming.', 'success'),
        }}
      >
        <View style={styles.grid}>
          {portfolioPieces.map((p, i) => (
            <Tap
              key={p.id}
              style={[
                styles.gridTile,
                i === 0 && styles.gridTileFeatured,
                { backgroundColor: palette.ink },
              ]}
              onPress={() => router.push('/(modules)/portfolio/piece-editor' as any)}
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
                  <RNText style={styles.gridTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                    {p.title}
                  </RNText>
                  <RNText style={styles.gridSub} maxFontSizeMultiplier={1.1}>
                    {p.category ?? 'WORK'} · {compact(p.likes)} likes
                  </RNText>
                </View>
              ) : null}
            </Tap>
          ))}
          {/* Add slot — visible cue that the grid accepts more pieces */}
          <Tap
            style={[styles.gridTile, styles.addTile]}
            onPress={() => router.push('/(modules)/portfolio/piece-editor')}
            burstColor={palette.acid}
          >
            <Ionicons name="add" size={28} color={palette.ink} />
            <RNText style={styles.addLabel} maxFontSizeMultiplier={1.1}>
              ADD
            </RNText>
          </Tap>
        </View>
      </Section>

      {/* Connected platforms — US-2.5 */}
      <Section
        eyebrow={`PLATFORMS · ${compact(totalReach)} REACH`}
        title="find me everywhere."
        action={{
          label: 'MANAGE',
          onPress: () => toast('Open platform settings.', 'success'),
        }}
      >
        <View style={styles.platformList}>
          {platformSeed.map((p) => (
            <Tap
              key={p.key}
              style={styles.platformRow}
              burstColor={p.accent}
              onPress={() =>
                p.connected
                  ? toast(`Open ${p.name.toLowerCase()}.`, 'success')
                  : toast(`Connect ${p.name.toLowerCase()}.`, 'success')
              }
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
                  {p.connected ? compact(p.followers) : 'CONNECT'}
                </RNText>
                {p.connected && p.growth > 0 ? (
                  <RNText style={styles.platformGrowth} maxFontSizeMultiplier={1.1}>
                    +{p.growth.toFixed(1)}%
                  </RNText>
                ) : null}
              </View>
            </Tap>
          ))}
        </View>
      </Section>

      {/* Open to / Collab status — US-2.6 */}
      <Section
        eyebrow="OPEN TO"
        title="how brands reach you."
      >
        <View style={styles.chipRow}>
          {profile.openTo.map((o) => (
            <Chip key={o} label={o} active accent={palette.acid} />
          ))}
        </View>
      </Section>

      {/* Niches / Craft — US-2.7 / US-3.1 */}
      <Section
        eyebrow="CRAFT"
        title="what i make."
      >
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

      {/* Rates — US-2.7 */}
      <Section
        eyebrow="RATES · FROM"
        title="the price tag."
        action={{
          label: 'MANAGE',
          onPress: () => toast('Edit rate cards coming.', 'success'),
        }}
      >
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
      </Section>

      {/* Past brands — credibility row */}
      <Section
        eyebrow="WORKED WITH"
        title="past clients."
      >
        <View style={styles.chipRow}>
          {pastBrands.map((b) => (
            <View key={b} style={styles.brandChip}>
              <RNText style={styles.brandChipLabel} maxFontSizeMultiplier={1.1}>
                {b}
              </RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* Management actions */}
      <Section eyebrow="DETAILS" title="tune the shop window.">
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
          subtitle={`underdawgs.com/${profile.handle.replace('@', '')}`}
          onPress={() => toast('Profile link copied.', 'success')}
        />
      </Section>

      <View style={{ marginTop: 28, alignItems: 'flex-start' }}>
        <MagneticButton
          label="ADD PIECE"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => router.push('/(modules)/portfolio/piece-editor')}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 50,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  body: {
    ...T.body,
    color: palette.ink,
    opacity: 0.7,
    marginTop: 14,
    maxWidth: 360,
  },

  rangeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 22,
  },
  rangeChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: 'transparent',
  },
  rangeChipLabel: {
    ...T.label,
    letterSpacing: 1.4,
  },

  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },

  /* Featured grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    marginTop: 8,
  },
  gridTile: {
    width: GRID_TILE,
    height: GRID_TILE,
    borderRadius: 14,
    overflow: 'hidden',
  },
  gridTileFeatured: {
    width: GRID_TILE * 2 + GRID_GAP,
    height: GRID_TILE * 2 + GRID_GAP,
  },
  gridScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  gridAccent: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  gridMeta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  gridTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    letterSpacing: -0.5,
    color: palette.bone,
  },
  gridSub: {
    ...T.micro,
    color: palette.bone,
    opacity: 0.85,
    marginTop: 2,
  },
  addTile: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addLabel: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
  },

  /* Platforms */
  platformList: {
    marginTop: 4,
    gap: 6,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
  },
  platformIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    letterSpacing: -0.2,
    color: palette.ink,
  },
  platformHandle: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 2,
  },
  platformRight: {
    alignItems: 'flex-end',
  },
  platformCount: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    color: palette.ink,
  },
  platformGrowth: {
    ...T.micro,
    color: palette.electric,
    marginTop: 2,
  },

  /* Chip rows (open to, niches) */
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },

  /* Rates */
  rateList: {
    marginTop: 4,
    gap: 6,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
  },
  rateName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    color: palette.ink,
  },
  rateDesc: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.65,
    marginTop: 2,
  },
  ratePriceWrap: {
    alignItems: 'flex-end',
  },
  rateFrom: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.6,
    letterSpacing: 1.4,
  },
  ratePrice: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    letterSpacing: -0.6,
    color: palette.ink,
    marginTop: 2,
  },

  /* Brand chips */
  brandChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.line,
  },
  brandChipLabel: {
    ...T.label,
    letterSpacing: 1.4,
    color: palette.ink,
  },
});
