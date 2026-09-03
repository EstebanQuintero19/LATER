import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProjectsStackParamList = {
  ProjectsList: undefined;
  ProjectDetail: { projectId: string };
};

export type CatalogStackParamList = {
  CatalogList: undefined;
  ProductDetail: { productId: string };
};

export type MainTabParamList = {
  ProjectsTab: NavigatorScreenParams<ProjectsStackParamList>;
  CatalogTab: NavigatorScreenParams<CatalogStackParamList>;
  CartTab: undefined;
  AppointmentsTab: undefined;
  NotificationsTab: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type ProjectsStackScreenProps<T extends keyof ProjectsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProjectsStackParamList, T>,
    CompositeScreenProps<
      BottomTabScreenProps<MainTabParamList, 'ProjectsTab'>,
      RootStackScreenProps<'Main'>
    >
  >;

export type CatalogStackScreenProps<T extends keyof CatalogStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CatalogStackParamList, T>,
    CompositeScreenProps<
      BottomTabScreenProps<MainTabParamList, 'CatalogTab'>,
      RootStackScreenProps<'Main'>
    >
  >;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<'Main'>
  >;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
