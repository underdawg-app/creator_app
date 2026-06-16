import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
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
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
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
      <ScreenFrame header={<ModuleHeader title="JOB" showBack />}>
        <View style={styles.notFoundWrap}>
          <RNText style={styles.notFoundText} maxFontSizeMultiplier={1.15}>
            That gig isn&apos;t open anymore.
          </RNText>
        </View>
      </ScreenFrame>
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
    <View style={{ flex: 1 }}>
      <ScreenFrame
        header={
          <ModuleHeader
            title="JOB"
            showBack
            right={
              <Tap
                onPress={() => router.push('/(tabs)/inbox')}
                style={styles.headerBtn}
                burstColor={palette.acid}
              >
                <Ionicons name="chatbubble-outline" size={16} color={palette.ink} />
              </Tap>
            }
          />
        }
      >
        {/* ===== Hero ===== */}
        <View style={styles.hero}>
          <View style={styles.metaChip}>
            <RNText style={styles.metaChipText} maxFontSizeMultiplier={1.1}>
              Posted {postedAgo(job.id)}  ·  Proposals: {proposalRange(job.applicants)}
            </RNText>
          </View>

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

        {/* ===== About ===== */}
        <Section eyebrow="THE BRIEF" title="about this gig.">
          <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
            {job.description}
          </RNText>
        </Section>

        {/* ===== Budget & timing ===== */}
        <Section eyebrow="THE NUMBERS" title="budget & timing.">
          <View style={styles.summaryGrid}>
            <SummaryCell label="Budget" value={`₹${formatINR(job.budgetMin)}–${formatINR(job.budgetMax)}`} />
            <SummaryCell label="Deadline" value={days > 0 ? `${days} days` : 'Closed'} />
            <SummaryCell label="Experience" value={exp} />
            <SummaryCell label="Niche" value={job.niche} />
          </View>
        </Section>

        {/* ===== Deliverables ===== */}
        <Section eyebrow={`DELIVERABLES · ${deliverables.length}`} title="what you ship.">
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

        {/* ===== Skills ===== */}
        <Section eyebrow="SKILLS" title="what it takes.">
          <View style={styles.chipRow}>
            {tags.map((tag, i) => (
              <Chip
                key={tag}
                label={tag}
                active
                accent={i % 3 === 0 ? palette.electric : i % 3 === 1 ? palette.blush : palette.ember}
              />
            ))}
          </View>
        </Section>

        {/* ===== Activity ===== */}
        <Section eyebrow="ACTIVITY" title="on the brand.">
          <View style={styles.activityList}>
            <ActivityRow label="Proposals" value={proposalRange(job.applicants)} />
            <ActivityRow label="Posted" value={postedAgo(job.id)} />
            <ActivityRow label="Location" value={job.location} />
            <ActivityRow label="Brand verified" value={job.verified ? 'Yes' : 'No'} last />
          </View>
        </Section>

        {/* ===== What happens next ===== */}
        <Section eyebrow="THE FLOW" title="what happens next.">
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
      </ScreenFrame>

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
    headerBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* ── Hero ── */
    hero: {
      marginTop: 6,
      padding: 18,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      gap: 10,
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
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 30,
      lineHeight: 34,
      letterSpacing: -1,
      color: palette.ink,
      marginTop: 4,
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

    /* ── Body ── */
    body: {
      ...T.body,
      fontSize: 15,
      lineHeight: 22,
      color: palette.ink,
      opacity: 0.88,
    },

    /* ── Summary grid ── */
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

    /* ── Chip row ── */
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

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
      paddingTop: 120,
    },
    notFoundText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.65,
      textAlign: 'center',
    },
  });
