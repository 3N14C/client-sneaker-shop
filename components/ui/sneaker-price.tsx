import { useCurrentPrice } from "@/hooks/use-current-price";
import { SneakerType } from "@/types/sneaker";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
  sneaker: SneakerType;
}

export const SneakerPrice: FC<IProps> = ({ sneaker }) => {
const currentPrice = useCurrentPrice();

if (!sneaker) return null

  return (
    <Text style={{ ...styles.sneakerPriceOffer }}>
      {sneaker?.offer ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Text
            style={{
              ...styles.sneakerPrice,
              fontSize: 12,
              marginRight: 10,
              textDecorationLine: "line-through",
              color: "#ccc",
              position: "absolute",
              top: -15,
            }}
          >
            {(sneaker.price * currentPrice).toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </Text>

          <Text style={{ ...styles.sneakerPrice }}>
            {(
              sneaker?.price *
              currentPrice *
              (1 - sneaker?.offer.discount / 100)
            ).toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })}
          </Text>
        </View>
      ) : (
        <Text style={{ ...styles.sneakerPrice }}>
          {(sneaker.price * currentPrice).toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </Text>
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  sneakerPrice: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 5,
  },

  sneakerPriceOffer: {
    color: "#101010",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
  },
});