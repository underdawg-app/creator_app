// Real product MOCKUP images (clean studio shots) bundled in the app, each with
// a PRINT RECT defined in IMAGE space (0–1 fractions of the photo itself, not of
// any layout box). Consumers map it through the letterbox transform so the design
// lands correctly even though these portrait photos render inside square tiles.
//
// Source: src/assets/mockups/*.png

import { Image, type ImageSourcePropType } from 'react-native';

export type GarmentView = 'FRONT' | 'BACK' | 'LEFT' | 'RIGHT';

export type Rect = { x: number; y: number; w: number; h: number };

export type GarmentPhoto = {
  src: ImageSourcePropType;
  /** Print rect as fractions of the PHOTO (x,y = top-left, w,h = size). */
  print: Rect;
  /** width/height of the photo, used to compute the contain-letterbox. */
  ratio: number;
  /**
   * Optional product bounding box (fractions of the PHOTO) used to ZOOM the
   * photo so the product fills its frame, trimming dead whitespace. When unset,
   * the whole photo is shown (contain). The print rect is in PHOTO space, so it
   * keeps landing correctly whether or not a crop is applied.
   */
  crop?: Rect;
};

// Print rects measured against each photo (image-space fractions).
// APPAREL: one shared chest frame used by BOTH tee and hoodie, FRONT and BACK,
// so placement is identical across all four.
const APPAREL = { x: 0.32, y: 0.30, w: 0.36, h: 0.34 };
// Front panel sits in the lower-center crown, just above the brim (the upper
// crown near the seams is too high — a logo there floats off the cap).
const CAP = { x: 0.37, y: 0.34, w: 0.26, h: 0.16 };
// Left mug body: print on its flat front face, centred LOW on the body (well
// below the rim and inside the curved edges).
const MUG = { x: 0.23, y: 0.48, w: 0.20, h: 0.22 };

// Product bounding boxes (PHOTO fractions) — zoom these to fill the placement
// frame so there's no dead space. CAP: trim the empty bottom below the brim.
// MUG: focus the printable left mug, trimming the empty top/bottom band.
const CAP_CROP = { x: 0.05, y: 0.06, w: 0.9, h: 0.78 };
const MUG_CROP = { x: 0.02, y: 0.36, w: 0.52, h: 0.5 };
const TOTE = { x: 0.31, y: 0.45, w: 0.38, h: 0.30 };
// Pixel-detected white sheet: x≈0.265–0.751, y≈0.064–0.821 → fill it.
const POSTER = { x: 0.265, y: 0.064, w: 0.486, h: 0.757 };

function ratioOf(src: ImageSourcePropType): number {
  const r = Image.resolveAssetSource(src as any);
  return r && r.height ? r.width / r.height : 0.777;
}

type ByView = Partial<Record<GarmentView, GarmentPhoto>>;

function photo(src: ImageSourcePropType, print: GarmentPhoto['print'], crop?: Rect): GarmentPhoto {
  return { src, print, ratio: ratioOf(src), crop };
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
  CAP: { FRONT: photo(require('@/assets/mockups/cap-front.png'), CAP, CAP_CROP) },
  MUG: { FRONT: photo(require('@/assets/mockups/mug-front.png'), MUG, MUG_CROP) },
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

// On-screen rect of the FULL photo inside a square `dim`, such that the photo's
// `crop` box (product bounds) is contain-fitted to fill the frame. With no crop
// this is identical to containBox. The photo keeps its natural aspect (the rect
// w:h always equals `ratio`), so render the <Image> at this rect with the frame
// clipping the overflow. Map a PHOTO-space rect with: x=fx+r.x*fw, y=fy+r.y*fh,
// w=r.w*fw, h=r.h*fh.
export function photoLayout(dim: number, photo: GarmentPhoto) {
  const ratio = photo.ratio || 0.777;
  const crop = photo.crop ?? { x: 0, y: 0, w: 1, h: 1 };
  const cropAspect = ratio * (crop.w / crop.h);
  let dispW = dim;
  let dispH = dim;
  if (cropAspect <= 1) dispW = dim * cropAspect;
  else dispH = dim / cropAspect;
  const dispX = (dim - dispW) / 2;
  const dispY = (dim - dispH) / 2;
  const fw = dispW / crop.w;
  const fh = dispH / crop.h;
  return { fx: dispX - crop.x * fw, fy: dispY - crop.y * fh, fw, fh };
}
