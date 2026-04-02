import { Tabs } from "expo-router";
import { Icon } from "../../components/ui";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Icon color={color} name="House" />,
        }}
      />
    </Tabs>
  );
}
