import { OfferService } from "@/actions/offer-service";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { ScrollView, TouchableHighlight, View } from "react-native";
import { OfferCard } from "../ui/offer-card";
import { router } from "expo-router";

export const OfferList: FC = () => {
  const { data: offers } = useQuery({
    queryKey: ["all-offers"],
    queryFn: OfferService.getAll,
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "white", paddingVertical: 40 }}
    >
      {/* {isLoading && <OfferSkeleton length={offer?.length} />} */}

      <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
        {offers?.map((offer, idx) => (
          <View key={offer.id}>
            <TouchableHighlight
              underlayColor={"transparent"}
              onPress={() => router.push(`/offers/${offer.id}`)}
            >
              <OfferCard
                offer={offer}
                background={
                  idx === 0
                    ? "#ce081e"
                    : idx === 1
                      ? "#7a5548"
                      : idx === 2
                        ? "#607d8a"
                        : "#3f51b2"
                }
              />
            </TouchableHighlight>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
