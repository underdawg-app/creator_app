import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  TextInput,
} from 'react-native';
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
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

type Designer = {
  id: string;
  handle: string;
  name: string;
  specialty: 'LOGO' | 'APPAREL' | 'ILLUSTRATION';
  rateRange: string;
  rating: number;
  reviews: number;
  accent: keyof typeof staticPalette;
};

const DESIGNERS: Designer[] = [
  {
    id: 'd1',
    handle: '@inkwellrao',
    name: 'Meera Rao',
    specialty: 'LOGO',
    rateRange: '₹2,000–8,000',
    rating: 4.9,
    reviews: 128,
    accent: 'electric',
  },
  {
    id: 'd2',
    handle: '@threadlab',
    name: 'Dev Kapoor',
    specialty: 'APPAREL',
    rateRange: '₹3,500–14,000',
    rating: 4.8,
    reviews: 86,
    accent: 'ember',
  },
  {
    id: 'd3',
    handle: '@pencilstorm',
    name: 'Anaya Sharma',
    specialty: 'ILLUSTRATION',
    rateRange: '₹4,000–22,000',
    rating: 5.0,
    reviews: 54,
    accent: 'blush',
  },
  {
    id: 'd4',
    handle: '@markmuse',
    name: 'Ravi Nair',
    specialty: 'LOGO',
    rateRange: '₹1,500–6,000',
    rating: 4.7,
    reviews: 203,
    accent: 'acid',
  },
];

const FILTERS = ['ALL', 'LOGO', 'APPAREL', 'ILLUSTRATION'] as const;
type Filter = (typeof FILTERS)[number];

export default function MerchDesigners() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [filter, setFilter] = useState<Filter>('ALL');
  const [quoteFor, setQuoteFor] = useState<Designer | null>(null);
  const [brief, setBrief] = useState('');
  const [budget, setBudget] = useState('');

  const list = useMemo(
    () =>
      filter === 'ALL'
        ? DESIGNERS
        : DESIGNERS.filter((d) => d.specialty === filter),
    [filter],
  );

  const closeQuote = () => {
    setQuoteFor(null);
    setBrief('');
    setBudget('');
  };

  const sendQuote = () => {
    closeQuote();
    toast('Quote requested.', 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MERCH" title="DESIGNERS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        hire a designer.
      </RNText>

      {/* Intro: free vs paid */}
      <View style={styles.introCard}>
        <RNText style={styles.introBody}>
          Free AI mockups get you a starting point in seconds. A pro designer
          builds something nobody else has — print-ready and yours.
        </RNText>
        <Pressable onPress={() => router.push('/(modules)/merch/mockup')} style={styles.introLink}>
          <Ionicons name="sparkles-outline" size={14} color={palette.electric} />
          <RNText style={styles.introLinkText}>Try AI mockups instead</RNText>
          <Ionicons name="arrow-forward" size={14} color={palette.electric} />
        </Pressable>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
        ))}
      </View>

      {/* Designer cards */}
      <Section eyebrow={`${list.length} AVAILABLE`} title="the bench.">
        <View style={{ gap: 12, marginTop: 2 }}>
          {list.map((d) => {
            const accent = palette[d.accent] as string;
            return (
              <View key={d.id} style={styles.card}>
                <View style={styles.cardHead}>
                  <View style={{ flex: 1 }}>
                    <RNText style={styles.name} numberOfLines={1}>
                      {d.name}
                    </RNText>
                    <RNText style={styles.handle}>{d.handle}</RNText>
                  </View>
                  <View style={[styles.specPill, { backgroundColor: accent }]}>
                    <RNText
                      style={[
                        styles.specText,
                        { color: d.accent === 'acid' ? palette.ink : palette.bone },
                      ]}
                    >
                      {d.specialty}
                    </RNText>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="pricetag-outline" size={13} color={palette.inkMuted} />
                    <RNText style={styles.metaText}>{d.rateRange}</RNText>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={13} color={palette.acid} />
                    <RNText style={styles.metaText}>
                      {d.rating.toFixed(1)} · {d.reviews} reviews
                    </RNText>
                  </View>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => setQuoteFor(d)}
                    style={styles.quoteBtn}
                  >
                    <RNText style={styles.quoteText}>REQUEST QUOTE</RNText>
                  </Pressable>
                  <Tap
                    onPress={() => toast("Designer hired — they'll be in touch.", 'success')}
                    style={styles.hireBtn}
                    burstColor={palette.bone}
                  >
                    <RNText style={styles.hireText}>HIRE</RNText>
                    <View style={styles.hireArrow}>
                      <Ionicons name="arrow-forward" size={13} color={palette.ink} />
                    </View>
                  </Tap>
                </View>
              </View>
            );
          })}
        </View>
      </Section>

      {/* Quote sheet */}
      <Sheet
        visible={!!quoteFor}
        onClose={closeQuote}
        eyebrow={quoteFor ? quoteFor.handle.toUpperCase() : ''}
        title="request a quote."
      >
        <RNText style={styles.sheetLabel}>THE BRIEF</RNText>
        <TextInput
          value={brief}
          onChangeText={setBrief}
          placeholder="Logo for a streetwear drop, bold + minimal…"
          placeholderTextColor={palette.inkMuted}
          style={styles.briefInput}
          multiline
        />

        <RNText style={[styles.sheetLabel, { marginTop: 16 }]}>BUDGET (₹)</RNText>
        <TextInput
          value={budget}
          onChangeText={setBudget}
          placeholder="e.g. 6,000"
          placeholderTextColor={palette.inkMuted}
          keyboardType="numeric"
          style={styles.budgetInput}
        />

        <Tap onPress={sendQuote} style={styles.sheetCta} burstColor={palette.bone}>
          <RNText style={styles.sheetCtaText}>SEND REQUEST</RNText>
          <View style={styles.hireArrow}>
            <Ionicons name="send" size={13} color={palette.ink} />
          </View>
        </Tap>
        <Pressable onPress={closeQuote} style={styles.sheetCancel}>
          <RNText style={styles.sheetCancelText}>CANCEL</RNText>
        </Pressable>
      </Sheet>
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
      marginBottom: 16,
    },

    introCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 12,
    },
    introBody: { ...T.body, color: palette.ink, lineHeight: 20 },
    introLink: { flexDirection: 'row', alignItems: 'center', gap: 7 },
    introLinkText: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: -0.1,
      color: palette.electric,
    },

    filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18 },

    card: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 14,
    },
    cardHead: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    name: { fontFamily: fonts.displayBold, fontSize: 20, letterSpacing: -0.6, color: palette.ink },
    handle: { ...T.small, color: palette.inkMuted, marginTop: 2 },
    specPill: { paddingHorizontal: 11, height: 26, borderRadius: 13, justifyContent: 'center' },
    specText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.2 },

    metaRow: { gap: 8 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 7 },
    metaText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: palette.ink },

    actions: { flexDirection: 'row', gap: 10 },
    quoteBtn: {
      flex: 1,
      height: 46,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    quoteText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.4, color: palette.ink },
    hireBtn: {
      flex: 1,
      height: 46,
      borderRadius: 14,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    hireText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.6, color: palette.bone },
    hireArrow: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    sheetLabel: { ...T.label, color: palette.inkMuted, marginBottom: 8 },
    briefInput: {
      minHeight: 88,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 14,
      paddingTop: 12,
      paddingBottom: 12,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      textAlignVertical: 'top',
    },
    budgetInput: {
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 14,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
    },
    sheetCta: {
      marginTop: 20,
      height: 58,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    sheetCtaText: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2, color: palette.bone },
    sheetCancel: { marginTop: 10, height: 44, alignItems: 'center', justifyContent: 'center' },
    sheetCancelText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.inkMuted },
  });
