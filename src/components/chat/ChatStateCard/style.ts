import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  stateCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    elevation: 2,
    gap: 10,
    marginHorizontal: 4,
    padding: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  stateTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  stateBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  actionButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 999,
    marginTop: 4,
  },
});
