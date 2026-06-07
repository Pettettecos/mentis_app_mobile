import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { GradientText } from '../GradientText';
import { Icon } from 'react-native-paper';

export function TopBar() {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  const handleLogout = async () => logout();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 16 }]}>
      <GradientText text={'MentisTech'} style={styles.gradientTitle} />

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        testID="logout-button"
      >
        <Icon source="logout" size={22} color="#007EA4" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(246, 250, 253, 0.92)',
    borderBottomColor: 'rgba(24, 28, 31, 0.06)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  logoutButton: {
    padding: 8,
  },
  gradientTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
});
