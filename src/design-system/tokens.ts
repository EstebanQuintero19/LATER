/**
 * Tokens del sistema de diseño.
 *
 * Punto único de verdad para color, espaciado, tipografía y radios.
 * Las pantallas y componentes NO deben usar valores mágicos: siempre `theme.*`.
 *
 * Estética "casa cálida / editorial": neutros arena, acento terracota y verde
 * salvia, titulares en serif (Fraunces) y texto de interfaz en Manrope.
 */

const palette = {
  // Neutros cálidos
  paper: '#F4F1EA',
  paperRaised: '#FBFAF6',
  sand: '#EFE9DE',
  clayBorder: '#E5DFD2',
  ink: '#2B2621',
  inkSoft: '#6D6459',
  inkMuted: '#A69C8C',
  white: '#FFFFFF',

  // Marca
  terracotta: '#C05B3E',
  terracottaDeep: '#9C3F26',
  terracottaSoft: '#F0DDD3',
  sage: '#5C7F6B',
  sageSoft: '#DEE7DE',

  // Semánticos (afinados a la paleta)
  green: '#4B7F52',
  greenSoft: '#DCE8D8',
  ochre: '#C4882F',
  ochreSoft: '#F2E4C9',
  ochreInk: '#875B1D',
  rust: '#B4463C',
  rustSoft: '#F0D9D4',
} as const;

export const colors = {
  background: palette.paper,
  backgroundRaised: palette.paperRaised,
  surface: palette.white,
  surfaceMuted: palette.sand,
  border: palette.clayBorder,

  primary: palette.terracotta,
  primaryStrong: palette.terracottaDeep,
  primarySoft: palette.terracottaSoft,
  onPrimary: '#FFF7F2',

  accent: palette.sage,
  accentSoft: palette.sageSoft,

  textPrimary: palette.ink,
  textSecondary: palette.inkSoft,
  textMuted: palette.inkMuted,

  success: palette.green,
  successSoft: palette.greenSoft,
  warning: palette.ochre,
  warningSoft: palette.ochreSoft,
  warningInk: palette.ochreInk,
  danger: palette.rust,
  dangerSoft: palette.rustSoft,

  focusRing: '#C9A895',
} as const;

/** Colores decorativos para las miniaturas/portadas (proyectos y productos). */
export const swatches = [
  '#C05B3E', // terracota
  '#5C7F6B', // salvia
  '#C4882F', // ocre
  '#3F5E58', // verde azulado profundo
  '#8C7A67', // topo
  '#A9552F', // teja
] as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 26,
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
    fontSize: 27,
    lineHeight: 33,
    letterSpacing: -0.4,
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
    letterSpacing: 0.7,
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
