import { Alert, FlatList, StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  EmptyState,
  Row,
  Screen,
  Text,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatCurrency } from '@/utils/format';

import { useCart } from '../hooks/useCart';

export function CartScreen() {
  const { lines, subtotal, isEmpty, setQuantity, remove, clear } = useCart();

  if (isEmpty) {
    return (
      <Screen edges={['bottom']}>
        <EmptyState
          title={strings.cart.empty}
          description={strings.cart.emptyHint}
        />
      </Screen>
    );
  }

  const onCheckout = () => {
    Alert.alert(
      strings.cart.checkout,
      `${strings.cart.subtotal}: ${formatCurrency(subtotal)}`,
      [
        { text: strings.common.cancel, style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            clear();
            Alert.alert(strings.cart.cleared);
          },
        },
      ],
    );
  };

  return (
    <Screen padded={false} edges={['bottom']}>
      <FlatList
        data={lines}
        keyExtractor={(l) => l.productId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card>
            <Row align="flex-start" gap="md">
              <View
                style={[styles.thumb, { backgroundColor: item.accentColor }]}
              />
              <View style={styles.body}>
                <Text variant="subtitle" numberOfLines={2}>
                  {item.name}
                </Text>
                <Text variant="body" color="textSecondary">
                  {formatCurrency(item.unitPrice, item.currency)}
                </Text>
                <Row justify="space-between" style={styles.controls}>
                  <Row gap="sm">
                    <Button
                      title="−"
                      variant="secondary"
                      onPress={() =>
                        setQuantity(item.productId, item.quantity - 1)
                      }
                    />
                    <Text variant="subtitle">{item.quantity}</Text>
                    <Button
                      title="+"
                      variant="secondary"
                      onPress={() =>
                        setQuantity(item.productId, item.quantity + 1)
                      }
                    />
                  </Row>
                  <Button
                    title={strings.cart.remove}
                    variant="ghost"
                    onPress={() => remove(item.productId)}
                  />
                </Row>
              </View>
            </Row>
          </Card>
        )}
      />

      <Card style={styles.summary} padded>
        <Row justify="space-between">
          <Text variant="subtitle">{strings.cart.subtotal}</Text>
          <Text variant="subtitle" color="primaryStrong">
            {formatCurrency(subtotal)}
          </Text>
        </Row>
        <Button
          title={strings.cart.checkout}
          onPress={onCheckout}
          fullWidth
          size="lg"
          style={styles.checkout}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.lg, gap: spacing.md },
  thumb: { width: 56, height: 56, borderRadius: 10 },
  body: { flex: 1, gap: spacing.xs },
  controls: { marginTop: spacing.sm },
  summary: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  checkout: { marginTop: spacing.sm },
});
