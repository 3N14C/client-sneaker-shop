import { useSession } from "@/store/session";
import { MessageType } from "@/types/message-type";
import moment from "moment";
import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

interface IProps {
  message: MessageType[];
}

export const UserMessage: FC<IProps> = ({ message }) => {
  const { user } = useSession();

    if (!user) return null

  return (
    <View style={{width: 150}}>
      {message
        .filter((message) => message.userId === user.id)
        .map((message) => (
          <View key={message.id} style={styles.messageContainerUser}>
            <Text style={styles.message}>{message.message}</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.messageTime}>
                {moment(message.createdAt).format("DD.MM.YYYY")}
              </Text>
              <Text style={styles.messageTime}>
                {moment(message.createdAt).format("HH:mm")}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainerUser: {
    backgroundColor: "#20aef3",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 5
  },
  message: {
    color: "#fff",
    fontSize: 15,
  },

  messageTime: {
    color: "#fff",
    fontSize: 10,
  },
});