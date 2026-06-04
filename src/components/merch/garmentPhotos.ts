// Real product MOCKUP images (clean studio shots) bundled in the app, each with
// a PRINT RECT defined in IMAGE space (0–1 fractions of the photo itself, not of
// any layout box). Consumers map it through the letterbox transform so the design
// lands correctly even though these portrait photos render inside square tiles.
//
// Source: src/assets/mockups/*.png

import { Image, type ImageSourcePropType } from 'react-native';

export type GarmentView = 'FRONT' | 'BACK' | 'LEFT' | 'RIGHT';

export type GarmentPhoto = {
  src: ImageSourcePropType;
  /** Print rect as fractions of the PHOTO (x,y = top-left, w,h = size). */
  print: { x: number; y: number; w: number; h: number };
  /** width/height of the photo, used to compute the contain-letterbox. */
  ratio: number;
};

// Print rects measured against each photo. Front/back of apparel share the same
// rect so the print sits identically on both sides.
const TEE = { x: 0.34, y: 0.30, w: 0.32, h: 0.30 };
const HOODIE = { x: 0.37, y: 0.34, w: 0.26, h: 0.20 };
const CAP = { x: 0.37, y: 0.25, w: 0.26, h: 0.15 };
const MUG = { x: 0.25, y: 0.37, w: 0.24, h: 0.24 }; // left mug's front face
const TOTE = { x: 0.31, y: 0.45, w: 0.38, h: 0.30 };
const POSTER = { x: 0.29, y: 0.075, w: 0.45, h: 0.61 }; // fills the white sheet

function ratioOf(src: ImageSourcePropType): number {
  const r = Image.resolveAssetSource(src as any);
  return r && r.height ? r.width / r.height : 0.777;
}

type ByView = Partial<Record<GarmentView, GarmentPhoto>>;

function photo(src: ImageSourcePropType, print: GarmentPhoto['print']): GarmentPhoto {
  return { src, print, ratio: ratioOf(src) };
}

const MOCKUPS: Record<string, ByView> = {
  TEE: {
    FRONT: photo(require('@/assets/mockups/tee-front.png'), TEE),
    BACK: photo(require('@/assets/mockups/tee-back.png'), TEE),
  },
  HOODIE: {
    FRONT: photo(require('@/assets/mockups/hoodie-front.png'), HOODIE),
    BACK: photo(require('@/assets/mockups/hoodie-back.png'), HOODIE),
  },
  CAP: { FRONT: photo(require('@/assets/mockups/cap-front.png'), CAP) },
  MUG: { FRONT: photo(require('@/assets/mockups/mug-front.png'), MUG) },
  TOTE: { FRONT: photo(require('@/assets/mockups/tote-front.png'), TOTE) },
  POSTER: { FRONT: photo(require('@/assets/mockups/poster-front.png'), POSTER) },
};

export function garmentPhotoFor(type: string, _color?: string, view: GarmentView = 'FRONT'): GarmentPhoto {
  const set = MOCKUPS[type] ?? MOCKUPS.TEE;
  return set[view] ?? set.FRONT ?? MOCKUPS.TEE.FRONT!;
}

export function viewsFor(type: string): GarmentView[] {
  const set = MOCKUPS[type] ?? MOCKUPS.TEE;
  return (['FRONT', 'BACK', 'LEFT', 'RIGHT'] as GarmentView[]).filter((v) => set[v]);
}

// Given the square box side `dim` and a photo, return the on-screen rect the
// CONTAIN-fitted photo actually occupies (letterboxed). Portrait photos are
// height-bound and centered horizontally; landscape would be width-bound.
export function containBox(dim: number, ratio: number) {
  let w = dim;
  let h = dim;
  if (ratio <= 1) {
    h = dim;
    w = dim * ratio;
  } else {
    w = dim;
    h = dim / ratio;
  }
  return { x: (dim - w) / 2, y: (dim - h) / 2, w, h };
}
