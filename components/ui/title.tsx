import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
  children: React.ReactNode;
}

export const Title: FC<IProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={{paddingVertical: 5}}>
        <ChevronLeft size={20} color={"black"} />
      </Pressable>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  }
});
