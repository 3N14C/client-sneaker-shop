import { RemoveSneakerModal } from "@/components/ui/modals/remove-sneaker-modal";
import { SneakerPrice } from "@/components/ui/sneaker-price";
import { useCurrentPrice } from "@/hooks/use-current-price";
import { SneakerCartType, useCart } from "@/store/cart";
import { router } from "expo-router";
import { ArrowRight, Trash2 } from "lucide-react-native";
import { FC, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const Profile: FC = () => {
  const { sneakers, totalPrice } = useCart();
  const [sneaker, setSneaker] = useState<SneakerCartType | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const currentPrice = useCurrentPrice();

  return (
    <View style={{ ...styles.container }}>
      <RemoveSneakerModal
        sneaker={sneaker ?? ({} as SneakerCartType)}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 120 }}
      >
        {sneakers?.map((sneaker) => (
          <Pressable
            onPress={() => router.push(`/sneaker/${sneaker.id}`)}
            style={{ backgroundColor: "#fff", marginBottom: 20 }}
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
              <Trash2
                onPress={() => {
                  setSneaker(sneaker);
                  setModalVisible(true);
                }}
                color={"red"}
                size={18}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 20,
                  zIndex: 22,
                  width: 40,
                  height: 40,
                }}
              />
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
                        width: "90%",
                      }}
                    >
                      {sneaker.name.length > 15
                        ? sneaker.name.slice(0, 15) + "..."
                        : sneaker.name}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        ...styles.sneakerSize,
                        marginTop: sneaker.name.length > 15 ? 10 : 10,
                      }}
                    >
                      {/* @ts-ignore */}
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
      </ScrollView>

      <View style={[styles.containerOrder]}>
        <View>
          <Text style={{ color: "#adadab", fontSize: 10 }}>Итоговая цена</Text>
          <Text style={{ color: "#222223", fontWeight: "bold", fontSize: 25 }}>
            {(totalPrice * currentPrice).toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </Text>
        </View>

        <TouchableHighlight
          underlayColor={"#393939"}
          onPress={() => router.push("/checkout")}
          style={{
            ...styles.button,
            backgroundColor:
              sneakers?.length === 0 ? "rgba(0, 0, 0, 0.3)" : "#101010",
          }}
          disabled={sneakers?.length === 0}
        >
          <View style={styles.buttonInner}>
            <Text style={{ color: "#fff", fontSize: 18 }}>Подтвердить</Text>
            {/* <Icon style={{ color: "#fff" }} name="arrow-right" size={20} /> */}
            <ArrowRight size={20} color={"#fff"} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 20,
    paddingTop: 50,
    position: "relative",
  },

  button: {
    backgroundColor: "#101010",
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container_sneaker: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
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

  containerOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "110%",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    borderTopWidth: 0.2,
    borderColor: "rgba(0,0,0,0.1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 120,
    alignItems: "center",
  },
});
