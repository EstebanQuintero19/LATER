import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Button, Input, Screen, Text, spacing } from '@/design-system';
import { strings } from '@/i18n';

import { useSession } from '../hooks/useSession';

const EMAIL_RE = /.+@.+\..+/;

export function LoginScreen() {
  const { signIn, isBusy, error, clearError } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const emailError =
    touched && !EMAIL_RE.test(email) ? strings.auth.invalidEmail : undefined;
  const passwordError =
    touched && password.length === 0
      ? strings.auth.requiredPassword
      : undefined;
  const canSubmit = EMAIL_RE.test(email) && password.length > 0 && !isBusy;

  const onSubmit = () => {
    setTouched(true);
    if (!canSubmit) return;
    signIn({ email, password });
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/icon.png')}
          style={styles.logo}
        />
        <Text variant="display">{strings.auth.title}</Text>
        <Text variant="body" color="textSecondary">
          {strings.auth.subtitle}
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label={strings.auth.email}
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
          label={strings.auth.password}
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched(true)}
          secureTextEntry
          autoComplete="current-password"
          error={passwordError}
          onSubmitEditing={onSubmit}
          returnKeyType="go"
        />

        {error ? (
          <Text variant="caption" color="danger">
            {error}
          </Text>
        ) : null}

        <Button
          title={isBusy ? strings.auth.signingIn : strings.auth.submit}
          onPress={onSubmit}
          loading={isBusy}
          disabled={!canSubmit}
          fullWidth
          size="lg"
        />

        <Text variant="caption" color="textMuted" center>
          {strings.auth.demoHint}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'center', gap: spacing.xxl },
  header: { alignItems: 'center', gap: spacing.sm },
  logo: { width: 64, height: 64, borderRadius: 16, marginBottom: spacing.sm },
  form: { gap: spacing.lg },
});
