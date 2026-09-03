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
    Alert.alert(title, '¿Cancelar esta cita?', [
      { text: 'No', style: 'cancel' },
      {
        text: strings.common.save,
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
          renderItem={({ item }) => (
            <Card>
              <Row justify="space-between" align="flex-start">
                <View style={styles.body}>
                  <Text variant="subtitle">{item.title}</Text>
                  <Text variant="body" color="textSecondary">
                    {item.projectName}
                  </Text>
                  <Text variant="caption" color="textMuted">
                    {formatDateTime(item.scheduledAt)} · {item.location}
                  </Text>
                </View>
                <Badge {...STATUS[item.status]} />
              </Row>
              {item.status !== 'cancelled' && (
                <Button
                  title={strings.appointments.statusCancelled}
                  variant="ghost"
                  onPress={() => confirmCancel(item.id, item.title)}
                  loading={cancel.isPending && cancel.variables === item.id}
                  style={styles.action}
                />
              )}
            </Card>
          )}
          ListEmptyComponent={
            <EmptyState
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
  body: { flex: 1, gap: spacing.xs },
  action: { marginTop: spacing.sm, alignSelf: 'flex-start' },
});
