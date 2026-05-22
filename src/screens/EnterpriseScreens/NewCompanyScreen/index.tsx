import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { styles } from './styles';
import { colors } from '@/theme/colors';

export function NewCompanyScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [loading, _setLoading] = useState(false);

  const handleSubmit = () => {
    // TODO: implementar cadastro de nova empresa
  };

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
            <View style={styles.logoCircle}>
              <Icon
                source="camera-plus-outline"
                size={32}
                color={colors.iconMuted}
              />
            </View>
            <Text style={styles.logoLabel}>{t('newCompany.logoLabel')}</Text>
            <Text style={styles.logoHint}>{t('newCompany.logoHint')}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('newCompany.companyName')}</Text>
            <TextInput
              value={companyName}
              onChangeText={setCompanyName}
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
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('newCompany.cnpj')}</Text>
            <TextInput
              value={cnpj}
              onChangeText={setCnpj}
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
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t('newCompany.contactName')}</Text>
            <TextInput
              value={contactName}
              onChangeText={setContactName}
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
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t('newCompany.contactPhone')}
            </Text>
            <TextInput
              value={contactPhone}
              onChangeText={setContactPhone}
              placeholder={t('newCompany.contactPhonePlaceholder')}
              mode="flat"
              style={styles.input}
              keyboardType="phone-pad"
              left={
                <TextInput.Icon icon="phone-outline" color={colors.iconMuted} />
              }
            />
          </View>

          <Button
            mode="contained"
            icon={() => <Icon source="store-plus" size={28} color="#FFFFFF" />}
            onPress={handleSubmit}
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
