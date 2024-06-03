import { useSession } from "@/store/session";
import { MessageType } from "@/types/message-type";
import moment from "moment";
import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

interface IProps {
  message: MessageType[];
}

export const AdminMessage: FC<IProps> = ({ message }) => {
  return (
    <View>
      {message
        .filter((message) => message.userId === "clwxh9xbz0002uwy1i7ivt9kc")
        .map((message) => (
          <View key={message.id} style={styles.messageContainerAdmin}>
            <Text style={styles.adminMessage}>{message.message}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
  messageContainerAdmin: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 5
  },
  adminMessage: {
    color: "#101010",
    fontSize: 15,
  },

  messageTime: {
    color: "#101010",
    fontSize: 10,
  }
});
