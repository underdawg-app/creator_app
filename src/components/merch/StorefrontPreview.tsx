// StorefrontPreview — a REAL rendered storefront, not an image. It reads the
// shared storeBuilder slice and re-renders from state, so every edit in the
// wizard (identity, theme, banner, layout, products) updates it instantly.
//
//   mode="mini" — condensed, fits inside a card / device frame in each step.
//   mode="full" — full storefront for the preview overlay (scrollable).
//
// The storefront is styled by the creator's chosen palette + fonts, NOT by the
// app's theme tokens — the chrome around it stays in the app's look.

import React from 'react';
import { View, ScrollView, Text as RNText, StyleSheet } from 'react-native';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import {
  getTheme,
  getFontPair,
  getProductType,
  monogramOf,
  storeUrlOf,
  type StoreTheme,
} from '@/screens/modules/merch/studio/themePresets';
import type { BuilderProduct, StoreBuilder } from '@/store';

// Light vs dark garment → readable label color.
function readableOn(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length < 6) return '#0A0A0A';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0A0A0A' : '#FFFFFF';
}

type Props = {
  mode?: 'mini' | 'full';
};

export function StorefrontPreview({ mode = 'mini' }: Props) {
  const b = useStore((s) => s.storeBuilder);
  const theme = getTheme(b.themeKey);
  const font = getFontPair(b.fontKey);
  const mini = mode !== 'full';

  const name = b.name?.trim() || 'YOUR STORE';
  const url = storeUrlOf(b.handle);

  const body = (
    <>
      {/* Header */}
      <View style={[styles.header, { borderColor: theme.border, paddingHorizontal: mini ? 12 : 20, paddingVertical: mini ? 10 : 16 }]}>
        <View style={[styles.mono, { backgroundColor: theme.accent, width: mini ? 26 : 40, height: mini ? 26 : 40, borderRadius: mini ? 7 : 10 }]}>
          <RNText style={{ fontFamily: font.display, color: theme.accentText, fontSize: mini ? 12 : 18 }}>
            {monogramOf(b.name)}
          </RNText>
        </View>
        <View style={{ flex: 1, marginLeft: mini ? 8 : 12 }}>
          <RNText numberOfLines={1} style={{ fontFamily: font.display, color: theme.text, fontSize: mini ? 13 : 20, letterSpacing: -0.3 }}>
            {name.toUpperCase()}
          </RNText>
          {!!b.tagline && (
            <RNText numberOfLines={1} style={{ fontFamily: font.body, color: theme.sub, fontSize: mini ? 9 : 12, marginTop: 1 }}>
              {b.tagline}
            </RNText>
          )}
        </View>
        <Ionicons name="bag-outline" size={mini ? 15 : 22} color={theme.text} />
      </View>

      {/* Search */}
      {b.showSearch && (
        <View style={{ paddingHorizontal: mini ? 12 : 20, paddingTop: mini ? 8 : 14 }}>
          <View style={[styles.search, { borderColor: theme.border, backgroundColor: theme.surface, height: mini ? 26 : 42, borderRadius: mini ? 7 : 12 }]}>
            <Ionicons name="search" size={mini ? 11 : 16} color={theme.sub} />
            <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: mini ? 9 : 13, marginLeft: 6 }}>
              Search the store
            </RNText>
          </View>
        </View>
      )}

      {/* Hero banner */}
      <Banner b={b} theme={theme} fontDisplay={font.display} fontBody={font.body} mini={mini} />

      {/* Product grid */}
      {b.showGrid && (
        <View style={{ paddingHorizontal: mini ? 12 : 20, paddingTop: mini ? 10 : 18 }}>
          <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: mini ? 8 : 11, letterSpacing: 2, marginBottom: mini ? 6 : 12 }}>
            {b.products.length > 0 ? `${b.products.length} PIECES` : 'ALL PRODUCTS'}
          </RNText>
          <View style={styles.grid}>
            {(b.products.length > 0
              ? b.products.slice(0, mini ? 4 : 12)
              : ([null, null, null, null] as (BuilderProduct | null)[])
            ).map((p, i) => (
              <ProductTile
                key={p ? p.id : `ph${i}`}
                product={p ?? undefined}
                theme={theme}
                fontDisplay={font.display}
                fontBody={font.body}
                mini={mini}
              />
            ))}
          </View>
        </View>
      )}

      {/* Story block */}
      {b.showStory && (!mini || b.products.length === 0) && (
        <View style={{ paddingHorizontal: mini ? 12 : 20, paddingTop: mini ? 12 : 24 }}>
          <View style={{ height: 1, backgroundColor: theme.border, marginBottom: mini ? 8 : 16 }} />
          <RNText style={{ fontFamily: font.display, color: theme.text, fontSize: mini ? 13 : 24, letterSpacing: -0.3 }}>
            {(b.storyTitle || 'THE STORY').toUpperCase()}
          </RNText>
          <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: mini ? 9 : 14, lineHeight: mini ? 14 : 21, marginTop: mini ? 4 : 8 }}>
            {b.storyBody}
          </RNText>
        </View>
      )}

      {/* Footer */}
      {b.showFooter && (
        <View style={{ paddingHorizontal: mini ? 12 : 20, paddingTop: mini ? 14 : 28, paddingBottom: mini ? 14 : 36 }}>
          <View style={{ height: 1, backgroundColor: theme.border, marginBottom: mini ? 8 : 16 }} />
          <RNText style={{ fontFamily: font.display, color: theme.accent, fontSize: mini ? 10 : 14, letterSpacing: 0.5 }}>
            {url}
          </RNText>
          <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: mini ? 8 : 11, marginTop: 4, letterSpacing: 1.5 }}>
            POWERED BY UNDERDAWG
          </RNText>
        </View>
      )}
    </>
  );

  if (mini) {
    return <View style={[styles.root, { backgroundColor: theme.bg }]}>{body}</View>;
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {body}
    </ScrollView>
  );
}

function Banner({
  b,
  theme,
  fontDisplay,
  fontBody,
  mini,
}: {
  b: StoreBuilder;
  theme: StoreTheme;
  fontDisplay: string;
  fontBody: string;
  mini: boolean;
}) {
  const h = mini ? 96 : 220;
  const pad = mini ? 12 : 24;
  const filled = b.bannerStyle === 'GRADIENT' || b.bannerStyle === 'SOLID' || b.bannerStyle === 'PATTERN';
  const bg =
    b.bannerStyle === 'MINIMAL' ? theme.surface : theme.accent;
  const fg = b.bannerStyle === 'MINIMAL' ? theme.text : readableOn(theme.accent);
  const sub = b.bannerStyle === 'MINIMAL' ? theme.sub : fg;

  return (
    <View style={{ paddingHorizontal: mini ? 12 : 20, paddingTop: mini ? 10 : 18 }}>
      <View style={[styles.banner, { height: h, backgroundColor: bg, borderRadius: mini ? 10 : 18, borderWidth: b.bannerStyle === 'MINIMAL' ? 1 : 0, borderColor: theme.border, padding: pad, overflow: 'hidden' }]}>
        {/* GRADIENT fake: layered translucent block for depth */}
        {b.bannerStyle === 'GRADIENT' && (
          <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000', opacity: 0.18 }]} />
        )}
        {/* PATTERN: row of dots */}
        {b.bannerStyle === 'PATTERN' && (
          <View pointerEvents="none" style={styles.pattern}>
            {Array.from({ length: 24 }).map((_, i) => (
              <View key={i} style={{ width: mini ? 6 : 12, height: mini ? 6 : 12, borderRadius: 999, margin: mini ? 4 : 8, backgroundColor: fg, opacity: 0.18 }} />
            ))}
          </View>
        )}
        {b.bannerStyle === 'MINIMAL' && (
          <View style={{ width: mini ? 24 : 44, height: 3, backgroundColor: theme.accent, marginBottom: mini ? 6 : 12 }} />
        )}
        <View style={{ marginTop: 'auto' }}>
          <RNText numberOfLines={2} style={{ fontFamily: fontDisplay, color: fg, fontSize: mini ? 18 : 38, lineHeight: mini ? 18 : 38, letterSpacing: -0.6 }}>
            {(b.headline || 'THE NEW DROP').toUpperCase()}
          </RNText>
          {!!b.subtext && (
            <RNText numberOfLines={1} style={{ fontFamily: fontBody, color: sub, fontSize: mini ? 9 : 14, marginTop: mini ? 3 : 8, opacity: 0.92 }}>
              {b.subtext}
            </RNText>
          )}
          <View style={[styles.cta, { backgroundColor: b.bannerStyle === 'MINIMAL' ? theme.accent : theme.bg, marginTop: mini ? 8 : 16, paddingHorizontal: mini ? 10 : 18, paddingVertical: mini ? 5 : 10, borderRadius: mini ? 6 : 10 }]}>
            <RNText style={{ fontFamily: fontBody, color: b.bannerStyle === 'MINIMAL' ? theme.accentText : theme.text, fontSize: mini ? 9 : 13, letterSpacing: 1.5 }}>
              {(b.buttonLabel || 'SHOP NOW').toUpperCase()}
            </RNText>
          </View>
        </View>
      </View>
    </View>
  );
}

function ProductTile({
  product,
  theme,
  fontDisplay,
  fontBody,
  mini,
}: {
  product?: BuilderProduct;
  theme: StoreTheme;
  fontDisplay: string;
  fontBody: string;
  mini: boolean;
}) {
  const swatch = product?.color ?? theme.surface;
  const label = product ? product.design : 'ADD';
  const labelColor = product ? readableOn(swatch) : theme.sub;
  const typeLabel = product ? getProductType(product.type).label : 'PRODUCT';

  return (
    <View style={[styles.tile, { width: mini ? '48%' : '48%', marginBottom: mini ? 8 : 14 }]}>
      <View
        style={[
          styles.tileArt,
          {
            backgroundColor: swatch,
            borderColor: theme.border,
            height: mini ? 64 : 150,
            borderRadius: mini ? 8 : 14,
          },
        ]}
      >
        <RNText style={{ fontFamily: fontDisplay, color: labelColor, fontSize: mini ? 9 : 14, letterSpacing: 0.5, opacity: product ? 0.9 : 0.5 }}>
          {label}
        </RNText>
      </View>
      <RNText numberOfLines={1} style={{ fontFamily: fontBody, color: theme.text, fontSize: mini ? 9 : 13, marginTop: mini ? 4 : 8 }}>
        {product ? product.name : typeLabel}
      </RNText>
      <RNText style={{ fontFamily: fontDisplay, color: theme.text, fontSize: mini ? 10 : 15, marginTop: 1 }}>
        {product ? `₹${product.price.toLocaleString()}` : '—'}
      </RNText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  mono: { alignItems: 'center', justifyContent: 'center' },
  search: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderWidth: 1 },
  banner: { justifyContent: 'flex-end' },
  pattern: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', flexWrap: 'wrap', opacity: 0.9 },
  cta: { alignSelf: 'flex-start' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: {},
  tileArt: { alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
