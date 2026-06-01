// PrintMockup — renders a vector garment with the design placed + clipped inside
// its print area, like a print-on-demand mockup.
//
//   <PrintMockup ... />            static (catalog cards, storefront tiles)
//   <PrintMockup interactive ... > drag to move, pinch to zoom; reports the
//                                  normalized transform via onChange.
//
// The transform is stored normalized to the print area, so the SAME placement
// renders correctly at any mockup size.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image } from '@/components/ui/Image';
import { GarmentSvg, printAreaFor, type GarmentSide } from '@/components/merch/GarmentSvg';

export type ArtTransform = { x: number; y: number; scale: number };

type BaseProps = {
  type: string;
  side: GarmentSide;
  color: string;
  artworkUri?: string | null;
  transform?: ArtTransform | null;
  size: number;
};

// ---- Static (no gestures) ----
export function PrintMockup({ type, side, color, artworkUri, transform, size }: BaseProps) {
  const area = printAreaFor(type, side);
  const ax = area.x * size;
  const ay = area.y * size;
  const aw = area.w * size;
  const ah = area.h * size;
  const base = aw;
  const s = transform?.scale ?? 1;
  const dx = (transform?.x ?? 0) * aw;
  const dy = (transform?.y ?? 0) * ah;

  return (
    <View style={{ width: size, height: size }}>
      <GarmentSvg type={type} side={side} color={color} size={size} />
      {artworkUri ? (
        <View style={[styles.clip, { left: ax, top: ay, width: aw, height: ah }]}>
          {/* Same base-box + transform model as PrintPlacer, so a placement made
              in the editor renders pixel-identical here. */}
          <View
            style={{
              position: 'absolute',
              left: (aw - base) / 2,
              top: (ah - base) / 2,
              width: base,
              height: base,
              transform: [{ translateX: dx }, { translateY: dy }, { scale: s }],
            }}
          >
            <Image source={{ uri: artworkUri }} style={{ width: base, height: base }} contentFit="contain" />
          </View>
        </View>
      ) : null}
    </View>
  );
}

// ---- Interactive placer (drag + pinch) ----
export function PrintPlacer({
  type,
  side,
  color,
  artworkUri,
  transform,
  size,
  zone,
  onChange,
}: BaseProps & { zone?: string; onChange: (t: ArtTransform) => void }) {
  const area = printAreaFor(type, side);
  const ax = area.x * size;
  const ay = area.y * size;
  const aw = area.w * size;
  const ah = area.h * size;
  const base = aw;

  const tx = useSharedValue((transform?.x ?? 0) * aw);
  const ty = useSharedValue((transform?.y ?? 0) * ah);
  const scale = useSharedValue(transform?.scale ?? 1);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startS = useSharedValue(1);

  const commit = () => {
    onChange({ x: aw ? tx.value / aw : 0, y: ah ? ty.value / ah : 0, scale: scale.value });
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = tx.value;
      startY.value = ty.value;
    })
    .onUpdate((e) => {
      tx.value = startX.value + e.translationX;
      ty.value = startY.value + e.translationY;
    })
    .onEnd(() => runOnJS(commit)());

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      startS.value = scale.value;
    })
    .onUpdate((e) => {
      const next = startS.value * e.scale;
      scale.value = Math.min(3, Math.max(0.3, next));
    })
    .onEnd(() => runOnJS(commit)());

  const gesture = Gesture.Simultaneous(pan, pinch);

  const artStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
  }));

  return (
    <View style={{ width: size, height: size }}>
      <GarmentSvg type={type} side={side} color={color} size={size} />
      {/* print-zone outline */}
      <View pointerEvents="none" style={[styles.zone, { left: ax, top: ay, width: aw, height: ah }]} />
      {artworkUri ? (
        <GestureDetector gesture={gesture}>
          <View style={[styles.clip, { left: ax, top: ay, width: aw, height: ah }]} collapsable={false}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  left: (aw - base) / 2,
                  top: (ah - base) / 2,
                  width: base,
                  height: base,
                },
                artStyle,
              ]}
            >
              <Image source={{ uri: artworkUri }} style={{ width: base, height: base }} contentFit="contain" />
            </Animated.View>
          </View>
        </GestureDetector>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { position: 'absolute', overflow: 'hidden' },
  zone: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(120,120,120,0.6)',
    borderRadius: 4,
  },
});
