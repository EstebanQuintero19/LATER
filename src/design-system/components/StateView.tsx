import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { strings } from '@/i18n';

import { colors, spacing } from '../tokens';
import { Button } from './Button';
import { Text } from './Text';

export interface QueryStateViewProps {
  loading: boolean;
  error: unknown;
  onRetry?: () => void;
  children: ReactNode;
}

/**
 * Envuelve el resultado de una query de React Query y muestra estados
 * de carga / error de forma homogénea en toda la app.
 */
export function QueryStateView({
  loading,
  error,
  onRetry,
  children,
}: QueryStateViewProps) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text variant="subtitle" center>
          {strings.common.loadErrorTitle}
        </Text>
        <Text variant="body" color="textSecondary" center>
          {error instanceof Error ? error.message : strings.common.unknownError}
        </Text>
        {onRetry ? (
          <Button
            title={strings.common.retry}
            variant="secondary"
            onPress={onRetry}
          />
        ) : null}
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
});
