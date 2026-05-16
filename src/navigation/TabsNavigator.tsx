import React from 'react';
import { View, StyleSheet, Pressable, Text as RNText } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from '@/haptics';
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

const Tab = createBottomTabNavigator();

type ItemKey = 'Arena' | 'Feed' | 'Explore' | 'Jobs' | 'Profile';

const items: { key: ItemKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'Arena', label: 'ARENA', icon: 'trophy' },
  { key: 'Explore', label: 'EXPLORE', icon: 'search' },
  { key: 'Feed', label: 'FEED', icon: 'home' },
  { key: 'Jobs', label: 'JOBS', icon: 'briefcase' },
  { key: 'Profile', label: 'YOU', icon: 'person' },
];

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      screenOptions={{
        headerShown: false,
        // Don't mount a tab's screen until the user taps it for the first
        // time. Cuts cold-start work on Android by ~4× because only the
        // initial tab (Jobs) mounts up front.
        lazy: true,
        // Pause the inactive tab's React tree the moment it's blurred. Stops
        // every off-screen Skia clock, Reanimated scroll handler, and
        // useEffect from running while you're on another tab.
        freezeOnBlur: true,
      }}
      tabBar={renderTabBar}
    >
      <Tab.Screen name="Arena" component={Arena} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Jobs" component={JobsIndex} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* Create is reachable from the Feed header. Hidden tab. */}
      <Tab.Screen name="Create" component={Create} options={{ tabBarButton: () => null }} />
      {/* Inbox is reachable from the Feed header but no longer shown as a tab. */}
      <Tab.Screen name="Inbox" component={Inbox} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const styles = useThemedPaletteStyles(makeStyles);
  // Keep handlers stable across re-renders so memoized TabButtons don't
  // re-render every time another tab is tapped.
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

  return (
    <View style={styles.bar}>
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <View style={styles.row}>
          {state.routes.map((route, i) => {
            const item = items.find((it) => it.key === (route.name as ItemKey));
            if (!item) return null;
            const focused = state.index === i;
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
  emphasized,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  emphasized?: boolean;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const f = useSharedValue(focused ? 1 : 0);
  React.useEffect(() => {
    f.value = withTiming(focused ? 1 : 0, { duration: 180, easing: Easing.out(Easing.quad) });
  }, [focused]);

  const wrap = useAnimatedStyle(() => ({
    transform: [{ translateY: -f.value * 2 }],
  }));
  const dot = useAnimatedStyle(() => ({
    opacity: f.value,
    transform: [{ scale: 0.6 + f.value * 0.4 }],
  }));

  if (emphasized) {
    return (
      <Pressable style={styles.createWrap} onPress={onPress} unstable_pressDelay={0}>
        <View style={styles.create}>
          <Ionicons name="add" size={28} color={staticPalette.ink} />
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.item} onPress={onPress} hitSlop={8} unstable_pressDelay={0}>
      <Animated.View style={[styles.itemInner, wrap]}>
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
        <Animated.View style={[styles.dot, dot]} />
      </Animated.View>
    </Pressable>
  );
});

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
  createWrap: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  create: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: palette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
