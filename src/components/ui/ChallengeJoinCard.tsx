import React, { useEffect } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import * as Haptics from '@/haptics';

type Props = {
  visible: boolean;
  tag: string;
  audioTitle: string;
  audioCreator: string;
  onJoin: () => void;
  onDismiss: () => void;
};

export function ChallengeJoinCard({
  visible,
  tag,
  audioTitle,
  audioCreator,
  onJoin,
  onDismiss,
}: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(80);

  useEffect(() => {
    if (visible) {
      Haptics.selectionAsync().catch(() => {});
      opacity.value = withTiming(1, { duration: 220, easing: Easing.out(Easing.quad) });
      translateY.value = withTiming(0, { duration: 220, easing: Easing.out(Easing.quad) });
    } else {
      opacity.value = withTiming(0, { duration: 180, easing: Easing.in(Easing.quad) });
      translateY.value = withTiming(80, { duration: 180, easing: Easing.in(Easing.quad) });
    }
  }, [visible, opacity, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.wrap, animStyle]} pointerEvents="box-none">
      <BlurView
        blurType="dark"
        blurAmount={20}
        reducedTransparencyFallbackColor="rgba(10,10,10,0.78)"
        style={styles.blur}
      />
      <View style={styles.overlay} />
      <Pressable style={styles.row} onPress={onJoin} hitSlop={6}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.eyebrow} maxFontSizeMultiplier={1.1}>
            JOIN {tag}
          </RNText>
          <RNText style={styles.headline} maxFontSizeMultiplier={1.15}>
            Got bars? Drop your entry
          </RNText>
          <View style={styles.audioStrip}>
            <Ionicons name="musical-notes" size={11} color={staticPalette.acid} />
            <RNText style={styles.audioTxt} numberOfLines={1}>
              {audioTitle} · {audioCreator}
            </RNText>
          </View>
        </View>
        <View style={styles.cta}>
          <Ionicons name="arrow-forward" size={20} color={staticPalette.ink} />
        </View>
      </Pressable>
      <Pressable style={styles.close} onPress={onDismiss} hitSlop={10}>
        <Ionicons name="close" size={14} color={staticPalette.bone} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 96,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,10,0.25)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 14,
  },
  eyebrow: {
    ...T.label,
    color: staticPalette.acid,
    letterSpacing: 1.8,
    fontFamily: fonts.bodyBold,
    fontSize: 10,
  },
  headline: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    letterSpacing: -0.5,
    lineHeight: 24,
    color: staticPalette.bone,
    marginTop: 4,
  },
  audioStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  audioTxt: {
    ...T.micro,
    color: staticPalette.bone,
    opacity: 0.75,
    fontFamily: fonts.body,
    flex: 1,
  },
  cta: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(10,10,10,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
