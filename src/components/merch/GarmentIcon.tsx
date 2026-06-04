// GarmentIcon — realistic vector ICON per product type (from the Ionicons
// library), tinted to the garment color. Used as the placement backdrop in the
// design editor instead of a hand-drawn SVG silhouette.
//
// `printAreaFor` (geometry only) still comes from GarmentSvg so the design lands
// in the right spot — but nothing here draws a custom <Svg> path.

import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@/icons';
import { readableOn, type GarmentSide } from '@/components/merch/GarmentSvg';

// Realistic icon per product type. Filled glyphs read as a solid garment the
// design can sit on.
const ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  TEE: 'shirt',
  HOODIE: 'shirt',
  MUG: 'cafe',
  TOTE: 'bag-handle',
  POSTER: 'image',
  CAP: 'school', // closest realistic "cap" glyph in Ionicons
};

export function GarmentIcon({
  type,
  color,
  size,
}: {
  type: string;
  color: string;
  side?: GarmentSide;
  size: number;
}) {
  const name = ICON[type] ?? 'shirt';
  // A faint contrast outline-tone keeps a light garment visible on light bg.
  const tint = color || '#E7E2D4';
  const edge = readableOn(tint) === '#0A0A0A' ? 'rgba(10,10,10,0.12)' : 'rgba(242,239,230,0.18)';

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* soft edge copy slightly larger for a subtle rim, then the filled glyph */}
      <Ionicons name={name} size={size * 0.96} color={edge} style={{ position: 'absolute' }} />
      <Ionicons name={name} size={size * 0.92} color={tint} />
    </View>
  );
}
