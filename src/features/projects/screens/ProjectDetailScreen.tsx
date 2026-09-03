import { type ReactNode } from 'react';
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
  colors,
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
            <Thumbnail
              color={project.coverColor}
              label={project.name}
              size="hero"
              height={140}
            />
            <View style={styles.headings}>
              <Text variant="title">{project.name}</Text>
              <Text variant="body" color="textSecondary">
                {project.client}
              </Text>
            </View>

            <Card padded={false}>
              <DetailRow label="Estado">
                <Badge
                  label={PROJECT_STATUS_LABEL[project.status]}
                  tone="primary"
                />
              </DetailRow>
              <View style={styles.hr} />
              <DetailRow label={strings.projects.members}>
                <Text variant="bodyStrong">{project.memberCount}</Text>
              </DetailRow>
              <View style={styles.hr} />
              <DetailRow label="Última actualización">
                <Text variant="bodyStrong">
                  {formatDate(project.updatedAt)}
                </Text>
              </DetailRow>
            </Card>

            <Button
              title={strings.projects.openCatalog}
              variant="secondary"
              fullWidth
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

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Row justify="space-between" style={styles.row}>
      <Text variant="label" color="textMuted">
        {label}
      </Text>
      {children}
    </Row>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.lg },
  headings: { gap: spacing.xs },
  row: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  hr: { height: 1, backgroundColor: colors.border },
});
