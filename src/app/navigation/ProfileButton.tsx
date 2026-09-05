import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { colors, spacing } from '@/design-system';
import { strings } from '@/i18n';

import type { MainTabParamList } from './types';

export function ProfileButton() {
  // Tipado contra MainTabParamList (no el stack raíz): "ProfileTab" vive
  // dentro del Tab.Navigator para que el rail/la barra no desaparezcan.
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={strings.profile.title}
      onPress={() => navigation.navigate('ProfileTab')}
      hitSlop={spacing.sm}
    >
      <Ionicons
        name="person-circle-outline"
        size={24}
        color={colors.textPrimary}
      />
    </Pressable>
  );
}
