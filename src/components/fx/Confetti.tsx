import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { useStore } from '@/store';

const IS_ANDROID = Platform.OS === 'android';
const { width, height } = Dimensions.get('window');
const COLORS = [staticPalette.acid, staticPalette.electric, staticPalette.blush, staticPalette.ember, staticPalette.bone];
// Lower piece count on Android. Each piece runs an independent Reanimated
// timing + useAnimatedStyle worklet — at 56 pieces we routinely drop frames
// on mid-range devices. 28 reads as confetti without the stutter.
const COUNT = IS_ANDROID ? 28 : 56;

type Piece = {
  id: number;
  x0: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  color: string;
  shape: 'rect' | 'dot' | 'tri';
  delay: number;
};

let seqId = 0;

function makePieces(): Piece[] {
  const originX = width / 2;
  return Array.from({ length: COUNT }, () => ({
    id: ++seqId,
    x0: originX + (Math.random() - 0.5) * 60,
    dx: (Math.random() - 0.5) * (width * 1.1),
    dy: height * (0.9 + Math.random() * 0.3),
    rot: (Math.random() - 0.5) * 720,
    size: 6 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: (['rect', 'dot', 'tri'] as const)[Math.floor(Math.random() * 3)],
    delay: Math.random() * 180,
  }));
}

export function ConfettiHost() {
  const confettiAt = useStore((s) => s.ui.confettiAt);
  const [active, setActive] = useState<number | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!confettiAt) return;
    setPieces(makePieces());
    setActive(confettiAt);
    const t = setTimeout(() => setActive(null), 2400);
    return () => clearTimeout(t);
  }, [confettiAt]);

  if (!active) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p) => (
        <Piece key={p.id} piece={p} />
      ))}
    </View>
  );
}

const PIECE_BASE_STYLE = { position: 'absolute' as const, top: 0, left: 0 };

const Piece = React.memo(function Piece({ piece }: { piece: Piece }) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withTiming(1, {
      duration: IS_ANDROID ? 1300 : 1700,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const style = useAnimatedStyle(() => {
    const p = t.value;
    return {
      transform: [
        { translateX: piece.x0 + piece.dx * p },
        { translateY: -20 + piece.dy * p },
        { rotateZ: `${piece.rot * p}deg` },
      ],
      opacity: 1 - Math.max(0, p - 0.8) * 5,
    };
  });

  // Box style memoed per piece so we don't allocate it on every render.
  const box = useMemo(
    () => ({
      width: piece.size,
      height: piece.shape === 'rect' ? piece.size * 0.35 : piece.size,
      borderRadius: piece.shape === 'dot' ? piece.size : 0,
      backgroundColor: piece.color,
    }),
    [piece],
  );

  return (
    <Animated.View pointerEvents="none" style={[PIECE_BASE_STYLE, style]}>
      <View style={box} />
    </Animated.View>
  );
});
