package com.underdawgs.app

import android.os.Build
import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // RNBootSplash.init() removed — its `setOnExitAnimationListener` lambda
    // compiles to a synthetic class implementing the API 31+
    // SplashScreen.OnExitAnimationListener interface, which fails to load on
    // Android 9-11 with NoClassDefFoundError and crashes the JS bundle.
    // The native splash logo still shows via the BootTheme on the launch
    // window (declared in AndroidManifest), and BootSplash.hide() in JS
    // resolves immediately because the module status defaults to HIDDEN.
    super.onCreate(null)
  }

  override fun getMainComponentName(): String = "main"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  override fun invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        super.invokeDefaultOnBackPressed()
      }
      return
    }
    super.invokeDefaultOnBackPressed()
  }
}
