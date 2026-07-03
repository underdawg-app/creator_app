import React, { useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, TextInput } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { Sheet } from '@/components/ui/Sheet';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

type SheetKind = null | 'email' | 'phone' | 'username' | 'password' | 'history' | 'deactivate' | 'delete';

const SESSIONS = [
  { device: 'iPhone 15 Pro', city: 'Mumbai, IN', time: 'Active now', icon: 'phone-portrait-outline' as const },
  { device: 'MacBook Air', city: 'Mumbai, IN', time: '2 hours ago', icon: 'business-outline' as const },
  { device: 'Chrome · Windows', city: 'Pune, IN', time: 'Yesterday', icon: 'business-outline' as const },
];

export default function AccountSettings() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const logout = useStore((s) => s.logout);
  const profile = useStore((s) => s.profile);
  const setProfile = useStore((s) => s.setProfile);

  const [email, setEmail] = useState('sola@underdawg.com');
  const [phone, setPhone] = useState('+91 ●●●●● 21');
  const [sheet, setSheet] = useState<SheetKind>(null);

  // interim sheet fields
  const [draft, setDraft] = useState('');
  const [pwCur, setPwCur] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConf, setPwConf] = useState('');
  const [delWord, setDelWord] = useState('');
  const [endedIds, setEndedIds] = useState<string[]>([]);

  const close = () => setSheet(null);

  const openEdit = (kind: 'email' | 'phone' | 'username') => {
    setDraft(kind === 'email' ? email : kind === 'phone' ? phone : profile.handle);
    setSheet(kind);
  };

  const saveEdit = () => {
    const v = draft.trim();
    if (!v) {
      toast('Cannot be empty.', 'warn');
      return;
    }
    if (sheet === 'email') setEmail(v);
    if (sheet === 'phone') setPhone(v);
    if (sheet === 'username') setProfile({ handle: v.startsWith('@') ? v : `@${v}` });
    toast('Updated.', 'success');
    close();
  };

  const savePassword = () => {
    if (!pwCur || !pwNew || !pwConf) {
      toast('Fill every field.', 'warn');
      return;
    }
    if (pwNew !== pwConf) {
      toast('Passwords do not match.', 'warn');
      return;
    }
    setPwCur('');
    setPwNew('');
    setPwConf('');
    toast('Password changed.', 'success');
    close();
  };

  return (
    <ScreenFrame waves={false} header={<ModuleHeader eyebrow="SETTINGS · ACCOUNT" title="ACCOUNT" />}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        your account.
      </RNText>

      <Section eyebrow="IDENTITY">
        <ListCell
          icon="mail-outline"
          title={email}
          subtitle="Email address"
          right={<EditTag />}
          onPress={() => openEdit('email')}
        />
        <ListCell
          icon="call-outline"
          title={phone}
          subtitle="Phone number"
          right={<EditTag />}
          onPress={() => openEdit('phone')}
        />
        <ListCell
          icon="person-outline"
          title={profile.handle}
          subtitle="Username"
          right={<EditTag />}
          onPress={() => openEdit('username')}
        />
      </Section>

      <Section eyebrow="SECURITY">
        <ListCell icon="key-outline" title="Change password" onPress={() => setSheet('password')} />
        <ListCell
          icon="shield-checkmark-outline"
          title="Two-factor auth"
          subtitle="Add an extra layer"
          onPress={() => router.push('/(modules)/settings/security')}
        />
        <ListCell
          icon="time-outline"
          title="Login history"
          subtitle="Recent devices & sessions"
          onPress={() => setSheet('history')}
        />
      </Section>

      <Section eyebrow="DANGER ZONE">
        <ListCell
          icon="log-out-outline"
          title="Log out all devices"
          subtitle="End every active session"
          onPress={() => {
            logout();
            toast('Signed out everywhere.', 'success');
          }}
        />
        <ListCell
          icon="ban-outline"
          title="Deactivate account"
          subtitle="Hide your profile temporarily"
          onPress={() => setSheet('deactivate')}
        />
        <ListCell
          icon="trash-outline"
          title="Delete account"
          subtitle="Permanent — cannot be undone"
          accent={palette.ember}
          onPress={() => {
            setDelWord('');
            setSheet('delete');
          }}
        />
      </Section>

      {/* Edit single field */}
      <Sheet
        visible={sheet === 'email' || sheet === 'phone' || sheet === 'username'}
        onClose={close}
        eyebrow="EDIT"
        title={sheet === 'email' ? 'Email' : sheet === 'phone' ? 'Phone' : 'Username'}
      >
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          autoCapitalize="none"
          autoFocus
          keyboardType={sheet === 'phone' ? 'phone-pad' : sheet === 'email' ? 'email-address' : 'default'}
          placeholder="Enter value"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
        <PrimaryButton label="SAVE" onPress={saveEdit} />
      </Sheet>

      {/* Change password */}
      <Sheet visible={sheet === 'password'} onClose={close} eyebrow="SECURITY" title="Change password">
        <SecretInput value={pwCur} onChange={setPwCur} placeholder="Current password" />
        <SecretInput value={pwNew} onChange={setPwNew} placeholder="New password" />
        <SecretInput value={pwConf} onChange={setPwConf} placeholder="Confirm new password" />
        <PrimaryButton label="UPDATE PASSWORD" onPress={savePassword} />
      </Sheet>

      {/* Login history */}
      <Sheet visible={sheet === 'history'} onClose={close} eyebrow="ACTIVITY" title="Login history">
        {SESSIONS.map((s, i) => {
          const id = `s${i}`;
          const ended = endedIds.includes(id);
          return (
            <View key={id} style={styles.session}>
              <View style={styles.bubble}>
                <Ionicons name={s.icon} size={18} color={palette.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <RNText style={styles.sessDevice} maxFontSizeMultiplier={1.2}>
                  {s.device}
                </RNText>
                <RNText style={styles.sessMeta} maxFontSizeMultiplier={1.2}>
                  {s.city} · {s.time}
                </RNText>
              </View>
              <Pressable
                disabled={ended || i === 0}
                onPress={() => {
                  setEndedIds((prev) => [...prev, id]);
                  toast('Session ended.', 'success');
                }}
                style={styles.endBtn}
              >
                <RNText style={[styles.endLabel, (ended || i === 0) && { color: palette.mute }]}>
                  {i === 0 ? 'This device' : ended ? 'Ended' : 'End session'}
                </RNText>
              </Pressable>
            </View>
          );
        })}
      </Sheet>

      {/* Deactivate */}
      <Sheet visible={sheet === 'deactivate'} onClose={close} eyebrow="CONFIRM" title="Deactivate?">
        <RNText style={styles.body} maxFontSizeMultiplier={1.3}>
          Your profile will be hidden until you log back in. Deals and payouts pause while deactivated.
        </RNText>
        <PrimaryButton
          label="DEACTIVATE ACCOUNT"
          onPress={() => {
            toast('Account deactivated.', 'warn');
            close();
          }}
        />
        <GhostButton label="Cancel" onPress={close} />
      </Sheet>

      {/* Delete — two-step */}
      <Sheet visible={sheet === 'delete'} onClose={close} eyebrow="PERMANENT" title="Delete account">
        <RNText style={styles.body} maxFontSizeMultiplier={1.3}>
          This erases your profile, deals, and earnings forever. Type{' '}
          <RNText style={{ fontFamily: fonts.bodyBold, color: palette.ember }}>DELETE</RNText> to confirm.
        </RNText>
        <TextInput
          style={styles.input}
          value={delWord}
          onChangeText={setDelWord}
          autoCapitalize="characters"
          placeholder="DELETE"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
        <Pressable
          disabled={delWord.trim().toUpperCase() !== 'DELETE'}
          onPress={() => {
            toast('Account scheduled for deletion.', 'warn');
            close();
          }}
          style={[
            styles.primary,
            { backgroundColor: palette.ember },
            delWord.trim().toUpperCase() !== 'DELETE' && { opacity: 0.4 },
          ]}
        >
          <RNText style={[styles.primaryLabel, { color: palette.bone }]}>DELETE FOREVER</RNText>
        </Pressable>
        <GhostButton label="Keep my account" onPress={close} />
      </Sheet>
    </ScreenFrame>
  );
}

function EditTag() {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <RNText style={styles.editTag} maxFontSizeMultiplier={1.1}>
      EDIT
    </RNText>
  );
}

function SecretInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [show, setShow] = useState(false);
  return (
    <View style={styles.secretWrap}>
      <TextInput
        style={[styles.input, { flex: 1, borderWidth: 0, backgroundColor: 'transparent', paddingHorizontal: 0 }]}
        value={value}
        onChangeText={onChange}
        secureTextEntry={!show}
        autoCapitalize="none"
        placeholder={placeholder}
        placeholderTextColor={palette.mute}
        maxFontSizeMultiplier={1.2}
      />
      <Pressable onPress={() => setShow((v) => !v)} hitSlop={10}>
        <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={18} color={palette.mute} />
      </Pressable>
    </View>
  );
}

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Pressable onPress={onPress} style={[styles.primary, { backgroundColor: palette.ink }]}>
      <RNText style={[styles.primaryLabel, { color: palette.bone }]}>{label}</RNText>
      <View style={styles.arrowChip}>
        <Ionicons name="arrow-forward" size={14} color={palette.ink} />
      </View>
    </Pressable>
  );
}

function GhostButton({ label, onPress }: { label: string; onPress: () => void }) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Pressable onPress={onPress} style={styles.ghost}>
      <RNText style={styles.ghostLabel}>{label}</RNText>
    </Pressable>
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
    editTag: { ...T.label, color: palette.electric },
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
      marginBottom: 12,
    },
    secretWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: palette.line,
      borderRadius: 14,
      paddingHorizontal: 16,
      backgroundColor: palette.paper,
      marginBottom: 12,
    },
    body: { ...T.body, color: palette.inkMuted, marginBottom: 16, lineHeight: 21 },
    primary: {
      height: 58,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      marginTop: 4,
    },
    primaryLabel: { ...T.button, letterSpacing: 0.5 },
    arrowChip: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ghost: { height: 46, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
    ghostLabel: { ...T.bodyMedium, color: palette.mute },
    session: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    bubble: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sessDevice: { ...T.bodyMedium, color: palette.ink },
    sessMeta: { ...T.small, color: palette.mute, marginTop: 2 },
    endBtn: { paddingVertical: 6, paddingHorizontal: 4 },
    endLabel: { ...T.labelLarge, color: palette.electric },
  });
