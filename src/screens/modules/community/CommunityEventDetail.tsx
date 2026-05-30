import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { communityEventsSeed } from '@/data/mock';
import { useStore } from '@/store';

// Fabricated per-kind copy so every seed event reads like a real listing.
const ABOUT: Record<string, string[]> = {
  WEBINAR: [
    'Live walkthrough, screens shared, real work on the table.',
    'Come with a link to your portfolio — a few get torn down on air.',
    'Recording goes to everyone who RSVPs. No fluff.',
  ],
  MEETUP: [
    'In-person, low-key, no badges or name tags.',
    'Bring a print, a sketch, or just yourself.',
    'Drinks after for whoever sticks around.',
  ],
  AMA: [
    'Open floor — ask the awkward money questions.',
    'Answers are blunt and specific to your situation.',
    'Drop your question early; top-voted get answered first.',
  ],
  WORKSHOP: [
    'Hands-on. You leave with something finished, not notes.',
    'Limited seats so everyone gets eyes on their work.',
    'Materials list goes out the day before.',
  ],
};

const AGENDA: Record<string, string[]> = {
  WEBINAR: ['Intro + what to expect', 'Live teardowns', 'Q&A and next steps'],
  MEETUP: ['Doors + mingle', 'Show-and-tell circle', 'Open studio + drinks'],
  AMA: ['Ground rules', 'Top-voted questions', 'Rapid-fire round'],
  WORKSHOP: ['Setup + warm-up', 'Build the thing', 'Critique + wrap'],
};

const ATTENDEE_NAMES = ['Maya Patel', 'Kore Odu', 'Lin Wei', 'Nyla Best', 'Ari Sol'];

export default function CommunityEventDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const { id } = useLocalSearchParams<{ id?: string }>();
  const event = useMemo(
    () => communityEventsSeed.find((e) => e.id === id) ?? communityEventsSeed[0],
    [id],
  );

  const [going, setGoing] = useState(false);
  const [bump, setBump] = useState(0); // local RSVP count delta
  const rsvpCount = event.rsvps + bump;

  const about = ABOUT[event.kind] ?? ABOUT.WEBINAR;
  const agenda = AGENDA[event.kind] ?? AGENDA.WEBINAR;
  const extraGoing = Math.max(rsvpCount - ATTENDEE_NAMES.length, 0);

  const toggleRsvp = () => {
    if (going) {
      setGoing(false);
      setBump((b) => b - 1);
      toast('RSVP withdrawn.');
    } else {
      setGoing(true);
      setBump((b) => b + 1);
      toast('RSVP confirmed.', 'success');
    }
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="EVENT" title="DETAIL" showBack />} waves={false}>
      {/* Hero */}
      <View style={[styles.kindPill, { backgroundColor: event.accent }]}>
        <RNText style={styles.kindLabel} maxFontSizeMultiplier={1.1}>
          {event.kind}
        </RNText>
      </View>
      <RNText style={styles.title} numberOfLines={3} adjustsFontSizeToFit minimumFontScale={0.6}>
        {event.title.toLowerCase()}
      </RNText>

      <View style={styles.heroMeta}>
        <View style={styles.metaRow}>
          <Ionicons name="people-outline" size={15} color={palette.ink} style={styles.metaIcon} />
          <RNText style={styles.metaText} maxFontSizeMultiplier={1.15}>
            Hosted by {event.host}
          </RNText>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={15} color={palette.ink} style={styles.metaIcon} />
          <RNText style={styles.metaText} maxFontSizeMultiplier={1.15}>
            {event.when}
          </RNText>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={15} color={palette.ink} style={styles.metaIcon} />
          <RNText style={styles.metaText} maxFontSizeMultiplier={1.15}>
            {event.location}
          </RNText>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="checkmark-circle" size={15} color={palette.ink} style={styles.metaIcon} />
          <RNText style={styles.metaText} maxFontSizeMultiplier={1.15}>
            {rsvpCount} going
          </RNText>
        </View>
      </View>

      {/* About */}
      <Section eyebrow="ABOUT" title="the gist.">
        <View style={styles.aboutCard}>
          {about.map((line, i) => (
            <RNText key={i} style={styles.aboutLine} maxFontSizeMultiplier={1.2}>
              {line}
            </RNText>
          ))}
        </View>
      </Section>

      {/* Agenda */}
      <Section eyebrow="AGENDA" title="how it runs.">
        {agenda.map((step, i) => (
          <View key={i} style={styles.agendaRow}>
            <View style={[styles.agendaNum, { backgroundColor: event.accent }]}>
              <RNText style={styles.agendaNumLabel} maxFontSizeMultiplier={1.1}>
                {i + 1}
              </RNText>
            </View>
            <RNText style={styles.agendaText} numberOfLines={2} maxFontSizeMultiplier={1.2}>
              {step}
            </RNText>
          </View>
        ))}
      </Section>

      {/* Attendees */}
      <Section eyebrow="ATTENDEES" title="who's in.">
        <View style={styles.attendeeRow}>
          {ATTENDEE_NAMES.map((name, i) => {
            const initials = name
              .split(' ')
              .map((p) => p.charAt(0))
              .join('')
              .slice(0, 2);
            const colors = [palette.acid, palette.electric, palette.blush, palette.ember, palette.mute];
            return (
              <View
                key={name}
                style={[
                  styles.avatar,
                  { backgroundColor: colors[i % colors.length], marginLeft: i === 0 ? 0 : -10 },
                ]}
              >
                <RNText style={styles.avatarInitials} maxFontSizeMultiplier={1.1}>
                  {initials}
                </RNText>
              </View>
            );
          })}
          {extraGoing > 0 && (
            <RNText style={styles.plusGoing} maxFontSizeMultiplier={1.15}>
              +{extraGoing} going
            </RNText>
          )}
        </View>
      </Section>

      {/* RSVP CTA */}
      <Tap
        onPress={toggleRsvp}
        burstColor={going ? palette.acid : palette.bone}
        style={[styles.cta, going && styles.ctaGoing]}
      >
        <RNText style={[styles.ctaLabel, going && styles.ctaLabelGoing]}>
          {going ? "YOU'RE GOING" : 'RSVP'}
        </RNText>
        <View style={[styles.ctaArrow, going && styles.ctaArrowGoing]}>
          <Ionicons
            name={going ? 'checkmark-circle' : 'arrow-forward'}
            size={16}
            color={going ? palette.bone : palette.ink}
          />
        </View>
      </Tap>

      {/* Going-only actions */}
      {going && (
        <View style={styles.subActions}>
          <Tap
            onPress={() => toast('Reminder set for 1h before.')}
            burstColor={palette.acid}
            style={styles.subAction}
          >
            <Ionicons name="time-outline" size={15} color={palette.ink} />
            <RNText style={styles.subActionLabel} maxFontSizeMultiplier={1.1}>
              SET REMINDER
            </RNText>
          </Tap>
          <Tap
            onPress={() => toast('Added to calendar.')}
            burstColor={palette.electric}
            style={styles.subAction}
          >
            <Ionicons name="calendar-outline" size={15} color={palette.ink} />
            <RNText style={styles.subActionLabel} maxFontSizeMultiplier={1.1}>
              ADD TO CALENDAR
            </RNText>
          </Tap>
        </View>
      )}

      {/* Browse more */}
      <Tap
        onPress={() => router.push('/(modules)/community/events')}
        burstColor={palette.ink}
        style={styles.browseRow}
      >
        <Ionicons name="chevron-forward" size={15} color={palette.ink} />
        <RNText style={styles.browseLabel} maxFontSizeMultiplier={1.1}>
          ALL EVENTS
        </RNText>
      </Tap>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    kindPill: {
      alignSelf: 'flex-start',
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginTop: 4,
    },
    kindLabel: { ...T.label, color: staticPalette.ink, letterSpacing: 1.6, fontSize: 10 },
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 10,
    },

    heroMeta: { marginTop: 18, gap: 9 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
    metaIcon: { opacity: 0.7 },
    metaText: { ...T.body, color: palette.ink, opacity: 0.82 },

    aboutCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 10,
    },
    aboutLine: { fontFamily: fonts.editorial, fontSize: 16, lineHeight: 23, color: palette.ink, opacity: 0.9 },

    agendaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 11,
      paddingHorizontal: 12,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      marginBottom: 6,
    },
    agendaNum: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    agendaNumLabel: { fontFamily: fonts.displayBold, fontSize: 14, color: staticPalette.ink },
    agendaText: { ...T.body, color: palette.ink, flex: 1, fontFamily: fonts.bodyMedium },

    attendeeRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: palette.paper,
    },
    avatarInitials: { fontFamily: fonts.displayBold, fontSize: 13, color: staticPalette.ink },
    plusGoing: { ...T.label, color: palette.ink, opacity: 0.65, letterSpacing: 1.2, marginLeft: 12 },

    cta: {
      marginTop: 22,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaGoing: { backgroundColor: palette.acid },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    ctaLabelGoing: { color: palette.ink },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ctaArrowGoing: { backgroundColor: palette.ink },

    subActions: { flexDirection: 'row', gap: 10, marginTop: 10 },
    subAction: {
      flex: 1,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
    },
    subActionLabel: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.4, color: palette.ink },

    browseRow: {
      marginTop: 22,
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
    browseLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
