import { StyleSheet, View } from 'react-native';

import {
  Badge,
  Button,
  Card,
  QueryStateView,
  Row,
  Screen,
  Text,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatDate } from '@/utils/format';
import type { ProjectsStackScreenProps } from '@/app/navigation/types';

import { PROJECT_STATUS_LABEL } from '../types';
import { useProject } from '../hooks/useProjects';

export function ProjectDetailScreen({
  route,
  navigation,
}: ProjectsStackScreenProps<'ProjectDetail'>) {
  const { projectId } = route.params;
  const { data: project, isLoading, error, refetch } = useProject(projectId);

  return (
    <Screen scroll>
      <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
        {project ? (
          <View style={styles.container}>
            <View
              style={[styles.hero, { backgroundColor: project.coverColor }]}
            />
            <Text variant="title">{project.name}</Text>
            <Text variant="body" color="textSecondary">
              {project.client}
            </Text>

            <Card>
              <Row justify="space-between">
                <Text variant="label" color="textSecondary">
                  Estado
                </Text>
                <Badge
                  label={PROJECT_STATUS_LABEL[project.status]}
                  tone="primary"
                />
              </Row>
              <Row justify="space-between" style={styles.cardRow}>
                <Text variant="label" color="textSecondary">
                  {strings.projects.members}
                </Text>
                <Text variant="body">{project.memberCount}</Text>
              </Row>
              <Row justify="space-between" style={styles.cardRow}>
                <Text variant="label" color="textSecondary">
                  Última actualización
                </Text>
                <Text variant="body">{formatDate(project.updatedAt)}</Text>
              </Row>
            </Card>

            <Button
              title={strings.projects.openCatalog}
              variant="secondary"
              onPress={() =>
                navigation.navigate('CatalogTab', { screen: 'CatalogList' })
              }
            />
          </View>
        ) : null}
      </QueryStateView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md },
  hero: { height: 120, borderRadius: 16 },
  cardRow: { marginTop: spacing.md },
});
