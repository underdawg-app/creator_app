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
import { creatorTypes } from '@/data/mock';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealText } from '@/components/ui/RevealText';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { typeIconMap } from '@/components/svg/TypeIcons';
import { Asterisk } from '@/components/svg/Marks';
import { type TransitionKey } from '@/components/transitions/CategoryTransition';
import { useTransition } from '@/components/transitions/TransitionProvider';
import { useStore } from '@/store';

const { width, height } = Dimensions.get('window');

export default function CreatorType() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  // Single-select: exactly one category active at a time.
  const [selected, setSelected] = useState<string>('visual');
  const { play, isPlaying } = useTransition();

  const pick = (k: string) => setSelected(k);

  const selectedMeta = creatorTypes.find((t) => t.key === selected);
  const transitionColor = selectedMeta?.color ?? palette.acid;

  const handleNext = () => {
    if (isPlaying) return;
    if (selectedMeta) {
      useStore.getState().setProfile({
        niches: [selectedMeta.title],
      });
    }
    play({
      category: selected as TransitionKey,
      color: transitionColor,
      onMid: () => router.push('/(onboarding)/identity'),
    });
  };

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SkiaWaveField
          width={width}
          height={height}
          color="rgba(242,239,230,0.04)"
          lines={16}
          amplitude={12}
          frequency={0.02}
          speed={0.25}
          strokeWidth={1}
        />
      </View>

      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 24 }}>
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
            <RNText style={styles.step}>STEP 03 / 05</RNText>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <RevealText
            text="what"
            splitBy="char"
            style={{
              fontFamily: fonts.editorialItalic,
              fontSize: 52,
              lineHeight: 52,
              color: palette.ink,
              letterSpacing: -0.8,
            }}
          />
          <RevealText
            text="DO YOU"
            delay={120}
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 70,
              lineHeight: 68,
              color: palette.ink,
              letterSpacing: -2.8,
            }}
          />
          <RevealText
            text="MAKE?"
            delay={220}
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 70,
              lineHeight: 68,
              color: palette.blush,
              letterSpacing: -2.8,
            }}
          />
        </View>

        <RNText style={styles.sub}>
          Pick everything that fits. Multi-hyphenates welcome — we built this
          for people who refuse to stay in one lane.
        </RNText>

        <View style={styles.chipsMeta}>
          <RNText style={styles.chipsMetaLabel}>
            {selectedMeta?.title ?? 'PICK ONE'}
          </RNText>
          <View style={styles.chipsMetaRule} />
          <RNText style={styles.chipsMetaLabel}>CHOOSE ONE</RNText>
        </View>

        <View style={styles.grid}>
          {creatorTypes.map((t) => (
            <Chip
              key={t.key}
              item={t}
              active={selected === t.key}
              onPress={() => pick(t.key)}
            />
          ))}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
        <View style={styles.hairline} />
        <View style={styles.footer}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.step}>YOU ARE A</RNText>
            <RNText style={styles.footerLabel}>{selectedMeta?.title}</RNText>
          </View>
          <MagneticButton
            label="NEXT"
            background={staticPalette.acid}
            foreground={staticPalette.ink}
            size="lg"
            disabled={isPlaying}
            onPress={handleNext}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

function Chip({
  item,
  active,
  onPress,
}: {
  item: (typeof creatorTypes)[0];
  active: boolean;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  // Drive only the icon flourish from the shared value; the card colors use
  // direct props so there is zero chance of an "about-to-be-0.49-still-looks-
  // selected" frame while another chip gains focus.
  const s = useSharedValue(active ? 1 : 0);
  React.useEffect(() => {
    s.value = withSpring(active ? 1 : 0, { damping: 16, stiffness: 260 });
  }, [active]);

  const iconWrap = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${s.value * -8}deg` },
      { scale: 1 + s.value * 0.1 },
    ],
  }));

  const Icon = typeIconMap[item.key as keyof typeof typeIconMap];
  // On the active (pink) chip, pin every glyph to always-black so the icon,
  // label, subtitle, and radio tick all read against the neon accent in both
  // light and dark mode. Inactive chips stay adaptive.
  const iconColor = active ? staticPalette.ink : palette.ink;
  const labelColor = active ? staticPalette.ink : palette.ink;
  const subColor = active ? staticPalette.ink : palette.mute;
  const checkBorder = active ? staticPalette.ink : palette.line;
  const cardStyle = {
    backgroundColor: active ? item.color : 'transparent',
    borderColor: active ? item.color : palette.line,
  };

  return (
    <Pressable
      onPress={onPress}
      // Android applies ~130ms delay on Pressable to disambiguate scroll vs
      // tap. Inside a ScrollView this swallows the first tap on a chip,
      // forcing the user to tap twice to select. Fire immediately.
      unstable_pressDelay={0}
      hitSlop={4}
    >
      <View style={[styles.chip, cardStyle]}>
        <View style={styles.chipRow}>
          {Icon ? (
            <Animated.View style={[styles.chipIconWrap, iconWrap]}>
              <Icon size={26} color={iconColor} strokeWidth={1.6} />
            </Animated.View>
          ) : null}
          <View style={{ flex: 1 }}>
            <RNText style={[styles.chipLabel, { color: labelColor }]}>
              {item.title}
            </RNText>
            <RNText style={[styles.chipSub, { color: subColor }]}>
              {item.subtitle}
            </RNText>
          </View>
          <View
            style={[
              styles.check,
              {
                backgroundColor: active ? staticPalette.ink : 'transparent',
                borderColor: checkBorder,
              },
            ]}
          >
            {active ? (
              <Ionicons name="checkmark" size={12} color={item.color} />
            ) : null}
          </View>
        </View>
      </View>
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
    opacity: 0.65,
  },
  scroll: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 40 },
  sub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 18,
    maxWidth: 360,
  },
  chipsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 26,
    marginBottom: 12,
  },
  chipsMetaLabel: { ...T.micro, color: palette.ink, opacity: 0.6 },
  chipsMetaRule: {
    flex: 1,
    height: 1,
    backgroundColor: palette.line,
  },
  grid: { gap: 8 },
  chip: {
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  chipIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: -0.9,
  },
  chipSub: { ...T.micro, marginTop: 4 },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerSafe: { paddingHorizontal: 24, paddingBottom: 6 },
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
