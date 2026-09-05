import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Button,
  Input,
  Row,
  Screen,
  Text,
  Thumbnail,
  colors,
  spacing,
  webCanvasMaxWidth,
} from '@/design-system';
import { strings } from '@/i18n';
import type { RootStackScreenProps } from '@/app/navigation/types';

import { useSession } from '../hooks/useSession';

const EMAIL_RE = /.+@.+\..+/;

export function RegisterScreen({
  navigation,
}: RootStackScreenProps<'Register'>) {
  const { register, isBusy, error, clearError } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const nameError =
    touched && !name.trim() ? strings.register.requiredName : undefined;
  const emailError =
    touched && !EMAIL_RE.test(email)
      ? strings.register.invalidEmail
      : undefined;
  const passwordError =
    touched && password.length < 4
      ? strings.register.requiredPassword
      : undefined;
  const canSubmit =
    !!name.trim() && EMAIL_RE.test(email) && password.length >= 4 && !isBusy;

  const onSubmit = () => {
    setTouched(true);
    if (!canSubmit) return;
    register({
      name: name.trim(),
      email,
      password,
      address: address.trim() || undefined,
      phone: phone.trim() || undefined,
    });
  };

  return (
    <Screen scroll edges={['bottom']} contentStyle={styles.content}>
      <View style={styles.column}>
        <View style={styles.header}>
          <Thumbnail color={colors.borderAccent} icon="person-add" size="lg" />
          <Text variant="display" style={styles.title}>
            {strings.register.title}
          </Text>
          <Text variant="body" color="textSecondary" center>
            {strings.register.subtitle}
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label={strings.register.name}
            value={name}
            onChangeText={setName}
            onBlur={() => setTouched(true)}
            autoComplete="name"
            error={nameError}
          />
          <Input
            label={strings.register.email}
            value={email}
            onChangeText={setEmail}
            onBlur={() => setTouched(true)}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            inputMode="email"
            error={emailError}
          />
          <Input
            label={strings.register.password}
            value={password}
            onChangeText={setPassword}
            onBlur={() => setTouched(true)}
            secureTextEntry
            autoComplete="new-password"
            error={passwordError}
          />
          <Input
            label={strings.register.address}
            placeholder={strings.register.addressPlaceholder}
            value={address}
            onChangeText={setAddress}
            autoComplete="street-address"
          />
          <Input
            label={strings.register.phone}
            placeholder={strings.register.phonePlaceholder}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
          />

          {error ? (
            <Text variant="caption" color="danger">
              {error}
            </Text>
          ) : null}

          <Button
            title={
              isBusy ? strings.register.submitting : strings.register.submit
            }
            onPress={onSubmit}
            loading={isBusy}
            disabled={!canSubmit}
            fullWidth
            size="lg"
          />

          <Row justify="center" gap="xs">
            <Text variant="caption" color="textSecondary">
              {strings.auth.hasAccount}
            </Text>
            <Text
              variant="caption"
              color="accent"
              onPress={() => navigation.navigate('Login')}
            >
              {strings.auth.goToLogin}
            </Text>
          </Row>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  column: { width: '100%', maxWidth: webCanvasMaxWidth, gap: spacing.xxl },
  header: { alignItems: 'center', gap: spacing.sm },
  title: { marginTop: spacing.sm },
  form: { gap: spacing.lg },
});
