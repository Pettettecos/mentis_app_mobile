import { useEffect, useRef } from 'react';
import { router, usePathname } from 'expo-router';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BottomNavItem {
  key: string;
  label: string;
  icon: string;
  activeIcon?: string;
  route: string;
  matches?: string[];
}

interface BottomNavProps {
  items: BottomNavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 20) }]}
    >
      {items.map((item) => {
        const matches = item.matches ?? [item.route];
        const isActive = matches.some((route) => pathname.startsWith(route));

        return (
          <BottomNavButton
            key={item.key}
            isActive={isActive}
            item={item}
            onPress={() => router.push(item.route)}
          />
        );
      })}
    </View>
  );
}

interface BottomNavButtonProps {
  isActive: boolean;
  item: BottomNavItem;
  onPress: () => void;
}

function BottomNavButton({ isActive, item, onPress }: BottomNavButtonProps) {
  const activeAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(activeAnim, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: true,
      damping: 18,
      stiffness: 180,
      mass: 0.8,
    }).start();
  }, [activeAnim, isActive]);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.activePill,
          {
            opacity: activeAnim,
            transform: [
              {
                scaleX: activeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.82, 1],
                }),
              },
              {
                scaleY: activeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.88, 1],
                }),
              },
            ],
          },
        ]}
      />
      <Icon
        source={isActive ? item.activeIcon || item.icon : item.icon}
        size={20}
        color={isActive ? '#1A90B9' : '#64748B'}
      />
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#F6FAFD',
    bottom: 0,
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
    position: 'absolute',
    right: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
  },
  item: {
    alignItems: 'center',
    borderRadius: 9999,
    gap: 4,
    justifyContent: 'center',
    minWidth: 64,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: 'relative',
  },
  activePill: {
    backgroundColor: '#DFE3E6',
    borderRadius: 9999,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  label: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  labelActive: {
    color: '#1A90B9',
  },
});
