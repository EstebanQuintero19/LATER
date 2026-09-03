/**
 * Tokens del sistema de diseño.
 *
 * Punto único de verdad para color, espaciado, tipografía y radios.
 * Las pantallas y componentes NO deben usar valores mágicos: siempre `theme.*`.
 */

const palette = {
  blue900: '#0B2545',
  blue700: '#13315C',
  blue500: '#134074',
  blue300: '#8DA9C4',
  blue100: '#EEF4ED',
  aqua500: '#2A9D8F',
  amber500: '#E9A23B',
  red500: '#D64545',
  green500: '#2F9E44',
  white: '#FFFFFF',
  gray50: '#F7F9FB',
  gray100: '#EDF1F5',
  gray200: '#DDE3EA',
  gray400: '#9AA5B1',
  gray600: '#616E7C',
  gray800: '#323F4B',
  black: '#0A0F14',
} as const;

export const colors = {
  background: palette.gray50,
  surface: palette.white,
  surfaceMuted: palette.gray100,
  border: palette.gray200,
  primary: palette.blue500,
  primaryStrong: palette.blue700,
  onPrimary: palette.white,
  accent: palette.aqua500,
  textPrimary: palette.gray800,
  textSecondary: palette.gray600,
  textMuted: palette.gray400,
  success: palette.green500,
  warning: palette.amber500,
  danger: palette.red500,
  focusRing: palette.blue300,
} as const;

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
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
  subtitle: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
} as const;

export type TypographyVariant = keyof typeof typography;

export const theme = { colors, spacing, radii, typography } as const;
export type Theme = typeof theme;
