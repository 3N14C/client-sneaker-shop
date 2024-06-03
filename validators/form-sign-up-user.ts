import { z } from "zod";

export const formSignUpUser = z.object({
  username: z.string().min(1, "Имя пользователя не может быть пустым"),
  email: z.string().email(),
  password: z.string().min(6, "Пароль минимум 6 символов"),
});
