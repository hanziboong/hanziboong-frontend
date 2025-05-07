import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import { Ionicons } from '@expo/vector-icons';
import RulesScreen from '@/screens/Rules/RulesScreen';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string) => {
  function TabBarIcon({ color, size }: { color: string; size: number }) {
    const iconName = routeName === 'Calendar' ? 'calendar' : 'list';
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
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Rules" component={RulesScreen} />
    </Tab.Navigator>
  );
}
