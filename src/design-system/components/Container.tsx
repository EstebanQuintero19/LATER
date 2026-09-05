import { StyleSheet, View, ViewProps } from 'react-native';

export interface ContainerProps extends ViewProps {
  /** Ancho máximo del contenido; por debajo de ese ancho ocupa el 100%. */
  maxWidth: number;
}

/**
 * Centra su contenido con un ancho máximo. Para pantallas anchas (web/tablet),
 * evita que listas y formularios se estiren a sangre en monitores grandes.
 */
export function Container({
  maxWidth,
  style,
  children,
  ...rest
}: ContainerProps) {
  return (
    <View style={[styles.base, { maxWidth }, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { width: '100%', alignSelf: 'center' },
});
