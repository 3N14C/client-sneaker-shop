import { axiosInstance } from "@/config/axios-config";
import { MessageType } from "@/types/message-type";

export const MessageService = {
  sendMessage: async (data: {
    message: string;
    chatId: string;
    userId: string;
  }) => {
    const response = await axiosInstance.post<MessageType>(
      "message/create",
      data
    );

    return response.data;
  },

  getByChatId: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<MessageType[]>(
      "message/get-by-chat-id",
      {
        params: { id },
      }
    );

    return response.data;
  },
};
