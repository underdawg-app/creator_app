import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedPalette } from '@/theme/ThemeContext';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';

const { width, height } = Dimensions.get('window');

type Props = {
  bg?: 'bone' | 'ink' | 'paper';
  waves?: boolean;
  scroll?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  padding?: boolean;
  children: React.ReactNode;
};

export function ScreenFrame({
  bg = 'bone',
  waves = true,
  scroll = true,
  header,
  footer,
  contentStyle,
  padding = true,
  children,
}: Props) {
  const palette = useThemedPalette();
  const bgColor = bg === 'ink' ? palette.ink : bg === 'paper' ? palette.paper : palette.bone;
  const waveColor =
    bg === 'ink' ? 'rgba(242,239,230,0.05)' : 'rgba(10,10,10,0.04)';

  return (
    <View style={[styles.root, { backgroundColor: bgColor }]}>
      {waves ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <SkiaWaveField
            width={width}
            height={height}
            color={waveColor}
            lines={14}
            amplitude={12}
            frequency={0.02}
            speed={0.22}
            strokeWidth={1}
          />
        </View>
      ) : null}

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {header ? <View style={styles.header}>{header}</View> : null}
        {scroll ? (
          <ScrollView
            contentContainerStyle={[
              padding ? styles.contentPadded : undefined,
              contentStyle,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              { flex: 1 },
              padding ? styles.contentPadded : undefined,
              contentStyle,
            ]}
          >
            {children}
          </View>
        )}
        {footer}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
  header: { paddingHorizontal: 12 },
  contentPadded: { paddingHorizontal: 12, paddingBottom: 120 },
});
