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
import { GradientText } from '@/components';
import { colors } from '@/theme/colors';
import { styles } from './styles';

export function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRecover = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
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
              text={t('forgotPassword.title')}
              style={{ fontSize: 32 }}
            />
          </View>

          <Surface style={styles.card} elevation={1}>
            <View style={styles.iconCircle}>
              <IconButton
                icon="lock-reset"
                size={40}
                iconColor={colors.primary}
              />
            </View>

            <Text
              variant="headlineSmall"
              style={[styles.cardTitle, { textAlign: 'center' }]}
            >
              {success
                ? t('forgotPassword.successTitle')
                : t('forgotPassword.cardTitle')}
            </Text>

            {success ? (
              <View style={styles.form}>
                <Text variant="bodyMedium" style={styles.description}>
                  {t('forgotPassword.successMessage', { email })}
                </Text>

                <Button
                  mode="contained"
                  onPress={() => router.push('/(public)/login')}
                  buttonColor={colors.primary}
                  style={[styles.loginButton, { marginTop: 10 }]}
                  labelStyle={styles.buttonLabel}
                >
                  {t('forgotPassword.backToLoginButton')}
                </Button>
              </View>
            ) : (
              <View style={styles.form}>
                <Text variant="bodyMedium" style={styles.description}>
                  {t('forgotPassword.description')}
                </Text>

                <TextInput
                  label={t('forgotPassword.email')}
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  outlineColor={colors.outline}
                  activeOutlineColor={colors.primary}
                  style={styles.input}
                  left={
                    <TextInput.Icon
                      icon="email-outline"
                      color={colors.iconMuted}
                    />
                  }
                />

                <Button
                  mode="contained"
                  onPress={handleRecover}
                  loading={loading}
                  disabled={loading}
                  buttonColor={colors.primary}
                  style={[styles.loginButton, { marginTop: 10 }]}
                  labelStyle={styles.buttonLabel}
                >
                  {t('forgotPassword.sendInstructions')}
                </Button>

                <Button
                  mode="text"
                  onPress={() => router.back()}
                  textColor={colors.primary}
                  style={{ marginTop: 10 }}
                >
                  {t('forgotPassword.backToLogin')}
                </Button>
              </View>
            )}
          </Surface>

          <View style={styles.tipCard}>
            <IconButton
              icon="lightbulb-outline"
              iconColor={colors.tipText}
              size={24}
            />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>
                {t('forgotPassword.tipTitle')}
              </Text>
              <Text style={styles.tipText}>{t('forgotPassword.tipText')}</Text>
            </View>
          </View>
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
