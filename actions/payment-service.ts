import { axiosInstance } from "@/config/axios-config";

export const PaymentService = {
  create: async ({totalSum}: {totalSum: number}) => {
    const response = await axiosInstance.post(`/payment`, {
      totalSum: `${totalSum}00`,
    });
    const { paymentIntent, ephemeralKey, customer } = await response.data;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  },
};
