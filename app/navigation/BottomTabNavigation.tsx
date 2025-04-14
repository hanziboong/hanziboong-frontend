import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import { Ionicons } from '@expo/vector-icons';
import ScheduleFormScreen from '@/screens/ScheduleFormScreen';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string) => {
  function TabBarIcon({ color, size }: { color: string; size: number }) {
    const iconName = routeName === 'Calendar' ? 'calendar' : 'calendar';
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
    </Tab.Navigator>
  );
}
