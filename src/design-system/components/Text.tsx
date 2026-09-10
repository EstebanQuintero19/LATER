import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';

import { useResponsive } from '../hooks/useResponsive';
import {
  colors,
  typography,
  typographyDesktop,
  TypographyVariant,
} from '../tokens';

export interface AppTextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: keyof typeof colors;
  center?: boolean;
}

/**
 * Texto tipado del sistema de diseño. Encapsula las variantes tipográficas
 * para que las pantallas no repitan tamaños ni pesos de fuente.
 *
 * En escritorio los niveles expresivos (`hero`, `display`, `title`…) suben de
 * tamaño con `typographyDesktop`: antes `hero` medía 40 px igual en un móvil
 * que en un monitor de 27". El texto de lectura no cambia.
 */
export function Text({
  variant = 'body',
  color = 'textPrimary',
  center = false,
  style,
  ...rest
}: AppTextProps) {
  const { isDesktop } = useResponsive();
  const scaled = isDesktop ? typographyDesktop[variant] : undefined;

  return (
    <RNText
      style={[
        typography[variant],
        scaled,
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
