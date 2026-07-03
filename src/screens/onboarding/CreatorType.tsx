import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Text as RNText,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { creatorTypes } from '@/data/mock';
import { typeIconMap } from '@/components/svg/TypeIcons';
import { type TransitionKey } from '@/components/transitions/CategoryTransition';
import { useTransition } from '@/components/transitions/TransitionProvider';
import { useStore } from '@/store';

const H_PADDING = 20;
const ROW_COLLAPSED = 56;
const ROW_EXPANDED = 124;

export default function CreatorType() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  // expandedKey is the single open row; null = all collapsed.
  const [expandedKey, setExpandedKey] = useState<string | null>('visual');
  const { play, isPlaying } = useTransition();

  const selectedMeta = expandedKey
    ? creatorTypes.find((t) => t.key === expandedKey)
    : null;

  const toggle = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  const handleNext = () => {
    if (isPlaying || !selectedMeta) return;
    useStore.getState().setProfile({ niches: [selectedMeta.title] });
    play({
      category: selectedMeta.key as TransitionKey,
      color: selectedMeta.color ?? palette.acid,
      onMid: () => router.push('/(onboarding)/identity'),
    });
  };

  const canContinue = !!selectedMeta && !isPlaying;

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.topSafe}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={styles.headerBlock}>
        <RNText style={styles.kicker}>I MAKE</RNText>
        <RNText style={[styles.title, { color: palette.ink }]} allowFontScaling={false}>
          WHAT YOU
        </RNText>
        <RNText style={[styles.title, { color: palette.ink }]} allowFontScaling={false}>
          MAKE.
        </RNText>
        <RNText style={styles.body}>Pick a lane.</RNText>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {creatorTypes.map((t, i) => (
          <Row
            key={t.key}
            item={t}
            index={i}
            expanded={expandedKey === t.key}
            onPress={() => toggle(t.key)}
          />
        ))}
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
        <View style={styles.footerInfo}>
          <RNText style={styles.footerKicker}>SELECTED</RNText>
          <RNText style={styles.footerLabel} numberOfLines={1}>
            {selectedMeta?.title ?? '—'}
          </RNText>
        </View>
        <Pressable
          onPress={handleNext}
          disabled={!canContinue}
          style={[styles.cta, !canContinue && { opacity: 0.4 }]}
        >
          <RNText style={styles.ctaText}>CONTINUE</RNText>
          <View style={styles.ctaArrow}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

function Row({
  item,
  index,
  expanded,
  onPress,
}: {
  item: (typeof creatorTypes)[0];
  index: number;
  expanded: boolean;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const Icon = typeIconMap[item.key as keyof typeof typeIconMap];

  const h = useSharedValue(expanded ? ROW_EXPANDED : ROW_COLLAPSED);
  const open = useSharedValue(expanded ? 1 : 0);

  React.useEffect(() => {
    h.value = withSpring(expanded ? ROW_EXPANDED : ROW_COLLAPSED, {
      damping: 22,
      stiffness: 220,
      mass: 0.7,
    });
    open.value = withTiming(expanded ? 1 : 0, {
      duration: 280,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }, [expanded]);

  const containerStyle = useAnimatedStyle(() => ({ height: h.value }));
  const subStyle = useAnimatedStyle(() => ({
    opacity: open.value,
    transform: [{ translateY: (1 - open.value) * 6 }],
  }));

  // Active = bright accent fill, always-black text (every accent is bright
  // enough that black reads on it). Inactive = adaptive surface tone that
  // differs from the page bg in both light and dark mode.
  const bg = expanded ? item.color : palette.boneSoft;
  const fg = expanded ? staticPalette.ink : palette.ink;

  return (
    <Animated.View
      style={[
        styles.row,
        {
          backgroundColor: bg,
          borderWidth: expanded ? 2 : 1.5,
          borderColor: palette.ink,
        },
        containerStyle,
      ]}
    >
      <Pressable
        onPress={onPress}
        unstable_pressDelay={0}
        hitSlop={4}
        style={styles.rowInner}
      >
        <View style={styles.rowTopRow}>
          <View
            style={[
              styles.numCircle,
              expanded
                ? { backgroundColor: staticPalette.ink }
                : { borderWidth: 1, borderColor: fg },
            ]}
          >
            <RNText
              style={[
                styles.numText,
                { color: expanded ? staticPalette.bone : fg },
              ]}
            >
              {String(index + 1).padStart(2, '0')}
            </RNText>
          </View>
          <RNText
            allowFontScaling={false}
            style={[styles.rowTitle, { color: fg }]}
            numberOfLines={1}
          >
            {item.title}
          </RNText>
          {Icon ? (
            <Icon size={24} color={fg} strokeWidth={1.7} />
          ) : null}
        </View>
        <Animated.Text
          allowFontScaling={false}
          style={[styles.rowSub, { color: fg }, subStyle]}
          numberOfLines={2}
        >
          {item.subtitle}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  topSafe: { paddingHorizontal: H_PADDING },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.paper,
  },

  headerBlock: {
    paddingHorizontal: H_PADDING,
    paddingTop: 14,
    paddingBottom: 14,
  },
  kicker: {
    ...T.labelLarge,
    color: palette.ink,
    opacity: 0.5,
    marginBottom: 6,
  },
  title: {
    ...T.display2,
    includeFontPadding: false,
  },
  body: {
    ...T.lead,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 10,
  },

  scroll: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 14,
    gap: 6,
  },
  row: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  rowInner: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
  },
  rowTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 32,
  },
  numCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    ...T.label,
  },
  rowTitle: {
    flex: 1,
    ...T.title2,
    includeFontPadding: false,
  },
  rowSub: {
    ...T.lead,
    opacity: 0.92,
    marginTop: 12,
    marginLeft: 44,
  },

  footerSafe: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 6,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerInfo: {
    flex: 1,
  },
  footerKicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.5,
  },
  footerLabel: {
    ...T.title2,
    color: palette.ink,
    marginTop: 2,
  },
  cta: {
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 22,
    paddingRight: 8,
    backgroundColor: palette.ink,
  },
  ctaText: {
    ...T.button,
    color: palette.bone,
  },
  ctaArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.bone,
  },
});
