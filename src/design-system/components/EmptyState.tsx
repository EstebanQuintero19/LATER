import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../tokens';
import { Button } from './Button';
import { Text } from './Text';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon = 'sparkles-outline',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color={colors.primary} />
      </View>
      <Text variant="subtitle" center>
        {title}
      </Text>
      {description ? (
        <Text variant="body" color="textSecondary" center style={styles.desc}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button title={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    marginBottom: spacing.xs,
  },
  desc: { maxWidth: 280 },
});
