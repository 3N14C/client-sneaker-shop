import { OrderType } from "@/types/order-type";
import { SneakerType } from "@/types/sneaker";
import { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { SneakerPrice } from "./sneaker-price";
import { ArrowUp } from "lucide-react-native";
import { router, usePathname } from "expo-router";

interface IProps {
  sneakers: SneakerType[];
  order: Omit<OrderType, "sneakers">;
}

export const HistorySneakerCard: FC<IProps> = ({ sneakers, order }) => {
  const pathname = usePathname();

  return (
    <View style={{ marginVertical: 30 }}>
      {sneakers?.map((sneaker) => (
        <TouchableOpacity
          key={sneaker.id}
          onPress={() =>
            router.push({
              pathname: `profile/payment/history/${order.id}`,
              params: { sneakerId: sneaker.id },
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: "#f4f4f4",
                }}
                source={{ uri: sneaker.img[0] }}
              />

              <View
                style={{
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {sneaker.name}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#b1b1b1",
                    }}
                  >
                    {moment(order.createdAt).format("DD.MM.YYYY")}
                  </Text>
                  <Text
                    style={{
                      color: "#b1b1b1",
                    }}
                  >
                    |
                  </Text>
                  <Text
                    style={{
                      color: "#b1b1b1",
                    }}
                  >
                    {moment(order.createdAt).format("HH:mm")}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <SneakerPrice sneaker={sneaker} />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 5,
                }}
              >
                <Text>Оплата</Text>
                {/* <Icon
                size={10}
                color="white"
                name="arrow-up"
                style={{
                  backgroundColor: "#f75555",
                  borderRadius: 5,
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                }}
              /> */}
                <ArrowUp
                  size={10}
                  color="white"
                  style={{
                    backgroundColor: "#f75555",
                    borderRadius: 5,
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
