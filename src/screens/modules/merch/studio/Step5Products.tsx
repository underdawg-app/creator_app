// STEP 5 · PRODUCTS — add merch to the storefront catalog.
// Empty state → 2-col catalog grid. The ADD PRODUCT sheet is a small designer:
// pick the garment + color, upload a design image from the gallery, choose its
// placement (front / back / left / right), pick a print method, name + price.
// A live garment mockup shows the design on the colored product as you go.

import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import { useStore, type BuilderProduct, type ProductPlacement } from '@/store';
import { Sheet } from '@/components/ui/Sheet';
import { Image } from '@/components/ui/Image';
import {
  StudioHeader,
  StudioFooter,
  DeviceFrame,
  useAutoHideFooter,
} from '@/screens/modules/merch/studio/_chrome';
import { StorefrontPreview } from '@/components/merch/StorefrontPreview';
import { PrintMockup, PrintPlacer, type ArtTransform } from '@/components/merch/PrintMockup';
import {
  STORE_PRODUCT_TYPES,
  GARMENT_COLORS,
  PRINT_METHODS,
  getProductType,
} from '@/screens/modules/merch/studio/themePresets';
import { pickImage } from '@/screens/modules/merch/studio/pickImage';

const PLACEMENTS: { key: ProductPlacement; label: string }[] = [
  { key: 'FRONT', label: 'Front' },
  { key: 'BACK', label: 'Back' },
  { key: 'LEFT', label: 'Left chest' },
  { key: 'RIGHT', label: 'Right chest' },
];

// Light vs dark garment → readable label color.
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
  const { height } = useWindowDimensions();

  const b = useStore((s) => s.storeBuilder);
  const addProduct = useStore((s) => s.addBuilderProduct);
  const removeProduct = useStore((s) => s.removeBuilderProduct);
  const toast = useStore((s) => s.toast);

  const { onScroll, footerStyle } = useAutoHideFooter();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [typeKey, setTypeKey] = useState(STORE_PRODUCT_TYPES[0].key);
  const [colorHex, setColorHex] = useState(GARMENT_COLORS[0].hex);
  const [methodKey, setMethodKey] = useState(PRINT_METHODS[0].key);
  const [placement, setPlacement] = useState<ProductPlacement>('FRONT');
  const [artworkUri, setArtworkUri] = useState<string | null>(null);
  const [art, setArt] = useState<ArtTransform>({ x: 0, y: 0, scale: 1 });
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const method = PRINT_METHODS.find((m) => m.key === methodKey) ?? PRINT_METHODS[0];
  const type = getProductType(typeKey);

  const priceNum = parseInt(price.replace(/[^0-9]/g, ''), 10);
  const canAdd = name.trim().length > 0 && Number.isFinite(priceNum) && priceNum > 0;

  const products = b.products;

  const openSheet = () => {
    const t = getProductType(typeKey);
    setName('');
    setPrice(String(t.baseCost));
    setArtworkUri(null);
    setArt({ x: 0, y: 0, scale: 1 });
    setPlacement('FRONT');
    setSheetOpen(true);
  };

  const onPickType = (key: string) => {
    setTypeKey(key);
    if (!price.trim() || price === String(getProductType(typeKey).baseCost)) {
      setPrice(String(getProductType(key).baseCost));
    }
  };

  const pickArtwork = async () => {
    const uri = await pickImage('design');
    if (uri) {
      setArtworkUri(uri);
      setArt({ x: 0, y: 0, scale: 1 });
      toast('Design added · drag & pinch to place it.', 'success');
    }
  };

  const commitAdd = () => {
    if (!canAdd) return;
    addProduct({
      type: typeKey,
      color: colorHex,
      design: method.label,
      method: method.label,
      artworkUri,
      placement,
      artX: art.x,
      artY: art.y,
      artScale: art.scale,
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
        contentContainerStyle={[styles.scroll, { paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.kickerRow}>
          <View style={styles.dot} />
          <RNText style={styles.kicker}>STEP 5 · PRODUCTS</RNText>
        </View>
        <RNText style={styles.title}>add your merch.</RNText>
        <RNText style={styles.lede}>
          Pick a garment, drop your design on it, choose where it prints — then
          price it.
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
            <View style={styles.gridHead}>
              <View style={styles.dot} />
              <RNText style={styles.gridEyebrow}>{eyebrow}</RNText>
            </View>
            <View style={styles.grid}>
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  styles={styles}
                  palette={palette}
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

        <View style={styles.previewHead}>
          <View style={styles.dot} />
          <RNText style={styles.previewKicker}>LIVE PREVIEW</RNText>
        </View>
        <DeviceFrame style={{ height: 400 }}>
          <StorefrontPreview mode="mini" />
        </DeviceFrame>
      </ScrollView>

      <StudioFooter
        label="Continue"
        onPress={() => router.push('/(modules)/merch/build/mockups')}
        hint="Add at least one product, or continue to design with AI."
        animStyle={footerStyle}
      />

      <Sheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        eyebrow="NEW PRODUCT"
        title="Design your piece"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ maxHeight: height * 0.66 }}
        >
          {/* Live garment mockup — drag & pinch to place the design */}
          <View style={styles.mockupWrap}>
            <PrintPlacer
              key={`${placement}:${artworkUri ?? 'none'}`}
              type={typeKey}
              side={placement}
              color={colorHex}
              artworkUri={artworkUri}
              transform={art}
              size={236}
              onChange={setArt}
            />
            <RNText style={styles.mockupName} numberOfLines={1}>
              {name.trim() || 'Untitled piece'}
            </RNText>
            <RNText style={styles.mockupMeta}>
              {type.label} · {method.label} · {placement}
            </RNText>
            {artworkUri ? (
              <RNText style={styles.placeHint}>Drag to move · pinch to zoom</RNText>
            ) : (
              <RNText style={styles.placeHint}>Upload a design below to place it</RNText>
            )}
          </View>

          {/* Product type */}
          <RNText style={styles.fieldLabel}>PRODUCT</RNText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeRow}
          >
            {STORE_PRODUCT_TYPES.map((t) => {
              const on = typeKey === t.key;
              return (
                <Pressable
                  key={t.key}
                  onPress={() => onPickType(t.key)}
                  style={[styles.typeCard, on && styles.typeCardOn]}
                >
                  <Ionicons name={t.icon as any} size={20} color={on ? palette.bone : palette.ink} />
                  <RNText style={[styles.typeLabel, { color: on ? palette.bone : palette.ink }]}>
                    {t.label}
                  </RNText>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Color */}
          <RNText style={styles.fieldLabel}>COLOR</RNText>
          <View style={styles.swatchRow}>
            {GARMENT_COLORS.map((c) => {
              const on = colorHex === c.hex;
              return (
                <Pressable key={c.key} onPress={() => setColorHex(c.hex)} hitSlop={6} style={styles.swatchWrap}>
                  <View
                    style={[
                      styles.swatch,
                      { backgroundColor: c.hex, borderColor: on ? palette.ink : palette.line, borderWidth: on ? 2.5 : 1 },
                    ]}
                  >
                    {on ? <Ionicons name="checkmark" size={16} color={readableOn(c.hex)} /> : null}
                  </View>
                  <RNText style={styles.swatchLabel}>{c.label}</RNText>
                </Pressable>
              );
            })}
          </View>

          {/* Design image */}
          <RNText style={styles.fieldLabel}>DESIGN</RNText>
          {artworkUri ? (
            <View style={styles.artRow}>
              <View style={styles.artThumb}>
                <Image source={{ uri: artworkUri }} style={styles.artThumbImg} contentFit="cover" />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.artTitle}>Design added</RNText>
                <View style={styles.artBtns}>
                  <Pressable onPress={pickArtwork} style={styles.artBtn} hitSlop={6}>
                    <Ionicons name="image-outline" size={14} color={palette.ink} />
                    <RNText style={styles.artBtnText}>REPLACE</RNText>
                  </Pressable>
                  <Pressable onPress={() => setArtworkUri(null)} style={styles.artBtnGhost} hitSlop={6}>
                    <RNText style={styles.artBtnGhostText}>REMOVE</RNText>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            <Pressable onPress={pickArtwork} style={styles.artUpload}>
              <View style={styles.artUploadIcon}>
                <Ionicons name="image-outline" size={20} color={palette.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.artUploadTitle}>Choose from gallery</RNText>
                <RNText style={styles.artUploadSub}>Upload & crop your artwork · optional</RNText>
              </View>
              <Ionicons name="add" size={20} color={palette.ink} />
            </Pressable>
          )}

          {/* Placement */}
          <RNText style={styles.fieldLabel}>PLACEMENT</RNText>
          <View style={styles.placeRow}>
            {PLACEMENTS.map((p) => {
              const on = placement === p.key;
              return (
                <Pressable
                  key={p.key}
                  onPress={() => setPlacement(p.key)}
                  style={[styles.placeCard, on && styles.placeCardOn]}
                >
                  <PlacementGlyph place={p.key} on={on} palette={palette} />
                  <RNText style={[styles.placeLabel, { color: on ? palette.ink : palette.mute }]}>
                    {p.label}
                  </RNText>
                </Pressable>
              );
            })}
          </View>

          {/* Print method */}
          <RNText style={styles.fieldLabel}>PRINT METHOD</RNText>
          <View style={styles.methodGrid}>
            {PRINT_METHODS.map((m) => {
              const on = methodKey === m.key;
              return (
                <Pressable
                  key={m.key}
                  onPress={() => setMethodKey(m.key)}
                  style={[styles.methodCard, on && styles.methodCardOn]}
                >
                  <View style={styles.methodTop}>
                    <Ionicons name={m.icon as any} size={18} color={palette.ink} />
                    <Ionicons
                      name={on ? 'checkmark-circle' : 'ellipse-outline'}
                      size={16}
                      color={on ? palette.ink : palette.line}
                    />
                  </View>
                  <RNText style={styles.methodName}>{m.label}</RNText>
                  <RNText style={styles.methodSub} numberOfLines={2}>{m.sub}</RNText>
                </Pressable>
              );
            })}
          </View>

          {/* Name + price */}
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
            <RNText style={styles.validateHint}>Add a name and a price to continue.</RNText>
          ) : null}
          <View style={{ height: 12 }} />
        </ScrollView>
      </Sheet>
    </View>
  );
}

// Tiny garment glyph showing where the print sits, for the placement chips.
function PlacementGlyph({ place, on, palette }: { place: ProductPlacement; on: boolean; palette: typeof staticPalette }) {
  const dotStyle: any =
    place === 'FRONT'
      ? { top: 9, left: 9, right: 9, height: 9 }
      : place === 'BACK'
      ? { top: 7, left: 6, right: 6, bottom: 7 }
      : place === 'LEFT'
      ? { top: 6, left: 6, width: 7, height: 7 }
      : { top: 6, right: 6, width: 7, height: 7 };
  return (
    <View style={{ width: 30, height: 32, borderRadius: 7, borderWidth: 1.5, borderColor: on ? palette.ink : palette.line, marginBottom: 6 }}>
      <View style={[{ position: 'absolute', borderRadius: 2, backgroundColor: on ? palette.ink : palette.mute }, dotStyle]} />
    </View>
  );
}

function ProductCard({
  product,
  styles,
  palette,
  onRemove,
}: {
  product: BuilderProduct;
  styles: ReturnType<typeof makeStyles>;
  palette: typeof staticPalette;
  onRemove: () => void;
}) {
  const typeLabel = getProductType(product.type).label;

  return (
    <View style={styles.card}>
      <View style={[styles.cardArt, { backgroundColor: palette.boneSoft }]}>
        {product.mockupUrl ? (
          <Image source={{ uri: product.mockupUrl }} style={styles.cardArtFill} contentFit="cover" />
        ) : (
          <PrintMockup
            type={product.type}
            side={product.placement ?? 'FRONT'}
            color={product.color}
            artworkUri={product.artworkUri}
            transform={{ x: product.artX ?? 0, y: product.artY ?? 0, scale: product.artScale ?? 1 }}
            size={120}
          />
        )}

        {product.method ? (
          <View style={styles.methodTag}>
            <RNText style={styles.methodTagText} numberOfLines={1}>{product.method}</RNText>
          </View>
        ) : null}

        <Pressable style={styles.removeBtn} onPress={onRemove} hitSlop={8}>
          <Ionicons name="close" size={15} color="#FFFFFF" />
        </Pressable>
      </View>

      <RNText style={styles.cardType}>
        {typeLabel}
        {product.placement ? ` · ${product.placement}` : ''}
      </RNText>
      <RNText style={styles.cardName} numberOfLines={1}>{product.name}</RNText>
      <RNText style={styles.cardPrice}>₹{product.price.toLocaleString()}</RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.bone },
    scroll: { paddingHorizontal: 16, paddingBottom: 24 },

    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: palette.acid },
    kickerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    kicker: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 44,
      letterSpacing: -1.8,
      color: palette.ink,
      marginTop: 4,
    },
    lede: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: palette.mute, marginTop: 10, marginBottom: 22 },

    // Empty state
    empty: {
      alignItems: 'center',
      paddingVertical: 36,
      paddingHorizontal: 12,
      borderRadius: 18,
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
    emptyTitle: { fontFamily: fonts.displayBold, fontSize: 22, letterSpacing: -0.6, color: palette.ink },
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
    addBigLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2, color: palette.bone, textTransform: 'uppercase' },

    // Grid
    gridHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
    gridEyebrow: { ...T.labelLarge, color: palette.ink, opacity: 0.7 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    card: { width: '48%', marginBottom: 18 },
    cardArt: {
      height: 132,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    cardArtImg: { width: '72%', height: '72%' },
    cardArtFill: { width: '100%', height: '100%' },
    cardArtLabel: { fontFamily: fonts.displayBold, fontSize: 14, letterSpacing: 0.5, opacity: 0.9, paddingHorizontal: 10 },
    methodTag: {
      position: 'absolute',
      left: 8,
      bottom: 8,
      paddingHorizontal: 8,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'rgba(10,10,10,0.6)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    methodTagText: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1, color: '#FFFFFF' },
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
    cardType: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.mute, marginTop: 10 },
    cardName: { fontFamily: fonts.bodyMedium, fontSize: 15, color: palette.ink, marginTop: 2 },
    cardPrice: { fontFamily: fonts.displayBold, fontSize: 16, letterSpacing: -0.3, color: palette.ink, marginTop: 2 },
    addTile: {
      width: '48%',
      height: 132,
      borderRadius: 18,
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
    addTileLabel: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },

    // AI hint
    aiHint: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      marginTop: 8,
      marginBottom: 26,
    },
    aiHintText: { flex: 1, fontFamily: fonts.body, fontSize: 15, lineHeight: 20, color: palette.ink },

    previewHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 28, marginBottom: 12 },
    previewKicker: { ...T.labelLarge, color: palette.ink },

    // ---- Sheet ----
    // Mockup
    mockupWrap: { alignItems: 'center', paddingTop: 6, paddingBottom: 4 },
    garment: {
      width: 150,
      height: 172,
      borderRadius: 20,
      borderWidth: 1,
      overflow: 'hidden',
    },
    collar: {
      position: 'absolute',
      top: -2,
      left: '50%',
      marginLeft: -22,
      width: 44,
      height: 18,
      borderBottomLeftRadius: 22,
      borderBottomRightRadius: 22,
    },
    designBox: { position: 'absolute' },
    designGhost: {
      position: 'absolute',
      borderRadius: 6,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mockupName: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.4, color: palette.ink, marginTop: 14 },
    mockupMeta: { ...T.small, color: palette.mute, marginTop: 3, letterSpacing: 0.5 },
    mockupPrice: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.4, color: palette.ink, marginTop: 6 },
    placeHint: { ...T.small, color: palette.mute, marginTop: 8, letterSpacing: 0.5 },

    fieldLabel: { ...T.label, color: palette.ink, opacity: 0.6, marginTop: 20, marginBottom: 12 },

    // Product type row
    typeRow: { gap: 8, paddingRight: 8 },
    typeCard: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      width: 74,
      height: 64,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    typeCardOn: { backgroundColor: palette.ink, borderColor: palette.ink },
    typeLabel: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1 },

    // Color swatches — all on one line, evenly spaced
    swatchRow: { flexDirection: 'row', justifyContent: 'space-between' },
    swatchWrap: { alignItems: 'center' },
    swatch: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
    swatchLabel: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 0.8, color: palette.mute, marginTop: 6 },

    // Design upload
    artUpload: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    artUploadIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.boneSoft,
      borderWidth: 1,
      borderColor: palette.line,
    },
    artUploadTitle: { fontFamily: fonts.bodyBold, fontSize: 15, color: palette.ink },
    artUploadSub: { ...T.small, color: palette.mute, marginTop: 2 },
    artRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    artThumb: { width: 56, height: 56, borderRadius: 12, overflow: 'hidden', backgroundColor: palette.boneSoft },
    artThumbImg: { width: 56, height: 56 },
    artTitle: { fontFamily: fonts.bodyBold, fontSize: 14, color: palette.ink },
    artBtns: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
    artBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      height: 30,
      paddingHorizontal: 12,
      borderRadius: 15,
      borderWidth: 1.5,
      borderColor: palette.ink,
    },
    artBtnText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.2, color: palette.ink },
    artBtnGhost: { height: 30, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center' },
    artBtnGhostText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.2, color: palette.mute },

    // Placement
    placeRow: { flexDirection: 'row', gap: 8 },
    placeCard: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    placeCardOn: { borderColor: palette.ink, backgroundColor: palette.boneSoft },
    placeLabel: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 0.6 },

    // Print method grid
    methodGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    methodCard: {
      width: '48.5%',
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 12,
      marginBottom: 10,
    },
    methodCardOn: { borderColor: palette.ink, backgroundColor: palette.boneSoft },
    methodTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    methodName: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 0.4, color: palette.ink, marginTop: 8 },
    methodSub: { ...T.small, color: palette.mute, marginTop: 3, lineHeight: 15 },

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
    priceSymbol: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, marginRight: 8 },
    priceInput: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 16, color: palette.ink, paddingVertical: 0 },

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
    commitLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.2, color: palette.bone, textTransform: 'uppercase' },
    commitArrow: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.bone },
    validateHint: { fontFamily: fonts.body, fontSize: 13, color: palette.mute, textAlign: 'center', marginTop: 12 },
  });
