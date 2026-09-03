import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { colors, fonts, radii, spacing, typography } from '../tokens';
import { Text } from './Text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
}

type FocusHandler = NonNullable<TextInputProps['onFocus']>;
type BlurHandler = NonNullable<TextInputProps['onBlur']>;

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, hint, style, onFocus, onBlur, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);

  const handleFocus: FocusHandler = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: BlurHandler = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text variant="label" color="textSecondary" style={styles.label}>
          {label}
        </Text>
      ) : null}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          typography.body,
          focused && styles.inputFocused,
          !!error && styles.inputError,
          style,
        ]}
        accessibilityLabel={label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {error ? (
        <Text variant="caption" color="danger" style={styles.helper}>
          {error}
        </Text>
      ) : hint ? (
        <Text variant="caption" color="textMuted" style={styles.helper}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { alignSelf: 'stretch', gap: spacing.xs },
  label: { marginLeft: spacing.xs },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 1,
    color: colors.textPrimary,
    fontFamily: fonts.sansRegular,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundRaised,
  },
  inputError: { borderColor: colors.danger },
  helper: { marginLeft: spacing.xs },
});
