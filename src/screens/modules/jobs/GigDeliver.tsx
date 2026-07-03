import React, { useMemo, useRef, useState } from 'react';
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
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

/* -------------------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------------- */

type DStatus = 'TODO' | 'UPLOADED';
type Deliverable = { id: string; label: string; status: DStatus };

type Phase = 'SUBMIT' | 'IN REVIEW' | 'REVISION' | 'APPROVED' | 'GO LIVE';
const PIPELINE: Phase[] = ['SUBMIT', 'IN REVIEW', 'REVISION', 'APPROVED', 'GO LIVE'];

const INITIAL: Deliverable[] = [
  { id: 'reels', label: '3 reels · 9:16', status: 'TODO' },
  { id: 'stills', label: '5 stills · grid set', status: 'TODO' },
  { id: 'captions', label: 'Captions + hashtags', status: 'TODO' },
];

const ASSETS = ['Logo pack', 'Color guide', 'Refs'];

/* -------------------------------------------------------------------------
 * Screen
 * ----------------------------------------------------------------------- */

export default function GigDeliver() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [items, setItems] = useState<Deliverable[]>(INITIAL);
  const [phase, setPhase] = useState<Phase>('SUBMIT');
  const [briefOpen, setBriefOpen] = useState(false);
  const [linkSheet, setLinkSheet] = useState(false);
  const [link, setLink] = useState('');
  const [revisionNote, setRevisionNote] = useState<string | null>(null);
  const reviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allUploaded = useMemo(
    () => items.every((d) => d.status === 'UPLOADED'),
    [items],
  );
  const doneCount = items.filter((d) => d.status === 'UPLOADED').length;

  const upload = (id: string) => {
    setItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'UPLOADED' } : d)),
    );
    toast('Uploaded.', 'success');
  };

  const submitForReview = () => {
    if (!allUploaded) {
      toast('Upload everything first.', 'warn');
      return;
    }
    setPhase('IN REVIEW');
    setRevisionNote(null);
    toast('Sent to brand for review.', 'default');
    // Simulate the brand approving after a beat.
    reviewTimer.current = setTimeout(() => {
      setPhase('APPROVED');
      toast('Brand approved the work.', 'success');
    }, 2200);
  };

  const requestRevision = () => {
    if (reviewTimer.current) clearTimeout(reviewTimer.current);
    setPhase('REVISION');
    setRevisionNote('Punch up the hook on reel 1 — first 2s feel slow.');
    // Bounce one deliverable back to TODO so the loop is real.
    setItems((prev) =>
      prev.map((d) => (d.id === 'reels' ? { ...d, status: 'TODO' } : d)),
    );
    toast('Revision requested.', 'warn');
  };

  const submitLink = () => {
    const v = link.trim();
    if (!v) {
      toast('Paste the live link first.', 'warn');
      return;
    }
    setLinkSheet(false);
    setPhase('GO LIVE');
    toast('Live link submitted. Payment releasing.', 'success');
    setTimeout(() => router.push('/(modules)/jobs/payment'), 320);
  };

  const phaseIdx = PIPELINE.indexOf(phase);

  return (
    <ScreenFrame
      waves={false}
      header={<ModuleHeader eyebrow="GIG · ACTIVE" title="DELIVER" />}
    >
      <RNText style={styles.title}>
        ship the work.
      </RNText>

      {/* Deadline / brand / amount */}
      <View style={styles.deadlineCard}>
        <View style={styles.deadlineLeft}>
          <RNText style={styles.kicker}>DEADLINE</RNText>
          <RNText style={styles.countdown}>4d 12h left</RNText>
          <RNText style={styles.brand}>Boldskin · Skincare drop</RNText>
        </View>
        <View style={styles.deadlineRight}>
          <RNText style={styles.kicker}>FEE</RNText>
          <RNText style={styles.amount}>₹48K</RNText>
        </View>
      </View>

      {/* Brief collapsible */}
      <Section eyebrow="THE ASK" title="brief.">
        <Pressable
          onPress={() => setBriefOpen((v) => !v)}
          style={styles.briefHead}
        >
          <RNText style={styles.briefHeadLabel}>
            {briefOpen ? 'Hide brief' : 'Read brief'}
          </RNText>
          <Ionicons
            name={briefOpen ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={palette.ink}
          />
        </Pressable>
        {briefOpen ? (
          <RNText style={styles.briefBody}>
            Hero a clean morning routine. Warm light, no harsh cuts. Product
            in-frame by 2s. Tone: calm, confident, a little dry. Hashtag
            #boldmornings.
          </RNText>
        ) : null}

        {/* Brand assets */}
        <RNText style={styles.assetsLabel}>BRAND ASSETS</RNText>
        <View style={styles.assetRow}>
          {ASSETS.map((a) => (
            <Chip
              key={a}
              label={a}
              accent={palette.electric}
              size="sm"
              onPress={() => toast('Downloaded.', 'success')}
            />
          ))}
        </View>
      </Section>

      {/* Deliverables checklist */}
      <Section eyebrow={`DELIVERABLES · ${doneCount}/${items.length}`} title="upload set.">
        {items.map((d) => {
          const done = d.status === 'UPLOADED';
          return (
            <View key={d.id} style={styles.delRow}>
              <Ionicons
                name={done ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={done ? palette.acid : palette.mute}
              />
              <RNText
                style={[styles.delLabel, done && styles.delLabelDone]}
                numberOfLines={1}
              >
                {d.label}
              </RNText>
              {done ? (
                <View style={styles.doneTag}>
                  <RNText style={styles.doneTagText}>UPLOADED</RNText>
                </View>
              ) : (
                <Tap
                  onPress={() => upload(d.id)}
                  burstColor={palette.acid}
                  style={styles.uploadBtn}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={14}
                    color={palette.ink}
                  />
                  <RNText style={styles.uploadBtnText}>UPLOAD</RNText>
                </Tap>
              )}
            </View>
          );
        })}
      </Section>

      {/* Review pipeline */}
      <Section eyebrow="STATUS" title="review pipeline.">
        <View style={styles.pipeline}>
          {PIPELINE.map((p, i) => {
            const active = i === phaseIdx;
            const passed = i < phaseIdx;
            return (
              <React.Fragment key={p}>
                <View style={styles.pipeStep}>
                  <View
                    style={[
                      styles.pipeDot,
                      passed && styles.pipeDotPassed,
                      active && styles.pipeDotActive,
                    ]}
                  >
                    {passed ? (
                      <Ionicons name="checkmark" size={11} color={palette.bone} />
                    ) : null}
                  </View>
                  <RNText
                    style={[styles.pipeLabel, active && styles.pipeLabelActive]}
                    numberOfLines={1}
                  >
                    {p}
                  </RNText>
                </View>
                {i < PIPELINE.length - 1 ? (
                  <View
                    style={[styles.pipeBar, passed && styles.pipeBarPassed]}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </View>

        {phase === 'IN REVIEW' ? (
          <View style={styles.noteCard}>
            <Ionicons name="time-outline" size={16} color={palette.electric} />
            <RNText style={styles.noteText}>
              With the brand. Approval usually lands fast.
            </RNText>
          </View>
        ) : null}

        {phase === 'REVISION' && revisionNote ? (
          <View style={[styles.noteCard, styles.noteCardWarn]}>
            <Ionicons name="create-outline" size={16} color={palette.ember} />
            <RNText style={styles.noteText}>{revisionNote}</RNText>
          </View>
        ) : null}
      </Section>

      {/* Primary CTA — state machine */}
      <View style={styles.ctaWrap}>
        {phase === 'APPROVED' || phase === 'GO LIVE' ? (
          <Tap
            onPress={() => setLinkSheet(true)}
            burstColor={palette.acid}
            style={styles.cta}
          >
            <RNText style={styles.ctaLabel}>GO LIVE & SUBMIT LINK</RNText>
            <View style={styles.ctaChip}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Tap>
        ) : phase === 'IN REVIEW' ? (
          <View style={[styles.cta, styles.ctaDisabled]}>
            <RNText style={[styles.ctaLabel, styles.ctaLabelMuted]}>
              IN REVIEW…
            </RNText>
            <View style={styles.ctaChip}>
              <Ionicons name="time-outline" size={16} color={palette.ink} />
            </View>
          </View>
        ) : (
          <Tap
            onPress={submitForReview}
            burstColor={palette.acid}
            style={[styles.cta, !allUploaded && styles.ctaDisabled]}
          >
            <RNText
              style={[styles.ctaLabel, !allUploaded && styles.ctaLabelMuted]}
            >
              {allUploaded ? 'SUBMIT FOR REVIEW' : 'UPLOAD ALL TO SUBMIT'}
            </RNText>
            <View style={styles.ctaChip}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Tap>
        )}

        {/* Revision demo branch */}
        {phase === 'IN REVIEW' || phase === 'APPROVED' ? (
          <Pressable onPress={requestRevision} style={styles.revBtn} hitSlop={6}>
            <Ionicons name="refresh-outline" size={14} color={palette.mute} />
            <RNText style={styles.revBtnText}>SIMULATE REVISION REQUEST</RNText>
          </Pressable>
        ) : null}
      </View>

      {/* Live link sheet */}
      <Sheet
        visible={linkSheet}
        onClose={() => setLinkSheet(false)}
        eyebrow="GO LIVE"
        title="submit live link"
      >
        <RNText style={styles.sheetHint}>
          Paste the public post URL. Payment releases on submit.
        </RNText>
        <View style={styles.inputWrap}>
          <Ionicons name="link-outline" size={16} color={palette.mute} />
          <TextInput
            value={link}
            onChangeText={setLink}
            placeholder="https://instagram.com/p/…"
            placeholderTextColor={palette.mute}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor={palette.acid}
            keyboardType="url"
          />
        </View>
        <Tap onPress={submitLink} burstColor={palette.acid} style={styles.cta}>
          <RNText style={styles.ctaLabel}>CONFIRM & RELEASE PAYMENT</RNText>
          <View style={styles.ctaChip}>
            <Ionicons name="send" size={15} color={palette.ink} />
          </View>
        </Tap>
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

    /* Deadline card */
    deadlineCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginTop: 20,
      padding: 18,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    deadlineLeft: { flex: 1, gap: 4 },
    deadlineRight: { alignItems: 'flex-end', gap: 4 },
    kicker: { ...T.label, color: palette.ink, opacity: 0.5 },
    countdown: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -1,
      color: palette.ink,
    },
    brand: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 2 },
    amount: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      lineHeight: 30,
      letterSpacing: -1,
      color: palette.ink,
    },

    /* Brief */
    briefHead: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    briefHeadLabel: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },
    briefBody: {
      ...T.body,
      color: palette.ink,
      opacity: 0.78,
      lineHeight: 20,
      marginTop: 10,
    },
    assetsLabel: { ...T.label, color: palette.ink, opacity: 0.5, marginTop: 18 },
    assetRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },

    /* Deliverables */
    delRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    delLabel: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, color: palette.ink },
    delLabelDone: { opacity: 0.5 },
    doneTag: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: 'rgba(216,255,61,0.32)',
    },
    doneTagText: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1,
      color: staticPalette.ink,
    },
    uploadBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    uploadBtnText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1,
      color: palette.ink,
    },

    /* Pipeline */
    pipeline: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    pipeStep: { alignItems: 'center', width: 58, gap: 6 },
    pipeDot: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pipeDotPassed: { backgroundColor: palette.ink, borderColor: palette.ink },
    pipeDotActive: { borderColor: palette.acid, borderWidth: 3 },
    pipeLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 8,
      letterSpacing: 0.4,
      color: palette.ink,
      opacity: 0.45,
      textAlign: 'center',
    },
    pipeLabelActive: { opacity: 1 },
    pipeBar: {
      flex: 1,
      height: 2,
      backgroundColor: palette.line,
      marginTop: 10,
    },
    pipeBarPassed: { backgroundColor: palette.ink },

    noteCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 16,
      padding: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    noteCardWarn: { borderColor: 'rgba(255,90,31,0.4)' },
    noteText: { flex: 1, ...T.body, color: palette.ink, opacity: 0.82, lineHeight: 19 },

    /* CTA */
    ctaWrap: { marginTop: 30, gap: 14 },
    cta: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      paddingLeft: 22,
      paddingRight: 10,
      borderRadius: 18,
      backgroundColor: palette.ink,
    },
    ctaDisabled: { opacity: 0.45 },
    ctaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 1.2,
      color: palette.bone,
    },
    ctaLabelMuted: { opacity: 0.85 },
    ctaChip: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
    revBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 8,
    },
    revBtnText: {
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.2,
      color: palette.mute,
    },

    /* Sheet */
    sheetHint: { ...T.body, color: palette.ink, opacity: 0.7, lineHeight: 20, marginBottom: 14 },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
      height: 54,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      paddingVertical: 0,
      includeFontPadding: false,
    },
  });
