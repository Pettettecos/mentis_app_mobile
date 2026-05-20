import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { GradientText } from '../GradientText';

interface EnterpriseTopBarProps {
  title?: string;
  showLogout?: boolean;
  showBackButton?: boolean;
  showTitle?: boolean;
  gradientTextLeft?: boolean;
  showBackButtonRight?: boolean;
  onBackPress?: () => void;
}

export function EnterpriseTopBar({
  title = 'MentisTech',
  showLogout = true,
  showBackButton = false,
  showTitle = true,
  gradientTextLeft = false,
  showBackButtonRight = false,
  onBackPress,
}: EnterpriseTopBarProps) {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 16 }]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon source="arrow-left" size={24} color="#007EA4" />
          </TouchableOpacity>
        )}
        {showTitle && <Text style={styles.title}>{title}</Text>}
        {!showTitle && (
          <GradientText text="MentisTech" style={styles.gradientTitle} />
        )}
        {gradientTextLeft && showTitle && (
          <GradientText text="MentisTech" style={styles.gradientTitle} />
        )}
      </View>

      <View style={styles.rightSection}>
        {!gradientTextLeft && showTitle && (
          <GradientText text="MentisTech" style={styles.gradientTitle} />
        )}

        {showBackButtonRight && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon source="home" size={28} color="#007EA4" />
          </TouchableOpacity>
        )}

        {showLogout && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon source="logout" size={22} color="#007EA4" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(246, 250, 253, 0.92)',
    borderBottomColor: 'rgba(24, 28, 31, 0.06)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  title: {
    color: '#1A90B9',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  gradientTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  logoutButton: {
    padding: 8,
  },
});
