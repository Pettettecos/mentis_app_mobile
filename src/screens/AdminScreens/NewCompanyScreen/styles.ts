import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

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
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  logoUpload: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 8,
  },
  logoButton: {
    marginBottom: 12,
    borderRadius: 14,
  },
  logoPreview: {
    width: 100,
    height: 100,
    borderRadius: 999,
    marginBottom: 8,
  },
  logoHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
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
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    marginTop: 8,
    height: 52,
    width: '100%',
  },
  submitButtonContent: {
    height: 52,
  },
  submitButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: colors.successBg,
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
  },
  infoIconBg: {
    alignItems: 'center',
    backgroundColor: colors.success,
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    width: 44,
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
    gap: 8,
  },
  infoTitle: {
    color: colors.success,
    fontSize: 16,
    fontWeight: '700',
  },
  infoBody: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 22,
  },
  infoBold: {
    fontWeight: '700',
  },
  credentialsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  successTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  successBody: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  credentialsCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    width: '100%',
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 24,
  },
  credentialsTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  credentialRow: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.handleIndicator,
  },
  credentialInfo: {
    marginBottom: 8,
  },
  credentialLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  credentialValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  copyButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  copyButtonLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  credentialsActions: {
    width: '100%',
    gap: 12,
  },
  secondaryButton: {
    borderRadius: 14,
    height: 52,
    borderColor: colors.primary,
  },
  primaryButton: {
    borderRadius: 14,
    height: 52,
  },
});
