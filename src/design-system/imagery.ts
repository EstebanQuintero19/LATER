/**
 * Fotografía de la app.
 *
 * Vive fuera de `tokens.ts` porque no es un token de diseño: es contenido. Los
 * puntos de uso (`ProjectCard`, `ProductCard`, `WelcomeScreen`…) piden una
 * imagen por semilla, ancho y tema, y este módulo decide de dónde sale.
 *
 * PENDIENTE (fase 3): sustituir la fuente aleatoria por un mapa explícito
 * `semilla -> foto`, porque hoy el tema no acierta el contenido — el hero de un
 * estudio de interiorismo sale una estatua de un oso, y "Módulo alto roble
 * natural" sale una mujer con un portátil. Los puntos de uso no cambian.
 */

/**
 * Temas de imagen: cada uno debería resolver a fotografía afín al rubro
 * (interiorismo/reforma), no a una foto aleatoria sin relación con el contenido.
 */
export const imageThemes = {
  hero: 'interior,livingroom',
  interior: 'interior,architecture',
  renovation: 'renovation,construction',
  surfaces: 'marble,stone',
  fixtures: 'faucet,bathroom',
  furniture: 'furniture,interior',
  lighting: 'lamp,lighting',
} as const;

export type ImageTheme = keyof typeof imageThemes;

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % 10000;
}

/**
 * URL de imagen estable (misma semilla -> misma foto) y temática según el rubro.
 */
export function dummyImage(
  seed: string,
  width: number,
  height: number,
  theme: ImageTheme = 'interior',
): string {
  const lock = hashSeed(seed);
  return `https://loremflickr.com/g/${width}/${height}/${imageThemes[theme]}?lock=${lock}`;
}
