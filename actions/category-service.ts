import { axiosInstance } from "@/config/axios-config";
import { CategoryType } from "@/types/category";

export const CategoryService = {
  getAll: async () => {
    const response =
      await axiosInstance.get<CategoryType[]>("category/get-all");

    return response.data;
  },

  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<CategoryType>("category/get-by-id", {
      params: { id },
    });

    return response.data;
  }
};
