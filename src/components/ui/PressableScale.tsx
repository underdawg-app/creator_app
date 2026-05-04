import React, { useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from '@/haptics';

type Props = PressableProps & {
  scaleTo?: number;
  haptic?: 'light' | 'medium' | 'soft' | 'rigid' | 'none';
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PressableScale({
  scaleTo = 0.96,
  haptic = 'light',
  style,
  onPressIn,
  onPressOut,
  onPress,
  children,
  ...rest
}: Props) {
  const s = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }));

  const handlePressIn = useCallback(
    (e: any) => {
      s.value = withSpring(scaleTo, { mass: 0.3, damping: 14, stiffness: 280 });
      onPressIn?.(e);
    },
    [scaleTo, onPressIn, s]
  );

  const handlePressOut = useCallback(
    (e: any) => {
      s.value = withSpring(1, { mass: 0.3, damping: 12, stiffness: 240 });
      onPressOut?.(e);
    },
    [onPressOut, s]
  );

  const handlePress = useCallback(
    (e: any) => {
      if (haptic !== 'none') {
        const map = {
          light: Haptics.ImpactFeedbackStyle.Light,
          medium: Haptics.ImpactFeedbackStyle.Medium,
          soft: Haptics.ImpactFeedbackStyle.Soft,
          rigid: Haptics.ImpactFeedbackStyle.Rigid,
        } as const;
        Haptics.impactAsync(map[haptic]).catch(() => {});
      }
      onPress?.(e);
    },
    [haptic, onPress]
  );

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[style as any, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}
