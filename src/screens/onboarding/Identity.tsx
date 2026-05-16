import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Text as RNText,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealText } from '@/components/ui/RevealText';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { Asterisk } from '@/components/svg/Marks';
import { useStore } from '@/store';
import { getAuth } from '@/lib/firebase';

const { width, height } = Dimensions.get('window');

export default function Identity() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const setProfile = useStore((s) => s.setProfile);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');

  const handleValid = handle.length >= 3;
  const nameValid = name.length >= 2;
  const ready = handleValid && nameValid;

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SkiaWaveField
          width={width}
          height={height}
          color="rgba(10,10,10,0.035)"
          lines={14}
          amplitude={12}
          frequency={0.02}
          speed={0.22}
          strokeWidth={1}
        />
      </View>

      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 12 }}>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.back}
          >
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <View style={styles.stepRow}>
            <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
            <RNText style={styles.step}>STEP 04 / 05</RNText>
          </View>
          <Pressable
            onPress={() => router.push('/(onboarding)/complete')}
            hitSlop={12}
            style={styles.skip}
          >
            <RNText style={styles.skipLabel}>SKIP</RNText>
            <Ionicons name="arrow-forward" size={14} color={palette.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <RevealText
              text="stake"
              splitBy="char"
              style={{
                fontFamily: fonts.editorialItalic,
                fontSize: 56,
                lineHeight: 56,
                color: palette.ink,
                letterSpacing: -0.8,
              }}
            />
            <RevealText
              text="YOUR"
              delay={120}
              style={{
                fontFamily: fonts.displayBold,
                fontSize: 82,
                lineHeight: 76,
                color: palette.ink,
                letterSpacing: -3.4,
              }}
            />
            <RevealText
              text="CLAIM."
              delay={240}
              style={{
                fontFamily: fonts.displayBold,
                fontSize: 82,
                lineHeight: 76,
                color: palette.electric,
                letterSpacing: -3.4,
              }}
            />
          </View>

          <RNText style={styles.sub}>
            This is your public identity. Your handle is your address on
            underdawgs.com — and everywhere else we take you.
          </RNText>

          <View style={styles.fields}>
            <Field
              index="01"
              label="DISPLAY NAME"
              value={name}
              onChangeText={setName}
              placeholder="SOLA ROUX"
              valid={nameValid}
            />
            <Field
              index="02"
              label="HANDLE"
              value={handle}
              onChangeText={(v) => setHandle(v.replace(/\s/g, '').toLowerCase())}
              placeholder="solaroux"
              prefix="underdawgs.com/"
              valid={handleValid}
              autoCapitalize="none"
            />
            <Field
              index="03"
              label="ONE LINE ABOUT YOU"
              value={bio}
              onChangeText={setBio}
              placeholder="I paint the bits of the city that dry quickly."
              multiline
              valid={undefined}
            />
          </View>
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
          <View style={styles.hairline} />
          <View style={styles.footer}>
            <View style={{ flex: 1 }}>
              <RNText style={styles.step}>ALMOST THERE</RNText>
              <RNText style={styles.footerLabel}>
                {ready ? "YOU'RE ON THE LIST" : 'FILL IT IN'}
              </RNText>
            </View>
            <MagneticButton
              label="NEXT"
              background={staticPalette.acid}
              foreground={staticPalette.ink}
              size="lg"
              disabled={!ready}
              onPress={() => {
                const fbUser = getAuth().currentUser;
                setProfile({
                  name: name || 'Sola Roux',
                  handle: handle.startsWith('@') ? handle : `@${handle || 'solaroux'}`,
                  bio: bio || 'new on underdawg. watch this space.',
                  uid: fbUser?.uid ?? null,
                  phone: fbUser?.phoneNumber ?? null,
                });
                router.push('/(onboarding)/complete');
              }}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({
  index,
  label,
  value,
  onChangeText,
  placeholder,
  prefix,
  multiline,
  valid,
  autoCapitalize,
}: {
  index: string;
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  prefix?: string;
  multiline?: boolean;
  valid?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words';
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.field}>
      <View style={styles.fieldHead}>
        <View style={styles.fieldHeadLeft}>
          <RNText style={styles.fieldIndex}>{index}</RNText>
          <RNText style={styles.fieldLabel}>{label}</RNText>
        </View>
        {valid !== undefined ? (
          <View
            style={[
              styles.pill,
              {
                backgroundColor: valid ? staticPalette.acid : 'transparent',
                borderColor: valid ? staticPalette.acid : palette.line,
              },
            ]}
          >
            <RNText
              style={[
                styles.pillText,
                { color: valid ? staticPalette.ink : palette.mute },
              ]}
            >
              {valid ? 'OK' : 'REQUIRED'}
            </RNText>
          </View>
        ) : null}
      </View>
      <View style={styles.inputRow}>
        {prefix ? <RNText style={styles.prefix}>{prefix}</RNText> : null}
        <TextInput
          style={[
            styles.input,
            multiline && { minHeight: 60, textAlignVertical: 'top' },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={palette.mute}
          multiline={multiline}
          autoCapitalize={autoCapitalize ?? 'sentences'}
          selectionColor={palette.ink}
        />
      </View>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  step: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
  },
  skip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
  },
  skipLabel: {
    ...T.label,
    color: palette.ink,
    letterSpacing: 1.8,
  },
  scroll: { paddingHorizontal: 12, paddingTop: 28, paddingBottom: 20 },
  sub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 20,
    maxWidth: 360,
  },
  fields: { marginTop: 28 },
  field: {
    borderTopWidth: 1,
    borderTopColor: palette.line,
    paddingVertical: 16,
  },
  fieldHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldHeadLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  fieldIndex: { ...T.micro, color: palette.mute, width: 24 },
  fieldLabel: { ...T.label, color: palette.ink, opacity: 0.8 },
  pill: {
    paddingHorizontal: 10,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  prefix: {
    ...T.body,
    color: palette.mute,
    marginRight: 2,
  },
  input: {
    flex: 1,
    fontFamily: fonts.displayBold,
    fontSize: 28,
    letterSpacing: -0.8,
    color: palette.ink,
    paddingVertical: 0,
  },
  footerSafe: { paddingHorizontal: 12, paddingBottom: 6 },
  hairline: { height: 1, backgroundColor: palette.line },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  footerLabel: {
    ...T.title2,
    color: palette.ink,
    marginTop: 4,
  },
});
