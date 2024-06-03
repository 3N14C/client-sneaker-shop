import { z } from "zod";

export const addressSchema = z.object({
  city: z.string().min(1, "Город не может быть пустым"),
  street: z.string().min(1, "Улица не может быть пустой"),
});
