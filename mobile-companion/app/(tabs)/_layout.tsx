import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const icons = { index: "pulse-outline", omniland: "sparkles-outline", mirror: "finger-print-outline", create: "film-outline", sources: "library-outline" } as const;

export default function TabLayout() {
  return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: "#00D4FF", tabBarInactiveTintColor: "#8293A4", tabBarStyle: { backgroundColor: "#071426", borderTopColor: "rgba(0,212,255,.18)", paddingTop: 8, height: Platform.OS === "ios" ? 84 : 68 }, tabBarLabelStyle: { fontSize: 10, fontWeight: "700" }, tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name as keyof typeof icons]} size={size} color={color}/> })}><Tabs.Screen name="index" options={{ title: "Signal" }}/><Tabs.Screen name="omniland" options={{ title: "Omniland" }}/><Tabs.Screen name="mirror" options={{ title: "Mirror" }}/><Tabs.Screen name="create" options={{ title: "Create" }}/><Tabs.Screen name="sources" options={{ title: "Sources" }}/></Tabs>;
}
