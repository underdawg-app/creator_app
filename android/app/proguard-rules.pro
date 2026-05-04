# R8 / ProGuard rules for the Underdawgs Android release build.
# Release builds run with `minifyEnabled true` + `shrinkResources true` so we
# need to keep symbols that are referenced by JNI / TurboModules / Reanimated
# worklets / Skia / FastImage / Vector Icons that R8 cannot statically prove
# are reachable.

# ───────── React Native core ─────────
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.common.internal.DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class * { *; }
-keep @com.facebook.common.internal.DoNotStrip class * { *; }
-keepclassmembers class * { @com.facebook.proguard.annotations.DoNotStrip *; }
-keepclassmembers class * { @com.facebook.common.internal.DoNotStrip *; }
-keep class com.facebook.react.** { *; }
-keep interface com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keep,includedescriptorclasses class com.facebook.react.bridge.** { *; }

# ───────── New architecture (Fabric / TurboModules) ─────────
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.facebook.react.fabric.** { *; }
-keep class com.facebook.react.uimanager.** { *; }

# ───────── Reanimated / Worklets ─────────
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.worklets.** { *; }
-dontwarn com.swmansion.reanimated.**

# ───────── Gesture Handler ─────────
-keep class com.swmansion.gesturehandler.** { *; }

# ───────── react-native-screens ─────────
-keep class com.swmansion.rnscreens.** { *; }

# ───────── Skia (@shopify/react-native-skia) ─────────
-keep class com.shopify.reactnative.skia.** { *; }
-keep class com.facebook.jni.** { *; }
-dontwarn com.shopify.reactnative.skia.**

# ───────── FastImage (@d11/react-native-fast-image) — Glide ─────────
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep class * extends com.bumptech.glide.module.AppGlideModule { <init>(...); }
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** { **[] $VALUES; public *; }
-keep class com.bumptech.glide.** { *; }
-dontwarn com.bumptech.glide.**

# ───────── react-native-svg ─────────
-keep class com.horcrux.svg.** { *; }
-dontwarn com.horcrux.svg.**

# ───────── react-native-blurhash ─────────
-keep class com.mrousavy.blurhash.** { *; }

# ───────── Vector Icons ─────────
-keep class com.oblador.vectoricons.** { *; }

# ───────── AsyncStorage ─────────
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# ───────── Bootsplash ─────────
-keep class com.zoontek.rnbootsplash.** { *; }

# ───────── SafeAreaContext ─────────
-keep class com.th3rdwave.safeareacontext.** { *; }

# ───────── Haptic Feedback ─────────
-keep class com.mkuczera.** { *; }

# ───────── Keep enum values referenced via reflection by JS ─────────
-keepclassmembers enum * { *; }
-keepattributes *Annotation*, EnclosingMethod, InnerClasses, Signature, Exceptions

# ───────── Strip log calls in release for one more perf nudge on Android ─────────
-assumenosideeffects class android.util.Log {
    public static *** v(...);
    public static *** d(...);
    public static *** i(...);
}

# Don't break on missing optional deps from libraries we don't actually use.
-dontwarn javax.annotation.**
-dontwarn org.codehaus.mojo.**
