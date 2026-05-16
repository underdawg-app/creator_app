import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { fonts, type as T } from '@/theme/typography';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';

const BG = staticPalette.ink;
const FG = staticPalette.bone;
const MUTE = 'rgba(242,239,230,0.6)';
const ACID = staticPalette.acid;
const EMBER = staticPalette.ember;
const BLUSH = staticPalette.blush;

type Mode = 'PHOTO' | 'VIDEO' | 'STORY';
const MODES: Mode[] = ['PHOTO', 'VIDEO', 'STORY'];

const { height: SCREEN_H } = Dimensions.get('window');

function isMode(v: string | undefined): v is Mode {
  return v === 'PHOTO' || v === 'VIDEO' || v === 'STORY';
}

export default function CameraScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const initialMode: Mode = isMode(params.mode) ? params.mode : 'PHOTO';
  const [mode, setMode] = useState<Mode>(initialMode);
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
  const [front, setFront] = useState(false);
  const [recording, setRecording] = useState(false);
  const toast = useStore((s) => s.toast);

  const onShutterPress = () => {
    if (mode === 'VIDEO') {
      if (recording) {
        setRecording(false);
        toast('Recording saved.', 'success');
        // Unified post screen handles caption / tags / publish for both
        // images and videos — no separate video wizard.
        router.push('/(modules)/studio/image-composer');
      } else {
        setRecording(true);
        toast('Recording…', 'default');
      }
    } else if (mode === 'PHOTO') {
      toast('Snap captured.', 'success');
      router.push('/(modules)/studio/image-composer');
    } else {
      toast('Story captured. 24h ticking.', 'success');
      router.push('/(modules)/studio/image-composer');
    }
  };

  const onPickFromGallery = () => {
    // Stub: a real implementation wires react-native-image-picker here.
    // For now we simulate a successful pick and route to the unified
    // post-detail screen so the flow feels complete.
    toast('Picking from your camera roll…', 'default');
    setTimeout(() => {
      router.push('/(modules)/studio/image-composer');
    }, 350);
  };

  const flashIcon =
    flash === 'on' ? 'flash' : flash === 'auto' ? 'flash-outline' : 'flash-off';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Camera preview placeholder. Replace with VisionCamera <Camera /> when
          react-native-vision-camera is installed. The dark gradient + caption
          gives a believable "no permission / no preview" state. */}
      <View style={styles.preview}>
        <View style={styles.previewIconWrap}>
          <Ionicons
            name={front ? 'person-circle-outline' : 'image-outline'}
            size={56}
            color={MUTE}
          />
        </View>
        <RNText style={styles.previewHint} maxFontSizeMultiplier={1.15}>
          {front ? 'front camera' : 'live preview'}
        </RNText>
        <RNText style={styles.previewSub} maxFontSizeMultiplier={1.2}>
          {`tap shutter to ${mode === 'VIDEO' ? 'record' : 'capture'}.`}
        </RNText>
      </View>

      <SafeAreaView edges={['top']} pointerEvents="box-none" style={styles.topSafe}>
        <View style={styles.topRow}>
          <Tap
            onPress={() => router.back()}
            style={styles.topBtn}
            burstColor={FG}
          >
            <Ionicons name="close" size={24} color={FG} />
          </Tap>

          <View style={styles.topRight}>
            <Tap
              onPress={() =>
                setFlash((f) => (f === 'off' ? 'auto' : f === 'auto' ? 'on' : 'off'))
              }
              style={styles.topBtn}
              burstColor={ACID}
            >
              <Ionicons name={flashIcon as any} size={20} color={FG} />
              {flash !== 'off' ? (
                <View
                  style={[
                    styles.flashDot,
                    { backgroundColor: flash === 'on' ? ACID : 'rgba(255,255,255,0.6)' },
                  ]}
                />
              ) : null}
            </Tap>
            <Tap
              onPress={() => setFront((v) => !v)}
              style={styles.topBtn}
              burstColor={ACID}
            >
              <Ionicons name="camera-reverse-outline" size={22} color={FG} />
            </Tap>
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={['bottom']} pointerEvents="box-none" style={styles.bottomSafe}>
        <View style={styles.modesRow}>
          {MODES.map((m) => {
            const active = m === mode;
            return (
              <Tap
                key={m}
                onPress={() => setMode(m)}
                style={styles.modePill}
                burstColor={ACID}
              >
                <RNText
                  style={[styles.modeText, active && styles.modeTextActive]}
                >
                  {m}
                </RNText>
                {active ? <View style={styles.modeDot} /> : null}
              </Tap>
            );
          })}
        </View>

        <View style={styles.shutterRow}>
          <Tap
            onPress={onPickFromGallery}
            style={styles.sideBtn}
            burstColor={ACID}
            variant="heavy"
          >
            <View style={styles.galleryStrong}>
              <Ionicons name="images" size={22} color={ACID} />
            </View>
            <RNText style={styles.sideLabel}>GALLERY</RNText>
          </Tap>

          <Tap
            onPress={onShutterPress}
            style={styles.shutterWrap}
            burstColor={
              mode === 'VIDEO' ? (recording ? EMBER : ACID) : FG
            }
            variant="heavy"
          >
            <View
              style={[
                styles.shutterRing,
                {
                  borderColor:
                    mode === 'VIDEO'
                      ? recording
                        ? EMBER
                        : ACID
                      : FG,
                },
              ]}
            />
            <View
              style={[
                styles.shutterInner,
                mode === 'VIDEO'
                  ? recording
                    ? {
                        backgroundColor: EMBER,
                        borderRadius: 8,
                        width: 36,
                        height: 36,
                      }
                    : { backgroundColor: EMBER }
                  : { backgroundColor: FG },
              ]}
            />
          </Tap>

          <Tap
            onPress={() => setFront((v) => !v)}
            style={styles.sideBtn}
            burstColor={FG}
          >
            <View style={styles.gallery}>
              <Ionicons name="sync-outline" size={20} color={FG} />
            </View>
            <RNText style={styles.sideLabel}>FLIP</RNText>
          </Tap>
        </View>
      </SafeAreaView>

      {recording ? (
        <SafeAreaView edges={['top']} style={styles.recordingBadgeWrap} pointerEvents="none">
          <View style={styles.recordingBadge}>
            <View style={styles.recordingDot} />
            <RNText style={styles.recordingText}>REC</RNText>
          </View>
        </SafeAreaView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  preview: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 28,
  },
  previewIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewHint: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: FG,
    letterSpacing: -0.6,
  },
  previewSub: {
    ...T.small,
    color: MUTE,
    textAlign: 'center',
    maxWidth: 260,
  },

  topSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topRow: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  flashDot: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  bottomSafe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
  modesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 22,
    marginBottom: 22,
  },
  modePill: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignItems: 'center',
    gap: 6,
  },
  modeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.8,
    color: MUTE,
  },
  modeTextActive: {
    color: FG,
  },
  modeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ACID,
  },

  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  sideBtn: {
    alignItems: 'center',
    gap: 6,
    width: 72,
  },
  gallery: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  galleryStrong: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: ACID,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(216,255,61,0.12)',
  },
  sideLabel: {
    ...T.small,
    color: MUTE,
    fontSize: 10,
    letterSpacing: 1.6,
    fontFamily: fonts.bodyBold,
  },

  shutterWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRing: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    backgroundColor: 'transparent',
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },

  recordingBadgeWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordingBadge: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: EMBER,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: EMBER,
  },
  recordingText: {
    ...T.label,
    color: FG,
    letterSpacing: 1.8,
    fontSize: 11,
  },
});
