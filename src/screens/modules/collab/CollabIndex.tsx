import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, Switch } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { useStore } from '@/store';

type Tab = 'INBOX' | 'ACTIVE' | 'FIND';

const REQUESTS = [
  {
    id: 'r1',
    from: 'MAYA PATEL',
    handle: 'maya_films',
    category: 'FILM',
    pitch: 'Two-day short, monsoon Mumbai. Need a sound bed.',
    time: '4h',
  },
  {
    id: 'r2',
    from: 'KORE ODUSOLA',
    handle: 'kore.odu',
    category: 'MUSIC',
    pitch: 'Type-poster series for the new EP. 5 covers.',
    time: '1d',
  },
];

const ACTIVE = [
  {
    id: 'a1',
    with: 'ARI SAGAWA',
    handle: 'ari.s',
    project: 'GLASS HOUSE / 02',
    stage: 'In review',
    nextDate: 'Drop · Fri',
  },
];

const SUGGESTED = [
  { id: 's1', name: 'NIA RAVAL', handle: 'nia.r', tag: 'VISUAL · MUMBAI', fit: 92 },
  { id: 's2', name: 'JOSEPH OKE', handle: 'jay.oke', tag: 'AUDIO · LAGOS', fit: 88 },
  { id: 's3', name: 'CHARU MITRA', handle: 'charu', tag: 'WRITER · DELHI', fit: 81 },
];

export default function CollabIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [tab, setTab] = useState<Tab>('INBOX');
  const [openToCollab, setOpenToCollab] = useState(true);

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="CONNECT" title="COLLAB" />}
      waves={false}
    >
      <RNText style={styles.title}>build with other dawgs.</RNText>

      <View style={styles.statusCard}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.statusLabel}>STATUS</RNText>
          <RNText style={styles.statusValue}>
            {openToCollab ? 'Open to collab' : 'Closed for now'}
          </RNText>
        </View>
        <Switch
          value={openToCollab}
          onValueChange={(v) => {
            setOpenToCollab(v);
            toast(v ? 'Open to collabs.' : 'Collabs paused.', 'default');
          }}
          trackColor={{ false: palette.line, true: palette.ink }}
          thumbColor={palette.bone}
        />
      </View>

      <View style={styles.tabs}>
        {(['INBOX', 'ACTIVE', 'FIND'] as Tab[]).map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <RNText style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {t}
              </RNText>
            </Pressable>
          );
        })}
      </View>

      {tab === 'INBOX' && (
        <Section eyebrow={`${REQUESTS.length} REQUESTS`}>
          {REQUESTS.map((r) => (
            <View key={r.id} style={styles.requestCard}>
              <View style={styles.requestHead}>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.requestName}>{r.from}</RNText>
                  <RNText style={styles.requestMeta}>
                    @{r.handle}  ·  {r.category}  ·  {r.time}
                  </RNText>
                </View>
                <View style={styles.requestPing}>
                  <RNText style={styles.requestPingText}>NEW</RNText>
                </View>
              </View>
              <RNText style={styles.requestPitch} numberOfLines={3}>
                {r.pitch}
              </RNText>
              <View style={styles.requestActions}>
                <Pressable
                  onPress={() => toast(`Declined ${r.from}.`, 'default')}
                  style={styles.declineBtn}
                >
                  <RNText style={styles.declineText}>DECLINE</RNText>
                </Pressable>
                <Pressable
                  onPress={() => router.push(`/(modules)/collab/request?id=${r.id}` as any)}
                  style={styles.acceptBtn}
                >
                  <RNText style={styles.acceptText}>REVIEW</RNText>
                  <Ionicons name="arrow-forward" size={14} color={palette.bone} />
                </Pressable>
              </View>
            </View>
          ))}
        </Section>
      )}

      {tab === 'ACTIVE' && (
        <Section eyebrow={`${ACTIVE.length} IN PROGRESS`}>
          {ACTIVE.map((a) => (
            <Pressable
              key={a.id}
              onPress={() => router.push('/(tabs)/inbox')}
              style={styles.activeCard}
            >
              <View style={{ flex: 1 }}>
                <RNText style={styles.activeName}>{a.with}</RNText>
                <RNText style={styles.activeProject}>{a.project}</RNText>
                <View style={styles.activeMetaRow}>
                  <View style={styles.activeStage}>
                    <RNText style={styles.activeStageText}>{a.stage}</RNText>
                  </View>
                  <RNText style={styles.activeDate}>{a.nextDate}</RNText>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={palette.ink} />
            </Pressable>
          ))}
        </Section>
      )}

      {tab === 'FIND' && (
        <Section eyebrow="SUGGESTED MATCHES">
          {SUGGESTED.map((s) => (
            <View key={s.id} style={styles.suggestCard}>
              <View style={{ flex: 1 }}>
                <RNText style={styles.suggestName}>{s.name}</RNText>
                <RNText style={styles.suggestMeta}>{s.tag}</RNText>
              </View>
              <View style={styles.fitBox}>
                <RNText style={styles.fitLabel}>FIT</RNText>
                <RNText style={styles.fitValue}>{s.fit}</RNText>
              </View>
              <Pressable
                onPress={() => router.push('/(modules)/collab/send')}
                style={styles.inviteBtn}
              >
                <Ionicons name="add" size={14} color={palette.bone} />
                <RNText style={styles.inviteText}>INVITE</RNText>
              </Pressable>
            </View>
          ))}
        </Section>
      )}
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 36,
    lineHeight: 38,
    letterSpacing: -1.6,
    color: palette.ink,
    marginTop: 6,
    marginBottom: 18,
  },

  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
    gap: 14,
  },
  statusLabel: {
    ...T.label,
    opacity: 0.55,
    color: palette.ink,
  },
  statusValue: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    letterSpacing: -0.3,
    color: palette.ink,
    marginTop: 4,
  },

  tabs: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 22,
    marginBottom: 4,
  },
  tab: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: palette.ink,
  },
  tabLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.8,
    color: palette.ink,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  tabLabelActive: {
    color: palette.bone,
    opacity: 1,
  },

  requestCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
    marginBottom: 10,
    gap: 10,
  },
  requestHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  requestName: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    letterSpacing: -0.4,
    color: palette.ink,
  },
  requestMeta: {
    ...T.small,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 2,
  },
  requestPing: {
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestPingText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.6,
    color: palette.ink,
  },
  requestPitch: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: palette.ink,
    opacity: 0.85,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  declineBtn: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2,
    color: palette.ink,
  },
  acceptBtn: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: palette.ink,
  },
  acceptText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2,
    color: palette.bone,
  },

  activeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
    marginBottom: 10,
  },
  activeName: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  activeProject: {
    ...T.small,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 2,
  },
  activeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  activeStage: {
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStageText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.4,
    color: palette.ink,
  },
  activeDate: {
    ...T.small,
    color: palette.ink,
    opacity: 0.65,
  },

  suggestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
    marginBottom: 10,
  },
  suggestName: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  suggestMeta: {
    ...T.small,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 2,
  },
  fitBox: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.ink,
  },
  fitLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    letterSpacing: 1.4,
    color: palette.ink,
    opacity: 0.55,
  },
  fitValue: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: palette.ink,
    marginTop: -1,
  },
  inviteBtn: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: palette.ink,
  },
  inviteText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: palette.bone,
  },
});
