import React, { useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text as RNText,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  Extrapolation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const { width, height } = Dimensions.get('window');

/**
 * 3.2 seconds — paced deliberately so every phase reads:
 *   0.00–0.06  ink wash fades in over the old screen
 *   0.08–0.40  color panel slides in from the category's edge
 *   0.28–0.52  kicker + huge word + footer + accent fade in (word mask-revealed)
 *   0.52–0.78  HOLD — full composition visible, cinematic beat
 *   0.78–0.88  content fades out
 *   0.86       destination screen mounts behind the overlay (router.push)
 *   0.86–1.00  color panel + ink slide out in the same direction as entry,
 *              exposing the destination page cleanly
 */
export const TRANSITION_MS = 3200;
// Fire navigation well before the exit phase so the destination screen is
// mounted and ready by the time the overlay starts sliding off.
const NAVIGATE_AT = 0.62;

export type TransitionKey =
  | 'visual'
  | 'musician'
  | 'video'
  | 'writer'
  | 'performer'
  | 'educator'
  | 'podcaster'
  | 'streamer'
  | 'fashion'
  | 'multi';

type CategoryDef = {
  word: string;
  kicker: string;
  footer: string;
  enterFrom: 'bottom' | 'top' | 'left' | 'right';
  accent: 'circle' | 'triangle' | 'bars' | 'dot' | 'star' | 'diamond' | 'rings' | 'rec' | 'plus' | 'square';
};

const CAT: Record<TransitionKey, CategoryDef> = {
  visual:    { word: 'VISUAL',  kicker: 'N° 01 · VISUAL ART',  footer: 'IMAGES / PAINT / PRINT', enterFrom: 'right',  accent: 'square' },
  musician:  { word: 'MUSIC',   kicker: 'N° 02 · MUSIC',       footer: 'NOTES / LOOPS / LIVE',  enterFrom: 'bottom', accent: 'bars' },
  video:     { word: 'VIDEO',   kicker: 'N° 03 · VIDEO',       footer: 'FRAMES / CUT / SHIP',   enterFrom: 'left',   accent: 'triangle' },
  writer:    { word: 'WORDS',   kicker: 'N° 04 · WRITING',     footer: 'PAGES / INK / VOICE',   enterFrom: 'bottom', accent: 'dot' },
  performer: { word: 'LIVE',    kicker: 'N° 05 · PERFORMER',   footer: 'STAGE / BODY / SHOW',   enterFrom: 'top',    accent: 'star' },
  educator:  { word: 'TEACH',   kicker: 'N° 06 · EDUCATOR',    footer: 'BOOKS / SCHOOL / Q&A',  enterFrom: 'left',   accent: 'diamond' },
  podcaster: { word: 'ON AIR',  kicker: 'N° 07 · PODCASTER',   footer: 'MIC / TAPE / TALK',     enterFrom: 'right',  accent: 'rings' },
  streamer:  { word: 'STREAM',  kicker: 'N° 08 · STREAMER',    footer: 'LIVE / CHAT / PLAY',    enterFrom: 'bottom', accent: 'rec' },
  fashion:   { word: 'STYLE',   kicker: 'N° 09 · FASHION',     footer: 'CLOTH / FIT / FEEL',    enterFrom: 'top',    accent: 'diamond' },
  multi:     { word: 'ALL IN',  kicker: 'N° 10 · MULTI',       footer: 'CRAFT / CROSS / CODE',  enterFrom: 'right',  accent: 'plus' },
};

type Props = {
  active: boolean;
  category: TransitionKey | null;
  color: string;
  onMid?: () => void;
  onComplete: () => void;
};

export function CategoryTransition({ active, category, color, onMid, onComplete }: Props) {
  const p = useSharedValue(0);

  useEffect(() => {
    if (!active || !category) {
      p.value = 0;
      return;
    }
    p.value = 0;
    p.value = withTiming(
      1,
      { duration: TRANSITION_MS, easing: Easing.bezier(0.5, 0, 0.2, 1) },
      (finished) => { if (finished) runOnJS(onComplete)(); }
    );

    // One-shot navigate trigger near the end of the hold, so the destination
    // screen is already mounted when the panel slides off.
    const midTimer = setTimeout(() => {
      onMid?.();
    }, TRANSITION_MS * NAVIGATE_AT);

    return () => clearTimeout(midTimer);
  }, [active, category]);

  if (!active || !category) return null;

  const def = CAT[category];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="auto">
      <InkCover progress={p} />
      <ColorCover progress={p} color={color} from={def.enterFrom} />
      <PanelContent progress={p} def={def} />
    </View>
  );
}

// ── ink + color covers ───────────────────────────────────────────────────

function InkCover({ progress }: { progress: SharedValue<number> }) {
  const s = useAnimatedStyle(() => ({
    // Fade up at start, fade down during exit.
    opacity: interpolate(
      progress.value,
      [0, 0.06, 0.82, 0.96],
      [0, 1, 1, 0],
      Extrapolation.CLAMP
    ),
  }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { backgroundColor: staticPalette.ink }, s]}
    />
  );
}

function ColorCover({
  progress, color, from,
}: {
  progress: SharedValue<number>;
  color: string;
  from: 'bottom' | 'top' | 'left' | 'right';
}) {
  const s = useAnimatedStyle(() => {
    const v = progress.value;
    let off = 1; // 1 = fully off-screen in the "from" direction, 0 = covering, -1 = off-screen opposite

    if (v < 0.08) {
      off = 1; // not yet
    } else if (v < 0.4) {
      // entry
      const t = (v - 0.08) / (0.4 - 0.08);
      const eased = 1 - Math.pow(1 - t, 3);
      off = 1 - eased;
    } else if (v < 0.86) {
      off = 0; // locked in place
    } else {
      // exit — continues through in the same direction the panel was moving
      const t = (v - 0.86) / (1 - 0.86);
      const eased = Math.pow(t, 3);
      off = -eased;
    }

    return {
      transform: [
        { translateX: from === 'left' ? -width * off : from === 'right' ? width * off : 0 },
        { translateY: from === 'top' ? -height * off : from === 'bottom' ? height * off : 0 },
      ],
    };
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { backgroundColor: color }, s]}
    />
  );
}

// ── content layer ────────────────────────────────────────────────────────

function PanelContent({ progress, def }: { progress: SharedValue<number>; def: CategoryDef }) {
  const outer = useAnimatedStyle(() => ({
    // Fade in after panel is mostly in, hold, fade out at exit.
    opacity: interpolate(
      progress.value,
      [0.28, 0.44, 0.78, 0.86],
      [0, 1, 1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, outer]}
    >
      <KickerStrip progress={progress} label={def.kicker} />
      <BigWord progress={progress} word={def.word} />
      <FooterStrip progress={progress} label={def.footer} />
      <Accent progress={progress} kind={def.accent} />
    </Animated.View>
  );
}

function KickerStrip({ progress, label }: { progress: SharedValue<number>; label: string }) {
  const anim = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0.28, 0.46], [-14, 0], Extrapolation.CLAMP) },
    ],
  }));
  return (
    <Animated.View style={[styles.kicker, anim]}>
      <View style={styles.kickerDot} />
      <RNText style={styles.kickerText}>{label}</RNText>
      <View style={styles.kickerLine} />
    </Animated.View>
  );
}

function FooterStrip({ progress, label }: { progress: SharedValue<number>; label: string }) {
  const anim = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0.34, 0.52], [14, 0], Extrapolation.CLAMP) },
    ],
  }));
  return (
    <Animated.View style={[styles.footer, anim]}>
      <View style={styles.footerLine} />
      <RNText style={styles.footerText}>{label}</RNText>
      <RNText style={styles.footerText}>MMXXVI</RNText>
    </Animated.View>
  );
}

/**
 * Single-Text big word with mask reveal. Using one Text (not per-letter)
 * means numberOfLines={1} + adjustsFontSizeToFit can guarantee the word
 * always fits on-screen, even for 'ON AIR' or 'ALL IN'. We still get the
 * cinematic mask reveal via a clipped parent and a translateY.
 */
function BigWord({ progress, word }: { progress: SharedValue<number>; word: string }) {
  const maskH = 140;

  const anim = useAnimatedStyle(() => {
    const inT = interpolate(progress.value, [0.3, 0.52], [0, 1], Extrapolation.CLAMP);
    const outT = interpolate(progress.value, [0.78, 0.86], [0, 1], Extrapolation.CLAMP);
    const easedIn = 1 - Math.pow(1 - inT, 3);
    const easedOut = Math.pow(outT, 3);
    const y = (1 - easedIn) * maskH - easedOut * maskH * 0.6;
    return { transform: [{ translateY: y }] };
  });

  return (
    <View style={styles.wordWrap}>
      <View style={[styles.wordClip, { height: maskH }]}>
        <Animated.Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
          style={[styles.bigWord, anim]}
        >
          {word}
        </Animated.Text>
      </View>
    </View>
  );
}

// ── accent geometry ──────────────────────────────────────────────────────

function Accent({ progress, kind }: { progress: SharedValue<number>; kind: CategoryDef['accent'] }) {
  const anim = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0.42, 0.56, 0.64], [0.6, 1.1, 1], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.accent, anim]}>
      {kind === 'circle' && <View style={styles.acCircle} />}
      {kind === 'square' && <View style={styles.acSquare} />}
      {kind === 'triangle' && <View style={styles.acTriangle} />}
      {kind === 'bars' && <Bars progress={progress} />}
      {kind === 'dot' && <View style={styles.acDot} />}
      {kind === 'star' && <Star />}
      {kind === 'diamond' && <View style={styles.acDiamond} />}
      {kind === 'rings' && <Rings />}
      {kind === 'rec' && <Rec />}
      {kind === 'plus' && <Plus />}
    </Animated.View>
  );
}

function Bars({ progress }: { progress: SharedValue<number> }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: 6 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <BarItem key={i} i={i} progress={progress} />
      ))}
    </View>
  );
}

function BarItem({ i, progress }: { i: number; progress: SharedValue<number> }) {
  const anim = useAnimatedStyle(() => {
    const t = interpolate(progress.value, [0.44 + i * 0.02, 0.6 + i * 0.02], [0, 1], Extrapolation.CLAMP);
    const wave = Math.sin(progress.value * 12 + i * 1.1);
    const h = 20 + t * (50 + wave * 20);
    return { height: h };
  });
  return <Animated.View style={[{ width: 10, backgroundColor: staticPalette.ink, borderRadius: 5 }, anim]} />;
}

function Star() {
  return (
    <View style={styles.acStar}>
      {[0, 45, 90, 135].map((r) => (
        <View key={r} style={[styles.acStarBar, { transform: [{ rotate: `${r}deg` }] }]} />
      ))}
    </View>
  );
}

function Rings() {
  return (
    <View style={styles.acRings}>
      <View style={[styles.acRing, { width: 90, height: 90, borderRadius: 45 }]} />
      <View style={[styles.acRing, { width: 60, height: 60, borderRadius: 30, position: 'absolute' }]} />
      <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: staticPalette.ink, position: 'absolute' }} />
    </View>
  );
}

function Rec() {
  return (
    <View style={styles.acRec}>
      <View style={styles.acRecDot} />
      <RNText style={styles.acRecText}>REC</RNText>
    </View>
  );
}

function Plus() {
  return (
    <View style={styles.acPlus}>
      <View style={styles.acPlusH} />
      <View style={styles.acPlusV} />
    </View>
  );
}

// ── styles ───────────────────────────────────────────────────────────────

const SIDE_PAD = 28;

const styles = StyleSheet.create({
  kicker: {
    position: 'absolute',
    top: 84,
    left: SIDE_PAD,
    right: SIDE_PAD,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  kickerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: staticPalette.ink },
  kickerText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2.4,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },
  kickerLine: { flex: 1, height: 1, backgroundColor: staticPalette.ink, opacity: 0.2 },

  footer: {
    position: 'absolute',
    bottom: 84,
    left: SIDE_PAD,
    right: SIDE_PAD,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  footerLine: { width: 14, height: 1, backgroundColor: staticPalette.ink },
  footerText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 2.4,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },

  wordWrap: {
    position: 'absolute',
    top: 0, left: SIDE_PAD, right: SIDE_PAD, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordClip: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigWord: {
    fontFamily: fonts.displayBold,
    fontSize: 124,
    lineHeight: 124,
    letterSpacing: -5,
    color: staticPalette.ink,
    textAlign: 'center',
    width: '100%',
  },

  accent: {
    position: 'absolute',
    top: 160,
    right: SIDE_PAD,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
  },
  acCircle: { width: 74, height: 74, borderRadius: 37, backgroundColor: staticPalette.ink },
  acSquare: { width: 68, height: 68, backgroundColor: staticPalette.ink },
  acTriangle: {
    width: 0, height: 0,
    borderLeftWidth: 40, borderRightWidth: 40, borderBottomWidth: 60,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: staticPalette.ink,
    transform: [{ rotate: '90deg' }],
  },
  acDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: staticPalette.ink },
  acStar: { width: 84, height: 84, alignItems: 'center', justifyContent: 'center' },
  acStarBar: { position: 'absolute', width: 84, height: 4, backgroundColor: staticPalette.ink, borderRadius: 2 },
  acDiamond: { width: 54, height: 54, backgroundColor: staticPalette.ink, transform: [{ rotate: '45deg' }] },
  acRings: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center' },
  acRing: { borderWidth: 2, borderColor: staticPalette.ink, position: 'absolute' },
  acRec: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  acRecDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#FF3B30' },
  acRecText: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    letterSpacing: -0.6,
    color: staticPalette.ink,
  },
  acPlus: { width: 70, height: 70, alignItems: 'center', justifyContent: 'center' },
  acPlusH: { position: 'absolute', width: 70, height: 10, backgroundColor: staticPalette.ink },
  acPlusV: { position: 'absolute', width: 10, height: 70, backgroundColor: staticPalette.ink },
});
