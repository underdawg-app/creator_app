import React from 'react';
import { View, ViewStyle, StyleProp, Pressable } from 'react-native';
import * as Haptics from '@/haptics';

type Props = {
  style?: StyleProp<ViewStyle>;
  /** No-op — kept for API compatibility after the tilt removal. */
  maxTilt?: number;
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

/**
 * Originally a 3D perspective-tilt + scale on press. Removed at the user's
 * request — every press now commits state without any visual bounce.
 * Haptic still fires on commit so the tap remains tangible.
 */
export function TiltCard({ style, onPress, children, disabled }: Props) {
  return (
    <Pressable
      disabled={disabled}
      unstable_pressDelay={0}
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
    >
      <View style={style}>{children}</View>
    </Pressable>
  );
}
