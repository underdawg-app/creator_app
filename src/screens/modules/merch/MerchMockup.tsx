import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { productTypes } from '@/data/mock';
import { useStore } from '@/store';

const PLACEMENTS = ['CENTER', 'POCKET', 'FULL PRINT', 'BACK'];
const SWATCHES = ['#0A0A0A', '#2E5BFF', '#9CA3AF', '#FF6BB5', '#FF5A1F', '#F2EFE6'];

type Mockup = { id: number; placement: string; color: string; bg: string };

const rng = () => Math.random();
const pick = <X,>(arr: readonly X[]) => arr[Math.floor(rng() * arr.length)];

function buildMockups(n: number): Mockup[] {
  return Array.from({ length: n }, (_, i) => {
    const color = pick(SWATCHES);
    const dark = color === '#0A0A0A' || color === '#2E5BFF';
    return {
      id: Date.now() + i,
      placement: pick(PLACEMENTS),
      color,
      bg: dark ? '#F2EFE6' : '#0A0A0A',
    };
  });
}

export default function MerchMockup() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);
  const addProduct = useStore((s) => s.addProduct);

  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [design, setDesign] = useState<string | null>(null);
  const [mockups, setMockups] = useState<Mockup[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const togglePick = (k: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const firstType = useMemo(
    () => productTypes.find((t) => picked.has(t.key)) ?? productTypes[0],
    [picked],
  );

  const ready = picked.size > 0 && !!design;
  const current = mockups.find((m) => m.id === selected) ?? null;

  const uploadDesign = () => {
    setDesign('salt-study.png');
    toast('Design uploaded.');
  };

  const generate = () => {
    if (!ready) {
      toast('Pick a product + upload artwork first.', 'warn');
      return;
    }
    const next = buildMockups(4);
    setMockups(next);
    setSelected(next[0].id);
  };

  const regenerate = () => {
    const next = buildMockups(4);
    setMockups(next);
    setSelected(next[0].id);
    toast('Reshuffled.');
  };

  const setPlacement = (p: string) =>
    setMockups((prev) => prev.map((m) => (m.id === selected ? { ...m, placement: p } : m)));

  const setColor = (c: string) =>
    setMockups((prev) =>
      prev.map((m) =>
        m.id === selected
          ? { ...m, color: c, bg: c === '#0A0A0A' || c === '#2E5BFF' ? '#F2EFE6' : '#0A0A0A' }
          : m,
      ),
    );

  const addToStore = () => {
    if (!current) return;
    addProduct({
      name: 'NEW DROP',
      type: firstType.name,
      baseCost: firstType.baseCost,
      margin: 400,
      color: current.color,
      bg: '#0A0A0A',
      fg: '#F2EFE6',
      published: true,
    });
    confetti();
    toast('Product added to your store.', 'success');
    router.push('/(modules)/merch');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MERCH · AI MOCKUP" title="MOCKUP" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        make merch.
      </RNText>

      {/* STEP 1 — products */}
      <Section eyebrow="STEP 1" title="select products.">
        <View style={styles.grid}>
          {productTypes.map((t) => (
            <Chip
              key={t.key}
              label={t.name}
              active={picked.has(t.key)}
              onPress={() => togglePick(t.key)}
              accent={palette.acid}
            />
          ))}
        </View>
      </Section>

      {/* STEP 2 — upload */}
      <Section eyebrow="STEP 2" title="upload design.">
        <Tap onPress={uploadDesign} burstColor={palette.acid} style={styles.upload}>
          <View style={styles.uploadIcon}>
            <Ionicons
              name={design ? 'checkmark-circle' : 'cloud-upload-outline'}
              size={26}
              color={design ? palette.ink : palette.inkMuted}
            />
          </View>
          <RNText style={styles.uploadTitle}>{design ? design : 'UPLOAD ARTWORK'}</RNText>
          <RNText style={styles.uploadSub}>
            {design ? 'Tap to replace · PNG · transparent' : 'PNG · SVG · up to 8000px'}
          </RNText>
        </Tap>
      </Section>

      {/* STEP 3 — generate */}
      <Section eyebrow="STEP 3" title="generate.">
        {mockups.length === 0 ? (
          <Tap
            onPress={generate}
            disabled={!ready}
            burstColor={palette.bone}
            style={[styles.cta, !ready && styles.ctaOff]}
          >
            <RNText style={[styles.ctaLabel, !ready && { color: palette.inkMuted }]}>
              GENERATE MOCKUPS
            </RNText>
            <View style={[styles.ctaArrow, !ready && { backgroundColor: palette.boneSoft }]}>
              <Ionicons name="sparkles-outline" size={15} color={palette.ink} />
            </View>
          </Tap>
        ) : (
          <>
            <View style={styles.mockGrid}>
              {mockups.map((m) => {
                const on = m.id === selected;
                return (
                  <Pressable
                    key={m.id}
                    onPress={() => setSelected(m.id)}
                    style={[styles.mockCard, { backgroundColor: m.bg }, on && styles.mockCardOn]}
                  >
                    <View style={styles.mockHead}>
                      <View style={[styles.mockSwatch, { backgroundColor: m.color }]} />
                      {on ? <Ionicons name="checkmark-circle" size={18} color={palette.acid} /> : null}
                    </View>
                    <View style={[styles.mockBlock, { backgroundColor: m.color }]} />
                    <RNText
                      style={[
                        styles.mockPlace,
                        { color: m.bg === '#0A0A0A' ? palette.bone : palette.ink },
                      ]}
                    >
                      {m.placement}
                    </RNText>
                  </Pressable>
                );
              })}
            </View>

            <Tap onPress={regenerate} burstColor={palette.acid} style={styles.regen}>
              <Ionicons name="sparkles-outline" size={14} color={palette.ink} />
              <RNText style={styles.regenText}>REGENERATE</RNText>
            </Tap>
          </>
        )}
      </Section>

      {/* Adjust selected mockup */}
      {current ? (
        <>
          <Section eyebrow="PLACEMENT">
            <View style={styles.grid}>
              {PLACEMENTS.map((p) => (
                <Chip
                  key={p}
                  label={p}
                  active={current.placement === p}
                  onPress={() => setPlacement(p)}
                  accent={palette.electric}
                />
              ))}
            </View>
          </Section>

          <Section eyebrow="COLOR">
            <View style={styles.swatchRow}>
              {SWATCHES.map((c) => (
                <Tap
                  key={c}
                  onPress={() => setColor(c)}
                  burstColor={c}
                  style={[
                    styles.swatch,
                    { backgroundColor: c },
                    current.color === c && { borderColor: palette.ink, borderWidth: 2 },
                  ]}
                >
                  {current.color === c ? (
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color={c === '#0A0A0A' || c === '#2E5BFF' ? palette.bone : palette.ink}
                    />
                  ) : null}
                </Tap>
              ))}
            </View>
          </Section>

          <Tap onPress={addToStore} burstColor={palette.bone} style={styles.cta}>
            <RNText style={styles.ctaLabel}>ADD TO STORE</RNText>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Tap>
        </>
      ) : null}
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
      marginBottom: 8,
    },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },

    upload: {
      marginTop: 4,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: palette.line,
      borderStyle: 'dashed',
      backgroundColor: palette.boneSoft,
      paddingVertical: 26,
      alignItems: 'center',
      gap: 8,
    },
    uploadIcon: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: palette.paper,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadTitle: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1.6, color: palette.ink },
    uploadSub: { ...T.small, color: palette.inkMuted },

    cta: {
      marginTop: 12,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaOff: { backgroundColor: palette.boneSoft, borderWidth: 1, borderColor: palette.line },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    mockGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
    mockCard: {
      width: '47.5%',
      flexGrow: 1,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      padding: 14,
      gap: 12,
    },
    mockCardOn: { borderColor: palette.acid, borderWidth: 2 },
    mockHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    mockSwatch: { width: 18, height: 18, borderRadius: 9 },
    mockBlock: { height: 84, borderRadius: 12, alignSelf: 'stretch' },
    mockPlace: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6 },

    regen: {
      marginTop: 12,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    regenText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },

    swatchRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
    swatch: {
      width: 42,
      height: 42,
      borderRadius: 21,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
