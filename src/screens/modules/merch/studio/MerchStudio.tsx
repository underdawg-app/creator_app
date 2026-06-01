// Merch entry — the store-builder studio. Tapping "Merch" lands here.
// Before the store is built it shows the branded welcome; once built it shows
// the review dashboard (where the creator can preview, quick-edit any step, and
// re-publish). The wizard steps live in their own routed screens.

import React from 'react';
import { useStore } from '@/store';
import MerchStudioWelcome from './MerchStudioWelcome';
import MerchStudioReview from './MerchStudioReview';

export default function MerchStudio() {
  // Gate on `published` (a deliberate action), NOT the sticky `built` flag.
  // `built` was auto-set on Review mount and persisted in AsyncStorage, which
  // trapped users on the one-page review and hid the welcome → wizard flow.
  const published = useStore((s) => s.storeBuilder.published);
  return published ? <MerchStudioReview /> : <MerchStudioWelcome />;
}
