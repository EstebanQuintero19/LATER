import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { colors, fonts } from '@/design-system';

/** Título de cabecera con más presencia: serif, un punto más grande. */
const headerTitleStyle = {
  fontFamily: fonts.black,
  fontSize: 21,
  letterSpacing: -0.3,
};

export const defaultStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerTitleStyle,
  headerTitleAlign: 'left',
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

/** Cabecera común para las pestañas hoja (sin stack propio). */
export const tabHeaderOptions = {
  headerShown: true as const,
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerTitleStyle,
  headerTitleAlign: 'left' as const,
  headerShadowVisible: false,
};
