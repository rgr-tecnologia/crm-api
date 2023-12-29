import { z } from "zod";
import { cnpjValidate } from "../lib/validators/cnpjValidate";

export const cnpjSchema = z
  .string()
  .refine(cnpjValidate, { message: "CNPJ inválido" });
