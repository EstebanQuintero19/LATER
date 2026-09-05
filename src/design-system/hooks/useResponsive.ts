import { useWindowDimensions } from 'react-native';

import { breakpoints } from '../tokens';

/**
 * Punto único para decidir layout según ancho de ventana. En web esto
 * reacciona al redimensionar la ventana; en móvil nativo casi siempre
 * devuelve `isTablet: false, isDesktop: false`.
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isTablet: width >= breakpoints.tablet,
    isDesktop: width >= breakpoints.desktop,
  };
}
