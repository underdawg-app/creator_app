import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, TextInput } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useStore } from '@/store';

export default function Invoice() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [client, setClient] = useState('Cityline × Red Circle');
  const [service, setService] = useState('NIGHT BUS — sound campaign');
  const [amount, setAmount] = useState('135000');
  const profile = useStore((s) => s.profile);
  const toast = useStore((s) => s.toast);

  const gst = Math.round(Number(amount) * 0.18);
  const total = Number(amount) + gst;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="FINANCE" title="INVOICE" />}>
      <View style={styles.previewCard}>
        <RNText style={styles.previewKicker}>INVOICE · {new Date().getFullYear()}/01</RNText>
        <RNText
          style={styles.previewTitle}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {profile.name}
        </RNText>
        <RNText style={styles.previewHandle}>{profile.handle}</RNText>

        <View style={styles.divider} />

        <RNText style={styles.previewLabel}>BILLED TO</RNText>
        <RNText style={styles.previewValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
          {client}
        </RNText>
        <RNText style={styles.previewLabel}>FOR</RNText>
        <RNText style={styles.previewValue} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.8}>
          {service}
        </RNText>

        <View style={styles.divider} />

        <Row k="SUBTOTAL" v={`₹${Number(amount || 0).toLocaleString()}`} />
        <Row k="GST (18%)" v={`₹${gst.toLocaleString()}`} />
        <Row k="TOTAL" v={`₹${total.toLocaleString()}`} big />
      </View>

      <View style={styles.field}>
        <RNText style={styles.label}>CLIENT</RNText>
        <TextInput style={styles.input} value={client} onChangeText={setClient} maxFontSizeMultiplier={1.2} />
      </View>
      <View style={styles.field}>
        <RNText style={styles.label}>SERVICE</RNText>
        <TextInput style={styles.input} value={service} onChangeText={setService} maxFontSizeMultiplier={1.2} />
      </View>
      <View style={styles.field}>
        <RNText style={styles.label}>AMOUNT (₹)</RNText>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginTop: 30, flexDirection: 'row', gap: 10 }}>
        <MagneticButton
          label="SEND INVOICE"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => {
            toast('Invoice sent to client.', 'success');
            router.back();
          }}
        />
        <MagneticButton
          label="DOWNLOAD"
          background={staticPalette.acid}
          foreground={staticPalette.ink}
          onPress={() => toast('PDF downloaded.', 'success')}
        />
      </View>
    </ScreenFrame>
  );
}

function Row({ k, v, big }: { k: string; v: string; big?: boolean }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.row}>
      <RNText style={styles.rowKey} maxFontSizeMultiplier={1.15}>
        {k}
      </RNText>
      <RNText
        style={[styles.rowVal, big && { fontSize: 22, color: palette.acid }]}
        maxFontSizeMultiplier={1.1}
      >
        {v}
      </RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  previewCard: {
    backgroundColor: palette.ink,
    borderRadius: 22,
    padding: 22,
    gap: 8,
    marginTop: 4,
  },
  previewKicker: { ...T.label, color: palette.bone, opacity: 0.55 },
  previewTitle: { fontFamily: fonts.displayBold, fontSize: 32, color: palette.bone, letterSpacing: -1 },
  previewHandle: { ...T.small, color: palette.bone, opacity: 0.7 },
  divider: { height: 1, backgroundColor: palette.lineDark, marginVertical: 10 },
  previewLabel: { ...T.micro, color: palette.bone, opacity: 0.55, marginTop: 6 },
  previewValue: { ...T.bodyMedium, color: palette.bone, marginTop: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  rowKey: { ...T.label, color: palette.bone, opacity: 0.65 },
  rowVal: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.bone },
  field: { marginTop: 20, gap: 10 },
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
