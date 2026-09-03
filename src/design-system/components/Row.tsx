import { StyleSheet, View, ViewProps } from 'react-native';

import { spacing } from '../tokens';

export interface RowProps extends ViewProps {
  gap?: keyof typeof spacing;
  align?: 'center' | 'flex-start' | 'flex-end' | 'baseline';
  justify?:
    'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  wrap?: boolean;
}

/** Fila flex reutilizable para no repetir `flexDirection: 'row'` en cada pantalla. */
export function Row({
  gap = 'sm',
  align = 'center',
  justify = 'flex-start',
  wrap = false,
  style,
  ...rest
}: RowProps) {
  return (
    <View
      style={[
        styles.row,
        {
          gap: spacing[gap],
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? 'wrap' : 'nowrap',
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
});
