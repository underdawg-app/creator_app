// Merch entry — the store-builder studio. Tapping "Merch" lands here.
// Before the store is built it shows the branded welcome; once built it shows
// the review dashboard (where the creator can preview, quick-edit any step, and
// re-publish). The wizard steps live in their own routed screens.

import React from 'react';
import { useStore } from '@/store';
import MerchStudioWelcome from './MerchStudioWelcome';
import MerchStudioReview from './MerchStudioReview';

export default function MerchStudio() {
  const built = useStore((s) => s.storeBuilder.built);
  return built ? <MerchStudioReview /> : <MerchStudioWelcome />;
}
