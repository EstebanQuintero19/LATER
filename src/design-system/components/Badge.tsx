import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../tokens';
import { Text } from './Text';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface BadgeProps {
  label: string;
  tone?: Tone;
}

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: toneBg[tone] }]}>
      <Text
        variant="caption"
        style={{ color: toneFg[tone], fontWeight: '600' }}
      >
        {label}
      </Text>
    </View>
  );
}

const toneBg: Record<Tone, string> = {
  neutral: colors.surfaceMuted,
  primary: '#E4ECF6',
  success: '#E3F3E7',
  warning: '#FBEFD9',
  danger: '#F8E3E3',
};

const toneFg: Record<Tone, string> = {
  neutral: colors.textSecondary,
  primary: colors.primaryStrong,
  success: colors.success,
  warning: '#9A6B1E',
  danger: colors.danger,
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
});
