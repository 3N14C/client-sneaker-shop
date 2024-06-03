import { CardType } from "@/types/card-type";
import { FC } from "react";
import { Text, View } from "react-native";

interface IProps {
  creditCard: CardType;
}

export const CreditCard: FC<IProps> = ({ creditCard }) => {
  return (
    <View>
      <Text>Card</Text>
    </View>
  );
};
