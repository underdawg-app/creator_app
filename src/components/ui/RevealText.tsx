import React, { useEffect, useMemo } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  interpolate,
  Easing,
  type SharedValue,
} from 'react-native-reanimated';

type Props = {
  text: string;
  style?: TextStyle | TextStyle[];
  splitBy?: 'word' | 'char' | 'line';
  delay?: number;
  stagger?: number;
  duration?: number;
  from?: 'bottom' | 'top' | 'blur';
  trigger?: boolean;
};

export function RevealText({
  text,
  style,
  splitBy = 'word',
  delay = 0,
  stagger = 40,
  duration = 680,
  from = 'bottom',
  trigger = true,
}: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (trigger) {
      progress.value = withDelay(
        delay,
        withTiming(1, { duration, easing: Easing.bezier(0.22, 1, 0.36, 1) })
      );
    } else {
      progress.value = 0;
    }
  }, [trigger, delay, duration]);

  const parts = useMemo(() => {
    if (splitBy === 'char') return text.split('');
    if (splitBy === 'line') return text.split('\n');
    return text.split(' ');
  }, [text, splitBy]);

  return (
    <View style={styles.row}>
      {parts.map((p, i) => (
        <RevealPart
          key={`${p}-${i}`}
          progress={progress}
          index={i}
          total={parts.length}
          stagger={stagger}
          duration={duration}
          from={from}
          style={style}
          joiner={splitBy === 'char' ? '' : ' '}
        >
          {p}
        </RevealPart>
      ))}
    </View>
  );
}

function RevealPart({
  progress,
  index,
  total,
  stagger,
  duration,
  from,
  style,
  joiner,
  children,
}: {
  progress: SharedValue<number>;
  index: number;
  total: number;
  stagger: number;
  duration: number;
  from: 'bottom' | 'top' | 'blur';
  style?: TextStyle | TextStyle[];
  joiner: string;
  children: string;
}) {
  const localStart = (index * stagger) / (stagger * total + duration);
  const localEnd = Math.min(
    1,
    localStart + duration / (stagger * total + duration)
  );

  const innerStyle = useAnimatedStyle(() => {
    const t = interpolate(
      progress.value,
      [localStart, localEnd],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const dir = from === 'top' ? -1 : 1;
    return {
      opacity: t,
      transform: [
        { translateY: (1 - t) * 38 * dir },
        { scale: 0.96 + t * 0.04 },
      ],
    };
  });

  return (
    <View style={styles.partWrap}>
      <Animated.Text style={[style, innerStyle]}>
        {children}
        {joiner}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  partWrap: { overflow: 'hidden' },
});
