import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { colors } from '@/design-system';

export const defaultStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

/** Cabecera común para las pestañas hoja (sin stack propio). */
export const tabHeaderOptions = {
  headerShown: true as const,
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: { fontWeight: '600' as const },
  headerShadowVisible: false,
};
