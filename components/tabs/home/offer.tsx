import { OfferService } from "@/actions/offer-service";
import { OfferType } from "@/types/offer";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FC, useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

export const Offer: FC = () => {
  const { data: offers } = useQuery({
    queryKey: ["all-offers"],
    queryFn: OfferService.getAll,
  });

  const flatArrayOffer = useMemo(
    () =>
      Array.prototype.concat.apply(
        [],
        offers?.map((offer) => offer) as OfferType[]
      ),
    [offers]
  );

  const randomIdxOffer = Math.floor(Math.random() * flatArrayOffer?.length);

  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 10,
        }}
      >
        {offers?.map((offer, idx) => (
          <View key={offer.id}>
            {idx === randomIdxOffer && (
              <TouchableOpacity
                style={{
                  ...styles.special_offer,
                  backgroundColor:
                    idx === 0
                      ? "#ce081e"
                      : idx === 1
                        ? "#7a5548"
                        : idx === 2
                          ? "#607d8a"
                          : "#3f51b2",
                  shadowColor:
                    idx === 0
                      ? "#ce081e"
                      : idx === 1
                        ? "#7a5548"
                        : idx === 2
                          ? "#607d8a"
                          : "#3f51b2",
                }}
                onPress={() => router.push(`/offers/${offer.id}`)}
              >
                <View style={{ ...styles.special_offer_item }} key={offer.id}>
                  <View>
                    <Text
                      style={{
                        ...styles.offer_item_text,
                        fontSize: 25,
                        fontWeight: "bold",
                      }}
                    >
                      {offer.discount}%
                    </Text>
                    <Text
                      style={{
                        ...styles.offer_item_text,
                        fontSize: 20,
                        fontWeight: "500",
                        marginTop: 10,
                      }}
                    >
                      {offer.name}
                    </Text>
                    <Text
                      style={{
                        ...styles.offer_item_text,
                        fontSize: 10,
                        maxWidth: 125,
                        marginTop: 10,
                      }}
                    >
                      {offer.description}
                    </Text>
                  </View>

                  {
                    offer?.sneakers?.map((sneaker, idx) => (
                      <View key={sneaker.id}>
                        <Image
                          style={{ width: 160, height: 100 }}
                          source={{ uri: sneaker.img[0] }}
                        />
                      </View>
                    ))[0]
                  }
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  special_offer: {
    position: "relative",
    // marginTop: 20,
    borderRadius: 30,
    padding: 20,
  },

  special_offer_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  offer_item_text: {
    color: "white",
    maxWidth: 150,
  },
});
