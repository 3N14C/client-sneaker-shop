import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, ScrollView } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";
import { OrderService } from "@/actions/order-service";
import { SneakerOrderCard } from "@/components/ui/sneaker-order-card";
import { LayoutOrders } from "@/components/tabs/orders/layout-orders";
import { useState } from "react";
import { OrderStatus } from "@/types/enums/order-status-enum";

export default function TabTwoScreen() {
  const { user } = useSession();
  const [focus, setFocus] = useState<OrderStatus>(OrderStatus.CREATED);

  const { data: orders } = useQuery({
    queryKey: ["orders-by-user-id", user?.id, focus],
    queryFn: () =>
      OrderService.getByOrderStatus({ userId: user?.id ?? "", status: focus }),
  });

  return (
    <ScrollView style={{ ...styles.container }}>
      <LayoutOrders focus={focus} setFocus={setFocus}>
        <View style={{ gap: 60, marginBottom: 60 }}>
          {orders?.map((order) => (
            <View key={order.id}>
              {order.sneakers.map((sneaker) => (
                <SneakerOrderCard
                  key={sneaker.id}
                  sneaker={sneaker}
                  order={order}
                />
              ))}
            </View>
          ))}
        </View>
      </LayoutOrders>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
});
