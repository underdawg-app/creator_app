import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Text as RNText,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { Image } from '@/components/ui/Image';
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
import { RevealText } from '@/components/ui/RevealText';
import { TapBurst } from '@/components/ui/TapBurst';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { ArrowMark, Asterisk, RuleDot } from '@/components/svg/Marks';
import { sendPhoneCode } from '@/lib/firebase';
import { signInWithGoogle, GoogleSignInCancelled } from '@/lib/googleSignIn';
import { useAuth } from '@/auth/AuthContext';
import { useStore } from '@/store';

const authObject = require('@/objects/obj-4.png');

const { width, height } = Dimensions.get('window');

export default function Auth() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const phoneValid = phone.replace(/\D/g, '').length === 10;
  const { setPendingOtp } = useAuth();
  const toast = useStore((s) => s.toast);

  const submitPhone = async () => {
    if (!phoneValid || busy) return;
    setBusy(true);
    try {
      const e164 = '+91' + phone.replace(/\D/g, '');
      const confirmation = await sendPhoneCode(e164);
      setPendingOtp(confirmation);
      router.push('/(onboarding)/otp');
    } catch (err: any) {
      toast(
        err?.message?.toLowerCase?.().includes('network')
          ? "Couldn't send code, check connection."
          : 'Failed to send code. Try again.',
        'warn',
      );
    } finally {
      setBusy(false);
    }
  };

  const submitGoogle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await signInWithGoogle();
      // onAuthStateChanged fires; user is signed in. Continue onboarding.
      router.push('/(onboarding)/user-type');
    } catch (err: any) {
      if (err instanceof GoogleSignInCancelled) return;
      toast('Google sign-in failed. Try again.', 'warn');
    } finally {
      setBusy(false);
    }
  };

  // Idle float — mirrors the welcome carousel so the motion language is shared.
  const idleA = useSharedValue(0);
  const idleB = useSharedValue(0);

  useEffect(() => {
    idleA.value = withRepeat(
      withTiming(1, { duration: 3400, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    idleB.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const objStyle = useAnimatedStyle(() => {
    const y = (idleA.value - 0.5) * 44;
    const x = (idleB.value - 0.5) * 22;
    const rot = (idleA.value - 0.5) * 10 + (idleB.value - 0.5) * 4;
    const sc = 1 + (idleA.value - 0.5) * 0.05;
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
          color="rgba(242,239,230,0.055)"
          lines={18}
          amplitude={12}
          frequency={0.02}
          speed={0.3}
          strokeWidth={1}
        />
      </View>

      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 12 }}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <View style={styles.stepRow}>
            <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
            <RNText style={styles.step}>STEP 01 / 05</RNText>
          </View>
          <Pressable
            onPress={() => router.push('/(onboarding)/user-type')}
            hitSlop={12}
            style={styles.skip}
          >
            <RNText style={styles.skipLabel}>SKIP</RNText>
            <Ionicons name="arrow-forward" size={14} color={palette.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      <Animated.View style={[styles.blobAnchor, objStyle]} pointerEvents="none">
        <Image
          source={authObject}
          style={{ width: 320, height: 320 }}
          contentFit="contain"
        />
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <RevealText
            text="pull"
            splitBy="char"
            style={{
              fontFamily: fonts.editorialItalic,
              fontSize: 56,
              lineHeight: 54,
              color: palette.ink,
              letterSpacing: -0.8,
            }}
          />
          <RevealText
            text="UP A"
            delay={120}
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 78,
              lineHeight: 72,
              color: palette.ink,
              letterSpacing: -3.2,
            }}
          />
          <RevealText
            text="CHAIR."
            delay={260}
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 78,
              lineHeight: 72,
              color: palette.acid,
              letterSpacing: -3.2,
            }}
          />
        </View>

        <RNText style={styles.subheading}>
          Choose how you'd like to sign in. Your profile is public only when
          you say so.
        </RNText>

        <View style={styles.rule}>
          <RuleDot width={width - 48} color={palette.lineDark} dotColor={palette.acid} />
        </View>

        <View style={styles.phoneBlock}>
          <RNText style={styles.fieldLabel}>PHONE NUMBER</RNText>
          <View style={styles.phoneRow}>
            <View style={styles.dial}>
              <RNText style={styles.dialText}>+91</RNText>
            </View>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="98765 43210"
              placeholderTextColor={palette.mute}
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              style={styles.phoneInput}
              maxLength={20}
            />
          </View>

          <TapBurst
            style={[styles.primaryBtn, !phoneValid && styles.primaryBtnDisabled]}
            burstColor={palette.acid}
            onPress={submitPhone}
            haptic="light"
            disabled={!phoneValid}
          >
            <Ionicons name="call-outline" size={16} color={palette.bone} />
            <RNText style={styles.primaryBtnText}>CONTINUE WITH PHONE</RNText>
            <ArrowMark size={16} color={palette.bone} strokeWidth={1.6} />
          </TapBurst>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <RNText style={styles.dividerText}>OR CONTINUE WITH GOOGLE</RNText>
          <View style={styles.dividerLine} />
        </View>

        <TapBurst
          style={styles.googleBtn}
          burstColor={palette.acid}
          onPress={submitGoogle}
          haptic="light"
        >
          <Ionicons name="logo-google" size={18} color={palette.ink} />
          <RNText style={styles.googleBtnText}>SIGN IN WITH GOOGLE</RNText>
          <ArrowMark size={16} color={palette.ink} strokeWidth={1.5} />
        </TapBurst>

        <View style={styles.legal}>
          <Asterisk size={12} color={palette.mute} strokeWidth={1.2} />
          <RNText style={styles.legalText}>
            By continuing you agree to our Terms, Privacy policy, and our
            commitment to paying creators fairly.
          </RNText>
        </View>
      </ScrollView>
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
    opacity: 0.65,
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
  blobAnchor: {
    position: 'absolute',
    right: -80,
    top: 90,
  },
  scroll: {
    paddingHorizontal: 12,
    paddingTop: 36,
    paddingBottom: 48,
  },
  heading: { gap: 0 },
  subheading: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 22,
    maxWidth: 340,
  },
  rule: { marginTop: 28, alignItems: 'center' },
  phoneBlock: {
    marginTop: 22,
    gap: 12,
  },
  fieldLabel: {
    ...T.label,
    color: palette.mute,
    letterSpacing: 1.4,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.lineDark,
    paddingBottom: 4,
  },
  dial: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialText: {
    ...T.label,
    color: palette.ink,
  },
  phoneInput: {
    flex: 1,
    height: 48,
    fontFamily: fonts.displayBold,
    fontSize: 22,
    letterSpacing: -0.4,
    color: palette.ink,
    paddingVertical: 0,
  },
  primaryBtn: {
    marginTop: 6,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 22,
    backgroundColor: palette.ink,
  },
  primaryBtnDisabled: {
    opacity: 0.4,
  },
  primaryBtnText: {
    ...T.label,
    color: palette.bone,
    flex: 0,
  },
  divider: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: palette.lineDark,
  },
  dividerText: {
    ...T.small,
    color: palette.mute,
    letterSpacing: 1.6,
  },
  googleBtn: {
    marginTop: 16,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: palette.lineDark,
    backgroundColor: 'transparent',
  },
  googleBtnText: {
    ...T.label,
    color: palette.ink,
    flex: 0,
  },
  legal: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  legalText: {
    ...T.small,
    color: palette.mute,
    maxWidth: 320,
    flex: 1,
  },
});
