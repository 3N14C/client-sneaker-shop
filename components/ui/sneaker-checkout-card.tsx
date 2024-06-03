import { useCart } from "@/store/cart";
import { router } from "expo-router";
import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SneakerPrice } from "./sneaker-price";

export const SneakerCheckoutCard: FC = () => {
  const { sneakers } = useCart();

  return (
    <View>
      {sneakers.map((sneaker) => (
        <Pressable
          onPress={() => router.push(`/sneaker/${sneaker.id}`)}
          style={{
            backgroundColor: "#fff",
            marginBottom: 20,
            borderRadius: 20,
            marginTop: 20,
          }}
          key={sneaker.id}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 20,
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <View style={{ ...styles.container_sneaker }}>
              <Image
                width={100}
                style={{ paddingBottom: 100 }}
                source={{ uri: sneaker.img[0] }}
              />
            </View>

            <View>
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontWeight: "bold",
                      fontSize: 15,
                      maxWidth: 150,
                    }}
                  >
                    {sneaker.name}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      ...styles.sneakerSize,
                      marginTop: sneaker.name.length > 15 ? 10 : 0,
                    }}
                  >
                    {sneaker.sizeName}
                  </Text>
                </View>

                <View>
                  <SneakerPrice sneaker={sneaker} />
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container_sneaker: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  sneakerSize: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
  },
});
