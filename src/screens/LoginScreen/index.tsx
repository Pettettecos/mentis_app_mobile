import React, { useRef, useState } from 'react';
import { View, Image } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  TouchableRipple,
  Surface,
  ActivityIndicator,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { GradientText } from '@/components';
import MentisLogo from '../../../assets/logo.png';
import { styles } from './styles';
import { colors } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

export function LoginScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { login: authLogin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoginError(null);
    setLoading(true);
    try {
      await authLogin(data);
      router.replace('/(protected)');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setLoginError(t('login.error.invalidCredentials'));
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
    <View style={styles.container}>
      <View style={[styles.logoSection, { paddingTop: insets.top + 40 }]}>
        <Image
          source={MentisLogo}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View style={styles.header}>
          <GradientText text={t('login.title')} style={{ fontSize: 48 }} />
          <Text variant="labelSmall" style={styles.tagline}>
            {t('login.tagline')}
          </Text>
        </View>

        <TouchableRipple
          style={styles.triggerArea}
          onPress={() => actionSheetRef.current?.show()}
          rippleColor="rgba(133, 35, 212, 0.1)"
        >
          <View style={styles.triggerContent}>
            <Text style={styles.triggerText}>{t('login.cardTitle')}</Text>
          </View>
        </TouchableRipple>
      </View>

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
          <Surface style={styles.card} elevation={0}>
            <View style={styles.cardHeader}>
              <Text variant="headlineSmall" style={styles.cardTitle}>
                {t('login.cardTitle')}
              </Text>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: t('login.validation.emailRequired'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('login.validation.emailInvalid'),
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    {...inputProps}
                    label={t('login.email')}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.email}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    left={
                      <TextInput.Icon
                        icon="email-outline"
                        size={20}
                        color={colors.iconMuted}
                      />
                    }
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}

              <Controller
                control={control}
                name="password"
                rules={{
                  required: t('login.validation.passwordRequired'),
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    {...inputProps}
                    label={t('login.password')}
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.password}
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
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}

              <View style={styles.formActions}>
                <TouchableRipple
                  onPress={() => {
                    actionSheetRef.current?.hide();
                    router.push('/(public)/forgot-password');
                  }}
                  rippleColor="transparent"
                >
                  <Text style={styles.forgotText}>
                    {t('login.forgotPassword')}
                  </Text>
                </TouchableRipple>
              </View>

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                buttonColor={colors.accent}
                style={styles.loginButton}
                labelStyle={{ fontWeight: '800' }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  t('login.enter')
                )}
              </Button>

              {loginError && (
                <Text style={styles.loginErrorText}>{loginError}</Text>
              )}
            </View>
          </Surface>

          <View style={styles.footer}>
            <Text variant="labelSmall" style={styles.footerText}>
              {t('login.footer')}
            </Text>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
}
