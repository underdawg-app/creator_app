// STEP 6 · AI MOCKUPS — the key feature of the store-builder studio. The
// creator picks product types + garment colors + a design source (preset /
// prompt / upload), hits GENERATE (a simulated AI run with a shimmer state),
// then taps the resulting mockup cards to add the favorites to the catalog.
// Everything funnels into addBuilderProduct(), so the LIVE PREVIEW reacts.

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { router } from '@/navigation';
import { useStore } from '@/store';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { Chip } from '@/components/ui/Chip';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import {
  STORE_PRODUCT_TYPES,
  GARMENT_COLORS,
  DESIGN_PRESETS,
  getProductType,
} from '@/screens/modules/merch/studio/themePresets';

type DesignMode = 'PRESET' | 'PROMPT' | 'UPLOAD';

type Mockup = {
  id: string;
  type: string; // product type key
  color: string; // garment hex
  colorLabel: string;
  design: string; // design label
};

const MAX_RESULTS = 6;

// Readable label on a garment swatch.
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

  const addProduct = useStore((s) => s.addBuilderProduct);
  const confetti = useStore((s) => s.confetti);
  const toast = useStore((s) => s.toast);

  // Local selection state.
  const [types, setTypes] = useState<Set<string>>(new Set(['TEE']));
  const [colors, setColors] = useState<Set<string>>(new Set(['black']));
  const [designMode, setDesignMode] = useState<DesignMode>('PRESET');
  const [presetKey, setPresetKey] = useState<string>('salt');
  const [prompt, setPrompt] = useState('');
  const [uploaded, setUploaded] = useState(false);

  // Generation + results state.
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<Mockup[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const genTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (genTimer.current) clearTimeout(genTimer.current);
    },
    [],
  );

  // Resolve the chosen design's display label.
  const designLabel = useMemo(() => {
    if (designMode === 'PROMPT') {
      const t = prompt.trim();
      return t ? t.toUpperCase().slice(0, 22) : '';
    }
    if (designMode === 'UPLOAD') return uploaded ? 'CUSTOM UPLOAD' : '';
    return DESIGN_PRESETS.find((d) => d.key === presetKey)?.label ?? '';
  }, [designMode, prompt, uploaded, presetKey]);

  const hasDesign = designLabel.length > 0;
  const canGenerate = types.size > 0 && colors.size > 0 && hasDesign;

  function toggle(set: Set<string>, key: string): Set<string> {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next;
  }

  function onGenerate() {
    if (!canGenerate || generating) return;
    setPicked(new Set());
    setResults([]);
    setGenerating(true);

    // Build the type × color combinations, capped.
    const typeKeys = STORE_PRODUCT_TYPES.filter((p) => types.has(p.key)).map(
      (p) => p.key,
    );
    const colorList = GARMENT_COLORS.filter((c) => colors.has(c.key));
    const combos: Mockup[] = [];
    outer: for (const tk of typeKeys) {
      for (const c of colorList) {
        combos.push({
          id: `${tk}-${c.key}`,
          type: tk,
          color: c.hex,
          colorLabel: c.label,
          design: designLabel,
        });
        if (combos.length >= MAX_RESULTS) break outer;
      }
    }

    if (genTimer.current) clearTimeout(genTimer.current);
    genTimer.current = setTimeout(() => {
      setResults(combos);
      setGenerating(false);
    }, 1200);
  }

  function togglePick(id: string) {
    setPicked((prev) => toggle(prev, id));
  }

  function onAddToCatalog() {
    const chosen = results.filter((m) => picked.has(m.id));
    if (chosen.length === 0) return;
    chosen.forEach((m) => {
      const pt = getProductType(m.type);
      addProduct({
        type: m.type,
        color: m.color,
        design: m.design,
        name: `${pt.label} · ${m.design}`,
        price: pt.baseCost + 400,
      });
    });
    confetti();
    toast('Added to your catalog.', 'success');
    setPicked(new Set());
  }

  const pickedCount = picked.size;

  return (
    <View style={{ flex: 1, backgroundColor: palette.bone }}>
      <StudioHeader step={6} />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <RNText style={styles.kicker}>STEP 6 · AI MOCKUPS</RNText>
        <RNText style={styles.title}>generate mockups.</RNText>
        <RNText style={styles.lede}>
          Pick what to make, choose colors, drop in a design — we mock it up.
        </RNText>

        {/* PRODUCT TYPES */}
        <RNText style={styles.section}>PICK PRODUCT TYPES</RNText>
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

        {/* GARMENT COLORS */}
        <RNText style={styles.section}>PICK GARMENT COLORS</RNText>
        <View style={styles.swatchRow}>
          {GARMENT_COLORS.map((c) => {
            const on = colors.has(c.key);
            return (
              <Pressable
                key={c.key}
                onPress={() => setColors((s) => toggle(s, c.key))}
                hitSlop={8}
                style={styles.swatchWrap}
                accessibilityRole="button"
                accessibilityLabel={c.label}
                accessibilityState={{ selected: on }}
              >
                <View
                  style={[
                    styles.swatch,
                    {
                      backgroundColor: c.hex,
                      borderColor: on ? palette.ink : palette.line,
                      borderWidth: on ? 2.5 : 1,
                    },
                  ]}
                >
                  {on && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={readableOn(c.hex)}
                    />
                  )}
                </View>
                <RNText style={styles.swatchLabel}>{c.label}</RNText>
              </Pressable>
            );
          })}
        </View>

        {/* DESIGN INPUT */}
        <RNText style={styles.section}>DESIGN</RNText>
        <View style={styles.wrap}>
          {(['PRESET', 'PROMPT', 'UPLOAD'] as DesignMode[]).map((m) => (
            <Chip
              key={m}
              label={m}
              active={designMode === m}
              accent={palette.electric}
              onPress={() => setDesignMode(m)}
            />
          ))}
        </View>

        {designMode === 'PRESET' && (
          <View style={[styles.wrap, { marginTop: 12 }]}>
            {DESIGN_PRESETS.map((d) => (
              <Chip
                key={d.key}
                label={d.label}
                active={presetKey === d.key}
                accent={d.swatch}
                onPress={() => setPresetKey(d.key)}
              />
            ))}
          </View>
        )}

        {designMode === 'PROMPT' && (
          <View style={styles.inputBox}>
            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              placeholder="describe your design…"
              placeholderTextColor={palette.mute}
              style={styles.input}
              multiline
            />
          </View>
        )}

        {designMode === 'UPLOAD' && (
          <Pressable
            onPress={() => {
              setUploaded(true);
              toast('Image uploaded.');
            }}
            style={styles.upload}
            accessibilityRole="button"
          >
            <Ionicons
              name={uploaded ? 'checkmark-circle-outline' : 'cloud-upload-outline'}
              size={26}
              color={uploaded ? palette.ink : palette.mute}
            />
            <RNText style={styles.uploadLabel}>
              {uploaded ? 'IMAGE READY' : 'UPLOAD IMAGE'}
            </RNText>
            <RNText style={styles.uploadHint}>
              {uploaded ? 'Tap to replace' : 'PNG or JPG, transparent works best'}
            </RNText>
          </Pressable>
        )}

        {/* GENERATE */}
        <Pressable
          onPress={onGenerate}
          disabled={!canGenerate || generating}
          style={[styles.generate, (!canGenerate || generating) && { opacity: 0.4 }]}
          accessibilityRole="button"
        >
          <Ionicons name="sparkles-outline" size={18} color={palette.bone} />
          <RNText style={styles.generateLabel}>
            {generating ? 'GENERATING…' : 'GENERATE MOCKUPS'}
          </RNText>
        </Pressable>
        {!canGenerate && !generating && (
          <RNText style={styles.note}>
            Pick at least one type, one color, and a design.
          </RNText>
        )}

        {/* SHIMMER / LOADING */}
        {generating && (
          <View style={styles.resultsGrid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} palette={palette} styles={styles} delay={i * 120} />
            ))}
          </View>
        )}

        {/* RESULTS */}
        {!generating && results.length > 0 && (
          <>
            <RNText style={[styles.section, { marginTop: 26 }]}>
              {`TAP TO PICK · ${results.length} MOCKUPS`}
            </RNText>
            <View style={styles.resultsGrid}>
              {results.map((m) => {
                const on = picked.has(m.id);
                const fg = readableOn(m.color);
                const pt = getProductType(m.type);
                return (
                  <Pressable
                    key={m.id}
                    onPress={() => togglePick(m.id)}
                    style={styles.card}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                  >
                    <View
                      style={[
                        styles.cardArt,
                        {
                          backgroundColor: m.color,
                          borderColor: on ? palette.ink : palette.line,
                          borderWidth: on ? 2.5 : 1,
                        },
                      ]}
                    >
                      <Ionicons name={pt.icon as any} size={22} color={fg} />
                      <RNText
                        numberOfLines={1}
                        style={[styles.cardDesign, { color: fg }]}
                      >
                        {m.design}
                      </RNText>
                      {on && (
                        <View style={styles.checkRing}>
                          <Ionicons
                            name="checkmark"
                            size={14}
                            color={palette.bone}
                          />
                        </View>
                      )}
                    </View>
                    <RNText style={styles.cardType}>
                      {`${pt.label} · ${m.colorLabel}`}
                    </RNText>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={onAddToCatalog}
              disabled={pickedCount === 0}
              style={[styles.addBtn, pickedCount === 0 && { opacity: 0.4 }]}
              accessibilityRole="button"
            >
              <Ionicons name="add" size={18} color={palette.ink} />
              <RNText style={styles.addLabel}>
                {pickedCount > 0
                  ? `ADD ${pickedCount} TO CATALOG`
                  : 'SELECT MOCKUPS TO ADD'}
              </RNText>
            </Pressable>
          </>
        )}

        {/* LIVE PREVIEW */}
        <RNText style={[styles.section, { marginTop: 28 }]}>LIVE PREVIEW</RNText>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Review store"
        onPress={() => router.push('/(modules)/merch/build/review')}
      />
    </View>
  );
}

// A pulsing placeholder card for the generating state.
function Skeleton({
  palette,
  styles,
  delay,
}: {
  palette: typeof staticPalette;
  styles: ReturnType<typeof makeStyles>;
  delay: number;
}) {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 600,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity, delay]);

  return (
    <View style={styles.card}>
      <Animated.View
        style={[
          styles.cardArt,
          { backgroundColor: palette.boneMuted, borderColor: palette.line, opacity },
        ]}
      />
      <Animated.View style={[styles.skelLine, { opacity }]} />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    kicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.4,
      color: palette.ink,
      opacity: 0.6,
      textTransform: 'uppercase',
      marginTop: 6,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      lineHeight: 40,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },
    lede: {
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 22,
      color: palette.mute,
      marginTop: 10,
    },
    section: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 2.2,
      color: palette.ink,
      opacity: 0.6,
      textTransform: 'uppercase',
      marginTop: 26,
      marginBottom: 12,
    },
    wrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    swatchRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 18,
    },
    swatchWrap: {
      alignItems: 'center',
      width: 60,
    },
    swatch: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
    },
    swatchLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1,
      color: palette.ink,
      opacity: 0.7,
      marginTop: 7,
    },
    inputBox: {
      marginTop: 12,
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 16,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 88,
    },
    input: {
      fontFamily: fonts.body,
      fontSize: 16,
      lineHeight: 22,
      color: palette.ink,
      minHeight: 60,
      textAlignVertical: 'top',
    },
    upload: {
      marginTop: 12,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: palette.mute,
      borderRadius: 16,
      paddingVertical: 28,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    uploadLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 1.8,
      color: palette.ink,
    },
    uploadHint: {
      fontFamily: fonts.body,
      fontSize: 13,
      color: palette.mute,
    },
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
    generateLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2,
      color: palette.bone,
      textTransform: 'uppercase',
    },
    note: {
      fontFamily: fonts.body,
      fontSize: 13,
      color: palette.mute,
      textAlign: 'center',
      marginTop: 10,
    },
    resultsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    card: {
      width: '48%',
      marginBottom: 16,
    },
    cardArt: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingHorizontal: 10,
    },
    cardDesign: {
      fontFamily: fonts.displayBold,
      fontSize: 13,
      letterSpacing: 0.4,
      textAlign: 'center',
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
    cardType: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 0.8,
      color: palette.ink,
      opacity: 0.8,
      marginTop: 8,
    },
    skelLine: {
      height: 12,
      width: '70%',
      borderRadius: 6,
      backgroundColor: palette.boneMuted,
      marginTop: 8,
    },
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
    addLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 1.8,
      color: palette.ink,
      textTransform: 'uppercase',
    },
  });
