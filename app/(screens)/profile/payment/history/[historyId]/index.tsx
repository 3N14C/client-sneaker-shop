import { OrderService } from "@/actions/order-service";
import { SneakerPrice } from "@/components/ui/sneaker-price";
import { useCurrentPrice } from "@/hooks/use-current-price";
import { SneakerType } from "@/types/sneaker";
import { useQuery } from "@tanstack/react-query";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import Barcode from "react-native-barcode-svg";

const Index = () => {
  const { historyId, sneakerId } = useLocalSearchParams();
  const currentPrice = useCurrentPrice();

  const { data: order } = useQuery({
    queryKey: ["order-by-snekaer-id", sneakerId, historyId],
    queryFn: () =>
      OrderService.getBySneakerId({
        id: historyId as string,
        sneakerId: sneakerId as string,
      }),
  });

  if (!order) return null;

  return (
    <View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
      {order.sneakers.map((sneaker) => (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Barcode
            value="123456789"
            format="CODE128"
            maxWidth={300}
            singleBarWidth={3}
            key={order?.id}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#000",
                letterSpacing: 1,
              }}
            >
              {sneakerId?.slice(0, 6)}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#000",
                letterSpacing: 1,
              }}
            >
              {sneakerId?.slice(10, 15)}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#000",
                letterSpacing: 1,
              }}
            >
              {sneakerId?.slice(20, 25)}
            </Text>
          </View>

          <Pressable
            onPress={() => router.push(`sneaker/${sneaker.id}`)}
            style={{
              marginTop: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
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

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {sneaker.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#a2a2a2",
                  }}
                >
                  {order?.street}
                </Text>
              </View>
            </View>
          </Pressable>

          <View style={{ marginTop: 40, gap: 20, width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#606060", fontWeight: "bold", fontSize: 18 }}
              >
                Стоимость
              </Text>

              <SneakerPrice sneaker={sneaker} />
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: "#ededed",
              }}
            />
          </View>

          <View
            style={{
              marginTop: 60,
              alignItems: "center",
              width: "100%",
              gap: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "#606060",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Способ оплаты
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#414141",
                  letterSpacing: 1,
                }}
              >
                MasterCard
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "#606060",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Дата
              </Text>

              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",

                    color: "#414141",
                    letterSpacing: 1,
                  }}
                >
                  {new Date(order?.createdAt).toLocaleString("default", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "#606060",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                ID
              </Text>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "#414141",
                      letterSpacing: 1,
                    }}
                  >
                    {historyId?.slice(4, 6)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "#414141",
                      letterSpacing: 1,
                    }}
                  >
                    {historyId?.slice(10, 15)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "#414141",
                      letterSpacing: 1,
                    }}
                  >
                    {historyId?.slice(20, 30)}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "#606060",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Статус
              </Text>

              <Text
                style={{
                  backgroundColor: "#181818",
                  borderRadius: 5,
                  paddingVertical: 7,
                  paddingHorizontal: 5,
                  alignItems: "center",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Оплачено
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Index;
