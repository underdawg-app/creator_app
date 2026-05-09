/**
 * Thin wrapper over @react-native-firebase/auth.
 *
 * The native Firebase SDK is auto-initialized from GoogleService-Info.plist
 * (iOS) and google-services.json (Android), so there's no `initializeApp`
 * call here — the app must drop those config files into the platform
 * folders before this module can be used at runtime.
 *
 * Everything we need from `auth` is re-exported via `getAuth()` so callers
 * don't import the firebase namespace directly.
 */

import authModule, {
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

export type FirebaseUser = FirebaseAuthTypes.User;
export type PhoneAuthSnapshot = FirebaseAuthTypes.PhoneAuthSnapshot;
export type ConfirmationResult = FirebaseAuthTypes.ConfirmationResult;

export const getAuth = () => authModule();

/**
 * Subscribe to auth state changes. Fires once with the current user (or
 * null) and again on every sign-in / sign-out.
 */
export const onAuthChanged = (cb: (user: FirebaseUser | null) => void) =>
  authModule().onAuthStateChanged(cb);

/**
 * Send the SMS code. Returns a confirmation handle that the OTP screen uses
 * to verify the entered code.
 */
export const sendPhoneCode = (e164Phone: string) =>
  authModule().signInWithPhoneNumber(e164Phone);

/**
 * Sign the user out of Firebase. Safe to call even when there's no current
 * user (resolves immediately).
 */
export const signOut = () => authModule().signOut();

/**
 * Build a Google credential from an idToken (returned by GoogleSignin) and
 * exchange it for a Firebase user. The credential is one-shot — re-call
 * GoogleSignin.signIn() to get a fresh idToken next time.
 */
export const signInWithGoogleIdToken = (idToken: string) => {
  const cred = authModule.GoogleAuthProvider.credential(idToken);
  return authModule().signInWithCredential(cred);
};
