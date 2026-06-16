// PrintPlacer — the design-placement editor (Qikink-style): a REAL product photo
// as the backdrop, with the uploaded design draggable/pinchable inside the
// product's print zone (dashed outline). No SVG/icon garment here — the creator
// sees their design on the actual product while positioning it.
//
// The transform is normalized to the print area, so the SAME placement renders
// pixel-identical in the storefront (RealProductMockup).

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Image } from '@/components/ui/Image';
import { type GarmentSide } from '@/components/merch/GarmentSvg';
import { garmentPhotoFor, photoLayout, type GarmentView } from '@/components/merch/garmentPhotos';

export type ArtTransform = { x: number; y: number; scale: number };

type BaseProps = {
  type: string;
  side: GarmentSide;
  color: string;
  artworkUri?: string | null;
  transform?: ArtTransform | null;
  size: number;
};

// ---- Interactive placer (drag + pinch) over a real product photo ----
export function PrintPlacer({
  type,
  side,
  color,
  artworkUri,
  transform,
  size,
  onChange,
}: BaseProps & { zone?: string; onChange: (t: ArtTransform) => void }) {
  const photo = garmentPhotoFor(type, color, side as GarmentView);
  const { fx, fy, fw, fh } = photoLayout(size, photo);
  const area = photo.print;
  const ax = fx + area.x * fw;
  const ay = fy + area.y * fh;
  const aw = area.w * fw;
  const ah = area.h * fh;
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
    <View style={{ width: size, height: size, overflow: 'hidden' }}>
      {/* Real product photo backdrop — zoomed to the product's crop box */}
      <Image
        source={photo.src}
        style={{ position: 'absolute', left: fx, top: fy, width: fw, height: fh }}
        contentFit="contain"
        transition={150}
      />

      {/* print-zone outline (the selectable area) */}
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
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,90,31,0.9)',
    borderRadius: 4,
  },
});
