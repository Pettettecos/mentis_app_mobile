import { colors } from '@/theme/colors';
import meditationImg from '@assets/meditation.png';
import breathImg from '@assets/breath.png';
import diaryImg from '@assets/diary.png';

export const guidedExercises = [
  {
    id: 'meditation',
    category: 'employeeDashboard.meditation',
    categoryColor: colors.primary,
    icon: 'meditation',
    title: 'employeeDashboard.meditationTitle',
    subtitle: 'employeeDashboard.meditationSubtitle',
    image: meditationImg,
  },
  {
    id: 'breath',
    category: 'employeeDashboard.breathing',
    categoryColor: colors.cyan,
    icon: 'wind-turbine',
    title: 'employeeDashboard.breathingTitle',
    subtitle: 'employeeDashboard.breathingSubtitle',
    image: breathImg,
  },
  {
    id: 'diary',
    category: 'employeeDashboard.diary',
    categoryColor: colors.purple,
    icon: 'pencil-outline',
    title: 'employeeDashboard.diaryTitle',
    subtitle: 'employeeDashboard.diarySubtitle',
    image: diaryImg,
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
