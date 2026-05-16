import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Text as RNText,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { TapBurst } from '@/components/ui/TapBurst';
import { Asterisk } from '@/components/svg/Marks';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { useAuth } from '@/auth/AuthContext';
import { useStore } from '@/store';
import { sendPhoneCode } from '@/lib/firebase';

const { width, height } = Dimensions.get('window');
const CODE_LEN = 6;

export default function Otp() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { pendingOtp, setPendingOtp } = useAuth();
  const toast = useStore((s) => s.toast);

  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const inputRef = useRef<TextInput>(null);

  // No confirmation? Send the user back. This shouldn't normally happen
  // but it's possible if the screen mounts after a reload.
  useEffect(() => {
    if (!pendingOtp) {
      router.back();
    }
  }, [pendingOtp]);

  useEffect(() => {
    const t = setInterval(() => {
      setResendCountdown((n) => (n > 0 ? n - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const valid = code.length === CODE_LEN;

  const verify = async () => {
    if (!valid || busy || !pendingOtp) return;
    Keyboard.dismiss();
    setBusy(true);
    try {
      await pendingOtp.confirm(code);
      // onAuthStateChanged fires next; clear the pending confirmation and
      // continue the onboarding flow.
      setPendingOtp(null);
      router.replace('/(onboarding)/user-type');
    } catch (err: any) {
      const c = err?.code as string | undefined;
      const msg =
        c === 'auth/invalid-verification-code'
          ? 'Invalid code. Try again.'
          : c === 'auth/code-expired'
          ? 'Code expired. Tap resend.'
          : 'Could not verify. Try again.';
      toast(msg, 'warn');
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (resendCountdown > 0 || !pendingOtp) return;
    setBusy(true);
    try {
      // Re-issue using the same phone number Firebase has cached on the
      // confirmation. Fall back to a generic message if it doesn't expose
      // it (depends on RNFirebase version).
      const ph = (pendingOtp as any)?.verificationId
        ? (pendingOtp as any).phoneNumber
        : null;
      if (!ph) {
        toast('Go back and re-enter your number.', 'default');
        router.back();
        return;
      }
      const fresh = await sendPhoneCode(ph);
      setPendingOtp(fresh);
      setResendCountdown(30);
      toast('New code sent.', 'success');
    } catch {
      toast("Couldn't resend. Try again.", 'warn');
    } finally {
      setBusy(false);
    }
  };

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
        </View>
      </SafeAreaView>

      <View style={styles.body}>
        <RNText style={styles.heading}>
          enter the
          <RNText style={styles.headingItalic}> code.</RNText>
        </RNText>
        <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
          We sent a 6-digit verification code to your phone. It can take a
          few seconds to arrive.
        </RNText>

        <View style={styles.codeRow}>
          {Array.from({ length: CODE_LEN }).map((_, i) => (
            <Pressable
              key={i}
              onPress={() => inputRef.current?.focus()}
              style={[
                styles.codeBox,
                i < code.length && styles.codeBoxFilled,
                i === code.length && styles.codeBoxActive,
              ]}
            >
              <RNText style={styles.codeDigit}>{code[i] ?? ''}</RNText>
            </Pressable>
          ))}
        </View>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, CODE_LEN))}
          keyboardType="number-pad"
          autoFocus
          maxLength={CODE_LEN}
          style={styles.hiddenInput}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
        />

        <Pressable
          onPress={resend}
          disabled={resendCountdown > 0 || busy}
          style={styles.resend}
        >
          <RNText
            style={[
              styles.resendText,
              { opacity: resendCountdown > 0 ? 0.5 : 1 },
            ]}
          >
            {resendCountdown > 0
              ? `RESEND IN ${resendCountdown}s`
              : 'RESEND CODE'}
          </RNText>
        </Pressable>

        <TapBurst
          style={[styles.primaryBtn, !valid && styles.primaryBtnDisabled]}
          burstColor={palette.acid}
          onPress={verify}
          haptic="light"
          disabled={!valid || busy}
        >
          <RNText style={styles.primaryBtnText}>
            {busy ? 'VERIFYING…' : 'VERIFY'}
          </RNText>
        </TapBurst>
      </View>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
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
    step: { ...T.label, color: palette.ink, opacity: 0.65 },
    body: { paddingHorizontal: 12, paddingTop: 36 },
    heading: {
      fontFamily: fonts.displayBold,
      fontSize: 56,
      lineHeight: 56,
      letterSpacing: -2.4,
      color: palette.ink,
    },
    headingItalic: {
      fontFamily: fonts.editorialItalic,
      color: palette.acid,
    },
    sub: {
      ...T.body,
      color: palette.ink,
      opacity: 0.72,
      marginTop: 14,
      maxWidth: 340,
    },
    codeRow: {
      marginTop: 36,
      flexDirection: 'row',
      gap: 8,
    },
    codeBox: {
      flex: 1,
      height: 60,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.lineDark,
      alignItems: 'center',
      justifyContent: 'center',
    },
    codeBoxFilled: { borderColor: palette.ink, backgroundColor: palette.paper },
    codeBoxActive: { borderColor: palette.acid, borderWidth: 2 },
    codeDigit: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      color: palette.ink,
      letterSpacing: -1,
    },
    hiddenInput: {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0,
    },
    resend: { marginTop: 20, alignSelf: 'flex-start', paddingVertical: 8 },
    resendText: {
      ...T.label,
      color: palette.ink,
      letterSpacing: 1.8,
      textDecorationLine: 'underline',
    },
    primaryBtn: {
      marginTop: 28,
      height: 56,
      borderRadius: 28,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      paddingHorizontal: 22,
      backgroundColor: palette.ink,
    },
    primaryBtnDisabled: { opacity: 0.4 },
    primaryBtnText: {
      ...T.label,
      color: palette.bone,
      letterSpacing: 1.8,
    },
  });
