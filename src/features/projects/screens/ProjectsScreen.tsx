import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { EmptyState, QueryStateView, Screen, spacing } from '@/design-system';
import { strings } from '@/i18n';
import type { ProjectsStackScreenProps } from '@/app/navigation/types';

import { ProjectCard } from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';

export function ProjectsScreen({
  navigation,
}: ProjectsStackScreenProps<'ProjectsList'>) {
  const { data, isLoading, isRefetching, error, refetch } = useProjects();

  return (
    <Screen padded={false} edges={['bottom']}>
      <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
        <FlatList
          data={data ?? []}
          keyExtractor={(p) => p.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => null}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <ProjectCard
              project={item}
              onPress={() =>
                navigation.navigate('ProjectDetail', { projectId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title={strings.projects.empty}
              description={strings.projects.emptyHint}
            />
          }
        />
      </QueryStateView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.lg, gap: spacing.md, flexGrow: 1 },
});
