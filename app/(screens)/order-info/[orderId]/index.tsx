import { OrderService } from "@/actions/order-service";
import { OrderStatusDetails } from "@/components/ui/order-status-details";
import { OrderStatusList } from "@/components/ui/order-status-list";
import { SneakerOrderCard } from "@/components/ui/sneaker-order-card";
import { SneakerPrice } from "@/components/ui/sneaker-price";
import { OrderType } from "@/types/order-type";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { orderId, sneakerId } = useLocalSearchParams();
  const { data: order } = useQuery({
    queryKey: ["order-info", orderId, sneakerId],
    queryFn: () =>
      OrderService.getBySneakerId({
        id: orderId as string,
        sneakerId: sneakerId as string,
      }),
  });

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {order?.sneakers.map((sneaker) => (
          <Pressable
            onPress={() => router.push(`/sneaker/${sneaker.id}`)}
            style={{ flexDirection: "row", gap: 10 }}
          >
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
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {sneaker.name}
              </Text>
              <View
                style={{ flexDirection: "row", gap: 30, alignItems: "center" }}
              >
                <SneakerPrice sneaker={sneaker} />
              </View>
            </View>
          </Pressable>
        ))}

        <OrderStatusList order={order ?? ({} as OrderType)} />
        <OrderStatusDetails order={order ?? ({} as OrderType)} />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
});
