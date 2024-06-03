import { SneakerService } from "@/actions/sneaker-service";
import { PopularNavbar } from "@/components/ui/popular-navbar";
import { SneakerCard } from "@/components/ui/sneaker-card";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Popular: FC = () => {
  const [categoryId, setCategoryId] = useState<string>("Все");

  const { data: sneakers } = useQuery({
    queryKey: ["all-popular-sneakers", categoryId],
    queryFn: () =>
      SneakerService.getPopularByCategoryId({
        id: categoryId,
      }),
  });

  return (
    <View style={styles.container}>
      <View style={styles.container_inner}>
        <Text style={styles.title}>Популярное</Text>
      </View>

      <View>
        <PopularNavbar categoryId={categoryId} setCategoryId={setCategoryId} />

        <View style={styles.container_item}>
          {sneakers?.map((sneaker, idx) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  container_inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
