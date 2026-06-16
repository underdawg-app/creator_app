import React from 'react';
import { View, StyleSheet, Pressable, Text as RNText } from 'react-native';

import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from '@/haptics';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts } from '@/theme/typography';
import Arena from '@/screens/tabs/Arena';
import Feed from '@/screens/tabs/Feed';
import Explore from '@/screens/tabs/Explore';
import Create from '@/screens/tabs/Create';
import Inbox from '@/screens/tabs/Inbox';
import Profile from '@/screens/tabs/Profile';
import JobsIndex from '@/screens/modules/jobs/JobsIndex';
// Bottom MERCH tab now opens the new store-builder studio (welcome → wizard),
// not the old MerchIndex page. The old advanced editor is still reachable at
// /(modules)/merch/advanced.
import MerchStudio from '@/screens/modules/merch/studio/MerchStudio';

const Tab = createBottomTabNavigator();

// New tab order: Explore (initial) · Gigs · + (camera) · Merch · You.
// The center "+" is a hard-routed FAB — it never selects a tab, only
// pushes the camera/video module. Arena/Feed/Inbox/Create stay registered
// as hidden tabs so existing router.push('/(tabs)/...') paths still resolve.
type ItemKey = 'Explore' | 'Jobs' | 'Plus' | 'Merch' | 'Profile';

const items: { key: ItemKey; label: string; icon: keyof typeof Ionicons.glyphMap; emphasized?: boolean }[] = [
  { key: 'Explore', label: 'EXPLORE', icon: 'compass' },
  { key: 'Jobs', label: 'GIGS', icon: 'briefcase' },
  { key: 'Plus', label: '', icon: 'add', emphasized: true },
  { key: 'Merch', label: 'MERCH', icon: 'bag-handle' },
  { key: 'Profile', label: 'YOU', icon: 'person' },
];

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        lazy: true,
        freezeOnBlur: true,
      }}
      tabBar={renderTabBar}
    >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Jobs" component={JobsIndex} />
      <Tab.Screen name="Merch" component={MerchStudio} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* Hidden tabs — reachable via router.push but not shown in the bar. */}
      <Tab.Screen name="Feed" component={Feed} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Arena" component={Arena} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Create" component={Create} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Inbox" component={Inbox} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const styles = useThemedPaletteStyles(makeStyles);

  // Stable map of route.key → tab handler. Center Plus has no route in
  // state.routes; we render it inline.
  const handlers = React.useMemo(() => {
    const map: Record<string, () => void> = {};
    state.routes.forEach((route, i) => {
      map[route.key] = () => {
        Haptics.selectionAsync().catch(() => {});
        const focused = state.index === i;
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!focused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };
    });
    return map;
  }, [state.routes, state.index, navigation]);

  const onPlusPress = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.push('/(modules)/studio');
  }, []);

  return (
    <View style={styles.bar}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <View style={styles.row}>
          {items.map((item) => {
            if (item.emphasized) {
              return <PlusButton key="plus" onPress={onPlusPress} />;
            }
            const routeIndex = state.routes.findIndex((r) => r.name === item.key);
            const route = state.routes[routeIndex];
            if (!route) return null;
            const focused = state.index === routeIndex;
            return (
              <TabButton
                key={route.key}
                label={item.label}
                icon={item.icon}
                focused={focused}
                onPress={handlers[route.key]}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const TabButton = React.memo(function TabButton({
  label,
  icon,
  focused,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  return (
    <Pressable style={styles.item} onPress={onPress} hitSlop={8} unstable_pressDelay={0}>
      <View style={styles.itemInner}>
        <Ionicons
          name={icon}
          size={20}
          color={focused ? palette.ink : palette.mute}
        />
        <RNText
          style={[
            styles.label,
            { color: focused ? palette.ink : palette.mute },
          ]}
        >
          {label}
        </RNText>
        <View style={[styles.dot, { opacity: focused ? 1 : 0 }]} />
      </View>
    </Pressable>
  );
});

function PlusButton({ onPress }: { onPress: () => void }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const palette = useThemedPalette();
  return (
    <Pressable
      style={styles.plusWrap}
      onPress={onPress}
      unstable_pressDelay={0}
      hitSlop={8}
    >
      <View style={styles.plusBtn}>
        <Ionicons name="add" size={28} color={palette.bone} />
      </View>
    </Pressable>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  bar: {
    backgroundColor: palette.bone,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  safe: { paddingHorizontal: 10 },
  row: { flexDirection: 'row', alignItems: 'center', height: 68 },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  itemInner: { alignItems: 'center', gap: 3, paddingVertical: 6 },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.acid,
    marginTop: 2,
  },
  plusWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    backgroundColor: palette.ink,
  },
});
