import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import { colors, fonts, radii, spacing, useResponsive } from '@/design-system';
import { strings } from '@/i18n';
import { AppointmentsScreen } from '@/features/appointments/screens/AppointmentsScreen';
import { ProfileScreen } from '@/features/auth/screens/ProfileScreen';
import { CartScreen } from '@/features/cart/screens/CartScreen';
import { CatalogStack } from '@/features/catalog/CatalogStack';
import { NotificationsScreen } from '@/features/notifications/screens/NotificationsScreen';
import { ProjectsStack } from '@/features/projects/ProjectsStack';
import { useCart } from '@/features/cart/hooks/useCart';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';

import { HeaderActions } from './HeaderActions';
import { tabHeaderOptions } from './screenOptions';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IoniconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<keyof MainTabParamList, IoniconName> = {
  ProjectsTab: 'briefcase-outline',
  CatalogTab: 'pricetags-outline',
  CartTab: 'cart-outline',
  AppointmentsTab: 'calendar-outline',
  NotificationsTab: 'notifications-outline',
  ProfileTab: 'person-circle-outline',
};

export function MainTabs() {
  const { count: cartCount } = useCart();
  const { unreadCount } = useNotifications();
  const { isDesktop } = useResponsive();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // En escritorio la navegación vive en un rail lateral fijo; en móvil
        // sigue siendo la barra inferior de siempre.
        tabBarPosition: isDesktop ? 'left' : 'bottom',
        tabBarVariant: isDesktop ? 'material' : 'uikit',
        tabBarLabelPosition: isDesktop ? 'beside-icon' : undefined,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarActiveBackgroundColor: isDesktop ? colors.primarySoft : undefined,
        tabBarStyle: isDesktop ? styles.sidebar : styles.bottomBar,
        tabBarItemStyle: isDesktop ? styles.sidebarItem : undefined,
        tabBarLabelStyle: isDesktop ? styles.sidebarLabel : styles.bottomLabel,
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
          headerRight: () => <HeaderActions />,
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen
        name="AppointmentsTab"
        component={AppointmentsScreen}
        options={{
          ...tabHeaderOptions,
          title: strings.tabs.appointments,
          headerRight: () => <HeaderActions />,
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          ...tabHeaderOptions,
          title: strings.tabs.notifications,
          tabBarLabel: 'Avisos',
          headerRight: () => <HeaderActions />,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          ...tabHeaderOptions,
          title: strings.profile.title,
          // Sin botón en el rail/barra: sólo se llega vía el ícono de perfil
          // de la cabecera, pero el rail sigue montado (no se pierde al navegar).
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colors.backgroundRaised,
    borderTopColor: colors.border,
    height: 64,
    paddingTop: 6,
    paddingBottom: 8,
  },
  bottomLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    letterSpacing: 0.2,
  },
  sidebar: {
    width: 232,
    backgroundColor: colors.backgroundRaised,
    borderRightColor: colors.border,
  },
  sidebarItem: {
    borderRadius: radii.md,
    marginHorizontal: spacing.sm,
  },
  sidebarLabel: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    letterSpacing: 0.1,
  },
});
