/**
 * Single source of truth for "is the user signed in to Firebase".
 *
 * Subscribes to onAuthStateChanged and exposes:
 *   - `user`           : current FirebaseUser or null
 *   - `status`         : 'loading' until the first emission, then 'signedIn'
 *                        or 'signedOut'
 *   - `pendingOtp`     : the ConfirmationResult returned by sendPhoneCode,
 *                        held in memory while the user is on the OTP screen
 *   - `setPendingOtp`  : setter used by Auth.tsx
 *   - `signOut()`      : logs out of Firebase + Google
 *
 * The OTP confirmation object cannot be passed via navigation params
 * (it carries native methods), so we stash it in this context.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  onAuthChanged,
  signOut as firebaseSignOut,
  type ConfirmationResult,
  type FirebaseUser,
} from '@/lib/firebase';
import { signOutGoogle } from '@/lib/googleSignIn';

type AuthStatus = 'loading' | 'signedIn' | 'signedOut';

type Ctx = {
  user: FirebaseUser | null;
  status: AuthStatus;
  pendingOtp: ConfirmationResult | null;
  setPendingOtp: (c: ConfirmationResult | null) => void;
  signOut: () => Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const pendingOtpRef = useRef<ConfirmationResult | null>(null);
  // Bump to re-render when pendingOtp changes (the ref alone is invisible
  // to React); cheap because nothing else is in this context's value.
  const [, forceTick] = useState(0);

  useEffect(() => {
    const unsub = onAuthChanged((next) => {
      setUser(next);
      setStatus(next ? 'signedIn' : 'signedOut');
    });
    return unsub;
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      user,
      status,
      pendingOtp: pendingOtpRef.current,
      setPendingOtp: (c) => {
        pendingOtpRef.current = c;
        forceTick((n) => n + 1);
      },
      signOut: async () => {
        await Promise.allSettled([firebaseSignOut(), signOutGoogle()]);
      },
    }),
    [user, status],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
