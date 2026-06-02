import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/theme/colors';
import { styles } from './style';

export function EmployeeSettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          paddingBottom: insets.bottom + 100,
        },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings.headerTitle')}</Text>
        <Text style={styles.headerBody}>{t('settings.headerBody')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.profileSection')}</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingIconBg}>
            <Icon source="account-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              {t('settings.profileTitle')}
            </Text>
            <Text style={styles.settingDescription}>{user?.username}</Text>
          </View>
          <Icon source="chevron-right" size={22} color={colors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('settings.preferencesSection')}
        </Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingIconBg}>
            <Icon source="bell-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              {t('settings.notificationsTitle')}
            </Text>
            <Text style={styles.settingDescription}>
              {t('settings.notificationsDescription')}
            </Text>
          </View>
          <Icon source="chevron-right" size={22} color={colors.textMuted} />
        </Pressable>

        <Pressable style={[styles.settingItem, styles.settingItemBorder]}>
          <View style={styles.settingIconBg}>
            <Icon source="translate" size={22} color={colors.primary} />
          </View>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>
              {t('settings.languageTitle')}
            </Text>
            <Text style={styles.settingDescription}>
              {t('settings.languageDescription')}
            </Text>
          </View>
          <Icon source="chevron-right" size={22} color={colors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.supportSection')}</Text>
        <Pressable style={styles.settingItem}>
          <View style={styles.settingIconBg}>
            <Icon
              source="help-circle-outline"
              size={22}
              color={colors.primary}
            />
          </View>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>{t('settings.helpTitle')}</Text>
            <Text style={styles.settingDescription}>
              {t('settings.helpDescription')}
            </Text>
          </View>
          <Icon source="chevron-right" size={22} color={colors.textMuted} />
        </Pressable>

        <Pressable style={[styles.settingItem, styles.settingItemBorder]}>
          <View style={styles.settingIconBg}>
            <Icon
              source="information-outline"
              size={22}
              color={colors.primary}
            />
          </View>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>{t('settings.aboutTitle')}</Text>
            <Text style={styles.settingDescription}>
              {t('settings.aboutDescription')}
            </Text>
          </View>
          <Icon source="chevron-right" size={22} color={colors.textMuted} />
        </Pressable>
      </View>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutItem,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <View style={styles.logoutContent}>
          <Icon source="logout" size={22} color={colors.error} />
          <Text style={styles.logoutText}>{t('settings.logout')}</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}
