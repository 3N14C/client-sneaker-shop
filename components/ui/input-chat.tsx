import { MessageService } from "@/actions/message-service";
import { useSession } from "@/store/session";
import { useMutation } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { Loader2, SendHorizonal } from "lucide-react-native";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface IProps {
  chatId: string;
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const InputChat: FC<IProps> = ({ chatId, isLoading, setIsLoading }) => {
    const {user} = useSession()
  const [message, setMessage] = useState<string>("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: MessageService.sendMessage,
    onSuccess: () => {
        setIsLoading(false)
    }
  });

  const handleSubmit = async () => {
    setIsLoading(true)
    await mutateAsync({
      chatId: chatId,
      message: message,
      userId: user?.id as string,
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Сообщение"
        style={styles.input}
      />
      <Pressable disabled={isPending} onPress={handleSubmit} style={{}}>
        {isPending ? <Loader2 size={20} color={"black"} /> : <SendHorizonal size={20} color={"black"} />}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    width: "90%",
    // marginBottom: 10,
  },
});
