import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Platform,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { useStore } from '@/store';
import { Image } from '@/components/ui/Image';
import * as Haptics from '@/haptics';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealText } from '@/components/ui/RevealText';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { Marquee } from '@/components/ui/Marquee';
import { Asterisk, RuleDot } from '@/components/svg/Marks';

const { width, height } = Dimensions.get('window');

const heroObject = require('@/objects/obj-7.png');

const ENTER_DURATION = 2800;

export default function Complete() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  const idleA = useSharedValue(0);
  const idleB = useSharedValue(0);
  const dawgP = useSharedValue(0);

  const enterP = useSharedValue(0);
  const pulseP = useSharedValue(0);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    idleA.value = withRepeat(
      withTiming(1, { duration: 3400, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    idleB.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    dawgP.value = withDelay(
      740,
      withTiming(1, { duration: 800, easing: Easing.bezier(0.22, 1, 0.36, 1) }),
    );

    // Warm the feed route while the user is still on this screen so the
    // jump after the enter animation lands on a ready, painted screen
    // instead of a fresh mount.
    router.prefetch('/(tabs)');
  }, []);

  const navToFeed = () => {
    useStore.getState().setOnboarded(true);
    router.replace('/(tabs)');
  };

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    // One soft tap to confirm the press. No further haptics — the animation
    // should feel cinematic, not buzzing.
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft).catch(() => {});

    // Slow breathing loop. Long durations + inOut easing so it feels like
    // a sigh rather than a flicker.
    pulseP.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );

    // Master phase — slow cinematic ease. Long tail so the reveal feels
    // like an exhale, not a snap.
    enterP.value = withTiming(
      1,
      { duration: ENTER_DURATION, easing: Easing.bezier(0.32, 0.72, 0.24, 1) },
      (done) => {
        if (done) runOnJS(navToFeed)();
      },
    );
  };

  const dawgStyle = useAnimatedStyle(() => ({
    opacity: dawgP.value,
    transform: [{ translateY: (1 - dawgP.value) * 40 }],
  }));

  const objStyle = useAnimatedStyle(() => {
    const y = (idleA.value - 0.5) * 44;
    const x = (idleB.value - 0.5) * 22;
    const rot = (idleA.value - 0.5) * 10 + (idleB.value - 0.5) * 4;
    const sc = 1 + (idleA.value - 0.5) * 0.05;
    return {
      transform: [
        { translateX: x },
        { translateY: y },
        { rotate: `${rot}deg` },
        { scale: sc },
      ],
    };
  });

  const pageStyle = useAnimatedStyle(() => ({
    opacity: interpolate(enterP.value, [0, 0.2], [1, 0], Extrapolation.CLAMP),
    transform: [
      { scale: interpolate(enterP.value, [0, 0.4], [1, 0.92], Extrapolation.CLAMP) },
    ],
  }));

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SkiaWaveField
          width={width}
          height={height}
          color="rgba(10,10,10,0.05)"
          lines={16}
          amplitude={14}
          frequency={0.02}
          speed={0.25}
          strokeWidth={1}
        />
      </View>

      <Animated.View
        style={[{ flex: 1 }, pageStyle]}
        pointerEvents={entering ? 'none' : 'auto'}
      >
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
          <View style={styles.top}>
            <View style={styles.stepRow}>
              <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
              <RNText style={styles.step}>STEP 05 / 05</RNText>
            </View>
            <View style={styles.dot} />
          </View>

          <View style={styles.center}>
            <View style={styles.heroBlock}>
              <RevealText
                text="welcome"
                splitBy="char"
                delay={400}
                style={{
                  fontFamily: fonts.editorialItalic,
                  fontSize: 48,
                  lineHeight: 48,
                  color: palette.ink,
                  letterSpacing: -0.6,
                }}
              />
              <RevealText
                text="TO THE"
                delay={580}
                style={{
                  fontFamily: fonts.displayBold,
                  fontSize: 48,
                  lineHeight: 48,
                  color: palette.ink,
                  letterSpacing: -1.8,
                }}
              />
              <Animated.Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                style={[
                  {
                    fontFamily: fonts.displayBold,
                    fontSize: 48,
                    lineHeight: 48,
                    color: palette.ink,
                    letterSpacing: -1.8,
                  },
                  dawgStyle,
                ]}
              >
                DAWGHOUSE.
              </Animated.Text>
            </View>

            <RNText style={styles.body}>
              Your account is live. We're tuning your feed around quality over
              hype — give us a minute and it'll feel like home.
            </RNText>
          </View>

          <View style={styles.bottom}>
            <View style={styles.rule}>
              <RuleDot width={width - 48} color={palette.line} dotColor={palette.ink} />
            </View>

            <Marquee
              items={['YOU ARE EARLY', 'YOU ARE WANTED', 'YOU ARE UNDERDAWG']}
              speed={40}
              separator="   ·   "
              textStyle={{
                fontFamily: fonts.displayBold,
                color: palette.ink,
                opacity: 0.85,
                fontSize: 18,
                lineHeight: 22,
                letterSpacing: -0.4,
                includeFontPadding: false,
              }}
              style={{ height: 26 }}
            />

            <View style={styles.hairline} />
            <View style={styles.ctaRow}>
              <View style={{ flex: 1 }}>
                <RNText style={styles.step}>NEXT</RNText>
                <RNText style={styles.ctaLabel}>TAKE THE TOUR</RNText>
              </View>
              <MagneticButton
                label="ENTER"
                background={staticPalette.ink}
                foreground={staticPalette.acid}
                size="lg"
                disabled={entering}
                onPress={handleEnter}
              />
            </View>
          </View>
        </SafeAreaView>

        <Animated.View style={[styles.objAnchor, objStyle]} pointerEvents="none">
          <Image
            source={heroObject}
            style={{ width: 260, height: 260 }}
            contentFit="contain"
          />
        </Animated.View>
      </Animated.View>

      {entering ? (
        <EnterOverlay phase={enterP} pulse={pulseP} />
      ) : null}
    </View>
  );
}

/* --------------------------------------------------------------------------
 * Cyberpunk physics-enter overlay
 *
 * UNDERDAWGS sits dead-center as a solid rectangular collider. 90 neon
 * colored balls drop from above with real gravity; when a ball's circle
 * intersects the wordmark's AABB, we resolve the collision by pushing it
 * out along the normal of the closest point and reflecting its velocity —
 * the text acts like an immovable wall. Balls also bounce off screen
 * sides and respawn above the top when they exit the bottom.
 *
 * Physics runs inside a `useFrameCallback` worklet on the UI thread, so
 * no JS setState per frame and no dropped frames from React overhead.
 * Each ball is a tiny `Animated.View` whose transform reads directly
 * from the shared particle bank.
 *
 * Visual layers, back to front:
 *   1. Deep cyberpunk bg                  — near-black indigo.
 *   2. Animated neon grid                 — faint cyan + magenta lines.
 *   3. Falling neon balls (×90)           — 8-color palette.
 *   4. UNDERDAWGS wordmark                — centered, cyan neon glow,
 *                                           magenta counter-glow, black fill.
 *   5. Subtitle strip                     — "ENTERING FEED" with ticks.
 * ----------------------------------------------------------------------- */
const WORD = 'UNDERDAWGS';
const LETTERS = WORD.split('');

// Halve+ the ball count on Android. Each ball is a separate Animated.View
// with its own useAnimatedStyle worklet running every frame; cutting from 90
// to 36 reduces per-frame worklet evals and native-view transform updates by
// 2.5×. Visually it still reads as a continuous neon downpour because the
// staggered spawn times and side-bounce keep the screen full.
const COUNT = IS_ANDROID ? 36 : 90;
// Match the brand card accents — same neons used across the app, no
// gradient stops or in-between blends.
const NEON: string[] = [
  staticPalette.blush,    // pink   #FF6BB5
  staticPalette.electric, // blue   #2E5BFF
  staticPalette.acid,     // green  #D8FF3D
  staticPalette.ember,    // orange #FF5A1F
  '#FF003C',              // red
  '#FFE600',              // yellow
];

type ParticleBank = {
  x: number[];
  y: number[];
  vx: number[];
  vy: number[];
  color: string[];
  radius: number[];
};

function createBank(): ParticleBank {
  const x: number[] = [];
  const y: number[] = [];
  const vx: number[] = [];
  const vy: number[] = [];
  const color: string[] = [];
  const radius: number[] = [];
  for (let i = 0; i < COUNT; i++) {
    x.push(Math.random() * width);
    // Stagger start heights so balls rain in over ~1.2s at launch gravity.
    y.push(-40 - Math.random() * height * 1.2);
    vx.push((Math.random() - 0.5) * 80);
    vy.push(40 + Math.random() * 120);
    color.push(NEON[i % NEON.length]);
    radius.push(7 + Math.random() * 10);
  }
  return { x, y, vx, vy, color, radius };
}

/* --------------------------------------------------------------------------
 * Word collider geometry — sized so UNDERDAWGS fits on phones and the
 * collider hugs the visible glyph bounds reasonably tightly.
 * ----------------------------------------------------------------------- */
const WORD_FONT_SIZE = Math.min(Math.floor(width * 0.115), 56);
// space-grotesk display-bold sits around 0.6× advance per glyph at this
// letter-spacing. Slight padding so balls visually rest on the glyph edges.
const WORD_W = WORD_FONT_SIZE * 0.62 * LETTERS.length;
const WORD_H = WORD_FONT_SIZE * 1.05;
const RECT_X = width / 2 - WORD_W / 2;
const RECT_Y = height / 2 - WORD_H / 2;
const RECT_W = WORD_W;
const RECT_H = WORD_H;

function EnterOverlay({
  phase,
  pulse,
}: {
  phase: SharedValue<number>;
  pulse: SharedValue<number>;
}) {
  const bank = useSharedValue<ParticleBank>(createBank());
  // A single integer that ticks every frame. Each ball's animated style reads
  // `tick.value` as its dependency, so the worker re-evaluates once per
  // frame regardless of whether `bank.value` was reassigned. This lets us
  // mutate the bank arrays IN PLACE — no more 4 array.slice() + 1 object
  // allocation per frame, which on Android was ~21k allocs/sec at 60fps just
  // for the physics step.
  const tick = useSharedValue(0);

  // Physics tick — runs every frame on the UI thread.
  useFrameCallback((info) => {
    'worklet';
    const dtMs = info.timeSincePreviousFrame;
    if (dtMs == null || dtMs <= 0 || dtMs > 100) return;
    const dt = Math.min(dtMs / 1000, 1 / 30);

    const gravity = 1450;
    const restitution = 0.78;
    const wallBounce = 0.62;
    const airDrag = 0.998;

    const b = bank.value;
    const x = b.x;
    const y = b.y;
    const vx = b.vx;
    const vy = b.vy;
    const radii = b.radius;

    for (let i = 0; i < COUNT; i++) {
      vy[i] += gravity * dt;
      vx[i] *= airDrag;
      vy[i] *= airDrag;
      x[i] += vx[i] * dt;
      y[i] += vy[i] * dt;

      const r = radii[i];

      // Circle-vs-AABB collision against the UNDERDAWGS rect.
      const cX = Math.max(RECT_X, Math.min(x[i], RECT_X + RECT_W));
      const cY = Math.max(RECT_Y, Math.min(y[i], RECT_Y + RECT_H));
      const dx = x[i] - cX;
      const dy = y[i] - cY;
      const d2 = dx * dx + dy * dy;
      const r2 = r * r;

      if (d2 < r2) {
        let nx: number;
        let ny: number;
        let depth: number;
        if (d2 > 0.0001) {
          const d = Math.sqrt(d2);
          nx = dx / d;
          ny = dy / d;
          depth = r - d;
        } else {
          // Center is inside the rect (shouldn't really happen on entry,
          // but resolve cleanly): push out vertically toward the nearest edge.
          nx = 0;
          ny = y[i] < RECT_Y + RECT_H / 2 ? -1 : 1;
          depth = r;
        }
        x[i] += nx * depth;
        y[i] += ny * depth;
        const vDotN = vx[i] * nx + vy[i] * ny;
        if (vDotN < 0) {
          vx[i] -= (1 + restitution) * vDotN * nx;
          vy[i] -= (1 + restitution) * vDotN * ny;
        }
      }

      // Side walls
      if (x[i] - r < 0) {
        x[i] = r;
        vx[i] = -vx[i] * wallBounce;
      } else if (x[i] + r > width) {
        x[i] = width - r;
        vx[i] = -vx[i] * wallBounce;
      }

      // Bottom — settle and slowly damp, then respawn from the top.
      const floor = height - r - 4;
      if (y[i] > floor) {
        y[i] = floor;
        if (vy[i] > 0) vy[i] = -vy[i] * 0.42;
        vx[i] *= 0.86;
        // Once nearly at rest near the floor, bounce them back up top so the
        // animation stays alive for the duration.
        if (Math.abs(vy[i]) < 30 && Math.abs(vx[i]) < 30) {
          x[i] = Math.random() * width;
          y[i] = -30 - Math.random() * 200;
          vy[i] = 60 + Math.random() * 120;
          vx[i] = (Math.random() - 0.5) * 100;
        }
      }
    }

    // Bump the tick — every Ball worklet depends on this and will re-read
    // the (now-mutated) bank arrays at its index. We do NOT replace
    // bank.value here; the same object reference + mutated contents is enough
    // because tick is the registered dependency.
    tick.value = tick.value + 1;
  });

  // Master fade-in only — the overlay never fades out and never slides
  // away. The animation plays to its natural end, then `navToFeed`
  // swaps to the preloaded `/(tabs)` route which is already painted, so
  // the handoff feels instant rather than a transition.
  const fadeStyle = useAnimatedStyle(() => {
    const fadeIn = interpolate(phase.value, [0, 0.18], [0, 1], Extrapolation.CLAMP);
    return { opacity: fadeIn };
  });

  // Wordmark glow swells with the pulse loop.
  const wordWrapStyle = useAnimatedStyle(() => {
    const pop = interpolate(phase.value, [0, 0.18], [0.85, 1], Extrapolation.CLAMP);
    return { transform: [{ scale: pop }] };
  });

  // Subtitle breathes in once and stays visible — it rides up with the
  // rest of the overlay during the exit slide.
  const subLabelStyle = useAnimatedStyle(() => {
    const fade = interpolate(phase.value, [0.1, 0.24], [0, 1], Extrapolation.CLAMP);
    const breathe = 0.7 + pulse.value * 0.3;
    return { opacity: fade * breathe };
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, fadeStyle]}
      pointerEvents="none"
      collapsable={false}
    >
      {/* Solid black base */}
      <View
        style={[StyleSheet.absoluteFillObject, overlayStyles.cyberBg]}
        pointerEvents="none"
      />

      {/* Falling solid-color balls */}
      {Array.from({ length: COUNT }, (_, i) => (
        <Ball key={i} index={i} bank={bank} tick={tick} />
      ))}

      {/* UNDERDAWGS — plain white solid wordmark */}
      <Animated.View style={[overlayStyles.wordWrap, wordWrapStyle]}>
        <RNText allowFontScaling={false} style={overlayStyles.word}>
          {WORD}
        </RNText>
      </Animated.View>

      {/* Subtitle */}
      <Animated.View style={[overlayStyles.subLabelWrap, subLabelStyle]}>
        <View style={overlayStyles.tick} />
        <RNText allowFontScaling={false} style={overlayStyles.subLabel}>
          ENTERING FEED
        </RNText>
        <View style={overlayStyles.tick} />
      </Animated.View>
    </Animated.View>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Ball — single particle. Reads its position from the shared bank inside a
 * useAnimatedStyle worklet; mounts as a native Animated.View so updates
 * never round-trip through React reconciliation.
 * ────────────────────────────────────────────────────────────────────────── */
function Ball({
  index,
  bank,
  tick,
}: {
  index: number;
  bank: SharedValue<ParticleBank>;
  tick: SharedValue<number>;
}) {
  // Size + color are constant per particle — pull them off the bank once on
  // mount so useAnimatedStyle only needs to update the transform each frame.
  const initial = React.useMemo(() => {
    const b = bank.value;
    return { r: b.radius[index], color: b.color[index] };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const style = useAnimatedStyle(() => {
    // Tick is the registered dependency — the physics worklet bumps it once
    // per frame, which triggers this worker to re-read the (mutated) bank.
    // Reading bank.value alone wouldn't trigger anything since the reference
    // never changes; the in-place mutation is invisible to Reanimated's
    // dependency tracker.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    tick.value;
    const b = bank.value;
    const r = initial.r;
    return {
      transform: [
        { translateX: b.x[index] - r },
        { translateY: b.y[index] - r },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        overlayStyles.ball,
        {
          width: initial.r * 2,
          height: initial.r * 2,
          borderRadius: initial.r,
          backgroundColor: initial.color,
        },
        style,
      ]}
    />
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone, overflow: 'hidden' },
  objAnchor: {
    position: 'absolute',
    right: -60,
    top: 70,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  step: { ...T.label, color: palette.ink, opacity: 0.7 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: palette.bone },
  center: { marginTop: 'auto', marginBottom: 40 },
  heroBlock: { gap: 0 },
  body: {
    ...T.lead,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 20,
    maxWidth: 340,
  },
  bottom: { gap: 16, marginBottom: 6 },
  rule: { alignItems: 'center' },
  hairline: { height: 1, backgroundColor: palette.line },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 4,
  },
  ctaLabel: { ...T.title2, color: palette.ink, marginTop: 4 },
});

const overlayStyles = StyleSheet.create({
  cyberBg: {
    backgroundColor: '#000000',
  },
  ball: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  wordWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontFamily: fonts.displayBold,
    fontSize: WORD_FONT_SIZE,
    letterSpacing: -1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
    color: '#FFFFFF',
  },
  subLabelWrap: {
    position: 'absolute',
    top: height * 0.78,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  subLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 3.2,
    color: '#FFFFFF',
  },
  tick: {
    width: 18,
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
});
