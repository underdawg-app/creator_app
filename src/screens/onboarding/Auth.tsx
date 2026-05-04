import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Text as RNText,
  Dimensions,
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

const authObject = require('@/objects/obj-4.png');

const { width, height } = Dimensions.get('window');

const methods = [
  { key: 'apple', label: 'CONTINUE WITH APPLE', icon: 'logo-apple' as const },
  { key: 'google', label: 'CONTINUE WITH GOOGLE', icon: 'logo-google' as const },
  { key: 'email', label: 'CONTINUE WITH EMAIL', icon: 'mail-outline' as const },
  { key: 'phone', label: 'CONTINUE WITH PHONE', icon: 'call-outline' as const },
];

export default function Auth() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
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

      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 24 }}>
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

        <View style={styles.methods}>
          {methods.map((m, i) => (
            <TapBurst
              key={m.key}
              style={styles.method}
              burstColor={palette.acid}
              onPress={() => router.push('/(onboarding)/user-type')}
              haptic="light"
            >
              <View style={styles.methodNum}>
                <RNText style={styles.methodNumText}>
                  {String(i + 1).padStart(2, '0')}
                </RNText>
              </View>
              <View style={styles.methodIcon}>
                <Ionicons name={m.icon} size={18} color={palette.ink} />
              </View>
              <RNText style={styles.methodLabel}>{m.label}</RNText>
              <ArrowMark size={16} color={palette.ink} strokeWidth={1.5} />
            </TapBurst>
          ))}
        </View>

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
  blobAnchor: {
    position: 'absolute',
    right: -80,
    top: 90,
  },
  scroll: {
    paddingHorizontal: 24,
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
  methods: {
    marginTop: 14,
  },
  method: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: palette.lineDark,
  },
  methodNum: {
    width: 28,
  },
  methodNumText: {
    ...T.label,
    color: palette.mute,
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: {
    ...T.label,
    color: palette.ink,
    flex: 1,
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
