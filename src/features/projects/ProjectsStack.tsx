import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultStackScreenOptions } from '@/app/navigation/screenOptions';
import { SignOutButton } from '@/app/navigation/SignOutButton';
import type { ProjectsStackParamList } from '@/app/navigation/types';
import { strings } from '@/i18n';

import { ProjectDetailScreen } from './screens/ProjectDetailScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export function ProjectsStack() {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="ProjectsList"
        component={ProjectsScreen}
        options={{
          title: strings.tabs.projects,
          headerRight: () => <SignOutButton />,
        }}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: 'Proyecto' }}
      />
    </Stack.Navigator>
  );
}
