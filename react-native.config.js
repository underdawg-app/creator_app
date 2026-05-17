module.exports = {
  project: {
    ios: {},
    android: {},
  },
  // Disable bootsplash native autolinking on Android only. Its
  // `setOnExitAnimationListener` lambda implements an API 31+ interface that
  // fails to class-load on Android 9–11, crashing the JS bridge before
  // `AppRegistry.registerComponent('main', …)` runs. The native splash logo
  // still shows via the BootTheme applied in AndroidManifest. iOS unaffected.
  dependencies: {
    'react-native-bootsplash': {
      platforms: {
        android: null,
      },
    },
  },
  assets: ['./assets/fonts/', './assets/transitions/'],
};
