import { axiosInstance } from "@/config/axios-config";
import { OfferType } from "@/types/offer";

export const OfferService = {
  getAll: async () => {
    const response = await axiosInstance.get<OfferType[]>("offer/get-all");

    return response.data;
  },

  getById: async ({ id }: { id: string }) => {
    const response = await axiosInstance.get<OfferType>("offer/get-by-id", {
      params: { id },
    });

    return response.data;
  },
};
