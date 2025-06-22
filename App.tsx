import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigation from '@/navigation/BottomTabNavigation';
import RuleFormScreen from '@/screens/Rules/RuleFormScreen';
import { RootStackParamList } from '@/types/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ShoppingDetailScreen from '@/screens/ShoppingDetailScreen';
import ExpenseDetailScreen from '@/screens/ExpenseDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            options={{ title: '공동규칙 관리', headerBackTitle: '' }}
          />
          <Stack.Screen
            name="ShoppingDetail"
            component={ShoppingDetailScreen}
            options={{ title: '사야 할 물건', headerBackTitle: '' }}
          />
          <Stack.Screen
            name="ExpenseDetailScreen"
            component={ExpenseDetailScreen}
            options={{ title: '지출 상세보기', headerBackTitle: '' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
