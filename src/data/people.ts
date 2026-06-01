// People directory derived from the feed. The app has no separate user table,
// so we build one from `feedPosts` (which carries creator / handle / avatar /
// location / rep per author) and expose lookups + a canonical profile route.

import { feedPosts } from './mock';

export type Person = {
  handle: string;
  name: string;
  avatar?: string;
  category?: string;
  location?: string;
  color: string;
  rep?: number;
  rising?: boolean;
  posts: typeof feedPosts;
};

// Normalize a handle so '@sola' and 'sola' resolve to the same person.
function norm(handle: string): string {
  return handle.trim().replace(/^@/, '').toLowerCase();
}

const byHandle: Record<string, Person> = {};
for (const p of feedPosts) {
  const key = norm(p.handle);
  if (!byHandle[key]) {
    byHandle[key] = {
      handle: p.handle,
      name: p.creator,
      avatar: p.avatar,
      category: p.category,
      location: p.location,
      color: p.color,
      rep: p.rep,
      rising: p.rising,
      posts: [],
    };
  }
  byHandle[key].posts.push(p);
}

export const people: Person[] = Object.values(byHandle);

export function personByHandle(handle?: string): Person | undefined {
  if (!handle) return undefined;
  return byHandle[norm(handle)];
}

// Canonical route to a creator's profile. Handle is encoded without the '@'.
export function profileHref(handle: string): string {
  return `/(modules)/profile/u/${encodeURIComponent(norm(handle))}`;
}
