import { Dictionary, es } from './es';

export type Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es };

/**
 * Diccionario de textos del idioma activo.
 *
 * Uso: `import { strings } from '@/i18n'; strings.auth.title`
 * Se expone como objeto (no como función `t('a.b')`) para conservar el
 * autocompletado y la verificación de tipos de TypeScript.
 *
 * Sólo hay un idioma por ahora. Para soportar más: añadir `en.ts`, guardar la
 * preferencia y envolver el árbol en un contexto que reemplace este diccionario.
 */
export const strings: Dictionary = dictionaries.es;

export type { Dictionary };
