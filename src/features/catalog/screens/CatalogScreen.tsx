import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import {
  EmptyState,
  Input,
  QueryStateView,
  Screen,
  pageGutter,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import type { CatalogStackScreenProps } from '@/app/navigation/types';

import { ProductCard } from '../components/ProductCard';
import { useCatalog } from '../hooks/useCatalog';

export function CatalogScreen({
  navigation,
}: CatalogStackScreenProps<'CatalogList'>) {
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch, isFetching } = useCatalog(search);

  return (
    <Screen padded={false} edges={['bottom']}>
      <View style={styles.header}>
        <Input
          placeholder={strings.catalog.search}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      <QueryStateView
        loading={isLoading && !data}
        error={error}
        onRetry={refetch}
      >
        <FlatList
          data={data ?? []}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            !isFetching ? (
              <EmptyState
                icon="search-outline"
                title="Sin resultados"
                description="Prueba con otro término de búsqueda."
              />
            ) : null
          }
        />
      </QueryStateView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: pageGutter,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  list: {
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    flexGrow: 1,
  },
});
