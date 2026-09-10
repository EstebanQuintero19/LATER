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
  fonts,
  spacing,
  webCanvasMaxWidth,
} from '@/design-system';
import { strings } from '@/i18n';
import type { RootStackScreenProps } from '@/app/navigation/types';

import { useSession } from '../hooks/useSession';

const EMAIL_RE = /.+@.+\..+/;

export function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
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
    <Screen scroll edges={['bottom']} contentStyle={styles.content}>
      <View style={styles.column}>
        <View style={styles.header}>
          <Thumbnail color={colors.borderAccent} icon="home" size="lg" />
          <View style={styles.brandLine}>
            <Text style={styles.wordmark}>LATER</Text>
            <View style={styles.dot} />
          </View>
          <Text variant="display" style={styles.title}>
            {strings.auth.title}
          </Text>
          <Text variant="body" color="textSecondary" center>
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

          <Row justify="center" gap="xs">
            <Text variant="caption" color="textSecondary">
              {strings.auth.noAccount}
            </Text>
            <Text
              variant="caption"
              color="accent"
              onPress={() => navigation.navigate('Register')}
            >
              {strings.auth.goToRegister}
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
  brandLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    marginTop: spacing.xs,
  },
  wordmark: {
    fontFamily: fonts.black,
    fontSize: 26,
    letterSpacing: -0.5,
    color: colors.textPrimary,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginBottom: 6,
  },
  title: { marginTop: spacing.sm },
  form: { gap: spacing.lg },
});
