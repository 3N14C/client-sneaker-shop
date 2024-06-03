import { z } from "zod";

export const formAddCardSchema = z.object({
  name: z.string().min(1, "Имя не может быть пустым"),
  cardNumber: z
    .string()
    .min(19, "Номер карты должен содержать 16 цифр")
    .max(19, "Номер карты должен содержать 16 цифр"),
  expiryDate: z
    .string()
    .min(4, "Дата окончания не может быть пустой")
    .max(4, "Дата окончания должна содержать 5 цифр"),
  cvc: z
    .string()
    .min(1, "CVC не может быть пустым")
    .max(3, "CVC должен содержать 3 цифры"),
});