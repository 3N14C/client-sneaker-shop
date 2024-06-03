import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Providers } from "@/providers/providers";
import { useSession } from "@/store/session";
import Toast from "react-native-toast-message";
import { ModalPortal } from "react-native-modals";
import { StatusBar } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user } = useSession();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/main-font.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      if (!user) {
        router.replace("/(auth)/sign-in");
      }
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Providers>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Providers>
      <StatusBar backgroundColor={"#000"} barStyle={"dark-content"} />
      <ModalPortal />
      <Toast />
    </ThemeProvider>
  );
}
