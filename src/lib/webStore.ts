// Builds the shareable WEB-STORE link for a creator's store.
//
// The whole store is encoded INTO the link (#d=<url-encoded JSON>), so the one
// hosted web page (web-store/index.html) can render any creator's store with no
// backend. Mirrors the web page's `STORE` schema + `#d=` decoder.
//
// ── After you host web-store/ (e.g. drag the folder onto netlify.com/drop),
//    set WEB_STORE_BASE to that URL. Until then the link is well-formed but
//    points at this placeholder host.
import type { StoreBuilder } from '@/store';

export const WEB_STORE_BASE = 'https://ud-store-eight.vercel.app/';

// Pretty, human-facing label (not the functional link — that's the encoded one).
export const prettyStoreUrl = (handle: string): string =>
  `underdawgstore.com/${handle || 'your-store'}`;

// Map the app's storeBuilder onto the web page's STORE shape.
function toWebStore(b: StoreBuilder) {
  const name = (b.name || 'YOUR STORE').trim();
  const words = name.replace(/[._]/g, ' ').split(/\s+/).filter(Boolean);
  const banner = (b.banners && b.banners[0]) || ({} as any);

  const headline = (banner.headline || name).toUpperCase();
  const hw = headline.split(/\s+/);
  const heroA = hw[0] || name.toUpperCase();
  const heroB = hw.slice(1).join(' ') || (words[1] || '').toUpperCase();

  const marquee = [
    ...(b.banners || []).map((x) => (x.headline || '').toUpperCase()).filter(Boolean),
    'SHIPS WORLDWIDE',
    'SMALL BATCHES',
  ].slice(0, 6);

  const storyWords = (b.storyTitle || 'THE STORY').split(/\s+/);

  return {
    name,
    handle: b.handle || '',
    tagline: b.tagline || '',
    themeKey: b.themeKey || 'midnight',
    fontKey: b.fontKey || 'grotesk',
    heroA,
    heroB,
    lede: banner.subtext || b.storyBody || b.tagline || '',
    ctaLabel: (banner.buttonLabel || 'SHOP THE DROP').toUpperCase(),
    marquee,
    products: (b.products || []).map((p) => ({
      name: p.name,
      type: p.type,
      color: p.color,
      price: p.price,
    })),
    storyA: storyWords.slice(0, -1).join(' ') || (b.storyTitle || 'THE STORY'),
    storyEm: storyWords.length > 1 ? storyWords[storyWords.length - 1] : '',
    storyBody: b.storyBody || '',
    footerLinks: b.footerLinks || [],
    footerNote: b.footerNote || '',
    showStory: b.showStory !== false,
    showMarquee: true,
  };
}

/** The functional shareable link — opens the web store rendered with this store. */
export function webStoreLink(b: StoreBuilder): string {
  const data = encodeURIComponent(JSON.stringify(toWebStore(b)));
  return `${WEB_STORE_BASE}#d=${data}`;
}
