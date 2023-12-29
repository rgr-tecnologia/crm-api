import { z } from "zod";
import { cnpjValidate } from "../lib/cnpjValidate";

export const cnpjSchema = z
  .number()
  .refine(cnpjValidate, { message: "CNPJ inválido" });
