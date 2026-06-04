// RealProductMockup — a REAL garment photo with the creator's design composited
// into that photo's print area. This is what the storefront shows, so products
// look like actual photographed merch instead of a vector silhouette.
//
// Priority of what renders:
//   1. product.mockupUrl  → backend photoreal mockup (handled by caller) wins
//   2. real garment photo + design overlay  ← THIS component
//   3. (caller may fall back to the SVG PrintMockup for the editor only)

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from '@/components/ui/Image';
import { garmentPhotoFor } from '@/components/merch/garmentPhotos';

type Props = {
  type: string;
  color: string;
  artworkUri?: string | null;
  /** Normalized transform from the placer (x,y in print-area fractions, scale). */
  transform?: { x: number; y: number; scale: number } | null;
  size: number;
  radius?: number;
};

export function RealProductMockup({ type, color, artworkUri, transform, size, radius = 0 }: Props) {
  const photo = garmentPhotoFor(type, color);
  const area = photo.print;
  const aw = area.w * size;
  const ah = area.h * size;
  const ax = area.x * size;
  const ay = area.y * size;
  const base = aw; // square base box, same model as PrintMockup
  const s = transform?.scale ?? 1;
  const dx = (transform?.x ?? 0) * aw;
  const dy = (transform?.y ?? 0) * ah;

  return (
    <View style={{ width: size, height: size, borderRadius: radius, overflow: 'hidden' }}>
      {/* Real product photo */}
      <Image
        source={{ uri: photo.uri }}
        style={{ width: size, height: size }}
        contentFit="cover"
        transition={200}
      />

      {/* Design clipped + placed into the print area */}
      {artworkUri ? (
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
            <Image
              source={{ uri: artworkUri }}
              style={{ width: base, height: base }}
              contentFit="contain"
            />
            {/* Subtle multiply shade so the print reads as ON the fabric, not a
                floating sticker. Kept light so colors stay true. */}
            <View pointerEvents="none" style={styles.fabricShade} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { position: 'absolute', overflow: 'hidden' },
  fabricShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
});
