import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import {
  EmptyState,
  Input,
  QueryStateView,
  Screen,
  gridMaxWidth,
  pageGutter,
  spacing,
  useResponsive,
} from '@/design-system';
import { strings } from '@/i18n';
import type { CatalogStackScreenProps } from '@/app/navigation/types';
import { isGridFiller, padForGrid } from '@/utils/grid';

import { ProductCard } from '../components/ProductCard';
import { useCatalog } from '../hooks/useCatalog';

export function CatalogScreen({
  navigation,
}: CatalogStackScreenProps<'CatalogList'>) {
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch, isFetching } = useCatalog(search);
  const { isTablet, isDesktop } = useResponsive();
  const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;
  const gridData = padForGrid(data ?? [], numColumns);

  return (
    <Screen padded={false} edges={['bottom']}>
      <View style={styles.page}>
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
            key={numColumns}
            data={gridData}
            keyExtractor={(p) => p.id}
            numColumns={numColumns}
            style={styles.listOuter}
            contentContainerStyle={styles.list}
            columnWrapperStyle={numColumns > 1 ? styles.column : undefined}
            keyboardDismissMode="on-drag"
            renderItem={({ item }) =>
              isGridFiller(item) ? (
                <View style={styles.cell} />
              ) : (
                <ProductCard
                  product={item}
                  style={numColumns > 1 ? styles.cell : undefined}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      productId: item.id,
                    })
                  }
                />
              )
            }
            ListEmptyComponent={
              !isFetching ? (
                <EmptyState
                  icon="search-outline"
                  title={strings.catalog.noResults}
                  description={strings.catalog.noResultsHint}
                />
              ) : null
            }
          />
        </QueryStateView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // El padre centra (alignItems), los hijos sólo declaran su ancho máximo:
  // en RN Web un FlatList con `alignSelf: 'center'` propio no siempre centra.
  page: { flex: 1, width: '100%', alignItems: 'center' },
  header: {
    width: '100%',
    maxWidth: gridMaxWidth,
    paddingHorizontal: pageGutter,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  listOuter: { width: '100%', maxWidth: gridMaxWidth },
  list: {
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    flexGrow: 1,
  },
  column: { gap: spacing.md },
  cell: { flex: 1 },
});
