import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { strings } from '@/i18n';
import { augmentedReality } from '@/services/native/augmentedReality';
import { scanner3d } from '@/services/native/scanner3d';

type Busy = null | '3d' | 'ar';

/**
 * Puente entre el catálogo y los módulos nativos (3D / RA) del equipo iOS.
 *
 * Comprueba disponibilidad y, cuando el módulo nativo no está presente
 * (Expo Go), ejecuta la simulación e informa al usuario con un aviso.
 */
export function useNativePreview() {
  const [busy, setBusy] = useState<Busy>(null);

  const startScan = useCallback(async (productId: string) => {
    setBusy('3d');
    try {
      const available = await scanner3d.isAvailable();
      const result = await scanner3d.startScan({ productId });
      if (!available) {
        Alert.alert(
          strings.native.scanUnavailableTitle,
          strings.native.scanUnavailableBody,
        );
      }
      return result;
    } finally {
      setBusy(null);
    }
  }, []);

  const openAr = useCallback(async (productId: string) => {
    setBusy('ar');
    try {
      const supported = await augmentedReality.isSupported();
      if (!supported) {
        Alert.alert(
          strings.native.arUnavailableTitle,
          strings.native.arUnavailableBody,
        );
      }
      await augmentedReality.presentPreview({ productId });
    } finally {
      setBusy(null);
    }
  }, []);

  return { busy, startScan, openAr };
}
