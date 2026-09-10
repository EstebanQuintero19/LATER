import Ionicons from '@expo/vector-icons/Ionicons';
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
  contentMaxWidth,
  pageGutter,
  radii,
  spacing,
  useResponsive,
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
  const { isDesktop } = useResponsive();

  return (
    <Screen padded={false} edges={['bottom']}>
      <View style={styles.page}>
        {unreadCount > 0 && (
          <Row
            justify="space-between"
            style={[styles.header, isDesktop && styles.headerDesktop]}
          >
            <Text variant="caption" color="textMuted">
              {unreadCount} {strings.notifications.unreadSuffix}
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
            style={styles.listOuter}
            contentContainerStyle={[
              styles.list,
              isDesktop && styles.listDesktop,
            ]}
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
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, width: '100%', alignItems: 'center' },
  listOuter: { width: '100%', maxWidth: contentMaxWidth },
  header: {
    width: '100%',
    maxWidth: contentMaxWidth,
    paddingHorizontal: pageGutter,
    paddingTop: spacing.sm,
  },
  headerDesktop: { paddingLeft: spacing.xxl },
  list: {
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    flexGrow: 1,
  },
  listDesktop: { paddingLeft: spacing.xxl },
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
