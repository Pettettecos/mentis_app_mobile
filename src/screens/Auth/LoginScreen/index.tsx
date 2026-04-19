import { useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientText } from '../../../components';
import MentisLogo from '../../../../assets/logo.png';
import { styles } from './styles';

export const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.inner,
            { paddingTop: insets.top, paddingBottom: insets.bottom + 20 },
          ]}
        >
          <View style={styles.logoContainer}>
            <Image
              source={MentisLogo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.header}>
            <GradientText text="MentisTech" style={{ fontSize: 48 }} />
            <Text variant="labelSmall" style={styles.tagline}>
              Sua jornada para o bem-estar mental começa aqui
            </Text>
          </View>

          <Surface style={styles.card} elevation={1}>
            <View style={styles.cardHeader}>
              <Text variant="headlineSmall" style={styles.cardTitle}>
                Acesse sua conta
              </Text>
              <Text variant="bodySmall" style={styles.cardSubtitle}>
                Insira suas credenciais abaixo
              </Text>
            </View>

            <View style={styles.form}>
              <TextInput
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                dense
                outlineColor="#E2E8F0"
                activeOutlineColor="#1A90B9"
                placeholder="exemplo@mentistech.com"
                style={styles.input}
                outlineStyle={styles.inputOutline}
                left={
                  <TextInput.Icon
                    icon="email-outline"
                    size={20}
                    color="#94A3B8"
                  />
                }
              />

              <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                dense
                outlineColor="#E2E8F0"
                activeOutlineColor="#1A90B9"
                secureTextEntry={!showPassword}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                left={
                  <TextInput.Icon
                    icon="lock-outline"
                    size={20}
                    color="#94A3B8"
                  />
                }
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#1A90B9"
                    onPress={() => setShowPassword(!showPassword)}
                    forceTextInputFocus={false}
                  />
                }
              />

              <View style={styles.formActions}>
                <TouchableRipple onPress={() => {}} rippleColor="transparent">
                  <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                </TouchableRipple>
              </View>

              <Button
                mode="contained"
                onPress={() => console.log('Login:', email)}
                buttonColor="#8523D4"
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
              >
                ENTRAR
              </Button>
            </View>
          </Surface>

          <View style={styles.footer}>
            <Text variant="labelSmall" style={styles.footerText}>
              © 2026 MentisTech • v1.0.0
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
