import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import { Ionicons } from '@expo/vector-icons';
import RulesScreen from '@/screens/Rules/RulesScreen';
import AccountBookScreen from '@/screens/AccountBookScreen';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string) => {
  function TabBarIcon({ color, size }: { color: string; size: number }) {
    let iconName: keyof typeof Ionicons.glyphMap;
    if (routeName === '캘린더') {
      iconName = 'calendar';
    } else if (routeName === '규칙') {
      iconName = 'list';
    } else {
      iconName = 'cash';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  }

  TabBarIcon.displayName = 'TabBarIcon';
  return TabBarIcon;
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: '#FFB338',
        tabBarInactiveTintColor: '#FFB33850',
      })}
    >
      <Tab.Screen name="캘린더" component={CalendarScreen} />
      <Tab.Screen name="규칙" component={RulesScreen} />
      <Tab.Screen name="공동 가계부" component={AccountBookScreen} />
    </Tab.Navigator>
  );
}
