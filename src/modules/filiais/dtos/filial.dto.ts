import { mobilePhoneSchema } from "@/zod/mobilePhoneSchema";
import { z } from "zod";

export const FilialDto = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  telefone: mobilePhoneSchema,
  filialEnderecoId: z.string().uuid(),
  nome: z.string(),
  cnpj: z.string().length(14),
  ativo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const FilialCreateDto = FilialDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const FilialUpdateDto = FilialDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type FilialDto = z.infer<typeof FilialDto>;
export type FilialCreate = z.infer<typeof FilialCreateDto>;
export type FilialUpdate = z.infer<typeof FilialUpdateDto>;
