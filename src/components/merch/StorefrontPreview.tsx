// StorefrontPreview — a REAL rendered storefront, not an image. It reads the
// shared storeBuilder slice and re-renders from state, so every edit in the
// wizard (identity, theme, banners, layout, products) updates it instantly.
//
//   mode="mini" — condensed, fits inside a card / device frame in each step.
//   mode="full" — full storefront for the preview overlay (scrollable).
//
// Layout, top → bottom:
//   header (optional bg image · logo · store name · cart)
//   menu links (ALL PRODUCTS · NEW IN …)
//   search (optional)
//   hero banner CAROUSEL — auto-rotates through 2–3 slides
//   product grid
//   story block (optional)
//   customizable footer (links + note)
//
// The storefront is styled by the creator's chosen palette + fonts, NOT by the
// app's theme tokens — the chrome around it stays in the app's look.

import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Text as RNText, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@/icons';
import { Image } from '@/components/ui/Image';
import { RealProductMockup } from '@/components/merch/RealProductMockup';
import { useStore } from '@/store';
import {
  getTheme,
  getFontPair,
  getProductType,
  monogramOf,
  storeUrlOf,
  type StoreTheme,
} from '@/screens/modules/merch/studio/themePresets';
import type { BannerItem, BuilderProduct, StoreBuilder } from '@/store';

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
  const menuLinks = b.menuLinks ?? [];
  const footerLinks = b.footerLinks ?? [];
  const hasHeaderImg = !!b.headerImageUri;
  const headerFg = hasHeaderImg ? '#FFFFFF' : theme.text;
  const headerSub = hasHeaderImg ? 'rgba(255,255,255,0.85)' : theme.sub;

  // ── Shopping flow (full mode only) ──────────────────────────────────────
  const [view, setView] = useState<ShopView>('home');
  const [active, setActive] = useState<BuilderProduct | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const realProducts = useMemo(() => b.products, [b.products]);

  const openProduct = (p: BuilderProduct) => { setActive(p); setView('product'); };
  const openCart = () => setView('cart');
  const backHome = () => setView('home');
  const addToCart = (p: BuilderProduct, size: string, qty: number) => {
    setCart((prev) => {
      const key = `${p.id}-${size}`;
      const hit = prev.find((l) => l.key === key);
      if (hit) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, product: p, size, qty }];
    });
    setView('cart');
  };
  const setLineQty = (key: string, delta: number) =>
    setCart((prev) => prev.flatMap((l) => (l.key === key ? (l.qty + delta <= 0 ? [] : [{ ...l, qty: l.qty + delta }]) : [l])));
  const checkout = () => setView('done');

  const body = (
    <>
      {/* Header — optional bg image · logo · name · cart */}
      <View
        style={[
          styles.header,
          {
            borderColor: theme.border,
            paddingHorizontal: mini ? 12 : 20,
            paddingVertical: mini ? 10 : 16,
            minHeight: hasHeaderImg ? (mini ? 60 : 96) : undefined,
            overflow: 'hidden',
          },
        ]}
      >
        {hasHeaderImg ? (
          <>
            <Image source={{ uri: b.headerImageUri! }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
            <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000', opacity: 0.34 }]} />
          </>
        ) : null}

        <View style={[styles.mono, { backgroundColor: theme.accent, width: mini ? 26 : 40, height: mini ? 26 : 40, borderRadius: mini ? 7 : 10, overflow: 'hidden' }]}>
          {b.logoUri ? (
            <Image
              source={{ uri: b.logoUri }}
              style={{ width: mini ? 26 : 40, height: mini ? 26 : 40, borderRadius: mini ? 7 : 10 }}
              contentFit="cover"
            />
          ) : (
            <RNText style={{ fontFamily: font.display, color: theme.accentText, fontSize: mini ? 12 : 18 }}>
              {monogramOf(b.name)}
            </RNText>
          )}
        </View>
        <View style={{ flex: 1, marginLeft: mini ? 8 : 12 }}>
          <RNText numberOfLines={1} style={{ fontFamily: font.display, color: headerFg, fontSize: mini ? 13 : 20, letterSpacing: -0.3 }}>
            {name.toUpperCase()}
          </RNText>
          {!!b.tagline && (
            <RNText numberOfLines={1} style={{ fontFamily: font.body, color: headerSub, fontSize: mini ? 9 : 12, marginTop: 1 }}>
              {b.tagline}
            </RNText>
          )}
        </View>
        {/* Cart */}
        <Pressable style={styles.cartWrap} onPress={mini ? undefined : openCart} hitSlop={8}>
          <Ionicons name="bag-outline" size={mini ? 15 : 22} color={headerFg} />
          {(mini || cartCount > 0) && (
            <View style={[styles.cartDot, { backgroundColor: theme.accent, width: mini ? 12 : 16, height: mini ? 12 : 16, borderRadius: mini ? 6 : 8 }]}>
              <RNText style={{ fontFamily: font.body, color: theme.accentText, fontSize: mini ? 7 : 9 }}>{mini ? 2 : cartCount}</RNText>
            </View>
          )}
        </Pressable>
      </View>

      {/* Menu links */}
      {menuLinks.length > 0 && (
        <View style={[styles.menuRow, { borderColor: theme.border, paddingHorizontal: mini ? 12 : 20, paddingVertical: mini ? 7 : 12, gap: mini ? 12 : 20 }]}>
          {menuLinks.slice(0, mini ? 4 : 6).map((m) => (
            <RNText key={m.id} numberOfLines={1} style={{ fontFamily: font.body, color: theme.text, fontSize: mini ? 8 : 11, letterSpacing: mini ? 0.8 : 1.4 }}>
              {m.label.toUpperCase()}
            </RNText>
          ))}
        </View>
      )}

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

      {/* Hero banner carousel */}
      <BannerCarousel
        banners={b.banners ?? []}
        bannerStyle={b.bannerStyle}
        theme={theme}
        fontDisplay={font.display}
        fontBody={font.body}
        mini={mini}
      />

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
                onPress={p && !mini ? () => openProduct(p) : undefined}
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

      {/* Footer — customizable */}
      {b.showFooter && (
        <View style={{ paddingHorizontal: mini ? 12 : 20, paddingTop: mini ? 14 : 28, paddingBottom: mini ? 14 : 36 }}>
          <View style={{ height: 1, backgroundColor: theme.border, marginBottom: mini ? 8 : 16 }} />
          {footerLinks.length > 0 && (
            <View style={[styles.footerLinks, { gap: mini ? 10 : 18, marginBottom: mini ? 8 : 14 }]}>
              {footerLinks.slice(0, mini ? 3 : 6).map((l, i) => (
                <RNText key={`${l}${i}`} style={{ fontFamily: font.body, color: theme.text, fontSize: mini ? 8 : 12, letterSpacing: 1.2 }}>
                  {l.toUpperCase()}
                </RNText>
              ))}
            </View>
          )}
          <RNText style={{ fontFamily: font.display, color: theme.accent, fontSize: mini ? 10 : 14, letterSpacing: 0.5 }}>
            {url}
          </RNText>
          {!!b.footerNote && (
            <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: mini ? 8 : 12, marginTop: mini ? 3 : 6, lineHeight: mini ? 12 : 18 }}>
              {b.footerNote}
            </RNText>
          )}
          <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: mini ? 8 : 11, marginTop: 4, letterSpacing: 1.5, opacity: 0.7 }}>
            POWERED BY UNDERDAWG
          </RNText>
        </View>
      )}
    </>
  );

  if (mini) {
    return <View style={[styles.root, { backgroundColor: theme.bg }]}>{body}</View>;
  }

  // Full mode = an interactive store with a tiny in-component router:
  // home → product detail (size/colour/qty) → cart → order placed.
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {view === 'home' && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          {body}
        </ScrollView>
      )}
      {view === 'product' && active && (
        <ProductDetail
          product={active}
          products={realProducts}
          theme={theme}
          font={font}
          cartCount={cartCount}
          onBack={backHome}
          onOpenCart={openCart}
          onSelectProduct={setActive}
          onAdd={addToCart}
        />
      )}
      {view === 'cart' && (
        <CartView cart={cart} theme={theme} font={font} onBack={backHome} onChangeQty={setLineQty} onCheckout={checkout} />
      )}
      {view === 'done' && (
        <OrderDone theme={theme} font={font} total={cartTotal(cart)} onDone={() => { setCart([]); backHome(); }} />
      )}
    </View>
  );
}

// ── Shopping-flow types + helpers ─────────────────────────────────────────
type ShopView = 'home' | 'product' | 'cart' | 'done';
type CartLine = { key: string; product: BuilderProduct; size: string; qty: number };
type ShopFont = { display: string; body: string };

const APPAREL = new Set(['TEE', 'HOODIE', 'CAP']);
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const sizesFor = (type: string) => (APPAREL.has(type) ? SIZES : ['ONE SIZE']);
const cartTotal = (cart: CartLine[]) => cart.reduce((n, l) => n + l.product.price * l.qty, 0);

function productImage(product: BuilderProduct, theme: StoreTheme, radius: number) {
  if (product.mockupUrl) {
    return <Image source={{ uri: product.mockupUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />;
  }
  return (
    <RealProductMockup
      type={product.type}
      color={product.color}
      artworkUri={product.artworkUri}
      transform={{ x: product.artX ?? 0, y: product.artY ?? 0, scale: product.artScale ?? 1 }}
      view={(product.placement ?? 'FRONT') as any}
      fill
      radius={radius}
    />
  );
}

// ── Product detail — pick size + colour variant + qty, add to cart ────────
function ProductDetail({
  product,
  products,
  theme,
  font,
  cartCount,
  onBack,
  onOpenCart,
  onSelectProduct,
  onAdd,
}: {
  product: BuilderProduct;
  products: BuilderProduct[];
  theme: StoreTheme;
  font: ShopFont;
  cartCount: number;
  onBack: () => void;
  onOpenCart: () => void;
  onSelectProduct: (p: BuilderProduct) => void;
  onAdd: (p: BuilderProduct, size: string, qty: number) => void;
}) {
  const sizes = sizesFor(product.type);
  const [size, setSize] = useState(sizes[Math.min(1, sizes.length - 1)]);
  const [qty, setQty] = useState(1);

  // Same-type pieces become colour variants you can switch between.
  const variants = products.filter((p) => p.type === product.type);

  return (
    <View style={{ flex: 1 }}>
      <ShopTopBar theme={theme} font={font} title={getProductType(product.type).label} cartCount={cartCount} onBack={onBack} onCart={onOpenCart} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={[shop.hero, { backgroundColor: theme.surface }]}>{productImage(product, theme, 0)}</View>

        <View style={{ padding: 20, gap: 4 }}>
          <RNText style={{ fontFamily: font.display, color: theme.text, fontSize: 24, letterSpacing: -0.4 }}>{product.name.toUpperCase()}</RNText>
          <RNText style={{ fontFamily: font.display, color: theme.accent, fontSize: 20 }}>₹{product.price.toLocaleString()}</RNText>
          {!!product.method && (
            <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: 12, marginTop: 2 }}>{product.method} · {(product.placement ?? 'FRONT')}</RNText>
          )}

          {variants.length > 1 && (
            <>
              <RNText style={[shop.label, { color: theme.sub }]}>COLOUR</RNText>
              <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                {variants.map((v) => (
                  <Pressable key={v.id} onPress={() => onSelectProduct(v)} style={[shop.swatch, { backgroundColor: v.color, borderColor: v.id === product.id ? theme.text : theme.border, borderWidth: v.id === product.id ? 2.5 : 1 }]} />
                ))}
              </View>
            </>
          )}

          <RNText style={[shop.label, { color: theme.sub }]}>SIZE</RNText>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {sizes.map((sz) => {
              const on = sz === size;
              return (
                <Pressable key={sz} onPress={() => setSize(sz)} style={[shop.sizeChip, { borderColor: on ? theme.text : theme.border, backgroundColor: on ? theme.text : 'transparent' }]}>
                  <RNText style={{ fontFamily: font.body, fontSize: 12, letterSpacing: 0.5, color: on ? theme.bg : theme.text }}>{sz}</RNText>
                </Pressable>
              );
            })}
          </View>

          <RNText style={[shop.label, { color: theme.sub }]}>QUANTITY</RNText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
            <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))} style={[shop.qtyBtn, { borderColor: theme.border }]}>
              <Ionicons name="remove" size={18} color={theme.text} />
            </Pressable>
            <RNText style={{ fontFamily: font.display, color: theme.text, fontSize: 18, minWidth: 24, textAlign: 'center' }}>{qty}</RNText>
            <Pressable onPress={() => setQty((q) => q + 1)} style={[shop.qtyBtn, { borderColor: theme.border }]}>
              <Ionicons name="add" size={18} color={theme.text} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={[shop.bottomBar, { backgroundColor: theme.bg, borderColor: theme.border }]}>
        <Pressable onPress={() => onAdd(product, size, qty)} style={[shop.cartBtn, { backgroundColor: theme.accent }]}>
          <Ionicons name="bag-add-outline" size={18} color={theme.accentText} />
          <RNText style={{ fontFamily: font.body, color: theme.accentText, fontSize: 14, letterSpacing: 1.5 }}>ADD TO CART · ₹{(product.price * qty).toLocaleString()}</RNText>
        </Pressable>
      </View>
    </View>
  );
}

// ── Cart ──────────────────────────────────────────────────────────────────
function CartView({
  cart,
  theme,
  font,
  onBack,
  onChangeQty,
  onCheckout,
}: {
  cart: CartLine[];
  theme: StoreTheme;
  font: ShopFont;
  onBack: () => void;
  onChangeQty: (key: string, delta: number) => void;
  onCheckout: () => void;
}) {
  const total = cartTotal(cart);
  return (
    <View style={{ flex: 1 }}>
      <ShopTopBar theme={theme} font={font} title="CART" cartCount={cart.reduce((n, l) => n + l.qty, 0)} onBack={onBack} />
      {cart.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 32 }}>
          <Ionicons name="bag-outline" size={36} color={theme.sub} />
          <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: 14 }}>Your cart is empty.</RNText>
        </View>
      ) : (
        <>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
            {cart.map((l) => (
              <View key={l.key} style={[shop.cartRow, { borderColor: theme.border }]}>
                <View style={[shop.cartThumb, { backgroundColor: theme.surface }]}>{productImage(l.product, theme, 10)}</View>
                <View style={{ flex: 1, gap: 2 }}>
                  <RNText numberOfLines={1} style={{ fontFamily: font.body, color: theme.text, fontSize: 14, fontWeight: '600' }}>{l.product.name}</RNText>
                  <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: 12 }}>Size {l.size}</RNText>
                  <RNText style={{ fontFamily: font.display, color: theme.text, fontSize: 14 }}>₹{(l.product.price * l.qty).toLocaleString()}</RNText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <Pressable onPress={() => onChangeQty(l.key, -1)} style={[shop.qtyMini, { borderColor: theme.border }]}><Ionicons name="remove" size={14} color={theme.text} /></Pressable>
                  <RNText style={{ fontFamily: font.display, color: theme.text, fontSize: 14, minWidth: 16, textAlign: 'center' }}>{l.qty}</RNText>
                  <Pressable onPress={() => onChangeQty(l.key, 1)} style={[shop.qtyMini, { borderColor: theme.border }]}><Ionicons name="add" size={14} color={theme.text} /></Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={[shop.bottomBar, { backgroundColor: theme.bg, borderColor: theme.border }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: 13 }}>Subtotal · free shipping</RNText>
              <RNText style={{ fontFamily: font.display, color: theme.text, fontSize: 18 }}>₹{total.toLocaleString()}</RNText>
            </View>
            <Pressable onPress={onCheckout} style={[shop.cartBtn, { backgroundColor: theme.accent }]}>
              <RNText style={{ fontFamily: font.body, color: theme.accentText, fontSize: 14, letterSpacing: 1.5 }}>CHECKOUT</RNText>
              <Ionicons name="arrow-forward" size={16} color={theme.accentText} />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

function OrderDone({ theme, font, total, onDone }: { theme: StoreTheme; font: ShopFont; total: number; onDone: () => void }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
      <View style={[shop.doneRing, { backgroundColor: theme.accent }]}>
        <Ionicons name="checkmark" size={36} color={theme.accentText} />
      </View>
      <RNText style={{ fontFamily: font.display, color: theme.text, fontSize: 26, letterSpacing: -0.5 }}>ORDER PLACED</RNText>
      <RNText style={{ fontFamily: font.body, color: theme.sub, fontSize: 14, textAlign: 'center' }}>
        ₹{total.toLocaleString()} · A confirmation is on its way. (Demo checkout.)
      </RNText>
      <Pressable onPress={onDone} style={[shop.cartBtn, { backgroundColor: theme.text, marginTop: 8, paddingHorizontal: 28 }]}>
        <RNText style={{ fontFamily: font.body, color: theme.bg, fontSize: 14, letterSpacing: 1.5 }}>CONTINUE SHOPPING</RNText>
      </Pressable>
    </View>
  );
}

function ShopTopBar({ theme, font, title, cartCount, onBack, onCart }: { theme: StoreTheme; font: ShopFont; title: string; cartCount: number; onBack: () => void; onCart?: () => void }) {
  return (
    <View style={[shop.topBar, { borderColor: theme.border, backgroundColor: theme.bg }]}>
      <Pressable onPress={onBack} hitSlop={8} style={shop.topBtn}><Ionicons name="arrow-back" size={20} color={theme.text} /></Pressable>
      <RNText style={{ fontFamily: font.body, color: theme.text, fontSize: 13, letterSpacing: 1.5 }}>{title.toUpperCase()}</RNText>
      {onCart ? (
        <Pressable onPress={onCart} hitSlop={8} style={shop.topBtn}>
          <Ionicons name="bag-outline" size={20} color={theme.text} />
          {cartCount > 0 && (
            <View style={[shop.topBadge, { backgroundColor: theme.accent }]}>
              <RNText style={{ fontFamily: font.body, color: theme.accentText, fontSize: 9 }}>{cartCount}</RNText>
            </View>
          )}
        </Pressable>
      ) : (
        <View style={shop.topBtn} />
      )}
    </View>
  );
}

const shop = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, height: 52, borderBottomWidth: 1 },
  topBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  topBadge: { position: 'absolute', top: 4, right: 2, minWidth: 16, height: 16, borderRadius: 8, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center' },
  hero: { width: '100%', aspectRatio: 1 },
  label: { fontFamily: 'System', fontSize: 11, letterSpacing: 1.4, marginTop: 18, marginBottom: 8 },
  swatch: { width: 34, height: 34, borderRadius: 17 },
  sizeChip: { minWidth: 44, height: 38, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  qtyBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  qtyMini: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, paddingBottom: 28, borderTopWidth: 1 },
  cartBtn: { height: 52, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  cartRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1 },
  cartThumb: { width: 64, height: 64, borderRadius: 10, overflow: 'hidden' },
  doneRing: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
});

// Default slide when the creator hasn't set any banners yet.
const FALLBACK_BANNER: BannerItem = {
  id: 'fallback',
  imageUri: null,
  headline: 'THE NEW DROP',
  subtext: 'Limited run. Ships worldwide.',
  buttonLabel: 'SHOP NOW',
};

function BannerCarousel({
  banners,
  bannerStyle,
  theme,
  fontDisplay,
  fontBody,
  mini,
}: {
  banners: BannerItem[];
  bannerStyle: StoreBuilder['bannerStyle'];
  theme: StoreTheme;
  fontDisplay: string;
  fontBody: string;
  mini: boolean;
}) {
  const list = banners.length > 0 ? banners : [FALLBACK_BANNER];
  const [idx, setIdx] = useState(0);

  // Auto-advance through the slides.
  useEffect(() => {
    if (list.length < 2) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % list.length);
    }, mini ? 2600 : 3600);
    return () => clearInterval(t);
  }, [list.length, mini]);

  const cur = list[idx % list.length];
  const hasImg = !!cur.imageUri;

  const h = mini ? 96 : 220;
  const pad = mini ? 12 : 24;
  const bg = bannerStyle === 'MINIMAL' ? theme.surface : theme.accent;
  const fg = hasImg ? '#FFFFFF' : bannerStyle === 'MINIMAL' ? theme.text : readableOn(theme.accent);
  const sub = hasImg ? 'rgba(255,255,255,0.92)' : bannerStyle === 'MINIMAL' ? theme.sub : fg;

  return (
    <View style={{ paddingHorizontal: mini ? 12 : 20, paddingTop: mini ? 10 : 18 }}>
      <View style={[styles.banner, { height: h, backgroundColor: bg, borderRadius: mini ? 10 : 18, borderWidth: bannerStyle === 'MINIMAL' && !hasImg ? 1 : 0, borderColor: theme.border, padding: pad, overflow: 'hidden' }]}>
        {/* Uploaded image (overrides style decorations) */}
        {cur.imageUri ? (
          <>
            <Image source={{ uri: cur.imageUri }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
            <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000', opacity: 0.32 }]} />
          </>
        ) : null}
        {!hasImg && bannerStyle === 'GRADIENT' && (
          <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000', opacity: 0.18 }]} />
        )}
        {!hasImg && bannerStyle === 'PATTERN' && (
          <View pointerEvents="none" style={styles.pattern}>
            {Array.from({ length: 24 }).map((_, i) => (
              <View key={i} style={{ width: mini ? 6 : 12, height: mini ? 6 : 12, borderRadius: 999, margin: mini ? 4 : 8, backgroundColor: fg, opacity: 0.18 }} />
            ))}
          </View>
        )}
        {!hasImg && bannerStyle === 'MINIMAL' && (
          <View style={{ width: mini ? 24 : 44, height: 3, backgroundColor: theme.accent, marginBottom: mini ? 6 : 12 }} />
        )}

        <View style={{ marginTop: 'auto' }}>
          <RNText numberOfLines={2} style={{ fontFamily: fontDisplay, color: fg, fontSize: mini ? 18 : 38, lineHeight: mini ? 18 : 38, letterSpacing: -0.6 }}>
            {(cur.headline || 'THE NEW DROP').toUpperCase()}
          </RNText>
          {!!cur.subtext && (
            <RNText numberOfLines={1} style={{ fontFamily: fontBody, color: sub, fontSize: mini ? 9 : 14, marginTop: mini ? 3 : 8, opacity: 0.92 }}>
              {cur.subtext}
            </RNText>
          )}
          <View style={[styles.cta, { backgroundColor: bannerStyle === 'MINIMAL' && !hasImg ? theme.accent : theme.bg, marginTop: mini ? 8 : 16, paddingHorizontal: mini ? 10 : 18, paddingVertical: mini ? 5 : 10, borderRadius: mini ? 6 : 10 }]}>
            <RNText style={{ fontFamily: fontBody, color: bannerStyle === 'MINIMAL' && !hasImg ? theme.accentText : theme.text, fontSize: mini ? 9 : 13, letterSpacing: 1.5 }}>
              {(cur.buttonLabel || 'SHOP NOW').toUpperCase()}
            </RNText>
          </View>
        </View>

        {/* Page dots */}
        {list.length > 1 && (
          <View style={styles.dots}>
            {list.map((s, i) => (
              <View
                key={s.id}
                style={{
                  width: i === idx % list.length ? (mini ? 10 : 16) : mini ? 4 : 6,
                  height: mini ? 4 : 6,
                  borderRadius: 3,
                  backgroundColor: fg,
                  opacity: i === idx % list.length ? 0.95 : 0.4,
                }}
              />
            ))}
          </View>
        )}
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
  onPress,
}: {
  product?: BuilderProduct;
  theme: StoreTheme;
  fontDisplay: string;
  fontBody: string;
  mini: boolean;
  onPress?: () => void;
}) {
  const typeLabel = product ? getProductType(product.type).label : 'PRODUCT';
  const radius = mini ? 8 : 14;

  return (
    <Pressable style={[styles.tile, { width: '48%', marginBottom: mini ? 8 : 14 }]} onPress={onPress} disabled={!onPress}>
      {/* Square art box — aspectRatio:1 keeps it from stretching landscape, and
          the mockup fills it edge-to-edge so no card background shows behind. */}
      <View
        style={[
          styles.tileArt,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            aspectRatio: 1,
            borderRadius: radius,
          },
        ]}
      >
        {product ? (
          product.mockupUrl ? (
            <Image source={{ uri: product.mockupUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
          ) : (
            // Real garment photo + the creator's design composited on it — the
            // storefront shows actual product photos, not vector silhouettes.
            <RealProductMockup
              type={product.type}
              color={product.color}
              artworkUri={product.artworkUri}
              transform={{ x: product.artX ?? 0, y: product.artY ?? 0, scale: product.artScale ?? 1 }}
              view={(product.placement ?? 'FRONT') as any}
              fill
              radius={radius}
            />
          )
        ) : (
          <RNText style={{ fontFamily: fontDisplay, color: theme.sub, fontSize: mini ? 9 : 14, letterSpacing: 0.5, opacity: 0.5 }}>
            ADD
          </RNText>
        )}
      </View>
      <RNText numberOfLines={1} style={{ fontFamily: fontBody, color: theme.text, fontSize: mini ? 9 : 13, marginTop: mini ? 4 : 8 }}>
        {product ? product.name : typeLabel}
      </RNText>
      <RNText style={{ fontFamily: fontDisplay, color: theme.text, fontSize: mini ? 10 : 15, marginTop: 1 }}>
        {product ? `₹${product.price.toLocaleString()}` : '—'}
      </RNText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  mono: { alignItems: 'center', justifyContent: 'center' },
  cartWrap: { width: 30, alignItems: 'flex-end', justifyContent: 'center' },
  cartDot: { position: 'absolute', top: -4, right: -4, alignItems: 'center', justifyContent: 'center' },
  menuRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  search: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderWidth: 1 },
  banner: { justifyContent: 'flex-end' },
  pattern: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', flexWrap: 'wrap', opacity: 0.9 },
  cta: { alignSelf: 'flex-start' },
  dots: { position: 'absolute', top: 10, right: 12, flexDirection: 'row', alignItems: 'center', gap: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  footerLinks: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  tile: {},
  tileArt: { alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});
