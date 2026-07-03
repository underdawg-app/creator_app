import 'react-native-gesture-handler';
import { AppRegistry, LogBox, Platform, UIManager } from 'react-native';
import { enableScreens, enableFreeze } from 'react-native-screens';
import App from './App';

// Native screens + freeze: when a screen is not on top of the stack, RN
// detaches its view tree and pauses its React render loop. This is the single
// biggest Android win because every previously-visited screen stops re-rendering
// the moment you navigate away from it.
enableScreens(true);
enableFreeze(true);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

if (!__DEV__) {
  LogBox.ignoreAllLogs(true);
}

// Native MainActivity asks for "main" (getMainComponentName() in
// MainActivity.kt). Without this registration the bridge throws
// "Invariant Violation: 'main' has not been registered" the moment
// React Native tries to render the root view in release builds.
// The legacy "Underdawgs" registration is kept for any host code that
// might still reference it.
AppRegistry.registerComponent('main', () => App);
AppRegistry.registerComponent('Underdawgs', () => App);
