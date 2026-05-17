import React, { useEffect, useState } from 'react';
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
  Image as RNImage,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import ImageCropPicker from 'react-native-image-crop-picker';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Image } from '@/components/ui/Image';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealText } from '@/components/ui/RevealText';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { Asterisk } from '@/components/svg/Marks';
import { useStore } from '@/store';
import { getAuth } from '@/lib/firebase';

const identityObject = require('@/objects/obj-6.png');

const AVATAR_CROP_OPTS = {
  width: 720,
  height: 720,
  cropping: true,
  cropperCircleOverlay: true,
  mediaType: 'photo' as const,
  compressImageQuality: 0.85,
  includeBase64: false,
  avoidEmptySpaceAroundImage: true,
  cropperToolbarTitle: 'Crop your profile photo',
  cropperActiveWidgetColor: staticPalette.acid,
  cropperStatusBarColor: staticPalette.ink,
  cropperToolbarColor: staticPalette.ink,
  cropperToolbarWidgetColor: staticPalette.bone,
};

const { width, height } = Dimensions.get('window');

export default function Identity() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const setProfile = useStore((s) => s.setProfile);
  const toast = useStore((s) => s.toast);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleValid = handle.length >= 3;
  const nameValid = name.length >= 2;
  const ready = handleValid && nameValid;

  const pickAvatar = async () => {
    try {
      const img = await ImageCropPicker.openPicker(AVATAR_CROP_OPTS);
      if (img?.path) setAvatar(img.path);
    } catch (e: any) {
      if (e?.code === 'E_PICKER_CANCELLED') return;
      toast(e?.message ?? 'Could not open gallery.', 'warn');
    }
  };

  const removeAvatar = () => setAvatar(null);

  // Idle float — mirrors the motion language of Auth/Welcome decorative objects.
  const idleA = useSharedValue(0);
  const idleB = useSharedValue(0);
  useEffect(() => {
    idleA.value = withRepeat(
      withTiming(1, { duration: 3400, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    idleB.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, []);

  const objStyle = useAnimatedStyle(() => {
    const y = (idleA.value - 0.5) * 36;
    const x = (idleB.value - 0.5) * 18;
    const rot = (idleA.value - 0.5) * 8 + (idleB.value - 0.5) * 3;
    const sc = 1 + (idleA.value - 0.5) * 0.04;
    return {
      transform: [
        { translateX: x },
        { translateY: y },
        { rotate: `${rot}deg` },
        { scale: sc },
      ],
    };
  });

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

      <Animated.View style={[styles.blobAnchor, objStyle]} pointerEvents="none">
        <Image
          source={identityObject}
          style={{ width: 280, height: 280 }}
          contentFit="contain"
        />
      </Animated.View>

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
          <View style={styles.headingBlock}>
            <View style={styles.headingTopRow}>
              <View style={styles.headingHair} />
              <RNText style={styles.headingKicker}>YOUR PROFILE</RNText>
            </View>
            <RevealText
              text="meet"
              splitBy="char"
              style={{
                fontFamily: fonts.editorialItalic,
                fontSize: 48,
                lineHeight: 50,
                color: palette.ink,
                letterSpacing: -0.6,
              }}
            />
            <RevealText
              text="THE WORLD."
              delay={140}
              style={{
                fontFamily: fonts.displayBold,
                fontSize: 64,
                lineHeight: 62,
                color: palette.ink,
                letterSpacing: -2.6,
              }}
            />
          </View>

          <RNText style={styles.sub}>
            A name, a handle, a face — the basics people will find you by. You
            can change all of it later.
          </RNText>

          <View style={styles.avatarBlock}>
            <Pressable onPress={pickAvatar} style={styles.avatarRing}>
              {avatar ? (
                <RNImage source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="camera-outline" size={28} color={palette.ink} />
                </View>
              )}
              <View style={styles.avatarBadge}>
                <Ionicons
                  name={avatar ? 'pencil' : 'add'}
                  size={16}
                  color={palette.bone}
                />
              </View>
            </Pressable>
            <View style={styles.avatarMeta}>
              <RNText style={styles.avatarTitle}>
                {avatar ? 'PHOTO ADDED' : 'ADD PROFILE PHOTO'}
              </RNText>
              <RNText style={styles.avatarHint}>
                Optional · you can do this later.
              </RNText>
              {avatar ? (
                <Pressable onPress={removeAvatar} hitSlop={8}>
                  <RNText style={styles.avatarRemove}>REMOVE</RNText>
                </Pressable>
              ) : null}
            </View>
          </View>

          <View style={styles.fields}>
            <Field
              index="01"
              label="DISPLAY NAME"
              value={name}
              onChangeText={setName}
              placeholder=""
              valid={nameValid}
            />
            <Field
              index="02"
              label="HANDLE"
              value={handle}
              onChangeText={(v) => setHandle(v.replace(/\s/g, '').toLowerCase())}
              placeholder=""
              prefix="underdawgs.com/"
              valid={handleValid}
              autoCapitalize="none"
            />
            <Field
              index="03"
              label="ONE LINE ABOUT YOU"
              value={bio}
              onChangeText={setBio}
              placeholder=""
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
              background={palette.ink}
              foreground={palette.bone}
              size="lg"
              disabled={!ready}
              onPress={() => {
                let fbUser = null;
                try {
                  fbUser = getAuth().currentUser;
                } catch {}
                setProfile({
                  name,
                  handle: handle.startsWith('@') ? handle : `@${handle}`,
                  bio,
                  avatar,
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
  scroll: { paddingHorizontal: 12, paddingTop: 20, paddingBottom: 20 },
  blobAnchor: {
    position: 'absolute',
    right: -30,
    top: 60,
    opacity: 0.85,
  },
  headingBlock: { gap: 2 },
  headingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  headingHair: {
    width: 32,
    height: 1.5,
    backgroundColor: palette.ink,
    opacity: 0.65,
  },
  headingKicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
    letterSpacing: 2,
  },
  sub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 16,
    maxWidth: 360,
  },
  avatarBlock: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    padding: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.paper,
  },
  avatarRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: palette.ink,
    backgroundColor: palette.bone,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarPlaceholder: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.paper,
  },
  avatarMeta: { flex: 1, gap: 4 },
  avatarTitle: {
    ...T.label,
    color: palette.ink,
    letterSpacing: 1.4,
  },
  avatarHint: {
    ...T.small,
    color: palette.mute,
  },
  avatarRemove: {
    ...T.small,
    color: palette.ink,
    letterSpacing: 1.4,
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  fields: { marginTop: 24 },
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
