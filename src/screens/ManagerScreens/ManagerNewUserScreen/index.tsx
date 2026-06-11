import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { sponsorTeamService, userService } from '@/services/api';
import type { SponsorTeamRead, UserRole } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/theme/colors';
import { styles } from './styles';

const ROLE_OPTIONS: UserRole[] = ['EMPLOYEE', 'PSYCHOLOGIST', 'MANAGER'];

export function ManagerNewUserScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [document, setDocument] = useState('');
  const [role, setRole] = useState<UserRole>('EMPLOYEE');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [teams, setTeams] = useState<SponsorTeamRead[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loading, setLoading] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(
    null
  );
  const [error, setError] = useState(false);

  const loadTeams = useCallback(async () => {
    if (!user?.sponsor_id) {
      return;
    }

    setLoadingTeams(true);
    try {
      const response = await sponsorTeamService.listSponsorTeams(
        user.sponsor_id
      );
      setTeams(response);
    } catch {
      setTeams([]);
    } finally {
      setLoadingTeams(false);
    }
  }, [user?.sponsor_id]);

  useEffect(() => {
    void loadTeams();
  }, [loadTeams]);

  const handleSubmit = async () => {
    if (!username.trim() || !email.trim() || !phoneNumber.trim()) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setTemporaryPassword(null);

    try {
      const response = await userService.createManagerUser({
        username: username.trim(),
        email: email.trim(),
        phone_number: phoneNumber.trim(),
        document: document.trim() || null,
        role,
        sponsor_team_id: selectedTeamId,
      });
      setUsername('');
      setEmail('');
      setPhoneNumber('');
      setDocument('');
      setRole('EMPLOYEE');
      setSelectedTeamId(null);
      setTemporaryPassword(response.temporary_password);
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
        <Text style={styles.title}>{t('managerCreate.userTitle')}</Text>
        <Text style={styles.subtitle}>{t('managerCreate.userSubtitle')}</Text>

        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('managerCreate.userName')}</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder={t('managerCreate.userNamePlaceholder')}
              mode="flat"
              style={styles.input}
              left={
                <TextInput.Icon
                  icon="account-outline"
                  color={colors.iconMuted}
                />
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('managerCreate.userEmail')}
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={t('managerCreate.userEmailPlaceholder')}
              mode="flat"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              left={
                <TextInput.Icon icon="email-outline" color={colors.iconMuted} />
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('managerCreate.userPhone')}
            </Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={t('managerCreate.userPhonePlaceholder')}
              mode="flat"
              style={styles.input}
              keyboardType="phone-pad"
              left={
                <TextInput.Icon icon="phone-outline" color={colors.iconMuted} />
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('managerCreate.userDocument')}
            </Text>
            <TextInput
              value={document}
              onChangeText={setDocument}
              placeholder={t('managerCreate.userDocumentPlaceholder')}
              mode="flat"
              style={styles.input}
              left={
                <TextInput.Icon
                  icon="card-account-details-outline"
                  color={colors.iconMuted}
                />
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('managerCreate.userRole')}</Text>
            <View style={styles.optionRow}>
              {ROLE_OPTIONS.map((item) => {
                const active = item === role;
                return (
                  <Pressable
                    key={item}
                    onPress={() => setRole(item)}
                    style={[
                      styles.optionButton,
                      active && styles.optionButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        active && styles.optionTextActive,
                      ]}
                    >
                      {t(`managerCreate.roles.${item}`)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('managerCreate.userTeam')}</Text>
            <View style={styles.optionRow}>
              <Pressable
                onPress={() => setSelectedTeamId(null)}
                style={[
                  styles.optionButton,
                  selectedTeamId === null && styles.optionButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedTeamId === null && styles.optionTextActive,
                  ]}
                >
                  {t('managerCreate.noTeam')}
                </Text>
              </Pressable>
              {teams.map((team) => {
                const active = team.id === selectedTeamId;
                return (
                  <Pressable
                    key={team.id}
                    onPress={() => setSelectedTeamId(team.id)}
                    style={[
                      styles.optionButton,
                      active && styles.optionButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        active && styles.optionTextActive,
                      ]}
                    >
                      {team.name}
                    </Text>
                  </Pressable>
                );
              })}
              {loadingTeams && (
                <Text style={styles.stateBody}>
                  {t('managerCreate.loadingTeams')}
                </Text>
              )}
            </View>
          </View>

          <Button
            mode="contained"
            icon={() => (
              <Icon source="account-plus" size={28} color="#FFFFFF" />
            )}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            contentStyle={styles.submitButtonContent}
            labelStyle={styles.submitButtonLabel}
            style={styles.submitButton}
          >
            {t('managerCreate.userSubmit')}
          </Button>
        </View>

        {temporaryPassword && (
          <View style={[styles.stateCard, styles.successCard]}>
            <View style={[styles.stateIconBg, styles.successIconBg]}>
              <Icon source="key-variant" size={24} color={colors.surface} />
            </View>
            <View style={styles.stateContent}>
              <Text style={styles.stateTitle}>
                {t('managerCreate.userSuccessTitle')}
              </Text>
              <Text style={styles.stateBody}>
                {t('managerCreate.userSuccessBody')}
              </Text>
              <View style={styles.passwordBox}>
                <Text style={styles.passwordText}>{temporaryPassword}</Text>
              </View>
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
