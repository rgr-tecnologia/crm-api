import { z } from "zod";
import { cnpjSchema } from "../../../zod/cnpjSchema";

export const ClienteDto = z.object({
  id: z.string(),
  nomeFantasia: z.string(),
  cnpj: cnpjSchema,
  ativo: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ClienteDtoCreate = ClienteDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const ClienteDtoUpdate = ClienteDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ClienteDto = z.infer<typeof ClienteDto>;
export type ClienteDtoCreate = z.infer<typeof ClienteDtoCreate>;
export type ClienteDtoUpdate = z.infer<typeof ClienteDtoUpdate>;
