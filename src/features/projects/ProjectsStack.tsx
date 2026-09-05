import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderActions } from '@/app/navigation/HeaderActions';
import { defaultStackScreenOptions } from '@/app/navigation/screenOptions';
import type { ProjectsStackParamList } from '@/app/navigation/types';
import { strings } from '@/i18n';

import { ProjectDetailScreen } from './screens/ProjectDetailScreen';
import { ProjectMessagesScreen } from './screens/ProjectMessagesScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { RequestRemodelScreen } from './screens/RequestRemodelScreen';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export function ProjectsStack() {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="ProjectsList"
        component={ProjectsScreen}
        options={{
          title: strings.tabs.projects,
          headerRight: () => <HeaderActions />,
        }}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: strings.projects.detailTitle }}
      />
      <Stack.Screen
        name="RequestRemodel"
        component={RequestRemodelScreen}
        options={{ title: strings.requestRemodel.title }}
      />
      <Stack.Screen
        name="ProjectMessages"
        component={ProjectMessagesScreen}
        options={{ title: strings.messages.title }}
      />
    </Stack.Navigator>
  );
}
