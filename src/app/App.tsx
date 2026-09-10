import { Archivo_400Regular } from '@expo-google-fonts/archivo/400Regular';
import { Archivo_500Medium } from '@expo-google-fonts/archivo/500Medium';
import { Archivo_700Bold } from '@expo-google-fonts/archivo/700Bold';
import { Archivo_900Black } from '@expo-google-fonts/archivo/900Black';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { colors } from '@/design-system';

import { AppProviders } from './providers/AppProviders';
import { RootNavigator } from './navigation/RootNavigator';

SplashScreen.preventAutoHideAsync().catch(() => {});

/**
 * Las fuentes se importan por subruta (`.../400Regular`), no desde la raíz del
 * paquete: el `index.js` de `@expo-google-fonts/*` hace `require()` de TODOS los
 * pesos e itálicas, y Metro los empaqueta aunque no se usen (eran ~2 MB de
 * sobra en `dist/`).
 */
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_700Bold,
    Archivo_900Black,
  });

  const fontsSettled = fontsLoaded || !!fontError;

  const onLayout = useCallback(() => {
    if (fontsSettled) SplashScreen.hideAsync().catch(() => {});
  }, [fontsSettled]);

  // En nativo las fuentes vienen del bundle local y resuelven de inmediato, así
  // que esperar evita un parpadeo. En web bloquear el render dejaba la página en
  // blanco hasta que resolvían todas las descargas (FCP medido: 3 884 ms). Ahí
  // pintamos ya y el texto cambia de fuente al llegar — los tokens declaran una
  // pila de respaldo del sistema para que el primer frame sea legible.
  if (Platform.OS !== 'web' && !fontsSettled) return null;

  return (
    <View style={styles.canvas} onLayout={onLayout}>
      <AppProviders>
        <StatusBar style="dark" />
        <RootNavigator />
      </AppProviders>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
