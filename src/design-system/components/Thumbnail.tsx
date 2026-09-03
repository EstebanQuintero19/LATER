import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { fonts, radii } from '../tokens';
import { Text } from './Text';

type Size = 'sm' | 'md' | 'lg' | 'hero';

const DIMENSIONS: Record<Size, { box: number; radius: number; font: number }> =
  {
    sm: { box: 44, radius: radii.md, font: 16 },
    md: { box: 60, radius: radii.md, font: 20 },
    lg: { box: 76, radius: radii.lg, font: 26 },
    hero: { box: 0, radius: radii.xl, font: 40 },
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
  color: string;
  /** Inicial mostrada en el centro (por defecto). */
  label?: string;
  /** Icono de Ionicons en lugar de la inicial. */
  icon?: keyof typeof Ionicons.glyphMap;
  size?: Size;
  /** `hero` ocupa todo el ancho disponible con altura fija. */
  height?: number;
}

/** Miniatura decorativa con degradado cálido: portadas de proyectos y productos. */
export function Thumbnail({
  color,
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
        height: height ?? 160,
        borderRadius: dim.radius,
      }
    : { width: dim.box, height: dim.box, borderRadius: dim.radius };

  return (
    <LinearGradient
      colors={[shade(color, 26), color, shade(color, -22)]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.base, boxStyle]}
    >
      <View style={styles.sheen} />
      {icon ? (
        <Ionicons name={icon} size={dim.font} color="rgba(255,255,255,0.92)" />
      ) : label ? (
        <Text
          style={{
            fontFamily: fonts.serifSemiBold,
            fontSize: dim.font,
            color: 'rgba(255,255,255,0.95)',
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
  sheen: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
});
