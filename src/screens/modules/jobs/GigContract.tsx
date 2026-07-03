import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  TextInput,
} from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';

const TERMS: { label: string; value: string }[] = [
  { label: 'Parties', value: 'You × Lumen Skincare' },
  { label: 'Rate', value: '₹85,000' },
  { label: 'Payment terms', value: '50% on signing / 50% on approval' },
  { label: 'Deliverables', value: '1 Reel + 3 stories' },
  { label: 'Timeline', value: '14 days from signing' },
  { label: 'Usage rights', value: 'Organic, 90 days' },
  { label: 'Exclusivity', value: 'No competing skincare, 30 days' },
  { label: 'Content ownership', value: 'Creator retains, brand licensed' },
  { label: 'Revisions', value: '2 included' },
];

const CLAUSES: { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'Scope',
    body: 'Creator delivers the agreed deliverables in the formats listed. Anything outside this scope is a new agreement.',
  },
  {
    n: '02',
    title: 'Payment',
    body: '50% is released on signing. The balance clears within 7 days of brand approval. No payment is withheld past approval.',
  },
  {
    n: '03',
    title: 'Revisions',
    body: 'Two rounds of revisions are included. Further rounds are billed at the agreed hourly rate.',
  },
  {
    n: '04',
    title: 'Usage & ownership',
    body: 'Creator owns the content. Brand receives an organic license for 90 days. Paid amplification is a separate fee.',
  },
];

export default function GigContract() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const [signed, setSigned] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);
  const [sigText, setSigText] = useState('');
  const [changeText, setChangeText] = useState('');

  const confirmSign = () => {
    if (sigText.trim().length < 2) {
      toast('Type your full name to sign.', 'warn');
      return;
    }
    setSigned(true);
    setSignOpen(false);
    confetti();
    toast('Signed. Deal is now active.', 'success');
  };

  const sendChange = () => {
    if (changeText.trim().length < 4) {
      toast('Tell the brand what to change.', 'warn');
      return;
    }
    setChangeOpen(false);
    setChangeText('');
    toast('Change request sent.', 'success');
  };

  return (
    <ScreenFrame
      waves={false}
      header={<ModuleHeader eyebrow="GIG · CONTRACT" title="CONTRACT" />}
    >
      <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
        the contract.
      </RNText>

      <View
        style={[
          styles.statusPill,
          {
            backgroundColor: signed ? palette.ink : palette.boneSoft,
            borderColor: signed ? palette.ink : palette.line,
          },
        ]}
      >
        <Ionicons
          name={signed ? 'checkmark-circle' : 'time-outline'}
          size={14}
          color={signed ? palette.acid : palette.mute}
        />
        <RNText
          style={[styles.statusLabel, { color: signed ? palette.bone : palette.ink }]}
          maxFontSizeMultiplier={1.1}
        >
          {signed ? 'SIGNED' : 'UNSIGNED'}
        </RNText>
      </View>

      <Section eyebrow="KEY TERMS">
        <View style={styles.termsCard}>
          {TERMS.map((t, i) => (
            <View
              key={t.label}
              style={[styles.termRow, i < TERMS.length - 1 && styles.termDivider]}
            >
              <RNText style={styles.termLabel} maxFontSizeMultiplier={1.15}>
                {t.label}
              </RNText>
              <RNText
                style={styles.termValue}
                numberOfLines={2}
                maxFontSizeMultiplier={1.1}
              >
                {t.value}
              </RNText>
            </View>
          ))}
        </View>
      </Section>

      <Section eyebrow="FULL CONTRACT">
        <Chip
          label={showFull ? 'HIDE FULL TERMS' : 'READ FULL TERMS'}
          active={showFull}
          onPress={() => setShowFull((v) => !v)}
        />
        {showFull ? (
          <View style={styles.clauses}>
            {CLAUSES.map((c) => (
              <View key={c.n} style={styles.clause}>
                <RNText style={styles.clauseHead} maxFontSizeMultiplier={1.1}>
                  {c.n} · {c.title}
                </RNText>
                <RNText style={styles.clauseBody} maxFontSizeMultiplier={1.2}>
                  {c.body}
                </RNText>
              </View>
            ))}
          </View>
        ) : null}
      </Section>

      <View style={styles.secondaryRow}>
        <Tap
          onPress={() => setChangeOpen(true)}
          style={styles.secondaryBtn}
          burstColor={palette.acid}
        >
          <Ionicons name="create-outline" size={15} color={palette.ink} />
          <RNText style={styles.secondaryLabel} maxFontSizeMultiplier={1.1}>
            REQUEST CHANGES
          </RNText>
        </Tap>
        <Tap
          onPress={() => toast('Contract saved to Files.', 'success')}
          style={styles.secondaryBtn}
          burstColor={palette.acid}
        >
          <Ionicons name="cloud-upload-outline" size={15} color={palette.ink} />
          <RNText style={styles.secondaryLabel} maxFontSizeMultiplier={1.1}>
            DOWNLOAD PDF
          </RNText>
        </Tap>
      </View>

      <Pressable
        onPress={() =>
          signed ? router.push('/(modules)/jobs/deliver') : setSignOpen(true)
        }
        style={styles.cta}
      >
        <RNText style={styles.ctaLabel} maxFontSizeMultiplier={1.1}>
          {signed ? 'GO TO DELIVERABLES' : 'SIGN CONTRACT'}
        </RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </View>
      </Pressable>

      {/* Sign sheet */}
      <Sheet
        visible={signOpen}
        onClose={() => setSignOpen(false)}
        eyebrow="E-SIGNATURE"
        title="Sign to activate"
      >
        <RNText style={styles.sheetHint} maxFontSizeMultiplier={1.2}>
          Type your full legal name below to e-sign this contract.
        </RNText>
        <View style={styles.sigBox}>
          <TextInput
            style={styles.sigInput}
            value={sigText}
            onChangeText={setSigText}
            placeholder="your full name"
            placeholderTextColor={palette.mute}
            autoCapitalize="words"
            selectionColor={palette.acid}
            maxFontSizeMultiplier={1.15}
          />
          <RNText style={styles.sigCaption} maxFontSizeMultiplier={1.15}>
            signature
          </RNText>
        </View>
        <RNText style={styles.sheetMicro} maxFontSizeMultiplier={1.2}>
          By signing you agree to the key terms and full contract above. This is
          legally binding within UNDERDAWG.
        </RNText>
        <Pressable onPress={confirmSign} style={styles.sheetCta}>
          <RNText style={styles.sheetCtaLabel} maxFontSizeMultiplier={1.1}>
            CONFIRM SIGNATURE
          </RNText>
        </Pressable>
      </Sheet>

      {/* Change-request sheet */}
      <Sheet
        visible={changeOpen}
        onClose={() => setChangeOpen(false)}
        eyebrow="NEGOTIATE"
        title="Request changes"
      >
        <RNText style={styles.sheetHint} maxFontSizeMultiplier={1.2}>
          What would you like the brand to adjust before you sign?
        </RNText>
        <TextInput
          style={styles.changeInput}
          value={changeText}
          onChangeText={setChangeText}
          placeholder="e.g. push timeline to 21 days, add usage fee…"
          placeholderTextColor={palette.mute}
          multiline
          textAlignVertical="top"
          selectionColor={palette.acid}
          maxFontSizeMultiplier={1.2}
        />
        <Pressable onPress={sendChange} style={styles.sheetCta}>
          <RNText style={styles.sheetCtaLabel} maxFontSizeMultiplier={1.1}>
            SEND REQUEST
          </RNText>
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
    statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      alignSelf: 'flex-start',
      marginTop: 16,
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 999,
      borderWidth: 1,
    },
    statusLabel: {
      ...T.label,
    },

    termsCard: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 20,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
    },
    termRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      paddingVertical: 13,
    },
    termDivider: {
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    termLabel: {
      ...T.small,
      color: palette.mute,
    },
    termValue: {
      ...T.bodyMedium,
      color: palette.ink,
      flex: 1,
      textAlign: 'right',
    },

    clauses: { gap: 16 },
    clause: {
      borderLeftWidth: 2,
      borderLeftColor: palette.line,
      paddingLeft: 12,
      gap: 4,
    },
    clauseHead: {
      ...T.label,
      color: palette.ink,
    },
    clauseBody: {
      ...T.body,
      color: palette.ink,
      opacity: 0.7,
      lineHeight: 19,
    },

    secondaryRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 28,
    },
    secondaryBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      height: 48,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    secondaryLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.2,
      color: palette.ink,
      includeFontPadding: false,
    },

    cta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      paddingLeft: 22,
      paddingRight: 10,
      marginTop: 12,
    },
    ctaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.8,
      color: palette.bone,
      includeFontPadding: false,
    },
    ctaArrow: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    sheetHint: {
      ...T.body,
      color: palette.ink,
      opacity: 0.65,
      lineHeight: 20,
      marginBottom: 14,
    },
    sheetMicro: {
      ...T.small,
      color: palette.mute,
      lineHeight: 17,
      marginTop: 14,
    },
    sigBox: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 14,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
      paddingTop: 18,
      paddingBottom: 10,
    },
    sigInput: {
      fontFamily: fonts.editorialItalic,
      fontSize: 26,
      color: palette.ink,
      paddingVertical: 0,
    },
    sigCaption: {
      ...T.micro,
      color: palette.mute,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: palette.line,
      paddingTop: 8,
    },
    changeInput: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 14,
      backgroundColor: palette.paper,
      paddingHorizontal: 14,
      paddingVertical: 14,
      minHeight: 110,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
    },
    sheetCta: {
      height: 56,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 18,
    },
    sheetCtaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.8,
      color: palette.bone,
      includeFontPadding: false,
    },
  });
