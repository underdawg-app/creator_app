import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text as RNText,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useTheme } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Chip } from '@/components/ui/Chip';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

const SURFACE = staticPalette.ink;
const FG = staticPalette.bone;
const FG_DIM = 'rgba(242,239,230,0.65)';
const FG_MUTED = 'rgba(242,239,230,0.45)';
const CARD_BG = 'rgba(242,239,230,0.06)';
const CARD_BORDER = 'rgba(242,239,230,0.16)';
const ACCENT = staticPalette.acid;
const LIVE = staticPalette.ember;

const VISIBILITY = ['PUBLIC', 'FOLLOWERS', 'CLOSE'] as const;
type Visibility = (typeof VISIBILITY)[number];

export default function LiveComposer() {
  const { scheme } = useTheme();
  const inverse = scheme === 'light';

  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('PUBLIC');
  const [tipsOn, setTipsOn] = useState(true);
  const [chatOn, setChatOn] = useState(true);
  const [notifyFans, setNotifyFans] = useState(true);
  const toast = useStore((s) => s.toast);

  const goLive = () => {
    if (!title.trim()) {
      toast('Give your stream a title first.', 'warn');
      return;
    }
    toast('Going live…', 'success');
    // Real implementation would push to /(modules)/live-room. For now we
    // route back to the camera screen pre-set to video — the streaming
    // backend isn't wired up yet.
    router.replace('/(modules)/camera?mode=VIDEO');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.headerPad}>
          <ModuleHeader eyebrow="COMPOSE · LIVE" title="GO LIVE" inverse={inverse} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Live preview tile */}
          <View style={styles.previewCard}>
            <View style={styles.liveDotRow}>
              <View style={styles.liveDot} />
              <RNText style={styles.liveText}>LIVE · PREVIEW</RNText>
            </View>
            <View style={styles.previewIconWrap}>
              <Ionicons name="videocam" size={64} color={FG_DIM} />
            </View>
            <RNText style={styles.previewHint}>
              when you tap GO LIVE, this is what your viewers see.
            </RNText>
          </View>

          <View style={styles.field}>
            <RNText style={styles.label}>STREAM TITLE</RNText>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="late night studio session"
              placeholderTextColor={FG_MUTED}
              maxFontSizeMultiplier={1.2}
            />
          </View>

          <View style={styles.field}>
            <RNText style={styles.label}>VISIBILITY</RNText>
            <View style={styles.chipRow}>
              {VISIBILITY.map((v) => (
                <Chip
                  key={v}
                  label={v}
                  active={visibility === v}
                  onPress={() => setVisibility(v)}
                  accent={staticPalette.electric}
                  inverse={inverse}
                />
              ))}
            </View>
          </View>

          <View style={styles.field}>
            <RNText style={styles.label}>STREAM OPTIONS</RNText>
            <View style={styles.optionsList}>
              <ToggleRow
                icon="cash-outline"
                label="Tips"
                desc="Viewers can send tips during the stream."
                on={tipsOn}
                onChange={setTipsOn}
              />
              <ToggleRow
                icon="chatbubbles-outline"
                label="Live chat"
                desc="Viewers can chat in real time."
                on={chatOn}
                onChange={setChatOn}
              />
              <ToggleRow
                icon="notifications-outline"
                label="Notify followers"
                desc="Push a notification when you go live."
                on={notifyFans}
                onChange={setNotifyFans}
              />
            </View>
          </View>

          <View style={styles.actions}>
            <MagneticButton
              label="CANCEL"
              background={staticPalette.acid}
              foreground={staticPalette.ink}
              onPress={() => router.back()}
            />
            <MagneticButton
              label="GO LIVE"
              size="lg"
              background={LIVE}
              foreground={staticPalette.ink}
              onPress={goLive}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ToggleRow({
  icon,
  label,
  desc,
  on,
  onChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  desc: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleIcon}>
        <Ionicons name={icon} size={18} color={FG} />
      </View>
      <View style={{ flex: 1 }}>
        <RNText style={styles.toggleLabel}>{label}</RNText>
        <RNText style={styles.toggleDesc}>{desc}</RNText>
      </View>
      <View
        style={[
          styles.switchTrack,
          { backgroundColor: on ? ACCENT : 'rgba(242,239,230,0.18)' },
        ]}
        onTouchEnd={() => onChange(!on)}
      >
        <View
          style={[
            styles.switchKnob,
            { left: on ? 22 : 2, backgroundColor: on ? staticPalette.ink : FG },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: SURFACE },
  headerPad: { paddingHorizontal: 12 },
  scroll: { paddingHorizontal: 12, paddingBottom: 140 },

  previewCard: {
    marginTop: 8,
    paddingVertical: 28,
    paddingHorizontal: 22,
    borderRadius: 22,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
    gap: 16,
  },
  liveDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(255,90,31,0.18)',
    borderWidth: 1,
    borderColor: LIVE,
    alignSelf: 'center',
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: LIVE },
  liveText: {
    ...T.label,
    color: FG,
    letterSpacing: 1.6,
    fontFamily: fonts.bodyBold,
    fontSize: 10,
  },
  previewIconWrap: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(242,239,230,0.06)',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewHint: {
    ...T.small,
    color: FG_DIM,
    textAlign: 'center',
    maxWidth: 240,
  },

  field: { marginTop: 22, gap: 10 },
  label: { ...T.label, color: FG, opacity: 0.65, letterSpacing: 1.6 },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },

  input: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: FG,
    backgroundColor: CARD_BG,
  },

  optionsList: { gap: 10 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  toggleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(242,239,230,0.08)',
  },
  toggleLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    letterSpacing: -0.3,
    color: FG,
  },
  toggleDesc: { ...T.micro, color: FG_DIM, marginTop: 2 },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  switchKnob: {
    position: 'absolute',
    top: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  actions: { marginTop: 30, flexDirection: 'row', gap: 10 },
});
