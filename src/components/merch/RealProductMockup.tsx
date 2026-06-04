// RealProductMockup — a REAL garment photo with the creator's design composited
// realistically onto the fabric. The design is drawn normally (always visible),
// then a second low-opacity MULTIPLY pass picks up the garment's folds/shadows
// so it reads as printed on cloth instead of a flat floating sticker.
//
// `fill` makes it measure its parent and render square edge-to-edge (used by the
// storefront tiles); otherwise pass an explicit `size`.

import React, { useMemo, useState } from 'react';
import { View, StyleSheet, type LayoutChangeEvent } from 'react-native';
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
  size?: number;
  fill?: boolean;
  radius?: number;
};

export function RealProductMockup({ type, color, artworkUri, transform, size, fill, radius = 0 }: Props) {
  const photo = garmentPhotoFor(type, color);
  const garment = useImage(photo.uri);
  const art = useImage(artworkUri ? asFileUri(artworkUri) : null);

  // When `fill`, measure the box; otherwise use the explicit size.
  const [measured, setMeasured] = useState(0);
  const dim = fill ? measured : (size ?? 0);
  const onLayout = (e: LayoutChangeEvent) => {
    if (fill) setMeasured(Math.round(e.nativeEvent.layout.width));
  };

  const canvas = useMemo(() => {
    if (!dim) return null;
    const area = photo.print;
    const aw = area.w * dim;
    const ah = area.h * dim;
    const ax = area.x * dim;
    const ay = area.y * dim;
    const base = aw;
    const s = transform?.scale ?? 1;
    const dx = (transform?.x ?? 0) * aw;
    const dy = (transform?.y ?? 0) * ah;
    const cx = ax + aw / 2;
    const cy = ay + ah / 2;
    const ix = ax + (aw - base) / 2;
    const iy = ay + (ah - base) / 2;

    return (
      <Canvas style={[StyleSheet.absoluteFillObject, { width: dim, height: dim }]}>
        {garment ? <SkiaImage image={garment} x={0} y={0} width={dim} height={dim} fit="cover" /> : null}

        {garment && art && artworkUri ? (
          <Group clip={rect(ax, ay, aw, ah)}>
            <Group origin={vec(cx, cy)} transform={[{ translateX: dx }, { translateY: dy }, { scale: s }]}>
              {/* Pass 1 — design drawn normally so it's always clearly visible,
                  whatever the garment color. */}
              <SkiaImage image={art} x={ix} y={iy} width={base} height={base} fit="contain" />
              {/* Pass 2 — same design, low-opacity MULTIPLY, to let the fabric's
                  folds/shadows fall across the ink for a printed-in look. */}
              <SkiaImage image={art} x={ix} y={iy} width={base} height={base} fit="contain" opacity={0.35} blendMode="multiply" />
            </Group>
          </Group>
        ) : null}
      </Canvas>
    );
  }, [dim, garment, art, artworkUri, photo.print, transform]);

  return (
    <View
      onLayout={onLayout}
      style={[
        fill ? StyleSheet.absoluteFillObject : { width: size, height: size },
        { borderRadius: radius, overflow: 'hidden' },
      ]}
    >
      {/* Plain photo underlay — shows instantly and guarantees no blank flash
          even if Skia hasn't decoded the image yet. */}
      <Image source={{ uri: photo.uri }} style={StyleSheet.absoluteFillObject} contentFit="cover" transition={150} />
      {canvas}
    </View>
  );
}
