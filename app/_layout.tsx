import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Slot } from "expo-router";
import { Roboto_700Bold, Roboto_400Regular } from "@expo-google-fonts/roboto"
import "../global.css";
import { Box } from "@/components/ui/box";
import { StatusBar } from "@/components/ui/status-bar";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync(); //aqui ele previne que o SplashScreen saia; no useEffect que controlaremos esse HideAsync

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  const [styleLoaded, setStyleLoaded] = useState(false); //carregamento dos estilos
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error; //se existir o erro no retorno do useFonts, joga o erro pra frente
  }, [error]); //assim que mudar o error, use effect dispara de novo

  useEffect(() => {
    if (fontsLoaded) { //se loaded carregado, então esconde splashscreen
      SplashScreen.hideAsync(); //caso fontsLoaded seja carregado, ele minimiza o Splashscreen no ato.
    }
  }, [fontsLoaded]); //assim que loaded mudar, dispara de novo o effect

  // useLayoutEffect(() => {
  //   setStyleLoaded(true);
  // }, [styleLoaded]);

  // if (!loaded || !styleLoaded) {
  //   return null;
  // }

  return <RootLayoutNav />; //criou a função ali embaixo, ao inves de criar a função padrão, com ( <View></View>)
}

function RootLayoutNav() {

  const colorScheme = useColorScheme();
  const theme = DefaultTheme;
  theme.colors.background = "#121214";

  return (
    <Box className="flex-1 bg-black">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content" // ou "dark-content", conforme o fundo
      />
      <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Slot />
        </ThemeProvider>
      </GluestackUIProvider>

    </Box>
  );
}
