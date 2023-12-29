import { z } from "zod";
import { cnpjValidate } from "../lib/cnpjValidate";

export const cnpjSchema = z
  .string()
  .refine(cnpjValidate, { message: "CNPJ inválido" });
