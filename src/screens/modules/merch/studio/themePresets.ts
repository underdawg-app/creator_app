// Storefront builder presets — palettes, font pairings, product types, garment
// colors and design presets. These drive the LIVE STOREFRONT PREVIEW (a real
// rendered component), so they are independent of the app's own theme tokens:
// the storefront looks like whatever the creator picks, not like the builder
// chrome around it.

import { fonts } from '@/theme/typography';

export type StoreTheme = {
  key: string;
  name: string;
  bg: string; // page background
  surface: string; // card / product tile
  text: string; // primary text
  sub: string; // secondary text
  border: string; // hairlines
  accent: string; // brand / button
  accentText: string; // text on accent
};

// Curated, intentional palettes — no gradient slop. One accent each.
export const STORE_THEMES: StoreTheme[] = [
  {
    key: 'midnight',
    name: 'MIDNIGHT',
    bg: '#0A0A0A',
    surface: '#161616',
    text: '#F2EFE6',
    sub: '#9C988A',
    border: 'rgba(242,239,230,0.14)',
    accent: '#FCD34D',
    accentText: '#0A0A0A',
  },
  {
    key: 'bone',
    name: 'BONE',
    bg: '#F2EFE6',
    surface: '#FFFFFF',
    text: '#0A0A0A',
    sub: '#6B675C',
    border: 'rgba(10,10,10,0.12)',
    accent: '#0A0A0A',
    accentText: '#F2EFE6',
  },
  {
    key: 'sand',
    name: 'SAND',
    bg: '#E8E0D2',
    surface: '#F6F1E7',
    text: '#2A2620',
    sub: '#7A7464',
    border: 'rgba(42,38,32,0.14)',
    accent: '#C2502B',
    accentText: '#F6F1E7',
  },
  {
    key: 'ocean',
    name: 'OCEAN',
    bg: '#0C1B2A',
    surface: '#12283C',
    text: '#EAF2F8',
    sub: '#8AA6BC',
    border: 'rgba(234,242,248,0.14)',
    accent: '#46D8C8',
    accentText: '#06131F',
  },
  {
    key: 'bloom',
    name: 'BLOOM',
    bg: '#FBEFF2',
    surface: '#FFFFFF',
    text: '#2A1620',
    sub: '#8A6B76',
    border: 'rgba(42,22,32,0.12)',
    accent: '#FF6BB5',
    accentText: '#2A1620',
  },
  {
    key: 'mono',
    name: 'MONO',
    bg: '#FFFFFF',
    surface: '#F4F4F4',
    text: '#111111',
    sub: '#8A8A8A',
    border: 'rgba(17,17,17,0.12)',
    accent: '#2E5BFF',
    accentText: '#FFFFFF',
  },
];

export const getTheme = (key: string): StoreTheme =>
  STORE_THEMES.find((t) => t.key === key) ?? STORE_THEMES[0];

// Font pairings built only from the app's bundled families so the preview
// always renders. display = headlines, body = UI/text.
export type FontPair = {
  key: string;
  name: string;
  display: string;
  body: string;
};

export const FONT_PAIRS: FontPair[] = [
  { key: 'grotesk', name: 'GROTESK', display: fonts.displayBold, body: fonts.body },
  { key: 'anton', name: 'ANTON', display: fonts.display, body: fonts.body },
  { key: 'stack', name: 'HEAVY STACK', display: fonts.displayHeavy, body: fonts.bodyMedium },
  { key: 'editorial', name: 'EDITORIAL', display: fonts.editorialItalic, body: fonts.body },
  { key: 'plain', name: 'PLAIN', display: fonts.bodyBold, body: fonts.body },
];

export const getFontPair = (key: string): FontPair =>
  FONT_PAIRS.find((f) => f.key === key) ?? FONT_PAIRS[0];

// Product types for the catalog + AI mockup step.
export type ProductTypeDef = {
  key: string; // matches BuilderProduct.type
  label: string;
  icon: string; // Ionicons name
  baseCost: number;
};

export const STORE_PRODUCT_TYPES: ProductTypeDef[] = [
  { key: 'TEE', label: 'TEE', icon: 'shirt-outline', baseCost: 480 },
  { key: 'HOODIE', label: 'HOODIE', icon: 'shirt-outline', baseCost: 1100 },
  { key: 'MUG', label: 'MUG', icon: 'cafe-outline', baseCost: 240 },
  { key: 'TOTE', label: 'TOTE', icon: 'bag-handle-outline', baseCost: 320 },
  { key: 'POSTER', label: 'POSTER', icon: 'image-outline', baseCost: 180 },
  { key: 'CAP', label: 'CAP', icon: 'basketball-outline', baseCost: 380 },
];

export const getProductType = (key: string): ProductTypeDef =>
  STORE_PRODUCT_TYPES.find((p) => p.key === key) ?? STORE_PRODUCT_TYPES[0];

// Garment colors offered in the product / mockup steps.
export const GARMENT_COLORS: { key: string; label: string; hex: string }[] = [
  { key: 'black', label: 'BLACK', hex: '#0A0A0A' },
  { key: 'bone', label: 'BONE', hex: '#EDE7D8' },
  { key: 'white', label: 'WHITE', hex: '#FFFFFF' },
  { key: 'acid', label: 'ACID', hex: '#FCD34D' },
  { key: 'cobalt', label: 'COBALT', hex: '#2E5BFF' },
  { key: 'rust', label: 'RUST', hex: '#C2502B' },
];

// Design presets for the AI mockup step (when not prompting / uploading).
export const DESIGN_PRESETS: { key: string; label: string; swatch: string }[] = [
  { key: 'salt', label: 'SALT STUDY', swatch: '#2E5BFF' },
  { key: 'bone', label: 'BONE PAINT', swatch: '#FCD34D' },
  { key: 'lasttrain', label: 'LAST TRAIN', swatch: '#FF6BB5' },
  { key: 'afterwater', label: 'AFTER WATER', swatch: '#46D8C8' },
  { key: 'monogram', label: 'MONOGRAM', swatch: '#C2502B' },
];

// Banner style options for Step 3.
export const BANNER_STYLES: { key: 'GRADIENT' | 'SOLID' | 'PATTERN' | 'MINIMAL'; label: string }[] = [
  { key: 'GRADIENT', label: 'GRADIENT' },
  { key: 'SOLID', label: 'SOLID' },
  { key: 'PATTERN', label: 'PATTERN' },
  { key: 'MINIMAL', label: 'MINIMAL' },
];

// Monogram from a store name — up to two initials.
export const monogramOf = (name: string): string => {
  const clean = (name || '').trim();
  if (!clean) return 'UD';
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

// Handle auto-derived from a store name.
export const handleOf = (name: string): string =>
  (name || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export const storeUrlOf = (handle: string): string =>
  `underdawgstore.com/${handle || 'your-store'}`;
