import { Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Card, Icon, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { useAuth } from '@/context/AuthContext';
import {
  guidedExercises,
  journeyIcon,
  journeyIconColor,
  moodIconColor,
  moodOptions,
} from '../constants';

export function EmployeeDashboardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();

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
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood.label}
                style={styles.moodButton}
                onPress={() => {}}
              >
                <Icon source={mood.icon} size={32} color={moodIconColor} />
                <Text style={styles.moodLabel}>{t(mood.label)}</Text>
              </TouchableOpacity>
            ))}
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
                {t('employeeDashboard.currentStreakValue')}
              </Text>
            </View>

            <View style={styles.journeyStatBox}>
              <Text style={styles.journeyStatLabel}>
                {t('employeeDashboard.longestStreak')}
              </Text>
              <Text style={styles.journeyStatValue}>
                {t('employeeDashboard.longestStreakValue')}
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
