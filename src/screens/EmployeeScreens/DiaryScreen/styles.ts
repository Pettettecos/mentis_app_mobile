import { StyleSheet } from 'react-native';
import { diaryColors } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: diaryColors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  header: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    color: diaryColors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: diaryColors.textSecondary,
    fontSize: 14,
  },
  promptCard: {
    backgroundColor: diaryColors.cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: diaryColors.border,
    gap: 12,
    marginBottom: 8,
  },
  promptLabel: {
    color: diaryColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptText: {
    color: diaryColors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  refreshButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  inputWrapper: {
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  inputLabel: {
    color: diaryColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: diaryColors.inputBg,
    borderRadius: 16,
    padding: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    color: diaryColors.textPrimary,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: diaryColors.accent,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: diaryColors.accent,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 12,
    opacity: 0.5,
  },
  saveButtonActive: {
    opacity: 1,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  listTitle: {
    color: diaryColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: diaryColors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  entryCard: {
    backgroundColor: diaryColors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: diaryColors.border,
    gap: 8,
  },
  entryDate: {
    color: diaryColors.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  entryText: {
    color: diaryColors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
  },
});
