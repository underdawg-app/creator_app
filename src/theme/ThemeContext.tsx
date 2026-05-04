import React, { createContext, useContext, useMemo } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { useStore, type ThemePreference } from '@/store';
import {
  darkPalette,
  darkTokens,
  lightPalette,
  lightTokens,
  type Palette,
  type ThemeTokens,
} from './colors';

type ThemeContextValue = {
  scheme: 'light' | 'dark';
  tokens: ThemeTokens;
  palette: Palette;
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const preference = useStore((s) => s.themePreference);
  const setPreference = useStore((s) => s.setThemePreference);

  const value = useMemo<ThemeContextValue>(() => {
    const scheme: 'light' | 'dark' =
      preference === 'system' ? (systemScheme === 'light' ? 'light' : 'dark') : preference;
    const tokens = scheme === 'light' ? lightTokens : darkTokens;
    const palette = scheme === 'light' ? lightPalette : darkPalette;
    return { scheme, tokens, palette, preference, setPreference };
  }, [preference, systemScheme, setPreference]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

export function useThemeTokens(): ThemeTokens {
  return useTheme().tokens;
}

export function useThemedPalette(): Palette {
  return useTheme().palette;
}

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (tokens: ThemeTokens, palette: Palette) => T,
): T {
  const { tokens, palette } = useTheme();
  return useMemo(() => StyleSheet.create(factory(tokens, palette)), [tokens, palette, factory]);
}

/**
 * Migration helper for existing screens/components that already wrote their
 * StyleSheets against the literal `palette` export. Keeps the palette shape
 * but returns scheme-aware values.
 */
export function useThemedPaletteStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (palette: Palette) => T,
): T {
  const palette = useThemedPalette();
  return useMemo(() => StyleSheet.create(factory(palette)), [palette, factory]);
}
