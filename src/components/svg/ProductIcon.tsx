import React from 'react';
import { Ionicons } from '@/icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const PRODUCT_ICON: Record<string, IconName> = {
  'T-SHIRT': 'shirt',
  HOODIE: 'shirt-outline',
  MUG: 'cafe',
  CAP: 'baseball-outline',
  'TOTE BAG': 'bag-handle',
  POSTER: 'image',
  'STICKER PACK': 'pricetag',
  'PHONE CASE': 'phone-portrait',
};

type Props = {
  type: string;
  size?: number;
  color: string;
};

/**
 * Editorial product silhouette. Maps a Product.type label (e.g. "T-SHIRT")
 * to a clean Ionicon glyph used inside merch / store cards in place of the
 * old animated blob.
 */
export function ProductIcon({ type, size = 56, color }: Props) {
  const name = PRODUCT_ICON[type.toUpperCase()] ?? 'cube';
  return <Ionicons name={name} size={size} color={color} />;
}
