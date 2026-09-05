import { type ReactNode } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  Button,
  Card,
  Row,
  Screen,
  Text,
  Thumbnail,
  colors,
  contentMaxWidth,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';

import { useSession } from '../hooks/useSession';

export function ProfileScreen() {
  const { user, signOut } = useSession();

  const confirmSignOut = () =>
    Alert.alert(strings.auth.signOut, strings.auth.signOutPrompt, [
      { text: strings.common.cancel, style: 'cancel' },
      { text: strings.auth.signOut, style: 'destructive', onPress: signOut },
    ]);

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.column}>
        <View style={styles.header}>
          <Thumbnail color={colors.borderAccent} icon="person" size="lg" />
          <Text variant="title">{user?.name ?? strings.profile.title}</Text>
          <Text variant="body" color="textSecondary">
            {user?.email}
          </Text>
        </View>

        <Card padded={false}>
          <DetailRow label={strings.profile.name}>
            <Text variant="bodyStrong">{user?.name}</Text>
          </DetailRow>
          <View style={styles.hr} />
          <DetailRow label={strings.profile.email}>
            <Text variant="bodyStrong">{user?.email}</Text>
          </DetailRow>
          <View style={styles.hr} />
          <DetailRow label={strings.profile.address}>
            <Text variant="bodyStrong">
              {user?.address ?? strings.profile.notProvided}
            </Text>
          </DetailRow>
          <View style={styles.hr} />
          <DetailRow label={strings.profile.phone}>
            <Text variant="bodyStrong">
              {user?.phone ?? strings.profile.notProvided}
            </Text>
          </DetailRow>
        </Card>

        <Button
          title={strings.profile.signOut}
          variant="secondary"
          leftIcon={
            <Ionicons
              name="log-out-outline"
              size={18}
              color={colors.primaryStrong}
            />
          }
          onPress={confirmSignOut}
          fullWidth
        />
      </View>
    </Screen>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Row justify="space-between" align="flex-start" style={styles.row}>
      <Text variant="label" color="textMuted">
        {label}
      </Text>
      {children}
    </Row>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center' },
  column: { width: '100%', maxWidth: contentMaxWidth, gap: spacing.lg },
  header: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing.lg },
  row: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  hr: { height: 1, backgroundColor: colors.border },
});
