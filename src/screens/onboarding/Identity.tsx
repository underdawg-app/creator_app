import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Text as RNText,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image as RNImage,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import ImageCropPicker from 'react-native-image-crop-picker';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { useStore } from '@/store';
import { getAuth } from '@/lib/firebase';

const AVATAR_CROP_OPTS = {
  width: 720,
  height: 720,
  cropping: true,
  cropperCircleOverlay: true,
  mediaType: 'photo' as const,
  compressImageQuality: 0.85,
  includeBase64: false,
  avoidEmptySpaceAroundImage: true,
  cropperToolbarTitle: 'Crop your profile photo',
  cropperActiveWidgetColor: staticPalette.acid,
  cropperStatusBarColor: staticPalette.ink,
  cropperToolbarColor: staticPalette.ink,
  cropperToolbarWidgetColor: staticPalette.bone,
};

export default function Identity() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const setProfile = useStore((s) => s.setProfile);
  const toast = useStore((s) => s.toast);

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const ready = name.trim().length >= 2 && handle.length >= 3;

  const pickAvatar = async () => {
    try {
      const img = await ImageCropPicker.openPicker(AVATAR_CROP_OPTS);
      if (img?.path) setAvatar(img.path);
    } catch (e: any) {
      if (e?.code === 'E_PICKER_CANCELLED') return;
      toast(e?.message ?? 'Could not open gallery.', 'warn');
    }
  };

  const removeAvatar = () => setAvatar(null);

  // Track keyboard so we can show a "Done" dismiss chip (same pattern as Auth).
  const [kbOpen, setKbOpen] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKbOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKbOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const onSubmit = () => {
    if (!ready) return;
    let fbUser: any = null;
    try {
      fbUser = getAuth().currentUser;
    } catch {}
    setProfile({
      name,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      avatar,
      uid: fbUser?.uid ?? null,
      phone: fbUser?.phoneNumber ?? null,
    });
    useStore.getState().setOnboarded(true);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.topSafe}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
          <Pressable
            onPress={() => {
              useStore.getState().setOnboarded(true);
              router.replace('/(tabs)');
            }}
            hitSlop={12}
            style={styles.skip}
          >
            <RNText style={styles.skipLabel}>SKIP</RNText>
          </Pressable>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.heading}>
            <RNText style={styles.kicker}>YOUR PROFILE</RNText>
            <RNText style={[styles.title, { color: palette.ink }]} allowFontScaling={false}>
              MEET
            </RNText>
            <RNText style={[styles.title, { color: palette.ink }]} allowFontScaling={false}>
              THE WORLD.
            </RNText>
            <RNText style={styles.body}>
              Two basics. Change them later anytime.
            </RNText>
          </View>

          <View style={styles.avatarBlock}>
            <Pressable onPress={pickAvatar} style={styles.avatarRing}>
              {avatar ? (
                <RNImage source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="camera-outline" size={26} color={palette.ink} />
                </View>
              )}
              <View style={styles.avatarBadge}>
                <Ionicons
                  name={avatar ? 'pencil' : 'add'}
                  size={14}
                  color={palette.bone}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={avatar ? removeAvatar : pickAvatar}
              hitSlop={8}
              style={styles.avatarAction}
            >
              <RNText style={styles.avatarActionText}>
                {avatar ? 'REMOVE PHOTO' : 'ADD PHOTO · OPTIONAL'}
              </RNText>
            </Pressable>
          </View>

          <View style={styles.fields}>
            <View style={styles.field}>
              <RNText style={styles.fieldLabel}>YOUR NAME</RNText>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder=""
                style={styles.input}
                autoCapitalize="words"
                selectionColor={palette.ink}
              />
            </View>

            <View style={styles.field}>
              <RNText style={styles.fieldLabel}>USERNAME</RNText>
              <View style={styles.inputRow}>
                <RNText style={styles.prefix}>@</RNText>
                <TextInput
                  value={handle}
                  onChangeText={(v) =>
                    setHandle(v.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase())
                  }
                  placeholder=""
                  style={[styles.input, { flex: 1 }]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={palette.ink}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
          <Pressable
            onPress={onSubmit}
            disabled={!ready}
            style={[styles.cta, !ready && { opacity: 0.4 }]}
          >
            <RNText style={styles.ctaText}>CONTINUE</RNText>
            <View style={styles.ctaArrow}>
              <Ionicons name="arrow-forward" size={16} color={palette.ink} />
            </View>
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {kbOpen && (
        <Pressable
          onPress={() => Keyboard.dismiss()}
          hitSlop={12}
          style={styles.kbDismiss}
        >
          <Ionicons name="chevron-down" size={16} color={palette.ink} />
          <RNText style={styles.kbDismissLabel}>DONE</RNText>
        </Pressable>
      )}
    </View>
  );
}

const H_PADDING = 20;

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  topSafe: { paddingHorizontal: H_PADDING },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.paper,
  },
  skip: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLabel: {
    ...T.label,
    color: palette.ink,
    opacity: 0.6,
  },

  scroll: {
    paddingHorizontal: H_PADDING,
    paddingTop: 14,
    paddingBottom: 24,
  },

  heading: {
    marginBottom: 8,
  },
  kicker: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 3.2,
    color: palette.ink,
    opacity: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 56,
    lineHeight: 56,
    letterSpacing: -2,
    includeFontPadding: false,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 10,
  },

  avatarBlock: {
    marginTop: 28,
    alignItems: 'center',
    gap: 12,
  },
  avatarRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  avatarImage: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  avatarPlaceholder: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.bone,
  },
  avatarAction: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  avatarActionText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2.4,
    color: palette.ink,
    opacity: 0.6,
    textTransform: 'uppercase',
  },

  fields: {
    marginTop: 28,
    gap: 14,
  },
  field: {
    backgroundColor: palette.paper,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: palette.ink,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
  },
  fieldLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 2.4,
    color: palette.ink,
    opacity: 0.55,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: palette.ink,
    opacity: 0.45,
    marginRight: 2,
  },
  input: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    letterSpacing: -0.4,
    color: palette.ink,
    paddingVertical: 4,
  },

  footerSafe: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 6,
    paddingTop: 10,
  },
  cta: {
    height: 64,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    backgroundColor: palette.ink,
  },
  ctaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 2.4,
    color: palette.bone,
    textTransform: 'uppercase',
  },
  ctaArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.bone,
  },

  kbDismiss: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 64 : 24,
    right: H_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.ink,
  },
  kbDismissLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2,
    color: palette.ink,
    textTransform: 'uppercase',
  },
});
