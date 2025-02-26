import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={24} color={color} />
          ),
          tabBarLabel: 'Transfer',
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift" size={24} color={color} />
          ),
          tabBarLabel: 'Rewards',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}
