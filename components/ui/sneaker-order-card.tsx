import { useOrderStatus } from "@/hooks/use-order-status";
import { OrderType } from "@/types/order-type";
import { SneakerType } from "@/types/sneaker";
import { router } from "expo-router";
import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SneakerPrice } from "./sneaker-price";

interface IProps {
  sneaker: SneakerType;
  order: OrderType;
}

export const SneakerOrderCard: FC<IProps> = ({ sneaker, order }) => {
  const orderStatus = useOrderStatus(order.orderStatus);

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Image
        source={{ uri: sneaker.img[0] }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#f3f3f3",
          borderRadius: 20,
        }}
      />

      <View style={{ justifyContent: "space-around" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{sneaker.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              backgroundColor: "#f3f3f3",
              padding: 5,
              borderRadius: 5,
              color: "black",
            }}
          >
            {orderStatus}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 30, alignItems: "center" }}>
          <SneakerPrice sneaker={sneaker} />
          <Pressable
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: `/order-info/${order.id}`,
                params: { sneakerId: sneaker.id },
              })
            }
          >
            <Text style={{ color: "white" }}>Подробнее</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#101010",
  },
});
