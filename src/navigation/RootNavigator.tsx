import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@/theme/ThemeContext';
import Splash from '@/screens/Splash';
import OnboardingNavigator from './OnboardingNavigator';
import TabsNavigator from './TabsNavigator';
import ModulesNavigator from './ModulesNavigator';

const Stack = createNativeStackNavigator();

const IS_ANDROID = Platform.OS === 'android';

export default function RootNavigator() {
  const { tokens } = useTheme();
  // Memoise the screenOptions object. native-stack diffs by identity, so
  // re-creating the object on every render forces a full options-prop
  // re-evaluation on every screen.
  const screenOptions = React.useMemo(
    () => ({
      headerShown: false,
      contentStyle: { backgroundColor: tokens.surface },
      animation: IS_ANDROID ? ('fade' as const) : ('fade' as const),
      animationDuration: IS_ANDROID ? 220 : 320,
      freezeOnBlur: true,
    }),
    [tokens.surface],
  );

  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="Modules" component={ModulesNavigator} />
    </Stack.Navigator>
  );
}
