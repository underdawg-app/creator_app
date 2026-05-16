import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
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
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TiltCard } from '@/components/ui/TiltCard';
import { ProductIcon } from '@/components/svg/ProductIcon';
import { Image } from '@/components/ui/Image';
import { Marquee } from '@/components/ui/Marquee';
import { useStore } from '@/store';
import { productTypes } from '@/data/mock';

const { width } = Dimensions.get('window');
const SCREEN_PADDING = 12;
const CONTENT_W = width - SCREEN_PADDING * 2;

/* -------------------------------------------------------------------------
 * Customization options
 * ----------------------------------------------------------------------- */

type AccentKey = 'acid' | 'electric' | 'blush' | 'ember' | 'ink';
type FontKey = 'display' | 'editorial' | 'mono';
type LayoutKey = 'grid' | 'stack' | 'mag';
type BgMode = 'image' | 'video' | 'color';

const ACCENTS: { key: AccentKey; label: string }[] = [
  { key: 'acid', label: 'ACID' },
  { key: 'electric', label: 'ELECTRIC' },
  { key: 'blush', label: 'BLUSH' },
  { key: 'ember', label: 'EMBER' },
  { key: 'ink', label: 'MONO' },
];

const FONT_OPTIONS: { key: FontKey; label: string; sample: string; family: string }[] = [
  { key: 'display', label: 'DISPLAY', sample: 'Aa', family: fonts.displayBold },
  { key: 'editorial', label: 'EDITORIAL', sample: 'Aa', family: fonts.editorialItalic },
  { key: 'mono', label: 'BODY', sample: 'Aa', family: fonts.bodyBold },
];

const LAYOUT_OPTIONS: { key: LayoutKey; label: string }[] = [
  { key: 'grid', label: 'GRID' },
  { key: 'stack', label: 'STACK' },
  { key: 'mag', label: 'MAG' },
];

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

const DESIGN_LIBRARY = [
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&q=80&auto=format&fit=crop',
];

const MOCKUP_GALLERY = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&q=80&auto=format&fit=crop',
];

const STORE_PAGES = [
  { key: 'about', label: 'ABOUT', icon: 'information-circle-outline' as const },
  { key: 'contact', label: 'CONTACT', icon: 'mail-outline' as const },
  { key: 'faq', label: 'FAQ', icon: 'help-circle-outline' as const },
  { key: 'shipping', label: 'SHIPPING', icon: 'cube-outline' as const },
];

/* -------------------------------------------------------------------------
 * Screen
 * ----------------------------------------------------------------------- */

export default function MerchStudio() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const products = useStore((s) => s.products);
  const profile = useStore((s) => s.profile);
  const orders = useStore((s) => s.merchOrders);
  const toast = useStore((s) => s.toast);
  const toggleProductPublished = useStore((s) => s.toggleProductPublished);

  /* ---------- live customization state ---------- */
  const [accentKey, setAccentKey] = useState<AccentKey>('acid');
  const [fontKey, setFontKey] = useState<FontKey>('display');
  const [layoutKey, setLayoutKey] = useState<LayoutKey>('grid');
  const [coverIdx, setCoverIdx] = useState(0);
  const [logoIdx, setLogoIdx] = useState(0);
  const [bgMode, setBgMode] = useState<BgMode>('image');
  const [storeName, setStoreName] = useState(
    `${profile.handle.replace('@', '').toUpperCase()}.STORE`
  );
  const [pagesOn, setPagesOn] = useState<Record<string, boolean>>({
    about: true,
    contact: true,
    faq: false,
    shipping: true,
  });
  const [siteOn, setSiteOn] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const accent =
    accentKey === 'acid'
      ? palette.acid
      : accentKey === 'electric'
      ? palette.electric
      : accentKey === 'blush'
      ? palette.blush
      : accentKey === 'ember'
      ? palette.ember
      : palette.ink;
  const accentFg = accentKey === 'acid' ? palette.ink : palette.bone;

  const titleFamily =
    fontKey === 'display'
      ? fonts.displayBold
      : fontKey === 'editorial'
      ? fonts.editorialItalic
      : fonts.bodyBold;

  const revenue = products.reduce(
    (a, p) => a + p.sold * (p.baseCost + p.margin),
    0
  );
  const unitsSold = products.reduce((a, p) => a + p.sold, 0);

  const handle = profile.handle.replace('@', '');
  const siteUrl = `${handle}.underdawg.store`;

  /* products user can add (not yet in their line) */
  const ownedTypes = useMemo(
    () => new Set(products.map((p) => p.type.toUpperCase())),
    [products]
  );
  const availableTypes = productTypes.filter(
    (t) => !ownedTypes.has(t.name.toUpperCase())
  );

  const togglePage = (k: string) =>
    setPagesOn((s) => ({ ...s, [k]: !s[k] }));

  const generateMockups = () => {
    setGenerating(true);
    toast('Generating mockups…');
    setTimeout(() => {
      setGenerating(false);
      toast('4 new mockups ready', 'default');
    }, 1400);
  };

  const publish = () => toast('Store changes published', 'default');
  const preview = () => router.push('/(modules)/merch/store');

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          eyebrow="YOUR STUDIO"
          title="MERCH STUDIO"
          right={
            <Tap scale={1}
              style={styles.previewBtn}
              onPress={preview}
              burstColor={accent}
            >
              <Ionicons name="eye-outline" size={16} color={palette.ink} />
            </Tap>
          }
        />
      }
    >
      {/* ===================================================================
       *  LIVE PREVIEW — reflects every customization choice
       * ================================================================= */}
      <Tap scale={1} onPress={preview} burstColor={accent}>
        <TiltCard style={styles.previewWrap} maxTilt={0}>
          <View style={[styles.previewCard, { backgroundColor: staticPalette.ink }]}>
            {bgMode === 'image' ? (
              <Image
                source={{ uri: COVER_OPTIONS[coverIdx] }}
                style={StyleSheet.absoluteFill as any}
                contentFit="cover"
                transition={250}
                targetWidth={CONTENT_W}
              />
            ) : bgMode === 'video' ? (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: staticPalette.ink, alignItems: 'center', justifyContent: 'center' },
                ]}
              >
                <Ionicons name="play-circle" size={48} color={staticPalette.bone} />
                <RNText style={[styles.previewVideoLabel, { color: staticPalette.bone }]}>
                  VIDEO BACKGROUND
                </RNText>
              </View>
            ) : (
              <View
                style={[StyleSheet.absoluteFill, { backgroundColor: accent }]}
              />
            )}

            {/* Gradient scrim */}
            <View style={styles.previewScrim} pointerEvents="none" />

            {/* Top bar */}
            <View style={styles.previewTopBar}>
              <View style={[styles.previewLiveDot, { backgroundColor: accent }]} />
              <RNText style={styles.previewLiveText} numberOfLines={1}>
                LIVE · {products.length} PRODUCTS
              </RNText>
              <View style={{ flex: 1 }} />
              <RNText style={styles.previewUrl} numberOfLines={1}>
                {siteUrl}
              </RNText>
            </View>

            {/* Bottom — logo + store name + product mini tiles */}
            <View style={styles.previewBottom}>
              <View style={styles.previewBrandRow}>
                <View style={[styles.previewLogo, { borderColor: accent }]}>
                  <Image
                    source={{ uri: LOGO_OPTIONS[logoIdx] }}
                    style={styles.previewLogoImg}
                    contentFit="cover"
                    targetWidth={48}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <RNText
                    style={[
                      styles.previewStoreName,
                      { fontFamily: titleFamily, color: staticPalette.bone },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.55}
                  >
                    {storeName}
                  </RNText>
                  <RNText style={[styles.previewHandle, { color: accent }]} numberOfLines={1}>
                    @{handle} · SHIPS WORLDWIDE
                  </RNText>
                </View>
              </View>

              {/* Mini product tiles — layout switches with layoutKey */}
              <View style={styles.previewMiniRow}>
                {products.slice(0, 3).map((p, i) => {
                  const isHero = layoutKey === 'mag' && i === 0;
                  return (
                    <View
                      key={p.id}
                      style={[
                        styles.previewMiniTile,
                        {
                          backgroundColor: p.bg,
                          flex: isHero ? 2 : 1,
                          height: layoutKey === 'stack' ? 42 : 56,
                        },
                      ]}
                    >
                      <ProductIcon type={p.type} size={isHero ? 28 : 22} color={p.fg} />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </TiltCard>
      </Tap>

      <View style={styles.previewFootRow}>
        <View style={[styles.previewFootDot, { backgroundColor: accent }]} />
        <RNText style={[styles.previewFootText, { color: palette.ink }]} numberOfLines={1}>
          LIVE PREVIEW · TAP TO OPEN
        </RNText>
        <View style={[styles.previewFootDot, { backgroundColor: accent }]} />
      </View>

      {/* ===== STATUS TICKER ===== */}
      <View style={[styles.marqueeStrip, { backgroundColor: staticPalette.ink }]}>
        <Marquee
          items={[
            'STORE LIVE',
            'UNDERDAWG SS26',
            'GET DISCOVERED',
            'GET PAID',
            'EDIT ANYTIME',
            'YOU ARE UNDERDAWG',
          ]}
          textStyle={{
            fontFamily: fonts.displayBold,
            fontSize: 22,
            lineHeight: 44,
            letterSpacing: -0.6,
            color: staticPalette.bone,
          }}
          speed={48}
          separator="   ·   "
          style={{ height: 44, backgroundColor: staticPalette.ink }}
        />
      </View>

      {/* ===== METRICS — 4 IN ONE ROW ===== */}
      <View style={styles.metricsRow}>
        <SlimMetric label="REVENUE" value={`₹${compact(revenue)}`} accentColor={accent} />
        <View style={[styles.metricDivider, { backgroundColor: palette.line }]} />
        <SlimMetric label="ORDERS" value={String(orders.length)} accentColor={palette.electric} />
        <View style={[styles.metricDivider, { backgroundColor: palette.line }]} />
        <SlimMetric label="UNITS" value={compact(unitsSold)} accentColor={palette.blush} />
        <View style={[styles.metricDivider, { backgroundColor: palette.line }]} />
        <SlimMetric label="PRODUCTS" value={String(products.length)} accentColor={palette.ember} />
      </View>

      {/* ===== PRIMARY ACTIONS ===== */}
      <View style={styles.ctaCol}>
        <MagneticButton staticPress
          label="PUBLISH STORE"
          size="lg"
          background={staticPalette.ink}
          foreground={accent}
          onPress={publish}
          style={{ alignSelf: 'stretch' }}
        />
        <View style={styles.ctaSecondaryRow}>
          <SecondaryAction
            icon="eye-outline"
            label="PREVIEW"
            tint={accent}
            tintFg={accentKey === 'acid' ? staticPalette.ink : staticPalette.bone}
            onPress={preview}
          />
          <SecondaryAction
            icon="share-outline"
            label="SHARE"
            tint={palette.electric}
            tintFg={staticPalette.bone}
            onPress={() => toast('Share link copied')}
          />
          <SecondaryAction
            icon="save-outline"
            label="DRAFT"
            tint={palette.blush}
            tintFg={staticPalette.bone}
            onPress={() => toast('Saved as draft')}
          />
        </View>
      </View>

      {/* ===================================================================
       *  STOREFRONT — cover + logo + name
       * ================================================================= */}
      <Section eyebrow="STOREFRONT · COVER + LOGO" title="set the scene.">
        {/* Background mode toggle */}
        <View style={styles.modeRow}>
          {(['image', 'video', 'color'] as BgMode[]).map((m) => {
            const active = bgMode === m;
            return (
              <Tap scale={1}
                key={m}
                onPress={() => setBgMode(m)}
                burstColor={accent}
                style={[
                  styles.modeChip,
                  active && { backgroundColor: staticPalette.ink, borderColor: staticPalette.ink },
                  !active && { borderColor: palette.line },
                ]}
              >
                <Ionicons
                  name={
                    m === 'image'
                      ? 'image-outline'
                      : m === 'video'
                      ? 'videocam-outline'
                      : 'color-fill-outline'
                  }
                  size={13}
                  color={active ? staticPalette.bone : palette.ink}
                />
                <RNText
                  style={[
                    styles.modeChipLabel,
                    { color: active ? staticPalette.bone : palette.ink },
                  ]}
                  numberOfLines={1}
                >
                  {m === 'image' ? 'IMAGE' : m === 'video' ? 'VIDEO' : 'COLOR'}
                </RNText>
              </Tap>
            );
          })}
        </View>

        {/* Cover row */}
        <RNText style={[styles.controlLabel, { color: palette.ink }]} numberOfLines={1}>
          COVER · {bgMode === 'image' ? 'PICK OR UPLOAD' : bgMode === 'video' ? 'UPLOAD VIDEO' : 'BRAND COLOR'}
        </RNText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coverScroll}
          style={{ marginHorizontal: -SCREEN_PADDING }}
        >
          {bgMode === 'image' ? (
            <>
              <Tap scale={1}
                style={[styles.dropTile, { borderColor: palette.line }]}
                onPress={() => toast('Upload from camera roll')}
                burstColor={accent}
              >
                <Ionicons name="cloud-upload-outline" size={20} color={palette.ink} />
                <RNText style={[styles.dropTileLabel, { color: palette.ink }]} numberOfLines={1}>
                  DRAG · DROP
                </RNText>
                <RNText style={[styles.dropTileSub, { color: palette.ink, opacity: 0.55 }]}>
                  PNG · JPG · 4K
                </RNText>
              </Tap>
              {COVER_OPTIONS.map((uri, i) => {
                const active = i === coverIdx;
                return (
                  <Tap scale={1}
                    key={uri}
                    onPress={() => setCoverIdx(i)}
                    burstColor={accent}
                  >
                    <View
                      style={[
                        styles.coverTile,
                        active && { borderColor: accent, borderWidth: 3 },
                        !active && { borderColor: palette.line, borderWidth: 1 },
                      ]}
                    >
                      <Image
                        source={{ uri }}
                        style={StyleSheet.absoluteFill as any}
                        contentFit="cover"
                        targetWidth={140}
                      />
                      {active ? (
                        <View
                          style={[styles.coverActiveBadge, { backgroundColor: accent }]}
                        >
                          <Ionicons name="checkmark" size={12} color={palette.ink} />
                        </View>
                      ) : null}
                    </View>
                  </Tap>
                );
              })}
            </>
          ) : bgMode === 'video' ? (
            <Tap scale={1}
              style={[styles.videoDrop, { borderColor: palette.line }]}
              onPress={() => toast('Upload video — coming soon')}
              burstColor={accent}
            >
              <Ionicons name="videocam-outline" size={26} color={palette.ink} />
              <RNText style={[styles.dropTileLabel, { color: palette.ink }]} numberOfLines={1}>
                DROP A LOOP
              </RNText>
              <RNText style={[styles.dropTileSub, { color: palette.ink, opacity: 0.55 }]}>
                MP4 · 10S MAX · MUTED
              </RNText>
            </Tap>
          ) : (
            <View style={styles.coverColorRow}>
              {ACCENTS.map((a) => {
                const c =
                  a.key === 'acid'
                    ? palette.acid
                    : a.key === 'electric'
                    ? palette.electric
                    : a.key === 'blush'
                    ? palette.blush
                    : a.key === 'ember'
                    ? palette.ember
                    : palette.ink;
                const active = accentKey === a.key;
                return (
                  <Tap scale={1}
                    key={a.key}
                    onPress={() => setAccentKey(a.key)}
                    burstColor={c}
                  >
                    <View
                      style={[
                        styles.coverColorTile,
                        { backgroundColor: c, borderColor: active ? palette.ink : 'transparent' },
                      ]}
                    >
                      {active ? (
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={a.key === 'acid' ? staticPalette.ink : staticPalette.bone}
                        />
                      ) : null}
                    </View>
                  </Tap>
                );
              })}
            </View>
          )}
        </ScrollView>

        {/* Logo row */}
        <RNText
          style={[styles.controlLabel, { color: palette.ink, marginTop: 18 }]}
          numberOfLines={1}
        >
          LOGO · YOUR MARK
        </RNText>
        <View style={styles.logoRow}>
          <Tap scale={1}
            style={[styles.logoDrop, { borderColor: palette.line }]}
            onPress={() => toast('Upload logo')}
            burstColor={accent}
          >
            <Ionicons name="add" size={26} color={palette.ink} />
            <RNText style={[styles.dropTileSub, { color: palette.ink, opacity: 0.6 }]} numberOfLines={1}>
              UPLOAD
            </RNText>
          </Tap>
          {LOGO_OPTIONS.map((uri, i) => {
            const active = i === logoIdx;
            return (
              <Tap scale={1}
                key={uri}
                onPress={() => setLogoIdx(i)}
                burstColor={accent}
              >
                <View
                  style={[
                    styles.logoTile,
                    active
                      ? { borderColor: accent, borderWidth: 3 }
                      : { borderColor: palette.line, borderWidth: 1 },
                  ]}
                >
                  <Image
                    source={{ uri }}
                    style={StyleSheet.absoluteFill as any}
                    contentFit="cover"
                    targetWidth={80}
                  />
                </View>
              </Tap>
            );
          })}
        </View>

        {/* Store name input (display only) */}
        <RNText
          style={[styles.controlLabel, { color: palette.ink, marginTop: 18 }]}
          numberOfLines={1}
        >
          STORE NAME
        </RNText>
        <Tap scale={1}
          style={[styles.fieldRow, { borderColor: palette.line }]}
          onPress={() =>
            setStoreName((s) =>
              s.endsWith('.STORE') ? s.replace('.STORE', '.SHOP') : `${s.split('.')[0]}.STORE`
            )
          }
          burstColor={accent}
        >
          <Ionicons name="text-outline" size={16} color={palette.ink} />
          <RNText
            style={[styles.fieldText, { color: palette.ink }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {storeName}
          </RNText>
          <Ionicons name="pencil" size={14} color={palette.ink} />
        </Tap>
      </Section>

      {/* ===================================================================
       *  BRAND — color, font, card style
       * ================================================================= */}
      <Section eyebrow="BRAND · COLOR + TYPE" title="make it yours.">
        <RNText style={[styles.controlLabel, { color: palette.ink }]} numberOfLines={1}>
          ACCENT COLOR
        </RNText>
        <View style={styles.swatchRow}>
          {ACCENTS.map((a) => {
            const c =
              a.key === 'acid'
                ? palette.acid
                : a.key === 'electric'
                ? palette.electric
                : a.key === 'blush'
                ? palette.blush
                : a.key === 'ember'
                ? palette.ember
                : palette.ink;
            const active = accentKey === a.key;
            return (
              <Tap scale={1} key={a.key} onPress={() => setAccentKey(a.key)} burstColor={c}>
                <View
                  style={[
                    styles.swatch,
                    {
                      backgroundColor: c,
                      borderColor: active ? palette.ink : 'transparent',
                    },
                  ]}
                >
                  {active ? (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={a.key === 'acid' ? staticPalette.ink : staticPalette.bone}
                    />
                  ) : null}
                </View>
                <RNText
                  style={[styles.swatchLabel, { color: palette.ink, opacity: active ? 1 : 0.55 }]}
                  numberOfLines={1}
                >
                  {a.label}
                </RNText>
              </Tap>
            );
          })}
        </View>

        <RNText
          style={[styles.controlLabel, { color: palette.ink, marginTop: 22 }]}
          numberOfLines={1}
        >
          DISPLAY FONT
        </RNText>
        <View style={styles.fontRow}>
          {FONT_OPTIONS.map((f) => {
            const active = fontKey === f.key;
            return (
              <Tap scale={1}
                key={f.key}
                onPress={() => setFontKey(f.key)}
                burstColor={accent}
                style={{ flex: 1 }}
              >
                <View
                  style={[
                    styles.fontCard,
                    active
                      ? { backgroundColor: staticPalette.ink, borderColor: staticPalette.ink }
                      : { backgroundColor: palette.paper, borderColor: palette.line },
                  ]}
                >
                  <RNText
                    style={{
                      fontFamily: f.family,
                      fontSize: 38,
                      lineHeight: 40,
                      letterSpacing: -1.4,
                      color: active ? accent : palette.ink,
                    }}
                    allowFontScaling={false}
                  >
                    {f.sample}
                  </RNText>
                  <RNText
                    style={[
                      styles.fontCardLabel,
                      { color: active ? staticPalette.bone : palette.ink },
                    ]}
                    numberOfLines={1}
                  >
                    {f.label}
                  </RNText>
                </View>
              </Tap>
            );
          })}
        </View>

        <RNText
          style={[styles.controlLabel, { color: palette.ink, marginTop: 22 }]}
          numberOfLines={1}
        >
          PRODUCT LAYOUT
        </RNText>
        <View style={styles.fontRow}>
          {LAYOUT_OPTIONS.map((l) => {
            const active = layoutKey === l.key;
            return (
              <Tap scale={1}
                key={l.key}
                onPress={() => setLayoutKey(l.key)}
                burstColor={accent}
                style={{ flex: 1 }}
              >
                <View
                  style={[
                    styles.layoutCard,
                    active
                      ? { backgroundColor: staticPalette.ink, borderColor: staticPalette.ink }
                      : { backgroundColor: palette.paper, borderColor: palette.line },
                  ]}
                >
                  <LayoutDiagram
                    kind={l.key}
                    color={active ? accent : palette.ink}
                  />
                  <RNText
                    style={[
                      styles.fontCardLabel,
                      { color: active ? staticPalette.bone : palette.ink },
                    ]}
                    numberOfLines={1}
                  >
                    {l.label}
                  </RNText>
                </View>
              </Tap>
            );
          })}
        </View>
      </Section>

      {/* ===================================================================
       *  PRODUCTS — manage your line
       * ================================================================= */}
      <Section
        eyebrow={`PRODUCTS · ${products.length} LIVE`}
        title="your line."
        action={{
          label: pickerOpen ? 'CLOSE' : 'ADD',
          onPress: () => setPickerOpen((s) => !s),
        }}
      >
        <View style={styles.productGrid}>
          {products.map((p) => (
            <Tap scale={1}
              key={p.id}
              onPress={() => router.push('/(modules)/merch/store')}
              burstColor={p.color}
              style={{ flexBasis: '48%' }}
            >
              <TiltCard
                style={[styles.productCard, { backgroundColor: p.bg }] as any}
                maxTilt={0}
              >
                <View style={styles.productTopRow}>
                  <View style={[styles.productAccentBar, { backgroundColor: p.color }]} />
                  <View style={{ flex: 1 }} />
                  <Tap scale={1}
                    style={[styles.productMenu, { backgroundColor: 'rgba(10,10,10,0.18)' }]}
                    onPress={() => toggleProductPublished(p.id)}
                    burstColor={p.color}
                  >
                    <Ionicons
                      name={p.published ? 'eye-outline' : 'eye-off-outline'}
                      size={12}
                      color={p.fg}
                    />
                  </Tap>
                </View>
                <View style={styles.productIcon}>
                  <ProductIcon type={p.type} size={56} color={p.fg} />
                </View>
                <View>
                  <RNText
                    style={[styles.productName, { color: p.fg }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                  >
                    {p.name}
                  </RNText>
                  <RNText style={[styles.productMeta, { color: p.fg }]} numberOfLines={1}>
                    {p.type} · ₹{p.baseCost + p.margin}
                  </RNText>
                  <View style={styles.productFootRow}>
                    <View style={[styles.productSoldDot, { backgroundColor: p.color }]} />
                    <RNText style={[styles.productSold, { color: p.fg }]} numberOfLines={1}>
                      {p.sold} SOLD
                    </RNText>
                  </View>
                </View>
              </TiltCard>
            </Tap>
          ))}

          <Tap scale={1}
            onPress={() => router.push('/(modules)/merch/create')}
            burstColor={accent}
            style={{ flexBasis: '48%' }}
          >
            <View style={[styles.productAddCard, { borderColor: palette.line }]}>
              <View style={[styles.productAddIcon, { backgroundColor: staticPalette.ink }]}>
                <Ionicons name="add" size={22} color={accent} />
              </View>
              <RNText style={[styles.productAddLabel, { color: palette.ink }]} numberOfLines={1}>
                NEW PRODUCT
              </RNText>
              <RNText style={[styles.productAddSub, { color: palette.ink, opacity: 0.6 }]} numberOfLines={1}>
                FROM SCRATCH
              </RNText>
            </View>
          </Tap>
        </View>

        {pickerOpen ? (
          <View style={[styles.pickerWrap, { backgroundColor: palette.paper, borderColor: palette.line }]}>
            <RNText style={[styles.pickerKicker, { color: palette.ink }]} numberOfLines={1}>
              PICK PRODUCT TYPE · ADD TO STORE
            </RNText>
            <View style={styles.pickerGrid}>
              {productTypes.map((pt) => {
                const owned = ownedTypes.has(pt.name.toUpperCase());
                return (
                  <Tap scale={1}
                    key={pt.key}
                    onPress={() => {
                      router.push('/(modules)/merch/create');
                      setPickerOpen(false);
                    }}
                    burstColor={accent}
                    disabled={owned}
                    style={{ flexBasis: '31%' }}
                  >
                    <View
                      style={[
                        styles.pickerTile,
                        owned
                          ? { backgroundColor: staticPalette.ink, opacity: 0.85 }
                          : { backgroundColor: accent },
                      ]}
                    >
                      <ProductIcon
                        type={pt.name}
                        size={30}
                        color={
                          owned ? staticPalette.bone : accentKey === 'acid' ? staticPalette.ink : staticPalette.bone
                        }
                      />
                      <RNText
                        style={[
                          styles.pickerLabel,
                          {
                            color: owned ? staticPalette.bone : accentKey === 'acid' ? staticPalette.ink : staticPalette.bone,
                          },
                        ]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.7}
                      >
                        {pt.name}
                      </RNText>
                      <RNText
                        style={[
                          styles.pickerCost,
                          {
                            color: owned ? staticPalette.bone : accentKey === 'acid' ? staticPalette.ink : staticPalette.bone,
                            opacity: owned ? 0.6 : 0.75,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {owned ? 'IN STORE' : `₹${pt.baseCost}`}
                      </RNText>
                    </View>
                  </Tap>
                );
              })}
            </View>
            <RNText style={[styles.pickerHint, { color: palette.ink, opacity: 0.55 }]}>
              {availableTypes.length} more product types available.
            </RNText>
          </View>
        ) : null}
      </Section>

      {/* ===================================================================
       *  DESIGNS — your artwork library
       * ================================================================= */}
      <Section
        eyebrow={`DESIGNS · ${DESIGN_LIBRARY.length} IN LIBRARY`}
        title="your artwork."
        action={{ label: 'UPLOAD', onPress: () => toast('Upload design') }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.designScroll}
          style={{ marginHorizontal: -SCREEN_PADDING }}
        >
          <Tap scale={1}
            style={[styles.designDrop, { borderColor: palette.line }]}
            onPress={() => toast('Drop a PNG, SVG, or AI file')}
            burstColor={accent}
          >
            <Ionicons name="cloud-upload-outline" size={26} color={palette.ink} />
            <RNText style={[styles.dropTileLabel, { color: palette.ink }]} numberOfLines={1}>
              DRAG · DROP
            </RNText>
            <RNText style={[styles.dropTileSub, { color: palette.ink, opacity: 0.55 }]} numberOfLines={1}>
              PNG · SVG · AI
            </RNText>
          </Tap>
          {DESIGN_LIBRARY.map((uri, i) => (
            <Tap scale={1}
              key={uri}
              onPress={() => toast(`Design ${i + 1} selected`)}
              burstColor={accent}
            >
              <View style={[styles.designTile, { borderColor: palette.line }]}>
                <Image
                  source={{ uri }}
                  style={StyleSheet.absoluteFill as any}
                  contentFit="cover"
                  targetWidth={140}
                />
                <View style={styles.designTileFoot}>
                  <RNText style={styles.designTileLabel} numberOfLines={1}>
                    DSGN-{String(i + 1).padStart(2, '0')}
                  </RNText>
                </View>
              </View>
            </Tap>
          ))}
        </ScrollView>
      </Section>

      {/* ===================================================================
       *  AI MOCKUPS
       * ================================================================= */}
      <Section
        eyebrow="AI MOCKUPS · LATEST RUN"
        title="see it on product."
        action={{
          label: generating ? '…' : 'REGEN',
          onPress: generateMockups,
        }}
      >
        <View style={styles.mockupGrid}>
          {MOCKUP_GALLERY.map((uri, i) => (
            <Tap scale={1}
              key={uri}
              onPress={() => toast('Use this mockup')}
              burstColor={accent}
              style={{ flexBasis: '48%' }}
            >
              <View style={[styles.mockupTile, { backgroundColor: palette.paper, borderColor: palette.line }]}>
                <Image
                  source={{ uri }}
                  style={StyleSheet.absoluteFill as any}
                  contentFit="cover"
                  targetWidth={(CONTENT_W - 10) / 2}
                />
                <View style={[styles.mockupBadge, { backgroundColor: staticPalette.ink }]}>
                  <Ionicons name="sparkles" size={10} color={accent} />
                  <RNText style={[styles.mockupBadgeText, { color: staticPalette.bone }]} numberOfLines={1}>
                    AI
                  </RNText>
                </View>
                <View style={styles.mockupFoot}>
                  <RNText style={styles.mockupFootText} numberOfLines={1}>
                    VARIANT 0{i + 1}
                  </RNText>
                </View>
              </View>
            </Tap>
          ))}
        </View>
        <Tap scale={1}
          onPress={generateMockups}
          burstColor={accent}
          style={[styles.generateRow, { backgroundColor: staticPalette.ink }]}
        >
          <Ionicons
            name={generating ? 'hourglass' : 'sparkles'}
            size={14}
            color={accent}
          />
          <RNText style={[styles.generateRowLabel, { color: accent }]} numberOfLines={1}>
            {generating ? 'GENERATING…' : 'GENERATE NEW MOCKUPS'}
          </RNText>
          <Ionicons name="arrow-forward" size={14} color={accent} />
        </Tap>
      </Section>

      {/* ===================================================================
       *  CHANNELS — where store lives
       * ================================================================= */}
      <Section eyebrow="WHERE IT LIVES" title="channels.">
        <Tap scale={1} onPress={() => router.push('/(modules)/merch/store')} burstColor={accent}>
          <View style={[styles.channelRow, { backgroundColor: staticPalette.ink, borderColor: staticPalette.ink }]}>
            <View style={[styles.channelIcon, { backgroundColor: accent }]}>
              <Ionicons
                name="storefront"
                size={16}
                color={accentKey === 'acid' ? staticPalette.ink : staticPalette.bone}
              />
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={[styles.channelTitle, { color: staticPalette.bone }]} numberOfLines={1}>
                IN-APP STORE
              </RNText>
              <RNText style={[styles.channelUrl, { color: accent }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
                underdawg.com/{handle}/store
              </RNText>
            </View>
            <View style={[styles.channelStatusOn, { backgroundColor: accent }]}>
              <RNText
                style={[
                  styles.channelStatusText,
                  { color: accentKey === 'acid' ? staticPalette.ink : staticPalette.bone },
                ]}
                numberOfLines={1}
              >
                ON
              </RNText>
            </View>
          </View>
        </Tap>

        <Tap scale={1}
          onPress={() => setSiteOn((s) => !s)}
          burstColor={palette.electric}
        >
          <View
            style={[
              styles.channelRow,
              {
                backgroundColor: palette.paper,
                borderColor: siteOn ? palette.electric : palette.line,
              },
            ]}
          >
            <View
              style={[
                styles.channelIcon,
                { backgroundColor: siteOn ? palette.electric : palette.line },
              ]}
            >
              <Ionicons
                name="globe-outline"
                size={16}
                color={siteOn ? palette.bone : palette.ink}
              />
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={[styles.channelTitle, { color: palette.ink }]} numberOfLines={1}>
                STANDALONE SITE
              </RNText>
              <RNText
                style={[styles.channelUrl, { color: palette.electric, opacity: siteOn ? 1 : 0.5 }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {siteUrl}
              </RNText>
            </View>
            <View
              style={[
                styles.toggleTrack,
                { backgroundColor: siteOn ? palette.electric : palette.line },
              ]}
            >
              <View
                style={[
                  styles.toggleThumb,
                  {
                    backgroundColor: palette.bone,
                    alignSelf: siteOn ? 'flex-end' : 'flex-start',
                  },
                ]}
              />
            </View>
          </View>
        </Tap>
      </Section>

      {/* ===================================================================
       *  PAGES — about / contact / faq / shipping toggles
       * ================================================================= */}
      <Section eyebrow="STORE PAGES" title="extra content.">
        <View style={styles.pageGrid}>
          {STORE_PAGES.map((p) => {
            const on = pagesOn[p.key];
            return (
              <Tap scale={1}
                key={p.key}
                onPress={() => togglePage(p.key)}
                burstColor={accent}
                style={{ flexBasis: '48%' }}
              >
                <View
                  style={[
                    styles.pageTile,
                    {
                      backgroundColor: on ? staticPalette.ink : palette.paper,
                      borderColor: on ? staticPalette.ink : palette.line,
                    },
                  ]}
                >
                  <Ionicons
                    name={p.icon}
                    size={18}
                    color={on ? accent : palette.ink}
                  />
                  <RNText
                    style={[
                      styles.pageLabel,
                      { color: on ? staticPalette.bone : palette.ink },
                    ]}
                    numberOfLines={1}
                  >
                    {p.label}
                  </RNText>
                  <View
                    style={[
                      styles.pageStatus,
                      {
                        backgroundColor: on ? accent : 'transparent',
                        borderColor: on ? accent : palette.line,
                      },
                    ]}
                  >
                    <RNText
                      style={[
                        styles.pageStatusText,
                        {
                          color: on
                            ? accentKey === 'acid'
                              ? staticPalette.ink
                              : staticPalette.bone
                            : palette.ink,
                          opacity: on ? 1 : 0.5,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {on ? 'ON' : 'OFF'}
                    </RNText>
                  </View>
                </View>
              </Tap>
            );
          })}
        </View>
      </Section>

      {/* ===================================================================
       *  DOMAIN + ADVANCED
       * ================================================================= */}
      <Section eyebrow="DOMAIN + ADVANCED">
        <Tap scale={1}
          onPress={() => toast('Custom domain — coming soon')}
          burstColor={accent}
        >
          <View style={[styles.advRow, { borderColor: palette.line }]}>
            <Ionicons name="link-outline" size={16} color={palette.ink} />
            <View style={{ flex: 1 }}>
              <RNText style={[styles.advTitle, { color: palette.ink }]} numberOfLines={1}>
                Custom domain
              </RNText>
              <RNText style={[styles.advSub, { color: palette.ink, opacity: 0.6 }]} numberOfLines={1}>
                Connect your own URL · free SSL
              </RNText>
            </View>
            <Ionicons name="chevron-forward" size={14} color={palette.ink} />
          </View>
        </Tap>
        <Tap scale={1}
          onPress={() => router.push('/(modules)/merch/orders')}
          burstColor={palette.electric}
        >
          <View style={[styles.advRow, { borderColor: palette.line }]}>
            <Ionicons name="cart-outline" size={16} color={palette.ink} />
            <View style={{ flex: 1 }}>
              <RNText style={[styles.advTitle, { color: palette.ink }]} numberOfLines={1}>
                Orders
              </RNText>
              <RNText style={[styles.advSub, { color: palette.ink, opacity: 0.6 }]} numberOfLines={1}>
                {orders.length} lifetime · {orders.filter((o) => o.status === 'PRINTING').length} in production
              </RNText>
            </View>
            <Ionicons name="chevron-forward" size={14} color={palette.ink} />
          </View>
        </Tap>
        <Tap scale={1}
          onPress={() => toast('Shipping zones — coming soon')}
          burstColor={palette.blush}
        >
          <View style={[styles.advRow, { borderColor: palette.line }]}>
            <Ionicons name="airplane-outline" size={16} color={palette.ink} />
            <View style={{ flex: 1 }}>
              <RNText style={[styles.advTitle, { color: palette.ink }]} numberOfLines={1}>
                Shipping + tax
              </RNText>
              <RNText style={[styles.advSub, { color: palette.ink, opacity: 0.6 }]} numberOfLines={1}>
                Zones, rates, duties handled for you
              </RNText>
            </View>
            <Ionicons name="chevron-forward" size={14} color={palette.ink} />
          </View>
        </Tap>
        <Tap scale={1}
          onPress={() => toast('Payouts — coming soon')}
          burstColor={palette.ember}
        >
          <View style={[styles.advRow, { borderColor: palette.line, borderBottomWidth: 0 }]}>
            <Ionicons name="wallet-outline" size={16} color={palette.ink} />
            <View style={{ flex: 1 }}>
              <RNText style={[styles.advTitle, { color: palette.ink }]} numberOfLines={1}>
                Payouts
              </RNText>
              <RNText style={[styles.advSub, { color: palette.ink, opacity: 0.6 }]} numberOfLines={1}>
                Weekly · auto to your bank
              </RNText>
            </View>
            <Ionicons name="chevron-forward" size={14} color={palette.ink} />
          </View>
        </Tap>
      </Section>

      {/* ===== PUBLISH ===== */}
      <View style={styles.publishWrap}>
        <MagneticButton staticPress
          label="PUBLISH CHANGES"
          size="lg"
          background={accent}
          foreground={accentKey === 'acid' ? staticPalette.ink : staticPalette.bone}
          onPress={publish}
          style={{ alignSelf: 'stretch' }}
        />
        <RNText style={[styles.publishHint, { color: palette.ink, opacity: 0.55 }]} numberOfLines={2}>
          Changes go live in seconds. Old version stays cached for 1h in case
          you change your mind.
        </RNText>
      </View>
    </ScreenFrame>
  );
}

/* -----------------------------------------------------------------------
 * Compact-number helper + slim 4-up metric tile
 * --------------------------------------------------------------------- */

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

function SecondaryAction({
  icon,
  label,
  tint,
  tintFg,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  tint: string;
  tintFg: string;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap scale={1}
      style={[styles.ctaSecondary, { borderColor: palette.line, backgroundColor: palette.paper }]}
      onPress={onPress}
      burstColor={tint}
    >
      <View style={[styles.ctaSecondaryIcon, { backgroundColor: tint }]}>
        <Ionicons name={icon} size={12} color={tintFg} />
      </View>
      <RNText style={[styles.ctaSecondaryLabel, { color: palette.ink }]} numberOfLines={1}>
        {label}
      </RNText>
    </Tap>
  );
}

function SlimMetric({
  label,
  value,
  accentColor,
}: {
  label: string;
  value: string;
  accentColor: string;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.slimMetric}>
      <RNText
        style={[styles.slimMetricValue, { color: palette.ink }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        allowFontScaling={false}
      >
        {value}
      </RNText>
      <View style={[styles.slimMetricBar, { backgroundColor: accentColor }]} />
      <RNText
        style={[styles.slimMetricLabel, { color: palette.ink }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        allowFontScaling={false}
      >
        {label}
      </RNText>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Tiny layout diagram used inside layout picker cards
 * --------------------------------------------------------------------- */

function LayoutDiagram({ kind, color }: { kind: LayoutKey; color: string }) {
  if (kind === 'grid') {
    return (
      <View style={diagramStyles.row}>
        <View style={[diagramStyles.cell, { backgroundColor: color }]} />
        <View style={[diagramStyles.cell, { backgroundColor: color }]} />
        <View style={[diagramStyles.cell, { backgroundColor: color }]} />
      </View>
    );
  }
  if (kind === 'stack') {
    return (
      <View style={diagramStyles.col}>
        <View style={[diagramStyles.bar, { backgroundColor: color }]} />
        <View style={[diagramStyles.bar, { backgroundColor: color }]} />
      </View>
    );
  }
  return (
    <View style={diagramStyles.magRow}>
      <View style={[diagramStyles.magHero, { backgroundColor: color }]} />
      <View style={diagramStyles.magSide}>
        <View style={[diagramStyles.magSmall, { backgroundColor: color }]} />
        <View style={[diagramStyles.magSmall, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

const diagramStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 3,
    height: 28,
    alignItems: 'stretch',
  },
  cell: { flex: 1, borderRadius: 3 },
  col: { gap: 3, height: 28, justifyContent: 'center', minWidth: 36 },
  bar: { height: 8, borderRadius: 3, minWidth: 36 },
  magRow: { flexDirection: 'row', gap: 3, height: 28 },
  magHero: { flex: 2, borderRadius: 3 },
  magSide: { flex: 1, gap: 3 },
  magSmall: { flex: 1, borderRadius: 3 },
});

/* -----------------------------------------------------------------------
 * Styles
 * --------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  previewBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* LIVE PREVIEW */
  previewWrap: { marginTop: 4 },
  previewCard: {
    height: 280,
    borderRadius: 24,
    overflow: 'hidden',
  },
  previewScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,10,0.42)',
  },
  previewVideoLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 8,
    opacity: 0.75,
  },
  previewTopBar: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  previewLiveDot: { width: 8, height: 8, borderRadius: 4 },
  previewLiveText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.8,
    color: staticPalette.bone,
    textTransform: 'uppercase',
  },
  previewUrl: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    color: staticPalette.bone,
    opacity: 0.85,
  },
  previewBottom: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    gap: 14,
  },
  previewBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    overflow: 'hidden',
  },
  previewLogoImg: { width: '100%', height: '100%' },
  previewStoreName: {
    fontSize: 30,
    lineHeight: 32,
    letterSpacing: -1.2,
  },
  previewHandle: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    marginTop: 3,
  },
  previewMiniRow: {
    flexDirection: 'row',
    gap: 6,
  },
  previewMiniTile: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewFootRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  previewFootText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    opacity: 0.6,
    textAlign: 'center',
  },
  previewFootDot: { width: 5, height: 5, borderRadius: 3 },

  /* MARQUEE */
  marqueeStrip: {
    marginTop: 16,
    marginHorizontal: -SCREEN_PADDING,
    height: 44,
    overflow: 'hidden',
  },

  /* METRICS — slim 4-up row */
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: palette.line,
  },
  metricDivider: {
    width: 1,
    height: 36,
  },
  slimMetric: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  slimMetricValue: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
    textAlign: 'center',
    width: '100%',
  },
  slimMetricBar: {
    width: 18,
    height: 2,
    borderRadius: 1,
  },
  slimMetricLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '100%',
    opacity: 0.65,
  },

  /* CTAs */
  ctaCol: { marginTop: 18, gap: 10 },
  ctaSecondaryRow: { flexDirection: 'row', gap: 8 },
  ctaSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    paddingHorizontal: 12,
    borderRadius: 26,
    borderWidth: 1,
  },
  ctaSecondaryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSecondaryLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },

  /* CONTROL LABELS shared */
  controlLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    opacity: 0.65,
    marginBottom: 10,
  },

  /* BG MODE */
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: palette.paper,
  },
  modeChipLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },

  /* COVER */
  coverScroll: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
  },
  dropTile: {
    width: 132,
    height: 86,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: palette.paper,
  },
  dropTileLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  dropTileSub: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  coverTile: {
    width: 132,
    height: 86,
    borderRadius: 14,
    overflow: 'hidden',
  },
  coverActiveBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoDrop: {
    width: CONTENT_W - 24,
    height: 110,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: palette.paper,
    marginLeft: SCREEN_PADDING,
  },
  coverColorRow: {
    flexDirection: 'row',
    gap: 10,
    paddingLeft: SCREEN_PADDING,
  },
  coverColorTile: {
    width: 64,
    height: 86,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* LOGO */
  logoRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  logoDrop: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    backgroundColor: palette.paper,
  },
  logoTile: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
  },

  /* FIELD ROW */
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: palette.paper,
  },
  fieldText: {
    flex: 1,
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.4,
  },

  /* SWATCHES */
  swatchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 6,
    textAlign: 'center',
    width: 56,
  },

  /* FONT PICKER */
  fontRow: { flexDirection: 'row', gap: 8 },
  fontCard: {
    height: 110,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 6,
  },
  fontCardLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  layoutCard: {
    height: 96,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 10,
  },

  /* PRODUCTS */
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  productCard: {
    height: 210,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 14,
    justifyContent: 'flex-end',
  },
  productTopRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productAccentBar: { width: 22, height: 3, borderRadius: 2 },
  productMenu: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productIcon: { position: 'absolute', right: 14, top: 40, opacity: 0.92 },
  productName: { fontFamily: fonts.displayBold, fontSize: 19, letterSpacing: -0.4 },
  productMeta: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginTop: 4,
    opacity: 0.7,
  },
  productFootRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  productSoldDot: { width: 5, height: 5, borderRadius: 3 },
  productSold: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  productAddCard: {
    height: 210,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: palette.paper,
  },
  productAddIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productAddLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.3,
  },
  productAddSub: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },

  /* PICKER */
  pickerWrap: {
    marginTop: 14,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
  },
  pickerKicker: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    opacity: 0.65,
  },
  pickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  pickerTile: {
    height: 96,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pickerLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  pickerCost: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  pickerHint: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  /* DESIGNS */
  designScroll: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
  },
  designDrop: {
    width: 132,
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: palette.paper,
  },
  designTile: {
    width: 132,
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  designTileFoot: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10,10,10,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  designTileLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: staticPalette.bone,
    textTransform: 'uppercase',
  },

  /* MOCKUPS */
  mockupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mockupTile: {
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  mockupBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  mockupBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.4,
  },
  mockupFoot: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'rgba(10,10,10,0.5)',
  },
  mockupFootText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    color: staticPalette.bone,
    textTransform: 'uppercase',
  },
  generateRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 48,
    borderRadius: 14,
  },
  generateRowLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },

  /* CHANNELS */
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  channelIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    letterSpacing: -0.3,
  },
  channelUrl: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  channelStatusOn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  channelStatusText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.6,
  },
  toggleTrack: {
    width: 40,
    height: 22,
    borderRadius: 11,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },

  /* PAGES */
  pageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pageTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
  },
  pageLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 13,
    letterSpacing: -0.2,
    flex: 1,
  },
  pageStatus: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  pageStatusText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.4,
  },

  /* ADVANCED */
  advRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  advTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    letterSpacing: -0.2,
  },
  advSub: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },

  /* PUBLISH */
  publishWrap: {
    marginTop: 32,
    gap: 10,
    alignItems: 'stretch',
  },
  publishHint: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 6,
    textAlign: 'center',
  },
});
