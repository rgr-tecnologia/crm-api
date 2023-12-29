import { z } from "zod";

export const mobilePhoneSchema = z
  .string()
  .max(12)
  .refine(
    (value) => {
      const regex = /\(\d{2}\)\s\d{4,5}-\d{4}/;
      return regex.test(value);
    },
    {
      message: "Telefone inválido",
    }
  );
