import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';
import { jobsSeed, type Deal } from '@/data/mock';

/* -------------------------------------------------------------------------
 * Types & helpers
 * ----------------------------------------------------------------------- */

type Bucket = 'PROPOSED' | 'ACTIVE' | 'CLOSED';
type TabKey = 'ALL' | Bucket;
const TABS: TabKey[] = ['ALL', 'PROPOSED', 'ACTIVE', 'CLOSED'];

// Unified row item — apps and deals are merged into the same shape so the
// list renderer doesn't need to branch per source.
type RowItem = {
  id: string;
  bucket: Bucket;
  title: string;
  brand: string;
  status: string;
  amount: number;
  progress: number;
  nextAction?: string;
  postedAgo: string;
  accent: string;
  kind: 'app' | 'deal';
};

const DEAL_BUCKET: Record<Deal['status'], Bucket> = {
  APPLIED: 'PROPOSED',
  SHORTLISTED: 'PROPOSED',
  NEGOTIATING: 'PROPOSED',
  CONTRACT: 'PROPOSED',
  ACTIVE: 'ACTIVE',
  'IN REVIEW': 'ACTIVE',
  COMPLETED: 'CLOSED',
};

const APP_BUCKET: Record<string, Bucket> = {
  APPLIED: 'PROPOSED',
  SHORTLISTED: 'PROPOSED',
  REJECTED: 'CLOSED',
};

function formatINR(n: number) {
  if (!Number.isFinite(n) || n <= 0) return '—';
  if (n >= 100000) {
    const lakhs = n / 100000;
    return `₹${lakhs.toFixed(lakhs >= 10 ? 1 : 2).replace(/\.?0+$/, '')}L`;
  }
  if (n >= 1000) return `₹${Math.round(n / 1000)}K`;
  return `₹${Math.round(n)}`;
}

function postedFor(id: string) {
  // Stable id → posted-ago string so the order doesn't shuffle on re-render.
  const tail = id.slice(-1);
  switch (tail) {
    case '1': return '1 hour ago';
    case '2': return '3 hours ago';
    case '3': return 'yesterday';
    case '4': return '2 days ago';
    default: return '5 days ago';
  }
}

/* -------------------------------------------------------------------------
 * Screen
 * ----------------------------------------------------------------------- */

export default function MyDeals() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const deals = useStore((s) => s.deals);
  const apps = useStore((s) => s.applications);
  const toast = useStore((s) => s.toast);

  const [tab, setTab] = useState<TabKey>('ALL');
  const [query, setQuery] = useState('');

  const rows = useMemo<RowItem[]>(() => {
    const dealRows: RowItem[] = deals.map((d) => ({
      id: `d-${d.id}`,
      bucket: DEAL_BUCKET[d.status] ?? 'PROPOSED',
      title: d.title,
      brand: d.brand,
      status: d.status,
      amount: d.amount,
      progress: d.progress,
      nextAction: d.nextAction,
      postedAgo: postedFor(d.id),
      accent: d.accent,
      kind: 'deal',
    }));
    const appRows: RowItem[] = apps.map((a) => {
      const job = jobsSeed.find((j) => j.id === a.jobId);
      return {
        id: `a-${a.id}`,
        bucket: APP_BUCKET[a.status] ?? 'PROPOSED',
        title: job?.title ?? 'Job application',
        brand: job?.brand ?? '—',
        status: a.status,
        amount: a.rate,
        progress: 0,
        nextAction: a.timeline || undefined,
        postedAgo: postedFor(a.id),
        accent: job?.accent ?? staticPalette.acid,
        kind: 'app',
      };
    });
    return [...dealRows, ...appRows];
  }, [deals, apps]);

  const visible = useMemo(() => {
    let list = tab === 'ALL' ? rows : rows.filter((r) => r.bucket === tab);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.brand.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q),
      );
    }
    return list;
  }, [rows, tab, query]);

  const counts = useMemo(
    () => ({
      ALL: rows.length,
      PROPOSED: rows.filter((r) => r.bucket === 'PROPOSED').length,
      ACTIVE: rows.filter((r) => r.bucket === 'ACTIVE').length,
      CLOSED: rows.filter((r) => r.bucket === 'CLOSED').length,
    }),
    [rows],
  );

  const helper =
    tab === 'ALL'
      ? 'Every pitch and deal in one feed. Newest activity first.'
      : tab === 'PROPOSED'
      ? 'Pitches sent. Waiting on brands to shortlist or counter.'
      : tab === 'ACTIVE'
      ? 'Deals in flight. Hit your next milestone to keep them moving.'
      : 'Wrapped deals. Payouts cleared, work delivered.';

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.iconBtn}
            hitSlop={6}
          >
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={16} color={palette.mute} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search deals"
              placeholderTextColor={palette.mute}
              style={styles.searchInput}
              returnKeyType="search"
              selectionColor={palette.acid}
            />
            {query.length > 0 ? (
              <Pressable onPress={() => setQuery('')} hitSlop={6}>
                <Ionicons name="close-circle" size={16} color={palette.mute} />
              </Pressable>
            ) : null}
          </View>
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
        <View style={styles.titleBlock}>
          <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
            My Deals
          </RNText>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBarScroll}
          contentContainerStyle={styles.tabBar}
        >
          {TABS.map((tk) => {
            const active = tab === tk;
            const count = counts[tk];
            const baseLabel =
              tk === 'ALL'
                ? 'All'
                : tk === 'PROPOSED'
                ? 'Proposed'
                : tk === 'ACTIVE'
                ? 'Active'
                : 'Closed';
            const label = count ? `${baseLabel} (${count})` : baseLabel;
            return (
              <Tap
                key={tk}
                onPress={() => setTab(tk)}
                burstColor={palette.acid}
                style={styles.tabItem}
              >
                <RNText
                  style={[styles.tabLabel, active && styles.tabLabelActive]}
                  maxFontSizeMultiplier={1.1}
                >
                  {label}
                </RNText>
                {active ? <View style={styles.tabUnderline} /> : null}
              </Tap>
            );
          })}
        </ScrollView>

        <View style={styles.helperRow}>
          <RNText style={styles.helperText} maxFontSizeMultiplier={1.2}>
            {helper}
          </RNText>
        </View>

        {visible.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="document-text-outline" size={28} color={palette.mute} />
            <RNText style={styles.emptyText} maxFontSizeMultiplier={1.15}>
              {tab === 'ALL'
                ? 'No deals or applications yet. Browse Gigs and send your first pitch.'
                : tab === 'PROPOSED'
                ? 'Nothing pitched yet. Browse Gigs and send your first pitch.'
                : tab === 'ACTIVE'
                ? 'No active deals. Once a brand confirms, they land here.'
                : 'No closed deals yet. Your wrapped work will show up here.'}
            </RNText>
            {(tab === 'ALL' || tab === 'PROPOSED') ? (
              <Pressable
                onPress={() => router.push('/(modules)/jobs')}
                style={styles.emptyCta}
              >
                <RNText style={styles.emptyCtaLabel} maxFontSizeMultiplier={1.1}>
                  BROWSE GIGS
                </RNText>
              </Pressable>
            ) : null}
          </View>
        ) : (
          visible.map((row, i) => (
            <DealRow
              key={row.id}
              row={row}
              isFirst={i === 0}
              onOpen={() => {
                if (row.kind !== 'deal') {
                  router.push('/(modules)/jobs/applications');
                  return;
                }
                const s = String(row.status).toUpperCase();
                if (s.includes('NEGOTIAT') || s.includes('SHORTLIST')) {
                  router.push('/(modules)/jobs/negotiation');
                } else if (s.includes('CONTRACT')) {
                  router.push('/(modules)/jobs/contract');
                } else if (s.includes('COMPLETE') || s.includes('PAID')) {
                  router.push('/(modules)/jobs/payment');
                } else {
                  // ACTIVE / IN REVIEW / REVISION → deliverables workspace
                  router.push('/(modules)/jobs/deliver');
                }
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Deal / application row
 * ----------------------------------------------------------------------- */

function DealRow({
  row,
  isFirst,
  onOpen,
}: {
  row: RowItem;
  isFirst: boolean;
  onOpen: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const statusTone =
    row.bucket === 'ACTIVE'
      ? { bg: 'rgba(46,91,255,0.16)', fg: palette.electric }
      : row.bucket === 'CLOSED'
      ? { bg: 'rgba(156,152,138,0.22)', fg: palette.mute }
      : { bg: 'rgba(216,255,61,0.32)', fg: staticPalette.ink };

  const pct = Math.round(row.progress * 100);
  const showProgress = row.bucket !== 'PROPOSED' && row.progress > 0;

  return (
    <Pressable
      onPress={onOpen}
      style={[styles.row, !isFirst && styles.rowBorderTop]}
      android_ripple={{ color: 'rgba(10,10,10,0.06)' }}
    >
      {/* Status chip + posted ago */}
      <View style={styles.rowTopRow}>
        <View style={[styles.statusChip, { backgroundColor: statusTone.bg }]}>
          <RNText style={[styles.statusChipLabel, { color: statusTone.fg }]} maxFontSizeMultiplier={1.1}>
            {row.status}
          </RNText>
        </View>
        <RNText style={styles.postedText} maxFontSizeMultiplier={1.1}>
          {row.postedAgo}
        </RNText>
      </View>

      {/* Title + amount on right */}
      <View style={styles.titleRow}>
        <RNText
          style={styles.dealTitle}
          numberOfLines={2}
          maxFontSizeMultiplier={1.1}
        >
          {row.title}
        </RNText>
        <RNText style={styles.dealAmount} maxFontSizeMultiplier={1.1}>
          {row.amount > 0 ? formatINR(row.amount) : 'TBD'}
        </RNText>
      </View>

      <RNText style={styles.brandLine} numberOfLines={1} maxFontSizeMultiplier={1.15}>
        {row.brand}
      </RNText>

      {showProgress ? (
        <View style={styles.progressBlock}>
          <View style={styles.progressLabels}>
            <RNText style={styles.progressLabel} maxFontSizeMultiplier={1.1}>
              Progress
            </RNText>
            <RNText style={styles.progressPct} maxFontSizeMultiplier={1.1}>
              {pct}%
            </RNText>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
          </View>
        </View>
      ) : null}

      {row.nextAction ? (
        <View style={styles.nextRow}>
          <View style={styles.nextDot} />
          <View style={styles.nextTextWrap}>
            <RNText style={styles.nextLabel} maxFontSizeMultiplier={1.1}>
              NEXT
            </RNText>
            <RNText
              style={styles.nextText}
              numberOfLines={2}
              maxFontSizeMultiplier={1.15}
            >
              {row.nextAction}
            </RNText>
          </View>
        </View>
      ) : null}
    </Pressable>
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
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 14,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    searchInput: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 14,
      color: palette.ink,
      paddingVertical: 0,
      includeFontPadding: false,
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
    scrollContent: { paddingBottom: 160 },

    /* ── Title + tabs ── */
    titleBlock: {
      paddingHorizontal: 20,
      paddingTop: 22,
      paddingBottom: 14,
    },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -0.8,
      color: palette.ink,
    },
    tabBarScroll: {
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    tabBar: {
      paddingHorizontal: 20,
      gap: 18,
    },
    tabItem: {
      paddingVertical: 8,
      paddingBottom: 12,
    },
    tabLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 0.2,
      color: palette.ink,
      opacity: 0.55,
    },
    tabLabelActive: { opacity: 1 },
    tabUnderline: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 3,
      backgroundColor: palette.ink,
      borderRadius: 2,
    },
    helperRow: {
      paddingHorizontal: 20,
      paddingTop: 14,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    helperText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.65,
      lineHeight: 19,
    },

    /* ── Row ── */
    row: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 22,
      gap: 8,
    },
    rowBorderTop: {
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    rowTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    statusChipLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 0.4,
    },
    postedText: {
      ...T.body,
      fontSize: 12,
      color: palette.ink,
      opacity: 0.6,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      marginTop: 4,
    },
    dealTitle: {
      flex: 1,
      fontFamily: fonts.displayBold,
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: -0.5,
      color: palette.ink,
    },
    dealAmount: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    brandLine: {
      ...T.body,
      fontSize: 13,
      color: palette.ink,
      opacity: 0.75,
    },

    /* ── Progress ── */
    progressBlock: { marginTop: 10, gap: 6 },
    progressLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    progressLabel: {
      ...T.body,
      fontSize: 12,
      color: palette.ink,
      opacity: 0.55,
    },
    progressPct: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      color: palette.ink,
    },
    progressTrack: {
      height: 6,
      backgroundColor: palette.line,
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: palette.ink,
      borderRadius: 3,
    },

    /* ── Next action ── */
    nextRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      marginTop: 8,
    },
    nextDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.acid,
      marginTop: 7,
    },
    nextTextWrap: { flex: 1, gap: 2 },
    nextText: {
      ...T.body,
      fontSize: 13,
      lineHeight: 19,
      color: palette.ink,
      opacity: 0.85,
    },
    nextLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.ink,
      opacity: 0.6,
    },

    /* ── Empty ── */
    empty: {
      paddingHorizontal: 20,
      paddingVertical: 56,
      gap: 16,
      alignItems: 'center',
    },
    emptyText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.65,
      textAlign: 'center',
      maxWidth: 280,
    },
    emptyCta: {
      marginTop: 4,
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
  });
