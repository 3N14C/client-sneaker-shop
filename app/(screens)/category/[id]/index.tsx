import { CategoryService } from "@/actions/category-service";
import { SneakerCard } from "@/components/ui/sneaker-card";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { id } = useLocalSearchParams();
  const { data: category } = useQuery({
    queryKey: ["category-by-id", id],
    queryFn: () => CategoryService.getById({ id: id as string }),
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ ...styles.container }}>
        <View style={{ ...styles.container_item }}>
          {category?.sneakers?.map((sneaker, idx) => (
            <SneakerCard key={sneaker.id} sneaker={sneaker} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },

  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});
