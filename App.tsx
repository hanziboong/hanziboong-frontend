import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigation from '@/navigation/BottomTabNavigation';
import RuleFormScreen from '@/screens/Rules/RuleFormScreen';
import { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name="RuleFormScreen"
          component={RuleFormScreen}
          options={{ title: '규칙 관리' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
