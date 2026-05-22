import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Menu, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';

export function TopBar() {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    setMenuVisible(false);
    await logout();
  };

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>MentisTech</Text>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <View style={styles.avatar}>
              <Icon source="account" size={22} color="#007EA4" />
            </View>
          </TouchableOpacity>
        }
      >
        <Menu.Item
          onPress={handleLogout}
          title={t('common.logout')}
          leadingIcon="logout"
        />
      </Menu>
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
  title: {
    color: '#1A90B9',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#E6F6FB',
    borderColor: '#007EA4',
    borderRadius: 9999,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
