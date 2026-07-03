import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, TextInput } from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

type Kind = 'bank' | 'upi' | 'paypal';
type Method = { id: string; kind: Kind; label: string; sub: string };

const ICONS: Record<Kind, keyof typeof import('@/icons').Ionicons.glyphMap> = {
  bank: 'business-outline',
  upi: 'phone-portrait-outline',
  paypal: 'wallet-outline',
};

const SEED: Method[] = [
  { id: 'm1', kind: 'bank', label: 'HDFC ****4821', sub: 'Bank · verified' },
  { id: 'm2', kind: 'upi', label: 'sola@hdfc', sub: 'UPI · verified' },
];

export default function FinancePaymentMethods() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [methods, setMethods] = useState<Method[]>(SEED);
  const [defaultId, setDefaultId] = useState('m1');
  const [adding, setAdding] = useState<Kind | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<Method | null>(null);

  // add-form fields
  const [acct, setAcct] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [upi, setUpi] = useState('');
  const [paypal, setPaypal] = useState('');

  const resetForm = () => {
    setAcct('');
    setIfsc('');
    setUpi('');
    setPaypal('');
  };
  const closeAdd = () => {
    setAdding(null);
    resetForm();
  };

  const append = (m: Method) => {
    setMethods((prev) => [...prev, m]);
    toast('Method added.', 'success');
    closeAdd();
  };

  const addBank = () => {
    const tail = acct.replace(/\s/g, '').slice(-4) || '0000';
    append({
      id: `m${Date.now()}`,
      kind: 'bank',
      label: `BANK ****${tail}`,
      sub: 'Bank · pending verify',
    });
  };
  const addUpi = () =>
    append({
      id: `m${Date.now()}`,
      kind: 'upi',
      label: upi.trim() || 'new@upi',
      sub: 'UPI · verified',
    });
  const addPaypal = () =>
    append({
      id: `m${Date.now()}`,
      kind: 'paypal',
      label: paypal.trim() || 'you@mail.com',
      sub: 'PayPal · linked',
    });

  const makeDefault = (m: Method) => {
    setDefaultId(m.id);
    toast(`${m.label} is now default.`, 'success');
  };

  const askRemove = (m: Method) => {
    if (m.id === defaultId) {
      toast('Set another default first.', 'warn');
      return;
    }
    if (methods.length <= 1) {
      toast('Keep at least one method.', 'warn');
      return;
    }
    setConfirmRemove(m);
  };
  const doRemove = () => {
    if (!confirmRemove) return;
    setMethods((prev) => prev.filter((x) => x.id !== confirmRemove.id));
    toast('Method removed.', 'default');
    setConfirmRemove(null);
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MONEY · METHODS" title="METHODS" />} waves={false}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        where it{'\n'}
        <RNText style={styles.italic}>lands.</RNText>
      </RNText>

      <Section eyebrow="PAYOUT DESTINATIONS">
        {methods.map((m) => {
          const isDefault = m.id === defaultId;
          return (
            <ListCell
              key={m.id}
              icon={ICONS[m.kind]}
              title={m.label}
              subtitle={m.sub}
              accent={isDefault ? palette.acid : palette.electric}
              right={
                <View style={styles.rightRow}>
                  {isDefault ? (
                    <View style={styles.badge}>
                      <RNText style={styles.badgeText} allowFontScaling={false}>
                        DEFAULT
                      </RNText>
                    </View>
                  ) : (
                    <Tap onPress={() => makeDefault(m)} burstColor={palette.acid}>
                      <View style={styles.setDefault}>
                        <RNText style={styles.setDefaultText} allowFontScaling={false}>
                          SET DEFAULT
                        </RNText>
                      </View>
                    </Tap>
                  )}
                  <Tap onPress={() => askRemove(m)} burstColor={palette.ember}>
                    <View style={styles.trash}>
                      <Ionicons name="trash-outline" size={16} color={palette.ink} />
                    </View>
                  </Tap>
                </View>
              }
            />
          );
        })}
      </Section>

      <Section eyebrow="ADD METHOD">
        <ListCell
          icon="business-outline"
          title="Add bank account"
          subtitle="Verify via micro-deposit"
          onPress={() => setAdding('bank')}
        />
        <ListCell
          icon="phone-portrait-outline"
          title="Add UPI"
          subtitle="Instant payouts in India"
          onPress={() => setAdding('upi')}
        />
        <ListCell
          icon="wallet-outline"
          title="Add PayPal"
          subtitle="For cross-border deals"
          onPress={() => setAdding('paypal')}
        />
      </Section>

      <View style={styles.note}>
        <Ionicons name="shield-checkmark-outline" size={15} color={palette.mute} />
        <RNText style={styles.noteText} maxFontSizeMultiplier={1.2}>
          Bank-grade encryption. We never store full account numbers.
        </RNText>
      </View>

      {/* ADD BANK */}
      <Sheet visible={adding === 'bank'} onClose={closeAdd} eyebrow="ADD METHOD" title="Bank account">
        <Field label="ACCOUNT NUMBER" styles={styles}>
          <TextInput
            style={styles.input}
            value={acct}
            onChangeText={setAcct}
            keyboardType="number-pad"
            placeholder="0000 0000 0000"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.2}
          />
        </Field>
        <Field label="IFSC CODE" styles={styles}>
          <TextInput
            style={styles.input}
            value={ifsc}
            onChangeText={setIfsc}
            autoCapitalize="characters"
            placeholder="HDFC0001234"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.2}
          />
        </Field>
        <RNText style={styles.formHint} maxFontSizeMultiplier={1.2}>
          We'll send a ₹1 micro-deposit to verify ownership.
        </RNText>
        <View style={{ marginTop: 18 }}>
          <MagneticButton label="ADD BANK" size="lg" background={palette.ink} foreground={palette.acid} onPress={addBank} />
        </View>
      </Sheet>

      {/* ADD UPI */}
      <Sheet visible={adding === 'upi'} onClose={closeAdd} eyebrow="ADD METHOD" title="UPI ID">
        <Field label="UPI ID" styles={styles}>
          <TextInput
            style={styles.input}
            value={upi}
            onChangeText={setUpi}
            autoCapitalize="none"
            placeholder="name@bank"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.2}
          />
        </Field>
        <View style={{ marginTop: 18 }}>
          <MagneticButton label="ADD UPI" size="lg" background={palette.ink} foreground={palette.acid} onPress={addUpi} />
        </View>
      </Sheet>

      {/* ADD PAYPAL */}
      <Sheet visible={adding === 'paypal'} onClose={closeAdd} eyebrow="ADD METHOD" title="PayPal">
        <Field label="PAYPAL EMAIL" styles={styles}>
          <TextInput
            style={styles.input}
            value={paypal}
            onChangeText={setPaypal}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@mail.com"
            placeholderTextColor={palette.mute}
            maxFontSizeMultiplier={1.2}
          />
        </Field>
        <View style={{ marginTop: 18 }}>
          <MagneticButton label="ADD PAYPAL" size="lg" background={palette.ink} foreground={palette.acid} onPress={addPaypal} />
        </View>
      </Sheet>

      {/* CONFIRM REMOVE */}
      <Sheet visible={!!confirmRemove} onClose={() => setConfirmRemove(null)} eyebrow="REMOVE" title="Remove method?">
        <RNText style={styles.confirmText} maxFontSizeMultiplier={1.2}>
          {confirmRemove?.label} will be removed as a payout destination. You can add it again later.
        </RNText>
        <View style={{ marginTop: 18, gap: 10 }}>
          <MagneticButton label="REMOVE" size="lg" background={palette.ink} foreground={palette.ember} onPress={doRemove} />
          <MagneticButton
            label="KEEP IT"
            size="lg"
            variant="outline"
            background={palette.ink}
            foreground={palette.ink}
            onPress={() => setConfirmRemove(null)}
          />
        </View>
      </Sheet>
    </ScreenFrame>
  );
}

function Field({
  label,
  styles,
  children,
}: {
  label: string;
  styles: ReturnType<typeof makeStyles>;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.fieldWrap}>
      <RNText style={styles.fieldLabel} maxFontSizeMultiplier={1.15}>
        {label}
      </RNText>
      {children}
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 52,
      lineHeight: 50,
      letterSpacing: -2.4,
      color: palette.ink,
      marginTop: 4,
    },
    italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
    rightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    badge: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 999,
      backgroundColor: palette.acid,
    },
    badgeText: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.2,
      color: staticPalette.ink,
    },
    setDefault: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: palette.line,
    },
    setDefaultText: {
      fontFamily: fonts.bodyBold,
      fontSize: 10,
      letterSpacing: 1.2,
      color: palette.ink,
    },
    trash: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: palette.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    note: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 22,
      paddingHorizontal: 2,
    },
    noteText: { ...T.small, color: palette.mute, flex: 1 },
    fieldWrap: { marginTop: 14, gap: 8 },
    fieldLabel: { ...T.label, color: palette.ink, opacity: 0.65 },
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
    formHint: { ...T.small, color: palette.mute, marginTop: 12 },
    confirmText: { ...T.body, color: palette.ink, opacity: 0.8, marginTop: 4 },
  });
