import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
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
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 12,
    backgroundColor: colors.surface,
    height: 52,
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
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.tipBg,
    padding: 16,
    borderRadius: 20,
    marginTop: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.tipBorder,
    width: '100%',
  },
  tipContent: {
    flex: 1,
    marginLeft: 8,
  },
  tipTitle: {
    color: colors.tipText,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  tipText: {
    color: colors.tipTextDark,
    fontSize: 13,
    lineHeight: 18,
  },
  sheetContainer: {
    backgroundColor: colors.background,
  },
  sheetContent: {
    paddingHorizontal: 28,
  },
});
