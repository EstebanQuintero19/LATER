import { Ionicons } from '@expo/vector-icons';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import {
  Button,
  EmptyState,
  QueryStateView,
  Screen,
  colors,
  gridMaxWidth,
  pageGutter,
  spacing,
  useResponsive,
} from '@/design-system';
import { strings } from '@/i18n';
import type { ProjectsStackScreenProps } from '@/app/navigation/types';
import { isGridFiller, padForGrid } from '@/utils/grid';

import { ProjectCard } from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';

export function ProjectsScreen({
  navigation,
}: ProjectsStackScreenProps<'ProjectsList'>) {
  const { data, isLoading, isRefetching, error, refetch } = useProjects();
  const { isTablet, isDesktop } = useResponsive();
  const numColumns = isDesktop ? 3 : isTablet ? 2 : 1;

  const goToRequest = () => navigation.navigate('RequestRemodel');
  const gridData = padForGrid(data ?? [], numColumns);

  return (
    <Screen padded={false} edges={['bottom']}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Button
            title={strings.projects.newRequest}
            variant="secondary"
            leftIcon={
              <Ionicons name="add" size={18} color={colors.primaryStrong} />
            }
            onPress={goToRequest}
          />
        </View>

        <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
          <FlatList
            key={numColumns}
            data={gridData}
            keyExtractor={(p) => p.id}
            numColumns={numColumns}
            style={styles.listOuter}
            contentContainerStyle={styles.list}
            columnWrapperStyle={numColumns > 1 ? styles.column : undefined}
            ItemSeparatorComponent={() => null}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            renderItem={({ item }) =>
              isGridFiller(item) ? (
                <View style={styles.cell} />
              ) : (
                <ProjectCard
                  project={item}
                  style={numColumns > 1 ? styles.cell : undefined}
                  onPress={() =>
                    navigation.navigate('ProjectDetail', {
                      projectId: item.id,
                    })
                  }
                />
              )
            }
            ListEmptyComponent={
              <EmptyState
                icon="briefcase-outline"
                title={strings.projects.empty}
                description={strings.projects.emptyHint}
                actionLabel={strings.projects.newRequest}
                onAction={goToRequest}
              />
            }
          />
        </QueryStateView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, width: '100%', alignItems: 'center' },
  header: {
    width: '100%',
    maxWidth: gridMaxWidth,
    alignItems: 'flex-end',
    paddingHorizontal: pageGutter,
    paddingTop: spacing.md,
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
