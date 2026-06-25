import { colors } from '@/theme/colors';

export const breathingColors = {
  background: colors.background,
  circle: colors.primary,
  circleGlow: 'rgba(26, 144, 185, 0.3)',
  text: colors.textPrimary,
  textSecondary: colors.textSecondary,
  cardBg: colors.surface,
  cardBorder: colors.outline,
  selected: colors.primary,
};

export const technique478 = {
  phases: [
    { label: 'breathing.breatheIn', duration: 4000 },
    { label: 'breathing.hold', duration: 7000 },
    { label: 'breathing.breatheOut', duration: 8000 },
  ],
  totalCycle: 19000,
};

export const roundOptions = [
  { id: '3', label: '3 ciclos', seconds: 57 },
  { id: '5', label: '5 ciclos', seconds: 95 },
  { id: '8', label: '8 ciclos', seconds: 152 },
] as const;
