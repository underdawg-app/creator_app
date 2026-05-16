import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Text as RNText,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { userTypes } from '@/data/mock';
import { useStore } from '@/store';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealText } from '@/components/ui/RevealText';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { Asterisk } from '@/components/svg/Marks';

const { width, height } = Dimensions.get('window');

export default function UserTypeScreen() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [selected, setSelected] = useState<string>('creator');

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SkiaWaveField
          width={width}
          height={height}
          color="rgba(10,10,10,0.04)"
          lines={14}
          amplitude={12}
          frequency={0.02}
          speed={0.25}
          strokeWidth={1}
        />
      </View>

      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 12 }}>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.back}
          >
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <View style={styles.stepRow}>
            <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
            <RNText style={styles.step}>STEP 02 / 05</RNText>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <RevealText
            text="who"
            splitBy="char"
            style={{
              fontFamily: fonts.editorialItalic,
              fontSize: 56,
              lineHeight: 56,
              color: palette.ink,
              letterSpacing: -0.8,
            }}
          />
          <RevealText
            text="ARE"
            delay={100}
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 82,
              lineHeight: 76,
              color: palette.ink,
              letterSpacing: -3.4,
            }}
          />
          <RevealText
            text="YOU?"
            delay={200}
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 82,
              lineHeight: 76,
              color: palette.ink,
              letterSpacing: -3.4,
            }}
          />
        </View>

        <RNText style={styles.sub}>
          Pick the door you're walking through. You can change it later — but
          it tunes everything you see.
        </RNText>

        <View style={styles.grid}>
          {userTypes.map((item) => (
            <UserTypeCard
              key={item.key}
              item={item}
              active={selected === item.key}
              onPress={() => setSelected(item.key)}
            />
          ))}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
        <View style={styles.hairline} />
        <View style={styles.footer}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.step}>CONTINUE AS</RNText>
            <RNText style={styles.footerLabel}>
              {userTypes.find((t) => t.key === selected)?.label}
            </RNText>
          </View>
          <MagneticButton
            label="NEXT"
            background={palette.ink}
            foreground={palette.bone}
            size="lg"
            onPress={() => {
              const picked = userTypes.find((t) => t.key === selected);
              if (picked) {
                useStore.getState().setProfile({ type: picked.label });
              }
              router.push('/(onboarding)/creator-type');
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function UserTypeCard({
  item,
  active,
  onPress,
}: {
  item: (typeof userTypes)[0];
  active: boolean;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const s = useSharedValue(active ? 1 : 0);
  React.useEffect(() => {
    s.value = withSpring(active ? 1 : 0, { damping: 15, stiffness: 220 });
  }, [active]);

  const cardStyle = useAnimatedStyle(() => ({
    backgroundColor: s.value > 0.5 ? item.accent : palette.paper,
    borderColor: s.value > 0.5 ? staticPalette.ink : palette.line,
    transform: [{ scale: 1 - s.value * 0.006 }],
  }));

  // On the active (pink) card, force everything to always-black for contrast
  // against the neon accent. On the inactive (paper) card, let palette.ink
  // follow the theme.
  const textColor = active ? staticPalette.ink : palette.ink;
  const borderColor = active ? staticPalette.ink : palette.ink;

  return (
    <Pressable onPress={onPress} style={{ marginBottom: 10 }}>
      <Animated.View style={[styles.card, cardStyle]}>
        <View style={styles.cardTopRow}>
          <RNText style={[styles.cardTag, { color: textColor }]}>{item.tag}</RNText>
          <View
            style={[
              styles.radio,
              {
                borderColor,
                backgroundColor: active ? staticPalette.ink : 'transparent',
              },
            ]}
          >
            {active ? (
              <Ionicons name="checkmark" size={12} color={item.accent} />
            ) : null}
          </View>
        </View>
        <RNText style={[styles.cardLabel, { color: textColor }]}>{item.label}</RNText>
        <RNText style={[styles.cardBody, { color: textColor }]}>{item.body}</RNText>
      </Animated.View>
    </Pressable>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  step: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
  },
  scroll: { paddingHorizontal: 12, paddingTop: 28, paddingBottom: 40 },
  sub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 20,
    maxWidth: 340,
  },
  grid: { marginTop: 28 },
  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTag: { ...T.micro, color: palette.ink, opacity: 0.65 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -1.6,
    marginTop: 18,
    color: palette.ink,
  },
  cardBody: {
    ...T.body,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 10,
    maxWidth: 300,
  },

  footerSafe: { paddingHorizontal: 12, paddingBottom: 6 },
  hairline: { height: 1, backgroundColor: palette.line },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  footerLabel: {
    ...T.title2,
    color: palette.ink,
    marginTop: 4,
  },
});
