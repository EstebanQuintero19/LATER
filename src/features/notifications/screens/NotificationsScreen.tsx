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
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatRelative } from '@/utils/format';

import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from '../hooks/useNotifications';

export function NotificationsScreen() {
  const { data, isLoading, isRefetching, error, refetch, unreadCount } =
    useNotifications();
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  return (
    <Screen padded={false} edges={['bottom']}>
      {unreadCount > 0 && (
        <Row justify="flex-end" style={styles.header}>
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
              <Card style={!item.read ? styles.unread : undefined}>
                <Row align="flex-start" gap="sm">
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: item.read
                          ? colors.border
                          : colors.primary,
                      },
                    ]}
                  />
                  <View style={styles.body}>
                    <Text variant="subtitle">{item.title}</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  list: { padding: spacing.lg, gap: spacing.md, flexGrow: 1 },
  unread: { borderColor: colors.focusRing },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: spacing.xs },
  body: { flex: 1, gap: spacing.xs },
});
