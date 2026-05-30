import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { Sheet } from '@/components/ui/Sheet';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';

type Session = { id: string; device: string; meta: string; current?: boolean };
type Device = { id: string; name: string; meta: string };

const SESSION_SEED: Session[] = [
  { id: 's1', device: 'This device', meta: 'iPhone · Mumbai · current', current: true },
  { id: 's2', device: 'iPhone 14', meta: 'Mumbai · 2d ago' },
  { id: 's3', device: 'Web · Chrome', meta: 'Delhi · 1w ago' },
];

const DEVICE_SEED: Device[] = [
  { id: 'd1', name: 'iPhone 15 Pro', meta: 'Added Jan 2026' },
  { id: 'd2', name: 'MacBook Air', meta: 'Added Nov 2025' },
];

export default function Security() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const s = useStore((st) => st.settings.security);
  const update = useStore((st) => st.updateSetting);
  const toast = useStore((st) => st.toast);

  // change password sheet
  const [pwOpen, setPwOpen] = useState(false);
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  // 2FA sheet
  const [twoOpen, setTwoOpen] = useState(false);
  const [code, setCode] = useState('');

  // trusted devices sheet
  const [devOpen, setDevOpen] = useState(false);
  const [devices, setDevices] = useState<Device[]>(DEVICE_SEED);

  // sessions
  const [sessions, setSessions] = useState<Session[]>(SESSION_SEED);

  const resetPw = () => {
    setCur('');
    setNext('');
    setConfirm('');
  };

  const submitPw = () => {
    if (!cur || !next) return toast('Fill every field.', 'warn');
    if (next.length < 6) return toast('Use at least 6 characters.', 'warn');
    if (next !== confirm) return toast("Passwords don't match.", 'warn');
    setPwOpen(false);
    resetPw();
    toast('Password changed.', 'success');
  };

  const onTwoToggle = (v: boolean) => {
    if (v) {
      setCode('');
      setTwoOpen(true);
    } else {
      update('security', { twoFactor: false });
      toast('2FA disabled.', 'warn');
    }
  };

  const verifyTwo = () => {
    if (code.length < 6) return toast('Enter all 6 digits.', 'warn');
    update('security', { twoFactor: true });
    setTwoOpen(false);
    toast('2FA enabled.', 'success');
  };

  const endSession = (id: string) => {
    setSessions((prev) =>
      prev.map((x) => (x.id === id ? { ...x, meta: 'ended', device: x.device } : x)),
    );
    setSessions((prev) => prev.filter((x) => x.id !== id));
    toast('Session ended.', 'default');
  };

  const endAllOthers = () => {
    setSessions((prev) => prev.filter((x) => x.current));
    toast('Signed out everywhere else.', 'warn');
  };

  const removeDevice = (id: string) => {
    setDevices((prev) => prev.filter((x) => x.id !== id));
    toast('Device removed.', 'default');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="SETTINGS · SECURITY" title="SECURITY" />}>
      <RNText style={styles.title} maxFontSizeMultiplier={1.1}>
        locked down.
      </RNText>

      <Section eyebrow="SIGN-IN">
        <ListCell
          icon="key-outline"
          title="Change password"
          subtitle="Last changed 3 months ago"
          onPress={() => {
            resetPw();
            setPwOpen(true);
          }}
        />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.key} maxFontSizeMultiplier={1.15}>
              TWO-FACTOR AUTH
            </RNText>
            <RNText style={styles.desc} maxFontSizeMultiplier={1.2}>
              {s.twoFactor ? 'On · authenticator app' : 'Add a second step at sign-in.'}
            </RNText>
          </View>
          <Switch
            value={s.twoFactor}
            onValueChange={onTwoToggle}
            trackColor={{ false: palette.line, true: palette.acid }}
            thumbColor={palette.ink}
          />
        </View>
        <View style={[styles.row, styles.rowLast]}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.key} maxFontSizeMultiplier={1.15}>
              LOGIN ALERTS
            </RNText>
            <RNText style={styles.desc} maxFontSizeMultiplier={1.2}>
              Notify me when a new device signs in.
            </RNText>
          </View>
          <Switch
            value={s.loginAlerts}
            onValueChange={(v) => {
              update('security', { loginAlerts: v });
              toast(v ? 'Login alerts on.' : 'Login alerts off.', v ? 'success' : 'warn');
            }}
            trackColor={{ false: palette.line, true: palette.electric }}
            thumbColor={palette.ink}
          />
        </View>
      </Section>

      <Section
        eyebrow="LOGIN ACTIVITY"
        action={sessions.length > 1 ? { label: 'END ALL', onPress: endAllOthers } : undefined}
      >
        {sessions.map((x) => (
          <View key={x.id} style={styles.session}>
            <View style={styles.dot}>
              <Ionicons
                name={x.current ? 'checkmark-circle' : 'phone-portrait-outline'}
                size={18}
                color={x.current ? palette.ink : palette.inkMuted}
              />
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.sessTitle} maxFontSizeMultiplier={1.15}>
                {x.device}
              </RNText>
              <RNText style={styles.sessMeta} maxFontSizeMultiplier={1.2}>
                {x.meta}
              </RNText>
            </View>
            {x.current ? (
              <View style={styles.tag}>
                <RNText style={styles.tagTxt}>LIVE</RNText>
              </View>
            ) : (
              <Pressable hitSlop={8} onPress={() => endSession(x.id)}>
                <RNText style={styles.end}>End session</RNText>
              </Pressable>
            )}
          </View>
        ))}
        <Tap onPress={endAllOthers} style={styles.cta} variant="heavy">
          <RNText style={styles.ctaTxt}>END ALL OTHER SESSIONS</RNText>
          <View style={styles.ctaChip}>
            <Ionicons name="log-out-outline" size={16} color={palette.ink} />
          </View>
        </Tap>
      </Section>

      <Section eyebrow="DEVICES">
        <ListCell
          icon="phone-portrait-outline"
          title="Trusted devices"
          subtitle={`${devices.length} trusted · manage`}
          onPress={() => setDevOpen(true)}
        />
      </Section>

      {/* CHANGE PASSWORD */}
      <Sheet
        visible={pwOpen}
        onClose={() => setPwOpen(false)}
        eyebrow="SECURITY"
        title="Change password"
      >
        <Field label="CURRENT PASSWORD" value={cur} onChange={setCur} styles={styles} palette={palette} />
        <Field label="NEW PASSWORD" value={next} onChange={setNext} styles={styles} palette={palette} />
        <Field
          label="CONFIRM NEW PASSWORD"
          value={confirm}
          onChange={setConfirm}
          styles={styles}
          palette={palette}
        />
        <Tap onPress={submitPw} style={styles.cta} variant="success">
          <RNText style={styles.ctaTxt}>UPDATE PASSWORD</RNText>
          <View style={styles.ctaChip}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Tap>
      </Sheet>

      {/* 2FA VERIFY */}
      <Sheet
        visible={twoOpen}
        onClose={() => setTwoOpen(false)}
        eyebrow="TWO-FACTOR AUTH"
        title="Enter code"
      >
        <RNText style={styles.sheetHint} maxFontSizeMultiplier={1.2}>
          We sent a 6-digit code to your authenticator app.
        </RNText>
        <View style={styles.codeRow}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={[styles.codeBox, code.length === i && styles.codeBoxActive]}>
              <RNText style={styles.codeTxt}>{code[i] ?? ''}</RNText>
            </View>
          ))}
        </View>
        <TextInput
          value={code}
          onChangeText={(t) => setCode(t.replace(/[^0-9]/g, '').slice(0, 6))}
          keyboardType="number-pad"
          style={styles.codeInput}
          placeholder="Tap to type code"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
        <Tap onPress={verifyTwo} style={styles.cta} variant="success">
          <RNText style={styles.ctaTxt}>VERIFY</RNText>
          <View style={styles.ctaChip}>
            <Ionicons name="shield-checkmark-outline" size={16} color={palette.ink} />
          </View>
        </Tap>
      </Sheet>

      {/* TRUSTED DEVICES */}
      <Sheet
        visible={devOpen}
        onClose={() => setDevOpen(false)}
        eyebrow="DEVICES"
        title="Trusted devices"
      >
        {devices.length === 0 ? (
          <RNText style={styles.sheetHint} maxFontSizeMultiplier={1.2}>
            No trusted devices. New sign-ins will ask for 2FA.
          </RNText>
        ) : (
          devices.map((d) => (
            <View key={d.id} style={styles.devRow}>
              <View style={styles.dot}>
                <Ionicons name="phone-portrait-outline" size={18} color={palette.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.sessTitle} maxFontSizeMultiplier={1.15}>
                  {d.name}
                </RNText>
                <RNText style={styles.sessMeta} maxFontSizeMultiplier={1.2}>
                  {d.meta}
                </RNText>
              </View>
              <Pressable hitSlop={8} onPress={() => removeDevice(d.id)}>
                <Ionicons name="trash-outline" size={20} color={palette.ember} />
              </Pressable>
            </View>
          ))
        )}
      </Sheet>
    </ScreenFrame>
  );
}

function Field({
  label,
  value,
  onChange,
  styles,
  palette,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  styles: ReturnType<typeof makeStyles>;
  palette: typeof staticPalette;
}) {
  return (
    <View style={styles.field}>
      <RNText style={styles.fieldLabel} maxFontSizeMultiplier={1.15}>
        {label}
      </RNText>
      <TextInput
        value={value}
        onChangeText={onChange}
        secureTextEntry
        style={styles.input}
        placeholder="••••••••"
        placeholderTextColor={palette.mute}
        maxFontSizeMultiplier={1.2}
      />
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      gap: 14,
    },
    rowLast: { borderBottomWidth: 0 },
    key: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1.8, color: palette.ink },
    desc: { ...T.small, color: palette.ink, opacity: 0.6, marginTop: 3, maxWidth: 260 },

    session: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      gap: 12,
    },
    dot: {
      width: 38,
      height: 38,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sessTitle: { ...T.bodyMedium, color: palette.ink },
    sessMeta: { ...T.small, color: palette.mute, marginTop: 2 },
    end: { ...T.labelLarge, color: palette.ember, letterSpacing: 0.4 },
    tag: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: palette.acid,
    },
    tagTxt: { ...T.micro, color: palette.ink, letterSpacing: 1 },

    cta: {
      height: 58,
      borderRadius: 16,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 18,
      marginTop: 16,
    },
    ctaTxt: { ...T.button, color: palette.bone, letterSpacing: 1, flex: 1 },
    ctaChip: {
      width: 30,
      height: 30,
      borderRadius: 10,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    field: { marginBottom: 14 },
    fieldLabel: { ...T.label, color: palette.ink, opacity: 0.6, marginBottom: 8 },
    input: {
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
      fontFamily: fonts.body,
      fontSize: 16,
      color: palette.ink,
    },

    sheetHint: { ...T.body, color: palette.mute, marginBottom: 16 },
    codeRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
    codeBox: {
      flex: 1,
      height: 56,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    codeBoxActive: { borderColor: palette.ink, borderWidth: 2 },
    codeTxt: { fontFamily: fonts.displayBold, fontSize: 22, color: palette.ink },
    codeInput: {
      height: 48,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingHorizontal: 16,
      fontFamily: fonts.body,
      fontSize: 16,
      color: palette.ink,
      letterSpacing: 4,
    },

    devRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
      gap: 12,
    },
  });
