import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Animated, PixelRatio, Platform, StyleSheet, View, ImageSourcePropType } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import FastImage, { FastImageProps, ResizeMode } from '@d11/react-native-fast-image';
import { Blurhash } from 'react-native-blurhash';

const IS_ANDROID = Platform.OS === 'android';
const PX_RATIO = PixelRatio.get();

type ContentFit = 'cover' | 'contain' | 'fill' | 'none';
type Source = ImageSourcePropType | { uri: string } | number;
type CachePolicy = 'none' | 'memory' | 'disk' | 'memory-disk';

type Props = {
  source: Source;
  style?: StyleProp<ViewStyle>;
  contentFit?: ContentFit;
  transition?: number;
  placeholder?: { blurhash?: string } | string | null;
  cachePolicy?: CachePolicy;
  priority?: 'low' | 'normal' | 'high';
  /**
   * Display width in DP. Used to rewrite remote-image URLs (Unsplash) to
   * download an appropriately-sized asset instead of the full ~1200px source
   * — a 1200×1200 JPEG decoded to a bitmap is ~5.7 MB of memory; a list of 20
   * such images can swamp Android's image cache and force constant evict +
   * redecode, which reads as scroll jitter. Always pass this for thumbnails,
   * avatars, and grid tiles.
   */
  targetWidth?: number;
  onLoad?: () => void;
};

const fitToResize: Record<ContentFit, ResizeMode> = {
  cover: FastImage.resizeMode.cover,
  contain: FastImage.resizeMode.contain,
  fill: FastImage.resizeMode.stretch,
  none: FastImage.resizeMode.center,
};

const cacheToFastImage: Record<CachePolicy, FastImageProps['source'] extends infer S ? S extends { cache?: infer C } ? C : never : never> = {
  // FastImage caches both to memory + disk by default. `immutable` tells the
  // native layer the URL never changes, which lets it skip a HEAD request and
  // reuse the cached file forever — the right policy for ~all of our remote
  // images.
  none: FastImage.cacheControl.web,
  memory: FastImage.cacheControl.cacheOnly,
  disk: FastImage.cacheControl.immutable,
  'memory-disk': FastImage.cacheControl.immutable,
};

const priorityToFastImage = {
  low: FastImage.priority.low,
  normal: FastImage.priority.normal,
  high: FastImage.priority.high,
};

/**
 * Snap target widths to a small ladder so cache hits dedupe across components
 * that ask for nearly-the-same size (e.g. 38px and 42px avatars). Without
 * snapping, every slightly-different size becomes a separate cache key.
 */
const SIZE_LADDER = [80, 120, 180, 240, 360, 480, 640, 720, 960, 1200];
function snapToLadder(px: number): number {
  for (const step of SIZE_LADDER) {
    if (px <= step) return step;
  }
  return SIZE_LADDER[SIZE_LADDER.length - 1];
}

/**
 * Rewrite a remote URL to request the right resolution. Currently handles
 * Unsplash (`?w=…&q=…`); other hosts pass through untouched. Quality stays at
 * the source value (typically q=80) so we trade pixel count for bytes, never
 * compression artifacts.
 */
export function rewriteRemoteUrl(uri: string, displayWidthDp?: number): string {
  if (!displayWidthDp || displayWidthDp <= 0) return uri;
  if (!uri.includes('images.unsplash.com')) return uri;

  // Pixel-density aware: a 100dp avatar on a 3x device wants a 300px source.
  // Snap up to the ladder so caches stay shared across components.
  const targetPx = snapToLadder(Math.ceil(displayWidthDp * PX_RATIO));

  // Replace existing w=… or insert one. Strip h=… so cropping happens
  // server-side off the new w. Keep q intact to preserve visible quality.
  let next = uri;
  if (/[?&]w=\d+/i.test(next)) {
    next = next.replace(/([?&])w=\d+/gi, `$1w=${targetPx}`);
  } else {
    next += (next.includes('?') ? '&' : '?') + `w=${targetPx}`;
  }
  next = next.replace(/([?&])h=\d+/gi, '$1');
  // Tidy up "?&" or trailing "&" that the strip might leave behind.
  next = next.replace(/\?&/, '?').replace(/&&+/g, '&').replace(/[?&]$/, '');
  return next;
}

function normaliseSource(
  s: Source,
  cachePolicy: CachePolicy,
  priority: 'low' | 'normal' | 'high',
  targetWidth?: number,
): FastImageProps['source'] {
  if (typeof s === 'number') return s as FastImageProps['source'];
  if (s && typeof s === 'object' && 'uri' in s && s.uri) {
    return {
      uri: rewriteRemoteUrl(s.uri, targetWidth),
      cache: cacheToFastImage[cachePolicy],
      priority: priorityToFastImage[priority],
    } as FastImageProps['source'];
  }
  return s as FastImageProps['source'];
}

function extractBlurhash(p: Props['placeholder']): string | null {
  if (!p) return null;
  if (typeof p === 'string') return p;
  if (typeof p === 'object' && 'blurhash' in p && p.blurhash) return p.blurhash;
  return null;
}

function ImageInner({
  source,
  style,
  contentFit = 'cover',
  transition,
  placeholder,
  cachePolicy = 'memory-disk',
  priority = 'normal',
  targetWidth,
  onLoad,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  // Disable the per-image Animated.timing fade on Android. On a list of
  // images, every load triggers a JS-driven Animated transition that lands on
  // the same frame as the next render — that's the dominant scroll stutter on
  // mid-range Android. Cached images already pop in instantly; the fade was
  // only ever an iOS niceity.
  const fadeMs = IS_ANDROID ? 0 : transition ?? 0;
  const opacity = useRef(new Animated.Value(fadeMs > 0 ? 0 : 1)).current;
  const blurhash = extractBlurhash(placeholder);

  const handleLoad = useCallback(() => {
    if (fadeMs > 0) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: fadeMs,
        useNativeDriver: true,
      }).start();
    } else {
      opacity.setValue(1);
    }
    setLoaded(true);
    onLoad?.();
  }, [fadeMs, onLoad, opacity]);

  const fastSource = useMemo(
    () => normaliseSource(source, cachePolicy, priority, targetWidth),
    [source, cachePolicy, priority, targetWidth],
  );

  return (
    <View style={[style, styles.clip]} pointerEvents="none">
      {blurhash && !loaded ? (
        <Blurhash
          blurhash={blurhash}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      ) : null}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <FastImage
          source={fastSource}
          style={StyleSheet.absoluteFill}
          resizeMode={fitToResize[contentFit] || FastImage.resizeMode.cover}
          onLoad={handleLoad}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
});

// Memo on stable props — re-rendering an image because the parent re-rendered
// is the most common Android scroll jank trigger we saw in the audit.
export const Image = React.memo(ImageInner);

export default Image;

/**
 * Pre-warm the FastImage memory + disk cache for a list of URIs. Call once
 * after splash hide so the first batch of images on Feed is already in
 * memory by the time the user lands there. Each entry can specify its own
 * targetWidth so we prefetch the right resolution.
 */
export function prefetchImages(
  entries: Array<{ uri: string; targetWidth?: number; priority?: 'low' | 'normal' | 'high' }>,
): void {
  if (!entries || entries.length === 0) return;
  try {
    FastImage.preload(
      entries.map((e) => ({
        uri: rewriteRemoteUrl(e.uri, e.targetWidth),
        priority: priorityToFastImage[e.priority ?? 'normal'],
        cache: FastImage.cacheControl.immutable,
      })),
    );
  } catch {
    // FastImage.preload throws if called before the native module is ready
    // — silent fail is fine here, the next render path will load the image
    // through the normal flow.
  }
}
