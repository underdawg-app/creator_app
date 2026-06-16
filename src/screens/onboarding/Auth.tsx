import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text as RNText,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
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
import { TapBurst } from '@/components/ui/TapBurst';
import { signInWithGoogle, GoogleSignInCancelled } from '@/lib/googleSignIn';
import { useAuth } from '@/auth/AuthContext';
import { useStore } from '@/store';

const authObject = require('@/objects/obj-4.png');

const { width } = Dimensions.get('window');

const DEMO_PHONE = '9999999999';
const DEMO_OTP = '123456';

function makeDemoConfirmation(): any {
  return {
    __demo: true,
    phoneNumber: '+91' + DEMO_PHONE,
    verificationId: 'demo',
    confirm: async (_code: string) => ({ user: null }),
  };
}

export default function Auth() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const phoneValid = phone.replace(/\D/g, '').length === 10;
  const { setPendingOtp } = useAuth();
  const toast = useStore((s) => s.toast);

  const submitPhone = async () => {
    if (busy) return;
    setBusy(true);
    try {
      setPendingOtp(makeDemoConfirmation());
      router.push('/(onboarding)/otp');
    } finally {
      setBusy(false);
    }
  };

  const submitGoogle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await signInWithGoogle();
      router.push('/(onboarding)/user-type');
    } catch (err: any) {
      if (err instanceof GoogleSignInCancelled) return;
      toast('Google sign-in failed. Try again.', 'warn');
    } finally {
      setBusy(false);
    }
  };

  // Track keyboard visibility so we can show a dismiss button while it's up.
  const [kbOpen, setKbOpen] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKbOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKbOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // Idle float for the background object — keeps the screen alive.
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
    const y = (idleA.value - 0.5) * 32;
    const x = (idleB.value - 0.5) * 16;
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
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.objAnchor, objStyle]}>
          <Image
            source={authObject}
            style={{ width: 320, height: 320 }}
            contentFit="contain"
          />
        </Animated.View>
      </View>

      <SafeAreaView edges={['top']} style={styles.topSafe}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <Pressable
            onPress={() => router.push('/(onboarding)/user-type')}
            hitSlop={12}
            style={styles.skip}
          >
            <RNText style={styles.skipLabel}>SKIP</RNText>
          </Pressable>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.heading}>
          <RNText style={[T.display2, { color: palette.ink, includeFontPadding: false }]} allowFontScaling={false}>
            SIGN
          </RNText>
          <RNText style={[T.display2, { color: palette.ink, includeFontPadding: false }]} allowFontScaling={false}>
            IN.
          </RNText>
          <RNText style={styles.subheading}>
            Continue with your phone or Google. Your profile stays private until
            you publish it.
          </RNText>
        </View>

        <View style={styles.form}>
          <RNText style={styles.fieldLabel}>PHONE NUMBER</RNText>
          <View style={styles.phoneRow}>
            <View style={styles.dialBox}>
              <RNText style={styles.dialText}>+91</RNText>
              <Ionicons name="chevron-down" size={14} color={palette.ink} />
            </View>
            <View style={styles.dialDivider} />
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
            burstColor={palette.ink}
            onPress={submitPhone}
            haptic="light"
          >
            <RNText style={styles.primaryBtnText}>CONTINUE</RNText>
            <View style={styles.primaryBtnArrowWrap}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </TapBurst>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <RNText style={styles.dividerText}>OR</RNText>
            <View style={styles.dividerLine} />
          </View>

          <TapBurst
            style={styles.googleBtn}
            burstColor={palette.acid}
            onPress={submitGoogle}
            haptic="light"
          >
            <Ionicons name="logo-google" size={18} color={palette.ink} />
            <RNText style={styles.googleBtnText}>CONTINUE WITH GOOGLE</RNText>
          </TapBurst>

          <RNText style={styles.legalText}>
            By continuing you agree to our Terms & Privacy.
          </RNText>
        </View>
      </KeyboardAvoidingView>

      {kbOpen && (
        <Pressable
          onPress={() => Keyboard.dismiss()}
          hitSlop={12}
          style={styles.kbDismiss}
        >
          <Ionicons name="chevron-down" size={16} color={palette.ink} />
          <RNText style={styles.kbDismissLabel}>DONE</RNText>
        </Pressable>
      )}
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  objAnchor: {
    position: 'absolute',
    right: -70,
    top: 80,
    opacity: 0.9,
  },

  topSafe: { paddingHorizontal: 20 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.paper,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.line,
  },
  counterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  counterText: {
    ...T.label,
    letterSpacing: 2.2,
    color: palette.ink,
  },
  skip: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  skipLabel: {
    ...T.label,
    color: palette.ink,
    opacity: 0.6,
  },

  kav: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 24,
  },

  heading: {
    gap: 0,
  },
  headingRule: {
    width: 36,
    height: 3,
    backgroundColor: palette.acid,
    marginBottom: 16,
  },
  title: {
    ...T.display1,
    includeFontPadding: false,
  },
  subheading: {
    ...T.lead,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 18,
    maxWidth: 340,
  },

  form: {
    marginTop: 40,
    gap: 14,
  },
  fieldLabel: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
    letterSpacing: 2.2,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: 18,
    backgroundColor: palette.paper,
    borderWidth: 1.5,
    borderColor: palette.ink,
    paddingHorizontal: 16,
  },
  dialBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 8,
  },
  dialText: {
    ...T.title3,
    color: palette.ink,
  },
  dialDivider: {
    width: 1.5,
    height: 28,
    backgroundColor: palette.ink,
    opacity: 0.18,
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    height: 60,
    ...T.title2,
    color: palette.ink,
    paddingVertical: 0,
  },

  primaryBtn: {
    marginTop: 6,
    height: 64,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    backgroundColor: palette.ink,
  },
  primaryBtnDisabled: {
    opacity: 0.4,
  },
  primaryBtnText: {
    ...T.body,
    color: palette.bone,
  },
  primaryBtnArrowWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.bone,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 10,
    marginBottom: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: palette.line,
  },
  dividerText: {
    ...T.label,
    color: palette.ink,
    opacity: 0.45,
    letterSpacing: 2.4,
  },

  googleBtn: {
    height: 64,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 22,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: 'transparent',
  },
  googleBtnText: {
    ...T.body,
    color: palette.ink,
  },

  legalText: {
    ...T.labelLarge,
    color: palette.ink,
    opacity: 0.45,
    textAlign: 'center',
    marginTop: 4,
  },

  kbDismiss: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 64 : 24,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.ink,
  },
  kbDismissLabel: {
    ...T.label,
    color: palette.ink,
  },
});
