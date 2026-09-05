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
  dummyImage,
  gridMaxWidth,
  spacing,
  useResponsive,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatDate } from '@/utils/format';
import type { ProjectsStackScreenProps } from '@/app/navigation/types';

import { BUDGET_RANGE_LABEL, PROJECT_STATUS_LABEL } from '../types';
import { useProject } from '../hooks/useProjects';

export function ProjectDetailScreen({
  route,
  navigation,
}: ProjectsStackScreenProps<'ProjectDetail'>) {
  const { projectId } = route.params;
  const { data: project, isLoading, error, refetch } = useProject(projectId);
  const { isDesktop } = useResponsive();

  return (
    <Screen scroll>
      <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
        {project ? (
          <View style={[styles.container, isDesktop && styles.split]}>
            <View style={isDesktop && styles.media}>
              <Thumbnail
                image={dummyImage(project.id, 960, 540, 'renovation')}
                color={project.coverColor}
                label={project.name}
                size="hero"
                height={isDesktop ? 320 : 168}
              />
            </View>

            <View style={isDesktop ? styles.info : styles.container}>
              <View style={styles.headings}>
                <Text variant="title">{project.name}</Text>
                <Text variant="body" color="textSecondary">
                  {project.client}
                </Text>
              </View>

              <Card padded={false}>
                <DetailRow label={strings.projects.status}>
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
                <DetailRow label={strings.projects.lastUpdate}>
                  <Text variant="bodyStrong">
                    {formatDate(project.updatedAt)}
                  </Text>
                </DetailRow>
                {project.location ? (
                  <>
                    <View style={styles.hr} />
                    <DetailRow label={strings.projects.location}>
                      <Text variant="bodyStrong">{project.location}</Text>
                    </DetailRow>
                  </>
                ) : null}
                {project.sizeM2 ? (
                  <>
                    <View style={styles.hr} />
                    <DetailRow label={strings.projects.size}>
                      <Text variant="bodyStrong">
                        {project.sizeM2} {strings.projects.sizeUnit}
                      </Text>
                    </DetailRow>
                  </>
                ) : null}
                {project.budgetRange ? (
                  <>
                    <View style={styles.hr} />
                    <DetailRow label={strings.projects.budget}>
                      <Text variant="bodyStrong">
                        {BUDGET_RANGE_LABEL[project.budgetRange]}
                      </Text>
                    </DetailRow>
                  </>
                ) : null}
              </Card>

              {project.description ? (
                <Card>
                  <Text variant="label" color="textMuted">
                    {strings.projects.description}
                  </Text>
                  <Text
                    variant="body"
                    color="textSecondary"
                    style={styles.description}
                  >
                    {project.description}
                  </Text>
                </Card>
              ) : null}

              <Row gap="sm">
                <Button
                  title={strings.projects.openCatalog}
                  variant="secondary"
                  style={styles.actionButton}
                  onPress={() =>
                    navigation.navigate('CatalogTab', { screen: 'CatalogList' })
                  }
                />
                <Button
                  title={strings.messages.title}
                  variant="ghost"
                  style={styles.actionButton}
                  onPress={() =>
                    navigation.navigate('ProjectMessages', { projectId })
                  }
                />
              </Row>
            </View>
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
  headings: { gap: spacing.xs },
  row: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  hr: { height: 1, backgroundColor: colors.border },
  description: { marginTop: spacing.xs },
  actionButton: { flex: 1 },
});
