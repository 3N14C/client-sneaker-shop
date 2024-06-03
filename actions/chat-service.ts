import { axiosInstance } from "@/config/axios-config";
import { ChatType } from "@/types/chat-type";

export const ChatService = {
  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<ChatType[]>("chat/get-by-user-id", {
      params: { id },
    });

    return response.data;
  },
};
