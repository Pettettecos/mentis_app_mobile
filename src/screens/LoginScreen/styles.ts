import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  logoImage: {
    width: 180,
    height: 180,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  tagline: {
    color: colors.textSecondary,
    marginTop: 12,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 24,
    fontWeight: '500',
    fontSize: 16,
  },
  triggerArea: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.accent,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  triggerContent: {
    padding: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  triggerText: {
    fontWeight: '600',
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sheetContainer: {
    backgroundColor: colors.background,
  },
  sheetContent: {
    paddingHorizontal: 28,
    paddingTop: 16,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    paddingVertical: 32,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: '800',
    color: colors.textPrimary,
    fontSize: 24,
  },
  form: {
    width: '100%',
  },
  formActions: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 14,
    marginTop: 8,
    height: 50,
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
});
