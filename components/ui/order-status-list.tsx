import { FC } from "react";
import { View } from "react-native";
import { OrderStatusIcon } from "./order-status-icons";
import { Text } from "react-native";
import { OrderType } from "@/types/order-type";
import { OrderStatus } from "@/types/enums/order-status-enum";
import { StyleSheet } from "react-native";

interface IProps {
  order: OrderType;
}

export const OrderStatusList: FC<IProps> = ({ order }) => {
  console.log(order.orderStatus);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <OrderStatusIcon
          color={
            order.orderStatus === OrderStatus.CREATED ? "#3f3f40" : "#9f9f9f"
          }
          line={" - - - - - "}
          iconName={"box"}
        />

        <OrderStatusIcon
          color={
            order.orderStatus === OrderStatus.DELIVERED ? "#3f3f40" : "#9f9f9f"
          }
          line={"- - - - -  "}
          iconName={"truck"}
        />

        <OrderStatusIcon
          color={
            order.orderStatus === OrderStatus.TRANSFERRED
              ? "#3f3f40"
              : "#9f9f9f"
          }
          line={" - - - - - "}
          iconName={"user-tie"}
        />

        <OrderStatusIcon
          color={
            order.orderStatus === OrderStatus.ORDERED ? "#3f3f40" : "#9f9f9f"
          }
          iconName={"box-open"}
        />
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#000",
            marginVertical: 10,
          }}
        >
          {order.orderStatus === OrderStatus.CREATED
            ? "В процессе сборки"
            : order.orderStatus === OrderStatus.DELIVERED
              ? "В пути"
              : order.orderStatus === OrderStatus.TRANSFERRED
                ? "Передано курьеру"
                : "Доставлено"}
        </Text>
      </View>

      <View
        style={{
          ...styles.line,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "##c6c6c6",
    marginVertical: 20,
  },
});
