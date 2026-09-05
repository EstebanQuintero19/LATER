export interface GridFiller {
  id: string;
  filler: true;
}

/**
 * Completa la última fila de un grid de `FlatList` (`numColumns` > 1) con
 * celdas invisibles. Sin esto, cuando el número de elementos no es múltiplo
 * de `numColumns`, la última fila incompleta estira su(s) única(s) tarjeta(s)
 * a todo el ancho de la fila en vez de dejarlas del mismo tamaño que el resto.
 */
export function padForGrid<T extends { id: string }>(
  items: T[],
  numColumns: number,
): (T | GridFiller)[] {
  if (numColumns <= 1) return items;
  const remainder = items.length % numColumns;
  if (remainder === 0) return items;
  const fillers: GridFiller[] = Array.from(
    { length: numColumns - remainder },
    (_, i) => ({ id: `__filler_${i}`, filler: true }),
  );
  return [...items, ...fillers];
}

export function isGridFiller<T>(item: T | GridFiller): item is GridFiller {
  return (item as GridFiller).filler === true;
}
