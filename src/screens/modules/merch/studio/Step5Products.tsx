// STEP 5 · PRODUCTS — add merch to the storefront catalog.
// A clean empty state, then a 2-col grid of added pieces (color block + design
// label + name + ₹price + remove). The ADD PRODUCT sheet picks TYPE → COLOR →
// DESIGN → NAME → PRICE and calls addBuilderProduct, so the live mini preview's
// grid fills in instantly. Continue → AI mockups.

import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { useStore, type BuilderProduct } from '@/store';
import { Sheet } from '@/components/ui/Sheet';
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

// Light vs dark garment → readable label color on the tile color block.
function readableOn(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length < 6) return '#0A0A0A';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const bl = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * bl) / 255;
  return lum > 0.6 ? '#0A0A0A' : '#FFFFFF';
}

export default function Step5Products() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const b = useStore((s) => s.storeBuilder);
  const addProduct = useStore((s) => s.addBuilderProduct);
  const removeProduct = useStore((s) => s.removeBuilderProduct);
  const toast = useStore((s) => s.toast);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [typeKey, setTypeKey] = useState(STORE_PRODUCT_TYPES[0].key);
  const [colorHex, setColorHex] = useState(GARMENT_COLORS[0].hex);
  const [designLabel, setDesignLabel] = useState(DESIGN_PRESETS[0].label);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const priceNum = parseInt(price.replace(/[^0-9]/g, ''), 10);
  const canAdd = name.trim().length > 0 && Number.isFinite(priceNum) && priceNum > 0;

  const products = b.products;

  const openSheet = () => {
    // Sensible defaults that track the chosen product type's base cost.
    const t = getProductType(typeKey);
    setName('');
    setPrice(String(t.baseCost));
    setSheetOpen(true);
  };

  const onPickType = (key: string) => {
    setTypeKey(key);
    // Keep the price suggestion in sync with the type unless the user typed one.
    if (!price.trim() || price === String(getProductType(typeKey).baseCost)) {
      setPrice(String(getProductType(key).baseCost));
    }
  };

  const commitAdd = () => {
    if (!canAdd) return;
    addProduct({
      type: typeKey,
      color: colorHex,
      design: designLabel,
      name: name.trim(),
      price: priceNum,
    });
    toast('Added to your store', 'success');
    setSheetOpen(false);
  };

  const onRemove = (id: string) => {
    removeProduct(id);
    toast('Product removed', 'default');
  };

  const eyebrow = useMemo(
    () => `${products.length} ${products.length === 1 ? 'PIECE' : 'PIECES'} IN YOUR CATALOG`,
    [products.length],
  );

  return (
    <View style={styles.screen}>
      <StudioHeader step={5} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <RNText style={styles.kicker}>STEP 5 · PRODUCTS</RNText>
        <RNText style={styles.title}>add your merch.</RNText>
        <RNText style={styles.lede}>
          Build the catalog that fills your storefront grid. Pick a piece, a
          color and a design — then price it.
        </RNText>

        {products.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="shirt-outline" size={26} color={palette.ink} />
            </View>
            <RNText style={styles.emptyTitle}>No products yet</RNText>
            <RNText style={styles.emptyBody}>
              Add your first piece to fill the storefront grid.
            </RNText>
            <Pressable style={styles.addBig} onPress={openSheet}>
              <Ionicons name="add" size={18} color={palette.bone} />
              <RNText style={styles.addBigLabel}>ADD PRODUCT</RNText>
            </Pressable>
          </View>
        ) : (
          <>
            <RNText style={styles.gridEyebrow}>{eyebrow}</RNText>
            <View style={styles.grid}>
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  styles={styles}
                  onRemove={() => onRemove(p.id)}
                />
              ))}

              <Pressable style={styles.addTile} onPress={openSheet}>
                <View style={styles.addTilePlus}>
                  <Ionicons name="add" size={22} color={palette.ink} />
                </View>
                <RNText style={styles.addTileLabel}>ADD PRODUCT</RNText>
              </Pressable>
            </View>
          </>
        )}

        <View style={styles.aiHint}>
          <Ionicons name="sparkles-outline" size={15} color={palette.ink} />
          <RNText style={styles.aiHintText}>
            Want AI to design these for you? Use AI mockups next.
          </RNText>
        </View>

        <RNText style={styles.previewKicker}>LIVE PREVIEW</RNText>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push('/(modules)/merch/build/mockups')}
        hint="Add at least one product, or continue to design with AI."
      />

      <Sheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        eyebrow="NEW PRODUCT"
        title="Add to store"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.sheetScroll}
        >
          <RNText style={styles.fieldLabel}>PRODUCT</RNText>
          <View style={styles.row}>
            {STORE_PRODUCT_TYPES.map((t) => (
              <Chip
                key={t.key}
                label={t.label}
                active={typeKey === t.key}
                accent={palette.acid}
                onPress={() => onPickType(t.key)}
              />
            ))}
          </View>

          <RNText style={styles.fieldLabel}>COLOR</RNText>
          <View style={styles.swatchRow}>
            {GARMENT_COLORS.map((c) => {
              const on = colorHex === c.hex;
              return (
                <Pressable
                  key={c.key}
                  onPress={() => setColorHex(c.hex)}
                  hitSlop={6}
                  style={styles.swatchWrap}
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
                    {on ? (
                      <Ionicons name="checkmark" size={16} color={readableOn(c.hex)} />
                    ) : null}
                  </View>
                  <RNText style={styles.swatchLabel}>{c.label}</RNText>
                </Pressable>
              );
            })}
          </View>

          <RNText style={styles.fieldLabel}>DESIGN</RNText>
          <View style={styles.row}>
            {DESIGN_PRESETS.map((d) => (
              <Chip
                key={d.key}
                label={d.label}
                active={designLabel === d.label}
                accent={d.swatch}
                onPress={() => setDesignLabel(d.label)}
              />
            ))}
          </View>

          <RNText style={styles.fieldLabel}>NAME</RNText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Last Train Tee"
            placeholderTextColor={palette.mute}
            style={styles.input}
            maxLength={40}
            returnKeyType="next"
          />

          <RNText style={styles.fieldLabel}>PRICE (₹)</RNText>
          <View style={styles.priceWrap}>
            <RNText style={styles.priceSymbol}>₹</RNText>
            <TextInput
              value={price}
              onChangeText={(t) => setPrice(t.replace(/[^0-9]/g, ''))}
              placeholder="0"
              placeholderTextColor={palette.mute}
              keyboardType="number-pad"
              style={styles.priceInput}
              maxLength={6}
            />
          </View>

          <Pressable
            style={[styles.commit, !canAdd && styles.commitDisabled]}
            onPress={commitAdd}
            disabled={!canAdd}
          >
            <RNText style={styles.commitLabel}>ADD TO STORE</RNText>
            <View style={styles.commitArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Pressable>

          {!canAdd ? (
            <RNText style={styles.validateHint}>
              Add a name and a price to continue.
            </RNText>
          ) : null}
        </ScrollView>
      </Sheet>
    </View>
  );
}

function ProductCard({
  product,
  styles,
  onRemove,
}: {
  product: BuilderProduct;
  styles: ReturnType<typeof makeStyles>;
  onRemove: () => void;
}) {
  const typeLabel = getProductType(product.type).label;
  const labelColor = readableOn(product.color);

  return (
    <View style={styles.card}>
      <View style={[styles.cardArt, { backgroundColor: product.color }]}>
        <RNText
          style={[styles.cardArtLabel, { color: labelColor }]}
          numberOfLines={1}
        >
          {product.design}
        </RNText>

        <Pressable style={styles.removeBtn} onPress={onRemove} hitSlop={8}>
          <Ionicons name="close" size={15} color="#FFFFFF" />
        </Pressable>
      </View>

      <RNText style={styles.cardType}>{typeLabel}</RNText>
      <RNText style={styles.cardName} numberOfLines={1}>
        {product.name}
      </RNText>
      <RNText style={styles.cardPrice}>₹{product.price.toLocaleString()}</RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 20, paddingBottom: 24 },

    kicker: {
      ...T.label,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 8,
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
      marginBottom: 22,
    },

    // Empty state
    empty: {
      alignItems: 'center',
      paddingVertical: 36,
      paddingHorizontal: 12,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    emptyIcon: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: palette.line,
      marginBottom: 16,
    },
    emptyTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      letterSpacing: -0.6,
      color: palette.ink,
    },
    emptyBody: {
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 21,
      color: palette.mute,
      textAlign: 'center',
      marginTop: 6,
      marginBottom: 22,
    },
    addBig: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      height: 52,
      paddingHorizontal: 24,
      borderRadius: 16,
      backgroundColor: palette.ink,
    },
    addBigLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2,
      color: palette.bone,
      textTransform: 'uppercase',
    },

    // Grid
    gridEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      marginBottom: 14,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      marginBottom: 18,
    },
    cardArt: {
      height: 132,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    cardArtLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: 0.5,
      opacity: 0.9,
      paddingHorizontal: 10,
    },
    removeBtn: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(10,10,10,0.55)',
    },
    cardType: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.mute,
      marginTop: 10,
    },
    cardName: {
      fontFamily: fonts.bodyMedium,
      fontSize: 15,
      color: palette.ink,
      marginTop: 2,
    },
    cardPrice: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.3,
      color: palette.ink,
      marginTop: 2,
    },
    addTile: {
      width: '48%',
      height: 132,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.line,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18,
    },
    addTilePlus: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: palette.line,
      marginBottom: 8,
    },
    addTileLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
      color: palette.ink,
    },

    // AI hint
    aiHint: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      marginTop: 8,
      marginBottom: 26,
    },
    aiHintText: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 20,
      color: palette.ink,
    },

    previewKicker: {
      ...T.label,
      color: palette.ink,
      opacity: 0.6,
      marginBottom: 12,
    },

    // Sheet
    sheetScroll: { maxHeight: 520 },
    fieldLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 18,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    swatchRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    swatchWrap: {
      alignItems: 'center',
      width: 48,
    },
    swatch: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    swatchLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 0.8,
      color: palette.mute,
      marginTop: 6,
    },
    input: {
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
      fontFamily: fonts.bodyMedium,
      fontSize: 16,
      color: palette.ink,
    },
    priceWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
    },
    priceSymbol: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      color: palette.ink,
      marginRight: 8,
    },
    priceInput: {
      flex: 1,
      fontFamily: fonts.bodyMedium,
      fontSize: 16,
      color: palette.ink,
      paddingVertical: 0,
    },
    commit: {
      height: 56,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 22,
      backgroundColor: palette.ink,
      marginTop: 26,
    },
    commitDisabled: { opacity: 0.4 },
    commitLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2.2,
      color: palette.bone,
      textTransform: 'uppercase',
    },
    commitArrow: {
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.bone,
    },
    validateHint: {
      fontFamily: fonts.body,
      fontSize: 13,
      color: palette.mute,
      textAlign: 'center',
      marginTop: 12,
    },
  });
