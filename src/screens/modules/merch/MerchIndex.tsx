import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { TiltCard } from '@/components/ui/TiltCard';
import { ProductIcon } from '@/components/svg/ProductIcon';
import { Image } from '@/components/ui/Image';
import { Marquee } from '@/components/ui/Marquee';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useStore } from '@/store';
import type {
  StoreHeadingFontKey,
  StoreBodyFontKey,
  StoreAccentKey,
  StoreLayoutKey,
  StoreBackgroundMode,
  StoreSectionType,
} from '@/store';
import { productTypes } from '@/data/mock';

const { width: SCREEN_W } = Dimensions.get('window');

/* =========================================================================
 * Option catalogs (the things the creator can pick from)
 * ======================================================================= */

const COVER_OPTIONS = [
  'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513884923967-4b182ef167ca?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1612831819492-a9a73f9aaf3a?w=900&q=80&auto=format&fit=crop',
];

const LOGO_OPTIONS = [
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=200&q=80&auto=format&fit=crop',
];

const COLOR_BG_OPTIONS = ['#0A0A0A', '#F2EFE6', '#9CA3AF', '#2E5BFF', '#FF6BB5', '#FF5A1F'];

const ACCENTS: { key: StoreAccentKey; label: string; hex: string }[] = [
  { key: 'acid', label: 'GREY', hex: '#9CA3AF' },
  { key: 'electric', label: 'ELECTRIC', hex: '#2E5BFF' },
  { key: 'blush', label: 'BLUSH', hex: '#FF6BB5' },
  { key: 'ember', label: 'EMBER', hex: '#FF5A1F' },
  { key: 'ink', label: 'INK', hex: '#0A0A0A' },
];

const HEADING_FONTS: { key: StoreHeadingFontKey; label: string; family: string }[] = [
  { key: 'archivo-black', label: 'CABINET BLACK', family: fonts.displayBold },
  { key: 'archivo-extrabold', label: 'CABINET X-BOLD', family: fonts.displayHeavy },
  { key: 'archivo-black-italic', label: 'CABINET ITALIC', family: fonts.displayBoldItalic },
  { key: 'anton', label: 'ANTON', family: fonts.display },
  { key: 'instrument-italic', label: 'INSTRUMENT', family: fonts.editorialItalic },
  { key: 'space-bold', label: 'SPACE BOLD', family: fonts.bodyBold },
];

const BODY_FONTS: { key: StoreBodyFontKey; label: string; family: string }[] = [
  { key: 'space-regular', label: 'SPACE GROTESK', family: fonts.body },
  { key: 'space-medium', label: 'SPACE MEDIUM', family: fonts.bodyMedium },
  { key: 'space-bold', label: 'SPACE BOLD', family: fonts.bodyBold },
  { key: 'instrument-regular', label: 'INSTRUMENT', family: fonts.editorial },
];

const LAYOUTS: { key: StoreLayoutKey; label: string; desc: string }[] = [
  { key: 'grid', label: 'GRID', desc: '2-column tile grid · default' },
  { key: 'stack', label: 'STACK', desc: 'Horizontal rows · skimmable' },
  { key: 'mag', label: 'MAG', desc: 'Editorial magazine layout' },
];

const SECTION_META: Record<
  StoreSectionType,
  {
    label: string;
    icon: keyof typeof IconNames;
    sub: string;
  }
> = {
  marquee: { label: 'MARQUEE', icon: 'megaphone-outline', sub: 'Scrolling text strip' },
  hero: { label: 'HERO', icon: 'image-outline', sub: 'Background + title + CTA' },
  featured: { label: 'FEATURED', icon: 'star-outline', sub: 'One large product card' },
  grid: { label: 'GRID', icon: 'grid-outline', sub: 'All products' },
  about: { label: 'ABOUT', icon: 'information-circle-outline', sub: 'About-the-store copy' },
  contact: { label: 'CONTACT', icon: 'mail-outline', sub: 'Email + socials' },
  faq: { label: 'FAQ', icon: 'help-circle-outline', sub: 'Q & A list' },
  shipping: { label: 'SHIPPING', icon: 'cube-outline', sub: 'Shipping info card' },
  footer: { label: 'FOOTER', icon: 'ellipsis-horizontal-outline', sub: 'Logo + copyright' },
};

const IconNames = {
  'megaphone-outline': true,
  'image-outline': true,
  'star-outline': true,
  'grid-outline': true,
  'information-circle-outline': true,
  'mail-outline': true,
  'help-circle-outline': true,
  'cube-outline': true,
  'ellipsis-horizontal-outline': true,
};

type TabKey = 'brand' | 'type' | 'layout' | 'sections' | 'products' | 'pages' | 'domain';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'brand', label: 'BRAND' },
  { key: 'type', label: 'TYPE' },
  { key: 'layout', label: 'LAYOUT' },
  { key: 'sections', label: 'SECTIONS' },
  { key: 'products', label: 'PRODUCTS' },
  { key: 'pages', label: 'PAGES' },
  { key: 'domain', label: 'DOMAIN' },
];

/* =========================================================================
 * Helpers
 * ======================================================================= */

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

function timeAgo(ts: number): string {
  const diff = Math.max(0, Date.now() - ts);
  const s = Math.floor(diff / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/* =========================================================================
 * Screen
 * ======================================================================= */

export default function MerchStudio() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  /* ---------- store reads ---------- */
  const profile = useStore((s) => s.profile);
  const products = useStore((s) => s.products);
  const orders = useStore((s) => s.merchOrders);
  const toast = useStore((s) => s.toast);

  /* customization */
  const sc = useStore((s) => s.storeCustomization);
  const setStoreField = useStore((s) => s.setStoreField);
  const reorderStoreSection = useStore((s) => s.reorderStoreSection);
  const toggleStoreSection = useStore((s) => s.toggleStoreSection);
  const updateStoreSection = useStore((s) => s.updateStoreSection);
  const addCustomCategory = useStore((s) => s.addCustomCategory);
  const removeCustomCategory = useStore((s) => s.removeCustomCategory);
  const resetStoreCustomization = useStore((s) => s.resetStoreCustomization);
  const publishStore = useStore((s) => s.publishStore);
  const toggleProductPublished = useStore((s) => s.toggleProductPublished);
  const updateProduct = useStore((s) => s.updateProduct);
  const removeProduct = useStore((s) => s.removeProduct);
  const confetti = useStore((s) => s.confetti);

  /* ---------- local ui state ---------- */
  const [tab, setTab] = useState<TabKey>('brand');
  const [newCatName, setNewCatName] = useState('');
  const [newCatCost, setNewCatCost] = useState('');
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  /* ---------- derived ---------- */
  const accent = useMemo(
    () => ACCENTS.find((a) => a.key === sc.accent)?.hex ?? palette.acid,
    [sc.accent, palette.acid],
  );
  const accentFg = sc.accent === 'acid' ? staticPalette.ink : staticPalette.bone;

  const headingFamily =
    HEADING_FONTS.find((h) => h.key === sc.headingFont)?.family ?? fonts.displayBold;
  const bodyFamily = BODY_FONTS.find((b) => b.key === sc.bodyFont)?.family ?? fonts.body;

  const revenue = products.reduce((a, p) => a + p.sold * (p.baseCost + p.margin), 0);
  const unitsSold = products.reduce((a, p) => a + p.sold, 0);

  const handle = profile.handle.replace('@', '');
  const siteUrl = `${handle}.underdawg.store`;
  const visibleSections = sc.sections.filter((s) => s.enabled).length;

  /* ---------- actions ---------- */
  const openLive = () => router.push('/(modules)/merch/store');
  const publish = () => {
    publishStore();
    confetti();
    toast('Store published · live in seconds', 'default');
  };

  const addNewCategory = () => {
    const name = newCatName.trim();
    const cost = Number(newCatCost) || 0;
    if (!name) {
      toast('Category name required', 'warn');
      return;
    }
    const key = `custom-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    addCustomCategory({ key, name: name.toUpperCase(), baseCost: cost });
    setNewCatName('');
    setNewCatCost('');
    toast(`Added "${name.toUpperCase()}"`, 'default');
  };

  const addFaqItem = () => {
    const q = newFaqQ.trim();
    const a = newFaqA.trim();
    if (!q || !a) {
      toast('Both question and answer required', 'warn');
      return;
    }
    const faq = sc.sections.find((sx) => sx.type === 'faq');
    if (!faq) return;
    updateStoreSection(faq.id, { items: [...(faq.items || []), { q, a }] });
    setNewFaqQ('');
    setNewFaqA('');
  };

  /* =====================================================================
   *  Tab panels
   * =================================================================== */

  const renderBrand = () => (
    <View style={{ gap: 20 }}>
      <Field label="STORE NAME">
        <TextInput
          style={[styles.input, { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink }]}
          value={sc.storeName}
          onChangeText={(v) => setStoreField('storeName', v)}
          placeholder="YOURNAME.STORE"
          placeholderTextColor={palette.mute}
          autoCapitalize="characters"
          maxFontSizeMultiplier={1.2}
        />
      </Field>

      <Field label="TAGLINE">
        <TextInput
          style={[styles.input, { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink }]}
          value={sc.tagline}
          onChangeText={(v) => setStoreField('tagline', v)}
          placeholder="For the ones still climbing."
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </Field>

      <Field label="ACCENT COLOR">
        <View style={styles.swatchRow}>
          {ACCENTS.map((a) => {
            const active = sc.accent === a.key;
            return (
              <Tap
                scale={1}
                key={a.key}
                onPress={() => setStoreField('accent', a.key)}
                burstColor={a.hex}
                style={[
                  styles.swatch,
                  {
                    backgroundColor: a.hex,
                    borderColor: active ? palette.ink : 'transparent',
                  },
                ]}
              >
                {active ? (
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={a.key === 'acid' ? staticPalette.ink : staticPalette.bone}
                  />
                ) : null}
              </Tap>
            );
          })}
        </View>
      </Field>

      <Field label="LOGO">
        <View style={styles.logoRow}>
          {LOGO_OPTIONS.map((uri) => {
            const active = sc.logo === uri;
            return (
              <Tap
                scale={1}
                key={uri}
                onPress={() => setStoreField('logo', uri)}
                burstColor={accent}
                style={[
                  styles.logoTile,
                  { borderColor: active ? accent : palette.line },
                ]}
              >
                <Image source={{ uri }} style={styles.logoImg} contentFit="cover" />
              </Tap>
            );
          })}
          <Tap
            scale={1}
            onPress={() => toast('Upload from camera roll')}
            burstColor={accent}
            style={[styles.logoUpload, { borderColor: palette.line }]}
          >
            <Ionicons name="cloud-upload-outline" size={20} color={palette.ink} />
            <RNText style={[styles.logoUploadLabel, { color: palette.ink }]}>UPLOAD</RNText>
          </Tap>
        </View>
      </Field>

      <Field label="BACKGROUND MODE">
        <View style={styles.modeRow}>
          {(['image', 'video', 'color'] as StoreBackgroundMode[]).map((m) => {
            const active = sc.backgroundMode === m;
            return (
              <Tap
                scale={1}
                key={m}
                onPress={() => setStoreField('backgroundMode', m)}
                burstColor={accent}
                style={[
                  styles.modeChip,
                  active
                    ? { backgroundColor: palette.ink, borderColor: palette.ink }
                    : { borderColor: palette.line },
                ]}
              >
                <Ionicons
                  name={
                    m === 'image' ? 'image-outline' : m === 'video' ? 'videocam-outline' : 'color-fill-outline'
                  }
                  size={13}
                  color={active ? palette.bone : palette.ink}
                />
                <RNText
                  style={[
                    styles.modeLabel,
                    { color: active ? palette.bone : palette.ink },
                  ]}
                >
                  {m.toUpperCase()}
                </RNText>
              </Tap>
            );
          })}
        </View>
      </Field>

      <Field
        label={
          sc.backgroundMode === 'image'
            ? 'COVER IMAGE'
            : sc.backgroundMode === 'video'
            ? 'COVER VIDEO'
            : 'BACKGROUND COLOR'
        }
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -16 }}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {sc.backgroundMode === 'color'
            ? COLOR_BG_OPTIONS.map((c) => {
                const active = sc.backgroundValue === c;
                return (
                  <Tap
                    scale={1}
                    key={c}
                    onPress={() => setStoreField('backgroundValue', c)}
                    burstColor={accent}
                    style={[
                      styles.coverColor,
                      {
                        backgroundColor: c,
                        borderColor: active ? accent : palette.line,
                      },
                    ]}
                  >
                    {active ? (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={c === '#0A0A0A' ? staticPalette.bone : staticPalette.ink}
                      />
                    ) : null}
                  </Tap>
                );
              })
            : sc.backgroundMode === 'video'
            ? (
                <Tap
                  scale={1}
                  onPress={() => toast('Upload video — coming soon')}
                  burstColor={accent}
                  style={[styles.coverTile, { borderColor: palette.line }]}
                >
                  <Ionicons name="cloud-upload-outline" size={22} color={palette.ink} />
                  <RNText style={[styles.coverUploadLabel, { color: palette.ink }]}>UPLOAD VIDEO</RNText>
                </Tap>
              )
            : COVER_OPTIONS.map((uri) => {
                const active = sc.backgroundValue === uri;
                return (
                  <Tap
                    scale={1}
                    key={uri}
                    onPress={() => setStoreField('backgroundValue', uri)}
                    burstColor={accent}
                    style={[
                      styles.coverTile,
                      { borderColor: active ? accent : palette.line },
                    ]}
                  >
                    <Image source={{ uri }} style={styles.coverImg} contentFit="cover" />
                  </Tap>
                );
              })}
        </ScrollView>
      </Field>
    </View>
  );

  const renderType = () => (
    <View style={{ gap: 20 }}>
      <Field label="HEADING FONT">
        <View style={styles.fontGrid}>
          {HEADING_FONTS.map((h) => {
            const active = sc.headingFont === h.key;
            return (
              <Tap
                scale={1}
                key={h.key}
                onPress={() => setStoreField('headingFont', h.key)}
                burstColor={accent}
                style={[
                  styles.fontTile,
                  {
                    borderColor: active ? accent : palette.line,
                    backgroundColor: active ? palette.ink : palette.paper,
                  },
                ]}
              >
                <RNText
                  style={[
                    styles.fontSample,
                    {
                      fontFamily: h.family,
                      color: active ? palette.bone : palette.ink,
                    },
                  ]}
                >
                  Ag
                </RNText>
                <RNText
                  style={[
                    styles.fontLabel,
                    { color: active ? accent : palette.ink, opacity: active ? 1 : 0.6 },
                  ]}
                  numberOfLines={1}
                >
                  {h.label}
                </RNText>
              </Tap>
            );
          })}
        </View>
      </Field>

      <Field label="BODY FONT">
        <View style={styles.fontGrid}>
          {BODY_FONTS.map((b) => {
            const active = sc.bodyFont === b.key;
            return (
              <Tap
                scale={1}
                key={b.key}
                onPress={() => setStoreField('bodyFont', b.key)}
                burstColor={accent}
                style={[
                  styles.fontTile,
                  {
                    borderColor: active ? accent : palette.line,
                    backgroundColor: active ? palette.ink : palette.paper,
                  },
                ]}
              >
                <RNText
                  style={[
                    styles.fontSample,
                    {
                      fontFamily: b.family,
                      fontSize: 30,
                      color: active ? palette.bone : palette.ink,
                    },
                  ]}
                >
                  Aa
                </RNText>
                <RNText
                  style={[
                    styles.fontLabel,
                    { color: active ? accent : palette.ink, opacity: active ? 1 : 0.6 },
                  ]}
                  numberOfLines={1}
                >
                  {b.label}
                </RNText>
              </Tap>
            );
          })}
        </View>
      </Field>

      <View style={[styles.typePreview, { borderColor: palette.line }]}>
        <RNText style={[styles.typePreviewKicker, { color: accent }]}>PREVIEW</RNText>
        <RNText
          style={{
            fontFamily: headingFamily,
            fontSize: 42,
            lineHeight: 42,
            letterSpacing: -1.6,
            color: palette.ink,
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          {sc.storeName}
        </RNText>
        <RNText
          style={{
            fontFamily: bodyFamily,
            fontSize: 15,
            lineHeight: 22,
            color: palette.ink,
            opacity: 0.7,
            marginTop: 8,
          }}
        >
          {sc.tagline}
        </RNText>
      </View>
    </View>
  );

  const renderLayout = () => (
    <View style={{ gap: 16 }}>
      {LAYOUTS.map((l) => {
        const active = sc.layout === l.key;
        return (
          <Tap
            scale={1}
            key={l.key}
            onPress={() => setStoreField('layout', l.key)}
            burstColor={accent}
            style={[
              styles.layoutCard,
              {
                borderColor: active ? accent : palette.line,
                backgroundColor: active ? palette.ink : palette.paper,
              },
            ]}
          >
            <View style={[styles.layoutDiagram, { backgroundColor: active ? '#1a1a1a' : palette.bone }]}>
              {l.key === 'grid' ? (
                <View style={styles.diagramGrid}>
                  <View style={[styles.diagramTile, { backgroundColor: accent }]} />
                  <View style={[styles.diagramTile, { backgroundColor: accent, opacity: 0.6 }]} />
                  <View style={[styles.diagramTile, { backgroundColor: accent, opacity: 0.6 }]} />
                  <View style={[styles.diagramTile, { backgroundColor: accent, opacity: 0.4 }]} />
                </View>
              ) : l.key === 'stack' ? (
                <View style={{ gap: 4, padding: 8 }}>
                  {[1, 0.7, 0.5, 0.3].map((o, i) => (
                    <View
                      key={i}
                      style={{ height: 12, backgroundColor: accent, opacity: o, borderRadius: 2 }}
                    />
                  ))}
                </View>
              ) : (
                <View style={{ padding: 8, gap: 4 }}>
                  <View style={{ height: 28, backgroundColor: accent, borderRadius: 3 }} />
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <View style={{ flex: 1, height: 18, backgroundColor: accent, opacity: 0.6, borderRadius: 3 }} />
                    <View style={{ flex: 1, height: 18, backgroundColor: accent, opacity: 0.4, borderRadius: 3 }} />
                  </View>
                </View>
              )}
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <RNText
                style={[
                  styles.layoutLabel,
                  { color: active ? palette.bone : palette.ink },
                ]}
              >
                {l.label}
              </RNText>
              <RNText
                style={[
                  styles.layoutDesc,
                  { color: active ? palette.bone : palette.ink, opacity: 0.7 },
                ]}
                numberOfLines={2}
              >
                {l.desc}
              </RNText>
            </View>
            {active ? <Ionicons name="checkmark-circle" size={20} color={accent} /> : null}
          </Tap>
        );
      })}
    </View>
  );

  const renderSections = () => (
    <View>
      <RNText style={[styles.helperText, { color: palette.ink }]}>
        Reorder sections with the arrows. Toggle visibility with the eye. {visibleSections} of {sc.sections.length}{' '}
        live.
      </RNText>

      <View style={styles.sectionList}>
        {sc.sections.map((sx, i) => {
          const meta = SECTION_META[sx.type];
          const first = i === 0;
          const last = i === sc.sections.length - 1;
          return (
            <View
              key={sx.id}
              style={[
                styles.sectionRow,
                { borderColor: palette.line, opacity: sx.enabled ? 1 : 0.45 },
              ]}
            >
              <RNText style={[styles.sectionNum, { color: palette.ink }]}>
                {String(i + 1).padStart(2, '0')}
              </RNText>
              <View style={styles.sectionIcon}>
                <Ionicons name={meta.icon as any} size={16} color={palette.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={[styles.sectionLabel, { color: palette.ink }]} numberOfLines={1}>
                  {meta.label}
                </RNText>
                <RNText
                  style={[styles.sectionSub, { color: palette.ink, opacity: 0.55 }]}
                  numberOfLines={1}
                >
                  {sx.enabled ? '· VISIBLE' : '· HIDDEN'} {meta.sub}
                </RNText>
              </View>
              <Tap
                scale={1}
                onPress={() => !first && reorderStoreSection(sx.id, 'up')}
                burstColor={accent}
                style={[
                  styles.sectionBtn,
                  { borderColor: palette.line, opacity: first ? 0.2 : 1 },
                ]}
              >
                <Ionicons name="chevron-up" size={14} color={palette.ink} />
              </Tap>
              <Tap
                scale={1}
                onPress={() => !last && reorderStoreSection(sx.id, 'down')}
                burstColor={accent}
                style={[
                  styles.sectionBtn,
                  { borderColor: palette.line, opacity: last ? 0.2 : 1 },
                ]}
              >
                <Ionicons name="chevron-down" size={14} color={palette.ink} />
              </Tap>
              <Tap
                scale={1}
                onPress={() => toggleStoreSection(sx.id)}
                burstColor={accent}
                style={[
                  styles.sectionBtn,
                  {
                    borderColor: palette.line,
                    backgroundColor: sx.enabled ? accent : 'transparent',
                  },
                ]}
              >
                <Ionicons
                  name={sx.enabled ? 'eye-outline' : 'eye-off-outline'}
                  size={14}
                  color={sx.enabled ? accentFg : palette.ink}
                />
              </Tap>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderProducts = () => {
    const featuredSection = sc.sections.find((sx) => sx.type === 'featured');
    const featuredId = featuredSection?.featuredProductId || products[0]?.id;
    return (
      <View style={{ gap: 18 }}>
        <Field label={`YOUR PRODUCTS (${products.length})`}>
          {products.length === 0 ? (
            <RNText style={[styles.helperText, { color: palette.ink, opacity: 0.5 }]}>
              No products yet. Tap CREATE NEW PRODUCT below to add your first.
            </RNText>
          ) : (
            <View style={{ gap: 10 }}>
              {products.map((p) => (
                <ProductEditor
                  key={p.id}
                  product={p}
                  isFeatured={p.id === featuredId}
                  accent={accent}
                  accentFg={accentFg}
                  palette={palette}
                  styles={styles}
                  onTogglePublished={() => toggleProductPublished(p.id)}
                  onMarginChange={(v) => updateProduct(p.id, { margin: v })}
                  onCostChange={(v) => updateProduct(p.id, { baseCost: v })}
                  onSetFeatured={() => {
                    if (featuredSection) {
                      updateStoreSection(featuredSection.id, { featuredProductId: p.id });
                      toast(`Featured: ${p.name}`, 'default');
                    }
                  }}
                  onRemove={() => {
                    removeProduct(p.id);
                    toast(`Removed "${p.name}"`, 'default');
                  }}
                />
              ))}
            </View>
          )}
        </Field>

        <Tap
          scale={1}
          onPress={() => router.push('/(modules)/merch/create')}
          burstColor={accent}
          style={[styles.bigLink, { borderColor: accent, backgroundColor: accent + '10' }]}
        >
          <Ionicons name="add-circle-outline" size={18} color={accent} />
          <RNText style={[styles.bigLinkLabel, { color: palette.ink }]}>CREATE NEW PRODUCT</RNText>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </Tap>

        <Field label="DEFAULT CATEGORIES">
          <View style={styles.catGrid}>
            {productTypes.map((t) => (
              <View key={t.key} style={[styles.catChip, { borderColor: palette.line }]}>
                <RNText style={[styles.catLabel, { color: palette.ink }]}>{t.name}</RNText>
                <RNText style={[styles.catCost, { color: palette.ink, opacity: 0.55 }]}>
                  ₹{t.baseCost}
                </RNText>
              </View>
            ))}
          </View>
        </Field>

        <Field
          label={`YOUR CATEGORIES (${sc.customCategories.length})`}
        >
          {sc.customCategories.length === 0 ? (
            <RNText style={[styles.helperText, { color: palette.ink, opacity: 0.5 }]}>
              None yet. Add anything you sell — vinyl, candles, prints, zines, plushies, jewelry, anything.
            </RNText>
          ) : (
            <View style={styles.catGrid}>
              {sc.customCategories.map((c) => (
                <View
                  key={c.key}
                  style={[
                    styles.catChip,
                    { borderColor: accent, backgroundColor: accent + '18' },
                  ]}
                >
                  <RNText style={[styles.catLabel, { color: palette.ink }]}>{c.name}</RNText>
                  <RNText style={[styles.catCost, { color: palette.ink, opacity: 0.7 }]}>
                    ₹{c.baseCost}
                  </RNText>
                  <Tap
                    scale={1}
                    onPress={() => removeCustomCategory(c.key)}
                    burstColor={palette.ember}
                    style={styles.catRemove}
                  >
                    <Ionicons name="close" size={11} color={palette.ink} />
                  </Tap>
                </View>
              ))}
            </View>
          )}
        </Field>

        <Field label="ADD CATEGORY">
          <View style={styles.catAddRow}>
            <TextInput
              style={[
                styles.input,
                styles.catAddName,
                { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
              ]}
              value={newCatName}
              onChangeText={setNewCatName}
              placeholder="CATEGORY"
              placeholderTextColor={palette.mute}
              maxFontSizeMultiplier={1.2}
              autoCapitalize="characters"
            />
            <TextInput
              style={[
                styles.input,
                styles.catAddCost,
                { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
              ]}
              value={newCatCost}
              onChangeText={setNewCatCost}
              placeholder="₹ COST"
              placeholderTextColor={palette.mute}
              keyboardType="numeric"
              maxFontSizeMultiplier={1.2}
            />
            <Tap
              scale={1}
              onPress={addNewCategory}
              burstColor={accent}
              style={[styles.catAddBtn, { backgroundColor: palette.ink }]}
            >
              <Ionicons name="add" size={20} color={palette.bone} />
            </Tap>
          </View>
        </Field>
      </View>
    );
  };

  const renderPages = () => {
    const marquee = sc.sections.find((sx) => sx.type === 'marquee');
    const hero = sc.sections.find((sx) => sx.type === 'hero');
    const featured = sc.sections.find((sx) => sx.type === 'featured');
    const grid = sc.sections.find((sx) => sx.type === 'grid');
    const about = sc.sections.find((sx) => sx.type === 'about');
    const shipping = sc.sections.find((sx) => sx.type === 'shipping');
    const contact = sc.sections.find((sx) => sx.type === 'contact');
    const faq = sc.sections.find((sx) => sx.type === 'faq');
    const footer = sc.sections.find((sx) => sx.type === 'footer');

    return (
      <View style={{ gap: 18 }}>
        {/* ===================== MARQUEE ===================== */}
        {marquee ? (
          <SectionEditor
            title="MARQUEE"
            sub="Scrolling text strip at the top of the store"
            section={marquee}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(marquee.id)}
          >
            <View style={{ gap: 8 }}>
              {(marquee.marqueeItems || []).map((item, i) => (
                <View key={`mq-${i}`} style={styles.listEditRow}>
                  <TextInput
                    style={[
                      styles.input,
                      { flex: 1, borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                    ]}
                    value={item}
                    onChangeText={(v) => {
                      const next = [...(marquee.marqueeItems || [])];
                      next[i] = v;
                      updateStoreSection(marquee.id, { marqueeItems: next });
                    }}
                    placeholder="Marquee text"
                    placeholderTextColor={palette.mute}
                    autoCapitalize="characters"
                  />
                  <Tap
                    scale={1}
                    onPress={() =>
                      updateStoreSection(marquee.id, {
                        marqueeItems: (marquee.marqueeItems || []).filter((_, idx) => idx !== i),
                      })
                    }
                    burstColor={palette.ember}
                    style={[styles.faqRemove, { borderColor: palette.line }]}
                  >
                    <Ionicons name="trash-outline" size={13} color={palette.ink} />
                  </Tap>
                </View>
              ))}
              <Tap
                scale={1}
                onPress={() =>
                  updateStoreSection(marquee.id, {
                    marqueeItems: [...(marquee.marqueeItems || []), 'NEW ITEM'],
                  })
                }
                burstColor={accent}
                style={[
                  styles.addRowBtn,
                  { borderColor: accent, backgroundColor: accent + '12' },
                ]}
              >
                <Ionicons name="add" size={14} color={palette.ink} />
                <RNText style={[styles.addRowLabel, { color: palette.ink }]}>ADD MARQUEE ITEM</RNText>
              </Tap>
            </View>
          </SectionEditor>
        ) : null}

        {/* ===================== HERO ===================== */}
        {hero ? (
          <SectionEditor
            title="HERO"
            sub="Background, title, tagline, CTA button"
            section={hero}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(hero.id)}
          >
            <View style={{ gap: 12 }}>
              <Field label="EYEBROW">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={hero.eyebrow || ''}
                  onChangeText={(v) => updateStoreSection(hero.id, { eyebrow: v })}
                  placeholder="STOREFRONT"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label="TITLE (BLANK = STORE NAME)">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={hero.title || ''}
                  onChangeText={(v) => updateStoreSection(hero.id, { title: v })}
                  placeholder={sc.storeName}
                  placeholderTextColor={palette.mute}
                />
              </Field>
              <Field label="TAGLINE (BLANK = STORE TAGLINE)">
                <TextInput
                  style={[
                    styles.textarea,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={hero.body || ''}
                  onChangeText={(v) => updateStoreSection(hero.id, { body: v })}
                  multiline
                  placeholder={sc.tagline}
                  placeholderTextColor={palette.mute}
                />
              </Field>
              <Field label="CTA BUTTON LABEL">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={hero.ctaLabel || ''}
                  onChangeText={(v) => updateStoreSection(hero.id, { ctaLabel: v })}
                  placeholder="SHOP THE DROP"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
            </View>
          </SectionEditor>
        ) : null}

        {/* ===================== FEATURED ===================== */}
        {featured ? (
          <SectionEditor
            title="FEATURED"
            sub="One product spotlit at the top of the grid"
            section={featured}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(featured.id)}
          >
            <View style={{ gap: 12 }}>
              <Field label="EYEBROW">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={featured.eyebrow || ''}
                  onChangeText={(v) => updateStoreSection(featured.id, { eyebrow: v })}
                  placeholder="FEATURED"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label="LABEL">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={featured.featuredLabel || ''}
                  onChangeText={(v) => updateStoreSection(featured.id, { featuredLabel: v })}
                  placeholder="NEW · LIMITED"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label="PICK PRODUCT">
                {products.length === 0 ? (
                  <RNText style={[styles.helperText, { color: palette.ink, opacity: 0.5 }]}>
                    No products yet. Add one in the PRODUCTS tab.
                  </RNText>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginHorizontal: -16 }}
                    contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
                  >
                    {products.map((p) => {
                      const active = (featured.featuredProductId || products[0]?.id) === p.id;
                      return (
                        <Tap
                          scale={1}
                          key={p.id}
                          onPress={() =>
                            updateStoreSection(featured.id, { featuredProductId: p.id })
                          }
                          burstColor={accent}
                          style={[
                            styles.featuredPickTile,
                            {
                              backgroundColor: p.bg,
                              borderColor: active ? accent : palette.line,
                              borderWidth: active ? 2 : 1,
                            },
                          ]}
                        >
                          <ProductIcon type={p.type} size={36} color={p.fg} />
                          <RNText
                            style={[styles.featuredPickName, { color: p.fg }]}
                            numberOfLines={1}
                          >
                            {p.name}
                          </RNText>
                          <RNText
                            style={[styles.featuredPickPrice, { color: p.fg, opacity: 0.75 }]}
                          >
                            ₹{p.baseCost + p.margin}
                          </RNText>
                        </Tap>
                      );
                    })}
                  </ScrollView>
                )}
              </Field>
            </View>
          </SectionEditor>
        ) : null}

        {/* ===================== GRID ===================== */}
        {grid ? (
          <SectionEditor
            title="GRID"
            sub="The full product collection layout"
            section={grid}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(grid.id)}
          >
            <Field label="HEADING">
              <TextInput
                style={[
                  styles.input,
                  { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                ]}
                value={grid.title || ''}
                onChangeText={(v) => updateStoreSection(grid.id, { title: v })}
                placeholder="ALL PRODUCTS"
                placeholderTextColor={palette.mute}
                autoCapitalize="characters"
              />
            </Field>
            <RNText style={[styles.helperText, { color: palette.ink, opacity: 0.55, marginTop: 6 }]}>
              Tip: change the layout (grid / stack / mag) in the LAYOUT tab.
            </RNText>
          </SectionEditor>
        ) : null}

        {/* ===================== ABOUT ===================== */}
        {about ? (
          <SectionEditor
            title="ABOUT"
            sub="The story behind the store"
            section={about}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(about.id)}
          >
            <View style={{ gap: 12 }}>
              <Field label="HEADING">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={about.title || ''}
                  onChangeText={(v) => updateStoreSection(about.id, { title: v })}
                  placeholder="ABOUT THE STORE"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label="BODY">
                <TextInput
                  style={[
                    styles.textarea,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={about.body || ''}
                  onChangeText={(v) => updateStoreSection(about.id, { body: v })}
                  multiline
                  placeholder="Tell your customers about the store…"
                  placeholderTextColor={palette.mute}
                />
              </Field>
            </View>
          </SectionEditor>
        ) : null}

        {/* ===================== SHIPPING ===================== */}
        {shipping ? (
          <SectionEditor
            title="SHIPPING"
            sub="Times, returns, regions"
            section={shipping}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(shipping.id)}
          >
            <View style={{ gap: 12 }}>
              <Field label="HEADING">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={shipping.title || ''}
                  onChangeText={(v) => updateStoreSection(shipping.id, { title: v })}
                  placeholder="SHIPPING"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label="BODY">
                <TextInput
                  style={[
                    styles.textarea,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={shipping.body || ''}
                  onChangeText={(v) => updateStoreSection(shipping.id, { body: v })}
                  multiline
                  placeholder="Shipping times, returns, regions…"
                  placeholderTextColor={palette.mute}
                />
              </Field>
            </View>
          </SectionEditor>
        ) : null}

        {/* ===================== FAQ ===================== */}
        {faq ? (
          <SectionEditor
            title="FAQ"
            sub="Common questions"
            section={faq}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(faq.id)}
          >
            <View style={{ gap: 12 }}>
              <Field label="HEADING">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={faq.title || ''}
                  onChangeText={(v) => updateStoreSection(faq.id, { title: v })}
                  placeholder="FAQ"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label={`ENTRIES (${(faq.items || []).length})`}>
                <View style={{ gap: 8 }}>
                  {(faq.items || []).map((it, i) => (
                    <View key={`faq-${i}`} style={[styles.faqItem, { borderColor: palette.line }]}>
                      <View style={{ flex: 1, gap: 6 }}>
                        <TextInput
                          style={[
                            styles.faqInput,
                            { color: palette.ink, fontFamily: fonts.displayBold },
                          ]}
                          value={it.q}
                          onChangeText={(v) => {
                            const next = [...(faq.items || [])];
                            next[i] = { ...next[i], q: v };
                            updateStoreSection(faq.id, { items: next });
                          }}
                          placeholder="QUESTION"
                          placeholderTextColor={palette.mute}
                          autoCapitalize="characters"
                        />
                        <TextInput
                          style={[
                            styles.faqInput,
                            { color: palette.ink, fontFamily: fonts.body },
                          ]}
                          value={it.a}
                          onChangeText={(v) => {
                            const next = [...(faq.items || [])];
                            next[i] = { ...next[i], a: v };
                            updateStoreSection(faq.id, { items: next });
                          }}
                          placeholder="Answer"
                          placeholderTextColor={palette.mute}
                          multiline
                        />
                      </View>
                      <Tap
                        scale={1}
                        onPress={() =>
                          updateStoreSection(faq.id, {
                            items: (faq.items || []).filter((_, idx) => idx !== i),
                          })
                        }
                        burstColor={palette.ember}
                        style={[styles.faqRemove, { borderColor: palette.line }]}
                      >
                        <Ionicons name="trash-outline" size={13} color={palette.ink} />
                      </Tap>
                    </View>
                  ))}

                  <View style={[styles.faqAddCard, { borderColor: palette.line }]}>
                    <TextInput
                      style={[styles.faqInput, { color: palette.ink, fontFamily: fonts.displayBold }]}
                      value={newFaqQ}
                      onChangeText={setNewFaqQ}
                      placeholder="QUESTION"
                      placeholderTextColor={palette.mute}
                      autoCapitalize="characters"
                    />
                    <TextInput
                      style={[
                        styles.faqInput,
                        { color: palette.ink, fontFamily: fonts.body, marginTop: 6 },
                      ]}
                      value={newFaqA}
                      onChangeText={setNewFaqA}
                      placeholder="Answer"
                      placeholderTextColor={palette.mute}
                      multiline
                    />
                    <Tap
                      scale={1}
                      onPress={addFaqItem}
                      burstColor={accent}
                      style={[
                        styles.faqAdd,
                        { backgroundColor: palette.ink, borderColor: palette.ink },
                      ]}
                    >
                      <Ionicons name="add" size={14} color={palette.bone} />
                      <RNText style={[styles.faqAddLabel, { color: palette.bone }]}>ADD Q & A</RNText>
                    </Tap>
                  </View>
                </View>
              </Field>
            </View>
          </SectionEditor>
        ) : null}

        {/* ===================== CONTACT ===================== */}
        {contact ? (
          <SectionEditor
            title="CONTACT"
            sub="Email and social handles"
            section={contact}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(contact.id)}
          >
            <View style={{ gap: 12 }}>
              <Field label="HEADING">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={contact.title || ''}
                  onChangeText={(v) => updateStoreSection(contact.id, { title: v })}
                  placeholder="GET IN TOUCH"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label="EMAIL">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={contact.email || ''}
                  onChangeText={(v) => updateStoreSection(contact.id, { email: v })}
                  placeholder="hi@yourstore.com"
                  placeholderTextColor={palette.mute}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Field>
              <Field label="INSTAGRAM HANDLE">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={contact.instagram || ''}
                  onChangeText={(v) => updateStoreSection(contact.id, { instagram: v })}
                  placeholder="yourname"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="none"
                />
              </Field>
              <Field label="TWITTER / X HANDLE">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={contact.twitter || ''}
                  onChangeText={(v) => updateStoreSection(contact.id, { twitter: v })}
                  placeholder="yourname"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="none"
                />
              </Field>
              <Field label="WHATSAPP (+COUNTRY CODE)">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={contact.whatsapp || ''}
                  onChangeText={(v) => updateStoreSection(contact.id, { whatsapp: v })}
                  placeholder="+91 98765 43210"
                  placeholderTextColor={palette.mute}
                  keyboardType="phone-pad"
                />
              </Field>
            </View>
          </SectionEditor>
        ) : null}

        {/* ===================== FOOTER ===================== */}
        {footer ? (
          <SectionEditor
            title="FOOTER"
            sub="Bottom signature line"
            section={footer}
            accent={accent}
            accentFg={accentFg}
            palette={palette}
            styles={styles}
            onToggle={() => toggleStoreSection(footer.id)}
          >
            <View style={{ gap: 12 }}>
              <Field label="TAGLINE">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={footer.footerTagline || ''}
                  onChangeText={(v) => updateStoreSection(footer.id, { footerTagline: v })}
                  placeholder="POWERED BY UNDERDAWG · MMXXVI"
                  placeholderTextColor={palette.mute}
                  autoCapitalize="characters"
                />
              </Field>
              <Field label="COPYRIGHT">
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
                  ]}
                  value={footer.copyright || ''}
                  onChangeText={(v) => updateStoreSection(footer.id, { copyright: v })}
                  placeholder={`© ${sc.storeName.toLowerCase()}`}
                  placeholderTextColor={palette.mute}
                />
              </Field>
            </View>
          </SectionEditor>
        ) : null}
      </View>
    );
  };

  const renderDomain = () => (
    <View style={{ gap: 14 }}>
      <View style={[styles.domainCard, { borderColor: palette.line, backgroundColor: palette.paper }]}>
        <View style={{ flex: 1 }}>
          <RNText style={[styles.domainLabel, { color: palette.ink }]}>SITE URL</RNText>
          <RNText style={[styles.domainValue, { color: palette.ink }]}>
            {siteUrl}
          </RNText>
          <RNText style={[styles.domainSub, { color: palette.ink, opacity: 0.55 }]}>
            FREE · UNDERDAWG-HOSTED
          </RNText>
        </View>
        <Tap
          scale={1}
          onPress={() => {
            setStoreField('siteEnabled', !sc.siteEnabled);
            toast(sc.siteEnabled ? 'Standalone site off' : 'Standalone site on', 'default');
          }}
          burstColor={accent}
          style={[
            styles.domainToggle,
            {
              backgroundColor: sc.siteEnabled ? accent : 'transparent',
              borderColor: sc.siteEnabled ? accent : palette.line,
            },
          ]}
        >
          <RNText
            style={[
              styles.domainToggleLabel,
              { color: sc.siteEnabled ? accentFg : palette.ink },
            ]}
          >
            {sc.siteEnabled ? 'ON' : 'OFF'}
          </RNText>
        </Tap>
      </View>

      <DomainRow
        icon="link-outline"
        title="Custom domain"
        sub="Connect your own URL · free SSL"
        onPress={() => toast('Custom domain — coming soon')}
        palette={palette}
      />
      <DomainRow
        icon="cart-outline"
        title="Orders"
        sub={`${orders.length} lifetime · ${orders.filter((o) => o.status === 'PRINTING').length} in production`}
        onPress={() => router.push('/(modules)/merch/orders')}
        palette={palette}
      />
      <DomainRow
        icon="sparkles-outline"
        title="Create with AI"
        sub="Upload art · generate product mockups"
        onPress={() => router.push('/(modules)/merch/mockup')}
        palette={palette}
      />
      <DomainRow
        icon="bar-chart-outline"
        title="Merch analytics"
        sub="Sales, units sold, top products"
        onPress={() => router.push('/(modules)/merch/analytics')}
        palette={palette}
      />
      <DomainRow
        icon="color-palette-outline"
        title="Hire a designer"
        sub="Pro mockups · quotes from vetted designers"
        onPress={() => router.push('/(modules)/merch/designers')}
        palette={palette}
      />
      <DomainRow
        icon="airplane-outline"
        title="Shipping + tax"
        sub="Zones, rates, duties handled for you"
        onPress={() => toast('Shipping zones — coming soon')}
        palette={palette}
      />
      <DomainRow
        icon="wallet-outline"
        title="Payouts"
        sub="Weekly · auto to your bank"
        onPress={() => toast('Payouts — coming soon')}
        palette={palette}
      />
      <DomainRow
        icon="refresh-outline"
        title="Reset to defaults"
        sub="Restore the starter design"
        onPress={() => {
          resetStoreCustomization();
          toast('Store reset to defaults', 'default');
        }}
        palette={palette}
        danger
      />
    </View>
  );

  /* =====================================================================
   *  Composite
   * =================================================================== */

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          eyebrow="MERCH STUDIO"
          title="DESIGN YOUR STORE"
          right={
            <Tap
              scale={1}
              style={[styles.viewLiveBtn, { borderColor: accent, backgroundColor: accent }]}
              onPress={openLive}
              burstColor={accent}
            >
              <Ionicons name="eye-outline" size={14} color={accentFg} />
              <RNText style={[styles.viewLiveLabel, { color: accentFg }]}>LIVE</RNText>
            </Tap>
          }
        />
      }
      padding={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {/* =================================================================
         *  LIVE PREVIEW (anchored top, reflects every customization)
         * =============================================================== */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <Tap scale={1} onPress={openLive} burstColor={accent}>
            <TiltCard style={styles.previewWrap} maxTilt={2}>
              {sc.backgroundMode === 'image' ? (
                <Image
                  source={{ uri: sc.backgroundValue }}
                  style={StyleSheet.absoluteFill as any}
                  contentFit="cover"
                />
              ) : sc.backgroundMode === 'color' ? (
                <View style={[StyleSheet.absoluteFill, { backgroundColor: sc.backgroundValue }]} />
              ) : (
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      backgroundColor: staticPalette.ink,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <Ionicons name="play-circle" size={42} color={staticPalette.bone} />
                </View>
              )}
              <View style={styles.previewScrim} />

              <View style={styles.previewTop}>
                <View style={[styles.previewDot, { backgroundColor: accent }]} />
                <RNText style={styles.previewLiveTxt} numberOfLines={1}>
                  LIVE · {products.filter((p) => p.published).length} PRODUCTS · {visibleSections} SECTIONS
                </RNText>
                <View style={{ flex: 1 }} />
                <RNText style={styles.previewUrl} numberOfLines={1}>
                  {siteUrl}
                </RNText>
              </View>

              <View style={styles.previewBottom}>
                <View style={styles.previewBrand}>
                  {sc.logo ? (
                    <View style={[styles.previewLogo, { borderColor: accent }]}>
                      <Image source={{ uri: sc.logo }} style={styles.previewLogoImg} contentFit="cover" />
                    </View>
                  ) : null}
                  <View style={{ flex: 1 }}>
                    <RNText
                      style={[
                        styles.previewTitle,
                        { fontFamily: headingFamily, color: staticPalette.bone },
                      ]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.55}
                    >
                      {sc.storeName}
                    </RNText>
                    <RNText
                      style={[
                        styles.previewTag,
                        { fontFamily: bodyFamily, color: accent },
                      ]}
                      numberOfLines={1}
                    >
                      {sc.tagline}
                    </RNText>
                  </View>
                </View>

                <View style={styles.previewMini}>
                  {products.slice(0, 3).map((p, i) => (
                    <View
                      key={p.id}
                      style={[
                        styles.previewTile,
                        {
                          backgroundColor: p.bg,
                          flex: sc.layout === 'mag' && i === 0 ? 2 : 1,
                          height: sc.layout === 'stack' ? 38 : 54,
                        },
                      ]}
                    >
                      <ProductIcon type={p.type} size={sc.layout === 'mag' && i === 0 ? 28 : 22} color={p.fg} />
                    </View>
                  ))}
                </View>
              </View>
            </TiltCard>
          </Tap>

          <View style={styles.previewFootRow}>
            <View style={[styles.previewFootDot, { backgroundColor: accent }]} />
            <RNText style={[styles.previewFootText, { color: palette.ink }]}>
              TAP PREVIEW · OPEN LIVE STORE
            </RNText>
            <View style={[styles.previewFootDot, { backgroundColor: accent }]} />
          </View>

          {/* Inline metrics strip */}
          <View style={[styles.metrics, { borderColor: palette.line }]}>
            <Metric label="REVENUE" value={`₹${compact(revenue)}`} accent={accent} palette={palette} />
            <View style={[styles.metricDivider, { backgroundColor: palette.line }]} />
            <Metric label="UNITS" value={compact(unitsSold)} accent={palette.blush} palette={palette} />
            <View style={[styles.metricDivider, { backgroundColor: palette.line }]} />
            <Metric
              label="ORDERS"
              value={String(orders.length)}
              accent={palette.electric}
              palette={palette}
            />
            <View style={[styles.metricDivider, { backgroundColor: palette.line }]} />
            <Metric
              label="PRODUCTS"
              value={String(products.length)}
              accent={palette.ember}
              palette={palette}
            />
          </View>
        </View>

        {/* =================================================================
         *  TAB STRIP
         * =============================================================== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBarWrap}
          contentContainerStyle={styles.tabBar}
        >
          {TABS.map((tb) => {
            const active = tab === tb.key;
            return (
              <Tap
                scale={1}
                key={tb.key}
                onPress={() => setTab(tb.key)}
                burstColor={accent}
                style={[
                  styles.tabPill,
                  active
                    ? { backgroundColor: palette.ink, borderColor: palette.ink }
                    : { borderColor: palette.line },
                ]}
              >
                <RNText
                  style={[
                    styles.tabLabel,
                    { color: active ? palette.bone : palette.ink },
                  ]}
                  numberOfLines={1}
                >
                  {tb.label}
                </RNText>
                {active ? (
                  <View
                    style={[styles.tabActiveDot, { backgroundColor: accent }]}
                  />
                ) : null}
              </Tap>
            );
          })}
        </ScrollView>

        {/* =================================================================
         *  ACTIVE PANEL
         * =============================================================== */}
        <View style={styles.panelWrap}>
          <View style={styles.panelHeader}>
            <RNText style={[styles.panelKicker, { color: accent }]}>
              {tab.toUpperCase()} · PANEL
            </RNText>
            <RNText style={[styles.panelTitle, { color: palette.ink }]}>
              {tab === 'brand'
                ? 'Make it yours.'
                : tab === 'type'
                ? 'Pick the voice.'
                : tab === 'layout'
                ? 'Set the rhythm.'
                : tab === 'sections'
                ? 'Compose the page.'
                : tab === 'products'
                ? 'What you sell.'
                : tab === 'pages'
                ? 'Edit every block.'
                : 'Where it lives.'}
            </RNText>
          </View>

          {tab === 'brand' ? renderBrand() : null}
          {tab === 'type' ? renderType() : null}
          {tab === 'layout' ? renderLayout() : null}
          {tab === 'sections' ? renderSections() : null}
          {tab === 'products' ? renderProducts() : null}
          {tab === 'pages' ? renderPages() : null}
          {tab === 'domain' ? renderDomain() : null}
        </View>
      </ScrollView>

      {/* =================================================================
       *  PINNED PUBLISH BAR
       * =============================================================== */}
      <View
        style={[
          styles.publishBar,
          { backgroundColor: palette.bone, borderTopColor: palette.line },
        ]}
      >
        <View style={{ flex: 1 }}>
          <RNText style={[styles.publishStat, { color: palette.ink, opacity: 0.55 }]}>
            {visibleSections} SECTIONS · {products.filter((p) => p.published).length} PRODUCTS
          </RNText>
          <RNText style={[styles.publishHint, { color: palette.ink }]} numberOfLines={1}>
            {sc.lastPublishedAt
              ? `Last published ${timeAgo(sc.lastPublishedAt)}`
              : 'Changes save automatically.'}
          </RNText>
        </View>
        <MagneticButton
          staticPress
          label="PUBLISH"
          size="lg"
          background={accent}
          foreground={accentFg}
          onPress={publish}
        />
      </View>
    </ScreenFrame>
  );
}

/* =========================================================================
 * Sub-components
 * ======================================================================= */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const palette = useThemedPalette();
  return (
    <View>
      <RNText
        style={{
          fontFamily: fonts.bodyBold,
          fontSize: 10,
          letterSpacing: 1.8,
          textTransform: 'uppercase',
          color: palette.ink,
          opacity: 0.55,
          marginBottom: 10,
        }}
      >
        {label}
      </RNText>
      {children}
    </View>
  );
}

function Metric({
  label,
  value,
  accent,
  palette,
}: {
  label: string;
  value: string;
  accent: string;
  palette: any;
}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
      <RNText
        style={{
          fontFamily: fonts.displayBold,
          fontSize: 18,
          color: palette.ink,
          letterSpacing: -0.4,
        }}
      >
        {value}
      </RNText>
      <View
        style={{
          width: 16,
          height: 2,
          backgroundColor: accent,
          marginVertical: 4,
        }}
      />
      <RNText
        style={{
          fontFamily: fonts.bodyBold,
          fontSize: 9,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          color: palette.ink,
          opacity: 0.55,
        }}
      >
        {label}
      </RNText>
    </View>
  );
}

function DomainRow({
  icon,
  title,
  sub,
  onPress,
  palette,
  danger,
}: {
  icon: any;
  title: string;
  sub: string;
  onPress: () => void;
  palette: any;
  danger?: boolean;
}) {
  return (
    <Tap scale={1} onPress={onPress} burstColor={danger ? palette.ember : palette.acid}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: palette.line,
          borderRadius: 12,
        }}
      >
        <Ionicons name={icon} size={18} color={danger ? palette.ember : palette.ink} />
        <View style={{ flex: 1 }}>
          <RNText
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 15,
              color: danger ? palette.ember : palette.ink,
              letterSpacing: -0.2,
            }}
            numberOfLines={1}
          >
            {title}
          </RNText>
          <RNText
            style={{
              fontFamily: fonts.body,
              fontSize: 12,
              lineHeight: 16,
              color: palette.ink,
              opacity: 0.6,
              marginTop: 2,
            }}
            numberOfLines={1}
          >
            {sub}
          </RNText>
        </View>
        <Ionicons name="chevron-forward" size={14} color={palette.ink} />
      </View>
    </Tap>
  );
}

function SectionEditor({
  title,
  sub,
  section,
  accent,
  accentFg,
  palette,
  styles,
  onToggle,
  children,
}: {
  title: string;
  sub: string;
  section: { enabled: boolean };
  accent: string;
  accentFg: string;
  palette: any;
  styles: any;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.sectionEditorCard,
        { borderColor: palette.line, opacity: section.enabled ? 1 : 0.55 },
      ]}
    >
      <View style={styles.sectionEditorHeader}>
        <View style={{ flex: 1 }}>
          <RNText style={[styles.sectionEditorTitle, { color: palette.ink }]} numberOfLines={1}>
            {title}
          </RNText>
          <RNText
            style={[styles.sectionEditorSub, { color: palette.ink, opacity: 0.6 }]}
            numberOfLines={1}
          >
            {sub}
          </RNText>
        </View>
        <Tap
          scale={1}
          onPress={onToggle}
          burstColor={accent}
          style={[
            styles.sectionEditorToggle,
            {
              backgroundColor: section.enabled ? accent : 'transparent',
              borderColor: section.enabled ? accent : palette.line,
            },
          ]}
        >
          <Ionicons
            name={section.enabled ? 'eye-outline' : 'eye-off-outline'}
            size={13}
            color={section.enabled ? accentFg : palette.ink}
          />
          <RNText
            style={[
              styles.sectionEditorToggleLabel,
              { color: section.enabled ? accentFg : palette.ink },
            ]}
          >
            {section.enabled ? 'LIVE' : 'HIDDEN'}
          </RNText>
        </Tap>
      </View>
      <View style={styles.sectionEditorBody}>{children}</View>
    </View>
  );
}

type ProductEditorProps = {
  product: {
    id: string;
    name: string;
    type: string;
    baseCost: number;
    margin: number;
    color: string;
    bg: string;
    fg: string;
    published: boolean;
    sold: number;
  };
  isFeatured: boolean;
  accent: string;
  accentFg: string;
  palette: any;
  styles: any;
  onTogglePublished: () => void;
  onMarginChange: (n: number) => void;
  onCostChange: (n: number) => void;
  onSetFeatured: () => void;
  onRemove: () => void;
};

function ProductEditor({
  product,
  isFeatured,
  accent,
  accentFg,
  palette,
  styles,
  onTogglePublished,
  onMarginChange,
  onCostChange,
  onSetFeatured,
  onRemove,
}: ProductEditorProps) {
  const [costStr, setCostStr] = useState(String(product.baseCost));
  const [marginStr, setMarginStr] = useState(String(product.margin));
  const price = product.baseCost + product.margin;

  return (
    <View
      style={[
        styles.productEditorCard,
        {
          borderColor: isFeatured ? accent : palette.line,
          borderWidth: isFeatured ? 2 : 1,
        },
      ]}
    >
      <View style={styles.productEditorTop}>
        <View style={[styles.productEditorThumb, { backgroundColor: product.bg }]}>
          <ProductIcon type={product.type} size={36} color={product.fg} />
        </View>
        <View style={{ flex: 1 }}>
          <RNText
            style={[styles.productEditorName, { color: palette.ink }]}
            numberOfLines={1}
          >
            {product.name}
          </RNText>
          <RNText style={[styles.productEditorMeta, { color: palette.ink, opacity: 0.55 }]}>
            {product.type} · ₹{price} · {product.sold} sold
          </RNText>
        </View>
        <Tap
          scale={1}
          onPress={onTogglePublished}
          burstColor={accent}
          style={[
            styles.productEditorPubBtn,
            {
              backgroundColor: product.published ? accent : 'transparent',
              borderColor: product.published ? accent : palette.line,
            },
          ]}
        >
          <Ionicons
            name={product.published ? 'eye-outline' : 'eye-off-outline'}
            size={13}
            color={product.published ? accentFg : palette.ink}
          />
          <RNText
            style={[
              styles.productEditorPubLabel,
              { color: product.published ? accentFg : palette.ink },
            ]}
          >
            {product.published ? 'LIVE' : 'DRAFT'}
          </RNText>
        </Tap>
      </View>

      <View style={styles.productEditorPriceRow}>
        <View style={{ flex: 1 }}>
          <RNText style={[styles.productEditorFieldLabel, { color: palette.ink, opacity: 0.55 }]}>
            COST (₹)
          </RNText>
          <TextInput
            style={[
              styles.productEditorPriceInput,
              { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
            ]}
            value={costStr}
            onChangeText={(v) => {
              const cleaned = v.replace(/[^\d]/g, '');
              setCostStr(cleaned);
              onCostChange(Number(cleaned) || 0);
            }}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={palette.mute}
          />
        </View>
        <View style={{ flex: 1 }}>
          <RNText style={[styles.productEditorFieldLabel, { color: palette.ink, opacity: 0.55 }]}>
            MARGIN (₹)
          </RNText>
          <TextInput
            style={[
              styles.productEditorPriceInput,
              { borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink },
            ]}
            value={marginStr}
            onChangeText={(v) => {
              const cleaned = v.replace(/[^\d]/g, '');
              setMarginStr(cleaned);
              onMarginChange(Number(cleaned) || 0);
            }}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={palette.mute}
          />
        </View>
        <View style={{ flex: 1 }}>
          <RNText style={[styles.productEditorFieldLabel, { color: accent }]}>
            PRICE
          </RNText>
          <View
            style={[
              styles.productEditorPriceTotal,
              { borderColor: accent, backgroundColor: accent + '10' },
            ]}
          >
            <RNText style={[styles.productEditorPriceTotalLabel, { color: palette.ink }]}>
              ₹{price}
            </RNText>
          </View>
        </View>
      </View>

      <View style={styles.productEditorActionRow}>
        <Tap
          scale={1}
          onPress={onSetFeatured}
          burstColor={accent}
          style={[
            styles.productEditorActionBtn,
            {
              borderColor: isFeatured ? accent : palette.line,
              backgroundColor: isFeatured ? accent + '14' : 'transparent',
            },
          ]}
        >
          <Ionicons
            name={isFeatured ? 'star' : 'star-outline'}
            size={13}
            color={isFeatured ? accent : palette.ink}
          />
          <RNText
            style={[
              styles.productEditorActionLabel,
              { color: isFeatured ? accent : palette.ink },
            ]}
          >
            {isFeatured ? 'FEATURED' : 'FEATURE'}
          </RNText>
        </Tap>
        <Tap
          scale={1}
          onPress={onRemove}
          burstColor={palette.ember}
          style={[styles.productEditorActionBtn, { borderColor: palette.line }]}
        >
          <Ionicons name="trash-outline" size={13} color={palette.ember} />
          <RNText
            style={[styles.productEditorActionLabel, { color: palette.ember }]}
          >
            REMOVE
          </RNText>
        </Tap>
      </View>
    </View>
  );
}

/* =========================================================================
 * Styles
 * ======================================================================= */

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    /* header right */
    viewLiveBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
    },
    viewLiveLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
      includeFontPadding: false,
    },

    /* preview */
    previewWrap: {
      height: 260,
      borderRadius: 22,
      overflow: 'hidden',
      backgroundColor: staticPalette.ink,
      marginTop: 4,
    },
    previewScrim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(10,10,10,0.45)',
    },
    previewTop: {
      position: 'absolute',
      top: 14,
      left: 14,
      right: 14,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    previewDot: { width: 8, height: 8, borderRadius: 4 },
    previewLiveTxt: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.6,
      color: staticPalette.bone,
      textTransform: 'uppercase',
    },
    previewUrl: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.4,
      color: staticPalette.bone,
      opacity: 0.8,
    },
    previewBottom: { position: 'absolute', left: 14, right: 14, bottom: 14, gap: 12 },
    previewBrand: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    previewLogo: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
      overflow: 'hidden',
    },
    previewLogoImg: { width: '100%', height: '100%' },
    previewTitle: {
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -1.2,
      textTransform: 'uppercase',
    },
    previewTag: {
      fontSize: 11,
      letterSpacing: 0.4,
      marginTop: 2,
    },
    previewMini: { flexDirection: 'row', gap: 6 },
    previewTile: {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    previewFootRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 10,
    },
    previewFootDot: { width: 4, height: 4, borderRadius: 2 },
    previewFootText: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.6,
      textTransform: 'uppercase',
    },

    /* metrics */
    metrics: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 12,
      marginTop: 14,
      overflow: 'hidden',
    },
    metricDivider: { width: 1, alignSelf: 'stretch' },

    /* tab bar */
    tabBarWrap: { marginTop: 18 },
    tabBar: { paddingHorizontal: 16, gap: 8 },
    tabPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
    },
    tabLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
      textTransform: 'uppercase',
    },
    tabActiveDot: { width: 6, height: 6, borderRadius: 3 },

    /* panel */
    panelWrap: {
      paddingHorizontal: 16,
      paddingTop: 22,
      paddingBottom: 32,
    },
    panelHeader: { marginBottom: 18 },
    panelKicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.8,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    panelTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -1,
      textTransform: 'lowercase',
    },

    /* shared input */
    input: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontFamily: fonts.body,
      fontSize: 14,
    },
    textarea: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontFamily: fonts.body,
      fontSize: 14,
      lineHeight: 20,
      minHeight: 96,
      textAlignVertical: 'top',
    },
    helperText: {
      fontFamily: fonts.body,
      fontSize: 12,
      lineHeight: 17,
    },

    /* BRAND panel */
    swatchRow: { flexDirection: 'row', gap: 10 },
    swatch: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoRow: { flexDirection: 'row', gap: 10 },
    logoTile: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      overflow: 'hidden',
    },
    logoImg: { width: '100%', height: '100%' },
    logoUpload: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 1,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    },
    logoUploadLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 8,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },
    modeRow: { flexDirection: 'row', gap: 8 },
    modeChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
    },
    modeLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },
    coverTile: {
      width: 96,
      height: 64,
      borderRadius: 10,
      borderWidth: 2,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    coverImg: { width: '100%', height: '100%' },
    coverUploadLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },
    coverColor: {
      width: 64,
      height: 64,
      borderRadius: 12,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* TYPE panel */
    fontGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    fontTile: {
      flexBasis: '31%',
      flexGrow: 1,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 8,
      alignItems: 'center',
      gap: 4,
      minHeight: 90,
      justifyContent: 'center',
    },
    fontSample: { fontSize: 34, lineHeight: 36 },
    fontLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.6,
      textTransform: 'uppercase',
    },
    typePreview: {
      borderWidth: 1,
      borderRadius: 14,
      padding: 18,
      marginTop: 8,
    },
    typePreviewKicker: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.8,
      textTransform: 'uppercase',
    },

    /* LAYOUT panel */
    layoutCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      padding: 14,
      borderWidth: 1,
      borderRadius: 14,
    },
    layoutDiagram: {
      width: 80,
      height: 80,
      borderRadius: 10,
      overflow: 'hidden',
    },
    diagramGrid: {
      flex: 1,
      padding: 8,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    diagramTile: { width: 28, height: 28, borderRadius: 4 },
    layoutLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.4,
      textTransform: 'uppercase',
    },
    layoutDesc: {
      fontFamily: fonts.body,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 4,
    },

    /* SECTIONS panel */
    sectionList: { marginTop: 14, gap: 8 },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderRadius: 12,
    },
    sectionNum: {
      width: 26,
      textAlign: 'center',
      fontFamily: fonts.displayHeavy,
      fontSize: 14,
      letterSpacing: -0.2,
    },
    sectionIcon: { width: 24, alignItems: 'center' },
    sectionLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    sectionSub: {
      fontFamily: fonts.body,
      fontSize: 10,
      letterSpacing: 0.4,
      marginTop: 2,
      textTransform: 'uppercase',
    },
    sectionBtn: {
      width: 30,
      height: 30,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* PRODUCTS panel */
    catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    catChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderWidth: 1,
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    catLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 11,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
    },
    catCost: {
      fontFamily: fonts.body,
      fontSize: 11,
    },
    catRemove: {
      width: 18,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 2,
    },
    catAddRow: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'stretch',
    },
    catAddName: { flex: 2 },
    catAddCost: { flex: 1 },
    catAddBtn: {
      width: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bigLink: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
    },
    bigLinkLabel: {
      flex: 1,
      fontFamily: fonts.displayBold,
      fontSize: 13,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
    },

    /* SectionEditor (PAGES panel) */
    sectionEditorCard: {
      borderWidth: 1,
      borderRadius: 16,
      overflow: 'hidden',
    },
    sectionEditorHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      backgroundColor: palette.paper,
    },
    sectionEditorTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 15,
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    sectionEditorSub: {
      fontFamily: fonts.body,
      fontSize: 11,
      marginTop: 2,
    },
    sectionEditorToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
    },
    sectionEditorToggleLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },
    sectionEditorBody: {
      paddingHorizontal: 14,
      paddingVertical: 14,
    },
    listEditRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    addRowBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 12,
      paddingVertical: 12,
    },
    addRowLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },
    featuredPickTile: {
      width: 130,
      borderRadius: 12,
      padding: 10,
      gap: 4,
      alignItems: 'flex-start',
    },
    featuredPickName: {
      fontFamily: fonts.displayBold,
      fontSize: 11,
      letterSpacing: -0.2,
      textTransform: 'uppercase',
      marginTop: 6,
    },
    featuredPickPrice: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.2,
    },

    /* ProductEditor (PRODUCTS panel) */
    productEditorCard: {
      borderRadius: 14,
      padding: 12,
      gap: 12,
    },
    productEditorTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    productEditorThumb: {
      width: 56,
      height: 56,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    productEditorName: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    productEditorMeta: {
      fontFamily: fonts.body,
      fontSize: 11,
      marginTop: 2,
    },
    productEditorPubBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
    },
    productEditorPubLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },
    productEditorPriceRow: {
      flexDirection: 'row',
      gap: 8,
    },
    productEditorFieldLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    productEditorPriceInput: {
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 9,
      fontFamily: fonts.bodyBold,
      fontSize: 13,
    },
    productEditorPriceTotal: {
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    productEditorPriceTotalLabel: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: -0.3,
    },
    productEditorActionRow: {
      flexDirection: 'row',
      gap: 8,
    },
    productEditorActionBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
    },
    productEditorActionLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.4,
      textTransform: 'uppercase',
    },

    /* PAGES panel */
    faqItem: {
      flexDirection: 'row',
      gap: 10,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
    },
    faqQ: {
      fontFamily: fonts.displayBold,
      fontSize: 14,
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    faqA: {
      fontFamily: fonts.body,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 4,
    },
    faqRemove: {
      width: 28,
      height: 28,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    faqAddCard: {
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'dashed',
    },
    faqInput: {
      fontSize: 13,
      paddingVertical: 4,
    },
    faqAdd: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 9,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      alignSelf: 'flex-start',
      marginTop: 10,
    },
    faqAddLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.6,
      textTransform: 'uppercase',
    },

    /* DOMAIN panel */
    domainCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      borderWidth: 1,
      borderRadius: 14,
    },
    domainLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.8,
      textTransform: 'uppercase',
      opacity: 0.55,
    },
    domainValue: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.4,
      marginTop: 4,
    },
    domainSub: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.6,
      textTransform: 'uppercase',
      marginTop: 6,
    },
    domainToggle: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 999,
      borderWidth: 1,
    },
    domainToggleLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.8,
      textTransform: 'uppercase',
    },

    /* publish bar */
    publishBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 28,
      borderTopWidth: 1,
    },
    publishStat: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.6,
      textTransform: 'uppercase',
    },
    publishHint: {
      fontFamily: fonts.body,
      fontSize: 12,
      marginTop: 4,
    },
  });
