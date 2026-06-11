import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF4FB',
    flex: 1,
  },
  content: {
    gap: 20,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  backButton: {
    margin: 0,
  },
  headerText: {
    flex: 1,
    gap: 6,
    paddingRight: 8,
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
  listCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    minHeight: 260,
    padding: 20,
  },
  list: {
    gap: 12,
  },
  alertRow: {
    backgroundColor: '#FBFCFE',
    borderColor: colors.outline,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  alertTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  alertUser: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  alertBadge: {
    backgroundColor: '#FFF1F0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  alertBadgeText: {
    color: '#B10F14',
    fontSize: 11,
    fontWeight: '800',
  },
  alertMeta: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  stateContent: {
    alignItems: 'center',
    gap: 16,
    justifyContent: 'center',
    minHeight: 220,
  },
  stateText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
