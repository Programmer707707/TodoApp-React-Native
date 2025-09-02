import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';

export default function TabLayout() {
    const {colors} = useTheme();
    return (
      <Tabs screenOptions={{ 
              tabBarActiveTintColor: '#88E788',
              tabBarInactiveTintColor: colors.textMuted,
              tabBarStyle: {
                  backgroundColor: colors.surface,
                  paddingBottom: 10,
                  paddingTop: 0,
                  height: 70,
                  borderTopColor: colors.border
              },
              tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: "600"
              },
              headerShown: false
          }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Todos',
            tabBarIcon: ({ color }) => <Ionicons size={25} name="flash-outline" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Ionicons size={25} name="cog" color={color} />,
          }}
        />
      </Tabs>
    );
}
