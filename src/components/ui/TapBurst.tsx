import React from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp, Platform } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';

const IS_ANDROID = Platform.OS === 'android';

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  burstColor?: string;
  /** No-op — kept for API compatibility after the press-scale removal. */
  scale?: number;
  /** No-op — kept for API compatibility. Haptic fires in parent `Tap`. */
  haptic?: 'light' | 'medium' | 'rigid' | 'none';
  children: React.ReactNode;
};

/**
 * Wrap anything tappable.
 *
 * Press animation history:
 *   - v1: shared `withTiming` scale + radial ring burst on every tap.
 *   - v2 (current): NO press scale, NO ring burst. Animation removed at the
 *     user's request after they reported the press "bounce" felt twitchy
 *     across the app. Android still gets the native platform ripple via
 *     `android_ripple`; iOS gets nothing visible on press (Pressable's
 *     built-in opacity dim is also disabled here so the only feedback is
 *     committed state changes).
 *
 * The `scale`, `burstColor`, and `haptic` props are intentionally still
 * accepted so existing call sites don't need to change.
 */
export function TapBurst({
  style,
  burstColor = staticPalette.acid,
  scale: _scale,
  haptic: _haptic,
  onPressIn,
  onPressOut,
  onPress,
  children,
  ...rest
}: Props) {
  const androidProps = IS_ANDROID
    ? {
        android_ripple: {
          color: hexToRipple(burstColor),
          borderless: false,
          foreground: true,
        } as const,
      }
    : null;

  return (
    <Pressable
      {...rest}
      {...(androidProps ?? {})}
      style={style}
      unstable_pressDelay={0}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

function hexToRipple(hex: string): string {
  if (!hex.startsWith('#') || hex.length !== 7) return 'rgba(10,10,10,0.18)';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},0.25)`;
}
