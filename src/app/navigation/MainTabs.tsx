import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, fonts } from '@/design-system';
import { strings } from '@/i18n';
import { AppointmentsScreen } from '@/features/appointments/screens/AppointmentsScreen';
import { CartScreen } from '@/features/cart/screens/CartScreen';
import { CatalogStack } from '@/features/catalog/CatalogStack';
import { NotificationsScreen } from '@/features/notifications/screens/NotificationsScreen';
import { ProjectsStack } from '@/features/projects/ProjectsStack';
import { useCart } from '@/features/cart/hooks/useCart';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';

import { tabHeaderOptions } from './screenOptions';
import { SignOutButton } from './SignOutButton';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IoniconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<keyof MainTabParamList, IoniconName> = {
  ProjectsTab: 'briefcase-outline',
  CatalogTab: 'pricetags-outline',
  CartTab: 'cart-outline',
  AppointmentsTab: 'calendar-outline',
  NotificationsTab: 'notifications-outline',
};

export function MainTabs() {
  const { count: cartCount } = useCart();
  const { unreadCount } = useNotifications();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundRaised,
          borderTopColor: colors.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.sansSemiBold,
          fontSize: 11,
          letterSpacing: 0.2,
        },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={
              focused
                ? (ICONS[route.name].replace('-outline', '') as IoniconName)
                : ICONS[route.name]
            }
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="ProjectsTab"
        component={ProjectsStack}
        options={{ title: strings.tabs.projects }}
      />
      <Tab.Screen
        name="CatalogTab"
        component={CatalogStack}
        options={{ title: strings.tabs.catalog }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          ...tabHeaderOptions,
          title: strings.tabs.cart,
          headerRight: () => <SignOutButton />,
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen
        name="AppointmentsTab"
        component={AppointmentsScreen}
        options={{
          ...tabHeaderOptions,
          title: strings.tabs.appointments,
          headerRight: () => <SignOutButton />,
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          ...tabHeaderOptions,
          title: strings.tabs.notifications,
          tabBarLabel: 'Avisos',
          headerRight: () => <SignOutButton />,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}
