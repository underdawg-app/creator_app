import React from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  Dimensions,
  Linking,
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
import { Marquee } from '@/components/ui/Marquee';
import { BadgePill } from '@/components/ui/BadgePill';
import { Image } from '@/components/ui/Image';
import { useStore } from '@/store';
import type {
  StoreHeadingFontKey,
  StoreBodyFontKey,
  StoreAccentKey,
  StoreSection,
} from '@/store';

const { width: SCREEN_W } = Dimensions.get('window');

/* -------------------------------------------------------------------------
 * Font + accent resolvers
 * ----------------------------------------------------------------------- */

const headingFamily = (k: StoreHeadingFontKey) => {
  switch (k) {
    case 'archivo-black':
      return fonts.displayBold;
    case 'archivo-extrabold':
      return fonts.displayHeavy;
    case 'archivo-black-italic':
      return fonts.displayBoldItalic;
    case 'anton':
      return fonts.display;
    case 'instrument-italic':
      return fonts.editorialItalic;
    case 'space-bold':
      return fonts.bodyBold;
    default:
      return fonts.displayBold;
  }
};

const bodyFamily = (k: StoreBodyFontKey) => {
  switch (k) {
    case 'space-regular':
      return fonts.body;
    case 'space-medium':
      return fonts.bodyMedium;
    case 'space-bold':
      return fonts.bodyBold;
    case 'instrument-regular':
      return fonts.editorial;
    default:
      return fonts.body;
  }
};

const accentColor = (k: StoreAccentKey, palette: typeof staticPalette) => {
  switch (k) {
    case 'acid':
      return palette.acid;
    case 'electric':
      return palette.electric;
    case 'blush':
      return palette.blush;
    case 'ember':
      return palette.ember;
    case 'ink':
      return palette.ink;
  }
};

const accentFg = (k: StoreAccentKey, palette: typeof staticPalette) =>
  k === 'acid' ? palette.ink : palette.bone;

/* =========================================================================
 * Screen
 * ======================================================================= */

export default function Store() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const products = useStore((s) => s.products).filter((p) => p.published);
  const profile = useStore((s) => s.profile);
  const sc = useStore((s) => s.storeCustomization);

  const accent = accentColor(sc.accent, palette);
  const accentText = accentFg(sc.accent, palette);
  const heading = headingFamily(sc.headingFont);
  const body = bodyFamily(sc.bodyFont);

  const featuredSection = sc.sections.find((sx) => sx.type === 'featured');
  const featuredProduct =
    products.find((p) => p.id === featuredSection?.featuredProductId) || products[0];
  const otherProducts = products.filter((p) => p.id !== featuredProduct?.id);

  const renderSection = (section: StoreSection) => {
    if (!section.enabled) return null;

    switch (section.type) {
      /* ---------------- MARQUEE ---------------- */
      case 'marquee':
        return (
          <View
            key={section.id}
            style={[styles.marquee, { backgroundColor: accent }]}
          >
            <Marquee
              items={
                section.marqueeItems && section.marqueeItems.length > 0
                  ? section.marqueeItems
                  : ['LIVE · SHIPS WORLDWIDE', 'TAP TO VISIT']
              }
              speed={40}
              separator="   ·   "
              textStyle={{
                fontFamily: fonts.displayBold,
                color: accentText,
                opacity: 0.9,
                fontSize: 22,
                lineHeight: 26,
                letterSpacing: -0.4,
                textTransform: 'uppercase',
                includeFontPadding: false,
              }}
              style={{ height: 30 }}
            />
          </View>
        );

      /* ---------------- HERO ---------------- */
      case 'hero':
        return (
          <View key={section.id} style={styles.heroWrap}>
            {sc.backgroundMode === 'image' && sc.backgroundValue ? (
              <Image source={{ uri: sc.backgroundValue }} style={styles.heroBg} />
            ) : null}
            {sc.backgroundMode === 'color' ? (
              <View style={[styles.heroBg, { backgroundColor: sc.backgroundValue || palette.ink }]} />
            ) : null}
            <View style={styles.heroScrim} />

            <View style={styles.heroContent}>
              {sc.logo ? (
                <Image source={{ uri: sc.logo }} style={styles.heroLogo} />
              ) : null}

              <RNText style={[styles.eyebrow, { color: palette.bone, opacity: 0.6 }]}>
                {(section.eyebrow || 'STOREFRONT').toUpperCase()} · {profile.handle}
              </RNText>

              <RNText
                style={[styles.heroTitle, { fontFamily: heading, color: palette.bone }]}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                maxFontSizeMultiplier={1.1}
              >
                {section.title || sc.storeName}
              </RNText>

              {(section.body || sc.tagline) ? (
                <RNText
                  style={[styles.heroTagline, { fontFamily: body, color: palette.bone, opacity: 0.85 }]}
                  numberOfLines={3}
                  maxFontSizeMultiplier={1.2}
                >
                  {section.body || sc.tagline}
                </RNText>
              ) : null}

              <View style={styles.heroPills}>
                <BadgePill label="IN-APP" accent={palette.acid} />
                {sc.siteEnabled ? <BadgePill label="STANDALONE" accent={palette.electric} /> : null}
              </View>

              <Tap
                onPress={() => router.push('/(modules)/merch')}
                burstColor={accent}
                style={[styles.heroCta, { backgroundColor: accent }]}
              >
                <RNText style={[styles.heroCtaLabel, { color: accentText, fontFamily: fonts.bodyBold }]}>
                  {section.ctaLabel || 'SHOP THE DROP'}
                </RNText>
                <Ionicons name="arrow-forward" size={16} color={accentText} />
              </Tap>
            </View>
          </View>
        );

      /* ---------------- FEATURED ---------------- */
      case 'featured':
        if (!featuredProduct) return null;
        return (
          <View key={section.id} style={styles.sectionWrap}>
            <RNText style={[styles.eyebrow, { color: palette.ink, opacity: 0.55 }]}>
              {(section.eyebrow || 'FEATURED').toUpperCase()}
            </RNText>
            <Tap
              onPress={() => {}}
              burstColor={featuredProduct.color}
              style={{ marginTop: 10 }}
            >
              <TiltCard
                style={[styles.featuredCard, { backgroundColor: featuredProduct.bg }] as any}
                maxTilt={5}
              >
                <View style={{ position: 'absolute', right: 20, top: 20, opacity: 0.95 }}>
                  <ProductIcon type={featuredProduct.type} size={120} color={featuredProduct.fg} />
                </View>
                <View>
                  <RNText
                    style={[styles.featuredLabel, { color: featuredProduct.fg, opacity: 0.55 }]}
                  >
                    {(section.featuredLabel || 'NEW · LIMITED').toUpperCase()}
                  </RNText>
                  <RNText
                    style={[styles.featuredName, { color: featuredProduct.fg, fontFamily: heading }]}
                    numberOfLines={2}
                    maxFontSizeMultiplier={1.1}
                  >
                    {featuredProduct.name}
                  </RNText>
                  <RNText
                    style={[styles.featuredPrice, { color: featuredProduct.fg, fontFamily: heading }]}
                  >
                    ₹{featuredProduct.baseCost + featuredProduct.margin}
                  </RNText>
                </View>
              </TiltCard>
            </Tap>
          </View>
        );

      /* ---------------- GRID ---------------- */
      case 'grid':
        return (
          <View key={section.id} style={styles.sectionWrap}>
            <View style={styles.gridHeader}>
              <RNText style={[styles.eyebrow, { color: palette.ink, opacity: 0.55 }]}>
                {(section.title || 'ALL PRODUCTS').toUpperCase()}
              </RNText>
              <RNText style={[styles.gridCount, { color: palette.ink, opacity: 0.55 }]}>
                {products.length} ITEMS
              </RNText>
            </View>

            {sc.layout === 'stack' ? (
              <View style={{ marginTop: 12, gap: 10 }}>
                {otherProducts.map((p) => (
                  <Tap key={p.id} onPress={() => {}} burstColor={p.color}>
                    <TiltCard
                      style={[styles.stackCard, { backgroundColor: p.bg }] as any}
                      maxTilt={3}
                    >
                      <ProductIcon type={p.type} size={56} color={p.fg} />
                      <View style={{ flex: 1, marginLeft: 16 }}>
                        <RNText
                          style={[styles.stackName, { color: p.fg, fontFamily: heading }]}
                          numberOfLines={1}
                        >
                          {p.name}
                        </RNText>
                        <RNText
                          style={[styles.stackPrice, { color: p.fg, opacity: 0.7 }]}
                        >
                          ₹{p.baseCost + p.margin}
                        </RNText>
                      </View>
                      <Ionicons name="arrow-forward" size={20} color={p.fg} />
                    </TiltCard>
                  </Tap>
                ))}
              </View>
            ) : sc.layout === 'mag' ? (
              <View style={{ marginTop: 12, gap: 10 }}>
                {otherProducts.map((p, idx) => (
                  <Tap key={p.id} onPress={() => {}} burstColor={p.color}>
                    <TiltCard
                      style={[
                        styles.magCard,
                        { backgroundColor: p.bg, minHeight: idx % 2 === 0 ? 200 : 140 },
                      ] as any}
                      maxTilt={4}
                    >
                      <View style={{ position: 'absolute', right: 14, top: 14, opacity: 0.92 }}>
                        <ProductIcon type={p.type} size={80} color={p.fg} />
                      </View>
                      <View style={{ position: 'absolute', left: 14, bottom: 14 }}>
                        <RNText
                          style={[styles.name, { color: p.fg, fontFamily: heading }]}
                          numberOfLines={1}
                        >
                          {p.name}
                        </RNText>
                        <RNText style={[styles.price, { color: p.fg }]}>
                          ₹{p.baseCost + p.margin}
                        </RNText>
                      </View>
                    </TiltCard>
                  </Tap>
                ))}
              </View>
            ) : (
              <View style={styles.grid}>
                {otherProducts.map((p) => (
                  <Tap
                    key={p.id}
                    onPress={() => {}}
                    burstColor={p.color}
                    style={{ flexBasis: '48%' }}
                  >
                    <TiltCard
                      style={[styles.card, { backgroundColor: p.bg }] as any}
                      maxTilt={4}
                    >
                      <View style={styles.cardIcon}>
                        <ProductIcon type={p.type} size={64} color={p.fg} />
                      </View>
                      <View>
                        <RNText
                          style={[styles.name, { color: p.fg, fontFamily: heading }]}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          minimumFontScale={0.8}
                          maxFontSizeMultiplier={1.1}
                        >
                          {p.name}
                        </RNText>
                        <RNText style={[styles.price, { color: p.fg }]} maxFontSizeMultiplier={1.1}>
                          ₹{p.baseCost + p.margin}
                        </RNText>
                      </View>
                    </TiltCard>
                  </Tap>
                ))}
              </View>
            )}
          </View>
        );

      /* ---------------- ABOUT ---------------- */
      case 'about':
        return (
          <View key={section.id} style={[styles.sectionWrap, styles.aboutWrap]}>
            <RNText style={[styles.eyebrow, { color: accent }]}>
              {(section.title || 'ABOUT THE STORE').toUpperCase()}
            </RNText>
            <RNText
              style={[
                styles.aboutBody,
                { fontFamily: body, color: palette.ink },
              ]}
              maxFontSizeMultiplier={1.2}
            >
              {section.body || ''}
            </RNText>
          </View>
        );

      /* ---------------- SHIPPING ---------------- */
      case 'shipping':
        return (
          <View key={section.id} style={[styles.sectionWrap, styles.infoCardWrap]}>
            <View style={[styles.infoCard, { borderColor: palette.line }]}>
              <Ionicons name="cube-outline" size={22} color={accent} />
              <RNText style={[styles.infoTitle, { fontFamily: heading, color: palette.ink }]}>
                {(section.title || 'SHIPPING').toUpperCase()}
              </RNText>
              <RNText style={[styles.infoBody, { fontFamily: body, color: palette.ink, opacity: 0.7 }]}>
                {section.body || ''}
              </RNText>
            </View>
          </View>
        );

      /* ---------------- FAQ ---------------- */
      case 'faq':
        return (
          <View key={section.id} style={styles.sectionWrap}>
            <RNText style={[styles.eyebrow, { color: palette.ink, opacity: 0.55 }]}>
              {(section.title || 'FAQ').toUpperCase()}
            </RNText>
            <View style={{ marginTop: 12, gap: 10 }}>
              {(section.items || []).map((q, i) => (
                <View
                  key={`${section.id}-q-${i}`}
                  style={[styles.faqCard, { borderColor: palette.line }]}
                >
                  <RNText style={[styles.faqQ, { fontFamily: heading, color: palette.ink }]}>
                    {q.q}
                  </RNText>
                  <RNText
                    style={[styles.faqA, { fontFamily: body, color: palette.ink, opacity: 0.7 }]}
                  >
                    {q.a}
                  </RNText>
                </View>
              ))}
            </View>
          </View>
        );

      /* ---------------- CONTACT ---------------- */
      case 'contact': {
        const socialChips: { icon: any; label: string; url: string }[] = [];
        if (section.instagram) {
          const h = section.instagram.replace(/^@/, '');
          socialChips.push({ icon: 'logo-instagram', label: `@${h}`, url: `https://instagram.com/${h}` });
        }
        if (section.twitter) {
          const h = section.twitter.replace(/^@/, '');
          socialChips.push({ icon: 'logo-twitter', label: `@${h}`, url: `https://twitter.com/${h}` });
        }
        if (section.whatsapp) {
          const num = section.whatsapp.replace(/[^\d+]/g, '');
          socialChips.push({ icon: 'logo-whatsapp', label: section.whatsapp, url: `https://wa.me/${num}` });
        }
        return (
          <View key={section.id} style={[styles.sectionWrap, styles.contactWrap]}>
            <RNText style={[styles.eyebrow, { color: accent }]}>
              {(section.title || 'GET IN TOUCH').toUpperCase()}
            </RNText>
            <Tap
              onPress={() => {
                const email = section.email || 'hi@store.com';
                Linking.openURL(`mailto:${email}`).catch(() => {});
              }}
              burstColor={accent}
              style={[styles.contactCta, { borderColor: accent }]}
            >
              <Ionicons name="mail-outline" size={18} color={accent} />
              <RNText style={[styles.contactEmail, { fontFamily: heading, color: palette.ink }]}>
                {section.email || 'hi@store.com'}
              </RNText>
            </Tap>
            {socialChips.length > 0 ? (
              <View style={styles.socialRow}>
                {socialChips.map((s) => (
                  <Tap
                    key={s.label}
                    onPress={() => Linking.openURL(s.url).catch(() => {})}
                    burstColor={accent}
                    style={[styles.socialChip, { borderColor: palette.line }]}
                  >
                    <Ionicons name={s.icon} size={14} color={palette.ink} />
                    <RNText
                      style={[styles.socialLabel, { color: palette.ink, fontFamily: fonts.bodyBold }]}
                      numberOfLines={1}
                    >
                      {s.label}
                    </RNText>
                  </Tap>
                ))}
              </View>
            ) : null}
          </View>
        );
      }

      /* ---------------- FOOTER ---------------- */
      case 'footer': {
        const copyright =
          section.copyright ||
          `© ${sc.storeName.toLowerCase().replace(/\.store$/i, '')}.store`;
        const tagline = section.footerTagline || 'POWERED BY UNDERDAWG · MMXXVI';
        return (
          <View key={section.id} style={[styles.footer, { backgroundColor: palette.ink }]}>
            <View style={styles.footerRow}>
              {sc.logo ? <Image source={{ uri: sc.logo }} style={styles.footerLogo} /> : null}
              <RNText
                style={[styles.footerName, { fontFamily: heading, color: palette.bone }]}
                numberOfLines={1}
              >
                {sc.storeName}
              </RNText>
            </View>
            <RNText style={[styles.footerMeta, { fontFamily: body, color: palette.bone, opacity: 0.55 }]}>
              {tagline.toUpperCase()}
            </RNText>
            <RNText style={[styles.footerMeta, { fontFamily: body, color: palette.bone, opacity: 0.4, marginTop: 4 }]}>
              {copyright}
            </RNText>
          </View>
        );
      }

      default:
        return null;
    }
  };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="MERCH" title="YOUR STORE" />}
      padding={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {sc.sections.map(renderSection)}
      </ScrollView>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------------
 * Styles
 * ----------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    /* marquee */
    marquee: {
      paddingVertical: 16,
    },

    /* hero */
    heroWrap: {
      height: 420,
      width: SCREEN_W,
      backgroundColor: palette.ink,
      position: 'relative',
      overflow: 'hidden',
    },
    heroBg: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
    heroScrim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(10,10,10,0.55)',
    },
    heroContent: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 28,
      paddingBottom: 26,
      justifyContent: 'flex-end',
    },
    heroLogo: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: 'rgba(242,239,230,0.5)',
      marginBottom: 16,
    },
    eyebrow: {
      ...T.label,
    },
    heroTitle: {
      fontSize: 52,
      lineHeight: 52,
      letterSpacing: -2,
      marginTop: 8,
      textTransform: 'uppercase',
    },
    heroTagline: {
      fontSize: 15,
      lineHeight: 21,
      marginTop: 10,
      maxWidth: 320,
    },
    heroPills: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 14,
    },
    heroCta: {
      marginTop: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      paddingHorizontal: 22,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    heroCtaLabel: {
      fontSize: 12,
      letterSpacing: 2.4,
      textTransform: 'uppercase',
    },

    /* section base */
    sectionWrap: {
      paddingHorizontal: 12,
      paddingTop: 24,
    },

    /* featured */
    featuredCard: {
      height: 240,
      borderRadius: 22,
      overflow: 'hidden',
      padding: 20,
      justifyContent: 'flex-end',
    },
    featuredLabel: {
      ...T.label,
    },
    featuredName: {
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -1,
      marginTop: 4,
      textTransform: 'uppercase',
    },
    featuredPrice: {
      fontSize: 22,
      marginTop: 6,
      letterSpacing: -0.8,
    },

    /* grid */
    gridHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    gridCount: {
      ...T.micro,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 12,
    },
    card: {
      height: 220,
      borderRadius: 20,
      overflow: 'hidden',
      padding: 14,
      justifyContent: 'flex-end',
    },
    cardIcon: { position: 'absolute', right: 14, top: 14, opacity: 0.92 },
    name: { fontSize: 20, letterSpacing: -0.5, textTransform: 'uppercase' },
    price: { ...T.micro, marginTop: 4, opacity: 0.7 },

    /* stack layout */
    stackCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 16,
    },
    stackName: {
      fontSize: 18,
      letterSpacing: -0.4,
      textTransform: 'uppercase',
    },
    stackPrice: {
      ...T.label,
      marginTop: 4,
    },

    /* mag layout */
    magCard: {
      borderRadius: 18,
      overflow: 'hidden',
      position: 'relative',
    },

    /* about */
    aboutWrap: {
      paddingHorizontal: 20,
      paddingTop: 32,
    },
    aboutBody: {
      fontSize: 16,
      lineHeight: 24,
      marginTop: 10,
    },

    /* info card (shipping) */
    infoCardWrap: {
      paddingHorizontal: 12,
    },
    infoCard: {
      borderRadius: 14,
      borderWidth: 1,
      padding: 18,
      gap: 8,
    },
    infoTitle: {
      fontSize: 18,
      letterSpacing: -0.4,
      textTransform: 'uppercase',
    },
    infoBody: {
      fontSize: 14,
      lineHeight: 20,
    },

    /* faq */
    faqCard: {
      borderRadius: 12,
      borderWidth: 1,
      padding: 14,
    },
    faqQ: {
      fontSize: 14,
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    faqA: {
      fontSize: 13,
      lineHeight: 18,
      marginTop: 6,
    },

    /* contact */
    contactWrap: {
      paddingHorizontal: 12,
    },
    contactCta: {
      marginTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderRadius: 12,
      borderWidth: 1.5,
      alignSelf: 'flex-start',
    },
    contactEmail: {
      fontSize: 14,
      letterSpacing: -0.2,
      textTransform: 'uppercase',
    },
    socialRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 12,
    },
    socialChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 999,
      borderWidth: 1,
    },
    socialLabel: {
      fontSize: 11,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    },

    /* footer */
    footer: {
      marginTop: 32,
      paddingHorizontal: 20,
      paddingVertical: 28,
    },
    footerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8,
    },
    footerLogo: {
      width: 28,
      height: 28,
      borderRadius: 14,
    },
    footerName: {
      fontSize: 18,
      letterSpacing: -0.3,
      textTransform: 'uppercase',
    },
    footerMeta: {
      ...T.micro,
    },
  });
