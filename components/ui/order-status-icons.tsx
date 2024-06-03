import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface IProps {
    color: string;
    iconName: string;
    line?: string;
    rotateDeg?: string;
}

export const OrderStatusIcon: FC<IProps> = ({color, iconName, line, rotateDeg}) => {
    return (
      <View
        style={{
          ...styles.orderStatus,
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon
            name={iconName}
            size={25}
            color={color}
            style={{
              transform: [{ rotateY: `${rotateDeg ? rotateDeg : "0deg"}` }],
            }}
          />

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon
              name="check"
              size={15}
              color={"#fff"}
              style={{ backgroundColor: color, padding: 2, borderRadius: 50 }}
            />
          </View>
        </View>

        <Text
          style={{
            color: color,
          }}
        >
          {line}
        </Text>
      </View>
    );
}

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