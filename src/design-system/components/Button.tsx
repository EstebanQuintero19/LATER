import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colors, fonts, radii, spacing } from '../tokens';
import { Text } from './Text';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'md' | 'lg';

export interface ButtonProps extends Omit<
  PressableProps,
  'style' | 'children'
> {
  title: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        variantStyles[variant].container,
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].spinner} />
      ) : (
        <View style={styles.content}>
          {leftIcon}
          <Text style={[styles.label, { color: variantStyles[variant].label }]}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  md: { paddingVertical: spacing.md - 1, paddingHorizontal: spacing.lg },
  lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  fullWidth: { alignSelf: 'stretch' },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.985 }] },
  disabled: { opacity: 0.45 },
});

const variantStyles: Record<
  Variant,
  { container: object; label: string; spinner: string }
> = {
  primary: {
    container: { backgroundColor: colors.primary },
    label: colors.onPrimary,
    spinner: colors.onPrimary,
  },
  secondary: {
    container: { backgroundColor: colors.surface, borderColor: colors.border },
    label: colors.primaryStrong,
    spinner: colors.primaryStrong,
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    label: colors.primary,
    spinner: colors.primary,
  },
  danger: {
    container: { backgroundColor: colors.danger },
    label: colors.onPrimary,
    spinner: colors.onPrimary,
  },
};
