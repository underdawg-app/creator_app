import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Text as RNText,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { userTypes } from '@/data/mock';
import { useStore } from '@/store';

export default function UserTypeScreen() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [selectedKey, setSelectedKey] = useState('creator');

  const selected =
    userTypes.find((t) => t.key === selectedKey) ?? userTypes[0];
  const isLocked = selectedKey !== 'creator';

  const onNext = () => {
    if (isLocked) return;
    useStore.getState().setProfile({ type: selected.label });
    router.push('/(onboarding)/creator-type');
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.topSafe}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <Ionicons name="arrow-back" size={18} color={palette.ink} />
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <RNText style={styles.kicker}>I AM A</RNText>
        <RNText style={[T.display2, { color: palette.ink, includeFontPadding: false }]} allowFontScaling={false}>
          {`${selected.label}.`}
        </RNText>

        <View style={styles.tagRow}>
          <View style={styles.tagBullet} />
          <RNText style={styles.tagText}>{selected.tag}</RNText>
        </View>

        <RNText style={styles.body}>{selected.body}</RNText>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.footerSafe}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorRow}
        >
          {userTypes.map((t) => {
            const isActive = t.key === selectedKey;
            const disabled = t.key !== 'creator';
            return (
              <Pressable
                key={t.key}
                onPress={() => !disabled && setSelectedKey(t.key)}
                style={[
                  styles.chip,
                  isActive && styles.chipActive,
                  disabled && styles.chipDisabled,
                ]}
              >
                <RNText
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {t.label}
                </RNText>
                {disabled && (
                  <Ionicons
                    name="lock-closed"
                    size={11}
                    color={isActive ? palette.bone : palette.ink}
                    style={{ opacity: 0.6 }}
                  />
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable
          onPress={onNext}
          style={[styles.cta, isLocked && styles.ctaDisabled]}
        >
          <RNText style={styles.ctaText}>
            {isLocked ? 'COMING SOON' : 'CONTINUE'}
          </RNText>
          <View style={styles.ctaArrow}>
            <Ionicons
              name={isLocked ? 'lock-closed' : 'arrow-forward'}
              size={16}
              color={palette.ink}
            />
          </View>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  topSafe: { paddingHorizontal: 20 },
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
  step: {
    ...T.label,
    letterSpacing: 2.4,
    color: palette.ink,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 36,
    justifyContent: 'center',
  },
  kicker: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 4,
    color: palette.ink,
    opacity: 0.45,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  bigLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 110,
    lineHeight: 100,
    letterSpacing: -4,
    color: palette.ink,
    includeFontPadding: false,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
  },
  tagBullet: {
    width: 8,
    height: 8,
    backgroundColor: palette.acid,
  },
  tagText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2.4,
    color: palette.ink,
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 14,
    maxWidth: 360,
  },

  footerSafe: {
    paddingHorizontal: 20,
    paddingBottom: 6,
    gap: 14,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 6,
    paddingRight: 24,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: palette.ink,
  },
  chipDisabled: {
    opacity: 0.45,
  },
  chipText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 2.4,
    color: palette.ink,
    textTransform: 'uppercase',
  },
  chipTextActive: {
    color: palette.ink,
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
  ctaDisabled: {
    backgroundColor: palette.ink,
    opacity: 0.5,
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
});
