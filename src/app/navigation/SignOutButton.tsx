import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable } from 'react-native';

import { colors, spacing } from '@/design-system';
import { strings } from '@/i18n';
import { useSession } from '@/features/auth/hooks/useSession';

export function SignOutButton() {
  const { signOut } = useSession();

  const confirm = () =>
    Alert.alert(strings.auth.signOut, strings.auth.signOutPrompt, [
      { text: strings.common.cancel, style: 'cancel' },
      {
        text: strings.auth.signOut,
        style: 'destructive',
        onPress: () => signOut(),
      },
    ]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={strings.auth.signOut}
      onPress={confirm}
      hitSlop={spacing.sm}
    >
      <Ionicons name="log-out-outline" size={24} color={colors.textPrimary} />
    </Pressable>
  );
}
