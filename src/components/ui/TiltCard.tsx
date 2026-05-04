import React, { useRef } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import * as Haptics from '@/haptics';

type Props = {
  style?: StyleProp<ViewStyle>;
  maxTilt?: number;
  onPress?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

/**
 * Card that tilts toward the finger on press. The illusion of 3D without
 * actually being 3D — a classic Swiss-style editorial move.
 */
export function TiltCard({
  style,
  maxTilt = 6,
  onPress,
  children,
  disabled,
}: Props) {
  const rx = useSharedValue(0);
  const ry = useSharedValue(0);
  const s = useSharedValue(1);
  const layout = useRef({ w: 0, h: 0 });

  const animated = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${rx.value}deg` },
      { rotateY: `${ry.value}deg` },
      { scale: s.value },
    ],
  }));

  const update = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    const { w, h } = layout.current;
    if (!w || !h) return;
    const dx = (locationX / w - 0.5) * 2;
    const dy = (locationY / h - 0.5) * 2;
    rx.value = withSpring(-dy * maxTilt, { damping: 14, stiffness: 260 });
    ry.value = withSpring(dx * maxTilt, { damping: 14, stiffness: 260 });
  };

  const reset = () => {
    rx.value = withSpring(0, { damping: 12, stiffness: 200 });
    ry.value = withSpring(0, { damping: 12, stiffness: 200 });
    s.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  return (
    <Pressable
      disabled={disabled}
      // Visual scale on touch-start; haptic only on committed onPress so a
      // touch that turns into a scroll never buzzes the phone.
      onPressIn={(e) => {
        s.value = withSpring(0.985, { damping: 14, stiffness: 280 });
        update(e);
      }}
      onPressOut={reset}
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      onLayout={(e) => {
        layout.current = {
          w: e.nativeEvent.layout.width,
          h: e.nativeEvent.layout.height,
        };
      }}
    >
      <Animated.View style={[style, animated]}>{children}</Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
