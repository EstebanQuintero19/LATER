import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import { colors, typography, TypographyVariant } from '../tokens';

export interface AppTextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: keyof typeof colors;
  center?: boolean;
}

/**
 * Texto tipado del sistema de diseño. Encapsula las variantes tipográficas
 * para que las pantallas no repitan tamaños ni pesos de fuente.
 */
export function Text({
  variant = 'body',
  color = 'textPrimary',
  center = false,
  style,
  ...rest
}: AppTextProps) {
  return (
    <RNText
      style={[
        typography[variant],
        { color: colors[color] },
        center && styles.center,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
});
