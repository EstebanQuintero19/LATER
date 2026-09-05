import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import {
  Badge,
  Button,
  Card,
  ImageTheme,
  Row,
  Text,
  Thumbnail,
  colors,
  dummyImage,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatCurrency } from '@/utils/format';
import { useCart, useCartQuantity } from '@/features/cart/hooks/useCart';

import { Product, isInStock } from '../types';

export function categoryIcon(category: string): keyof typeof Ionicons.glyphMap {
  const map: Record<string, keyof typeof Ionicons.glyphMap> = {
    Superficies: 'grid-outline',
    Grifería: 'water-outline',
    Mobiliario: 'cube-outline',
    Iluminación: 'bulb-outline',
  };
  return map[category] ?? 'pricetag-outline';
}

/** Tema fotográfico afín a cada categoría, para que la portada del producto
 * corresponda con lo que realmente vende (nada de fotos genéricas al azar). */
export function categoryImageTheme(category: string): ImageTheme {
  const map: Record<string, ImageTheme> = {
    Superficies: 'surfaces',
    Grifería: 'fixtures',
    Mobiliario: 'furniture',
    Iluminación: 'lighting',
  };
  return map[category] ?? 'interior';
}

export function ProductCard({
  product,
  onPress,
  style,
}: {
  product: Product;
  onPress: () => void;
  style?: ViewStyle;
}) {
  const cart = useCart();
  const inCart = useCartQuantity(product.id);
  const available = isInStock(product);

  return (
    <Card style={style}>
      {/* Zona de navegación al detalle (separada del botón para no anidar pulsables). */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={product.name}
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Row align="flex-start" gap="md">
          <Thumbnail
            image={dummyImage(
              product.id,
              260,
              260,
              categoryImageTheme(product.category),
            )}
            color={product.accentColor}
            icon={categoryIcon(product.category)}
            size="lg"
          />
          <View style={styles.body}>
            <Text variant="label" color="textMuted">
              {product.category}
            </Text>
            <Text variant="subtitle" numberOfLines={2}>
              {product.name}
            </Text>
            <Text variant="title" color="primaryStrong" style={styles.price}>
              {formatCurrency(product.price, product.currency)}
            </Text>
          </View>
        </Row>
      </Pressable>

      <View style={styles.divider} />

      <Row justify="space-between" style={styles.footer}>
        <Badge
          label={
            available ? strings.catalog.inStock : strings.catalog.outOfStock
          }
          tone={available ? 'success' : 'danger'}
        />
        <Button
          title={
            inCart > 0
              ? `${strings.catalog.added} · ${inCart}`
              : strings.catalog.addToCart
          }
          size="md"
          variant={inCart > 0 ? 'secondary' : 'primary'}
          disabled={!available}
          onPress={() => cart.add(product)}
        />
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  body: { flex: 1, gap: 4 },
  price: { marginTop: 2, fontSize: 19, lineHeight: 24 },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  footer: {},
});
