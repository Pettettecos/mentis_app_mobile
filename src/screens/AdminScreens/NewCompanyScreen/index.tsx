import { ScrollView, View, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { styles } from './styles';
import { colors } from '@/theme/colors';
import { sponsorService } from '@/services/api';
import { useRouter } from 'expo-router';
import { CredentialsCard } from './CredentialsCard';

interface NewCompanyForm {
  companyName: string;
  cnpj: string;
  contactName: string;
  contactPhone: string;
}

function generateTempPassword(): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
  let password = 'Admin@';
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function generateAdminUsername(name: string): string {
  return `admin-${name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 20)}`;
}

async function imageToPngBase64(uri: string): Promise<string> {
  const { uri: pngUri } = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 256 } }],
    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
  );

  // eslint-disable-next-line no-undef
  const response = await fetch(pngUri);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new globalThis.FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(blob);
  });
}

export function NewCompanyScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [createdCredentials, setCreatedCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const { control, handleSubmit, reset } = useForm<NewCompanyForm>({
    defaultValues: {
      companyName: '',
      cnpj: '',
      contactName: '',
      contactPhone: '',
    },
  });

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('newCompany.errorTitle'));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setLogoUri(uri);
      const base64 = await imageToPngBase64(uri);
      setLogoBase64(base64);
    }
  };

  const onSubmit = async (data: NewCompanyForm) => {
    if (!logoBase64) {
      Alert.alert(
        t('newCompany.errorTitle'),
        t('newCompany.validationRequired')
      );
      return;
    }

    setLoading(true);
    try {
      const password = generateTempPassword();
      const username = generateAdminUsername(data.companyName);
      const email = `admin@${data.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

      await sponsorService.createSponsor({
        name: data.companyName.trim(),
        cnpj: data.cnpj.trim(),
        logo: logoBase64,
        user: {
          username,
          email,
          phone_number: data.contactPhone.trim(),
          document: null,
          password,
          role: 'ADMIN',
          tasks: ['resetPassword'],
        },
      });

      setCreatedCredentials({ email, password });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      Alert.alert(t('newCompany.errorTitle'), t('newCompany.errorBody'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoToCompanies = () => {
    router.replace('/(protected)/(admin)/dashboard');
  };

  const handleCreateAnother = () => {
    setCreatedCredentials(null);
    setLogoUri(null);
    setLogoBase64(null);
    reset({
      companyName: '',
      cnpj: '',
      contactName: '',
      contactPhone: '',
    });
  };

  if (createdCredentials) {
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom + 45 }]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <CredentialsCard
            email={createdCredentials.email}
            password={createdCredentials.password}
            onGoToCompanies={handleGoToCompanies}
            onCreateAnother={handleCreateAnother}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 45 }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t('newCompany.title')}</Text>
        <Text style={styles.subtitle}>{t('newCompany.subtitle')}</Text>

        <View style={styles.formCard}>
          <View style={styles.logoUpload}>
            <Button
              mode="contained"
              onPress={handlePickImage}
              icon="camera-plus-outline"
              style={styles.logoButton}
            >
              {logoUri
                ? t('newCompany.changeLogo')
                : t('newCompany.uploadLogo')}
            </Button>
            {logoUri && (
              <Image source={{ uri: logoUri }} style={styles.logoPreview} />
            )}
            <Text style={styles.logoHint}>{t('newCompany.logoHint')}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('newCompany.companyName')}</Text>
            <Controller
              control={control}
              name="companyName"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('newCompany.companyNamePlaceholder')}
                  mode="flat"
                  style={styles.input}
                  left={
                    <TextInput.Icon
                      icon="office-building"
                      color={colors.iconMuted}
                    />
                  }
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('newCompany.cnpj')}</Text>
            <Controller
              control={control}
              name="cnpj"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('newCompany.cnpjPlaceholder')}
                  mode="flat"
                  style={styles.input}
                  keyboardType="numeric"
                  left={
                    <TextInput.Icon
                      icon="card-account-details"
                      color={colors.iconMuted}
                    />
                  }
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('newCompany.contactName')}</Text>
            <Controller
              control={control}
              name="contactName"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('newCompany.contactNamePlaceholder')}
                  mode="flat"
                  style={styles.input}
                  left={
                    <TextInput.Icon
                      icon="account-outline"
                      color={colors.iconMuted}
                    />
                  }
                />
              )}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('newCompany.contactPhone')}
            </Text>
            <Controller
              control={control}
              name="contactPhone"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('newCompany.contactPhonePlaceholder')}
                  mode="flat"
                  style={styles.input}
                  keyboardType="phone-pad"
                  left={
                    <TextInput.Icon
                      icon="phone-outline"
                      color={colors.iconMuted}
                    />
                  }
                />
              )}
            />
          </View>

          <Button
            mode="contained"
            icon={() => <Icon source="store-plus" size={28} color="#FFFFFF" />}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            contentStyle={styles.submitButtonContent}
            labelStyle={styles.submitButtonLabel}
            style={styles.submitButton}
          >
            {t('newCompany.submitButton')}
          </Button>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconBg}>
            <Icon source="auto-fix" size={24} color={colors.surface} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>{t('newCompany.infoTitle')}</Text>
            <Text style={styles.infoBody}>
              {t('newCompany.infoBody')}{' '}
              <Text style={styles.infoBold}>
                {t('newCompany.infoBodyBold')}
              </Text>
              {t('newCompany.infoBodyEnd')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
