import { z } from "zod";

export const formSignInUser = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Пароль минимум 6 символов"),
});