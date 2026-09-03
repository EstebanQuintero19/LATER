import { StyleSheet, View } from 'react-native';

import { Badge, Card, Row, Text, spacing } from '@/design-system';
import { strings } from '@/i18n';
import { formatRelative } from '@/utils/format';

import { PROJECT_STATUS_LABEL, Project, ProjectStatus } from '../types';

const STATUS_TONE: Record<
  ProjectStatus,
  'primary' | 'success' | 'warning' | 'neutral'
> = {
  measuring: 'warning',
  in_progress: 'primary',
  quote_sent: 'success',
  closed: 'neutral',
};

export function ProjectCard({
  project,
  onPress,
}: {
  project: Project;
  onPress: () => void;
}) {
  return (
    <Card onPress={onPress}>
      <Row align="flex-start" gap="md">
        <View
          style={[styles.stripe, { backgroundColor: project.coverColor }]}
        />
        <View style={styles.body}>
          <Text variant="subtitle" numberOfLines={1}>
            {project.name}
          </Text>
          <Text variant="body" color="textSecondary" numberOfLines={1}>
            {project.client}
          </Text>
          <Row justify="space-between" style={styles.meta}>
            <Badge
              label={PROJECT_STATUS_LABEL[project.status]}
              tone={STATUS_TONE[project.status]}
            />
            <Text variant="caption" color="textMuted">
              {project.memberCount} {strings.projects.members} ·{' '}
              {formatRelative(project.updatedAt)}
            </Text>
          </Row>
        </View>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  stripe: { width: 4, alignSelf: 'stretch', borderRadius: 2 },
  body: { flex: 1, gap: spacing.xs },
  meta: { marginTop: spacing.sm },
});
