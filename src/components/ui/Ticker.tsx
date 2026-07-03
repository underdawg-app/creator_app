import React, { useEffect } from 'react';
import { View, StyleSheet, TextStyle, StyleProp } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { fonts } from '@/theme/typography';
import { useThemedPalette } from '@/theme/ThemeContext';

type Props = {
  value: number;
  fontSize?: number;
  color?: string;
  label?: string;
  labelColor?: string;
  style?: StyleProp<TextStyle>;
};

export function Ticker({ value, fontSize = 44, color, label, labelColor, style }: Props) {
  const palette = useThemedPalette();
  const resolvedColor = color ?? palette.ink;
  const resolvedLabelColor = labelColor ?? palette.mute;
  const display = useSharedValue(0);

  useEffect(() => {
    display.value = withTiming(value, {
      duration: 1200,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }, [value]);

  const [rendered, setRendered] = React.useState('0');

  useEffect(() => {
    const id = setInterval(() => {
      setRendered(Math.round(display.value).toLocaleString());
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <View>
      <Animated.Text
        maxFontSizeMultiplier={1.1}
        style={[
          {
            fontFamily: fonts.displayBold,
            fontSize,
            lineHeight: fontSize,
            letterSpacing: -1.5,
            color: resolvedColor,
          },
          style,
        ]}
      >
        {rendered}
      </Animated.Text>
      {label ? (
        <Animated.Text
          style={{
            fontFamily: fonts.bodyBold,
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: resolvedLabelColor,
            marginTop: 6,
          }}
        >
          {label}
        </Animated.Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
