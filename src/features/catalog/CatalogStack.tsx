import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderActions } from '@/app/navigation/HeaderActions';
import { defaultStackScreenOptions } from '@/app/navigation/screenOptions';
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
          headerRight: () => <HeaderActions />,
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
