import { StyleSheet, View } from 'react-native';

import { colors, fonts, radii, spacing } from '../tokens';
import { Text } from './Text';

type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface BadgeProps {
  label: string;
  tone?: Tone;
}

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: toneBg[tone] }]}>
      <Text style={[styles.text, { color: toneFg[tone] }]}>{label}</Text>
    </View>
  );
}

const toneBg: Record<Tone, string> = {
  neutral: colors.surfaceMuted,
  primary: colors.primarySoft,
  success: colors.successSoft,
  warning: colors.warningSoft,
  danger: colors.dangerSoft,
};

const toneFg: Record<Tone, string> = {
  neutral: colors.textSecondary,
  primary: colors.primaryStrong,
  success: colors.success,
  warning: colors.warningInk,
  danger: colors.danger,
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radii.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
  },
});
