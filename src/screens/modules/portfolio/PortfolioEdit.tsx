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
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';
import { userFeed } from '@/data/mock';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 12;
const GRID_GAP = 6;
const TILE = (width - SCREEN_PADDING * 2 - GRID_GAP * 2) / 3;

const MIN_FEATURED = 6;
const MAX_FEATURED = 12;

/**
 * Portfolio edit — manage which works are featured on the public portfolio.
 * Per US-2.4 (6–12 featured works), US-3.3 (drag-drop reorder), US-3.4
 * (add/remove with confirm). Profile identity fields live on ProfileEdit.
 */
export default function PortfolioEdit() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  // All available image posts. In production this would come from the user's
  // own uploads — for now we draw from the userFeed mock so the UI is real.
  const pool = useMemo(
    () => userFeed.filter((i) => i.kind === 'image'),
    [],
  );

  // Initial featured list — first 6 ids, ordered. Tapping a pool tile toggles
  // it in/out; tapping a featured slot's "X" removes; the order in the array
  // determines the display order in the grid badges.
  const [featured, setFeatured] = useState<string[]>(
    () => pool.slice(0, 6).map((p) => p.id),
  );

  const toggleFeatured = (id: string) => {
    setFeatured((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= MAX_FEATURED) {
        toast(`Max ${MAX_FEATURED} pieces.`, 'warn');
        return prev;
      }
      return [...prev, id];
    });
  };

  const remove = (id: string) => {
    setFeatured((prev) => prev.filter((x) => x !== id));
  };

  const reorder = (id: string, dir: 'up' | 'down') => {
    setFeatured((prev) => {
      const idx = prev.indexOf(id);
      if (idx < 0) return prev;
      const next = [...prev];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
  };

  const featuredItems = featured
    .map((id) => pool.find((p) => p.id === id))
    .filter(Boolean) as typeof pool;

  const canSave = featured.length >= MIN_FEATURED;
  const save = () => {
    toast(`Featured ${featured.length} pieces.`, 'success');
    router.back();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PORTFOLIO" title="EDIT PORTFOLIO" />}>
      <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
        the <RNText style={styles.italic}>grid</RNText>.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Pick 6–12 of your best pieces. Drag the order — the first one is the hero on your public profile.
      </RNText>

      {/* Counter strip */}
      <View style={styles.counterStrip}>
        <View style={styles.counterLeft}>
          <RNText style={styles.counterValue} maxFontSizeMultiplier={1.1}>
            {String(featured.length).padStart(2, '0')}
            <RNText style={styles.counterMax}> / {MAX_FEATURED}</RNText>
          </RNText>
          <RNText style={styles.counterLabel} maxFontSizeMultiplier={1.1}>
            FEATURED PIECES
          </RNText>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(100, (featured.length / MAX_FEATURED) * 100)}%`,
                backgroundColor: canSave ? palette.acid : palette.line,
              },
            ]}
          />
        </View>
      </View>
      {!canSave ? (
        <RNText style={styles.minHint} maxFontSizeMultiplier={1.1}>
          Add at least {MIN_FEATURED - featured.length} more to save.
        </RNText>
      ) : null}

      {/* Featured list — ordered, with reorder arrows + remove */}
      <View style={styles.sectionHead}>
        <RNText style={styles.eyebrow} maxFontSizeMultiplier={1.1}>
          ORDER · TAP ↑↓ TO REARRANGE
        </RNText>
      </View>
      <View style={styles.featuredList}>
        {featuredItems.map((p, i) => (
          <View key={p.id} style={styles.featuredRow}>
            <RNText style={styles.featuredIdx} maxFontSizeMultiplier={1.1}>
              {String(i + 1).padStart(2, '0')}
            </RNText>
            <View style={styles.featuredThumb}>
              <Image
                source={{ uri: p.image! }}
                style={StyleSheet.absoluteFill as any}
                contentFit="cover"
                transition={150}
                targetWidth={84}
              />
              {i === 0 ? (
                <View style={styles.heroFlag}>
                  <RNText style={styles.heroFlagLabel} maxFontSizeMultiplier={1.1}>
                    HERO
                  </RNText>
                </View>
              ) : null}
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.featuredTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {p.title}
              </RNText>
              <RNText style={styles.featuredMeta} maxFontSizeMultiplier={1.1}>
                {p.category ?? 'WORK'} · {p.postedAgo}
              </RNText>
            </View>
            <View style={styles.featuredActions}>
              <Tap
                onPress={() => reorder(p.id, 'up')}
                style={[styles.reorderBtn, i === 0 && styles.reorderBtnDisabled]}
                burstColor={palette.acid}
                disabled={i === 0}
              >
                <Ionicons
                  name="chevron-up"
                  size={14}
                  color={i === 0 ? palette.mute : palette.ink}
                />
              </Tap>
              <Tap
                onPress={() => reorder(p.id, 'down')}
                style={[
                  styles.reorderBtn,
                  i === featuredItems.length - 1 && styles.reorderBtnDisabled,
                ]}
                burstColor={palette.acid}
                disabled={i === featuredItems.length - 1}
              >
                <Ionicons
                  name="chevron-down"
                  size={14}
                  color={i === featuredItems.length - 1 ? palette.mute : palette.ink}
                />
              </Tap>
              <Tap
                onPress={() => remove(p.id)}
                style={styles.removeBtn}
                burstColor={palette.blush}
              >
                <Ionicons name="close" size={14} color={palette.ink} />
              </Tap>
            </View>
          </View>
        ))}
      </View>

      {/* Pool — every available piece, tap to toggle featured */}
      <View style={styles.sectionHead}>
        <RNText style={styles.eyebrow} maxFontSizeMultiplier={1.1}>
          ALL WORKS · TAP TO TOGGLE
        </RNText>
        <Tap
          style={styles.addPieceBtn}
          onPress={() => router.push('/(modules)/portfolio/piece-editor')}
          burstColor={palette.ink}
        >
          <Ionicons name="add" size={14} color={palette.ink} />
          <RNText style={styles.addPieceLabel} maxFontSizeMultiplier={1.1}>
            NEW
          </RNText>
        </Tap>
      </View>
      <View style={styles.grid}>
        {pool.map((p) => {
          const featuredIndex = featured.indexOf(p.id);
          const isFeatured = featuredIndex >= 0;
          return (
            <Tap
              key={p.id}
              style={[
                styles.gridTile,
                isFeatured && { borderColor: palette.acid, borderWidth: 2 },
              ]}
              onPress={() => toggleFeatured(p.id)}
              burstColor={p.accent}
            >
              <Image
                source={{ uri: p.image! }}
                style={StyleSheet.absoluteFill as any}
                contentFit="cover"
                transition={150}
                targetWidth={TILE}
              />
              <View
                style={[
                  styles.gridScrim,
                  isFeatured && { backgroundColor: 'rgba(0,0,0,0.10)' },
                ]}
                pointerEvents="none"
              />
              {isFeatured ? (
                <View style={styles.gridFeaturedBadge}>
                  <RNText style={styles.gridFeaturedBadgeLabel} maxFontSizeMultiplier={1.1}>
                    {String(featuredIndex + 1).padStart(2, '0')}
                  </RNText>
                </View>
              ) : (
                <View style={styles.gridAddBadge}>
                  <Ionicons name="add" size={14} color={staticPalette.bone} />
                </View>
              )}
            </Tap>
          );
        })}
      </View>

      <View style={{ marginTop: 32 }}>
        <MagneticButton
          label={canSave ? 'SAVE PORTFOLIO' : `ADD ${MIN_FEATURED - featured.length} MORE`}
          size="lg"
          background={canSave ? palette.ink : palette.line}
          foreground={canSave ? palette.acid : palette.ink}
          disabled={!canSave}
          onPress={save}
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
    marginTop: 12,
    maxWidth: 360,
  },

  /* Counter strip */
  counterStrip: {
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
    gap: 12,
  },
  counterLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
  counterValue: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    letterSpacing: -1.2,
    color: palette.ink,
  },
  counterMax: {
    fontFamily: fonts.editorialItalic,
    fontSize: 22,
    color: palette.ink,
    opacity: 0.5,
  },
  counterLabel: { ...T.label, color: palette.ink, opacity: 0.65 },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  minHint: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 8,
  },

  /* Section heads */
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 10,
  },
  eyebrow: {
    ...T.label,
    color: palette.ink,
    opacity: 0.6,
    letterSpacing: 1.8,
  },

  /* Featured ordered list */
  featuredList: { gap: 6 },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    backgroundColor: palette.paper,
  },
  featuredIdx: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    letterSpacing: -0.2,
    color: palette.ink,
    opacity: 0.55,
    width: 24,
    textAlign: 'center',
  },
  featuredThumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: palette.ink,
  },
  heroFlag: {
    position: 'absolute',
    left: 4,
    top: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: palette.acid,
    borderRadius: 4,
  },
  heroFlagLabel: {
    ...T.micro,
    fontFamily: fonts.bodyBold,
    color: staticPalette.ink,
    letterSpacing: 1,
    fontSize: 8,
  },
  featuredTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    color: palette.ink,
  },
  featuredMeta: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 2,
  },
  featuredActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reorderBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reorderBtnDisabled: {
    opacity: 0.4,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.bone,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },

  /* Add piece button (in section head) */
  addPieceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.line,
  },
  addPieceLabel: {
    ...T.label,
    color: palette.ink,
    letterSpacing: 1.6,
  },

  /* Pool grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  gridTile: {
    width: TILE,
    height: TILE,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: palette.ink,
  },
  gridScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.30)',
  },
  gridFeaturedBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 6,
    backgroundColor: palette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridFeaturedBadgeLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: staticPalette.ink,
    letterSpacing: 0.5,
  },
  gridAddBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
