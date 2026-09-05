import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  EmptyState,
  Row,
  Screen,
  Text,
  Thumbnail,
  colors,
  dummyImage,
  pageGutter,
  radii,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatCurrency } from '@/utils/format';
import {
  categoryIcon,
  categoryImageTheme,
} from '@/features/catalog/components/ProductCard';

import { CartLine } from '../model/cartSlice';
import { useCart } from '../hooks/useCart';

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <Row gap="xs" style={styles.stepper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={strings.cart.decrease}
        onPress={() => onChange(value - 1)}
        hitSlop={spacing.sm}
        style={styles.stepBtn}
      >
        <Text style={styles.stepGlyph}>−</Text>
      </Pressable>
      <Text variant="bodyStrong" style={styles.stepValue}>
        {value}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={strings.cart.increase}
        onPress={() => onChange(value + 1)}
        hitSlop={spacing.sm}
        style={styles.stepBtn}
      >
        <Text style={styles.stepGlyph}>+</Text>
      </Pressable>
    </Row>
  );
}

function CartRow({
  line,
  onQty,
  onRemove,
}: {
  line: CartLine;
  onQty: (n: number) => void;
  onRemove: () => void;
}) {
  return (
    <Card>
      <Row align="flex-start" gap="md">
        <Thumbnail
          image={dummyImage(
            line.productId,
            180,
            180,
            categoryImageTheme(line.category),
          )}
          color={line.accentColor}
          icon={categoryIcon(line.category)}
          size="md"
        />
        <View style={styles.body}>
          <Text variant="subtitle" numberOfLines={2}>
            {line.name}
          </Text>
          <Text variant="caption" color="textMuted">
            {formatCurrency(line.unitPrice, line.currency)} c/u
          </Text>
          <Row justify="space-between" style={styles.controls}>
            <QtyStepper value={line.quantity} onChange={onQty} />
            <Text variant="bodyStrong" color="primaryStrong">
              {formatCurrency(line.unitPrice * line.quantity, line.currency)}
            </Text>
          </Row>
        </View>
      </Row>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${strings.cart.remove} ${line.name}`}
        onPress={onRemove}
        style={styles.remove}
      >
        <Text variant="caption" color="textMuted">
          {strings.cart.remove}
        </Text>
      </Pressable>
    </Card>
  );
}

export function CartScreen() {
  const { lines, subtotal, isEmpty, setQuantity, remove, clear } = useCart();

  if (isEmpty) {
    return (
      <Screen edges={['bottom']}>
        <EmptyState
          icon="cart-outline"
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
          text: strings.cart.checkoutConfirm,
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
          <CartRow
            line={item}
            onQty={(n) => setQuantity(item.productId, n)}
            onRemove={() => remove(item.productId)}
          />
        )}
      />

      <View style={styles.summary}>
        <Row justify="space-between" style={styles.summaryRow}>
          <Text variant="label" color="textMuted">
            {strings.cart.subtotal}
          </Text>
          <Text variant="title" color="primaryStrong">
            {formatCurrency(subtotal)}
          </Text>
        </Row>
        <Button
          title={strings.cart.checkout}
          onPress={onCheckout}
          fullWidth
          size="lg"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  body: { flex: 1, gap: 4 },
  controls: { marginTop: spacing.sm },
  remove: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  stepper: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.pill,
    padding: 3,
  },
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  stepGlyph: { fontSize: 16, color: colors.textPrimary, lineHeight: 18 },
  stepValue: { minWidth: 20, textAlign: 'center' },
  summary: {
    backgroundColor: colors.backgroundRaised,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  summaryRow: {},
});
