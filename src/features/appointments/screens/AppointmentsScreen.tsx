import { Ionicons } from '@expo/vector-icons';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import {
  Badge,
  Button,
  Card,
  EmptyState,
  QueryStateView,
  Row,
  Screen,
  Text,
  colors,
  radii,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatDateTime } from '@/utils/format';

import { AppointmentStatus } from '../types';
import {
  useAppointments,
  useCancelAppointment,
} from '../hooks/useAppointments';

const STATUS: Record<
  AppointmentStatus,
  { label: string; tone: 'success' | 'warning' | 'danger' }
> = {
  confirmed: { label: strings.appointments.statusConfirmed, tone: 'success' },
  pending: { label: strings.appointments.statusPending, tone: 'warning' },
  cancelled: { label: strings.appointments.statusCancelled, tone: 'danger' },
};

export function AppointmentsScreen() {
  const { data, isLoading, isRefetching, error, refetch } = useAppointments();
  const cancel = useCancelAppointment();

  const confirmCancel = (id: string, title: string) => {
    Alert.alert(title, strings.appointments.cancelPrompt, [
      { text: strings.appointments.keep, style: 'cancel' },
      {
        text: strings.appointments.cancelConfirm,
        style: 'destructive',
        onPress: () => cancel.mutate(id),
      },
    ]);
  };

  return (
    <Screen padded={false} edges={['bottom']}>
      <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
        <FlatList
          data={data ?? []}
          keyExtractor={(a) => a.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => {
            const cancelled = item.status === 'cancelled';
            return (
              <Card>
                <Row align="flex-start" gap="md">
                  <View style={styles.iconWrap}>
                    <Ionicons
                      name={cancelled ? 'close' : 'calendar-clear-outline'}
                      size={20}
                      color={cancelled ? colors.textMuted : colors.primary}
                    />
                  </View>
                  <View style={styles.body}>
                    <Row justify="space-between" align="flex-start">
                      <Text variant="subtitle" style={styles.title}>
                        {item.title}
                      </Text>
                      <Badge {...STATUS[item.status]} />
                    </Row>
                    <Text variant="body" color="textSecondary">
                      {item.projectName}
                    </Text>
                    <Row gap="xs" style={styles.metaRow}>
                      <Ionicons
                        name="time-outline"
                        size={13}
                        color={colors.textMuted}
                      />
                      <Text variant="caption" color="textMuted">
                        {formatDateTime(item.scheduledAt)}
                      </Text>
                    </Row>
                    <Row gap="xs">
                      <Ionicons
                        name="location-outline"
                        size={13}
                        color={colors.textMuted}
                      />
                      <Text variant="caption" color="textMuted">
                        {item.location}
                      </Text>
                    </Row>
                  </View>
                </Row>
                {!cancelled && (
                  <>
                    <View style={styles.divider} />
                    <Button
                      title={strings.appointments.cancel}
                      variant="ghost"
                      onPress={() => confirmCancel(item.id, item.title)}
                      loading={cancel.isPending && cancel.variables === item.id}
                      style={styles.action}
                    />
                  </>
                )}
              </Card>
            );
          }}
          ListEmptyComponent={
            <EmptyState
              icon="calendar-outline"
              title={strings.appointments.empty}
              description={strings.appointments.emptyHint}
            />
          }
        />
      </QueryStateView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.lg, gap: spacing.md, flexGrow: 1 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  body: { flex: 1, gap: 4 },
  title: { flex: 1, marginRight: spacing.sm },
  metaRow: { marginTop: 2 },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  action: { alignSelf: 'flex-start' },
});
