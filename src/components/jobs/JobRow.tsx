import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  Pressable,
} from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import type { Job } from '@/data/mock';

/* -------------------------------------------------------------------------
 * Helpers — derive the Upwork-style metadata from our Job seed shape
 * ----------------------------------------------------------------------- */

export function formatBudget(n: number) {
  if (n >= 100000) {
    const v = n / 100000;
    return `${v.toFixed(v % 1 === 0 ? 0 : 1)}L`;
  }
  return `${Math.round(n / 1000)}K`;
}

// Stable per-job posted-ago string — derived from the job id so the order
// stays the same across renders without us needing a real `createdAt`.
export function postedAgo(id: string) {
  switch (id) {
    case 'j1': return '1 hour ago';
    case 'j2': return '3 hours ago';
    case 'j3': return '13 hours ago';
    case 'j4': return 'yesterday';
    case 'j5': return '2 days ago';
    case 'j6': return '4 days ago';
    default: return '1 day ago';
  }
}

export function proposalRange(n: number) {
  if (n >= 50) return '50+';
  if (n >= 30) return '30 to 50';
  if (n >= 20) return '20 to 30';
  if (n >= 10) return '10 to 20';
  if (n >= 5) return '5 to 10';
  return 'less than 5';
}

export function experienceLevel(budgetMax: number) {
  if (budgetMax >= 200000) return 'Expert';
  if (budgetMax >= 80000) return 'Intermediate';
  return 'Entry';
}

export function spentValueOf(job: Job) {
  const max = job.budgetMax;
  if (max >= 400000) return '₹2L+';
  if (max >= 100000) return '₹50K+';
  if (max >= 50000) return '₹10K+';
  return '₹0';
}

export function spentLabelOf(_job: Job) {
  return 'spent';
}

export function payLine(job: Job) {
  const range = `₹${formatBudget(job.budgetMin)}–${formatBudget(job.budgetMax)}`;
  const isHourly = job.type === 'PRODUCT REVIEW' || job.type === 'UGC CREATION';
  const head = isHourly ? `Hourly: ${range}` : `Fixed-price · Est. ${range}`;
  const exp = experienceLevel(job.budgetMax);
  return `${head}  ·  ${exp}`;
}

export function jobTags(job: Job): string[] {
  const tags = new Set<string>([job.niche]);
  const t = job.type;
  if (t.includes('VIDEO')) {
    tags.add('Video Editing');
    tags.add('Reels');
  }
  if (t.includes('UGC')) {
    tags.add('UGC');
    tags.add('Storytelling');
  }
  if (t.includes('SPONSORED')) {
    tags.add('Content Creation');
    tags.add('Brand Posts');
  }
  if (t.includes('AMBASSADOR')) {
    tags.add('Long-form');
    tags.add('Retainer');
  }
  if (t.includes('PRODUCT REVIEW')) {
    tags.add('Review Videos');
    tags.add('Honest Reviews');
  }
  if (t.includes('GET VIRAL')) {
    tags.add('Coordinated Drop');
    tags.add('Multi-creator');
  }
  return Array.from(tags).slice(0, 5);
}

export function isFeatured(id: string) {
  return id === 'j2' || id === 'j5';
}

export function prettyLocation(loc: string) {
  return loc
    .split(/\s*[·,]\s*|\s+/)
    .map((p) => (p.length <= 3 ? p : p.charAt(0) + p.slice(1).toLowerCase()))
    .join(' ');
}

/* -------------------------------------------------------------------------
 * Job row — full-width, hairline-separated, Upwork-style
 * ----------------------------------------------------------------------- */

type JobRowProps = {
  job: Job;
  isFirst?: boolean;
  saved: boolean;
  onSave: () => void;
  onHide?: () => void;
};

export function JobRow({ job, isFirst, saved, onSave, onHide }: JobRowProps) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [expanded, setExpanded] = useState(false);

  const posted = postedAgo(job.id);
  const featured = isFeatured(job.id);
  const tags = jobTags(job);
  const stars = job.verified ? 5 : 0;

  return (
    <View style={[styles.row, !isFirst && styles.rowBorderTop]}>
      <View style={styles.metaRow}>
        {featured ? (
          <View style={styles.featuredRow}>
            <View style={styles.featuredBadge}>
              <Ionicons name="ribbon" size={11} color={staticPalette.bone} />
            </View>
            <RNText style={styles.featuredLabel} maxFontSizeMultiplier={1.1}>
              Featured
            </RNText>
            <RNText style={styles.metaDot}>·</RNText>
            <RNText style={styles.metaText} maxFontSizeMultiplier={1.1}>
              Posted {posted}
            </RNText>
            <RNText style={styles.metaDot}>·</RNText>
            <RNText style={styles.metaText} maxFontSizeMultiplier={1.1}>
              Proposals: {proposalRange(job.applicants)}
            </RNText>
          </View>
        ) : (
          <View style={styles.metaChip}>
            <RNText style={styles.metaChipText} maxFontSizeMultiplier={1.1}>
              Posted {posted}  ·  Proposals: {proposalRange(job.applicants)}
            </RNText>
          </View>
        )}
      </View>

      <View style={styles.titleRow}>
        <Tap
          onPress={() => router.push(`/(modules)/jobs/${job.id}` as any)}
          burstColor={palette.acid}
          style={{ flex: 1 }}
        >
          <RNText
            style={styles.title}
            numberOfLines={2}
            maxFontSizeMultiplier={1.1}
          >
            {job.title}
          </RNText>
        </Tap>
        {onHide ? (
          <Pressable onPress={onHide} hitSlop={10} style={styles.iconGhost}>
            <Ionicons name="thumbs-down-outline" size={20} color={palette.ink} />
          </Pressable>
        ) : null}
        <Pressable onPress={onSave} hitSlop={10} style={styles.iconGhost}>
          <Ionicons
            name={saved ? 'heart' : 'heart-outline'}
            size={22}
            color={saved ? palette.ember : palette.ink}
          />
        </Pressable>
      </View>

      <RNText style={styles.payLine} maxFontSizeMultiplier={1.15}>
        {payLine(job)}
      </RNText>

      <RNText
        style={styles.description}
        numberOfLines={expanded ? undefined : 2}
        maxFontSizeMultiplier={1.2}
      >
        {job.description}
      </RNText>
      <Pressable onPress={() => setExpanded((v) => !v)} hitSlop={6}>
        <RNText style={styles.moreLink} maxFontSizeMultiplier={1.15}>
          {expanded ? 'less' : 'more'}
        </RNText>
      </Pressable>

      <View style={styles.tagsWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsRow}
        >
          {tags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <RNText style={styles.tagLabel} maxFontSizeMultiplier={1.1}>
                {tag}
              </RNText>
            </View>
          ))}
        </ScrollView>
        <View style={styles.tagsScrim} pointerEvents="none" />
        <View style={styles.tagsChev}>
          <Ionicons name="chevron-forward" size={14} color={palette.ink} />
        </View>
      </View>

      <View style={styles.trustRow}>
        <View style={styles.verifyBlock}>
          {job.verified ? (
            <View style={[styles.verifyBadge, { backgroundColor: palette.electric }]}>
              <Ionicons name="checkmark" size={10} color={palette.bone} />
            </View>
          ) : (
            <View style={[styles.verifyBadge, { backgroundColor: palette.line }]}>
              <Ionicons name="checkmark" size={10} color={palette.ink} />
            </View>
          )}
          <RNText style={styles.verifyLabel} maxFontSizeMultiplier={1.1}>
            {job.verified ? 'Payment verified' : 'Payment unverified'}
          </RNText>
        </View>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Ionicons
              key={s}
              name="star"
              size={11}
              color={s <= stars ? palette.ember : palette.line}
              style={styles.star}
            />
          ))}
        </View>
      </View>

      <View style={styles.spentRow}>
        <View style={styles.spentItem}>
          <RNText style={styles.spentValue} maxFontSizeMultiplier={1.15}>
            {spentValueOf(job)}
          </RNText>
          <RNText style={styles.spentLabel} maxFontSizeMultiplier={1.15}>
            {` ${spentLabelOf(job)}`}
          </RNText>
        </View>
        <View style={styles.locationItem}>
          <Ionicons name="location-outline" size={13} color={palette.ink} />
          <RNText style={styles.locationText} maxFontSizeMultiplier={1.15}>
            {prettyLocation(job.location)}
          </RNText>
        </View>
      </View>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    row: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 22,
      gap: 10,
    },
    rowBorderTop: {
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    metaChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      backgroundColor: 'rgba(46,91,255,0.16)',
      alignSelf: 'flex-start',
    },
    metaChipText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 0.1,
      color: palette.electric,
    },
    featuredRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
    },
    featuredBadge: {
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    featuredLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 0.2,
      color: palette.ink,
    },
    metaDot: {
      ...T.body,
      color: palette.ink,
      opacity: 0.6,
      paddingHorizontal: 2,
    },
    metaText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.7,
      fontSize: 13,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      marginTop: 2,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 26,
      letterSpacing: -0.6,
      color: palette.ink,
    },
    iconGhost: {
      width: 38,
      height: 38,
      alignItems: 'center',
      justifyContent: 'center',
    },
    payLine: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      lineHeight: 18,
      color: palette.ink,
      opacity: 0.75,
      marginTop: 2,
    },
    description: {
      ...T.body,
      color: palette.ink,
      opacity: 0.85,
      lineHeight: 20,
      marginTop: 4,
    },
    moreLink: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      color: palette.ink,
      textDecorationLine: 'underline',
      marginTop: 2,
    },
    tagsWrap: {
      marginTop: 8,
      position: 'relative',
    },
    tagsRow: {
      gap: 8,
      paddingRight: 32,
    },
    tagChip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: palette.boneMuted,
    },
    tagLabel: {
      fontFamily: fonts.body,
      fontSize: 13,
      color: palette.ink,
      opacity: 0.85,
    },
    tagsScrim: {
      position: 'absolute',
      right: 22,
      top: 0,
      bottom: 0,
      width: 24,
    },
    tagsChev: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    trustRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      marginTop: 10,
    },
    verifyBlock: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    verifyBadge: {
      width: 18,
      height: 18,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    verifyLabel: {
      ...T.body,
      color: palette.ink,
      opacity: 0.85,
      fontSize: 13,
    },
    starsRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    star: {},
    spentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 22,
      marginTop: 6,
    },
    spentItem: { flexDirection: 'row', alignItems: 'baseline' },
    spentValue: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      color: palette.ink,
    },
    spentLabel: {
      ...T.body,
      color: palette.ink,
      opacity: 0.85,
      fontSize: 13,
    },
    locationItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    locationText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.85,
      fontSize: 13,
    },
  });
