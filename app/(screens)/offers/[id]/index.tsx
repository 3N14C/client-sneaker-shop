import { OfferService } from "@/actions/offer-service";
import { SneakerCard } from "@/components/ui/sneaker-card";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const { id } = useLocalSearchParams();
  const { data: offer } = useQuery({
    queryKey: ["offer-by-id", id],
    queryFn: () => OfferService.getById({ id: id as string }),
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          width:
            offer?.sneakers?.length && offer?.sneakers?.length > 1
              ? "100%"
              : 150,
          ...styles.container_item,
        }}
      >
        {offer?.sneakers?.map((sneaker) => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },

  container_item: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
