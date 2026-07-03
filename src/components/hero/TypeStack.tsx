import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { fonts } from '@/theme/typography';

type Props = {
  lines: { text: string; color: string; size?: number; italic?: boolean; family?: string }[];
  delay?: number;
  align?: 'left' | 'center' | 'right';
};

export function TypeStack({ lines, delay = 120, align = 'left' }: Props) {
  return (
    <View style={{ alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
      {lines.map((ln, i) => (
        <Line key={`${ln.text}-${i}`} {...ln} delay={delay + i * 140} align={align} />
      ))}
    </View>
  );
}

function Line({
  text,
  color,
  size = 72,
  italic,
  family,
  delay,
  align,
}: {
  text: string;
  color: string;
  size?: number;
  italic?: boolean;
  family?: string;
  delay: number;
  align: 'left' | 'center' | 'right';
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      delay,
      withTiming(1, { duration: 780, easing: Easing.bezier(0.22, 1, 0.36, 1) })
    );
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - p.value) * size * 1.1 }],
    opacity: p.value,
  }));

  return (
    <View style={[styles.line, { height: size * 0.96 }]}>
      <Animated.Text
        style={[
          style,
          {
            fontFamily:
              family ??
              (italic ? fonts.editorialItalic : fonts.displayBold),
            fontSize: size,
            lineHeight: size * 0.96,
            letterSpacing: -size * 0.035,
            color,
            textAlign: align,
            fontStyle: italic ? 'italic' : 'normal',
          },
        ]}
      >
        {text}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  line: { overflow: 'hidden' },
});
