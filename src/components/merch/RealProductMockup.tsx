// RealProductMockup — a REAL garment photo with the creator's design composited
// realistically INTO the fabric (not pasted on top). It uses Skia to draw the
// product photo, then the design clipped to that photo's print area with a
// MULTIPLY blend, so the garment's own folds, wrinkles and shadows show through
// the print — the way a real DTG/screen print looks on cloth.
//
// Priority of what renders (caller-enforced):
//   1. product.mockupUrl  → backend photoreal mockup wins
//   2. RealProductMockup   ← THIS (real photo + blended design)

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Canvas,
  Image as SkiaImage,
  Group,
  useImage,
  rect,
  vec,
} from '@shopify/react-native-skia';
import { Image } from '@/components/ui/Image';
import { garmentPhotoFor } from '@/components/merch/garmentPhotos';
import { asFileUri } from '@/utils/uri';

type Props = {
  type: string;
  color: string;
  artworkUri?: string | null;
  transform?: { x: number; y: number; scale: number } | null;
  size: number;
  radius?: number;
};

export function RealProductMockup({ type, color, artworkUri, transform, size, radius = 0 }: Props) {
  const photo = garmentPhotoFor(type, color);

  const garment = useImage(photo.uri);
  const art = useImage(artworkUri ? asFileUri(artworkUri) : null);

  const area = photo.print;
  const aw = area.w * size;
  const ah = area.h * size;
  const ax = area.x * size;
  const ay = area.y * size;
  const base = aw;
  const s = transform?.scale ?? 1;
  const dx = (transform?.x ?? 0) * aw;
  const dy = (transform?.y ?? 0) * ah;
  const cx = ax + aw / 2;
  const cy = ay + ah / 2;

  // While the garment photo loads, show it via the plain RN Image so there's no
  // blank flash; once Skia has it we render the blended composite.
  const ready = !!garment;

  const composite = useMemo(
    () => (
      <Canvas style={{ width: size, height: size }}>
        {garment ? (
          <SkiaImage image={garment} x={0} y={0} width={size} height={size} fit="cover" />
        ) : null}

        {garment && art && artworkUri ? (
          <Group clip={rect(ax, ay, aw, ah)}>
            <Group origin={vec(cx, cy)} transform={[{ translateX: dx }, { translateY: dy }, { scale: s }]}>
              {/* Two passes for a printed-in look:
                  1) the design at slightly reduced opacity so the garment color
                     tints it like real ink on cloth, and
                  2) a MULTIPLY pass so the fabric's folds/shadows darken the
                     ink where the cloth is shaded — not a flat floating sticker. */}
              <SkiaImage
                image={art}
                x={ax + (aw - base) / 2}
                y={ay + (ah - base) / 2}
                width={base}
                height={base}
                fit="contain"
                opacity={0.92}
                blendMode="multiply"
              />
            </Group>
          </Group>
        ) : null}
      </Canvas>
    ),
    [garment, art, artworkUri, size, ax, ay, aw, ah, base, cx, cy, dx, dy, s],
  );

  return (
    <View style={{ width: size, height: size, borderRadius: radius, overflow: 'hidden' }}>
      {!ready ? (
        <Image source={{ uri: photo.uri }} style={{ width: size, height: size }} contentFit="cover" transition={150} />
      ) : (
        composite
      )}
    </View>
  );
}
