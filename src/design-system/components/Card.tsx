import { Pressable, StyleSheet, View, ViewProps } from 'react-native';

import { colors, radii, spacing } from '../tokens';

export interface CardProps extends ViewProps {
  onPress?: () => void;
  padded?: boolean;
}

export function Card({
  onPress,
  padded = true,
  style,
  children,
  ...rest
}: CardProps) {
  const content = (
    <View style={[styles.card, padded && styles.padded, style]} {...rest}>
      {children}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    // Sin sombra: superficie plana, tono sobre tono, con filete de acento arriba.
    borderTopWidth: 2,
    borderTopColor: colors.borderAccent,
  },
  padded: { padding: spacing.lg },
  pressed: { opacity: 0.96, transform: [{ scale: 0.992 }] },
});
