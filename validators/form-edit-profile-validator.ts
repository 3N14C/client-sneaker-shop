import { z } from "zod";

export const formEditProfileSchema = z.object({
    username: z.string().min(1, "Имя пользователя не может быть пустым"),
    email: z.string().email(),
    password: z.string().min(6, "Пароль минимум 6 символов"),
    firstName: z.string().min(1, "Имя не может быть пустым"),
    lastName: z.string().min(1, "Фамилия не может быть пустой"),
    secondaryName: z.string().min(1, "Отчество не может быть пустым"),
})