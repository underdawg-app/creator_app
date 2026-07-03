import React, { useCallback } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import * as Haptics from '@/haptics';

type Props = PressableProps & {
  /** No-op — kept for API compatibility after the press-scale removal. */
  scaleTo?: number;
  haptic?: 'light' | 'medium' | 'soft' | 'rigid' | 'none';
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
};

/**
 * Originally a press-scale spring. Removed app-wide at the user's request —
 * every press now commits state changes with zero visual bounce. Haptic
 * still fires on commit.
 */
export function PressableScale({
  scaleTo: _scaleTo,
  haptic = 'light',
  style,
  onPress,
  children,
  ...rest
}: Props) {
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
    <Pressable
      {...rest}
      onPress={handlePress}
      style={style as any}
    >
      {children}
    </Pressable>
  );
}
