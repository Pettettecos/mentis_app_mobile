import { StyleSheet } from 'react-native';
import { breathingColors } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: breathingColors.background,
  },
  setupContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    gap: 32,
  },
  header: {
    gap: 8,
  },
  title: {
    color: breathingColors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: breathingColors.textSecondary,
    fontSize: 14,
  },
  techniqueCard: {
    backgroundColor: breathingColors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: breathingColors.cardBorder,
    gap: 12,
  },
  techniqueLabel: {
    color: breathingColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  techniqueSteps: {
    flexDirection: 'row',
    gap: 12,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.3)',
  },
  stepValue: {
    color: breathingColors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  stepLabel: {
    color: breathingColors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: breathingColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  roundRow: {
    flexDirection: 'row',
    gap: 12,
  },
  roundButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: breathingColors.cardBorder,
    backgroundColor: breathingColors.cardBg,
    alignItems: 'center',
    gap: 4,
  },
  roundButtonSelected: {
    borderColor: breathingColors.selected,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
  },
  roundText: {
    color: breathingColors.textSecondary,
    fontSize: 16,
    fontWeight: '700',
  },
  roundTextSelected: {
    color: breathingColors.text,
  },
  startButton: {
    marginTop: 8,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: breathingColors.selected,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sessionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: breathingColors.circleGlow,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: breathingColors.circle,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
  },
  phaseText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  roundCounter: {
    color: breathingColors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonPrimary: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: breathingColors.selected,
  },
});
