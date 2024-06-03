import { axiosInstance } from "@/config/axios-config";
import {
  OrderBySneakerIdType,
  OrderType,
  OrderTypeRequest,
} from "@/types/order-type";

export const OrderService = {
  create: async (data: OrderTypeRequest) => {
    const response = await axiosInstance.post<OrderType>("order/create", data);

    return response.data;
  },

  getByUserId: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<OrderType[]>(
      "order/get-by-user-id",
      {
        params: { id },
      }
    );

    return response.data;
  },

  getBySneakerId: async ({
    id,
    sneakerId,
  }: {
    id: string;
    sneakerId: string;
  }) => {
    const response = await axiosInstance.get<OrderBySneakerIdType>(
      "order/get-by-sneaker-id",
      {
        params: { id, sneakerId },
      }
    );

    return response.data;
  },

  getByOrderStatus: async ({ userId, status }: { userId: string; status: string }) => {
    const response = await axiosInstance.get<OrderType[]>(
      "order/get-by-order-status",
      {
        params: { userId, status },
      }
    );

    return response.data;
  },
};
