import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  TextInput,
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
import { Chip } from '@/components/ui/Chip';
import { useStore } from '@/store';
import { userFeed } from '@/data/mock';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 12;
const GRID_GAP = 6;
const TILE = (width - SCREEN_PADDING * 2 - GRID_GAP * 2) / 3;

const MIN_FEATURED = 6;
const MAX_FEATURED = 12;

const AVAILABILITY: { key: 'AVAILABLE' | 'SELECTIVE' | 'BOOKED'; label: string; sub: string }[] = [
  { key: 'AVAILABLE', label: 'Available', sub: 'Open to new work' },
  { key: 'SELECTIVE', label: 'Selective', sub: 'Right fits only' },
  { key: 'BOOKED', label: 'Booked', sub: 'Not taking work' },
];

const OPEN_TO_OPTIONS = ['BRAND DEALS', 'COMMISSIONS', 'COLLABS', 'UGC', 'AMBASSADOR', 'SPEAKING'];
const CRAFT_SUGGESTIONS = ['Abstract', 'Resin', 'Film', 'Photography', 'Illustration', 'Music', 'Design', '3D', 'Fashion'];

/**
 * Portfolio edit — controls everything the public portfolio page presents:
 * availability, tagline, what you're open to, your craft, whether rates show,
 * and which 6–12 works are featured (with order). Pure identity (name / handle /
 * bio / avatar) lives on ProfileEdit; this owns the presentation layer.
 */
export default function PortfolioEdit() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const setProfile = useStore((s) => s.setProfile);
  const toast = useStore((s) => s.toast);

  const pool = useMemo(() => userFeed.filter((i) => i.kind === 'image'), []);

  // Local working copies — committed to the store on save.
  const [availability, setAvailability] = useState(profile.availability ?? 'AVAILABLE');
  const [tagline, setTagline] = useState(profile.tagline ?? '');
  const [openTo, setOpenTo] = useState<string[]>(profile.openTo ?? []);
  const [niches, setNiches] = useState<string[]>(profile.niches ?? []);
  const [showRates, setShowRates] = useState(profile.showRates ?? true);
  const [nicheDraft, setNicheDraft] = useState('');
  const [featured, setFeatured] = useState<string[]>(() => pool.slice(0, 6).map((p) => p.id));

  const toggleOpenTo = (o: string) =>
    setOpenTo((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));

  const toggleNiche = (n: string) =>
    setNiches((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const addNiche = () => {
    const v = nicheDraft.trim();
    if (!v) return;
    if (!niches.some((n) => n.toLowerCase() === v.toLowerCase())) setNiches((p) => [...p, v]);
    setNicheDraft('');
  };

  const toggleFeatured = (id: string) => {
    setFeatured((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_FEATURED) {
        toast(`Max ${MAX_FEATURED} pieces.`, 'warn');
        return prev;
      }
      return [...prev, id];
    });
  };

  const remove = (id: string) => setFeatured((prev) => prev.filter((x) => x !== id));

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
    setProfile({ availability, tagline: tagline.trim(), openTo, niches, showRates });
    toast('Portfolio updated.', 'success');
    router.back();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PORTFOLIO" title="EDIT PORTFOLIO" />}>
      <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
        the <RNText style={styles.italic}>window</RNText>.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Everything below is what brands and fans see. Set the tone, then pick the work.
      </RNText>

      {/* ===== Availability ===== */}
      <SectionHead label="AVAILABILITY" />
      <View style={styles.availRow}>
        {AVAILABILITY.map((a) => {
          const active = availability === a.key;
          return (
            <Tap
              key={a.key}
              onPress={() => setAvailability(a.key)}
              burstColor={palette.electric}
              style={[
                styles.availCard,
                { borderColor: active ? palette.ink : palette.line },
                active && { backgroundColor: palette.ink },
              ]}
            >
              <View
                style={[
                  styles.availDot,
                  { backgroundColor: a.key === 'BOOKED' ? palette.ember : a.key === 'SELECTIVE' ? palette.blush : palette.electric },
                ]}
              />
              <RNText style={[styles.availLabel, { color: active ? palette.bone : palette.ink }]}>{a.label}</RNText>
              <RNText style={[styles.availSub, { color: active ? palette.bone : palette.mute }]} numberOfLines={1}>
                {a.sub}
              </RNText>
            </Tap>
          );
        })}
      </View>

      {/* ===== Tagline ===== */}
      <SectionHead label="TAGLINE" />
      <TextInput
        style={styles.input}
        value={tagline}
        onChangeText={setTagline}
        placeholder="One line that sums up your work."
        placeholderTextColor={palette.mute}
        maxLength={60}
        maxFontSizeMultiplier={1.2}
      />
      <RNText style={styles.counter}>{tagline.length}/60</RNText>

      {/* ===== Open to ===== */}
      <SectionHead label="OPEN TO" hint="Tap to toggle" />
      <View style={styles.chipRow}>
        {OPEN_TO_OPTIONS.map((o) => (
          <Chip key={o} label={o} active={openTo.includes(o)} accent={palette.electric} onPress={() => toggleOpenTo(o)} />
        ))}
      </View>

      {/* ===== Craft ===== */}
      <SectionHead label="CRAFT" hint="Your disciplines" />
      <View style={styles.chipRow}>
        {niches.map((n) => (
          <Tap key={n} onPress={() => toggleNiche(n)} burstColor={palette.blush} style={[styles.craftChip, { borderColor: palette.ink, backgroundColor: palette.ink }]}>
            <RNText style={[styles.craftChipText, { color: palette.bone }]}>{n}</RNText>
            <Ionicons name="close" size={12} color={palette.bone} />
          </Tap>
        ))}
      </View>
      <View style={styles.craftAddRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={nicheDraft}
          onChangeText={setNicheDraft}
          placeholder="Add a discipline…"
          placeholderTextColor={palette.mute}
          onSubmitEditing={addNiche}
          returnKeyType="done"
          maxLength={20}
        />
        <Tap onPress={addNiche} burstColor={palette.electric} style={[styles.addBtn, { backgroundColor: palette.ink }]}>
          <Ionicons name="add" size={18} color={palette.bone} />
        </Tap>
      </View>
      <View style={styles.suggestRow}>
        {CRAFT_SUGGESTIONS.filter((s) => !niches.includes(s)).slice(0, 5).map((s) => (
          <Tap key={s} onPress={() => toggleNiche(s)} burstColor={palette.mute} style={[styles.suggestChip, { borderColor: palette.line }]}>
            <Ionicons name="add" size={11} color={palette.mute} />
            <RNText style={styles.suggestText}>{s}</RNText>
          </Tap>
        ))}
      </View>

      {/* ===== Rates visibility ===== */}
      <SectionHead label="RATES" />
      <Tap onPress={() => setShowRates((v) => !v)} burstColor={palette.electric} style={[styles.toggleRow, { borderColor: palette.line }]}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.toggleTitle}>Show rates on profile</RNText>
          <RNText style={styles.toggleSub}>Brands see your starting prices.</RNText>
        </View>
        <View style={[styles.switch, { backgroundColor: showRates ? palette.ink : palette.line }]}>
          <View style={[styles.knob, { backgroundColor: palette.bone, alignSelf: showRates ? 'flex-end' : 'flex-start' }]} />
        </View>
      </Tap>

      {/* ===== Featured counter ===== */}
      <SectionHead label="FEATURED WORK" />
      <View style={styles.counterStrip}>
        <View style={styles.counterLeft}>
          <RNText style={styles.counterValue}>
            {String(featured.length).padStart(2, '0')}
            <RNText style={styles.counterMax}> / {MAX_FEATURED}</RNText>
          </RNText>
          <RNText style={styles.counterLabel}>FEATURED PIECES</RNText>
        </View>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(100, (featured.length / MAX_FEATURED) * 100)}%`,
                backgroundColor: canSave ? palette.electric : palette.line,
              },
            ]}
          />
        </View>
      </View>
      {!canSave ? (
        <RNText style={styles.minHint}>Add at least {MIN_FEATURED - featured.length} more to save.</RNText>
      ) : null}

      {/* Ordered featured list */}
      <View style={styles.subHead}>
        <RNText style={styles.eyebrow}>ORDER · TAP ↑↓ TO REARRANGE</RNText>
      </View>
      <View style={styles.featuredList}>
        {featuredItems.map((p, i) => (
          <View key={p.id} style={[styles.featuredRow, { borderColor: palette.line }]}>
            <RNText style={styles.featuredIdx}>{String(i + 1).padStart(2, '0')}</RNText>
            <View style={styles.featuredThumb}>
              <Image source={{ uri: p.image! }} style={StyleSheet.absoluteFill as any} contentFit="cover" targetWidth={84} />
              {i === 0 ? (
                <View style={[styles.heroFlag, { backgroundColor: palette.electric }]}>
                  <RNText style={styles.heroFlagLabel}>HERO</RNText>
                </View>
              ) : null}
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.featuredTitle} numberOfLines={1}>{p.title}</RNText>
              <RNText style={styles.featuredMeta}>{p.category ?? 'WORK'} · {p.postedAgo}</RNText>
            </View>
            <View style={styles.featuredActions}>
              <Tap onPress={() => reorder(p.id, 'up')} style={[styles.reorderBtn, { borderColor: palette.line }, i === 0 && styles.disabled]} burstColor={palette.electric} disabled={i === 0}>
                <Ionicons name="chevron-up" size={14} color={i === 0 ? palette.mute : palette.ink} />
              </Tap>
              <Tap onPress={() => reorder(p.id, 'down')} style={[styles.reorderBtn, { borderColor: palette.line }, i === featuredItems.length - 1 && styles.disabled]} burstColor={palette.electric} disabled={i === featuredItems.length - 1}>
                <Ionicons name="chevron-down" size={14} color={i === featuredItems.length - 1 ? palette.mute : palette.ink} />
              </Tap>
              <Tap onPress={() => remove(p.id)} style={[styles.removeBtn, { borderColor: palette.line, backgroundColor: palette.bone }]} burstColor={palette.blush}>
                <Ionicons name="close" size={14} color={palette.ink} />
              </Tap>
            </View>
          </View>
        ))}
      </View>

      {/* Pool grid */}
      <View style={styles.subHead}>
        <RNText style={styles.eyebrow}>ALL WORKS · TAP TO TOGGLE</RNText>
        <Tap style={[styles.addPieceBtn, { borderColor: palette.line }]} onPress={() => router.push('/(modules)/portfolio/piece-editor')} burstColor={palette.ink}>
          <Ionicons name="add" size={14} color={palette.ink} />
          <RNText style={styles.addPieceLabel}>NEW</RNText>
        </Tap>
      </View>
      <View style={styles.grid}>
        {pool.map((p) => {
          const featuredIndex = featured.indexOf(p.id);
          const isFeatured = featuredIndex >= 0;
          return (
            <Tap
              key={p.id}
              style={[styles.gridTile, { backgroundColor: palette.ink }, isFeatured && { borderColor: palette.electric, borderWidth: 2 }]}
              onPress={() => toggleFeatured(p.id)}
              burstColor={p.accent}
            >
              <Image source={{ uri: p.image! }} style={StyleSheet.absoluteFill as any} contentFit="cover" targetWidth={TILE} />
              <View style={[styles.gridScrim, isFeatured && { backgroundColor: 'rgba(0,0,0,0.10)' }]} pointerEvents="none" />
              {isFeatured ? (
                <View style={[styles.gridBadge, { backgroundColor: palette.electric }]}>
                  <RNText style={styles.gridBadgeLabel}>{String(featuredIndex + 1).padStart(2, '0')}</RNText>
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
          foreground={canSave ? palette.bone : palette.ink}
          disabled={!canSave}
          onPress={save}
        />
      </View>
    </ScreenFrame>
  );
}

function SectionHead({ label, hint }: { label: string; hint?: string }) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.sectionHead}>
      <RNText style={styles.eyebrow}>{label}</RNText>
      {hint ? <RNText style={styles.sectionHint}>{hint}</RNText> : null}
    </View>
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
  body: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 12, maxWidth: 360 },

  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 10,
  },
  subHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginBottom: 10 },
  eyebrow: { ...T.label, color: palette.ink, opacity: 0.6, letterSpacing: 1.8 },
  sectionHint: { ...T.micro, color: palette.mute },

  /* Availability */
  availRow: { flexDirection: 'row', gap: 8 },
  availCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  availDot: { width: 8, height: 8, borderRadius: 4 },
  availLabel: { fontFamily: fonts.displayHeavy, fontSize: 14, letterSpacing: -0.2 },
  availSub: { ...T.micro, fontSize: 9 },

  /* Inputs */
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 48,
    fontFamily: fonts.body,
    fontSize: 16,
    color: palette.ink,
    backgroundColor: palette.paper,
  },
  counter: { ...T.micro, color: palette.mute, alignSelf: 'flex-end', marginTop: 6 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  /* Craft */
  craftChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  craftChipText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 0.4 },
  craftAddRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  addBtn: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  suggestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  suggestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  suggestText: { ...T.micro, color: palette.mute, letterSpacing: 0.4 },

  /* Toggle row */
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  toggleTitle: { fontFamily: fonts.bodyBold, fontSize: 15, color: palette.ink },
  toggleSub: { ...T.small, color: palette.mute, marginTop: 2 },
  switch: { width: 46, height: 28, borderRadius: 14, padding: 3, justifyContent: 'center' },
  knob: { width: 22, height: 22, borderRadius: 11 },

  /* Featured counter */
  counterStrip: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
    gap: 12,
  },
  counterLeft: { flexDirection: 'row', alignItems: 'baseline', gap: 12 },
  counterValue: { fontFamily: fonts.displayBold, fontSize: 32, letterSpacing: -1.2, color: palette.ink },
  counterMax: { fontFamily: fonts.editorialItalic, fontSize: 22, color: palette.ink, opacity: 0.5 },
  counterLabel: { ...T.label, color: palette.ink, opacity: 0.65 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: palette.line, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  minHint: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 8 },

  /* Featured ordered list */
  featuredList: { gap: 6 },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: palette.paper,
  },
  featuredIdx: { fontFamily: fonts.displayHeavy, fontSize: 16, color: palette.ink, opacity: 0.55, width: 24, textAlign: 'center' },
  featuredThumb: { width: 56, height: 56, borderRadius: 10, overflow: 'hidden', backgroundColor: palette.ink },
  heroFlag: { position: 'absolute', left: 4, top: 4, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  heroFlagLabel: { ...T.micro, fontFamily: fonts.bodyBold, color: staticPalette.ink, letterSpacing: 1, fontSize: 8 },
  featuredTitle: { fontFamily: fonts.displayHeavy, fontSize: 14, color: palette.ink },
  featuredMeta: { ...T.micro, color: palette.ink, opacity: 0.6, marginTop: 2 },
  featuredActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reorderBtn: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.4 },
  removeBtn: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 4 },

  addPieceBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1 },
  addPieceLabel: { ...T.label, color: palette.ink, letterSpacing: 1.6 },

  /* Pool grid */
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GRID_GAP },
  gridTile: { width: TILE, height: TILE, borderRadius: 12, overflow: 'hidden' },
  gridScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.30)' },
  gridBadge: { position: 'absolute', top: 6, left: 6, minWidth: 22, height: 22, borderRadius: 11, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' },
  gridBadgeLabel: { fontFamily: fonts.bodyBold, fontSize: 11, color: staticPalette.ink, letterSpacing: 0.5 },
  gridAddBadge: { position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: 'rgba(242,239,230,0.6)', alignItems: 'center', justifyContent: 'center' },
});
