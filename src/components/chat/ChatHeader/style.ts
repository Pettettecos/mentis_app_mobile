import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  chatHeader: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 16,
  },
  headerBackButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    marginRight: -2,
    width: 36,
    backgroundColor: colors.background,
  },
  chatAvatar: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  chatHeaderText: {
    flex: 1,
    gap: 3,
  },
  chatTitle: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
  chatSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 17,
  },
});
