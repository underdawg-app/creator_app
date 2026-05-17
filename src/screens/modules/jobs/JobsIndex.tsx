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
import { Sheet } from '@/components/ui/Sheet';
import { Ionicons } from '@/icons';
import { jobsSeed } from '@/data/mock';
import { useStore } from '@/store';
import { JobRow } from '@/components/jobs/JobRow';

const TYPE_FILTERS = [
  'ALL',
  'SPONSORED POST',
  'VIDEO INTEGRATION',
  'BRAND AMBASSADOR',
  'GET VIRAL CAMPAIGN',
  'PRODUCT REVIEW',
  'UGC CREATION',
];

const TABS = ['BEST MATCH', 'MOST RECENT', 'SAVED'] as const;
type TabKey = (typeof TABS)[number];

/* -------------------------------------------------------------------------
 * Screen
 * ----------------------------------------------------------------------- */

export default function JobsHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const apps = useStore((s) => s.applications);
  const deals = useStore((s) => s.deals);
  const toast = useStore((s) => s.toast);

  const [tab, setTab] = useState<TabKey>('BEST MATCH');
  const [filter, setFilter] = useState('ALL');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState('');
  // Per-card local state — saved/hidden. Persist via useStore if you need
  // them to survive a restart; left local so the rewrite stays isolated.
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [hidden, setHidden] = useState<Record<string, boolean>>({});

  const savedCount = Object.values(saved).filter(Boolean).length;

  const visibleJobs = useMemo(() => {
    let jobs = jobsSeed.filter((j) => !hidden[j.id]);
    if (tab === 'SAVED') jobs = jobs.filter((j) => saved[j.id]);
    else if (tab === 'MOST RECENT') jobs = [...jobs].reverse();
    if (filter !== 'ALL') jobs = jobs.filter((j) => j.type === filter);
    const q = query.trim().toLowerCase();
    if (q) {
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.brand.toLowerCase().includes(q) ||
          j.type.toLowerCase().includes(q) ||
          j.niche.toLowerCase().includes(q),
      );
    }
    return jobs;
  }, [tab, filter, saved, hidden, query]);

  const helper =
    tab === 'BEST MATCH'
      ? 'Browse gigs that match your craft and budget. Ordered by most relevant.'
      : tab === 'MOST RECENT'
      ? 'Latest gigs from verified brands. Newest first.'
      : 'Gigs you saved to apply later.';

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={16} color={palette.mute} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search gigs"
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
        {/* Quick links — list rows with a right chevron, hairline dividers */}
        <View style={styles.quickRows}>
          <QuickRow
            label="My Deals"
            count={deals.length + apps.length}
            onPress={() => router.push('/(modules)/jobs/active-deals')}
          />
          <QuickRow
            label="Rate Card"
            onPress={() => router.push('/(modules)/jobs/rate-card')}
            last
          />
        </View>

        {/* "Gigs you might like" + segmented tabs */}
        <View style={styles.feedHead}>
          <RNText style={styles.feedHeadTitle} maxFontSizeMultiplier={1.1}>
            Gigs you might like
          </RNText>
        </View>

        <View style={styles.tabBar}>
          {TABS.map((tk) => {
            const active = tab === tk;
            const label =
              tk === 'SAVED' && savedCount > 0
                ? `Saved (${savedCount})`
                : tk === 'BEST MATCH'
                ? 'Best Match'
                : tk === 'MOST RECENT'
                ? 'Most Recent'
                : 'Saved';
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
        </View>

        <View style={styles.helperRow}>
          <RNText style={styles.helperText} maxFontSizeMultiplier={1.2}>
            {helper}
          </RNText>
        </View>

        {/* Job rows */}
        {visibleJobs.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="briefcase-outline" size={28} color={palette.mute} />
            <RNText style={styles.emptyText} maxFontSizeMultiplier={1.15}>
              {tab === 'SAVED'
                ? 'No saved gigs yet. Tap the heart on any gig to save it for later.'
                : 'Nothing matches your filters. Tap Filters to broaden the search.'}
            </RNText>
          </View>
        ) : (
          visibleJobs.map((job, i) => (
            <JobRow
              key={job.id}
              job={job}
              isFirst={i === 0}
              saved={!!saved[job.id]}
              onSave={() => {
                setSaved((s) => ({ ...s, [job.id]: !s[job.id] }));
                toast(saved[job.id] ? 'Removed from saved.' : 'Saved for later.', 'success');
              }}
              onHide={() => {
                setHidden((h) => ({ ...h, [job.id]: true }));
                toast('Gig hidden from your feed.', 'default');
              }}
            />
          ))
        )}
      </ScrollView>

      {/* Floating Filters pill */}
      <FiltersFab onPress={() => setFiltersOpen(true)} />

      <Sheet
        visible={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        eyebrow="GIG FILTERS"
        title="Narrow your feed."
      >
        <View style={styles.sheetSection}>
          <RNText style={styles.sheetEyebrow} maxFontSizeMultiplier={1.1}>
            CAMPAIGN TYPE
          </RNText>
          <View style={styles.sheetChipWrap}>
            {TYPE_FILTERS.map((f) => {
              const active = filter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  style={[
                    styles.sheetChip,
                    active && {
                      backgroundColor: palette.ink,
                      borderColor: palette.ink,
                    },
                  ]}
                >
                  <RNText
                    style={[
                      styles.sheetChipLabel,
                      active && { color: palette.bone },
                    ]}
                    maxFontSizeMultiplier={1.1}
                  >
                    {f}
                  </RNText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.sheetFooter}>
          <Pressable
            onPress={() => {
              setFilter('ALL');
              toast('Filters reset.', 'default');
            }}
            style={styles.sheetReset}
          >
            <RNText style={styles.sheetResetLabel} maxFontSizeMultiplier={1.1}>
              RESET
            </RNText>
          </Pressable>
          <Pressable
            onPress={() => setFiltersOpen(false)}
            style={styles.sheetApply}
          >
            <RNText style={styles.sheetApplyLabel} maxFontSizeMultiplier={1.1}>
              SHOW {visibleJobs.length} GIGS
            </RNText>
          </Pressable>
        </View>
      </Sheet>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Quick links row
 * ----------------------------------------------------------------------- */

function QuickRow({
  label,
  count,
  onPress,
  last,
}: {
  label: string;
  count?: number;
  onPress: () => void;
  last?: boolean;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap onPress={onPress} burstColor={palette.acid}>
      <View style={[styles.quickRow, !last && styles.quickRowBorder]}>
        <RNText style={styles.quickRowLabel} maxFontSizeMultiplier={1.15}>
          {label}
        </RNText>
        {typeof count === 'number' && count > 0 ? (
          <View style={styles.quickRowCount}>
            <RNText style={styles.quickRowCountLabel} maxFontSizeMultiplier={1.1}>
              {count}
            </RNText>
          </View>
        ) : null}
        <Ionicons name="chevron-forward" size={18} color={palette.ink} style={{ opacity: 0.55 }} />
      </View>
    </Tap>
  );
}

/* -------------------------------------------------------------------------
 * Floating Filters pill
 * ----------------------------------------------------------------------- */

function FiltersFab({ onPress }: { onPress: () => void }) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Pressable
      onPress={onPress}
      style={styles.fabWrap}
      hitSlop={8}
      unstable_pressDelay={0}
    >
      <View style={styles.fab}>
        <RNText style={styles.fabLabel} maxFontSizeMultiplier={1.1}>
          Filters
        </RNText>
      </View>
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
    scrollContent: { paddingBottom: 200 },

    /* ── Quick links rows ── */
    quickRows: {
      paddingHorizontal: 20,
    },
    quickRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 18,
      gap: 10,
    },
    quickRowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    quickRowLabel: {
      flex: 1,
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.4,
      color: palette.ink,
    },
    quickRowCount: {
      paddingHorizontal: 9,
      paddingVertical: 3,
      borderRadius: 999,
      backgroundColor: palette.acid,
    },
    quickRowCountLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 0.8,
      color: staticPalette.ink,
    },

    /* ── "Gigs you might like" + tabs ── */
    feedHead: {
      paddingHorizontal: 20,
      paddingTop: 28,
      paddingBottom: 14,
    },
    feedHeadTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 26,
      lineHeight: 28,
      letterSpacing: -0.7,
      color: palette.ink,
    },
    tabBar: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      gap: 18,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
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
    tabLabelActive: {
      opacity: 1,
    },
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

    /* ── Empty ── */
    empty: {
      paddingHorizontal: 20,
      paddingVertical: 48,
      gap: 14,
      alignItems: 'center',
    },
    emptyText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.65,
      textAlign: 'center',
      maxWidth: 280,
    },

    /* ── Floating Filters pill — ink fill, compact, centered ── */
    fabWrap: {
      position: 'absolute',
      right: 16,
      bottom: 24,
      zIndex: 50,
      elevation: 12,
    },
    fab: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 22,
      height: 40,
      minWidth: 92,
      borderRadius: 20,
      backgroundColor: palette.ink,
      shadowColor: '#000',
      shadowOpacity: 0.28,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 12,
    },
    fabLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.4,
      color: palette.bone,
      includeFontPadding: false,
      textAlignVertical: 'center',
      textAlign: 'center',
    },

    /* ── Filter sheet ── */
    sheetSection: { gap: 12, paddingBottom: 12 },
    sheetEyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.6,
    },
    sheetChipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    sheetChip: {
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: 'transparent',
    },
    sheetChipLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.4,
      color: palette.ink,
    },
    sheetFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 18,
    },
    sheetReset: {
      paddingHorizontal: 18,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetResetLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.6,
      color: palette.ink,
    },
    sheetApply: {
      flex: 1,
      height: 48,
      borderRadius: 24,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetApplyLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.8,
      color: palette.bone,
    },
  });
