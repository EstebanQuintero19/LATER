import { StyleSheet, View } from 'react-native';

import { Badge, Button, Card, Row, Text, spacing } from '@/design-system';
import { strings } from '@/i18n';
import { formatCurrency } from '@/utils/format';
import { useCart, useCartQuantity } from '@/features/cart/hooks/useCart';

import { Product, isInStock } from '../types';

export function ProductCard({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) {
  const cart = useCart();
  const inCart = useCartQuantity(product.id);
  const available = isInStock(product);

  return (
    <Card onPress={onPress}>
      <Row align="flex-start" gap="md">
        <View
          style={[styles.thumb, { backgroundColor: product.accentColor }]}
        />
        <View style={styles.body}>
          <Text variant="subtitle" numberOfLines={2}>
            {product.name}
          </Text>
          <Text variant="caption" color="textMuted">
            {product.category}
          </Text>
          <Text variant="subtitle" color="primaryStrong" style={styles.price}>
            {formatCurrency(product.price, product.currency)}
          </Text>
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
                  ? `${strings.catalog.added} (${inCart})`
                  : strings.catalog.addToCart
              }
              size="md"
              variant={inCart > 0 ? 'secondary' : 'primary'}
              disabled={!available}
              onPress={() => cart.add(product)}
            />
          </Row>
        </View>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  thumb: { width: 64, height: 64, borderRadius: 12 },
  body: { flex: 1, gap: spacing.xs },
  price: { marginTop: spacing.xs },
  footer: { marginTop: spacing.sm },
});
