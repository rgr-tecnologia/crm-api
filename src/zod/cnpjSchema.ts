import { z } from "zod";
import { isCnpjValid } from "../validators/isCnpjValid";

export const cnpjSchema = z
  .string()
  .refine(isCnpjValid, { message: "CNPJ inválido" });
