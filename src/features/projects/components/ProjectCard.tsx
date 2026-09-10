import { StyleSheet, View, ViewStyle } from 'react-native';

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
  style,
  layout = 'row',
}: {
  project: Project;
  onPress: () => void;
  style?: ViewStyle;
  /** `column`: imagen protagonista arriba — pensado para grids de escritorio. */
  layout?: 'row' | 'column';
}) {
  const vertical = layout === 'column';
  const meta = (
    <View style={styles.meta}>
      <Badge
        label={PROJECT_STATUS_LABEL[project.status]}
        tone={STATUS_TONE[project.status]}
      />
      <Text variant="caption" color="textMuted" style={styles.metaText}>
        {formatRelative(project.updatedAt)}
      </Text>
      <Text variant="caption" color="textMuted">
        {project.memberCount} {strings.projects.members}
      </Text>
    </View>
  );

  if (vertical) {
    return (
      <Card onPress={onPress} style={style} padded={false}>
        <Thumbnail
          image={dummyImage(project.id, 480, 360, 'renovation')}
          color={project.coverColor}
          label={project.name}
          size="hero"
          height={160}
        />
        <View style={styles.bodyColumn}>
          <Text variant="subtitle" numberOfLines={1}>
            {project.name}
          </Text>
          <Text variant="body" color="textSecondary" numberOfLines={1}>
            {project.client}
          </Text>
          {meta}
        </View>
      </Card>
    );
  }

  return (
    <Card onPress={onPress} style={style}>
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
          {meta}
        </View>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, gap: 3 },
  bodyColumn: { gap: 3, padding: spacing.lg },
  meta: { marginTop: spacing.sm, gap: spacing.xs, alignItems: 'flex-start' },
  metaText: { marginTop: 2 },
});
