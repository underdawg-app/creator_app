// RealProductMockup — a REAL garment photo with the creator's design placed on
// its print area (Qikink-style). The design is a plain RN <Image> overlay so it
// renders reliably (no Skia decode quirks) and stays clearly visible on any
// garment color. A faint shadow gives it a printed-on feel without hiding it.
//
// Priority of what renders (caller-enforced):
//   1. product.mockupUrl  → backend photoreal mockup wins
//   2. RealProductMockup   ← THIS (real photo + design overlay)

import React, { useState } from 'react';
import { View, StyleSheet, type LayoutChangeEvent } from 'react-native';
import { Image } from '@/components/ui/Image';
import { garmentPhotoFor, type GarmentView } from '@/components/merch/garmentPhotos';

type Props = {
  type: string;
  color: string;
  artworkUri?: string | null;
  transform?: { x: number; y: number; scale: number } | null;
  view?: GarmentView;
  size?: number;
  fill?: boolean;
  radius?: number;
};

export function RealProductMockup({ type, color, artworkUri, transform, view = 'FRONT', size, fill, radius = 0 }: Props) {
  const photo = garmentPhotoFor(type, color, view);

  const [measured, setMeasured] = useState(0);
  const dim = fill ? measured : (size ?? 0);
  const onLayout = (e: LayoutChangeEvent) => {
    if (fill) setMeasured(Math.round(e.nativeEvent.layout.width));
  };

  const area = photo.print;
  const aw = area.w * dim;
  const ah = area.h * dim;
  const ax = area.x * dim;
  const ay = area.y * dim;
  const base = aw;
  const s = transform?.scale ?? 1;
  const dx = (transform?.x ?? 0) * aw;
  const dy = (transform?.y ?? 0) * ah;

  return (
    <View
      onLayout={onLayout}
      style={[
        fill ? StyleSheet.absoluteFillObject : { width: size, height: size },
        { borderRadius: radius, overflow: 'hidden' },
      ]}
    >
      {/* Real product photo — contain so the whole product shows on white */}
      <Image source={photo.src} style={StyleSheet.absoluteFillObject} contentFit="contain" transition={150} />

      {/* Design placed + clipped into the print area */}
      {dim > 0 && artworkUri ? (
        <View style={[styles.clip, { left: ax, top: ay, width: aw, height: ah }]}>
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

const styles = StyleSheet.create({
  clip: { position: 'absolute', overflow: 'hidden' },
});
