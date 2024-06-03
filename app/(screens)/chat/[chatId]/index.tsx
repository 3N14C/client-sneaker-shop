import { ChatService } from "@/actions/chat-service";
import { MessageService } from "@/actions/message-service";
import { AdminMessage } from "@/components/ui/admin-message-card";
import { InputChat } from "@/components/ui/input-chat";
import { PressButton } from "@/components/ui/press-button";
import { UserMessage } from "@/components/ui/user-message-card";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useSession();
  const params = useLocalSearchParams();

  const { data: messages } = useQuery({
    queryKey: ["chat-by-user-id", isLoading, user?.id],
    queryFn: () => MessageService.getByChatId({ id: params?.chatId as string }),
  });

  console.log(messages);

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            height: 650,
            marginBottom: 30,
            gap: 20,
          }}
        >
          {messages
            ?.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((message) => (
              <View
                key={message.id}
                style={
                  user?.id === message.userId
                    ? styles.messageContainerUser
                    : styles.messageContainerAdmin
                }
              >
                <Text
                  style={
                    user?.id === message.userId
                      ? styles.userMessage
                      : styles.adminMessage
                  }
                >
                  {message.message}
                </Text>
                <Text
                  style={
                    user?.id === message.userId
                      ? styles.userMessageTime
                      : styles.adminMessageTime
                  }
                >
                  {moment(message.createdAt).format("DD.MM.YYYY")}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>

      <View style={{ marginTop: 40 }}>
        <InputChat
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          chatId={params.chatId as string}
        />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  button: {
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
  },

  messageContainerUser: {
    backgroundColor: "#20aef3",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 5,
    alignSelf: "flex-end",
  },

  messageContainerAdmin: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    gap: 5,
    alignSelf: "flex-start",
  },

  userMessage: {
    color: "#fff",
    fontSize: 15,
  },

  adminMessage: {
    color: "#101010",
    fontSize: 15,
  },

  userMessageTime: {
    color: "#fff",
    fontSize: 10,
  },

  adminMessageTime: {
    color: "#000",
    fontSize: 10,
  },
});
