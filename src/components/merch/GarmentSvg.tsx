// GarmentSvg — lightweight realistic vector silhouettes per product type, drawn
// in a 0–100 viewBox so a single `size` scales them. Each type/side also has a
// PRINT AREA (fractions of the canvas) where artwork is allowed to sit — used by
// PrintMockup to place + clip the design like a print-on-demand mockup.

import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export type GarmentSide = 'FRONT' | 'BACK' | 'LEFT' | 'RIGHT';

export function readableOn(hex: string): string {
  const h = (hex || '').replace('#', '');
  if (h.length < 6) return '#0A0A0A';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0A0A0A' : '#FFFFFF';
}

export type Area = { x: number; y: number; w: number; h: number };

const AREAS: Record<string, Area> = {
  'TEE:FRONT': { x: 0.31, y: 0.32, w: 0.38, h: 0.40 },
  'TEE:BACK': { x: 0.28, y: 0.26, w: 0.44, h: 0.50 },
  'TEE:LEFT': { x: 0.34, y: 0.30, w: 0.17, h: 0.15 },
  'TEE:RIGHT': { x: 0.49, y: 0.30, w: 0.17, h: 0.15 },
  'HOODIE:FRONT': { x: 0.33, y: 0.30, w: 0.34, h: 0.28 },
  'HOODIE:BACK': { x: 0.29, y: 0.26, w: 0.42, h: 0.44 },
  'HOODIE:LEFT': { x: 0.35, y: 0.30, w: 0.16, h: 0.14 },
  'HOODIE:RIGHT': { x: 0.49, y: 0.30, w: 0.16, h: 0.14 },
  'CAP:FRONT': { x: 0.36, y: 0.28, w: 0.30, h: 0.20 },
  'MUG:FRONT': { x: 0.30, y: 0.34, w: 0.34, h: 0.36 },
  'TOTE:FRONT': { x: 0.32, y: 0.44, w: 0.36, h: 0.34 },
  'POSTER:FRONT': { x: 0.26, y: 0.18, w: 0.48, h: 0.64 },
};

export function printAreaFor(type: string, side: GarmentSide): Area {
  return AREAS[`${type}:${side}`] || AREAS[`${type}:FRONT`] || { x: 0.3, y: 0.3, w: 0.4, h: 0.4 };
}

// Primary closed silhouette per garment, in the 0–100 viewBox — reused by the
// Skia mockup renderer to fill + shade the garment body.
export function garmentBodyPath(type: string, side: GarmentSide): string {
  switch (type) {
    case 'CAP':
      return 'M24,56 C24,30 41,17 56,17 C77,17 89,33 90,56 Z';
    case 'MUG':
      return 'M24,28 Q24,24 28,24 L66,24 Q70,24 70,28 L70,76 Q70,80 66,80 L28,80 Q24,80 24,76 Z';
    case 'TOTE':
      return 'M27,32 L73,32 L78,88 L22,88 Z';
    case 'POSTER':
      return 'M20,12 L80,12 L80,88 L20,88 Z';
    case 'TEE':
    case 'HOODIE':
    default:
      return side === 'BACK' ? TEE_BACK : TEE_FRONT;
  }
}

const TEE_FRONT =
  'M34,12 C30,14 26,16 22,20 L8,32 L20,45 L26,39 L26,92 L74,92 L74,39 L80,45 L92,32 L78,20 C74,16 70,14 66,12 C62,23 54,26 50,26 C46,26 38,23 34,12 Z';
const TEE_BACK =
  'M34,12 C30,14 26,16 22,20 L8,32 L20,45 L26,39 L26,92 L74,92 L74,39 L80,45 L92,32 L78,20 C74,16 70,14 66,12 C60,16 54,17 50,17 C46,17 40,16 34,12 Z';

export function GarmentSvg({
  type,
  side = 'FRONT',
  color,
  size,
}: {
  type: string;
  side?: GarmentSide;
  color: string;
  size: number;
}) {
  const line = readableOn(color) === '#0A0A0A' ? 'rgba(10,10,10,0.22)' : 'rgba(242,239,230,0.34)';
  const sw = 1.4;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {renderGarment(type, side, color, line, sw)}
    </Svg>
  );
}

function renderGarment(type: string, side: GarmentSide, fill: string, line: string, sw: number) {
  switch (type) {
    case 'CAP':
      return (
        <>
          <Path d="M90,55 C98,56 99,63 95,66 L30,66 C24,66 23,59 24,55 Z" fill={fill} stroke={line} strokeWidth={sw} strokeLinejoin="round" />
          <Path d="M24,56 C24,30 41,17 56,17 C77,17 89,33 90,56 Z" fill={fill} stroke={line} strokeWidth={sw} strokeLinejoin="round" />
          <Circle cx="56" cy="19" r="2.4" fill={line} />
          <Path d="M56,20 L56,55" stroke={line} strokeWidth={sw * 0.8} />
        </>
      );
    case 'MUG':
      return (
        <>
          <Path d="M70,40 C86,40 86,64 70,64" fill="none" stroke={line} strokeWidth={sw * 2.4} strokeLinecap="round" />
          <Rect x="24" y="24" width="46" height="56" rx="6" fill={fill} stroke={line} strokeWidth={sw} />
        </>
      );
    case 'TOTE':
      return (
        <>
          <Path d="M37,34 C37,15 63,15 63,34" fill="none" stroke={line} strokeWidth={sw * 2} strokeLinecap="round" />
          <Path d="M27,32 L73,32 L78,88 L22,88 Z" fill={fill} stroke={line} strokeWidth={sw} strokeLinejoin="round" />
        </>
      );
    case 'POSTER':
      return (
        <>
          <Rect x="20" y="12" width="60" height="76" rx="2" fill={fill} stroke={line} strokeWidth={sw} />
          <Rect x="24" y="16" width="52" height="68" rx="1" fill="none" stroke={line} strokeWidth={sw * 0.6} />
        </>
      );
    case 'HOODIE':
      return (
        <>
          {/* hood */}
          <Path d="M33,14 C26,2 74,2 67,14 C60,20 40,20 33,14 Z" fill={fill} stroke={line} strokeWidth={sw} strokeLinejoin="round" />
          {/* body */}
          <Path d={TEE_FRONT} fill={fill} stroke={line} strokeWidth={sw} strokeLinejoin="round" />
          {/* pocket */}
          <Path d="M35,62 L65,62 L61,80 L39,80 Z" fill="none" stroke={line} strokeWidth={sw} strokeLinejoin="round" />
          {/* drawstrings */}
          <Path d="M44,18 L43,30 M56,18 L57,30" stroke={line} strokeWidth={sw} strokeLinecap="round" />
        </>
      );
    case 'TEE':
    default:
      return (
        <Path
          d={side === 'BACK' ? TEE_BACK : TEE_FRONT}
          fill={fill}
          stroke={line}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      );
  }
}
