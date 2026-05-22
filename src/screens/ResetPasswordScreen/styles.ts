import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  topSection: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    paddingVertical: 32,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: '800',
    color: colors.textPrimary,
    fontSize: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.iconCircleBg,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.successBg,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    borderRadius: 14,
    marginTop: 8,
    height: 50,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  sheetContainer: {
    backgroundColor: colors.background,
  },
  sheetContent: {
    paddingHorizontal: 28,
  },
});
