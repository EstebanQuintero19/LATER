import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import {
  Button,
  EmptyState,
  Input,
  QueryStateView,
  Screen,
  Text,
  colors,
  contentMaxWidth,
  pageGutter,
  radii,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import { formatRelative } from '@/utils/format';
import type { ProjectsStackScreenProps } from '@/app/navigation/types';

import { Message } from '../types';
import { useMessages, useSendMessage } from '../hooks/useMessages';

function Bubble({ message }: { message: Message }) {
  const mine = message.author === 'client';
  return (
    <View style={[styles.bubbleRow, mine && styles.bubbleRowMine]}>
      <View
        style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}
      >
        <Text
          variant="body"
          color={mine ? 'onPrimary' : 'textPrimary'}
          style={styles.bubbleBody}
        >
          {message.body}
        </Text>
      </View>
      <Text variant="caption" color="textMuted" style={styles.bubbleMeta}>
        {mine ? strings.messages.you : strings.messages.team} ·{' '}
        {formatRelative(message.createdAt)}
      </Text>
    </View>
  );
}

export function ProjectMessagesScreen({
  route,
}: ProjectsStackScreenProps<'ProjectMessages'>) {
  const { projectId } = route.params;
  const { data, isLoading, error, refetch } = useMessages(projectId);
  const send = useSendMessage(projectId);
  const [draft, setDraft] = useState('');

  const onSend = () => {
    const body = draft.trim();
    if (!body) return;
    setDraft('');
    send.mutate(body);
  };

  return (
    <Screen padded={false} edges={['bottom']}>
      <View style={styles.page}>
        <QueryStateView loading={isLoading} error={error} onRetry={refetch}>
          <FlatList
            data={data ?? []}
            keyExtractor={(m) => m.id}
            style={styles.listOuter}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => <Bubble message={item} />}
            ListEmptyComponent={
              <EmptyState
                icon="chatbubble-ellipses-outline"
                title={strings.messages.empty}
                description={strings.messages.emptyHint}
              />
            }
          />
        </QueryStateView>
      </View>

      <View style={styles.composer}>
        <View style={styles.composerInner}>
          {send.isError ? (
            <Text variant="caption" color="danger">
              {strings.messages.error}
            </Text>
          ) : null}
          <View style={styles.composerRow}>
            <Input
              placeholder={strings.messages.placeholder}
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={onSend}
              returnKeyType="send"
              style={styles.composerInput}
            />
            <Button
              title={strings.messages.send}
              onPress={onSend}
              loading={send.isPending}
              disabled={!draft.trim() || send.isPending}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, width: '100%', alignItems: 'center' },
  listOuter: { width: '100%', maxWidth: contentMaxWidth },
  list: {
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    flexGrow: 1,
  },
  bubbleRow: { alignItems: 'flex-start', gap: spacing.xs, maxWidth: '85%' },
  bubbleRowMine: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubble: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
  },
  bubbleTheirs: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: radii.sm,
  },
  bubbleMine: {
    backgroundColor: colors.primary,
    borderTopRightRadius: radii.sm,
  },
  bubbleBody: { lineHeight: 21 },
  bubbleMeta: { marginHorizontal: spacing.xs },
  composer: {
    backgroundColor: colors.backgroundRaised,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  composerInner: { width: '100%', maxWidth: contentMaxWidth, gap: spacing.xs },
  composerRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-end',
  },
  composerInput: { flex: 1 },
});
