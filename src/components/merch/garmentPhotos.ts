// Real flat-lay garment PHOTOS per product type, in a light + dark base tone.
// Used by <RealProductMockup> so the storefront shows an actual product photo
// with the creator's design composited into the print area — not a vector SVG.
//
// Each photo carries its OWN normalized print rect (where a chest / center print
// realistically sits on THAT photo), so the design lands in the right spot.
//
// NOTE: these are stock flat-lay URLs as sensible defaults. When a product has a
// backend-generated `mockupUrl` (e.g. Printful), that always wins (see
// StorefrontPreview). Swap these for your own product photography any time.

export type GarmentPhoto = {
  uri: string;
  print: { x: number; y: number; w: number; h: number };
};

type ByTone = { light: GarmentPhoto; dark: GarmentPhoto };

const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

// Print rects are tuned to each photo's framing (chest-centered for apparel,
// face-centered for mug/tote/poster/cap).
const TEE_PRINT = { x: 0.34, y: 0.30, w: 0.32, h: 0.30 };
const HOOD_PRINT = { x: 0.36, y: 0.34, w: 0.28, h: 0.22 };
const MUG_PRINT = { x: 0.34, y: 0.36, w: 0.30, h: 0.30 };
const TOTE_PRINT = { x: 0.32, y: 0.40, w: 0.36, h: 0.34 };
const POSTER_PRINT = { x: 0.16, y: 0.12, w: 0.68, h: 0.74 };
const CAP_PRINT = { x: 0.38, y: 0.40, w: 0.26, h: 0.18 };

// PLAIN (no-print) flat-lay/product shots, so the creator's design is the ONLY
// graphic on the garment. Centered framing so the print rect lands on the chest /
// face of the product.
const PHOTOS: Record<string, ByTone> = {
  TEE: {
    // plain white & plain black tees, front-flat, no logo
    light: { uri: U('photo-1581655353564-df123a1eb820'), print: TEE_PRINT },
    dark: { uri: U('photo-1618354691373-d851c5c3a990'), print: TEE_PRINT },
  },
  HOODIE: {
    light: { uri: U('photo-1556172732-2a4f5f9b9c5f'), print: HOOD_PRINT },
    dark: { uri: U('photo-1542406775-ade58c52d2e4'), print: HOOD_PRINT },
  },
  MUG: {
    light: { uri: U('photo-1514228742587-6b1558fcca3d'), print: MUG_PRINT },
    dark: { uri: U('photo-1517256064527-09c73fc73e38'), print: MUG_PRINT },
  },
  TOTE: {
    light: { uri: U('photo-1591561954557-26941169b49e'), print: TOTE_PRINT },
    dark: { uri: U('photo-1597484661643-2f5fef640dd1'), print: TOTE_PRINT },
  },
  POSTER: {
    light: { uri: U('photo-1513519245088-0e12902e35ca'), print: POSTER_PRINT },
    dark: { uri: U('photo-1493612276216-ee3925520721'), print: POSTER_PRINT },
  },
  CAP: {
    light: { uri: U('photo-1521369909029-2afed882baee'), print: CAP_PRINT },
    dark: { uri: U('photo-1588850561407-ed78c282e89b'), print: CAP_PRINT },
  },
};

// Luminance of the chosen garment hex → pick the light or dark base photo so the
// real product roughly matches the color the creator selected.
function isLight(hex: string): boolean {
  const h = (hex || '').replace('#', '');
  if (h.length < 6) return true;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export function garmentPhotoFor(type: string, color: string): GarmentPhoto {
  const set = PHOTOS[type] ?? PHOTOS.TEE;
  return isLight(color) ? set.light : set.dark;
}
