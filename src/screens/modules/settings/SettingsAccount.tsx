import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ListCell } from '@/components/ui/ListCell';
import { useStore } from '@/store';

export default function AccountSettings() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [email, setEmail] = useState('sola@underdawgs.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="SETTINGS" title="ACCOUNT" />}>
      <Field label="EMAIL">
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" maxFontSizeMultiplier={1.2} />
      </Field>
      <Field label="PHONE">
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} maxFontSizeMultiplier={1.2} />
      </Field>

      <View style={{ marginTop: 18 }}>
        <ListCell icon="key-outline" title="Change password" onPress={() => toast('Password change emailed.', 'success')} />
        <ListCell icon="warning-outline" title="Delete account" onPress={() => toast('Delete flow opened.', 'warn')} />
      </View>

      <View style={{ marginTop: 24 }}>
        <MagneticButton
          label="SAVE CHANGES"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => toast('Account saved.', 'success')}
        />
      </View>
    </ScreenFrame>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.field}>
      <RNText style={styles.label} maxFontSizeMultiplier={1.15}>
        {label}
      </RNText>
      {children}
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  field: { marginTop: 22, gap: 10 },
  label: { ...T.label, color: palette.ink, opacity: 0.65 },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: palette.ink,
    backgroundColor: palette.paper,
  },
});
