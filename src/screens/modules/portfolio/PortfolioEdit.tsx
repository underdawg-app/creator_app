import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Chip } from '@/components/ui/Chip';
import { useStore } from '@/store';

const ALL_NICHES = ['Abstract', 'Resin', 'Brooklyn', 'Film', 'Poetry', 'Type', 'Dance', 'Music', 'Photo', 'Monsoon'];
const COLLAB_OPTIONS = ['BRAND DEALS', 'COLLABS', 'COMMISSIONS', 'HIRE', 'MANAGEMENT', 'NOT AVAILABLE'];

export default function EditProfile() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const setProfile = useStore((s) => s.setProfile);
  const toast = useStore((s) => s.toast);

  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [niches, setNiches] = useState<string[]>(profile.niches);
  const [openTo, setOpenTo] = useState<string[]>(profile.openTo);

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const save = () => {
    setProfile({ name, handle, bio, niches, openTo });
    toast('Profile saved.', 'success');
    router.back();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PORTFOLIO" title="EDIT PROFILE" />}>
      <Field label="DISPLAY NAME">
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          maxFontSizeMultiplier={1.2}
          placeholderTextColor={palette.mute}
        />
      </Field>
      <Field label="HANDLE">
        <TextInput
          style={styles.input}
          value={handle}
          onChangeText={setHandle}
          autoCapitalize="none"
          maxFontSizeMultiplier={1.2}
        />
      </Field>
      <Field label="BIO · 300 CHARS">
        <TextInput
          style={[styles.input, styles.multiline]}
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={300}
          maxFontSizeMultiplier={1.2}
        />
        <RNText style={styles.counter} maxFontSizeMultiplier={1.1}>
          {bio.length} / 300
        </RNText>
      </Field>

      <Field label="YOUR LANES · MAX 5">
        <View style={styles.chipRow}>
          {ALL_NICHES.map((n) => (
            <Chip
              key={n}
              label={n.toUpperCase()}
              active={niches.includes(n)}
              onPress={() => {
                if (!niches.includes(n) && niches.length >= 5) {
                  toast('Max 5 lanes.', 'warn');
                  return;
                }
                setNiches(toggle(niches, n));
              }}
              accent={palette.acid}
            />
          ))}
        </View>
      </Field>

      <Field label="OPEN TO">
        <View style={styles.chipRow}>
          {COLLAB_OPTIONS.map((c) => (
            <Chip
              key={c}
              label={c}
              active={openTo.includes(c)}
              onPress={() => setOpenTo(toggle(openTo, c))}
              accent={palette.electric}
            />
          ))}
        </View>
      </Field>

      <View style={{ marginTop: 32 }}>
        <MagneticButton
          label="SAVE PROFILE"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={save}
        />
      </View>
    </ScreenFrame>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.field}>
      <RNText style={styles.fieldLabel} maxFontSizeMultiplier={1.15}>
        {label}
      </RNText>
      {children}
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  field: { marginTop: 22, gap: 10 },
  fieldLabel: { ...T.label, color: palette.ink, opacity: 0.65 },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: palette.ink,
    backgroundColor: palette.paper,
  },
  multiline: { minHeight: 110, textAlignVertical: 'top' },
  counter: { ...T.micro, color: palette.ink, opacity: 0.5, alignSelf: 'flex-end' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
