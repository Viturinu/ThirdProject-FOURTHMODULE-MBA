import { Tabs } from "expo-router";
import HomeSvg from "@assets/images/home.svg";
import HistorySvg from "@assets/images/history.svg";
import ProfileSvg from "@assets/images/profile.svg";

export default function AuthLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#00B37E', //Lá embaixo, pelo meu entendimento, como estamos importando uma logo que vem por padrão com uma cor preta, podemos usar as cores tabBarActiveTintColor e tabBarInactiveTintColor pra tambem preencher essa logo dinamicamente, desestruturando ela
            tabBarInactiveTintColor: "#c4c4cc",
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#202024',
                borderTopWidth: 0,
                paddingBottom: 60,
                paddingTop: 8,
            }
        }}>
            <Tabs.Screen name="home/index" options={{ title: "Home", tabBarIcon: ({ color }) => <HomeSvg fill={color} /> }} />
            <Tabs.Screen name="history/index" options={{ title: "History", tabBarIcon: ({ color }) => <HistorySvg fill={color} /> }} />
            <Tabs.Screen name="profile/index" options={{ title: "Exercise", tabBarIcon: ({ color }) => <ProfileSvg fill={color} /> }} />
            <Tabs.Screen name="exercise/index" options={{ href: null }} />
        </Tabs>
    );
}
