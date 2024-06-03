import { Slot, Stack } from "expo-router";
import { Text, View } from "react-native";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, statusBarColor: '#000', statusBarAnimation: 'fade' }}>
      <Stack.Screen
        name="sign-in/index"
        options={{ headerTitle: "fdsfds", title: "fdsafdsa" }}
      />
    </Stack>
  );
};

export default Layout;
