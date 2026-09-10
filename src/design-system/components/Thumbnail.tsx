import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';

import { colors, fonts, radii } from '../tokens';
import { Text } from './Text';

type Size = 'sm' | 'md' | 'lg' | 'hero';

const DIMENSIONS: Record<Size, { box: number; radius: number; font: number }> =
  {
    sm: { box: 44, radius: radii.sm, font: 16 },
    md: { box: 64, radius: radii.sm, font: 20 },
    lg: { box: 84, radius: radii.md, font: 26 },
    hero: { box: 0, radius: radii.md, font: 40 },
  };

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amount);
  const g = clamp(((n >> 8) & 0xff) + amount);
  const b = clamp((n & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export interface ThumbnailProps {
  /** URL de imagen (dummy). Si falta, se pinta un degradado tonal. */
  image?: string;
  /** Color del degradado de reserva. */
  color?: string;
  /** Inicial mostrada en el centro (sólo sin imagen). */
  label?: string;
  /** Icono de Ionicons en lugar de la inicial (sólo sin imagen). */
  icon?: keyof typeof Ionicons.glyphMap;
  size?: Size;
  /** `hero` ocupa todo el ancho disponible con altura fija. */
  height?: number;
}

/**
 * Portada de proyectos y productos: imagen con velo cálido y filete fino.
 * Sin imagen, degrada a un bloque tonal con inicial o icono.
 */
export function Thumbnail({
  image,
  color = colors.borderAccent,
  label,
  icon,
  size = 'md',
  height,
}: ThumbnailProps) {
  const dim = DIMENSIONS[size];
  const isHero = size === 'hero';
  const boxStyle = isHero
    ? {
        width: '100%' as const,
        height: height ?? 180,
        borderRadius: dim.radius,
      }
    : { width: dim.box, height: dim.box, borderRadius: dim.radius };

  if (image) {
    return (
      <View style={[styles.base, styles.framed, boxStyle]}>
        <Image
          source={{ uri: image }}
          style={styles.fill}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        {/* Velo camello: unifica las fotos con la paleta. */}
        <View style={styles.veil} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[shade(color, 20), color, shade(color, -20)]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.base, styles.framed, boxStyle]}
    >
      {icon ? (
        <Ionicons name={icon} size={dim.font} color="rgba(38,34,30,0.55)" />
      ) : label ? (
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: dim.font,
            color: 'rgba(38,34,30,0.55)',
          }}
        >
          {label.charAt(0).toUpperCase()}
        </Text>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  framed: { borderWidth: 1, borderColor: colors.border },
  fill: { width: '100%', height: '100%' },
  veil: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(201,181,156,0.16)',
  },
});
