import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    gap: 8,
    paddingHorizontal: 4,
    marginTop: 8,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
  },
  headerBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    elevation: 2,
    gap: 1,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: 'uppercase',
  },
  settingItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    padding: 18,
  },
  settingItemBorder: {
    borderTopColor: colors.outline,
    borderTopWidth: 1,
  },
  settingIconBg: {
    alignItems: 'center',
    backgroundColor: colors.iconCircleBg,
    borderRadius: 12,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  settingInfo: {
    flex: 1,
    gap: 2,
  },
  settingTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  settingDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  logoutItem: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  logoutContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
    padding: 18,
  },
  logoutText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
});
