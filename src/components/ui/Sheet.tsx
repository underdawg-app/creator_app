import React, { useEffect } from 'react';
import { Modal, Pressable, StyleSheet, View, Text as RNText } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedPaletteStyles } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function Sheet({ visible, onClose, title, eyebrow, children }: Props) {
  const styles = useThemedPaletteStyles(makeStyles);
  const p = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      p.value = withSpring(1, { damping: 18, stiffness: 220 });
    } else {
      p.value = withTiming(0, { duration: 200, easing: Easing.in(Easing.cubic) });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - p.value) * 600 }],
    opacity: p.value,
  }));

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: p.value * 0.55,
  }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }, scrimStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <View style={styles.wrap} pointerEvents="box-none">
        <Animated.View style={[styles.sheet, sheetStyle]}>
          <SafeAreaView edges={['bottom']}>
            <View style={styles.grip} />
            {(eyebrow || title) && (
              <View style={styles.header}>
                {eyebrow ? <RNText style={styles.eyebrow}>{eyebrow}</RNText> : null}
                {title ? (
                  <RNText
                    style={styles.title}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                    maxFontSizeMultiplier={1.2}
                  >
                    {title}
                  </RNText>
                ) : null}
              </View>
            )}
            <View style={styles.body}>{children}</View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const makeStyles = (palette: typeof import('@/theme/colors').palette) => ({
  wrap: {
    flex: 1,
    justifyContent: 'flex-end' as const,
  },
  sheet: {
    backgroundColor: palette.bone,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden' as const,
  },
  grip: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
    alignSelf: 'center' as const,
    marginTop: 10,
    marginBottom: 6,
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 8,
  },
  eyebrow: {
    ...T.label,
    color: palette.ink,
    opacity: 0.6,
    marginBottom: 6,
  },
  title: {
    ...T.title1,
    color: palette.ink,
  },
  body: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 24,
  },
});
