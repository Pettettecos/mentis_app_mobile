import { Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Card, Icon, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { styles } from './styles';
import { useAuth } from '@/context/AuthContext';
import {
  guidedExercises,
  journeyIcon,
  journeyIconColor,
  moodIconColor,
  moodOptions,
} from '../constants';
import { streakService, moodService } from '@/services/api';
import type { UserStreakDto, MoodType } from '@/services/api';

const moodMap: Record<string, MoodType> = {
  'employeeDashboard.moodHappy': 'HAPPY',
  'employeeDashboard.moodCalm': 'CALM',
  'employeeDashboard.moodTired': 'TIRED',
  'employeeDashboard.moodStressed': 'STRESSED',
};

export function EmployeeDashboardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const [streak, setStreak] = useState<UserStreakDto | null>(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [todayMood, setTodayMood] = useState<MoodType | null>(null);

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const data = await streakService.getUserStreak();
      setStreak(data);
    } catch {
      // Streak unavailable, show defaults
    }
  };

  const handleCheckin = async (mood: MoodType) => {
    if (checkingIn) return;
    setCheckingIn(true);
    try {
      await moodService.registerMood({ mood });
      setTodayMood(mood);
      await loadStreak();
      Toast.show({
        type: 'success',
        text1: t('employeeDashboard.checkinSuccessTitle'),
        text2: t('employeeDashboard.checkinSuccessBody'),
        position: 'top',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: t('employeeDashboard.checkinErrorTitle'),
        text2: t('employeeDashboard.checkinErrorBody'),
        position: 'top',
      });
    } finally {
      setCheckingIn(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 100 },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.greetingSection}>
        <Text style={styles.greetingTitle}>
          {t('employeeDashboard.greetingTitle', {
            username: user?.username,
          })}
        </Text>
        <Text style={styles.greetingSubtitle}>
          {t('employeeDashboard.greetingSubtitle')}
        </Text>
      </View>

      <Card style={styles.checkinCard}>
        <View style={styles.checkinBadge}>
          <Text style={styles.checkinBadgeText}>
            {t('employeeDashboard.today')}
          </Text>
        </View>
        <Card.Content style={styles.checkinCardContent}>
          <Text style={styles.checkinTitle}>
            {t('employeeDashboard.checkinTitle')}
          </Text>
          <View style={styles.moodOptions}>
            {moodOptions.map((mood) => {
              const isSelected = todayMood === moodMap[mood.label];
              return (
                <TouchableOpacity
                  key={mood.label}
                  style={[
                    styles.moodButton,
                    isSelected && styles.moodButtonSelected,
                  ]}
                  onPress={() => handleCheckin(moodMap[mood.label])}
                  disabled={checkingIn}
                >
                  <Icon
                    source={mood.icon}
                    size={32}
                    color={isSelected ? '#FFFFFF' : moodIconColor}
                  />
                  <Text
                    style={[
                      styles.moodLabel,
                      isSelected && styles.moodLabelSelected,
                    ]}
                  >
                    {t(mood.label)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.journeyCard}>
        <Card.Content style={styles.journeyCardContent}>
          <View style={styles.journeyHeader}>
            <View style={styles.journeyIconBg}>
              <Icon source={journeyIcon} size={28} color={journeyIconColor} />
            </View>
            <View style={styles.journeyTextGroup}>
              <Text style={styles.journeyLabel}>
                {t('employeeDashboard.yourJourney')}
              </Text>
              <Text style={styles.journeyTitle}>
                {t('employeeDashboard.journeyTitle')}
              </Text>
            </View>
          </View>

          <View style={styles.journeyStats}>
            <View style={styles.journeyStatBox}>
              <Text style={styles.journeyStatLabel}>
                {t('employeeDashboard.currentStreak')}
              </Text>
              <Text
                style={[styles.journeyStatValue, styles.journeyStatValuePurple]}
              >
                {streak ? `${streak.current_streak} ${t('employeeDashboard.days')}` : t('employeeDashboard.currentStreakValue')}
              </Text>
            </View>

            <View style={styles.journeyStatBox}>
              <Text style={styles.journeyStatLabel}>
                {t('employeeDashboard.longestStreak')}
              </Text>
              <Text style={styles.journeyStatValue}>
                {streak ? `${streak.longest_streak} ${t('employeeDashboard.days')}` : t('employeeDashboard.longestStreakValue')}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.exercisesSection}>
        <Text style={styles.exercisesTitle}>
          {t('employeeDashboard.guidedExercises')}
        </Text>

        {guidedExercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exerciseCard}
            onPress={() => exercise.route && router.push(exercise.route)}
          >
            <Image source={exercise.image} style={styles.exerciseImage} />
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseCategory}>
                <Icon
                  source={exercise.icon}
                  size={16}
                  color={exercise.categoryColor}
                />
                <Text
                  style={[
                    styles.exerciseCategoryText,
                    { color: exercise.categoryColor },
                  ]}
                >
                  {t(exercise.category)}
                </Text>
              </View>
              <Text style={styles.exerciseTitle}>{t(exercise.title)}</Text>
              <Text style={styles.exerciseSubtitle}>
                {t(exercise.subtitle)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
