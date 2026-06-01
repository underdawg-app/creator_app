// Ensure a local image URI carries a scheme. The image / crop pickers can return
// a bare filesystem path (e.g. /var/mobile/.../tmp/x.jpg). React Native's <Image>
// (FastImage) tolerates that, but Skia's `Skia.Data.fromURI` — used by
// `useImage` — does NOT; it needs a real scheme (file:// / content:// / ph:// …)
// or it fails with "Could not load data". Normalising at the source keeps every
// consumer (Skia, FastImage, multipart upload) working.
export function asFileUri(uri: string): string {
  if (!uri) return uri;
  if (/^(https?|file|content|asset|ph|data):/.test(uri)) return uri;
  return `file://${uri}`;
}
