import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { sponsorTeamService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/theme/colors';
import { styles } from './styles';

export function ManagerNewTeamScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const name = teamName.trim();
    if (!name || !user?.sponsor_id) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      await sponsorTeamService.createSponsorTeam({
        name,
        sponsor_id: user.sponsor_id,
      });
      setTeamName('');
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 45 }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t('managerCreate.teamTitle')}</Text>
        <Text style={styles.subtitle}>{t('managerCreate.teamSubtitle')}</Text>

        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('managerCreate.teamName')}</Text>
            <TextInput
              value={teamName}
              onChangeText={setTeamName}
              placeholder={t('managerCreate.teamNamePlaceholder')}
              mode="flat"
              style={styles.input}
              left={
                <TextInput.Icon
                  icon="account-group-outline"
                  color={colors.iconMuted}
                />
              }
            />
          </View>

          <Button
            mode="contained"
            icon={() => (
              <Icon source="account-multiple-plus" size={28} color="#FFFFFF" />
            )}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            contentStyle={styles.submitButtonContent}
            labelStyle={styles.submitButtonLabel}
            style={styles.submitButton}
          >
            {t('managerCreate.teamSubmit')}
          </Button>
        </View>

        {success && (
          <View style={[styles.stateCard, styles.successCard]}>
            <View style={[styles.stateIconBg, styles.successIconBg]}>
              <Icon source="check" size={24} color={colors.surface} />
            </View>
            <View style={styles.stateContent}>
              <Text style={styles.stateTitle}>
                {t('managerCreate.teamSuccessTitle')}
              </Text>
              <Text style={styles.stateBody}>
                {t('managerCreate.teamSuccessBody')}
              </Text>
              <Button mode="text" onPress={() => router.push('/users')}>
                {t('managerCreate.backToUsers')}
              </Button>
            </View>
          </View>
        )}

        {error && (
          <View style={[styles.stateCard, styles.errorCard]}>
            <View style={[styles.stateIconBg, styles.errorIconBg]}>
              <Icon source="alert-circle-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.stateContent}>
              <Text style={styles.stateTitle}>
                {t('managerCreate.errorTitle')}
              </Text>
              <Text style={styles.stateBody}>
                {t('managerCreate.errorBody')}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
