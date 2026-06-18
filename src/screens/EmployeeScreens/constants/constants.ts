import { colors } from '@/theme/colors';
import meditationImg from '@assets/meditation.png';
import breathImg from '@assets/breath.png';
import diaryImg from '@assets/diary.png';
import waterfallAudio from '@assets/audios/waterfall.mp3';
import peacefulAudio from '@assets/audios/peacefull.mp3';
import mysticalAudio from '@assets/audios/mystical.mp3';

export const guidedExercises = [
  {
    id: 'meditation',
    category: 'employeeDashboard.meditation',
    categoryColor: colors.primary,
    icon: 'meditation',
    title: 'employeeDashboard.meditationTitle',
    subtitle: 'employeeDashboard.meditationSubtitle',
    image: meditationImg,
    route: '/(protected)/meditation',
  },
  {
    id: 'breath',
    category: 'employeeDashboard.breathing',
    categoryColor: colors.cyan,
    icon: 'wind-turbine',
    title: 'employeeDashboard.breathingTitle',
    subtitle: 'employeeDashboard.breathingSubtitle',
    image: breathImg,
    route: '/(protected)/breathing',
  },
  {
    id: 'diary',
    category: 'employeeDashboard.diary',
    categoryColor: colors.purple,
    icon: 'pencil-outline',
    title: 'employeeDashboard.diaryTitle',
    subtitle: 'employeeDashboard.diarySubtitle',
    image: diaryImg,
    route: '/(protected)/diary',
  },
];

export const moodOptions = [
  { icon: 'emoticon-happy-outline', label: 'employeeDashboard.moodHappy' },
  { icon: 'emoticon-neutral-outline', label: 'employeeDashboard.moodCalm' },
  { icon: 'sleep', label: 'employeeDashboard.moodTired' },
  { icon: 'emoticon-angry-outline', label: 'employeeDashboard.moodStressed' },
] as const;

export const moodIconColor = colors.primary;

export const journeyIcon = 'fire';
export const journeyIconColor = colors.purple;

export const audioOptions = [
  {
    id: 'waterfall',
    label: 'meditation.audioWaterfall',
    source: waterfallAudio,
  },
  {
    id: 'peaceful',
    label: 'meditation.audioPeaceful',
    source: peacefulAudio,
  },
  {
    id: 'mystical',
    label: 'meditation.audioMystical',
    source: mysticalAudio,
  },
] as const;

export const durationOptions = [
  { id: '3', label: '3 min', seconds: 180 },
  { id: '5', label: '5 min', seconds: 300 },
  { id: '10', label: '10 min', seconds: 600 },
] as const;

export const breathingPhases = [
  { label: 'meditation.breatheIn', duration: 4000 },
  { label: 'meditation.hold', duration: 4000 },
  { label: 'meditation.breatheOut', duration: 4000 },
] as const;

export const meditationColors = {
  background: colors.background,
  circle: colors.primary,
  circleGlow: 'rgba(44, 209, 228, 0.25)',
  text: colors.textPrimary,
  textSecondary: colors.textSecondary,
  cardBg: colors.surface,
  cardBorder: colors.outline,
  selected: colors.primary,
  selectedBorder: colors.primary,
};
