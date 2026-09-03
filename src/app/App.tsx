import { StatusBar } from 'expo-status-bar';

import { AppProviders } from './providers/AppProviders';
import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <RootNavigator />
    </AppProviders>
  );
}
