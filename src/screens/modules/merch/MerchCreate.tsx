import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, TextInput } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Stepper } from '@/components/ui/Stepper';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { productTypes } from '@/data/mock';
import { useStore } from '@/store';
import { Ionicons } from '@/icons';

type CatOption = { key: string; name: string; baseCost: number; custom?: boolean };

const STEPS = ['TYPES', 'DESIGN', 'PRICING', 'PUBLISH'];
const COLOR_PICKS = [
  { c: '#D8FF3D', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A' },
  { c: '#FF6BB5', bg: '#0A0A0A', fg: '#F2EFE6' },
  { c: '#FF5A1F', bg: '#F2EFE6', fg: '#0A0A0A' },
];

export default function CreateProduct() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [margin, setMargin] = useState('400');
  const [palette2, setPalette2] = useState(COLOR_PICKS[0]);
  const addProduct = useStore((s) => s.addProduct);
  const confetti = useStore((s) => s.confetti);
  const toast = useStore((s) => s.toast);
  const customCategories = useStore((s) => s.storeCustomization.customCategories);

  const allTypes: CatOption[] = useMemo(
    () => [
      ...productTypes,
      ...customCategories.map((c) => ({
        key: c.key,
        name: c.name,
        baseCost: c.baseCost,
        custom: true,
      })),
    ],
    [customCategories],
  );

  const toggle = (k: string) =>
    setPicked((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const baseCost = picked
    .map((k) => allTypes.find((t) => t.key === k)?.baseCost ?? 0)
    .reduce((a, b) => Math.max(a, b), 0);
  const marginN = Number(margin) || 0;
  const retail = baseCost + marginN;
  const earnings = Math.round(marginN * 0.8);

  const publish = () => {
    picked.forEach((k, i) => {
      const pt = allTypes.find((t) => t.key === k);
      if (!pt) return;
      addProduct({
        name: `${name || 'DROP'} — ${pt.name}`,
        type: pt.name,
        baseCost: pt.baseCost,
        margin: marginN,
        color: palette2.c,
        bg: palette2.bg,
        fg: palette2.fg,
        published: true,
      });
    });
    confetti();
    toast(`${picked.length} products published.`, 'success');
    router.replace('/(modules)/merch');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MERCH" title="NEW PRODUCT" />}>
      <Stepper steps={STEPS} current={step} />

      {step === 0 ? (
        <View style={{ marginTop: 18 }}>
          <RNText style={styles.label}>PICK PRODUCT TYPES · MULTIPLE OK</RNText>
          <View style={styles.grid}>
            {productTypes.map((t) => (
              <Chip
                key={t.key}
                label={t.name}
                active={picked.includes(t.key)}
                onPress={() => toggle(t.key)}
                accent={palette.acid}
              />
            ))}
          </View>

          {customCategories.length > 0 ? (
            <>
              <RNText style={[styles.label, { marginTop: 18 }]}>YOUR CUSTOM CATEGORIES</RNText>
              <View style={styles.grid}>
                {customCategories.map((c) => (
                  <Chip
                    key={c.key}
                    label={c.name}
                    active={picked.includes(c.key)}
                    onPress={() => toggle(c.key)}
                    accent={palette.electric}
                  />
                ))}
              </View>
            </>
          ) : null}

          <Tap
            onPress={() => router.push('/(modules)/merch')}
            burstColor={palette.acid}
            style={styles.addMore}
          >
            <Ionicons name="add" size={14} color={palette.ink} />
            <RNText style={styles.addMoreText}>ADD NEW CATEGORY IN STUDIO</RNText>
          </Tap>

          <View style={{ marginTop: 18 }}>
            <MagneticButton
              label={`NEXT — ${picked.length} PICKED`}
              size="lg"
              background={palette.ink}
              foreground={palette.acid}
              onPress={() => {
                if (picked.length === 0) {
                  toast('Pick at least one type.', 'warn');
                  return;
                }
                setStep(1);
              }}
            />
          </View>
        </View>
      ) : null}

      {step === 1 ? (
        <View style={{ marginTop: 18, gap: 18 }}>
          <RNText style={styles.label}>AI MOCKUP PALETTE</RNText>
          <View style={styles.swatches}>
            {COLOR_PICKS.map((p) => (
              <Tap
                key={p.c}
                onPress={() => setPalette2(p)}
                burstColor={p.c}
                style={[
                  styles.swatch,
                  { backgroundColor: p.c, borderColor: palette2.c === p.c ? palette.ink : palette.line },
                ]}
              >
                {palette2.c === p.c ? <Ionicons name="checkmark" size={14} color={palette.ink} /> : null}
              </Tap>
            ))}
          </View>

          <View style={[styles.mockup, { backgroundColor: palette2.bg }]}>
            <View style={[styles.mockupInner, { backgroundColor: palette2.c }]} />
            <RNText style={[styles.mockupLabel, { color: palette2.fg }]}>
              MOCKUP PREVIEW
            </RNText>
          </View>

          <RNText style={styles.label}>DROP NAME</RNText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="SALT / STUDY DROP"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.2}
          />

          <MagneticButton
            label="NEXT"
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={() => setStep(2)}
          />
        </View>
      ) : null}

      {step === 2 ? (
        <View style={{ marginTop: 18, gap: 16 }}>
          <View style={styles.priceBox}>
            <RNText style={styles.priceKey}>BASE COST (your cost)</RNText>
            <RNText style={styles.priceValue}>₹{baseCost}</RNText>
          </View>
          <View style={styles.priceBox}>
            <RNText style={styles.priceKey}>YOUR MARGIN (₹)</RNText>
            <TextInput
              style={styles.priceInput}
              value={margin}
              onChangeText={setMargin}
              keyboardType="numeric"
              maxFontSizeMultiplier={1.1}
            />
          </View>
          <View style={[styles.priceBox, { backgroundColor: palette.ink }]}>
            <RNText style={[styles.priceKey, { color: palette.bone, opacity: 0.6 }]}>
              RETAIL PRICE
            </RNText>
            <RNText style={[styles.priceValue, { color: palette.acid }]}>₹{retail}</RNText>
          </View>
          <View style={styles.priceBox}>
            <RNText style={styles.priceKey}>YOU EARN (80% of margin)</RNText>
            <RNText style={styles.priceValue}>₹{earnings} / sale</RNText>
          </View>

          <MagneticButton
            label="NEXT"
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={() => setStep(3)}
          />
        </View>
      ) : null}

      {step === 3 ? (
        <View style={{ marginTop: 18, gap: 18 }}>
          <RNText style={styles.summary} maxFontSizeMultiplier={1.2}>
            Publishing <RNText style={{ fontFamily: fonts.editorialItalic, color: palette.electric }}>{picked.length}</RNText>{' '}
            products at ₹{retail} each. In-app store + standalone website.
          </RNText>
          <MagneticButton
            label="PUBLISH LINE"
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={publish}
          />
          <MagneticButton
            label="BACK"
            background={staticPalette.acid}
            foreground={staticPalette.ink}
            onPress={() => setStep(2)}
          />
        </View>
      ) : null}
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  label: { ...T.label, color: staticPalette.ink, opacity: 0.65 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  swatches: { flexDirection: 'row', gap: 10 },
  swatch: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  mockup: { height: 200, borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 10 },
  mockupInner: { width: 120, height: 120, borderRadius: 60 },
  mockupLabel: { ...T.label, opacity: 0.7 },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: staticPalette.ink,
    backgroundColor: palette.paper,
  },
  priceBox: {
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.line,
  },
  priceKey: { ...T.label, color: palette.ink, opacity: 0.65, flex: 1 },
  priceValue: { fontFamily: fonts.displayBold, fontSize: 22, color: palette.ink, letterSpacing: -0.5 },
  priceInput: { fontFamily: fonts.displayBold, fontSize: 22, color: palette.ink, minWidth: 100, textAlign: 'right' },
  summary: { fontFamily: fonts.editorial, fontSize: 20, lineHeight: 28, color: palette.ink },
  addMore: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.line,
    borderStyle: 'dashed',
    alignSelf: 'flex-start',
  },
  addMoreText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: palette.ink,
  },
});
