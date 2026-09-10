import { Pressable, StyleSheet, View, ViewProps } from 'react-native';

import { colors, radii, spacing } from '../tokens';

export interface CardProps extends ViewProps {
  onPress?: () => void;
  padded?: boolean;
  /** Filete de acento superior. Reservado a lo que de verdad destaca. */
  accent?: boolean;
}

export function Card({
  onPress,
  padded = true,
  accent = false,
  style,
  children,
  ...rest
}: CardProps) {
  const content = (
    <View
      style={[styles.card, accent && styles.accent, padded && styles.padded, style]}
      {...rest}
    >
      {children}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      // `style` también debe llegar aquí: es el hijo real dentro de un padre
      // flex (p. ej. una celda de grid con `flex: 1`), no sólo la `View` interna.
      style={({ pressed }) => [style, pressed && styles.pressed]}
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
    // Superficie plana, tono sobre tono. El filete de acento se pide con
    // `accent`: cuando lo llevaban todas las tarjetas por igual dejaba de
    // señalar nada y sólo añadía ruido.
  },
  accent: { borderTopWidth: 2, borderTopColor: colors.borderAccent },
  padded: { padding: spacing.lg },
  pressed: { opacity: 0.96, transform: [{ scale: 0.992 }] },
});
