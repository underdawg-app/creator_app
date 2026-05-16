/**
 * STUB: Google Sign-In is not currently configured. See ./firebase.ts for
 * details on what's required to re-enable the real implementation.
 */

export function configureGoogleSignIn(_webClientId: string) {
  // No-op.
}

export class GoogleSignInCancelled extends Error {
  constructor() {
    super('Google sign-in cancelled by user.');
    this.name = 'GoogleSignInCancelled';
  }
}

export async function signInWithGoogle() {
  throw new Error('Google Sign-In is not configured yet.');
}

export async function signOutGoogle() {
  // No-op.
}
