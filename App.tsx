import 'react-native-gesture-handler';
import React, { Component, ErrorInfo, ReactNode, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';
import { TransitionProvider } from '@/components/transitions/TransitionProvider';
import { ToastHost } from '@/components/ui/Toast';
import { ConfettiHost } from '@/components/fx/Confetti';
import { AcidSplashHost } from '@/components/fx/AcidSplash';
import RootNavigator from '@/navigation/RootNavigator';
import { navigationRef } from '@/navigation/router';
import { linking } from '@/navigation/linking';

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
  title: { color: '#D8FF3D', fontFamily: 'System', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  body: { color: '#F2EFE6', fontFamily: 'System', fontSize: 13, opacity: 0.7, textAlign: 'center' },
});

export default function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <RootShell />
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
                BootSplash.hide({ fade: true }).catch(() => {});
              }}
            >
              <RootNavigator />
            </NavigationContainer>
            <AcidSplashHost />
            <ConfettiHost />
            <ToastHost />
          </View>
        </TransitionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
