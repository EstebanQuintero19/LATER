import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultStackScreenOptions } from '@/app/navigation/screenOptions';
import { SignOutButton } from '@/app/navigation/SignOutButton';
import type { CatalogStackParamList } from '@/app/navigation/types';
import { strings } from '@/i18n';

import { CatalogScreen } from './screens/CatalogScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';

const Stack = createNativeStackNavigator<CatalogStackParamList>();

export function CatalogStack() {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="CatalogList"
        component={CatalogScreen}
        options={{
          title: strings.tabs.catalog,
          headerRight: () => <SignOutButton />,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: strings.catalog.detailTitle }}
      />
    </Stack.Navigator>
  );
}
