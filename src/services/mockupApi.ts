// mockupApi — talks to YOUR backend, which holds the Printful API key and proxies
// the Printful Mockup Generator API to produce photoreal product mockups of the
// creator's uploaded design. See docs/mockups-backend.md for the backend contract.
//
// Flow: uploadDesign (local file → public URL) → createTask → poll until the
// render completes → photoreal mockup image URLs.

import { MOCKUP_API_BASE } from '@/config/mockups';
import { asFileUri } from '@/utils/uri';

export type GenerateMockupsInput = {
  designUri: string; // local gallery file uri (from the crop picker)
  type: string; // our product-type key (TEE / HOODIE / MUG / …)
  colorKeys: string[]; // our garment-color keys (black / bone / …)
  placement: string; // FRONT / BACK / LEFT / RIGHT
};

export type MockupImage = {
  type: string;
  colorKey: string;
  url: string; // photoreal mockup image
};

export function isMockupApiConfigured(): boolean {
  return /^https?:\/\//.test(MOCKUP_API_BASE) && !MOCKUP_API_BASE.includes('example.com');
}

const delay = (ms: number) => new Promise<void>((resolve) => { setTimeout(resolve, ms); });

async function uploadDesign(uri: string): Promise<string> {
  const form = new FormData();
  form.append('file', { uri: asFileUri(uri), name: 'design.png', type: 'image/png' } as any);
  const res = await fetch(`${MOCKUP_API_BASE}/mockups/upload`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`upload failed (${res.status})`);
  const json = await res.json();
  if (!json?.url) throw new Error('upload returned no url');
  return json.url as string;
}

async function createTask(body: Record<string, unknown>): Promise<string> {
  const res = await fetch(`${MOCKUP_API_BASE}/mockups/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`create failed (${res.status})`);
  const json = await res.json();
  if (!json?.taskKey) throw new Error('create returned no taskKey');
  return json.taskKey as string;
}

async function pollTask(taskKey: string, tries = 24, intervalMs = 1500): Promise<MockupImage[]> {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(`${MOCKUP_API_BASE}/mockups/task?key=${encodeURIComponent(taskKey)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.status === 'completed') return (json.mockups ?? []) as MockupImage[];
      if (json.status === 'failed') throw new Error(json.error || 'render failed');
    }
    await delay(intervalMs);
  }
  throw new Error('render timed out');
}

// Upload once, then render this product type across the chosen colours.
export async function generateMockups(input: GenerateMockupsInput): Promise<MockupImage[]> {
  const designUrl = await uploadDesign(input.designUri);
  const taskKey = await createTask({
    designUrl,
    type: input.type,
    colorKeys: input.colorKeys,
    placement: input.placement,
  });
  return pollTask(taskKey);
}

// Render across MANY product types: upload the design once per type, in parallel.
// (The backend caches the upload by content; or accepts a designUrl to skip it.)
export async function generateMockupsForTypes(
  base: Omit<GenerateMockupsInput, 'type'>,
  types: string[],
): Promise<MockupImage[]> {
  const batches = await Promise.allSettled(
    types.map((type) => generateMockups({ ...base, type })),
  );
  const out: MockupImage[] = [];
  for (const b of batches) if (b.status === 'fulfilled') out.push(...b.value);
  return out;
}
