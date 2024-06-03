import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ClipboardList, Home, ShoppingCart, User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? "home" : "home"} color={color} />
            <Home color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Корзина",
          tabBarIcon: ({ color, focused }) => <ShoppingCart color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Заказы",
          tabBarIcon: ({ color, focused }) => <ClipboardList color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color, focused }) => <User color={color} />,
        }}
      />
    </Tabs>
  );
}
