/**
 * Interfaz del módulo nativo de ESCANEO 3D.
 *
 * El equipo iOS desarrolla el módulo nativo real (LiDAR / ARKit Object Capture).
 * Esta capa define el contrato que consume el frontend y provee una
 * implementación simulada para Expo Go y para tests.
 *
 * Integración real (cuando exista el módulo):
 *   1. Añadir el paquete nativo (p. ej. `react-native-later-scanner`) o un
 *      config plugin de Expo.
 *   2. Sustituir `simulatedScanner3d` por el binding nativo aquí, sin tocar
 *      las pantallas.
 */

export interface Scan3dResult {
  /** Id del modelo generado, referenciable desde el backend. */
  modelId: string;
  /** URI local del archivo .usdz / .glb. */
  fileUri: string;
  /** Dimensiones aproximadas en metros. */
  boundingBox: { width: number; height: number; depth: number };
  capturedAt: string;
}

export interface Scanner3d {
  isAvailable(): Promise<boolean>;
  /** Lanza el flujo de captura y resuelve con el modelo resultante. */
  startScan(options?: { productId?: string }): Promise<Scan3dResult>;
}

const simulatedScanner3d: Scanner3d = {
  async isAvailable() {
    return false;
  },
  async startScan(options) {
    await new Promise((r) => setTimeout(r, 1200));
    return {
      modelId: `sim_${options?.productId ?? 'obj'}_${Date.now()}`,
      fileUri: 'file:///simulated/scan.usdz',
      boundingBox: { width: 0.6, height: 0.72, depth: 0.58 },
      capturedAt: new Date().toISOString(),
    };
  },
};

// TODO(nativo/iOS): reemplazar por el binding del módulo del equipo iOS.
export const scanner3d: Scanner3d = simulatedScanner3d;
