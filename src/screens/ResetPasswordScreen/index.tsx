import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Surface,
  IconButton,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import { GradientText } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/api';
import { colors } from '@/theme/colors';
import { styles } from './styles';

export function ResetPasswordScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { logout } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBackToLogin = async () => {
    await logout();
    router.replace('/(public)/login');
  };

  const handleReset = async () => {
    setError('');

    if (newPassword.length < 8) {
      setError(t('resetPassword.passwordMinLength'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('resetPassword.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      await userService.changeMyPassword({ new_password: newPassword });
      Toast.show({
        type: 'success',
        text1: t('resetPassword.successTitle'),
        text2: t('resetPassword.successMessage'),
        position: 'top',
        topOffset: 60,
        visibilityTime: 2500,
      });
      await logout();
      router.replace('/(public)/login');
    } catch (err: unknown) {
      const requestError = err as AxiosError<{ detail?: string }>;
      setError(
        requestError.response?.data?.detail ?? t('resetPassword.requestError')
      );
    } finally {
      setLoading(false);
    }
  };

  const inputProps = {
    mode: 'outlined' as const,
    dense: true,
    outlineColor: colors.outline,
    activeOutlineColor: colors.primary,
    outlineStyle: { borderRadius: 14, borderWidth: 1.5 },
    style: { marginBottom: 12, backgroundColor: colors.surface, height: 52 },
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.backButton, { top: insets.top + 10 }]}>
          <IconButton
            icon="arrow-left"
            iconColor={colors.primary}
            onPress={handleBackToLogin}
          />
        </View>

        <View style={styles.topSection}>
          <View style={styles.header}>
            <GradientText
              text={t('resetPassword.title')}
              style={{ fontSize: 32 }}
            />
          </View>

          <Surface style={styles.card} elevation={1}>
            <View style={styles.iconCircle}>
              <IconButton
                icon="shield-key"
                size={40}
                iconColor={colors.primary}
              />
            </View>

            <Text
              variant="headlineSmall"
              style={[styles.cardTitle, { textAlign: 'center' }]}
            >
              {t('resetPassword.cardTitle')}
            </Text>

            <View style={styles.form}>
              <Text variant="bodyMedium" style={styles.description}>
                {t('resetPassword.description')}
              </Text>

              {error && <Text style={styles.errorText}>{error}</Text>}

              <TextInput
                {...inputProps}
                label={t('resetPassword.newPassword')}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  setError('');
                }}
                secureTextEntry={!showPassword}
                left={
                  <TextInput.Icon
                    icon="lock-outline"
                    size={20}
                    color={colors.iconMuted}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={colors.iconActive}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              <TextInput
                {...inputProps}
                label={t('resetPassword.confirmPassword')}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError('');
                }}
                secureTextEntry={!showPassword}
                left={
                  <TextInput.Icon
                    icon="lock-check"
                    size={20}
                    color={colors.iconMuted}
                  />
                }
              />

              <Button
                mode="contained"
                onPress={handleReset}
                loading={loading}
                disabled={loading}
                buttonColor={colors.primary}
                style={styles.loginButton}
                labelStyle={styles.buttonLabel}
              >
                {t('resetPassword.save')}
              </Button>
            </View>
          </Surface>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
