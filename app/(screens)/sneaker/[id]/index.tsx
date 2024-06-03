import { SneakerService } from "@/actions/sneaker-service";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { SneakerPrice } from "@/components/ui/sneaker-price";
import { useCurrentPrice } from "@/hooks/use-current-price";
import { useCart } from "@/store/cart";
import { SneakerType } from "@/types/sneaker";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ShoppingBag, Star } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Toast from "react-native-toast-message";

const Index = () => {
  const { sneakers, addToCart } = useCart();
  const { id } = useLocalSearchParams();
  const [sizeName, setSizeName] = useState<string | null>(null);

  const { data: sneaker } = useQuery({
    queryKey: ["sneaker-by-id", id],
    queryFn: () => SneakerService.getById({ id: id as string }),
  });

  const handleAddToCart = ({ sizeName }: { sizeName: string }) => {
    if (!sneaker) return;
    if (!sizeName)
      return Toast.show({
        type: "error",
        text1: "Выберите размер",
      });

    addToCart({
      ...sneaker,
      sizeName,
    });
    Toast.show({
      type: "success",
      text1: "Товар добавлен в корзину",
    });
  };

  return (
    <ParallaxScrollView headerImage={
      <ScrollView horizontal>
        {sneaker?.img?.map((item) => (
          <Image
            key={item}
            source={{ uri: item }}
            style={{ width: 300, height: 500, resizeMode: "cover" }}
          />
        ))}
      </ScrollView>
    } headerBackgroundColor={{light: '#f3f3f3', dark: '#101010'}}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ paddingVertical: 0 }}>
          <View style={{ backgroundColor: "#f3f3f3" }}>
            {/* <ScrollView horizontal>
              {sneaker?.img?.map((item) => (
                <Image
                  key={item}
                  source={{ uri: item }}
                  style={{ width: 300, height: 500, resizeMode: "cover" }}
                />
              ))}
            </ScrollView> */}

            <View style={{ ...styles.container }}>
              <Text style={styles.sneakerTitle}>{sneaker?.name}</Text>

              <View style={{ ...styles.sneakerParams }}>
                <Text style={styles.soldCount}>
                  {sneaker?.soldCount} продано
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Star color={"#101010"} size={20} />
                  <Text>{sneaker?.rating}</Text>
                </View>
              </View>

              <View>
                <View
                  style={{
                    marginVertical: 20,
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      Описание
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                      {sneaker?.description || "lorem"}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        Размер
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {sneaker?.sizes.map((size) => (
                          <TouchableOpacity
                            key={size.id}
                            onPress={() => setSizeName(size.name)}
                          >
                            <Text
                              style={{
                                ...styles.sneakerSize,
                                color:
                                  sizeName === size.name ? "white" : "black",
                                backgroundColor:
                                  sizeName === size.name ? "#101010" : "#fff",
                              }}
                            >
                              {size.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>

                  <View style={{ ...styles.containerItem }}>
                    <View>
                      <Text style={{ ...styles.priceTitle }}>
                        Итоговая цена
                      </Text>

                      <SneakerPrice sneaker={sneaker ?? ({} as SneakerType)} />
                    </View>

                    <View>
                      <TouchableHighlight
                        underlayColor={"#393939"}
                        style={{
                          ...styles.button,
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.5,
                          shadowRadius: 3,
                          elevation: 5,
                        }}
                        onPress={() => handleAddToCart({ sizeName: sizeName! })}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <ShoppingBag
                            color={"white"}
                            size={20}
                            style={{ marginRight: 15 }}
                          />
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 15,
                            }}
                          >
                            Добавить
                          </Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingBottom: 20,
  },

  containerItem: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sneakerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  soldCount: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  sneakerParams: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  sneakerSize: {
    marginTop: 10,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 5,
  },

  priceTitle: {
    color: "#c1c1c1",
    fontSize: 12,
  },

  button: {
    backgroundColor: "#101010",
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 50,
    textAlign: "center",
  },
});
