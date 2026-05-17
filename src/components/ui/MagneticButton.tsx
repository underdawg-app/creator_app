import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle, StyleProp, Text as RNText } from 'react-native';
import * as Haptics from '@/haptics';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import { radii } from '@/theme/spacing';

type Variant = 'solid' | 'outline' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  background?: string;
  foreground?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  /** No-op — kept for API compatibility after the press-animation removal. */
  staticPress?: boolean;
};

const sizeMap = {
  sm: { h: 44, px: 18, fs: 12 },
  md: { h: 56, px: 26, fs: 14 },
  lg: { h: 68, px: 34, fs: 16 },
};

/**
 * Pill button. The animated letter-drift + scale + fill-swipe path was
 * removed at the user's request — every press now commits state changes
 * without any visual bounce. Haptic still fires on commit.
 */
export function MagneticButton({
  label,
  onPress,
  variant = 'solid',
  background,
  foreground,
  size = 'md',
  style,
  disabled,
  staticPress: _staticPress,
}: Props) {
  const palette = useThemedPalette();
  const resolvedBackground = background ?? staticPalette.acid;
  const resolvedForeground = foreground ?? palette.ink;

  const { h, px, fs } = sizeMap[size];

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid).catch(() => {});
    onPress?.();
  };

  const bgBase: ViewStyle = {
    backgroundColor: variant === 'solid' ? resolvedBackground : 'transparent',
    borderColor: variant === 'outline' ? palette.ink : 'transparent',
    borderWidth: variant === 'outline' ? 1.5 : 0,
  };

  return (
    <Pressable
      disabled={disabled}
      unstable_pressDelay={0}
      onPress={handlePress}
      style={[
        styles.container,
        bgBase,
        {
          height: h,
          paddingHorizontal: px,
          borderRadius: radii.pill,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        <RNText
          style={{
            fontFamily: fonts.bodyBold,
            fontSize: fs,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: resolvedForeground,
          }}
        >
          {label}
        </RNText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row' },
});
