// Gallery picker WITH cropping for the store-builder studio. Each call crops to
// the aspect ratio of the slot it fills (logo = square, header = wide strip,
// banner = hero) so uploads always sit right in the layout. Returns the cropped
// image URI, or null if the user cancelled / something failed.

import ImageCropPicker from 'react-native-image-crop-picker';
import { asFileUri } from '@/utils/uri';

export type CropShape = 'logo' | 'header' | 'banner' | 'design';

// Target crop dimensions per slot (px). Ratio is what matters; the size sets a
// sensible max resolution.
const CROP_DIMS: Record<CropShape, { width: number; height: number }> = {
  logo: { width: 800, height: 800 }, // 1:1
  header: { width: 1200, height: 420 }, // ~20:7 header strip
  banner: { width: 1200, height: 760 }, // ~8:5 hero
  design: { width: 1000, height: 1000 }, // 1:1 artwork (free-crop allowed)
};

const TITLES: Record<CropShape, string> = {
  logo: 'Crop logo',
  header: 'Crop header',
  banner: 'Crop banner',
  design: 'Crop design',
};

export async function pickImage(shape: CropShape): Promise<string | null> {
  try {
    const { width, height } = CROP_DIMS[shape];
    const img = await ImageCropPicker.openPicker({
      width,
      height,
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.9,
      forceJpg: true,
      cropperToolbarTitle: TITLES[shape],
      cropperCircleOverlay: false,
      // Let users free-crop artwork; keep fixed ratios for layout slots.
      freeStyleCropEnabled: shape === 'design',
    });
    // Single-image openPicker returns one Image with a usable `path`. Normalise
    // to a real file:// URI so Skia's useImage (and uploads) can load it.
    const path = Array.isArray(img) ? img[0]?.path : img?.path;
    return path ? asFileUri(path) : null;
  } catch {
    // openPicker rejects on cancel (E_PICKER_CANCELLED) / permission denial.
    return null;
  }
}
