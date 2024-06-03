import { FC } from "react";
import { Text, TouchableHighlight } from "react-native";

interface IProps {
    onPress: () => void;
    children: React.ReactNode
}

export const PressButton: FC<IProps> = ({ onPress, children }) => {
    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor={"#393939"}
        style={{
          backgroundColor: "black",
          paddingVertical: 20,
          alignItems: "center",
          borderRadius: 50,
          marginTop: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          {children}
        </Text>
      </TouchableHighlight>
    );
}