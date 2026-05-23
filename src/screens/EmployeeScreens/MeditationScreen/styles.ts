import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { meditationColors } from '../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: meditationColors.background,
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
    color: meditationColors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: meditationColors.textSecondary,
    fontSize: 14,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: meditationColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  durationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: meditationColors.cardBorder,
    backgroundColor: meditationColors.cardBg,
    alignItems: 'center',
    gap: 4,
  },
  durationButtonSelected: {
    borderColor: meditationColors.selectedBorder,
    backgroundColor: 'rgba(26, 144, 185, 0.1)',
  },
  durationText: {
    color: meditationColors.textSecondary,
    fontSize: 18,
    fontWeight: '700',
  },
  durationTextSelected: {
    color: meditationColors.text,
  },
  audioList: {
    gap: 10,
  },
  audioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: meditationColors.cardBorder,
    backgroundColor: meditationColors.cardBg,
    gap: 14,
  },
  audioCardSelected: {
    borderColor: meditationColors.selectedBorder,
    backgroundColor: 'rgba(26, 144, 185, 0.1)',
  },
  audioIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.iconCircleBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioIconPlaying: {
    backgroundColor: 'rgba(26, 144, 185, 0.2)',
  },
  audioInfo: {
    flex: 1,
    gap: 2,
  },
  audioLabel: {
    color: meditationColors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  audioHint: {
    color: meditationColors.textSecondary,
    fontSize: 12,
  },
  startButton: {
    marginTop: 8,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: meditationColors.selected,
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
    backgroundColor: meditationColors.circleGlow,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: meditationColors.circle,
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
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
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
    backgroundColor: colors.iconCircleBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonPrimary: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: meditationColors.selected,
  },
});
