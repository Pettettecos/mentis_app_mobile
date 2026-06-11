import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4FB',
  },
  content: {
    paddingHorizontal: 16,
    gap: 20,
  },
  header: {
    gap: 6,
    paddingHorizontal: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryActionButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    flexGrow: 1,
  },
  secondaryActionButton: {
    borderColor: colors.primary,
    borderRadius: 14,
    flexGrow: 1,
  },
  actionButtonContent: {
    height: 48,
  },
  actionButtonLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryActionButtonLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  stateCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  stateContent: {
    alignItems: 'center',
    gap: 12,
  },
  stateText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  listSection: {
    gap: 16,
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeaderLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  listHeaderCount: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  list: {
    gap: 12,
  },
  roleGroups: {
    gap: 18,
  },
  roleSection: {
    gap: 10,
  },
  roleSectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  roleSectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
  },
  roleSectionCount: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  userRow: {
    backgroundColor: '#FBFCFE',
    borderColor: colors.outline,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  userTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
  },
  userAvatar: {
    alignItems: 'center',
    backgroundColor: '#D9F0F5',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  userAvatarText: {
    color: '#0F5C69',
    fontSize: 14,
    fontWeight: '800',
  },
  userMain: {
    flex: 1,
    gap: 4,
  },
  userName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  userMeta: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  roleBadge: {
    backgroundColor: '#EAF4FF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  roleBadgeText: {
    color: '#1B5E8A',
    fontSize: 11,
    fontWeight: '800',
  },
  userBottomRow: {
    gap: 4,
  },
  userActions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  teamButton: {
    borderColor: colors.outline,
    borderRadius: 10,
    flexGrow: 1,
    flexShrink: 1,
  },
  teamButtonContent: {
    minHeight: 42,
  },
  teamButtonLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  deleteButtonLabel: {
    fontSize: 12,
    fontWeight: '800',
  },
});
