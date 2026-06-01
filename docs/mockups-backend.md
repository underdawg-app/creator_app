# Mockup backend (Printful proxy)

The app generates photoreal product mockups by calling **your backend**, which
holds the Printful API key and drives Printful's async **Mockup Generator API**.
The key never ships in the app.

App config: set `MOCKUP_API_BASE` in `src/config/mockups.ts` to your backend URL.
Until it's set (still `example.com`), the app falls back to instant on-device
**vector** mockups, so the studio keeps working.

## Contract the app expects

The app (`src/services/mockupApi.ts`) calls three endpoints:

### 1. `POST /mockups/upload`  (multipart/form-data)
Field `file` = the design image. Host it somewhere Printful can fetch over HTTPS
(S3, Cloudinary, R2, your own static host).
```json
// 200 → { "url": "https://cdn.you/uploads/abc.png" }
```

### 2. `POST /mockups/create`  (application/json)
```json
{ "designUrl": "https://cdn.you/uploads/abc.png",
  "type": "TEE", "colorKeys": ["black","bone"], "placement": "FRONT" }
// 200 → { "taskKey": "<printful task key>" }
```
The backend maps `type` + `colorKeys` → a Printful **product id** + **variant
ids**, and `placement` → a Printful **placement** ("front"/"back"/…), then calls
Printful create-task.

### 3. `GET /mockups/task?key=<taskKey>`
```json
// pending  → { "status": "pending" }
// done     → { "status": "completed",
//              "mockups": [ { "type":"TEE", "colorKey":"black",
//                             "url":"https://printful.../mockup.png" } ] }
// error    → { "status": "failed", "error": "…" }
```
Flatten Printful's `mockups[].variant_ids` back to your `colorKey` here.

## Printful endpoints used (server-side, `Authorization: Bearer <PRINTFUL_KEY>`)

- `POST https://api.printful.com/mockup-generator/create-task/{product_id}`
  body: `{ variant_ids, format:"png", files:[{ placement, image_url:<designUrl> }] }`
  → returns `result.task_key`.
- `GET https://api.printful.com/mockup-generator/task?task_key=...`
  → `result.status` (`pending`|`completed`|`failed`), `result.mockups[]` with
  `variant_ids` + `mockup_url`.
- One-time, to build the mapping: `GET /products` and `GET /products/{id}` for
  variant ids; `GET /mockup-generator/printfiles/{product_id}` for valid
  placements. Hard-code a small map for the few products/colours you offer.

## Minimal Express reference

```js
import express from 'express';
import multer from 'multer';
const upload = multer({ storage: /* your S3/Cloudinary adapter */ });
const app = express();
app.use(express.json());
const PF = 'https://api.printful.com';
const H = { Authorization: `Bearer ${process.env.PRINTFUL_KEY}`, 'Content-Type': 'application/json' };

// type+color → Printful ids (fill from /products). Example: Bella+Canvas 3001.
const MAP = {
  TEE: { product_id: 71, variants: { black: 4012, bone: 4013, white: 4011 } },
  // HOODIE: {...}, CAP: {...}, ...
};
const PLACEMENT = { FRONT: 'front', BACK: 'back', LEFT: 'left_chest', RIGHT: 'right_chest' };

app.post('/mockups/upload', upload.single('file'), (req, res) =>
  res.json({ url: req.file.location })); // public https url

app.post('/mockups/create', async (req, res) => {
  const { designUrl, type, colorKeys, placement } = req.body;
  const m = MAP[type]; if (!m) return res.status(400).json({ error: 'unsupported type' });
  const variant_ids = colorKeys.map((k) => m.variants[k]).filter(Boolean);
  const r = await fetch(`${PF}/mockup-generator/create-task/${m.product_id}`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ variant_ids, format: 'png',
      files: [{ placement: PLACEMENT[placement] || 'front', image_url: designUrl }] }),
  }).then((x) => x.json());
  res.json({ taskKey: r.result.task_key });
});

app.get('/mockups/task', async (req, res) => {
  const r = await fetch(`${PF}/mockup-generator/task?task_key=${req.query.key}`, { headers: H })
    .then((x) => x.json());
  const s = r.result.status;
  if (s !== 'completed') return res.json({ status: s, error: r.result.error });
  // reverse-map variant_ids → colorKey using MAP
  const rev = {}; for (const [t, v] of Object.entries(MAP))
    for (const [ck, id] of Object.entries(v.variants)) rev[id] = { type: t, colorKey: ck };
  const mockups = r.result.mockups.flatMap((mk) =>
    mk.variant_ids.map((id) => rev[id] && ({ ...rev[id], url: mk.mockup_url })).filter(Boolean));
  res.json({ status: 'completed', mockups });
});

app.listen(8080);
```

Notes: Printful tasks usually finish in a few seconds (the app polls ~24×1.5s).
Cache rendered URLs by (designUrl, product, variant, placement) to avoid
re-billing identical renders. Free Printful accounts include the mockup generator.
