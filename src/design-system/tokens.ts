/**
 * Tokens del sistema de diseño.
 *
 * Punto único de verdad para color, espaciado, tipografía y radios.
 * Las pantallas y componentes NO deben usar valores mágicos: siempre `theme.*`.
 *
 * Estética "interiorismo / arquitectura": lienzo lino, superficies porcelana,
 * un único acento camello y tinta espresso. Tono sobre tono, sin tarjeta blanca
 * sobre gris; titulares en serif (Fraunces), interfaz en Manrope, esquinas
 * poco redondeadas.
 */

const palette = {
  // Paleta base (4 neutros cálidos dados) + derivados imprescindibles.
  porcelain: '#F9F8F6', // el más claro
  linen: '#EFE9E3', // lienzo de página
  clay: '#D9CFC7', // separadores / bordes
  camel: '#C9B59C', // acento (único color)

  // Derivados de la paleta (mismas familias, distinta luminosidad).
  linenDeep: '#E6DED5',
  camelDeep: '#A8895E', // acento legible como texto (~4.5:1 sobre porcelana)
  camelTint: '#E4D9C9',

  // Tinta espresso cálida (la paleta no aporta oscuros).
  espresso: '#26221E',
  espressoSoft: '#5F564C',
  espressoMuted: '#938779',
  white: '#FFFFFF',

  // Semánticos terrosos, desaturados para convivir con los neutros.
  moss: '#5B7355',
  mossSoft: '#E1E5D8',
  amber: '#A9803B',
  amberSoft: '#EFE3CC',
  amberInk: '#6E5322',
  brick: '#9B4A3B',
  brickSoft: '#ECD9D2',
} as const;

export const colors = {
  background: palette.linen,
  backgroundRaised: '#F3EEE9',
  surface: palette.porcelain,
  surfaceMuted: palette.linenDeep,
  border: palette.clay,
  borderAccent: palette.camel,

  primary: palette.espresso,
  primaryStrong: palette.espresso,
  primarySoft: palette.camelTint,
  onPrimary: palette.porcelain,

  accent: palette.camelDeep,
  accentSoft: palette.camelTint,

  textPrimary: palette.espresso,
  textSecondary: palette.espressoSoft,
  textMuted: palette.espressoMuted,

  success: palette.moss,
  successSoft: palette.mossSoft,
  warning: palette.amber,
  warningSoft: palette.amberSoft,
  warningInk: palette.amberInk,
  danger: palette.brick,
  dangerSoft: palette.brickSoft,

  focusRing: palette.camel,
} as const;

/** Tintes tonales para fallbacks decorativos (cuando no hay imagen). */
export const swatches = [
  '#C9B59C',
  '#D9CFC7',
  '#B8A78E',
  '#A8895E',
  '#8C7A67',
  '#6F6353',
] as const;

/** URL de imagen dummy estable a partir de una semilla (proyectos, productos…). */
export function dummyImage(seed: string, width: number, height: number): string {
  const s = encodeURIComponent(seed);
  return `https://picsum.photos/seed/river-${s}/${width}/${height}?grayscale`;
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Margen horizontal de página (gutter). Más generoso que en un layout genérico. */
export const pageGutter = spacing.xl;

/** Ancho máximo del lienzo en web: la app vive como una columna con márgenes. */
export const webCanvasMaxWidth = 460;

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 18,
  pill: 999,
} as const;

/**
 * Familias tipográficas (nombres cargados en `App.tsx` con `useFonts`).
 * Con fuentes personalizadas NO se usa `fontWeight`: cada peso es una familia.
 */
export const fonts = {
  serifMedium: 'Fraunces_500Medium',
  serifSemiBold: 'Fraunces_600SemiBold',
  serifBold: 'Fraunces_700Bold',
  sansRegular: 'Manrope_400Regular',
  sansMedium: 'Manrope_500Medium',
  sansSemiBold: 'Manrope_600SemiBold',
  sansBold: 'Manrope_700Bold',
} as const;

export const typography = {
  display: {
    fontFamily: fonts.serifBold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
  },
  title: {
    fontFamily: fonts.serifSemiBold,
    fontSize: 23,
    lineHeight: 29,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fonts.serifMedium,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 23,
  },
  bodyStrong: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    lineHeight: 22,
  },
  label: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.4,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    lineHeight: 16,
  },
} as const;

export type TypographyVariant = keyof typeof typography;

export const theme = { colors, spacing, radii, typography, fonts } as const;
export type Theme = typeof theme;
