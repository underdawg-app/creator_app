import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '@/screens/onboarding/Welcome';
import Auth from '@/screens/onboarding/Auth';
import Otp from '@/screens/onboarding/Otp';
import UserType from '@/screens/onboarding/UserType';
import CreatorType from '@/screens/onboarding/CreatorType';
import Identity from '@/screens/onboarding/Identity';
import { useThemedPalette } from '@/theme/ThemeContext';

const Stack = createNativeStackNavigator();

const IS_ANDROID = Platform.OS === 'android';

export default function OnboardingNavigator() {
  const palette = useThemedPalette();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        // Android phones cannot reliably hold a 460ms slide at 60fps when the
        // incoming screen is heavy. 280ms keeps the motion clearly readable
        // without overlapping with the JS thread settling.
        animationDuration: IS_ANDROID ? 280 : 460,
        gestureEnabled: true,
        animationTypeForReplace: 'push',
        contentStyle: { backgroundColor: palette.bone },
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="UserType" component={UserType} />
      <Stack.Screen name="CreatorType" component={CreatorType} />
      <Stack.Screen name="Identity" component={Identity} options={{ animation: 'none' }} />
    </Stack.Navigator>
  );
}
