import { useWindowDimensions } from 'react-native';

import { breakpoints, gridMaxWidth, gridMaxWidthWide } from '../tokens';

/**
 * Punto único para decidir layout según ancho de ventana. En web esto
 * reacciona al redimensionar la ventana; en móvil nativo casi siempre
 * devuelve `isTablet: false, isDesktop: false`.
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= breakpoints.tablet;
  const isDesktop = width >= breakpoints.desktop;
  const isWide = width >= breakpoints.wide;

  return {
    width,
    height,
    isTablet,
    isDesktop,
    isWide,
    /**
     * Columnas de rejilla por tramo. Un `gridMaxWidth` fijo con 3 columnas
     * dejaba ~65% del lienzo vacío en monitores anchos.
     */
    columns: isWide ? 4 : isDesktop ? 3 : isTablet ? 2 : 1,
    /** Caja de contenido para pantallas de rejilla. */
    gridWidth: isWide ? gridMaxWidthWide : gridMaxWidth,
  };
}
