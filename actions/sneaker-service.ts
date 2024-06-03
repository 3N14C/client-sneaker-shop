import { axiosInstance } from "@/config/axios-config";
import { SneakerType } from "@/types/sneaker";

export const SneakerService = {
  getAll: async () => {
    const response =
      await axiosInstance.get<SneakerType[]>("sneaker/get-stock");
    return response.data;
  },

  getPopularByCategoryId: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<SneakerType[]>(
      "sneaker/get-popular/by-category-id",
      { params: { id } }
    );
    return response.data;
  },

  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<SneakerType>("sneaker/get-by-id", {
      params: { id },
    });
    return response.data;
  },
};
