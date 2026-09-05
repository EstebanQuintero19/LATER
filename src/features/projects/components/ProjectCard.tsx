import { StyleSheet, View } from 'react-native';

import {
  Badge,
  Card,
  Row,
  Text,
  Thumbnail,
  dummyImage,
  spacing,
} from '@/design-system';
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
        <Thumbnail
          image={dummyImage(project.id, 220, 220, 'renovation')}
          color={project.coverColor}
          label={project.name}
          size="md"
        />
        <View style={styles.body}>
          <Text variant="subtitle" numberOfLines={1}>
            {project.name}
          </Text>
          <Text variant="body" color="textSecondary" numberOfLines={1}>
            {project.client}
          </Text>
          <View style={styles.meta}>
            <Badge
              label={PROJECT_STATUS_LABEL[project.status]}
              tone={STATUS_TONE[project.status]}
            />
            <Text variant="caption" color="textMuted" style={styles.metaText}>
              {project.memberCount} {strings.projects.members} ·{' '}
              {formatRelative(project.updatedAt)}
            </Text>
          </View>
        </View>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: 3 },
  meta: { marginTop: spacing.sm, gap: spacing.xs, alignItems: 'flex-start' },
  metaText: { marginTop: 2 },
});
