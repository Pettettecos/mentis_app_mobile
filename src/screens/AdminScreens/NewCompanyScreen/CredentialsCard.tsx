import { View } from 'react-native';
import { useState } from 'react';
import { Card, Text, Button, Icon } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';
import { styles } from './styles';
import { colors } from '@/theme/colors';

interface CredentialsCardProps {
  email: string;
  password: string;
  onGoToCompanies: () => void;
  onCreateAnother: () => void;
}

export function CredentialsCard({
  email,
  password,
  onGoToCompanies,
  onCreateAnother,
}: CredentialsCardProps) {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<
    'email' | 'password' | null
  >(null);

  const copyToClipboard = async (
    text: string,
    field: 'email' | 'password'
  ) => {
    await Clipboard.setStringAsync(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <View style={styles.credentialsContainer}>
      <Icon source="check-circle" size={48} color={colors.success} />
      <Text style={styles.successTitle}>{t('newCompany.successTitle')}</Text>
      <Text style={styles.successBody}>{t('newCompany.successBody')}</Text>

      <Card style={styles.credentialsCard}>
        <Card.Content>
          <Text style={styles.credentialsTitle}>
            {t('newCompany.credentialsTitle')}
          </Text>

          <View style={styles.credentialRow}>
            <View style={styles.credentialInfo}>
              <Text style={styles.credentialLabel}>
                {t('newCompany.email')}
              </Text>
              <Text style={styles.credentialValue} selectable>
                {email}
              </Text>
            </View>
            <Button
              mode="text"
              compact
              onPress={() => copyToClipboard(email, 'email')}
              icon={copiedField === 'email' ? 'check' : 'content-copy'}
              style={styles.copyButton}
              labelStyle={styles.copyButtonLabel}
            >
              {copiedField === 'email'
                ? t('newCompany.copied')
                : t('newCompany.copyEmail')}
            </Button>
          </View>

          <View style={styles.credentialRow}>
            <View style={styles.credentialInfo}>
              <Text style={styles.credentialLabel}>
                {t('newCompany.password')}
              </Text>
              <Text style={styles.credentialValue} selectable>
                {password}
              </Text>
            </View>
            <Button
              mode="text"
              compact
              onPress={() => copyToClipboard(password, 'password')}
              icon={copiedField === 'password' ? 'check' : 'content-copy'}
              style={styles.copyButton}
              labelStyle={styles.copyButtonLabel}
            >
              {copiedField === 'password'
                ? t('newCompany.copied')
                : t('newCompany.copyPassword')}
            </Button>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.credentialsActions}>
        <Button
          mode="outlined"
          onPress={onCreateAnother}
          icon="plus"
          style={styles.secondaryButton}
        >
          {t('newCompany.createAnother')}
        </Button>
        <Button
          mode="contained"
          onPress={onGoToCompanies}
          icon="office-building"
          style={styles.primaryButton}
        >
          {t('newCompany.goToCompanies')}
        </Button>
      </View>
    </View>
  );
}
