// Base URL of YOUR backend that proxies the Printful Mockup Generator API.
// The Printful API key lives ONLY on the backend — it must never ship in the app.
// The app calls a small, stable contract (see docs/mockups-backend.md); the
// backend maps our product types/colors → Printful product + variant ids and
// drives Printful's async mockup task.
//
// Replace this with your deployed backend, e.g. 'https://api.yourdomain.com'.
// While it points at example.com the app falls back to instant vector previews.
export const MOCKUP_API_BASE = 'https://your-backend.example.com';
