import { axiosInstance } from "@/config/axios-config";
import { UserType } from "@/types/user";
import { formSignInUser } from "@/validators/form-sign-in-user";
import { formSignUpUser } from "@/validators/form-sign-up-user";
import { z } from "zod";

export const UserService = {
  signUp: async (data: z.infer<typeof formSignUpUser>) => {
    const response = await axiosInstance.post<UserType>("user/create", data);

    return response.data;
  },

  signIn: async (data: z.infer<typeof formSignInUser>) => {
    const response = await axiosInstance.get<UserType>("user/get-by-email", {
      params: { email: data.email, password: data.password },
    });
    return response.data;
  },

  updateById: async (data: UserType) => {
    const response = await axiosInstance.patch<UserType>(
      "user/update/by-id",
      data,
      {
        params: { id: data.id },
      }
    );
    return response.data;
  },

  getById: async ({id}: {id: string}) => {
    const response = await axiosInstance.get<UserType>("user/get-by-id", {
      params: { id },
    })

    return response.data
  }
};
