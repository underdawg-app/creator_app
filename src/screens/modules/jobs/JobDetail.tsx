import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import {
  useThemedPalette,
  useThemedPaletteStyles,
} from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { Tap } from '@/components/ui/Tap';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';

/* -------------------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------------------- */

const formatINR = (n: number) =>
  n >= 100000
    ? `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1).replace(/\.?0+$/, '')}L`
    : `${Math.round(n / 1000)}K`;

const daysUntil = (iso: string) => {
  const target = new Date(iso).getTime();
  return Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24));
};

function experienceLevel(budgetMax: number) {
  if (budgetMax >= 200000) return 'Expert';
  if (budgetMax >= 80000) return 'Intermediate';
  return 'Entry';
}

function postedAgo(id: string) {
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

function proposalRange(n: number) {
  if (n >= 50) return '50+';
  if (n >= 30) return '30 to 50';
  if (n >= 20) return '20 to 30';
  if (n >= 10) return '10 to 20';
  if (n >= 5) return '5 to 10';
  return 'less than 5';
}

function jobTags(niche: string, type: string): string[] {
  const tags = new Set<string>([niche]);
  if (type.includes('VIDEO')) { tags.add('Video Editing'); tags.add('Reels'); }
  if (type.includes('UGC')) { tags.add('UGC'); tags.add('Storytelling'); }
  if (type.includes('SPONSORED')) { tags.add('Content Creation'); tags.add('Brand Posts'); }
  if (type.includes('AMBASSADOR')) { tags.add('Long-form'); tags.add('Retainer'); }
  if (type.includes('PRODUCT REVIEW')) { tags.add('Review Videos'); tags.add('Honest Reviews'); }
  if (type.includes('GET VIRAL')) { tags.add('Coordinated Drop'); tags.add('Multi-creator'); }
  return Array.from(tags).slice(0, 6);
}

/* -------------------------------------------------------------------------
 * Screen
 * ----------------------------------------------------------------------- */

export default function JobDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = jobsSeed.find((j) => j.id === id);
  const applied = useStore((s) => s.applications.some((a) => a.jobId === id));
  const toast = useStore((s) => s.toast);
  const [saved, setSaved] = useState(false);

  if (!job) {
    return (
      <View style={styles.root}>
        <SafeAreaView edges={['top']} style={styles.headerSafe}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={6}>
              <Ionicons name="arrow-back" size={18} color={palette.ink} />
            </Pressable>
          </View>
        </SafeAreaView>
        <View style={styles.notFoundWrap}>
          <RNText style={styles.notFoundText} maxFontSizeMultiplier={1.15}>
            That gig isn&apos;t open anymore.
          </RNText>
        </View>
      </View>
    );
  }

  const days = daysUntil(job.deadline);
  const tags = jobTags(job.niche, job.type);
  const deliverables = job.deliverable
    .split(/,\s*|\s*;\s*|\s+·\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const isHourly = job.type === 'PRODUCT REVIEW' || job.type === 'UGC CREATION';
  const payLabel = isHourly ? 'Hourly' : 'Fixed-price';
  const exp = experienceLevel(job.budgetMax);

  return (
    <View style={styles.root}>
      {/* Clean header — back left, chat right. No empty placeholder circles. */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={6}>
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <View style={{ flex: 1 }} />
          <Tap
            onPress={() => router.push('/(tabs)/inbox')}
            style={styles.iconBtn}
            burstColor={palette.acid}
          >
            <Ionicons name="chatbubble-outline" size={18} color={palette.ink} />
          </Tap>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Posted meta chip */}
        <View style={styles.metaWrap}>
          <View style={styles.metaChip}>
            <RNText style={styles.metaChipText} maxFontSizeMultiplier={1.1}>
              Posted {postedAgo(job.id)}  ·  Proposals: {proposalRange(job.applicants)}
            </RNText>
          </View>
        </View>

        {/* Title + brand */}
        <View style={styles.titleBlock}>
          <RNText
            style={styles.title}
            numberOfLines={3}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            maxFontSizeMultiplier={1.1}
          >
            {job.title}
          </RNText>
          <View style={styles.brandRow}>
            <RNText style={styles.brand} numberOfLines={1} maxFontSizeMultiplier={1.15}>
              {job.brand}
            </RNText>
            {job.verified ? (
              <View style={styles.verifyBadge}>
                <Ionicons name="checkmark" size={9} color={palette.bone} />
              </View>
            ) : null}
          </View>
          <RNText style={styles.payLine} maxFontSizeMultiplier={1.15}>
            {payLabel}  ·  ₹{formatINR(job.budgetMin)}–{formatINR(job.budgetMax)}  ·  {exp}
          </RNText>
        </View>

        {/* About this gig */}
        <Section title="About this gig">
          <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
            {job.description}
          </RNText>
        </Section>

        {/* Budget summary — compact, NOT giant */}
        <Section title="Budget & timing">
          <View style={styles.summaryGrid}>
            <SummaryCell label="Budget" value={`₹${formatINR(job.budgetMin)}–${formatINR(job.budgetMax)}`} />
            <SummaryCell label="Deadline" value={days > 0 ? `${days} days` : 'Closed'} />
            <SummaryCell label="Experience" value={exp} />
            <SummaryCell label="Niche" value={job.niche} />
          </View>
        </Section>

        {/* Deliverables */}
        <Section title="Deliverables">
          <View style={styles.delivList}>
            {deliverables.map((d, i) => (
              <View key={`${i}-${d}`} style={styles.delivRow}>
                <View style={styles.delivDot} />
                <RNText style={styles.delivText} maxFontSizeMultiplier={1.2}>
                  {d}
                </RNText>
              </View>
            ))}
          </View>
        </Section>

        {/* Skills + tags */}
        <Section title="Skills">
          <View style={styles.tagsRow}>
            {tags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <RNText style={styles.tagLabel} maxFontSizeMultiplier={1.1}>
                  {tag}
                </RNText>
              </View>
            ))}
          </View>
        </Section>

        {/* Activity on the brand */}
        <Section title="Activity">
          <View style={styles.activityList}>
            <ActivityRow label="Proposals" value={proposalRange(job.applicants)} />
            <ActivityRow label="Posted" value={postedAgo(job.id)} />
            <ActivityRow label="Location" value={job.location} />
            <ActivityRow label="Brand verified" value={job.verified ? 'Yes' : 'No'} last />
          </View>
        </Section>

        {/* What happens next */}
        <Section title="What happens next">
          <View style={styles.stepsList}>
            {[
              'Submit your pitch with the rate you want.',
              'Brand reviews and shortlists within 48 hours.',
              'Negotiate scope, sign on-platform, get paid.',
            ].map((step, i) => (
              <View key={i} style={[styles.stepRow, i === 2 && styles.stepRowLast]}>
                <RNText style={styles.stepNum} maxFontSizeMultiplier={1.1}>
                  {String(i + 1).padStart(2, '0')}
                </RNText>
                <RNText style={styles.stepText} maxFontSizeMultiplier={1.2}>
                  {step}
                </RNText>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>

      {/* Sticky footer — Save + Apply */}
      <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
        <View style={styles.footerInner}>
          <Pressable
            onPress={() => {
              setSaved((v) => !v);
              toast(saved ? 'Removed from saved.' : 'Saved for later.', 'success');
            }}
            style={styles.saveBtn}
            hitSlop={4}
          >
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={22}
              color={saved ? palette.ember : palette.ink}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              applied
                ? router.push('/(modules)/jobs/active-deals')
                : router.push(`/(modules)/jobs/apply?id=${job.id}` as any)
            }
            disabled={applied}
            style={[
              styles.applyBtn,
              applied && styles.applyBtnDisabled,
            ]}
          >
            <RNText style={styles.applyLabel} maxFontSizeMultiplier={1.1}>
              {applied ? 'APPLIED' : 'APPLY NOW'}
            </RNText>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Reusable bits
 * ----------------------------------------------------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <RNText style={styles.sectionTitle} maxFontSizeMultiplier={1.15}>
          {title}
        </RNText>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function SummaryCell({ label, value }: { label: string; value: string }) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.summaryCell}>
      <RNText style={styles.summaryLabel} maxFontSizeMultiplier={1.1}>
        {label}
      </RNText>
      <RNText
        style={styles.summaryValue}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {value}
      </RNText>
    </View>
  );
}

function ActivityRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={[styles.activityRow, !last && styles.activityRowBorder]}>
      <RNText style={styles.activityLabel} maxFontSizeMultiplier={1.15}>
        {label}
      </RNText>
      <RNText
        style={styles.activityValue}
        numberOfLines={1}
        maxFontSizeMultiplier={1.15}
      >
        {value}
      </RNText>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Styles
 * ----------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },

    /* ── Header ── */
    headerSafe: {
      backgroundColor: palette.bone,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 6,
      paddingBottom: 12,
      gap: 10,
    },
    iconBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* ── Scroll ── */
    scrollContent: { paddingBottom: 24 },

    /* ── Top meta chip ── */
    metaWrap: { paddingHorizontal: 20, paddingTop: 18 },
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

    /* ── Title block ── */
    titleBlock: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 22,
      gap: 8,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      lineHeight: 34,
      letterSpacing: -1,
      color: palette.ink,
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 2,
    },
    brand: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 0.4,
      color: palette.ink,
      opacity: 0.85,
    },
    verifyBadge: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: palette.electric,
      alignItems: 'center',
      justifyContent: 'center',
    },
    payLine: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      color: palette.ink,
      opacity: 0.75,
      marginTop: 4,
    },

    /* ── Section ── */
    section: { paddingHorizontal: 20 },
    sectionHead: {
      borderTopWidth: 1,
      borderTopColor: palette.line,
      paddingTop: 18,
      paddingBottom: 10,
    },
    sectionTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    sectionBody: { paddingBottom: 22 },

    body: {
      ...T.body,
      fontSize: 15,
      lineHeight: 22,
      color: palette.ink,
      opacity: 0.88,
    },

    /* ── Summary grid (compact, replaces the old huge budget card) ── */
    summaryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    summaryCell: {
      flexBasis: '47%',
      flexGrow: 1,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      gap: 4,
    },
    summaryLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.ink,
      opacity: 0.55,
      textTransform: 'uppercase',
    },
    summaryValue: {
      fontFamily: fonts.displayBold,
      fontSize: 17,
      lineHeight: 20,
      letterSpacing: -0.3,
      color: palette.ink,
    },

    /* ── Deliverables ── */
    delivList: { gap: 10 },
    delivRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    delivDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.acid,
      marginTop: 8,
    },
    delivText: {
      flex: 1,
      ...T.body,
      fontSize: 14,
      lineHeight: 22,
      color: palette.ink,
    },

    /* ── Tags ── */
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
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

    /* ── Activity rows ── */
    activityList: {},
    activityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      gap: 12,
    },
    activityRowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    activityLabel: {
      ...T.body,
      fontSize: 14,
      color: palette.ink,
      opacity: 0.65,
    },
    activityValue: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      color: palette.ink,
      letterSpacing: 0.1,
      flexShrink: 1,
      textAlign: 'right',
    },

    /* ── Steps ── */
    stepsList: {},
    stepRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    stepRowLast: { borderBottomWidth: 0 },
    stepNum: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.4,
      color: palette.ink,
      opacity: 0.5,
      width: 26,
      paddingTop: 2,
    },
    stepText: {
      flex: 1,
      ...T.body,
      fontSize: 14,
      lineHeight: 22,
      color: palette.ink,
    },

    /* ── Footer ── */
    footerSafe: {
      backgroundColor: palette.bone,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    footerInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 6,
    },
    saveBtn: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyBtn: {
      flex: 1,
      height: 48,
      borderRadius: 24,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyBtnDisabled: {
      backgroundColor: palette.boneMuted,
    },
    applyLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.8,
      color: palette.bone,
      includeFontPadding: false,
      textAlign: 'center',
    },

    /* ── Not found ── */
    notFoundWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    notFoundText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.65,
      textAlign: 'center',
    },
  });
