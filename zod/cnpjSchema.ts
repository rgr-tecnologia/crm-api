import { z } from "zod";
import { cnpjValidate } from "../lib/utils/cnpjValidate";

export const cnpjSchema = z
  .string()
  .refine(cnpjValidate, { message: "CNPJ inválido" });
