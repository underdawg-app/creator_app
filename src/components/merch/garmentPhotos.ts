// Real product MOCKUP images (clean studio shots, white bg) bundled in the app,
// with a per-image PRINT RECT (normalized 0–1) tuned to where a print realistically
// sits on THAT photo. Used by RealProductMockup (storefront) and PrintPlacer
// (design editor) so the creator sees their design on the actual product.
//
// Source: src/assets/mockups/*.png (front/back where provided).
// Apparel mockups are black; color tinting a photo isn't reliable, so all colors
// map to the provided shot for now. Drop more files + entries to extend.

import type { ImageSourcePropType } from 'react-native';

export type GarmentView = 'FRONT' | 'BACK' | 'LEFT' | 'RIGHT';

export type GarmentPhoto = {
  src: ImageSourcePropType;
  print: { x: number; y: number; w: number; h: number };
};

// Per-photo print rects, tuned to each bundled mockup.
const Z = {
  teeFront: { x: 0.34, y: 0.32, w: 0.32, h: 0.30 },
  teeBack: { x: 0.30, y: 0.26, w: 0.40, h: 0.42 },
  hoodieFront: { x: 0.37, y: 0.33, w: 0.26, h: 0.20 },
  hoodieBack: { x: 0.32, y: 0.28, w: 0.36, h: 0.40 },
  capFront: { x: 0.36, y: 0.33, w: 0.28, h: 0.18 },
  mugFront: { x: 0.34, y: 0.42, w: 0.34, h: 0.26 },
  toteFront: { x: 0.30, y: 0.42, w: 0.40, h: 0.32 },
  posterFront: { x: 0.31, y: 0.11, w: 0.32, h: 0.45 },
} as const;

type ByView = Partial<Record<GarmentView, GarmentPhoto>>;

const MOCKUPS: Record<string, ByView> = {
  TEE: {
    FRONT: { src: require('@/assets/mockups/tee-front.png'), print: Z.teeFront },
    BACK: { src: require('@/assets/mockups/tee-back.png'), print: Z.teeBack },
  },
  HOODIE: {
    FRONT: { src: require('@/assets/mockups/hoodie-front.png'), print: Z.hoodieFront },
    BACK: { src: require('@/assets/mockups/hoodie-back.png'), print: Z.hoodieBack },
  },
  CAP: {
    FRONT: { src: require('@/assets/mockups/cap-front.png'), print: Z.capFront },
  },
  MUG: {
    FRONT: { src: require('@/assets/mockups/mug-front.png'), print: Z.mugFront },
  },
  TOTE: {
    FRONT: { src: require('@/assets/mockups/tote-front.png'), print: Z.toteFront },
  },
  POSTER: {
    FRONT: { src: require('@/assets/mockups/poster-front.png'), print: Z.posterFront },
  },
};

// Resolve a product type + view to a bundled mockup, falling back to FRONT, then
// to the tee front so a caller always gets a valid image.
export function garmentPhotoFor(type: string, _color?: string, view: GarmentView = 'FRONT'): GarmentPhoto {
  const set = MOCKUPS[type] ?? MOCKUPS.TEE;
  return set[view] ?? set.FRONT ?? MOCKUPS.TEE.FRONT!;
}

// Which views actually exist for a type (for view switchers).
export function viewsFor(type: string): GarmentView[] {
  const set = MOCKUPS[type] ?? MOCKUPS.TEE;
  return (['FRONT', 'BACK', 'LEFT', 'RIGHT'] as GarmentView[]).filter((v) => set[v]);
}
