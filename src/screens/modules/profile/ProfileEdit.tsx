import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text as RNText,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';
import { profileMock } from '@/data/mock';

/**
 * Profile edit — identity fields per EPIC 3 (US-3.1 name/bio/location/photo,
 * US-3.2 handle). Cover image lives on the public portfolio, not here.
 * Featured works management is a separate screen (PortfolioEdit).
 */
export default function ProfileEdit() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const setProfile = useStore((s) => s.setProfile);
  const toast = useStore((s) => s.toast);

  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle.replace(/^@/, ''));
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [avatar, setAvatar] = useState<string>(profile.avatar || profileMock.avatar);
  const [photoSheetOpen, setPhotoSheetOpen] = useState(false);

  // Square crop sized for a profile photo. Both gallery + camera flows funnel
  // through the same crop UI (drag-to-center, pinch-to-zoom on iOS).
  const CROP_OPTS = {
    width: 720,
    height: 720,
    cropping: true,
    cropperCircleOverlay: true,
    mediaType: 'photo' as const,
    compressImageQuality: 0.85,
    includeBase64: false,
    avoidEmptySpaceAroundImage: true,
    cropperToolbarTitle: 'Crop your profile photo',
    cropperActiveWidgetColor: staticPalette.mute,
    cropperStatusBarColor: staticPalette.ink,
    cropperToolbarColor: staticPalette.ink,
    cropperToolbarWidgetColor: staticPalette.bone,
  };

  const pickFromLibrary = async () => {
    try {
      const img = await ImageCropPicker.openPicker(CROP_OPTS);
      if (img?.path) {
        setAvatar(img.path);
        toast('Photo updated.', 'success');
      }
    } catch (e: any) {
      if (e?.code === 'E_PICKER_CANCELLED') return;
      toast(e?.message ?? 'Could not open gallery.', 'warn');
    }
  };

  const pickFromCamera = async () => {
    try {
      const img = await ImageCropPicker.openCamera({
        ...CROP_OPTS,
        useFrontCamera: true,
      });
      if (img?.path) {
        setAvatar(img.path);
        toast('Photo updated.', 'success');
      }
    } catch (e: any) {
      if (e?.code === 'E_PICKER_CANCELLED') return;
      toast(e?.message ?? 'Could not open camera.', 'warn');
    }
  };

  const openPhotoMenu = () => setPhotoSheetOpen(true);
  const closePhotoSheet = () => setPhotoSheetOpen(false);

  const onGalleryTap = () => {
    closePhotoSheet();
    // Slight delay so the sheet finishes exiting before the native modal opens.
    setTimeout(pickFromLibrary, 220);
  };
  const onCameraTap = () => {
    closePhotoSheet();
    setTimeout(pickFromCamera, 220);
  };

  const handleValid = handle.length >= 3 && /^[a-z0-9._]+$/i.test(handle);
  const nameValid = name.length >= 2;
  const canSave = nameValid && handleValid;

  const save = () => {
    setProfile({
      name,
      handle: `@${handle.toLowerCase()}`,
      bio,
      location,
      avatar,
    });
    toast('Profile saved.', 'success');
    router.back();
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="PROFILE" title="EDIT PROFILE" />}>
      {/* Profile photo — single tappable target, no cover band */}
      <View style={styles.photoBlock}>
        <Pressable
          onPress={openPhotoMenu}
          style={styles.avatarHit}
          hitSlop={8}
        >
          {/* Clipping wrapper for the photo only — keeps the camera bubble
              outside the overflow:hidden so it doesn't get cut in half. */}
          <View style={styles.avatarRing}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              cachePolicy="memory-disk"
              contentFit="cover"
              transition={150}
              priority="high"
              targetWidth={160}
            />
          </View>
          <View style={styles.avatarEditBubble}>
            <Ionicons name="camera" size={16} color={staticPalette.ink} />
          </View>
        </Pressable>
        <Tap
          onPress={openPhotoMenu}
          style={styles.changePhotoBtn}
          burstColor={staticPalette.mute}
        >
          <Ionicons name="camera-outline" size={14} color={staticPalette.ink} />
          <RNText style={styles.changePhotoLabel} maxFontSizeMultiplier={1.1}>
            CHANGE PHOTO
          </RNText>
        </Tap>
      </View>

      {/* Editable rows — each row is its own tap target that focuses the input. */}
      <EditRow index="01" label="DISPLAY NAME" valid={nameValid}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Sola Roux"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </EditRow>

      <EditRow index="02" label="HANDLE" valid={handleValid} hint="underdawgs.com/">
        <View style={styles.handleRow}>
          <RNText style={styles.handlePrefix} maxFontSizeMultiplier={1.15}>
            @
          </RNText>
          <TextInput
            style={[styles.input, styles.inlineInput]}
            value={handle}
            onChangeText={(v) => setHandle(v.replace(/\s/g, '').toLowerCase())}
            autoCapitalize="none"
            placeholder="solaroux"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.2}
          />
        </View>
      </EditRow>

      <EditRow index="03" label="LOCATION">
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="BROOKLYN · NYC"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </EditRow>

      <EditRow
        index="04"
        label="BIO · 300 CHARS"
        right={
          <RNText style={styles.counter} maxFontSizeMultiplier={1.1}>
            {bio.length} / 300
          </RNText>
        }
      >
        <TextInput
          style={[styles.input, styles.multiline]}
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={300}
          placeholder="One line about you and your work."
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
      </EditRow>

      <View style={styles.linkRow}>
        <RNText style={styles.linkRowLabel} maxFontSizeMultiplier={1.1}>
          OTHER PROFILE BITS
        </RNText>
        <Tap
          onPress={() => router.push('/(modules)/portfolio/edit')}
          style={styles.linkPill}
          burstColor={staticPalette.mute}
        >
          <RNText style={styles.linkPillLabel} maxFontSizeMultiplier={1.1}>
            FEATURED WORKS
          </RNText>
          <Ionicons name="arrow-forward" size={12} color={staticPalette.ink} />
        </Tap>
      </View>

      <View style={{ marginTop: 32 }}>
        <MagneticButton
          label="SAVE PROFILE"
          size="lg"
          background={canSave ? staticPalette.mute : palette.line}
          foreground={staticPalette.ink}
          disabled={!canSave}
          onPress={save}
        />
      </View>

      <PhotoSheet
        visible={photoSheetOpen}
        onClose={closePhotoSheet}
        onGallery={onGalleryTap}
        onCamera={onCameraTap}
      />
    </ScreenFrame>
  );
}

function PhotoSheet({
  visible,
  onClose,
  onGallery,
  onCamera,
}: {
  visible: boolean;
  onClose: () => void;
  onGallery: () => void;
  onCamera: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withTiming(visible ? 1 : 0, {
      duration: visible ? 240 : 200,
      easing: Easing.out(Easing.cubic),
    });
  }, [visible]);

  const backdrop = useAnimatedStyle(() => ({ opacity: p.value * 0.55 }));
  const sheet = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - p.value) * 320 }],
    opacity: p.value,
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={StyleSheet.absoluteFill}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.sheetBackdrop, backdrop]} />
        </Pressable>
        <Animated.View style={[styles.sheetWrap, sheet]} pointerEvents="box-none">
          <SafeAreaView edges={['bottom']} style={styles.sheetCard}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <RNText style={styles.sheetEyebrow} maxFontSizeMultiplier={1.1}>
                PROFILE PHOTO
              </RNText>
              <RNText style={styles.sheetTitle} maxFontSizeMultiplier={1.1}>
                pick a <RNText style={styles.sheetTitleItalic}>face</RNText>.
              </RNText>
            </View>

            <Pressable
              onPress={onGallery}
              style={({ pressed }) => [
                styles.sheetRow,
                pressed && { backgroundColor: palette.paper },
              ]}
            >
              <View style={styles.sheetIcon}>
                <Ionicons name="images-outline" size={20} color={staticPalette.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.sheetRowTitle} maxFontSizeMultiplier={1.15}>
                  Choose from gallery
                </RNText>
                <RNText style={styles.sheetRowSub} maxFontSizeMultiplier={1.15}>
                  Pick an existing photo from your library.
                </RNText>
              </View>
              <Ionicons name="chevron-forward" size={14} color={palette.ink} />
            </Pressable>

            <View style={styles.sheetDivider} />

            <Pressable
              onPress={onCamera}
              style={({ pressed }) => [
                styles.sheetRow,
                pressed && { backgroundColor: palette.paper },
              ]}
            >
              <View style={styles.sheetIcon}>
                <Ionicons name="camera-outline" size={20} color={staticPalette.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.sheetRowTitle} maxFontSizeMultiplier={1.15}>
                  Take a photo
                </RNText>
                <RNText style={styles.sheetRowSub} maxFontSizeMultiplier={1.15}>
                  Snap a fresh one with the front camera.
                </RNText>
              </View>
              <Ionicons name="chevron-forward" size={14} color={palette.ink} />
            </Pressable>

            <Pressable onPress={onClose} style={styles.sheetCancel}>
              <RNText style={styles.sheetCancelLabel} maxFontSizeMultiplier={1.15}>
                CANCEL
              </RNText>
            </Pressable>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

function EditRow({
  index,
  label,
  children,
  right,
  hint,
  valid,
}: {
  index?: string;
  label: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  hint?: string;
  valid?: boolean;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.field}>
      <View style={styles.fieldHead}>
        <View style={styles.fieldHeadLeft}>
          {index ? (
            <RNText style={styles.fieldIndex} maxFontSizeMultiplier={1.1}>
              {index}
            </RNText>
          ) : null}
          <RNText style={styles.fieldLabel} maxFontSizeMultiplier={1.15}>
            {label}
          </RNText>
          {hint ? (
            <RNText style={styles.fieldHint} maxFontSizeMultiplier={1.1}>
              {hint}
            </RNText>
          ) : null}
        </View>
        {right
          ? right
          : valid !== undefined
            ? (
              <View style={styles.validPill}>
                <Ionicons
                  name={valid ? 'checkmark' : 'alert-circle-outline'}
                  size={12}
                  color={staticPalette.ink}
                />
                <RNText
                  style={styles.validPillLabel}
                  maxFontSizeMultiplier={1.1}
                >
                  {valid ? 'OK' : 'NEEDED'}
                </RNText>
              </View>
            )
            : null}
      </View>
      {children}
    </View>
  );
}

const AVATAR = 96;

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  /* Profile photo */
  photoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 12,
    marginBottom: 4,
  },
  // Pressable wrapper — must NOT clip, so the camera bubble can poke out the
  // bottom-right corner of the photo circle.
  avatarHit: {
    width: AVATAR,
    height: AVATAR,
  },
  // Circle that actually clips the photo to a round shape.
  avatarRing: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    overflow: 'hidden',
    backgroundColor: palette.line,
  },
  avatar: { width: '100%', height: '100%' },
  // Camera bubble sits in the OUTER Pressable (not inside the clipping ring),
  // positioned just past the circle edge so it reads as a sticker on top.
  avatarEditBubble: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: staticPalette.mute,
    borderWidth: 3,
    borderColor: palette.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoBtn: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: staticPalette.mute,
  },
  changePhotoLabel: {
    ...T.label,
    color: staticPalette.ink,
    letterSpacing: 1.8,
  },

  /* Field rows */
  field: { marginTop: 22, gap: 10 },
  fieldHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldHeadLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    flex: 1,
  },
  fieldIndex: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    color: palette.ink,
    opacity: 0.45,
    letterSpacing: 0.4,
  },
  fieldLabel: { ...T.label, color: palette.ink, opacity: 0.75 },
  fieldHint: { ...T.micro, color: palette.ink, opacity: 0.4 },

  /* Validation pill — uses absolute colors so it never flips to white-on-neon
     in dark mode. Valid = acid bg + INK text. Not-valid = ink bg + bone text. */
  validPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: staticPalette.mute,
  },
  validPillLabel: {
    ...T.micro,
    fontFamily: fonts.bodyBold,
    letterSpacing: 1.4,
    color: staticPalette.ink,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 18,
    color: palette.ink,
    backgroundColor: 'transparent',
  },
  inlineInput: { flex: 1, borderBottomWidth: 0, paddingVertical: 12 },
  multiline: { minHeight: 90, textAlignVertical: 'top', fontSize: 16 },
  counter: { ...T.micro, color: palette.ink, opacity: 0.5 },
  handleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  handlePrefix: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    color: palette.ink,
    opacity: 0.55,
    marginRight: 4,
  },

  /* Cross-link to portfolio works — uses absolute acid/ink */
  linkRow: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  linkRowLabel: { ...T.label, color: palette.ink, opacity: 0.65 },
  linkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: staticPalette.mute,
  },
  linkPillLabel: {
    ...T.label,
    color: staticPalette.ink,
    letterSpacing: 1.8,
  },

  /* Photo picker bottom sheet — custom UI, matches the editorial app feel */
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheetWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheetCard: {
    backgroundColor: palette.bone,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
    marginBottom: 14,
  },
  sheetHeader: {
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
  sheetEyebrow: {
    ...T.label,
    color: palette.ink,
    opacity: 0.6,
    letterSpacing: 2,
    marginBottom: 4,
  },
  sheetTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -1.2,
    color: palette.ink,
  },
  sheetTitleItalic: {
    fontFamily: fonts.editorialItalic,
    color: staticPalette.mute,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  sheetIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: staticPalette.mute,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetRowTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  sheetRowSub: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.6,
    marginTop: 2,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: palette.line,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  sheetCancel: {
    marginTop: 12,
    marginBottom: 4,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.line,
  },
  sheetCancelLabel: {
    ...T.label,
    color: palette.ink,
    letterSpacing: 2,
  },
});
