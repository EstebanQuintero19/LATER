import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, fonts } from '@/design-system';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { WelcomeScreen } from '@/features/auth/screens/WelcomeScreen';
import { bootstrapSession } from '@/features/auth/model/sessionSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { MainTabs } from './MainTabs';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.primary,
    text: colors.textPrimary,
  },
};

export function RootNavigator() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.session.status);

  useEffect(() => {
    dispatch(bootstrapSession());
  }, [dispatch]);

  if (status === 'bootstrapping') {
    return (
      <View style={styles.splash}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const isAuthenticated = status === 'authenticated';

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: true,
                headerTitle: '',
                headerBackButtonDisplayMode: 'minimal',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.textPrimary,
                headerTitleStyle: { fontFamily: fonts.serifSemiBold },
                contentStyle: { backgroundColor: colors.background },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
