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
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    // Sombra suave y cálida (elevación editorial).
    shadowColor: '#3B2A1E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  padded: { padding: spacing.lg },
  pressed: { opacity: 0.96, transform: [{ scale: 0.992 }] },
});
