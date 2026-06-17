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
});
