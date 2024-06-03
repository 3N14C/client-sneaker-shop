import { SneakerCard } from "@/components/ui/sneaker-card";
import { useFavoriteStore } from "@/store/favorite";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { sneakers } = useFavoriteStore();

  if (sneakers.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <Image
          source={require("@/assets/images/empty-favorite.png")}
          style={{ width: 200, height: 200 }}
        />
        <View
          style={{ flexDirection: "column", alignItems: "center", gap: 20 }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Вы еще не добавили ни одного товара в избранное
          </Text>
          <Pressable
          onPress={() => router.push("/")}
            style={{
              backgroundColor: "#000",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>На главную</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: sneakers.length > 1 ? "100%" : 150,
          ...styles.container_item,
        }}
      >
        {sneakers.map((sneaker) => (
          <View key={sneaker.id}>
            <SneakerCard sneaker={sneaker} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    marginTop: 60,
  },

  container_sneaker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  containerEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
