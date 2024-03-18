import { z } from "zod";

export const FilialEnderecoDto = z.object({
  id: z.string().uuid(),
  filialId: z.string().uuid(),
  logradouro: z.string(),
  numero: z.string(),
  bairro: z.string(),
  cidade: z.string(),
  estado: z.string(),
  cep: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const FilialEnderecoCreateDto = FilialEnderecoDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const FilialEnderecoUpdateDto = FilialEnderecoDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type FilialEnderecoDto = z.infer<typeof FilialEnderecoDto>;
export type FilialEnderecoCreate = z.infer<typeof FilialEnderecoCreateDto>;
export type FilialEnderecoUpdate = z.infer<typeof FilialEnderecoUpdateDto>;
