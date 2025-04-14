import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigation from '@/navigation/BottomTabNavigation';
import ScheduleFormScreen from '@/screens/ScheduleFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleForm"
          component={ScheduleFormScreen}
          options={{ title: '일정 추가', headerBackTitle: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
