import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

type PieceType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'LINK' | 'PDF';
const TYPES: PieceType[] = ['IMAGE', 'VIDEO', 'AUDIO', 'LINK', 'PDF'];

const TYPE_ICON: Record<PieceType, string> = {
  IMAGE: 'image-outline',
  VIDEO: 'videocam-outline',
  AUDIO: 'musical-notes-outline',
  LINK: 'link-outline',
  PDF: 'document-text-outline',
};
const TYPE_ACCENT: Record<PieceType, string> = {
  IMAGE: staticPalette.electric,
  VIDEO: staticPalette.blush,
  AUDIO: staticPalette.acid,
  LINK: staticPalette.electric,
  PDF: staticPalette.ember,
};

const CATEGORIES = ['PAINTING', 'DIGITAL', 'PHOTO', 'MUSIC', 'FILM', 'WRITING'];
const DESC_MAX = 300;

export default function PortfolioPieceEditor() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [type, setType] = useState<PieceType>('IMAGE');
  const [coverSet, setCoverSet] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('PAINTING');
  const [credits, setCredits] = useState('');
  const [link, setLink] = useState('');
  const [feature, setFeature] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const canSave = title.trim().length > 0;
  const accent = TYPE_ACCENT[type];

  const save = () => {
    if (!canSave) {
      toast('Give the piece a title.', 'warn');
      return;
    }
    toast('Piece saved to portfolio.', 'success');
    router.back();
  };

  const remove = () => {
    setConfirmDelete(false);
    toast('Piece discarded.', 'default');
    router.back();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PORTFOLIO" title="PIECE" />} waves={false}>
      <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
        add a piece.
      </RNText>

      {/* Cover / preview */}
      <Pressable
        onPress={() => {
          setCoverSet(true);
          toast('Cover added.', 'success');
        }}
        style={[styles.cover, { backgroundColor: accent }]}
      >
        <View style={styles.coverIconWrap}>
          <Ionicons name={TYPE_ICON[type] as any} size={34} color={palette.ink} />
        </View>
        <View style={styles.coverOverlay}>
          <Ionicons
            name={coverSet ? 'checkmark-circle' : 'add'}
            size={16}
            color={palette.ink}
          />
          <RNText style={styles.coverOverlayText}>
            {coverSet ? 'COVER SET · TAP TO REPLACE' : 'ADD COVER'}
          </RNText>
        </View>
        <RNText style={styles.coverBadge}>{type}</RNText>
      </Pressable>

      {/* Type */}
      <RNText style={styles.eyebrow}>TYPE</RNText>
      <View style={styles.chipRow}>
        {TYPES.map((t) => (
          <Chip
            key={t}
            label={t}
            active={type === t}
            accent={TYPE_ACCENT[t]}
            onPress={() => setType(t)}
          />
        ))}
      </View>

      {/* Title */}
      <RNText style={styles.eyebrow}>TITLE</RNText>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="SALT / STUDY No. 05"
        placeholderTextColor={palette.mute}
        maxFontSizeMultiplier={1.2}
      />

      {/* Description */}
      <View style={styles.labelRow}>
        <RNText style={styles.eyebrow}>DESCRIPTION</RNText>
        <RNText style={styles.count}>
          {desc.length}/{DESC_MAX}
        </RNText>
      </View>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={desc}
        onChangeText={setDesc}
        multiline
        maxLength={DESC_MAX}
        placeholder="what it is, the idea, the process"
        placeholderTextColor={palette.mute}
        maxFontSizeMultiplier={1.2}
      />

      {/* Category */}
      <RNText style={styles.eyebrow}>CATEGORY</RNText>
      <View style={styles.chipRow}>
        {CATEGORIES.map((c) => (
          <Chip
            key={c}
            label={c}
            active={category === c}
            onPress={() => setCategory(c)}
          />
        ))}
      </View>

      {/* Credits */}
      <RNText style={styles.eyebrow}>CREDITS</RNText>
      <TextInput
        style={styles.input}
        value={credits}
        onChangeText={setCredits}
        placeholder="collaborators, tools"
        placeholderTextColor={palette.mute}
        maxFontSizeMultiplier={1.2}
      />

      {/* External link */}
      <RNText style={styles.eyebrow}>EXTERNAL LINK</RNText>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="https://"
        placeholderTextColor={palette.mute}
        autoCapitalize="none"
        keyboardType="url"
        maxFontSizeMultiplier={1.2}
      />

      {/* Feature toggle */}
      <View style={styles.featureCard}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.featureLabel}>FEATURE ON PROFILE</RNText>
          <RNText style={styles.featureSub}>
            {feature ? 'Shows in your top grid' : 'Stays in the archive'}
          </RNText>
        </View>
        <Switch
          value={feature}
          onValueChange={(v) => {
            setFeature(v);
            toast(v ? 'Featured on profile.' : 'Removed from grid.', 'default');
          }}
          trackColor={{ false: palette.line, true: palette.ink }}
          thumbColor={palette.bone}
        />
      </View>

      {/* Save CTA */}
      <Pressable
        onPress={save}
        disabled={!canSave}
        style={[styles.cta, !canSave && styles.ctaDisabled]}
      >
        <RNText style={[styles.ctaLabel, !canSave && styles.ctaLabelDisabled]}>
          {canSave ? 'SAVE PIECE' : 'ADD A TITLE'}
        </RNText>
        <View style={[styles.ctaArrow, !canSave && styles.ctaArrowDisabled]}>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={canSave ? palette.ink : palette.mute}
          />
        </View>
      </Pressable>

      {/* Delete */}
      <Pressable onPress={() => setConfirmDelete(true)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={15} color={palette.ember} />
        <RNText style={styles.deleteText}>DISCARD PIECE</RNText>
      </Pressable>

      <Sheet
        visible={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        eyebrow="HEADS UP"
        title="Discard this piece?"
      >
        <RNText style={styles.sheetBody}>
          Nothing is saved. This draft and its cover go away for good.
        </RNText>
        <View style={styles.sheetActions}>
          <Pressable
            onPress={() => setConfirmDelete(false)}
            style={styles.sheetCancel}
          >
            <RNText style={styles.sheetCancelText}>KEEP EDITING</RNText>
          </Pressable>
          <Pressable onPress={remove} style={styles.sheetConfirm}>
            <Ionicons name="trash-outline" size={15} color={palette.bone} />
            <RNText style={styles.sheetConfirmText}>DISCARD</RNText>
          </Pressable>
        </View>
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
      marginBottom: 18,
    },

    /* Cover */
    cover: {
      height: 168,
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent: 'flex-end',
    },
    coverIconWrap: {
      position: 'absolute',
      top: 16,
      left: 16,
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: 'rgba(10,10,10,0.10)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    coverBadge: {
      position: 'absolute',
      top: 18,
      right: 16,
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
    },
    coverOverlay: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 14,
      height: 44,
      backgroundColor: 'rgba(10,10,10,0.08)',
    },
    coverOverlayText: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 1.8,
      color: palette.ink,
    },

    /* Labels */
    eyebrow: {
      ...T.label,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 24,
      marginBottom: 10,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginTop: 24,
      marginBottom: 10,
    },
    count: {
      ...T.small,
      color: palette.inkMuted,
    },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

    /* Inputs */
    input: {
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      backgroundColor: palette.paper,
    },
    multiline: {
      minHeight: 104,
      textAlignVertical: 'top',
      lineHeight: 21,
    },

    /* Feature toggle */
    featureCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginTop: 26,
      padding: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    featureLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 1.4,
      color: palette.ink,
    },
    featureSub: {
      ...T.small,
      color: palette.inkMuted,
      marginTop: 3,
    },

    /* Save CTA */
    cta: {
      marginTop: 28,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaDisabled: { backgroundColor: palette.boneSoft },
    ctaLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: 2.5,
      color: palette.bone,
    },
    ctaLabelDisabled: { color: palette.inkMuted },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ctaArrowDisabled: { backgroundColor: palette.line },

    /* Delete */
    deleteBtn: {
      marginTop: 16,
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    deleteText: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 2,
      color: palette.ember,
    },

    /* Sheet */
    sheetBody: {
      ...T.body,
      color: palette.ink,
      opacity: 0.75,
      lineHeight: 21,
      marginBottom: 18,
    },
    sheetActions: { flexDirection: 'row', gap: 10 },
    sheetCancel: {
      flex: 1,
      height: 52,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetCancelText: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 2,
      color: palette.ink,
    },
    sheetConfirm: {
      flex: 1,
      height: 52,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: palette.ember,
    },
    sheetConfirmText: {
      fontFamily: fonts.bodyBold,
      fontSize: 12,
      letterSpacing: 2,
      color: palette.bone,
    },
  });
