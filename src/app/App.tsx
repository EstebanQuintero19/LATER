import {
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { colors, webCanvasMaxWidth } from '@/design-system';

import { AppProviders } from './providers/AppProviders';
import { RootNavigator } from './navigation/RootNavigator';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Fraunces_500Medium,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const onLayout = useCallback(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.mat} onLayout={onLayout}>
      {/* En web la app vive como una columna con márgenes, no a sangre. */}
      <View style={[styles.canvas, isWeb && styles.canvasWeb]}>
        <AppProviders>
          <StatusBar style="dark" />
          <RootNavigator />
        </AppProviders>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mat: {
    flex: 1,
    backgroundColor: '#E0D7CD',
    alignItems: 'center',
  },
  canvas: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  canvasWeb: {
    maxWidth: webCanvasMaxWidth,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
  },
});
