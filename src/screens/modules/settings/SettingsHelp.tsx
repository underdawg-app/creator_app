import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, TextInput } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { Sheet } from '@/components/ui/Sheet';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

type Faq = { q: string; a: string };

const FAQ: Faq[] = [
  { q: 'How do I get paid?', a: 'Payouts land in your linked account 2-3 business days after a deal is marked delivered.' },
  { q: 'When does a deal advance?', a: 'Each stage moves once both sides confirm. Check Active Deals to see what is waiting on you.' },
  { q: 'Can I edit my rate card?', a: 'Yes. Open Jobs to Rate Card and update any line. Changes apply to new offers only.' },
  { q: 'How is tax handled?', a: 'We estimate TDS at 10% on Indian payouts. See Finance to Tax for your running summary.' },
  { q: 'How do I verify my account?', a: 'Open Reputation and finish the verification steps. Most checks clear within a day.' },
  { q: 'Is my data private?', a: 'You control visibility per field in Settings to Privacy. We never sell creator data.' },
];

type SheetKind = 'support' | 'problem' | 'feedback' | null;

const SHEET_META: Record<Exclude<SheetKind, null>, { eyebrow: string; title: string }> = {
  support: { eyebrow: 'WE REPLY FAST', title: 'Contact support' },
  problem: { eyebrow: 'SOMETHING BROKE?', title: 'Report a problem' },
  feedback: { eyebrow: 'TELL US ANYTHING', title: 'Send feedback' },
};

export default function SettingsHelp() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ;
    return FAQ.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  const closeSheet = () => {
    setSheet(null);
    setSubject('');
    setMessage('');
  };

  const submitSheet = () => {
    if (!message.trim()) {
      toast('Add a message first.', 'warn');
      return;
    }
    const kind = sheet;
    closeSheet();
    if (kind === 'support') toast('Ticket #4821 opened.', 'success');
    else if (kind === 'problem') toast('Report sent — we are on it.', 'success');
    else toast('Thanks — noted.', 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="SETTINGS · SUPPORT" title="HELP" />} waves={false}>
      <RNText style={styles.title}>need a hand?</RNText>

      <View style={styles.search}>
        <Ionicons name="search-outline" size={18} color={palette.mute} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search help…"
          placeholderTextColor={palette.mute}
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 ? (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close" size={18} color={palette.mute} />
          </Pressable>
        ) : null}
      </View>

      <Section eyebrow="FAQ">
        {results.length === 0 ? (
          <RNText style={styles.empty}>No matches. Try contacting support below.</RNText>
        ) : (
          results.map((f, i) => {
            const isOpen = open === i;
            return (
              <Tap
                key={f.q}
                onPress={() => setOpen(isOpen ? null : i)}
                style={[styles.faq, isOpen && { borderColor: palette.ink }]}
              >
                <View style={styles.faqHead}>
                  <RNText style={styles.faqQ} maxFontSizeMultiplier={1.15}>
                    {f.q}
                  </RNText>
                  <Ionicons
                    name={isOpen ? 'chevron-down' : 'chevron-forward'}
                    size={16}
                    color={palette.mute}
                  />
                </View>
                {isOpen ? (
                  <RNText style={styles.faqA} maxFontSizeMultiplier={1.2}>
                    {f.a}
                  </RNText>
                ) : null}
              </Tap>
            );
          })
        )}
      </Section>

      <Section eyebrow="CONTACT">
        <ListCell
          icon="chatbubble-ellipses-outline"
          title="Contact support"
          subtitle="Typical reply in a few hours"
          onPress={() => setSheet('support')}
        />
        <ListCell
          icon="warning-outline"
          title="Report a problem"
          subtitle="Bugs, glitches, broken flows"
          onPress={() => setSheet('problem')}
        />
        <ListCell
          icon="sparkles-outline"
          title="Send feedback"
          subtitle="Ideas to make UNDERDAWG better"
          onPress={() => setSheet('feedback')}
        />
      </Section>

      <Section eyebrow="LEGAL">
        <ListCell
          icon="people-outline"
          title="Community guidelines"
          onPress={() => toast('Opening…', 'default')}
        />
        <ListCell
          icon="document-text-outline"
          title="Terms of service"
          onPress={() => toast('Opening…', 'default')}
        />
        <ListCell
          icon="lock-closed-outline"
          title="Privacy policy"
          onPress={() => toast('Opening…', 'default')}
        />
      </Section>

      <Sheet
        visible={sheet !== null}
        onClose={closeSheet}
        eyebrow={sheet ? SHEET_META[sheet].eyebrow : undefined}
        title={sheet ? SHEET_META[sheet].title : undefined}
      >
        {sheet === 'support' ? (
          <>
            <RNText style={styles.fieldLabel}>SUBJECT</RNText>
            <TextInput
              value={subject}
              onChangeText={setSubject}
              placeholder="What's this about?"
              placeholderTextColor={palette.mute}
              style={styles.input}
            />
          </>
        ) : null}

        <RNText style={styles.fieldLabel}>
          {sheet === 'feedback' ? 'YOUR THOUGHTS' : 'MESSAGE'}
        </RNText>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={
            sheet === 'problem'
              ? 'What happened, and where?'
              : sheet === 'feedback'
              ? 'What would you change?'
              : 'Tell us what you need…'
          }
          placeholderTextColor={palette.mute}
          style={[styles.input, styles.inputMulti]}
          multiline
        />

        <Tap onPress={submitSheet} variant="heavy" style={styles.cta}>
          <RNText style={styles.ctaLabel}>
            {sheet === 'feedback' ? 'Send feedback' : sheet === 'problem' ? 'Send report' : 'Open ticket'}
          </RNText>
          <View style={styles.ctaChip}>
            <Ionicons name="arrow-forward" size={15} color={palette.ink} />
          </View>
        </Tap>
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
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
      paddingHorizontal: 14,
      height: 52,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    searchInput: {
      flex: 1,
      ...T.body,
      color: palette.ink,
      padding: 0,
    },
    empty: {
      ...T.small,
      color: palette.mute,
      paddingVertical: 8,
    },
    faq: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    faqHead: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    faqQ: {
      ...T.bodyMedium,
      color: palette.ink,
      flex: 1,
    },
    faqA: {
      ...T.small,
      color: palette.inkMuted,
      marginTop: 10,
      lineHeight: 19,
    },
    fieldLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.55,
      marginBottom: 8,
      marginTop: 4,
    },
    input: {
      ...T.body,
      color: palette.ink,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 14,
    },
    inputMulti: {
      minHeight: 96,
      textAlignVertical: 'top',
    },
    cta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      marginTop: 4,
    },
    ctaLabel: {
      ...T.button,
      color: palette.bone,
    },
    ctaChip: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
