// STEP 6 · MOCKUP STUDIO — generate real product mockups from the creator's own
// uploaded design. Upload artwork → pick product types + garment colors + a
// placement → GENERATE composites the design onto each garment on-device with
// Skia (free, faithful, no API). Tap the mockups you like → added to the catalog as real
// products carrying the artwork, so the storefront shows actual product images.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { router } from '@/navigation';
import { useStore, type ProductPlacement } from '@/store';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Chip } from '@/components/ui/Chip';
import { Image } from '@/components/ui/Image';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
  useAutoHideFooter,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { SkiaMockup } from '@/components/merch/SkiaMockup';
import {
  STORE_PRODUCT_TYPES,
  GARMENT_COLORS,
  getProductType,
} from '@/screens/modules/merch/studio/themePresets';
import { pickImage } from '@/screens/modules/merch/studio/pickImage';
import { generateMockupsForTypes, isMockupApiConfigured } from '@/services/mockupApi';

type Mockup = {
  id: string;
  type: string;
  color: string;
  colorKey: string;
  colorLabel: string;
  mockupUrl?: string; // photoreal render from the backend, once ready
};

const PLACEMENTS: { key: ProductPlacement; label: string }[] = [
  { key: 'FRONT', label: 'Front' },
  { key: 'BACK', label: 'Back' },
  { key: 'LEFT', label: 'Left' },
  { key: 'RIGHT', label: 'Right' },
];

// Capped so we never mount too many Skia canvases at once (one per result card).
const MAX_RESULTS = 6;

function readableOn(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length < 6) return '#0A0A0A';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0A0A0A' : '#FFFFFF';
}

export default function Step6Mockups() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { width } = useWindowDimensions();
  const cardSize = Math.floor((width - 32) * 0.46);

  const addProduct = useStore((s) => s.addBuilderProduct);
  const confetti = useStore((s) => s.confetti);
  const toast = useStore((s) => s.toast);

  const { onScroll, footerStyle } = useAutoHideFooter();

  const [artworkUri, setArtworkUri] = useState<string | null>(null);
  const [types, setTypes] = useState<Set<string>>(new Set(['TEE']));
  const [colors, setColors] = useState<Set<string>>(new Set(['black']));
  const [placement, setPlacement] = useState<ProductPlacement>('FRONT');

  const [generating, setGenerating] = useState(false);
  const [rendering, setRendering] = useState(false); // backend photoreal pass
  const [results, setResults] = useState<Mockup[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (genTimer.current) clearTimeout(genTimer.current); }, []);

  const canGenerate = !!artworkUri && types.size > 0 && colors.size > 0;

  function toggle(set: Set<string>, key: string): Set<string> {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  }

  const pickArtwork = async () => {
    const uri = await pickImage('design');
    if (uri) {
      setArtworkUri(uri);
      setResults([]);
      setPicked(new Set());
      toast('Design ready — pick products & generate.', 'success');
    }
  };

  async function onGenerate() {
    if (!canGenerate || generating || !artworkUri) return;
    setPicked(new Set());
    setResults([]);
    setGenerating(true);

    const typeKeys = STORE_PRODUCT_TYPES.filter((p) => types.has(p.key)).map((p) => p.key);
    const colorList = GARMENT_COLORS.filter((c) => colors.has(c.key));
    const combos: Mockup[] = [];
    outer: for (const tk of typeKeys) {
      for (const c of colorList) {
        combos.push({ id: `${tk}-${c.key}`, type: tk, color: c.hex, colorKey: c.key, colorLabel: c.label });
        if (combos.length >= MAX_RESULTS) break outer;
      }
    }

    if (genTimer.current) clearTimeout(genTimer.current);
    genTimer.current = setTimeout(() => {
      // Show instant vector previews first.
      setResults(combos);
      setGenerating(false);

      // Then upgrade to photoreal Printful renders if a backend is configured.
      if (isMockupApiConfigured()) {
        setRendering(true);
        generateMockupsForTypes(
          { designUri: artworkUri, colorKeys: colorList.map((c) => c.key), placement },
          typeKeys,
        )
          .then((imgs) => {
            setResults((prev) =>
              prev.map((c) => {
                const hit = imgs.find((i) => i.type === c.type && i.colorKey === c.colorKey);
                return hit ? { ...c, mockupUrl: hit.url } : c;
              }),
            );
          })
          .catch(() => toast('Couldn’t reach the mockup service — showing previews.', 'default'))
          .finally(() => setRendering(false));
      }
    }, 700);
  }

  function onAddToCatalog() {
    const chosen = results.filter((m) => picked.has(m.id));
    if (chosen.length === 0) return;
    chosen.forEach((m) => {
      const pt = getProductType(m.type);
      addProduct({
        type: m.type,
        color: m.color,
        design: 'CUSTOM',
        artworkUri,
        mockupUrl: m.mockupUrl,
        placement,
        artX: 0,
        artY: 0,
        artScale: 1,
        name: `${pt.label} · ${m.colorLabel}`,
        price: pt.baseCost + 400,
      });
    });
    confetti();
    toast(`Added ${chosen.length} to your catalog.`, 'success');
    setPicked(new Set());
  }

  const pickedCount = picked.size;

  return (
    <View style={{ flex: 1, backgroundColor: palette.bone }}>
      <StudioHeader step={6} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.kickerRow}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>STEP 6 · MOCKUP STUDIO</RNText>
        </View>
        <RNText style={styles.title}>mock it up.</RNText>
        <RNText style={styles.lede}>
          Upload your design and we'll put it on real products — pick the ones you
          like and they go straight into your store.
        </RNText>

        {/* YOUR DESIGN */}
        <View style={styles.sectionHead}>
          <View style={styles.dot} />
          <RNText style={styles.section}>YOUR DESIGN</RNText>
        </View>
        {artworkUri ? (
          <View style={styles.designRow}>
            <View style={styles.designThumb}>
              <Image source={{ uri: artworkUri }} style={styles.designThumbImg} contentFit="contain" />
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.designTitle}>Design ready</RNText>
              <RNText style={styles.designSub}>Generate mockups across products below.</RNText>
              <View style={styles.designBtns}>
                <Pressable onPress={pickArtwork} style={styles.designBtn} hitSlop={6}>
                  <Ionicons name="image-outline" size={14} color={palette.ink} />
                  <RNText style={styles.designBtnText}>REPLACE</RNText>
                </Pressable>
                <Pressable onPress={() => { setArtworkUri(null); setResults([]); }} style={styles.designBtnGhost} hitSlop={6}>
                  <RNText style={styles.designBtnGhostText}>REMOVE</RNText>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <Pressable onPress={pickArtwork} style={styles.upload}>
            <View style={styles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={26} color={palette.ink} />
            </View>
            <RNText style={styles.uploadLabel}>UPLOAD YOUR DESIGN</RNText>
            <RNText style={styles.uploadHint}>From your gallery · crop it to fit · PNG with transparency works best</RNText>
          </Pressable>
        )}

        {/* PRODUCTS */}
        <View style={styles.sectionHead}>
          <View style={styles.dot} />
          <RNText style={styles.section}>PRODUCTS</RNText>
        </View>
        <View style={styles.wrap}>
          {STORE_PRODUCT_TYPES.map((p) => (
            <Chip
              key={p.key}
              label={p.label}
              active={types.has(p.key)}
              accent={palette.acid}
              onPress={() => setTypes((s) => toggle(s, p.key))}
            />
          ))}
        </View>

        {/* COLORS */}
        <View style={styles.sectionHead}>
          <View style={styles.dot} />
          <RNText style={styles.section}>GARMENT COLORS</RNText>
        </View>
        <View style={styles.swatchRow}>
          {GARMENT_COLORS.map((c) => {
            const on = colors.has(c.key);
            return (
              <Pressable key={c.key} onPress={() => setColors((s) => toggle(s, c.key))} hitSlop={8} style={styles.swatchWrap}>
                <View style={[styles.swatch, { backgroundColor: c.hex, borderColor: on ? palette.ink : palette.line, borderWidth: on ? 2.5 : 1 }]}>
                  {on && <Ionicons name="checkmark" size={16} color={readableOn(c.hex)} />}
                </View>
                <RNText style={styles.swatchLabel}>{c.label}</RNText>
              </Pressable>
            );
          })}
        </View>

        {/* PLACEMENT */}
        <View style={styles.sectionHead}>
          <View style={styles.dot} />
          <RNText style={styles.section}>PLACEMENT</RNText>
        </View>
        <View style={styles.wrap}>
          {PLACEMENTS.map((p) => (
            <Chip
              key={p.key}
              label={p.label}
              active={placement === p.key}
              accent={palette.electric}
              onPress={() => setPlacement(p.key)}
            />
          ))}
        </View>

        {/* GENERATE */}
        <Pressable
          onPress={onGenerate}
          disabled={!canGenerate || generating}
          style={[styles.generate, (!canGenerate || generating) && { opacity: 0.4 }]}
        >
          <Ionicons name="sparkles-outline" size={18} color={palette.bone} />
          <RNText style={styles.generateLabel}>
            {generating ? 'GENERATING…' : 'GENERATE MOCKUPS'}
          </RNText>
        </Pressable>
        {!canGenerate && !generating && (
          <RNText style={styles.note}>
            {artworkUri ? 'Pick at least one product and colour.' : 'Upload a design to start.'}
          </RNText>
        )}

        {/* LOADING */}
        {generating && (
          <View style={styles.resultsGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} size={cardSize} palette={palette} styles={styles} delay={i * 120} />
            ))}
          </View>
        )}

        {/* RESULTS */}
        {!generating && results.length > 0 && (
          <>
            <View style={[styles.sectionHead, { marginTop: 26 }]}>
              <View style={styles.dot} />
              <RNText style={styles.section}>{`TAP TO PICK · ${results.length} MOCKUPS`}</RNText>
              {rendering ? <RNText style={styles.rendering}>RENDERING…</RNText> : null}
            </View>
            <View style={styles.resultsGrid}>
              {results.map((m) => {
                const on = picked.has(m.id);
                const pt = getProductType(m.type);
                return (
                  <Pressable key={m.id} onPress={() => setPicked((prev) => toggle(prev, m.id))} style={{ width: cardSize, marginBottom: 16 }}>
                    <View style={[styles.cardArt, { width: cardSize, height: cardSize, borderColor: on ? palette.ink : palette.line, borderWidth: on ? 2.5 : 1 }]}>
                      {m.mockupUrl ? (
                        <Image source={{ uri: m.mockupUrl }} style={{ width: cardSize, height: cardSize }} contentFit="cover" />
                      ) : (
                        <SkiaMockup
                          type={m.type}
                          side={placement}
                          color={m.color}
                          artworkUri={artworkUri}
                          transform={{ x: 0, y: 0, scale: 1 }}
                          size={cardSize - 6}
                        />
                      )}
                      <View style={[styles.realBadge, { backgroundColor: m.mockupUrl ? palette.ink : 'rgba(10,10,10,0.45)' }]}>
                        <RNText style={styles.realBadgeText}>{m.mockupUrl ? 'PHOTOREAL' : 'MOCKUP'}</RNText>
                      </View>
                      {on && (
                        <View style={styles.checkRing}>
                          <Ionicons name="checkmark" size={14} color={palette.bone} />
                        </View>
                      )}
                    </View>
                    <RNText style={styles.cardType}>{`${pt.label} · ${m.colorLabel}`}</RNText>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={onAddToCatalog}
              disabled={pickedCount === 0}
              style={[styles.addBtn, pickedCount === 0 && { opacity: 0.4 }]}
            >
              <Ionicons name="add" size={18} color={palette.ink} />
              <RNText style={styles.addLabel}>
                {pickedCount > 0 ? `ADD ${pickedCount} TO CATALOG` : 'SELECT MOCKUPS TO ADD'}
              </RNText>
            </Pressable>
          </>
        )}

        {/* LIVE PREVIEW */}
        <View style={[styles.sectionHead, { marginTop: 28 }]}>
          <View style={styles.dot} />
          <RNText style={styles.section}>LIVE PREVIEW</RNText>
        </View>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Review store"
        onPress={() => router.push('/(modules)/merch/build/review')}
        animStyle={footerStyle}
      />
    </View>
  );
}

function Skeleton({
  size,
  palette,
  styles,
  delay,
}: {
  size: number;
  palette: typeof staticPalette;
  styles: ReturnType<typeof makeStyles>;
  delay: number;
}) {
  const opacity = useRef(new Animated.Value(0.35)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.85, duration: 600, delay, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, delay]);

  return (
    <View style={{ width: size, marginBottom: 16 }}>
      <Animated.View style={[styles.cardArt, { width: size, height: size, backgroundColor: palette.boneMuted, opacity }]} />
      <Animated.View style={[styles.skelLine, { opacity }]} />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
    kicker: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 44,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },
    lede: { ...T.lead, color: palette.mute, marginTop: 10 },
    sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 26, marginBottom: 12 },
    section: { ...T.label, color: palette.ink, opacity: 0.6 },
    wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

    // Design upload
    upload: {
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: palette.line,
      borderRadius: 18,
      backgroundColor: palette.paper,
      paddingVertical: 26,
      paddingHorizontal: 18,
      alignItems: 'center',
      gap: 6,
    },
    uploadIcon: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: palette.boneSoft,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    uploadLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 1.8, color: palette.ink },
    uploadHint: { ...T.small, color: palette.mute, textAlign: 'center', maxWidth: 280 },
    designRow: {
      flexDirection: 'row',
      gap: 14,
      padding: 14,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    designThumb: { width: 72, height: 72, borderRadius: 14, overflow: 'hidden', backgroundColor: palette.boneSoft },
    designThumbImg: { width: 72, height: 72 },
    designTitle: { fontFamily: fonts.bodyBold, fontSize: 16, letterSpacing: -0.2, color: palette.ink },
    designSub: { ...T.small, color: palette.mute, marginTop: 2 },
    designBtns: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
    designBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 32,
      paddingHorizontal: 12,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
    },
    designBtnText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.2, color: palette.ink },
    designBtnGhost: { height: 32, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center' },
    designBtnGhostText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.2, color: palette.mute },

    // Colors — all on one line, evenly spaced
    swatchRow: { flexDirection: 'row', justifyContent: 'space-between' },
    swatchWrap: { alignItems: 'center' },
    swatch: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
    swatchLabel: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.8, color: palette.ink, opacity: 0.7, marginTop: 6 },

    // Generate
    generate: {
      marginTop: 28,
      height: 56,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    generateLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2, color: palette.bone, textTransform: 'uppercase' },
    note: { ...T.small, color: palette.mute, textAlign: 'center', marginTop: 10 },

    // Results
    resultsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 },
    cardArt: {
      borderRadius: 18,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    checkRing: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardType: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 0.8, color: palette.ink, opacity: 0.8, marginTop: 8 },
    rendering: { ...T.small, color: palette.mute, letterSpacing: 1.2, marginLeft: 'auto' },
    realBadge: {
      position: 'absolute',
      left: 8,
      bottom: 8,
      paddingHorizontal: 8,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    realBadgeText: { fontFamily: fonts.bodyBold, fontSize: 8, letterSpacing: 1, color: '#FFFFFF' },
    skelLine: { height: 12, width: '70%', borderRadius: 6, backgroundColor: palette.boneMuted, marginTop: 8 },
    addBtn: {
      marginTop: 6,
      height: 56,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    addLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 1.8, color: palette.ink, textTransform: 'uppercase' },
  });
