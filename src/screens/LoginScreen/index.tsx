import React, { useRef, useState } from 'react';
import { View, Image } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { GradientText } from '@/components';
import MentisLogo from '../../../assets/logo.png';
import { styles } from './styles';
import { colors } from '@/theme/colors';

export function LoginScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    actionSheetRef.current?.hide();
    router.push('/(auth)/reset-password');
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
              <TextInput
                {...inputProps}
                label={t('login.email')}
                value={email}
                onChangeText={setEmail}
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

              <TextInput
                {...inputProps}
                label={t('login.password')}
                value={password}
                onChangeText={setPassword}
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

              <View style={styles.formActions}>
                <TouchableRipple
                  onPress={() => {
                    actionSheetRef.current?.hide();
                    router.push('/(auth)/forgot-password');
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
                onPress={handleLogin}
                buttonColor={colors.accent}
                style={styles.loginButton}
                labelStyle={{ fontWeight: '800' }}
              >
                {t('login.enter')}
              </Button>
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
