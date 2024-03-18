import { z } from "zod";

export const mobilePhoneSchema = z
  .string()
  .min(14)
  .max(14)
  .refine(
    (value: string) => {
      const isE164number = /^\+\d+$/.test(value);
      return isE164number;
    },
    {
      message: "Telefone inválido",
    }
  );
