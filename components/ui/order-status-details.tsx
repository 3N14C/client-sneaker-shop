import { OrderType } from "@/types/order-type";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

interface IProps {
  order: OrderType;
}

export const OrderStatusDetails: FC<IProps> = ({ order }) => {
  return (
    <View style={styles.roadmapDelivery}>
      {order?.orderRoute?.map((road, idx) => (
        <View style={{}} key={idx}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View>
              <View style={{ ...styles.containerPoint }}>
                <View style={{ ...styles.point }} />
              </View>
              <Text
                style={{
                  color: "#9f9f9f",
                  fontSize: 12,
                  flexWrap: "wrap",
                  width: 5,
                  marginLeft: 10,
                }}
              >
                {idx !== 0 && "| | | | |"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: 300,
                marginTop: -10,
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: 16,
                    maxWidth: road?.name.length > 20 ? 250 : "auto",
                  }}
                >
                  {`${road.name} - ${new Date(road.createdAt).toLocaleString(
                    "default",
                    {
                      day: "numeric",
                      month: "long",
                    }
                  )}`}
                </Text>

                <Text
                  style={{ color: "#aaaaaa", fontSize: 12, marginTop: 5 }}
                >{`${road.address}`}</Text>
              </View>

              <Text
                style={{
                  color: "#aaaaaa",
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                {new Date(road.createdAt).toLocaleString("default", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sneakerSize: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 7,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
  },

  inDelivery: {
    color: "#35373d",
    backgroundColor: "#ececec",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 10,
  },

  price: {
    color: "#101010",
    fontSize: 14,
    fontWeight: "bold",
  },

  orderStatus: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },

  roadmapDelivery: {
    // flex: 1,
    flexDirection: "column-reverse",
    alignItems: "flex-start",
    // justifyContent: "flex-end",
    marginVertical: 20,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "##c6c6c6",
    marginVertical: 20,
  },

  containerPoint: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 50,
    borderColor: "#101010",
  },

  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#101010",
  },
});