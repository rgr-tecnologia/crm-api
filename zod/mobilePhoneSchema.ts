import { z } from "zod";

export const mobilePhoneSchema = z
  .string()
  .max(11)
  .refine(
    (value: string) => {
      const hasOnlyNumbers = /^\d+$/.test(value);
      return hasOnlyNumbers;
    },
    {
      message: "Telefone inválido",
    }
  );
