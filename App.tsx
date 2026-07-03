import 'react-native-gesture-handler';
import React, { Component, ErrorInfo, ReactNode, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
// Bootsplash JS import disabled — its NativeRNBootSplash spec uses
// `TurboModuleRegistry.getEnforcing(...)` which THROWS at import time when
// the native module is missing, and we've disabled bootsplash's Android
// autolink (see react-native.config.js) because its `setOnExitAnimationListener`
// lambda crashes on Android 9-11. Native splash logo still shows via the
// BootTheme declared in AndroidManifest.
const BootSplash = {
  hide: async (_?: { fade?: boolean }) => {},
  isVisible: async () => false,
};
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';
import { TransitionProvider } from '@/components/transitions/TransitionProvider';
import { ToastHost } from '@/components/ui/Toast';
import { ConfettiHost } from '@/components/fx/Confetti';
import { AcidSplashHost } from '@/components/fx/AcidSplash';
import RootNavigator from '@/navigation/RootNavigator';
import { navigationRef } from '@/navigation/router';
import { linking } from '@/navigation/linking';
import { AuthProvider } from '@/auth/AuthContext';
import { configureGoogleSignIn } from '@/lib/googleSignIn';

// OAuth web client ID from Firebase Console → Authentication → Sign-in
// method → Google → Web SDK config. Replace this constant before the
// first build, or read it from app.json `extra` if you prefer.
// (See google-services.json `oauth_client[client_type=3].client_id`.)
const GOOGLE_WEB_CLIENT_ID = 'REPLACE_WITH_GOOGLE_WEB_CLIENT_ID';

// Configure Google Sign-In once at module load. Idempotent.
try {
  configureGoogleSignIn(GOOGLE_WEB_CLIENT_ID);
} catch {
  // Native module may be missing in tests / Storybook — silent.
}

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.error) {
      return (
        <View style={errStyles.container}>
          <Text style={errStyles.title}>Something went wrong.</Text>
          <Text style={errStyles.body}>{(this.state.error as Error).message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const errStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', alignItems: 'center', justifyContent: 'center', padding: 32 },
  title: { color: '#FCD34D', fontFamily: 'System', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  body: { color: '#F2EFE6', fontFamily: 'System', fontSize: 13, opacity: 0.7, textAlign: 'center' },
});

export default function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <RootShell />
        </AuthProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

function RootShell() {
  const { tokens } = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: tokens.surface }}>
      <SafeAreaProvider>
        <TransitionProvider>
          <View style={{ flex: 1, backgroundColor: tokens.surface }}>
            <StatusBar
              barStyle={tokens.statusBarStyle === 'dark' ? 'dark-content' : 'light-content'}
            />
            <NavigationContainer
              ref={navigationRef}
              linking={linking}
              onReady={() => {
                // On Android the native bootsplash module is autolink-disabled
                // (see react-native.config.js). Wrap in try/catch so a missing
                // native module never bubbles into the JS bridge.
                try {
                  BootSplash.hide({ fade: true }).catch(() => {});
                } catch {}
              }}
            >
              <RootNavigator />
            </NavigationContainer>
            <AcidSplashHost />
            <ToastHost />
          </View>
        </TransitionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
