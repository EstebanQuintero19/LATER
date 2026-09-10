import { Platform } from 'react-native';

/**
 * Tokens del sistema de diseño.
 *
 * Punto único de verdad para color, espaciado, tipografía y radios.
 * Las pantallas y componentes NO deben usar valores mágicos: siempre `theme.*`.
 *
 * Concepto: **el muestrario**. LATER no es una tienda ni una landing: es la
 * ventana del cliente a su propia obra. El referente es el banco oscuro sobre
 * el que el reformista deja las muestras de cuarzo, roble y acero para que se
 * vean juntas. De ahí salen las dos decisiones de fondo:
 *
 * - El *chrome* (rail y topbar) es grafito. Convierte la app en instrumento de
 *   trabajo en vez de página de marketing, y hace de banco: la fotografía de
 *   materiales resalta contra él como resaltan las muestras reales.
 * - El acento es verdigris (pátina de cobre, material del oficio). Es el
 *   complemento de las maderas y piedras cálidas de las fotos, así que las
 *   favorece en lugar de competir con ellas.
 *
 * Todos los pares de color están verificados contra WCAG AA para texto normal.
 */

const palette = {
  // Chrome: rail lateral y topbar.
  graphite: '#1C1B19',
  graphiteRaised: '#26241F',
  graphiteBorder: '#38352F',

  // Lienzo y superficies.
  paper: '#FCFCFA', // superficies de contenido
  bench: '#E8E6E1', // lienzo de página
  benchDeep: '#DEDBD4', // superficie hundida / separadores fuertes
  edge: '#D2CEC5', // bordes

  // Acento único: pátina de cobre.
  verdigris: '#3F6F63',
  verdigrisDeep: '#2F544B',
  verdigrisSoft: '#DCE6E2',
  verdigrisOnChrome: '#8FB5A9', // legible sobre grafito (7.7:1)

  // Tinta.
  ink: '#24231F',
  inkSoft: '#5A574F',
  inkMuted: '#6B675E',
  onChrome: '#F2F0EC',
  onChromeMuted: '#9C978C',

  // Semánticos, desaturados para convivir con los neutros.
  moss: '#4A6B45',
  mossSoft: '#DFE7DB',
  amber: '#7A5718',
  amberSoft: '#F2E6CE',
  oxide: '#A8452C',
  oxideSoft: '#F0DED8',
} as const;

export const colors = {
  background: palette.bench,
  backgroundRaised: palette.benchDeep,
  surface: palette.paper,
  surfaceMuted: palette.benchDeep,
  border: palette.edge,
  borderAccent: palette.verdigris,

  primary: palette.graphite,
  primaryStrong: palette.ink,
  primarySoft: palette.verdigrisSoft,
  onPrimary: palette.paper,

  accent: palette.verdigris,
  accentStrong: palette.verdigrisDeep,
  accentSoft: palette.verdigrisSoft,

  textPrimary: palette.ink,
  textSecondary: palette.inkSoft,
  textMuted: palette.inkMuted,

  // Chrome oscuro (rail lateral, topbar).
  chrome: palette.graphite,
  chromeRaised: palette.graphiteRaised,
  chromeBorder: palette.graphiteBorder,
  onChrome: palette.onChrome,
  onChromeMuted: palette.onChromeMuted,
  accentOnChrome: palette.verdigrisOnChrome,

  success: palette.moss,
  successSoft: palette.mossSoft,
  warning: palette.amber,
  warningSoft: palette.amberSoft,
  warningInk: palette.amber,
  danger: palette.oxide,
  dangerSoft: palette.oxideSoft,

  focusRing: palette.verdigris,
} as const;

/** Tintes tonales para fallbacks decorativos (cuando no hay imagen). */
export const swatches = [
  '#3F6F63',
  '#5A574F',
  '#8C7A67',
  '#2F544B',
  '#6F6353',
  '#A8452C',
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

/** Margen horizontal de página (gutter). Más generoso que en un layout genérico. */
export const pageGutter = spacing.xl;

/**
 * Puntos de corte para layout responsivo (ancho de ventana, en dp/px CSS).
 * `tablet` activa layouts de 2 columnas; `desktop` activa el chrome de
 * escritorio (rail lateral, grids de 3 columnas, detalle a 2 columnas);
 * `wide` sube a 4 columnas y ensancha la caja de contenido.
 */
export const breakpoints = {
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

/** Ancho máximo de columnas de lectura/formulario (login, detalle, avisos). */
export const contentMaxWidth = 760;

/**
 * Ancho máximo de las pantallas de grid, por tramo. Un único valor fijo dejaba
 * ~65% del lienzo vacío en monitores anchos.
 */
export const gridMaxWidth = 1180;
export const gridMaxWidthWide = 1440;

/** Ancho del formulario de auth (login) en pantallas anchas. */
export const webCanvasMaxWidth = 420;

/**
 * Radios. Codifican jerarquía, no decoran: cuanto más grande y más "pieza
 * física" es el elemento, más radio. Un mismo radio en todo era uno de los
 * tics del diseño anterior.
 */
export const radii = {
  none: 0,
  xs: 2, // badges, chips: casi rectos
  sm: 4, // controles: botones, inputs
  md: 8, // tarjetas
  lg: 14, // superficies grandes: media, paneles
  xl: 20,
  pill: 999,
} as const;

/**
 * Familia tipográfica: **Archivo**, una sola, en cuatro pesos.
 *
 * Archivo nació como tipo de señalética y editorial de alto rendimiento — el
 * registro de la ficha técnica, que es el del oficio. Una sola familia con
 * rango completo de pesos da más cohesión que dos grotescas parecidas, y baja
 * el presupuesto de fuentes de 7 caras a 4.
 *
 * Con fuentes personalizadas NO se usa `fontWeight`: cada peso es una familia.
 *
 * En web el render NO espera a las fuentes (ver `App.tsx`), así que cada familia
 * lleva detrás una pila de respaldo del sistema: el primer frame se pinta
 * legible y el texto cambia a la fuente real al llegar. En nativo sólo vale el
 * nombre.
 */
const SANS_FALLBACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

function family(name: string): string {
  return Platform.OS === 'web' ? `${name}, ${SANS_FALLBACK}` : name;
}

export const fonts = {
  regular: family('Archivo_400Regular'),
  medium: family('Archivo_500Medium'),
  bold: family('Archivo_700Bold'),
  black: family('Archivo_900Black'),
} as const;

/**
 * Escala tipográfica base (móvil).
 *
 * Sin `textTransform: 'uppercase'` en ningún nivel: la jerarquía la llevan el
 * peso y el tamaño. El eyebrow en versalitas con tracking encima de cada bloque
 * era el tic más visible del diseño anterior.
 *
 * El tracking negativo crece con el tamaño: es lo que da a los titulares el
 * aire ancho y compacto de la señalética, ya que Archivo no trae anchos
 * Expanded en `@expo-google-fonts`.
 */
export const typography = {
  hero: {
    fontFamily: fonts.black,
    fontSize: 40,
    lineHeight: 42,
    letterSpacing: -1.4,
  },
  display: {
    fontFamily: fonts.black,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.9,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 21,
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 23,
  },
  bodyStrong: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  /** Etiqueta de dato. Caja alta y baja, peso alto, sin tracking postizo. */
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 17,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  /** Cifras y medidas: el dato que el cliente busca de un vistazo. */
  metric: {
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 24,
    letterSpacing: -0.4,
  },
} as const;

export type TypographyVariant = keyof typeof typography;

export interface TypographyOverride {
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
}

/**
 * Sobrescrituras para escritorio (>= `breakpoints.desktop`). Antes `hero` medía
 * 40 px igual en un móvil que en un monitor de 27". Sólo suben los niveles
 * expresivos: el texto de lectura se queda donde está.
 */
export const typographyDesktop: Partial<
  Record<TypographyVariant, TypographyOverride>
> = {
  hero: { fontSize: 68, lineHeight: 66, letterSpacing: -2.8 },
  display: { fontSize: 40, lineHeight: 44, letterSpacing: -1.4 },
  title: { fontSize: 25, lineHeight: 30, letterSpacing: -0.7 },
  subtitle: { fontSize: 17, lineHeight: 24, letterSpacing: -0.2 },
  metric: { fontSize: 22, lineHeight: 27, letterSpacing: -0.5 },
};

export const theme = { colors, spacing, radii, typography, fonts } as const;
export type Theme = typeof theme;
