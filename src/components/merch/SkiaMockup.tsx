// SkiaMockup — a richer, on-device composited product mockup. Free, faithful
// (your EXACT design pixels), no API/tokens/backend. Draws the garment with a
// soft volume gradient via Skia, then composites the design clipped to the print
// area using the SAME base-box + transform model as PrintMockup, so placement is
// consistent with the editor and the vector renderer.
//
// While the design image is still decoding (or on any failure) it renders the
// garment shading alone; callers keep the vector PrintMockup as a hard fallback.

import React, { useMemo } from 'react';
import {
  Canvas,
  Group,
  Path,
  Image as SkiaImage,
  LinearGradient,
  vec,
  rect,
  useImage,
  Skia,
} from '@shopify/react-native-skia';
import { garmentBodyPath, printAreaFor, type GarmentSide } from '@/components/merch/GarmentSvg';
import { asFileUri } from '@/utils/uri';

// Lighten (amt>0) / darken (amt<0) a hex, returning an rgb() string.
function shade(hex: string, amt: number): string {
  const h = (hex || '').replace('#', '');
  if (h.length < 6) return hex;
  const ch = (i: number) => parseInt(h.slice(i, i + 2), 16);
  const f = (c: number) => (amt >= 0 ? Math.round(c + (255 - c) * amt) : Math.round(c * (1 + amt)));
  return `rgb(${f(ch(0))}, ${f(ch(2))}, ${f(ch(4))})`;
}

type Props = {
  type: string;
  side: GarmentSide;
  color: string;
  artworkUri?: string | null;
  transform?: { x: number; y: number; scale: number } | null;
  size: number;
};

export function SkiaMockup({ type, side, color, artworkUri, transform, size }: Props) {
  const image = useImage(artworkUri ? asFileUri(artworkUri) : null);

  const path = useMemo(() => {
    const p = Skia.Path.MakeFromSVGString(garmentBodyPath(type, side));
    if (p) p.transform(Skia.Matrix().scale(size / 100, size / 100));
    return p;
  }, [type, side, size]);

  const area = printAreaFor(type, side);
  const ax = area.x * size;
  const ay = area.y * size;
  const aw = area.w * size;
  const ah = area.h * size;
  const base = aw;
  const s = transform?.scale ?? 1;
  const dx = (transform?.x ?? 0) * aw;
  const dy = (transform?.y ?? 0) * ah;
  const cx = ax + aw / 2;
  const cy = ay + ah / 2;

  const light = shade(color, 0.16);
  const dark = shade(color, -0.24);

  return (
    <Canvas style={{ width: size, height: size }}>
      {path ? (
        <Path path={path}>
          <LinearGradient
            start={vec(size * 0.5, size * 0.12)}
            end={vec(size * 0.5, size * 0.95)}
            colors={[light, color, dark]}
            positions={[0, 0.45, 1]}
          />
        </Path>
      ) : null}

      {image && artworkUri ? (
        <Group clip={rect(ax, ay, aw, ah)}>
          <Group origin={vec(cx, cy)} transform={[{ translateX: dx }, { translateY: dy }, { scale: s }]}>
            <SkiaImage
              image={image}
              x={ax + (aw - base) / 2}
              y={ay + (ah - base) / 2}
              width={base}
              height={base}
              fit="contain"
            />
          </Group>
        </Group>
      ) : null}
    </Canvas>
  );
}
