import { StyleSheet, View } from 'react-native';

import {
  Badge,
  Button,
  Card,
  QueryStateView,
  Row,
  Screen,
  Text,
  Thumbnail,
  dummyImage,
  gridMaxWidth,
  spacing,
  useResponsive,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatCurrency } from '@/utils/format';
import { useCart, useCartQuantity } from '@/features/cart/hooks/useCart';
import type { CatalogStackScreenProps } from '@/app/navigation/types';

import { categoryIcon, categoryImageTheme } from '../components/ProductCard';
import { useNativePreview } from '../hooks/useNativePreview';
import { useProduct } from '../hooks/useCatalog';
import { isInStock } from '../types';

export function ProductDetailScreen({
  route,
}: CatalogStackScreenProps<'ProductDetail'>) {
  const { productId } = route.params;
  const { data: product, isLoading, error, refetch } = useProduct(productId);
  const cart = useCart();
  const inCart = useCartQuantity(productId);
  const { busy, startScan, openAr } = useNativePreview();
  const { isDesktop } = useResponsive();

  return (
    <Screen scroll>
      <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
        {product ? (
          <View style={[styles.container, isDesktop && styles.split]}>
            <View style={isDesktop && styles.media}>
              <Thumbnail
                image={dummyImage(
                  product.id,
                  1040,
                  720,
                  categoryImageTheme(product.category),
                )}
                color={product.accentColor}
                icon={categoryIcon(product.category)}
                size="hero"
                height={isDesktop ? 380 : 220}
              />
            </View>

            <View style={isDesktop ? styles.info : styles.container}>
              <View style={styles.headings}>
                <Text variant="label" color="textMuted">
                  {product.category}
                </Text>
                <Text variant="title">{product.name}</Text>
                <Text variant="display" color="primaryStrong">
                  {formatCurrency(product.price, product.currency)}
                </Text>
                <Badge
                  label={
                    isInStock(product)
                      ? `${strings.catalog.inStock} · ${product.stock}`
                      : strings.catalog.outOfStock
                  }
                  tone={isInStock(product) ? 'success' : 'danger'}
                />
              </View>

              <Button
                title={
                  inCart > 0
                    ? `${strings.catalog.added} · ${inCart}`
                    : strings.catalog.addToCart
                }
                variant={inCart > 0 ? 'secondary' : 'primary'}
                disabled={!isInStock(product)}
                onPress={() => cart.add(product)}
                fullWidth
                size="lg"
              />

              {(product.supports3dScan || product.supportsAr) && (
                <Card>
                  <Text variant="label" color="textSecondary">
                    {strings.catalog.nativePreview}
                  </Text>
                  <Row gap="sm" style={styles.nativeRow} wrap>
                    {product.supports3dScan && (
                      <Button
                        title={strings.catalog.scan}
                        variant="ghost"
                        loading={busy === '3d'}
                        onPress={() => startScan(product.id)}
                      />
                    )}
                    {product.supportsAr && (
                      <Button
                        title={strings.catalog.viewAr}
                        variant="ghost"
                        loading={busy === 'ar'}
                        onPress={() => openAr(product.id)}
                      />
                    )}
                  </Row>
                </Card>
              )}
            </View>
          </View>
        ) : null}
      </QueryStateView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  split: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xxl,
    maxWidth: gridMaxWidth,
    alignSelf: 'center',
    width: '100%',
  },
  media: { flex: 1 },
  info: { flex: 1, gap: spacing.lg },
  headings: { gap: spacing.sm },
  nativeRow: { marginTop: spacing.sm },
});
