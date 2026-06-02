// Drop-in replacement for `expo-haptics` backed by `react-native-haptic-feedback`.
// Preserves the `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.X)` call shape
// the existing components use, including the `.catch(() => {})` chain (Android
// is sync, so we wrap in Promise.resolve to keep .catch working uniformly).
import { Platform } from 'react-native';
import RNHaptic from 'react-native-haptic-feedback';

const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };

// Android: no haptics at all. The platform ripple is the press feedback; an
// extra vibration on every button tap reads as the app "feeling heavy".
const HAPTICS_ENABLED = Platform.OS !== 'android';

export enum ImpactFeedbackStyle {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy',
  Soft = 'Soft',
  Rigid = 'Rigid',
}

export enum NotificationFeedbackType {
  Success = 'Success',
  Warning = 'Warning',
  Error = 'Error',
}

const impactToTrigger: Record<ImpactFeedbackStyle, string> = {
  [ImpactFeedbackStyle.Light]: 'impactLight',
  [ImpactFeedbackStyle.Medium]: 'impactMedium',
  [ImpactFeedbackStyle.Heavy]: 'impactHeavy',
  [ImpactFeedbackStyle.Soft]: 'soft',
  [ImpactFeedbackStyle.Rigid]: 'rigid',
};

const notificationToTrigger: Record<NotificationFeedbackType, string> = {
  [NotificationFeedbackType.Success]: 'notificationSuccess',
  [NotificationFeedbackType.Warning]: 'notificationWarning',
  [NotificationFeedbackType.Error]: 'notificationError',
};

function safeTrigger(name: string): Promise<void> {
  if (!HAPTICS_ENABLED) return Promise.resolve();
  try {
    RNHaptic.trigger(name as Parameters<typeof RNHaptic.trigger>[0], options);
  } catch {
    // ignore — haptics are best-effort
  }
  return Promise.resolve();
}

export function selectionAsync(): Promise<void> {
  return safeTrigger('selection');
}

export function impactAsync(style: ImpactFeedbackStyle = ImpactFeedbackStyle.Medium): Promise<void> {
  return safeTrigger(impactToTrigger[style] || 'impactMedium');
}

export function notificationAsync(
  type: NotificationFeedbackType = NotificationFeedbackType.Success,
): Promise<void> {
  return safeTrigger(notificationToTrigger[type] || 'notificationSuccess');
}
