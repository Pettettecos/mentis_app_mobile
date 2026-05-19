import React, { useRef, useState } from 'react';
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
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { GradientText } from '../../components';
import { colors } from '../../theme/colors';
import { styles } from './styles';

export function ResetPasswordScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleReset = () => {
    setError('');

    if (newPassword.length < 6) {
      setError(t('resetPassword.passwordMinLength'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('resetPassword.passwordMismatch'));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
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
            onPress={() => router.back()}
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
            {success ? (
              <>
                <View style={styles.successIcon}>
                  <IconButton
                    icon="check-circle"
                    size={40}
                    iconColor={colors.success}
                  />
                </View>

                <Text
                  variant="headlineSmall"
                  style={[styles.cardTitle, { textAlign: 'center' }]}
                >
                  {t('resetPassword.successTitle')}
                </Text>

                <View style={styles.form}>
                  <Text
                    variant="bodyMedium"
                    style={[styles.description, { marginBottom: 32 }]}
                  >
                    {t('resetPassword.successMessage')}
                  </Text>

                  <Button
                    mode="contained"
                    onPress={() => router.replace('/(public)/login')}
                    buttonColor={colors.primary}
                    style={styles.loginButton}
                    labelStyle={styles.buttonLabel}
                  >
                    {t('resetPassword.goToLogin')}
                  </Button>
                </View>
              </>
            ) : (
              <>
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
              </>
            )}
          </Surface>
        </View>
      </ScrollView>

      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        closeOnPressBack
        keyboardHandlerEnabled
        drawUnderStatusBar={false}
        containerStyle={styles.sheetContainer}
        indicatorStyle={{ display: 'none' }}
      >
        <View
          style={[styles.sheetContent, { paddingBottom: insets.bottom + 20 }]}
        >
          <Text>Content</Text>
        </View>
      </ActionSheet>
    </KeyboardAvoidingView>
  );
}
