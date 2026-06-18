import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6FAFD',
    flex: 1,
  },
  content: {
    gap: 28,
    paddingHorizontal: 24,
  },
  header: {
    gap: 8,
  },
  title: {
    color: '#181C1F',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 40,
  },
  subtitle: {
    color: '#3E484E',
    fontSize: 16,
    lineHeight: 24,
  },
  createButton: {
    backgroundColor: '#8421D3',
    borderRadius: 999,
  },
  createButtonContent: {
    height: 48,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    gap: 24,
    padding: 24,
    shadowColor: '#181C1F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  panelHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panelTitle: {
    color: '#181C1F',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 28,
  },
  todayPill: {
    backgroundColor: '#F0F4F7',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  todayPillText: {
    color: '#007EA4',
    fontSize: 12,
    fontWeight: '900',
  },
  daysList: {
    marginHorizontal: -4,
  },
  daysContent: {
    gap: 12,
    paddingHorizontal: 4,
  },
  dayCard: {
    alignItems: 'center',
    backgroundColor: '#F0F4F7',
    borderRadius: 18,
    gap: 8,
    height: 128,
    justifyContent: 'center',
    paddingHorizontal: 18,
    width: 96,
  },
  dayCardActive: {
    backgroundColor: '#007EA4',
    shadowColor: '#007EA4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
  },
  dayWeek: {
    color: '#6E787F',
    fontSize: 12,
    fontWeight: '800',
  },
  dayNumber: {
    color: '#181C1F',
    fontSize: 28,
    fontWeight: '900',
  },
  dayCount: {
    color: '#6E787F',
    fontSize: 11,
    fontWeight: '800',
  },
  dayTextActive: {
    color: '#FFFFFF',
  },
  appointmentList: {
    gap: 12,
  },
  requestsSection: {
    gap: 12,
  },
  requestCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  requestActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  requestActionButton: {
    borderRadius: 12,
    flexGrow: 1,
  },
  appointmentCard: {
    backgroundColor: '#F6FAFD',
    borderColor: '#DFE3E6',
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  appointmentTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
  },
  timeBox: {
    alignItems: 'center',
    backgroundColor: '#DDF7FB',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  timeText: {
    color: '#007EA4',
    fontSize: 13,
    fontWeight: '900',
  },
  appointmentMain: {
    flex: 1,
    gap: 4,
  },
  appointmentTitle: {
    color: '#181C1F',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  appointmentMeta: {
    color: '#3E484E',
    fontSize: 13,
    lineHeight: 18,
  },
  typePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E9EC',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typePillText: {
    color: '#181C1F',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: '#F6FAFD',
    borderColor: '#BEC8CF',
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 2,
    gap: 8,
    padding: 24,
  },
  stateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  stateContent: {
    alignItems: 'center',
    gap: 12,
  },
  stateText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(15, 23, 42, 0.36)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 14,
    maxHeight: '92%',
    padding: 24,
  },
  modalTitle: {
    color: '#181C1F',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 28,
  },
  input: {
    backgroundColor: '#F6FAFD',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rowButton: {
    borderRadius: 12,
    flexGrow: 1,
  },
  employeeList: {
    gap: 8,
    maxHeight: 220,
  },
  employeeRow: {
    alignItems: 'center',
    backgroundColor: '#F6FAFD',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  employeeRowSelected: {
    backgroundColor: '#E9F7FB',
  },
  employeeName: {
    color: '#181C1F',
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
  },
});
