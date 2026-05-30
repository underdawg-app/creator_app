import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Chip } from '@/components/ui/Chip';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

const BLOCK_OPTIONS = ['BIO', 'LINKS', 'SOCIAL', 'EMAIL SIGNUP', 'VIDEO', 'IMAGE', 'MERCH', 'ART'];

export default function LandingPage() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [blocks, setBlocks] = useState<string[]>(['BIO', 'LINKS', 'EMAIL SIGNUP', 'MERCH']);
  const profile = useStore((s) => s.profile);
  const toast = useStore((s) => s.toast);

  const toggle = (b: string) =>
    setBlocks((s) => (s.includes(b) ? s.filter((x) => x !== b) : [...s, b]));

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="AUDIENCE" title="LANDING PAGE" />}>
      <RNText style={styles.urlLabel}>YOUR URL</RNText>
      <View style={styles.urlBar}>
        <Ionicons name="globe-outline" size={16} color={palette.ink} />
        <RNText style={styles.url} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
          underdawgs.com/{profile.handle.replace('@', '')}
        </RNText>
        <Tap onPress={() => toast('URL copied.', 'success')} burstColor={palette.acid}>
          <Ionicons name="copy-outline" size={16} color={palette.ink} />
        </Tap>
      </View>

      <Section eyebrow="BLOCKS" title="build your page.">
        <View style={styles.chipRow}>
          {BLOCK_OPTIONS.map((b) => (
            <Chip key={b} label={b} active={blocks.includes(b)} onPress={() => toggle(b)} accent={palette.electric} />
          ))}
        </View>
      </Section>

      <Section eyebrow="PREVIEW" title="what it looks like.">
        <View style={styles.preview}>
          <View style={styles.previewPfp} />
          <RNText
            style={styles.previewName}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {profile.name}
          </RNText>
          <RNText style={styles.previewBio} maxFontSizeMultiplier={1.2}>
            {profile.bio.slice(0, 90)}...
          </RNText>

          {blocks.map((b) => (
            <View
              key={b}
              style={[
                styles.previewBlock,
                b === 'EMAIL SIGNUP' && { backgroundColor: palette.acid },
              ]}
            >
              <RNText
                style={[
                  styles.previewBlockLabel,
                  b === 'EMAIL SIGNUP' && { color: palette.ink },
                ]}
                maxFontSizeMultiplier={1.15}
              >
                {b}
              </RNText>
              <Ionicons
                name={b === 'EMAIL SIGNUP' ? 'mail-outline' : 'arrow-forward'}
                size={16}
                color={b === 'EMAIL SIGNUP' ? palette.ink : palette.bone}
              />
            </View>
          ))}
        </View>
      </Section>

      <View style={{ marginTop: 24 }}>
        <MagneticButton
          label="PUBLISH LANDING PAGE"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => toast('Landing page published.', 'success')}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  urlLabel: { ...T.label, color: palette.ink, opacity: 0.6, marginTop: 4, marginBottom: 8 },
  urlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.line,
  },
  url: { flex: 1, fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 1, color: palette.ink },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  preview: {
    backgroundColor: palette.ink,
    borderRadius: 22,
    padding: 18,
    gap: 10,
  },
  previewPfp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: palette.acid,
    alignSelf: 'center',
  },
  previewName: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    color: palette.bone,
    textAlign: 'center',
    letterSpacing: -0.6,
  },
  previewBio: {
    ...T.body,
    color: palette.bone,
    opacity: 0.8,
    textAlign: 'center',
    maxWidth: 320,
    alignSelf: 'center',
  },
  previewBlock: {
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.lineDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewBlockLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 2.2,
    color: palette.bone,
  },
});
