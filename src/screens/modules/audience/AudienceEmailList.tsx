import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MetricCard } from '@/components/ui/MetricCard';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

export default function EmailList() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const subscribers = useStore((s) => s.subscribers);
  const addSubscriber = useStore((s) => s.addSubscriber);
  const toast = useStore((s) => s.toast);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const add = () => {
    if (!email.includes('@')) {
      toast('Not a valid email.', 'warn');
      return;
    }
    addSubscriber(email.trim());
    toast('Subscriber added.', 'success');
    setEmail('');
  };

  const send = () => {
    if (!subject.trim()) {
      toast('Subject line is empty.', 'warn');
      return;
    }
    toast(`Sent to ${subscribers.length} people.`, 'success');
    setSubject('');
    setBody('');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="AUDIENCE" title="EMAIL LIST" />}>
      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="SUBSCRIBERS" value={subscribers.length} delta={18} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="OPEN RATE" value={42} suffix="%" delta={2.1} size="md" />
        </View>
      </View>

      <Section eyebrow="ADD MANUALLY">
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={email}
            onChangeText={setEmail}
            placeholder="email address"
            placeholderTextColor={palette.mute}
            autoCapitalize="none"
            keyboardType="email-address"
            maxFontSizeMultiplier={1.2}
          />
          <MagneticButton
            label="ADD"
            size="sm"
            background={palette.ink}
            foreground={palette.acid}
            onPress={add}
          />
        </View>
      </Section>

      <Section eyebrow={`SUBSCRIBERS · ${subscribers.length}`}>
        {subscribers.map((s) => (
          <View key={s.id} style={styles.subscriber}>
            <Ionicons name="mail-outline" size={16} color={palette.ink} style={{ opacity: 0.6 }} />
            <View style={{ flex: 1 }}>
              <RNText
                style={styles.email}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                maxFontSizeMultiplier={1.15}
              >
                {s.email}
              </RNText>
              <RNText style={styles.meta}>
                {s.tag} · {s.joinedAgo}
              </RNText>
            </View>
          </View>
        ))}
      </Section>

      <Section eyebrow="COMPOSE NEWSLETTER" title="say hello to your people.">
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="subject line"
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
        <TextInput
          style={[styles.input, { minHeight: 180, textAlignVertical: 'top', marginTop: 10 }]}
          value={body}
          onChangeText={setBody}
          multiline
          placeholder="write the update."
          placeholderTextColor={palette.mute}
          maxFontSizeMultiplier={1.2}
        />
        <View style={{ marginTop: 14, alignItems: 'flex-start' }}>
          <MagneticButton
            label="SEND"
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={send}
          />
        </View>
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'center' },
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
  subscriber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  email: { ...T.bodyMedium, color: palette.ink },
  meta: { ...T.micro, color: palette.ink, opacity: 0.55, marginTop: 3 },
});
