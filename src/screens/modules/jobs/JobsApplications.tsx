import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
} from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { jobsSeed } from '@/data/mock';

/* -------------------------------------------------------------------------
 * Types & demo data
 * ----------------------------------------------------------------------- */

type Status = 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'WITHDRAWN';
type TabKey = 'ALL' | 'PENDING' | 'SHORTLISTED' | 'REJECTED';
const TABS: TabKey[] = ['ALL', 'PENDING', 'SHORTLISTED', 'REJECTED'];

type AppRow = {
  id: string;
  jobId: string;
  brand: string;
  title: string;
  rate: number;
  status: Status;
  response: string;
  timeAgo: string;
  accent: string;
};

// Demo seed — mapped over the first jobs so the screen is never empty even
// when the store has no real applications yet.
const DEMO: Omit<AppRow, 'accent' | 'brand' | 'title' | 'jobId'>[] = [
  {
    id: 'demo-1',
    rate: 90_000,
    status: 'SHORTLISTED',
    response: 'Loved your reel. Looping in our brand lead to talk numbers.',
    timeAgo: '2 days in review',
  },
  {
    id: 'demo-2',
    rate: 140_000,
    status: 'APPLIED',
    response: 'Application received. Casting closes Friday.',
    timeAgo: '5 hours in queue',
  },
  {
    id: 'demo-3',
    rate: 60_000,
    status: 'REJECTED',
    response: 'Went a different direction this round — keep us on radar.',
    timeAgo: 'closed 1 day ago',
  },
  {
    id: 'demo-4',
    rate: 30_000,
    status: 'APPLIED',
    response: 'Under review with 40 other creators.',
    timeAgo: '1 day in queue',
  },
];

function formatINR(n: number) {
  if (!Number.isFinite(n) || n <= 0) return 'TBD';
  if (n >= 100000) {
    const l = n / 100000;
    return `₹${l.toFixed(l >= 10 ? 1 : 2).replace(/\.?0+$/, '')}L`;
  }
  if (n >= 1000) return `₹${Math.round(n / 1000)}K`;
  return `₹${Math.round(n)}`;
}

const STATUS_TONE: Record<Status, { bg: string; fg: string }> = {
  APPLIED: { bg: 'rgba(46,91,255,0.16)', fg: staticPalette.electric },
  SHORTLISTED: { bg: 'rgba(216,255,61,0.34)', fg: staticPalette.ink },
  REJECTED: { bg: 'rgba(156,152,138,0.22)', fg: staticPalette.mute },
  WITHDRAWN: { bg: 'rgba(156,152,138,0.22)', fg: staticPalette.mute },
};

/* -------------------------------------------------------------------------
 * Screen
 * ----------------------------------------------------------------------- */

export default function JobsApplications() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const storeApps = useStore((s) => s.applications);
  const toast = useStore((s) => s.toast);

  const [tab, setTab] = useState<TabKey>('ALL');
  // Local override layer — withdrawals mark a row WITHDRAWN without mutating
  // the read-only demo seed or the store list.
  const [overrides, setOverrides] = useState<Record<string, Status>>({});
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const rows = useMemo<AppRow[]>(() => {
    // Real store applications first, then demo seeds (skipping job dupes).
    const storeRows: AppRow[] = storeApps.map((a) => {
      const job = jobsSeed.find((j) => j.id === a.jobId);
      return {
        id: `store-${a.id}`,
        jobId: a.jobId,
        brand: job?.brand ?? 'BRAND',
        title: job?.title ?? 'Gig application',
        rate: a.rate,
        status: a.status,
        response:
          a.status === 'SHORTLISTED'
            ? 'You made the shortlist — open to negotiate.'
            : a.status === 'REJECTED'
            ? 'Not this round. Your pitch stays on file.'
            : 'Pitch delivered. Awaiting the brand.',
        timeAgo: 'just now',
        accent: job?.accent ?? staticPalette.acid,
      };
    });
    const usedJobs = new Set(storeRows.map((r) => r.jobId));
    const demoRows: AppRow[] = DEMO.map((d, i) => {
      const job = jobsSeed[i] ?? jobsSeed[0];
      return {
        ...d,
        jobId: job.id,
        brand: job.brand,
        title: job.title,
        accent: job.accent,
      };
    }).filter((r) => !usedJobs.has(r.jobId));
    const all = [...storeRows, ...demoRows];
    return all.map((r) => ({ ...r, status: overrides[r.id] ?? r.status }));
  }, [storeApps, overrides]);

  const visible = useMemo(() => {
    if (tab === 'ALL') return rows;
    if (tab === 'PENDING') return rows.filter((r) => r.status === 'APPLIED');
    if (tab === 'SHORTLISTED') return rows.filter((r) => r.status === 'SHORTLISTED');
    return rows.filter((r) => r.status === 'REJECTED');
  }, [rows, tab]);

  const appliedCount = rows.filter((r) => r.status === 'APPLIED').length;
  const shortlistedCount = rows.filter((r) => r.status === 'SHORTLISTED').length;
  const decided = rows.filter(
    (r) => r.status === 'SHORTLISTED' || r.status === 'REJECTED',
  ).length;
  const successRate = decided
    ? Math.round((shortlistedCount / decided) * 100)
    : 0;

  const confirmRow = rows.find((r) => r.id === confirmId);

  function withdraw(id: string) {
    setOverrides((o) => ({ ...o, [id]: 'WITHDRAWN' }));
    setConfirmId(null);
    toast('Application withdrawn.', 'warn');
  }

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="GIGS · APPLICATIONS" title="APPLICATIONS" />}
      waves={false}
    >
      <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
        where you{'\n'}stand.
      </RNText>

      {/* Quick stats */}
      <View style={styles.metrics}>
        <View style={styles.metricCell}>
          <MetricCard label="APPLIED" value={appliedCount} size="sm" />
        </View>
        <View style={styles.metricCell}>
          <MetricCard label="SHORTLISTED" value={shortlistedCount} size="sm" />
        </View>
        <View style={styles.metricCell}>
          <MetricCard label="SUCCESS" value={successRate} size="sm" suffix="%" />
        </View>
      </View>

      {/* Filter tabs */}
      <View style={styles.tabs}>
        {TABS.map((tk) => (
          <Chip
            key={tk}
            label={tk}
            active={tab === tk}
            size="sm"
            onPress={() => setTab(tk)}
          />
        ))}
      </View>

      {/* Cards */}
      {visible.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="document-text-outline" size={26} color={palette.mute} />
          <RNText style={styles.emptyText} maxFontSizeMultiplier={1.15}>
            Nothing in {tab.toLowerCase()} yet. Browse gigs and send a pitch.
          </RNText>
          <Pressable
            onPress={() => router.push('/(modules)/jobs')}
            style={styles.emptyCta}
          >
            <RNText style={styles.emptyCtaLabel} maxFontSizeMultiplier={1.1}>
              BROWSE GIGS
            </RNText>
          </Pressable>
        </View>
      ) : (
        visible.map((row) => {
          const tone = STATUS_TONE[row.status];
          return (
            <Tap
              key={row.id}
              onPress={() => router.push(`/(modules)/jobs/${row.jobId}`)}
              burstColor={row.accent}
              style={styles.card}
            >
              <View style={styles.cardTop}>
                <RNText style={styles.brand} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                  {row.brand}
                </RNText>
                <View style={[styles.statusChip, { backgroundColor: tone.bg }]}>
                  <RNText
                    style={[styles.statusLabel, { color: tone.fg }]}
                    maxFontSizeMultiplier={1.1}
                  >
                    {row.status}
                  </RNText>
                </View>
              </View>

              <RNText style={styles.cardTitle} numberOfLines={2} maxFontSizeMultiplier={1.1}>
                {row.title}
              </RNText>

              <View style={styles.metaRow}>
                <RNText style={styles.rate} maxFontSizeMultiplier={1.1}>
                  {formatINR(row.rate)}
                </RNText>
                <View style={styles.dot} />
                <RNText style={styles.time} maxFontSizeMultiplier={1.1}>
                  {row.timeAgo}
                </RNText>
              </View>

              <View style={styles.responseRow}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={14}
                  color={palette.mute}
                  style={{ marginTop: 2 }}
                />
                <RNText style={styles.response} numberOfLines={2} maxFontSizeMultiplier={1.15}>
                  {row.response}
                </RNText>
              </View>

              {/* Per-status action */}
              {row.status === 'SHORTLISTED' ? (
                <Pressable
                  onPress={() => router.push('/(modules)/jobs/negotiation')}
                  style={styles.primaryBtn}
                >
                  <RNText style={styles.primaryBtnLabel} maxFontSizeMultiplier={1.1}>
                    GO TO NEGOTIATION
                  </RNText>
                  <View style={styles.primaryArrow}>
                    <Ionicons name="arrow-forward" size={14} color={palette.ink} />
                  </View>
                </Pressable>
              ) : row.status === 'APPLIED' ? (
                <Pressable
                  onPress={() => setConfirmId(row.id)}
                  style={styles.ghostBtn}
                >
                  <RNText style={styles.ghostBtnLabel} maxFontSizeMultiplier={1.1}>
                    WITHDRAW
                  </RNText>
                </Pressable>
              ) : null}
            </Tap>
          );
        })
      )}

      {/* Withdraw confirm */}
      <Sheet
        visible={confirmId !== null}
        onClose={() => setConfirmId(null)}
        eyebrow="WITHDRAW"
        title="Pull this pitch?"
      >
        <RNText style={styles.sheetBody} maxFontSizeMultiplier={1.15}>
          {confirmRow
            ? `Withdraw your application to ${confirmRow.brand}. The brand will see this and you can re-apply later.`
            : 'This will withdraw your application.'}
        </RNText>
        <View style={styles.sheetFooter}>
          <Pressable
            onPress={() => setConfirmId(null)}
            style={styles.sheetCancel}
          >
            <RNText style={styles.sheetCancelLabel} maxFontSizeMultiplier={1.1}>
              KEEP IT
            </RNText>
          </Pressable>
          <Pressable
            onPress={() => confirmId && withdraw(confirmId)}
            style={styles.sheetConfirm}
          >
            <RNText style={styles.sheetConfirmLabel} maxFontSizeMultiplier={1.1}>
              WITHDRAW
            </RNText>
          </Pressable>
        </View>
      </Sheet>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------------
 * Styles
 * ----------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
    },

    metrics: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 22,
    },
    metricCell: { flex: 1 },

    tabs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 20,
      marginBottom: 4,
    },

    /* ── Card ── */
    card: {
      marginTop: 12,
      padding: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      gap: 8,
    },
    cardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    brand: {
      flex: 1,
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1,
      color: palette.ink,
      opacity: 0.65,
    },
    statusChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
    },
    statusLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 0.4,
    },
    cardTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 20,
      lineHeight: 23,
      letterSpacing: -0.5,
      color: palette.ink,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    rate: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.3,
      color: palette.ink,
    },
    dot: {
      width: 3,
      height: 3,
      borderRadius: 2,
      backgroundColor: palette.mute,
    },
    time: {
      ...T.body,
      fontSize: 12,
      color: palette.ink,
      opacity: 0.55,
    },
    responseRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 2,
    },
    response: {
      flex: 1,
      ...T.body,
      fontSize: 13,
      lineHeight: 18,
      color: palette.ink,
      opacity: 0.8,
    },

    /* ── Actions ── */
    primaryBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
      height: 48,
      paddingLeft: 18,
      paddingRight: 6,
      borderRadius: 16,
      backgroundColor: palette.ink,
    },
    primaryBtnLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.4,
      color: palette.bone,
    },
    primaryArrow: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ghostBtn: {
      marginTop: 8,
      height: 44,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ghostBtnLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.6,
      color: palette.ink,
      opacity: 0.8,
    },

    /* ── Empty ── */
    empty: {
      marginTop: 40,
      paddingVertical: 32,
      gap: 14,
      alignItems: 'center',
    },
    emptyText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.6,
      textAlign: 'center',
      maxWidth: 260,
    },
    emptyCta: {
      marginTop: 2,
      paddingHorizontal: 22,
      height: 44,
      borderRadius: 22,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyCtaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.6,
      color: palette.bone,
    },

    /* ── Sheet ── */
    sheetBody: {
      ...T.body,
      fontSize: 14,
      lineHeight: 20,
      color: palette.ink,
      opacity: 0.8,
    },
    sheetFooter: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,
    },
    sheetCancel: {
      flex: 1,
      height: 50,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetCancelLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.6,
      color: palette.ink,
    },
    sheetConfirm: {
      flex: 1,
      height: 50,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetConfirmLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.8,
      color: palette.bone,
    },
  });
