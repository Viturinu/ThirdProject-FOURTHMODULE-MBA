import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in/index" options={{ title: "Sign in" }} />
            <Stack.Screen name="sign-up/index" options={{ title: "Sign up" }} />
        </Stack>
    );
}
