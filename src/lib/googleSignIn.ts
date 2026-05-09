/**
 * Wraps @react-native-google-signin so the Auth screen doesn't have to
 * know about its API surface.
 *
 * `configure()` must be called once at app start with the OAuth web client
 * ID from the Firebase console (Authentication → Sign-in method → Google →
 * Web SDK configuration → Web client ID). Without it, signIn() throws
 * "DEVELOPER_ERROR" on Android.
 */

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { signInWithGoogleIdToken } from './firebase';

let configured = false;

/**
 * Idempotent configure. Call once from App.tsx (or AuthContext) at startup.
 * The webClientId is the OAuth 2.0 client ID for "Web client" — NOT the
 * iOS / Android client IDs. Pulled from your Firebase project's
 * google-services.json `oauth_client[client_type=3].client_id`.
 */
export function configureGoogleSignIn(webClientId: string) {
  if (configured) return;
  GoogleSignin.configure({
    webClientId,
    offlineAccess: false,
  });
  configured = true;
}

export class GoogleSignInCancelled extends Error {
  constructor() {
    super('Google sign-in cancelled by user.');
    this.name = 'GoogleSignInCancelled';
  }
}

/**
 * Run the native Google sheet, then exchange the idToken with Firebase for
 * a real user. Throws GoogleSignInCancelled if the user dismisses the
 * sheet, or a generic Error for everything else.
 */
export async function signInWithGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  try {
    const result = await GoogleSignin.signIn();
    // Newer versions of the lib return `{ type: 'success', data: { idToken } }`
    // — older versions return `{ idToken, ... }` directly. Handle both.
    const idToken =
      (result as any)?.data?.idToken ?? (result as any)?.idToken ?? null;
    if (!idToken) throw new Error('Google did not return an idToken.');
    return signInWithGoogleIdToken(idToken);
  } catch (err: any) {
    if (
      err?.code === statusCodes.SIGN_IN_CANCELLED ||
      err?.code === 'SIGN_IN_CANCELLED'
    ) {
      throw new GoogleSignInCancelled();
    }
    throw err;
  }
}

export async function signOutGoogle() {
  try {
    await GoogleSignin.signOut();
  } catch {
    // No-op: silent if user wasn't signed in.
  }
}
