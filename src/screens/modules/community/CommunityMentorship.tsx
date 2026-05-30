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
import { mentorsSeed } from '@/data/mock';
import { useStore } from '@/store';

type Filter = 'ALL' | 'OPEN' | 'FREE';
const FILTERS: Filter[] = ['ALL', 'OPEN', 'FREE'];

export default function CommunityMentorship() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [filter, setFilter] = useState<Filter>('ALL');
  const [isMentor, setIsMentor] = useState(false);

  // Become-a-mentor sheet
  const [becomeOpen, setBecomeOpen] = useState(false);
  const [myExpertise, setMyExpertise] = useState('');
  const [myRate, setMyRate] = useState('');

  // Request-mentorship sheet (keyed to a mentor)
  const [reqMentor, setReqMentor] = useState<(typeof mentorsSeed)[number] | null>(null);
  const [goal, setGoal] = useState('');
  const [prefTime, setPrefTime] = useState('');

  const availColor = (a: 'OPEN' | 'WAITLIST' | 'FULL') =>
    a === 'OPEN' ? palette.acid : a === 'WAITLIST' ? palette.mute : palette.ember;

  const mentors = useMemo(() => {
    if (filter === 'OPEN') return mentorsSeed.filter((m) => m.avail === 'OPEN');
    if (filter === 'FREE') return mentorsSeed.filter((m) => /free/i.test(m.rate));
    return mentorsSeed;
  }, [filter]);

  const confirmBecome = () => {
    setIsMentor(true);
    setBecomeOpen(false);
    setMyExpertise('');
    setMyRate('');
    toast("You're listed as a mentor.", 'success');
  };

  const confirmRequest = () => {
    setReqMentor(null);
    setGoal('');
    setPrefTime('');
    toast('Request sent.', 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MENTORSHIP" title="COMMUNITY" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        learn from{'\n'}the best.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Real creators, one rung ahead. Book a session or list yourself and pass it on.
      </RNText>

      {/* ===== Become a mentor toggle ===== */}
      <Tap
        onPress={() => (isMentor ? setIsMentor(false) : setBecomeOpen(true))}
        burstColor={palette.acid}
        style={[styles.becomeRow, isMentor && { backgroundColor: palette.ink, borderColor: palette.ink }]}
      >
        <View style={[styles.becomeIcon, isMentor && { backgroundColor: palette.acid }]}>
          <Ionicons
            name={isMentor ? 'checkmark-circle' : 'sparkles-outline'}
            size={18}
            color={isMentor ? palette.ink : palette.ink}
          />
        </View>
        <View style={{ flex: 1 }}>
          <RNText
            style={[styles.becomeLabel, isMentor && { color: palette.bone }]}
            maxFontSizeMultiplier={1.1}
          >
            BECOME A MENTOR
          </RNText>
          <RNText
            style={[styles.becomeSub, isMentor && { color: palette.bone, opacity: 0.7 }]}
            maxFontSizeMultiplier={1.1}
          >
            {isMentor ? 'Listed · tap to unlist' : 'List your expertise and rate'}
          </RNText>
        </View>
        <View style={[styles.switch, isMentor && { backgroundColor: palette.acid }]}>
          <View style={[styles.knob, isMentor && { alignSelf: 'flex-end' }]} />
        </View>
      </Tap>

      {/* ===== Filters ===== */}
      <Section eyebrow={`MENTORS · ${mentors.length}`} title="find your match.">
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
          ))}
        </View>

        {mentors.length === 0 && (
          <View style={styles.empty}>
            <RNText style={styles.emptyText}>No mentors match this filter.</RNText>
          </View>
        )}

        {mentors.map((m) => {
          const full = m.avail === 'FULL';
          return (
            <View key={m.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.avatar, { backgroundColor: m.accent }]}>
                  <RNText style={styles.initial} maxFontSizeMultiplier={1.1}>
                    {m.name.charAt(0)}
                  </RNText>
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.name} numberOfLines={1} maxFontSizeMultiplier={1.15}>
                    {m.name}
                  </RNText>
                  <RNText style={styles.handle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                    {m.handle}
                  </RNText>
                </View>
                <View style={[styles.availPill, { backgroundColor: availColor(m.avail) }]}>
                  <RNText
                    style={[
                      styles.availLabel,
                      { color: m.avail === 'OPEN' ? palette.ink : palette.bone },
                    ]}
                    maxFontSizeMultiplier={1.1}
                  >
                    {m.avail}
                  </RNText>
                </View>
              </View>

              <View style={styles.expertiseRow}>
                <View style={styles.expertisePill}>
                  <RNText style={styles.expertiseLabel} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                    {m.expertise}
                  </RNText>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Ionicons name="star" size={13} color={palette.acid} />
                <RNText style={styles.rating} maxFontSizeMultiplier={1.1}>
                  {m.rating.toFixed(1)}
                </RNText>
                <RNText style={styles.reviews} maxFontSizeMultiplier={1.1}>
                  ({m.reviews} reviews)
                </RNText>
                <View style={{ flex: 1 }} />
                <RNText style={styles.rate} maxFontSizeMultiplier={1.1}>
                  {m.rate}
                </RNText>
              </View>

              <Tap
                onPress={() => setReqMentor(m)}
                disabled={full}
                burstColor={m.accent}
                style={[styles.reqBtn, full && styles.reqBtnDisabled]}
              >
                <RNText
                  style={[styles.reqLabel, full && { color: palette.mute }]}
                  maxFontSizeMultiplier={1.1}
                >
                  {full ? 'FULLY BOOKED' : 'REQUEST MENTORSHIP'}
                </RNText>
                {!full && (
                  <View style={styles.reqArrow}>
                    <Ionicons name="arrow-forward" size={14} color={palette.ink} />
                  </View>
                )}
              </Tap>
            </View>
          );
        })}
      </Section>

      {/* ===== Back to community ===== */}
      <Tap
        onPress={() => router.push('/(modules)/community')}
        burstColor={palette.ink}
        style={styles.backRow}
      >
        <Ionicons name="people-outline" size={16} color={palette.ink} />
        <RNText style={styles.backText}>BACK TO COMMUNITY</RNText>
      </Tap>

      {/* ===== Become a mentor sheet ===== */}
      <Sheet
        visible={becomeOpen}
        onClose={() => setBecomeOpen(false)}
        eyebrow="BECOME A MENTOR"
        title="list yourself."
      >
        <RNText style={styles.field}>YOUR EXPERTISE</RNText>
        <TextInput
          value={myExpertise}
          onChangeText={setMyExpertise}
          placeholder="e.g. PRICING · CLIENT WORK"
          placeholderTextColor={palette.inkMuted}
          style={styles.input}
          maxFontSizeMultiplier={1.2}
        />
        <RNText style={styles.field}>HOURLY RATE</RNText>
        <TextInput
          value={myRate}
          onChangeText={setMyRate}
          placeholder="e.g. $90 / hr  or  FREE"
          placeholderTextColor={palette.inkMuted}
          style={styles.input}
          maxFontSizeMultiplier={1.2}
        />
        <Pressable onPress={confirmBecome} style={styles.sheetCta}>
          <RNText style={styles.sheetCtaText}>LIST ME AS A MENTOR</RNText>
        </Pressable>
      </Sheet>

      {/* ===== Request mentorship sheet ===== */}
      <Sheet
        visible={reqMentor !== null}
        onClose={() => setReqMentor(null)}
        eyebrow={reqMentor ? `REQUEST · ${reqMentor.handle}` : 'REQUEST'}
        title="book a session."
      >
        <RNText style={styles.field}>WHAT'S YOUR GOAL?</RNText>
        <TextInput
          value={goal}
          onChangeText={setGoal}
          placeholder="What do you want to get out of this?"
          placeholderTextColor={palette.inkMuted}
          style={[styles.input, styles.inputTall]}
          multiline
          maxFontSizeMultiplier={1.2}
        />
        <RNText style={styles.field}>PREFERRED TIME</RNText>
        <TextInput
          value={prefTime}
          onChangeText={setPrefTime}
          placeholder="e.g. Weekday evenings IST"
          placeholderTextColor={palette.inkMuted}
          style={styles.input}
          maxFontSizeMultiplier={1.2}
        />
        <Pressable onPress={confirmRequest} style={styles.sheetCta}>
          <RNText style={styles.sheetCtaText}>SEND REQUEST</RNText>
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
    },
    body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 14, maxWidth: 360 },

    /* Become a mentor */
    becomeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 20,
      padding: 14,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    becomeIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    becomeLabel: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 1.6, color: palette.ink },
    becomeSub: { ...T.small, color: palette.inkMuted, marginTop: 2 },
    switch: {
      width: 44,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.line,
      padding: 3,
      justifyContent: 'center',
    },
    knob: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: palette.bone,
    },

    /* Filters */
    filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },

    empty: {
      paddingVertical: 28,
      alignItems: 'center',
    },
    emptyText: { ...T.body, color: palette.inkMuted },

    /* Mentor card */
    card: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 20,
      backgroundColor: palette.paper,
      padding: 16,
      marginBottom: 10,
      gap: 12,
    },
    cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    initial: { fontFamily: fonts.displayBold, fontSize: 19, color: staticPalette.ink },
    name: { fontFamily: fonts.displayHeavy, fontSize: 16, color: palette.ink, letterSpacing: -0.3 },
    handle: { ...T.small, color: palette.inkMuted, marginTop: 2 },
    availPill: { paddingVertical: 5, paddingHorizontal: 11, borderRadius: 11 },
    availLabel: { ...T.micro, fontFamily: fonts.bodyBold, letterSpacing: 1.4, fontSize: 9 },

    expertiseRow: { flexDirection: 'row' },
    expertisePill: {
      alignSelf: 'flex-start',
      maxWidth: '100%',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    expertiseLabel: { ...T.label, color: palette.ink, letterSpacing: 1.2, fontSize: 10 },

    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    rating: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },
    reviews: { ...T.small, color: palette.inkMuted },
    rate: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.4, color: palette.ink },

    reqBtn: {
      height: 50,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    reqBtnDisabled: { backgroundColor: palette.boneSoft, borderWidth: 1, borderColor: palette.line },
    reqLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.bone },
    reqArrow: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* Back */
    backRow: {
      marginTop: 8,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    backText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },

    /* Sheet */
    field: {
      ...T.label,
      color: palette.inkMuted,
      letterSpacing: 1.6,
      marginTop: 12,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 14,
      backgroundColor: palette.paper,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
    },
    inputTall: { minHeight: 76, textAlignVertical: 'top' },
    sheetCta: {
      marginTop: 20,
      height: 56,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetCtaText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2, color: palette.bone },
  });
