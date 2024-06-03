import { useFavoriteStore } from "@/store/favorite";
import { SneakerType } from "@/types/sneaker";
import { Heart, Star } from "lucide-react-native";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SneakerPrice } from "./sneaker-price";
import { router } from "expo-router";

interface IProps {
  sneaker: SneakerType;
}

export const SneakerCard: FC<IProps> = ({ sneaker }) => {
  const { sneakers, addToFavorite } = useFavoriteStore();

  return (
    <TouchableOpacity onPress={() => router.push(`sneaker/${sneaker.id}`)}>
      <View
        style={{
          marginBottom: 30,
        }}
      >
        {((new Date(sneaker.createdAt).getTime() -
          new Date().getTime()) as any) < 86400000 && ( // 1 day
          <Text
            style={{
              position: "absolute",
              zIndex: 80,
              color: "white",
              fontWeight: "bold",
              fontSize: 12,
              backgroundColor: "red",
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 5,
            }}
          >
            New!
          </Text>
        )}
        <View style={styles.container_sneaker}>
          <Heart
            // solid
            color={
              sneakers.some((i) => i.id === sneaker.id) ? "red" : "#101010"
            }
            style={{
              paddingHorizontal: 2,
              paddingVertical: 10,
              width: 40,
              borderRadius: 50,
              position: "absolute",
              right: 10,
              top: 5,
              zIndex: 20,
            }}
            size={15}
            onPress={() => addToFavorite(sneaker)}
          />
          <Image
            style={{
              width: 100,
              height: 100,
              zIndex: 10,
            }}
            source={{ uri: sneaker.img[0] }}
          />
        </View>
        <Text style={{ ...styles.sneakerName }}>
          {sneaker.name?.length >= 15
            ? `${sneaker.name.slice(0, 15)}...`
            : sneaker.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Star color={"#101010"} size={14} />
          <Text style={{ ...styles.rating }}>{sneaker.rating} | </Text>
          <Text style={{ ...styles.soldCount }}>
            {sneaker.soldCount} продано
          </Text>
        </View>
        <SneakerPrice sneaker={sneaker} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rating: {
    color: "#626164",
    fontSize: 13,
    marginLeft: 5,
  },

  soldCount: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  container_sneaker: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },

  sneakerName: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "bold",
  },
});
