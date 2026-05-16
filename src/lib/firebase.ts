/**
 * STUB: Firebase Auth is not currently configured.
 *
 * The real implementation lived here when @react-native-firebase/auth was
 * installed. It was removed temporarily because the auth pod requires a
 * `use_frameworks!` Podfile (which conflicts with the rest of our native
 * module setup on RN 0.81 + New Architecture).
 *
 * To re-enable real auth:
 *   1. Drop in real GoogleService-Info.plist + google-services.json
 *   2. Install: @react-native-firebase/app, @react-native-firebase/auth
 *   3. Add `use_frameworks! :linkage => :static` to ios/Podfile
 *   4. Replace this file with the real wrappers
 *
 * For now every call resolves/rejects in a way that lets the JS layer
 * render a "Auth coming soon" toast.
 */

export type FirebaseUser = {
  uid: string;
  phoneNumber: string | null;
  email: string | null;
};
export type ConfirmationResult = {
  confirm: (code: string) => Promise<{ user: FirebaseUser }>;
};

class AuthNotConfiguredError extends Error {
  constructor() {
    super('Auth is not configured yet.');
    this.name = 'AuthNotConfiguredError';
  }
}

export const getAuth = () => ({
  currentUser: null as FirebaseUser | null,
});

export const onAuthChanged = (cb: (user: FirebaseUser | null) => void) => {
  // Fire once with null so consumers don't get stuck in 'loading'.
  setTimeout(() => cb(null), 0);
  return () => {};
};

export const sendPhoneCode = async (_phone: string): Promise<ConfirmationResult> => {
  throw new AuthNotConfiguredError();
};

export const signOut = async () => {
  // No-op when auth isn't configured.
};

export const signInWithGoogleIdToken = async (_idToken: string) => {
  throw new AuthNotConfiguredError();
};
