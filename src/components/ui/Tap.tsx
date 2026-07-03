import React, { useCallback } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import * as Haptics from '@/haptics';
import { TapBurst } from './TapBurst';
import { palette } from '@/theme/colors'; // accent only — theme-invariant
import { useStore } from '@/store';

const IS_ANDROID = Platform.OS === 'android';

type Variant = 'default' | 'heavy' | 'success';

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  burstColor?: string;
  variant?: Variant;
  splash?: boolean;
  disabled?: boolean;
  /** Press scale on iOS (Android uses native ripple). Pass 1 to disable bounce. */
  scale?: number;
  children: React.ReactNode;
};

/**
 * Shared tap wrapper: burst ring + press scale + (on commit) haptics +
 * optional acid splash.
 *
 * Two important behaviors:
 *
 *  1. **Haptic only fires on `onPress`** (a committed tap), never on
 *     `onPressIn`. If the user starts a touch and then drags into a scroll,
 *     onPress is never called and no haptic fires. Earlier versions buzzed on
 *     onPressIn, which made the phone vibrate on every list scroll.
 *
 *  2. **No subscription to the store.** Older versions called
 *     `useStore(s => s.splash)` on every Tap, mounting hundreds of store
 *     subscribers per screen. Reading via `getState()` at press time gives
 *     identical behavior with zero subscription cost.
 *
 *  3. **Default-press haptic is iOS-only.** On Android the platform ripple is
 *     already the press feedback — adding a vibration on top is what users
 *     read as "the app feels heavy". Heavy/success variants still buzz on
 *     Android because they signal a confirmed action (submit, follow, etc).
 */
export function Tap({
  onPress,
  style,
  burstColor = palette.acid,
  variant = 'default',
  splash = false,
  disabled,
  scale,
  children,
}: Props) {
  const handlePress = useCallback(
    (e: any) => {
      if (disabled) return;
      if (variant === 'heavy') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      } else if (variant === 'success') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
          () => {}
        );
      } else if (!IS_ANDROID) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
      if (splash && e?.nativeEvent) {
        const { pageX, pageY } = e.nativeEvent;
        useStore.getState().splash(pageX ?? 0, pageY ?? 0, burstColor);
      }
      onPress?.();
    },
    [onPress, variant, splash, burstColor, disabled]
  );

  return (
    <TapBurst
      style={style}
      burstColor={burstColor}
      haptic="none"
      onPress={handlePress}
      disabled={disabled}
      scale={scale}
    >
      {children}
    </TapBurst>
  );
}
