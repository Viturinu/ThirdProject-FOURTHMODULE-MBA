import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in/index" options={{ title: "Sign in" }} />
            <Stack.Screen name="sign-up/index" options={{ title: "Sign up" }} />
        </Stack>
    );
}
