/**
 * Interfaz del módulo nativo de REALIDAD AUMENTADA.
 *
 * El equipo iOS provee la vista AR nativa (ARKit / RealityKit) que coloca el
 * modelo 3D del producto en el espacio del usuario. El frontend sólo necesita
 * este contrato para lanzarla desde el catálogo.
 */

export interface ArPreviewOptions {
  productId: string;
  /** URI del modelo (.usdz / .reality) a renderizar. */
  modelUri?: string;
}

export interface AugmentedReality {
  isSupported(): Promise<boolean>;
  /** Abre la experiencia AR a pantalla completa. Resuelve al cerrarse. */
  presentPreview(options: ArPreviewOptions): Promise<{ dismissed: true }>;
}

const simulatedAr: AugmentedReality = {
  async isSupported() {
    return false;
  },
  async presentPreview() {
    await new Promise((r) => setTimeout(r, 800));
    return { dismissed: true };
  },
};

// TODO(nativo/iOS): reemplazar por el binding del módulo AR del equipo iOS.
export const augmentedReality: AugmentedReality = simulatedAr;
