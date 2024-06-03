import { OrderService } from "@/actions/order-service";
import { HistorySneakerCard } from "@/components/ui/history-sneaker-card";
import { Title } from "@/components/ui/title";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

const Index = () => {
  const pathname = usePathname()
  const { user } = useSession();
  const { data: orders } = useQuery({
    queryKey: ["order-by-user-id", user?.id, pathname],
    queryFn: () => OrderService.getByUserId({ id: user?.id ?? "" }),
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.plus_container}>
        <Title>История платежей</Title>
      </View>

      <View style={{ marginBottom: 50 }}>
        {orders?.map((order) => (
          <HistorySneakerCard
            key={order.id}
            sneakers={order.sneakers}
            order={order}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 60,
  },

  plus_container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  plus_icon: {
    borderWidth: 1,
    borderColor: "rgb(16, 16, 16)",
    borderRadius: 50,
    padding: 5,
  },
});
