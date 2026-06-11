import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
    width: '100%',
  },
  inputLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.iconCircleBg,
    borderRadius: 14,
    height: 52,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    borderColor: colors.outline,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 52,
    marginTop: 8,
  },
  submitButtonContent: {
    height: 52,
  },
  submitButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  stateCard: {
    borderRadius: 20,
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    padding: 20,
  },
  successCard: {
    backgroundColor: colors.successBg,
  },
  errorCard: {
    backgroundColor: '#FEECEC',
  },
  stateIconBg: {
    alignItems: 'center',
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  successIconBg: {
    backgroundColor: colors.success,
  },
  errorIconBg: {
    backgroundColor: colors.error,
  },
  stateContent: {
    flex: 1,
    gap: 8,
  },
  stateTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  stateBody: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 22,
  },
  passwordBox: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  passwordText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
});
