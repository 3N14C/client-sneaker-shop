import { OrderStatus } from "@/types/enums/order-status-enum";
import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ILayoutNavabar {
  id: OrderStatus;
  name: string;
}

interface IProps {
  children: React.ReactNode;
  focus: string;
  setFocus: React.Dispatch<React.SetStateAction<OrderStatus>>;
}

const layoutNavbar: ILayoutNavabar[] = [
  {
    id: OrderStatus.CREATED,
    name: "Активные",
  },

  {
    id: OrderStatus.ORDERED,
    name: "Завершенные",
  },
];

export const LayoutOrders: FC<IProps> = ({
  children,
  focus,
  setFocus,
}) => {
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 80
        }}
      >
        {layoutNavbar.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setFocus(item.id);
            }}
          >
            <Text
              style={{
                ...styles.navbarItem,
                color: focus === item.id ? "rgb( 69, 69, 69)" : "#c2c2c2",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 40 }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  navbarItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(69, 69, 69)",
  },
});
