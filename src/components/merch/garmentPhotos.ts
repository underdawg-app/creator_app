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

// Print rects measured against each photo (image-space fractions).
// APPAREL: one shared chest frame used by BOTH tee and hoodie, FRONT and BACK,
// so placement is identical across all four.
const APPAREL = { x: 0.32, y: 0.30, w: 0.36, h: 0.34 };
// Pixel-detected front panel ~x0.25–0.72; print centered on it.
const CAP = { x: 0.35, y: 0.22, w: 0.30, h: 0.17 };
// Pixel-detected: left mug body spans x≈0.20–0.47 at mid-height; print sits on
// its flat front face, kept inside the curved edges.
const MUG = { x: 0.24, y: 0.36, w: 0.19, h: 0.22 };
const TOTE = { x: 0.31, y: 0.45, w: 0.38, h: 0.30 };
// Pixel-detected white sheet: x≈0.265–0.751, y≈0.064–0.821 → fill it.
const POSTER = { x: 0.265, y: 0.064, w: 0.486, h: 0.757 };

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
    FRONT: photo(require('@/assets/mockups/tee-front.png'), APPAREL),
    BACK: photo(require('@/assets/mockups/tee-back.png'), APPAREL),
  },
  HOODIE: {
    FRONT: photo(require('@/assets/mockups/hoodie-front.png'), APPAREL),
    BACK: photo(require('@/assets/mockups/hoodie-back.png'), APPAREL),
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
