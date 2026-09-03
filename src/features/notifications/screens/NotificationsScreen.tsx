import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import {
  Button,
  Card,
  EmptyState,
  QueryStateView,
  Row,
  Screen,
  Text,
  colors,
  pageGutter,
  radii,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatRelative } from '@/utils/format';

import { NotificationType } from '../types';
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from '../hooks/useNotifications';

const TYPE_ICON: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
  appointment: 'calendar-outline',
  quote: 'document-text-outline',
  project: 'briefcase-outline',
  order: 'cube-outline',
};

export function NotificationsScreen() {
  const { data, isLoading, isRefetching, error, refetch, unreadCount } =
    useNotifications();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  return (
    <Screen padded={false} edges={['bottom']}>
      {unreadCount > 0 && (
        <Row justify="space-between" style={styles.header}>
          <Text variant="caption" color="textMuted">
            {unreadCount} sin leer
          </Text>
          <Button
            title={strings.notifications.markAllRead}
            variant="ghost"
            onPress={() => markAll.mutate()}
            loading={markAll.isPending}
          />
        </Row>
      )}

      <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
        <FlatList
          data={data ?? []}
          keyExtractor={(n) => n.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => !item.read && markRead.mutate(item.id)}
              disabled={item.read}
            >
              <Card style={!item.read ? styles.unread : styles.read}>
                <Row align="flex-start" gap="md">
                  <View
                    style={[
                      styles.iconWrap,
                      {
                        backgroundColor: item.read
                          ? colors.surfaceMuted
                          : colors.primarySoft,
                      },
                    ]}
                  >
                    <Ionicons
                      name={TYPE_ICON[item.type]}
                      size={18}
                      color={item.read ? colors.textMuted : colors.primary}
                    />
                  </View>
                  <View style={styles.body}>
                    <Row justify="space-between" align="flex-start" gap="sm">
                      <Text variant="subtitle" style={styles.title}>
                        {item.title}
                      </Text>
                      {!item.read && <View style={styles.dot} />}
                    </Row>
                    <Text variant="body" color="textSecondary">
                      {item.body}
                    </Text>
                    <Text variant="caption" color="textMuted">
                      {formatRelative(item.createdAt)}
                    </Text>
                  </View>
                </Row>
              </Card>
            </Pressable>
          )}
          ListEmptyComponent={
            <EmptyState
              icon="notifications-outline"
              title={strings.notifications.empty}
              description={strings.notifications.emptyHint}
            />
          }
        />
      </QueryStateView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: pageGutter,
    paddingTop: spacing.sm,
  },
  list: {
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    flexGrow: 1,
  },
  unread: {
    borderColor: colors.primarySoft,
    backgroundColor: colors.backgroundRaised,
  },
  read: { opacity: 0.85 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: 4 },
  title: { flex: 1 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
  },
});
